import { keyFieldsForType, getCurrentConfig } from "$houdini/runtime/lib/config";
import { siteURL } from "$houdini/runtime/lib/constants";
import {
  CompiledFragmentKind
} from "$houdini/runtime/lib/types";
import { derived, get, writable } from "svelte/store";
import { BaseStore } from "../store";
import { cursorHandlers } from "./cursor";
import { offsetHandlers } from "./offset";
import { nullPageInfo } from "./pageInfo";
class BasePaginatedFragmentStore extends BaseStore {
  paginated = true;
  paginationArtifact;
  name;
  kind = CompiledFragmentKind;
  constructor(config) {
    super();
    this.paginationArtifact = config.paginationArtifact;
    this.name = config.storeName;
  }
  async queryVariables(store) {
    const config = await getCurrentConfig();
    const { targetType } = this.paginationArtifact.refetch || {};
    const typeConfig = config.types?.[targetType || ""];
    if (!typeConfig) {
      throw new Error(
        `Missing type refetch configuration for ${targetType}. For more information, see ${siteURL}/guides/pagination#paginated-fragments`
      );
    }
    let idVariables = {};
    const value = get(store).data;
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
    const store = writable({
      data: initialValue,
      fetching: false,
      pageInfo: nullPageInfo()
    });
    const loading = writable(false);
    const handlers = this.storeHandlers(store, loading.set);
    const subscribe = (run, invalidate) => {
      const combined = derived(
        [store, handlers.pageInfo],
        ([$parent, $pageInfo]) => ({
          ...$parent,
          pageInfo: $pageInfo
        })
      );
      return combined.subscribe(run, invalidate);
    };
    return {
      kind: CompiledFragmentKind,
      data: store,
      subscribe,
      loading,
      fetch: handlers.fetch,
      pageInfo: handlers.pageInfo
    };
  }
  storeHandlers(store, setFetching) {
    return cursorHandlers({
      artifact: this.paginationArtifact,
      fetch: async () => {
        return {};
      },
      getValue: () => get(store).data,
      queryVariables: () => this.queryVariables(store),
      setFetching,
      storeName: this.name,
      getConfig: () => this.getConfig()
    });
  }
}
class FragmentStoreForwardCursor extends FragmentStoreCursor {
  get(initialValue) {
    const parent = super.get(initialValue);
    const handlers = this.storeHandlers(
      parent,
      parent.loading.set
    );
    return {
      ...parent,
      loadNextPage: handlers.loadNextPage
    };
  }
}
class FragmentStoreBackwardCursor extends FragmentStoreCursor {
  get(initialValue) {
    const parent = super.get(initialValue);
    const handlers = this.storeHandlers(
      parent,
      (fetching) => parent.data.update((p) => ({ ...p, fetching }))
    );
    return {
      ...parent,
      loadPreviousPage: handlers.loadPreviousPage
    };
  }
}
class FragmentStoreOffset extends BasePaginatedFragmentStore {
  get(initialValue) {
    const parent = writable({
      data: initialValue,
      fetching: false
    });
    const handlers = offsetHandlers({
      artifact: this.paginationArtifact,
      fetch: async () => ({}),
      getValue: () => get(parent).data,
      setFetching: (fetching) => parent.update((p) => ({ ...p, fetching })),
      queryVariables: () => this.queryVariables({ subscribe: parent.subscribe }),
      storeName: this.name,
      getConfig: () => this.getConfig()
    });
    return {
      ...parent,
      kind: CompiledFragmentKind,
      fetch: handlers.fetch,
      loadNextPage: handlers.loadNextPage
    };
  }
}
export {
  FragmentStoreBackwardCursor,
  FragmentStoreForwardCursor,
  FragmentStoreOffset
};
