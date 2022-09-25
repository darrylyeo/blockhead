import { ConfigFile } from './config';
import { MutationArtifact, QueryArtifact, SubscriptionArtifact, SubscriptionSelection } from './types';
export declare function marshalSelection({ selection, data, }: {
    selection: SubscriptionSelection;
    data: unknown;
}): Promise<{} | null | undefined>;
export declare function marshalInputs<T>({ artifact, input, rootType, }: {
    artifact: QueryArtifact | MutationArtifact | SubscriptionArtifact;
    input: unknown;
    rootType?: string;
}): Promise<{} | null | undefined>;
export declare function unmarshalSelection(config: ConfigFile, selection: SubscriptionSelection, data: unknown): {} | null | undefined;
export declare function isScalar(config: ConfigFile, type: string): boolean;
