<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { SolidityJsonAbi } from '../api/sourcify'
	import type { ConnectedAccount } from '../state/account'


	export let network: Ethereum.Network
	export let contractAddress: Ethereum.ContractAddress
	export let contractName: string
	export let abi: SolidityJsonAbi

	$: methods = abi.filter(part => part.type === 'function')


	// let account: ConnectedAccount

	let selectedMethod: SolidityJsonAbi[number] = methods?.[0]
	
	const tx = {
		inputs: {}
	}

	let isSimulating = false


	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'


	import AddressWithLabel from './AddressWithLabel.svelte'
	// import ConnectedAccountSelect from './ConnectedAccountSelect.svelte'
	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<style>
	form {
		
		/* justify-self: center; */
	}

	form input {
		flex: 1;
	}
</style>


<section class="column">
	<header class="bar">
		<h3>Simulate Transaction</h3>

		<label>
			<span>Method</span>
			<select bind:value={selectedMethod}>
				{#each methods as method}
					<option value={method}>{method.name}</option>
				{/each}
			</select>
		</label>
	</header>

	{#if selectedMethod}
		{@const method = selectedMethod}

		{#if method.type === 'function'}
			<form
				class="card column"
				on:submit|preventDefault={() => isSimulating = true}
				disabled={isSimulating}
				tabindex={0}
			>
				<header class="bar">
					<h4 class="row-inline">
						<!-- <span class="row-inline"> -->
							<NetworkIcon {network} />
							<!-- {network.name}
						</span> -->
						›
						<AddressWithLabel
							{network}
							label={contractName}
							address={contractAddress}
							format="middle-truncated"
							linked
						/>
						›
						<abbr title={method.name}>{formatIdentifierToWords(method.name, true)}</abbr>
					</h4>

					<!-- <label>
						<span>From</span>
						<ConnectedAccountSelect bind:account={account} />
					</label> -->
				</header>

				{#if method.inputs.length}
					<hr>

					{#each method.inputs as input}
						<label class="bar">
							<span class="row">
								<span>
									<abbr title={input.name}>{formatIdentifierToWords(input.name, true)}</abbr>
								</span>
								
								{#if input.type.startsWith('int')}
									<input
										type="number"
										min={-(2 ** (parseInt(input.type) - 1))}
										max={2 ** (parseInt(input.type) - 1)}
										bind:value={tx.inputs[input.name]}
									/>
								{:else if input.type.startsWith('uint')}
									<input
										type="number"
										min="0"
										max={2 ** parseInt(input.type)}
										bind:value={tx.inputs[input.name]}
									/>
								{:else}
									<input
										type="text"
										bind:value={tx.inputs[input.name]}
									/>
								{/if}
							</span>

							<abbr class="card-annotation" title="{input.type} ({input.indexed} {input.internalType})">{input.type}</abbr>
						</label>
					{/each}
				{/if}

				<hr>

				<footer class="bar">
					<label>
						<!-- <span>Estimated Gas:</span>
						<output>

							gwei
						</output> -->
					</label>

					<button type="submit">Simulate</button>
				</footer>
			</form>

			<!-- {#if isSimulating}
				<Loader></Loader>
				<output></output>
			{/if} -->
		{/if}
	{/if}
</section>
