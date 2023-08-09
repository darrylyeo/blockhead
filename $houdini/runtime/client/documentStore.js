import { getCurrentConfig } from "../lib/config";
import { deepEquals } from "../lib/deepEquals";
import { marshalInputs } from "../lib/scalars";
import { Writable } from "../lib/store";
import { ArtifactKind } from "../lib/types";
import { cachePolicy } from "./plugins";
const steps = {
  forward: ["start", "beforeNetwork", "network"],
  backwards: ["end", "afterNetwork"]
};
class DocumentStore extends Writable {
  artifact;
  #client;
  #configFile;
  #plugins;
  #lastVariables;
  #lastContext = null;
  pendingPromise = null;
  serverSideFallback;
  constructor({
    artifact,
    plugins,
    pipeline,
    client,
    cache,
    enableCache = true,
    initialValue,
    initialVariables,
    fetching
  }) {
    fetching ??= artifact.kind === ArtifactKind.Query;
    const initialState = {
      data: initialValue ?? null,
      errors: null,
      partial: false,
      stale: false,
      source: null,
      fetching,
      variables: initialVariables ?? null
    };
    super(initialState, () => {
      return () => {
        this.#lastVariables = null;
        this.cleanup();
      };
    });
    this.artifact = artifact;
    this.#client = client;
    this.#lastVariables = null;
    this.#configFile = getCurrentConfig();
    this.#plugins = pipeline ?? [
      cachePolicy({
        cache,
        enabled: enableCache,
        setFetching: (fetching2, data) => {
          this.update((state) => {
            const newState = { ...state, fetching: fetching2 };
            if (fetching2 && data) {
              newState.data = data;
            }
            return newState;
          });
        }
      })(),
      ...plugins ?? []
    ];
  }
  async send({
    metadata,
    session,
    fetch = globalThis.fetch,
    variables,
    policy,
    stuff,
    cacheParams,
    setup = false,
    silenceEcho = false
  } = {}) {
    let context = new ClientPluginContextWrapper({
      config: this.#configFile,
      name: this.artifact.name,
      text: this.artifact.raw,
      hash: this.artifact.hash,
      policy: policy ?? this.artifact.policy,
      variables: null,
      metadata,
      session,
      fetch,
      stuff: {
        inputs: {
          changed: false,
          init: false,
          marshaled: {}
        },
        ...stuff
      },
      artifact: this.artifact,
      lastVariables: this.#lastVariables,
      cacheParams
    });
    const draft = context.draft();
    draft.variables = variables ?? null;
    context = context.apply(draft, false);
    const promise = new Promise((resolve, reject) => {
      const state = {
        setup,
        currentStep: 0,
        index: 0,
        silenceEcho,
        promise: {
          resolved: false,
          resolve,
          reject,
          then: (...args) => promise.then(...args)
        },
        context
      };
      if (this.pendingPromise === null) {
        this.pendingPromise = state.promise;
      }
      this.#step("forward", state);
    });
    return await promise;
  }
  async cleanup() {
    for (const plugin of this.#plugins) {
      plugin.cleanup?.(this.#lastContext);
    }
  }
  #step(direction, ctx, value) {
    const hook = direction === "error" ? "catch" : steps[direction][ctx.currentStep];
    let valid = (i) => i <= this.#plugins.length;
    let step = (i) => i + 1;
    if (["backwards", "error"].includes(direction)) {
      valid = (i) => i >= 0;
      step = (i) => i - 1;
    }
    for (let index = ctx.index; valid(index); index = step(index)) {
      let target = this.#plugins[index]?.[hook];
      if (!target) {
        continue;
      }
      const draft = ctx.context.draft();
      let variablesRefChanged = (newContext) => newContext.variables !== draft.variables;
      const common = {
        initialValue: this.state,
        client: this.#client,
        variablesChanged,
        marshalVariables,
        updateState: this.update.bind(this),
        next: (newContext) => {
          const nextIndex = ["forward", "error"].includes(direction) ? index + 1 : index;
          const nextStep = ["backwards", "error"].includes(direction) ? 0 : ctx.currentStep;
          this.#step("forward", {
            ...ctx,
            index: nextIndex,
            currentStep: nextStep,
            context: ctx.context.apply(newContext, variablesRefChanged(newContext))
          });
        },
        resolve: (newContext, value2) => {
          const nextIndex = direction === "backwards" ? index - 1 : index;
          this.#step(
            "backwards",
            {
              ...ctx,
              index: nextIndex,
              context: ctx.context.apply(newContext, variablesRefChanged(newContext))
            },
            value2
          );
        }
      };
      let handlers;
      if (direction === "forward") {
        handlers = common;
      } else if (direction === "backwards") {
        handlers = {
          ...common,
          value,
          resolve: (ctx2, data) => {
            return common.resolve(ctx2, data ?? value);
          }
        };
      } else if (direction === "error") {
        handlers = {
          ...common,
          error: value
        };
      }
      try {
        const result = target(draft, handlers);
        result?.catch((err) => {
          this.#step("error", { ...ctx, index: index - 1 }, err);
        });
      } catch (err) {
        this.#step("error", { ...ctx, index: index - 1 }, err);
      }
      return;
    }
    if (direction === "forward") {
      if (ctx.setup) {
        return this.#step(
          "backwards",
          {
            ...ctx,
            currentStep: 0,
            index: this.#plugins.length
          },
          this.state
        );
      }
      if (ctx.currentStep <= steps.forward.length - 2) {
        return this.#step("forward", {
          ...ctx,
          currentStep: ctx.currentStep + 1,
          index: 0
        });
      }
      throw new Error(
        "Called next() on last possible plugin. Your chain is missing a plugin that calls resolve()."
      );
    }
    if (direction === "error") {
      if (!ctx.promise.resolved) {
        ctx.promise.reject(value);
        ctx.promise.resolved = true;
      }
      return;
    }
    if (ctx.currentStep > 0) {
      return this.#step(
        "backwards",
        {
          ...ctx,
          currentStep: ctx.currentStep - 1,
          index: this.#plugins.length - 1
        },
        value
      );
    }
    if (!ctx.silenceEcho || value.data !== this.state.data) {
      this.set(value);
    }
    if (!ctx.promise.resolved) {
      ctx.promise.resolve(value);
      ctx.promise.resolved = true;
    }
    this.#lastContext = ctx.context.draft();
    this.#lastVariables = this.#lastContext.stuff.inputs.marshaled;
  }
}
class ClientPluginContextWrapper {
  #context;
  #lastVariables;
  constructor({
    lastVariables,
    ...values
  }) {
    this.#context = values;
    this.#lastVariables = lastVariables;
  }
  get variables() {
    return this.#context.variables;
  }
  draft() {
    const ctx = {
      ...this.#context
    };
    const applyVariables = this.applyVariables.bind(this);
    return {
      ...ctx,
      get stuff() {
        return ctx.stuff;
      },
      set stuff(val) {
        ctx.stuff = val;
      },
      get variables() {
        return ctx.variables ?? null;
      },
      set variables(val) {
        Object.assign(ctx, applyVariables(ctx, { variables: val }));
      }
    };
  }
  applyVariables(source, values) {
    const artifact = source.artifact;
    const ctx = {
      ...source,
      ...values
    };
    const val = values.variables;
    let changed = {};
    for (const [name, value] of Object.entries(val ?? {})) {
      if (value !== source.variables?.[name]) {
        changed[name] = value;
      }
    }
    ctx.stuff = {
      ...ctx.stuff,
      inputs: {
        ...ctx.stuff.inputs
      }
    };
    const firstInit = !ctx.stuff.inputs || !ctx.stuff.inputs.init;
    const hasChanged = Object.keys(changed).length > 0 || firstInit;
    if (hasChanged) {
      const newVariables = {
        ...ctx.stuff.inputs?.marshaled,
        ...marshalInputs({
          artifact,
          input: changed,
          config: source.config
        })
      };
      ctx.stuff.inputs = {
        init: true,
        marshaled: newVariables,
        changed: true
      };
      ctx.variables = val;
    }
    ctx.stuff = {
      ...ctx.stuff,
      inputs: {
        ...ctx.stuff.inputs,
        changed: !deepEquals(ctx.stuff.inputs.marshaled, this.#lastVariables)
      }
    };
    return ctx;
  }
  apply(values, newVariables) {
    if (newVariables) {
      values = this.applyVariables(this.#context, values);
    }
    const wrapper = new ClientPluginContextWrapper({
      ...values,
      lastVariables: this.#lastVariables
    });
    return wrapper;
  }
}
function marshalVariables(ctx) {
  return ctx.stuff.inputs?.marshaled ?? {};
}
function variablesChanged(ctx) {
  return ctx.stuff.inputs?.changed;
}
export {
  DocumentStore
};
