import { getContext, hasContext, setContext } from 'svelte'

export const useContext = <
	T
>(
	key: string,
	value: T
) => (
	hasContext('portfolios') ?
		getContext<T>(key)
	:
		setContext(key, value)
)
