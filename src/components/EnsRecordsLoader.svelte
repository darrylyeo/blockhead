<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkAccountAddress } from '../data/address'
	import { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import { networksByChainID } from '../data/networks'
	import { preferences } from '../state/preferences'

	type ContentHash = $$Generic<string>
	type TextRecordKey = $$Generic<string>
	type CoinType = $$Generic<number>


	export let network = networksByChainID[1]
	export let networkProvider: NetworkProvider
	export let ensName: string

	export let resolveContentHash = false
	export let resolveTextRecordKeys: TextRecordKey[] = []
	export let resolveCoinTypes: CoinType[] = []

	export let layout: 'default' | 'passive' = 'default'
	export let isOpen = true


	// Computed

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`


	// Methods

	import { memoizedAsync } from '../utils/memoized'

	import { normalize } from 'viem/ens'

	const resolveEnsTextRecord = async ({
		resolverContractAddress,
		textRecordKey
	}: {
		resolverContractAddress: Ethereum.ContractAddress,
		textRecordKey: string
	}) => (
		await resolver?.getText(textRecordKey) as NetworkAccountAddress
	)

	const resolveEnsCryptoAddress = memoizedAsync(async ({
		resolver,
		coinType
	}: {
		resolver: Resolver,
		coinType: number
	}) => (
		await resolver?.getAddress(coinType)
	))


	export let contentHash: ContentHash
	export let textRecords: Map<TextRecordKey, NetworkAccountAddress>
	export let cryptoAddressRecords: Map<CoinType, string>

	type $$Slots = {
		default: {
			contentHash: typeof contentHash,
			textRecords: typeof textRecords,
			cryptoAddressRecords: typeof cryptoAddressRecords,
			networkProvider: NetworkProvider,
		},
		header: {
			networkProvider: NetworkProvider,
		}
	}


	import { parallelLoaderStore } from '../utils/parallelLoaderStore'
	import { createQuery } from '@tanstack/svelte-query'


	import Loader from './Loader.svelte'


	import { ENSIcon } from '../assets/icons'
</script>


<Loader
	viewOptions={{
		layout,
		isOpen,
	}}
	loadingIconName={'ENS'}
	loadingIcon={ENSIcon}
	loadingMessage={`Getting ENS Resolver${viaRPC}...`}
	fromQuery={publicClient && ensName ? (
		createQuery({
			queryKey: ['EnsResolver', {
				chainId: network.chainId,
				networkProvider,
				ensName,
			}],
			queryFn: async () => (
				await publicClient.getEnsResolver({
					name: normalize(ensName)
				})
			)
		})
	) : undefined}
	let:result={resolverContractAddress}
>
	<svelte:fragment slot="header">
		<slot name="header" {networkProvider} />
	</svelte:fragment>

	{#if resolveContentHash}
		<Loader
			viewOptions={{
				layout,
				showIf: () => false,
			}}
			loadingIconName={'ENS'}
			loadingIcon={ENSIcon}
			loadingMessage={`Fetching content hash${viaRPC}...`}
			fromQuery={resolverContractAddress && (
				createQuery({
					queryKey: ['EnsContentHash', {
						chainId: network.chainId,
						provider: publicClient.name,
						ensName,
					}],
					queryFn: async () => {
						if(!resolverContractAddress.getContentHash)
							throw `getContentHash is not supported.`

						return await resolverContractAddress.getContentHash()
					}
				})
			)}
			errorMessage={`Failed to fetch content hash${viaRPC}.`}
			bind:result={contentHash}
		/>
	{/if}

	{#if resolveTextRecordKeys?.length}
		<Loader
			viewOptions={{
				layout,
				showIf: () => false,
			}}
			loadingIconName={'ENS'}
			loadingIcon={ENSIcon}
			loadingMessage={`Resolving ENS records${viaRPC}...`}
			fromStore={(() =>
				parallelLoaderStore(resolveTextRecordKeys, async textRecordKey => (
					await publicClient.getEnsText({
						name: normalize(ensName),
						key: textRecordKey
					})
				))
			)}
			bind:result={textRecords}
		/>
	{/if}

	{#if resolveCoinTypes?.length}
		<Loader
			viewOptions={{
				layout,
				showIf: () => false,
			}}
			loadingIconName={'ENS'}
			loadingIcon={ENSIcon}
			loadingMessage={`Resolving crypto addresses${viaRPC}...`}
			fromStore={(() =>
				parallelLoaderStore(resolveCoinTypes ?? [], async coinType => (
					await resolveEnsCryptoAddress({ resolver: resolverContractAddress, coinType })
				))
			)}
			bind:result={cryptoAddressRecords}
		/>
	{/if}

	<slot
		{contentHash} {textRecords} {cryptoAddressRecords}
		{networkProvider}
	/>
</Loader>
