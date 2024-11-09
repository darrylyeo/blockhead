// Types
export type int32 = number
export type int64 = number
export type double = number

export type PaginatedResponse<T> = {
	items: T[]
	pageNumber: int32
	pageSize: int32
	hasNextPage: boolean
	nextPageUrl?: string
}
