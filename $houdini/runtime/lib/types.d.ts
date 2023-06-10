type ValuesOf<Target> = Target[keyof Target];
export declare const CachePolicy: {
    readonly CacheOrNetwork: "CacheOrNetwork";
    readonly CacheOnly: "CacheOnly";
    readonly NetworkOnly: "NetworkOnly";
    readonly CacheAndNetwork: "CacheAndNetwork";
};
export type CachePolicies = ValuesOf<typeof CachePolicy>;
export declare const PaginateMode: {
    readonly Infinite: "Infinite";
    readonly SinglePage: "SinglePage";
};
export type PaginateModes = ValuesOf<typeof PaginateMode>;
declare global {
    namespace App {
        interface Session {
        }
        interface Metadata {
        }
        interface Stuff {
            inputs: {
                init: boolean;
                marshaled: Record<string, any>;
                changed: boolean;
            };
            optimisticResponse?: GraphQLObject;
            parentID?: string;
            silenceLoading?: boolean;
        }
    }
}
export type Fragment<_Result> = {
    readonly shape?: _Result;
};
export type Operation<_Result, _Input> = {
    readonly result: _Result;
    readonly input: _Input;
};
export type Maybe<T> = T | null | undefined;
export type DocumentArtifact = FragmentArtifact | QueryArtifact | MutationArtifact | SubscriptionArtifact;
export declare const ArtifactKind: {
    readonly Query: "HoudiniQuery";
    readonly Subscription: "HoudiniSubscription";
    readonly Mutation: "HoudiniMutation";
    readonly Fragment: "HoudiniFragment";
};
export type ArtifactKinds = ValuesOf<typeof ArtifactKind>;
export declare const CompiledFragmentKind: "HoudiniFragment";
export declare const CompiledMutationKind: "HoudiniMutation";
export declare const CompiledQueryKind: "HoudiniQuery";
export declare const CompiledSubscriptionKind: "HoudiniSubscription";
export type CompiledDocumentKind = ArtifactKinds;
export type QueryArtifact = BaseCompiledDocument<'HoudiniQuery'> & {
    policy?: CachePolicies;
    partial?: boolean;
    enableLoadingState?: 'global' | 'local';
};
export type MutationArtifact = BaseCompiledDocument<'HoudiniMutation'>;
export type FragmentArtifact = BaseCompiledDocument<'HoudiniFragment'> & {
    enableLoadingState?: 'global' | 'local';
};
export type SubscriptionArtifact = BaseCompiledDocument<'HoudiniSubscription'>;
export declare const RefetchUpdateMode: {
    readonly append: "append";
    readonly prepend: "prepend";
    readonly replace: "replace";
};
export type RefetchUpdateModes = ValuesOf<typeof RefetchUpdateMode>;
export type InputObject = {
    fields: Record<string, string>;
    types: Record<string, Record<string, string>>;
};
export type BaseCompiledDocument<_Kind extends ArtifactKinds> = {
    name: string;
    kind: _Kind;
    raw: string;
    hash: string;
    selection: SubscriptionSelection;
    rootType: string;
    input?: InputObject;
    refetch?: {
        path: string[];
        method: 'cursor' | 'offset';
        pageSize: number;
        start?: string | number;
        embedded: boolean;
        targetType: string;
        paginated: boolean;
        direction: 'forward' | 'backward' | 'both';
        mode: PaginateModes;
    };
    pluginData: Record<string, any>;
};
export type HoudiniFetchContext = {
    variables: () => {};
};
type Filter = {
    [key: string]: string | boolean | number;
};
export type ListWhen = {
    must?: Filter;
    must_not?: Filter;
};
export declare const DataSource: {
    /**
     * from the browser cache
     */
    readonly Cache: "cache";
    /**
     * from a browser side `fetch`
     */
    readonly Network: "network";
    /**
     * from a server side `fetch`
     */
    readonly Ssr: "ssr";
};
export type DataSources = ValuesOf<typeof DataSource>;
export type MutationOperation = {
    action: 'insert' | 'remove' | 'delete' | 'toggle';
    list?: string;
    type?: string;
    parentID?: {
        kind: string;
        value: string;
    };
    position?: 'first' | 'last';
    target?: 'all';
    when?: ListWhen;
};
export type GraphQLObject = {
    [key: string]: GraphQLValue;
};
export type GraphQLValue = number | string | boolean | null | GraphQLObject | GraphQLValue[] | undefined;
export type GraphQLVariables = {
    [key: string]: any;
} | null;
export type LoadingSpec = {
    kind: 'continue';
    list?: {
        depth: number;
        count: number;
    };
} | {
    kind: 'value';
    value?: any;
    list?: {
        depth: number;
        count: number;
    };
};
export type SubscriptionSelection = {
    loadingTypes?: string[];
    fragments?: Record<string, {
        arguments: ValueMap;
        loading?: boolean;
    }>;
    fields?: {
        [fieldName: string]: {
            type: string;
            nullable?: boolean;
            required?: boolean;
            keyRaw: string;
            operations?: MutationOperation[];
            list?: {
                name: string;
                connection: boolean;
                type: string;
            };
            loading?: LoadingSpec;
            directives?: {
                name: string;
                arguments: ValueMap;
            }[];
            updates?: string[];
            visible?: boolean;
            filters?: Record<string, {
                kind: 'Boolean' | 'String' | 'Float' | 'Int' | 'Variable';
                value: string | number | boolean;
            }>;
            selection?: SubscriptionSelection;
            abstract?: boolean;
            abstractHasRequired?: boolean;
        };
    };
    abstractFields?: {
        fields: {
            [typeName: string]: SubscriptionSelection['fields'];
        };
        typeMap: {
            [typeName: string]: string;
        };
    };
};
export type SubscriptionSpec = {
    rootType: string;
    selection: SubscriptionSelection;
    set: (data: any) => void;
    parentID?: string;
    variables?: () => any;
};
export type FetchQueryResult<_Data> = {
    result: RequestPayload<_Data | null>;
    source: DataSources | null;
};
export type QueryResult<_Data = GraphQLObject, _Input = GraphQLVariables> = {
    data: _Data | null;
    errors: {
        message: string;
    }[] | null;
    fetching: boolean;
    partial: boolean;
    stale: boolean;
    source: DataSources | null;
    variables: _Input | null;
};
export type RequestPayload<GraphQLObject = any> = {
    data: GraphQLObject | null;
    errors: {
        message: string;
    }[] | null;
};
export type NestedList<_Result = string> = (_Result | null | NestedList<_Result>)[];
export type ValueOf<Parent> = Parent[keyof Parent];
export declare const fragmentKey: " $fragments";
export type ValueNode = VariableNode | IntValueNode | FloatValueNode | StringValueNode | BooleanValueNode | NullValueNode | EnumValueNode | ListValueNode | ObjectValueNode;
export type ValueMap = Record<string, ValueNode>;
export type FetchParams<_Input> = {
    variables?: _Input;
    /**
     * The policy to use when performing the fetch. If set to CachePolicy.NetworkOnly,
     * a request will always be sent, even if the variables are the same as the last call
     * to fetch.
     */
    policy?: CachePolicies;
    /**
     * An object that will be passed to the fetch function.
     * You can do what you want with it!
     */
    metadata?: App.Metadata;
};
export type FetchFn<_Data extends GraphQLObject, _Input = any> = (params?: FetchParams<_Input>) => Promise<QueryResult<_Data, _Input>>;
export type CursorHandlers<_Data extends GraphQLObject, _Input> = {
    loadNextPage: (args?: {
        first?: number;
        after?: string;
        fetch?: typeof globalThis.fetch;
        metadata?: {};
    }) => Promise<void>;
    loadPreviousPage: (args?: {
        last?: number;
        before?: string;
        fetch?: typeof globalThis.fetch;
        metadata?: {};
    }) => Promise<void>;
    fetch(args?: FetchParams<_Input> | undefined): Promise<QueryResult<_Data, _Input>>;
};
export type OffsetHandlers<_Data extends GraphQLObject, _Input> = {
    loadNextPage: (args?: {
        limit?: number;
        offset?: number;
        metadata?: {};
        fetch?: typeof globalThis.fetch;
    }) => Promise<void>;
    fetch(args?: FetchParams<_Input> | undefined): Promise<QueryResult<_Data, _Input>>;
};
export type PageInfo = {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
interface IntValueNode {
    readonly kind: 'IntValue';
    readonly value: string;
}
interface FloatValueNode {
    readonly kind: 'FloatValue';
    readonly value: string;
}
interface StringValueNode {
    readonly kind: 'StringValue';
    readonly value: string;
}
interface BooleanValueNode {
    readonly kind: 'BooleanValue';
    readonly value: boolean;
}
interface NullValueNode {
    readonly kind: 'NullValue';
}
interface EnumValueNode {
    readonly kind: 'EnumValue';
    readonly value: string;
}
interface ListValueNode {
    readonly kind: 'ListValue';
    readonly values: ReadonlyArray<ValueNode>;
}
interface ObjectValueNode {
    readonly kind: 'ObjectValue';
    readonly fields: ReadonlyArray<ObjectFieldNode>;
}
interface ObjectFieldNode {
    readonly kind: 'ObjectField';
    readonly name: NameNode;
    readonly value: ValueNode;
}
interface NameNode {
    readonly kind: 'Name';
    readonly value: string;
}
interface VariableNode {
    readonly kind: 'Variable';
    readonly name: NameNode;
}
export declare const PendingValue: unique symbol;
export type LoadingType = typeof PendingValue;
export declare function isPending(value: any): value is LoadingType;
export {};
