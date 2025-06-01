<script lang="ts">
	// Types/constants
	import type { Snippet } from 'svelte'
	import type { EntityType } from '$/entities'


	// Props
	let {
		type,
		id,
		title,
		annotation,
		level = 1,
		children,
		footer
	}: {
		type: EntityType
		id: string
		title: string | Snippet
		annotation: string
		level?: 1 | 2 | 3 | 4 | 5 | 6
		footer?: Snippet
		children?: Snippet
	} = $props()


	// Components
	import Heading from '$/components/Heading.svelte'
</script>


<article
	data-type={type}
	id={`${type}/${id}`}
>
	<details open>
		<summary>
			<header>
				<Heading {level}>
					{#if typeof title === 'string'}
						{title}
					{:else}
						{@render title()}
					{/if}
				</Heading>

				<span class="entity-type">{annotation}</span>
			</header>
		</summary>

		{#if children}
			{@render children()}
		{/if}

		{#if footer}
			<footer>
				{@render footer()}
			</footer>
		{/if}
	</details>
</article>


<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.entity-type {
		font-size: 0.875rem;
		color: #6b7280;
		background: #f3f4f6;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	footer {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e5e7eb;
	}
</style>
