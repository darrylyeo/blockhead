// DID URLs
import { parse } from 'did-resolver'

export type DidUrl = `did:${string}:${string}`

export const parseDidUrl = (didUrl: DidUrl) => (
	parse(didUrl)
)

export const isDidUrl = (string: string): string is DidUrl => {
	try {
		parse(string)
		return true
	}catch(e){
		return false
	}
}


// DID Sessions

import type { Signer } from 'ethers'
import type { Ethereum } from '../../data/networks/types'

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
