<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'

	export let provider: Ethereum.Provider
	export let addressOrENSName: ENS.Domain | Ethereum.Address
	export let passiveReverseResolution = false


	import { isAddress } from '@ethersproject/address'


	export let address
	export let ensName
	export let isReverseResolving

	$: isReverseResolving = isAddress(addressOrENSName)

	let addressPromise
	let ensNamePromise

	// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
	// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
	$: if(isReverseResolving){
		address = addressOrENSName
		addressPromise = Promise.resolve(address)
		ensNamePromise = provider?.lookupAddress(address)
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
			throw new Error(`The ENS Name "${ensName}" couldn't be resolved to an address.`)
		})
			.then(_ => address = _)
		// addressPromise = ens.name(addressOrENSName).getAddress()
		ensNamePromise = Promise.resolve(ensName)
	}


	import Loader from './Loader.svelte'
</script>


{#if isReverseResolving && !passiveReverseResolution}
	<Loader
		fromPromise={ensNamePromise && (() => ensNamePromise)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="ENS"
		loadingMessage="Querying the Ethereum Name Service..."
		errorMessage={`Error reverse-resolving address "${address}"`}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else}
	<Loader
		fromPromise={addressPromise && (() => addressPromise)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="ENS"
		loadingMessage="Querying the Ethereum Name Service..."
		errorMessage={`Error resolving ENS name "${ensName}"`}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{/if}