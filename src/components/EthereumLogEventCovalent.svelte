<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let logEvent: Covalent.LogEvent

	export let contextualAddress: Ethereum.Address // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'


	$: paramsContainingContextualAddress = new Set(
		contextualAddress
			? logEvent.decoded?.params?.filter(param => (
				param.type === 'address' &&
				param.value.toLowerCase() == contextualAddress.toLowerCase()
			))
			: []
	)

	$: isToken =
		logEvent.sender_contract_ticker_symbol &&
		logEvent.sender_address
	$: isTokenTransfer =
		logEvent.decoded &&
		logEvent.decoded.name === 'Transfer' &&
		logEvent.decoded.params.length === 3 &&
		logEvent.decoded.params[0]?.name === 'from' &&
		logEvent.decoded.params[1]?.name === 'to' &&
		logEvent.decoded.params[2]?.name === 'value'
	$: isTokenMint =
		isTokenTransfer &&
		logEvent.decoded.params[0]?.value === '0x0000000000000000000000000000000000000000'
	$: isTokenBurn =
		isTokenTransfer &&
		logEvent.decoded.params[1]?.value === '0x0000000000000000000000000000000000000000'

	$: if(logEvent.sender_address_label === 'null') logEvent.sender_address_label = ''
	$: if(logEvent.sender_contract_ticker_symbol === 'null') logEvent.sender_contract_ticker_symbol = ''


	export let isHidden
	$: isHidden = !(logEvent.decoded && (isExhaustive || paramsContainingContextualAddress.size))


	const hiddenEllipsis = '︙' // '• • •'


	import Address from './Address.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import TokenName from './TokenName.svelte'
</script>


<style>
	.log-event {
		display: grid;
		grid-auto-flow: column;
		justify-content: start;
		gap: var(--padding-inner);
		--padding-inner: 1.25em;
		align-items: baseline;
		border-radius: 0.3em;
	}
	.log-event:not(.hidden):hover {
		backdrop-filter: contrast(1.05);
	}

	.log-event-contract-and-name {
		display: inline-grid;
		grid-template-columns: auto 1fr;
		align-items: baseline;

		gap: 0.66em;
		width: 16em;

		font-weight: bold;
	}
	.log-event-contract .address {
		font-size: 0.9em;
	}
	.log-event-index {
		opacity: 0.6;
		min-width: 3ch;
		text-align: end;
	}
	.log-event-name {
		font-size: 1em;
		text-align: end;
		justify-self: end;
	}

	.parameters {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--padding-inner);
		font-size: 0.9em;
	}
	.parameter {
		flex: 0 auto;
		display: inline-block;
	}

	.mint {
		--primary-color: var(--up-green);
	}
	.burn {
		--primary-color: var(--down-red);
	}


	.log-event.hidden {
		font-weight: bold;
		opacity: 0.33;
	}
	.log-event.hidden + :global(.log-event.hidden) {
		display: none;
	}

	/* .log-event.hidden {
		display: none;
	}
	.log-event:not(.hidden) + :global(.log-event.hidden) { 
		display: grid;
	} */
</style>


<article class="log-event" class:hidden={isHidden}>
	{#if isExhaustive}
		<span class="log-event-index">{isHidden ? hiddenEllipsis : logEvent.log_offset}</span>
	{/if}
	<header class="log-event-contract-and-name">
		<span class="log-event-contract">
			{#if isHidden}
				{hiddenEllipsis}
			{:else if isToken}
				<TokenName
					symbol={logEvent.sender_contract_ticker_symbol}
					address={logEvent.sender_address}
					name={logEvent.sender_address_label}
					icon={logEvent.sender_address_icon}
				/>
			{:else}
				<span class="address">
					<AddressWithLabel
						{network}
						address={logEvent.sender_address}
						label={
							logEvent.sender_address_label && logEvent.sender_contract_ticker_symbol ?
								`${logEvent.sender_address_label} (${logEvent.sender_contract_ticker_symbol})`
							:
								logEvent.sender_address_label
							||
								logEvent.sender_contract_ticker_symbol
						}
						format="middle-truncated"
						alwaysShowAddress={isExhaustive}
					/>
				</span>
			{/if}
		</span>
		<h4 class="log-event-name" class:mark={isExhaustive && paramsContainingContextualAddress.size} title={logEvent.decoded?.name}>
			{isHidden
				? hiddenEllipsis
				: logEvent.decoded?.name.replace(/[A-Z]+/g, m => ` ${m}`).replace(/_/g, ' ').trim()
			}
		</h4>
	</header>
	{#if !isHidden && logEvent.decoded?.params?.length}
		<span class="parameters">
			{#each logEvent.decoded.params as param}
				<span
					class="parameter"
					class:mark={(isTokenMint && param.name === 'from') || (isTokenBurn && param.name === 'to')}
					class:mint={isTokenMint && param.name === 'from'}
					class:burn={isTokenBurn && param.name === 'to'}
				>
					<span class="parameter-name" title={param.name}>{param.name.replace(/[A-Z]+/g, m => ` ${m.toLowerCase()}`).replace(/_/g, ' ').trim()}</span>
					{#if isTokenMint && param.name === 'from'}🌱{/if}
					{#if isTokenBurn && param.name === 'to'}🔥{/if}
					{#if param.type === 'address'}
						<span class="address" class:mark={paramsContainingContextualAddress.has(param)}>
							<Address {network} address={param.value} format="middle-truncated" />
						</span>
					{:else}
						<output class="parameter-value" title={param.value}>{param.value}</output>
					{/if}
				</span>
			{/each}
		</span>
	{/if}
</article>