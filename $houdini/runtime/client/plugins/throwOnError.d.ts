import type { QueryResult } from '../../lib';
import type { ClientPlugin, ClientPluginContext } from '../documentStore';
export type ThrowOnErrorOperations = 'all' | 'query' | 'mutation' | 'subscription';
export type ThrowOnErrorParams = {
    operations: ThrowOnErrorOperations[];
    error?: (errors: NonNullable<QueryResult<any, any>['errors']>, ctx: ClientPluginContext) => unknown;
};
export declare const throwOnError: ({ operations, error }: ThrowOnErrorParams) => ClientPlugin;
