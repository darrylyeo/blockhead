<script lang="ts">
	// Types/constants
	import type { ENSDomain } from '$/entities/ens'
	import { EntityType } from '$/entities'


	// Props
	let { ens }: { ens: ENSDomain } = $props()


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>


<Entity
	type={EntityType.Ens}
	id={ens.name}
	title={ens.name}
	annotation="ENS Domain"
>
	<EntitySection
		title="Basic Information"
		entityType="ens-basic"
	>
		<dl>
			<dt>Name</dt>
			<dd>{ens.name}</dd>

			<dt>Normalized Name</dt>
			<dd>{ens.normalizedName}</dd>

			<dt>Node</dt>
			<dd>{ens.node}</dd>

			<dt>Label Hash</dt>
			<dd>{ens.labelhash}</dd>

			<dt>Chain ID</dt>
			<dd>{ens.chainId}</dd>

			<dt>Status</dt>
			<dd>{ens.status}</dd>

			<dt>Available</dt>
			<dd>{ens.isAvailable ? 'Yes' : 'No'}</dd>

			{#if ens.isPrimary}
				<dt>Primary Name</dt>
				<dd>Yes</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Domain Hierarchy"
		entityType="ens-hierarchy"
	>
		<dl>
			<dt>TLD</dt>
			<dd>{ens.tld}</dd>

			{#if ens.sld}
				<dt>SLD</dt>
				<dd>{ens.sld}</dd>
			{/if}

			{#if ens.subdomain}
				<dt>Subdomain</dt>
				<dd>{ens.subdomain}</dd>
			{/if}

			{#if ens.parent}
				<dt>Parent</dt>
				<dd><a href="/ens/{ens.parent}">{ens.parent}</a></dd>
			{/if}
		</dl>

		{#if ens.subdomains && ens.subdomains.length > 0}
			<details>
				<summary><h3>Subdomains ({ens.subdomains.length})</h3></summary>
				<ul>
					{#each ens.subdomains as subdomain}
						<li><a href="/ens/{subdomain}">{subdomain}</a></li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Ownership"
		entityType="ens-ownership"
	>
		<dl>
			<dt>Owner</dt>
			<dd><a href="/actor/{ens.owner}">{ens.owner}</a></dd>

			{#if ens.registrant}
				<dt>Registrant</dt>
				<dd><a href="/actor/{ens.registrant}">{ens.registrant}</a></dd>
			{/if}

			{#if ens.controller}
				<dt>Controller</dt>
				<dd><a href="/actor/{ens.controller}">{ens.controller}</a></dd>
			{/if}
		</dl>

		{#if ens.transferHistory && ens.transferHistory.length > 0}
			<details>
				<summary
					><h3>
						Transfer History ({ens.transferHistory.length})
					</h3></summary
				>
				<table>
					<thead>
						<tr>
							<th>From</th>
							<th>To</th>
							<th>Timestamp</th>
							<th>Transaction</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{#each ens.transferHistory as transfer}
							<tr>
								<td
									><a href="/actor/{transfer.from}"
										>{transfer.from.slice(0, 10)}...</a
									></td
								>
								<td
									><a href="/actor/{transfer.to}"
										>{transfer.to.slice(0, 10)}...</a
									></td
								>
								<td
									><time
										datetime={new Date(
											transfer.timestamp * 1000,
										).toISOString()}
										>{new Date(
											transfer.timestamp * 1000,
										).toLocaleString()}</time
									></td
								>
								<td
									><a
										href="/transaction/{transfer.transactionHash}"
										>{transfer.transactionHash.slice(
											0,
											10,
										)}...</a
									></td
								>
								<td>{transfer.price || '-'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Registration"
		entityType="ens-registration"
	>
		<dl>
			<dt>Registered At</dt>
			<dd>
				<time datetime={new Date(ens.registeredAt * 1000).toISOString()}
					>{new Date(ens.registeredAt * 1000).toLocaleString()}</time
				>
			</dd>

			{#if ens.expiresAt}
				<dt>Expires At</dt>
				<dd>
					<time
						datetime={new Date(ens.expiresAt * 1000).toISOString()}
						>{new Date(ens.expiresAt * 1000).toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if ens.renewedAt}
				<dt>Last Renewed</dt>
				<dd>
					<time
						datetime={new Date(ens.renewedAt * 1000).toISOString()}
						>{new Date(ens.renewedAt * 1000).toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if ens.registrationDuration}
				<dt>Registration Duration</dt>
				<dd>{ens.registrationDuration / 86400} days</dd>
			{/if}

			{#if ens.registrationPrice}
				<dt>Registration Price</dt>
				<dd>{ens.registrationPrice} wei</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Resolver & Records"
		entityType="ens-resolver"
	>
		<dl>
			{#if ens.resolver}
				<dt>Resolver</dt>
				<dd><a href="/contract/{ens.resolver}">{ens.resolver}</a></dd>
			{/if}

			{#if ens.resolverName}
				<dt>Resolver Name</dt>
				<dd>{ens.resolverName}</dd>
			{/if}
		</dl>

		{#if ens.records}
			{#if ens.records.addresses && ens.records.addresses.length > 0}
				<details>
					<summary
						><h3>
							Address Records ({ens.records.addresses.length})
						</h3></summary
					>
					<table>
						<thead>
							<tr>
								<th>Coin</th>
								<th>Address</th>
								<th>Updated</th>
							</tr>
						</thead>
						<tbody>
							{#each ens.records.addresses as addr}
								<tr>
									<td
										>{addr.coinName ||
											`Type ${addr.coinType}`}</td
									>
									<td>{addr.address}</td>
									<td
										>{addr.updatedAt
											? new Date(
													addr.updatedAt * 1000,
												).toLocaleString()
											: '-'}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if ens.records.text && ens.records.text.length > 0}
				<details>
					<summary
						><h3>
							Text Records ({ens.records.text.length})
						</h3></summary
					>
					<table>
						<thead>
							<tr>
								<th>Key</th>
								<th>Value</th>
								<th>Updated</th>
							</tr>
						</thead>
						<tbody>
							{#each ens.records.text as text}
								<tr>
									<td>{text.key}</td>
									<td>{text.value}</td>
									<td
										>{text.updatedAt
											? new Date(
													text.updatedAt * 1000,
												).toLocaleString()
											: '-'}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			<details>
				<summary><h3>Other Records</h3></summary>
				<dl>
					{#if ens.records.contentHash}
						<dt>Content Hash</dt>
						<dd>{ens.records.contentHash}</dd>
					{/if}

					{#if ens.records.avatar}
						<dt>Avatar</dt>
						<dd>
							<img
								src={ens.records.avatar}
								alt="Avatar"
								style="max-width: 64px; max-height: 64px;"
							/>
						</dd>
					{/if}

					{#if ens.records.email}
						<dt>Email</dt>
						<dd>{ens.records.email}</dd>
					{/if}

					{#if ens.records.url}
						<dt>URL</dt>
						<dd>
							<a
								href={ens.records.url}
								target="_blank"
								rel="noopener">{ens.records.url}</a
							>
						</dd>
					{/if}

					{#if ens.records.twitter}
						<dt>Twitter</dt>
						<dd>
							<a
								href="https://twitter.com/{ens.records.twitter}"
								target="_blank"
								rel="noopener">@{ens.records.twitter}</a
							>
						</dd>
					{/if}

					{#if ens.records.github}
						<dt>GitHub</dt>
						<dd>
							<a
								href="https://github.com/{ens.records.github}"
								target="_blank"
								rel="noopener">{ens.records.github}</a
							>
						</dd>
					{/if}

					{#if ens.records.discord}
						<dt>Discord</dt>
						<dd>{ens.records.discord}</dd>
					{/if}

					{#if ens.records.description}
						<dt>Description</dt>
						<dd>{ens.records.description}</dd>
					{/if}

					{#if ens.records.notice}
						<dt>Notice</dt>
						<dd>{ens.records.notice}</dd>
					{/if}
				</dl>

				{#if ens.records.keywords && ens.records.keywords.length > 0}
					<details>
						<summary><h4>Keywords</h4></summary>
						<ul>
							{#each ens.records.keywords as keyword}
								<li>{keyword}</li>
							{/each}
						</ul>
					</details>
				{/if}
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="NFT Metadata"
		entityType="ens-nft"
	>
		<dl>
			{#if ens.tokenId}
				<dt>Token ID</dt>
				<dd>{ens.tokenId}</dd>
			{/if}

			{#if ens.wrapped !== undefined}
				<dt>Wrapped</dt>
				<dd>{ens.wrapped ? 'Yes' : 'No'}</dd>
			{/if}

			{#if ens.fuses !== undefined}
				<dt>Fuses</dt>
				<dd>{ens.fuses}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Market Data"
		entityType="ens-market"
	>
		<dl>
			{#if ens.isListed !== undefined}
				<dt>Listed</dt>
				<dd>{ens.isListed ? 'Yes' : 'No'}</dd>
			{/if}

			{#if ens.listingPrice}
				<dt>Listing Price</dt>
				<dd>{ens.listingPrice} wei</dd>
			{/if}

			{#if ens.lastSalePrice}
				<dt>Last Sale Price</dt>
				<dd>{ens.lastSalePrice} wei</dd>
			{/if}

			{#if ens.lastSaleAt}
				<dt>Last Sale</dt>
				<dd>
					<time
						datetime={new Date(ens.lastSaleAt * 1000).toISOString()}
						>{new Date(
							ens.lastSaleAt * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}
		</dl>
	</EntitySection>
</Entity>
