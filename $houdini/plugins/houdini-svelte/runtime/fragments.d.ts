import type { Fragment, FragmentArtifact } from "$houdini/runtime/lib/types";
import type { Readable } from "svelte/store";
import type { FragmentStore } from "./stores";
import type { FragmentStorePaginated } from "./stores/pagination/fragment";

export declare function fragment<_Fragment extends Fragment<any>>(ref: _Fragment, fragment: FragmentStore<_Fragment["shape"], {}>): Readable<Exclude<_Fragment["shape"], undefined>> & {
    data: Readable<_Fragment>;
    artifact: FragmentArtifact;
};

export declare function fragment<_Fragment extends Fragment<any>>(
    ref: _Fragment | null | undefined,
    fragment: FragmentStore<_Fragment["shape"], {}>
): Readable<Exclude<_Fragment["shape"], undefined> | null> & {
    data: Readable<_Fragment | null>;
    artifact: FragmentArtifact;
};

export declare function paginatedFragment<_Fragment extends Fragment<any>>(
    initialValue: _Fragment | null | undefined,
    document: FragmentStore<_Fragment["shape"], {}>
): FragmentStorePaginated<_Fragment["shape"], {}>;

export declare function paginatedFragment<_Fragment extends Fragment<any>>(initialValue: _Fragment, document: FragmentStore<_Fragment["shape"], {}>): FragmentStorePaginated<_Fragment["shape"], {}>;