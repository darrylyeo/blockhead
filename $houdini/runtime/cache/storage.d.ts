import type { GraphQLValue } from '../lib/types';
export declare class InMemoryStorage {
    private data;
    private idCount;
    private rank;
    constructor();
    get layerCount(): number;
    get nextRank(): number;
    createLayer(optimistic?: boolean): Layer;
    insert(id: string, field: string, location: OperationLocations, target: string): void;
    remove(id: string, field: string, target: string, layerToUser?: Layer): void;
    delete(id: string, layerToUser?: Layer): void;
    deleteField(id: string, field: string): void;
    getLayer(id: number): Layer;
    replaceID(replacement: {
        from: string;
        to: string;
    }): void;
    get(id: string, field: string): {
        value: GraphQLField;
        kind: 'link' | 'scalar' | 'unknown';
        displayLayers: number[];
    };
    writeLink(id: string, field: string, value: string | NestedList): number;
    writeField(id: string, field: string, value: GraphQLValue): number;
    resolveLayer(id: number): void;
    get topLayer(): Layer;
    serialize(): string;
    hydrate(args?: {
        rank: number;
        fields: EntityFieldMap;
        links: LinkMap;
    }, layer?: Layer): void;
    reset(): void;
}
export declare class Layer {
    readonly id: LayerID;
    optimistic: boolean;
    fields: EntityFieldMap;
    links: LinkMap;
    operations: OperationMap;
    deletedIDs: Set<string>;
    constructor(id: number);
    get(id: string, field: string): [GraphQLField, 'link' | 'scalar'];
    getOperations(id: string, field: string): Operation[] | undefined;
    writeField(id: string, field: string, value: GraphQLField): LayerID;
    writeLink(id: string, field: string, value: null | string | NestedList): LayerID;
    isDisplayLayer(displayLayers: number[]): boolean;
    clear(): void;
    replaceID({ from, to }: {
        from: string;
        to: string;
    }): void;
    removeUndefinedFields(): void;
    delete(id: string): void;
    deleteField(id: string, field: string): void;
    insert(id: string, field: string, where: OperationLocations, target: string): void;
    remove(id: string, field: string, target: string): void;
    writeLayer(layer: Layer): void;
    private addFieldOperation;
}
type GraphQLField = GraphQLValue | NestedList;
type EntityMap<_Value> = {
    [id: string]: {
        [field: string]: _Value;
    };
};
type EntityFieldMap = EntityMap<GraphQLField>;
type LinkMap = EntityMap<string | null | NestedList>;
type OperationMap = {
    [id: string]: {
        deleted?: boolean;
        undoDeletesInList?: string[];
        fields: {
            [field: string]: ListOperation[];
        };
    };
};
type NestedList<_Result = string> = (_Result | null | NestedList<_Result>)[];
type InsertOperation = {
    kind: 'insert';
    location: OperationLocations;
    id: string;
};
type RemoveOperation = {
    kind: 'remove';
    id: string;
};
type DeleteOperation = {
    kind: 'delete';
    target: string;
};
type ListOperation = InsertOperation | RemoveOperation;
type Operation = ListOperation | DeleteOperation;
type ValuesOf<Target> = Target[keyof Target];
export declare const OperationLocation: {
    readonly start: "start";
    readonly end: "end";
};
export type OperationLocations = ValuesOf<typeof OperationLocation>;
export declare const OperationKind: {
    readonly delete: "delete";
    readonly insert: "insert";
    readonly remove: "remove";
};
export type OperationKinds = ValuesOf<typeof OperationKind>;
export type LayerID = number;
export {};
