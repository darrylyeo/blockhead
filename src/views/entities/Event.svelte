<script lang="ts">
	// Types/constants
	import type { Event } from '$/entities/event'
	import { EventCategory, EventSeverity, TransferType, SwapType } from '$/entities/event'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { event }: { event: Event } = $props()
</script>


<Entity
	type={EntityType.Event}
	id={event.id}
	title={event.id}
	annotation={`${event.category} Event`}
>
	<EntitySection title="Event Information" entityType="event-basic">
		<dl>
			<dt>Event ID</dt>
			<dd>{event.id}</dd>

			<dt>Chain ID</dt>
			<dd>{event.chainId}</dd>

			<dt>Category</dt>
			<dd>{event.category}</dd>

			<dt>Severity</dt>
			<dd class="severity {event.severity.toLowerCase()}">{event.severity}</dd>

			<dt>Block Number</dt>
			<dd><a href="/block/{event.blockNumber}">{event.blockNumber}</a></dd>

			<dt>Block Hash</dt>
			<dd><a href="/block/{event.blockHash}">{event.blockHash}</a></dd>

			<dt>Transaction Hash</dt>
			<dd><a href="/transaction/{event.transactionHash}">{event.transactionHash}</a></dd>

			<dt>Transaction Index</dt>
			<dd>{event.transactionIndex}</dd>

			<dt>Log Index</dt>
			<dd>{event.logIndex}</dd>

			<dt>Timestamp</dt>
			<dd><time datetime={new Date(event.timestamp * 1000).toISOString()}>{new Date(event.timestamp * 1000).toLocaleString()}</time></dd>

			{#if event.eventSignature}
				<dt>Event Signature</dt>
				<dd><code>{event.eventSignature}</code></dd>
			{/if}

			{#if event.eventName}
				<dt>Event Name</dt>
				<dd>{event.eventName}</dd>
			{/if}

			<dt>Removed</dt>
			<dd>{event.removed ? 'Yes' : 'No'}</dd>

			{#if event.gasUsed}
				<dt>Gas Used</dt>
				<dd>{event.gasUsed}</dd>
			{/if}

			{#if event.gasPrice}
				<dt>Gas Price</dt>
				<dd>{event.gasPrice}</dd>
			{/if}

			{#if event.effectiveGasPrice}
				<dt>Effective Gas Price</dt>
				<dd>{event.effectiveGasPrice}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if event.topics && event.topics.length > 0}
		<EntitySection title="Topics" entityType="event-topics">
			<ul>
				{#each event.topics as topic, index}
					<li>
						<strong>Topic {index}:</strong> <code>{topic}</code>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if event.data}
		<EntitySection title="Event Data" entityType="event-data">
			<dl>
				<dt>Raw Data</dt>
				<dd><code>{event.data}</code></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.decodedData}
		<EntitySection title="Decoded Data" entityType="event-decoded">
			<pre>{JSON.stringify(event.decodedData, null, 2)}</pre>
		</EntitySection>
	{/if}

	{#if event.decodedTopics}
		<EntitySection title="Decoded Topics" entityType="event-decoded-topics">
			<pre>{JSON.stringify(event.decodedTopics, null, 2)}</pre>
		</EntitySection>
	{/if}

	<!-- Category-specific sections -->
	{#if event.category === EventCategory.Transfer && 'transferData' in event}
		<EntitySection title="Transfer Details" entityType="event-transfer">
			<dl>
				<dt>Transfer Type</dt>
				<dd>{event.transferData.transferType}</dd>

				<dt>From</dt>
				<dd><a href="/actor/{event.transferData.from}">{event.transferData.from}</a></dd>

				<dt>To</dt>
				<dd><a href="/actor/{event.transferData.to}">{event.transferData.to}</a></dd>

				{#if event.transferData.tokenAddress}
					<dt>Token Address</dt>
					<dd><a href="/token/{event.transferData.tokenAddress}">{event.transferData.tokenAddress}</a></dd>
				{/if}

				{#if event.transferData.tokenSymbol}
					<dt>Token Symbol</dt>
					<dd>{event.transferData.tokenSymbol}</dd>
				{/if}

				{#if event.transferData.amount}
					<dt>Amount</dt>
					<dd>{event.transferData.amount}</dd>
				{/if}

				{#if event.transferData.tokenId}
					<dt>Token ID</dt>
					<dd>{event.transferData.tokenId}</dd>
				{/if}

				{#if event.transferData.valueUsd}
					<dt>Value (USD)</dt>
					<dd>${event.transferData.valueUsd.toLocaleString()}</dd>
				{/if}

				{#if event.transferData.isInternal !== null}
					<dt>Internal Transfer</dt>
					<dd>{event.transferData.isInternal ? 'Yes' : 'No'}</dd>
				{/if}

				{#if event.transferData.isMint !== null}
					<dt>Mint</dt>
					<dd>{event.transferData.isMint ? 'Yes' : 'No'}</dd>
				{/if}

				{#if event.transferData.isBurn !== null}
					<dt>Burn</dt>
					<dd>{event.transferData.isBurn ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if event.category === EventCategory.Approval && 'approvalData' in event}
		<EntitySection title="Approval Details" entityType="event-approval">
			<dl>
				<dt>Owner</dt>
				<dd><a href="/actor/{event.approvalData.owner}">{event.approvalData.owner}</a></dd>

				<dt>Spender</dt>
				<dd><a href="/actor/{event.approvalData.spender}">{event.approvalData.spender}</a></dd>

				<dt>Token Address</dt>
				<dd><a href="/token/{event.approvalData.tokenAddress}">{event.approvalData.tokenAddress}</a></dd>

				{#if event.approvalData.tokenSymbol}
					<dt>Token Symbol</dt>
					<dd>{event.approvalData.tokenSymbol}</dd>
				{/if}

				{#if event.approvalData.amount}
					<dt>Amount</dt>
					<dd>{event.approvalData.amount}</dd>
				{/if}

				{#if event.approvalData.tokenId}
					<dt>Token ID</dt>
					<dd>{event.approvalData.tokenId}</dd>
				{/if}

				{#if event.approvalData.approved !== null}
					<dt>Approved</dt>
					<dd>{event.approvalData.approved ? 'Yes' : 'No'}</dd>
				{/if}

				{#if event.approvalData.isUnlimited !== null}
					<dt>Unlimited Approval</dt>
					<dd>{event.approvalData.isUnlimited ? 'Yes' : 'No'}</dd>
				{/if}

				{#if event.approvalData.riskLevel}
					<dt>Risk Level</dt>
					<dd class="risk-level {event.approvalData.riskLevel}">{event.approvalData.riskLevel}</dd>
				{/if}

				{#if event.approvalData.spenderType}
					<dt>Spender Type</dt>
					<dd>{event.approvalData.spenderType}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if event.category === EventCategory.Swap && 'swapData' in event}
		<EntitySection title="Swap Details" entityType="event-swap">
			<dl>
				<dt>Swap Type</dt>
				<dd>{event.swapData.swapType}</dd>

				<dt>Sender</dt>
				<dd><a href="/actor/{event.swapData.sender}">{event.swapData.sender}</a></dd>

				<dt>Recipient</dt>
				<dd><a href="/actor/{event.swapData.recipient}">{event.swapData.recipient}</a></dd>

				<dt>Token In</dt>
				<dd><a href="/token/{event.swapData.tokenIn}">{event.swapData.tokenIn}</a>
					{#if event.swapData.tokenInSymbol} ({event.swapData.tokenInSymbol}){/if}
				</dd>

				<dt>Token Out</dt>
				<dd><a href="/token/{event.swapData.tokenOut}">{event.swapData.tokenOut}</a>
					{#if event.swapData.tokenOutSymbol} ({event.swapData.tokenOutSymbol}){/if}
				</dd>

				<dt>Amount In</dt>
				<dd>{event.swapData.amountIn}
					{#if event.swapData.amountInUsd} (${event.swapData.amountInUsd.toLocaleString()}){/if}
				</dd>

				<dt>Amount Out</dt>
				<dd>{event.swapData.amountOut}
					{#if event.swapData.amountOutUsd} (${event.swapData.amountOutUsd.toLocaleString()}){/if}
				</dd>

				{#if event.swapData.priceImpact}
					<dt>Price Impact</dt>
					<dd>{event.swapData.priceImpact}%</dd>
				{/if}

				{#if event.swapData.slippage}
					<dt>Slippage</dt>
					<dd>{event.swapData.slippage}%</dd>
				{/if}

				{#if event.swapData.poolAddress}
					<dt>Pool Address</dt>
					<dd><a href="/contract/{event.swapData.poolAddress}">{event.swapData.poolAddress}</a></dd>
				{/if}

				{#if event.swapData.poolFee}
					<dt>Pool Fee</dt>
					<dd>{event.swapData.poolFee} bps</dd>
				{/if}
			</dl>

			{#if event.swapData.route && event.swapData.route.length > 0}
				<details>
					<summary><h3>Swap Route</h3></summary>
					<ul>
						{#each event.swapData.route as hop, index}
							<li>
								Hop {index + 1}: <a href="/token/{hop}">{hop}</a>
							</li>
						{/each}
					</ul>
				</details>
			{/if}
		</EntitySection>
	{/if}

	{#if event.category === EventCategory.Liquidity && 'liquidityData' in event}
		<EntitySection title="Liquidity Details" entityType="event-liquidity">
			<dl>
				<dt>Action</dt>
				<dd>{event.liquidityData.action}</dd>

				<dt>Provider</dt>
				<dd><a href="/actor/{event.liquidityData.provider}">{event.liquidityData.provider}</a></dd>

				<dt>Pool Address</dt>
				<dd><a href="/contract/{event.liquidityData.poolAddress}">{event.liquidityData.poolAddress}</a></dd>

				<dt>Token 0</dt>
				<dd><a href="/token/{event.liquidityData.token0}">{event.liquidityData.token0}</a></dd>

				<dt>Token 1</dt>
				<dd><a href="/token/{event.liquidityData.token1}">{event.liquidityData.token1}</a></dd>

				<dt>Amount 0</dt>
				<dd>{event.liquidityData.amount0}</dd>

				<dt>Amount 1</dt>
				<dd>{event.liquidityData.amount1}</dd>

				{#if event.liquidityData.liquidityAmount}
					<dt>Liquidity Amount</dt>
					<dd>{event.liquidityData.liquidityAmount}</dd>
				{/if}

				{#if event.liquidityData.totalValueUsd}
					<dt>Total Value (USD)</dt>
					<dd>${event.liquidityData.totalValueUsd.toLocaleString()}</dd>
				{/if}

				{#if event.liquidityData.tokenId}
					<dt>Position ID</dt>
					<dd>{event.liquidityData.tokenId}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if event.category === EventCategory.Staking && 'stakingData' in event}
		<EntitySection title="Staking Details" entityType="event-staking">
			<dl>
				<dt>Action</dt>
				<dd>{event.stakingData.action}</dd>

				<dt>Staker</dt>
				<dd><a href="/actor/{event.stakingData.staker}">{event.stakingData.staker}</a></dd>

				{#if event.stakingData.validator}
					<dt>Validator</dt>
					<dd><a href="/actor/{event.stakingData.validator}">{event.stakingData.validator}</a></dd>
				{/if}

				<dt>Staking Token</dt>
				<dd><a href="/token/{event.stakingData.stakingToken}">{event.stakingData.stakingToken}</a></dd>

				<dt>Amount</dt>
				<dd>{event.stakingData.amount}</dd>

				{#if event.stakingData.rewardAmount}
					<dt>Reward Amount</dt>
					<dd>{event.stakingData.rewardAmount}</dd>
				{/if}

				{#if event.stakingData.apr}
					<dt>APR</dt>
					<dd>{event.stakingData.apr}%</dd>
				{/if}

				{#if event.stakingData.unlockTime}
					<dt>Unlock Time</dt>
					<dd><time datetime={new Date(event.stakingData.unlockTime * 1000).toISOString()}>{new Date(event.stakingData.unlockTime * 1000).toLocaleString()}</time></dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<!-- Entity relationships -->
	{#if event.$emitter}
		<EntitySection title="Contract Emitter" entityType="event-emitter">
			<dl>
				<dt>Contract Address</dt>
				<dd><a href="/contract/{event.$emitter.address}">{event.$emitter.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.$transaction}
		<EntitySection title="Related Transaction" entityType="event-transaction">
			<dl>
				<dt>Transaction ID</dt>
				<dd><a href="/transaction/{event.$transaction.id}">{event.$transaction.id}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.$block}
		<EntitySection title="Related Block" entityType="event-block">
			<dl>
				<dt>Block Hash</dt>
				<dd><a href="/block/{event.$block.blockHash}">{event.$block.blockHash}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.$fromActor}
		<EntitySection title="From Actor" entityType="event-from">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{event.$fromActor.address}">{event.$fromActor.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.$toActor}
		<EntitySection title="To Actor" entityType="event-to">
			<dl>
				<dt>Address</dt>
				<dd><a href="/actor/{event.$toActor.address}">{event.$toActor.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.$token}
		<EntitySection title="Related Token" entityType="event-token">
			<dl>
				<dt>Token Address</dt>
				<dd><a href="/token/{event.$token.address}">{event.$token.address}</a></dd>
			</dl>
		</EntitySection>
	{/if}

	{#if event.$relatedEvents && event.$relatedEvents.length > 0}
		<EntitySection title="Related Events" entityType="event-related">
			<ul>
				{#each event.$relatedEvents.slice(0, 10) as relatedEvent}
					<li>
						<a href="/event/{relatedEvent.id}">{relatedEvent.id}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}

	{#if event.$triggeredEvents && event.$triggeredEvents.length > 0}
		<EntitySection title="Triggered Events" entityType="event-triggered">
			<ul>
				{#each event.$triggeredEvents.slice(0, 10) as triggeredEvent}
					<li>
						<a href="/event/{triggeredEvent.id}">{triggeredEvent.id}</a>
					</li>
				{/each}
			</ul>
		</EntitySection>
	{/if}
</Entity> 