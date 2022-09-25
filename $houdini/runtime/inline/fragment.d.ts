import { Readable } from 'svelte/store';
import { Fragment, GraphQLTagResult } from '../lib/types';
import type { FragmentStorePaginated } from '../stores/pagination/fragment';
export declare function fragment<_Fragment extends Fragment<any>>(ref: _Fragment, fragment: GraphQLTagResult): Readable<NonNullable<_Fragment['shape']>> & {
    data: Readable<_Fragment>;
};
export declare function fragment<_Fragment extends Fragment<any>>(ref: _Fragment | null, fragment: GraphQLTagResult): Readable<NonNullable<_Fragment['shape']> | null> & {
    data: Readable<_Fragment | null>;
};
export declare function paginatedFragment<_Fragment extends Fragment<any>>(initialValue: _Fragment | null, document: GraphQLTagResult): FragmentStorePaginated<_Fragment['shape'], {}>;
export declare function paginatedFragment<_Fragment extends Fragment<any>>(initialValue: _Fragment, document: GraphQLTagResult): FragmentStorePaginated<_Fragment['shape'], {}>;
