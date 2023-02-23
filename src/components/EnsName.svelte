<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { ENS } from '../data/ens'
	import { networksByChainID } from '../data/ethereum/networks'


	export let network: Ethereum.Network = networksByChainID[1]
	export let ensName: string = ''

	export let linked = true


	let textRecords: Map<string, string>


	$: formattedENSName = textRecords?.get('display') ?? ensName.trim().toLowerCase()

	$: link = `/apps/ens/address/${formattedENSName}`


	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', formattedENSName)
		if(linked) e.dataTransfer.setData('text/uri-list', link)
	}


	import EnsRecordLoader from './EnsRecordLoader.svelte'
</script>


<style>
	.ens-name {
		font-family: var(--monospace-fonts), var(--base-fonts);
		font-size: 0.95em;

		/* display: inline-block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis; */
	}
</style>


<EnsRecordLoader
	resolverTextRecordKeys={['name', 'avatar', 'description', 'notice', 'display', 'location', 'url']}
	passive={true}
	let:textRecords
>
	<span
		class="ens-name"
		title={`${formattedENSName}${textRecords ? [...textRecords.entries()].map(([key, value]) => `${key} ${value}`) : ''}`}
		draggable={true}
		on:dragstart={onDragStart}
	>
		{#if linked}
			<a class="ens-name"
				href={link}
				draggable={true}
				on:dragstart={onDragStart}
			>{formattedENSName}</a>
		{:else}
			{formattedENSName}
		{/if}
	</span>
</EnsRecordLoader>
