import type { Config } from 'houdini-common';
import { GraphQLValue, SubscriptionSelection, SubscriptionSpec } from '../types';
import { ListHandler } from './list';
export declare class Cache {
    _config: Config;
    private _data;
    private _lists;
    private _disabled;
    readonly cacheBufferSize: number;
    constructor(config: Config);
    write({ selection, data, variables, parent, applyUpdates, }: {
        selection: SubscriptionSelection;
        data: {
            [key: string]: GraphQLValue;
        };
        variables?: {};
        parent?: string;
        applyUpdates?: boolean;
    }): void;
    id(type: string, data: {
        id?: string;
    } | null): string | null;
    id(type: string, id: string): string | null;
    idFields(type: string): string[];
    subscribe(spec: SubscriptionSpec, variables?: {}): void;
    unsubscribe(spec: SubscriptionSpec, variables?: {}): void;
    list(name: string, id?: string): ListHandler;
    delete(type: string, id: string, variables?: {}): boolean;
    private record;
    get internal(): CacheProxy;
    private computeID;
    private root;
    private getData;
    private addSubscribers;
    private removeSubscribers;
    private _write;
    private hydrateNestedList;
    private extractNestedListIDs;
    private getRecord;
    private notifySubscribers;
    private insertSubscribers;
    private unsubscribeSelection;
    private evaluateKey;
    clear(): void;
    disable(): void;
    private deleteID;
    private isDataAvailable;
    collectGarbage(): void;
}
export declare type CacheProxy = {
    record: Cache['record'];
    notifySubscribers: Cache['notifySubscribers'];
    unsubscribeSelection: Cache['unsubscribeSelection'];
    insertSubscribers: Cache['insertSubscribers'];
    evaluateKey: Cache['evaluateKey'];
    getRecord: Cache['getRecord'];
    getData: Cache['getData'];
    deleteID: Cache['deleteID'];
    computeID: Cache['computeID'];
    isDataAvailable: Cache['isDataAvailable'];
};
export declare const rootID = "_ROOT_";
export declare type LinkedList<_Result = string> = (_Result | null | LinkedList<_Result>)[];
