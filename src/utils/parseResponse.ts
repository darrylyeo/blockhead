export const parseResponse = async (response: Response) => {
	if(!response.body) return {}

	let contentType = response.headers.get('content-type') ?? undefined
	let contentLength = Number(response.headers.get('content-length'))

	const [
		text,
		blob,
	] = await Promise.all([
		response.clone().text(),
		response.clone().blob(),
	])

	return {
		text,
		blob,
		contentType,
		contentLength,
	}
}
