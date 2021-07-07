<script lang="ts">
	import { fly } from 'svelte/transition'
</script>


<style>
	iframe {
		width: 100%;
		height: 80vh;
		justify-self: center;
		border-radius: 0.5em;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<div class="card">
		<div class="bar">
			<h3>Aave Governance v2</h3>
			<div class="card-annotation">The Graph, IPFS</div>
		</div>

		<hr>

		<iframe
			title="Aavote - Aave Governance v2 Interface"
			src={'https://aavote.netlify.app'}
		/>
	</div>
</section>