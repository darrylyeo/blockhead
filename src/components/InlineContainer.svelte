<script lang="ts">
    import SizeContainer from './SizeContainer.svelte'
</script>


<SizeContainer
	transitionWidth
	transitionHeight={false}
    {...$$props}
>
    <slot />
</SizeContainer>
