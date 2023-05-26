/// <reference path="../../../../../houdini.d.ts" />
import type { DocumentArtifact, GraphQLVariables, GraphQLObject, NestedList } from '../lib/types';
import type { ClientHooks, ClientPlugin } from './documentStore';
import { DocumentStore } from './documentStore';
import type { FetchParamFn, ThrowOnErrorOperations, ThrowOnErrorParams } from './plugins';
export { DocumentStore, type ClientPlugin, type SendParams } from './documentStore';
export { fetch, mutation, query, subscription } from './plugins';
export type HoudiniClientConstructorArgs = {
    url: string;
    fetchParams?: FetchParamFn;
    plugins?: NestedList<ClientPlugin>;
    pipeline?: NestedList<ClientPlugin>;
    throwOnError?: ThrowOnErrorParams;
};
export type ObserveParams<_Data extends GraphQLObject, _Artifact extends DocumentArtifact = DocumentArtifact> = {
    artifact: _Artifact;
    cache?: boolean;
    initialValue?: _Data | null;
    fetching?: boolean;
};
export declare class HoudiniClient {
    url: string;
    readonly plugins: ClientPlugin[];
    readonly throwOnError_operations: ThrowOnErrorOperations[];
    constructor({ url, fetchParams, plugins, pipeline, throwOnError, }: HoudiniClientConstructorArgs);
    observe<_Data extends GraphQLObject, _Input extends GraphQLVariables>({ artifact, cache, initialValue, fetching, }: ObserveParams<_Data>): DocumentStore<_Data, _Input>;
}
export declare function createPluginHooks(plugins: ClientPlugin[]): ClientHooks[];
