// externals
import { derived, readable, writable } from 'svelte/store';
import { query } from './query';
import { fragment } from './fragment';
import { getVariables } from './context';
import { executeQuery } from './network';
import cache from './cache';
// @ts-ignore: this file will get generated and does not exist in the source code
import { getSession } from './adapter.mjs';
// this has to be in a separate file since config isn't defined in cache/index.ts
import { extractPageInfo } from './utils';
export function paginatedQuery(document) {
    // make sure we got a query document
    if (document.kind !== 'HoudiniQuery') {
        throw new Error('paginatedQuery() must be passed a query document');
    }
    // @ts-ignore: typing esm/cjs interop is hard
    const artifact = document.artifact.default || document.artifact;
    // if there's no refetch config for the artifact there's a problem
    if (!artifact.refetch) {
        throw new Error('paginatedQuery must be passed a query with @paginate.');
    }
    // pass the artifact to the base query operation
    const { data, loading, ...restOfQueryResponse } = query(document);
    return {
        data,
        ...paginationHandlers({
            initialValue: document.initialValue.data,
            store: data,
            artifact,
            queryVariables: document.variables,
            documentLoading: loading,
        }),
        ...restOfQueryResponse,
    };
}
export function paginatedFragment(document, initialValue) {
    // make sure we got a query document
    if (document.kind !== 'HoudiniFragment') {
        throw new Error('paginatedFragment() must be passed a fragment document');
    }
    // if we don't have a pagination fragment there is a problem
    if (!document.paginationArtifact) {
        throw new Error('paginatedFragment must be passed a fragment with @paginate');
    }
    // pass the inputs to the normal fragment function
    const data = fragment(document, initialValue);
    // @ts-ignore: typing esm/cjs interop is hard
    const fragmentArtifact = document.artifact.default || document.artifact;
    const paginationArtifact = 
    // @ts-ignore: typing esm/cjs interop is hard
    document.paginationArtifact.default || document.paginationArtifact;
    return {
        data,
        ...paginationHandlers({
            initialValue,
            store: data,
            artifact: paginationArtifact,
            queryVariables: paginationArtifact.refetch.embedded
                ? { id: cache.internal.computeID(fragmentArtifact.rootType, initialValue) }
                : {},
        }),
    };
}
function paginationHandlers({ initialValue, artifact, store, queryVariables, documentLoading, }) {
    var _a;
    // start with the defaults and no meaningful page info
    let loadPreviousPage = defaultLoadPreviousPage;
    let loadNextPage = defaultLoadNextPage;
    let pageInfo = readable({
        startCursor: null,
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
    }, () => { });
    let paginationLoadingState = writable(false);
    // if the artifact supports cursor based pagination
    if (((_a = artifact.refetch) === null || _a === void 0 ? void 0 : _a.method) === 'cursor') {
        // generate the cursor handlers
        const cursor = cursorHandlers({
            initialValue,
            artifact,
            store,
            queryVariables,
            loading: paginationLoadingState,
        });
        // always track pageInfo
        pageInfo = cursor.pageInfo;
        // if we are implementing forward pagination
        if (artifact.refetch.update === 'append') {
            loadNextPage = cursor.loadNextPage;
        }
        // the artifact implements backwards pagination
        else {
            loadPreviousPage = cursor.loadPreviousPage;
        }
    }
    // the artifact supports offset-based pagination, only loadNextPage is valid
    else {
        loadNextPage = offsetPaginationHandler({
            artifact,
            queryVariables,
            loading: paginationLoadingState,
        });
    }
    // if no loading state was provided just use a store that's always false
    if (!documentLoading) {
        documentLoading = readable(false, () => { });
    }
    // merge the pagination and document loading state
    const loading = derived([paginationLoadingState, documentLoading], ($loadingStates) => $loadingStates[0] || $loadingStates[1]);
    return { loadNextPage, loadPreviousPage, pageInfo, loading };
}
function cursorHandlers({ initialValue, artifact, store, queryVariables: extraVariables, loading, }) {
    // pull out the context accessors
    const variables = getVariables();
    const sessionStore = getSession();
    // track the current page info in an easy-to-reach store
    const initialPageInfo = initialValue
        ? extractPageInfo(initialValue, artifact.refetch.path)
        : {
            startCursor: null,
            endCursor: null,
            hasNextPage: false,
            hasPreviousPage: false,
        };
    const pageInfo = writable(initialPageInfo);
    // hold onto the current value
    let value;
    store.subscribe((val) => {
        pageInfo.set(extractPageInfo(val, artifact.refetch.path));
        value = val;
    });
    // dry up the page-loading logic
    const loadPage = async ({ pageSizeVar, input, functionName, }) => {
        // set the loading state to true
        loading.set(true);
        // build up the variables to pass to the query
        const queryVariables = {
            ...extraVariables,
            ...variables(),
            ...input,
        };
        // if we don't have a value for the page size, tell the user
        if (!queryVariables[pageSizeVar] && !artifact.refetch.pageSize) {
            throw missingPageSizeError(functionName);
        }
        // send the query
        const result = await executeQuery(artifact, queryVariables, sessionStore);
        // if the query is embedded in a node field (paginated fragments)
        // make sure we look down one more for the updated page info
        const resultPath = [...artifact.refetch.path];
        if (artifact.refetch.embedded) {
            resultPath.unshift('node');
        }
        // we need to find the connection object holding the current page info
        pageInfo.set(extractPageInfo(result.data, resultPath));
        // update cache with the result
        cache.write({
            selection: artifact.selection,
            data: result.data,
            variables: queryVariables,
            applyUpdates: true,
        });
        // we're not loading any more
        loading.set(false);
    };
    return {
        loadNextPage: async (pageCount) => {
            // we need to find the connection object holding the current page info
            const currentPageInfo = extractPageInfo(value, artifact.refetch.path);
            // if there is no next page, we're done
            if (!currentPageInfo.hasNextPage) {
                return;
            }
            // only specify the page count if we're given one
            const input = {
                after: currentPageInfo.endCursor,
            };
            if (pageCount) {
                input.first = pageCount;
            }
            // load the page
            return await loadPage({
                pageSizeVar: 'first',
                functionName: 'loadNextPage',
                input,
            });
        },
        loadPreviousPage: async (pageCount) => {
            // we need to find the connection object holding the current page info
            const currentPageInfo = extractPageInfo(value, artifact.refetch.path);
            // if there is no next page, we're done
            if (!currentPageInfo.hasPreviousPage) {
                return;
            }
            // only specify the page count if we're given one
            const input = {
                before: currentPageInfo.startCursor,
            };
            if (pageCount) {
                input.last = pageCount;
            }
            // load the page
            return await loadPage({
                pageSizeVar: 'last',
                functionName: 'loadPreviousPage',
                input,
            });
        },
        pageInfo: { subscribe: pageInfo.subscribe },
    };
}
function offsetPaginationHandler({ artifact, queryVariables: extraVariables, loading, }) {
    var _a;
    // we need to track the most recent offset for this handler
    let currentOffset = ((_a = artifact.refetch) === null || _a === void 0 ? void 0 : _a.start) || 0;
    // grab the context getters
    const variables = getVariables();
    const sessionStore = getSession();
    return async (limit) => {
        // build up the variables to pass to the query
        const queryVariables = {
            ...variables(),
            ...extraVariables,
            offset: currentOffset,
        };
        if (limit) {
            queryVariables.limit = limit;
        }
        // if we made it this far without a limit argument and there's no default page size,
        // they made a mistake
        if (!queryVariables.limit && !artifact.refetch.pageSize) {
            throw missingPageSizeError('loadNextPage');
        }
        // set the loading state to true
        loading.set(true);
        // send the query
        const result = await executeQuery(artifact, queryVariables, sessionStore);
        // update cache with the result
        cache.write({
            selection: artifact.selection,
            data: result.data,
            variables: queryVariables,
            applyUpdates: true,
        });
        // add the page size to the offset so we load the next page next time
        const pageSize = queryVariables.limit || artifact.refetch.pageSize;
        currentOffset += pageSize;
        // we're not loading any more
        loading.set(false);
    };
}
function defaultLoadNextPage() {
    throw new Error('loadNextPage() only works on fields marked @paginate that implement forward cursor or offset pagination.');
}
function defaultLoadPreviousPage() {
    throw new Error('loadPreviousPage() only works on fields marked @paginate that implement backward cursor pagination.');
}
function missingPageSizeError(fnName) {
    return new Error('Loading a page with no page size. If you are paginating a field with a variable page size, ' +
        `you have to pass a value to \`${fnName}\`. If you don't care to have the page size vary, ` +
        'consider passing a fixed value to the field instead.');
}
