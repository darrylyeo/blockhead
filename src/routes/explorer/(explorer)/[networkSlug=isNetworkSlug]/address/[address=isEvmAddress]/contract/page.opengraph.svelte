<script lang="ts">
	$: ({
		data: {
			bytecode,
			contractMetadata,
			addressType,
			contractName,
			sourcePaths,
		},
	} = $$props as {
		data: Awaited<ReturnType<typeof import('./page.opengraph').load>>,
	})
</script>
