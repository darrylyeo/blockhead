import { getCurrentConfig, keyFieldsForType } from "$houdini/runtime/lib/config";
import { siteURL } from "$houdini/runtime/lib/constants";
import { extractPageInfo } from "$houdini/runtime/lib/pageInfo";
import { cursorHandlers, offsetHandlers } from "$houdini/runtime/lib/pagination";
import { CompiledFragmentKind } from "$houdini/runtime/lib/types";
import { derived, get } from "svelte/store";
import { getClient, initClient } from "../../client";
import { getSession } from "../../session";
import { FragmentStore } from "../fragment";
class BasePaginatedFragmentStore {
  paginated = true;
  paginationArtifact;
  name;
  kind = CompiledFragmentKind;
  artifact;
  constructor(config) {
    this.paginationArtifact = config.paginationArtifact;
    this.name = config.storeName;
    this.artifact = config.artifact;
  }
  queryVariables(getState) {
    const config = getCurrentConfig();
    const { targetType } = this.paginationArtifact.refetch || {};
    const typeConfig = config.types?.[targetType || ""];
    if (!typeConfig) {
      throw new Error(
        `Missing type refetch configuration for ${targetType}. For more information, see ${siteURL}/guides/pagination#paginated-fragments`
      );
    }
    let idVariables = {};
    const value = getState();
    if (typeConfig.resolve?.arguments) {
      idVariables = typeConfig.resolve.arguments?.(value) || {};
    } else {
      const keys = keyFieldsForType(config, targetType || "");
      idVariables = Object.fromEntries(keys.map((key) => [key, value[key]]));
    }
    return {
      ...idVariables
    };
  }
}
class FragmentStoreCursor extends BasePaginatedFragmentStore {
  get(initialValue) {
    const base = new FragmentStore({
      artifact: this.artifact,
      storeName: this.name
    });
    const store = base.get(initialValue);
    const paginationStore = getClient().observe({
      artifact: this.paginationArtifact,
      initialValue: store.initialValue
    });
    const handlers = this.storeHandlers(
      paginationStore,
      initialValue,
      () => get(store),
      () => store.variables
    );
    const subscribe = (run, invalidate) => {
      const combined = derived([store, paginationStore], ([$parent, $pagination]) => {
        return {
          ...$pagination,
          data: $parent,
          pageInfo: extractPageInfo($parent, this.paginationArtifact.refetch.path)
        };
      });
      return combined.subscribe(run, invalidate);
    };
    return {
      kind: CompiledFragmentKind,
      subscribe,
      fetch: handlers.fetch,
      loadNextPage: handlers.loadNextPage,
      loadPreviousPage: handlers.loadPreviousPage
    };
  }
  storeHandlers(observer, initialValue, getState, getVariables) {
    return cursorHandlers({
      getState,
      getVariables,
      artifact: this.paginationArtifact,
      fetchUpdate: async (args, updates) => {
        await initClient();
        return observer.send({
          session: await getSession(),
          ...args,
          variables: {
            ...args?.variables,
            ...this.queryVariables(getState)
          },
          cacheParams: {
            applyUpdates: updates,
            disableSubscriptions: true
          }
        });
      },
      fetch: async (args) => {
        await initClient();
        return await observer.send({
          session: await getSession(),
          ...args,
          variables: {
            ...args?.variables,
            ...this.queryVariables(getState)
          },
          cacheParams: {
            disableSubscriptions: true
          }
        });
      },
      getSession
    });
  }
}
class FragmentStoreOffset extends BasePaginatedFragmentStore {
  get(initialValue) {
    const base = new FragmentStore({
      artifact: this.artifact,
      storeName: this.name
    });
    const store = base.get(initialValue);
    const paginationStore = getClient().observe({
      artifact: this.paginationArtifact,
      initialValue: store.initialValue
    });
    const getState = () => get(store);
    const handlers = offsetHandlers({
      getState,
      getVariables: () => store.variables,
      artifact: this.paginationArtifact,
      fetch: async (args) => {
        return paginationStore.send({
          ...args,
          session: await getSession(),
          variables: {
            ...this.queryVariables(getState),
            ...args?.variables
          },
          cacheParams: {
            disableSubscriptions: true
          }
        });
      },
      fetchUpdate: async (args) => {
        await initClient();
        return paginationStore.send({
          session: await getSession(),
          ...args,
          variables: {
            ...this.queryVariables(getState),
            ...args?.variables
          },
          cacheParams: {
            disableSubscriptions: true,
            applyUpdates: ["append"]
          }
        });
      },
      getSession,
      storeName: this.name
    });
    const subscribe = (run, invalidate) => {
      const combined = derived([store, paginationStore], ([$parent, $pagination]) => {
        return {
          ...$pagination,
          data: $parent
        };
      });
      return combined.subscribe(run, invalidate);
    };
    return {
      kind: CompiledFragmentKind,
      data: derived(paginationStore, ($value) => $value.data),
      subscribe,
      fetch: handlers.fetch,
      loadNextPage: handlers.loadNextPage,
      fetching: derived(paginationStore, ($store) => $store.fetching)
    };
  }
}
export {
  FragmentStoreCursor,
  FragmentStoreOffset
};
