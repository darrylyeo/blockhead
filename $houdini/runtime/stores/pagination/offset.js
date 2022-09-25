import { deepEquals } from '../..';
import cache from '../../cache';
import { executeQuery, getSession } from '../../lib/network';
import { fetchParams } from '../query';
import { countPage, missingPageSizeError } from './pageInfo';
export function offsetHandlers({ artifact, queryVariables: extraVariables, fetch, getValue, setFetching, storeName, getConfig, }) {
    var _a;
    // we need to track the most recent offset for this handler
    let getOffset = () => {
        var _a;
        return ((_a = artifact.refetch) === null || _a === void 0 ? void 0 : _a.start) ||
            countPage(artifact.refetch.path, getValue()) ||
            artifact.refetch.pageSize;
    };
    let currentOffset = (_a = getOffset()) !== null && _a !== void 0 ? _a : 0;
    return {
        loadNextPage: async ({ limit, offset, fetch, metadata, } = {}) => {
            const config = await getConfig();
            // if the offset is zero then we want to count it just to make sure
            // hence why (|| and not ??)
            offset !== null && offset !== void 0 ? offset : (offset = currentOffset || getOffset());
            // build up the variables to pass to the query
            const queryVariables = {
                ...(await extraVariables()),
                offset,
            };
            if (limit || limit === 0) {
                queryVariables.limit = limit;
            }
            // if we made it this far without a limit argument and there's no default page size,
            // they made a mistake
            if (!queryVariables.limit && !artifact.refetch.pageSize) {
                throw missingPageSizeError('loadNextPage');
            }
            // set the loading state to true
            setFetching(true);
            // send the query
            const { result } = await executeQuery({
                artifact,
                variables: queryVariables,
                session: await getSession(),
                cached: false,
                config,
                fetch,
                metadata,
            });
            // update cache with the result
            cache.write({
                selection: artifact.selection,
                data: result.data,
                variables: queryVariables,
                applyUpdates: true,
            });
            // add the page size to the offset so we load the next page next time
            const pageSize = queryVariables.limit || artifact.refetch.pageSize;
            currentOffset = offset + pageSize;
            // we're not loading any more
            setFetching(false);
        },
        async fetch(args) {
            const { params } = await fetchParams(artifact, storeName, args);
            const { variables } = params !== null && params !== void 0 ? params : {};
            const extra = await extraVariables();
            // if the input is different than the query variables then we just do everything like normal
            if (variables && !deepEquals(extra, variables)) {
                return fetch.call(this, params);
            }
            // we are updating the current set of items, count the number of items that currently exist
            // and ask for the full data set
            const count = currentOffset || getOffset();
            // build up the variables to pass to the query
            const queryVariables = {
                ...extra,
            };
            // if there are more records than the first page, we need fetch to load everything
            if (!artifact.refetch.pageSize || count > artifact.refetch.pageSize) {
                queryVariables.limit = count;
            }
            // set the loading state to true
            setFetching(true);
            // send the query
            const result = await fetch.call(this, {
                ...params,
                variables: queryVariables,
            });
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
