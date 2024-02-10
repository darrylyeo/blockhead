// Types/constants
import { networksBySlug } from '$/data/networks'


// Functions
import { resolveRoute } from '$app/paths'


// Farcaster Frame Routes
import { type FarcasterFrameRoutes, createSubmenu } from '$/utils/farcasterFrameRoutes'

export const farcasterFrameRoutes = [] satisfies FarcasterFrameRoutes<string>

export type FrameRoute = keyof typeof farcasterFrameRoutes
