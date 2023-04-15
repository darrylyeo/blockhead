<script lang="ts">
	// Constants/types
	import { type AccountId, AccountIdType, resolveAccountIdType } from '../data/accountId'
	import type { Ethereum } from '../data/networks/types'
	import type { ENS } from '../api/ens'
	import type { LensName } from '../api/lens'

	import { NetworkProvider } from '../data/networkProviders/types'
	import { getEthersProvider } from '../data/networkProviders'
	import { networksByChainID } from '../data/networks'


	// Context
	import { preferences } from '../state/preferences'


	// External state
	export let network = networksByChainID[1]
	export let accountId: AccountId | undefined
	export let passiveResolveToAddress = false
	export let passiveResolveToName = false

	export let providerName: NetworkProvider
	export let provider: Ethereum.Provider

	// (Computed)
	$: providerName = $$props.providerName ?? $preferences.rpcNetwork

	$: if(network && providerName && !provider)
		getEthersProvider({
			network,
			networkProvider: providerName,
		}).then(_ => provider = _)


	// Internal state
	let type: AccountIdType | undefined
	let isReverseResolving: boolean | undefined

	// (Computed)
	$: type = accountId && resolveAccountIdType(accountId)

	$: isReverseResolving = type === 'address'

	$: viaRPC = providerName === NetworkProvider.Default ? '' : ` via ${providerName}`


	// Shared state
	export let address: Ethereum.Address | undefined
	export let ensName: ENS.Name | undefined
	export let lensName: LensName | undefined

	// (Computed)
	$: if(!accountId){
		address = undefined
		ensName = undefined
		lensName = undefined
		isReverseResolving = undefined
	}
	else if(type === 'lensName')
		lensName = accountId as LensName
	else if(isReverseResolving)
		address = accountId as Ethereum.Address
	else
		ensName = accountId as ENS.Name


	// Output
	type SharedSlotProps = {
		type: AccountIdType | undefined,
		address: Ethereum.Address | undefined,
		ensName?: ENS.Name | undefined,
		lensName?: LensName | undefined,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Actions
	import { useQuery } from '@sveltestack/svelte-query'
	import { memoizedAsync } from '../utils/memoized'

	// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
	// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })

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

		// addressPromise = ens.name(accountId).getAddress()
	})


	// View options
	export let showIf: ((_: {address: Ethereum.Address | undefined, ensName: ENS.Name | undefined, lensName: LensName | undefined}) => boolean | any) | undefined
	export let clip = true


	// Components
	import Loader from './Loader.svelte'
	import { ENSIcon, LensIcon } from '../assets/icons'
</script>


{#if type === 'lensName'}
	<Loader
		layout={'default'}
		fromUseQuery={
			lensName && useQuery({
				queryKey: ['LensProfileByLensName', {
					lensName,
				}],
				queryFn: async () => {
					const { getProfileByLensName } = await import('../api/lens')
					return await getProfileByLensName({ lensName })
				}
			})
		}
		then={({data, error}) => {
			if(error) throw error

			return data.profile.ownedBy
		}}
		loadingIcon={LensIcon}
		loadingIconName="Lens Protocol"
		loadingMessage="Resolving Lens handle to Polygon address..."
		errorMessage={`Error resolving Lens handle to Polygon address.`}
		showIf={showIf && (() => showIf({address, ensName, lensName}))}
		{clip}
		bind:result={address}
	>
		<slot slot="header" name="header" {address} {type} {ensName} {lensName} />
		<slot {address} {type} {ensName} {lensName} />
	</Loader>

{:else if accountId && isReverseResolving}
	<Loader
		layout={passiveResolveToName ? 'passive' : 'default'}
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
		showIf={showIf && (() => showIf({address, ensName, lensName}))}
		{clip}
		bind:result={ensName}
	>
		<slot slot="header" name="header" {address} {type} {ensName} {lensName} />
		<slot {address} {type} {ensName} {lensName} />
	</Loader>

{:else if accountId && !isReverseResolving}
	<Loader
		layout={passiveResolveToAddress ? 'passive' : 'default'}
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
		showIf={showIf && (() => showIf({address, ensName, lensName}))}
		{clip}
		bind:result={address}
	>
		<slot slot="header" name="header" {address} {type} {ensName} {lensName} />
		<slot {address} {type} {ensName} {lensName} />
	</Loader>

{:else}
	<slot name="header" {address} {type} {ensName} />
	<slot {address} {type} {ensName} />

{/if}
