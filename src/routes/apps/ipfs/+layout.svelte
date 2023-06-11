<script lang="ts">
	// Params
	import { ipfsContentId, ipfsContentPath } from '../_appsParams'


	// Computed
	$: currentIpfsContentId = $ipfsContentId


	// Components
	import IpfsContentIdDetails from '../../../components/IpfsContentIdDetails.svelte'


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
		<input bind:value={currentIpfsContentId} placeholder="IPFS Content ID: v0 (Qm...) / v1 (bafy..., k2..., 🚀...)" />

		<button type="submit">Go</button>
	</form>


	{#if $ipfsContentId}
		<IpfsContentIdDetails
			ipfsContentId={$ipfsContentId}
			ipfsContentPath={$ipfsContentPath}
		/>
	{/if}
	

	<slot />
</section>
