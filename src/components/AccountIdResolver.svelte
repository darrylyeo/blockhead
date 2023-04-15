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

	export let resolveToName: Omit<AccountIdType, AccountIdType.Address> | undefined = AccountIdType.ENS
	export let passiveResolveToName = true

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

	// (Computed)
	$: type = accountId ? resolveAccountIdType(accountId) : undefined

	$: viaRPC = providerName === NetworkProvider.Default ? '' : ` via ${providerName}`


	// Shared state
	export let address: Ethereum.Address | undefined
	export let ensName: ENS.Name | undefined
	export let lensName: LensName | undefined

	// (Computed)
	$: {
		address = type === AccountIdType.Address ? accountId as Ethereum.Address : undefined
		ensName = type === AccountIdType.ENS ? accountId as ENS.Name : undefined
		lensName = type === AccountIdType.Lens ? accountId as LensName : undefined
	}


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

	// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
	// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })


	// View options
	export let showIf: ((_: {address: Ethereum.Address | undefined, ensName: ENS.Name | undefined, lensName: LensName | undefined}) => boolean | any) | undefined
	export let clip = true


	// Components
	import Loader from './Loader.svelte'
	import { ENSIcon, LensIcon } from '../assets/icons'
</script>


{#if type === undefined || (type === AccountIdType.Address && (!resolveToName || passiveResolveToName))}
	<slot name="header" {type} {address} {ensName} {lensName} />
	<slot {type} {address} {ensName} {lensName} />

<!-- Resolve name to address -->
{:else if type === AccountIdType.Lens}
	<Loader
		layout={passiveResolveToAddress ? 'passive' : 'default'}
		fromUseQuery={
			useQuery({
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
		{clip}
		bind:result={address}
	>
		<slot slot="header" name="header" {type} {address} {ensName} {lensName} />
		<slot {type} {address} {ensName} {lensName} />
	</Loader>

{:else if type === AccountIdType.ENS}
	<Loader
		layout={passiveResolveToAddress ? 'passive' : 'default'}
		fromUseQuery={
			ensName && provider && useQuery({
				queryKey: ['EnsResolution', {
					providerName,
					ensName,
				}],
				queryFn: async () => {
					const address = await provider.resolveName(ensName)

					if(!address)
						// throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address.`)
						throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address (or there's an issue with the${providerName === NetworkProvider.Default ? `` : ` ${providerName}`} JSON-RPC connection).`)

					return address

					// addressPromise = ens.name(accountId).getAddress()
				}
			})
		}
		loadingIcon={ENSIcon}
		loadingIconName="ENS"
		loadingMessage="Resolving name to address on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error resolving ENS name to address${viaRPC}.`}
		{clip}
		bind:result={address}
	>
		<slot slot="header" name="header" {type} {address} {ensName} {lensName} />
		<slot {type} {address} {ensName} {lensName} />
	</Loader>
{/if}

{#if address && resolveToName && type !== resolveToName}
	<!-- Resolve address to name -->
	{#if resolveToName === AccountIdType.ENS}
		<Loader
			layout={passiveResolveToName ? 'headless' : 'default'}
			fromUseQuery={
				address && provider && useQuery({
					queryKey: ['EnsReverseResolution', {
						providerName,
						address,
					}],
					queryFn: async () => {
						const ensName = await provider.lookupAddress(address.toLowerCase())

						if(!ensName)
							// throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name.`)
							throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name (or there's an issue with the${providerName === NetworkProvider.Default ? `` : ` ${providerName}`} JSON-RPC connection).`)

						return ensName

						// ensNamePromise = ens.getName(address).then(async name => {
						// 	if(address === await ens.name(name).getAddress())
						// 		return name 
						// })
					}
				})
			}
			loadingIcon={ENSIcon}
			loadingIconName="ENS"
			loadingMessage="Reverse-resolving address to a name on the Ethereum Name Service{viaRPC}..."
			errorMessage={`Error reverse-resolving address to ENS name${viaRPC}.`}
			{clip}
			bind:result={ensName}
		>
			<slot slot="header" name="header" {type} {address} {ensName} {lensName} />
			<slot {type} {address} {ensName} {lensName} />
		</Loader>
	{/if}
{/if}
