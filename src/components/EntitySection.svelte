<script lang="ts">
	// Props
	let {
		title,
		entityType,
		level = 2,
		children
	}: {
		title: string
		entityType: string
		level?: 1 | 2 | 3 | 4 | 5 | 6
		children: () => any
	} = $props()


	// Components
	import Heading from './Heading.svelte'
</script>


<section>
	<details open>
		<summary>
			<header>
				<Heading {level}>
					{title}
				</Heading>

				<span class="entity-type">{entityType}</span>
			</header>
		</summary>

		{@render children()}
	</details>
</section>


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
</style>
