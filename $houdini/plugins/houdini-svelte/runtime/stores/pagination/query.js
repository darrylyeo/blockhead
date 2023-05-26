import { extractPageInfo } from "$houdini/runtime/lib/pageInfo";
import { cursorHandlers, offsetHandlers } from "$houdini/runtime/lib/pagination";
import { get, derived } from "svelte/store";
import { getClient, initClient } from "../../client";
import { getSession } from "../../session";
import { QueryStore } from "../query";
class QueryStoreCursor extends QueryStore {
  paginated = true;
  constructor(config) {
    super(config);
  }
  #_handlers = null;
  async #handlers() {
    if (this.#_handlers) {
      return this.#_handlers;
    }
    await initClient();
    const paginationObserver = getClient().observe({
      artifact: this.artifact
    });
    this.#_handlers = cursorHandlers({
      artifact: this.artifact,
      getState: () => get(this.observer).data,
      getVariables: () => get(this.observer).variables,
      fetch: super.fetch.bind(this),
      getSession,
      fetchUpdate: async (args, updates) => {
        return paginationObserver.send({
          ...args,
          cacheParams: {
            applyUpdates: updates,
            disableSubscriptions: true,
            ...args?.cacheParams
          }
        });
      }
    });
    return this.#_handlers;
  }
  async fetch(args) {
    const handlers = await this.#handlers();
    return await handlers.fetch.call(this, args);
  }
  async loadPreviousPage(args) {
    const handlers = await this.#handlers();
    return await handlers.loadPreviousPage(args);
  }
  async loadNextPage(args) {
    const handlers = await this.#handlers();
    return await handlers.loadNextPage(args);
  }
  subscribe(run, invalidate) {
    const combined = derived([{ subscribe: super.subscribe.bind(this) }], ([$parent]) => {
      return {
        ...$parent,
        pageInfo: extractPageInfo($parent.data, this.artifact.refetch.path)
      };
    });
    return combined.subscribe(run, invalidate);
  }
}
class QueryStoreOffset extends QueryStore {
  paginated = true;
  async loadNextPage(args) {
    const handlers = await this.#handlers();
    return await handlers.loadNextPage.call(this, args);
  }
  async fetch(args) {
    const handlers = await this.#handlers();
    return await handlers.fetch.call(this, args);
  }
  #_handlers = null;
  async #handlers() {
    if (this.#_handlers) {
      return this.#_handlers;
    }
    await initClient();
    const paginationObserver = getClient().observe({
      artifact: this.artifact
    });
    this.#_handlers = offsetHandlers({
      artifact: this.artifact,
      storeName: this.name,
      fetch: super.fetch,
      getState: () => get(this.observer).data,
      getVariables: () => get(this.observer).variables,
      getSession,
      fetchUpdate: async (args) => {
        await initClient();
        return paginationObserver.send({
          ...args,
          variables: {
            ...args?.variables
          },
          cacheParams: {
            applyUpdates: ["append"]
          }
        });
      }
    });
    return this.#_handlers;
  }
}
export {
  QueryStoreCursor,
  QueryStoreOffset
};
