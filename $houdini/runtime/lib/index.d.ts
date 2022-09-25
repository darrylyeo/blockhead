import { QueryStore } from '../stores';
export * from './network';
export * from './config';
export { errorsToGraphQLLayout } from './errors';
export * from './types';
export * as log from './log';
export * from './deepEquals';
declare type LoadResult = Promise<{
    [key: string]: QueryStore<any, {}>;
}>;
declare type LoadAllInput = LoadResult | Record<string, LoadResult>;
export declare function loadAll(...loads: LoadAllInput[]): Promise<Record<string, QueryStore<any, {}>>>;
