import type { LoadEvent } from '@sveltejs/kit';
import type { QueryStore, MutationStore, SubscriptionStore, FragmentStore } from '../stores';
export type { ConfigFile } from './config';
export declare enum CachePolicy {
    CacheOrNetwork = "CacheOrNetwork",
    CacheOnly = "CacheOnly",
    NetworkOnly = "NetworkOnly",
    CacheAndNetwork = "CacheAndNetwork"
}
export declare type Fragment<_Result> = {
    readonly shape?: _Result;
};
export declare type Operation<_Result, _Input> = {
    readonly result: _Result;
    readonly input: _Input;
};
export declare type Maybe<T> = T | null | undefined;
export declare type DocumentArtifact = FragmentArtifact | QueryArtifact | MutationArtifact | SubscriptionArtifact;
export declare enum ArtifactKind {
    Query = "HoudiniQuery",
    Subcription = "HoudiniSubscription",
    Mutation = "HoudiniMutation",
    Fragment = "HoudiniFragment"
}
export declare const CompiledFragmentKind = ArtifactKind.Fragment;
export declare const CompiledMutationKind = ArtifactKind.Mutation;
export declare const CompiledQueryKind = ArtifactKind.Query;
export declare const CompiledSubscriptionKind = ArtifactKind.Subcription;
export declare type CompiledDocumentKind = ArtifactKind;
export declare type QueryArtifact = BaseCompiledDocument & {
    kind: ArtifactKind.Query;
    policy?: CachePolicy;
    partial?: boolean;
};
export declare type MutationArtifact = BaseCompiledDocument & {
    kind: ArtifactKind.Mutation;
};
export declare type FragmentArtifact = BaseCompiledDocument & {
    kind: ArtifactKind.Fragment;
};
export declare type SubscriptionArtifact = BaseCompiledDocument & {
    kind: ArtifactKind.Subcription;
};
export declare enum RefetchUpdateMode {
    append = "append",
    prepend = "prepend",
    replace = "replace"
}
export declare type InputObject = {
    fields: Record<string, string>;
    types: Record<string, Record<string, string>>;
};
export declare type BaseCompiledDocument = {
    name: string;
    raw: string;
    hash: string;
    selection: SubscriptionSelection;
    rootType: string;
    input?: InputObject;
    refetch?: {
        update: RefetchUpdateMode;
        path: string[];
        method: 'cursor' | 'offset';
        pageSize: number;
        start?: string | number;
        embedded: boolean;
        targetType: string;
        paginated: boolean;
        direction?: 'forward' | 'backwards';
    };
};
export declare type GraphQLTagResult = QueryStore<any, any> | FragmentStore<any> | MutationStore<any, any, any> | SubscriptionStore<any, any>;
export declare type HoudiniFetchContext = {
    variables: () => {};
};
declare type Filter = {
    [key: string]: string | boolean | number;
};
export declare type ListWhen = {
    must?: Filter;
    must_not?: Filter;
};
export declare enum DataSource {
    /**
     * from the browser cache
     */
    Cache = "cache",
    /**
     * from a browser side `fetch`
     */
    Network = "network",
    /**
     * from a server side `fetch`
     */
    Ssr = "ssr"
}
export declare type MutationOperation = {
    action: 'insert' | 'remove' | 'delete' | 'toggle';
    list?: string;
    type?: string;
    parentID?: {
        kind: string;
        value: string;
    };
    position?: 'first' | 'last';
    when?: ListWhen;
};
export declare type GraphQLObject = {
    [key: string]: GraphQLValue;
};
export declare type GraphQLValue = number | string | boolean | null | GraphQLObject | GraphQLValue[] | undefined;
export declare type SubscriptionSelection = {
    [field: string]: {
        type: string;
        nullable?: boolean;
        keyRaw: string;
        operations?: MutationOperation[];
        list?: {
            name: string;
            connection: boolean;
            type: string;
        };
        update?: RefetchUpdateMode;
        filters?: {
            [key: string]: {
                kind: 'Boolean' | 'String' | 'Float' | 'Int' | 'Variable';
                value: string | number | boolean;
            };
        };
        fields?: SubscriptionSelection;
        abstract?: boolean;
    };
};
export declare type SubscriptionSpec = {
    rootType: string;
    selection: SubscriptionSelection;
    set: (data: any) => void;
    parentID?: string;
    variables?: () => any;
};
export declare type VariableFunction<_Params extends Record<string, string>, _Input> = (event: LoadEvent<_Params>) => _Input | Promise<_Input>;
export declare type AfterLoadFunction<_Params extends Record<string, string>, _Data, _Input, _ReturnType extends Record<string, any>> = (args: {
    event: LoadEvent<_Params>;
    data: _Data;
    input: _Input;
}) => _ReturnType;
export declare type BeforeLoadFunction<_Params extends Record<string, string>, _ReturnType extends Record<string, any> | void> = (event: LoadEvent<_Params>) => _ReturnType;
