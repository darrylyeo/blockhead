export const invertRecord = <
	T extends Record<string, any>
>(record: T): {
	[key in keyof T as T[key]]: key;
} => (
	Object.fromEntries(
		Object.entries(record)
			.map(([key, value]) => [value, key])
	)
)
