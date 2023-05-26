import cache from "$houdini/runtime/cache";
import { getCurrentConfig } from "$houdini/runtime/lib/config";
import { marshalInputs } from "$houdini/runtime/lib/scalars";
import { CompiledFragmentKind, fragmentKey } from "$houdini/runtime/lib/types";
import { derived } from "svelte/store";
import { isBrowser } from "../adapter";
import { BaseStore } from "./base";
class FragmentStore {
  artifact;
  name;
  kind = CompiledFragmentKind;
  context = null;
  constructor({ artifact, storeName }) {
    this.artifact = artifact;
    this.name = storeName;
  }
  get(initialValue) {
    const { variables, parent } = initialValue?.[fragmentKey]?.values?.[this.artifact.name] ?? {};
    const { loading } = initialValue?.[fragmentKey] ?? {};
    if (!loading && initialValue && fragmentKey in initialValue && (!variables || !parent) && isBrowser) {
      console.warn(
        `\u26A0\uFE0F Parent does not contain the information for this fragment. Something is wrong.
Please ensure that you have passed a record that has ${this.artifact.name} mixed into it.`
      );
    }
    let data = initialValue;
    if (loading || initialValue && parent && isBrowser) {
      data = cache.read({
        selection: this.artifact.selection,
        parent,
        variables,
        loading
      }).data;
    }
    const store = new BaseStore({
      artifact: this.artifact,
      initialValue: data
    });
    if (!loading && parent) {
      store.observer.send({ variables, setup: true, stuff: { parentID: parent } });
    }
    return {
      initialValue: data,
      variables: marshalInputs({
        artifact: this.artifact,
        input: variables,
        config: getCurrentConfig(),
        rootType: this.artifact.rootType
      }),
      kind: CompiledFragmentKind,
      subscribe: derived([store], ([$store]) => $store.data).subscribe
    };
  }
}
export {
  FragmentStore
};
