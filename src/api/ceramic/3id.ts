// https://developers.ceramic.network/authentication/3id-did/3id-connect/

import { ThreeIdConnect, EthereumAuthProvider /*, EOSIOProvider, FilecoinProvider, PolkadotProvider */ } from '@3id/connect'


let threeIdConnect: ThreeIdConnect
export const getThreeIdConnect = () => {
    return threeIdConnect ||= new ThreeIdConnect()
}


import type { Ethereum } from '$/data/networks/types'
import toWeb3Provider from 'ethers-to-web3'

export const getDIDProviderFromEthereumProvider = async ({
    threeIdConnect = getThreeIdConnect(),
    ethereumProvider,
    address
}: {
    threeIdConnect?: ThreeIdConnect,
    ethereumProvider: Ethereum.Provider,
    address: Ethereum.Address
}) => {
    ethereumProvider = toWeb3Provider(ethereumProvider)

    const authProvider = new EthereumAuthProvider(ethereumProvider, address, {})
    await threeIdConnect.connect(authProvider)

    const didProvider = await threeIdConnect.getDidProvider()

    return didProvider
}


import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

export const getDIDResolverRegistry = (ceramic: CeramicClient) => {
    const resolver = { ...KeyDidResolver.getResolver(), ...ThreeIdResolver.getResolver(ceramic) }
    return resolver
}


import { getCeramicClient } from './client'

import type CeramicClient from '@ceramicnetwork/http-client'
import type { DIDProvider } from '@ceramicnetwork/common'
import type { ResolverRegistry } from 'did-resolver'
import { DID } from 'dids'

export const getDID = async ({
    ceramicClient = getCeramicClient(),
    didResolverRegistry = getDIDResolverRegistry(ceramicClient),
    didProvider
}: {
    ceramicClient?: CeramicClient,
    didResolverRegistry?: ResolverRegistry,
    didProvider: DIDProvider
}) => {
    const did = new DID({
        resolver: didResolverRegistry
    })

    did.setProvider(didProvider)

    return did
}

export const authenticateDID = async (did: DID) => {
    console.log('authenticateDID', did)
    await did.authenticate()
    console.log('authenticated')
}
