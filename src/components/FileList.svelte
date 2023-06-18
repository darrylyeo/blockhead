<script lang="ts">
	// External state
	export let fileList: FileList | File[]


	// Components
	// import Date from './Date.svelte'
	import FileDetails from './FileDetails.svelte'
</script>


{#if fileList}
	{#each Array.from(fileList) as file}
		<FileDetails
			fileName={file.name}
			contentType={file.type}
			contentSize={file.size}
			lastModified={file.lastModified}
		/>
		<!-- <article class="card">
			<header class="bar wrap">
				<span>{file.name}</span>

				<span class="card-annotation">
					{file.type || 'file'}
					| {file.size} bytes
					{#if file.lastModified}| last modified <Date date={file.lastModified} />{/if}
				</span>
			</header>
		</article> -->
	{/each}
{/if}
