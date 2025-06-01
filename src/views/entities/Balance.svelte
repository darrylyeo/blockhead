<script lang="ts">
	// Types/constants
	import type { Balance } from '$/entities/balance'
	import { BalanceType, BalanceCategory, TokenStandard } from '$/entities/balance'
	import { EntityType } from '$/entities'

	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'

	// Props
	let { balance }: { balance: Balance } = $props()
</script>

<Entity
	type={EntityType.Balance}
	id={balance.id}
	title={`Balance: ${balance.id}`}
	annotation={`${balance.standard} Balance`}
>
	<EntitySection title="Balance Information" entityType="balance-basic">
		<dl>
			<dt>Balance ID</dt>
			<dd>{balance.id}</dd>

			<dt>Chain ID</dt>
			<dd>{balance.chainId}</dd>

			<dt>Standard</dt>
			<dd>{balance.standard}</dd>

			<dt>Types</dt>
			<dd>
				<ul>
					{#each balance.types as type}
						<li>{type}</li>
					{/each}
				</ul>
			</dd>

			<dt>Category</dt>
			<dd>{balance.category}</dd>

			<dt>Balance</dt>
			<dd>{balance.balance}</dd>

			{#if balance.balanceUsd}
				<dt>Balance USD</dt>
				<dd>${balance.balanceUsd.toLocaleString()}</dd>
			{/if}

			<dt>Block Number</dt>
			<dd><a href="/block/{balance.blockNumber}">{balance.blockNumber.toLocaleString()}</a></dd>

			<dt>Timestamp</dt>
			<dd><time datetime={new Date(balance.timestamp * 1000).toISOString()}>{new Date(balance.timestamp * 1000).toLocaleString()}</time></dd>

			<dt>Active</dt>
			<dd>{balance.isActive ? 'Yes' : 'No'}</dd>

			{#if balance.lastActivity}
				<dt>Last Activity</dt>
				<dd><time datetime={new Date(balance.lastActivity * 1000).toISOString()}>{new Date(balance.lastActivity * 1000).toLocaleString()}</time></dd>
			{/if}

			{#if balance.transactionCount}
				<dt>Transaction Count</dt>
				<dd>{balance.transactionCount.toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if balance.changeAmount || balance.changePercentage}
		<EntitySection title="Balance Changes" entityType="balance-changes">
			<dl>
				{#if balance.changeAmount}
					<dt>Change Amount</dt>
					<dd>{balance.changeAmount}</dd>
				{/if}

				{#if balance.changePercentage}
					<dt>Change Percentage</dt>
					<dd>{balance.changePercentage}%</dd>
				{/if}

				{#if balance.changePeriod}
					<dt>Change Period</dt>
					<dd>{balance.changePeriod}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if balance.historicalData && balance.historicalData.length > 0}
		<EntitySection title="Historical Data" entityType="balance-historical">
			<ul>
				{#each balance.historicalData as data}
					<li>
						<dl>
							<dt>Timestamp</dt>
							<dd><time datetime={new Date(data.timestamp * 1000).toISOString()}>{new Date(data.timestamp * 1000).toLocaleString()}</time></dd>

							<dt>Block Number</dt>
							<dd><a href="/block/{data.blockNumber}">{data.blockNumber.toLocaleString()}</a></dd>

							<dt>Balance</dt>
							<dd>{data.balance}</dd>

							{#if data.balanceUsd}
								<dt>Balance USD</dt>
								<dd>${data.balanceUsd.toLocaleString()}</dd>
							{/if}
						</dl>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if balance.riskLevel || balance.securityFlags || balance.isVerified !== undefined}
		<EntitySection title="Security & Risk" entityType="balance-security">
			<dl>
				{#if balance.riskLevel}
					<dt>Risk Level</dt>
					<dd class="risk-level {balance.riskLevel}">{balance.riskLevel}</dd>
				{/if}

				{#if balance.securityFlags && balance.securityFlags.length > 0}
					<dt>Security Flags</dt>
					<dd>
						<ul>
							{#each balance.securityFlags as flag}
								<li>{flag}</li>
							{/each}
						</ul>
					</dd>
				{/if}

				{#if balance.isVerified !== undefined}
					<dt>Verified</dt>
					<dd>{balance.isVerified ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Type-specific sections based on Balance types -->
	{#if balance.types.includes(BalanceType.Locked) && 'lockedData' in balance}
		<EntitySection title="Locked Balance Details" entityType="balance-locked">
			<dl>
				{#if balance.lockedData.unlockTime}
					<dt>Unlock Time</dt>
					<dd><time datetime={new Date(balance.lockedData.unlockTime * 1000).toISOString()}>{new Date(balance.lockedData.unlockTime * 1000).toLocaleString()}</time></dd>
				{/if}

				{#if balance.lockedData.lockDuration}
					<dt>Lock Duration</dt>
					<dd>{Math.round(balance.lockedData.lockDuration / 86400)} days</dd>
				{/if}

				{#if balance.lockedData.lockContract}
					<dt>Lock Contract</dt>
					<dd><a href="/contract/{balance.lockedData.lockContract}">{balance.lockedData.lockContract}</a></dd>
				{/if}

				{#if balance.lockedData.lockReason}
					<dt>Lock Reason</dt>
					<dd>{balance.lockedData.lockReason}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if balance.types.includes(BalanceType.Staked) && 'stakedData' in balance}
		<EntitySection title="Staked Balance Details" entityType="balance-staked">
			<dl>
				<dt>Staking Contract</dt>
				<dd><a href="/contract/{balance.stakedData.stakingContract}">{balance.stakedData.stakingContract}</a></dd>

				<dt>Staking Protocol</dt>
				<dd>{balance.stakedData.stakingProtocol}</dd>

				{#if balance.stakedData.stakingApr}
					<dt>Staking APR</dt>
					<dd>{balance.stakedData.stakingApr}%</dd>
				{/if}

				{#if balance.stakedData.stakingRewards}
					<dt>Staking Rewards</dt>
					<dd>{balance.stakedData.stakingRewards}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if balance.types.includes(BalanceType.Vesting) && 'vestingData' in balance}
		<EntitySection title="Vesting Balance Details" entityType="balance-vesting">
			<dl>
				{#if balance.vestingData.cliffPeriod}
					<dt>Cliff Period</dt>
					<dd>{Math.round(balance.vestingData.cliffPeriod / 86400)} days</dd>
				{/if}

				<dt>Vesting Duration</dt>
				<dd>{Math.round(balance.vestingData.vestingDuration / 86400)} days</dd>
			</dl>

			{#if balance.vestingData.vestingSchedule && balance.vestingData.vestingSchedule.length > 0}
				<details>
					<summary><h3>Vesting Schedule ({balance.vestingData.vestingSchedule.length} entries)</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Amount</th>
								<th>Claimable</th>
							</tr>
						</thead>
						<tbody>
							{#each balance.vestingData.vestingSchedule as entry}
								<tr>
									<td>
										<time datetime={new Date(entry.timestamp * 1000).toISOString()}>
											{new Date(entry.timestamp * 1000).toLocaleDateString()}
										</time>
									</td>
									<td>{entry.amount}</td>
									<td>{entry.isClaimable ? 'Yes' : 'No'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if balance.types.includes(BalanceType.Collateral) && 'collateralData' in balance}
		<EntitySection title="Collateral Balance Details" entityType="balance-collateral">
			<dl>
				<dt>Loan Protocol</dt>
				<dd>{balance.collateralData.loanProtocol}</dd>

				<dt>Collateralization Ratio</dt>
				<dd>{balance.collateralData.collateralizationRatio}%</dd>

				<dt>Liquidation Threshold</dt>
				<dd>{balance.collateralData.liquidationThreshold}%</dd>

				{#if balance.collateralData.borrowedAmount}
					<dt>Borrowed Amount</dt>
					<dd>{balance.collateralData.borrowedAmount}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Token standard specific sections -->
	{#if balance.standard === TokenStandard.Native && 'nativeData' in balance}
		<EntitySection title="Native Currency Details" entityType="balance-native">
			<dl>
				<dt>Symbol</dt>
				<dd>{balance.nativeData.symbol}</dd>

				<dt>Decimals</dt>
				<dd>{balance.nativeData.decimals}</dd>

				<dt>Network Name</dt>
				<dd>{balance.nativeData.networkName}</dd>

				<dt>Available for Gas</dt>
				<dd>{balance.nativeData.availableForGas}</dd>

				{#if balance.nativeData.reservedForGas}
					<dt>Reserved for Gas</dt>
					<dd>{balance.nativeData.reservedForGas}</dd>
				{/if}

				{#if balance.nativeData.totalStaked}
					<dt>Total Staked</dt>
					<dd>{balance.nativeData.totalStaked}</dd>
				{/if}

				{#if balance.nativeData.stakingRewards}
					<dt>Staking Rewards</dt>
					<dd>{balance.nativeData.stakingRewards}</dd>
				{/if}

				{#if balance.nativeData.validatorAddress}
					<dt>Validator Address</dt>
					<dd><a href="/address/{balance.nativeData.validatorAddress}">{balance.nativeData.validatorAddress}</a></dd>
				{/if}

				{#if balance.nativeData.delegationRewards}
					<dt>Delegation Rewards</dt>
					<dd>{balance.nativeData.delegationRewards}</dd>
				{/if}

				{#if balance.nativeData.commission}
					<dt>Commission</dt>
					<dd>{balance.nativeData.commission}%</dd>
				{/if}

				{#if balance.nativeData.governanceVotes}
					<dt>Governance Votes</dt>
					<dd>{balance.nativeData.governanceVotes}</dd>
				{/if}

				{#if balance.nativeData.proposalParticipation}
					<dt>Proposal Participation</dt>
					<dd>{balance.nativeData.proposalParticipation}%</dd>
				{/if}
			</dl>

			{#if balance.nativeData.unstakingQueue && balance.nativeData.unstakingQueue.length > 0}
				<details>
					<summary><h3>Unstaking Queue ({balance.nativeData.unstakingQueue.length} entries)</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Amount</th>
								<th>Available At</th>
							</tr>
						</thead>
						<tbody>
							{#each balance.nativeData.unstakingQueue as entry}
								<tr>
									<td>{entry.amount}</td>
									<td>
										<time datetime={new Date(entry.availableAt * 1000).toISOString()}>
											{new Date(entry.availableAt * 1000).toLocaleString()}
										</time>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if balance.standard === TokenStandard.Erc20 && 'erc20Data' in balance}
		<EntitySection title="ERC20 Token Details" entityType="balance-erc20">
			<dl>
				<dt>Name</dt>
				<dd>{balance.erc20Data.name}</dd>

				<dt>Symbol</dt>
				<dd>{balance.erc20Data.symbol}</dd>

				<dt>Decimals</dt>
				<dd>{balance.erc20Data.decimals}</dd>

				{#if balance.erc20Data.totalSupply}
					<dt>Total Supply</dt>
					<dd>{balance.erc20Data.totalSupply}</dd>
				{/if}

				{#if balance.erc20Data.holderRank}
					<dt>Holder Rank</dt>
					<dd>#{balance.erc20Data.holderRank}</dd>
				{/if}

				{#if balance.erc20Data.holderPercentage}
					<dt>Holder Percentage</dt>
					<dd>{balance.erc20Data.holderPercentage}%</dd>
				{/if}

				<dt>Liquidity Available</dt>
				<dd>{balance.erc20Data.liquidityAvailable ? 'Yes' : 'No'}</dd>
			</dl>

			{#if balance.erc20Data.liquidityPools && balance.erc20Data.liquidityPools.length > 0}
				<details>
					<summary><h3>Liquidity Pools ({balance.erc20Data.liquidityPools.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Pool</th>
								<th>Liquidity</th>
								<th>APR</th>
							</tr>
						</thead>
						<tbody>
							{#each balance.erc20Data.liquidityPools as pool}
								<tr>
									<td><a href="/address/{pool.pool}">{pool.pool}</a></td>
									<td>{pool.liquidity}</td>
									<td>{pool.apr ? `${pool.apr}%` : 'N/A'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if balance.erc20Data.defiPositions && balance.erc20Data.defiPositions.length > 0}
				<details>
					<summary><h3>DeFi Positions ({balance.erc20Data.defiPositions.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Protocol</th>
								<th>Type</th>
								<th>Amount</th>
								<th>APY</th>
								<th>Health Factor</th>
							</tr>
						</thead>
						<tbody>
							{#each balance.erc20Data.defiPositions as position}
								<tr>
									<td>{position.protocol}</td>
									<td>{position.type}</td>
									<td>{position.amount}</td>
									<td>{position.apy ? `${position.apy}%` : 'N/A'}</td>
									<td>{position.healthFactor ?? 'N/A'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if balance.erc20Data.allowances && balance.erc20Data.allowances.length > 0}
				<details>
					<summary><h3>Token Allowances ({balance.erc20Data.allowances.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Spender</th>
								<th>Amount</th>
								<th>Unlimited</th>
								<th>Last Used</th>
							</tr>
						</thead>
						<tbody>
							{#each balance.erc20Data.allowances as allowance}
								<tr>
									<td><a href="/address/{allowance.spender}">{allowance.spender}</a></td>
									<td>{allowance.amount}</td>
									<td>{allowance.isUnlimited ? 'Yes' : 'No'}</td>
									<td>
										{#if allowance.lastUsed}
											<time datetime={new Date(allowance.lastUsed * 1000).toISOString()}>
												{new Date(allowance.lastUsed * 1000).toLocaleDateString()}
											</time>
										{:else}
											Never
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if balance.standard === TokenStandard.Erc721 && 'nftData' in balance}
		<EntitySection title="NFT Collection Details" entityType="balance-nft">
			<dl>
				<dt>Collection Name</dt>
				<dd>{balance.nftData.collectionName}</dd>

				<dt>Collection Symbol</dt>
				<dd>{balance.nftData.collectionSymbol}</dd>

				<dt>Token IDs</dt>
				<dd>
					<ul>
						{#each balance.nftData.tokenIds as tokenId}
							<li>{tokenId}</li>
						{/each}
					</ul>
				</dd>

				{#if balance.nftData.totalSupply}
					<dt>Total Supply</dt>
					<dd>{balance.nftData.totalSupply.toLocaleString()}</dd>
				{/if}

				{#if balance.nftData.ownershipPercentage}
					<dt>Ownership Percentage</dt>
					<dd>{balance.nftData.ownershipPercentage}%</dd>
				{/if}

				{#if balance.nftData.floorPrice}
					<dt>Floor Price</dt>
					<dd>${balance.nftData.floorPrice.toLocaleString()}</dd>
				{/if}

				<dt>Total Value</dt>
				<dd>${balance.nftData.totalValue.toLocaleString()}</dd>

				<dt>Average Holding Time</dt>
				<dd>{Math.round(balance.nftData.averageHoldingTime / 86400)} days</dd>

				{#if balance.nftData.realizationRate}
					<dt>Realization Rate</dt>
					<dd>{balance.nftData.realizationRate}%</dd>
				{/if}
			</dl>

			{#if balance.nftData.nfts && balance.nftData.nfts.length > 0}
				<details>
					<summary><h3>Individual NFTs ({balance.nftData.nfts.length})</h3></summary>
					{#each balance.nftData.nfts as nft}
						<div style="border: 1px solid #ddd; margin: 8px 0; padding: 12px; border-radius: 6px;">
							<dl>
								<dt>Token ID</dt>
								<dd>{nft.tokenId}</dd>

								{#if nft.name}
									<dt>Name</dt>
									<dd>{nft.name}</dd>
								{/if}

								{#if nft.description}
									<dt>Description</dt>
									<dd>{nft.description}</dd>
								{/if}

								{#if nft.image}
									<dt>Image</dt>
									<dd>
										<img src={nft.image} alt={nft.name ?? `Token ${nft.tokenId}`} style="max-width: 150px; max-height: 150px; border-radius: 4px;" />
									</dd>
								{/if}

								{#if nft.lastSalePrice}
									<dt>Last Sale Price</dt>
									<dd>${nft.lastSalePrice.toLocaleString()}</dd>
								{/if}

								{#if nft.estimatedValue}
									<dt>Estimated Value</dt>
									<dd>${nft.estimatedValue.toLocaleString()}</dd>
								{/if}

								{#if nft.isListed}
									<dt>Listed</dt>
									<dd>Yes {#if nft.listingPrice}at ${nft.listingPrice.toLocaleString()}{/if}</dd>
								{/if}

								{#if nft.isStaked}
									<dt>Staked</dt>
									<dd>Yes {#if nft.stakingRewards}(Rewards: {nft.stakingRewards}){/if}</dd>
								{/if}

								{#if nft.gameUtility}
									<dt>Game Utility</dt>
									<dd>Yes</dd>
								{/if}
							</dl>

							{#if nft.attributes && nft.attributes.length > 0}
								<details>
									<summary>Attributes ({nft.attributes.length})</summary>
									<table>
										<thead>
											<tr>
												<th>Trait</th>
												<th>Value</th>
												<th>Rarity</th>
											</tr>
										</thead>
										<tbody>
											{#each nft.attributes as attr}
												<tr>
													<td>{attr.trait_type}</td>
													<td>{attr.value}</td>
													<td>{attr.rarity ? `${(attr.rarity * 100).toFixed(2)}%` : 'N/A'}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</details>
							{/if}
						</div>
					{/each}
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if balance.standard === TokenStandard.Erc1155 && 'multiTokenData' in balance}
		<EntitySection title="Multi-Token Details" entityType="balance-multi-token">
			<dl>
				<dt>Unique Tokens</dt>
				<dd>{balance.multiTokenData.uniqueTokens}</dd>

				<dt>Total Tokens</dt>
				<dd>{balance.multiTokenData.totalTokens}</dd>

				<dt>Fungible Value</dt>
				<dd>${balance.multiTokenData.fungibleValue.toLocaleString()}</dd>

				<dt>NFT Value</dt>
				<dd>${balance.multiTokenData.nftValue.toLocaleString()}</dd>

				<dt>Total Value</dt>
				<dd>${balance.multiTokenData.totalValue.toLocaleString()}</dd>
			</dl>

			{#if balance.multiTokenData.tokenBalances && balance.multiTokenData.tokenBalances.length > 0}
				<details>
					<summary><h3>Token Balances ({balance.multiTokenData.tokenBalances.length})</h3></summary>
					{#each balance.multiTokenData.tokenBalances as token}
						<div style="border: 1px solid #ddd; margin: 8px 0; padding: 12px; border-radius: 6px;">
							<dl>
								<dt>Token ID</dt>
								<dd>{token.tokenId}</dd>

								<dt>Balance</dt>
								<dd>{token.balance}</dd>

								{#if token.name}
									<dt>Name</dt>
									<dd>{token.name}</dd>
								{/if}

								{#if token.description}
									<dt>Description</dt>
									<dd>{token.description}</dd>
								{/if}

								{#if token.image}
									<dt>Image</dt>
									<dd>
										<img src={token.image} alt={token.name ?? `Token ${token.tokenId}`} style="max-width: 100px; max-height: 100px; border-radius: 4px;" />
									</dd>
								{/if}

								<dt>Fungible</dt>
								<dd>{token.isFungible ? 'Yes' : 'No'}</dd>

								{#if token.unitPrice}
									<dt>Unit Price</dt>
									<dd>${token.unitPrice.toLocaleString()}</dd>
								{/if}

								{#if token.totalValue}
									<dt>Total Value</dt>
									<dd>${token.totalValue.toLocaleString()}</dd>
								{/if}
							</dl>

							{#if token.gameAsset}
								<details>
									<summary>Game Asset Details</summary>
									<dl>
										<dt>Asset Type</dt>
										<dd>{token.gameAsset.assetType}</dd>

										<dt>Rarity</dt>
										<dd>{token.gameAsset.rarity}</dd>

										{#if token.gameAsset.level}
											<dt>Level</dt>
											<dd>{token.gameAsset.level}</dd>
										{/if}

										{#if token.gameAsset.stats}
											<dt>Stats</dt>
											<dd>
												<dl style="margin-left: 16px;">
													{#each Object.entries(token.gameAsset.stats) as [stat, value]}
														<dt>{stat}</dt>
														<dd>{value}</dd>
													{/each}
												</dl>
											</dd>
										{/if}
									</dl>
								</details>
							{/if}
						</div>
					{/each}
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- References section -->
	<EntitySection title="References" entityType="balance-references">
		{#if balance._owner}
			<details>
				<summary><h3>Owner</h3></summary>
				<a href="/address/{balance._owner.address}">{balance._owner.address}</a>
			</details>
		{/if}

		{#if balance._asset}
			<details>
				<summary><h3>Asset</h3></summary>
				<a href="/token/{balance._asset.address}">{balance._asset.address}</a>
			</details>
		{/if}

		{#if balance._protocol}
			<details>
				<summary><h3>Protocol</h3></summary>
				<a href="/app/{balance._protocol.name}">{balance._protocol.name}</a>
			</details>
		{/if}

		{#if balance._liquidityPool}
			<details>
				<summary><h3>Liquidity Pool</h3></summary>
				<a href="/address/{balance._liquidityPool.address}">{balance._liquidityPool.address}</a>
			</details>
		{/if}

		{#if balance._stakingContract}
			<details>
				<summary><h3>Staking Contract</h3></summary>
				<a href="/address/{balance._stakingContract.address}">{balance._stakingContract.address}</a>
			</details>
		{/if}

		{#if balance._validator}
			<details>
				<summary><h3>Validator</h3></summary>
				<a href="/address/{balance._validator.address}">{balance._validator.address}</a>
			</details>
		{/if}

		{#if balance._vestingContract}
			<details>
				<summary><h3>Vesting Contract</h3></summary>
				<a href="/address/{balance._vestingContract.address}">{balance._vestingContract.address}</a>
			</details>
		{/if}

		{#if balance._relatedBalances && balance._relatedBalances.length > 0}
			<details>
				<summary><h3>Related Balances ({balance._relatedBalances.length})</h3></summary>
				<ul>
					{#each balance._relatedBalances as relatedBalance}
						<li><a href="/balance/{relatedBalance.id}">{relatedBalance.id}</a></li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if balance._recentTransactions && balance._recentTransactions.length > 0}
			<details>
				<summary><h3>Recent Transactions ({balance._recentTransactions.length})</h3></summary>
				<ul>
					{#each balance._recentTransactions.slice(0, 10) as transaction}
						<li><a href="/transaction/{transaction.transactionId}">{transaction.transactionId}</a></li>
					{/each}
					{#if balance._recentTransactions.length > 10}
						<li>... and {balance._recentTransactions.length - 10} more</li>
					{/if}
				</ul>
			</details>
		{/if}

		{#if balance._recentTransfers && balance._recentTransfers.length > 0}
			<details>
				<summary><h3>Recent Transfers ({balance._recentTransfers.length})</h3></summary>
				<ul>
					{#each balance._recentTransfers.slice(0, 10) as transfer}
						<li><a href="/transfer/{transfer.id}">{transfer.id}</a></li>
					{/each}
					{#if balance._recentTransfers.length > 10}
						<li>... and {balance._recentTransfers.length - 10} more</li>
					{/if}
				</ul>
			</details>
		{/if}
	</EntitySection>
</Entity>

<style>
	.risk-level {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.risk-level.low {
		background-color: green;
	}

	.risk-level.medium {
		background-color: orange;
	}

	.risk-level.high {
		background-color: red;
	}

	.risk-level.critical {
		background-color: darkred;
	}

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
</style> 