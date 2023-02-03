import type { GraphQLValue } from '../lib/types';
export declare class InMemoryStorage {
    private data;
    private idCount;
    private rank;
    constructor();
    get layerCount(): number;
    get nextRank(): number;
    createLayer(optimistic?: boolean): Layer;
    insert(id: string, field: string, location: OperationLocation, target: string): void;
    remove(id: string, field: string, target: string): void;
    delete(id: string): void;
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
    writeLink(id: string, field: string, value: string | LinkedList): number;
    writeField(id: string, field: string, value: GraphQLValue): number;
    resolveLayer(id: number): void;
    get topLayer(): Layer;
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
    writeLink(id: string, field: string, value: null | string | LinkedList): LayerID;
    isDisplayLayer(displayLayers: number[]): boolean;
    clear(): void;
    replaceID({ from, to }: {
        from: string;
        to: string;
    }): void;
    removeUndefinedFields(): void;
    delete(id: string): void;
    deleteField(id: string, field: string): void;
    insert(id: string, field: string, where: OperationLocation, target: string): void;
    remove(id: string, field: string, target: string): void;
    writeLayer(layer: Layer): void;
    private addFieldOperation;
}
type GraphQLField = GraphQLValue | LinkedList;
type EntityMap<_Value> = {
    [id: string]: {
        [field: string]: _Value;
    };
};
type EntityFieldMap = EntityMap<GraphQLField>;
type LinkMap = EntityMap<string | null | LinkedList>;
type OperationMap = {
    [id: string]: {
        deleted?: boolean;
        undoDeletesInList?: string[];
        fields: {
            [field: string]: ListOperation[];
        };
    };
};
type LinkedList<_Result = string> = (_Result | null | LinkedList<_Result>)[];
type InsertOperation = {
    kind: OperationKind.insert;
    location: OperationLocation;
    id: string;
};
type RemoveOperation = {
    kind: OperationKind.remove;
    id: string;
};
type DeleteOperation = {
    kind: OperationKind.delete;
    target: string;
};
type ListOperation = InsertOperation | RemoveOperation;
type Operation = ListOperation | DeleteOperation;
export declare enum OperationLocation {
    start = "start",
    end = "end"
}
export declare enum OperationKind {
    delete = "delete",
    insert = "insert",
    remove = "remove"
}
export type LayerID = number;
export {};
