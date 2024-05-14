import type { AnyVariables, OperationResult } from '@urql/svelte'

export const handleUrqlResult = <
	Data,
	Variables extends AnyVariables,
>(
	result: OperationResult<Data, Variables>,
) => {
	if(result.error)
		throw result.error

	return result.data
}
