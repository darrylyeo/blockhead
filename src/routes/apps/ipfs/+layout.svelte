<script lang="ts">
	// Params
	import { ipfsContentId, ipnsName, ipfsContentPath } from '../_appsParams'


	// Context
	import { ipfsGateway } from './_context'


	// Computed
	$: currentIpfsContentId = $ipfsContentId
	$: currentIpfsContentPath = $ipfsContentPath


	// Components
	import IpfsContentIdDetails from '../../../components/IpfsContentIdDetails.svelte'
	import IpfsContentDetails from '../../../components/IpfsContentDetails.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
		gap: 1ch;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="row" on:submit|preventDefault={() => [$ipfsContentId, $ipfsContentPath] = [currentIpfsContentId, currentIpfsContentPath]}>
		<input bind:value={currentIpfsContentId} placeholder="IPFS Content ID: v0 (Qm...) / v1 (bafy..., k2..., 🚀...) or IPNS name (tokens.uniswap.org)" />

		<span>/</span>

		<input bind:value={currentIpfsContentPath} placeholder="path/to/content.txt" />

		<button type="submit">Go</button>
	</form>


	{#if $ipfsContentId}
		<IpfsContentIdDetails
			ipfsGateway={$ipfsGateway}
			ipfsContentId={$ipfsContentId}
			ipfsContentPath={$ipfsContentPath}
		/>
	{:else if $ipnsName}
		<IpfsContentDetails
			ipfsGateway={$ipfsGateway}
			ipnsName={$ipnsName}
			ipfsContentPath={$ipfsContentPath}
		/>
	{/if}

	<slot />
</section>
