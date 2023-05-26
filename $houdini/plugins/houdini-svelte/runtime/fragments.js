function fragment(ref, store) {
  if (store.kind !== "HoudiniFragment") {
    throw new Error(`fragment can only take fragment documents. Found: ${store.kind}`);
  }
  const fragmentStore = store.get(ref);
  return {
    ...fragmentStore,
    artifact: store.artifact,
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
