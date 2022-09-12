import '../fonts.css'
import '../app.css'


import houdiniEnvironment from '../data/ens/houdini-environment'
import { setEnvironment } from '$houdini'

setEnvironment(houdiniEnvironment)


// Svelte Query
import { QueryClient, QueryClientProvider, persistQueryClient, broadcastQueryClient, createWebStoragePersistor } from '@sveltestack/svelte-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			keepPreviousData: true,
			// staleTime: Infinity,
			cacheTime: Infinity,
		},
	}
})

const localStoragePersistor = createWebStoragePersistor({
	storage: globalThis.localStorage
})
persistQueryClient({
	queryClient,
	persistor: localStoragePersistor,
})

// broadcastQueryClient({
// 	queryClient,
// 	broadcastChannel: globalThis.location?.origin,
// })



import process from 'process'
import { Buffer } from 'buffer'

globalThis.global = globalThis
globalThis.Buffer = Buffer
globalThis.process = process
