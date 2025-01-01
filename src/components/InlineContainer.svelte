<script lang="ts">
	import SizeContainer from './SizeContainer.svelte'


	$: ({
		align,
		...props
	} = $$restProps)
</script>


<SizeContainer
	layout="inline"
	alignInline={align}
	{...props}
>
	<slot />
</SizeContainer>
