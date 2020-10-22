<script lang="ts">
	export let transactionID
	let linked = true
	let blockchain = 'ethereum'
</script>

<style>
	.transaction-id {
		font-family: var(--monospace-fonts), var(--base-fonts);

		/* display: inline-block; */
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>

{#if linked}
	<a class="transaction-id" href="explorer/{blockchain}/{transactionID}">{transactionID}</a>
{:else}
	<span class="transaction-id">{transactionID}</span>
{/if}