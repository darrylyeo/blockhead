<script lang="ts">
	// Types/constants
	import type { Transfer } from '$/entities/transfer'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { transfer }: { transfer: Transfer } = $props()
</script>


<Entity
	type={EntityType.Transfer}
	id={transfer?.id}
	title={transfer?.id}
	annotation={`${transfer?.standard} Transfer`}
>
	<EntitySection
		title="Transfer Information"
		entityType="transfer-basic"
	>
		<dl>
			<dt>Transfer ID</dt>
			<dd>{transfer?.id}</dd>

			<dt>Chain ID</dt>
			<dd>{transfer?.chainId}</dd>

			<dt>Category</dt>
			<dd>{transfer?.category}</dd>

			<dt>Standard</dt>
			<dd>{transfer?.standard}</dd>

			{#if transfer?.timestamp}
				<dt>Timestamp</dt>
				<dd>
					<time
						datetime={new Date(
							transfer.timestamp * 1000,
						).toISOString()}
						>{new Date(
							transfer.timestamp * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}

			<dt>From</dt>
			<dd><a href="/address/{transfer?.from}">{transfer?.from}</a></dd>

			<dt>To</dt>
			<dd><a href="/address/{transfer?.to}">{transfer?.to}</a></dd>

			<dt>Block Number</dt>
			<dd>
				<a href="/block/{transfer?.blockNumber}"
					>{transfer?.blockNumber}</a
				>
			</dd>

			<dt>Transaction Index</dt>
			<dd>{transfer?.transactionIndex}</dd>

			{#if transfer?.logIndex !== undefined}
				<dt>Log Index</dt>
				<dd>{transfer.logIndex}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if transfer?.transaction}
		<EntitySection
			title="Related Transaction"
			entityType="transfer-transaction"
		>
			<dl>
				<dt>Transaction Hash</dt>
				<dd>
					<a href="/transaction/{transfer.transaction.hash}"
						>{transfer.transaction.hash}</a
					>
				</dd>
				{#if transfer.transaction.type}
					<dt>Type</dt>
					<dd>{transfer.transaction.type}</dd>
				{/if}
				{#if transfer.transaction.status}
					<dt>Status</dt>
					<dd>{transfer.transaction.status}</dd>
				{/if}
				{#if transfer.transaction.isSuccess !== undefined}
					<dt>Success</dt>
					<dd>{transfer.transaction.isSuccess ? 'Yes' : 'No'}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer?.block}
		<EntitySection
			title="Related Block"
			entityType="transfer-block"
		>
			<dl>
				<dt>Block Number</dt>
				<dd>
					<a href="/block/{transfer.block.number}"
						>{transfer.block.number}</a
					>
				</dd>
				<dt>Block Hash</dt>
				<dd>
					<a href="/block/{transfer.block.hash}"
						>{transfer.block.hash}</a
					>
				</dd>
				{#if transfer.block.timestamp}
					<dt>Block Timestamp</dt>
					<dd>
						<time
							datetime={new Date(
								transfer.block.timestamp * 1000,
							).toISOString()}
							>{new Date(
								transfer.block.timestamp * 1000,
							).toLocaleString()}</time
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer?.token}
		<EntitySection
			title="Token Information"
			entityType="transfer-token"
		>
			<dl>
				<dt>Token Address</dt>
				<dd>
					<a href="/token/{transfer.token.address}"
						>{transfer.token.address}</a
					>
				</dd>
				{#if transfer.token.name}
					<dt>Name</dt>
					<dd>{transfer.token.name}</dd>
				{/if}
				{#if transfer.token.symbol}
					<dt>Symbol</dt>
					<dd>{transfer.token.symbol}</dd>
				{/if}
				{#if transfer.token.decimals !== undefined}
					<dt>Decimals</dt>
					<dd>{transfer.token.decimals}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if transfer?.context}
		<EntitySection
			title="Transfer Context"
			entityType="transfer-context"
		>
			<dl>
				{#if transfer.context.method}
					<dt>Method</dt>
					<dd>{transfer.context.method}</dd>
				{/if}
				{#if transfer.context.protocol}
					<dt>Protocol</dt>
					<dd>{transfer.context.protocol}</dd>
				{/if}
				{#if transfer.context.application}
					<dt>Application</dt>
					<dd>{transfer.context.application}</dd>
				{/if}
				{#if transfer.context.description}
					<dt>Description</dt>
					<dd>{transfer.context.description}</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}
</Entity>
