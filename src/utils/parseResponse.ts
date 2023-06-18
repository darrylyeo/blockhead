import { detectContentTypeFromArrayBuffer, detectContentTypeFromBuffer } from './detectContentType'

export const parseResponse = async (response: Response) => {
	if(!response.body) return {}

	const contentType = response.headers.get('content-type') ?? undefined
	const contentLength = Number(response.headers.get('content-length'))

	const [
		text,
		blob,
	] = await Promise.all([
		response.clone().text(),
		response.clone().blob(),
	])

	let inferredContentType
	if(!contentType){
		({ /*extension,*/ mimeType: inferredContentType } = await response.clone().arrayBuffer().then(detectContentTypeFromArrayBuffer))

		if(!inferredContentType)
			({ mimeType: inferredContentType } = await response.clone().arrayBuffer().then(Buffer.from).then(detectContentTypeFromBuffer))
	}

	return {
		text,
		blob,
		contentType: contentType ?? inferredContentType,
		contentLength,
		isContentTypeInferred: Boolean(!contentType && inferredContentType)
	}
}
