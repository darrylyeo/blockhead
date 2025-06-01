<script lang="ts">
	// Types/constants
	import type { Contract } from '$/entities/contract'
	import { ContractStandard, ContractCategory } from '$/entities/contract'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { contract }: { contract: Contract } = $props()
</script>


<Entity
	type={EntityType.Contract}
	id={contract.address}
	title={contract.name ?? contract.address}
	annotation="Contract"
>
	<EntitySection
		title="Basic Information"
		entityType="contract-basic"
	>
		<dl>
			<dt>Address</dt>
			<dd>
				<a href="/address/{contract.address}">{contract.address}</a>
			</dd>

			<dt>Chain ID</dt>
			<dd>{contract.chainId}</dd>

			<dt>Standards</dt>
			<dd>
				<ul>
					{#each contract.standards as standard}
						<li>{standard}</li>
					{/each}
				</ul>
			</dd>

			<dt>Categories</dt>
			<dd>
				<ul>
					{#each contract.categories as category}
						<li>{category}</li>
					{/each}
				</ul>
			</dd>

			{#if contract.name}
				<dt>Name</dt>
				<dd>{contract.name}</dd>
			{/if}

			{#if contract.version}
				<dt>Version</dt>
				<dd>{contract.version}</dd>
			{/if}

			<dt>Bytecode Hash</dt>
			<dd><code>{contract.bytecode}</code></dd>

			{#if contract.compilerVersion}
				<dt>Compiler Version</dt>
				<dd>{contract.compilerVersion}</dd>
			{/if}

			{#if contract.optimizationEnabled !== null}
				<dt>Optimization Enabled</dt>
				<dd>{contract.optimizationEnabled ? 'Yes' : 'No'}</dd>
			{/if}
		</dl>

		{#if contract.sourceCode}
			<details>
				<summary><h3>Source Code</h3></summary>
				<pre><code>{contract.sourceCode}</code></pre>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Deployment Information"
		entityType="contract-deployment"
	>
		<dl>
			<dt>Deployment Transaction</dt>
			<dd>
				<a href="/transaction/{contract.deploymentTransaction}"
					>{contract.deploymentTransaction}</a
				>
			</dd>

			<dt>Deployment Block</dt>
			<dd>
				<a href="/block/{contract.deploymentBlock}"
					>{contract.deploymentBlock?.toLocaleString()}</a
				>
			</dd>

			<dt>Deployment Timestamp</dt>
			<dd>
				<time datetime={new Date(contract.deploymentTimestamp * 1000).toISOString()}>
					{new Date(contract.deploymentTimestamp * 1000)?.toLocaleString()}
				</time>
			</dd>
		</dl>
	</EntitySection>

	<EntitySection
		title="Contract Interface"
		entityType="contract-interface"
	>
		{#if contract.abi && contract.abi.length > 0}
			<details>
				<summary><h3>ABI ({contract.abi.length} elements)</h3></summary>
				<pre><code>{JSON.stringify(contract.abi, null, 2)}</code></pre>
			</details>
		{/if}

		{#if contract.functions.length > 0}
			<details>
				<summary><h3>Functions ({contract.functions.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Signature</th>
							<th>Mutability</th>
							<th>Selector</th>
						</tr>
					</thead>
					<tbody>
						{#each contract.functions as func}
							<tr>
								<td>{func.name}</td>
								<td><code>{func.signature}</code></td>
								<td>{func.stateMutability ?? '-'}</td>
								<td><code>{func.selector ?? '-'}</code></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}

		{#if contract.events.length > 0}
			<details>
				<summary><h3>Events ({contract.events.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Signature</th>
							<th>Selector</th>
						</tr>
					</thead>
					<tbody>
						{#each contract.events as event}
							<tr>
								<td>{event.name}</td>
								<td><code>{event.signature}</code></td>
								<td><code>{event.selector ?? '-'}</code></td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Verification & Security"
		entityType="contract-verification"
	>
		<dl>
			<dt>Verified</dt>
			<dd>{contract.verification.isVerified ? 'Yes' : 'No'}</dd>

			{#if contract.verification.verificationService}
				<dt>Verification Service</dt>
				<dd>{contract.verification.verificationService}</dd>
			{/if}

			{#if contract.verification.verifiedAt}
				<dt>Verified At</dt>
				<dd>
					<time datetime={new Date(contract.verification.verifiedAt * 1000).toISOString()}>
						{new Date(contract.verification.verifiedAt * 1000)?.toLocaleString()}
					</time>
				</dd>
			{/if}

			{#if contract.verification.sourcifyMatch}
				<dt>Sourcify Match</dt>
				<dd>{contract.verification.sourcifyMatch}</dd>
			{/if}

			{#if contract.verification.securityScore !== null}
				<dt>Security Score</dt>
				<dd>{contract.verification.securityScore}/100</dd>
			{/if}
		</dl>

		{#if contract.verification.auditReports && contract.verification.auditReports.length > 0}
			<details>
				<summary><h3>Audit Reports ({contract.verification.auditReports.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Auditor</th>
							<th>Date</th>
							<th>Score</th>
							<th>Report</th>
							<th>Findings</th>
						</tr>
					</thead>
					<tbody>
						{#each contract.verification.auditReports as audit}
							<tr>
								<td>{audit.auditor}</td>
								<td>
									<time datetime={new Date(audit.date * 1000).toISOString()}>
										{new Date(audit.date * 1000).toLocaleDateString()}
									</time>
								</td>
								<td>{audit.score ?? '-'}</td>
								<td>
									{#if audit.reportUrl}
										<a href={audit.reportUrl} target="_blank" rel="noopener noreferrer">View Report</a>
									{:else}
										-
									{/if}
								</td>
								<td>{audit.findings.length}</td>
							</tr>
						{/each}
					</tbody>
				</table>

				{#each contract.verification.auditReports as audit}
					{#if audit.findings.length > 0}
						<details>
							<summary><h4>{audit.auditor} Findings ({audit.findings.length})</h4></summary>
							<ul>
								{#each audit.findings as finding}
									<li class="finding {finding.severity}">
										<strong>{finding.severity.toUpperCase()}</strong>: {finding.title}
										<p>{finding.description}</p>
									</li>
								{/each}
							</ul>
						</details>
					{/if}
				{/each}
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Usage Statistics"
		entityType="contract-statistics"
	>
		<dl>
			<dt>Transaction Count</dt>
			<dd>{contract.statistics.transactionCount?.toLocaleString()}</dd>

			<dt>Internal Transaction Count</dt>
			<dd>{contract.statistics.internalTransactionCount?.toLocaleString()}</dd>

			<dt>Unique Callers</dt>
			<dd>{contract.statistics.uniqueCallers?.toLocaleString()}</dd>

			<dt>Daily Active Users</dt>
			<dd>{contract.statistics.dailyActiveUsers?.toLocaleString()}</dd>

			<dt>Weekly Active Users</dt>
			<dd>{contract.statistics.weeklyActiveUsers?.toLocaleString()}</dd>

			<dt>Monthly Active Users</dt>
			<dd>{contract.statistics.monthlyActiveUsers?.toLocaleString()}</dd>

			<dt>Total Value Received</dt>
			<dd>{contract.statistics.totalValueReceived}</dd>

			<dt>Total Value Sent</dt>
			<dd>{contract.statistics.totalValueSent}</dd>

			<dt>Total Fees Generated</dt>
			<dd>{contract.statistics.totalFeesGenerated}</dd>

			<dt>Average Transaction Value</dt>
			<dd>{contract.statistics.averageTransactionValue}</dd>
		</dl>

		{#if contract.statistics.functionCalls && Object.keys(contract.statistics.functionCalls).length > 0}
			<details>
				<summary><h3>Function Usage</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Function</th>
							<th>Calls</th>
							<th>Percentage</th>
							<th>Avg Gas</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(contract.statistics.functionCalls) as [functionName, stats]}
							<tr>
								<td>{functionName}</td>
								<td>{stats.count?.toLocaleString()}</td>
								<td>{stats.percentage.toFixed(2)}%</td>
								<td>{stats.averageGasUsed?.toLocaleString()}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Risk Assessment"
		entityType="contract-risk"
	>
		<dl>
			<dt>Risk Level</dt>
			<dd class="risk-level {contract.risk.riskLevel}">{contract.risk.riskLevel}</dd>

			<dt>Has Renounce Ownership</dt>
			<dd>{contract.risk.hasRenounceOwnership ? 'Yes' : 'No'}</dd>

			<dt>Has MultiSig</dt>
			<dd>{contract.risk.hasMultiSig ? 'Yes' : 'No'}</dd>

			<dt>Has Timelock</dt>
			<dd>{contract.risk.hasTimelock ? 'Yes' : 'No'}</dd>

			<dt>Has Emergency Pause</dt>
			<dd>{contract.risk.hasEmergencyPause ? 'Yes' : 'No'}</dd>

			<dt>Has Upgradeability</dt>
			<dd>{contract.risk.hasUpgradeability ? 'Yes' : 'No'}</dd>

			<dt>Has External Dependencies</dt>
			<dd>{contract.risk.hasExternalDependencies ? 'Yes' : 'No'}</dd>
		</dl>

		{#if contract.risk.riskFactors && contract.risk.riskFactors.length > 0}
			<details>
				<summary><h3>Risk Factors ({contract.risk.riskFactors.length})</h3></summary>
				<ul>
					{#each contract.risk.riskFactors as factor}
						<li>{factor}</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if contract.risk.blacklistedFunctions && contract.risk.blacklistedFunctions.length > 0}
			<details>
				<summary><h3>Blacklisted Functions ({contract.risk.blacklistedFunctions.length})</h3></summary>
				<ul>
					{#each contract.risk.blacklistedFunctions as func}
						<li><code>{func}</code></li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if contract.risk.suspiciousPatterns && contract.risk.suspiciousPatterns.length > 0}
			<details>
				<summary><h3>Suspicious Patterns ({contract.risk.suspiciousPatterns.length})</h3></summary>
				<ul>
					{#each contract.risk.suspiciousPatterns as pattern}
						<li>{pattern}</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if contract.risk.complianceIssues && contract.risk.complianceIssues.length > 0}
			<details>
				<summary><h3>Compliance Issues ({contract.risk.complianceIssues.length})</h3></summary>
				<ul>
					{#each contract.risk.complianceIssues as issue}
						<li>{issue}</li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>

	<!-- Standard-specific sections -->
	{#if contract.standards.includes(ContractStandard.Erc20) && 'tokenData' in contract}
		<EntitySection
			title="ERC20 Token Details"
			entityType="contract-erc20"
		>
			<dl>
				<dt>Name</dt>
				<dd>{contract.tokenData.name}</dd>

				<dt>Symbol</dt>
				<dd>{contract.tokenData.symbol}</dd>

				<dt>Decimals</dt>
				<dd>{contract.tokenData.decimals}</dd>

				<dt>Total Supply</dt>
				<dd>{contract.tokenData.totalSupply}</dd>

				<dt>Holder Count</dt>
				<dd>{contract.tokenData.holderCount?.toLocaleString()}</dd>

				<dt>Top Holder Percentage</dt>
				<dd>{contract.tokenData.topHolderPercentage}%</dd>

				<dt>Mintable</dt>
				<dd>{contract.tokenData.isMintable ? 'Yes' : 'No'}</dd>

				<dt>Burnable</dt>
				<dd>{contract.tokenData.isBurnable ? 'Yes' : 'No'}</dd>

				<dt>Has Transfer Tax</dt>
				<dd>{contract.tokenData.hasTransferTax ? 'Yes' : 'No'}</dd>

				<dt>Has Reflection</dt>
				<dd>{contract.tokenData.hasReflection ? 'Yes' : 'No'}</dd>

				<dt>Has Anti-Whale</dt>
				<dd>{contract.tokenData.hasAntiWhale ? 'Yes' : 'No'}</dd>

				<dt>Liquidity Locked</dt>
				<dd>{contract.tokenData.liquidityLocked ? 'Yes' : 'No'}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.standards.includes(ContractStandard.Erc721) && 'nftData' in contract}
		<EntitySection
			title="ERC721 NFT Details"
			entityType="contract-erc721"
		>
			<dl>
				<dt>Collection Name</dt>
				<dd>{contract.nftData.name}</dd>

				<dt>Collection Symbol</dt>
				<dd>{contract.nftData.symbol}</dd>

				<dt>Total Supply</dt>
				<dd>{contract.nftData.totalSupply}</dd>

				<dt>Unique Owners</dt>
				<dd>{contract.nftData.uniqueOwners?.toLocaleString()}</dd>

				{#if contract.nftData.maxSupply}
					<dt>Max Supply</dt>
					<dd>{contract.nftData.maxSupply}</dd>
				{/if}

				{#if contract.nftData.baseURI}
					<dt>Base URI</dt>
					<dd><code>{contract.nftData.baseURI}</code></dd>
				{/if}

				{#if contract.nftData.mintPrice}
					<dt>Mint Price</dt>
					<dd>{contract.nftData.mintPrice}</dd>
				{/if}

				{#if contract.nftData.royaltyPercentage}
					<dt>Royalty Percentage</dt>
					<dd>{contract.nftData.royaltyPercentage}%</dd>
				{/if}

				{#if contract.nftData.floorPrice}
					<dt>Floor Price</dt>
					<dd>{contract.nftData.floorPrice}</dd>
				{/if}

				{#if contract.nftData.totalVolume}
					<dt>Total Volume</dt>
					<dd>{contract.nftData.totalVolume}</dd>
				{/if}

				<dt>Mintable</dt>
				<dd>{contract.nftData.isMintable ? 'Yes' : 'No'}</dd>

				<dt>Public Mint</dt>
				<dd>{contract.nftData.publicMint ? 'Yes' : 'No'}</dd>

				<dt>Whitelist Mint</dt>
				<dd>{contract.nftData.whitelistMint ? 'Yes' : 'No'}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.standards.includes(ContractStandard.Erc1155) && 'multiTokenData' in contract}
		<EntitySection
			title="ERC1155 Multi-Token Details"
			entityType="contract-erc1155"
		>
			<dl>
				{#if contract.multiTokenData.name}
					<dt>Name</dt>
					<dd>{contract.multiTokenData.name}</dd>
				{/if}

				<dt>URI Template</dt>
				<dd><code>{contract.multiTokenData.uri}</code></dd>

				<dt>Token Count</dt>
				<dd>{contract.multiTokenData.tokenCount?.toLocaleString()}</dd>

				<dt>Fungible Tokens</dt>
				<dd>{contract.multiTokenData.tokenTypes.fungible}</dd>

				<dt>Non-Fungible Tokens</dt>
				<dd>{contract.multiTokenData.tokenTypes.nonFungible}</dd>

				<dt>Semi-Fungible Tokens</dt>
				<dd>{contract.multiTokenData.tokenTypes.semiFungible}</dd>

				<dt>Supports Batch Transfer</dt>
				<dd>{contract.multiTokenData.supportsBatchTransfer ? 'Yes' : 'No'}</dd>

				<dt>Supports Batch Mint</dt>
				<dd>{contract.multiTokenData.supportsBatchMint ? 'Yes' : 'No'}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.standards.includes(ContractStandard.Erc1967) && 'proxyData' in contract}
		<EntitySection
			title="Proxy Details"
			entityType="contract-proxy"
		>
			<dl>
				<dt>Proxy Type</dt>
				<dd>{contract.proxyData.proxyType}</dd>

				{#if contract.proxyData.implementation}
					<dt>Implementation</dt>
					<dd><a href="/contract/{contract.proxyData.implementation}">{contract.proxyData.implementation}</a></dd>
				{/if}

				{#if contract.proxyData.admin}
					<dt>Admin</dt>
					<dd><a href="/actor/{contract.proxyData.admin}">{contract.proxyData.admin}</a></dd>
				{/if}

				{#if contract.proxyData.beacon}
					<dt>Beacon</dt>
					<dd><a href="/contract/{contract.proxyData.beacon}">{contract.proxyData.beacon}</a></dd>
				{/if}

				<dt>Upgradable</dt>
				<dd>{contract.proxyData.isUpgradable ? 'Yes' : 'No'}</dd>
			</dl>

			{#if contract.proxyData.slots && Object.keys(contract.proxyData.slots).length > 0}
				<details>
					<summary><h3>Storage Slots ({Object.keys(contract.proxyData.slots).length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Slot</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{#each Object.entries(contract.proxyData.slots) as [slot, value]}
								<tr>
									<td><code>{slot}</code></td>
									<td><code>{value}</code></td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if contract.proxyData.upgradeHistory && contract.proxyData.upgradeHistory.length > 0}
				<details>
					<summary><h3>Upgrade History ({contract.proxyData.upgradeHistory.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>From</th>
								<th>To</th>
							</tr>
						</thead>
						<tbody>
							{#each contract.proxyData.upgradeHistory as upgrade}
								<tr>
									<td>
										<time datetime={new Date(upgrade.timestamp * 1000).toISOString()}>
											{new Date(upgrade.timestamp * 1000)?.toLocaleString()}
										</time>
									</td>
									<td><a href="/contract/{upgrade.oldImplementation}">{upgrade.oldImplementation}</a></td>
									<td><a href="/contract/{upgrade.newImplementation}">{upgrade.newImplementation}</a></td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if contract.standards.includes(ContractStandard.Custom) && 'customData' in contract}
		<EntitySection
			title="Custom Contract Details"
			entityType="contract-custom"
		>
			<dl>
				<dt>Contract Type</dt>
				<dd>{contract.customData.contractType}</dd>

				{#if contract.customData.protocolName}
					<dt>Protocol Name</dt>
					<dd>{contract.customData.protocolName}</dd>
				{/if}

				{#if contract.customData.protocolVersion}
					<dt>Protocol Version</dt>
					<dd>{contract.customData.protocolVersion}</dd>
				{/if}
			</dl>

			{#if contract.customData.features && contract.customData.features.length > 0}
				<details>
					<summary><h3>Features ({contract.customData.features.length})</h3></summary>
					<ul>
						{#each contract.customData.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if contract.customData.properties && Object.keys(contract.customData.properties).length > 0}
				<details>
					<summary><h3>Custom Properties</h3></summary>
					<pre><code>{JSON.stringify(contract.customData.properties, null, 2)}</code></pre>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Category-specific sections -->
	{#if contract.categories.includes(ContractCategory.Defi) && 'defiFeatures' in contract && contract.defiFeatures}
		<EntitySection
			title="DeFi Features"
			entityType="contract-defi"
		>
			<dl>
				<dt>Protocol Type</dt>
				<dd>{contract.defiFeatures.protocolType}</dd>

				{#if contract.defiFeatures.tvl}
					<dt>Total Value Locked (TVL)</dt>
					<dd>{contract.defiFeatures.tvl}</dd>
				{/if}

				{#if contract.defiFeatures.apr}
					<dt>APR</dt>
					<dd>{contract.defiFeatures.apr}%</dd>
				{/if}
			</dl>

			{#if contract.defiFeatures.fees}
				<details>
					<summary><h3>Fee Structure</h3></summary>
					<dl>
						{#if contract.defiFeatures.fees.tradingFee}
							<dt>Trading Fee</dt>
							<dd>{contract.defiFeatures.fees.tradingFee} bps</dd>
						{/if}

						{#if contract.defiFeatures.fees.protocolFee}
							<dt>Protocol Fee</dt>
							<dd>{contract.defiFeatures.fees.protocolFee} bps</dd>
						{/if}

						{#if contract.defiFeatures.fees.performanceFee}
							<dt>Performance Fee</dt>
							<dd>{contract.defiFeatures.fees.performanceFee} bps</dd>
						{/if}
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if contract.categories.includes(ContractCategory.Governance) && 'governance' in contract && contract.governance}
		<EntitySection
			title="Governance Features"
			entityType="contract-governance"
		>
			<dl>
				<dt>Has Owner</dt>
				<dd>{contract.governance.hasOwner ? 'Yes' : 'No'}</dd>

				<dt>Multi-Owner</dt>
				<dd>{contract.governance.isMultiOwner ? 'Yes' : 'No'}</dd>

				<dt>Has Permissions</dt>
				<dd>{contract.governance.hasPermissions ? 'Yes' : 'No'}</dd>

				<dt>Pausable</dt>
				<dd>{contract.governance.isPausable ? 'Yes' : 'No'}</dd>

				<dt>Upgradable</dt>
				<dd>{contract.governance.isUpgradable ? 'Yes' : 'No'}</dd>
			</dl>

			{#if contract.governance.roles && contract.governance.roles.length > 0}
				<details>
					<summary><h3>Roles ({contract.governance.roles.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Role</th>
								<th>Members</th>
								<th>Permissions</th>
							</tr>
						</thead>
						<tbody>
							{#each contract.governance.roles as role}
								<tr>
									<td>{role.role}</td>
									<td>{role.members.length}</td>
									<td>{role.permissions.join(', ')}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if contract.governance.timelock}
				<details>
					<summary><h3>Timelock Configuration</h3></summary>
					<dl>
						<dt>Delay</dt>
						<dd>{contract.governance.timelock.delay} seconds</dd>

						<dt>Proposal Threshold</dt>
						<dd>{contract.governance.timelock.proposalThreshold}</dd>

						<dt>Execution Threshold</dt>
						<dd>{contract.governance.timelock.executionThreshold}</dd>
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Entity relationships -->
	{#if contract.$contractActor}
		<EntitySection title="Contract Actor" entityType="contract-actor">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{contract.$contractActor.address}">{contract.$contractActor.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$deployer}
		<EntitySection title="Deployer" entityType="contract-deployer">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{contract.$deployer.address}">{contract.$deployer.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$owner}
		<EntitySection title="Owner" entityType="contract-owner">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{contract.$owner.address}">{contract.$owner.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$admin}
		<EntitySection title="Admin" entityType="contract-admin">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{contract.$admin.address}">{contract.$admin.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$implementation}
		<EntitySection title="Implementation" entityType="contract-implementation">
			<dl>
				<dt>Address</dt>
				<dd><a href="/contract/{contract.$implementation.address}">{contract.$implementation.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$beacon}
		<EntitySection title="Beacon" entityType="contract-beacon">
			<dl>
				<dt>Address</dt>
				<dd><a href="/contract/{contract.$beacon.address}">{contract.$beacon.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$factory}
		<EntitySection title="Factory" entityType="contract-factory">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{contract.$factory.address}">{contract.$factory.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if contract.$createdContracts && contract.$createdContracts.length > 0}
		<EntitySection title="Created Contracts ({contract.$createdContracts.length})" entityType="contract-created">
			<ul>
				{#each contract.$createdContracts as created}
					<li>
						<a href="/contract/{created.address}">{created.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if contract.$relatedContracts && contract.$relatedContracts.length > 0}
		<EntitySection title="Related Contracts ({contract.$relatedContracts.length})" entityType="contract-related">
			<ul>
				{#each contract.$relatedContracts as related}
					<li>
						<a href="/contract/{related.address}">{related.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if contract.$dependsOn && contract.$dependsOn.length > 0}
		<EntitySection title="Dependencies ({contract.$dependsOn.length})" entityType="contract-dependencies">
			<ul>
				{#each contract.$dependsOn as dependency}
					<li>
						<a href="/contract/{dependency.address}">{dependency.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if contract.$dependents && contract.$dependents.length > 0}
		<EntitySection title="Dependents ({contract.$dependents.length})" entityType="contract-dependents">
			<ul>
				{#each contract.$dependents as dependent}
					<li>
						<a href="/contract/{dependent.address}">{dependent.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if contract.$frequentCallers && contract.$frequentCallers.length > 0}
		<EntitySection title="Frequent Callers ({contract.$frequentCallers.length})" entityType="contract-callers">
			<ul>
				{#each contract.$frequentCallers as caller}
					<li>
						<a href="/actor/{caller.address}">{caller.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if contract.$recentTransactions && contract.$recentTransactions.length > 0}
		<EntitySection title="Recent Transactions ({contract.$recentTransactions.length})" entityType="contract-transactions">
			<ul>
				{#each contract.$recentTransactions as transaction}
					<li>
						<a href="/transaction/{transaction.id}">{transaction.id}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if contract.$events && contract.$events.length > 0}
		<EntitySection title="Recent Events ({contract.$events.length})" entityType="contract-events">
			<ul>
				{#each contract.$events as event}
					<li>
						<a href="/event/{event.id}">{event.id}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}
</Entity>
