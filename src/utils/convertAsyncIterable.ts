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

export const textFromAsyncIterable = async <T extends BufferSource>(asyncIterable: AsyncIterable<T>) => {
	const decoder = new TextDecoder()

	let text = ''
	for await (const chunk of asyncIterable)
		text += decoder.decode(chunk, { stream: true })

	return text

	// return (await Array.fromAsync(
	// 	asyncIterable,
	// 	chunk => decoder.decode(chunk, { stream: true })
	// ))
	// 	.join('')
}

export const asyncIterableFromStream = async function*(stream: ReadableStream) {
	const reader = stream.getReader()
  
	try {
		while (true) {
			const {done, value} = await reader.read()
			if (done) return
			yield value
		}
	}
	finally {
		reader.releaseLock()
	}
}
  