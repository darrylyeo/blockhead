import { browser } from '$app/environment'

import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit'
import type { TrpcRouter } from './server'

let browserClient: ReturnType<typeof createTRPCClient<TrpcRouter>>

export const trpc = (init?: TRPCClientInit) => {
	if (browser && browserClient) return browserClient

	const client = createTRPCClient<TrpcRouter>({ init })
	if (browser) browserClient = client
	return client
}
