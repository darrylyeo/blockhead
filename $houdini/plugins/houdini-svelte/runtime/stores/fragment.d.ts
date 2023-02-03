import { GraphQLObject, FragmentArtifact, HoudiniFetchContext } from '$houdini/runtime/lib/types';
import { BaseStore } from './store';
export declare class FragmentStore<_Data extends GraphQLObject, _Input = {}, _ExtraFields = {}> extends BaseStore {
    artifact: FragmentArtifact;
    name: string;
    kind: import("$houdini/runtime/lib/types").ArtifactKind;
    protected context: HoudiniFetchContext | null;
    constructor({ artifact, storeName }: {
        artifact: FragmentArtifact;
        storeName: string;
    });
    get(initialValue: _Data | null): {
        kind: import("$houdini/runtime/lib/types").ArtifactKind;
        subscribe: (run: import("svelte/store").Subscriber<(_Data | null) & _ExtraFields>, invalidate?: ((value?: ((_Data | null) & _ExtraFields) | undefined) => void) | undefined) => import("svelte/store").Unsubscriber;
        update: (val: (_Data | null) & _ExtraFields) => void;
    };
}
