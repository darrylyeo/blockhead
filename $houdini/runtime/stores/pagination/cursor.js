import { writable } from 'svelte/store';
import cache from '../../cache';
import { siteURL } from '../../lib/constants';
import { deepEquals } from '../../lib/deepEquals';
import { executeQuery, getSession } from '../../lib/network';
import { fetchParams } from '../query';
import { countPage, extractPageInfo, missingPageSizeError } from './pageInfo';
export function cursorHandlers({ artifact, queryVariables: extraVariables, setFetching, fetch, storeName, getValue, getConfig, }) {
    const pageInfo = writable(extractPageInfo(getValue(), artifact.refetch.path));
    // dry up the page-loading logic
    const loadPage = async ({ pageSizeVar, input, functionName, metadata = {}, fetch, }) => {
        var _a, _b;
        const config = await getConfig();
        // set the loading state to true
        setFetching(true);
        // build up the variables to pass to the query
        const loadVariables = {
            ...(await (extraVariables === null || extraVariables === void 0 ? void 0 : extraVariables())),
            ...input,
        };
        // if we don't have a value for the page size, tell the user
        if (!loadVariables[pageSizeVar] && !artifact.refetch.pageSize) {
            throw missingPageSizeError(functionName);
        }
        // send the query
        const { result } = await executeQuery({
            artifact,
            variables: loadVariables,
            session: await getSession(),
            cached: false,
            config,
            fetch,
            metadata,
        });
        // if the query is embedded in a node field (paginated fragments)
        // make sure we look down one more for the updated page info
        const resultPath = [...artifact.refetch.path];
        if (artifact.refetch.embedded) {
            const { targetType } = artifact.refetch;
            // make sure we have a type config for the pagination target type
            if (!((_b = (_a = config.types) === null || _a === void 0 ? void 0 : _a[targetType]) === null || _b === void 0 ? void 0 : _b.resolve)) {
                throw new Error(`Missing type resolve configuration for ${targetType}. For more information, see ${siteURL}/guides/pagination#paginated-fragments`);
            }
            // make sure that we pull the value out of the correct query field
            resultPath.unshift(config.types[targetType].resolve.queryField);
        }
        // we need to find the connection object holding the current page info
        pageInfo.set(extractPageInfo(result.data, resultPath));
        // update cache with the result
        cache.write({
            selection: artifact.selection,
            data: result.data,
            variables: loadVariables,
            applyUpdates: true,
        });
        // we're not loading any more
        setFetching(false);
    };
    return {
        loadNextPage: async ({ first, after, fetch, metadata, } = {}) => {
            // we need to find the connection object holding the current page info
            const currentPageInfo = extractPageInfo(getValue(), artifact.refetch.path);
            // if there is no next page, we're done
            if (!currentPageInfo.hasNextPage) {
                return;
            }
            // only specify the page count if we're given one
            const input = {
                after: after !== null && after !== void 0 ? after : currentPageInfo.endCursor,
            };
            if (first) {
                input.first = first;
            }
            // load the page
            return await loadPage({
                pageSizeVar: 'first',
                functionName: 'loadNextPage',
                input,
                fetch,
                metadata,
            });
        },
        loadPreviousPage: async ({ last, before, fetch, metadata, } = {}) => {
            // we need to find the connection object holding the current page info
            const currentPageInfo = extractPageInfo(getValue(), artifact.refetch.path);
            // if there is no next page, we're done
            if (!currentPageInfo.hasPreviousPage) {
                return;
            }
            // only specify the page count if we're given one
            const input = {
                before: before !== null && before !== void 0 ? before : currentPageInfo.startCursor,
            };
            if (last) {
                input.last = last;
            }
            // load the page
            return await loadPage({
                pageSizeVar: 'last',
                functionName: 'loadPreviousPage',
                input,
                fetch,
                metadata,
            });
        },
        pageInfo,
        async fetch(args) {
            // validate and prepare the request context for the current environment (client vs server)
            const { params } = await fetchParams(artifact, storeName, args);
            const { variables } = params !== null && params !== void 0 ? params : {};
            // build up the variables to pass to the query
            const extra = await extraVariables();
            const queryVariables = {
                ...extra,
                ...variables,
            };
            // if the input is different than the query variables then we just do everything like normal
            if (variables && !deepEquals(extra, variables)) {
                const result = await fetch({
                    ...params,
                    then(data) {
                        pageInfo.set(extractPageInfo(data, artifact.refetch.path));
                    },
                });
                return result;
            }
            // we are updating the current set of items, count the number of items that currently exist
            // and ask for the full data set
            const count = countPage(artifact.refetch.path.concat('edges'), getValue()) ||
                artifact.refetch.pageSize;
            // if there are more records than the first page, we need fetch to load everything
            if (count && count > artifact.refetch.pageSize) {
                // reverse cursors need the last entries in the list
                queryVariables[artifact.refetch.update === 'prepend' ? 'last' : 'first'] = count;
            }
            // set the loading state to true
            setFetching(true);
            // send the query
            const result = await fetch({
                ...params,
                variables: queryVariables,
            });
            // keep the page info store up to date
            pageInfo.set(extractPageInfo(result.data, artifact.refetch.path));
            // we're not loading any more
            setFetching(false);
            return {
                data: result.data,
                variables: queryVariables,
                isFetching: false,
                partial: result.partial,
                errors: null,
                source: result.source,
            };
        },
    };
}
