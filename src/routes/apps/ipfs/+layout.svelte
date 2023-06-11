<script lang="ts">
	// Params
	import { ipfsContentId, ipfsContentPath } from '../_appsParams'


	// Computed
	$: currentIpfsContentId = $ipfsContentId


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="row" on:submit|preventDefault={() => $ipfsContentId = currentIpfsContentId}>
		<input bind:value={currentIpfsContentId} placeholder="IPFS Content ID: v1 (bafy...) / v0 (Qm...)" />

		<button type="submit">Go</button>
	</form>

	<slot />
</section>
