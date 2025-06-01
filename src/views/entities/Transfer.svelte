<script lang="ts">
	// Types/constants
	import type { Transfer } from '$/entities/transfer'
	import { TransferCategory, TransferClassification, TransferContext } from '$/entities/transfer'
	import { TokenStandard } from '$/entities/token'
	import { EntityType } from '$/entities'

	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'

	// Props
	let { transfer }: { transfer: Transfer } = $props()
</script>

<Entity
	type={EntityType.Transfer}
	id={transfer.id}
	title={`Transfer: ${transfer.id}`}
	annotation={`${transfer.standard} Transfer`}
>
	<EntitySection title="Basic Information" entityType="transfer-basic">
		<dl>
			<dt>Transfer ID</dt>
			<dd>{transfer.id}</dd>

			<dt>Chain ID</dt>
			<dd>{transfer.chainId}</dd>

			<dt>Category</dt>
			<dd class="category {transfer.category?.toLowerCase()}">{transfer.category}</dd>

			<dt>Standard</dt>
			<dd>{transfer.standard}</dd>

			<dt>Classification</dt>
			<dd class="classification {transfer.classification?.toLowerCase()}">{transfer.classification}</dd>

			<dt>Context</dt>
			<dd>{transfer.context}</dd>

			<dt>Timestamp</dt>
			<dd>
				<time datetime={new Date(transfer.timestamp * 1000).toISOString()}>
					{new Date(transfer.timestamp * 1000)?.toLocaleString()}
				</time>
			</dd>

			<dt>From</dt>
			<dd><a href="/address/{transfer.from}">{transfer.from}</a></dd>

			<dt>To</dt>
			<dd><a href="/address/{transfer.to}">{transfer.to}</a></dd>

			<dt>Block Number</dt>
			<dd><a href="/block/{transfer.blockNumber}">{transfer.blockNumber?.toLocaleString()}</a></dd>

			<dt>Transaction Hash</dt>
			<dd><a href="/transaction/{transfer.transactionHash}">{transfer.transactionHash}</a></dd>

			<dt>Transaction Index</dt>
			<dd>{transfer.transactionIndex}</dd>

			<dt>Log Index</dt>
			<dd>{transfer.logIndex}</dd>

			{#if transfer.operator}
				<dt>Operator</dt>
				<dd><a href="/address/{transfer.operator}">{transfer.operator}</a></dd>
			{/if}

			{#if transfer.isSuccess !== undefined && transfer.isSuccess !== null}
				<dt>Success</dt>
				<dd class="status {transfer.isSuccess ? 'success' : 'failed'}">
					{transfer.isSuccess ? 'Yes' : 'No'}
				</dd>
			{/if}

			{#if transfer.gasUsed}
				<dt>Gas Used</dt>
				<dd>{transfer.gasUsed?.toLocaleString()}</dd>
			{/if}

			{#if transfer.gasPrice}
				<dt>Gas Price</dt>
				<dd>{transfer.gasPrice} wei</dd>
			{/if}

			{#if transfer.fee}
				<dt>Transaction Fee</dt>
				<dd>{transfer.fee}</dd>
			{/if}

			{#if transfer.feeUsd}
				<dt>Transaction Fee (USD)</dt>
				<dd>${transfer.feeUsd?.toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	<!-- Token-specific transfer data -->
	{#if transfer.standard === TokenStandard.Native && 'nativeData' in transfer}
		<EntitySection title="Native Currency Transfer" entityType="transfer-native">
			<dl>
				<dt>Amount</dt>
				<dd>{transfer.nativeData.amount} wei</dd>

				{#if transfer.nativeData.amountFormatted}
					<dt>Amount (Formatted)</dt>
					<dd>{transfer.nativeData.amountFormatted} {transfer.nativeData.symbol}</dd>
				{/if}

				<dt>Symbol</dt>
				<dd>{transfer.nativeData.symbol}</dd>

				<dt>Decimals</dt>
				<dd>{transfer.nativeData.decimals}</dd>

				{#if transfer.nativeData.valueUsd}
					<dt>Value (USD)</dt>
					<dd>${transfer.nativeData.valueUsd?.toLocaleString()}</dd>
				{/if}

				{#if transfer.nativeData.price}
					<dt>Price at Transfer</dt>
					<dd>${transfer.nativeData.price}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer.standard === TokenStandard.Erc20 && 'erc20Data' in transfer}
		<EntitySection title="ERC20 Token Transfer" entityType="transfer-erc20">
			<dl>
				<dt>Token Address</dt>
				<dd><a href="/token/{transfer.erc20Data.tokenAddress}">{transfer.erc20Data.tokenAddress}</a></dd>

				<dt>Amount</dt>
				<dd>{transfer.erc20Data.amount}</dd>

				{#if transfer.erc20Data.amountFormatted}
					<dt>Amount (Formatted)</dt>
					<dd>{transfer.erc20Data.amountFormatted} {transfer.erc20Data.symbol}</dd>
				{/if}

				<dt>Symbol</dt>
				<dd>{transfer.erc20Data.symbol}</dd>

				<dt>Name</dt>
				<dd>{transfer.erc20Data.name}</dd>

				<dt>Decimals</dt>
				<dd>{transfer.erc20Data.decimals}</dd>

				{#if transfer.erc20Data.valueUsd}
					<dt>Value (USD)</dt>
					<dd>${transfer.erc20Data.valueUsd?.toLocaleString()}</dd>
				{/if}

				{#if transfer.erc20Data.price}
					<dt>Price at Transfer</dt>
					<dd>${transfer.erc20Data.price}</dd>
				{/if}

				{#if transfer.erc20Data.holderBalanceAfter}
					<dt>Recipient Balance After</dt>
					<dd>{transfer.erc20Data.holderBalanceAfter}</dd>
				{/if}

				{#if transfer.erc20Data.senderBalanceAfter}
					<dt>Sender Balance After</dt>
					<dd>{transfer.erc20Data.senderBalanceAfter}</dd>
				{/if}

				{#if transfer.erc20Data.totalSupplyAfter}
					<dt>Total Supply After</dt>
					<dd>{transfer.erc20Data.totalSupplyAfter}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer.standard === TokenStandard.Erc721 && 'nftData' in transfer}
		<EntitySection title="NFT Transfer" entityType="transfer-nft">
			<dl>
				<dt>Token Address</dt>
				<dd><a href="/token/{transfer.nftData.tokenAddress}">{transfer.nftData.tokenAddress}</a></dd>

				<dt>Token ID</dt>
				<dd>{transfer.nftData.tokenId}</dd>

				<dt>Collection Name</dt>
				<dd>{transfer.nftData.collectionName}</dd>

				<dt>Collection Symbol</dt>
				<dd>{transfer.nftData.collectionSymbol}</dd>

				{#if transfer.nftData.tokenUri}
					<dt>Token URI</dt>
					<dd><a href={transfer.nftData.tokenUri} target="_blank" rel="noopener noreferrer">{transfer.nftData.tokenUri}</a></dd>
				{/if}

				{#if transfer.nftData.metadata}
					<dt>Metadata</dt>
					<dd>
						<details>
							<summary>NFT Metadata</summary>
							<dl>
								{#if transfer.nftData.metadata.name}
									<dt>Name</dt>
									<dd>{transfer.nftData.metadata.name}</dd>
								{/if}

								{#if transfer.nftData.metadata.description}
									<dt>Description</dt>
									<dd>{transfer.nftData.metadata.description}</dd>
								{/if}

								{#if transfer.nftData.metadata.image}
									<dt>Image</dt>
									<dd>
										<img src={transfer.nftData.metadata.image} alt={transfer.nftData.metadata.name ?? `Token ${transfer.nftData.tokenId}`} style="max-width: 200px; max-height: 200px; border-radius: 8px;" />
									</dd>
								{/if}

								{#if transfer.nftData.metadata.externalUrl}
									<dt>External URL</dt>
									<dd><a href={transfer.nftData.metadata.externalUrl} target="_blank" rel="noopener noreferrer">{transfer.nftData.metadata.externalUrl}</a></dd>
								{/if}

								{#if transfer.nftData.metadata.animationUrl}
									<dt>Animation URL</dt>
									<dd><a href={transfer.nftData.metadata.animationUrl} target="_blank" rel="noopener noreferrer">{transfer.nftData.metadata.animationUrl}</a></dd>
								{/if}

								{#if transfer.nftData.metadata.backgroundColor}
									<dt>Background Color</dt>
									<dd>
										<span style="display: inline-block; width: 20px; height: 20px; background-color: #{transfer.nftData.metadata.backgroundColor}; border: 1px solid #ccc; border-radius: 3px; vertical-align: middle;"></span>
										#{transfer.nftData.metadata.backgroundColor}
									</dd>
								{/if}

								{#if transfer.nftData.metadata.youtubeUrl}
									<dt>YouTube URL</dt>
									<dd><a href={transfer.nftData.metadata.youtubeUrl} target="_blank" rel="noopener noreferrer">{transfer.nftData.metadata.youtubeUrl}</a></dd>
								{/if}
							</dl>

							{#if transfer.nftData.metadata.attributes && transfer.nftData.metadata.attributes.length > 0}
								<h4>Attributes ({transfer.nftData.metadata.attributes.length})</h4>
								<table>
									<thead>
										<tr>
											<th>Trait Type</th>
											<th>Value</th>
											<th>Display Type</th>
											<th>Max Value</th>
										</tr>
									</thead>
									<tbody>
										{#each transfer.nftData.metadata.attributes as attr}
											<tr>
												<td>{attr.trait_type}</td>
												<td>{attr.value}</td>
												<td>{attr.display_type ?? 'N/A'}</td>
												<td>{attr.max_value ?? 'N/A'}</td>
											</tr>
										{/each}
									</tbody>
								</table>
							{/if}
						</details>
					</dd>
				{/if}

				{#if transfer.nftData.valueUsd}
					<dt>Estimated Value (USD)</dt>
					<dd>${transfer.nftData.valueUsd?.toLocaleString()}</dd>
				{/if}

				{#if transfer.nftData.salePrice}
					<dt>Sale Price</dt>
					<dd>{transfer.nftData.salePrice}</dd>
				{/if}

				{#if transfer.nftData.marketplace}
					<dt>Marketplace</dt>
					<dd>{transfer.nftData.marketplace}</dd>
				{/if}

				{#if transfer.nftData.royalty}
					<dt>Royalty</dt>
					<dd>{transfer.nftData.royalty.recipient} - {transfer.nftData.royalty.percentage}%</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer.standard === TokenStandard.Erc1155 && 'multiTokenData' in transfer}
		<EntitySection title="Multi-Token Transfer" entityType="transfer-multi-token">
			<dl>
				<dt>Token Address</dt>
				<dd><a href="/token/{transfer.multiTokenData.tokenAddress}">{transfer.multiTokenData.tokenAddress}</a></dd>

				<dt>Token ID</dt>
				<dd>{transfer.multiTokenData.tokenId}</dd>

				<dt>Amount</dt>
				<dd>{transfer.multiTokenData.amount?.toLocaleString()}</dd>

				{#if transfer.multiTokenData.tokenUri}
					<dt>Token URI</dt>
					<dd><a href={transfer.multiTokenData.tokenUri} target="_blank" rel="noopener noreferrer">{transfer.multiTokenData.tokenUri}</a></dd>
				{/if}

				{#if transfer.multiTokenData.isFungible !== undefined && transfer.multiTokenData.isFungible !== null}
					<dt>Fungible</dt>
					<dd>{transfer.multiTokenData.isFungible ? 'Yes' : 'No'}</dd>
				{/if}

				{#if transfer.multiTokenData.valueUsd}
					<dt>Total Value (USD)</dt>
					<dd>${transfer.multiTokenData.valueUsd?.toLocaleString()}</dd>
				{/if}

				{#if transfer.multiTokenData.unitPrice}
					<dt>Unit Price</dt>
					<dd>{transfer.multiTokenData.unitPrice}</dd>
				{/if}

				{#if transfer.multiTokenData.balanceAfter}
					<dt>Recipient Balance After</dt>
					<dd>{transfer.multiTokenData.balanceAfter?.toLocaleString()}</dd>
				{/if}

				{#if transfer.multiTokenData.totalSupplyAfter}
					<dt>Total Supply After</dt>
					<dd>{transfer.multiTokenData.totalSupplyAfter?.toLocaleString()}</dd>
				{/if}
			</dl>

			{#if transfer.multiTokenData.gameAsset}
				<details>
					<summary><h3>Game Asset Details</h3></summary>
					<dl>
						<dt>Asset Type</dt>
						<dd>{transfer.multiTokenData.gameAsset.assetType}</dd>

						<dt>Rarity</dt>
						<dd>{transfer.multiTokenData.gameAsset.rarity}</dd>

						{#if transfer.multiTokenData.gameAsset.level}
							<dt>Level</dt>
							<dd>{transfer.multiTokenData.gameAsset.level}</dd>
						{/if}

						{#if transfer.multiTokenData.gameAsset.stats}
							<dt>Stats</dt>
							<dd>
								<dl style="margin-left: 16px;">
									{#each Object.entries(transfer.multiTokenData.gameAsset.stats) as [stat, value]}
										<dt>{stat}</dt>
										<dd>{value}</dd>
									{/each}
								</dl>
							</dd>
						{/if}
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Context-specific sections -->
	{#if transfer.context === TransferContext.Dex && 'dexData' in transfer}
		<EntitySection title="DEX Transfer Data" entityType="transfer-dex">
			<dl>
				<dt>DEX Protocol</dt>
				<dd>{transfer.dexData.protocol}</dd>

				<dt>Pool Address</dt>
				<dd><a href="/address/{transfer.dexData.poolAddress}">{transfer.dexData.poolAddress}</a></dd>

				<dt>Trading Pair</dt>
				<dd>{transfer.dexData.tradingPair}</dd>

				<dt>Trade Type</dt>
				<dd>{transfer.dexData.tradeType}</dd>

				<dt>Price Impact</dt>
				<dd>{transfer.dexData.priceImpact}%</dd>

				<dt>Slippage</dt>
				<dd>{transfer.dexData.slippage}%</dd>

				{#if transfer.dexData.liquidity}
					<dt>Pool Liquidity</dt>
					<dd>${transfer.dexData.liquidity?.toLocaleString()}</dd>
				{/if}

				{#if transfer.dexData.volume24h}
					<dt>24h Volume</dt>
					<dd>${transfer.dexData.volume24h?.toLocaleString()}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer.context === TransferContext.Bridge && 'bridgeData' in transfer}
		<EntitySection title="Bridge Transfer Data" entityType="transfer-bridge">
			<dl>
				<dt>Bridge Protocol</dt>
				<dd>{transfer.bridgeData.protocol}</dd>

				<dt>Source Chain</dt>
				<dd>Chain {transfer.bridgeData.sourceChain}</dd>

				<dt>Destination Chain</dt>
				<dd>Chain {transfer.bridgeData.destinationChain}</dd>

				<dt>Bridge Type</dt>
				<dd>{transfer.bridgeData.bridgeType}</dd>

				{#if transfer.bridgeData.lockAddress}
					<dt>Lock Address</dt>
					<dd><a href="/address/{transfer.bridgeData.lockAddress}">{transfer.bridgeData.lockAddress}</a></dd>
				{/if}

				{#if transfer.bridgeData.unlockAddress}
					<dt>Unlock Address</dt>
					<dd><a href="/address/{transfer.bridgeData.unlockAddress}">{transfer.bridgeData.unlockAddress}</a></dd>
				{/if}

				{#if transfer.bridgeData.bridgeFee}
					<dt>Bridge Fee</dt>
					<dd>{transfer.bridgeData.bridgeFee}</dd>
				{/if}

				{#if transfer.bridgeData.relayerFee}
					<dt>Relayer Fee</dt>
					<dd>{transfer.bridgeData.relayerFee}</dd>
				{/if}

				{#if transfer.bridgeData.confirmations}
					<dt>Required Confirmations</dt>
					<dd>{transfer.bridgeData.confirmations}</dd>
				{/if}

				{#if transfer.bridgeData.estimatedTime}
					<dt>Estimated Time</dt>
					<dd>{Math.round(transfer.bridgeData.estimatedTime / 60)} minutes</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer.context === TransferContext.Lending && 'lendingData' in transfer}
		<EntitySection title="Lending Transfer Data" entityType="transfer-lending">
			<dl>
				<dt>Lending Protocol</dt>
				<dd>{transfer.lendingData.protocol}</dd>

				<dt>Market Address</dt>
				<dd><a href="/address/{transfer.lendingData.marketAddress}">{transfer.lendingData.marketAddress}</a></dd>

				<dt>Action Type</dt>
				<dd>{transfer.lendingData.actionType}</dd>

				{#if transfer.lendingData.interestRate}
					<dt>Interest Rate</dt>
					<dd>{transfer.lendingData.interestRate}%</dd>
				{/if}

				{#if transfer.lendingData.collateralFactor}
					<dt>Collateral Factor</dt>
					<dd>{transfer.lendingData.collateralFactor}%</dd>
				{/if}

				{#if transfer.lendingData.healthFactor}
					<dt>Health Factor</dt>
					<dd class="health-factor {transfer.lendingData.healthFactor < 1.1 ? 'danger' : transfer.lendingData.healthFactor < 1.5 ? 'warning' : 'safe'}">
						{transfer.lendingData.healthFactor.toFixed(3)}
					</dd>
				{/if}

				{#if transfer.lendingData.liquidationThreshold}
					<dt>Liquidation Threshold</dt>
					<dd>{transfer.lendingData.liquidationThreshold}%</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer.context === TransferContext.Gaming && 'gamingData' in transfer}
		<EntitySection title="Gaming Transfer Data" entityType="transfer-gaming">
			<dl>
				<dt>Game Title</dt>
				<dd>{transfer.gamingData.gameTitle}</dd>

				<dt>Game Contract</dt>
				<dd><a href="/address/{transfer.gamingData.gameContract}">{transfer.gamingData.gameContract}</a></dd>

				<dt>Action Type</dt>
				<dd>{transfer.gamingData.actionType}</dd>

				{#if transfer.gamingData.quest}
					<dt>Quest</dt>
					<dd>{transfer.gamingData.quest}</dd>
				{/if}

				{#if transfer.gamingData.reward}
					<dt>Reward Type</dt>
					<dd>{transfer.gamingData.reward}</dd>
				{/if}

				{#if transfer.gamingData.playerLevel}
					<dt>Player Level</dt>
					<dd>{transfer.gamingData.playerLevel}</dd>
				{/if}

				{#if transfer.gamingData.experience}
					<dt>Experience Gained</dt>
					<dd>{transfer.gamingData.experience}</dd>
				{/if}

				{#if transfer.gamingData.guild}
					<dt>Guild</dt>
					<dd>{transfer.gamingData.guild}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Batch transfer data -->
	{#if transfer.batchData && transfer.batchData.transfers.length > 0}
		<EntitySection title="Batch Transfer Data" entityType="transfer-batch">
			<dl>
				<dt>Batch Size</dt>
				<dd>{transfer.batchData.batchSize}</dd>

				<dt>Total Value</dt>
				<dd>{transfer.batchData.totalValue}</dd>

				{#if transfer.batchData.totalValueUsd}
					<dt>Total Value (USD)</dt>
					<dd>${transfer.batchData.totalValueUsd?.toLocaleString()}</dd>
				{/if}

				<dt>Unique Recipients</dt>
				<dd>{transfer.batchData.uniqueRecipients}</dd>

				<dt>Gas Saved</dt>
				<dd>{transfer.batchData.gasSaved}%</dd>
			</dl>

			<details>
				<summary><h3>Individual Transfers ({transfer.batchData.transfers.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>To</th>
							<th>Token ID</th>
							<th>Amount</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{#each transfer.batchData.transfers as batchTransfer}
							<tr>
								<td><a href="/address/{batchTransfer.to}">{batchTransfer.to}</a></td>
								<td>{batchTransfer.tokenId ?? 'N/A'}</td>
								<td>{batchTransfer.amount}</td>
								<td>{batchTransfer.value ?? 'N/A'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		</EntitySection>
	{/if}

	<!-- Aggregated data -->
	{#if transfer.aggregatedData}
		<EntitySection title="Aggregated Transfer Data" entityType="transfer-aggregated">
			<dl>
				<dt>Total Transfers in Transaction</dt>
				<dd>{transfer.aggregatedData.totalTransfers}</dd>

				<dt>Unique Tokens</dt>
				<dd>{transfer.aggregatedData.uniqueTokens}</dd>

				<dt>Unique Addresses</dt>
				<dd>{transfer.aggregatedData.uniqueAddresses}</dd>

				<dt>Total Value</dt>
				<dd>{transfer.aggregatedData.totalValue}</dd>

				{#if transfer.aggregatedData.totalValueUsd}
					<dt>Total Value (USD)</dt>
					<dd>${transfer.aggregatedData.totalValueUsd?.toLocaleString()}</dd>
				{/if}

				{#if transfer.aggregatedData.patterns && transfer.aggregatedData.patterns.length > 0}
					<dt>Detected Patterns</dt>
					<dd>
						<ul>
							{#each transfer.aggregatedData.patterns as pattern}
								<li>{pattern}</li>
							{/each}
						</ul>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- References section -->
	<EntitySection title="References" entityType="transfer-references">
		{#if transfer._fromActor}
			<details>
				<summary><h3>From Actor</h3></summary>
				<a href="/address/{transfer._fromActor.address}">{transfer._fromActor.address}</a>
			</details>
		{/if}

		{#if transfer._toActor}
			<details>
				<summary><h3>To Actor</h3></summary>
				<a href="/address/{transfer._toActor.address}">{transfer._toActor.address}</a>
			</details>
		{/if}

		{#if transfer._operatorActor}
			<details>
				<summary><h3>Operator Actor</h3></summary>
				<a href="/address/{transfer._operatorActor.address}">{transfer._operatorActor.address}</a>
			</details>
		{/if}

		{#if transfer._token}
			<details>
				<summary><h3>Token</h3></summary>
				<a href="/token/{transfer._token.address}">{transfer._token.address}</a>
			</details>
		{/if}

		{#if transfer._transaction}
			<details>
				<summary><h3>Transaction</h3></summary>
				<a href="/transaction/{transfer._transaction.id}">{transfer._transaction.id}</a>
			</details>
		{/if}

		{#if transfer._block}
			<details>
				<summary><h3>Block</h3></summary>
				<a href="/block/{transfer._block.blockNumber ?? transfer._block.blockHash}">
					{#if transfer._block.blockNumber}
						Block #{transfer._block.blockNumber?.toLocaleString()}
					{:else}
						{transfer._block.blockHash}
					{/if}
				</a>
			</details>
		{/if}

		{#if transfer._event}
			<details>
				<summary><h3>Related Event</h3></summary>
				<a href="/event/{transfer._event.id}">{transfer._event.id}</a>
			</details>
		{/if}

		{#if transfer._relatedTransfers && transfer._relatedTransfers.length > 0}
			<details>
				<summary><h3>Related Transfers ({transfer._relatedTransfers.length})</h3></summary>
				<ul>
					{#each transfer._relatedTransfers.slice(0, 10) as relatedTransfer}
						<li><a href="/transfer/{relatedTransfer.id}">{relatedTransfer.id}</a></li>
					{/each}
					{#if transfer._relatedTransfers.length > 10}
						<li>... and {transfer._relatedTransfers.length - 10} more</li>
					{/if}
				</ul>
			</details>
		{/if}
	</EntitySection>
</Entity>

<style>
	.category {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.category.send { background-color: red; }
	.category.receive { background-color: green; }
	.category.mint { background-color: blue; }
	.category.burn { background-color: orange; }
	.category.swap { background-color: purple; }

	.classification {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.classification.internal { background-color: gray; }
	.classification.external { background-color: darkblue; }
	.classification.contract { background-color: darkgreen; }

	.status {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.status.success { background-color: green; }
	.status.failed { background-color: red; }

	.health-factor {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
	}

	.health-factor.danger { background-color: red; }
	.health-factor.warning { background-color: orange; }
	.health-factor.safe { background-color: green; }

	details {
		margin: 8px 0;
	}

	summary {
		cursor: pointer;
		font-weight: bold;
		margin: 4px 0;
	}

	ul {
		margin: 8px 0;
		padding-left: 20px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 8px 0;
	}

	th, td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: #f5f5f5;
		font-weight: bold;
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
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	}
</style>
