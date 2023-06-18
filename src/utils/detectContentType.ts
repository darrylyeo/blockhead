export const detectContentTypeFromBuffer = async (buffer: Buffer) => {
	const detectContentType = (await import('detect-content-type')).default
	return detectContentType(buffer)
}

export const detectContentTypeFromArrayBuffer = async (arrayBuffer: ArrayBuffer) => {
	const { fileTypeFromBuffer } = await import('file-type')

	const { ext: extension, mime: mimeType } = await fileTypeFromBuffer(arrayBuffer) ?? {}

	return {
		extension,
		mimeType
	}
}

export const detectContentTypeFromStream = async (stream: ReadableStream | null) => {
	const { fileTypeFromStream } = await import('file-type')

	const { ext: extension, mime: mimeType } = await fileTypeFromStream(stream) ?? {}

	return {
		extension,
		mimeType
	}
}
