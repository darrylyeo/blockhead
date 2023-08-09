import type { QueryStore } from './stores';
export * from './adapter';
export * from './stores';
export * from './fragments';
export * from './session';
export * from './types';
type LoadResult = Promise<{
    [key: string]: QueryStore<any, {}>;
}>;
type LoadAllInput = LoadResult | Record<string, LoadResult>;
type ValueOf<T extends Record<PropertyKey, unknown>> = T[keyof T];
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type InferLoadResult<T extends LoadAllInput> = T extends Record<infer Key, infer Res extends LoadResult> ? {
    [K in Key]: ValueOf<Awaited<Res>>;
} : T extends LoadResult ? Awaited<T> : never;
export declare function loadAll<L extends LoadAllInput, Loads extends L[]>(...loads: Loads): Promise<UnionToIntersection<{
    [K in keyof Loads]: InferLoadResult<Loads[K]>;
}[number]>>;
