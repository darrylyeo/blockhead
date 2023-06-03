// @ts-nocheck
import type { LayoutLoad } from './$types'
import { redirect, resolvePath } from '@sveltejs/kit'

import { networkRedirectsBySlug } from '../../../data/networks'

export const load = ({ route, params }: Parameters<LayoutLoad>[0]) => {
	const newParams = {
		...params,
		networkSlug: networkRedirectsBySlug[params.networkSlug]
	}

	throw redirect(308, resolvePath(route.id, newParams))
}
