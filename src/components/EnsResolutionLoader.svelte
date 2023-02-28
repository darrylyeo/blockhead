<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types'
	import { getEthersProvider } from '../data/networkProviders'
	import { networksByChainID } from '../data/networks'
	import { preferences } from '../state/preferences'


	export let network = networksByChainID[1]
	export let providerName: NetworkProvider
	export let provider: Ethereum.Provider
	export let addressOrEnsName: Ethereum.Address | string
	export let passiveForwardResolution = false
	export let passiveReverseResolution = false

	$: providerName = $$props.providerName ?? $preferences.rpcNetwork

	$: if(network && providerName && !provider)
		getEthersProvider({
			network,
			networkProvider: providerName,
		}).then(_ => provider = _)

	$: viaRPC = providerName === NetworkProvider.Default ? '' : ` via ${providerName}`

	import { isAddress } from 'ethers'


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
		throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name (or there's an issue with the${providerName === NetworkProvider.Default ? `` : ` ${providerName}`} JSON-RPC connection).`)

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
		throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address (or there's an issue with the${providerName === NetworkProvider.Default ? `` : ` ${providerName}`} JSON-RPC connection).`)

		// addressPromise = ens.name(addressOrEnsName).getAddress()
	})


	export let showIf: (({address, ensName}: {address: Ethereum.Address, ensName: string}) => boolean | any) | undefined
	export let clip = true


	import Loader from './Loader.svelte'


	import { ENSIcon } from '../assets/icons'
</script>


{#if addressOrEnsName && isReverseResolving}
	<Loader
		layout={passiveReverseResolution ? 'passive' : 'default'}
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
		loadingIcon={ENSIcon}
		loadingIconName="ENS"
		loadingMessage="Reverse-resolving address to a name on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error reverse-resolving address to ENS name${viaRPC}.`}
		showIf={showIf ? () => showIf({address, ensName}) : undefined}
		{clip}
		bind:result={ensName}
	>
		<slot slot="header" name="header" {address} {ensName} {isReverseResolving} />
		<slot {address} {ensName} {isReverseResolving} />
	</Loader>
{:else if addressOrEnsName && !isReverseResolving}
		<!-- fromPromise={async () => (
			await resolveName(ensName.toLowerCase())
		)} -->
	<Loader
		layout={passiveForwardResolution ? 'passive' : 'default'}
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
		loadingIcon={ENSIcon}
		loadingIconName="ENS"
		loadingMessage="Resolving name to address on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error resolving ENS name to address${viaRPC}.`}
		showIf={showIf ? () => showIf({address, ensName}) : undefined}
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
