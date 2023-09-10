// Fireblocks NCW Server
import { createTRPCHandle } from 'trpc-sveltekit'
import { createContext, router } from './api/fireblocks-ncw/server'
export const handleFireblocksNcwServer = createTRPCHandle({ router, createContext })


import { sequence } from '@sveltejs/kit/hooks'
export const handle = sequence(handleFireblocksNcwServer)
