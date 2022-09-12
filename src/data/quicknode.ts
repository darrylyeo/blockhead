import type { Ethereum } from './ethereum/types'
import { NetworkProvider } from '../data/providers-types'
import { getEthersProvider } from '../data/providers'


const getQuickNodeProvider = async ({
	network
}: {
	network: Ethereum.Network,
}) =>
	await getEthersProvider({ network, networkProvider: NetworkProvider.QuickNode }) as JsonRpcProvider


// https://www.quicknode.com/docs/ethereum/qn_getWalletTokenBalance
export const getWalletTokenBalance = async ({
	network,
	address
}: {
	network: Ethereum.Network,
	address: Ethereum.Address
}) => {
	if(network.chainId !== 1)
		throw new Error('QuickNode only supports fetching token balances on Ethereum.')

	const provider = await getQuickNodeProvider({ network })

	return await provider.send('qn_getWalletTokenBalance', { wallet: address }) as {
		owner: string,
		assets: {
			address: string,
			name: string,
			decimals: number,
			symbol: string,
			logoURI: string,
			chain: string,
			network: string,
			amount: string
		}[]
	}
}
