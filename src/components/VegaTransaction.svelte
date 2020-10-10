<script type="ts">
    export let tx

    function sizeByVolume(tx) {
        const [MIN_SIZE, MAX_SIZE] = [8, 36];
        const BIG_TRADE = 10000;
        return Math.min(MAX_SIZE, (MIN_SIZE + ((tx.size / BIG_TRADE) * (MAX_SIZE - MIN_SIZE)))) + 'pt';
    }
    function colourByDirection(tx) {
        return { SIDE_BUY: 'green', SIDE_SELL: 'red', NONE: 'gray'}[tx.aggressor || 'NONE']
    }
    function emoji(tx) {
        if (tx.size > 7000) return '🐳'; 
        if (tx.size > 5500) return '🦈';
        if (tx.size > 4000) return '🐬'; 
        if (tx.size > 2000) return '🐡';
        if (tx.size > 250) return '🐟';
        if (tx.size > 50) return '🦐';
        return '🦠';
    }
    function action(tx) {
        if (tx.aggressor) return tx.aggressor.replace('SIDE_', '');
        return '';    // auction or similar if no agressor 
    }
    function makerDid(trade) {
        return { SIDE_BUY: 'sold', SIDE_SELL: 'bought', NONE: 'traded'}[tx.aggressor || 'NONE']
    }
    function trader(trade) {
        return trade.makerId.slice(0,7) + '…';
    }
</script>

<style>
    .card {
        padding: var(--padding-outer);
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>

{#if tx}
    <div class="card"> 
        Matched trade for {tx.takerId.slice(0,7) + '…'}
        <div style="font-size: {sizeByVolume(tx)}; color: {colourByDirection(tx)};">
            <span style="font-size: 32pt; padding-right: 8pt;">{emoji(tx)}</span>
            {action(tx)} {tx.size}
        </div>
        {#each tx.trades as trade} 
            <p>
                <span style="color:#F1FF50">{trader(trade)}</span>
                <span> {makerDid(trade)} {trade.size} at </span>
                <span style="color: white; font-weight: bold">{trade.price}</span>
            </p>
        {/each}
    </div>
{:else}
    <p>No trade</p>
{/if}