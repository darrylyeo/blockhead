<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { ENS } from '../api/ens'
	import type { LensName } from '../api/lens'
	import type { PortfolioAccountId } from '../state/portfolio-accounts'

	import { NetworkProvider } from '../data/networkProviders/types'
	import { getEthersProvider } from '../data/networkProviders'
	import { networksByChainID } from '../data/networks'

	import { preferences } from '../state/preferences'


	export let network = networksByChainID[1]
	export let providerName: NetworkProvider
	export let provider: Ethereum.Provider
	export let accountId: PortfolioAccountId
	export let passiveForwardResolution = false
	export let passiveReverseResolution = false

	$: providerName = $$props.providerName ?? $preferences.rpcNetwork

	$: if(network && providerName && !provider)
		getEthersProvider({
			network,
			networkProvider: providerName,
		}).then(_ => provider = _)

	$: viaRPC = providerName === NetworkProvider.Default ? '' : ` via ${providerName}`


	export let address: Ethereum.Address | undefined
	export let ensName: ENS.Name | undefined
	export let lensName: LensName | undefined

	export let isReverseResolving: boolean | undefined


	import { findMatchedCaptureGroupName } from '../utils/findMatchedCaptureGroup';

	$: type = findMatchedCaptureGroupName<'ensName' | 'lensName' | 'address'>(
		/(?<ensName>(?:[^. ]+[.])*(?:eth|xyz|luxe|kred|art|club|test))|(?<lensName>(?:[^. ]+[.])(?:lens|test))|(?<address>0x[0-9a-fA-F]{40})/,
		accountId
	) ?? ''	


	$: isReverseResolving = type === 'address'

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

		// addressPromise = ens.name(accountId).getAddress()
	})


	export let showIf: (({address, ensName}: {address: Ethereum.Address, ensName: string}) => boolean | any) | undefined
	export let clip = true


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
		showIf={showIf ? () => showIf({address, ensName, lensName}) : undefined}
		{clip}
		bind:result={address}
	>
		<slot slot="header" name="header" {address} {type} {ensName} {lensName} {isReverseResolving} />
		<slot {address} {type} {ensName} {lensName} {isReverseResolving} />
	</Loader>
{:else if accountId && isReverseResolving}
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
		<slot slot="header" name="header" {address} {type} {ensName} {lensName} {isReverseResolving} />
		<slot {address} {type} {ensName} {lensName} {isReverseResolving} />
	</Loader>
{:else if accountId && !isReverseResolving}
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
		<slot slot="header" name="header" {address} {type} {ensName} {lensName} {isReverseResolving} />
		<slot {address} {type} {ensName} {lensName} {isReverseResolving} />
	</Loader>
{:else}
	<slot name="header" {address} {type} {ensName} {isReverseResolving} />
	<slot {address} {type} {ensName} {isReverseResolving} />
{/if}
