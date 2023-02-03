import { derived, get } from "svelte/store";
import {
  QueryStore
} from "../query";
import { cursorHandlers } from "./cursor";
import { offsetHandlers } from "./offset";
import { nullPageInfo } from "./pageInfo";
class CursorPaginatedStore extends QueryStore {
  paginated = true;
  handlers;
  constructor(config) {
    super(config);
    this.handlers = cursorHandlers({
      artifact: this.artifact,
      fetch: super.fetch.bind(this),
      setFetching: this.setFetching.bind(this),
      queryVariables: this.currentVariables.bind(this),
      storeName: this.name,
      getValue: () => get(this.store).data,
      getConfig: () => this.getConfig()
    });
  }
  async fetch(args) {
    return this.handlers.fetch.call(this, args);
  }
  extraFields() {
    return {
      pageInfo: nullPageInfo()
    };
  }
  subscribe(run, invalidate) {
    const combined = derived(
      [{ subscribe: super.subscribe.bind(this) }, this.handlers.pageInfo],
      ([$parent, $pageInfo]) => ({
        ...$parent,
        pageInfo: $pageInfo
      })
    );
    return combined.subscribe(run, invalidate);
  }
}
class QueryStoreForwardCursor extends CursorPaginatedStore {
  async loadNextPage(args) {
    return this.handlers.loadNextPage(args);
  }
}
class QueryStoreBackwardCursor extends CursorPaginatedStore {
  async loadPreviousPage(args) {
    return this.handlers.loadPreviousPage(args);
  }
}
class QueryStoreOffset extends QueryStore {
  paginated = true;
  handlers;
  constructor(config) {
    super(config);
    this.handlers = offsetHandlers({
      artifact: this.artifact,
      fetch: super.fetch,
      getValue: () => get(this.store).data,
      setFetching: (...args) => this.setFetching(...args),
      queryVariables: () => this.currentVariables(),
      storeName: this.name,
      getConfig: () => this.getConfig()
    });
  }
  async loadNextPage(args) {
    return this.handlers.loadNextPage.call(this, args);
  }
  fetch(args) {
    return this.handlers.fetch.call(this, args);
  }
}
export {
  QueryStoreBackwardCursor,
  QueryStoreForwardCursor,
  QueryStoreOffset
};
