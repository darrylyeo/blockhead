type ApiOptions = {
	baseUrl: string
}

const post = async <T>(
	path: string,
	body: unknown,
	{
		baseUrl
	}: ApiOptions
) => {
	const response = await fetch(`${baseUrl}/${path}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (!response.ok) throw response

	return await response.json() as T
}

export const querySquid = async (
	{
		query,
		variables
	}: {
		query?: string
		variables?: Record<string, unknown>
	},
	options: ApiOptions
) => (
	(await post<{ data: unknown }>(
		'',
		{
			query,
			variables
		},
		options
	)).data
)
