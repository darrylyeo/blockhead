import type { GraphQLObject, FragmentArtifact, HoudiniFetchContext, GraphQLVariables } from '$houdini/runtime/lib/types';
import { fragmentKey } from '$houdini/runtime/lib/types';
import type { FragmentStoreInstance } from '../types';
export declare class FragmentStore<_Data extends GraphQLObject, _ReferenceType extends {}, _Input extends GraphQLVariables = GraphQLVariables> {
    artifact: FragmentArtifact;
    name: string;
    kind: "HoudiniFragment";
    protected context: HoudiniFetchContext | null;
    constructor({ artifact, storeName }: {
        artifact: FragmentArtifact;
        storeName: string;
    });
    get(initialValue: _Data | {
        [fragmentKey]: _ReferenceType;
    } | null): FragmentStoreInstance<_Data | null, _Input> & {
        initialValue: _Data | null;
    };
}
