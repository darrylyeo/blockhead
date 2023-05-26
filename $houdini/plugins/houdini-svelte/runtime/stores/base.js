import { DocumentStore } from "$houdini/runtime/client";
import { get } from "svelte/store";
import { isBrowser } from "../adapter";
import { getClient, initClient } from "../client";
class BaseStore {
  #params;
  get artifact() {
    return this.#params.artifact;
  }
  get name() {
    return this.artifact.name;
  }
  #store;
  #unsubscribe = null;
  constructor(params) {
    if (typeof params.initialize === "undefined") {
      params.initialize = true;
    }
    this.#store = new DocumentStore({
      artifact: params.artifact,
      client: null,
      fetching: params.fetching,
      initialValue: params.initialValue
    });
    this.#params = params;
  }
  #observer = null;
  get observer() {
    if (this.#observer) {
      return this.#observer;
    }
    this.#observer = getClient().observe(this.#params);
    return this.#observer;
  }
  subscribe(...args) {
    const bubbleUp = this.#store.subscribe(...args);
    if (isBrowser && (this.#subscriberCount === 0 || !this.#unsubscribe)) {
      this.setup();
    }
    this.#subscriberCount = (this.#subscriberCount ?? 0) + 1;
    return () => {
      this.#subscriberCount--;
      if (this.#subscriberCount <= 0) {
        this.#unsubscribe?.();
        this.#unsubscribe = null;
        bubbleUp();
      }
    };
  }
  #subscriberCount = 0;
  setup(init = true) {
    let initPromise = Promise.resolve();
    try {
      getClient();
    } catch {
      initPromise = initClient();
    }
    initPromise.then(() => {
      if (this.#unsubscribe) {
        return;
      }
      this.#unsubscribe = this.observer.subscribe((value) => {
        this.#store.set(value);
      });
      if (init && this.#params.initialize) {
        return this.observer.send({
          setup: true,
          variables: get(this.observer).variables
        });
      }
    });
  }
}
export {
  BaseStore
};
