import { query } from "$app/server"

export const queryAmp = query(
	'unchecked',
	async ({
		query: sqlQuery,
		dataset
	}: {
		query: string
		dataset?: string
	}) => {
		const { queryAmp } = await import("../api/TheGraph/Amp/api.ts")

		// No API key passed here, handled in the API function
		const result = await queryAmp({
			query: sqlQuery,
			dataset
		})

		return result
	}
)
