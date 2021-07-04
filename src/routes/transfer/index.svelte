<script lang="ts">
	import type { Ethereum } from '../../data/ethereum/types'
	import { availableNetworks } from '../../data/ethereum/networks'
	import { Account, getLocalPortfolios } from '../../data/ethereum/portfolio-accounts'
	import { usdStablecoinTokens } from '../../data/ethereum/tokens/tokens'


	import { getProvider } from '../../data/ethereum/provider'
	import { preferredEthereumProvider } from '../../data/ethereum/preferences'
	
	
	const localPortfolios = getLocalPortfolios()
	
	
	let fromNetwork: Ethereum.Network
	let fromAccount: Account
	let fromToken: Ethereum.ContractAddress
	let fromTokenAmount: number = 0
	
	let toNetwork: Ethereum.Network
	let toAccount: Account
	let toToken: Ethereum.ContractAddress
	let toTokenAmount: number = 0

	let transferSolution


	let conversionRate


	let fromTokenAmountInput: HTMLElement
	let fromTokenSelect: HTMLElement
	let toTokenAmountInput: HTMLElement
	let toTokenSelect: HTMLElement


	async function onSubmit({
		fromNetwork,
		fromAccount,
		fromToken,
		fromTokenAmount,
	
		toNetwork,
		toAccount,
		toToken,
		toTokenAmount,
	}: {
		fromNetwork: Ethereum.Network,
		fromAccount: Account,
		fromToken: Ethereum.ContractAddress,
		fromTokenAmount: number
	
		toNetwork: Ethereum.Network,
		toAccount: Account,
		toToken: Ethereum.ContractAddress,
		toTokenAmount: number
	}){
		const fromNetworkProvider = await getProvider(fromNetwork, $preferredEthereumProvider, 'ethers')
		const toNetworkProvider = await getProvider(toNetwork, $preferredEthereumProvider, 'ethers')

	}


	import Preferences from '../../components/Preferences.svelte'


	import { fly, scale } from 'svelte/transition'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		gap: 1.25rem;
	}

	.row {
		align-items: start;
	}
	/* .row {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.row > * {
		flex: 1 calc(50% - var(--padding-inner));
		flex: 1 max(20rem, calc(50% - var(--padding-inner)));
	} */

	.column {
		--padding-inner: 0.25em;
	}

	label > span {
		display: block;
		opacity: 0.7;
		letter-spacing: 0.2ch;
		font-size: 0.8em;
		text-transform: uppercase;
	}

	input[type="range"] {
		display: block;
	}
</style>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<h1>Transfer Assets</h1>

	<form class="card" on:submit|preventDefault={() => onSubmit({
		fromNetwork,
		fromAccount,
		fromToken,
		fromTokenAmount,
	
		toNetwork,
		toAccount,
		toToken,
		toTokenAmount
	})}>
		<div class="card">
			<h3>From</h3>

			<div class="row">
				<label class="column">
					<span>Network</span>
					<select bind:value={fromNetwork}>
						{#each availableNetworks as network}
							<option value={network}>{network.name}</option>
						{/each}
					</select>
				</label>

				<label class="column">
					<span>Account</span>
					<select bind:value={fromAccount}>
						{#each $localPortfolios as {name, accounts}, i (i)}
							<optgroup label={name}>
								{#each accounts as account}
									<option value={account}>{account.id}</option>
								{/each}
							</optgroup>
						{/each}
					</select>
				</label>
			</div>

			<div class="row">
				<label class="column">
					<span>Amount</span>
					<input type="number"
						bind:this={fromTokenAmountInput}
						bind:value={fromTokenAmount}
						min={0}
						max={fromAccount?.tokenBalances?.[network.chainId]?.[fromAsset]?.amount}
						placeholder={0.00}
						on:keydown={e => {
							if(e.code.startsWith('Key')){
								fromTokenSelect.focus()
								fromTokenSelect.dispatchEvent(new KeyboardEvent(e.type, e))
							}
							if(e.code === 'Space')
								fromTokenSelect.focus()
						}}
					/>
					<input type="range"
						bind:value={fromTokenAmount}
						min={0}
						max={fromAccount?.tokenBalances?.[network.chainId]?.[fromAsset]?.amount}
						placeholder={0.00}
					/>
				</label>

				<label class="column">
					<span>Token</span>
					<select
						bind:this={fromTokenSelect}
						bind:value={fromToken}
					>
						<optgroup label="USD-Pegged Stablecoins">
							{#each usdStablecoinTokens as token, i (token.address)}
								<option value={token}>{token.symbol} ({token.name})</option>
							{/each}
						</optgroup>
					</select>
				</label>
			</div>
		</div>

		{#if conversionRate !== undefined}
			<div class="card" transition:scale>
				<h3>Conversion Rate:</h3>
				{conversionRate}
			</div>
		{/if}

		<div class="card">
			<h3>To</h3>

			<div class="row">
				<label class="column">
					<span>Network</span>
					<select bind:value={toNetwork}>
						{#each availableNetworks as network}
							<option value={network}>{network.name}</option>
						{/each}
					</select>
				</label>

				<label class="column">
					<span>Account</span>
					<select bind:value={toAccount}>
						{#each $localPortfolios as {name, accounts}, i (i)}
							<optgroup label={name}>
								{#each accounts as account}
									<option value={account}>{account.id}</option>
								{/each}
							</optgroup>
							<option value="other">Other</option>
						{/each}
					</select>
				</label>
			</div>

			<div class="row">
				<label class="column">
					<span>Amount</span>
					<input type="number"
						bind:this={toTokenAmountInput}
						bind:value={toTokenAmount}
						min={0}
						max={fromAccount?.tokenBalances?.[network.chainId]?.[fromAsset]?.amount * conversionRate}
						placeholder={0.00}
						on:keydown={e => {
							if(e.code.startsWith('Key')){
								toTokenSelect.focus()
								toTokenSelect.dispatchEvent(new KeyboardEvent(e.type, e))
							}
							if(e.code === 'Space')
								toTokenSelect.focus()
						}}
					/>
					<input type="range"
						bind:value={toTokenAmount}
						min={0}
						max={fromAccount?.tokenBalances?.[network.chainId]?.[fromAsset]?.amount * conversionRate}
						placeholder={0.00}
					/>
				</label>

				<label class="column">
					<span>Token</span>
					<select
						bind:this={toTokenSelect}
						bind:value={toToken}
					>
						<optgroup label="USD-Pegged Stablecoins">
							{#each usdStablecoinTokens as token, i (token.address)}
								<option value={token}>{token.symbol} ({token.name})</option>
							{/each}
						</optgroup>
					</select>
				</label>
			</div>
		</div>

		<button type="submit">Start Transfer</button>
	</form>
</main>

<Preferences />