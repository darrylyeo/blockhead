export const streamFromAsyncIterable = async <T>(asyncIterable: AsyncIterable<T>) => {
	let firstChunk: T
	for await (firstChunk of asyncIterable) break

	return new ReadableStream({
		start: async controller => {
			controller.enqueue(firstChunk)

			for await (const chunk of asyncIterable)
				controller.enqueue(chunk)

			controller.close()
		}
	})
}

export const textFromAsyncIterable = async <T>(asyncIterable: AsyncIterable<T>) => {
	const decoder = new TextDecoder()

	let text = ''
	for await (const chunk of asyncIterable)
		text += decoder.decode(chunk, { stream: true })

	return text
}
