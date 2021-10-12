<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'

	export let provider: Ethereum.Provider
	export let addressOrENSName: Ethereum.Address | string
	export let passiveForwardResolution = false
	export let passiveReverseResolution = false


	import { preferences } from '../data/ethereum/preferences'
	import { getEthersProvider } from '../data/ethereum/provider'
	import { networksByChainID } from '../data/ethereum/networks'

	$: if(!provider)
		getEthersProvider(networksByChainID[1], $preferences.rpcNetwork).then(_ => provider = _)


	import { isAddress } from '@ethersproject/address'


	export let address: Ethereum.Address
	export let ensName: string
	export let isReverseResolving: boolean

	$: isReverseResolving = isAddress(addressOrENSName)

	let addressPromise
	let ensNamePromise

	// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
	// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
	$: if(!addressOrENSName){
		address = undefined
		ensName = undefined
		isReverseResolving = undefined
		addressPromise = undefined
		ensNamePromise = undefined
	}else if(isReverseResolving){
		address = addressOrENSName
		addressPromise = Promise.resolve(address)
		ensNamePromise = provider?.lookupAddress(address).then(ensName => {
			if(ensName)
				return ensName
			// throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name.`)
			throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name (or there's an issue with the${$preferences.rpcNetwork === 'Auto' ? `` : ` ${$preferences.rpcNetwork}`} JSON-RPC connection).`)
		})
			.then(_ => ensName = _)
		// ensNamePromise = ens.getName(address).then(async name => {
		// 	if(address === await ens.name(name).getAddress())
		// 		return name 
		// })
	}else{
		ensName = addressOrENSName
		addressPromise = provider?.resolveName(ensName).then(address => {
			if(address)
				return address
			// throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address.`)
			throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address (or there's an issue with the${$preferences.rpcNetwork === 'Auto' ? `` : ` ${$preferences.rpcNetwork}`} JSON-RPC connection).`)
		})
			.then(_ => address = _)
		// addressPromise = ens.name(addressOrENSName).getAddress()
		ensNamePromise = Promise.resolve(ensName)
	}


	export let showIf: (({address, ensName}: {address: Ethereum.Address, ensName: string}) => boolean | any) | undefined


	$: viaRPC = $preferences.rpcNetwork === 'Auto' ? '' : ` via ${$preferences.rpcNetwork}`


	import Loader from './Loader.svelte'
</script>


{#if addressOrENSName && isReverseResolving && !passiveReverseResolution}
	<Loader
		fromPromise={ensNamePromise && (() => ensNamePromise)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="ENS"
		loadingMessage="Reverse-resolving address to a name on the Ethereum Name Service{viaRPC}"
		errorMessage={`Error reverse-resolving address to ENS name${viaRPC}.`}
		showIf={() => showIf?.({address, ensName})}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else if addressOrENSName && !isReverseResolving && !passiveForwardResolution}
	<Loader
		fromPromise={addressPromise && (() => addressPromise)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="ENS"
		loadingMessage="Resolving name to address on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error resolving ENS name to address${viaRPC}.`}
		showIf={() => showIf?.({address, ensName})}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else}
	<slot name="header" {address} {ensName} {isReverseResolving} />
	<slot {address} {ensName} {isReverseResolving} />
{/if}