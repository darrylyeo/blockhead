import { SubscriptionArtifact } from '$houdini/runtime/lib/types';
import { Writable } from 'svelte/store';
import { BaseStore } from './store';
export declare class SubscriptionStore<_Data, _Input extends {}> extends BaseStore {
    artifact: SubscriptionArtifact;
    kind: import("$houdini/runtime").ArtifactKind;
    private store;
    private clearSubscription;
    private lastVariables;
    constructor({ artifact }: {
        artifact: SubscriptionArtifact;
    });
    subscribe(...args: Parameters<Writable<_Data | null>['subscribe']>): import("svelte/store").Unsubscriber;
    listen(variables?: _Input): Promise<void>;
    unlisten(): void;
}
