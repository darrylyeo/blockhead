// Context
import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'

export const createContext = async (event: RequestEvent) => {
	return {}
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>


// Router
import { initTRPC } from '@trpc/server'

export const t = initTRPC.context<TrpcContext>().create()

export const router = t.router({})

export type TrpcRouter = typeof router
