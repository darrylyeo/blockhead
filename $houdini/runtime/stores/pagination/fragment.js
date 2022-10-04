import { derived, get, writable } from 'svelte/store';
import { keyFieldsForType, getCurrentConfig } from '../../lib/config';
import { siteURL } from '../../lib/constants';
import { CompiledFragmentKind, } from '../../lib/types';
import { BaseStore } from '../store';
import { cursorHandlers } from './cursor';
import { offsetHandlers } from './offset';
import { nullPageInfo } from './pageInfo';
class BasePaginatedFragmentStore extends BaseStore {
    constructor(config) {
        super();
        // all paginated stores need to have a flag to distinguish from other fragment stores
        this.paginated = true;
        this.kind = CompiledFragmentKind;
        this.paginationArtifact = config.paginationArtifact;
        this.name = config.storeName;
    }
    async queryVariables(store) {
        var _a, _b, _c, _d;
        const config = await getCurrentConfig();
        const { targetType } = this.paginationArtifact.refetch || {};
        const typeConfig = (_a = config.types) === null || _a === void 0 ? void 0 : _a[targetType || ''];
        if (!typeConfig) {
            throw new Error(`Missing type refetch configuration for ${targetType}. For more information, see ${siteURL}/guides/pagination#paginated-fragments`);
        }
        // if we have a specific function to use when computing the variables
        // then we need to collect those fields
        let idVariables = {};
        const value = get(store).data;
        if ((_b = typeConfig.resolve) === null || _b === void 0 ? void 0 : _b.arguments) {
            idVariables = (((_d = (_c = typeConfig.resolve).arguments) === null || _d === void 0 ? void 0 : _d.call(_c, value)) || {});
        }
        else {
            const keys = keyFieldsForType(config, targetType || '');
            // @ts-ignore
            idVariables = Object.fromEntries(keys.map((key) => [key, value[key]]));
        }
        // add the id variables to the query variables
        return {
            ...idVariables,
        };
    }
}
// both cursor paginated stores add a page info to their subscribe
class FragmentStoreCursor extends BasePaginatedFragmentStore {
    // we want to add the cursor-based fetch to the return value of get
    get(initialValue) {
        const store = writable({
            data: initialValue,
            isFetching: false,
            pageInfo: nullPageInfo(),
        });
        // track the loading state
        const loading = writable(false);
        // generate the pagination handlers
        const handlers = this.storeHandlers(store, loading.set);
        const subscribe = (run, invalidate) => {
            const combined = derived([store, handlers.pageInfo], ([$parent, $pageInfo]) => ({
                ...$parent,
                pageInfo: $pageInfo,
            }));
            return combined.subscribe(run, invalidate);
        };
        return {
            kind: CompiledFragmentKind,
            data: store,
            subscribe: subscribe,
            loading: loading,
            fetch: handlers.fetch,
            pageInfo: handlers.pageInfo,
        };
    }
    storeHandlers(store, setFetching) {
        return cursorHandlers({
            artifact: this.paginationArtifact,
            fetch: async () => {
                return {};
            },
            getValue: () => get(store).data,
            queryVariables: () => this.queryVariables(store),
            setFetching,
            storeName: this.name,
            getConfig: () => this.getConfig(),
        });
    }
}
// FragmentStoreForwardCursor adds loadNextPage to FragmentStoreCursor
export class FragmentStoreForwardCursor extends FragmentStoreCursor {
    get(initialValue) {
        // get the base class
        const parent = super.get(initialValue);
        // generate the pagination handlers
        const handlers = this.storeHandlers(parent, 
        // it really is a writable under the hood :(
        parent.loading.set);
        return {
            ...parent,
            // add the specific handlers for this situation
            loadNextPage: handlers.loadNextPage,
        };
    }
}
// BackwardFragmentStoreCursor adds loadPreviousPage to FragmentStoreCursor
export class FragmentStoreBackwardCursor extends FragmentStoreCursor {
    get(initialValue) {
        const parent = super.get(initialValue);
        // generate the pagination handlers
        const handlers = this.storeHandlers(parent, 
        // it really is a writable under the hood :(
        (isFetching) => parent.data.update((p) => ({ ...p, isFetching })));
        return {
            ...parent,
            // add the specific handlers for this situation
            loadPreviousPage: handlers.loadPreviousPage,
        };
    }
}
export class FragmentStoreOffset extends BasePaginatedFragmentStore {
    get(initialValue) {
        const parent = writable({
            data: initialValue,
            isFetching: false,
        });
        // create the offset handlers we'll add to the store
        const handlers = offsetHandlers({
            artifact: this.paginationArtifact,
            fetch: async () => ({}),
            getValue: () => get(parent).data,
            setFetching: (isFetching) => parent.update((p) => ({ ...p, isFetching })),
            queryVariables: () => this.queryVariables({ subscribe: parent.subscribe }),
            storeName: this.name,
            getConfig: () => this.getConfig(),
        });
        // add the offset handlers
        return {
            ...parent,
            kind: CompiledFragmentKind,
            fetch: handlers.fetch,
            loadNextPage: handlers.loadNextPage,
        };
    }
}
