<script lang="ts">
	// Types/constants
	import type { AnyBlock } from '$/entities/block'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { block }: { block: AnyBlock } = $props()
</script>


<Entity
	type={EntityType.Block}
	id={block.id}
	title={`Block #${block.number}`}
	annotation={`${block.type} Block`}
>
	<EntitySection title="Basic Information" entityType="block-basic">
		<dl>
			<dt>Number</dt>
			<dd><a href="/block/{block.number}">{block.number}</a></dd>
			
			<dt>ID</dt>
			<dd>{block.id}</dd>
			
			<dt>Hash</dt>
			<dd>{block.hash}</dd>
			
			<dt>Chain ID</dt>
			<dd>{block.chainId}</dd>
			
			<dt>Type</dt>
			<dd>{block.type}</dd>
			
			<dt>Status</dt>
			<dd>{block.status}</dd>
			
			<dt>Consensus</dt>
			<dd>{block.consensus}</dd>
			
			<dt>Size</dt>
			<dd>{block.size} bytes</dd>
		</dl>
	</EntitySection>

	<EntitySection title="Timing" entityType="block-timing">
		{#snippet children()}
			<dl>
				<dt>Timestamp</dt>
				<dd><time datetime={new Date(block.timestamp * 1000).toISOString()}>{new Date(block.timestamp * 1000).toLocaleString()}</time></dd>
				
				{#if block.blockTime}
					<dt>Block Time</dt>
					<dd>{block.blockTime}s</dd>
				{/if}
				
				{#if block.processingTime}
					<dt>Processing Time</dt>
					<dd>{block.processingTime}ms</dd>
				{/if}
				
				{#if block.propagationTime}
					<dt>Propagation Time</dt>
					<dd>{block.propagationTime}ms</dd>
				{/if}
			</dl>
		{/snippet}
	</EntitySection>

	<EntitySection title="Structure" entityType="block-structure">
		{#snippet children()}
			<dl>
				<dt>Parent Hash</dt>
				<dd><a href="/block/{block.parentHash}">{block.parentHash}</a></dd>
				
				{#if block.transactionsRoot}
					<dt>Transactions Root</dt>
					<dd>{block.transactionsRoot}</dd>
				{/if}
				
				{#if block.stateRoot}
					<dt>State Root</dt>
					<dd>{block.stateRoot}</dd>
				{/if}
				
				{#if block.receiptsRoot}
					<dt>Receipts Root</dt>
					<dd>{block.receiptsRoot}</dd>
				{/if}
				
				{#if block.withdrawalsRoot}
					<dt>Withdrawals Root</dt>
					<dd>{block.withdrawalsRoot}</dd>
				{/if}
				
				{#if block.extraData}
					<dt>Extra Data</dt>
					<dd><code>{block.extraData}</code></dd>
				{/if}
				
				{#if block.logsBloom}
					<dt>Logs Bloom</dt>
					<dd><code>{block.logsBloom}</code></dd>
				{/if}
			</dl>
		{/snippet}
	</EntitySection>

	<EntitySection title="Gas & Fees" entityType="block-gas">
		{#snippet children()}
			<dl>
				<dt>Gas Limit</dt>
				<dd>{block.gasLimit}</dd>
				
				<dt>Gas Used</dt>
				<dd>{block.gasUsed}</dd>
				
				<dt>Gas Utilization</dt>
				<dd>{block.gasUtilization}%</dd>
				
				{#if block.baseFeePerGas}
					<dt>Base Fee Per Gas</dt>
					<dd>{block.baseFeePerGas} wei</dd>
				{/if}
				
				{#if block.blobGasUsed}
					<dt>Blob Gas Used</dt>
					<dd>{block.blobGasUsed}</dd>
				{/if}
				
				{#if block.excessBlobGas}
					<dt>Excess Blob Gas</dt>
					<dd>{block.excessBlobGas}</dd>
				{/if}
			</dl>
		{/snippet}
	</EntitySection>

	<EntitySection title="Transactions" entityType="block-transactions">
		{#snippet children()}
			<dl>
				<dt>Transaction Count</dt>
				<dd>{block.transactionCount}</dd>
			</dl>
		{/snippet}
	</EntitySection>

	<EntitySection title="Network Context" entityType="block-network">
		{#snippet children()}
			<dl>
				{#if block.networkDifficulty}
					<dt>Network Difficulty</dt>
					<dd>{block.networkDifficulty}</dd>
				{/if}
				
				{#if block.networkHashRate}
					<dt>Network Hash Rate</dt>
					<dd>{block.networkHashRate}</dd>
				{/if}
				
				{#if block.orphanRisk}
					<dt>Orphan Risk</dt>
					<dd>{block.orphanRisk}%</dd>
				{/if}
			</dl>
		{/snippet}
	</EntitySection>

	<!-- Genesis Block specific fields -->
	{#if block.type === 'Genesis' && 'genesisData' in block}
		<EntitySection title="Genesis Block Data" entityType="block-genesis">
			{#snippet children()}
				<dl>
					<dt>Chain ID</dt>
					<dd>{block.genesisData.chainId}</dd>
					
					<dt>Network Name</dt>
					<dd>{block.genesisData.networkName}</dd>
					
					<dt>Genesis Time</dt>
					<dd><time datetime={new Date(block.genesisData.genesisTime * 1000).toISOString()}>{new Date(block.genesisData.genesisTime * 1000).toLocaleString()}</time></dd>
					
					{#if block.genesisData.initialDifficulty}
						<dt>Initial Difficulty</dt>
						<dd>{block.genesisData.initialDifficulty}</dd>
					{/if}
					
					<dt>Gas Limit</dt>
					<dd>{block.genesisData.gasLimit}</dd>
				</dl>
				
				{#if block.genesisData.preAllocations && block.genesisData.preAllocations.length > 0}
					<details>
						<summary><h3>Pre-allocations</h3></summary>
						<ul>
							{#each block.genesisData.preAllocations as allocation}
								<li>
									<a href="/actor/{allocation.address}">{allocation.address}</a>
									- {allocation.balance} Wei
									{#if allocation.nonce}
										(Nonce: {allocation.nonce})
									{/if}
								</li>
							{/each}
						</ul>
					</details>
				{/if}
				
				{#if block.genesisData.networkConfig}
					<details>
						<summary><h3>Network Configuration</h3></summary>
						<dl>
							{#if block.genesisData.networkConfig.chainName}
								<dt>Chain Name</dt>
								<dd>{block.genesisData.networkConfig.chainName}</dd>
							{/if}
							
							{#if block.genesisData.networkConfig.nativeCurrency}
								<dt>Native Currency</dt>
								<dd>{block.genesisData.networkConfig.nativeCurrency.name} ({block.genesisData.networkConfig.nativeCurrency.symbol})</dd>
							{/if}
							
							{#if block.genesisData.networkConfig.rpcUrls && block.genesisData.networkConfig.rpcUrls.length > 0}
								<dt>RPC URLs</dt>
								<dd>
									<ul>
										{#each block.genesisData.networkConfig.rpcUrls as url}
											<li><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></li>
										{/each}
									</ul>
								</dd>
							{/if}
						</dl>
					</details>
				{/if}
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Regular Block specific fields -->
	{#if block.type === 'Regular' && 'regularData' in block}
		<EntitySection title="Regular Block Data" entityType="block-regular">
			{#snippet children()}
				<dl>
					<dt>Unique Senders</dt>
					<dd>{block.regularData.uniqueSenders}</dd>
					
					<dt>Unique Receivers</dt>
					<dd>{block.regularData.uniqueReceivers}</dd>
					
					<dt>Total Value Transferred</dt>
					<dd>{block.regularData.totalValueTransferred}</dd>
					
					<dt>Total Fees Paid</dt>
					<dd>{block.regularData.totalFeesPaid}</dd>
					
					<dt>Average Gas Price</dt>
					<dd>{block.regularData.averageGasPrice}</dd>
					
					{#if block.regularData.blockReward}
						<dt>Block Reward</dt>
						<dd>{block.regularData.blockReward}</dd>
					{/if}
					
					<dt>Transaction Fees</dt>
					<dd>{block.regularData.transactionFees}</dd>
					
					{#if block.regularData.burntFees}
						<dt>Burnt Fees</dt>
						<dd>{block.regularData.burntFees}</dd>
					{/if}
				</dl>
				
				{#if block.regularData.transactionTypes && Object.keys(block.regularData.transactionTypes).length > 0}
					<details>
						<summary><h3>Transaction Types</h3></summary>
						<dl>
							{#each Object.entries(block.regularData.transactionTypes) as [type, count]}
								<dt>{type}</dt>
								<dd>{count}</dd>
							{/each}
						</dl>
					</details>
				{/if}
				
				{#if block.regularData.mevData}
					<details>
						<summary><h3>MEV Data</h3></summary>
						<dl>
							<dt>Extracted Value</dt>
							<dd>{block.regularData.mevData.extractedValue}</dd>
							
							<dt>MEV Blocks</dt>
							<dd>{block.regularData.mevData.mevBlocks}</dd>
							
							<dt>Flashloan Volume</dt>
							<dd>{block.regularData.mevData.flashloanVolume}</dd>
							
							<dt>Arbitrage Profit</dt>
							<dd>{block.regularData.mevData.arbitrageProfit}</dd>
							
							<dt>Sandwich Attacks</dt>
							<dd>{block.regularData.mevData.sandwichAttacks}</dd>
						</dl>
					</details>
				{/if}
				
				{#if block.regularData.defiActivity}
					<details>
						<summary><h3>DeFi Activity</h3></summary>
						<dl>
							<dt>DEX Volume</dt>
							<dd>{block.regularData.defiActivity.dexVolume}</dd>
							
							<dt>Lending Volume</dt>
							<dd>{block.regularData.defiActivity.lendingVolume}</dd>
							
							<dt>Yield Farming Rewards</dt>
							<dd>{block.regularData.defiActivity.yieldFarmingRewards}</dd>
							
							<dt>Liquidations</dt>
							<dd>{block.regularData.defiActivity.liquidations}</dd>
							
							<dt>New Pools</dt>
							<dd>{block.regularData.defiActivity.newPools}</dd>
						</dl>
					</details>
				{/if}
				
				{#if block.regularData.nftActivity}
					<details>
						<summary><h3>NFT Activity</h3></summary>
						<dl>
							<dt>Sales</dt>
							<dd>{block.regularData.nftActivity.sales}</dd>
							
							<dt>Volume</dt>
							<dd>{block.regularData.nftActivity.volume}</dd>
							
							<dt>Unique Collections</dt>
							<dd>{block.regularData.nftActivity.uniqueCollections}</dd>
							
							<dt>Mints</dt>
							<dd>{block.regularData.nftActivity.mints}</dd>
							
							<dt>Transfers</dt>
							<dd>{block.regularData.nftActivity.transfers}</dd>
						</dl>
					</details>
				{/if}
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Uncle Block specific fields -->
	{#if block.type === 'Uncle' && 'uncleData' in block}
		<EntitySection title="Uncle Block Data" entityType="block-uncle">
			{#snippet children()}
				<dl>
					<dt>Uncle Height</dt>
					<dd>{block.uncleData.uncleHeight}</dd>
					
					<dt>Uncle Reward</dt>
					<dd>{block.uncleData.uncleReward}</dd>
					
					<dt>Nephew Hash</dt>
					<dd><a href="/block/{block.uncleData.nephewHash}">{block.uncleData.nephewHash}</a></dd>
					
					<dt>Nephew Height</dt>
					<dd>{block.uncleData.nephewHeight}</dd>
					
					<dt>Uncle Index</dt>
					<dd>{block.uncleData.uncleIndex}</dd>
					
					<dt>Generation Gap</dt>
					<dd>{block.uncleData.generationGap}</dd>
					
					<dt>Uncle Timestamp</dt>
					<dd><time datetime={new Date(block.uncleData.uncleTimestamp * 1000).toISOString()}>{new Date(block.uncleData.uncleTimestamp * 1000).toLocaleString()}</time></dd>
					
					<dt>Time Difference</dt>
					<dd>{block.uncleData.timeDifference}s</dd>
					
					<dt>Hash Rate Loss</dt>
					<dd>{block.uncleData.hashRateLoss}%</dd>
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Fork Block specific fields -->
	{#if block.type === 'Fork' && 'forkData' in block}
		<EntitySection title="Fork Block Data" entityType="block-fork">
			{#snippet children()}
				<dl>
					<dt>Fork Type</dt>
					<dd>{block.forkData.forkType}</dd>
					
					{#if block.forkData.forkName}
						<dt>Fork Name</dt>
						<dd>{block.forkData.forkName}</dd>
					{/if}
					
					<dt>Fork Height</dt>
					<dd>{block.forkData.forkHeight}</dd>
					
					{#if block.forkData.supportPercentage}
						<dt>Support Percentage</dt>
						<dd>{block.forkData.supportPercentage}%</dd>
					{/if}
					
					{#if block.forkData.oppositionBlocks}
						<dt>Opposition Blocks</dt>
						<dd>{block.forkData.oppositionBlocks}</dd>
					{/if}
					
					{#if block.forkData.consensusReached}
						<dt>Consensus Reached</dt>
						<dd>{block.forkData.consensusReached ? 'Yes' : 'No'}</dd>
					{/if}
				</dl>
				
				{#if block.forkData.protocolChanges && block.forkData.protocolChanges.length > 0}
					<details>
						<summary><h3>Protocol Changes</h3></summary>
						<ul>
							{#each block.forkData.protocolChanges as change}
								<li>
									<strong>{change.name}</strong>
									{#if change.eip}
										(EIP-{change.eip})
									{/if}
									- {change.impact}
									<p>{change.description}</p>
								</li>
							{/each}
						</ul>
					</details>
				{/if}
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Reorg Block specific fields -->
	{#if block.type === 'Reorg' && 'reorgData' in block}
		<EntitySection title="Reorganization Data" entityType="block-reorg">
			{#snippet children()}
				<dl>
					<dt>Reorg Depth</dt>
					<dd>{block.reorgData.reorgDepth}</dd>
					
					<dt>Reorg Type</dt>
					<dd>{block.reorgData.reorgType}</dd>
					
					<dt>Previous Hash</dt>
					<dd>{block.reorgData.previousHash}</dd>
					
					<dt>New Hash</dt>
					<dd>{block.reorgData.newHash}</dd>
					
					<dt>Affected Transactions</dt>
					<dd>{block.reorgData.affectedTransactions}</dd>
					
					<dt>Lost Value</dt>
					<dd>{block.reorgData.lostValue}</dd>
					
					{#if block.reorgData.reorgCause}
						<dt>Reorg Cause</dt>
						<dd>{block.reorgData.reorgCause}</dd>
					{/if}
					
					{#if block.reorgData.attackType}
						<dt>Attack Type</dt>
						<dd>{block.reorgData.attackType}</dd>
					{/if}
					
					<dt>Recovery Time</dt>
					<dd>{block.reorgData.recoveryTime}s</dd>
					
					<dt>Network Stability</dt>
					<dd>{block.reorgData.networkStability}%</dd>
				</dl>
				
				{#if block.reorgData.reversedTransactions && block.reorgData.reversedTransactions.length > 0}
					<details>
						<summary><h3>Reversed Transactions</h3></summary>
						<ul>
							{#each block.reorgData.reversedTransactions as tx}
								<li><a href="/transaction/{tx}">{tx}</a></li>
							{/each}
						</ul>
					</details>
				{/if}
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Empty Block specific fields -->
	{#if block.type === 'Empty' && 'emptyData' in block}
		<EntitySection title="Empty Block Data" entityType="block-empty">
			{#snippet children()}
				<dl>
					<dt>Reason</dt>
					<dd>{block.emptyData.reason}</dd>
					
					<dt>Empty Duration</dt>
					<dd>{block.emptyData.emptyDuration}s</dd>
					
					<dt>Was Profitable</dt>
					<dd>{block.emptyData.wasProfitable ? 'Yes' : 'No'}</dd>
					
					{#if block.emptyData.opportunityCost}
						<dt>Opportunity Cost</dt>
						<dd>{block.emptyData.opportunityCost}</dd>
					{/if}
					
					<dt>Capacity Wasted</dt>
					<dd>{block.emptyData.capacityWasted}%</dd>
					
					<dt>User Experience</dt>
					<dd>{block.emptyData.userExperience}</dd>
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Merge Block specific fields -->
	{#if block.type === 'Merge' && 'mergeData' in block}
		<EntitySection title="Merge Block Data" entityType="block-merge">
			{#snippet children()}
				<dl>
					<dt>Transition Type</dt>
					<dd>{block.mergeData.transitionType}</dd>
					
					{#if block.mergeData.executionPayload}
						<dt>Execution Payload</dt>
						<dd>{block.mergeData.executionPayload}</dd>
					{/if}
					
					{#if block.mergeData.powDifficulty}
						<dt>PoW Difficulty</dt>
						<dd>{block.mergeData.powDifficulty}</dd>
					{/if}
					
					{#if block.mergeData.posEpoch}
						<dt>PoS Epoch</dt>
						<dd>{block.mergeData.posEpoch}</dd>
					{/if}
					
					{#if block.mergeData.validatorCount}
						<dt>Validator Count</dt>
						<dd>{block.mergeData.validatorCount}</dd>
					{/if}
					
					{#if block.mergeData.stakingRatio}
						<dt>Staking Ratio</dt>
						<dd>{block.mergeData.stakingRatio}%</dd>
					{/if}
					
					<dt>Issuance Reduction</dt>
					<dd>{block.mergeData.issuanceReduction}%</dd>
					
					<dt>Energy Reduction</dt>
					<dd>{block.mergeData.energyReduction}%</dd>
					
					<dt>Security Model</dt>
					<dd>{block.mergeData.securityModel}</dd>
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Beacon Block specific fields -->
	{#if block.type === 'Beacon' && 'beaconData' in block}
		<EntitySection title="Beacon Chain Data" entityType="block-beacon">
			{#snippet children()}
				<dl>
					<dt>Slot</dt>
					<dd>{block.beaconData.slot}</dd>
					
					<dt>Epoch</dt>
					<dd>{block.beaconData.epoch}</dd>
					
					<dt>Proposer Index</dt>
					<dd>{block.beaconData.proposerIndex}</dd>
					
					<dt>Attestation Count</dt>
					<dd>{block.beaconData.attestationCount}</dd>
					
					<dt>Participation Rate</dt>
					<dd>{block.beaconData.participationRate}%</dd>
					
					<dt>Slashing Count</dt>
					<dd>{block.beaconData.slashingCount}</dd>
					
					<dt>Deposit Count</dt>
					<dd>{block.beaconData.depositCount}</dd>
					
					<dt>Voluntary Exit Count</dt>
					<dd>{block.beaconData.voluntaryExitCount}</dd>
					
					{#if block.beaconData.syncCommitteeParticipation}
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
							<dd><a href="/block/{block.beaconData.executionPayload.blockHash}">{block.beaconData.executionPayload.blockHash}</a></dd>
							
							<dt>Block Number</dt>
							<dd>{block.beaconData.executionPayload.blockNumber}</dd>
							
							<dt>Transaction Count</dt>
							<dd>{block.beaconData.executionPayload.transactionCount}</dd>
							
							<dt>Gas Used</dt>
							<dd>{block.beaconData.executionPayload.gasUsed}</dd>
						</dl>
					</details>
				{/if}
			{/snippet}
		</EntitySection>
	{/if}

	<!-- Related entities -->
	{#if block.miner}
		<EntitySection title="Miner Information" entityType="block-miner">
			{#snippet children()}
				<dl>
					<dt>Miner Address</dt>
					<dd><a href="/actor/{block.miner.address}">{block.miner.address}</a></dd>
					
					<dt>Miner Type</dt>
					<dd>{block.miner.type}</dd>
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.proposer}
		<EntitySection title="Proposer Information" entityType="block-proposer">
			{#snippet children()}
				<dl>
					<dt>Proposer Address</dt>
					<dd><a href="/actor/{block.proposer.address}">{block.proposer.address}</a></dd>
					
					<dt>Proposer Type</dt>
					<dd>{block.proposer.type}</dd>
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.parentBlock}
		<EntitySection title="Parent Block" entityType="block-parent">
			{#snippet children()}
				<dl>
					<dt>Parent Number</dt>
					<dd><a href="/block/{block.parentBlock.number}">{block.parentBlock.number}</a></dd>
					
					<dt>Parent Hash</dt>
					<dd>{block.parentBlock.hash}</dd>
					
					<dt>Parent Timestamp</dt>
					<dd><time datetime={new Date(block.parentBlock.timestamp * 1000).toISOString()}>{new Date(block.parentBlock.timestamp * 1000).toLocaleString()}</time></dd>
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.childBlocks && block.childBlocks.length > 0}
		<EntitySection title="Child Blocks ({block.childBlocks.length})" entityType="block-children">
			{#snippet children()}
				<ul>
					{#each block.childBlocks as child}
						<li>
							<a href="/block/{child.number}">{child.number}</a>
							- {child.hash}
							(<time datetime={new Date(child.timestamp * 1000).toISOString()}>{new Date(child.timestamp * 1000).toLocaleString()}</time>)
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.uncleBlocks && block.uncleBlocks.length > 0}
		<EntitySection title="Uncle Blocks ({block.uncleBlocks.length})" entityType="block-uncles">
			{#snippet children()}
				<ul>
					{#each block.uncleBlocks as uncle}
						<li>
							<a href="/block/{uncle.number}">{uncle.number}</a>
							- {uncle.hash}
							{#if 'uncleData' in uncle}
								(Uncle Height: {uncle.uncleData.uncleHeight})
							{/if}
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.transactions && block.transactions.length > 0}
		<EntitySection title="Transactions ({block.transactions.length})" entityType="block-transactions-list">
			{#snippet children()}
				<ul>
					{#each block.transactions as transaction}
						<li>
							<a href="/transaction/{transaction.transactionId}">{transaction.transactionId}</a>
							- {transaction.type} ({transaction.status})
							(<time datetime={new Date(transaction.timestamp * 1000).toISOString()}>{new Date(transaction.timestamp * 1000).toLocaleString()}</time>)
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.events && block.events.length > 0}
		<EntitySection title="Events ({block.events.length})" entityType="block-events">
			{#snippet children()}
				<ul>
					{#each block.events as event}
						<li>
							<a href="/event/{event.id}">{event.id}</a>
							- {event.category}
							(<time datetime={new Date(event.timestamp * 1000).toISOString()}>{new Date(event.timestamp * 1000).toLocaleString()}</time>)
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.transfers && block.transfers.length > 0}
		<EntitySection title="Transfers ({block.transfers.length})" entityType="block-transfers">
			{#snippet children()}
				<ul>
					{#each block.transfers as transfer}
						<li>
							<a href="/transfer/{transfer.id}">{transfer.id}</a>
							- {transfer.category}
							(<time datetime={new Date(transfer.timestamp * 1000).toISOString()}>{new Date(transfer.timestamp * 1000).toLocaleString()}</time>)
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.traces && block.traces.length > 0}
		<EntitySection title="Traces ({block.traces.length})" entityType="block-traces">
			{#snippet children()}
				<ul>
					{#each block.traces as trace}
						<li>
							<a href="/trace/{trace.id}">{trace.id}</a>
							- {trace.type}
							(<time datetime={new Date(trace.timestamp * 1000).toISOString()}>{new Date(trace.timestamp * 1000).toLocaleString()}</time>)
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.relatedBlocks && block.relatedBlocks.length > 0}
		<EntitySection title="Related Blocks ({block.relatedBlocks.length})" entityType="block-related">
			{#snippet children()}
				<ul>
					{#each block.relatedBlocks as related}
						<li>
							<a href="/block/{related.number}">{related.number}</a>
							- {related.type} ({related.hash})
							(<time datetime={new Date(related.timestamp * 1000).toISOString()}>{new Date(related.timestamp * 1000).toLocaleString()}</time>)
						</li>
					{/each}
				</ul>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.rewards}
		<EntitySection title="Economic Data" entityType="block-rewards">
			{#snippet children()}
				<dl>
					<dt>Block Reward</dt>
					<dd>{block.rewards.blockReward} wei</dd>
					
					{#if block.rewards.transactionFees}
						<dt>Transaction Fees</dt>
						<dd>{block.rewards.transactionFees} wei</dd>
					{/if}
					
					{#if block.rewards.burnedFees}
						<dt>Burned Fees</dt>
						<dd>{block.rewards.burnedFees} wei</dd>
					{/if}
					
					{#if block.rewards.totalReward}
						<dt>Total Reward</dt>
						<dd>{block.rewards.totalReward} wei</dd>
					{/if}
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.validation}
		<EntitySection title="Validation Status" entityType="block-validation">
			{#snippet children()}
				<dl>
					<dt>Finalized</dt>
					<dd>{block.validation.isFinalized ? 'Yes' : 'No'}</dd>
					
					<dt>Canonical</dt>
					<dd>{block.validation.isCanonical ? 'Yes' : 'No'}</dd>
					
					<dt>Confirmed</dt>
					<dd>{block.validation.isConfirmed ? 'Yes' : 'No'}</dd>
					
					{#if block.validation.confirmations !== undefined}
						<dt>Confirmations</dt>
						<dd>{block.validation.confirmations}</dd>
					{/if}
					
					{#if block.validation.finalizedAt}
						<dt>Finalized At</dt>
						<dd><time datetime={new Date(block.validation.finalizedAt * 1000).toISOString()}>{new Date(block.validation.finalizedAt * 1000).toLocaleString()}</time></dd>
					{/if}
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.metrics}
		<EntitySection title="Performance Metrics" entityType="block-metrics">
			{#snippet children()}
				<dl>
					{#if block.metrics.tps}
						<dt>Transactions Per Second</dt>
						<dd>{block.metrics.tps}</dd>
					{/if}
					
					{#if block.metrics.throughput}
						<dt>Throughput</dt>
						<dd>{block.metrics.throughput} bytes/sec</dd>
					{/if}
					
					{#if block.metrics.stateSize}
						<dt>State Size</dt>
						<dd>{block.metrics.stateSize} bytes</dd>
					{/if}
					
					{#if block.metrics.mempoolSize}
						<dt>Mempool Size (at block time)</dt>
						<dd>{block.metrics.mempoolSize} transactions</dd>
					{/if}
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.metadata}
		<EntitySection title="Block Metadata" entityType="block-metadata">
			{#snippet children()}
				<dl>
					{#if block.metadata?.source}
						<dt>Data Source</dt>
						<dd>{block.metadata.source}</dd>
					{/if}
					
					{#if block.metadata?.version}
						<dt>Client Version</dt>
						<dd>{block.metadata.version}</dd>
					{/if}
					
					{#if block.metadata?.syncStatus}
						<dt>Sync Status</dt>
						<dd>{block.metadata.syncStatus}</dd>
					{/if}
					
					{#if block.metadata?.indexedAt}
						<dt>Indexed At</dt>
						<dd><time datetime={new Date(block.metadata.indexedAt * 1000).toISOString()}>{new Date(block.metadata.indexedAt * 1000).toLocaleString()}</time></dd>
					{/if}
					
					{#if block.metadata?.lastUpdated}
						<dt>Last Updated</dt>
						<dd><time datetime={new Date(block.metadata.lastUpdated * 1000).toISOString()}>{new Date(block.metadata.lastUpdated * 1000).toLocaleString()}</time></dd>
					{/if}
				</dl>
			{/snippet}
		</EntitySection>
	{/if}

	{#if block.analysis}
		<EntitySection title="Block Analysis" entityType="block-analysis">
			{#snippet children()}
				<dl>
					{#if block.analysis.complexity}
						<dt>Complexity Score</dt>
						<dd>{block.analysis.complexity}</dd>
					{/if}
					
					{#if block.analysis.riskScore}
						<dt>Risk Score</dt>
						<dd>{block.analysis.riskScore}</dd>
					{/if}
					
					{#if block.analysis.patterns && block.analysis.patterns.length > 0}
						<dt>Detected Patterns</dt>
						<dd>
							<ul>
								{#each block.analysis.patterns as pattern}
									<li>{pattern}</li>
								{/each}
							</ul>
						</dd>
					{/if}
					
					{#if block.analysis.anomalies && block.analysis.anomalies.length > 0}
						<dt>Anomalies</dt>
						<dd>
							<ul>
								{#each block.analysis.anomalies as anomaly}
									<li><strong>{anomaly.type}:</strong> {anomaly.description}</li>
								{/each}
							</ul>
						</dd>
					{/if}
				</dl>
			{/snippet}
		</EntitySection>
	{/if}
</Entity> 