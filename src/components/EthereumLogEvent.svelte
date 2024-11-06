<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'


	export let network: Ethereum.Network
	export let logEvent: Ethereum.TransactionLogEvent
	export let contextualAddress: Ethereum.Address

	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let isCard = false


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'


	$: indexedParams = logEvent.decoded?.params.filter(param => param.indexed)
	$: eventSignatureIsTopic = indexedParams && logEvent.topics && indexedParams.length === logEvent.topics.length - 1
	$: paramsToTopic = indexedParams && logEvent.topics && new WeakMap(
		indexedParams.map((param, i, {length}) => {
			const topicIndex = logEvent.topics!.length + i - length
			return [param, {topicIndex, topicHash: logEvent.topics![topicIndex]}]
		})
	)

	$: paramsContainingContextualAddress = new Set(
		contextualAddress
			? logEvent.decoded?.params?.filter(param => (
				param.type === 'address' &&
				param.value.toLowerCase() == contextualAddress.toLowerCase()
			))
			: []
	)

	$: isToken =
		logEvent.contract &&
		logEvent.contract.symbol &&
		logEvent.contract.address
	$: isTokenTransfer =
		logEvent.decoded &&
		logEvent.decoded.name === 'Transfer' &&
		logEvent.decoded.params.length === 3 &&
		logEvent.decoded.params[0]?.name === 'from' &&
		logEvent.decoded.params[1]?.name === 'to' &&
		logEvent.decoded.params[2]?.name === 'value'
	$: isTokenMint =
		isTokenTransfer &&
		logEvent.decoded?.params[0]?.value === '0x0000000000000000000000000000000000000000'
	$: isTokenBurn =
		isTokenTransfer &&
		logEvent.decoded?.params[1]?.value === '0x0000000000000000000000000000000000000000'


	export let isHidden: boolean
	$: isHidden = !isExhaustive && !(logEvent.decoded && paramsContainingContextualAddress.size)


	const hiddenEllipsis = '︙' // '• • •'


	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'
	import { formatTransactionHash } from '$/utils/formatTransactionHash'
	import { formatUnits } from 'viem'
	import { isTruthy } from '$/utils/isTruthy'


	import Address from './Address.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import EthereumTopic from './EthereumTopic.svelte'
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

		font-weight: bold;
	}
	.log-event:not([data-detail-level="exhaustive"]) .log-event-contract-and-name {
		width: 16em;
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

	.column {
		gap: 0.2em;
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
	.parameter-name {
		opacity: 0.6;
	}


	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--padding-inner);
		font-size: 0.9em;
	}
	.topic-wrapper {
		flex: 0 auto;
		display: inline-block;
	}
	.topic-index {
		opacity: 0.6;
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


<article
	class="log-event"
	class:card={isCard}
	class:hidden={isHidden}
	data-detail-level={detailLevel}
	title={[
		logEvent.indexInBlock !== undefined && `Event #${logEvent.indexInBlock} in Block ${logEvent.blockNumber}`,
		logEvent.indexInTransaction !== undefined && `Event #${logEvent.indexInTransaction} in Transaction ${logEvent.transactionHash}`,
	].filter(isTruthy).join('\n\n')}
>
	{#if isExhaustive}
		<span class="log-event-index">{isHidden ? hiddenEllipsis : (logEvent.indexInBlock ?? logEvent.indexInTransaction)}</span>
	{/if}

	<header class="log-event-contract-and-name">
		<span class="log-event-contract">
			{#if isHidden}
				{hiddenEllipsis}
			{:else if isToken}
				<TokenName
					token={logEvent.contract}
				/>
			{:else}
				<span class="address">
					<AddressWithLabel
						{network}
						address={logEvent.contract.address}
						label={
							logEvent.contract.label && logEvent.contract.symbol ?
								`${logEvent.contract.label} (${logEvent.contract.symbol})`
							:
								logEvent.contract.label
							||
							logEvent.contract.symbol
						}
						format={isExhaustive ? 'both' : 'label'}
						addressFormat="middle-truncated"
					/>
				</span>
			{/if}
		</span>

		<h4 class="log-event-name" class:mark={isExhaustive && paramsContainingContextualAddress.size} title={logEvent.decoded?.name}>
			{#if isHidden}
				{hiddenEllipsis}
			{:else}
				<EthereumTopic
					{...eventSignatureIsTopic ? {
						topicIndex: 0,
						topicHash: logEvent.topics[0]
					} : {}}
					parameterName={logEvent.decoded?.name}
					parameterSignature={logEvent.decoded?.signature}
					parameterType="signature"
				>
					{logEvent.decoded ? formatIdentifierToWords(logEvent.decoded.name) : '[Event]'}
				</EthereumTopic>
			{/if}
		</h4>
	</header>

	{#if !isHidden}
		<div class="column">
			{#if logEvent.decoded?.params?.length}
				<span class="parameters">
					{#each logEvent.decoded.params as param}
						{@const topic = paramsToTopic?.get(param)}

						<span
							class="parameter"
							class:mark={(isTokenMint && param.name === 'from') || (isTokenBurn && param.name === 'to')}
							class:mint={isTokenMint && param.name === 'from'}
							class:burn={isTokenBurn && param.name === 'to'}
						>
							<span class="parameter-name" title="{param.type} {param.name}">
								<EthereumTopic
									{...topic}
									parameterType={param.type}
									parameterName={param.name}
								>
									{param.name && formatIdentifierToWords(param.name)}
								</EthereumTopic>
							</span>
							{#if isTokenMint && param.name === 'from'}🌱{/if}
							{#if isTokenBurn && param.name === 'to'}🔥{/if}
							{#if param.type === 'address'}
								<span class="address" class:mark={paramsContainingContextualAddress.has(param)}>
									<Address {network} address={param.value} format="middle-truncated" />
								</span>
							{:else if param.type === 'uint256'}
								{#if param.value || param.value === 0}
									<output class="parameter-value" title={formatUnits(param.value, 0)}>{formatUnits(param.value, isToken && logEvent.contract.decimals || 0)}</output>
								{/if}
							{:else}
								<output class="parameter-value" title={param.value}>{param.value}</output>
							{/if}
						</span>
					{/each}
				</span>

			{:else if logEvent.topics?.length}
				<span class="topics">
					{#each logEvent.topics as topic, i}
						<span class="topic-wrapper">
							<span class="topic-index">[Topic {i}]</span>
							<output class="topic-hash">{formatTransactionHash(topic, isExhaustive ? 'full' : 'middle-truncated')}</output>
						</span>
					{/each}
				</span>
			{/if}
		</div>
	{/if}
</article>
