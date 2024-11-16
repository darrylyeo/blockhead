import { error, json, type Handle } from '@sveltejs/kit'

const PROXY_PATH = '/api-proxy/'

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith(PROXY_PATH)) {
		const url = new URL(`${event.url.pathname.replace(PROXY_PATH, '')}${event.url.search}`)

		if(![
			'https://api.1inch.dev',
			'https://api.disco.xyz',
			'https://api.intuition.systems',
			'https://api.pinata.cloud',
			'https://graph.cast.k3l.io',
		].includes(url.origin))
			error(403, 'Request Forbidden.')

		const response = await event.fetch(url, {
			body: event.request.body,
			method: event.request.method,
			headers: new Headers({
				'Authorization': event.request.headers.get('Authorization')
			})
		})

		if(!response.ok){
			const result = await response.text()

			try {
				return error(response.status, JSON.parse(result))
			}catch{
				return error(response.status, result)
			}
		}

		return (
			json(
				await response.json()
			)
		)
	}

	return await resolve(event)
}
