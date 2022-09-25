import { get, writable } from 'svelte/store';
import { clientStarted, isBrowser, error } from '../adapter';
import cache from '../cache';
import { deepEquals } from '../lib/deepEquals';
import * as log from '../lib/log';
import { fetchQuery } from '../lib/network';
import { getSession } from '../lib/network';
import { marshalInputs, unmarshalSelection } from '../lib/scalars';
// internals
import { CachePolicy, DataSource } from '../lib/types';
import { CompiledQueryKind } from '../lib/types';
import { BaseStore } from './store';
export class QueryStore extends BaseStore {
    constructor({ artifact, storeName, variables }) {
        super();
        // identify it as a query store
        this.kind = CompiledQueryKind;
        // we will be reading and write the last known variables often, avoid frequent gets and updates
        this.lastVariables = null;
        // track the subscription's existence to refresh and unsubscribe when unmounting
        this.subscriptionSpec = null;
        // if there is a load in progress when the CSF triggers we need to stop it
        this.loadPending = false;
        // in order to clear the store's value when unmounting, we need to track how many concurrent subscribers
        // we have. when this number is 0, we need to clear the store
        this.subscriberCount = 0;
        // set the initial state
        this.store = writable(this.initialState);
        this.artifact = artifact;
        this.storeName = storeName;
        this.variables = variables;
    }
    async fetch(args) {
        const config = await this.getConfig();
        // set the cache's config
        cache.setConfig(config);
        // validate and prepare the request context for the current environment (client vs server)
        const { policy, params, context } = await fetchParams(this.artifact, this.storeName, args);
        // identify if this is a CSF or load
        const isLoadFetch = Boolean('event' in params && params.event);
        const isComponentFetch = !isLoadFetch;
        // compute the variables we need to use for the query
        const input = ((await marshalInputs({
            artifact: this.artifact,
            input: params === null || params === void 0 ? void 0 : params.variables,
        })) || {});
        const newVariables = {
            ...this.lastVariables,
            ...input,
        };
        // check if the variables are different from the last time we saw them
        let variableChange = !deepEquals(this.lastVariables, newVariables);
        // if we are loading on the client and the variables _are_ different, we have to
        // update the subscribers. do that before the fetch so we don't accidentally
        // cause the new data to trigger the old subscription after the store has been
        // update with fetchAndCache
        if (variableChange && isBrowser) {
            this.refreshSubscription(newVariables);
            this.store.update((s) => ({ ...s, variables: newVariables }));
        }
        // if there is a pending load, don't do anything
        if (this.loadPending && isComponentFetch) {
            log.error(`⚠️ Encountered fetch from your component while ${this.storeName}.load was running.
This will result in duplicate queries. If you are trying to ensure there is always a good value, please a CachePolicy instead.
If this is leftovers from old versions of houdini, you can safely remove this \`${this.storeName}\`.fetch() from your component.
`);
            return get(this.store);
        }
        // a component fetch is _always_ blocking
        if (isComponentFetch) {
            params.blocking = true;
        }
        // the fetch is happening in a load
        if (isLoadFetch) {
            this.loadPending = true;
        }
        // we might not want to wait for the fetch to resolve
        const fakeAwait = clientStarted && isBrowser && !(params === null || params === void 0 ? void 0 : params.blocking);
        this.setFetching(true);
        // perform the network request
        const request = this.fetchAndCache({
            config,
            context,
            artifact: this.artifact,
            variables: newVariables,
            store: this.store,
            cached: policy !== CachePolicy.NetworkOnly,
            setLoadPending: (val) => {
                this.loadPending = val;
                this.setFetching(val);
            },
        });
        if (params.then) {
            // eslint-disable-next-line promise/no-nesting
            request.then((val) => { var _a; return (_a = params.then) === null || _a === void 0 ? void 0 : _a.call(params, val.result.data); });
        }
        // if the await isn't fake, await it
        if (!fakeAwait) {
            await request;
        }
        // the store will have been updated already since we waited for the response
        return get(this.store);
    }
    get name() {
        return this.artifact.name;
    }
    async currentVariables() {
        return get(this.store).variables;
    }
    subscribe(...args) {
        var _a, _b;
        const bubbleUp = this.store.subscribe(...args);
        // we have a new subscriber
        this.subscriberCount = ((_a = this.subscriberCount) !== null && _a !== void 0 ? _a : 0) + 1;
        // make sure that the store is always listening to the cache (on the browser)
        if (isBrowser && !this.subscriptionSpec) {
            this.refreshSubscription((_b = this.lastVariables) !== null && _b !== void 0 ? _b : {});
        }
        // Handle unsubscribe
        return () => {
            // we lost a subscriber
            this.subscriberCount--;
            // don't clear the store state on the server (breaks SSR)
            // or when there is still an active subscriber
            if (this.subscriberCount <= 0) {
                // clean up any cache subscriptions
                if (isBrowser && this.subscriptionSpec) {
                    cache.unsubscribe(this.subscriptionSpec, this.lastVariables || {});
                }
                // clear the variable counter
                this.lastVariables = null;
                this.subscriptionSpec = null;
            }
            // we're done
            bubbleUp();
        };
    }
    //// Internal methods
    async fetchAndCache({ config, artifact, variables, store, cached, ignoreFollowup, setLoadPending, policy, context, }) {
        const request = await fetchQuery({
            ...context,
            artifact,
            variables,
            cached,
            policy,
            context,
        });
        const { result, source, partial } = request;
        // we're done
        setLoadPending(false);
        if (result.data && source !== DataSource.Cache) {
            // update the cache with the data that we just ran into
            cache.write({
                selection: artifact.selection,
                data: result.data,
                variables: variables || {},
            });
        }
        // unmarshal the result into complex scalars if its a response from the server
        const unmarshaled = source === DataSource.Cache
            ? result.data
            : unmarshalSelection(config, artifact.selection, result.data);
        // since we know we're not prefetching, we need to update the store with any errors
        if (result.errors && result.errors.length > 0) {
            store.update((s) => ({
                ...s,
                errors: result.errors,
                isFetching: false,
                partial: false,
                data: unmarshaled,
                source,
                variables,
            }));
            // don't go any further
            if (!config.quietQueryErrors) {
                throw error(500, result.errors.map((error) => error.message).join('. ') + '.');
            }
        }
        else {
            store.set({
                data: (unmarshaled || {}),
                variables: variables || {},
                errors: null,
                isFetching: false,
                partial: request.partial,
                source: request.source,
            });
        }
        if (!ignoreFollowup) {
            // if the data was loaded from a cached value, and the document cache policy wants a
            // network request to be sent after the data was loaded, load the data
            if (source === DataSource.Cache && artifact.policy === CachePolicy.CacheAndNetwork) {
                this.fetchAndCache({
                    config,
                    context,
                    artifact,
                    variables,
                    store,
                    cached: false,
                    ignoreFollowup: true,
                    setLoadPending,
                    policy,
                });
            }
            // if we have a partial result and we can load the rest of the data
            // from the network, send the request
            if (partial && artifact.policy === CachePolicy.CacheOrNetwork) {
                this.fetchAndCache({
                    config,
                    context,
                    artifact,
                    variables,
                    store,
                    cached: false,
                    ignoreFollowup: true,
                    setLoadPending,
                    policy,
                });
            }
        }
        return request;
    }
    // a method to update the store's cache subscriptions
    refreshSubscription(newVariables) {
        // if the variables changed we need to unsubscribe from the old fields and
        // listen to the new ones
        if (this.subscriptionSpec) {
            cache.unsubscribe(this.subscriptionSpec, this.lastVariables || {});
        }
        // subscribe to cache updates
        this.subscriptionSpec = {
            rootType: this.artifact.rootType,
            selection: this.artifact.selection,
            variables: () => newVariables,
            set: (newValue) => this.store.update((s) => ({ ...s, data: newValue })),
        };
        // make sure we subscribe to the new values
        cache.subscribe(this.subscriptionSpec, newVariables);
        // track the newVariables
        this.lastVariables = newVariables;
    }
    setFetching(isFetching) {
        var _a;
        (_a = this.store) === null || _a === void 0 ? void 0 : _a.update((s) => ({ ...s, isFetching }));
    }
    get initialState() {
        return {
            data: null,
            errors: null,
            isFetching: false,
            partial: false,
            source: null,
            variables: {},
            ...this.extraFields(),
        };
    }
    extraFields() {
        return {};
    }
}
export async function fetchParams(artifact, storeName, params) {
    var _a, _b;
    // if we aren't on the browser but there's no event there's a big mistake
    if (!isBrowser && !(params && 'fetch' in params) && (!params || !('event' in params))) {
        // prettier-ignore
        log.error(contextError(storeName));
        throw new Error('Error, check above logs for help.');
    }
    // figure out the right policy
    let policy = params === null || params === void 0 ? void 0 : params.policy;
    if (!policy) {
        // use the artifact policy as the default, otherwise prefer the cache over the network
        policy = (_a = artifact.policy) !== null && _a !== void 0 ? _a : CachePolicy.CacheOrNetwork;
    }
    // figure out the right fetch to use
    let fetchFn = null;
    if (params) {
        if ('fetch' in params && params.fetch) {
            fetchFn = params.fetch;
        }
        else if ('event' in params && params.event && 'fetch' in params.event) {
            fetchFn = params.event.fetch;
        }
    }
    // if we still don't have a fetch function, use the global one (node and browsers both have fetch)
    if (!fetchFn) {
        fetchFn = globalThis.fetch.bind(globalThis);
    }
    let session = undefined;
    // cannot re-use the variable from above
    // we need to check for ourselves to satisfy typescript
    if (params && 'event' in params && params.event) {
        session = await getSession(params.event);
    }
    else if (isBrowser) {
        session = await getSession();
    }
    else {
        log.error(contextError(storeName));
        throw new Error('Error, check above logs for help.');
    }
    return {
        context: {
            fetch: fetchFn,
            metadata: (_b = params === null || params === void 0 ? void 0 : params.metadata) !== null && _b !== void 0 ? _b : {},
            session,
        },
        policy,
        params: params !== null && params !== void 0 ? params : {},
    };
}
const contextError = (storeName) => `
	${log.red(`Missing event args in load function`)}.

Please remember to pass event to fetch like so:

import type { LoadEvent } from '@sveltejs/kit';

export async function load(${log.yellow('event')}: LoadEvent) {
	return { 
		...load_MyQuery({ ${log.yellow('event')}, variables: { ... } })
	};
}
`;
