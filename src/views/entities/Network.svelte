<script lang="ts">
	// Types/constants
	import type { Network } from '$/entities/network'
	import { EntityType } from '$/entities'


	// Props
	let { network }: { network: Network } = $props()


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>


<Entity
	type={EntityType.Network}
	id={network.chainId}
	title={network.name}
	annotation="Network"
>
	<EntitySection
		title="Basic Information"
		entityType="network-basic"
	>
		<dl>
			<dt>Network ID</dt>
			<dd>{network.id}</dd>

			<dt>Chain ID</dt>
			<dd>{network.chainId}</dd>

			<dt>Name</dt>
			<dd>{network.name}</dd>

			{#if network.shortName}
				<dt>Short Name</dt>
				<dd>{network.shortName}</dd>
			{/if}

			{#if network.slug}
				<dt>Slug</dt>
				<dd>{network.slug}</dd>
			{/if}

			<dt>Type</dt>
			<dd>{network.type}</dd>

			<dt>Consensus</dt>
			<dd>{network.consensus}</dd>

			<dt>Status</dt>
			<dd>{network.status}</dd>

			<dt>Testnet</dt>
			<dd>{network.isTestnet ? 'Yes' : 'No'}</dd>

			{#if network.isDeprecated}
				<dt>Deprecated</dt>
				<dd>Yes</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Network Hierarchy"
		entityType="network-hierarchy"
	>
		<dl>
			{#if network.parentChainId}
				<dt>Parent Chain ID</dt>
				<dd>{network.parentChainId}</dd>
			{/if}

			{#if network.parentNetworkId}
				<dt>Parent Network</dt>
				<dd>
					<a href="/network/{network.parentNetworkId}"
						>{network.parentNetworkId}</a
					>
				</dd>
			{/if}
		</dl>

		{#if network.childChainIds && network.childChainIds.length > 0}
			<details>
				<summary
					><h3>
						Child Chains ({network.childChainIds.length})
					</h3></summary
				>
				<ul>
					{#each network.childChainIds as childId}
						<li>Chain ID: {childId}</li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Native Currency"
		entityType="network-currency"
	>
		<dl>
			<dt>Name</dt>
			<dd>{network.nativeCurrency.name}</dd>

			<dt>Symbol</dt>
			<dd>{network.nativeCurrency.symbol}</dd>

			<dt>Decimals</dt>
			<dd>{network.nativeCurrency.decimals}</dd>

			{#if network.nativeCurrency.contractAddress}
				<dt>Contract Address</dt>
				<dd>
					<a href="/contract/{network.nativeCurrency.contractAddress}"
						>{network.nativeCurrency.contractAddress}</a
					>
				</dd>
			{/if}

			{#if network.wrappedNativeToken}
				<dt>Wrapped Native Token</dt>
				<dd>
					<a href="/contract/{network.wrappedNativeToken}"
						>{network.wrappedNativeToken}</a
					>
				</dd>
			{/if}
		</dl>

		{#if network.gasToken}
			<details>
				<summary><h3>Gas Token</h3></summary>
				<dl>
					<dt>Name</dt>
					<dd>{network.gasToken.name}</dd>

					<dt>Symbol</dt>
					<dd>{network.gasToken.symbol}</dd>

					<dt>Decimals</dt>
					<dd>{network.gasToken.decimals}</dd>

					{#if network.gasToken.contractAddress}
						<dt>Contract Address</dt>
						<dd>
							<a
								href="/contract/{network.gasToken
									.contractAddress}"
								>{network.gasToken.contractAddress}</a
							>
						</dd>
					{/if}
				</dl>
			</details>
		{/if}
	</EntitySection>

	<EntitySection
		title="Network Parameters"
		entityType="network-parameters"
	>
		<dl>
			<dt>Block Time</dt>
			<dd>{network.blockTime} seconds</dd>

			<dt>Block Gas Limit</dt>
			<dd>{network.blockGasLimit}</dd>

			{#if network.finalityBlocks}
				<dt>Finality Blocks</dt>
				<dd>{network.finalityBlocks}</dd>
			{/if}

			{#if network.confirmationsRequired}
				<dt>Confirmations Required</dt>
				<dd>{network.confirmationsRequired}</dd>
			{/if}

			{#if network.eip1559}
				<dt>EIP-1559</dt>
				<dd>Enabled</dd>
			{/if}

			{#if network.baseFeePerGas}
				<dt>Base Fee Per Gas</dt>
				<dd>{network.baseFeePerGas}</dd>
			{/if}

			{#if network.priorityFeePerGas}
				<dt>Priority Fee Per Gas</dt>
				<dd>{network.priorityFeePerGas}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if network.rollupConfig}
		<EntitySection
			title="Rollup Configuration"
			entityType="network-rollup"
		>
			<dl>
				<dt>Rollup Type</dt>
				<dd>{network.rollupConfig.type}</dd>

				{#if network.rollupConfig.bridgeContract}
					<dt>Bridge Contract</dt>
					<dd>
						<a
							href="/contract/{network.rollupConfig
								.bridgeContract}"
							>{network.rollupConfig.bridgeContract}</a
						>
					</dd>
				{/if}

				{#if network.rollupConfig.sequencer}
					<dt>Sequencer</dt>
					<dd>
						<a href="/actor/{network.rollupConfig.sequencer}"
							>{network.rollupConfig.sequencer}</a
						>
					</dd>
				{/if}

				{#if network.rollupConfig.proposer}
					<dt>Proposer</dt>
					<dd>
						<a href="/actor/{network.rollupConfig.proposer}"
							>{network.rollupConfig.proposer}</a
						>
					</dd>
				{/if}

				{#if network.rollupConfig.challenger}
					<dt>Challenger</dt>
					<dd>
						<a href="/actor/{network.rollupConfig.challenger}"
							>{network.rollupConfig.challenger}</a
						>
					</dd>
				{/if}

				{#if network.rollupConfig.dataAvailability}
					<dt>Data Availability</dt>
					<dd>{network.rollupConfig.dataAvailability}</dd>
				{/if}

				{#if network.rollupConfig.withdrawalPeriod}
					<dt>Withdrawal Period</dt>
					<dd>
						{network.rollupConfig.withdrawalPeriod / 86400} days
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<EntitySection
		title="Infrastructure"
		entityType="network-infrastructure"
	>
		{#if network.rpcUrls.default && network.rpcUrls.default.length > 0}
			<details>
				<summary><h3>RPC URLs</h3></summary>
				<dl>
					<dt>Default</dt>
					<dd>
						<ul>
							{#each network.rpcUrls.default as url}
								<li><code>{url}</code></li>
							{/each}
						</ul>
					</dd>

					{#if network.rpcUrls.public && network.rpcUrls.public.length > 0}
						<dt>Public</dt>
						<dd>
							<ul>
								{#each network.rpcUrls.public as url}
									<li><code>{url}</code></li>
								{/each}
							</ul>
						</dd>
					{/if}

					{#if network.rpcUrls.websocket && network.rpcUrls.websocket.length > 0}
						<dt>WebSocket</dt>
						<dd>
							<ul>
								{#each network.rpcUrls.websocket as url}
									<li><code>{url}</code></li>
								{/each}
							</ul>
						</dd>
					{/if}
				</dl>
			</details>
		{/if}

		{#if network.blockExplorers && network.blockExplorers.length > 0}
			<details>
				<summary
					><h3>
						Block Explorers ({network.blockExplorers.length})
					</h3></summary
				>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>URL</th>
							<th>Standard</th>
						</tr>
					</thead>
					<tbody>
						{#each network.blockExplorers as explorer}
							<tr>
								<td>{explorer.name}</td>
								<td
									><a
										href={explorer.url}
										target="_blank"
										rel="noopener">{explorer.url}</a
									></td
								>
								<td>{explorer.standard || '-'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}

		{#if network.bridges && network.bridges.length > 0}
			<details>
				<summary><h3>Bridges ({network.bridges.length})</h3></summary>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>URL</th>
							<th>Target Chain</th>
							<th>Contract</th>
						</tr>
					</thead>
					<tbody>
						{#each network.bridges as bridge}
							<tr>
								<td>{bridge.name}</td>
								<td
									><a
										href={bridge.url}
										target="_blank"
										rel="noopener">{bridge.url}</a
									></td
								>
								<td>{bridge.targetChainId}</td>
								<td
									>{bridge.contractAddress
										? bridge.contractAddress.slice(0, 10) +
											'...'
										: '-'}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</details>
		{/if}
	</EntitySection>

	{#if network.contracts}
		<EntitySection
			title="System Contracts"
			entityType="network-contracts"
		>
			<dl>
				{#if network.contracts.multicall}
					<dt>Multicall</dt>
					<dd>
						<a href="/contract/{network.contracts.multicall}"
							>{network.contracts.multicall}</a
						>
					</dd>
				{/if}

				{#if network.contracts.multicall2}
					<dt>Multicall2</dt>
					<dd>
						<a href="/contract/{network.contracts.multicall2}"
							>{network.contracts.multicall2}</a
						>
					</dd>
				{/if}

				{#if network.contracts.multicall3}
					<dt>Multicall3</dt>
					<dd>
						<a href="/contract/{network.contracts.multicall3}"
							>{network.contracts.multicall3}</a
						>
					</dd>
				{/if}

				{#if network.contracts.ensRegistry}
					<dt>ENS Registry</dt>
					<dd>
						<a href="/contract/{network.contracts.ensRegistry}"
							>{network.contracts.ensRegistry}</a
						>
					</dd>
				{/if}

				{#if network.contracts.ensUniversalResolver}
					<dt>ENS Universal Resolver</dt>
					<dd>
						<a
							href="/contract/{network.contracts
								.ensUniversalResolver}"
							>{network.contracts.ensUniversalResolver}</a
						>
					</dd>
				{/if}

				{#if network.contracts.weth}
					<dt>WETH</dt>
					<dd>
						<a href="/contract/{network.contracts.weth}"
							>{network.contracts.weth}</a
						>
					</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	{#if network.stats}
		<EntitySection
			title="Network Statistics"
			entityType="network-stats"
		>
			<dl>
				<dt>Latest Block</dt>
				<dd>{network.stats.latestBlock?.toLocaleString()}</dd>

				{#if network.stats.totalTransactions}
					<dt>Total Transactions</dt>
					<dd>{network.stats.totalTransactions?.toLocaleString()}</dd>
				{/if}

				{#if network.stats.totalAddresses}
					<dt>Total Addresses</dt>
					<dd>{network.stats.totalAddresses?.toLocaleString()}</dd>
				{/if}

				{#if network.stats.totalContracts}
					<dt>Total Contracts</dt>
					<dd>{network.stats.totalContracts?.toLocaleString()}</dd>
				{/if}

				{#if network.stats.averageBlockTime}
					<dt>Average Block Time</dt>
					<dd>{network.stats.averageBlockTime} seconds</dd>
				{/if}

				{#if network.stats.tps}
					<dt>TPS</dt>
					<dd>{network.stats.tps}</dd>
				{/if}

				{#if network.stats.gasPrice}
					<dt>Gas Price</dt>
					<dd>{network.stats.gasPrice}</dd>
				{/if}

				{#if network.stats.totalStaked}
					<dt>Total Staked</dt>
					<dd>{network.stats.totalStaked}</dd>
				{/if}

				{#if network.stats.validatorCount}
					<dt>Validator Count</dt>
					<dd>{network.stats.validatorCount?.toLocaleString()}</dd>
				{/if}

				{#if network.stats.apr}
					<dt>APR</dt>
					<dd>{network.stats.apr}%</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<EntitySection
		title="Resources"
		entityType="network-resources"
	>
		<dl>
			{#if network.infoUrl}
				<dt>Info URL</dt>
				<dd>
					<a
						href={network.infoUrl}
						target="_blank"
						rel="noopener">{network.infoUrl}</a
					>
				</dd>
			{/if}

			{#if network.documentation}
				<dt>Documentation</dt>
				<dd>
					<a
						href={network.documentation}
						target="_blank"
						rel="noopener">{network.documentation}</a
					>
				</dd>
			{/if}

			{#if network.iconUrl}
				<dt>Icon</dt>
				<dd>
					<img
						src={network.iconUrl}
						alt="{network.name} icon"
						style="max-width: 64px; max-height: 64px;"
					/>
				</dd>
			{/if}
		</dl>

		{#if network.faucets && network.faucets.length > 0}
			<details>
				<summary><h3>Faucets ({network.faucets.length})</h3></summary>
				<ul>
					{#each network.faucets as faucet}
						<li>
							<a
								href={faucet}
								target="_blank"
								rel="noopener">{faucet}</a
							>
						</li>
					{/each}
				</ul>
			</details>
		{/if}
	</EntitySection>
</Entity>
