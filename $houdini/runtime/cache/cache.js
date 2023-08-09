import { computeKey, PendingValue } from "../lib";
import { computeID, defaultConfigValues, keyFieldsForType, getCurrentConfig } from "../lib/config";
import { deepEquals } from "../lib/deepEquals";
import { flatten } from "../lib/flatten";
import { getFieldsForType } from "../lib/selection";
import { fragmentKey } from "../lib/types";
import { GarbageCollector } from "./gc";
import { ListManager } from "./lists";
import { StaleManager } from "./staleManager";
import { InMemoryStorage } from "./storage";
import { evaluateKey } from "./stuff";
import { InMemorySubscriptions } from "./subscription";
class Cache {
  _internal_unstable;
  constructor({ disabled, ...config } = {}) {
    this._internal_unstable = new CacheInternal({
      cache: this,
      storage: new InMemoryStorage(),
      subscriptions: new InMemorySubscriptions(this),
      lists: new ListManager(this, rootID),
      lifetimes: new GarbageCollector(this),
      staleManager: new StaleManager(this),
      disabled: disabled ?? typeof globalThis.window === "undefined"
    });
    if (Object.keys(config).length > 0) {
      this.setConfig(defaultConfigValues(config));
    }
  }
  write({
    layer: layerID,
    notifySubscribers = [],
    ...args
  }) {
    const layer = layerID ? this._internal_unstable.storage.getLayer(layerID) : this._internal_unstable.storage.topLayer;
    const subscribers = this._internal_unstable.writeSelection({ ...args, layer }).map((sub) => sub[0]);
    this.#notifySubscribers(subscribers.concat(notifySubscribers));
    return subscribers;
  }
  read(...args) {
    const { data, partial, stale, hasData } = this._internal_unstable.getSelection(...args);
    if (!hasData) {
      return { data: null, partial: false, stale: false };
    }
    return {
      data,
      partial,
      stale
    };
  }
  subscribe(spec, variables = {}) {
    return this._internal_unstable.subscriptions.add({
      parent: spec.parentID || rootID,
      spec,
      selection: spec.selection,
      variables
    });
  }
  unsubscribe(spec, variables = {}) {
    return this._internal_unstable.subscriptions.remove(
      spec.parentID || rootID,
      spec.selection,
      [spec],
      variables
    );
  }
  list(name, parentID, allLists) {
    const handler = this._internal_unstable.lists.get(name, parentID, allLists);
    if (!handler) {
      throw new Error(
        `Cannot find list with name: ${name}${parentID ? " under parent " + parentID : ""}. Is it possible that the query is not mounted?`
      );
    }
    return handler;
  }
  delete(id, layer) {
    this._internal_unstable.subscriptions.removeAllSubscribers(id);
    this._internal_unstable.lists.removeIDFromAllLists(id, layer);
    this._internal_unstable.storage.delete(id, layer);
  }
  setConfig(config) {
    this._internal_unstable.setConfig(config);
  }
  markTypeStale(options) {
    if (!options) {
      this._internal_unstable.staleManager.markAllStale();
    } else if (!options.field) {
      this._internal_unstable.staleManager.markTypeStale(options.type);
    } else {
      this._internal_unstable.staleManager.markTypeFieldStale(
        options.type,
        options.field,
        options.when
      );
    }
  }
  markRecordStale(id, options) {
    if (options.field) {
      const key = computeKey({ field: options.field, args: options.when ?? {} });
      this._internal_unstable.staleManager.markFieldStale(id, key);
    } else {
      this._internal_unstable.staleManager.markRecordStale(id);
    }
  }
  getFieldTime(id, field) {
    return this._internal_unstable.staleManager.getFieldTime(id, field);
  }
  config() {
    return this._internal_unstable.config;
  }
  serialize() {
    return this._internal_unstable.storage.serialize();
  }
  hydrate(...args) {
    return this._internal_unstable.storage.hydrate(...args);
  }
  clearLayer(layerID) {
    const layer = this._internal_unstable.storage.getLayer(layerID);
    if (!layer) {
      throw new Error("Cannot find layer with id: " + layerID);
    }
    const toNotify = [];
    const allFields = [];
    for (const target of [layer.fields, layer.links]) {
      for (const [id, fields] of Object.entries(target)) {
        allFields.push(
          ...Object.entries(fields).map(([field, value]) => ({ id, field, value }))
        );
      }
    }
    const displayFields = [];
    for (const pair of allFields) {
      const { displayLayers } = this._internal_unstable.storage.get(pair.id, pair.field);
      if (!displayLayers.includes(layerID)) {
        continue;
      }
      displayFields.push(pair);
    }
    for (const [id, operation] of Object.entries(layer.operations)) {
      if (operation.deleted) {
        displayFields.push(
          ...this._internal_unstable.subscriptions.activeFields(id).map((field) => ({ id, field }))
        );
      }
      const fields = Object.keys(operation.fields ?? {});
      if (fields.length > 0) {
        displayFields.push(...fields.map((field) => ({ id, field })));
      }
    }
    layer.clear();
    for (const display of displayFields) {
      const { field, id } = display;
      const notify = !("value" in display) || this._internal_unstable.storage.get(id, field).value !== display.value;
      if (notify) {
        toNotify.push(
          ...this._internal_unstable.subscriptions.get(id, field).map((sub) => sub[0])
        );
      }
    }
    this.#notifySubscribers(toNotify);
  }
  reset() {
    const subSpecs = this._internal_unstable.subscriptions.reset();
    this._internal_unstable.staleManager.reset();
    this._internal_unstable.lifetimes.reset();
    this._internal_unstable.lists.reset();
    this._internal_unstable.storage.reset();
    this.#notifySubscribers(subSpecs);
  }
  #notifySubscribers(subs) {
    if (subs.length === 0) {
      return;
    }
    const notified = [];
    for (const spec of subs) {
      if (!notified.includes(spec.set)) {
        notified.push(spec.set);
        spec.set(
          this._internal_unstable.getSelection({
            parent: spec.parentID || rootID,
            selection: spec.selection,
            variables: spec.variables?.() || {},
            ignoreMasking: false
          }).data
        );
      }
    }
  }
}
class CacheInternal {
  _disabled = false;
  _config;
  storage;
  subscriptions;
  lists;
  cache;
  lifetimes;
  staleManager;
  constructor({
    storage,
    subscriptions,
    lists,
    cache,
    lifetimes,
    staleManager,
    disabled,
    config
  }) {
    this.storage = storage;
    this.subscriptions = subscriptions;
    this.lists = lists;
    this.cache = cache;
    this.lifetimes = lifetimes;
    this.staleManager = staleManager;
    this._config = config;
    this._disabled = disabled;
    try {
      if (process.env.HOUDINI_TEST === "true") {
        this._disabled = false;
      }
    } catch {
    }
  }
  get config() {
    return this._config ?? getCurrentConfig();
  }
  setConfig(config) {
    this._config = config;
  }
  writeSelection({
    data,
    selection,
    variables = {},
    parent = rootID,
    applyUpdates,
    layer,
    toNotify = [],
    forceNotify,
    forceStale
  }) {
    if (this._disabled) {
      return [];
    }
    let targetSelection = getFieldsForType(
      selection,
      data["__typename"],
      false
    );
    for (const [field, value] of Object.entries(data)) {
      if (!selection || !targetSelection[field]) {
        continue;
      }
      let {
        type: linkedType,
        keyRaw,
        selection: fieldSelection,
        operations,
        abstract: isAbstract,
        updates
      } = targetSelection[field];
      const key = evaluateKey(keyRaw, variables);
      if (value && typeof value === "object" && "__typename" in value && value["__typename"]) {
        linkedType = value["__typename"];
      }
      const currentSubscribers = this.subscriptions.get(parent, key);
      const specs = currentSubscribers.map((sub) => sub[0]);
      const { value: previousValue, displayLayers } = this.storage.get(parent, key);
      const displayLayer = layer.isDisplayLayer(displayLayers);
      if (displayLayer) {
        this.lifetimes.resetLifetime(parent, key);
        if (forceStale) {
          this.staleManager.markFieldStale(parent, key);
        } else {
          this.staleManager.setFieldTimeToNow(parent, key);
        }
      }
      if (!fieldSelection) {
        let newValue = value;
        if (updates && applyUpdates && Array.isArray(value)) {
          for (const update of applyUpdates) {
            if (!updates.includes(update)) {
              continue;
            }
            if (update === "append") {
              newValue = (previousValue || []).concat(value);
            } else if (update === "prepend") {
              newValue = value.concat(previousValue || []);
            }
          }
        }
        if (updates && applyUpdates?.includes("prepend") && ["endCursor", "hasNextPage"].includes(key)) {
          newValue = previousValue;
        } else if (updates && applyUpdates?.includes("append") && ["startCursor", "hasPreviousPage"].includes(key)) {
          newValue = previousValue;
        }
        const valueChanged = !deepEquals(newValue, previousValue);
        if (displayLayer && (valueChanged || forceNotify)) {
          toNotify.push(...currentSubscribers);
        }
        layer.writeField(parent, key, newValue);
      } else if (value === null) {
        if (previousValue === null) {
          continue;
        }
        const previousLinks = flatten([previousValue]);
        for (const link of previousLinks) {
          this.subscriptions.remove(link, fieldSelection, specs, variables);
        }
        layer.writeLink(parent, key, null);
        toNotify.push(...currentSubscribers);
      } else if (value instanceof Object && !Array.isArray(value)) {
        if (isAbstract) {
          if (!value.__typename) {
            throw new Error(
              "Encountered interface type without __typename in the payload"
            );
          }
        }
        let linkedID = null;
        if (value !== null) {
          linkedID = !this.isEmbedded(linkedType, value) ? this.id(linkedType, value) : `${parent}.${key}`;
        }
        let linkChange = linkedID !== previousValue;
        layer.writeLink(parent, key, linkedID);
        if (linkedID && displayLayer && (linkChange || forceNotify)) {
          if (previousValue && typeof previousValue === "string") {
            this.subscriptions.remove(previousValue, fieldSelection, specs, variables);
          }
          this.subscriptions.addMany({
            parent: linkedID,
            subscribers: currentSubscribers,
            variables,
            parentType: linkedType
          });
          toNotify.push(...currentSubscribers);
        }
        if (linkedID) {
          this.writeSelection({
            selection: fieldSelection,
            parent: linkedID,
            data: value,
            variables,
            toNotify,
            applyUpdates,
            layer,
            forceNotify
          });
        }
      } else if (Array.isArray(value) && (typeof previousValue === "undefined" || previousValue === null || Array.isArray(previousValue))) {
        let oldIDs = [...previousValue || []];
        const emptyEdges = !updates ? [] : oldIDs.map((id) => {
          if (!id) {
            return "";
          }
          const { value: cursorField } = this.storage.get(id, "cursor");
          if (cursorField) {
            return "";
          }
          const { value: node } = this.storage.get(id, "node");
          if (!node) {
            return "";
          }
          return node;
        });
        let linkedIDs = [];
        const { newIDs, nestedIDs } = this.extractNestedListIDs({
          value,
          abstract: Boolean(isAbstract),
          specs: toNotify,
          applyUpdates,
          recordID: parent,
          key,
          linkedType,
          variables,
          fields: fieldSelection,
          layer,
          forceNotify
        });
        if (applyUpdates && updates) {
          if (key === "edges") {
            const newNodeIDs = [];
            for (const id of newIDs) {
              if (!id) {
                continue;
              }
              const { value: node } = this.storage.get(id, "node");
              if (typeof node !== "string") {
                continue;
              }
              if (!node || !this.storage.get(node, "__typename")) {
                continue;
              }
              newNodeIDs.push(node);
            }
            oldIDs = oldIDs.filter((id) => {
              if (!id) {
                return true;
              }
              const { value: value2 } = this.storage.get(id, "node");
              const node = value2;
              if (newNodeIDs.includes(node) && emptyEdges.includes(node)) {
                return false;
              }
              return true;
            });
          }
          for (const update of applyUpdates) {
            if (update !== "replace" && !updates.includes(update)) {
              continue;
            }
            if (update === "prepend") {
              linkedIDs = newIDs.concat(oldIDs);
            } else if (update === "append") {
              linkedIDs = oldIDs.concat(newIDs);
            } else if (update === "replace") {
              linkedIDs = newIDs;
            }
          }
        } else {
          linkedIDs = nestedIDs;
        }
        const contentChanged = !deepEquals(linkedIDs, oldIDs) || previousValue === null;
        if (contentChanged || forceNotify) {
          toNotify.push(...currentSubscribers);
        }
        for (const lostID of oldIDs) {
          if (linkedIDs.includes(lostID) || !lostID) {
            continue;
          }
          this.subscriptions.remove(lostID, fieldSelection, specs, variables);
        }
        if (contentChanged || oldIDs.length === 0 && newIDs.length === 0) {
          layer.writeLink(parent, key, linkedIDs);
        }
        for (const id of newIDs.filter((id2) => !oldIDs.includes(id2))) {
          if (id == null) {
            continue;
          }
          this.subscriptions.addMany({
            parent: id,
            subscribers: currentSubscribers,
            variables,
            parentType: linkedType
          });
        }
      }
      for (const operation of operations || []) {
        let parentID;
        if (operation.parentID) {
          if (operation.parentID.kind !== "Variable") {
            parentID = operation.parentID.value;
          } else {
            const id = variables[operation.parentID.value];
            if (typeof id !== "string") {
              throw new Error("parentID value must be a string");
            }
            parentID = id;
          }
        }
        if (operation.list && !this.lists.get(operation.list, parentID, operation.target === "all")) {
          continue;
        }
        const targets = Array.isArray(value) ? value : [value];
        for (const target of targets) {
          if (operation.action === "insert" && target instanceof Object && fieldSelection && operation.list) {
            this.cache.list(operation.list, parentID, operation.target === "all").when(operation.when).addToList(
              fieldSelection,
              target,
              variables,
              operation.position || "last",
              layer
            );
          } else if (operation.action === "toggle" && target instanceof Object && fieldSelection && operation.list) {
            this.cache.list(operation.list, parentID, operation.target === "all").when(operation.when).toggleElement({
              selection: fieldSelection,
              data: target,
              variables,
              where: operation.position || "last",
              layer
            });
          } else if (operation.action === "remove" && target instanceof Object && fieldSelection && operation.list) {
            this.cache.list(operation.list, parentID, operation.target === "all").when(operation.when).remove(target, variables, layer);
          } else if (operation.action === "delete" && operation.type) {
            if (typeof target !== "string") {
              throw new Error("Cannot delete a record with a non-string ID");
            }
            const targetID = this.id(operation.type, target);
            if (!targetID) {
              continue;
            }
            this.cache.delete(targetID, layer);
          }
        }
      }
    }
    return toNotify;
  }
  getSelection({
    selection,
    parent = rootID,
    variables,
    stepsFromConnection = null,
    ignoreMasking,
    fullCheck = false,
    loading: generateLoading
  }) {
    if (parent === null) {
      return { data: null, partial: false, stale: false, hasData: true };
    }
    const target = {};
    if (selection.fragments) {
      target[fragmentKey] = {
        loading: Boolean(generateLoading),
        values: Object.fromEntries(
          Object.entries(selection.fragments).filter(([, value]) => !generateLoading || value.loading).map(([key, value]) => [
            key,
            {
              parent,
              variables: evaluateFragmentVariables(
                value.arguments,
                variables ?? {}
              )
            }
          ])
        )
      };
    }
    let hasData = !!selection.fragments;
    let partial = false;
    let cascadeNull = false;
    let stale = false;
    const typename = this.storage.get(parent, "__typename").value;
    let targetSelection = getFieldsForType(selection, typename, !!generateLoading);
    for (const [
      attributeName,
      {
        type,
        keyRaw,
        selection: fieldSelection,
        nullable,
        list,
        visible,
        directives,
        loading: fieldLoading,
        abstractHasRequired
      }
    ] of Object.entries(targetSelection)) {
      if (!visible && !ignoreMasking && !fullCheck) {
        continue;
      }
      const includeDirective = directives?.find((d) => {
        return d.name === "include";
      });
      if (includeDirective) {
        if (!evaluateFragmentVariables(includeDirective.arguments, variables ?? {})["if"]) {
          continue;
        }
      }
      const skipDirective = directives?.find((d) => {
        return d.name === "skip";
      });
      if (skipDirective) {
        if (evaluateFragmentVariables(skipDirective.arguments, variables ?? {})["if"]) {
          continue;
        }
      }
      const fieldTarget = visible || ignoreMasking ? target : {};
      const key = evaluateKey(keyRaw, variables);
      if (generateLoading && !fieldLoading) {
        continue;
      }
      let { value } = this.storage.get(parent, key);
      const dt_field = this.staleManager.getFieldTime(parent, key);
      if (dt_field === null) {
        stale = true;
      }
      if (generateLoading) {
        value = void 0;
      }
      let nextStep = stepsFromConnection;
      if (nextStep !== null) {
        if (nextStep >= 2) {
          nextStep = null;
        } else {
          nextStep += 1;
        }
      }
      if (list?.connection) {
        nextStep = 0;
      }
      const embeddedCursor = key === "cursor" && stepsFromConnection === 1;
      if (typeof value === "undefined" && !embeddedCursor) {
        partial = true;
      }
      if (generateLoading && fieldLoading?.kind === "value") {
        fieldTarget[attributeName] = PendingValue;
        hasData = true;
      } else if (!generateLoading && typeof value === "undefined" || value === null) {
        fieldTarget[attributeName] = null;
        if (typeof value !== "undefined") {
          hasData = true;
        }
      } else if (!fieldSelection) {
        const fnUnmarshal = this.config?.scalars?.[type]?.unmarshal;
        if (fnUnmarshal) {
          fieldTarget[attributeName] = fnUnmarshal(value);
        } else {
          fieldTarget[attributeName] = value;
        }
        hasData = true;
      } else if (Array.isArray(value)) {
        const listValue = this.hydrateNestedList({
          fields: fieldSelection,
          variables,
          linkedList: value,
          stepsFromConnection: nextStep,
          ignoreMasking: !!ignoreMasking,
          fullCheck,
          loading: generateLoading
        });
        fieldTarget[attributeName] = listValue.data;
        if (listValue.partial) {
          partial = true;
        }
        if (listValue.stale) {
          stale = true;
        }
        if (listValue.hasData || value.length === 0) {
          hasData = true;
        }
      } else {
        const objectFields = this.getSelection({
          parent: value,
          selection: fieldSelection,
          variables,
          stepsFromConnection: nextStep,
          ignoreMasking,
          fullCheck,
          loading: generateLoading
        });
        fieldTarget[attributeName] = objectFields.data;
        if (objectFields.partial) {
          partial = true;
        }
        if (objectFields.stale) {
          stale = true;
        }
        if (objectFields.hasData) {
          hasData = true;
        }
      }
      if (generateLoading && fieldLoading?.list) {
        fieldTarget[attributeName] = wrapInLists(
          Array.from({ length: fieldLoading.list.count }).fill(
            fieldTarget[attributeName]
          ),
          fieldLoading.list.depth - 1
        );
      }
      if (fieldTarget[attributeName] === null && !nullable && !embeddedCursor) {
        if (abstractHasRequired) {
          target[attributeName] = {
            __typename: "@required field missing; don't match this"
          };
        } else {
          cascadeNull = true;
        }
      }
    }
    return {
      data: cascadeNull ? null : target,
      partial: !generateLoading && hasData && partial,
      stale: hasData && stale,
      hasData
    };
  }
  id(type, data) {
    const id = typeof data === "string" ? data : this.computeID(type, data);
    if (!id) {
      return null;
    }
    if (!type) {
      return id;
    }
    return type + ":" + id;
  }
  idFields(type) {
    return keyFieldsForType(this.config, type);
  }
  computeID(type, data) {
    return computeID(this.config, type, data);
  }
  isEmbedded(linkedType, value) {
    const idFields = this.idFields(linkedType);
    return idFields.length === 0 || idFields.filter((field) => typeof value[field] === "undefined").length > 0;
  }
  hydrateNestedList({
    fields,
    variables,
    linkedList,
    stepsFromConnection,
    ignoreMasking,
    fullCheck,
    loading
  }) {
    const result = [];
    let partialData = false;
    let stale = false;
    let hasValues = false;
    for (const entry of linkedList) {
      if (Array.isArray(entry)) {
        const nestedValue = this.hydrateNestedList({
          fields,
          variables,
          linkedList: entry,
          stepsFromConnection,
          ignoreMasking,
          fullCheck,
          loading
        });
        result.push(nestedValue.data);
        if (nestedValue.partial) {
          partialData = true;
        }
        continue;
      }
      if (entry === null) {
        result.push(entry);
        continue;
      }
      const {
        data,
        partial,
        stale: local_stale,
        hasData
      } = this.getSelection({
        parent: entry,
        selection: fields,
        variables,
        stepsFromConnection,
        ignoreMasking,
        fullCheck,
        loading
      });
      result.push(data);
      if (partial) {
        partialData = true;
      }
      if (local_stale) {
        stale = true;
      }
      if (hasData) {
        hasValues = true;
      }
    }
    return {
      data: result,
      partial: partialData,
      stale,
      hasData: hasValues
    };
  }
  extractNestedListIDs({
    value,
    abstract,
    recordID,
    key,
    linkedType,
    fields,
    variables,
    applyUpdates,
    specs,
    layer,
    forceNotify
  }) {
    const nestedIDs = [];
    const newIDs = [];
    for (const [i, entry] of value.entries()) {
      if (Array.isArray(entry)) {
        const inner = this.extractNestedListIDs({
          value: entry,
          abstract,
          recordID,
          key,
          linkedType,
          fields,
          variables,
          applyUpdates,
          specs,
          layer,
          forceNotify
        });
        newIDs.push(...inner.newIDs);
        nestedIDs[i] = inner.nestedIDs;
        continue;
      }
      if (entry === null || typeof entry === "undefined") {
        newIDs.push(null);
        nestedIDs[i] = null;
        continue;
      }
      const entryObj = entry;
      let linkedID = `${recordID}.${key}[${this.storage.nextRank}]`;
      let innerType = linkedType;
      const typename = entryObj.__typename;
      if (typename) {
        innerType = typename;
      } else if (abstract) {
        throw new Error("Encountered interface type without __typename in the payload");
      }
      if (!this.isEmbedded(linkedType, entry)) {
        const id = this.id(innerType, entry);
        if (id) {
          linkedID = id;
        } else {
          continue;
        }
      }
      this.writeSelection({
        root: rootID,
        selection: fields,
        parent: linkedID,
        data: entryObj,
        variables,
        toNotify: specs,
        applyUpdates,
        layer,
        forceNotify
      });
      newIDs.push(linkedID);
      nestedIDs[i] = linkedID;
    }
    return { newIDs, nestedIDs };
  }
  collectGarbage() {
    this.lifetimes.tick();
    if (this.storage.layerCount === 1) {
      this.storage.topLayer.removeUndefinedFields();
    }
  }
}
function evaluateFragmentVariables(variables, args) {
  return Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [key, fragmentVariableValue(value, args)])
  );
}
function wrapInLists(target, count = 0) {
  if (count === 0) {
    return target;
  }
  return wrapInLists([target], count - 1);
}
function fragmentVariableValue(value, args) {
  if (value.kind === "StringValue") {
    return value.value;
  }
  if (value.kind === "BooleanValue") {
    return value.value;
  }
  if (value.kind === "EnumValue") {
    return value.value;
  }
  if (value.kind === "FloatValue") {
    return parseFloat(value.value);
  }
  if (value.kind === "IntValue") {
    return parseInt(value.value, 10);
  }
  if (value.kind === "NullValue") {
    return null;
  }
  if (value.kind === "Variable") {
    return args[value.name.value];
  }
  if (value.kind === "ListValue") {
    return value.values.map((value2) => fragmentVariableValue(value2, args));
  }
  if (value.kind === "ObjectValue") {
    return value.fields.reduce(
      (obj, field) => ({
        ...obj,
        [field.name.value]: fragmentVariableValue(field.value, args)
      }),
      {}
    );
  }
}
const rootID = "_ROOT_";
export {
  Cache,
  evaluateFragmentVariables,
  rootID
};
