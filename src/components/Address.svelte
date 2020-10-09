<script lang="ts">
    import type { CryptoAddress } from '../data/CryptoAddress'
    export let address: CryptoAddress

    export let editable = false

    let isValid = false
    $: {
        isValid = address !== undefined
    }
</script>

{#if editable}
    <input type="text" class:is-valid={isValid} placeholder="Address (0xabcd...6789) / ENS (example.eth)" bind:value={address}>
{:else}
    {address}
{/if}