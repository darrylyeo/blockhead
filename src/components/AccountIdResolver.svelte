<script lang="ts">
	// Constants/types
	import { type AccountId, AccountIdType, resolveAccountIdType } from '../data/accountId'
	import type { Ethereum } from '../data/networks/types'
	import type { ENS } from '../api/ens'
	import type { LensName } from '../api/lens'

	import { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import { networksByChainID } from '../data/networks'


	// Context
	import { preferences } from '../state/preferences'


	// External state
	let network = networksByChainID[1]
	export let accountId: AccountId | undefined

	export let passiveResolveToAddress = false

	export let resolveToName: Omit<AccountIdType, AccountIdType.Address> | false = AccountIdType.ENS
	export let passiveResolveToName = true

	export let networkProvider: NetworkProvider

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})


	// Internal state
	let type: AccountIdType | undefined

	// (Computed)
	$: type = accountId ? resolveAccountIdType(accountId) : undefined

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`


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
		'header': SharedSlotProps & {
			isOpen: boolean,
			toggle: () => boolean,
		},
	}


	// Actions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalize } from 'viem/ens'

	// import ENS, { getEnsAddress } from '@ensdomains/ensjs'
	// const ens = new ENS({ provider, ensAddress: getEnsAddress('1') })


	// View options
	export let showIf: ((_: {address: Ethereum.Address | undefined, ensName: ENS.Name | undefined, lensName: LensName | undefined}) => boolean | any) | undefined
	export let clip = true
	export let layout = 'default'


	// Components
	import Loader from './Loader.svelte'
	import { ENSIcon, LensIcon } from '../assets/icons'
</script>


{#if type === undefined || (type === AccountIdType.Address && (!resolveToName || passiveResolveToName))}
	<Loader
		{layout}
		fromPromise={async () => 1}
		{...$$restProps}
	>
		<svelte:fragment slot="header"
			let:isOpen
			let:toggle
		>
			<slot name="header"
				{type} {address} {ensName} {lensName}
				{isOpen} {toggle}
			/>
		</svelte:fragment>

		<slot {type} {address} {ensName} {lensName} />
	</Loader>

<!-- Resolve name to address -->
{:else if type === AccountIdType.Lens}
	<Loader
		layout={passiveResolveToAddress ? 'passive' : layout}
		fromQuery={
			createQuery({
				queryKey: ['LensProfileByLensName', {
					lensName,
				}],
				queryFn: async () => {
					const { getProfileByLensName } = await import('../api/lens')
					return await getProfileByLensName({ lensName })
				},
				select: ({data, error}) => {
					if(error) throw error

					return data.profile?.ownedBy
				},
			})
		}
		loadingIcon={LensIcon}
		loadingIconName="Lens Protocol"
		loadingMessage="Resolving Lens handle to Polygon address..."
		errorMessage={`Error resolving Lens handle to Polygon address.`}
		{clip}
		{...$$restProps}
		bind:result={address}
	>
		<svelte:fragment slot="header"
			let:isOpen
			let:toggle
		>
			<slot name="header"
				{type} {address} {ensName} {lensName}
				{isOpen} {toggle}
			/>
		</svelte:fragment>

		<slot {type} {address} {ensName} {lensName} />
	</Loader>

{:else if type === AccountIdType.ENS}
	<Loader
		layout={passiveResolveToAddress ? 'passive' : layout}
		fromQuery={
			ensName && publicClient && createQuery({
				queryKey: ['EnsResolution', {
					// networkProvider,
					ensName,
				}],
				queryFn: async () => {
					const address = await publicClient.getEnsAddress({
						name: normalize(ensName)
					})

					if(!address)
						// throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address.`)
						throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address (or there's an issue with the${networkProvider === NetworkProvider.Default ? `` : ` ${networkProvider}`} JSON-RPC connection).`)

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
		{...$$restProps}
		bind:result={address}
	>
		<svelte:fragment slot="header"
			let:toggle
		>
			<slot name="header"
				{type} {address} {ensName} {lensName}
				{toggle}
			/>
		</svelte:fragment>

		<slot {type} {address} {ensName} {lensName} />
	</Loader>
{/if}

{#if address && resolveToName && type !== resolveToName}
	<!-- Resolve address to name -->
	{#if resolveToName === AccountIdType.ENS}
		<Loader
			layout={passiveResolveToName ? 'headless' : layout}
			fromQuery={
				address && publicClient && createQuery({
					queryKey: ['EnsReverseResolution', {
						// networkProvider,
						address,
					}],
					queryFn: async () => {
						const ensName = await publicClient.getEnsName({ address })

						if(!ensName)
							// throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name.`)
							throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name (or there's an issue with the${networkProvider === NetworkProvider.Default ? `` : ` ${networkProvider}`} JSON-RPC connection).`)

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
			{...$$restProps}
			bind:result={ensName}
		>
			<svelte:fragment slot="header"
				let:isOpen
				let:toggle
			>
				<slot name="header"
					{type} {address} {ensName} {lensName}
					{isOpen} {toggle}
				/>
			</svelte:fragment>

			<slot {type} {address} {ensName} {lensName} />
		</Loader>
	{/if}
{/if}
