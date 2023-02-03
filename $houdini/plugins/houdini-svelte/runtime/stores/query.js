import { getCache } from "$houdini/runtime";
import { deepEquals } from "$houdini/runtime/lib/deepEquals";
import * as log from "$houdini/runtime/lib/log";
import { fetchQuery } from "$houdini/runtime/lib/network";
import { marshalInputs, unmarshalSelection } from "$houdini/runtime/lib/scalars";
import {
  CachePolicy,
  CompiledQueryKind,
  DataSource
} from "$houdini/runtime/lib/types";
import { get, writable } from "svelte/store";
import { clientStarted, error, isBrowser } from "../adapter";
import { getCurrentClient } from "../network";
import { getSession } from "../session";
import { BaseStore } from "./store";
class QueryStore extends BaseStore {
  artifact;
  variables;
  kind = CompiledQueryKind;
  store;
  lastVariables = null;
  subscriptionSpec = null;
  loadPending = false;
  subscriberCount = 0;
  storeName;
  setFetching(fetching) {
    this.store?.update((s) => ({ ...s, fetching }));
  }
  async currentVariables() {
    return get(this.store).variables;
  }
  constructor({ artifact, storeName, variables }) {
    super();
    this.store = writable(this.initialState);
    this.artifact = artifact;
    this.storeName = storeName;
    this.variables = variables;
  }
  async fetch(args) {
    const config = await this.getConfig();
    const { policy, params, context } = await fetchParams(this.artifact, this.storeName, {
      ...args
    });
    const isLoadFetch = Boolean("event" in params && params.event);
    const isComponentFetch = !isLoadFetch;
    const input = await marshalInputs({
      artifact: this.artifact,
      input: params?.variables
    }) || {};
    const newVariables = {
      ...this.lastVariables,
      ...input
    };
    let variableChange = !deepEquals(this.lastVariables, newVariables);
    if (variableChange && isBrowser) {
      this.refreshSubscription(newVariables);
      this.store.update((s) => ({ ...s, variables: newVariables }));
    }
    if (this.loadPending && isComponentFetch) {
      log.error(`\u26A0\uFE0F Encountered fetch from your component while ${this.storeName}.load was running.
This will result in duplicate queries. If you are trying to ensure there is always a good value, please a CachePolicy instead.`);
      return get(this.store);
    }
    if (isComponentFetch) {
      params.blocking = true;
    }
    if (isLoadFetch) {
      this.loadPending = true;
    }
    const fetchArgs = {
      config,
      context,
      artifact: this.artifact,
      variables: newVariables,
      store: this.store,
      cached: policy !== CachePolicy.NetworkOnly,
      setLoadPending: (val) => {
        this.loadPending = val;
        this.setFetching(val);
      }
    };
    const fakeAwait = clientStarted && isBrowser && !params?.blocking;
    if (policy !== CachePolicy.NetworkOnly && fakeAwait) {
      const cachedStore = await this.fetchAndCache({
        ...fetchArgs,
        rawCacheOnlyResult: true
      });
      if (cachedStore && cachedStore?.result.data) {
        this.store.update((s) => ({
          ...s,
          data: cachedStore?.result.data,
          fetching: false
        }));
      }
    }
    const request = this.fetchAndCache(fetchArgs);
    if (params.then) {
      request.then((val) => params.then?.(val.result.data));
    }
    if (!fakeAwait) {
      await request;
    }
    return get(this.store);
  }
  get name() {
    return this.artifact.name;
  }
  subscribe(...args) {
    const bubbleUp = this.store.subscribe(...args);
    this.subscriberCount = (this.subscriberCount ?? 0) + 1;
    if (isBrowser && !this.subscriptionSpec) {
      this.refreshSubscription(this.lastVariables ?? {});
    }
    return () => {
      this.subscriberCount--;
      if (this.subscriberCount <= 0) {
        if (isBrowser && this.subscriptionSpec) {
          getCache().unsubscribe(this.subscriptionSpec, this.lastVariables || {});
        }
        this.subscriptionSpec = null;
      }
      bubbleUp();
    };
  }
  async fetchAndCache({
    config,
    artifact,
    variables,
    store,
    cached,
    ignoreFollowup,
    setLoadPending,
    policy,
    context,
    rawCacheOnlyResult = false
  }) {
    const request = await fetchQuery({
      ...context,
      client: await getCurrentClient(),
      setFetching: (val) => this.setFetching(val),
      artifact,
      variables,
      cached,
      policy: rawCacheOnlyResult ? CachePolicy.CacheOnly : policy,
      context
    });
    const { result, source, partial } = request;
    if (rawCacheOnlyResult) {
      return request;
    }
    setLoadPending(false);
    if (result.data && source !== DataSource.Cache) {
      getCache().write({
        selection: artifact.selection,
        data: result.data,
        variables: variables || {}
      });
    }
    const unmarshaled = source === DataSource.Cache ? result.data : unmarshalSelection(config, artifact.selection, result.data);
    if (result.errors && result.errors.length > 0) {
      store.update((s) => ({
        ...s,
        errors: result.errors,
        fetching: false,
        partial: false,
        data: unmarshaled,
        source,
        variables
      }));
      if (!config.plugins?.["houdini-svelte"]?.quietQueryErrors) {
        throw error(500, result.errors.map((error2) => error2.message).join(". ") + ".");
      }
    } else {
      store.set({
        data: unmarshaled || {},
        variables: variables || {},
        errors: null,
        fetching: false,
        partial: request.partial,
        source: request.source
      });
    }
    if (!ignoreFollowup) {
      if (source === DataSource.Cache && artifact.policy === CachePolicy.CacheAndNetwork) {
        this.fetchAndCache({
          config,
          context,
          artifact,
          variables,
          store,
          cached: false,
          ignoreFollowup: true,
          setLoadPending,
          policy
        });
      }
      if (partial && artifact.policy === CachePolicy.CacheOrNetwork) {
        this.fetchAndCache({
          config,
          context,
          artifact,
          variables,
          store,
          cached: false,
          ignoreFollowup: true,
          setLoadPending,
          policy
        });
      }
    }
    return request;
  }
  refreshSubscription(newVariables) {
    const cache = getCache();
    if (this.subscriptionSpec) {
      cache.unsubscribe(this.subscriptionSpec, this.lastVariables || {});
    }
    this.subscriptionSpec = {
      rootType: this.artifact.rootType,
      selection: this.artifact.selection,
      variables: () => newVariables,
      set: (newValue) => this.store.update((s) => ({ ...s, data: newValue }))
    };
    cache.subscribe(this.subscriptionSpec, newVariables);
    this.lastVariables = newVariables;
  }
  get initialState() {
    return {
      data: null,
      errors: null,
      fetching: true,
      partial: false,
      source: null,
      variables: {},
      ...this.extraFields()
    };
  }
  extraFields() {
    return {};
  }
}
async function fetchParams(artifact, storeName, params) {
  if (!isBrowser && !(params && "fetch" in params) && (!params || !("event" in params))) {
    log.error(contextError(storeName));
    throw new Error("Error, check above logs for help.");
  }
  let policy = params?.policy;
  if (!policy) {
    policy = artifact.policy ?? CachePolicy.CacheOrNetwork;
  }
  let fetchFn = null;
  if (params) {
    if ("fetch" in params && params.fetch) {
      fetchFn = params.fetch;
    } else if ("event" in params && params.event && "fetch" in params.event) {
      fetchFn = params.event.fetch;
    }
  }
  if (!fetchFn) {
    fetchFn = globalThis.fetch.bind(globalThis);
  }
  let session = void 0;
  if (params && "event" in params && params.event) {
    session = await getSession(params.event);
  } else if (isBrowser) {
    session = await getSession();
  } else {
    log.error(contextError(storeName));
    throw new Error("Error, check above logs for help.");
  }
  return {
    context: {
      fetch: fetchFn,
      metadata: params?.metadata ?? {},
      session
    },
    policy,
    params: params ?? {}
  };
}
const contextError = (storeName) => `
	${log.red(`Missing event args in load function`)}.

Please remember to pass event to fetch like so:

import type { LoadEvent } from '@sveltejs/kit';

export async function load(${log.yellow("event")}: LoadEvent) {
	return {
		...load_${storeName}({ ${log.yellow("event")}, variables: { ... } })
	};
}
`;
export {
  QueryStore,
  fetchParams
};
