<script lang="ts">
	// Types/constants
	import type { DataSource } from '$/data'
	import { EntityType } from '$/entities'


	// Props
	let { datasource }: { datasource: DataSource } = $props()


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>


<Entity
	type={EntityType.Types}
	id={datasource.id}
	title={datasource.name}
	annotation="Data Source"
>
	<EntitySection
		title="Basic Information"
		entityType="datasource-basic"
	>
		<dl>
			<dt>ID</dt>
			<dd>{datasource.id}</dd>

			<dt>Name</dt>
			<dd>{datasource.name}</dd>

			<dt>Type</dt>
			<dd>{datasource.type}</dd>

			<dt>Provider</dt>
			<dd>{datasource.provider}</dd>

			{#if datasource.version}
				<dt>Version</dt>
				<dd>{datasource.version}</dd>
			{/if}

			<dt>Status</dt>
			<dd>{datasource.status}</dd>

			{#if datasource.healthScore !== undefined}
				<dt>Health Score</dt>
				<dd>{datasource.healthScore}%</dd>
			{/if}

			{#if datasource.uptime !== undefined}
				<dt>Uptime</dt>
				<dd>{datasource.uptime}%</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Configuration"
		entityType="datasource-config"
	>
		<dl>
			<dt>Endpoint</dt>
			<dd><code>{datasource.endpoint.url}</code></dd>

			{#if datasource.endpoint.method}
				<dt>Method</dt>
				<dd>{datasource.endpoint.method}</dd>
			{/if}

			{#if datasource.endpoint.timeout}
				<dt>Timeout</dt>
				<dd>{datasource.endpoint.timeout}ms</dd>
			{/if}

			{#if datasource.apiKey}
				<dt>API Key</dt>
				<dd>***{datasource.apiKey.slice(-4)}</dd>
			{/if}

			{#if datasource.defaultChain}
				<dt>Default Chain</dt>
				<dd>{datasource.defaultChain}</dd>
			{/if}
		</dl>

		{#if datasource.supportedChains && datasource.supportedChains.length > 0}
			<details>
				<summary
					><h3>
						Supported Chains ({datasource.supportedChains.length})
					</h3></summary
				>
				<ul>
					{#each datasource.supportedChains as chainId}
						<li>Chain ID: {chainId}</li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Performance"
		entityType="datasource-performance"
	>
		<dl>
			{#if datasource.averageResponseTime !== undefined}
				<dt>Average Response Time</dt>
				<dd>{datasource.averageResponseTime}ms</dd>
			{/if}

			{#if datasource.successRate !== undefined}
				<dt>Success Rate</dt>
				<dd>{datasource.successRate}%</dd>
			{/if}
		</dl>

		{#if datasource.rateLimits && datasource.rateLimits.length > 0}
			<details>
				<summary><h3>Rate Limits</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Window</th>
							<th>Limit</th>
							<th>Remaining</th>
							<th>Reset At</th>
						</tr>
					</thead>
					<tbody>
						{#each datasource.rateLimits as limit}
							<tr>
								<td>{limit.window}</td>
								<td>{limit.limit}</td>
								<td>{limit.remaining ?? '-'}</td>
								<td
									>{limit.resetAt
										? new Date(
												limit.resetAt * 1000,
											).toLocaleString()
										: '-'}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Features & Capabilities"
		entityType="datasource-features"
	>
		{#if datasource.capabilities}
			<dl>
				{#if datasource.capabilities.archive !== undefined}
					<dt>Archive Node</dt>
					<dd>{datasource.capabilities.archive ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.capabilities.realtime !== undefined}
					<dt>Real-time</dt>
					<dd>{datasource.capabilities.realtime ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.capabilities.batch !== undefined}
					<dt>Batch Requests</dt>
					<dd>{datasource.capabilities.batch ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.capabilities.filtering !== undefined}
					<dt>Filtering</dt>
					<dd>{datasource.capabilities.filtering ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.capabilities.pagination !== undefined}
					<dt>Pagination</dt>
					<dd>{datasource.capabilities.pagination ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>
		{/if}

		{#if datasource.features && datasource.features.length > 0}
			<details>
				<summary
					><h3>Features ({datasource.features.length})</h3></summary
				>
				<ul>
					{#each datasource.features as feature}
						<li>{feature}</li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>

	{#if datasource.type === 'RPC' && 'rpcMethods' in datasource}
		<EntitySection
			title="RPC Details"
			entityType="datasource-rpc"
		>
			<dl>
				{#if datasource.wsEndpoint}
					<dt>WebSocket Endpoint</dt>
					<dd><code>{datasource.wsEndpoint}</code></dd>
				{/if}

				{#if datasource.maxBatchSize !== undefined}
					<dt>Max Batch Size</dt>
					<dd>{datasource.maxBatchSize}</dd>
				{/if}

				{#if datasource.archiveNode !== undefined}
					<dt>Archive Node</dt>
					<dd>{datasource.archiveNode ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.tracingEnabled !== undefined}
					<dt>Tracing Enabled</dt>
					<dd>{datasource.tracingEnabled ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>

			{#if datasource.rpcMethods && datasource.rpcMethods.length > 0}
				<details>
					<summary
						><h3>
							RPC Methods ({datasource.rpcMethods.length})
						</h3></summary
					>
					<ul>
						{#each datasource.rpcMethods as method}
							<li><code>{method}</code></li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if datasource.type === 'REST' && 'endpoints' in datasource}
		<EntitySection
			title="REST Details"
			entityType="datasource-rest"
		>
			<dl>
				{#if datasource.basePath}
					<dt>Base Path</dt>
					<dd><code>{datasource.basePath}</code></dd>
				{/if}

				{#if datasource.authentication}
					<dt>Authentication</dt>
					<dd>{datasource.authentication}</dd>
				{/if}
			</dl>

			{#if datasource.endpoints && datasource.endpoints.length > 0}
				<details>
					<summary
						><h3>
							Endpoints ({datasource.endpoints.length})
						</h3></summary
					>
					<table>
						<thead>
							<tr>
								<th>Path</th>
								<th>Method</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{#each datasource.endpoints as endpoint}
								<tr>
									<td><code>{endpoint.path}</code></td>
									<td>{endpoint.method}</td>
									<td>{endpoint.description || '-'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if datasource.type === 'GraphQL' && 'schema' in datasource}
		<EntitySection
			title="GraphQL Details"
			entityType="datasource-graphql"
		>
			<dl>
				{#if datasource.introspectionEnabled !== undefined}
					<dt>Introspection Enabled</dt>
					<dd>{datasource.introspectionEnabled ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.playgroundEnabled !== undefined}
					<dt>Playground Enabled</dt>
					<dd>{datasource.playgroundEnabled ? 'Yes' : 'No'}</dd>
				{/if}

				{#if datasource.maxQueryDepth !== undefined}
					<dt>Max Query Depth</dt>
					<dd>{datasource.maxQueryDepth}</dd>
				{/if}
			</dl>

			<details>
				<summary><h3>Schema</h3></summary>
				<pre><code>{datasource.schema}</code></pre>
			</details>
		</EntitySection>
	{/if}

	{#if datasource.type === 'Subgraph' && 'subgraphId' in datasource}
		<EntitySection
			title="Subgraph Details"
			entityType="datasource-subgraph"
		>
			<dl>
				<dt>Subgraph ID</dt>
				<dd>{datasource.subgraphId}</dd>

				{#if datasource.deploymentId}
					<dt>Deployment ID</dt>
					<dd>{datasource.deploymentId}</dd>
				{/if}

				<dt>Network</dt>
				<dd>{datasource.network}</dd>

				{#if datasource.startBlock !== undefined}
					<dt>Start Block</dt>
					<dd>{datasource.startBlock}</dd>
				{/if}

				{#if datasource.indexingStatus}
					<dt>Indexing Status</dt>
					<dd>{datasource.indexingStatus}</dd>
				{/if}
			</dl>

			{#if datasource.entities && datasource.entities.length > 0}
				<details>
					<summary
						><h3>
							Entities ({datasource.entities.length})
						</h3></summary
					>
					<ul>
						{#each datasource.entities as entity}
							<li>{entity}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<EntitySection
		title="Documentation"
		entityType="datasource-docs"
	>
		<dl>
			{#if datasource.documentationUrl}
				<dt>Documentation</dt>
				<dd>
					<a
						href={datasource.documentationUrl}
						target="_blank"
						rel="noopener">{datasource.documentationUrl}</a
					>
				</dd>
			{/if}

			{#if datasource.swaggerUrl}
				<dt>Swagger/OpenAPI</dt>
				<dd>
					<a
						href={datasource.swaggerUrl}
						target="_blank"
						rel="noopener">{datasource.swaggerUrl}</a
					>
				</dd>
			{/if}

			{#if datasource.graphqlSchema}
				<dt>GraphQL Schema</dt>
				<dd>
					<a
						href={datasource.graphqlSchema}
						target="_blank"
						rel="noopener">{datasource.graphqlSchema}</a
					>
				</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Timestamps"
		entityType="datasource-timestamps"
	>
		<dl>
			<dt>Created At</dt>
			<dd>
				<time
					datetime={new Date(
						datasource.createdAt * 1000,
					).toISOString()}
					>{new Date(
						datasource.createdAt * 1000,
					).toLocaleString()}</time
				>
			</dd>

			<dt>Updated At</dt>
			<dd>
				<time
					datetime={new Date(
						datasource.updatedAt * 1000,
					).toISOString()}
					>{new Date(
						datasource.updatedAt * 1000,
					).toLocaleString()}</time
				>
			</dd>

			{#if datasource.lastCheckedAt}
				<dt>Last Checked</dt>
				<dd>
					<time
						datetime={new Date(
							datasource.lastCheckedAt * 1000,
						).toISOString()}
						>{new Date(
							datasource.lastCheckedAt * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}
		</dl>
	</EntitySection>
</Entity>
