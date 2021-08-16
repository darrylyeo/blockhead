import type { Config } from 'houdini-common';
export declare type Fragment<_Result> = {
    readonly shape?: _Result;
};
export declare type Operation<_Result, _Input> = {
    readonly result: _Result;
    readonly input: _Input;
};
export declare type Session = any;
export declare type Maybe<T> = T | null | undefined;
export declare type DocumentArtifact = FragmentArtifact | QueryArtifact | MutationArtifact | SubscriptionArtifact;
export declare type QueryArtifact = BaseCompiledDocument & {
    kind: 'HoudiniQuery';
};
export declare type MutationArtifact = BaseCompiledDocument & {
    kind: 'HoudiniMutation';
};
export declare type FragmentArtifact = BaseCompiledDocument & {
    kind: 'HoudiniFragment';
};
export declare type SubscriptionArtifact = BaseCompiledDocument & {
    kind: 'HoudiniSubscription';
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
    };
};
export declare type GraphQLTagResult = TaggedGraphqlQuery | TaggedGraphqlFragment | TaggedGraphqlMutation | TaggedGraphqlSubscription;
export declare type TaggedGraphqlFragment = {
    kind: 'HoudiniFragment';
    artifact: FragmentArtifact;
    config: Config;
    paginationArtifact?: QueryArtifact;
};
export declare type TaggedGraphqlMutation = {
    kind: 'HoudiniMutation';
    artifact: MutationArtifact;
    config: Config;
};
export declare type TaggedGraphqlSubscription = {
    kind: 'HoudiniSubscription';
    artifact: SubscriptionArtifact;
    config: Config;
};
export declare type TaggedGraphqlQuery = {
    kind: 'HoudiniQuery';
    initialValue: any;
    variables: {
        [key: string]: any;
    };
    artifact: QueryArtifact;
    config: Config;
};
declare type Filter = {
    [key: string]: string | boolean | number;
};
export declare type ListWhen = {
    must?: Filter;
    must_not?: Filter;
};
export declare type MutationOperation = {
    action: 'insert' | 'remove' | 'delete';
    list?: string;
    type?: string;
    parentID?: {
        kind: string;
        value: string;
    };
    position?: 'first' | 'last';
    when?: ListWhen;
};
export declare const CompiledFragmentKind = "HoudiniFragment";
export declare const CompiledMutationKind = "HoudiniMutation";
export declare const CompiledQueryKind = "HoudiniQuery";
export declare const CompiledSubscriptionKind = "HoudiniSubscription";
export declare type CompiledDocumentKind = 'HoudiniFragment' | 'HoudiniMutation' | 'HoudiniQuery' | 'HoudiniSubscription';
export declare type GraphQLObject = {
    [key: string]: GraphQLValue;
};
export declare type GraphQLValue = number | string | boolean | null | GraphQLObject | GraphQLValue[] | undefined;
export declare type SubscriptionSelection = {
    [field: string]: {
        type: string;
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
                value: string;
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
export {};
