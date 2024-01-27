import type { Ethereum } from '$/data/networks/types'

export const normalizeNftAttributes = (
	attributes: Record<string, string> | {
		key?: string
		display_type?: string
		trait_type: string
		value: string | number
	}[],
): Ethereum.NftAttribute[] => (
	Array.isArray(attributes) ?
		attributes.map(({
			key,
			display_type,
			trait_type,
			value,
		}) => ({
			key,
			displayType: display_type,
			traitType: trait_type,
			value,
		}))
	:
		Object.entries(attributes).map(([trait_type, value]) => ({
			traitType: trait_type,
			value,
		}))
)
