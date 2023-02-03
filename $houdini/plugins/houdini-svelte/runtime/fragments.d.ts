import { Fragment } from "$houdini/runtime/lib/types";
import { Readable } from "svelte/store";
import { FragmentStore } from "./stores";
import type { FragmentStorePaginated } from "./stores/pagination/fragment";

export declare function fragment<_Fragment extends Fragment<any>>(ref: _Fragment, fragment: FragmentStore<_Fragment["shape"]>): Readable<NonNullable<_Fragment["shape"]>> & {
    data: Readable<_Fragment>;
};

export declare function fragment<_Fragment extends Fragment<any>>(ref: _Fragment | null, fragment: FragmentStore<_Fragment["shape"]>): Readable<NonNullable<_Fragment["shape"]> | null> & {
    data: Readable<_Fragment | null>;
};

export declare function paginatedFragment<_Fragment extends Fragment<any>>(
    initialValue: _Fragment | null,
    document: FragmentStore<_Fragment["shape"]>
): FragmentStorePaginated<_Fragment["shape"], {}>;

export declare function paginatedFragment<_Fragment extends Fragment<any>>(initialValue: _Fragment, document: FragmentStore<_Fragment["shape"]>): FragmentStorePaginated<_Fragment["shape"], {}>;