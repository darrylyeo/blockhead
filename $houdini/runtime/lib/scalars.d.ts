import { ConfigFile } from './config';
import { MutationArtifact, QueryArtifact, SubscriptionArtifact, SubscriptionSelection } from './types';
export declare function marshalSelection({ selection, data, }: {
    selection: SubscriptionSelection;
    data: any;
}): Promise<{} | null | undefined>;
export declare function marshalInputs<T>({ artifact, input, rootType, }: {
    artifact: QueryArtifact | MutationArtifact | SubscriptionArtifact;
    input: unknown;
    rootType?: string;
}): Promise<{} | null | undefined>;
export declare function unmarshalSelection(config: ConfigFile, selection: SubscriptionSelection, data: any): {} | null | undefined;
export declare function isScalar(config: ConfigFile, type: string): boolean;
export declare function parseScalar(config: ConfigFile, type: string, value: string): string | number | boolean;
