import type { GraphQLValue, SubscriptionSelection, SubscriptionSpec } from '../lib/types';
import { type Cache } from './cache';
export type FieldSelection = [
    SubscriptionSpec,
    Required<SubscriptionSelection>['fields'] | undefined
];
export declare class InMemorySubscriptions {
    private cache;
    constructor(cache: Cache);
    private subscribers;
    private referenceCounts;
    private keyVersions;
    activeFields(parent: string): string[];
    add({ parent, spec, selection, variables, parentType, }: {
        parent: string;
        parentType?: string;
        spec: SubscriptionSpec;
        selection: SubscriptionSelection;
        variables: {
            [key: string]: GraphQLValue;
        };
    }): void;
    addFieldSubscription({ id, key, selection, type, }: {
        id: string;
        key: string;
        selection: FieldSelection;
        type: string;
    }): void;
    registerList({ list, id, key, parentType, selection, filters, variables, }: {
        list: Required<Required<SubscriptionSelection>['fields'][string]>['list'];
        selection: SubscriptionSelection;
        id: string;
        parentType: string;
        key: string;
        filters: Required<SubscriptionSelection>['fields'][string]['filters'];
        variables: Record<string, any>;
    }): void;
    addMany({ parent, variables, subscribers, parentType, }: {
        parent: string;
        variables: {};
        subscribers: FieldSelection[];
        parentType: string;
    }): void;
    get(id: string, field: string): FieldSelection[];
    remove(id: string, selection: SubscriptionSelection, targets: SubscriptionSpec[], variables: {}, visited?: string[]): void;
    reset(): SubscriptionSpec[];
    private removeSubscribers;
    removeAllSubscribers(id: string, targets?: SubscriptionSpec[], visited?: string[]): void;
}
