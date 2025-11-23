import { CoinType } from '$/schema/Coin'
import { EntityType } from '$/schema/_Entity'
import type { EvmNetwork } from '$/schema/EvmNetwork'

export const EthereumMainnet: EvmNetwork = {
	$type: EntityType.EvmNetwork,
	$id: { chainId: 1 },
	$fields: {
		chainId: 1,
		name: 'Ethereum Mainnet',
		nativeCurrency: {
			$type: EntityType.Coin,
			$id: { $network: { chainId: 1 } },
			$fields: {
				type: CoinType.NativeCurrency,
				symbol: 'ETH',
				decimals: 18
			}
		}
	}
}
