import type { Ethereum } from '../../../data/networks/types'
import type { BlockchainName } from '../../../data/caip2'
import { getCaip10AccountId, type Caip10AccountId } from '../../../data/caip10'

import type CeramicClient from '@ceramicnetwork/http-client'
import type { DID } from 'dids'
import { getCeramicClient } from '../client'

import { Caip10Link } from '@ceramicnetwork/stream-caip10-link'

export const getCaip10Link = async ({
	ceramic: ceramicClient = getCeramicClient(),
	address,
	blockchainName,
	caip10AccountId = address && blockchainName && getCaip10AccountId({ address, blockchainName })
}: {
	ceramic: CeramicClient,
	address?: Ethereum.Address,
	blockchainName?: BlockchainName,
	caip10AccountId: Caip10AccountId,
}) => {
	const caip10Link = await Caip10Link.fromAccount(
		ceramicClient,
		caip10AccountId,
	)
	// const linkedDid = caip10Link.did
	// const streamId = caip10Link.id.toString()
	return caip10Link
}


import type { EthereumAuthProvider/*, EOSIOProvider, FilecoinProvider, PolkadotProvider*/ } from '@3id/connect'

export const linkBlockchainAccountToDid = async ({
	caip10Link,
	authProvider,
	did
}: {
	caip10Link: Caip10Link,
	authProvider: EthereumAuthProvider // | EOSIOProvider | FilecoinProvider | PolkadotProvider
	did: DID,
}) => {
	await caip10Link.setDid(did, authProvider, {
		anchor: true,
		publish: true
	})

	return caip10Link

	// return authProvider.createLink(did.id)
}