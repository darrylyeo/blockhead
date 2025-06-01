<script lang="ts">
	// Types/constants
	import type { NFT } from '$/entities/nft'
	import { EntityType } from '$/entities'


	// Props
	let { nft }: { nft: NFT } = $props()


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>


<Entity
	type={EntityType.Nft}
	id={`${nft.contractAddress}:${nft.tokenId}`}
	title={nft.name ?? `#${nft.tokenId}`}
	annotation="NFT"
>
	<EntitySection
		title="Basic Information"
		entityType="nft-basic"
	>
		<dl>
			<dt>Contract Address</dt>
			<dd>
				<a href="/actor/{nft.contractAddress}">{nft.contractAddress}</a>
			</dd>

			<dt>Token ID</dt>
			<dd>{nft.tokenId}</dd>

			<dt>Chain ID</dt>
			<dd>{nft.chainId}</dd>

			<dt>Standard</dt>
			<dd>{nft.standard}</dd>

			<dt>Category</dt>
			<dd>{nft.category}</dd>
		</dl>
	</EntitySection>

	<EntitySection
		title="Ownership"
		entityType="nft-ownership"
	>
		<dl>
			<dt>Current Owner</dt>
			<dd><a href="/actor/{nft.owner}">{nft.owner}</a></dd>

			{#if nft.minter}
				<dt>Minter</dt>
				<dd><a href="/actor/{nft.minter}">{nft.minter}</a></dd>
			{/if}

			{#if nft.mintedAt}
				<dt>Minted At</dt>
				<dd>
					<time datetime={new Date(nft.mintedAt * 1000).toISOString()}
						>{new Date(nft.mintedAt * 1000)?.toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if nft.mintTransaction}
				<dt>Mint Transaction</dt>
				<dd>
					<a href="/transaction/{nft.mintTransaction}"
						>{nft.mintTransaction}</a
					>
				</dd>
			{/if}

			{#if nft.mintPrice}
				<dt>Mint Price</dt>
				<dd>{nft.mintPrice} wei</dd>
			{/if}
		</dl>

		{#if nft.ownershipHistory && nft.ownershipHistory.length > 0}
			<details>
				<summary
					><h3>
						Ownership History ({nft.ownershipHistory.length})
					</h3></summary
				>
				<table>
					<thead>
						<tr>
							<th>From</th>
							<th>To</th>
							<th>Price</th>
							<th>Timestamp</th>
							<th>Transaction</th>
						</tr>
					</thead>
					<tbody>
						{#each nft.ownershipHistory as transfer}
							<tr>
								<td
									><a href="/actor/{transfer.from}"
										>{transfer.from.slice(0, 10)}...</a
									></td
								>
								<td
									><a href="/actor/{transfer.owner}"
										>{transfer.owner.slice(0, 10)}...</a
									></td
								>
								<td>{transfer.price || '-'}</td>
								<td
									><time
										datetime={new Date(
											transfer.timestamp * 1000,
										).toISOString()}
										>{new Date(
											transfer.timestamp * 1000,
										)?.toLocaleString()}</time
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
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Metadata"
		entityType="nft-metadata"
	>
		<dl>
			{#if nft.metadata.name}
				<dt>Name</dt>
				<dd>{nft.metadata.name}</dd>
			{/if}

			{#if nft.metadata.description}
				<dt>Description</dt>
				<dd>{nft.metadata.description}</dd>
			{/if}

			{#if nft.metadata.image}
				<dt>Image</dt>
				<dd>
					<img
						src={nft.metadata.image}
						alt={nft.metadata.name || 'NFT'}
						style="max-width: 300px; max-height: 300px;"
					/>
				</dd>
			{/if}

			{#if nft.metadata.animationUrl}
				<dt>Animation URL</dt>
				<dd>
					<a
						href={nft.metadata.animationUrl}
						target="_blank"
						rel="noopener">{nft.metadata.animationUrl}</a
					>
				</dd>
			{/if}

			{#if nft.metadata.externalUrl}
				<dt>External URL</dt>
				<dd>
					<a
						href={nft.metadata.externalUrl}
						target="_blank"
						rel="noopener">{nft.metadata.externalUrl}</a
					>
				</dd>
			{/if}
		</dl>

		{#if nft.metadata.attributes && nft.metadata.attributes.length > 0}
			<details>
				<summary
					><h3>
						Attributes ({nft.metadata.attributes.length})
					</h3></summary
				>
				<table>
					<thead>
						<tr>
							<th>Trait Type</th>
							<th>Value</th>
							<th>Display Type</th>
							<th>Rarity</th>
						</tr>
					</thead>
					<tbody>
						{#each nft.metadata.attributes as attr}
							<tr>
								<td>{attr.traitType}</td>
								<td>{attr.value}</td>
								<td>{attr.displayType || '-'}</td>
								<td
									>{attr.rarity
										? `${(attr.rarity * 100).toFixed(2)}%`
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
		title="Rarity & Supply"
		entityType="nft-rarity"
	>
		<dl>
			{#if nft.rarity}
				<dt>Rarity Tier</dt>
				<dd>{nft.rarity}</dd>
			{/if}

			{#if nft.rarityScore !== undefined && nft.rarityScore !== null}
				<dt>Rarity Score</dt>
				<dd>{nft.rarityScore}</dd>
			{/if}

			{#if nft.rarityRank !== undefined && nft.rarityRank !== null}
				<dt>Rarity Rank</dt>
				<dd>#{nft.rarityRank}</dd>
			{/if}

			{#if nft.totalSupply !== undefined && nft.totalSupply !== null}
				<dt>Total Supply</dt>
				<dd>{nft.totalSupply?.toLocaleString()}</dd>
			{/if}

			{#if nft.circulatingSupply !== undefined && nft.circulatingSupply !== null}
				<dt>Circulating Supply</dt>
				<dd>{nft.circulatingSupply?.toLocaleString()}</dd>
			{/if}

			{#if nft.burned !== undefined && nft.burned !== null}
				<dt>Burned</dt>
				<dd>{nft.burned ? 'Yes' : 'No'}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Trading"
		entityType="nft-trading"
	>
		<dl>
			{#if nft.isListed !== undefined && nft.isListed !== null}
				<dt>Listed</dt>
				<dd>{nft.isListed ? 'Yes' : 'No'}</dd>
			{/if}

			{#if nft.currentPrice}
				<dt>Current Price</dt>
				<dd>{nft.currentPrice} wei</dd>
			{/if}

			{#if nft.lastSalePrice}
				<dt>Last Sale Price</dt>
				<dd>{nft.lastSalePrice} wei</dd>
			{/if}

			{#if nft.lastSaleAt}
				<dt>Last Sale</dt>
				<dd>
					<time
						datetime={new Date(nft.lastSaleAt * 1000).toISOString()}
						>{new Date(
							nft.lastSaleAt * 1000,
						)?.toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if nft.floorPrice}
				<dt>Collection Floor Price</dt>
				<dd>{nft.floorPrice} wei</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if nft.standard === 'ERC721' && 'tokenURI' in nft}
		<EntitySection
			title="ERC721 Details"
			entityType="nft-erc721"
		>
			<dl>
				{#if nft.tokenURI}
					<dt>Token URI</dt>
					<dd>
						<a
							href={nft.tokenURI}
							target="_blank"
							rel="noopener">{nft.tokenURI}</a
						>
					</dd>
				{/if}

				{#if nft.approved}
					<dt>Approved</dt>
					<dd><a href="/actor/{nft.approved}">{nft.approved}</a></dd>
				{/if}
			</dl>

			{#if nft.approvedForAll && Object.keys(nft.approvedForAll).length > 0}
				<details>
					<summary><h3>Approved For All</h3></summary>
					<ul>
						{#each Object.entries(nft.approvedForAll) as [operator, approved]}
							{#if approved}
								<li>
									<a href="/actor/{operator}">{operator}</a>
								</li>
							{/if}
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if nft.standard === 'ERC1155' && 'balance' in nft}
		<EntitySection
			title="ERC1155 Details"
			entityType="nft-erc1155"
		>
			<dl>
				<dt>Balance</dt>
				<dd>{nft.balance}</dd>

				{#if nft.uri}
					<dt>URI</dt>
					<dd>
						<a
							href={nft.uri}
							target="_blank"
							rel="noopener">{nft.uri}</a
						>
					</dd>
				{/if}

				{#if nft.totalHolders !== undefined && nft.totalHolders !== null}
					<dt>Total Holders</dt>
					<dd>{nft.totalHolders?.toLocaleString()}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if nft.standard === 'ENS' && 'ensName' in nft}
		<EntitySection
			title="ENS Details"
			entityType="nft-ens"
		>
			<dl>
				<dt>ENS Name</dt>
				<dd>{nft.ensName}</dd>

				<dt>Normalized Name</dt>
				<dd>{nft.normalizedName}</dd>

				{#if nft.expiryDate}
					<dt>Expiry Date</dt>
					<dd>
						<time
							datetime={new Date(
								nft.expiryDate * 1000,
							).toISOString()}
							>{new Date(
								nft.expiryDate * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}

				{#if nft.resolver}
					<dt>Resolver</dt>
					<dd>
						<a href="/contract/{nft.resolver}">{nft.resolver}</a>
					</dd>
				{/if}
			</dl>

			{#if nft.records && Object.keys(nft.records).length > 0}
				<details>
					<summary><h3>Records</h3></summary>
					<dl>
						{#each Object.entries(nft.records) as [key, value]}
							<dt>{key}</dt>
							<dd>{value}</dd>
						{/each}
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if nft.category === 'Gaming' && 'gameData' in nft && nft.gameData}
		<EntitySection
			title="Game Data"
			entityType="nft-gaming"
		>
			<dl>
				<dt>Game ID</dt>
				<dd>{nft.gameData.gameId}</dd>

				{#if nft.gameData.level !== undefined && nft.gameData.level !== null}
					<dt>Level</dt>
					<dd>{nft.gameData.level}</dd>
				{/if}

				{#if nft.gameData.experience !== undefined && nft.gameData.experience !== null}
					<dt>Experience</dt>
					<dd>{nft.gameData.experience?.toLocaleString()}</dd>
				{/if}

				{#if nft.gameData.equipped !== undefined && nft.gameData.equipped !== null}
					<dt>Equipped</dt>
					<dd>{nft.gameData.equipped ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>

			{#if nft.gameData.stats && Object.keys(nft.gameData.stats).length > 0}
				<details>
					<summary><h3>Stats</h3></summary>
					<dl>
						{#each Object.entries(nft.gameData.stats) as [stat, value]}
							<dt>{stat}</dt>
							<dd>{value}</dd>
						{/each}
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}
</Entity>
