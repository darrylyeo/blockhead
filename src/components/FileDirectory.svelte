<script lang="ts">
	// Constants/types
	import type { Folder } from '$/utils/directoryFromFileList'


	// Functions
	import { directoryFromFileList } from '$/utils/directoryFromFileList'


	// External state
	export let fileList: FileList


	// Recursive state
	export let folder: Folder
	// (Computed)
	$: if(fileList) folder = Object.values(directoryFromFileList(fileList).subfolders)[0]


	// Internal state
	// (Computed)
	$: isRoot = Boolean(fileList)
	$: subfolders = Object.values(folder.subfolders)
	

	// Components
	import Collapsible from './Collapsible.svelte'
	import FileList from './FileList.svelte';
</script>



<article class="card" class:root={isRoot}>
	<Collapsible
		type="label"
		isOpen={isRoot}
		showTriggerText={false}
	>
		<svelte:fragment slot="title" let:isOpen>
			<h4 class="row" data-before={isOpen ? '📂' : '📁'}>{folder.folderName}</h4>
		</svelte:fragment>

		<svelte:fragment slot="toolbar">
			<div class="row inline">
				{#if subfolders.length}<span>{subfolders.length} subfolders</span> │{/if}
				{#if folder.files.length}<span>{folder.files.length} files</span>{/if}
			</div>
		</svelte:fragment>

		<svelte:fragment slot="header-right">
			<span class="card-annotation">Folder</span>
		</svelte:fragment>

		<div class="folder-contents column">
			{#each subfolders as subfolder (subfolder.folderName)}
				<svelte:self
					folder={subfolder}
				/>
			{/each}

			<FileList fileList={folder.files} />
		</div>
	</Collapsible>
</article>


<style>
	.root :global(.card) {
		background-color: transparent !important;
		background-image: radial-gradient(circle, var(--card-background-color) -200%, transparent 600%);
		/* background-image: radial-gradient(circle, transparent -100%, var(--card-background-color)); */
		/* background-image: radial-gradient(circle, var(--card-background-color) -20%, transparent 0%); */
	}
	.folder-contents {
		gap: 0.25rem;
		/* margin-right: calc(-1 * var(--padding-outer));
		margin-bottom: calc(-1 * var(--padding-outer)); */
		margin-left: calc(0.5 * var(--padding-outer));
		margin-right: calc(-0.25 * var(--padding-outer));
		margin-bottom: calc(-0.25 * var(--padding-outer));
	}
</style>
