// https://github.com/zeriontech/defi-sdk-examples/blob/master/nodejs/web3.js

import type { Ethereum } from '../../data/networks/types'

const defiSdkAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"},{"internalType":"address[]","name":"adapters","type":"address[]"},{"internalType":"address[][]","name":"tokens","type":"address[][]"}],"name":"addProtocolAdapters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"protocolNames","type":"string[]"},{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"websiteURL","type":"string"},{"internalType":"string","name":"iconURL","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"}],"internalType":"struct ProtocolMetadata[]","name":"metadata","type":"tuple[]"},{"internalType":"address[][]","name":"adapters","type":"address[][]"},{"internalType":"address[][][]","name":"tokens","type":"address[][][]"}],"name":"addProtocols","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"tokenAdapterNames","type":"string[]"},{"internalType":"address[]","name":"adapters","type":"address[]"}],"name":"addTokenAdapters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"adapter","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getAdapterBalance","outputs":[{"components":[{"components":[{"internalType":"address","name":"adapterAddress","type":"address"},{"internalType":"string","name":"adapterType","type":"string"}],"internalType":"struct AdapterMetadata","name":"metadata","type":"tuple"},{"components":[{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance","name":"base","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance[]","name":"underlying","type":"tuple[]"}],"internalType":"struct FullTokenBalance[]","name":"balances","type":"tuple[]"}],"internalType":"struct AdapterBalance","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address[]","name":"adapters","type":"address[]"}],"name":"getAdapterBalances","outputs":[{"components":[{"components":[{"internalType":"address","name":"adapterAddress","type":"address"},{"internalType":"string","name":"adapterType","type":"string"}],"internalType":"struct AdapterMetadata","name":"metadata","type":"tuple"},{"components":[{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance","name":"base","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance[]","name":"underlying","type":"tuple[]"}],"internalType":"struct FullTokenBalance[]","name":"balances","type":"tuple[]"}],"internalType":"struct AdapterBalance[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getBalances","outputs":[{"components":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"websiteURL","type":"string"},{"internalType":"string","name":"iconURL","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"}],"internalType":"struct ProtocolMetadata","name":"metadata","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"adapterAddress","type":"address"},{"internalType":"string","name":"adapterType","type":"string"}],"internalType":"struct AdapterMetadata","name":"metadata","type":"tuple"},{"components":[{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance","name":"base","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance[]","name":"underlying","type":"tuple[]"}],"internalType":"struct FullTokenBalance[]","name":"balances","type":"tuple[]"}],"internalType":"struct AdapterBalance[]","name":"adapterBalances","type":"tuple[]"}],"internalType":"struct ProtocolBalance[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenType","type":"string"},{"internalType":"address","name":"token","type":"address"}],"name":"getFinalFullTokenBalance","outputs":[{"components":[{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance","name":"base","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance[]","name":"underlying","type":"tuple[]"}],"internalType":"struct FullTokenBalance","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenType","type":"string"},{"internalType":"address","name":"token","type":"address"}],"name":"getFullTokenBalance","outputs":[{"components":[{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance","name":"base","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance[]","name":"underlying","type":"tuple[]"}],"internalType":"struct FullTokenBalance","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"}],"name":"getProtocolAdapters","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"string[]","name":"protocolNames","type":"string[]"}],"name":"getProtocolBalances","outputs":[{"components":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"websiteURL","type":"string"},{"internalType":"string","name":"iconURL","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"}],"internalType":"struct ProtocolMetadata","name":"metadata","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"adapterAddress","type":"address"},{"internalType":"string","name":"adapterType","type":"string"}],"internalType":"struct AdapterMetadata","name":"metadata","type":"tuple"},{"components":[{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance","name":"base","type":"tuple"},{"components":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"decimals","type":"uint8"}],"internalType":"struct TokenMetadata","name":"metadata","type":"tuple"},{"internalType":"uint256","name":"amount","type":"uint256"}],"internalType":"struct TokenBalance[]","name":"underlying","type":"tuple[]"}],"internalType":"struct FullTokenBalance[]","name":"balances","type":"tuple[]"}],"internalType":"struct AdapterBalance[]","name":"adapterBalances","type":"tuple[]"}],"internalType":"struct ProtocolBalance[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"}],"name":"getProtocolMetadata","outputs":[{"components":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"websiteURL","type":"string"},{"internalType":"string","name":"iconURL","type":"string"},{"internalType":"uint256","name":"version","type":"uint256"}],"internalType":"struct ProtocolMetadata","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProtocolNames","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adapter","type":"address"}],"name":"getSupportedTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenAdapterName","type":"string"}],"name":"getTokenAdapter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTokenAdapterNames","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"}],"name":"isValidProtocol","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenAdapterName","type":"string"}],"name":"isValidTokenAdapter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"},{"internalType":"uint256[]","name":"adapterIndices","type":"uint256[]"}],"name":"removeProtocolAdapters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"protocolNames","type":"string[]"}],"name":"removeProtocols","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"tokenAdapterNames","type":"string[]"}],"name":"removeTokenAdapters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"},{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"address","name":"newAdapterAddress","type":"address"},{"internalType":"address[]","name":"newSupportedTokens","type":"address[]"}],"name":"updateProtocolAdapter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"protocolName","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"websiteURL","type":"string"},{"internalType":"string","name":"iconURL","type":"string"}],"name":"updateProtocolMetadata","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenAdapterName","type":"string"},{"internalType":"address","name":"adapter","type":"address"}],"name":"updateTokenAdapter","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const defiSDKContractAddress = '0x06FE76B2f432fdfEcAEf1a7d4f6C3d41B5861672'


export namespace DefiSDK {
	export const protocolNames = [
		'0x Staking',
		'1inch Liquidity Protocol',
		'1inch LP • Staking',
		'Aave',
		'Aave • Staking',
		'Aave • Uniswap Market',
		'Aave V2',
		'Aave V2 • Stable Debt',
		'Aave V2 • Variable Debt',
		'Akropolis • ADEL Staking',
		'Akropolis • AKRO Staking',
		'Alpha Homora',
		'Alpha Homora V2',
		'Ampleforth',
		'Aragon',
		'Balancer',
		'Bancor',
		'Bancor • Liquidity Protection',
		'Bancor • Locked BNT',
		'Berezka',
		'bZx',
		'bZx bZx',
		'bZx • Staking',
		'bZx • Vested Staking',
		'C.R.E.A.M.',
		'C.R.E.A.M. • Staking',
		'Chai',
		'Chi Gastoken by 1inch',
		'Cometh • Staking',
		'Cometh • Tube',
		'Compound',
		'Compound Governance',
		'Curve',
		'Curve • Liquidity Gauges',
		'Curve • Vesting',
		'Curve • Vote Escrowed CRV',
		'Dai Savings Protocol',
		'Dai Savings Rate',
		'DDEX • Lending',
		'DDEX • Margin',
		'DDEX • Spot',
		'DeFi Money Market',
		'DODO',
		'dYdX',
		'Enzyme',
		'FinNexus',
		'Gnosis Protocol',
		'Harvest',
		'Harvest • Profit Sharing',
		'Idle',
		'Idle • Early Rewards',
		'Idle • Risk-Adjusted',
		'iearn.finance (v2)',
		'iearn.finance (v2/v3)',
		'iearn.finance (v3)',
		'KeeperDAO',
		'KIMCHI',
		'KyberDAO',
		'Liquity',
		'Livepeer',
		'Maker Governance',
		'Matic',
		'Melon',
		'Mooniswap',
		'mStable',
		'mStable • Staking',
		'mStable V2',
		'Multi-Collateral Dai',
		'Mushrooms Finance',
		'Mushrooms Finance • Staking',
		'Nexus Mutual',
		'Pickle Finance',
		'Pickle Finance • Farms',
		'Pickle Finance • Staking',
		'PieDAO',
		'PieDAO ExperiPies',
		'PoolTogether',
		'PoolTogether V3',
		'Reflexer',
		'Saddle',
		'SashimiSwap',
		'SetToken V2',
		'SnowSwap',
		'Stake DAO',
		'SushiSwap',
		'SushiSwap • Staking',
		'Swerve',
		'Swerve • Liquidity Gauges',
		'Synthetix',
		'TokenSets',
		'Uniswap V1',
		'Uniswap V2',
		'Yearn Token Vaults',
		'yearn.finance • Vaults',
		'ygov.finance (v1)',
		'ygov.finance (v2)',
		'zlot.finance'
	] as const

	export type ProtocolName = typeof protocolNames[number]

	export type ProtocolMetadata = {
		name: ProtocolName
		description: string
		websiteURL: string
		iconURL: string
		version: string
	}

	export type ProtocolBalance = {
		metadata: ProtocolMetadata
		adapterBalances: AdapterBalance[]
	}

	export type AdapterType = 'Asset' | 'Debt'

	export type AdapterMetadata = {
		adapterAddress: Ethereum.ContractAddress
		adapterType: AdapterType
	}

	export type AdapterBalance = {
		metadata: AdapterMetadata
		balances: FullTokenBalance[]
	}
	
	export type FullTokenBalance = {
		base: TokenBalance
		underlying: TokenBalance[]
	}

	export type TokenBalance = {
		metadata: TokenMetadata
		amount: string
	}

	export type TokenMetadata = {
		token: Ethereum.ContractAddress
		name: string
		symbol: string
		decimals: string
	}

	export type ProtocolBalances = DefiSDK.ProtocolBalance[]
}

export const getDefiPositions = async ({
	protocolNames, 
	network, 
	publicClient, 
	address
}: {
	protocolNames?: DefiSDK.ProtocolName[],
	network: Ethereum.Network,
	publicClient: Ethereum.PublicClient,
	address: Ethereum.Address
}) => {
	if(network.chainId !== 1)
		throw new Error(`The Zerion DeFi SDK doesn't support the ${network.name} network.`)

	protocolNames ??= await publicClient.readContract({
		address: defiSDKContractAddress,
		abi: defiSdkAbi,
		functionName: 'getProtocolNames',
	}) || DefiSDK.protocolNames
	
	return await publicClient.readContract({
		address: defiSDKContractAddress,
		abi: defiSdkAbi,
		functionName: 'getProtocolBalances',
		args: [address, protocolNames]
	}) as DefiSDK.ProtocolBalances[]
}


import { web3AppsByProviderName, type Web3AppConfig } from '../../data/web3Apps'
import type { AppWithDefiPositions } from '../../data/defiPositions'
import { isTruthy } from '../../utils/isTruthy'

export const normalizeDefiPositions = (
	defiBalances: DefiSDK.ProtocolBalances
): AppWithDefiPositions[] => (
	defiBalances.map((protocolBalance: DefiSDK.ProtocolBalance) => {
		const app: Web3AppConfig | undefined = web3AppsByProviderName.zerionDefiSDK?.[protocolBalance.metadata.name]
		const erc20Token = app?.views?.flatMap(view => view.erc20Tokens ?? [])[0]

		return {
			app,

			id: protocolBalance.metadata.name,
			name: protocolBalance.metadata.name,
			icon: erc20Token?.icon,
			images: [
				protocolBalance.metadata.iconURL && `https://${protocolBalance.metadata.iconURL}`,
			].filter(isTruthy),

			views: protocolBalance.adapterBalances.map(adapterBalance => ({
				id: adapterBalance.metadata.adapterAddress,
				tags: [adapterBalance.metadata.adapterType],

				source: {
					name: 'Adapter',
					contractAddress: adapterBalance.metadata.adapterAddress,
				},

				positions: adapterBalance.balances.map(balance => ({
					id: balance.base.metadata.name,
					name: balance.base.metadata.name,
					type: 'app-token',

					tokenWithBalance: {
						token: {
							symbol: balance.base.metadata.symbol,
							address: balance.base.metadata.token as Ethereum.ContractAddress,
							name: balance.base.metadata.name,
							decimals: Number(balance.base.metadata.decimals),
						},

						balance: BigInt(balance.base.amount),
					},

					positions: balance.underlying?.map(tokenBalance => ({
						tokenWithBalance: {
							token: {
								symbol: tokenBalance.metadata.symbol,
								address: tokenBalance.metadata.token as Ethereum.ContractAddress,
								name: tokenBalance.metadata.name,
								decimals: Number(tokenBalance.metadata.decimals),
							},

							balance: BigInt(tokenBalance.amount),
						},
					})),
				})),
			})),
		}
	})
)
