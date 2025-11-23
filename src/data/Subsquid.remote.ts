import type { EvmActor } from '../schema/EvmActor.ts'

import { query } from '$app/server'

export const querySquid = query(
	'unchecked',
	async ({
		url,
		graphqlQuery,
		variables
	}: {
		url: string,
		graphqlQuery?: string,
		variables?: Record<string, unknown>
	}) => {
		const { querySquid } = await import('../api/Subsquid/api.ts')

		const result = await querySquid({
			url,
			query: graphqlQuery,
			variables
		})

		return result
	}
)
