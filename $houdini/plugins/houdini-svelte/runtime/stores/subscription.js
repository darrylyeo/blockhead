import { getCache } from "$houdini/runtime";
import { deepEquals } from "$houdini/runtime/lib/deepEquals";
import { marshalInputs, unmarshalSelection } from "$houdini/runtime/lib/scalars";
import { CompiledSubscriptionKind } from "$houdini/runtime/lib/types";
import { writable } from "svelte/store";
import { isBrowser } from "../adapter";
import { getCurrentClient } from "../network";
import { BaseStore } from "./store";
class SubscriptionStore extends BaseStore {
  artifact;
  kind = CompiledSubscriptionKind;
  store;
  clearSubscription = () => {
  };
  lastVariables = null;
  constructor({ artifact }) {
    super();
    this.artifact = artifact;
    this.store = writable(null);
  }
  subscribe(...args) {
    return this.store?.subscribe(...args);
  }
  async listen(variables) {
    const { raw: text, selection } = this.artifact.default || this.artifact;
    if (!isBrowser) {
      return;
    }
    const config = await this.getConfig();
    const env = await getCurrentClient();
    if (!env.socket) {
      throw new Error(
        "The current Houdini Client is not configured to handle subscriptions. Make sure you passed a socketClient to HoudiniClient constructor."
      );
    }
    const marshaledVariables = await marshalInputs({
      input: variables || {},
      artifact: this.artifact
    });
    if (deepEquals(this.lastVariables, marshaledVariables)) {
      return;
    }
    this.clearSubscription();
    this.lastVariables = marshaledVariables;
    this.clearSubscription = env.socket.subscribe(
      {
        query: text,
        variables: marshaledVariables
      },
      {
        next: ({ data, errors }) => {
          if (errors) {
            throw errors;
          }
          if (data) {
            getCache().write({
              selection,
              data,
              variables: marshaledVariables
            });
            this.store.set(
              unmarshalSelection(config, this.artifact.selection, data)
            );
          }
        },
        error(data) {
        },
        complete() {
        }
      }
    );
  }
  unlisten() {
    this.clearSubscription();
    this.clearSubscription = () => {
    };
    this.lastVariables = null;
  }
}
export {
  SubscriptionStore
};
