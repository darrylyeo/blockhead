<script lang="ts">
    import * as CryptoIcons from 'svelte-cryptoicon'
    export let token = 'ETH'

    $: Icon = CryptoIcons[token[0].toUpperCase() + token.slice(1).toLowerCase()]
</script>

<figure title={token}>
    {#if Icon}
        <svelte:component this={Icon} size="1.25em" /> 
    {/if}
</figure>

<style>
    figure {
        display: inline-flex;
    }
</style>