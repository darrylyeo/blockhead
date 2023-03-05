export const isTruthy = <T>(value: T | '' | null | undefined | 0): value is T => !!value
