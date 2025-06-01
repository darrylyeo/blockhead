<script lang="ts">
	// Types/constants
	import type {
		AnyTrace,
		CallTrace,
		CreateTrace,
		Create2Trace,
		SelfDestructTrace,
		RewardTrace,
		GenesisTrace,
		TraceType,
	} from '$/entities/trace'
	import { EntityType } from '$/entities'
	import { CallType, RewardType } from '$/entities/trace'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { trace }: { trace: AnyTrace } = $props()
</script>


<Entity
	type={EntityType.Trace}
	id={trace.id}
	title={trace.id}
	annotation={`${trace.type} Trace`}
>
	<EntitySection
		title="Basic Information"
		entityType="trace-basic"
	>
		<dl>
			<dt>Trace ID</dt>
			<dd>{trace.id}</dd>

			<dt>Chain ID</dt>
			<dd>{trace.chainId}</dd>

			<dt>Type</dt>
			<dd>{trace.type}</dd>

			<dt>Block Number</dt>
			<dd>{trace.blockNumber}</dd>

			<dt>Transaction Index</dt>
			<dd>{trace.transactionIndex}</dd>

			<dt>Trace Address</dt>
			<dd>[{trace.traceAddress.join(', ')}]</dd>

			<dt>Subtraces</dt>
			<dd>{trace.subtraces}</dd>

			<dt>Depth</dt>
			<dd>{trace.depth}</dd>

			{#if trace.timestamp}
				<dt>Timestamp</dt>
				<dd>
					<time
						datetime={new Date(
							trace.timestamp * 1000,
						).toISOString()}
						>{new Date(
							trace.timestamp * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}

			<dt>Success</dt>
			<dd>{trace.isSuccess ? 'Yes' : 'No'}</dd>

			{#if trace.error}
				<dt>Error</dt>
				<dd>{trace.error}</dd>
			{/if}

			{#if trace.revertReason}
				<dt>Revert Reason</dt>
				<dd>{trace.revertReason}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Gas & Resources"
		entityType="trace-gas"
	>
		<dl>
			{#if trace.gasLimit}
				<dt>Gas Limit</dt>
				<dd>{trace.gasLimit} ETH</dd>
			{/if}

			{#if trace.gasUsed}
				<dt>Gas Used</dt>
				<dd>{trace.gasUsed} ETH</dd>
			{/if}

			{#if trace.gasPrice}
				<dt>Gas Price</dt>
				<dd>{trace.gasPrice} ETH</dd>
			{/if}

			{#if trace.gasCost}
				<dt>Gas Cost</dt>
				<dd>{trace.gasCost} ETH</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Execution Details"
		entityType="trace-execution"
	>
		<dl>
			{#if trace.pcCounter}
				<dt>Program Counter</dt>
				<dd>{trace.pcCounter}</dd>
			{/if}

			{#if trace.opcode}
				<dt>Opcode</dt>
				<dd>{trace.opcode}</dd>
			{/if}

			{#if trace.input}
				<dt>Input Data</dt>
				<dd>{trace.input}</dd>
			{/if}

			{#if trace.output}
				<dt>Output Data</dt>
				<dd>{trace.output}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if trace.balanceChanges && trace.balanceChanges.length > 0}
		<EntitySection
			title="Balance Changes"
			entityType="trace-balance-changes"
		>
			<ul>
				{#each trace.balanceChanges as change}
					<li>
						<dl>
							<dt>Address</dt>
							<dd>{change.address}</dd>

							<dt>Before</dt>
							<dd>{change.before} ETH</dd>

							<dt>After</dt>
							<dd>{change.after} ETH</dd>

							<dt>Delta</dt>
							<dd>{change.delta} ETH</dd>
						</dl>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if trace.storageChanges && trace.storageChanges.length > 0}
		<EntitySection
			title="Storage Changes"
			entityType="trace-storage-changes"
		>
			<ul>
				{#each trace.storageChanges as change}
					<li>
						<dl>
							<dt>Address</dt>
							<dd>{change.address}</dd>

							<dt>Storage Slot</dt>
							<dd>{change.slot}</dd>

							<dt>Before</dt>
							<dd>{change.before}</dd>

							<dt>After</dt>
							<dd>{change.after}</dd>
						</dl>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if trace.codeChanges && trace.codeChanges.length > 0}
		<EntitySection
			title="Code Changes"
			entityType="trace-code-changes"
		>
			<ul>
				{#each trace.codeChanges as change}
					<li>
						<dl>
							<dt>Address</dt>
							<dd>{change.address}</dd>

							{#if change.before}
								<dt>Before Hash</dt>
								<dd>{change.before}</dd>
							{/if}

							{#if change.after}
								<dt>After Hash</dt>
								<dd>{change.after}</dd>
							{/if}
						</dl>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	<!-- Call Trace Details -->
	{#if trace.type === TraceType.Call && 'callData' in trace}
		<EntitySection
			title="Call Details"
			entityType="trace-call"
		>
			<dl>
				<dt>Call Type</dt>
				<dd>{trace.callData.callType}</dd>

				<dt>From</dt>
				<dd>
					<a href="/address/{trace.callData.from}"
						>{trace.callData.from}</a
					>
				</dd>

				<dt>To</dt>
				<dd>
					<a href="/address/{trace.callData.to}"
						>{trace.callData.to}</a
					>
				</dd>

				<dt>Value</dt>
				<dd>{trace.callData.value} ETH</dd>

				{#if trace.callData.input}
					<dt>Input</dt>
					<dd><code>{trace.callData.input}</code></dd>
				{/if}

				{#if trace.callData.output}
					<dt>Output</dt>
					<dd><code>{trace.callData.output}</code></dd>
				{/if}

				{#if trace.callData.gasLimit}
					<dt>Gas Limit</dt>
					<dd>{trace.callData.gasLimit}</dd>
				{/if}

				{#if trace.callData.gasUsed}
					<dt>Gas Used</dt>
					<dd>{trace.callData.gasUsed}</dd>
				{/if}

				{#if trace.callData.gasPrice}
					<dt>Gas Price</dt>
					<dd>{trace.callData.gasPrice}</dd>
				{/if}

				{#if trace.callData.selector}
					<dt>Function Selector</dt>
					<dd><code>{trace.callData.selector}</code></dd>
				{/if}

				{#if trace.callData.functionName}
					<dt>Function Name</dt>
					<dd>{trace.callData.functionName}</dd>
				{/if}

				{#if trace.callData.decodedInput}
					<dt>Decoded Input</dt>
					<dd>
						<pre>{JSON.stringify(
								trace.callData.decodedInput,
								null,
								2,
							)}</pre>
					</dd>
				{/if}

				{#if trace.callData.decodedOutput}
					<dt>Decoded Output</dt>
					<dd>
						<pre>{JSON.stringify(
								trace.callData.decodedOutput,
								null,
								2,
							)}</pre>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Create Trace Details -->
	{#if trace.type === TraceType.Create && 'createData' in trace}
		<EntitySection
			title="Create Details"
			entityType="trace-create"
		>
			<dl>
				<dt>From</dt>
				<dd>
					<a href="/address/{trace.createData.from}"
						>{trace.createData.from}</a
					>
				</dd>

				<dt>Created Address</dt>
				<dd>
					<a href="/address/{trace.createData.address}"
						>{trace.createData.address}</a
					>
				</dd>

				<dt>Value</dt>
				<dd>{trace.createData.value} ETH</dd>

				<dt>Init Code</dt>
				<dd><code>{trace.createData.init}</code></dd>

				{#if trace.createData.code}
					<dt>Deployed Code</dt>
					<dd><code>{trace.createData.code}</code></dd>
				{/if}

				{#if trace.createData.gasLimit}
					<dt>Gas Limit</dt>
					<dd>{trace.createData.gasLimit}</dd>
				{/if}

				{#if trace.createData.gasUsed}
					<dt>Gas Used</dt>
					<dd>{trace.createData.gasUsed}</dd>
				{/if}

				{#if trace.createData.salt}
					<dt>Salt</dt>
					<dd><code>{trace.createData.salt}</code></dd>
				{/if}

				{#if trace.createData.constructorArgs}
					<dt>Constructor Arguments</dt>
					<dd>
						<pre>{JSON.stringify(
								trace.createData.constructorArgs,
								null,
								2,
							)}</pre>
					</dd>
				{/if}

				{#if trace.createData.contractStandard}
					<dt>Contract Standard</dt>
					<dd>{trace.createData.contractStandard}</dd>
				{/if}

				{#if trace.createData.predictedAddress}
					<dt>Predicted Address</dt>
					<dd>
						<a href="/address/{trace.createData.predictedAddress}"
							>{trace.createData.predictedAddress}</a
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- SelfDestruct Trace Details -->
	{#if trace.type === TraceType.SelfDestruct && 'selfDestructData' in trace}
		<EntitySection
			title="SelfDestruct Details"
			entityType="trace-selfdestruct"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/address/{trace.selfDestructData.address}"
						>{trace.selfDestructData.address}</a
					>
				</dd>

				<dt>Refund Address</dt>
				<dd>
					<a href="/address/{trace.selfDestructData.refundAddress}"
						>{trace.selfDestructData.refundAddress}</a
					>
				</dd>

				<dt>Balance</dt>
				<dd>{trace.selfDestructData.balance} ETH</dd>

				{#if trace.selfDestructData.contractCodeSize}
					<dt>Contract Code Size</dt>
					<dd>{trace.selfDestructData.contractCodeSize} bytes</dd>
				{/if}

				{#if trace.selfDestructData.storageCleared}
					<dt>Storage Cleared</dt>
					<dd>
						{trace.selfDestructData.storageCleared ? 'Yes' : 'No'}
					</dd>
				{/if}

				{#if trace.selfDestructData.gasRefund}
					<dt>Gas Refund</dt>
					<dd>{trace.selfDestructData.gasRefund}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Reward Trace Details -->
	{#if trace.type === TraceType.Reward && 'rewardData' in trace}
		<EntitySection
			title="Reward Details"
			entityType="trace-reward"
		>
			<dl>
				<dt>Author</dt>
				<dd>
					<a href="/address/{trace.rewardData.author}"
						>{trace.rewardData.author}</a
					>
				</dd>

				<dt>Value</dt>
				<dd>{trace.rewardData.value} ETH</dd>

				<dt>Reward Type</dt>
				<dd>{trace.rewardData.rewardType}</dd>

				{#if trace.rewardData.blockMined}
					<dt>Block Mined</dt>
					<dd>{trace.rewardData.blockMined}</dd>
				{/if}

				{#if trace.rewardData.unclePosition !== undefined}
					<dt>Uncle Position</dt>
					<dd>{trace.rewardData.unclePosition}</dd>
				{/if}

				{#if trace.rewardData.uncleReward}
					<dt>Uncle Reward</dt>
					<dd>{trace.rewardData.uncleReward} ETH</dd>
				{/if}

				{#if trace.rewardData.epoch !== undefined}
					<dt>Epoch</dt>
					<dd>{trace.rewardData.epoch}</dd>
				{/if}

				{#if trace.rewardData.validatorIndex !== undefined}
					<dt>Validator Index</dt>
					<dd>{trace.rewardData.validatorIndex}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Genesis Trace Details -->
	{#if trace.type === TraceType.Genesis && 'genesisData' in trace}
		<EntitySection
			title="Genesis Details"
			entityType="trace-genesis"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/address/{trace.genesisData.address}"
						>{trace.genesisData.address}</a
					>
				</dd>

				<dt>Balance</dt>
				<dd>{trace.genesisData.balance} ETH</dd>

				{#if trace.genesisData.nonce}
					<dt>Nonce</dt>
					<dd>{trace.genesisData.nonce}</dd>
				{/if}

				{#if trace.genesisData.code}
					<dt>Code</dt>
					<dd><code>{trace.genesisData.code}</code></dd>
				{/if}

				{#if trace.genesisData.storage && Object.keys(trace.genesisData.storage).length > 0}
					<dt>Storage</dt>
					<dd>
						<pre>{JSON.stringify(
								trace.genesisData.storage,
								null,
								2,
							)}</pre>
					</dd>
				{/if}

				{#if trace.genesisData.preallocation}
					<dt>Preallocation</dt>
					<dd>{trace.genesisData.preallocation ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}
</Entity>
