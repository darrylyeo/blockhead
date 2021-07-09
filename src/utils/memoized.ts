export function memoized<A, T>(func: (...args: A[]) => T) {
	const cache: Record<string, T> = {}
	return function(...args: A[]): T {
		const key = args.toString()
		return cache[key] ??= func(...args)
	}
}

export function memoizedAsync<A, T>(func: (...args: A[]) => Promise<T>) {
	const cache: Record<string, T> = {}
	return async function(...args: A[]): Promise<T> {
		const key = args.toString()
		return cache[key] ??= await func(...args)
	}
}