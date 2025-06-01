<script lang="ts">
	// Types/constants
	import type { Actor } from '$/entities/actor'
	import { ActorType, ContractTag } from '$/entities/actor'
	import { EntityType } from '$/entities'


	// Props
	let { actor }: { actor: Actor } = $props()


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>


<Entity
	type={EntityType.Actor}
	id={actor.address}
	title={actor.address}
	annotation={`${actor.type?.toUpperCase() ?? 'UNKNOWN'} Actor`}
>
	<EntitySection
		title="Basic Information"
		entityType="actor-basic"
	>
		<dl>
			<dt>Address</dt>
			<dd><a href="/actor/{actor.address}">{actor.address}</a></dd>

			<dt>Chain ID</dt>
			<dd>{actor.chainId}</dd>

			<dt>Type</dt>
			<dd>{actor.type}</dd>

			{#if actor.labels && actor.labels.length > 0}
				<dt>Labels</dt>
				<dd>
					<ul>
						{#each actor.labels as label}
							<li>
								<strong>{label.name}</strong>
								{#if label.source} - from {label.source}{/if}
								{#if label.verified} ✓{/if}
							</li>
						{/each}
					</ul>
				</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Balance & Financial"
		entityType="actor-balance"
	>
		<dl>
			{#if actor.balance !== null}
				<dt>Balance</dt>
				<dd>{actor.balance} Wei</dd>
			{/if}

			{#if actor.balanceUsd !== null}
				<dt>Balance USD</dt>
				<dd>${actor.balanceUsd.toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Activity & Lifecycle"
		entityType="actor-activity"
	>
		<dl>
			{#if actor.firstSeenAt !== null}
				<dt>First Seen</dt>
				<dd>
					<time
						datetime={new Date(
							actor.firstSeenAt * 1000,
						).toISOString()}
						>{new Date(
							actor.firstSeenAt * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if actor.lastActiveAt !== null}
				<dt>Last Active</dt>
				<dd>
					<time
						datetime={new Date(
							actor.lastActiveAt * 1000,
						).toISOString()}
						>{new Date(
							actor.lastActiveAt * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if actor.transactionCount !== null}
				<dt>Transaction Count</dt>
				<dd>{actor.transactionCount.toLocaleString()}</dd>
			{/if}

			{#if actor.internalTransactionCount !== null}
				<dt>Internal Transaction Count</dt>
				<dd>{actor.internalTransactionCount.toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Security & Verification"
		entityType="actor-security"
	>
		<dl>
			{#if actor.riskLevel}
				<dt>Risk Level</dt>
				<dd class="risk-level {actor.riskLevel}">{actor.riskLevel}</dd>
			{/if}

			{#if actor.securityScore !== null}
				<dt>Security Score</dt>
				<dd>{actor.securityScore}/100</dd>
			{/if}
		</dl>

		{#if actor.auditReports && actor.auditReports.length > 0}
			<details>
				<summary><h3>Audit Reports ({actor.auditReports.length})</h3></summary>
				<ul>
					{#each actor.auditReports as audit}
						<li>
							<strong>{audit.auditor}</strong> - {new Date(
								audit.date * 1000,
							).toLocaleDateString()}
							{#if audit.score !== null}
								(Score: {audit.score}/100)
							{/if}
							{#if audit.reportUrl}
								<br><a href={audit.reportUrl} target="_blank" rel="noopener noreferrer">View Report</a>
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>

	{#if actor.type === ActorType.Eoa}
		<EntitySection
			title="EOA Details"
			entityType="actor-eoa"
		>
			<dl>
				{#if 'nonce' in actor && actor.nonce !== null}
					<dt>Nonce</dt>
					<dd>{actor.nonce}</dd>
				{/if}

				{#if 'isVerified' in actor && actor.isVerified !== null}
					<dt>Verified</dt>
					<dd>{actor.isVerified ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>

			{#if 'ensName' in actor || 'ensAvatar' in actor || 'ensReverse' in actor}
				<details>
					<summary><h3>ENS Information</h3></summary>
					<dl>
						{#if 'ensName' in actor && actor.ensName}
							<dt>ENS Name</dt>
							<dd>{actor.ensName}</dd>
						{/if}

						{#if 'ensAvatar' in actor && actor.ensAvatar}
							<dt>ENS Avatar</dt>
							<dd>
								<img
									src={actor.ensAvatar}
									alt="ENS Avatar"
									style="max-width: 64px; max-height: 64px;"
								/>
							</dd>
						{/if}

						{#if 'ensReverse' in actor && actor.ensReverse}
							<dt>ENS Reverse</dt>
							<dd>{actor.ensReverse}</dd>
						{/if}
					</dl>
				</details>
			{/if}

			{#if 'averageGasPrice' in actor || 'preferredGasLimit' in actor}
				<details>
					<summary><h3>Gas Preferences</h3></summary>
					<dl>
						{#if 'averageGasPrice' in actor && actor.averageGasPrice}
							<dt>Average Gas Price</dt>
							<dd>{actor.averageGasPrice} wei</dd>
						{/if}

						{#if 'preferredGasLimit' in actor && actor.preferredGasLimit}
							<dt>Preferred Gas Limit</dt>
							<dd>{actor.preferredGasLimit}</dd>
						{/if}
					</dl>
				</details>
			{/if}

			{#if 'tags' in actor && actor.tags && actor.tags.length > 0}
				<details>
					<summary><h3>Tags ({actor.tags.length})</h3></summary>
					<ul>
						{#each actor.tags as tag}
							<li>{tag}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if actor.type === ActorType.Contract}
		<EntitySection
			title="Contract Basics"
			entityType="actor-contract-basic"
		>
			<dl>
				{#if 'isVerified' in actor && actor.isVerified !== null}
					<dt>Verified</dt>
					<dd>{actor.isVerified ? 'Yes' : 'No'}</dd>
				{/if}

				{#if 'hasSource' in actor && actor.hasSource !== null}
					<dt>Has Source</dt>
					<dd>{actor.hasSource ? 'Yes' : 'No'}</dd>
				{/if}

				{#if 'bytecodeSize' in actor && actor.bytecodeSize !== null}
					<dt>Bytecode Size</dt>
					<dd>{actor.bytecodeSize} bytes</dd>
				{/if}

				{#if 'verificationDate' in actor && actor.verificationDate}
					<dt>Verification Date</dt>
					<dd>
						<time
							datetime={new Date(
								actor.verificationDate * 1000,
							).toISOString()}
							>{new Date(
								actor.verificationDate * 1000,
							).toLocaleString()}</time
					>
					</dd>
				{/if}

				{#if 'verificationMethod' in actor && actor.verificationMethod}
					<dt>Verification Method</dt>
					<dd>{actor.verificationMethod}</dd>
				{/if}
			</dl>

			{#if 'bytecode' in actor && actor.bytecode}
				<details>
					<summary><h3>Bytecode</h3></summary>
					<code>{actor.bytecode}</code>
				</details>
			{/if}
		</EntitySection>

		<EntitySection
			title="Contract Deployment"
			entityType="actor-contract-deployment"
		>
			<dl>
				{#if 'creationTransaction' in actor && actor.creationTransaction}
					<dt>Creation Transaction</dt>
					<dd>
						<a href="/transaction/{actor.creationTransaction}"
							>{actor.creationTransaction}</a>
					</dd>
				{/if}

				{#if 'creationBlock' in actor && actor.creationBlock}
					<dt>Creation Block</dt>
					<dd>
						<a href="/block/{actor.creationBlock}"
							>{actor.creationBlock.toLocaleString()}</a>
					</dd>
				{/if}
			</dl>
		</EntitySection>

		<EntitySection
			title="Contract Classification"
			entityType="actor-contract-classification"
		>
			<dl>
				{#if 'protocolName' in actor && actor.protocolName}
					<dt>Protocol Name</dt>
					<dd>{actor.protocolName}</dd>
				{/if}

				{#if 'protocolVersion' in actor && actor.protocolVersion}
					<dt>Protocol Version</dt>
					<dd>{actor.protocolVersion}</dd>
				{/if}

				{#if 'protocolRole' in actor && actor.protocolRole}
					<dt>Protocol Role</dt>
					<dd>{actor.protocolRole}</dd>
				{/if}
			</dl>

			{#if 'tags' in actor && actor.tags && actor.tags.length > 0}
				<details>
					<summary><h3>Contract Tags ({actor.tags.length})</h3></summary>
					<ul>
						{#each actor.tags as tag}
							<li>{tag}</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if 'standards' in actor && actor.standards && actor.standards.length > 0}
				<details>
					<summary><h3>Standards ({actor.standards.length})</h3></summary>
					<ul>
						{#each actor.standards as standard}
							<li>{standard}</li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>

		{#if 'proxyType' in actor && actor.proxyType}
			<EntitySection
				title="Proxy Information"
				entityType="actor-proxy"
			>
				<dl>
					<dt>Proxy Type</dt>
					<dd>{actor.proxyType}</dd>

					{#if 'isUpgradable' in actor && actor.isUpgradable !== null}
						<dt>Is Upgradable</dt>
						<dd>{actor.isUpgradable ? 'Yes' : 'No'}</dd>
					{/if}
				</dl>

				{#if 'upgradeHistory' in actor && actor.upgradeHistory && actor.upgradeHistory.length > 0}
					<details>
						<summary><h3>Upgrade History ({actor.upgradeHistory.length})</h3></summary>
						<table>
							<thead>
								<tr>
									<th>Date</th>
									<th>From</th>
									<th>To</th>
								</tr>
							</thead>
							<tbody>
								{#each actor.upgradeHistory as upgrade}
									<tr>
										<td>
											<time datetime={new Date(upgrade.timestamp * 1000).toISOString()}>
												{new Date(upgrade.timestamp * 1000).toLocaleString()}
											</time>
										</td>
										<td>{upgrade.oldImplementation}</td>
										<td>{upgrade.newImplementation}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</details>
				{/if}
			</EntitySection>
		{/if}

		<!-- Contract Tag-specific sections -->
		{#if 'signers' in actor && actor.signers && actor.signers.length > 0}
			<EntitySection
				title="Multisig Details"
				entityType="actor-multisig"
			>
				<dl>
					{#if 'threshold' in actor && actor.threshold !== null}
						<dt>Threshold</dt>
						<dd>{actor.threshold}</dd>
					{/if}

					{#if 'multisigType' in actor && actor.multisigType}
						<dt>Multisig Type</dt>
						<dd>{actor.multisigType}</dd>
					{/if}

					<dt>Signers ({actor.signers.length})</dt>
					<dd>
						<ul>
							{#each actor.signers as signer}
								<li><a href="/actor/{signer}">{signer}</a></li>
							{/each}
						</ul>
					</dd>
				</dl>
			</EntitySection>
		{/if}

		{#if 'deploymentPattern' in actor && actor.deploymentPattern}
			<EntitySection
				title="Factory Details"
				entityType="actor-factory"
			>
				<dl>
					<dt>Deployment Pattern</dt>
					<dd>{actor.deploymentPattern}</dd>

					{#if 'deploymentsCount' in actor && actor.deploymentsCount !== null}
						<dt>Deployments Count</dt>
						<dd>{actor.deploymentsCount.toLocaleString()}</dd>
					{/if}

					{#if 'deploySalt' in actor && actor.deploySalt}
						<dt>Deploy Salt</dt>
						<dd><code>{actor.deploySalt}</code></dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}

		{#if 'tokenStandard' in actor && actor.tokenStandard}
			<EntitySection
				title="Token Details"
				entityType="actor-token"
			>
				<dl>
					<dt>Token Standard</dt>
					<dd>{actor.tokenStandard}</dd>

					{#if 'symbol' in actor && actor.symbol}
						<dt>Symbol</dt>
						<dd>{actor.symbol}</dd>
					{/if}

					{#if 'name' in actor && actor.name}
						<dt>Name</dt>
						<dd>{actor.name}</dd>
					{/if}

					{#if 'decimals' in actor && actor.decimals !== null}
						<dt>Decimals</dt>
						<dd>{actor.decimals}</dd>
					{/if}

					{#if 'totalSupply' in actor && actor.totalSupply}
						<dt>Total Supply</dt>
						<dd>{actor.totalSupply}</dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}

		{#if 'exchangeType' in actor && actor.exchangeType}
			<EntitySection
				title="Exchange Details"
				entityType="actor-exchange"
			>
				<dl>
					<dt>Exchange Type</dt>
					<dd>{actor.exchangeType}</dd>

					{#if 'version' in actor && actor.version}
						<dt>Version</dt>
						<dd>{actor.version}</dd>
					{/if}
				</dl>

				{#if 'feeStructure' in actor && actor.feeStructure}
					<details>
						<summary><h3>Fee Structure</h3></summary>
						<dl>
							<dt>Trading Fee</dt>
							<dd>{actor.feeStructure.tradingFee}%</dd>

							<dt>Protocol Fee</dt>
							<dd>{actor.feeStructure.protocolFee}%</dd>
						</dl>
					</details>
				{/if}
			</EntitySection>
		{/if}

		{#if 'bridgeType' in actor && actor.bridgeType}
			<EntitySection
				title="Bridge Details"
				entityType="actor-bridge"
			>
				<dl>
					<dt>Bridge Type</dt>
					<dd>{actor.bridgeType}</dd>

					{#if 'bridgeVersion' in actor && actor.bridgeVersion}
						<dt>Bridge Version</dt>
						<dd>{actor.bridgeVersion}</dd>
					{/if}

					{#if 'securityModel' in actor && actor.securityModel}
						<dt>Security Model</dt>
						<dd>{actor.securityModel}</dd>
					{/if}
				</dl>

				{#if 'sourceChains' in actor && actor.sourceChains && actor.sourceChains.length > 0}
					<details>
						<summary><h3>Source Chains ({actor.sourceChains.length})</h3></summary>
						<ul>
							{#each actor.sourceChains as chainId}
								<li>Chain ID: {chainId}</li>
							{/each}
						</ul>
					</details>
				{/if}

				{#if 'targetChains' in actor && actor.targetChains && actor.targetChains.length > 0}
					<details>
						<summary><h3>Target Chains ({actor.targetChains.length})</h3></summary>
						<ul>
							{#each actor.targetChains as chainId}
								<li>Chain ID: {chainId}</li>
							{/each}
						</ul>
					</details>
				{/if}
			</EntitySection>
		{/if}

		{#if 'oracleType' in actor && actor.oracleType}
			<EntitySection
				title="Oracle Details"
				entityType="actor-oracle"
			>
				<dl>
					<dt>Oracle Type</dt>
					<dd>{actor.oracleType}</dd>

					{#if 'updateFrequency' in actor && actor.updateFrequency !== null}
						<dt>Update Frequency</dt>
						<dd>{actor.updateFrequency} seconds</dd>
					{/if}

					{#if 'aggregationMethod' in actor && actor.aggregationMethod}
						<dt>Aggregation Method</dt>
						<dd>{actor.aggregationMethod}</dd>
					{/if}
				</dl>

				{#if 'dataFeeds' in actor && actor.dataFeeds && actor.dataFeeds.length > 0}
					<details>
						<summary><h3>Data Feeds ({actor.dataFeeds.length})</h3></summary>
						<ul>
							{#each actor.dataFeeds as feed}
								<li>{feed}</li>
							{/each}
						</ul>
					</details>
				{/if}
			</EntitySection>
		{/if}
	{/if}

	<!-- Entity relationships -->
	{#if actor.$relatedContracts && actor.$relatedContracts.length > 0}
		<EntitySection
			title="Related Contracts"
			entityType="actor-related"
		>
			<ul>
				{#each actor.$relatedContracts as contract}
					<li>
						<a href="/actor/{contract.address}">{contract.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if actor.$createdContracts && actor.$createdContracts.length > 0}
		<EntitySection
			title="Created Contracts"
			entityType="actor-created"
		>
			<ul>
				{#each actor.$createdContracts as contract}
					<li>
						<a href="/actor/{contract.address}">{contract.address}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}
</Entity>
