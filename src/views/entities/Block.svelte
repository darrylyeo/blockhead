<script lang="ts">
	// Types/constants
	import type { Block } from '$/entities/block'
	import { BlockRole, BlockStatus, ConsensusType } from '$/entities/block'
	import { EntityType } from '$/entities'

	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'

	// Props
	let { block }: { block: Block } = $props()
</script>

<Entity
	type={EntityType.Block}
	id={`${block.chainId}:${block.blockNumber ?? block.blockHash}`}
	title={`Block #${block.blockNumber ?? block.blockHash}`}
	annotation={`${block.role} Block`}
>
	<EntitySection title="Basic Information" entityType="block-basic">
		<dl>
			<dt>Block Number</dt>
			<dd>
				{#if block.blockNumber !== undefined && block.blockNumber !== null}
					<a href="/block/{block.blockNumber}">{block.blockNumber?.toLocaleString()}</a>
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Block Hash</dt>
			<dd>
				{#if block.blockHash}
					<a href="/block/{block.blockHash}">{block.blockHash}</a>
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Chain ID</dt>
			<dd>{block.chainId ?? 'N/A'}</dd>

			<dt>Role</dt>
			<dd class="role {block.role?.toLowerCase()}">
				{block.role ?? 'Unknown'}
			</dd>

			<dt>Status</dt>
			<dd class="status {block.status?.toLowerCase()}">
				{block.status ?? 'Unknown'}
			</dd>

			<dt>Consensus Type</dt>
			<dd>{block.consensusType ?? 'N/A'}</dd>

			<dt>Size</dt>
			<dd>
				{#if block.size !== undefined && block.size !== null}
					{block.size?.toLocaleString()} bytes
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Parent Hash</dt>
			<dd>
				{#if block.parentHash}
					<a href="/block/{block.parentHash}">{block.parentHash}</a>
				{:else}
					N/A
				{/if}
			</dd>

			<dt>State Root</dt>
			<dd>{block.stateRoot ?? 'N/A'}</dd>

			<dt>Transactions Root</dt>
			<dd>{block.transactionsRoot ?? 'N/A'}</dd>

			<dt>Receipts Root</dt>
			<dd>{block.receiptsRoot ?? 'N/A'}</dd>

			{#if block.extraData}
				<dt>Extra Data</dt>
				<dd><code>{block.extraData}</code></dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection title="Timing" entityType="block-timing">
		<dl>
			<dt>Timestamp</dt>
			<dd>
				{#if block.timestamp !== undefined && block.timestamp !== null}
					<time datetime={new Date(block.timestamp * 1000).toISOString()}>
						{new Date(block.timestamp * 1000)?.toLocaleString()}
					</time>
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Mined At</dt>
			<dd>
				{#if block.minedAt !== undefined && block.minedAt !== null}
					<time datetime={new Date(block.minedAt * 1000).toISOString()}>
						{new Date(block.minedAt * 1000)?.toLocaleString()}
					</time>
				{:else}
					N/A
				{/if}
			</dd>

			{#if block.receivedAt !== undefined && block.receivedAt !== null}
				<dt>Received At</dt>
				<dd>
					<time datetime={new Date(block.receivedAt * 1000).toISOString()}>
						{new Date(block.receivedAt * 1000)?.toLocaleString()}
					</time>
				</dd>
			{/if}

			{#if block.propagationTime !== undefined && block.propagationTime !== null}
				<dt>Propagation Time</dt>
				<dd>{block.propagationTime}ms</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection title="Gas & Economics" entityType="block-gas">
		<dl>
			<dt>Gas Limit</dt>
			<dd>
				{#if block.gasLimit !== undefined && block.gasLimit !== null}
					{block.gasLimit?.toLocaleString()}
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Gas Used</dt>
			<dd>
				{#if block.gasUsed !== undefined && block.gasUsed !== null}
					{block.gasUsed?.toLocaleString()}
				{:else}
					N/A
				{/if}
			</dd>

			<dt>Gas Used Percentage</dt>
			<dd>
				{#if block.gasUsedPercentage !== undefined && block.gasUsedPercentage !== null}
					{block.gasUsedPercentage.toFixed(2)}%
				{:else}
					N/A
				{/if}
			</dd>

			{#if block.baseFeePerGas !== undefined && block.baseFeePerGas !== null}
				<dt>Base Fee Per Gas</dt>
				<dd>{block.baseFeePerGas} wei</dd>
			{/if}

			{#if block.burntFees}
				<dt>Burnt Fees</dt>
				<dd>{block.burntFees}</dd>
			{/if}

			{#if block.minerReward}
				<dt>Miner Reward</dt>
				<dd>{block.minerReward}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection title="Transactions" entityType="block-transactions">
		<dl>
			<dt>Transaction Count</dt>
			<dd>
				{#if block.transactionCount !== undefined && block.transactionCount !== null}
					{block.transactionCount?.toLocaleString()}
				{:else}
					N/A
				{/if}
			</dd>

			{#if block.internalTransactionCount !== undefined && block.internalTransactionCount !== null}
				<dt>Internal Transaction Count</dt>
				<dd>{block.internalTransactionCount?.toLocaleString()}</dd>
			{/if}
		</dl>

		{#if block.transactions && block.transactions.length > 0}
			<details>
				<summary><h3>Transaction Details ({block.transactions.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Hash</th>
							<th>From</th>
							<th>To</th>
							<th>Value</th>
							<th>Type</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{#each block.transactions as tx}
							<tr>
								<td>
									{#if tx.hash}
										<a href="/transaction/{tx.hash}">{tx.hash}</a>
									{:else}
										N/A
									{/if}
								</td>
								<td>
									{#if tx.from}
										<a href="/address/{tx.from}">{tx.from}</a>
									{:else}
										N/A
									{/if}
								</td>
								<td>
									{#if tx.to}
										<a href="/address/{tx.to}">{tx.to}</a>
									{:else}
										<em>Contract Creation</em>
									{/if}
								</td>
								<td>{tx.value ?? 'N/A'}</td>
								<td>{tx.type ?? 'N/A'}</td>
								<td class="status {tx.status ? 'success' : 'failed'}">
									{#if tx.status !== undefined && tx.status !== null}
										{tx.status ? 'Success' : 'Failed'}
									{:else}
										N/A
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	{#if (block.difficulty !== undefined && block.difficulty !== null) || (block.totalDifficulty !== undefined && block.totalDifficulty !== null) || block.nonce}
		<EntitySection title="Consensus Data" entityType="block-consensus">
			<dl>
				{#if block.difficulty !== undefined && block.difficulty !== null}
					<dt>Difficulty</dt>
					<dd>{block.difficulty}</dd>
				{/if}

				{#if block.totalDifficulty !== undefined && block.totalDifficulty !== null}
					<dt>Total Difficulty</dt>
					<dd>{block.totalDifficulty}</dd>
				{/if}

				{#if block.nonce}
					<dt>Nonce</dt>
					<dd>{block.nonce}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if block.characteristics}
		<EntitySection title="Block Characteristics" entityType="block-characteristics">
			<dl>
				<dt>Genesis Block</dt>
				<dd>{block.characteristics.isGenesis ? 'Yes' : 'No'}</dd>

				<dt>Empty Block</dt>
				<dd>{block.characteristics.isEmpty ? 'Yes' : 'No'}</dd>

				<dt>Fork Block</dt>
				<dd>{block.characteristics.isFork ? 'Yes' : 'No'}</dd>

				<dt>Merge Block</dt>
				<dd>{block.characteristics.isMerge ? 'Yes' : 'No'}</dd>

				<dt>Shanghai Block</dt>
				<dd>{block.characteristics.isShanghai ? 'Yes' : 'No'}</dd>

				<dt>Cancun Block</dt>
				<dd>{block.characteristics.isCancun ? 'Yes' : 'No'}</dd>

				<dt>Dencun Block</dt>
				<dd>{block.characteristics.isDencun ? 'Yes' : 'No'}</dd>

				<dt>Has Uncles</dt>
				<dd>{block.characteristics.hasUncles ? 'Yes' : 'No'}</dd>

				<dt>Has Reorg</dt>
				<dd>{block.characteristics.hasReorg ? 'Yes' : 'No'}</dd>

				<dt>Has Blobs</dt>
				<dd>{block.characteristics.hasBlobs ? 'Yes' : 'No'}</dd>

				<dt>Has Beacon Roots</dt>
				<dd>{block.characteristics.hasBeaconRoots ? 'Yes' : 'No'}</dd>

				<dt>Has Withdrawals</dt>
				<dd>{block.characteristics.hasWithdrawals ? 'Yes' : 'No'}</dd>
			</dl>
		</EntitySection>
	{/if}

	<!-- Role-specific sections -->
	{#if block.role === BlockRole.Canonical && 'confirmations' in block}
		<EntitySection title="Canonical Block Data" entityType="block-canonical">
			<dl>
				<dt>Confirmations</dt>
				<dd>
					{#if block.confirmations !== undefined && block.confirmations !== null}
						{block.confirmations?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Finalized</dt>
				<dd>
					{#if block.isFinalized !== undefined && block.isFinalized !== null}
						{block.isFinalized ? 'Yes' : 'No'}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Chain Tip Distance</dt>
				<dd>
					{#if block.chainTipDistance !== undefined && block.chainTipDistance !== null}
						{block.chainTipDistance}
					{:else}
						N/A
					{/if}
				</dd>

				{#if block.cumulativeGasUsed !== undefined && block.cumulativeGasUsed !== null}
					<dt>Cumulative Gas Used</dt>
					<dd>{block.cumulativeGasUsed}</dd>
				{/if}

				{#if block.cumulativeDifficulty !== undefined && block.cumulativeDifficulty !== null}
					<dt>Cumulative Difficulty</dt>
					<dd>{block.cumulativeDifficulty}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if block.role === BlockRole.Uncle && 'unclePosition' in block}
		<EntitySection title="Uncle Block Data" entityType="block-uncle">
			<dl>
				<dt>Uncle Position</dt>
				<dd>
					{#if block.unclePosition !== undefined && block.unclePosition !== null}
						{block.unclePosition}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Uncle Hash</dt>
				<dd>{block.uncleHash ?? 'N/A'}</dd>

				<dt>Nephew Hash</dt>
				<dd>
					{#if block.nephewHash}
						<a href="/block/{block.nephewHash}">{block.nephewHash}</a>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Nephew Number</dt>
				<dd>
					{#if block.nephewNumber !== undefined && block.nephewNumber !== null}
						<a href="/block/{block.nephewNumber}">{block.nephewNumber?.toLocaleString()}</a>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Uncle Miner</dt>
				<dd>
					{#if block.uncleMiner}
						<a href="/address/{block.uncleMiner}">{block.uncleMiner}</a>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Uncle Reward</dt>
				<dd>{block.uncleReward ?? 'N/A'}</dd>

				<dt>Uncle Height</dt>
				<dd>
					{#if block.uncleHeight !== undefined && block.uncleHeight !== null}
						{block.uncleHeight} blocks behind
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Inclusion Delay</dt>
				<dd>
					{#if block.inclusionDelay !== undefined && block.inclusionDelay !== null}
						{block.inclusionDelay} blocks
					{:else}
						N/A
					{/if}
				</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if block.role === BlockRole.Orphaned && 'orphanedReason' in block}
		<EntitySection title="Orphaned Block Data" entityType="block-orphaned">
			<dl>
				<dt>Orphaned Reason</dt>
				<dd>{block.orphanedReason ?? 'N/A'}</dd>

				{#if block.canonicalBlockHash}
					<dt>Canonical Block Hash</dt>
					<dd><a href="/block/{block.canonicalBlockHash}">{block.canonicalBlockHash}</a></dd>
				{/if}

				{#if block.forkLength !== undefined && block.forkLength !== null}
					<dt>Fork Length</dt>
					<dd>{block.forkLength} blocks</dd>
				{/if}
			</dl>

			{#if block.competingBlocks && block.competingBlocks.length > 0}
				<details>
					<summary><h3>Competing Blocks ({block.competingBlocks.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Hash</th>
								<th>Miner</th>
								<th>Total Difficulty</th>
							</tr>
						</thead>
						<tbody>
							{#each block.competingBlocks as competing}
								<tr>
									<td>
										{#if competing.hash}
											<a href="/block/{competing.hash}">{competing.hash}</a>
										{:else}
											N/A
										{/if}
									</td>
									<td>
										{#if competing.miner}
											<a href="/address/{competing.miner}">{competing.miner}</a>
										{:else}
											N/A
										{/if}
									</td>
									<td>{competing.totalDifficulty ?? 'N/A'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if block.role === BlockRole.Pending && 'estimatedConfirmationTime' in block}
		<EntitySection title="Pending Block Data" entityType="block-pending">
			<dl>
				{#if block.estimatedConfirmationTime !== undefined && block.estimatedConfirmationTime !== null}
					<dt>Estimated Confirmation Time</dt>
					<dd>{block.estimatedConfirmationTime}ms</dd>
				{/if}

				{#if block.replacementRisk !== undefined && block.replacementRisk !== null}
					<dt>Replacement Risk</dt>
					<dd>{block.replacementRisk}%</dd>
				{/if}

				{#if block.mempoolEntryTime !== undefined && block.mempoolEntryTime !== null}
					<dt>Mempool Entry Time</dt>
					<dd>
						<time datetime={new Date(block.mempoolEntryTime * 1000).toISOString()}>
							{new Date(block.mempoolEntryTime * 1000)?.toLocaleString()}
						</time>
					</dd>
				{/if}

				{#if block.priorityScore !== undefined && block.priorityScore !== null}
					<dt>Priority Score</dt>
					<dd>{block.priorityScore}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Genesis data -->
	{#if block.genesisData}
		<EntitySection title="Genesis Block Data" entityType="block-genesis">
			<dl>
				<dt>Chain Name</dt>
				<dd>{block.genesisData.chainName ?? 'N/A'}</dd>

				<dt>Chain Version</dt>
				<dd>{block.genesisData.chainVersion ?? 'N/A'}</dd>

				<dt>Protocol Version</dt>
				<dd>{block.genesisData.protocolVersion ?? 'N/A'}</dd>

				<dt>Initial Supply</dt>
				<dd>{block.genesisData.initialSupply ?? 'N/A'}</dd>

				<dt>Genesis Time</dt>
				<dd>
					{#if block.genesisData.genesisTime !== undefined && block.genesisData.genesisTime !== null}
						<time datetime={new Date(block.genesisData.genesisTime * 1000).toISOString()}>
							{new Date(block.genesisData.genesisTime * 1000)?.toLocaleString()}
						</time>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Genesis Nonce</dt>
				<dd>{block.genesisData.genesisNonce ?? 'N/A'}</dd>

				<dt>Genesis Difficulty</dt>
				<dd>{block.genesisData.genesisDifficulty ?? 'N/A'}</dd>
			</dl>

			{#if block.genesisData.premine && block.genesisData.premine.length > 0}
				<details>
					<summary><h3>Premine Allocations ({block.genesisData.premine.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>Address</th>
								<th>Balance</th>
							</tr>
						</thead>
						<tbody>
							{#each block.genesisData.premine as allocation}
								<tr>
									<td>
										{#if allocation.address}
											<a href="/address/{allocation.address}">{allocation.address}</a>
										{:else}
											N/A
										{/if}
									</td>
									<td>{allocation.balance ?? 'N/A'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}

			{#if block.genesisData.chainConfig}
				<details>
					<summary><h3>Chain Configuration</h3></summary>
					<dl>
						<dt>Chain ID</dt>
						<dd>{block.genesisData.chainConfig.chainId ?? 'N/A'}</dd>

						{#if block.genesisData.chainConfig.homesteadBlock !== undefined && block.genesisData.chainConfig.homesteadBlock !== null}
							<dt>Homestead Block</dt>
							<dd>{block.genesisData.chainConfig.homesteadBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.daoForkBlock !== undefined && block.genesisData.chainConfig.daoForkBlock !== null}
							<dt>DAO Fork Block</dt>
							<dd>{block.genesisData.chainConfig.daoForkBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.eip150Block !== undefined && block.genesisData.chainConfig.eip150Block !== null}
							<dt>EIP-150 Block</dt>
							<dd>{block.genesisData.chainConfig.eip150Block?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.eip155Block !== undefined && block.genesisData.chainConfig.eip155Block !== null}
							<dt>EIP-155 Block</dt>
							<dd>{block.genesisData.chainConfig.eip155Block?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.byzantiumBlock !== undefined && block.genesisData.chainConfig.byzantiumBlock !== null}
							<dt>Byzantium Block</dt>
							<dd>{block.genesisData.chainConfig.byzantiumBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.constantinopleBlock !== undefined && block.genesisData.chainConfig.constantinopleBlock !== null}
							<dt>Constantinople Block</dt>
							<dd>{block.genesisData.chainConfig.constantinopleBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.petersburgBlock !== undefined && block.genesisData.chainConfig.petersburgBlock !== null}
							<dt>Petersburg Block</dt>
							<dd>{block.genesisData.chainConfig.petersburgBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.istanbulBlock !== undefined && block.genesisData.chainConfig.istanbulBlock !== null}
							<dt>Istanbul Block</dt>
							<dd>{block.genesisData.chainConfig.istanbulBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.berlinBlock !== undefined && block.genesisData.chainConfig.berlinBlock !== null}
							<dt>Berlin Block</dt>
							<dd>{block.genesisData.chainConfig.berlinBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.londonBlock !== undefined && block.genesisData.chainConfig.londonBlock !== null}
							<dt>London Block</dt>
							<dd>{block.genesisData.chainConfig.londonBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.parisBlock !== undefined && block.genesisData.chainConfig.parisBlock !== null}
							<dt>Paris Block (The Merge)</dt>
							<dd>{block.genesisData.chainConfig.parisBlock?.toLocaleString()}</dd>
						{/if}

						{#if block.genesisData.chainConfig.shanghaiTime !== undefined && block.genesisData.chainConfig.shanghaiTime !== null}
							<dt>Shanghai Time</dt>
							<dd>
								<time datetime={new Date(block.genesisData.chainConfig.shanghaiTime * 1000).toISOString()}>
									{new Date(block.genesisData.chainConfig.shanghaiTime * 1000)?.toLocaleString()}
								</time>
							</dd>
						{/if}

						{#if block.genesisData.chainConfig.cancunTime !== undefined && block.genesisData.chainConfig.cancunTime !== null}
							<dt>Cancun Time</dt>
							<dd>
								<time datetime={new Date(block.genesisData.chainConfig.cancunTime * 1000).toISOString()}>
									{new Date(block.genesisData.chainConfig.cancunTime * 1000)?.toLocaleString()}
								</time>
							</dd>
						{/if}
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Fork data -->
	{#if block.forkData}
		<EntitySection title="Fork Data" entityType="block-fork">
			<dl>
				<dt>Fork Type</dt>
				<dd>{block.forkData.forkType ?? 'N/A'}</dd>

				{#if block.forkData.forkName}
					<dt>Fork Name</dt>
					<dd>{block.forkData.forkName}</dd>
				{/if}

				<dt>Fork Height</dt>
				<dd>
					{#if block.forkData.forkHeight !== undefined && block.forkData.forkHeight !== null}
						{block.forkData.forkHeight?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				{#if block.forkData.activationHeight !== undefined && block.forkData.activationHeight !== null}
					<dt>Activation Height</dt>
					<dd>{block.forkData.activationHeight?.toLocaleString()}</dd>
				{/if}

				{#if block.forkData.supportPercentage !== undefined && block.forkData.supportPercentage !== null}
					<dt>Support Percentage</dt>
					<dd>{block.forkData.supportPercentage}%</dd>
				{/if}

				{#if block.forkData.oppositionBlocks !== undefined && block.forkData.oppositionBlocks !== null}
					<dt>Opposition Blocks</dt>
					<dd>{block.forkData.oppositionBlocks}</dd>
				{/if}

				{#if block.forkData.consensusReached !== undefined && block.forkData.consensusReached !== null}
					<dt>Consensus Reached</dt>
					<dd>{block.forkData.consensusReached ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>

			{#if block.forkData.protocolChanges && block.forkData.protocolChanges.length > 0}
				<details>
					<summary><h3>Protocol Changes ({block.forkData.protocolChanges.length})</h3></summary>
					<table>
						<thead>
							<tr>
								<th>EIP</th>
								<th>Name</th>
								<th>Description</th>
								<th>Impact</th>
							</tr>
						</thead>
						<tbody>
							{#each block.forkData.protocolChanges as change}
								<tr>
									<td>{change.eip ?? 'N/A'}</td>
									<td>{change.name ?? 'N/A'}</td>
									<td>{change.description ?? 'N/A'}</td>
									<td class="impact {change.impact}">{change.impact ?? 'N/A'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Reorg data -->
	{#if block.reorgData}
		<EntitySection title="Reorg Data" entityType="block-reorg">
			<dl>
				<dt>Reorg Depth</dt>
				<dd>
					{#if block.reorgData.reorgDepth !== undefined && block.reorgData.reorgDepth !== null}
						{block.reorgData.reorgDepth} blocks
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Canonical Hash</dt>
				<dd>
					{#if block.reorgData.canonicalHash}
						<a href="/block/{block.reorgData.canonicalHash}">{block.reorgData.canonicalHash}</a>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Reorged Hash</dt>
				<dd>
					{#if block.reorgData.reorgedHash}
						<a href="/block/{block.reorgData.reorgedHash}">{block.reorgData.reorgedHash}</a>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Common Ancestor</dt>
				<dd>
					{#if block.reorgData.commonAncestor !== undefined && block.reorgData.commonAncestor !== null}
						<a href="/block/{block.reorgData.commonAncestor}">{block.reorgData.commonAncestor?.toLocaleString()}</a>
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Total Value Affected</dt>
				<dd>{block.reorgData.totalValueAffected ?? 'N/A'}</dd>

				<dt>Accounts Affected</dt>
				<dd>
					{#if block.reorgData.accountsAffected !== undefined && block.reorgData.accountsAffected !== null}
						{block.reorgData.accountsAffected?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				{#if block.reorgData.reorgCause}
					<dt>Reorg Cause</dt>
					<dd>{block.reorgData.reorgCause}</dd>
				{/if}
			</dl>

			{#if block.reorgData.droppedTransactions && block.reorgData.droppedTransactions.length > 0}
				<details>
					<summary><h3>Dropped Transactions ({block.reorgData.droppedTransactions.length})</h3></summary>
					<ul>
						{#each block.reorgData.droppedTransactions as txHash}
							<li>
								{#if txHash}
									<a href="/transaction/{txHash}">{txHash}</a>
								{:else}
									N/A
								{/if}
							</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if block.reorgData.replayedTransactions && block.reorgData.replayedTransactions.length > 0}
				<details>
					<summary><h3>Replayed Transactions ({block.reorgData.replayedTransactions.length})</h3></summary>
					<ul>
						{#each block.reorgData.replayedTransactions as txHash}
							<li>
								{#if txHash}
									<a href="/transaction/{txHash}">{txHash}</a>
								{:else}
									N/A
								{/if}
							</li>
						{/each}
					</ul>
				</details>
			{/if}

			{#if block.reorgData.minersInvolved && block.reorgData.minersInvolved.length > 0}
				<details>
					<summary><h3>Miners Involved ({block.reorgData.minersInvolved.length})</h3></summary>
					<ul>
						{#each block.reorgData.minersInvolved as miner}
							<li>
								{#if miner}
									<a href="/address/{miner}">{miner}</a>
								{:else}
									N/A
								{/if}
							</li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Merge data -->
	{#if block.mergeData}
		<EntitySection title="Merge Transition Data" entityType="block-merge">
			<dl>
				<dt>Transition Type</dt>
				<dd>{block.mergeData.transitionType ?? 'N/A'}</dd>

				{#if block.mergeData.executionPayload}
					<dt>Execution Payload</dt>
					<dd>{block.mergeData.executionPayload}</dd>
				{/if}

				{#if block.mergeData.powDifficulty}
					<dt>PoW Difficulty</dt>
					<dd>{block.mergeData.powDifficulty}</dd>
				{/if}

				{#if block.mergeData.posEpoch !== undefined && block.mergeData.posEpoch !== null}
					<dt>PoS Epoch</dt>
					<dd>{block.mergeData.posEpoch}</dd>
				{/if}

				{#if block.mergeData.validatorCount !== undefined && block.mergeData.validatorCount !== null}
					<dt>Validator Count</dt>
					<dd>{block.mergeData.validatorCount?.toLocaleString()}</dd>
				{/if}

				{#if block.mergeData.stakingRatio !== undefined && block.mergeData.stakingRatio !== null}
					<dt>Staking Ratio</dt>
					<dd>{block.mergeData.stakingRatio}%</dd>
				{/if}

				<dt>Issuance Reduction</dt>
				<dd>
					{#if block.mergeData.issuanceReduction !== undefined && block.mergeData.issuanceReduction !== null}
						{block.mergeData.issuanceReduction}%
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Energy Reduction</dt>
				<dd>
					{#if block.mergeData.energyReduction !== undefined && block.mergeData.energyReduction !== null}
						{block.mergeData.energyReduction}%
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Security Model</dt>
				<dd>{block.mergeData.securityModel ?? 'N/A'}</dd>
			</dl>
		</EntitySection>
	{/if}

	<!-- MEV data -->
	{#if block.mevData}
		<EntitySection title="MEV Data" entityType="block-mev">
			<dl>
				<dt>MEV Block</dt>
				<dd>
					{#if block.mevData.isMevBlock !== undefined && block.mevData.isMevBlock !== null}
						{block.mevData.isMevBlock ? 'Yes' : 'No'}
					{:else}
						N/A
					{/if}
				</dd>

				{#if block.mevData.mevReward}
					<dt>MEV Reward</dt>
					<dd>{block.mevData.mevReward}</dd>
				{/if}

				{#if block.mevData.mevGasPrice !== undefined && block.mevData.mevGasPrice !== null}
					<dt>MEV Gas Price</dt>
					<dd>{block.mevData.mevGasPrice} wei</dd>
				{/if}

				{#if block.mevData.bundleCount !== undefined && block.mevData.bundleCount !== null}
					<dt>Bundle Count</dt>
					<dd>{block.mevData.bundleCount}</dd>
				{/if}

				{#if block.mevData.builderAddress}
					<dt>Builder Address</dt>
					<dd><a href="/address/{block.mevData.builderAddress}">{block.mevData.builderAddress}</a></dd>
				{/if}

				{#if block.mevData.relayName}
					<dt>Relay Name</dt>
					<dd>{block.mevData.relayName}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Blob data -->
	{#if block.blobData}
		<EntitySection title="Blob Data (EIP-4844)" entityType="block-blob">
			<dl>
				<dt>Blob Gas Used</dt>
				<dd>{block.blobData.blobGasUsed ?? 'N/A'}</dd>

				<dt>Excess Blob Gas</dt>
				<dd>{block.blobData.excessBlobGas ?? 'N/A'}</dd>

				<dt>Blob Gas Price</dt>
				<dd>
					{#if block.blobData.blobGasPrice !== undefined && block.blobData.blobGasPrice !== null}
						{block.blobData.blobGasPrice} wei
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Blob Count</dt>
				<dd>
					{#if block.blobData.blobCount !== undefined && block.blobData.blobCount !== null}
						{block.blobData.blobCount}
					{:else}
						N/A
					{/if}
				</dd>
			</dl>
		</EntitySection>
	{/if}

	<!-- Beacon data -->
	{#if block.beaconData}
		<EntitySection title="Beacon Chain Data" entityType="block-beacon">
			<dl>
				<dt>Slot</dt>
				<dd>
					{#if block.beaconData.slot !== undefined && block.beaconData.slot !== null}
						{block.beaconData.slot?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Epoch</dt>
				<dd>
					{#if block.beaconData.epoch !== undefined && block.beaconData.epoch !== null}
						{block.beaconData.epoch?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Proposer Index</dt>
				<dd>
					{#if block.beaconData.proposerIndex !== undefined && block.beaconData.proposerIndex !== null}
						{block.beaconData.proposerIndex?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Attestation Count</dt>
				<dd>
					{#if block.beaconData.attestationCount !== undefined && block.beaconData.attestationCount !== null}
						{block.beaconData.attestationCount?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Participation Rate</dt>
				<dd>
					{#if block.beaconData.participationRate !== undefined && block.beaconData.participationRate !== null}
						{block.beaconData.participationRate}%
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Slashing Count</dt>
				<dd>
					{#if block.beaconData.slashingCount !== undefined && block.beaconData.slashingCount !== null}
						{block.beaconData.slashingCount?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Deposit Count</dt>
				<dd>
					{#if block.beaconData.depositCount !== undefined && block.beaconData.depositCount !== null}
						{block.beaconData.depositCount?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				<dt>Voluntary Exit Count</dt>
				<dd>
					{#if block.beaconData.voluntaryExitCount !== undefined && block.beaconData.voluntaryExitCount !== null}
						{block.beaconData.voluntaryExitCount?.toLocaleString()}
					{:else}
						N/A
					{/if}
				</dd>

				{#if block.beaconData.syncCommitteeParticipation !== undefined && block.beaconData.syncCommitteeParticipation !== null}
					<dt>Sync Committee Participation</dt>
					<dd>{block.beaconData.syncCommitteeParticipation}%</dd>
				{/if}

				{#if block.beaconData.syncCommitteeRewards}
					<dt>Sync Committee Rewards</dt>
					<dd>{block.beaconData.syncCommitteeRewards}</dd>
				{/if}
			</dl>

			{#if block.beaconData.executionPayload}
				<details>
					<summary><h3>Execution Payload</h3></summary>
					<dl>
						<dt>Block Hash</dt>
						<dd>
							{#if block.beaconData.executionPayload.blockHash}
								<a href="/block/{block.beaconData.executionPayload.blockHash}">{block.beaconData.executionPayload.blockHash}</a>
							{:else}
								N/A
							{/if}
						</dd>

						<dt>Block Number</dt>
						<dd>
							{#if block.beaconData.executionPayload.blockNumber !== undefined && block.beaconData.executionPayload.blockNumber !== null}
								<a href="/block/{block.beaconData.executionPayload.blockNumber}">{block.beaconData.executionPayload.blockNumber?.toLocaleString()}</a>
							{:else}
								N/A
							{/if}
						</dd>

						<dt>Transaction Count</dt>
						<dd>
							{#if block.beaconData.executionPayload.transactionCount !== undefined && block.beaconData.executionPayload.transactionCount !== null}
								{block.beaconData.executionPayload.transactionCount?.toLocaleString()}
							{:else}
								N/A
							{/if}
						</dd>

						<dt>Gas Used</dt>
						<dd>{block.beaconData.executionPayload.gasUsed ?? 'N/A'}</dd>
					</dl>
				</details>
			{/if}
		</EntitySection>
	{/if}

	<!-- Uncle blocks -->
	{#if block.uncles && block.uncles.length > 0}
		<EntitySection title="Uncle Blocks" entityType="block-uncles">
			<dl>
				<dt>Uncle Count</dt>
				<dd>{block.uncles.length}</dd>
			</dl>

			<details>
				<summary><h3>Uncle Block Hashes</h3></summary>
				<ul>
					{#each block.uncles as uncleHash}
						<li>
							{#if uncleHash}
								<a href="/block/{uncleHash}">{uncleHash}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		</EntitySection>
	{/if}

	<!-- References section -->
	<EntitySection title="References" entityType="block-references">
		{#if block._miner}
			<details>
				<summary><h3>Miner</h3></summary>
				{#if block._miner.address}
					<a href="/address/{block._miner.address}">{block._miner.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if block._sequencer}
			<details>
				<summary><h3>Sequencer (L2)</h3></summary>
				{#if block._sequencer.address}
					<a href="/address/{block._sequencer.address}">{block._sequencer.address}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if block._parentBlock}
			<details>
				<summary><h3>Parent Block</h3></summary>
				{#if block._parentBlock.blockHash || (block._parentBlock.blockNumber !== undefined && block._parentBlock.blockNumber !== null)}
					<a href="/block/{block._parentBlock.blockHash ?? block._parentBlock.blockNumber}">
						{#if block._parentBlock.blockNumber !== undefined && block._parentBlock.blockNumber !== null}
							Block #{block._parentBlock.blockNumber?.toLocaleString()}
						{:else if block._parentBlock.blockHash}
							{block._parentBlock.blockHash}
						{:else}
							N/A
						{/if}
					</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if block._childBlocks && block._childBlocks.length > 0}
			<details>
				<summary><h3>Child Blocks ({block._childBlocks.length})</h3></summary>
				<ul>
					{#each block._childBlocks as child}
						<li>
							{#if child.blockHash || (child.blockNumber !== undefined && child.blockNumber !== null)}
								<a href="/block/{child.blockHash ?? child.blockNumber}">
									{#if child.blockNumber !== undefined && child.blockNumber !== null}
										Block #{child.blockNumber?.toLocaleString()}
									{:else if child.blockHash}
										{child.blockHash}
									{:else}
										N/A
									{/if}
								</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if block._uncleBlocks && block._uncleBlocks.length > 0}
			<details>
				<summary><h3>Uncle Block References ({block._uncleBlocks.length})</h3></summary>
				<ul>
					{#each block._uncleBlocks as uncle}
						<li>
							{#if uncle.blockHash || (uncle.blockNumber !== undefined && uncle.blockNumber !== null)}
								<a href="/block/{uncle.blockHash ?? uncle.blockNumber}">
									{#if uncle.blockNumber !== undefined && uncle.blockNumber !== null}
										Uncle Block #{uncle.blockNumber?.toLocaleString()}
									{:else if uncle.blockHash}
										{uncle.blockHash}
									{:else}
										N/A
									{/if}
								</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
				</ul>
			</details>
		{/if}

		{#if block._transactions && block._transactions.length > 0}
			<details>
				<summary><h3>Block Transactions ({block._transactions.length})</h3></summary>
				<ul>
					{#each block._transactions.slice(0, 20) as transaction}
						<li>
							{#if transaction.id}
								<a href="/transaction/{transaction.id}">{transaction.id}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
					{#if block._transactions.length > 20}
						<li>... and {block._transactions.length - 20} more transactions</li>
					{/if}
				</ul>
			</details>
		{/if}

		{#if block._events && block._events.length > 0}
			<details>
				<summary><h3>Block Events ({block._events.length})</h3></summary>
				<ul>
					{#each block._events.slice(0, 10) as event}
						<li>
							{#if event.id}
								<a href="/event/{event.id}">{event.id}</a>
							{:else}
								N/A
							{/if}
						</li>
					{/each}
					{#if block._events.length > 10}
						<li>... and {block._events.length - 10} more events</li>
					{/if}
				</ul>
			</details>
		{/if}

		{#if block._validator}
			<details>
				<summary><h3>Validator/Proposer</h3></summary>
				{#if block._validator.index !== undefined && block._validator.index !== null}
					<a href="/validator/{block._validator.index}">Validator #{block._validator.index}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}

		{#if block._beaconBlock}
			<details>
				<summary><h3>Beacon Block</h3></summary>
				{#if block._beaconBlock.id}
					<a href="/beacon/{block._beaconBlock.id}">{block._beaconBlock.id}</a>
				{:else}
					N/A
				{/if}
			</details>
		{/if}
	</EntitySection>
</Entity>

<style>
	.role {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.role.canonical {
		background-color: green;
	}

	.role.uncle {
		background-color: orange;
	}

	.role.orphaned {
		background-color: red;
	}

	.role.pending {
		background-color: blue;
	}

	.status {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.status.pending {
		background-color: orange;
	}

	.status.confirmed {
		background-color: green;
	}

	.status.finalized {
		background-color: darkgreen;
	}

	.status.reorged {
		background-color: red;
	}

	.status.success {
		background-color: green;
	}

	.status.failed {
		background-color: red;
	}

	.impact {
		padding: 2px 6px;
		border-radius: 4px;
		color: white;
		font-weight: bold;
		text-transform: uppercase;
	}

	.impact.low {
		background-color: green;
	}

	.impact.medium {
		background-color: orange;
	}

	.impact.high {
		background-color: red;
	}

	.impact.breaking {
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