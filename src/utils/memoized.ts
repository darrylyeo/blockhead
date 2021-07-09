export function memoized<T>(func: () => T): () => T{
	const cache = {}
	return function(...args){
		const key = args.toString()
		return cache[key] ||= func(...args)
	}
}

export function memoizedAsync<T>(func: () => Promise<T>): () => Promise<T> {
	const cache = {}
	return async function(...args){
		const key = args.toString()
		return cache[key] ||= await func(...args)
	}
}