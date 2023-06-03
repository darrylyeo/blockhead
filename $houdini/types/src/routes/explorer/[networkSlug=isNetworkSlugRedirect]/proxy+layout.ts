// @ts-nocheck
import type { LayoutLoad } from './$types'
import { redirect } from '@sveltejs/kit'

import { networkRedirectsBySlug } from '../../../data/networks'

// import { resolve_entry } from '@sveltejs/kit/src/utils/routing.js'

export const load = ({ route, params }: Parameters<LayoutLoad>[0]) => {
	const newParams = {
		...params,
		networkSlug: networkRedirectsBySlug[params.networkSlug]
	}

	throw redirect(308, route.id.replace(/\[(?:\.\.\.)?([A-Za-z0-9_]+)(?:=[A-Za-z0-9_]+)?\]/g, (_, param) => newParams[param]))
}
