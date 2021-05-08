<script>
    import { fly } from 'svelte/transition'
</script>

<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
    <slot />
</section>