<script type="ts">
    import type { Vega } from '../data/vega'
    import { makerAction, takerAction } from '../data/vega'

    export let tx: Vega.Transaction

    const actions: Record<Vega.Side, string> = {
        SIDE_BUY: 'BUY',
        SIDE_SELL: 'SELL',
        NONE: 'TRADE'
    }

    const actionPreposition: Record<Vega.Side, string> = {
        SIDE_BUY: 'from',
        SIDE_SELL: 'to',
        NONE: 'with'
    }
    
    function sizeByVolume(size) {
        return 1 + size * 0.00025
        return 0.8 + Math.log2(size) * 0.15
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

    import Address from './Address.svelte'
    import TokenValue from './TokenValue.svelte'
    import TokenRate from './TokenRate.svelte'
</script>

<style>
    .card {
        --padding-inner: 2em;

        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr auto 1fr;
        gap: var(--padding-inner);
        align-items: center;
        padding: var(--padding-outer);
        
        font-size: 0.8em;
        font-weight: 300;

        position: relative;

        background-color: rgba(0, 0, 0, 0.1);
    }
    @media (prefers-color-scheme: dark) {
        .card {
            background-color: rgba(255, 255, 255, 0.05)
        }
    }
    .card > * {
        display: flex;
        flex-direction: column;
    }
    .maker {
        text-align: right;
    }
    .rate {
        text-align: center;
    }
    .rate :global(div) {
        font-size: 2em;
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

    .action-bought {
        color: var(--up-green);
    }
    .action-sold {
        color: var(--down-red);
    }
    .action-none {
        opacity: 0.7;
    }

    :global(.token-rate) {
        font-weight: 500;
    }
    :global(.address) {
        font-weight: 600;
    }
</style>

{#if tx}
    {#each [tx] as {market: {tradableInstrument: {instrument: {quoteName, baseName}}}, price, size, aggressor, takerId}}
    <div class="card" style:--emoji={emojiForTransactionSize(tx.size)}> 
        <div class="maker">
            {#each tx.trades as {id, size, makerId} (id)}
                <p>
                    <Address address={makerId} />
                    <span class="action-{makerAction[tx.aggressor]}">{makerAction[tx.aggressor]}</span>
                    <span style="font-size: {sizeByVolume(size)}em">
                        <TokenValue value={size} token={quoteName} />
                    </span>
                </p>
            {/each}
        </div>
        <div class="rate">
            at
            <span>
                <TokenRate rate={price} quoteToken={quoteName} baseToken={baseName} />
            </span>
            <!-- {actions[tx.aggressor]} -->
        </div>
        <div class="taker">
            <span>
                {actionPreposition[aggressor]}
                <Address address={takerId} />,
                who
                <span class="action-{takerAction[aggressor]}">{takerAction[aggressor]}</span>
            </span>
            <span>
                <span style="font-size: {sizeByVolume(size)}em">
                    <TokenValue value={size} token={quoteName} />
                </span>
            </span>
        </div>
    </div>
    {/each}
{:else}
    <p>No trade</p>
{/if}