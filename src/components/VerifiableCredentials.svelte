<script lang="ts">	
	// Types/constants
	import type { Disco } from '$/api/disco'

	
	// Inputs
	export let credentials: Disco.VerifiableCredential[] = []
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 4
	export let isOpen: boolean


	// Components
	import Collapsible from './Collapsible.svelte'
	import VerifiableCredential from './VerifiableCredential.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<Collapsible
	type="label"
	bind:isOpen
>
	<svelte:fragment slot="title">
		<slot name="title">
			<svelte:element this={`h${headingLevel}`}>
				Credentials
				<span>(<TweenedNumber value={credentials.length} />)</span>
			</svelte:element>
		</slot>
	</svelte:fragment>

	<div class="transactions-list column" class:scrollable-list={credentials.length > 2}>
		{#each credentials as credential}
			<VerifiableCredential
				{credential}
				headingLevel={headingLevel + 1}
			/>
		{/each}
	</div>
</Collapsible>
