export const isTruthy = <T>(value: T | null | undefined): value is T => (
	Boolean(value)
)
