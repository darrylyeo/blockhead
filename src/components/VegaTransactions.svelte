<script>
    export let transactionsStream

    import VegaTransaction from './VegaTransaction.svelte'
</script>

<style>
	div {
        display: grid;
        grid-auto-flow: row reverse;
        gap: var(--padding-inner);
    }
</style>

<div>
    {#if transactionsStream}
        {#each $transactionsStream as tx (tx.id)}
            <VegaTransaction {tx} />
        {:else}
            <p>Loading transactions...</p>
        {/each}
    {:else}
        <p>Connecting to Vega...</p>
    {/if}
</div>