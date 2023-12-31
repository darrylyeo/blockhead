export const isTruthy = <T>(value: T | '' | null | undefined | 0 | false): value is T => !!value
