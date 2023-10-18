import type { Signer } from 'ethers'
import type { Ethereum } from '../../data/networks/types'

export type Did = `did:${string}:${string}`

export const getDidSession = async ({
	network,
	address,
	signer,
	resources,
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
	signer: Signer,
	resources: string[],
}) => {
	const { getCaip10AccountId } = await import('../../data/caip10')
	const accountIdString = getCaip10AccountId({ network, address })
	
	const { AccountId } = await import('caip')
	const accountId = new AccountId(accountIdString)

	const { EthereumWebAuth } = await import('@didtools/pkh-ethereum')
	const authMethod = await EthereumWebAuth.getAuthMethod(signer.provider, accountId)

	const { DIDSession } = await import('did-session')
	return await DIDSession.get(accountId, authMethod, {
		resources
	})
}
