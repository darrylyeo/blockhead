<script lang="ts">
	// Types/constants
	import type { Token } from '$/entities/token'
	import { TokenStandard, TokenType } from '$/entities/token'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { token }: { token: Token } = $props()
</script>


<Entity
	type={EntityType.Token}
	id={token.address}
	title={token.metadata.name ?? token.metadata.symbol ?? token.address}
	annotation={`${token.standard} Token`}
>
	<EntitySection
		title="Basic Information"
		entityType="token-basic"
	>
		<dl>
			<dt>Address</dt>
			<dd>
				<a href="/address/{token.address}"
					><code>{token.address}</code></a
				>
			</dd>

			<dt>Chain ID</dt>
			<dd>{token.chainId}</dd>

			<dt>Standard</dt>
			<dd>{token.standard}</dd>

			<dt>Types</dt>
			<dd>
				<ul>
					{#each token.types as type}
						<li>{type}</li>
					{/each}
				</ul>
			</dd>

			{#if token.deployedAt !== null}
				<dt>Deployed At</dt>
				<dd>
					<time datetime={new Date(token.deployedAt * 1000).toISOString()}>
						{new Date(token.deployedAt * 1000).toLocaleString()}
					</time>
				</dd>
			{/if}

			{#if token.category}
				<dt>Category</dt>
				<dd>{token.category}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Token Metadata"
		entityType="token-metadata"
	>
		<dl>
			{#if token.metadata.name}
				<dt>Name</dt>
				<dd>{token.metadata.name}</dd>
			{/if}

			{#if token.metadata.symbol}
				<dt>Symbol</dt>
				<dd>{token.metadata.symbol}</dd>
			{/if}

			{#if token.decimals !== null}
				<dt>Decimals</dt>
				<dd>{token.decimals}</dd>
			{/if}

			{#if token.metadata.logoUri}
				<dt>Logo</dt>
				<dd>
					<img
						src={token.metadata.logoUri}
						alt="{token.metadata.name} logo"
						width="32"
						height="32"
					/>
				</dd>
			{/if}

			{#if token.metadata.description}
				<dt>Description</dt>
				<dd>{token.metadata.description}</dd>
			{/if}

			{#if token.metadata.website}
				<dt>Website</dt>
				<dd>
					<a href={token.metadata.website} target="_blank" rel="noopener noreferrer">
						{token.metadata.website}
					</a>
				</dd>
			{/if}

			{#if token.metadata.twitter}
				<dt>Twitter</dt>
				<dd>
					<a href={token.metadata.twitter} target="_blank" rel="noopener noreferrer">
						{token.metadata.twitter}
					</a>
				</dd>
			{/if}

			{#if token.metadata.github}
				<dt>GitHub</dt>
				<dd>
					<a href={token.metadata.github} target="_blank" rel="noopener noreferrer">
						{token.metadata.github}
					</a>
				</dd>
			{/if}
		</dl>

		{#if token.metadata.tags && token.metadata.tags.length > 0}
			<details>
				<summary><h3>Tags ({token.metadata.tags.length})</h3></summary>
				<ul>
					{#each token.metadata.tags as tag}
						<li>{tag}</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if token.metadata.extensions}
			<details>
				<summary><h3>Extensions</h3></summary>
				<pre>{JSON.stringify(token.metadata.extensions, null, 2)}</pre>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Supply & Economics"
		entityType="token-supply"
	>
		<dl>
			{#if token.totalSupply}
				<dt>Total Supply</dt>
				<dd>{token.totalSupply}</dd>
			{/if}

			{#if token.maxSupply}
				<dt>Max Supply</dt>
				<dd>{token.maxSupply}</dd>
			{/if}

			{#if token.circulatingSupply}
				<dt>Circulating Supply</dt>
				<dd>{token.circulatingSupply}</dd>
			{/if}

			{#if token.holderCount !== null}
				<dt>Holder Count</dt>
				<dd>{token.holderCount.toLocaleString()}</dd>
			{/if}

			{#if token.transferCount !== null}
				<dt>Transfer Count</dt>
				<dd>{token.transferCount.toLocaleString()}</dd>
			{/if}

			{#if token.marketCap !== null}
				<dt>Market Cap</dt>
				<dd>${token.marketCap.toLocaleString()}</dd>
			{/if}

			{#if token.price !== null}
				<dt>Price</dt>
				<dd>${token.price}</dd>
			{/if}

			{#if token.volume24h !== null}
				<dt>24h Volume</dt>
				<dd>${token.volume24h.toLocaleString()}</dd>
			{/if}

			{#if token.priceChange24h !== null}
				<dt>24h Price Change</dt>
				<dd class={token.priceChange24h >= 0 ? 'positive' : 'negative'}>
					{token.priceChange24h > 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
				</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if token.mechanics}
		<EntitySection
			title="Token Mechanics"
			entityType="token-mechanics"
		>
			<dl>
				<dt>Mintable</dt>
				<dd>{token.mechanics.isMintable ? 'Yes' : 'No'}</dd>

				<dt>Burnable</dt>
				<dd>{token.mechanics.isBurnable ? 'Yes' : 'No'}</dd>

				<dt>Pausable</dt>
				<dd>{token.mechanics.isPausable ? 'Yes' : 'No'}</dd>

				<dt>Has Permissions</dt>
				<dd>{token.mechanics.hasPermissions ? 'Yes' : 'No'}</dd>

				<dt>Upgradable</dt>
				<dd>{token.mechanics.isUpgradable ? 'Yes' : 'No'}</dd>

				{#if token.mechanics.transferTax !== null}
					<dt>Transfer Tax</dt>
					<dd>{token.mechanics.transferTax}%</dd>
				{/if}

				{#if token.mechanics.burnRate !== null}
					<dt>Burn Rate</dt>
					<dd>{token.mechanics.burnRate}%</dd>
				{/if}

				{#if token.mechanics.reflectionRate !== null}
					<dt>Reflection Rate</dt>
					<dd>{token.mechanics.reflectionRate}%</dd>
				{/if}

				{#if token.mechanics.inflationRate !== null}
					<dt>Inflation Rate</dt>
					<dd>{token.mechanics.inflationRate}%</dd>
				{/if}

				{#if token.mechanics.maxTransactionAmount}
					<dt>Max Transaction Amount</dt>
					<dd>{token.mechanics.maxTransactionAmount}</dd>
				{/if}

				{#if token.mechanics.maxWalletAmount}
					<dt>Max Wallet Amount</dt>
					<dd>{token.mechanics.maxWalletAmount}</dd>
				{/if}

				{#if token.mechanics.cooldownPeriod !== null}
					<dt>Cooldown Period</dt>
					<dd>{token.mechanics.cooldownPeriod} seconds</dd>
				{/if}

				{#if token.mechanics.antiWhaleEnabled !== null}
					<dt>Anti-Whale</dt>
					<dd>{token.mechanics.antiWhaleEnabled ? 'Yes' : 'No'}</dd>
				{/if}

				{#if token.mechanics.antiMevEnabled !== null}
					<dt>Anti-MEV</dt>
					<dd>{token.mechanics.antiMevEnabled ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>

			{#if token.mechanics.emissionSchedule && token.mechanics.emissionSchedule.length > 0}
				<details>
					<summary><h3>Emission Schedule ({token.mechanics.emissionSchedule.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Rate</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{#each token.mechanics.emissionSchedule as emission}
								<tr>
									<td><time datetime={new Date(emission.timestamp * 1000).toISOString()}>{new Date(emission.timestamp * 1000).toLocaleDateString()}</time></td>
									<td>{emission.rate}%</td>
									<td>{emission.amount}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<EntitySection
		title="Verification & Security"
		entityType="token-verification"
	>
		<dl>
			<dt>Verified</dt>
			<dd>{token.verification.isVerified ? 'Yes' : 'No'}</dd>

			{#if token.verification.verificationSource}
				<dt>Verification Source</dt>
				<dd>{token.verification.verificationSource}</dd>
			{/if}

			{#if token.verification.securityScore !== null}
				<dt>Security Score</dt>
				<dd>{token.verification.securityScore}/100</dd>
			{/if}

			<dt>Risk Level</dt>
			<dd class="risk-level {token.verification.riskLevel}">{token.verification.riskLevel}</dd>

			{#if token.verification.isHoneypot !== null}
				<dt>Honeypot</dt>
				<dd class={token.verification.isHoneypot ? 'risk' : 'safe'}>
					{token.verification.isHoneypot ? 'Yes' : 'No'}
				</dd>
			{/if}

			{#if token.verification.hasProxyContract !== null}
				<dt>Has Proxy Contract</dt>
				<dd>{token.verification.hasProxyContract ? 'Yes' : 'No'}</dd>
			{/if}

			{#if token.verification.hasOwner !== null}
				<dt>Has Owner</dt>
				<dd>{token.verification.hasOwner ? 'Yes' : 'No'}</dd>
			{/if}

			{#if token.verification.canMint !== null}
				<dt>Can Mint</dt>
				<dd>{token.verification.canMint ? 'Yes' : 'No'}</dd>
			{/if}

			{#if token.verification.canBurn !== null}
				<dt>Can Burn</dt>
				<dd>{token.verification.canBurn ? 'Yes' : 'No'}</dd>
			{/if}

			{#if token.verification.canPause !== null}
				<dt>Can Pause</dt>
				<dd>{token.verification.canPause ? 'Yes' : 'No'}</dd>
			{/if}

			{#if token.verification.canBlacklist !== null}
				<dt>Can Blacklist</dt>
				<dd>{token.verification.canBlacklist ? 'Yes' : 'No'}</dd>
			{/if}
		</dl>

		{#if token.verification.riskFactors && token.verification.riskFactors.length > 0}
			<details>
				<summary><h3>Risk Factors ({token.verification.riskFactors.length})</h3></summary>
				<ul>
					{#each token.verification.riskFactors as factor}
						<li>{factor}</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if token.verification.auditReports && token.verification.auditReports.length > 0}
			<details>
				<summary><h3>Audit Reports ({token.verification.auditReports.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Auditor</th>
							<th>Date</th>
							<th>Score</th>
							<th>Report</th>
						</tr>
					</thead>
					<tbody>
						{#each token.verification.auditReports as audit}
							<tr>
								<td>{audit.auditor}</td>
								<td><time datetime={new Date(audit.date * 1000).toISOString()}>{new Date(audit.date * 1000).toLocaleDateString()}</time></td>
								<td>{audit.score ?? '-'}</td>
								<td>
									<a
										href={audit.reportUrl}
										target="_blank"
										rel="noopener noreferrer">View Report</a
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	<!-- Type-specific sections -->
	{#if token.types.includes(TokenType.Stablecoin) && 'stablecoinData' in token}
		<EntitySection
			title="Stablecoin Details"
			entityType="token-stablecoin"
		>
			<dl>
				<dt>Pegging Mechanism</dt>
				<dd>{token.stablecoinData.peggingMechanism}</dd>

				<dt>Target Peg</dt>
				<dd>${token.stablecoinData.targetPeg}</dd>

				{#if token.stablecoinData.currentPeg !== null}
					<dt>Current Peg</dt>
					<dd>${token.stablecoinData.currentPeg}</dd>
				{/if}

				{#if token.stablecoinData.collateralRatio !== null}
					<dt>Collateral Ratio</dt>
					<dd>{token.stablecoinData.collateralRatio}%</dd>
				{/if}

				<dt>Depeg Events</dt>
				<dd>{token.stablecoinData.depegEvents}</dd>

				<dt>Max Depeg Percentage</dt>
				<dd>{token.stablecoinData.maxDepegPercentage}%</dd>

				{#if token.stablecoinData.stabilityFee !== null}
					<dt>Stability Fee</dt>
					<dd>{token.stablecoinData.stabilityFee}%</dd>
				{/if}

				{#if token.stablecoinData.redemptionFee !== null}
					<dt>Redemption Fee</dt>
					<dd>{token.stablecoinData.redemptionFee}%</dd>
				{/if}
			</dl>

			{#if token.stablecoinData.reserveAssets && token.stablecoinData.reserveAssets.length > 0}
				<details>
					<summary><h3>Reserve Assets ({token.stablecoinData.reserveAssets.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Asset</th>
								<th>Amount</th>
								<th>Percentage</th>
							</tr>
						</thead>
						<tbody>
							{#each token.stablecoinData.reserveAssets as reserve}
								<tr>
									<td><a href="/token/{reserve.asset}">{reserve.asset}</a></td>
									<td>{reserve.amount}</td>
									<td>{reserve.percentage}%</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if token.stablecoinData.pegHistory && token.stablecoinData.pegHistory.length > 0}
				<details>
					<summary><h3>Peg History ({token.stablecoinData.pegHistory.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Price</th>
								<th>Deviation</th>
							</tr>
						</thead>
						<tbody>
							{#each token.stablecoinData.pegHistory as history}
								<tr>
									<td><time datetime={new Date(history.timestamp * 1000).toISOString()}>{new Date(history.timestamp * 1000).toLocaleDateString()}</time></td>
									<td>${history.price}</td>
									<td class={Math.abs(history.deviation) > 1 ? 'warning' : ''}>{history.deviation.toFixed(2)}%</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if token.types.includes(TokenType.Governance) && 'governanceData' in token}
		<EntitySection
			title="Governance Details"
			entityType="token-governance"
		>
			<dl>
				<dt>Voting Weight</dt>
				<dd>{token.governanceData.votingWeight}%</dd>

				<dt>Proposal Threshold</dt>
				<dd>{token.governanceData.proposalThreshold}</dd>

				<dt>Quorum Threshold</dt>
				<dd>{token.governanceData.quorumThreshold}%</dd>

				<dt>Voting Period</dt>
				<dd>{token.governanceData.votingPeriod} blocks</dd>

				<dt>Timelock Delay</dt>
				<dd>{token.governanceData.timelockDelay} seconds</dd>

				<dt>Active Proposals</dt>
				<dd>{token.governanceData.activeProposals}</dd>

				<dt>Total Proposals</dt>
				<dd>{token.governanceData.totalProposals}</dd>

				<dt>Voter Participation</dt>
				<dd>{token.governanceData.voterParticipation}%</dd>

				{#if token.governanceData.delegatedVotingPower !== null}
					<dt>Delegated Voting Power</dt>
					<dd>{token.governanceData.delegatedVotingPower}%</dd>
				{/if}

				{#if token.governanceData.executionDelay !== null}
					<dt>Execution Delay</dt>
					<dd>{token.governanceData.executionDelay} seconds</dd>
				{/if}
			</dl>

			{#if token.governanceData.recentProposals && token.governanceData.recentProposals.length > 0}
				<details>
					<summary><h3>Recent Proposals ({token.governanceData.recentProposals.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Status</th>
								<th>Votes For</th>
								<th>Votes Against</th>
							</tr>
						</thead>
						<tbody>
							{#each token.governanceData.recentProposals as proposal}
								<tr>
									<td>{proposal.id}</td>
									<td>{proposal.title}</td>
									<td>{proposal.status}</td>
									<td>{proposal.votesFor}%</td>
									<td>{proposal.votesAgainst}%</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if token.types.includes(TokenType.Yield) && 'yieldData' in token}
		<EntitySection
			title="Yield Details"
			entityType="token-yield"
		>
			<dl>
				<dt>Underlying Asset</dt>
				<dd><a href="/token/{token.yieldData.underlyingAsset}">{token.yieldData.underlyingAsset}</a></dd>

				<dt>Current APY</dt>
				<dd>{token.yieldData.currentApy}%</dd>

				{#if token.yieldData.currentApr !== null}
					<dt>Current APR</dt>
					<dd>{token.yieldData.currentApr}%</dd>
				{/if}

				<dt>Total Value Locked</dt>
				<dd>{token.yieldData.totalValueLocked}</dd>

				<dt>Compounding Frequency</dt>
				<dd>{token.yieldData.compoundingFrequency} times per year</dd>

				{#if token.yieldData.yieldStrategy}
					<dt>Yield Strategy</dt>
					<dd>{token.yieldData.yieldStrategy}</dd>
				{/if}

				{#if token.yieldData.autoCompound !== null}
					<dt>Auto Compound</dt>
					<dd>{token.yieldData.autoCompound ? 'Yes' : 'No'}</dd>
				{/if}

				{#if token.yieldData.lockupPeriod !== null}
					<dt>Lockup Period</dt>
					<dd>{token.yieldData.lockupPeriod} days</dd>
				{/if}
			</dl>

			{#if token.yieldData.feeStructure}
				<details>
					<summary><h3>Fee Structure</h3></summary>
					<dl>
						<dt>Management Fee</dt>
						<dd>{token.yieldData.feeStructure.managementFee}%</dd>

						<dt>Performance Fee</dt>
						<dd>{token.yieldData.feeStructure.performanceFee}%</dd>

						{#if token.yieldData.feeStructure.withdrawalFee !== null}
							<dt>Withdrawal Fee</dt>
							<dd>{token.yieldData.feeStructure.withdrawalFee}%</dd>
						{/if}

						{#if token.yieldData.feeStructure.depositFee !== null}
							<dt>Deposit Fee</dt>
							<dd>{token.yieldData.feeStructure.depositFee}%</dd>
						{/if}
					</dl>
				</details>
			{/if}

			{#if token.yieldData.historicalReturns && token.yieldData.historicalReturns.length > 0}
				<details>
					<summary><h3>Historical Returns ({token.yieldData.historicalReturns.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Period</th>
								<th>Return</th>
							</tr>
						</thead>
						<tbody>
							{#each token.yieldData.historicalReturns as period}
								<tr>
									<td>{period.period}</td>
									<td>{period.return}%</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if token.types.includes(TokenType.Gaming) && 'gamingData' in token}
		<EntitySection
			title="Gaming Details"
			entityType="token-gaming"
		>
			<dl>
				<dt>Game Title</dt>
				<dd>{token.gamingData.gamingFeatures.gameTitle}</dd>

				<dt>Game Genre</dt>
				<dd>{token.gamingData.gamingFeatures.gameGenre}</dd>

				<dt>Staking Rewards</dt>
				<dd>{token.gamingData.gamingFeatures.stakingRewards ? 'Yes' : 'No'}</dd>

				<dt>Governance Rights</dt>
				<dd>{token.gamingData.gamingFeatures.governanceRights ? 'Yes' : 'No'}</dd>
			</dl>

			{#if token.gamingData.gamingFeatures.utilityInGame && token.gamingData.gamingFeatures.utilityInGame.length > 0}
				<details>
					<summary><h3>In-Game Utility ({token.gamingData.gamingFeatures.utilityInGame.length})</h3></summary>
					<ul>
						{#each token.gamingData.gamingFeatures.utilityInGame as utility}
							<li>{utility}</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if token.gamingData.gamingFeatures.tokenUtility && token.gamingData.gamingFeatures.tokenUtility.length > 0}
				<details>
					<summary><h3>Token Utility ({token.gamingData.gamingFeatures.tokenUtility.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Function</th>
								<th>Description</th>
								<th>Required</th>
							</tr>
						</thead>
						<tbody>
							{#each token.gamingData.gamingFeatures.tokenUtility as utility}
								<tr>
									<td>{utility.function}</td>
									<td>{utility.description}</td>
									<td>{utility.required ? 'Yes' : 'No'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if token.gamingData.gamingFeatures.earnMechanics && token.gamingData.gamingFeatures.earnMechanics.length > 0}
				<details>
					<summary><h3>Earn Mechanics ({token.gamingData.gamingFeatures.earnMechanics.length})</h3></summary>
					<ul>
						{#each token.gamingData.gamingFeatures.earnMechanics as mechanic}
							<li>{mechanic}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if token.types.includes(TokenType.Lp) && 'lpTokenData' in token}
		<EntitySection
			title="Liquidity Pool Details"
			entityType="token-lp"
		>
			<dl>
				<dt>DEX Protocol</dt>
				<dd>{token.lpTokenData.dexProtocol}</dd>

				<dt>Pool Address</dt>
				<dd><a href="/contract/{token.lpTokenData.poolAddress}">{token.lpTokenData.poolAddress}</a></dd>

				<dt>Token 0</dt>
				<dd><a href="/token/{token.lpTokenData.token0}">{token.lpTokenData.token0}</a></dd>

				<dt>Token 1</dt>
				<dd><a href="/token/{token.lpTokenData.token1}">{token.lpTokenData.token1}</a></dd>

				<dt>Pool Fee</dt>
				<dd>{token.lpTokenData.poolFee} bps</dd>

				<dt>Total Value Locked</dt>
				<dd>{token.lpTokenData.totalValueLocked}</dd>

				<dt>24h Volume</dt>
				<dd>${token.lpTokenData.volume24h.toLocaleString()}</dd>

				<dt>APR</dt>
				<dd>{token.lpTokenData.apr}%</dd>

				<dt>Impermanent Loss Risk</dt>
				<dd class={token.lpTokenData.impermanentLossRisk > 10 ? 'high-risk' : token.lpTokenData.impermanentLossRisk > 5 ? 'medium-risk' : 'low-risk'}>
					{token.lpTokenData.impermanentLossRisk}%
				</dd>

				<dt>Pool Volatility</dt>
				<dd>{token.lpTokenData.poolVolatility}%</dd>
			</dl>
		</EntitySection>
	{/if}

	<!-- Standard-specific sections -->
	{#if token.standard === TokenStandard.Erc721 && 'nftData' in token}
		<EntitySection
			title="NFT Collection Details"
			entityType="token-nft"
		>
			<dl>
				<dt>Collection Name</dt>
				<dd>{token.nftData.name}</dd>

				<dt>Collection Symbol</dt>
				<dd>{token.nftData.symbol}</dd>

				{#if token.nftData.baseUri}
					<dt>Base URI</dt>
					<dd><code>{token.nftData.baseUri}</code></dd>
				{/if}

				{#if token.nftData.contractUri}
					<dt>Contract URI</dt>
					<dd><a href={token.nftData.contractUri} target="_blank" rel="noopener noreferrer">{token.nftData.contractUri}</a></dd>
				{/if}
			</dl>

			{#if token.nftData.collection}
				<details>
					<summary><h3>Collection Information</h3></summary>
					<dl>
						<dt>Name</dt>
						<dd>{token.nftData.collection.name}</dd>

						{#if token.nftData.collection.description}
							<dt>Description</dt>
							<dd>{token.nftData.collection.description}</dd>
						{/if}

						<dt>Royalty Fee</dt>
						<dd>{token.nftData.collection.royaltyFee}%</dd>

						<dt>Verified</dt>
						<dd>{token.nftData.collection.verified ? 'Yes' : 'No'}</dd>

						{#if token.nftData.collection.floorPrice !== null}
							<dt>Floor Price</dt>
							<dd>{token.nftData.collection.floorPrice} ETH</dd>
						{/if}

						{#if token.nftData.collection.volume24h !== null}
							<dt>24h Volume</dt>
							<dd>{token.nftData.collection.volume24h} ETH</dd>
						{/if}
					</dl>
				</details>
			{/if}

			<details>
				<summary><h3>NFT Features</h3></summary>
				<dl>
					<dt>Enumerable</dt>
					<dd>{token.nftData.features.enumerable ? 'Yes' : 'No'}</dd>

					<dt>Metadata</dt>
					<dd>{token.nftData.features.metadata ? 'Yes' : 'No'}</dd>

					<dt>Burnable</dt>
					<dd>{token.nftData.features.burnable ? 'Yes' : 'No'}</dd>

					<dt>Pausable</dt>
					<dd>{token.nftData.features.pausable ? 'Yes' : 'No'}</dd>

					<dt>Upgradeable</dt>
					<dd>{token.nftData.features.upgradeable ? 'Yes' : 'No'}</dd>

					<dt>Soulbound</dt>
					<dd>{token.nftData.features.soulbound ? 'Yes' : 'No'}</dd>

					<dt>Dynamic</dt>
					<dd>{token.nftData.features.dynamic ? 'Yes' : 'No'}</dd>
				</dl>
			</details>
		</EntitySection>
	{/if}

	{#if token.standard === TokenStandard.Erc1155 && 'multiTokenData' in token}
		<EntitySection
			title="Multi-Token Details"
			entityType="token-multi"
		>
			<dl>
				<dt>URI Template</dt>
				<dd><code>{token.multiTokenData.uri}</code></dd>

				<dt>Fungible Tokens</dt>
				<dd>{token.multiTokenData.tokenTypes.fungible}</dd>

				<dt>Non-Fungible Tokens</dt>
				<dd>{token.multiTokenData.tokenTypes.nonFungible}</dd>

				<dt>Semi-Fungible Tokens</dt>
				<dd>{token.multiTokenData.tokenTypes.semiFungible}</dd>
			</dl>

			<details>
				<summary><h3>Features</h3></summary>
				<dl>
					<dt>Burnable</dt>
					<dd>{token.multiTokenData.features.burnable ? 'Yes' : 'No'}</dd>

					<dt>Pausable</dt>
					<dd>{token.multiTokenData.features.pausable ? 'Yes' : 'No'}</dd>

					<dt>Upgradeable</dt>
					<dd>{token.multiTokenData.features.upgradeable ? 'Yes' : 'No'}</dd>

					<dt>Supply Tracking</dt>
					<dd>{token.multiTokenData.features.supplyTracking ? 'Yes' : 'No'}</dd>
				</dl>
			</details>
		</EntitySection>
	{/if}

	{#if token.standard === TokenStandard.Native && 'nativeData' in token}
		<EntitySection
			title="Native Currency Details"
			entityType="token-native"
		>
			<dl>
				<dt>Network Name</dt>
				<dd>{token.nativeData.networkName}</dd>

				<dt>Consensus Type</dt>
				<dd>{token.nativeData.consensusType}</dd>

				<dt>Block Time</dt>
				<dd>{token.nativeData.blockTime} seconds</dd>

				<dt>Gas Token Usage</dt>
				<dd>{token.nativeData.gasTokenUsage ? 'Yes' : 'No'}</dd>

				<dt>Issuance Model</dt>
				<dd>{token.nativeData.issuanceModel}</dd>

				{#if token.nativeData.annualInflation !== null}
					<dt>Annual Inflation</dt>
					<dd>{token.nativeData.annualInflation}%</dd>
				{/if}

				{#if token.nativeData.stakingEnabled !== null}
					<dt>Staking Enabled</dt>
					<dd>{token.nativeData.stakingEnabled ? 'Yes' : 'No'}</dd>
				{/if}

				{#if token.nativeData.stakingApr !== null}
					<dt>Staking APR</dt>
					<dd>{token.nativeData.stakingApr}%</dd>
				{/if}

				{#if token.nativeData.burnMechanism}
					<dt>Burn Mechanism</dt>
					<dd>{token.nativeData.burnMechanism}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Entity relationships -->
	{#if token.$contractActor}
		<EntitySection title="Contract Actor" entityType="token-contract">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{token.$contractActor.address}">{token.$contractActor.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if token.$creator}
		<EntitySection title="Creator" entityType="token-creator">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{token.$creator.address}">{token.$creator.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if token.$owner}
		<EntitySection title="Owner" entityType="token-owner">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{token.$owner.address}">{token.$owner.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if token.$deployer}
		<EntitySection title="Deployer" entityType="token-deployer">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{token.$deployer.address}">{token.$deployer.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if token.$admin}
		<EntitySection title="Admin" entityType="token-admin">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{token.$admin.address}">{token.$admin.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if token.$minters && token.$minters.length > 0}
		<EntitySection title="Minters" entityType="token-minters">
			<ul>
				{#each token.$minters as minter}
					<li>
						<a href="/actor/{minter.address}">{minter.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if token.$burners && token.$burners.length > 0}
		<EntitySection title="Burners" entityType="token-burners">
			<ul>
				{#each token.$burners as burner}
					<li>
						<a href="/actor/{burner.address}">{burner.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if token.$topHolders && token.$topHolders.length > 0}
		<EntitySection title="Top Holders" entityType="token-holders">
			<ul>
				{#each token.$topHolders.slice(0, 10) as holder}
					<li>
						<a href="/actor/{holder.address}">{holder.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if token.$recentTransfers && token.$recentTransfers.length > 0}
		<EntitySection title="Recent Transfers" entityType="token-transfers">
			<ul>
				{#each token.$recentTransfers.slice(0, 10) as transfer}
					<li>
						<a href="/transfer/{transfer.id}">{transfer.id}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if token.$creationTransaction}
		<EntitySection title="Creation Transaction" entityType="token-creation">
			<dl>
				<dt>Transaction ID</dt>
				<dd><a href="/transaction/{token.$creationTransaction.id}">{token.$creationTransaction.id}</a></dd>
			</dl>
		</EntitySection>
	{/if}
</Entity>
