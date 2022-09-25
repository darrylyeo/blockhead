export var CachePolicy;
(function (CachePolicy) {
    CachePolicy["CacheOrNetwork"] = "CacheOrNetwork";
    CachePolicy["CacheOnly"] = "CacheOnly";
    CachePolicy["NetworkOnly"] = "NetworkOnly";
    CachePolicy["CacheAndNetwork"] = "CacheAndNetwork";
})(CachePolicy || (CachePolicy = {}));
export var ArtifactKind;
(function (ArtifactKind) {
    ArtifactKind["Query"] = "HoudiniQuery";
    ArtifactKind["Subcription"] = "HoudiniSubscription";
    ArtifactKind["Mutation"] = "HoudiniMutation";
    ArtifactKind["Fragment"] = "HoudiniFragment";
})(ArtifactKind || (ArtifactKind = {}));
export const CompiledFragmentKind = ArtifactKind.Fragment;
export const CompiledMutationKind = ArtifactKind.Mutation;
export const CompiledQueryKind = ArtifactKind.Query;
export const CompiledSubscriptionKind = ArtifactKind.Subcription;
export var RefetchUpdateMode;
(function (RefetchUpdateMode) {
    RefetchUpdateMode["append"] = "append";
    RefetchUpdateMode["prepend"] = "prepend";
    RefetchUpdateMode["replace"] = "replace";
})(RefetchUpdateMode || (RefetchUpdateMode = {}));
export var DataSource;
(function (DataSource) {
    /**
     * from the browser cache
     */
    DataSource["Cache"] = "cache";
    /**
     * from a browser side `fetch`
     */
    DataSource["Network"] = "network";
    /**
     * from a server side `fetch`
     */
    DataSource["Ssr"] = "ssr";
})(DataSource || (DataSource = {}));
