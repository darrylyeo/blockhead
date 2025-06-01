<script lang="ts">
	// Types/constants
	import type { App } from '$/entities/app'
	import { EntityType } from '$/entities'

	// Props
	let { app }: { app: App } = $props()

	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>

<Entity
	type={EntityType.App}
	id={app.slug}
	title={app.name ?? app.slug}
	annotation="App"
>
	<EntitySection
		title="Basic Information"
		entityType="app-basic"
	>
		<dl>
			<dt>Name</dt>
			<dd>{app.name}</dd>

			<dt>Slug</dt>
			<dd>{app.slug}</dd>

			{#if app.icon}
				<dt>Icon</dt>
				<dd>
					<img
						src={app.icon}
						alt="{app.name} icon"
						style="max-width: 64px; max-height: 64px;"
					/>
				</dd>
			{/if}

			{#if app.colors && app.colors.length > 0}
				<dt>Colors</dt>
				<dd>
					<div style="display: flex; gap: 4px;">
						{#each app.colors as color}
							<div
								style="width: 24px; height: 24px; background-color: {color}; border: 1px solid #ccc; border-radius: 3px;"
								title={color}
							></div>
						{/each}
					</div>
				</dd>
			{/if}

			{#if app.links && app.links.length > 0}
				<dt>Links</dt>
				<dd>
					<ul>
						{#each app.links as link}
							<li>
								<a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
							</li>
						{/each}
					</ul>
				</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="App Views"
		entityType="app-views"
	>
		{#if app.views && app.views.length > 0}
			{#each app.views as view, index}
				<details open={index === 0}>
					<summary><h3>View: {view.name ?? view.slug ?? `View ${index + 1}`}</h3></summary>
					<dl>
						{#if view.name}
							<dt>Name</dt>
							<dd>{view.name}</dd>
						{/if}

						{#if view.slug}
							<dt>Slug</dt>
							<dd>{view.slug}</dd>
						{/if}

						{#if view.chainId}
							<dt>Chain ID</dt>
							<dd>{view.chainId}</dd>
						{/if}

						{#if view.colors && view.colors.length > 0}
							<dt>Colors</dt>
							<dd>
								<div style="display: flex; gap: 4px;">
									{#each view.colors as color}
										<div
											style="width: 20px; height: 20px; background-color: {color}; border: 1px solid #ccc; border-radius: 3px;"
											title={color}
										></div>
									{/each}
								</div>
							</dd>
						{/if}

						{#if view.components && view.components.length > 0}
							<dt>Components</dt>
							<dd>
								<ul>
									{#each view.components as component}
										<li>{component}</li>
									{/each}
								</ul>
							</dd>
						{/if}

						{#if view.embeds && view.embeds.length > 0}
							<dt>Embeds</dt>
							<dd>
								<ul>
									{#each view.embeds as embed}
										<li>
											<strong>{embed.name}</strong>
											{#if embed.description} - {embed.description}{/if}
											<br />
											<a href={embed.src} target="_blank" rel="noopener noreferrer">{embed.src}</a>
										</li>
									{/each}
								</ul>
							</dd>
						{/if}

						{#if view.contracts && view.contracts.length > 0}
							<dt>Contracts</dt>
							<dd>
								<ul>
									{#each view.contracts as contract}
										<li>
											<a href="/address/{contract.address}">{contract.address}</a>
										</li>
									{/each}
								</ul>
							</dd>
						{/if}

						{#if view.tags && view.tags.length > 0}
							<dt>Tags</dt>
							<dd>
								<ul>
									{#each view.tags as tag}
										<li>{tag}</li>
									{/each}
								</ul>
							</dd>
						{/if}

						{#if view.links && view.links.length > 0}
							<dt>Links</dt>
							<dd>
								<ul>
									{#each view.links as link}
										<li>
											<a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
										</li>
									{/each}
								</ul>
							</dd>
						{/if}

						{#if view.providers}
							<dt>Data Providers</dt>
							<dd>
								<dl style="margin-left: 16px;">
									{#each Object.entries(view.providers) as [provider, config]}
										<dt>{provider}</dt>
										<dd>
											{#if Array.isArray(config)}
												{config.join(', ')}
											{:else}
												{config}
											{/if}
										</dd>
									{/each}
								</dl>
							</dd>
						{/if}
					</dl>
				</details>
			{/each}
		{:else}
			<p>No views configured for this app.</p>
		{/if}
	</EntitySection>
</Entity>

<style>
	details {
		margin: 12px 0;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 8px;
	}

	summary {
		cursor: pointer;
		font-weight: bold;
		margin: 4px 0 8px 0;
		padding: 4px;
		border-radius: 4px;
		background: #f8f9fa;
	}

	summary:hover {
		background: #e9ecef;
	}

	ul {
		margin: 8px 0;
		padding-left: 20px;
	}

	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 8px 16px;
		margin: 8px 0;
	}

	dt {
		font-weight: bold;
	}

	dd {
		margin: 0;
	}

	img {
		border-radius: 4px;
	}
</style> 