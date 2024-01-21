import { error, json, type Handle } from '@sveltejs/kit'

const PROXY_PATH = '/api-proxy/'

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith(PROXY_PATH)) {
		const url = new URL(`${event.url.pathname.replace(PROXY_PATH, '')}${event.url.search}`)

		if(url.origin !== 'https://api.disco.xyz') error(403, 'Request Forbidden.')

		return (
			json(
				await event.fetch(url, {
					body: event.request.body,
					method: event.request.method,
					headers: new Headers({
						'Authorization': event.request.headers.get('Authorization')
					})
				}).then(response => response.json())
			)
		)
	}

	return await resolve(event)
}
