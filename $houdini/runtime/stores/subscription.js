import { writable } from 'svelte/store';
import { isBrowser } from '../adapter';
import cache from '../cache';
import { deepEquals } from '../lib/deepEquals';
import { getCurrentClient } from '../lib/network';
import { marshalInputs, unmarshalSelection } from '../lib/scalars';
import { CompiledSubscriptionKind } from '../lib/types';
import { BaseStore } from './store';
export class SubscriptionStore extends BaseStore {
    constructor({ artifact }) {
        super();
        this.kind = CompiledSubscriptionKind;
        // the function to call to unregister the subscription
        this.clearSubscription = () => { };
        // listen might be called multiple times while mounted
        this.lastVariables = null;
        this.artifact = artifact;
        this.store = writable(null);
    }
    subscribe(...args) {
        var _a;
        return (_a = this.store) === null || _a === void 0 ? void 0 : _a.subscribe(...args);
    }
    async listen(variables) {
        // @ts-expect-error: typechecking cjs/esm interop is hard
        // pull the query text out of the compiled artifact
        const { raw: text, selection } = this.artifact.default || this.artifact;
        // subscription.listen is a no-op on the server
        if (!isBrowser) {
            return;
        }
        // pull out the current client
        const config = await this.getConfig();
        const env = await getCurrentClient();
        // we need to make sure that the user provided a socket connection
        if (!env.socket) {
            throw new Error('The current Houdini Client is not configured to handle subscriptions. Make sure you ' +
                'passed a socketClient to HoudiniClient constructor.');
        }
        // marshal the inputs into their raw values
        const marshaledVariables = (await marshalInputs({
            input: variables || {},
            artifact: this.artifact,
        }));
        // if the variables haven't changed, don't do anything
        if (deepEquals(this.lastVariables, marshaledVariables)) {
            return;
        }
        // clear any existing subscription
        this.clearSubscription();
        // save the last set
        this.lastVariables = marshaledVariables;
        // start listening for updates from the server
        this.clearSubscription = env.socket.subscribe({
            query: text,
            variables: marshaledVariables,
        }, {
            next: ({ data, errors }) => {
                // make sure there were no errors
                if (errors) {
                    throw errors;
                }
                // if we got a result
                if (data) {
                    // update the cache with the result
                    cache.write({
                        selection,
                        data,
                        variables: marshaledVariables,
                    });
                    // update the local store
                    this.store.set(unmarshalSelection(config, this.artifact.selection, data));
                }
            },
            error(data) { },
            complete() { },
        });
    }
    unlisten() {
        this.clearSubscription();
        this.clearSubscription = () => { };
        this.lastVariables = null;
    }
}
