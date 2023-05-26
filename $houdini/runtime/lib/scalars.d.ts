import type { ConfigFile } from './config';
import type { FragmentArtifact, MutationArtifact, QueryArtifact, SubscriptionArtifact, SubscriptionSelection } from './types';
export declare function marshalSelection({ selection, data, }: {
    selection: SubscriptionSelection;
    data: any;
}): Promise<{} | null | undefined>;
export declare function marshalInputs<T>({ artifact, input, config, rootType, }: {
    artifact: QueryArtifact | MutationArtifact | SubscriptionArtifact | FragmentArtifact;
    input: unknown;
    rootType?: string;
    config: ConfigFile;
}): {} | null | undefined;
export declare function isScalar(config: ConfigFile, type: string): boolean;
export declare function parseScalar(config: ConfigFile, type: string, value?: string): string | number | boolean | undefined;
