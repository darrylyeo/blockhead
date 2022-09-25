<script context="module" lang="ts">
	import { writable } from 'svelte/store'

	const contentHashForEnsName = writable<Record<string, string>>({})
	const textRecordsForEnsName = writable<Record<string, Record<string, string>>>({})
	const cryptoAddressRecordsForEnsName = writable<Record<string, Record<string, string>>>({})
</script>


<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Resolver } from '@ethersproject/providers'


    export let network: Ethereum.Network
    export let provider: Ethereum.Provider
    export let ensName: string

	export let resolverTextRecordKeys = []
	export let resolverCoinTypes = []
	
	export let passive = false

	
	import { preferences } from '../state/preferences'
	import { getEthersProvider } from '../data/providers'
	import { networksByChainID } from '../data/ethereum/networks'

	$: if(!provider)
		getEthersProvider({
			network: networksByChainID[1],
			networkProvider: $preferences.rpcNetwork
		}).then(_ => provider = _)


	export let contentHash: string
	$: contentHash = $contentHashForEnsName[ensName]

	export let textRecords: Record<string, string>
	$: textRecords = $textRecordsForEnsName[ensName] ?? ($textRecordsForEnsName[ensName] = {})

	export let cryptoAddressRecords: Record<string, string>
	$: cryptoAddressRecords = $cryptoAddressRecordsForEnsName[ensName] ?? ($cryptoAddressRecordsForEnsName[ensName] = {})

	let resolver: Resolver

	// let isResolvingRecords = false
	// $: if(provider && ensName && !isResolvingRecords){
	// 	isResolvingRecords = true
	$: if(provider && ensName){
		provider.getResolver(ensName).then(resolver => {
			resolver?.getContentHash().then(content => {
				$contentHashForEnsName[ensName] = content
				$contentHashForEnsName = $contentHashForEnsName
			})

			for(const textRecordKey of resolverTextRecordKeys ?? [])
				if(!(textRecordKey in $textRecordsForEnsName[ensName]))
					resolver?.getText(textRecordKey).then(content => {
						$textRecordsForEnsName[ensName][textRecordKey] = content
						$textRecordsForEnsName = $textRecordsForEnsName
					})

			for(const coinType of resolverCoinTypes ?? [])
				if(!(coinType in $cryptoAddressRecordsForEnsName[ensName]))
					resolver?.getAddress(coinType).then(content => {
						$cryptoAddressRecordsForEnsName[ensName][coinType] = content
						$cryptoAddressRecordsForEnsName = $cryptoAddressRecordsForEnsName
					})
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

{#if passive}
	{#key contentHash}{#key textRecords}{#key cryptoAddressRecords}
		<slot {contentHash} {textRecords} {cryptoAddressRecords} />
	{/key}{/key}{/key}
{:else}
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
{/if}