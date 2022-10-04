import { writable } from 'svelte/store';
import { CompiledFragmentKind, } from '../lib/types';
import { BaseStore } from './store';
// a fragment store exists in multiple places in a given application so we
// can't just return a store directly, the user has to load the version of the
// fragment store for the object the store has been mixed into
export class FragmentStore extends BaseStore {
    constructor({ artifact, storeName }) {
        super();
        this.kind = CompiledFragmentKind;
        this.context = null;
        this.artifact = artifact;
        this.name = storeName;
    }
    get(initialValue) {
        // at the moment a fragment store doesn't really do anything
        // but we're going to keep it wrapped in a store so we can eventually
        // optimize the updates
        let store = writable(initialValue);
        return {
            kind: CompiledFragmentKind,
            subscribe: (...args) => {
                return store.subscribe(...args);
            },
            update: (val) => store === null || store === void 0 ? void 0 : store.set(val),
        };
    }
}
