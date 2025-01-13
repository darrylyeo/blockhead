<script lang="ts">
	// Constants/types
	import { type AccountId, AccountIdType } from '$/data/accountId'
	import type { Ethereum } from '$/data/networks/types'
	import type { ENS } from '$/api/ens'
	import type { LensName } from '$/api/lens'

	import { NetworkProvider } from '$/data/networkProviders/types'
	import { networkProviderConfigByProvider } from '$/data/networkProviders'
	import { ethereumMainnet } from '$/data/networks'


	// Context
	import { preferences } from '$/state/preferences'


	// External state
	export let ensResolutionNetwork = ethereumMainnet
	export let accountId: AccountId | undefined

	export let passiveResolveToAddress = false

	export let resolveToName: Omit<AccountIdType, AccountIdType.Address> | false = AccountIdType.EnsName
	export let passiveResolveToName = true

	export let networkProvider: NetworkProvider

	// (Computed)
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	// (View options)
	export let loaderViewOptions: Partial<Loader['viewOptions']> | undefined

	$: ({
		showIf,
		clip = true,
		layout = 'default',
		..._loaderViewOptions
	} = loaderViewOptions ?? {})


	// Functions
	import { resolveAccountIdType } from '$/utils/accountId'


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
		ensName = type === AccountIdType.EnsName ? accountId as ENS.Name : undefined
		lensName = type === AccountIdType.LensHandle ? accountId as LensName : undefined
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


	// Components
	import Loader from './Loader.svelte'
	import { ENSIcon, LensIcon } from '$/assets/icons'
</script>


{#if type === undefined || (type === AccountIdType.Address && (!resolveToName || passiveResolveToName))}
	<Loader
		viewOptions={{
			layout: passiveResolveToAddress ? 'passive' : layout,
			clip,
			..._loaderViewOptions,
		}}
		fromPromise={async () => 1}
		debug={false}
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
{:else if type === AccountIdType.LensHandle}
	<Loader
		viewOptions={{
			layout: passiveResolveToAddress ? 'passive' : layout,
			clip,
			..._loaderViewOptions,
		}}
		fromQuery={
			createQuery({
				queryKey: ['LensProfileByLensName', {
					lensName,
				}],
				queryFn: async ({
					queryKey: [_, {
						lensName,
					}],
				}) => {
					const { getProfileByLensName } = await import('$/api/lens')
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

{:else if type === AccountIdType.EnsName}
	<Loader
		viewOptions={{
			layout: passiveResolveToAddress ? 'passive' : layout,
			clip,
			..._loaderViewOptions,
		}}
		fromQuery={
			ensName && createQuery({
				queryKey: ['EnsResolution', {
					networkProvider,
					chainId: ensResolutionNetwork.chainId,
					ensName,
				}],
				queryFn: async ({
					queryKey: [_, {
						networkProvider,
						ensName,
					}],
				}) => {
					const { getViemPublicClient } = await import('$/data/networkProviders')
					const { getEnsAddress, normalize } = await import('viem/ens')

					const publicClient = getViemPublicClient({
						network: ensResolutionNetwork,
						networkProvider,
					})

					if(!publicClient)
						throw new Error(`The${networkProvider === NetworkProvider.Default ? `` : ` ${networkProviderConfigByProvider[networkProvider]?.name ?? networkProvider}`} JSON-RPC connection is not available.`)

					return await getEnsAddress(
						publicClient,
						{
							name: normalize(ensName),
						}
					)
				},
				select: address => {
					if(!address)
						throw new Error(`The ENS Name "${ensName}" doesn't resolve to an address.`)

					return address
				},
				staleTime: 24 * 60 * 60 * 1000,
			})
		}
		loadingIcon={ENSIcon}
		loadingIconName="ENS"
		loadingMessage="Resolving name to address on the Ethereum Name Service{viaRPC}..."
		errorMessage={`Error resolving ENS name to address${viaRPC}.`}
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
	{#if resolveToName === AccountIdType.EnsName}
		<Loader
			viewOptions={{
				layout: passiveResolveToName ? 'headless' : layout,
				clip,
				..._loaderViewOptions,
			}}
			fromQuery={
				address && createQuery({
					queryKey: ['EnsReverseResolution', {
						networkProvider,
						chainId: ensResolutionNetwork.chainId,
						address,
					}],
					queryFn: async ({
						
						queryKey: [_, {
							networkProvider,
							address,
						}],
					}) => {
						const { getViemPublicClient } = await import('$/data/networkProviders')
						const { getEnsName } = await import('viem/ens')

						const publicClient = getViemPublicClient({
							network: ensResolutionNetwork,
							networkProvider,
						})

						if (!publicClient)
							throw new Error(`The${networkProvider === NetworkProvider.Default ? '' : ` ${networkProviderConfigByProvider[networkProvider]?.name ?? networkProvider}`} JSON-RPC connection is not available.`)

						return await getEnsName(
							publicClient,
							{
								address,
							}
						)
					},
					select: ensName => {
						if (!ensName)
							throw new Error(`The address "${address}" doesn't reverse-resolve to an ENS name.`)

						return ensName
					},
					staleTime: 24 * 60 * 60 * 1000,
				})
			}
			loadingIcon={ENSIcon}
			loadingIconName="ENS"
			loadingMessage="Reverse-resolving address to a name on the Ethereum Name Service{viaRPC}..."
			errorMessage={`Error reverse-resolving address to ENS name${viaRPC}.`}
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
