<script lang="ts">
	// Constants/types
	import type { NetworkProvider } from '$/data/networkProviders/types'


	// Inputs
	export let contractBytecode: string
	export let networkProvider: NetworkProvider


	// Components
	import Collapsible from './Collapsible.svelte'
</script>


<Collapsible
	type="label"
	class="column"
	showTriggerText={false}
	isOpen
>
	<svelte:fragment slot="title">
		<slot name="title">Bytecode</slot>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">{networkProvider}</span>
	</svelte:fragment>

	<hr>
	
	<code class="scrollable-list">{contractBytecode}</code>
</Collapsible>


<style>
	code.scrollable-list {
		font-size: 1.75ch;
		--resizeVertical-defaultHeight: 6em;
	}
</style>
