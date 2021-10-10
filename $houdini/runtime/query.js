// externals
import { writable, readable } from 'svelte/store';
import { onDestroy, onMount } from 'svelte';
// locals
import { CachePolicy, DataSource, } from './types';
import cache from './cache';
import { setVariables } from './context';
import { executeQuery } from './network';
import { marshalInputs, unmarshalSelection } from './scalars';
// @ts-ignore: this file will get generated and does not exist in the source code
import { getSession, goTo, isBrowser } from './adapter.mjs';
import { rootID } from './cache/cache';
export function query(document) {
    var _a;
    // make sure we got a query document
    if (document.kind !== 'HoudiniQuery') {
        throw new Error('query() must be passed a query document');
    }
    // we might get re-exported values nested under default
    // @ts-ignore: typing esm/cjs interop is hard
    const artifact = document.artifact.default || document.artifact;
    // @ts-ignore: typing esm/cjs interop is hard
    const config = document.config.default || document.config;
    // a query is never 'loading'
    const loading = writable(false);
    // this payload has already been marshaled
    let variables = document.variables;
    // embed the variables in the components context
    setVariables(() => {
        return variables;
    });
    // dry the reference to the initial value
    const initialValue = (_a = document.initialValue) === null || _a === void 0 ? void 0 : _a.data;
    // define the store we will hold the data
    const store = writable(unmarshalSelection(config, artifact.selection, initialValue));
    // pull out the writer for internal use
    let subscriptionSpec = {
        rootType: artifact.rootType,
        selection: artifact.selection,
        variables: () => variables,
        set: store.set,
    };
    // when the component mounts
    onMount(() => {
        // if we were given data on mount
        if (initialValue) {
            // update the cache with the data that we just ran into
            cache.write({
                selection: artifact.selection,
                data: initialValue,
                variables,
            });
            // stay up to date
            if (subscriptionSpec) {
                cache.subscribe(subscriptionSpec, variables);
            }
        }
    });
    // the function used to clean up the store
    onDestroy(() => {
        subscriptionSpec = null;
        cache.unsubscribe({
            rootType: artifact.rootType,
            selection: artifact.selection,
            set: store.set,
            variables: () => variables,
        }, variables);
    });
    const sessionStore = getSession();
    function writeData(newData, newVariables) {
        const updated = subscriptionSpec && JSON.stringify(variables) !== JSON.stringify(newVariables);
        // if the variables changed we need to unsubscribe from the old fields and
        // listen to the new ones
        if (updated) {
            cache.unsubscribe(subscriptionSpec, variables);
        }
        // write the data we received
        cache.write({
            selection: artifact.selection,
            data: newData.data,
            variables: newVariables,
        });
        if (updated) {
            cache.subscribe(subscriptionSpec, newVariables);
        }
        // update the local store
        store.set(unmarshalSelection(config, artifact.selection, newData.data));
        // save the new variables
        variables = newVariables || {};
    }
    return {
        // the store should be read-only from the caller's perspective
        data: { subscribe: store.subscribe },
        // the refetch function can be used to refetch queries possibly with new variables/arguments
        async refetch(newVariables) {
            try {
                // Use the initial/previous variables
                let variableBag = variables;
                // If new variables are set spread the new variables over the previous ones.
                if (newVariables) {
                    variableBag = { ...variableBag, ...newVariables };
                }
                // Execute the query
                const result = await executeQuery(artifact, variableBag, sessionStore, false);
                // Write the data to the cache
                writeData(result, variableBag);
            }
            catch (error) {
                throw error;
            }
        },
        // used primarily by the preprocessor to keep local state in sync with
        // the data given by preload
        writeData,
        loading: { subscribe: loading.subscribe },
        error: readable(null, () => { }),
        onLoad(newData, newVariables, source) {
            // we got new data from mounting, write it
            writeData(newData, newVariables);
            // if we are mounting on a browser we might need to perform an additional network request
            if (isBrowser) {
                // if the data was loaded from a cached value, and the document cache policy wants a
                // network request to be sent after the data was loaded, load the data
                if (source === DataSource.Cache &&
                    artifact.policy === CachePolicy.CacheAndNetwork) {
                    // this will invoke pagination's refetch because of javascript's magic this binding
                    this.refetch();
                }
            }
        },
    };
}
// we need something to dress up the result of `query` to be used for a route.
export const routeQuery = ({ queryHandler, artifact, source, }) => {
    // the query handler doesn't need any extra treatment for a route
    return queryHandler;
};
// component queries are implemented as wrappers over the normal query that fire the
// appropriate network request and then write the result to the underlying store
export const componentQuery = ({ config, artifact, queryHandler, variableFunction, getProps, }) => {
    // pull out the function we'll use to update the store after we've fired it
    const { writeData, refetch } = queryHandler;
    // we need our own store to track loading state (the handler's isn't meaningful)
    const loading = writable(true);
    // a store to track the error state
    const error = writable(null);
    // compute the variables for the request
    let variables;
    let variableError = null;
    // the function invoked by `this.error` inside of the variable function
    const setVariableError = (code, msg) => {
        // create an error
        variableError = new Error(msg);
        variableError.code = code;
        // return no variables to assign
        return null;
    };
    // the context to invoke the variable function with
    const variableContext = {
        redirect: goTo,
        error: setVariableError,
    };
    // the function to call to reload the data while updating the internal stores
    const reload = (vars) => {
        // set the loading state
        loading.set(true);
        // fire the query
        return refetch(vars)
            .catch((err) => {
            error.set(err.message ? err : new Error(err));
        })
            .finally(() => {
            loading.set(false);
        });
    };
    $: {
        // clear any previous variable error
        variableError = null;
        // compute the new variables
        variables = marshalInputs({
            artifact,
            config,
            input: (variableFunction === null || variableFunction === void 0 ? void 0 : variableFunction.call(variableContext, { props: getProps() })) || {},
        });
    }
    // a component should fire the query and then write the result to the store
    $: {
        // remember if the data was loaded from cache
        let cached = false;
        // if there was an error while computing variables
        if (variableError) {
            error.set(variableError);
        }
        // the artifact might have a defined cache policy we need to enforce
        else if ([
            CachePolicy.CacheOrNetwork,
            CachePolicy.CacheOnly,
            CachePolicy.CacheAndNetwork,
        ].includes(artifact.policy) &&
            cache.internal.isDataAvailable(artifact.selection, variables)) {
            writeData({
                data: cache.internal.getData(cache.internal.record(rootID), artifact.selection, variables),
                errors: [],
            }, variables);
            cached = true;
        }
        // there was no error while computing the variables
        else {
            // load the query
            reload(variables);
        }
        // if we loaded a cached value and we haven't sent the follow up
        if (cached && artifact.policy === CachePolicy.CacheAndNetwork) {
            // reload the query
            reload(variables);
        }
    }
    // return the handler to the user
    return {
        ...queryHandler,
        refetch: reload,
        loading: { subscribe: loading.subscribe },
        error: { subscribe: error.subscribe },
    };
};
