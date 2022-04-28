<script lang="ts">
    import SizeContainer from './SizeContainer.svelte'
</script>


<SizeContainer
    inline
	transitionWidth
	transitionHeight={false}
    {...$$props}
>
    <slot />
</SizeContainer>
