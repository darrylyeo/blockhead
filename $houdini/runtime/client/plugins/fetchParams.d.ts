import type { DocumentArtifact } from '../../lib/types';
import type { ClientPlugin, ClientPluginContext } from '../documentStore';
export type FetchParamFn = (ctx: FetchParamsInput) => Required<ClientPluginContext>['fetchParams'];
export declare const fetchParams: (fn?: FetchParamFn) => ClientPlugin;
export type FetchParamsInput = Pick<ClientPluginContext, 'config' | 'policy' | 'variables' | 'metadata' | 'session' | 'stuff'> & {
    text: string;
    hash: string;
    document: DocumentArtifact;
};
