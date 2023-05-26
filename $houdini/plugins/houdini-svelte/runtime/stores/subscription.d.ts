import type { GraphQLVariables, QueryResult, SubscriptionArtifact } from '$houdini/runtime/lib/types';
import type { GraphQLObject } from 'houdini';
import { type Subscriber, type Writable } from 'svelte/store';
import { BaseStore } from './base';
export declare class SubscriptionStore<_Data extends GraphQLObject, _Input extends GraphQLVariables> extends BaseStore<_Data, _Input, SubscriptionArtifact> {
    kind: "HoudiniSubscription";
    fetchingStore: Writable<boolean>;
    constructor({ artifact }: {
        artifact: SubscriptionArtifact;
    });
    listen(variables?: _Input, args?: {
        metadata: App.Metadata;
    }): Promise<void>;
    unlisten(): Promise<void>;
    subscribe(run: Subscriber<QueryResult<_Data, _Input>>, invalidate?: ((value?: QueryResult<_Data, _Input> | undefined) => void) | undefined): () => void;
}
