import type { ConfigFile } from '../lib/config';
import type { GraphQLObject, GraphQLValue, NestedList, SubscriptionSelection, SubscriptionSpec, ValueMap } from '../lib/types';
import { GarbageCollector } from './gc';
import type { ListCollection } from './lists';
import { ListManager } from './lists';
import { StaleManager } from './staleManager';
import type { Layer, LayerID } from './storage';
import { InMemoryStorage } from './storage';
import { InMemorySubscriptions, type FieldSelection } from './subscription';
export declare class Cache {
    #private;
    _internal_unstable: CacheInternal;
    constructor({ disabled, ...config }?: ConfigFile & {
        disabled?: boolean;
    });
    write({ layer: layerID, notifySubscribers, ...args }: {
        data: {
            [key: string]: GraphQLValue;
        };
        selection: SubscriptionSelection;
        variables?: {};
        parent?: string;
        layer?: LayerID | null;
        applyUpdates?: string[];
        notifySubscribers?: SubscriptionSpec[];
        forceNotify?: boolean;
        forceStale?: boolean;
    }): SubscriptionSpec[];
    read(...args: Parameters<CacheInternal['getSelection']>): {
        data: GraphQLObject | null;
        partial: boolean;
        stale: boolean;
    };
    subscribe(spec: SubscriptionSpec, variables?: {}): void;
    unsubscribe(spec: SubscriptionSpec, variables?: {}): void;
    list(name: string, parentID?: string, allLists?: boolean): ListCollection;
    delete(id: string, layer?: Layer): void;
    setConfig(config: ConfigFile): void;
    markTypeStale(options?: {
        type: string;
        field?: string;
        when?: {};
    }): void;
    markRecordStale(id: string, options: {
        field?: string;
        when?: {};
    }): void;
    getFieldTime(id: string, field: string): number | null | undefined;
    config(): ConfigFile;
    serialize(): string;
    hydrate(...args: Parameters<InMemoryStorage['hydrate']>): void;
    clearLayer(layerID: Layer['id']): void;
    reset(): void;
}
declare class CacheInternal {
    private _disabled;
    _config?: ConfigFile;
    storage: InMemoryStorage;
    subscriptions: InMemorySubscriptions;
    lists: ListManager;
    cache: Cache;
    lifetimes: GarbageCollector;
    staleManager: StaleManager;
    constructor({ storage, subscriptions, lists, cache, lifetimes, staleManager, disabled, config, }: {
        storage: InMemoryStorage;
        subscriptions: InMemorySubscriptions;
        lists: ListManager;
        cache: Cache;
        lifetimes: GarbageCollector;
        staleManager: StaleManager;
        disabled: boolean;
        config?: ConfigFile;
    });
    get config(): ConfigFile;
    setConfig(config: ConfigFile): void;
    writeSelection({ data, selection, variables, parent, applyUpdates, layer, toNotify, forceNotify, forceStale, }: {
        data: {
            [key: string]: GraphQLValue;
        };
        selection: SubscriptionSelection;
        variables?: {
            [key: string]: GraphQLValue;
        };
        parent?: string;
        root?: string;
        layer: Layer;
        toNotify?: FieldSelection[];
        applyUpdates?: string[];
        forceNotify?: boolean;
        forceStale?: boolean;
    }): FieldSelection[];
    getSelection({ selection, parent, variables, stepsFromConnection, ignoreMasking, fullCheck, loading: generateLoading, }: {
        selection: SubscriptionSelection;
        parent?: string;
        variables?: {} | null;
        stepsFromConnection?: number | null;
        ignoreMasking?: boolean;
        loading?: boolean;
        fullCheck?: boolean;
    }): {
        data: GraphQLObject | null;
        partial: boolean;
        stale: boolean;
        hasData: boolean;
    };
    id(type: string, data: {} | null): string | null;
    id(type: string, id: string): string | null;
    idFields(type: string): string[];
    computeID(type: string, data: any): string;
    isEmbedded(linkedType: string, value: GraphQLObject): boolean;
    hydrateNestedList({ fields, variables, linkedList, stepsFromConnection, ignoreMasking, fullCheck, loading, }: {
        fields: SubscriptionSelection;
        variables?: {} | null;
        linkedList: NestedList;
        stepsFromConnection: number | null;
        ignoreMasking: boolean;
        fullCheck?: boolean;
        loading?: boolean;
    }): {
        data: NestedList<GraphQLValue>;
        partial: boolean;
        stale: boolean;
        hasData: boolean;
    };
    extractNestedListIDs({ value, abstract, recordID, key, linkedType, fields, variables, applyUpdates, specs, layer, forceNotify, }: {
        value: GraphQLValue[];
        recordID: string;
        key: string;
        linkedType: string;
        abstract: boolean;
        variables: {};
        specs: FieldSelection[];
        applyUpdates?: string[];
        fields: SubscriptionSelection;
        layer: Layer;
        forceNotify?: boolean;
    }): {
        nestedIDs: NestedList;
        newIDs: (string | null)[];
    };
    collectGarbage(): void;
}
export declare function evaluateFragmentVariables(variables: ValueMap, args: GraphQLObject): {
    [k: string]: GraphQLValue;
};
export declare const rootID = "_ROOT_";
export {};
