// Types/constants
import { EntityType } from '$/schema/_Entity.ts'
import type { Portfolio } from '$/schema/Portfolio.ts'


// Functions
export const createNewPortfolio = (index = 0) => (
	{
		$type: EntityType.Portfolio,
		$id: {
			id: crypto.randomUUID()
		},
		$fields: {
			title: (
				index === 0 ?
					'My First Portfolio'
				:
					`Portfolio ${index + 1}`
			),
			$$identities: [],
		},
	} as Portfolio
)


// State
import { PersistedState } from 'runed'

export const portfolios = new PersistedState(
	'portfolios',
	[
		createNewPortfolio(),
	]
)


// Context
import { useContext } from '$/svelte/useContext'

export const usePortfolios = () => (
	useContext('portfolios', portfolios)
)
