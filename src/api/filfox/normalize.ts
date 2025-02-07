// Types/constants
import type { Ethereum } from '$/data/networks/types'
import { Filecoin } from '$/data/filecoin'
import { filfoxActorTypes, filfoxTransferTypes } from './constants'

import type { TokenWithBalance } from '$/data/tokens'


// Functions
import type { getOverview, getAddress, getBlock, getTipset, getMessage, getBlockMessages, getAddressTransfers, getAddressBalanceStats } from '.'
import type { FetchReturnType } from 'openapi-typescript-fetch'

export const normalizeOverview = (
	overview: FetchReturnType<typeof getOverview>,
	network: Ethereum.Network,
): Filecoin.Stats => ({
	network: {
		name: network.name,
		chainId: network.chainId,
		nativeCurrency: network.nativeCurrency,
	},
	latestTipset: {
		number: BigInt(overview.height),
		timestamp: overview.timestamp * 1000,
	},
	power: {
		totalRawBytePower: BigInt(overview.totalRawBytePower),
		totalQualityAdjPower: BigInt(overview.totalQualityAdjPower),
		totalRawBytePowerDelta: BigInt(overview.totalRawBytePowerDelta),
		totalQualityAdjPowerDelta: BigInt(overview.totalQualityAdjPowerDelta),
	},
	nativeCurrency: {
		totalMaxSupply: BigInt(overview.totalMaxSupply),
		totalSupply: BigInt(overview.totalSupply),
		circulatingSupply: BigInt(overview.circulatingSupply),
		burntSupply: BigInt(overview.burntSupply),
	},
	miners: {
		count: overview.accounts,
		activeCount: overview.activeMiners,
		activeCountGrowth: overview.activeMinersGrowth,
	},
	collateral: {
		totalPledgeCollateral: BigInt(overview.totalPledgeCollateral),
		totalMultisigLockedBalance: BigInt(overview.totalMultisigLockedBalance),
		totalMarketPledge: BigInt(overview.totalMarketPledge),
		estimatedInitialPledgeCollateral: overview.estimatedInitialPledgeCollateral,
	},
	rewards: {
		blockReward: BigInt(overview.blockReward),
		averageRewardPerByte: overview.averageRewardPerByte,
	},
	transactions: {
		dailyMessages: overview.dailyMessages,
		dailyCoinsMined: BigInt(overview.dailyCoinsMined),
	},
	tipset: {
		averageInterval: overview.averageTipsetInterval,
		averageBlocksCount: overview.averageTipsetBlocks,
		averageWeightedBlocksCount: overview.averageTipsetWeightedBlocks,
	},
	fees: {
		baseFee: BigInt(overview.baseFee),
		sealCost: BigInt(overview.sealCost),
	},
	market: {
		price: overview.price,
		priceChangePercentage: overview.priceChangePercentage,
	},
})


export const normalizeAccount = (
	account: FetchReturnType<typeof getAddress>,
	network: Ethereum.Network,
): Filecoin.Actor<Filecoin.ActorType.Account> => ({
	type: filfoxActorTypes[account.actor as keyof typeof filfoxActorTypes] as Filecoin.ActorType.Account,

	robustAddress: account.robust as Filecoin.Address<Filecoin.AddressType.Secp256k1 | Filecoin.AddressType.BLS>,
	shortAddress: account.id as Filecoin.Address<Filecoin.AddressType.ID>,

	assets: {
		nativeBalance: {
			token: network.nativeCurrency,
			balance: BigInt(account.balance),
		},
		erc20TokensCount: account.tokens,
	},

	transactionsCount: account.messageCount,

	transfersCount: account.transferCount,

	...'miner' in account && account.miner && {
		minerDetails: {
			ownerActor: {
				shortAddress: account.miner.owner.address as Filecoin.Address<Filecoin.AddressType.ID>,
				assets: {
					nativeBalance: {
						token: network.nativeCurrency,
						balance: BigInt(account.miner.owner.balance),
					},
				}
			},
			workerActor: {
				shortAddress: account.miner.worker.address as Filecoin.Address<Filecoin.AddressType.ID>,
				assets: {
					nativeBalance: {
						token: network.nativeCurrency,
						balance: BigInt(account.miner.worker.balance),
					},
				}
			},
			beneficiaryActor: {
				shortAddress: account.miner.beneficiary.address as Filecoin.Address<Filecoin.AddressType.ID>,
				assets: {
					nativeBalance: {
						token: network.nativeCurrency,
						balance: BigInt(account.miner.beneficiary.balance),
					},
				}
			},
			controlActors: (
				account.miner
					.controlAddresses
					.map(controlAddress => ({
						shortAddress: controlAddress.address as Filecoin.Address<Filecoin.AddressType.ID>,
						assets: {
							nativeBalance: {
								token: network.nativeCurrency,
								balance: BigInt(controlAddress.balance),
							},
						},
					}))
			),

			peerId: account.miner.peerId,
			multiAddresses: account.miner.multiAddresses,

			power: {
				rawBytePower: {
					value: BigInt(account.miner.rawBytePower),
					rank: account.miner.rawBytePowerRank,
				},
				qualityAdjustedPower: {
					value: BigInt(account.miner.qualityAdjPower),
					rank: account.miner.qualityAdjPowerRank,
				},
			},
			globalPower: {
				rawBytePower: {
					value: BigInt(account.miner.networkRawBytePower),
				},
				qualityAdjustedPower: {
					value: BigInt(account.miner.networkQualityAdjPower),
				},
			},

			minedBlocksCount: account.miner.blocksMined,
			minedBlocksWeightedCount: account.miner.weightedBlocksMined,
			totalRewards: BigInt(account.miner.totalRewards),

			preCommitDeposits: BigInt(account.miner.preCommitDeposits),
			vestingFunds: BigInt(account.miner.vestingFunds),
			initialPledgeRequirement: BigInt(account.miner.initialPledgeRequirement),
			availableBalance: BigInt(account.miner.availableBalance),
			sectorPledgeBalance: BigInt(account.miner.sectorPledgeBalance),
			pledgeBalance: BigInt(account.miner.pledgeBalance),

			sectorSize: account.miner.sectorSize,
			sectors: {
				live: account.miner.sectors.live,
				active: account.miner.sectors.active,
				faulty: account.miner.sectors.faulty,
				recovering: account.miner.sectors.recovering,
			},
		},
	},

	ownedMiners: (
		account.ownedMiners
			.map(minerAddress => ({
				shortAddress: minerAddress as Filecoin.Address<Filecoin.AddressType.ID>,
			}))
	),

	workerMiners: (
		account.workerMiners
			.map(minerAddress => ({
				shortAddress: minerAddress as Filecoin.Address<Filecoin.AddressType.ID>,
			}))
	),

	benefitedMiners: (
		account.benefitedMiners
			.map(minerAddress => ({
				shortAddress: minerAddress as Filecoin.Address<Filecoin.AddressType.ID>,
			}))
	),

	createdAt: {
		tipset: {
			timestamp: account.createTimestamp * 1000,
			number: BigInt(account.createHeight),
		},
	},

	lastActiveAt: {
		tipset: {
			timestamp: account.lastSeenTimestamp * 1000,
			number: BigInt(account.lastSeenHeight),
		},
	},
})

export const normalizeCurrentBalance = (
	balances: FetchReturnType<typeof getAddressBalanceStats>,
	network: Ethereum.Network,
): TokenWithBalance | undefined => (
	(
		balances
			.sort((a, b) => b.timestamp - a.timestamp)
			.slice(0, 1)
			.map(item => ({
				token: network.nativeCurrency,
				balance: BigInt(item.balance),
			}))
			[0]
	)
	?? undefined
)

export const normalizeTipset = (
	tipset: FetchReturnType<typeof getTipset>,
): Filecoin.Tipset => ({
	number: BigInt(tipset.height),
	timestamp: tipset.timestamp * 1000,

	blocks: (
		tipset.blocks
			.map(block => (
				normalizeBlock(block)
			))
	),

	transactionsCount: tipset.messageCount,
})

export const normalizeBlock = (
	block: FetchReturnType<typeof getBlock>,
): Filecoin.Block => ({
	cid: block.cid as Filecoin.BlockCid,

	miner: {
		shortAddress: block.miner as Filecoin.Address<Filecoin.AddressType.ID>,
	},

	...block.minerTag && {
		labels: {
			miner: {
				label: block.minerTag?.name,
				isSigned: block.minerTag?.signed,
			},
		},
	},

	winCount: block.winCount,
	reward: BigInt(block.reward),
	penalty: BigInt(block.penalty),

	transactionsCount: block.messageCount,

	...'parents' in block && block.parents && {
		parentBlocks: (
			block.parents
				.map(parentBlockCid => ({
					cid: parentBlockCid as Filecoin.BlockCid,
				}))
		),
		baseGasRate: BigInt(block.parentBaseFee),
		stateRoot: block.parentStateRoot,
		weight: BigInt(block.parentWeight),
	},

	...(
		('height' in block && block.height)
		&& ('timestamp' in block && block.timestamp)
	) && {
		tipset: {
			number: BigInt(block.height),
			timestamp: block.timestamp * 1000,
		},
	},
})

export const normalizeMessage = (
	message: FetchReturnType<typeof getMessage> | FetchReturnType<typeof getBlockMessages>['messages'][number],
	network: Ethereum.Network,
): Filecoin.Transaction => ({
	cid: message.cid as Filecoin.TransactionCid,

	...'height' in message && {
		height: message.height,
	},

	...'version' in message && {
		version: message.version,
	},

	...'size' in message && {
		size: BigInt(message.size),
	},

	...message.from && {
		fromActor: {
			shortAddress: message.from as Filecoin.Address<Filecoin.AddressType.ID>,
			...'fromId' in message && {
				robustAddress: message.fromId as Filecoin.Address<Filecoin.AddressType.Secp256k1 | Filecoin.AddressType.BLS>,
			},
		},
	},
	...message.to && {
		toActor: {
			shortAddress: message.to as Filecoin.Address<Filecoin.AddressType.ID>,
			...'toId' in message && {
				robustAddress: message.toId as Filecoin.Address<Filecoin.AddressType.Secp256k1 | Filecoin.AddressType.BLS>,
			},
		},
	},
	labels: {
		...message.fromTag && {
			fromActor: {
				label: message.fromTag?.name,
				isSigned: message.fromTag?.signed,
			},
		},
		...message.toTag && {
			toActor: {
				label: message.toTag?.name,
				isSigned: message.toTag?.signed,
			},
		},
	},

	value: BigInt(message.value),

	...'gasLimit' in message && {
		gasParams: {
			gasLimit: BigInt(message.gasLimit),
			gasUnitRateCap: BigInt(message.gasFeeCap),
			gasPremium: BigInt(message.gasPremium),
		},
	},

	method: {
		name: message.method,
		...'methodNumber' in message && {
			number: message.methodNumber,
		},
	},
	...message.evmMethod && {
		evmMethod: message.evmMethod,
	},
	params: message.params,

	...'ethTransactionHash' in message && message.ethTransactionHash && {
		evmTransaction: {
			transactionId: message.ethTransactionHash as Ethereum.TransactionId,
		},
	},

	...'nonce' in message && {
		nonce: message.nonce,
	},

	...(
		message.receipt !== undefined
		|| 'error' in message
	) && {
		receipt: {
			...message.receipt && {
				exitCode: message.receipt.exitCode,
				return: message.receipt.return,
			},

			...'error' in message && {
				error: message.error,
			},

			...message.receipt?.gasUsed !== undefined && {
				gasSpent: BigInt(message.receipt.gasUsed),
			},
		},
	},

	gasToken: network.nativeCurrency,

	...'fee' in message && {
		fees: {
			baseFeeBurn: BigInt(message.fee.baseFeeBurn),
			overEstimationBurn: BigInt(message.fee.overEstimationBurn),
			minerPenalty: BigInt(message.fee.minerPenalty),
			minerTip: BigInt(message.fee.minerTip),
			refund: BigInt(message.fee.refund),
		},
	},

	...'subcallCount' in message && {
		internalTransactionsCount: message.subcallCount,
	},

	...'eventLogCount' in message && {
		eventLogsCount: message.eventLogCount,
	},

	...'transfers' in message && {
		transfers: (
			message.transfers
				? message.transfers.map(transfer => (
					normalizeTransfer(transfer, network)
				))
				: undefined
		),
	},

	...'tokenTransfers' in message && {
		tokenTransfers: (
			message.tokenTransfers
				.map(tokenTransfer => (
					normalizeTokenTransfer(tokenTransfer)
				))
		),
	},

	...(
		('timestamp' in message && message.timestamp)
		|| 'confirmations' in message
		|| 'baseFee' in message
	) && {
		tipset: {
			...'timestamp' in message && message.timestamp && {
				timestamp: message.timestamp * 1000,
			},

			...'confirmations' in message && {
				confirmations: message.confirmations,
			},

			...'baseFee' in message && {
				baseGasRate: BigInt(message.baseFee),
			},
		},
	},

	...'blocks' in message && {
		blocks: message.blocks.map(blockCid => ({
			cid: blockCid as Filecoin.BlockCid
		})),
	},
})


export const normalizeTransfer = (
	transfer: (
		| FetchReturnType<typeof getMessage>['transfers'][number]
		| FetchReturnType<typeof getAddressTransfers>['transfers'][number]
	),
): Filecoin.Transfer => ({
	type: filfoxTransferTypes[transfer.type as keyof typeof filfoxTransferTypes] ?? transfer.type,

	fromActor: {
		robustAddress: transfer.from as Filecoin.Address
	},
	toActor: {
		robustAddress: transfer.to as Filecoin.Address
	},
	labels: {
		...transfer.fromTag && {
			fromActor: {
				label: transfer.fromTag?.name,
				isSigned: transfer.fromTag?.signed,
			},
		},
		...transfer.toTag && {
			toActor: {
				label: transfer.toTag?.name,
				isSigned: transfer.toTag?.signed,
			},
		},
	},

	value: BigInt(transfer.value),

	...'message' in transfer && transfer.message && {
		transaction: {
			cid: transfer.message,
		},
	},

	tipset: {
		...'height' in transfer && transfer.height && {
			number: BigInt(transfer.height),
		},

		...'timestamp' in transfer && transfer.timestamp && {
			timestamp: transfer.timestamp * 1000,
		},
	},
})
