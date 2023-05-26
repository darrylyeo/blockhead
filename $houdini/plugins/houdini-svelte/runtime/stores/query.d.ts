import type { FetchContext } from '$houdini/runtime/client/plugins/fetch';
import type { CachePolicies, GraphQLVariables, GraphQLObject, MutationArtifact, QueryArtifact, QueryResult } from '$houdini/runtime/lib/types';
import type { PluginArtifactData } from '../../plugin/artifactData';
import type { ClientFetchParams, LoadEventFetchParams, QueryStoreFetchParams, RequestEventFetchParams } from '../types';
import { BaseStore } from './base';
export declare class QueryStore<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends BaseStore<_Data, _Input, QueryArtifact> {
    variables: boolean;
    kind: "HoudiniQuery";
    protected loadPending: boolean;
    protected storeName: string;
    constructor({ artifact, storeName, variables }: StoreConfig<_Data, _Input, QueryArtifact>);
    /**
     * Fetch the data from the server
     */
    fetch(params?: RequestEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: LoadEventFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: ClientFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
    fetch(params?: QueryStoreFetchParams<_Data, _Input>): Promise<QueryResult<_Data, _Input>>;
}
export type StoreConfig<_Data extends GraphQLObject, _Input, _Artifact> = {
    artifact: _Artifact & {
        pluginData: {
            'houdini-svelte': PluginArtifactData;
        };
    };
    storeName: string;
    variables: boolean;
};
export declare function fetchParams<_Data extends GraphQLObject, _Input>(artifact: QueryArtifact | MutationArtifact, storeName: string, params?: QueryStoreFetchParams<_Data, _Input>): Promise<{
    context: FetchContext;
    policy: CachePolicies | undefined;
    params: QueryStoreFetchParams<_Data, _Input>;
}>;
