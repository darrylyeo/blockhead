export type ApolloResultLoading = {
	loading: true
	data?: undefined
	error?: undefined
}
export type ApolloResultError = {
	loading: false
	data?: undefined
	error: Error
}
export type ApolloResultData<TData = unknown> = {
	loading: false
	data: TData | null | undefined
	error?: undefined
}

export type ApolloResult<TData = unknown> = ApolloResultLoading | ApolloResultError | ApolloResultData<TData>
