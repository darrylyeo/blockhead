import { derived, get } from 'svelte/store';
import { QueryStore, } from '../query';
import { cursorHandlers } from './cursor';
import { offsetHandlers } from './offset';
import { nullPageInfo } from './pageInfo';
// both cursor paginated stores add a page info to their subscribe
class CursorPaginatedStore extends QueryStore {
    constructor(config) {
        super(config);
        // all paginated stores need to have a flag to distinguish from other query stores
        this.paginated = true;
        this.handlers = cursorHandlers({
            artifact: this.artifact,
            fetch: super.fetch.bind(this),
            setFetching: this.setFetching.bind(this),
            queryVariables: this.currentVariables.bind(this),
            storeName: this.name,
            getValue: () => get(this.store).data,
            getConfig: () => this.getConfig(),
        });
    }
    async fetch(args) {
        return this.handlers.fetch.call(this, args);
    }
    extraFields() {
        return {
            pageInfo: nullPageInfo(),
        };
    }
    subscribe(run, invalidate) {
        const combined = derived([{ subscribe: super.subscribe.bind(this) }, this.handlers.pageInfo], ([$parent, $pageInfo]) => ({
            ...$parent,
            pageInfo: $pageInfo,
        }));
        return combined.subscribe(run, invalidate);
    }
}
// QueryStoreForwardCursor adds loadNextPage to CursorPaginatedQueryStore
export class QueryStoreForwardCursor extends CursorPaginatedStore {
    async loadNextPage(args) {
        return this.handlers.loadNextPage(args);
    }
}
// QueryStoreBackwardCursor adds loadPreviousPage to CursorPaginatedQueryStore
export class QueryStoreBackwardCursor extends CursorPaginatedStore {
    async loadPreviousPage(args) {
        return this.handlers.loadPreviousPage(args);
    }
}
export class QueryStoreOffset extends QueryStore {
    constructor(config) {
        super(config);
        // all paginated stores need to have a flag to distinguish from other query stores
        this.paginated = true;
        this.handlers = offsetHandlers({
            artifact: this.artifact,
            fetch: super.fetch,
            getValue: () => get(this.store).data,
            setFetching: (...args) => this.setFetching(...args),
            queryVariables: () => this.currentVariables(),
            storeName: this.name,
            getConfig: () => this.getConfig(),
        });
    }
    async loadNextPage(args) {
        return this.handlers.loadNextPage.call(this, args);
    }
    fetch(args) {
        return this.handlers.fetch.call(this, args);
    }
}
