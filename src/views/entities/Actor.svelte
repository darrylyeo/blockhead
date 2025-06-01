<script lang="ts">
	// Types/constants
	import type { Actor } from '$/entities/actor'
	import { ActorType, ContractTag, type ProxyType } from '$/entities/actor'
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
			<dd>
				{#if actor.address}
					<a href="/actor/{actor.address}">{actor.address}</a>
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Chain ID</dt>
			<dd>{actor.chainId ?? 'N/A'}</dd>

			<dt>Type</dt>
			<dd>{actor.type ?? 'Unknown'}</dd>

			{#if actor.labels && actor.labels.length > 0}
				<dt>Labels</dt>
				<dd>
					<ul>
						{#each actor.labels as label}
							<li>
								<strong>{label.name ?? 'Unknown'}</strong>
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
			{#if actor.balance !== undefined && actor.balance !== null}
				<dt>Balance</dt>
				<dd>{actor.balance} Wei</dd>
			{/if}

			{#if actor.balanceUsd !== undefined && actor.balanceUsd !== null}
				<dt>Balance USD</dt>
				<dd>${actor.balanceUsd?.toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Activity & Lifecycle"
		entityType="actor-activity"
	>
		<dl>
			{#if actor.firstSeenAt !== undefined && actor.firstSeenAt !== null}
				<dt>First Seen</dt>
				<dd>
					<time
						datetime={new Date(
							actor.firstSeenAt * 1000,
						).toISOString()}
						>{new Date(
							actor.firstSeenAt * 1000,
						)?.toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if actor.lastActiveAt !== undefined && actor.lastActiveAt !== null}
				<dt>Last Active</dt>
				<dd>
					<time
						datetime={new Date(
							actor.lastActiveAt * 1000,
						).toISOString()}
						>{new Date(
							actor.lastActiveAt * 1000,
						)?.toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if actor.transactionCount !== undefined && actor.transactionCount !== null}
				<dt>Transaction Count</dt>
				<dd>{actor.transactionCount?.toLocaleString()}</dd>
			{/if}

			{#if actor.internalTransactionCount !== undefined && actor.internalTransactionCount !== null}
				<dt>Internal Transaction Count</dt>
				<dd>{actor.internalTransactionCount?.toLocaleString()}</dd>
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

			{#if actor.securityScore !== undefined && actor.securityScore !== null}
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
							<strong>{audit.auditor ?? 'Unknown Auditor'}</strong> - 
							{#if audit.date !== undefined && audit.date !== null}
								{new Date(audit.date * 1000).toLocaleDateString()}
							{:else}
								N/A
							{/if}
							{#if audit.score !== undefined && audit.score !== null}
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
				{#if 'nonce' in actor && actor.nonce !== undefined && actor.nonce !== null}
					<dt>Nonce</dt>
					<dd>{actor.nonce}</dd>
				{/if}

				{#if 'isVerified' in actor && actor.isVerified !== undefined && actor.isVerified !== null}
					<dt>Verified</dt>
					<dd>{actor.isVerified ? 'Yes' : 'No'}</dd>
				{/if}

				{#if 'tags' in actor && actor.tags && actor.tags.length > 0}
					<dt>Tags</dt>
					<dd>
						<ul>
							{#each actor.tags as tag}
								<li>{tag ?? 'Unknown'}</li>
							{/each}
						</ul>
					</dd>
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

			{#if ('averageGasPrice' in actor && actor.averageGasPrice) || ('preferredGasLimit' in actor && actor.preferredGasLimit)}
				<details>
					<summary><h3>Transaction Patterns</h3></summary>
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
		</EntitySection>
	{/if}

	{#if actor.type === ActorType.Contract}
		<EntitySection
			title="Contract Details"
			entityType="actor-contract"
		>
			<dl>
				{#if 'bytecode' in actor && actor.bytecode}
					<dt>Bytecode</dt>
					<dd><code>{actor.bytecode}</code></dd>
				{/if}

				{#if 'creationTransaction' in actor && actor.creationTransaction}
					<dt>Creation Transaction</dt>
					<dd><a href="/transaction/{actor.creationTransaction}">{actor.creationTransaction}</a></dd>
				{/if}

				{#if 'creationBlock' in actor && actor.creationBlock !== undefined && actor.creationBlock !== null}
					<dt>Creation Block</dt>
					<dd><a href="/block/{actor.creationBlock}">{actor.creationBlock?.toLocaleString()}</a></dd>
				{/if}

				{#if 'isVerified' in actor && actor.isVerified !== undefined && actor.isVerified !== null}
					<dt>Verified</dt>
					<dd>{actor.isVerified ? 'Yes' : 'No'}</dd>
				{/if}

				{#if 'bytecodeSize' in actor && actor.bytecodeSize !== undefined && actor.bytecodeSize !== null}
					<dt>Bytecode Size</dt>
					<dd>{actor.bytecodeSize?.toLocaleString()} bytes</dd>
				{/if}

				{#if 'hasSource' in actor && actor.hasSource !== undefined && actor.hasSource !== null}
					<dt>Has Source</dt>
					<dd>{actor.hasSource ? 'Yes' : 'No'}</dd>
				{/if}

				{#if 'verificationDate' in actor && actor.verificationDate !== undefined && actor.verificationDate !== null}
					<dt>Verification Date</dt>
					<dd>
						<time datetime={new Date(actor.verificationDate * 1000).toISOString()}>
							{new Date(actor.verificationDate * 1000)?.toLocaleString()}
						</time>
					</dd>
				{/if}

				{#if 'verificationMethod' in actor && actor.verificationMethod}
					<dt>Verification Method</dt>
					<dd>{actor.verificationMethod}</dd>
				{/if}
			</dl>

			{#if 'tags' in actor && actor.tags && actor.tags.length > 0}
				<details>
					<summary><h3>Contract Tags ({actor.tags.length})</h3></summary>
					<ul>
						{#each actor.tags as tag}
							<li>{tag ?? 'Unknown'}</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if 'standards' in actor && actor.standards && actor.standards.length > 0}
				<details>
					<summary><h3>Contract Standards ({actor.standards.length})</h3></summary>
					<ul>
						{#each actor.standards as standard}
							<li>{standard ?? 'Unknown'}</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if 'proxyType' in actor && actor.proxyType}
				<details>
					<summary><h3>Proxy Details</h3></summary>
					<dl>
						<dt>Proxy Type</dt>
						<dd>{actor.proxyType}</dd>

						{#if 'isUpgradable' in actor && actor.isUpgradable !== undefined && actor.isUpgradable !== null}
							<dt>Upgradable</dt>
							<dd>{actor.isUpgradable ? 'Yes' : 'No'}</dd>
						{/if}

						{#if 'upgradeHistory' in actor && actor.upgradeHistory && actor.upgradeHistory.length > 0}
							<dt>Upgrade History</dt>
							<dd>
								<ul>
									{#each actor.upgradeHistory as upgrade}
										<li>
											{#if upgrade.timestamp !== undefined && upgrade.timestamp !== null}
												<time datetime={new Date(upgrade.timestamp * 1000).toISOString()}>
													{new Date(upgrade.timestamp * 1000)?.toLocaleString()}
												</time>
											{:else}
												Unknown time
											{/if}
											- From 
											{#if upgrade.oldImplementation}
												<a href="/address/{upgrade.oldImplementation}">{upgrade.oldImplementation}</a>
											{:else}
												N/A
											{/if}
											to 
											{#if upgrade.newImplementation}
												<a href="/address/{upgrade.newImplementation}">{upgrade.newImplementation}</a>
											{:else}
												N/A
											{/if}
										</li>
									{/each}
								</ul>
							</dd>
						{/if}
					</dl>
				</details>
			{/if}

			{#if 'protocolName' in actor && actor.protocolName}
				<details>
					<summary><h3>Protocol Information</h3></summary>
					<dl>
						<dt>Protocol Name</dt>
						<dd>{actor.protocolName}</dd>

						{#if 'protocolVersion' in actor && actor.protocolVersion}
							<dt>Protocol Version</dt>
							<dd>{actor.protocolVersion}</dd>
						{/if}

						{#if 'protocolRole' in actor && actor.protocolRole}
							<dt>Protocol Role</dt>
							<dd>{actor.protocolRole}</dd>
						{/if}
					</dl>
				</details>
			{/if}
		</EntitySection>

		<!-- Conditional sections for specific contract tags -->
		{#if 'tags' in actor && actor.tags?.includes(ContractTag.Multisig) && 'signers' in actor}
			<EntitySection
				title="Multisig Details"
				entityType="actor-multisig"
			>
				<dl>
					{#if actor.signers && actor.signers.length > 0}
						<dt>Signers</dt>
						<dd>
							<ul>
								{#each actor.signers as signer}
									<li>
										{#if signer}
											<a href="/address/{signer}">{signer}</a>
										{:else}
											N/A
										{/if}
									</li>
								{/each}
							</ul>
						</dd>
					{/if}

					{#if 'threshold' in actor && actor.threshold !== undefined && actor.threshold !== null}
						<dt>Threshold</dt>
						<dd>{actor.threshold}</dd>
					{/if}

					{#if 'multisigType' in actor && actor.multisigType}
						<dt>Multisig Type</dt>
						<dd>{actor.multisigType}</dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}

		{#if 'tags' in actor && actor.tags?.includes(ContractTag.Factory) && 'deploymentPattern' in actor}
			<EntitySection
				title="Factory Details"
				entityType="actor-factory"
			>
				<dl>
					{#if 'deploymentPattern' in actor && actor.deploymentPattern}
						<dt>Deployment Pattern</dt>
						<dd>{actor.deploymentPattern}</dd>
					{/if}

					{#if 'deploymentsCount' in actor && actor.deploymentsCount !== undefined && actor.deploymentsCount !== null}
						<dt>Deployments Count</dt>
						<dd>{actor.deploymentsCount?.toLocaleString()}</dd>
					{/if}

					{#if 'deploySalt' in actor && actor.deploySalt}
						<dt>Deploy Salt</dt>
						<dd><code>{actor.deploySalt}</code></dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}

		{#if 'tags' in actor && actor.tags?.includes(ContractTag.Token) && 'tokenStandard' in actor}
			<EntitySection
				title="Token Details"
				entityType="actor-token"
			>
				<dl>
					{#if 'tokenStandard' in actor && actor.tokenStandard}
						<dt>Token Standard</dt>
						<dd>{actor.tokenStandard}</dd>
					{/if}

					{#if 'symbol' in actor && actor.symbol}
						<dt>Symbol</dt>
						<dd>{actor.symbol}</dd>
					{/if}

					{#if 'name' in actor && actor.name}
						<dt>Name</dt>
						<dd>{actor.name}</dd>
					{/if}

					{#if 'decimals' in actor && actor.decimals !== undefined && actor.decimals !== null}
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

		{#if 'tags' in actor && actor.tags?.includes(ContractTag.Exchange) && 'exchangeType' in actor}
			<EntitySection
				title="Exchange Details"
				entityType="actor-exchange"
			>
				<dl>
					{#if 'exchangeType' in actor && actor.exchangeType}
						<dt>Exchange Type</dt>
						<dd>{actor.exchangeType}</dd>
					{/if}

					{#if 'version' in actor && actor.version}
						<dt>Version</dt>
						<dd>{actor.version}</dd>
					{/if}

					{#if 'feeStructure' in actor && actor.feeStructure}
						<dt>Fee Structure</dt>
						<dd>
							Trading Fee: {actor.feeStructure.tradingFee ?? 'N/A'}%,
							Protocol Fee: {actor.feeStructure.protocolFee ?? 'N/A'}%
						</dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}

		{#if 'tags' in actor && actor.tags?.includes(ContractTag.Bridge) && 'bridgeType' in actor}
			<EntitySection
				title="Bridge Details"
				entityType="actor-bridge"
			>
				<dl>
					{#if 'bridgeType' in actor && actor.bridgeType}
						<dt>Bridge Type</dt>
						<dd>{actor.bridgeType}</dd>
					{/if}

					{#if 'sourceChains' in actor && actor.sourceChains && actor.sourceChains.length > 0}
						<dt>Source Chains</dt>
						<dd>
							<ul>
								{#each actor.sourceChains as chainId}
									<li>Chain {chainId ?? 'Unknown'}</li>
								{/each}
							</ul>
						</dd>
					{/if}

					{#if 'targetChains' in actor && actor.targetChains && actor.targetChains.length > 0}
						<dt>Target Chains</dt>
						<dd>
							<ul>
								{#each actor.targetChains as chainId}
									<li>Chain {chainId ?? 'Unknown'}</li>
								{/each}
							</ul>
						</dd>
					{/if}

					{#if 'bridgeVersion' in actor && actor.bridgeVersion}
						<dt>Bridge Version</dt>
						<dd>{actor.bridgeVersion}</dd>
					{/if}

					{#if 'securityModel' in actor && actor.securityModel}
						<dt>Security Model</dt>
						<dd>{actor.securityModel}</dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}

		{#if 'tags' in actor && actor.tags?.includes(ContractTag.Oracle) && 'oracleType' in actor}
			<EntitySection
				title="Oracle Details"
				entityType="actor-oracle"
			>
				<dl>
					{#if 'oracleType' in actor && actor.oracleType}
						<dt>Oracle Type</dt>
						<dd>{actor.oracleType}</dd>
					{/if}

					{#if 'dataFeeds' in actor && actor.dataFeeds && actor.dataFeeds.length > 0}
						<dt>Data Feeds</dt>
						<dd>
							<ul>
								{#each actor.dataFeeds as feed}
									<li>{feed ?? 'Unknown'}</li>
								{/each}
							</ul>
						</dd>
					{/if}

					{#if 'updateFrequency' in actor && actor.updateFrequency !== undefined && actor.updateFrequency !== null}
						<dt>Update Frequency</dt>
						<dd>{actor.updateFrequency} seconds</dd>
					{/if}

					{#if 'aggregationMethod' in actor && actor.aggregationMethod}
						<dt>Aggregation Method</dt>
						<dd>{actor.aggregationMethod}</dd>
					{/if}
				</dl>
			</EntitySection>
		{/if}
	{/if}

	<!-- References section -->
	<EntitySection
		title="References"
		entityType="actor-references"
	>
		{#if actor._relatedContracts && actor._relatedContracts.length > 0}
			<details>
				<summary><h3>Related Contracts ({actor._relatedContracts.length})</h3></summary>
				<ul>
					{#each actor._relatedContracts as contract}
						<li>
							{#if contract.address}
								<a href="/address/{contract.address}">{contract.address}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if actor._createdContracts && actor._createdContracts.length > 0}
			<details>
				<summary><h3>Created Contracts ({actor._createdContracts.length})</h3></summary>
				<ul>
					{#each actor._createdContracts as contract}
						<li>
							{#if contract.address}
								<a href="/address/{contract.address}">{contract.address}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if actor._controlledBy}
			<details>
				<summary><h3>Controlled By</h3></summary>
				{#if actor._controlledBy.address}
					<a href="/address/{actor._controlledBy.address}">{actor._controlledBy.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if actor._controls && actor._controls.length > 0}
			<details>
				<summary><h3>Controls ({actor._controls.length})</h3></summary>
				<ul>
					{#each actor._controls as controlled}
						<li>
							{#if controlled.address}
								<a href="/address/{controlled.address}">{controlled.address}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if actor._creator}
			<details>
				<summary><h3>Creator</h3></summary>
				{#if actor._creator.address}
					<a href="/address/{actor._creator.address}">{actor._creator.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if actor._implementation}
			<details>
				<summary><h3>Implementation</h3></summary>
				{#if actor._implementation.address}
					<a href="/address/{actor._implementation.address}">{actor._implementation.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if actor._admin}
			<details>
				<summary><h3>Admin</h3></summary>
				{#if actor._admin.address}
					<a href="/address/{actor._admin.address}">{actor._admin.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if actor._templateContract}
			<details>
				<summary><h3>Template Contract</h3></summary>
				{#if actor._templateContract.address}
					<a href="/address/{actor._templateContract.address}">{actor._templateContract.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if actor._transactions && actor._transactions.length > 0}
			<details>
				<summary><h3>Recent Transactions ({actor._transactions.length})</h3></summary>
				<ul>
					{#each actor._transactions.slice(0, 10) as transaction}
						<li>
							{#if transaction.id}
								<a href="/transaction/{transaction.id}">{transaction.id}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
					{#if actor._transactions.length > 10}
						<li>... and {actor._transactions.length - 10} more</li>
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

	code {
		font-family: monospace;
		background: light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.05));
		padding: 2px 4px;
		border-radius: 3px;
		white-space: pre-wrap;
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
