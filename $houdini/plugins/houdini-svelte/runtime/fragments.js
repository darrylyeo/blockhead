import * as log from "$houdini/runtime/lib/log";
import { ArtifactKind } from "$houdini/runtime/lib/types";
let hasWarned = false;
function fragment(ref, store) {
  const oldAPI = "kind" in (ref || {}) && Object.keys(ArtifactKind).includes(ref.kind);
  if (!hasWarned && oldAPI) {
    hasWarned = true;
    log.info(`${log.red(
      "\u26A0\uFE0F argument order for fragment() has changed. The graphql tag now goes second:"
    )}

export let prop

$: data = fragment(prop, graphql\`...\`)
`);
  }
  if (store.kind !== "HoudiniFragment") {
    throw new Error(`fragment can only take fragment documents. Found: ${store.kind}`);
  }
  const fragmentStore = store.get(ref);
  return {
    ...fragmentStore,
    data: { subscribe: fragmentStore.subscribe }
  };
}
function paginatedFragment(initialValue, store) {
  if (store.kind !== "HoudiniFragment") {
    throw new Error("paginatedFragment() must be passed a fragment document: " + store.kind);
  }
  if (!("paginated" in store)) {
    throw new Error("paginatedFragment() must be passed a fragment with @paginate");
  }
  return fragment(initialValue, store);
}
export {
  fragment,
  paginatedFragment
};
