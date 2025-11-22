import type { UnionToIntersection } from './UnionToIntersection'

export type PartialExceptOneOf<U> = (
	U extends any ?
		U & Partial<UnionToIntersection<U>>
	:
		never
)
