import { Readable } from 'svelte/store';
import { Operation, GraphQLTagResult, Fragment } from './types';
import { QueryResponse } from './query';
import { PageInfo } from './utils';
export declare function paginatedQuery<_Query extends Operation<any, any>>(document: GraphQLTagResult): QueryResponse<_Query['result'], _Query['input']> & PaginatedHandlers<_Query['input']>;
export declare function paginatedFragment<_Fragment extends Fragment<any>>(document: GraphQLTagResult, initialValue: _Fragment): {
    data: Readable<_Fragment['shape']>;
} & PaginatedHandlers<null>;
declare type PaginatedHandlers<_Input> = {
    loadNextPage(pageCount?: number, after?: string | number): Promise<void>;
    loadPreviousPage(pageCount?: number, before?: string): Promise<void>;
    loading: Readable<boolean>;
    pageInfo: Readable<PageInfo>;
    refetch: (vars: _Input) => Promise<void>;
};
export {};
