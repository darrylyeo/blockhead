<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import { availableNetworks, getNetworkRPC } from '$/data/networks'
	import { type PortfolioAccount, getLocalPortfolios, connectedProviderAccounts } from '$/state/portfolio-accounts'
	import { usdStablecoinTokens } from '$/data/tokens'


	import { getViemPublicClient } from '$/data/networkProviders'
	import { preferences } from '$/state/preferences'

	import { Connext } from '$/api/connext/swaps'
	
	
	export let transferSolution: 'Connext' | 'Etherspot' | '1inch' = 'Etherspot'


	let defaultToAccount: Partial<PortfolioAccount> & Pick<PortfolioAccount, 'id'> = {id: ''}

	let fromNetwork: Ethereum.Network
	let fromAccount: PortfolioAccount
	let fromToken: Ethereum.ContractAddress
	let fromTokenAmount: number = 0
	
	let toNetwork: Ethereum.Network
	let toAccount: PortfolioAccount = defaultToAccount
	let toToken: Ethereum.ContractAddress
	let toTokenAmount: number = 0
	
	
	const localPortfolios = getLocalPortfolios()


	$: connextSwap = Connext.mainnetSwaps.find(({fromAssetId, toAssetId}) => fromAssetId === fromToken && toAssetId === toToken)
	$: conversionRate =
		connextSwap && connextSwap.priceType === 'hardcoded' ?
			connextSwap.hardcodedRate
		:
			undefined


	let fromTokenAmountInput: HTMLElement
	let fromTokenSelect: HTMLElement
	let toTokenAmountInput: HTMLElement
	let toTokenSelect: HTMLElement


	// import { startConnextTransfer } from '$/api/connext'
	// import { startEtherspotTransfer } from '$/api/etherspot'

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
		fromAccount: PortfolioAccount,
		fromToken: Ethereum.ContractAddress,
		fromTokenAmount: number
	
		toNetwork: Ethereum.Network,
		toAccount: PortfolioAccount,
		toToken: Ethereum.ContractAddress,
		toTokenAmount: number
	}){//console.log('onSubmit', 'transferSolution', transferSolution)
		const fromNetworkProvider = await getViemPublicClient({
			network: fromNetwork,
			networkProvider: $preferences.rpcNetwork
		})
		const toNetworkProvider = await getViemPublicClient({
			network: toNetwork,
			networkProvider: $preferences.rpcNetwork
		})


		if(transferSolution === 'Connext'){
			// await startConnextTransfer({
			// 	fromNetwork,
			// 	fromNetworkProvider,
			// 	fromAccount,
			// 	fromToken,
			// 	fromTokenAmount,
			
			// 	toNetwork,
			// 	toNetworkProvider,
			// 	toAccount,
			// 	toToken,
			// 	toTokenAmount,
			// })


			// const { BrowserNode } = await import('@connext/vector-browser-node')
			// const node = new BrowserNode({
			// 	// routerPublicIdentifier, // optional, will set up channels if provided with supportedChains
			// 	// supportedChains, // optional, will set up channels if provided with routerPublicIdentifier
			// 	// iframeSrc, // defaults to hosted iframe app https://wallet.connext.network
			// 	chainProviders: {
			// 		[fromNetwork.chainId]: getNetworkRPC(fromNetwork),
			// 		[toNetwork.chainId]: getNetworkRPC(toNetwork)
			// 	}, // node URLs keyed by chainId
			// 	// messagingUrl, // defaults to prod https://messaging.connext.network
			// })
			// await node.init() // function to intialize browser node
		}
		else if(transferSolution === 'Etherspot'){
			// await startEtherspotTransfer({
			// 	fromNetwork,
			// 	fromNetworkProvider,
			// 	fromAccount,
			// 	fromToken,
			// 	fromTokenAmount,
			
			// 	toNetwork,
			// 	toNetworkProvider,
			// 	toAccount,
			// 	toToken,
			// 	toTokenAmount,
			// })
		}
	}


	import AddressField from './AddressField.svelte'


	import { scale } from 'svelte/transition'
</script>


<style>
	.columns {
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fit, minmax(min(20rem, 100%), 1fr));
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

	label {
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


<form class="column" on:submit|preventDefault={() => onSubmit({
	fromNetwork,
	fromAccount,
	fromToken,
	fromTokenAmount,

	toNetwork,
	toAccount,
	toToken,
	toTokenAmount
})}>
	<div class="columns">
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
						{#each Object.entries($connectedProviderAccounts) as [providerName, accounts]}
							{#if accounts?.length}
								{#each accounts as account}
									<optgroup label={providerName}>
										<option value={account}>{account.id}</option>
									</optgroup>
								{/each}
							{/if}
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
			<div class="card" transition:scale|global>
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
						{/each}
						{#each Object.entries($connectedProviderAccounts) as [providerName, accounts]}
							{#if accounts?.length}
								{#each accounts as account}
									<optgroup label={providerName}>
										<option value={account}>{account.id}</option>
									</optgroup>
								{/each}
							{/if}
						{/each}
						<optgroup label="Other">
							<option value={defaultToAccount}>Enter Address...</option>
						</optgroup>
					</select>
					{#if toAccount === defaultToAccount}
						<AddressField bind:value={defaultToAccount.id} required autofocus />
					{/if}
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
	</div>

	<button type="submit">Start Transfer</button>
</form>