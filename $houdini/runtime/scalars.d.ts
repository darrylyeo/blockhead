import type { Config } from 'houdini-common';
import { MutationArtifact, QueryArtifact, SubscriptionArtifact, SubscriptionSelection } from './types';
export declare function marshalInputs<T>({ artifact, config, input, rootType, }: {
    artifact: QueryArtifact | MutationArtifact | SubscriptionArtifact;
    config: Config;
    input: unknown;
    rootType?: string;
}): {} | null | undefined;
export declare function unmarshalSelection(config: Config, selection: SubscriptionSelection, data: unknown): {} | null | undefined;
export declare function isScalar(config: Config, type: string): boolean;
