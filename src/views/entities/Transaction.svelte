<script lang="ts">
	// Types/constants
	import type { AnyTransaction } from '$/entities/transaction'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { transaction }: { transaction: AnyTransaction } = $props()
</script>


<Entity
	type={EntityType.Transaction}
	id={transaction.transactionId}
	title={transaction.transactionId}
	annotation={`${transaction.type} Transaction`}
>
	<EntitySection
		title="Basic Information"
		entityType="transaction-basic"
	>
		<dl>
			<dt>Hash</dt>
			<dd>
				<a href="/transaction/{transaction.hash}">{transaction.hash}</a>
			</dd>

			<dt>Transaction ID</dt>
			<dd>{transaction.transactionId}</dd>

			<dt>Chain ID</dt>
			<dd>{transaction.chainId}</dd>

			<dt>Type</dt>
			<dd>{transaction.type}</dd>

			<dt>Status</dt>
			<dd>{transaction.status}</dd>

			<dt>Category</dt>
			<dd>{transaction.category}</dd>

			<dt>Success</dt>
			<dd>{transaction.isSuccess ? 'Yes' : 'No'}</dd>

			{#if transaction.error}
				<dt>Error</dt>
				<dd>{transaction.error}</dd>
			{/if}

			{#if transaction.revertReason}
				<dt>Revert Reason</dt>
				<dd>{transaction.revertReason}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Timing"
		entityType="transaction-timing"
	>
		<dl>
			<dt>Timestamp</dt>
			<dd>
				<time
					datetime={new Date(
						transaction.timestamp * 1000,
					).toISOString()}
					>{new Date(
						transaction.timestamp * 1000,
					)?.toLocaleString()}</time
				>
			</dd>

			{#if transaction.submittedAt}
				<dt>Submitted At</dt>
				<dd>
					<time
						datetime={new Date(
							transaction.submittedAt * 1000,
						).toISOString()}
						>{new Date(
							transaction.submittedAt * 1000,
						)?.toLocaleString()}</time
					>
				</dd>
			{/if}

			{#if transaction.confirmedAt}
				<dt>Confirmed At</dt>
				<dd>
					<time
						datetime={new Date(
							transaction.confirmedAt * 1000,
						).toISOString()}
						>{new Date(
							transaction.confirmedAt * 1000,
						)?.toLocaleString()}</time
					>
				</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Parties"
		entityType="transaction-parties"
	>
		<dl>
			<dt>From</dt>
			<dd><a href="/actor/{transaction.from}">{transaction.from}</a></dd>

			{#if transaction.to}
				<dt>To</dt>
				<dd><a href="/actor/{transaction.to}">{transaction.to}</a></dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Gas & Value"
		entityType="transaction-gas"
	>
		<dl>
			<dt>Value</dt>
			<dd>{transaction.value} wei ({transaction.valueFormatted})</dd>

			<dt>Gas Limit</dt>
			<dd>{transaction.gasLimit}</dd>

			{#if transaction.gasUsed}
				<dt>Gas Used</dt>
				<dd>{transaction.gasUsed}</dd>
			{/if}

			{#if transaction.gasPrice}
				<dt>Gas Price</dt>
				<dd>{transaction.gasPrice}</dd>
			{/if}

			{#if transaction.gasFee}
				<dt>Gas Fee</dt>
				<dd>{transaction.gasFee}</dd>
			{/if}

			{#if transaction.gasEfficiency}
				<dt>Gas Efficiency</dt>
				<dd>{transaction.gasEfficiency}%</dd>
			{/if}

			<dt>Nonce</dt>
			<dd>{transaction.nonce}</dd>
		</dl>
	</EntitySection>

	<EntitySection
		title="Position"
		entityType="transaction-position"
	>
		<dl>
			{#if transaction.blockNumber}
				<dt>Block Number</dt>
				<dd>
					<a href="/block/{transaction.blockNumber}"
						>{transaction.blockNumber}</a
					>
				</dd>
			{/if}

			{#if transaction.transactionIndex !== undefined && transaction.transactionIndex !== null}
				<dt>Transaction Index</dt>
				<dd>{transaction.transactionIndex}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Transaction Data"
		entityType="transaction-data"
	>
		<dl>
			{#if transaction.input}
				<dt>Input Data</dt>
				<dd><code>{transaction.input}</code></dd>
			{/if}

			{#if transaction.output}
				<dt>Output Data</dt>
				<dd><code>{transaction.output}</code></dd>
			{/if}

			<dt>Size</dt>
			<dd>{transaction.size} bytes</dd>

			{#if transaction.weight}
				<dt>Weight</dt>
				<dd>{transaction.weight}</dd>
			{/if}

			{#if transaction.priority}
				<dt>Priority</dt>
				<dd>{transaction.priority}</dd>
			{/if}

			{#if transaction.isReplacement}
				<dt>Is Replacement</dt>
				<dd>Yes</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Network Context"
		entityType="transaction-network"
	>
		<dl>
			{#if transaction.networkFee}
				<dt>Network Fee</dt>
				<dd>{transaction.networkFee}</dd>
			{/if}

			{#if transaction.priorityFee}
				<dt>Priority Fee</dt>
				<dd>{transaction.priorityFee}</dd>
			{/if}

			{#if transaction.tip}
				<dt>Tip</dt>
				<dd>{transaction.tip}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Analysis"
		entityType="transaction-analysis"
	>
		<dl>
			{#if transaction.complexity}
				<dt>Complexity</dt>
				<dd>{transaction.complexity}</dd>
			{/if}

			{#if transaction.riskLevel}
				<dt>Risk Level</dt>
				<dd>{transaction.riskLevel}</dd>
			{/if}

			{#if transaction.confidenceScore}
				<dt>Confidence Score</dt>
				<dd>{transaction.confidenceScore}%</dd>
			{/if}
		</dl>
	</EntitySection>

	<!-- Legacy Transaction specific fields -->
	{#if transaction.type === 'Legacy' && 'legacyData' in transaction}
		<EntitySection
			title="Legacy Transaction Data"
			entityType="transaction-legacy"
		>
			<dl>
				<dt>Gas Price</dt>
				<dd>{transaction.legacyData.gasPrice}</dd>

				<dt>v</dt>
				<dd>{transaction.legacyData.v}</dd>

				<dt>r</dt>
				<dd>{transaction.legacyData.r}</dd>

				<dt>s</dt>
				<dd>{transaction.legacyData.s}</dd>

				{#if transaction.legacyData.publicKey}
					<dt>Public Key</dt>
					<dd>{transaction.legacyData.publicKey}</dd>
				{/if}

				<dt>Signature</dt>
				<dd>{transaction.legacyData.signature}</dd>

				<dt>Is Legacy Format</dt>
				<dd>{transaction.legacyData.isLegacyFormat ? 'Yes' : 'No'}</dd>

				{#if transaction.legacyData.upgradeRecommended}
					<dt>Upgrade Recommended</dt>
					<dd>Yes</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Access List Transaction specific fields -->
	{#if transaction.type === 'AccessList' && 'accessListData' in transaction}
		<EntitySection
			title="Access List Transaction Data"
			entityType="transaction-access-list"
		>
			<dl>
				<dt>Gas Price</dt>
				<dd>{transaction.accessListData.gasPrice}</dd>

				<dt>Access List Size</dt>
				<dd>{transaction.accessListData.accessListSize}</dd>

				<dt>Gas Optimization</dt>
				<dd>{transaction.accessListData.gasOptimization}</dd>

				<dt>Gas Savings</dt>
				<dd>{transaction.accessListData.gasSavings}</dd>

				<dt>Warm Storage Accesses</dt>
				<dd>{transaction.accessListData.warmStorageAccesses}</dd>

				<dt>Cold Storage Accesses</dt>
				<dd>{transaction.accessListData.coldStorageAccesses}</dd>

				<dt>Chain ID</dt>
				<dd>{transaction.accessListData.chainId}</dd>

				<dt>Y Parity</dt>
				<dd>{transaction.accessListData.yParity}</dd>

				<dt>Signature R</dt>
				<dd>{transaction.accessListData.signatureR}</dd>

				<dt>Signature S</dt>
				<dd>{transaction.accessListData.signatureS}</dd>
			</dl>

			{#if transaction.accessListData.accessList.length > 0}
				<h3>Access List</h3>
				<ul>
					{#each transaction.accessListData.accessList as access}
						<li>
							Address: <a href="/actor/{access.address}"
								>{access.address}</a
							>
							{#if access.storageKeys.length > 0}
								<ul>
									{#each access.storageKeys as key}
										<li>Storage Key: {key}</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</EntitySection>
	{/if}

	<!-- Dynamic Fee Transaction specific fields -->
	{#if transaction.type === 'DynamicFee' && 'dynamicFeeData' in transaction}
		<EntitySection
			title="EIP-1559 Dynamic Fee Data"
			entityType="transaction-dynamic-fee"
		>
			<dl>
				<dt>Max Fee Per Gas</dt>
				<dd>{transaction.dynamicFeeData.maxFeePerGas}</dd>

				<dt>Max Priority Fee Per Gas</dt>
				<dd>{transaction.dynamicFeeData.maxPriorityFeePerGas}</dd>

				{#if transaction.dynamicFeeData.baseFeePerGas}
					<dt>Base Fee Per Gas</dt>
					<dd>{transaction.dynamicFeeData.baseFeePerGas}</dd>
				{/if}

				<dt>Effective Gas Price</dt>
				<dd>{transaction.dynamicFeeData.effectiveGasPrice}</dd>

				{#if transaction.dynamicFeeData.feeSavings}
					<dt>Fee Savings</dt>
					<dd>{transaction.dynamicFeeData.feeSavings}</dd>
				{/if}

				<dt>Fee Efficiency</dt>
				<dd>{transaction.dynamicFeeData.feeEfficiency}%</dd>

				<dt>Priority Level</dt>
				<dd>{transaction.dynamicFeeData.priorityLevel}</dd>

				<dt>Inclusion Probability</dt>
				<dd>{transaction.dynamicFeeData.inclusionProbability}%</dd>

				{#if transaction.dynamicFeeData.estimatedWaitTime}
					<dt>Estimated Wait Time</dt>
					<dd>{transaction.dynamicFeeData.estimatedWaitTime}s</dd>
				{/if}

				{#if transaction.dynamicFeeData.burntFee}
					<dt>Burnt Fee</dt>
					<dd>{transaction.dynamicFeeData.burntFee}</dd>
				{/if}

				{#if transaction.dynamicFeeData.tipToMiner}
					<dt>Tip to Miner</dt>
					<dd>{transaction.dynamicFeeData.tipToMiner}</dd>
				{/if}
			</dl>

			{#if transaction.dynamicFeeData.accessList && transaction.dynamicFeeData.accessList.length > 0}
				<h3>Access List</h3>
				<ul>
					{#each transaction.dynamicFeeData.accessList as access}
						<li>
							Address: <a href="/actor/{access.address}"
								>{access.address}</a
							>
							{#if access.storageKeys.length > 0}
								<ul>
									{#each access.storageKeys as key}
										<li>Storage Key: {key}</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
		</EntitySection>
	{/if}

	<!-- Blob Transaction specific fields -->
	{#if transaction.type === 'BlobCarrying' && 'blobData' in transaction}
		<EntitySection
			title="EIP-4844 Blob Transaction Data"
			entityType="transaction-blob"
		>
			<dl>
				<dt>Max Fee Per Gas</dt>
				<dd>{transaction.blobData.maxFeePerGas}</dd>

				<dt>Max Priority Fee Per Gas</dt>
				<dd>{transaction.blobData.maxPriorityFeePerGas}</dd>

				<dt>Max Fee Per Blob Gas</dt>
				<dd>{transaction.blobData.maxFeePerBlobGas}</dd>

				<dt>Blob Count</dt>
				<dd>{transaction.blobData.blobCount}</dd>

				<dt>Total Blob Size</dt>
				<dd>{transaction.blobData.totalBlobSize} bytes</dd>

				{#if transaction.blobData.blobGasUsed}
					<dt>Blob Gas Used</dt>
					<dd>{transaction.blobData.blobGasUsed}</dd>
				{/if}

				{#if transaction.blobData.blobFee}
					<dt>Blob Fee</dt>
					<dd>{transaction.blobData.blobFee}</dd>
				{/if}

				{#if transaction.blobData.compressionRatio}
					<dt>Compression Ratio</dt>
					<dd>{transaction.blobData.compressionRatio}%</dd>
				{/if}

				<dt>Data Efficiency</dt>
				<dd>{transaction.blobData.dataEfficiency}%</dd>
			</dl>

			<h3>Blob Versioned Hashes</h3>
			<ul>
				{#each transaction.blobData.blobVersionedHashes as hash}
					<li>{hash}</li>
				{/each}
			</ul>

			{#if transaction.blobData.rollupUsage}
				<h3>Rollup Usage</h3>
				<dl>
					<dt>Rollup Chain</dt>
					<dd>{transaction.blobData.rollupUsage.rollupChain}</dd>

					{#if transaction.blobData.rollupUsage.transactionCount}
						<dt>Transaction Count</dt>
						<dd>
							{transaction.blobData.rollupUsage.transactionCount}
						</dd>
					{/if}

					{#if transaction.blobData.rollupUsage.stateRoot}
						<dt>State Root</dt>
						<dd>{transaction.blobData.rollupUsage.stateRoot}</dd>
					{/if}
				</dl>
			{/if}
		</EntitySection>
	{/if}

	<!-- Deposit Transaction specific fields -->
	{#if transaction.type === 'Deposit' && 'depositData' in transaction}
		<EntitySection
			title="L2 Deposit Transaction Data"
			entityType="transaction-deposit"
		>
			<dl>
				{#if transaction.depositData.l1TransactionHash}
					<dt>L1 Transaction Hash</dt>
					<dd>
						<a
							href="/transaction/{transaction.depositData
								.l1TransactionHash}"
							>{transaction.depositData.l1TransactionHash}</a
						>
					</dd>
				{/if}

				{#if transaction.depositData.l1BlockNumber}
					<dt>L1 Block Number</dt>
					<dd>{transaction.depositData.l1BlockNumber}</dd>
				{/if}

				<dt>Deposit Amount</dt>
				<dd>{transaction.depositData.depositAmount}</dd>

				{#if transaction.depositData.l1Token}
					<dt>L1 Token</dt>
					<dd>
						<a href="/token/{transaction.depositData.l1Token}"
							>{transaction.depositData.l1Token}</a
						>
					</dd>
				{/if}

				{#if transaction.depositData.l2Token}
					<dt>L2 Token</dt>
					<dd>
						<a href="/token/{transaction.depositData.l2Token}"
							>{transaction.depositData.l2Token}</a
						>
					</dd>
				{/if}

				{#if transaction.depositData.depositIndex}
					<dt>Deposit Index</dt>
					<dd>{transaction.depositData.depositIndex}</dd>
				{/if}

				<dt>Bridge Contract</dt>
				<dd>
					<a href="/actor/{transaction.depositData.bridgeContract}"
						>{transaction.depositData.bridgeContract}</a
					>
				</dd>

				<dt>Bridge Type</dt>
				<dd>{transaction.depositData.bridgeType}</dd>

				{#if transaction.depositData.processingTime}
					<dt>Processing Time</dt>
					<dd>{transaction.depositData.processingTime}s</dd>
				{/if}

				{#if transaction.depositData.confirmationBlocks}
					<dt>Confirmation Blocks</dt>
					<dd>{transaction.depositData.confirmationBlocks}</dd>
				{/if}

				{#if transaction.depositData.l1Fee}
					<dt>L1 Fee</dt>
					<dd>{transaction.depositData.l1Fee}</dd>
				{/if}

				{#if transaction.depositData.bridgeFee}
					<dt>Bridge Fee</dt>
					<dd>{transaction.depositData.bridgeFee}</dd>
				{/if}

				<dt>Total Deposit Cost</dt>
				<dd>{transaction.depositData.totalDepositCost}</dd>
			</dl>
		</EntitySection>
	{/if}

	<!-- Withdrawal Transaction specific fields -->
	{#if transaction.type === 'Withdrawal' && 'withdrawalData' in transaction}
		<EntitySection
			title="L2 Withdrawal Transaction Data"
			entityType="transaction-withdrawal"
		>
			<dl>
				{#if transaction.withdrawalData.l2TransactionHash}
					<dt>L2 Transaction Hash</dt>
					<dd>
						<a
							href="/transaction/{transaction.withdrawalData
								.l2TransactionHash}"
							>{transaction.withdrawalData.l2TransactionHash}</a
						>
					</dd>
				{/if}

				{#if transaction.withdrawalData.l1ClaimHash}
					<dt>L1 Claim Hash</dt>
					<dd>
						<a
							href="/transaction/{transaction.withdrawalData
								.l1ClaimHash}"
							>{transaction.withdrawalData.l1ClaimHash}</a
						>
					</dd>
				{/if}

				<dt>Withdrawal Amount</dt>
				<dd>{transaction.withdrawalData.withdrawalAmount}</dd>

				{#if transaction.withdrawalData.l2Token}
					<dt>L2 Token</dt>
					<dd>
						<a href="/token/{transaction.withdrawalData.l2Token}"
							>{transaction.withdrawalData.l2Token}</a
						>
					</dd>
				{/if}

				{#if transaction.withdrawalData.l1Token}
					<dt>L1 Token</dt>
					<dd>
						<a href="/token/{transaction.withdrawalData.l1Token}"
							>{transaction.withdrawalData.l1Token}</a
						>
					</dd>
				{/if}

				{#if transaction.withdrawalData.withdrawalIndex}
					<dt>Withdrawal Index</dt>
					<dd>{transaction.withdrawalData.withdrawalIndex}</dd>
				{/if}

				{#if transaction.withdrawalData.challengePeriodEnd}
					<dt>Challenge Period End</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.withdrawalData.challengePeriodEnd *
									1000,
							).toISOString()}
							>{new Date(
								transaction.withdrawalData.challengePeriodEnd *
									1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}

				<dt>Is Challengeable</dt>
				<dd>
					{transaction.withdrawalData.isChallengeable ? 'Yes' : 'No'}
				</dd>

				{#if transaction.withdrawalData.finalizedAt}
					<dt>Finalized At</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.withdrawalData.finalizedAt * 1000,
							).toISOString()}
							>{new Date(
								transaction.withdrawalData.finalizedAt * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}

				<dt>Withdrawal Status</dt>
				<dd>{transaction.withdrawalData.withdrawalStatus}</dd>

				{#if transaction.withdrawalData.stateRoot}
					<dt>State Root</dt>
					<dd>{transaction.withdrawalData.stateRoot}</dd>
				{/if}

				{#if transaction.withdrawalData.l2Fee}
					<dt>L2 Fee</dt>
					<dd>{transaction.withdrawalData.l2Fee}</dd>
				{/if}

				{#if transaction.withdrawalData.l1ClaimFee}
					<dt>L1 Claim Fee</dt>
					<dd>{transaction.withdrawalData.l1ClaimFee}</dd>
				{/if}

				<dt>Total Withdrawal Cost</dt>
				<dd>{transaction.withdrawalData.totalWithdrawalCost}</dd>
			</dl>

			{#if transaction.withdrawalData.withdrawalProof && transaction.withdrawalData.withdrawalProof.length > 0}
				<h3>Withdrawal Proof</h3>
				<ul>
					{#each transaction.withdrawalData.withdrawalProof as proof}
						<li>{proof}</li>
					{/each}
				</ul>
			{/if}
		</EntitySection>
	{/if}

	<!-- Internal Transaction specific fields -->
	{#if transaction.type === 'Internal' && 'internalData' in transaction}
		<EntitySection
			title="Internal Transaction Data"
			entityType="transaction-internal"
		>
			<dl>
				<dt>Parent Transaction</dt>
				<dd>
					<a
						href="/transaction/{transaction.internalData
							.parentTransaction}"
						>{transaction.internalData.parentTransaction}</a
					>
				</dd>

				<dt>Call Type</dt>
				<dd>{transaction.internalData.callType}</dd>

				<dt>Depth</dt>
				<dd>{transaction.internalData.depth}</dd>

				<dt>Is Error</dt>
				<dd>{transaction.internalData.isError ? 'Yes' : 'No'}</dd>

				<dt>Gas Used</dt>
				<dd>{transaction.internalData.gasUsed}</dd>

				{#if transaction.internalData.functionSelector}
					<dt>Function Selector</dt>
					<dd>{transaction.internalData.functionSelector}</dd>
				{/if}

				{#if transaction.internalData.functionName}
					<dt>Function Name</dt>
					<dd>{transaction.internalData.functionName}</dd>
				{/if}

				{#if transaction.internalData.subCalls}
					<dt>Sub Calls</dt>
					<dd>{transaction.internalData.subCalls}</dd>
				{/if}

				{#if transaction.internalData.stateChanges}
					<dt>State Changes</dt>
					<dd>{transaction.internalData.stateChanges}</dd>
				{/if}

				{#if transaction.internalData.eventCount}
					<dt>Event Count</dt>
					<dd>{transaction.internalData.eventCount}</dd>
				{/if}
			</dl>

			<h3>Trace Address</h3>
			<ul>
				{#each transaction.internalData.traceAddress as addr}
					<li>{addr}</li>
				{/each}
			</ul>

			{#if transaction.internalData.decodedInput}
				<h3>Decoded Input</h3>
				<pre>{JSON.stringify(
						transaction.internalData.decodedInput,
						null,
						2,
					)}</pre>
			{/if}

			{#if transaction.internalData.decodedOutput}
				<h3>Decoded Output</h3>
				<pre>{JSON.stringify(
						transaction.internalData.decodedOutput,
						null,
						2,
					)}</pre>
			{/if}
		</EntitySection>
	{/if}

	<!-- System Transaction specific fields -->
	{#if transaction.type === 'System' && 'systemData' in transaction}
		<EntitySection
			title="System Transaction Data"
			entityType="transaction-system"
		>
			<dl>
				<dt>System Type</dt>
				<dd>{transaction.systemData.systemType}</dd>

				{#if transaction.systemData.authority}
					<dt>Authority</dt>
					<dd>
						<a href="/actor/{transaction.systemData.authority}"
							>{transaction.systemData.authority}</a
						>
					</dd>
				{/if}

				<dt>Is Automated</dt>
				<dd>{transaction.systemData.isAutomated ? 'Yes' : 'No'}</dd>

				<dt>System Function</dt>
				<dd>{transaction.systemData.systemFunction}</dd>

				{#if transaction.systemData.protocolVersion}
					<dt>Protocol Version</dt>
					<dd>{transaction.systemData.protocolVersion}</dd>
				{/if}

				{#if transaction.systemData.epoch}
					<dt>Epoch</dt>
					<dd>{transaction.systemData.epoch}</dd>
				{/if}

				{#if transaction.systemData.slot}
					<dt>Slot</dt>
					<dd>{transaction.systemData.slot}</dd>
				{/if}

				{#if transaction.systemData.validatorIndex}
					<dt>Validator Index</dt>
					<dd>{transaction.systemData.validatorIndex}</dd>
				{/if}

				{#if transaction.systemData.inflationImpact}
					<dt>Inflation Impact</dt>
					<dd>{transaction.systemData.inflationImpact}</dd>
				{/if}

				{#if transaction.systemData.supplyChange}
					<dt>Supply Change</dt>
					<dd>{transaction.systemData.supplyChange}</dd>
				{/if}
			</dl>

			{#if transaction.systemData.systemParameters}
				<h3>System Parameters</h3>
				<pre>{JSON.stringify(
						transaction.systemData.systemParameters,
						null,
						2,
					)}</pre>
			{/if}
		</EntitySection>
	{/if}

	<!-- Related entities -->
	{#if transaction.block}
		<EntitySection
			title="Block"
			entityType="transaction-block"
		>
			<dl>
				<dt>Block Number</dt>
				<dd>
					<a href="/block/{transaction.block.number}"
						>{transaction.block.number}</a
					>
				</dd>

				<dt>Block Hash</dt>
				<dd>{transaction.block.hash}</dd>

				{#if transaction.block.timestamp}
					<dt>Block Timestamp</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.block.timestamp * 1000,
							).toISOString()}
							>{new Date(
								transaction.block.timestamp * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.fromActor}
		<EntitySection
			title="From Actor"
			entityType="transaction-from-actor"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/actor/{transaction.fromActor.address}"
						>{transaction.fromActor.address}</a
					>
				</dd>

				<dt>Type</dt>
				<dd>{transaction.fromActor.type}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.toActor}
		<EntitySection
			title="To Actor"
			entityType="transaction-to-actor"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/actor/{transaction.toActor.address}"
						>{transaction.toActor.address}</a
					>
				</dd>

				<dt>Type</dt>
				<dd>{transaction.toActor.type}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.targetContract}
		<EntitySection
			title="Target Contract"
			entityType="transaction-target-contract"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/actor/{transaction.targetContract.address}"
						>{transaction.targetContract.address}</a
					>
				</dd>

				<dt>Standard</dt>
				<dd>{transaction.targetContract.standard}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.createdContract}
		<EntitySection
			title="Created Contract"
			entityType="transaction-created-contract"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/actor/{transaction.createdContract.address}"
						>{transaction.createdContract.address}</a
					>
				</dd>

				<dt>Standard</dt>
				<dd>{transaction.createdContract.standard}</dd>

				{#if transaction.createdContract.deploymentTimestamp}
					<dt>Deployment Timestamp</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.createdContract
									.deploymentTimestamp * 1000,
							).toISOString()}
							>{new Date(
								transaction.createdContract
									.deploymentTimestamp * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.relatedTransactions && transaction.relatedTransactions.length > 0}
		<EntitySection
			title="Related Transactions"
			entityType="transaction-related-transactions"
		>
			<ul>
				{#each transaction.relatedTransactions as tx}
					<li>
						<a href="/transaction/{tx.transactionId}"
							>{tx.transactionId}</a
						>
						({tx.type}) -
						{#if tx.timestamp}
							<time
								datetime={new Date(
									tx.timestamp * 1000,
								).toISOString()}
								>{new Date(
									tx.timestamp * 1000,
								).toLocaleDateString()}</time
							>
						{/if}
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if transaction.replacedBy}
		<EntitySection
			title="Replaced By"
			entityType="transaction-replaced-by"
		>
			<dl>
				<dt>Transaction ID</dt>
				<dd>
					<a
						href="/transaction/{transaction.replacedBy
							.transactionId}"
						>{transaction.replacedBy.transactionId}</a
					>
				</dd>

				<dt>Gas Price</dt>
				<dd>{transaction.replacedBy.gasPrice}</dd>

				{#if transaction.replacedBy.timestamp}
					<dt>Timestamp</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.replacedBy.timestamp * 1000,
							).toISOString()}
							>{new Date(
								transaction.replacedBy.timestamp * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.parentTransaction}
		<EntitySection
			title="Parent Transaction"
			entityType="transaction-parent"
		>
			<dl>
				<dt>Transaction ID</dt>
				<dd>
					<a
						href="/transaction/{transaction.parentTransaction
							.transactionId}"
						>{transaction.parentTransaction.transactionId}</a
					>
				</dd>

				<dt>Type</dt>
				<dd>{transaction.parentTransaction.type}</dd>

				<dt>Status</dt>
				<dd>{transaction.parentTransaction.status}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.events && transaction.events.length > 0}
		<EntitySection
			title="Events ({transaction.events.length})"
			entityType="transaction-events"
		>
			<ul>
				{#each transaction.events as event}
					<li>
						<a href="/event/{event.id}">{event.id}</a>
						({event.category}) -
						<time
							datetime={new Date(
								event.timestamp * 1000,
							).toISOString()}
							>{new Date(
								event.timestamp * 1000,
							).toLocaleDateString()}</time
						>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if transaction.transfers && transaction.transfers.length > 0}
		<EntitySection
			title="Transfers ({transaction.transfers.length})"
			entityType="transaction-transfers"
		>
			<ul>
				{#each transaction.transfers as transfer}
					<li>
						<a href="/transfer/{transfer.id}">{transfer.id}</a>
						({transfer.category}) -
						<time
							datetime={new Date(
								transfer.timestamp * 1000,
							).toISOString()}
							>{new Date(
								transfer.timestamp * 1000,
							).toLocaleDateString()}</time
						>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if transaction.traces && transaction.traces.length > 0}
		<EntitySection
			title="Traces ({transaction.traces.length})"
			entityType="transaction-traces"
		>
			<ul>
				{#each transaction.traces as trace}
					<li>
						<a href="/trace/{trace.id}">{trace.id}</a>
						({trace.type}) -
						<time
							datetime={new Date(
								trace.timestamp * 1000,
							).toISOString()}
							>{new Date(
								trace.timestamp * 1000,
							).toLocaleDateString()}</time
						>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if transaction.blobs && transaction.blobs.length > 0}
		<EntitySection
			title="Blobs ({transaction.blobs.length})"
			entityType="transaction-blobs"
		>
			<ul>
				{#each transaction.blobs as blob}
					<li>
						<a href="/blob/{blob.id}">{blob.id}</a>
						- Hash: {blob.blobHash}
						- Size: {blob.size} bytes
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if transaction.bridgeContract}
		<EntitySection
			title="Bridge Contract"
			entityType="transaction-bridge-contract"
		>
			<dl>
				<dt>Address</dt>
				<dd>
					<a href="/actor/{transaction.bridgeContract.address}"
						>{transaction.bridgeContract.address}</a
					>
				</dd>

				<dt>Standard</dt>
				<dd>{transaction.bridgeContract.standard}</dd>
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.l1Transaction}
		<EntitySection
			title="L1 Transaction"
			entityType="transaction-l1"
		>
			<dl>
				<dt>Transaction ID</dt>
				<dd>
					<a
						href="/transaction/{transaction.l1Transaction
							.transactionId}"
						>{transaction.l1Transaction.transactionId}</a
					>
				</dd>

				<dt>Chain ID</dt>
				<dd>{transaction.l1Transaction.chainId}</dd>

				{#if transaction.l1Transaction.timestamp}
					<dt>Timestamp</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.l1Transaction.timestamp * 1000,
							).toISOString()}
							>{new Date(
								transaction.l1Transaction.timestamp * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transaction.l2Transaction}
		<EntitySection
			title="L2 Transaction"
			entityType="transaction-l2"
		>
			<dl>
				<dt>Transaction ID</dt>
				<dd>
					<a
						href="/transaction/{transaction.l2Transaction
							.transactionId}"
						>{transaction.l2Transaction.transactionId}</a
					>
				</dd>

				<dt>Chain ID</dt>
				<dd>{transaction.l2Transaction.chainId}</dd>

				{#if transaction.l2Transaction.timestamp}
					<dt>Timestamp</dt>
					<dd>
						<time
							datetime={new Date(
								transaction.l2Transaction.timestamp * 1000,
							).toISOString()}
							>{new Date(
								transaction.l2Transaction.timestamp * 1000,
							)?.toLocaleString()}</time
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}
</Entity>
