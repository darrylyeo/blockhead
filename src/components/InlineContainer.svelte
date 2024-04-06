<script lang="ts">
	import SizeContainer from './SizeContainer.svelte'
</script>


<SizeContainer
	layout="inline"
	{...$$restProps}
>
	<slot />
</SizeContainer>
