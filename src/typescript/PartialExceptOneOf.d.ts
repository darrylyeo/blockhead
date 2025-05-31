export type PartialExceptOneOf<
	T,
	K extends (
		T extends T ?
			keyof T
		:
			never
	) = (
		T extends T ?
			keyof T
		:
			never
	)
> = (
	& Partial<T>
	& { [P in K]: Required<Pick<T, P>> }[K]
)
