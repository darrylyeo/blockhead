import { AccountId } from 'caip'
import type { Ethereum } from './networks/types'


export const getCaip10AccountId = ({
	network,
	address,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
}) => (
	AccountId.format({
		chainId: {
			namespace: 'eip155',
			reference: String(network.chainId),
		},
		address,
	})
)

/*
import { type Caip2Namespace, type BlockchainName, caip2NamespaceForBlockchain } from './caip2'
import type { Ethereum } from './networks/types'


export type Caip10AccountId = `${Ethereum.Address}@${Caip2Namespace}:${BlockchainName}`

export const getCaip10AccountId = ({
	address,
	blockchainName = 'Ethereum'
}: {
	address: Ethereum.Address;
	blockchainName: BlockchainName;
}): Caip10AccountId => (
	`${address}@${caip2NamespaceForBlockchain[blockchainName]}:${blockchainName}`
)
*/
