<script type="ts">
    import type { Vega } from '../data/vega'
    import { makerAction } from '../data/vega'
    export let tx: Vega.Transaction

    function sizeByVolume(size) {
        return 10 + Math.log2(size)
        // const [MIN_SIZE, MAX_SIZE] = [8, 36]
        // const BIG_TRADE = 10000
        // return Math.min(MAX_SIZE, (MIN_SIZE + ((tx.size / BIG_TRADE) * (MAX_SIZE - MIN_SIZE)))) + 'pt'
    }
    const aggressorClasses = {
        SIDE_BUY: 'aggressor-buy',
        SIDE_SELL: 'aggressor-sell',
        NONE: 'aggressor-none'
    }
    const aggressorAction = {
        SIDE_BUY: 'BUY',
        SIDE_SELL: 'SELL',
        NONE: 'NONE'
    }
    function emoji(tx) {
        const m = Math.log2(tx.size)
        if (m > 10) return '🐳' 
        if (m > 9) return '🦈'
        if (m > 8) return '🐬' 
        if (m > 7) return '🐡'
        if (m > 6) return '🐟'
        if (m > 5) return '🦐'
        return '🦠'
    }
    function action(tx) {
        if (tx.aggressor) return tx.aggressor.replace('SIDE_', '')
        return ''    // auction or similar if no agressor 
    }
    function formatPartyID(partyID) {
        return partyID.slice(0,7) + '…'
    }
</script>

<style>
    .card {
        padding: var(--padding-outer);
        background-color: rgba(0, 0, 0, 0.1);
    }

    .aggressor-buy {
        color: green;
    }
    .aggressor-sell {
        color: red;
    }
    .aggressor-none {
        color: gray;
    }
</style>

{#if tx}
    <div class="card"> 
        Matched trade for {tx.takerId.slice(0,7) + '…'}
        <div style="font-size: {sizeByVolume(tx.size)}pt" class={aggressorClasses[tx.aggressor]}>
            <span style="font-size: 32pt; padding-right: 8pt">{emoji(tx)}</span>
            {action(tx)} {tx.size}
        </div>
        {#each tx.trades as {id, market: {tradableInstrument: {instrument}}, price, size, aggressor, makerId} (id)}
            <p>
                <span style="color:#F1FF50">{formatPartyID(makerId)}</span>
                <span> {makerAction[aggressor]} {size} {instrument.quoteName} at </span>
                <strong>{price} {instrument.quoteName} {instrument.baseName}</strong>
            </p>
        {/each}
    </div>
{:else}
    <p>No trade</p>
{/if}