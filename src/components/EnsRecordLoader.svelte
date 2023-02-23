<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { NetworkProvider } from '../data/providers-types'
	import { getEthersProvider } from '../data/providers'
	import { networksByChainID } from '../data/ethereum/networks'
	import { preferences } from '../state/preferences'

	type ContentHash = $$Generic<string>
	type TextRecordKey = $$Generic<string>
	type CoinType = $$Generic<number>


	export let network = networksByChainID[1]
	export let providerName: NetworkProvider
	export let provider: Ethereum.Provider
	export let ensName: string

	export let resolverTextRecordKeys: TextRecordKey[] = []
	export let resolverCoinTypes: CoinType[] = []
	
	export let passive = false


	// Computed

	$: providerName = $$props.providerName ?? $preferences.rpcNetwork

	$: if(network && providerName && !provider)
		getEthersProvider({
			network,
			networkProvider: providerName,
		}).then(_ => provider = _)

	$: viaRPC = providerName === NetworkProvider.Default ? '' : ` via ${providerName}`


	export let contentHash: ContentHash
	export let textRecords: Map<TextRecordKey, string>
	export let cryptoAddressRecords: Map<CoinType, string>

	type $$Slots = {
		default: {
			contentHash: typeof contentHash,
			textRecords: typeof textRecords,
			cryptoAddressRecords: typeof cryptoAddressRecords,
			providerName: NetworkProvider,
		},
		header: {
			providerName: NetworkProvider,
		}
	}


	import { parallelLoaderStore } from '../utils/parallelLoaderStore'
	import { useQuery } from '@sveltestack/svelte-query'


	import Loader from './Loader.svelte'


	import { ENSIcon } from '../assets/icons'
</script>


<Loader
	{passive}
	loadingIconName={'ENS'}
	loadingIcon={ENSIcon}
	loadingMessage={'Getting ENS Resolver...'}
	fromUseQuery={provider && ensName ? (
		useQuery({
			queryKey: ['EnsResolver', {
				chainID: network.chainId,
				providerName,
				ensName,
			}],
			queryFn: async () => (
				await provider.getResolver(ensName)
			)
		})
	) : undefined}
	let:result={resolver}
>
	<svelte:fragment slot="header">
		<slot name="header" {providerName} />
	</svelte:fragment>

	<Loader
		{passive}
		loadingIconName={'ENS'}
		loadingIcon={ENSIcon}
		loadingMessage={`Fetching content hash${viaRPC}...`}
		fromUseQuery={resolver && (
			useQuery({
				queryKey: ['EnsContentHash', {
					chainID: network.chainId,
					provider: provider.name,
					ensName,
				}],
				queryFn: async () => {
					if(!resolver.getContentHash)
						throw `getContentHash is not supported.`
					console.log({resolver}, resolver?.getContentHash)
					return await resolver.getContentHash()
				}
			})
		)}
		errorMessage={`Failed to fetch content hash${viaRPC}.`}
		showIf={() => false}
		bind:result={contentHash}
	/>

	<Loader
		{passive}
		loadingIconName={'ENS'}
		loadingIcon={ENSIcon}
		loadingMessage={`Resolving ENS records${viaRPC}...`}
		fromStore={(() =>
			parallelLoaderStore(resolverTextRecordKeys ?? [], async textRecordKey => (
				await resolver?.getText(textRecordKey)
			))
		)}
		showIf={() => false}
		bind:result={textRecords}
	/>

	<Loader
		{passive}
		loadingIconName={'ENS'}
		loadingIcon={ENSIcon}
		loadingMessage={`Resolving crypto addresses${viaRPC}...`}
		fromStore={(() =>
			parallelLoaderStore(resolverCoinTypes ?? [], async coinType => (
				await resolver?.getAddress(coinType)
			))
		)}
		showIf={() => false}
		bind:result={cryptoAddressRecords}
	/>

	<slot
		{contentHash} {textRecords} {cryptoAddressRecords}
		{providerName}
	/>
</Loader>
