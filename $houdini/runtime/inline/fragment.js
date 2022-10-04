import * as log from '../lib/log';
import { ArtifactKind } from '../lib/types';
let hasWarned = false;
export function fragment(ref, store) {
    // @ts-ignore
    const oldAPI = 'kind' in (ref || {}) && Object.keys(ArtifactKind).includes(ref.kind);
    if (!hasWarned && oldAPI) {
        hasWarned = true;
        log.info(`${log.red('⚠️ argument order for fragment() has changed. The graphql tag now goes second:')}

export let prop

$: data = fragment(prop, graphql\`...\`)
`);
    }
    // make sure we got a query document
    if (store.kind !== 'HoudiniFragment') {
        throw new Error(`fragment can only take fragment documents. Found: ${store.kind}`);
    }
    // load the fragment store for the value
    const fragmentStore = store.get(ref);
    return {
        ...fragmentStore,
        data: { subscribe: fragmentStore.subscribe },
    };
}
export function paginatedFragment(initialValue, store) {
    // make sure we got a query document
    if (store.kind !== 'HoudiniFragment') {
        throw new Error('paginatedFragment() must be passed a fragment document: ' + store.kind);
    }
    // if we don't have a pagination fragment there is a problem
    if (!('paginated' in store)) {
        throw new Error('paginatedFragment() must be passed a fragment with @paginate');
    }
    // TODO: fix type checking paginated
    // @ts-ignore: the query store will only include the methods when it needs to
    // and the userland type checking happens as part of the query type generation
    return fragment(initialValue, store);
}
