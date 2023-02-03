var CachePolicy = /* @__PURE__ */ ((CachePolicy2) => {
  CachePolicy2["CacheOrNetwork"] = "CacheOrNetwork";
  CachePolicy2["CacheOnly"] = "CacheOnly";
  CachePolicy2["NetworkOnly"] = "NetworkOnly";
  CachePolicy2["CacheAndNetwork"] = "CacheAndNetwork";
  return CachePolicy2;
})(CachePolicy || {});
var ArtifactKind = /* @__PURE__ */ ((ArtifactKind2) => {
  ArtifactKind2["Query"] = "HoudiniQuery";
  ArtifactKind2["Subscription"] = "HoudiniSubscription";
  ArtifactKind2["Mutation"] = "HoudiniMutation";
  ArtifactKind2["Fragment"] = "HoudiniFragment";
  return ArtifactKind2;
})(ArtifactKind || {});
const CompiledFragmentKind = "HoudiniFragment" /* Fragment */;
const CompiledMutationKind = "HoudiniMutation" /* Mutation */;
const CompiledQueryKind = "HoudiniQuery" /* Query */;
const CompiledSubscriptionKind = "HoudiniSubscription" /* Subscription */;
var RefetchUpdateMode = /* @__PURE__ */ ((RefetchUpdateMode2) => {
  RefetchUpdateMode2["append"] = "append";
  RefetchUpdateMode2["prepend"] = "prepend";
  RefetchUpdateMode2["replace"] = "replace";
  return RefetchUpdateMode2;
})(RefetchUpdateMode || {});
var DataSource = /* @__PURE__ */ ((DataSource2) => {
  DataSource2["Cache"] = "cache";
  DataSource2["Network"] = "network";
  DataSource2["Ssr"] = "ssr";
  return DataSource2;
})(DataSource || {});
export {
  ArtifactKind,
  CachePolicy,
  CompiledFragmentKind,
  CompiledMutationKind,
  CompiledQueryKind,
  CompiledSubscriptionKind,
  DataSource,
  RefetchUpdateMode
};
