import type { LayoutLoad } from './$types'
import { redirect } from '@sveltejs/kit'
import { resolveRoute } from '$app/paths'

import { networkRedirectsBySlug } from '../../../data/networks'

export const load: LayoutLoad = ({ route, params }) => {
	const newParams = {
		...params,
		networkSlug: networkRedirectsBySlug[params.networkSlug]
	}

	redirect(308, resolveRoute(route.id, newParams))
}
