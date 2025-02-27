<script lang="ts">	
	// Types/constants
	import type { Disco } from '$/api/disco'

	
	// Inputs
	export let credentials: Disco.VerifiableCredential[] = []
	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 4
	export let isOpen = true


	// Components
	import CollapsibleList from './CollapsibleList.svelte'
	import VerifiableCredential from './VerifiableCredential.svelte'
</script>


<CollapsibleList
	items={credentials}
	getIndex={credential => credential.id}
	bind:isOpen
	title="Credentials"
	headingLevel={headingLevel}
	isScrollEnabled={credentials.length > 2}
>
	<svelte:fragment let:item={credential}>
		<VerifiableCredential
			{credential}
			headingLevel={headingLevel + 1}
		/>
	</svelte:fragment>

	<svelte:fragment slot="empty">
		<div class="card">No credentials available.</div>
	</svelte:fragment>
</CollapsibleList>
