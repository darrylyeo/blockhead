<script lang="ts">
	// Types/constants
	import { DataSource } from '$/data'
	import { selectedDatasource } from '$/state/datasource.svelte'

	// Icons
	import BlockscoutIcon from '$/icons/Blockscout.svg'
	import OneInchIcon from '$/icons/1inch.svg'
	import ETHIcon from '$/icons/ETH.svg'

	// Datasource configuration
	const datasources = [
		{
			id: DataSource.Blockscout,
			name: 'Blockscout',
			icon: BlockscoutIcon,
			description: 'Block explorer data'
		},
		{
			id: DataSource.OneInch,
			name: '1inch',
			icon: OneInchIcon,
			description: 'DEX aggregation data'
		},
		{
			id: DataSource.EthereumJsonRpc,
			name: 'Ethereum RPC',
			icon: ETHIcon,
			description: 'Direct node access'
		}
	]

	// Select datasource
	const selectDatasource = (datasource: DataSource) => {
		selectedDatasource.current = datasource
	}
</script>

<div class="datasource-picker">
	Source:
	{#each datasources as datasource}
		<button
			class="datasource-button"
			class:selected={datasource.id === selectedDatasource.current}
			onclick={() => selectDatasource(datasource.id)}
			title={`${datasource.name} - ${datasource.description}`}
		>
			<img
				src={datasource.icon}
				alt={datasource.name}
				class="datasource-icon"
			/>
			<span class="datasource-name">{datasource.name}</span>
		</button>
	{/each}
</div>

<style>
	.datasource-picker {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.datasource-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 10px;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 13px;
		color: #333;
		backdrop-filter: blur(10px);
		opacity: 0.5;
	}

	.datasource-button.selected {
		opacity: 1;
		background: rgba(255, 255, 255, 0.95);
		border-color: rgba(0, 0, 0, 0.2);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.datasource-button:hover {
		opacity: 0.8;
		background: rgba(255, 255, 255, 0.95);
	}

	.datasource-button.selected:hover {
		opacity: 1;
	}

	.datasource-icon {
		width: 16px;
		height: 16px;
		object-fit: contain;
		flex-shrink: 0;
	}

	.datasource-name {
		font-weight: 500;
		white-space: nowrap;
	}

	/* Dark mode */
	@media (prefers-color-scheme: dark) {
		.datasource-button {
			background: rgba(34, 34, 34, 0.9);
			border-color: rgba(255, 255, 255, 0.1);
			color: #e5e5e5;
		}

		.datasource-button.selected {
			background: rgba(34, 34, 34, 0.95);
			border-color: rgba(255, 255, 255, 0.2);
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		}

		.datasource-button:hover {
			background: rgba(34, 34, 34, 0.95);
		}
	}
</style>