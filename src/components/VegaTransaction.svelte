<script type="ts">
    import type { Vega } from '../data/vega'
    import { makerAction, takerAction } from '../data/vega'

    export let tx: Vega.Transaction

    const actions: Record<Vega.Side, string> = {
        SIDE_BUY: 'BUY',
        SIDE_SELL: 'SELL',
        NONE: 'TRADE'
    }
    
    function sizeByVolume(size) {
        return 10 + Math.log2(size)
        // const [MIN_SIZE, MAX_SIZE] = [8, 36]
        // const BIG_TRADE = 10000
        // return Math.min(MAX_SIZE, (MIN_SIZE + ((tx.size / BIG_TRADE) * (MAX_SIZE - MIN_SIZE)))) + 'pt'
    }
    
    function emojiForTransactionSize(size) {
        const m = Math.log2(size)
        if (m > 10) return '🐳' 
        if (m > 9) return '🦈'
        if (m > 8) return '🐬' 
        if (m > 7) return '🐡'
        if (m > 6) return '🐟'
        if (m > 5) return '🦐'
        return '🦠'
    }
    
    function formatPartyID(partyID) {
        return partyID.slice(0, 4) + '…' + partyID.slice(-4)
        // return partyID.slice(0,7) + '…'
    }

    import TokenValue from './TokenValue.svelte'
    import TokenRate from './TokenRate.svelte'
</script>

<style>
    .card {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr auto 1fr;
        gap: var(--padding-inner);
        align-items: center;
        padding: var(--padding-outer);

        position: relative;

        background-color: rgba(0, 0, 0, 0.1);
    }
    .maker {
        text-align: right;
    }
    .rate {
        text-align: center;
    }
    .taker {
        text-align: left;
    }

    .card:before {
        content: var(--emoji);

        position: absolute;
        inset: 0;
        display: flex;
        place-content: center;

        font-size: 2em;
        opacity: 0.5;
    }

    .action-buy {
        color: var(--up-green);
    }
    .action-sell {
        color: var(--down-red);
    }
    .action-none {
        opacity: 0.7;
    }
</style>

{#if tx}
    {#each [tx] as {market: {tradableInstrument: {instrument: {quoteName, baseName}}}, price, size}}
    <div class="card" style:--emoji={emojiForTransactionSize(tx.size)}> 
        <div class="maker">
            {#each tx.trades as {id, size, aggressor, makerId} (id)}
                <p>
                    <span style="color:#F1FF50">{formatPartyID(makerId)}</span>
                    <span class="action-{makerAction[tx.aggressor]}">{makerAction[tx.aggressor]}</span>
                    <TokenValue value={size} token={baseName} />
                </p>
            {/each}
        </div>
        <div class="rate" style="font-size: {sizeByVolume(tx.size)}pt">
            at
            <small><TokenRate rate={price} quoteToken={quoteName} baseToken={baseName} /></small>
            {actions[tx.aggressor]}
        </div>
        <div class="taker">
            from
            {formatPartyID(tx.takerId)}
            who <span class="action-{takerAction[tx.aggressor]}">{takerAction[tx.aggressor]}</span>
            <TokenValue value={size} token={baseName} />
        </div>
    </div>
    {/each}
{:else}
    <p>No trade</p>
{/if}