import type { MutationArtifact, GraphQLObject, QueryResult, GraphQLVariables } from '$houdini/runtime/lib/types';
import type { RequestEvent } from '@sveltejs/kit';
import { BaseStore } from './base';
export declare class MutationStore<_Data extends GraphQLObject, _Input extends GraphQLVariables, _Optimistic extends GraphQLObject> extends BaseStore<_Data, _Input, MutationArtifact> {
    kind: "HoudiniMutation";
    mutate(variables: _Input, { metadata, fetch, event, ...mutationConfig }?: {
        metadata?: App.Metadata;
        fetch?: typeof globalThis.fetch;
        event?: RequestEvent;
    } & MutationConfig<_Data, _Input, _Optimistic>): Promise<QueryResult<_Data, _Input>>;
}
export type MutationConfig<_Result, _Input, _Optimistic> = {
    optimisticResponse?: _Optimistic;
};
