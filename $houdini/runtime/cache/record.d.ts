import { GraphQLValue, Maybe, SubscriptionSpec } from '../types';
import { Cache, LinkedList } from './cache';
export declare class Record {
    fields: {
        [key: string]: GraphQLValue;
    };
    keyVersions: {
        [key: string]: Set<string>;
    };
    readonly id: string;
    private subscribers;
    private recordLinks;
    listLinks: {
        [key: string]: LinkedList;
    };
    private cache;
    private referenceCounts;
    private lifetimes;
    constructor(cache: Cache, id: string);
    allSubscribers(): SubscriptionSpec[];
    getField(fieldName: string): GraphQLValue;
    writeField(fieldName: string, value: GraphQLValue): void;
    writeRecordLink(fieldName: string, value: string | null): void;
    writeListLink(fieldName: string, value: LinkedList): void;
    linkedRecord(fieldName: string): Record;
    linkedRecordID(fieldName: string): string;
    linkedListIDs(fieldName: string): (string | null)[];
    flatLinkedList(fieldName: string): Maybe<Record>[];
    appendLinkedList(fieldName: string, id: string): void;
    prependLinkedList(fieldName: string, id: string): void;
    removeFromLinkedList(fieldName: string, id: string): void;
    addSubscriber(rawKey: string, key: string, ...specs: SubscriptionSpec[]): void;
    getSubscribers(fieldName: string): SubscriptionSpec[];
    forgetSubscribers(...targets: SubscriptionSpec[]): void;
    removeAllSubscribers(): void;
    removeAllSubscriptionVersions(keyRaw: string, spec: SubscriptionSpec): void;
    private forgetSubscribers_walk;
    removeSubscribers(fields: string[], sets: SubscriptionSpec['set'][]): void;
    onGcTick(): void;
}
