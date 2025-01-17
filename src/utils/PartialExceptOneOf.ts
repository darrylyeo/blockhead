export type PartialExceptOneOf<
	T,
	K extends keyof T = keyof T
> = (
	& Partial<T>
	& { [P in K]: Required<Pick<T, P>> }[K]
)
