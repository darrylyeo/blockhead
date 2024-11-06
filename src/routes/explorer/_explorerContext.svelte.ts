// Types
import type { Ethereum } from '$/data/networks/types'


// Constants
import { networkBySlug } from '$/data/networks'

export enum ExplorerQueryType {
	Account = 'account',
	Block = 'block',
	Transaction = 'transaction',
	None = 'none',
}


// Functions
import { isTruthy } from '$/utils/isTruthy'
import { getViemPublicClient } from '$/data/networkProviders'
import { watchBlockNumber } from 'viem/actions'


// External stores
import { explorerParams, type ExplorerInputParams } from './_explorerParams.svelte'
import { preferences } from '$/state/preferences'
import { browser } from '$app/environment'


// State
export const explorerContext = new class {
	network = $derived<Ethereum.Network | undefined>(
		explorerParams.networkSlug && networkBySlug.get(explorerParams.networkSlug) || undefined
	)

	publicClient = $derived<Ethereum.PublicClient | undefined>(
		this.network && browser && getViemPublicClient({
			network: this.network,
			networkProvider: preferences.rpcNetwork,
		})
	)

	blockNumber = $state<number>()

	constructor() {
		$effect.root(() => {
			if (!this.publicClient) return
			
			return watchBlockNumber(this.publicClient, {
				onBlockNumber: blockNumber => this.blockNumber = Number(blockNumber)
			})
		})
	}

	queryType = $derived(
		explorerParams.address || explorerParams.ensName ?
			ExplorerQueryType.Account
		: explorerParams.blockNumber ?
			ExplorerQueryType.Block
		: explorerParams.transactionId ?
			ExplorerQueryType.Transaction
		: 
			ExplorerQueryType.None
	)

	query = $derived(
		String(explorerParams.address || explorerParams.blockNumber || explorerParams.ensName || explorerParams.transactionId || '')
	)

	title = $derived(
		[
			this.queryType !== ExplorerQueryType.None && [
				this.queryType === ExplorerQueryType.Transaction ? 'Transaction' :
				this.queryType === ExplorerQueryType.Block ? 'Block' :
				this.queryType === ExplorerQueryType.Account ? 'Account' :
				'',
				this.query,
			],
			[
				this.network && this.network.name,
				'Explorer',
			],
		]
			.filter(isTruthy)
			.map(lines => (
				lines
					.filter(isTruthy)
					.join(' ')
			))
			.join(' | ')
	)

	relevantPreferences = $derived(
		[
			'theme',
			...(
				this.queryType === ExplorerQueryType.Account ?
					[
						'rpcNetwork',
						'contractSourceProvider',
						this.network?.slug === 'filecoin' ? 'filecoinTokenBalancesProvider' : 'tokenBalancesProvider',
						this.network?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
						'quoteCurrency',
					]
				: this.queryType === ExplorerQueryType.Block ?
					[
						'rpcNetwork',
						this.network?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
						'quoteCurrency',
					]
				: this.queryType === ExplorerQueryType.Transaction ?
					[
						'rpcNetwork',
						this.network?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
						'quoteCurrency',
					]
				:
					[
						'rpcNetwork',
						'currentPriceProvider',
						'historicalPriceProvider',
						this.network?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
					]
			),
		]
	)

	// Internal state
	showTestnets = $state(false)

	navigationContext = $state<
		{
			transaction?: Ethereum.Transaction
			transactionBlockNumber?: Ethereum.BlockNumber
			block?: Ethereum.Block
		}
	>(
		{}
	)
}
