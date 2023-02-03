import {
  CompiledFragmentKind
} from "$houdini/runtime/lib/types";
import { writable } from "svelte/store";
import { BaseStore } from "./store";
class FragmentStore extends BaseStore {
  artifact;
  name;
  kind = CompiledFragmentKind;
  context = null;
  constructor({ artifact, storeName }) {
    super();
    this.artifact = artifact;
    this.name = storeName;
  }
  get(initialValue) {
    let store = writable(initialValue);
    return {
      kind: CompiledFragmentKind,
      subscribe: (...args) => {
        return store.subscribe(...args);
      },
      update: (val) => store?.set(val)
    };
  }
}
export {
  FragmentStore
};
