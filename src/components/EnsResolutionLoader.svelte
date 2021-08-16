<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'

	export let provider: Ethereum.Provider
	export let addressOrENSName: Ethereum.Address | string
	export let passiveForwardResolution = false
	export let passiveReverseResolution = false


	import { preferredEthereumProvider } from '../data/ethereum/preferences'
	import { getEthersProvider } from '../data/ethereum/provider'
	import { networksByChainID } from '../data/ethereum/networks'

	$: if(!provider)
		getEthersProvider(networksByChainID[1], $preferredEthereumProvider).then(_ => provider = _)


	import { isAddress } from '@ethersproject/address'


	export let address
	export let ensName
	export let isReverseResolving

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
			throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name.`)
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
			throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address.`)
		})
			.then(_ => address = _)
		// addressPromise = ens.name(addressOrENSName).getAddress()
		ensNamePromise = Promise.resolve(ensName)
	}


	import Loader from './Loader.svelte'
</script>


{#if addressOrENSName && isReverseResolving && !passiveReverseResolution}
	<Loader
		fromPromise={ensNamePromise && (() => ensNamePromise)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="ENS"
		loadingMessage="Reverse-resolving address to a name on the Ethereum Name Service..."
		errorMessage={`Error reverse-resolving address to ENS name.`}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else if addressOrENSName && !isReverseResolving && !passiveForwardResolution}
	<Loader
		fromPromise={addressPromise && (() => addressPromise)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="ENS"
		loadingMessage="Resolving name to address on the Ethereum Name Service..."
		errorMessage={`Error resolving ENS name to address.`}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else}
	<slot name="header" {address} {ensName} {isReverseResolving} />
	<slot {address} {ensName} {isReverseResolving} />
{/if}