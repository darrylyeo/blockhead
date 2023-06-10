/// <reference path="../../../../../houdini.d.ts" />
import type { Cache } from '../cache/cache';
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
export type ObserveParams<_Data extends GraphQLObject, _Artifact extends DocumentArtifact = DocumentArtifact, _Input extends GraphQLVariables = GraphQLVariables> = {
    artifact: _Artifact;
    enableCache?: boolean;
    cache?: Cache;
    initialValue?: _Data | null;
    initialVariables?: _Input;
    fetching?: boolean;
};
export declare class HoudiniClient {
    url: string;
    readonly plugins: ClientPlugin[];
    readonly throwOnError_operations: ThrowOnErrorOperations[];
    constructor({ url, fetchParams, plugins, pipeline, throwOnError, }: HoudiniClientConstructorArgs);
    observe<_Data extends GraphQLObject, _Input extends GraphQLVariables>({ enableCache, fetching, ...rest }: ObserveParams<_Data, DocumentArtifact, _Input>): DocumentStore<_Data, _Input>;
}
export declare function createPluginHooks(plugins: ClientPlugin[]): ClientHooks[];
