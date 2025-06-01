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

	// State
	let isOpen = $state(false)

	// Get current datasource info
	const currentDatasource = $derived(
		datasources.find(ds => ds.id === selectedDatasource.current) ?? datasources[0]
	)

	// Toggle dropdown
	const toggleDropdown = () => {
		isOpen = !isOpen
	}

	// Select datasource
	const selectDatasource = (datasource: DataSource) => {
		selectedDatasource.current = datasource
		isOpen = false
	}

	// Close dropdown when clicking outside
	const handleOutsideClick = (event: MouseEvent) => {
		if (isOpen && !(event.target as Element)?.closest('.datasource-picker')) {
			isOpen = false
		}
	}
</script>

<svelte:window onclick={handleOutsideClick} />

<div class="datasource-picker">
	<button
		class="current-datasource"
		onclick={toggleDropdown}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		title={`Current datasource: ${currentDatasource.name}`}
	>
		<img
			src={currentDatasource.icon}
			alt={currentDatasource.name}
			class="datasource-icon"
		/>
		<span class="datasource-name">{currentDatasource.name}</span>
		<svg
			class="chevron"
			class:rotated={isOpen}
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
		>
			<path
				d="M3 4.5L6 7.5L9 4.5"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>

	{#if isOpen}
		<div class="dropdown" role="listbox">
			{#each datasources as datasource}
				<button
					class="datasource-option"
					class:selected={datasource.id === selectedDatasource.current}
					onclick={() => selectDatasource(datasource.id)}
					role="option"
					aria-selected={datasource.id === selectedDatasource.current}
					title={datasource.description}
				>
					<img
						src={datasource.icon}
						alt={datasource.name}
						class="datasource-icon"
					/>
					<div class="datasource-info">
						<span class="datasource-name">{datasource.name}</span>
						<span class="datasource-description">{datasource.description}</span>
					</div>
					{#if datasource.id === selectedDatasource.current}
						<svg
							class="check-icon"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							<path
								d="M13.5 4.5L6 12L2.5 8.5"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.datasource-picker {
		position: relative
	}

	.current-datasource {
		display: flex
		align-items: center
		gap: 8px
		padding: 8px 12px
		background: rgba(255, 255, 255, 0.9)
		border: 1px solid rgba(0, 0, 0, 0.1)
		border-radius: 8px
		cursor: pointer
		transition: all 0.2s ease
		font-size: 14px
		color: #333
		backdrop-filter: blur(10px)
	}

	.current-datasource:hover {
		background: rgba(255, 255, 255, 0.95)
		border-color: rgba(0, 0, 0, 0.2)
	}

	.datasource-icon {
		width: 20px
		height: 20px
		object-fit: contain
	}

	.datasource-name {
		font-weight: 500
	}

	.chevron {
		transition: transform 0.2s ease
		color: #666
	}

	.chevron.rotated {
		transform: rotate(180deg)
	}

	.dropdown {
		position: absolute
		top: 100%
		left: 0
		right: 0
		margin-top: 4px
		background: white
		border: 1px solid rgba(0, 0, 0, 0.1)
		border-radius: 8px
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
		z-index: 1000
		overflow: hidden
	}

	.datasource-option {
		display: flex
		align-items: center
		gap: 12px
		width: 100%
		padding: 12px
		border: none
		background: white
		cursor: pointer
		transition: background-color 0.2s ease
		text-align: left
	}

	.datasource-option:hover {
		background: rgba(0, 0, 0, 0.05)
	}

	.datasource-option.selected {
		background: rgba(59, 130, 246, 0.1)
	}

	.datasource-info {
		flex: 1
		display: flex
		flex-direction: column
		gap: 2px
	}

	.datasource-description {
		font-size: 12px
		color: #666
	}

	.check-icon {
		color: #3b82f6
	}

	/* Dark mode */
	@media (prefers-color-scheme: dark) {
		.current-datasource {
			background: rgba(34, 34, 34, 0.9)
			border-color: rgba(255, 255, 255, 0.1)
			color: #e5e5e5
		}

		.current-datasource:hover {
			background: rgba(34, 34, 34, 0.95)
			border-color: rgba(255, 255, 255, 0.2)
		}

		.dropdown {
			background: #1f1f1f
			border-color: rgba(255, 255, 255, 0.1)
		}

		.datasource-option {
			background: #1f1f1f
			color: #e5e5e5
		}

		.datasource-option:hover {
			background: rgba(255, 255, 255, 0.05)
		}

		.datasource-option.selected {
			background: rgba(59, 130, 246, 0.2)
		}

		.datasource-description {
			color: #a3a3a3
		}
	}
</style> 