// Types/constants
import { EntityType } from '$/schema/_Entity.ts'
import type { Portfolio } from '$/schema/Portfolio.ts'


// Functions
export const createDefaultPortfolio = () => (
	{
		$type: EntityType.Portfolio,
		$id: {
			id: crypto.randomUUID()
		},
		$fields: {
			title: 'My First Portfolio',
			$$identities: [],
		},
	} as Portfolio
)


// State
import { PersistedState } from 'runed'

export const portfolios = new PersistedState(
	'portfolios',
	[
		createDefaultPortfolio(),
	]
)


// Context
import { useContext } from '$/svelte/useContext'

export const usePortfolios = () => (
	useContext('portfolios', portfolios)
)
