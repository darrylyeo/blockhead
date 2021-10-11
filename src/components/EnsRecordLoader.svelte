<script context="module" lang="ts">
	const _contentHash: Record<string, string> = {}
	const _textRecords: Record<string, Record<string, string>> = {}
	const _cryptoAddressRecords: Record<string, Record<string, string>> = {}
</script>


<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Resolver } from '@ethersproject/providers'


    export let network: Ethereum.Network
    export let provider: Ethereum.Provider
    export let ensName: string

	export let resolverTextRecordKeys = []
	export let resolverCoinTypes = []

	
	import { preferences } from '../data/ethereum/preferences'
	import { getEthersProvider } from '../data/ethereum/provider'
	import { networksByChainID } from '../data/ethereum/networks'

	$: if(!provider)
		getEthersProvider(networksByChainID[1], $preferences.rpcNetwork).then(_ => provider = _)


	export let contentHash = _contentHash[ensName]
	export let textRecords = _textRecords[ensName] ?? {}
	export let cryptoAddressRecords = _cryptoAddressRecords[ensName] ?? {}

	let resolver: Resolver
	let isResolvingRecords = false
	$: if(provider && ensName && !isResolvingRecords){
		isResolvingRecords = true

		textRecords = _textRecords[ensName] ||= {}
		cryptoAddressRecords = _cryptoAddressRecords[ensName] ||= {}

		provider.getResolver(ensName).then(resolver => {
			resolver?.getContentHash().then(content => {
				_contentHash[ensName] = contentHash = content
			})

			for(const textRecordKey of resolverTextRecordKeys ?? []){
				resolver?.getText(textRecordKey).then(content => {
					textRecords[textRecordKey] = content
					textRecords = textRecords
				})
			}

			for(const coinType of resolverCoinTypes ?? []){
				resolver?.getAddress(coinType).then(content => {
					cryptoAddressRecords[coinType] = content
					cryptoAddressRecords = cryptoAddressRecords
				})
			}
		})
	}

	// console.log('resolver', resolver, resolverTextRecordKeys, resolverCoinTypes)
	// console.log(resolverTextRecordKeys.map(async (textRecordKey) => [textRecordKey, await resolver.getText(textRecordKey)]))
	// $: if(resolver){
	// 	Promise.all([
	// 		(async () => ['contentHash', await resolver.getContentHash()])(),
	// 		...resolverTextRecordKeys.map(async (textRecordKey) => [textRecordKey, await resolver.getText(textRecordKey)]),
	// 		...resolverCoinTypes.map(async (coinType, i) => [coinType, await resolver.getAddress(coinType)]),
	// 	])
	// 	.then(Object.fromEntries)
	// 	.then(_ => records = _)
	// }


	import Loading from './Loading.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<slot name="header" />

<div class="stack">
	{#if Object.values(textRecords).length || Object.values(cryptoAddressRecords).length}
		<div class="column">
			<slot {contentHash} {textRecords} {cryptoAddressRecords} />
		</div>
	{:else}
		<Loading iconAnimation="hover">
			<img slot="icon" src="/logos/ens.svg" width="25" />

			Resolving ENS records...
		</Loading>
	{/if}
</div>