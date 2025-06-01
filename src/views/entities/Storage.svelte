<script lang="ts">
	// Types/constants
	import type { Storage } from '$/entities/storage'
	import { EntityType } from '$/entities'


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'


	// Props
	let { storage }: { storage: Storage } = $props()
</script>


<Entity
	type={EntityType.Storage}
	id={storage.id}
	title={storage.id}
	annotation={`${storage.operation} Storage`}
>
	<EntitySection title="Storage Information" entityType="storage-basic">
		<dl>
			<dt>Storage ID</dt>
			<dd>{storage.id}</dd>
			
			<dt>Chain ID</dt>
			<dd>{storage.chainId}</dd>
			
			<dt>Operation</dt>
			<dd>{storage.operation}</dd>
			
			<dt>Context</dt>
			<dd>{storage.context}</dd>
			
			<dt>Granularity</dt>
			<dd>{storage.granularity}</dd>
			
			<dt>Contract Address</dt>
			<dd><a href="/address/{storage.contractAddress}">{storage.contractAddress}</a></dd>
			
			<dt>Storage Slot</dt>
			<dd>{storage.storageSlot}</dd>
			
			<dt>Value</dt>
			<dd>{storage.value}</dd>
		</dl>
	</EntitySection>

	<EntitySection title="Position & Timing" entityType="storage-position">
		<dl>
			<dt>Block Number</dt>
			<dd><a href="/block/{storage.blockNumber}">{storage.blockNumber.toLocaleString()}</a></dd>
			
			{#if storage.transactionIndex !== undefined}
				<dt>Transaction Index</dt>
				<dd>{storage.transactionIndex}</dd>
			{/if}
			
			{#if storage.traceIndex !== undefined}
				<dt>Trace Index</dt>
				<dd>{storage.traceIndex}</dd>
			{/if}
			
			<dt>Timestamp</dt>
			<dd>{new Date(storage.timestamp * 1000).toLocaleString()}</dd>
		</dl>
	</EntitySection>

	<EntitySection title="Gas Information" entityType="storage-gas">
		<dl>
			{#if storage.gasUsed !== undefined}
				<dt>Gas Used</dt>
				<dd>{storage.gasUsed.toLocaleString()}</dd>
			{/if}
			
			{#if storage.gasCost !== undefined}
				<dt>Gas Cost</dt>
				<dd>{storage.gasCost.toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection title="Access Patterns" entityType="storage-access">
		<dl>
			{#if storage.isWarmAccess !== undefined}
				<dt>Is Warm Access</dt>
				<dd>{storage.isWarmAccess}</dd>
			{/if}
			
			{#if storage.accessCount !== undefined}
				<dt>Access Count</dt>
				<dd>{storage.accessCount.toLocaleString()}</dd>
			{/if}
			
			{#if storage.lastAccessedAt !== undefined}
				<dt>Last Accessed At</dt>
				<dd>{new Date(storage.lastAccessedAt * 1000).toLocaleString()}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection title="Storage Metadata" entityType="storage-metadata">
		<dl>
			{#if storage.slotType}
				<dt>Slot Type</dt>
				<dd>{storage.slotType}</dd>
			{/if}
			
			{#if storage.dataType}
				<dt>Data Type</dt>
				<dd>{storage.dataType}</dd>
			{/if}
			
			{#if storage.encoding}
				<dt>Encoding</dt>
				<dd>{storage.encoding}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection title="Security Context" entityType="storage-security">
		<dl>
			{#if storage.isAdmin !== undefined}
				<dt>Is Admin</dt>
				<dd>{storage.isAdmin}</dd>
			{/if}
			
			{#if storage.isProxy !== undefined}
				<dt>Is Proxy</dt>
				<dd>{storage.isProxy}</dd>
			{/if}
			
			{#if storage.isCritical !== undefined}
				<dt>Is Critical</dt>
				<dd>{storage.isCritical}</dd>
			{/if}
			
			{#if storage.riskLevel}
				<dt>Risk Level</dt>
				<dd class="risk-level {storage.riskLevel}">{storage.riskLevel}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if storage.operation === 'Read' || storage.operation === 'WarmRead' || storage.operation === 'ColdRead'}
		{#if 'readData' in storage && storage.readData}
			<EntitySection title="Read Operation Data" entityType="storage-read">
				<dl>
					<dt>Read Value</dt>
					<dd>{storage.readData.readValue}</dd>
					
					{#if storage.readData.previousReads !== undefined}
						<dt>Previous Reads</dt>
						<dd>{storage.readData.previousReads.toLocaleString()}</dd>
					{/if}
					
					{#if storage.readData.cacheHit !== undefined}
						<dt>Cache Hit</dt>
						<dd>{storage.readData.cacheHit}</dd>
					{/if}
					
					{#if storage.readData.accessLatency !== undefined}
						<dt>Access Latency</dt>
						<dd>{storage.readData.accessLatency}ms</dd>
					{/if}
					
					{#if storage.readData.cacheLevel}
						<dt>Cache Level</dt>
						<dd>{storage.readData.cacheLevel}</dd>
					{/if}
					
					{#if storage.readData.valueType}
						<dt>Value Type</dt>
						<dd>{storage.readData.valueType}</dd>
					{/if}
					
					{#if storage.readData.isDefault !== undefined}
						<dt>Is Default</dt>
						<dd>{storage.readData.isDefault}</dd>
					{/if}
				</dl>
				
				{#if storage.readData.decodedValue !== undefined}
					<details>
						<summary><h3>Decoded Value</h3></summary>
						<pre>{JSON.stringify(storage.readData.decodedValue, null, 2)}</pre>
					</details>
				{/if}
			</EntitySection>
		{/if}
	{/if}

	{#if storage.operation === 'Write' || storage.operation === 'Create' || storage.operation === 'Delete'}
		{#if 'writeData' in storage && storage.writeData}
			<EntitySection title="Write Operation Data" entityType="storage-write">
				<dl>
					<dt>Write Value</dt>
					<dd>{storage.writeData.writeValue}</dd>
					
					{#if storage.writeData.previousValue}
						<dt>Previous Value</dt>
						<dd>{storage.writeData.previousValue}</dd>
					{/if}
					
					{#if storage.writeData.valueChange}
						<dt>Value Change</dt>
						<dd>{storage.writeData.valueChange}</dd>
					{/if}
					
					{#if storage.writeData.writeCount !== undefined}
						<dt>Write Count</dt>
						<dd>{storage.writeData.writeCount.toLocaleString()}</dd>
					{/if}
					
					{#if storage.writeData.dirtyFlag !== undefined}
						<dt>Dirty Flag</dt>
						<dd>{storage.writeData.dirtyFlag}</dd>
					{/if}
					
					{#if storage.writeData.compressionRatio !== undefined}
						<dt>Compression Ratio</dt>
						<dd>{storage.writeData.compressionRatio.toFixed(2)}</dd>
					{/if}
					
					{#if storage.writeData.isOptimized !== undefined}
						<dt>Is Optimized</dt>
						<dd>{storage.writeData.isOptimized}</dd>
					{/if}
				</dl>
				
				{#if storage.writeData.decodedValue !== undefined}
					<details>
						<summary><h3>Decoded Value</h3></summary>
						<pre>{JSON.stringify(storage.writeData.decodedValue, null, 2)}</pre>
					</details>
				{/if}
			</EntitySection>
		{/if}
	{/if}
</Entity> 