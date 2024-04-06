<script lang="ts">
	import SizeContainerNew from './SizeContainerNew.svelte'
</script>


<SizeContainerNew
	layout="inline"
	{...$$restProps}
>
	<slot />
</SizeContainerNew>
