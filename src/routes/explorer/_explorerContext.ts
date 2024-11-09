// Types
import type { Ethereum } from '$/data/networks/types'


// Constants
import { networkBySlug } from '$/data/networks'


// Functions
import { isTruthy } from '$/utils/isTruthy'
import { getViemPublicClient } from '$/data/networkProviders'
import { watchBlockNumber } from 'viem/actions'


// External stores

import {
	type ExplorerInputParams,
	explorerParams,
	networkSlug,
} from './_explorerParams'

import { preferences } from '$/state/preferences'


// Derived stores

import { derived, type Readable } from 'svelte/store'
import { browser } from '$app/environment'

export const explorerNetwork: Readable<Ethereum.Network | undefined> = derived(networkSlug, ($networkSlug, set) => {
	if($networkSlug)
		set(networkBySlug.get($networkSlug))
})

export const explorerPublicClient: Readable<Ethereum.PublicClient | undefined> = derived([explorerNetwork, preferences], ([$explorerNetwork, $preferences], set) => {
	if($explorerNetwork && browser)
		set(getViemPublicClient({
			network: $explorerNetwork,
			networkProvider: $preferences.rpcNetwork
		}))
})

export const explorerBlockNumber: Readable<number> = derived(explorerPublicClient, ($explorerPublicClient, set) => (
	$explorerPublicClient && watchBlockNumber($explorerPublicClient, {
		onBlockNumber: blockNumber => set(Number(blockNumber))
	})
))

export enum ExplorerQueryType {
	Account = 'account',
	Block = 'block',
	Transaction = 'transaction',
	None = 'none',
}

export const getExplorerQueryType = ({
	address,
	blockNumber,
	ensName,
	transactionId,
}: ExplorerInputParams) => (
	address || ensName ?
		ExplorerQueryType.Account
	: blockNumber ?
		ExplorerQueryType.Block
	: transactionId ?
		ExplorerQueryType.Transaction
	: 
		ExplorerQueryType.None
)

export const explorerQueryType = derived(explorerParams, (
	$explorerParams,
	set: (_: ExplorerQueryType) => void
) => {
	set(getExplorerQueryType($explorerParams))
})


export const explorerQuery = derived(explorerParams, (
	$explorerParams,
	set: (_: string) => void
) => {
	set(
		String($explorerParams.address || $explorerParams.blockNumber || $explorerParams.ensName || $explorerParams.transactionId || '')
	)
})

export const explorerTitle = derived([
	explorerNetwork,
	explorerQueryType,
	explorerQuery,
], ([
	$explorerNetwork,
	$explorerQueryType,
	$explorerQuery,
], set: (_: string) => void) => {
	set(
		[
			$explorerQueryType !== ExplorerQueryType.None && [
				$explorerQueryType === ExplorerQueryType.Transaction ? `Transaction` :
				$explorerQueryType === ExplorerQueryType.Block ? `Block` :
				$explorerQueryType === ExplorerQueryType.Account ? `Account` :
				'',
				$explorerQuery,
			],
			[
				$explorerNetwork && $explorerNetwork.name,
				`Explorer`,
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
})

export const relevantPreferences = derived([
	explorerQueryType,
	explorerNetwork,
], ([
	$explorerQueryType,
	$explorerNetwork,
], set: (_: string[]) => void) => {
	set([
		'theme',
		...(
			$explorerQueryType === ExplorerQueryType.Account ?
				[
					'rpcNetwork',
					'contractSourceProvider',
					$explorerNetwork?.slug === 'filecoin' ? 'filecoinTokenBalancesProvider' : 'tokenBalancesProvider',
					$explorerNetwork?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
					'quoteCurrency',
				]
			: $explorerQueryType === ExplorerQueryType.Block ?
				[
					'rpcNetwork',
					$explorerNetwork?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
					'quoteCurrency',
				]
			: $explorerQueryType === ExplorerQueryType.Transaction ?
				[
					'rpcNetwork',
					$explorerNetwork?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
					'quoteCurrency',
				]
			:
				[
					'rpcNetwork',
					'currentPriceProvider',
					'historicalPriceProvider',
					$explorerNetwork?.slug === 'filecoin' ? 'filecoinTransactionProvider' : 'transactionProvider',
				]
		),
	])
})


// Internal stores
import { writable } from 'svelte/store'

export const showTestnets = writable(false)

export const navigationContext = writable<{
	transaction?: Ethereum.Transaction,
	transactionBlockNumber?: Ethereum.BlockNumber,
	block?: Ethereum.Block,
}>({})
