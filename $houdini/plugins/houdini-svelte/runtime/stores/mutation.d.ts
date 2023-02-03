import type { MutationArtifact } from '$houdini/runtime/lib/types';
import { GraphQLObject } from '$houdini/runtime/lib/types';
import { Readable } from 'svelte/store';
import { BaseStore } from './store';
export declare class MutationStore<_Data extends GraphQLObject, _Input extends {}, _Optimistic extends GraphQLObject> extends BaseStore {
    artifact: MutationArtifact;
    kind: "HoudiniMutation";
    private store;
    protected setFetching(fetching: boolean): void;
    constructor({ artifact }: {
        artifact: MutationArtifact;
    });
    mutate(variables: _Input, { metadata, fetch, ...mutationConfig }?: {
        metadata?: App.Metadata;
        fetch?: typeof globalThis.fetch;
    } & MutationConfig<_Data, _Input, _Optimistic>): Promise<_Data>;
    subscribe(...args: Parameters<Readable<MutationResult<_Data, _Input>>['subscribe']>): import("svelte/store").Unsubscriber;
    private get initialState();
}
export type MutationConfig<_Result, _Input, _Optimistic> = {
    optimisticResponse?: _Optimistic;
};
export type MutationResult<_Data, _Input> = {
    data: _Data | null;
    errors: {
        message: string;
    }[] | null;
    fetching: boolean;
    isOptimisticResponse: boolean;
    variables: _Input | null;
};
