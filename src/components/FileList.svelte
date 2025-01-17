<script lang="ts">
	// External state
	export let fileList: FileList | File[]


	// Components
	// import DateTime from './DateTime.svelte'
	import FileDetails from './FileDetails.svelte'
</script>


{#if fileList}
	{#each Array.from(fileList) as file}
		<FileDetails {file} />
		<!-- <article class="card">
			<header class="bar wrap">
				<span>{file.name}</span>

				<span class="card-annotation">
					{file.type || 'file'}
					| {file.size} bytes
					{#if file.lastModified}| last modified <DateTime date={file.lastModified} />{/if}
				</span>
			</header>
		</article> -->
	{/each}
{/if}
