export function memoized<A, T>(func: (...args: A[]) => T) {
	const cache: Record<string, T> = {}
	return function(...args: A[]): T {
		const key = JSON.stringify(args)
		return cache[key] ??= func(...args)
	}
}

export function memoizedAsync<A, T>(func: (...args: A[]) => Promise<T>) {
	const cache: Record<string, T> = {}
	return async function(...args: A[]): Promise<T> {
		const key = JSON.stringify(args)
		return cache[key] ??= await func(...args)
	}
}