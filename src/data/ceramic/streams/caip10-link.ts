import type CeramicClient from '@ceramicnetwork/http-client'
import type { DID } from 'dids'
import { getCeramicClient } from '../client'


type CAIP10AccountID = string


type BlockchainName = string

import type { Ethereum } from '../../networks/types'

const caip2NamespaceForBlockchain: Record<string, string> = {
	'Ethereum': 'eip155',
	'Cosmos': 'cosmos',
	'Filecoin': 'fil',
	'EOS': 'eosio',
	'Polkadot': 'polkadot'
}

export function getCAIP10AccountID({
	address,
	blockchainName = 'Ethereum'
}: {
	address: Ethereum.Address,
	blockchainName: BlockchainName
}): CAIP10AccountID {
	return `${address}@${caip2NamespaceForBlockchain[blockchainName]}:${blockchainName}`
}


import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'

export async function getCAIP10Link({
	ceramic: ceramicClient = getCeramicClient(),
	address,
	blockchainName,
	caip10AccountID = getCAIP10AccountID({address, blockchainName})
}: {
	ceramic: CeramicClient,
	address?: Ethereum.Address,
	blockchainName?: BlockchainName,
	caip10AccountID: CAIP10AccountID
}){
	const caip10Link = await Caip10Link.fromAccount(
		ceramicClient,
		caip10AccountID,
	)
	// const linkedDid = caip10Link.did
	// const streamId = caip10Link.id.toString()
	return caip10Link
}


import type { EthereumAuthProvider/*, EOSIOProvider, FilecoinProvider, PolkadotProvider*/ } from '@3id/connect'

export async function linkBlockchainAccountToDID({
	caip10Link,
	authProvider,
	did
}: {
	caip10Link: Caip10Link,
	authProvider: EthereumAuthProvider // | EOSIOProvider | FilecoinProvider | PolkadotProvider
	did: DID,
}){
	await caip10Link.setDid(did, authProvider, {
		anchor: true,
		publish: true
	})

	return caip10Link

	// return authProvider.createLink(did.id)
}