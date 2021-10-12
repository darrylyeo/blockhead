<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { ENS } from '../data/ens'
	import { networksByChainID } from '../data/ethereum/networks'


	export let network: Ethereum.Network = networksByChainID[1]
	export let ensName: string = ''

	export let linked = true


	let textRecords: Record<string, string> = {}


	$: formattedENSName = textRecords?.display ?? ensName.trim().toLowerCase()


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
	bind:textRecords
/>

<span class="ens-name" title={`${formattedENSName}${textRecords ? Object.entries(textRecords).map(([key, value]) => `${key} ${value}`) : ``}`}>
	{#if linked}
		<a class="ens-name" href="/apps/ens/address/{formattedENSName}">{formattedENSName}</a>
	{:else}
		{formattedENSName}
	{/if}
</span>