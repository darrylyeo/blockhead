<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'

	export let provider: Ethereum.Provider
	export let addressOrEnsName: Ethereum.Address | string
	export let passiveForwardResolution = false
	export let passiveReverseResolution = false


	import { preferences } from '../data/ethereum/preferences'
	import { getEthersProvider } from '../data/providers'
	import { networksByChainID } from '../data/ethereum/networks'

	$: if(!provider)
		getEthersProvider({
			network: networksByChainID[1],
			networkProvider: $preferences.rpcNetwork
		}).then(_ => provider = _)


	import { isAddress } from '@ethersproject/address'


	export let address: Ethereum.Address
	export let ensName: string
	export let isReverseResolving: boolean

	$: isReverseResolving = isAddress(addressOrEnsName)

	$: if(!addressOrEnsName){
		address = undefined
		ensName = undefined
		isReverseResolving = undefined
	}else if(isReverseResolving){
		address = addressOrEnsName
	}else{
		ensName = addressOrEnsName
	}


	import { useQuery } from '@sveltestack/svelte-query'

	// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
	// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })

	import { memoizedAsync } from '../utils/memoized'

	const lookupAddress = memoizedAsync(async (address: Ethereum.Address) => {
		const ensName = await provider.lookupAddress(address)
		if(ensName)
			return ensName

		// throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name.`)
		throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name (or there's an issue with the${$preferences.rpcNetwork === 'Auto' ? `` : ` ${$preferences.rpcNetwork}`} JSON-RPC connection).`)

		// ensNamePromise = ens.getName(address).then(async name => {
		// 	if(address === await ens.name(name).getAddress())
		// 		return name 
		// })
	})

	const resolveName = memoizedAsync(async (ensName: string) => {
		const address = await provider.resolveName(ensName)
		if(address)
			return address

		// throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address.`)
		throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address (or there's an issue with the${$preferences.rpcNetwork === 'Auto' ? `` : ` ${$preferences.rpcNetwork}`} JSON-RPC connection).`)

		// addressPromise = ens.name(addressOrEnsName).getAddress()
	})


	export let showIf: (({address, ensName}: {address: Ethereum.Address, ensName: string}) => boolean | any) | undefined
	export let layoutClass: string
	export let clip = true

	$: viaRPC = $preferences.rpcNetwork === 'Auto' ? '' : ` via ${$preferences.rpcNetwork}`


	import Loader from './Loader.svelte'
</script>


{#if addressOrEnsName && isReverseResolving && !passiveReverseResolution}
	<Loader
		fromUseQuery={
			address && provider && useQuery({
				queryKey: ['EnsReverseResolution', {
					address
				}],
				queryFn: (async () =>
					await lookupAddress(address.toLowerCase())
				)
			})
		}
		loadingIcon="/logos/ENS.svg"
		loadingIconName="ENS"
		loadingMessage="Reverse-resolving address to a name on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error reverse-resolving address to ENS name${viaRPC}.`}
		showIf={showIf ? () => showIf({address, ensName}) : undefined}
		{layoutClass}
		{clip}
		bind:result={ensName}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else if addressOrEnsName && !isReverseResolving && !passiveForwardResolution}
		<!-- fromPromise={async () => (
			await resolveName(ensName.toLowerCase())
		)} -->
	<Loader
		fromUseQuery={
			ensName && provider && useQuery({
				queryKey: ['EnsResolution', {
					ensName
				}],
				queryFn: async () => (
					await resolveName(ensName.toLowerCase())
				)
			})
		}
		loadingIcon="/logos/ENS.svg"
		loadingIconName="ENS"
		loadingMessage="Resolving name to address on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error resolving ENS name to address${viaRPC}.`}
		showIf={showIf ? () => showIf({address, ensName}) : undefined}
		{layoutClass}
		{clip}
		bind:result={address}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else}
	<slot name="header" {address} {ensName} {isReverseResolving} />
	<slot {address} {ensName} {isReverseResolving} />
{/if}