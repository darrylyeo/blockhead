// https://developers.ceramic.network/authentication/3id-did/3id-connect/

import { ThreeIdConnect, EthereumAuthProvider /*, EOSIOProvider, FilecoinProvider, PolkadotProvider */ } from '@3id/connect'


let threeIdConnect: ThreeIdConnect
export function getThreeIdConnect() {
	return threeIdConnect ||= new ThreeIdConnect()
}


import type { Ethereum } from '../ethereum/types'
import toWeb3Provider from 'ethers-to-web3'

export async function getDIDProviderFromEthereumProvider({
	threeIdConnect = getThreeIdConnect(),
	ethereumProvider,
	address
}: {
	threeIdConnect?: ThreeIdConnect
	ethereumProvider: Ethereum.Provider,
	address: Ethereum.Address
}) {
	ethereumProvider = toWeb3Provider(ethereumProvider)

	const authProvider = new EthereumAuthProvider(ethereumProvider, address, {})
	await threeIdConnect.connect(authProvider)

	const didProvider = await threeIdConnect.getDidProvider()

	return didProvider
}


import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

export function getDIDResolverRegistry(ceramic: CeramicClient) {
	const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) }
	return resolver
}


import { getCeramic } from './ceramic'

import type CeramicClient from '@ceramicnetwork/http-client'
import type { DIDProvider } from '@ceramicnetwork/common'
import type { ResolverRegistry } from 'did-resolver'
import { DID } from 'dids'

export async function getDID({
	ceramic = getCeramic(),
	didResolverRegistry = getDIDResolverRegistry(ceramic),
	didProvider
}: {
    ceramic?: CeramicClient,
    didResolverRegistry?: ResolverRegistry,
    didProvider: DIDProvider
}) {
	const did = new DID({
		resolver: didResolverRegistry
	})

	did.setProvider(didProvider)

	return did
}

export async function authenticateDID(did: DID){
	console.log('authenticateDID', did)
	await did.authenticate()
	console.log('authenticated')
}