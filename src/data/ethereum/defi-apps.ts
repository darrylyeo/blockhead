import type { Ethereum } from './types'
import type { DefiSDK } from './price/defi-sdk'
import type { ZapperDeFiProtocolName } from '../zapper/zapper'

export type DefiAppConfig = {
	name: DefiAppName,
	slug: DefiAppSlug,
	links?: string[],
	colors?: string[],
	views: DefiAppView[]
}

export type DefiAppView = {
	name?: string,
	slug?: string,
	colors?: string[],
	chainId: Ethereum.ChainID,
	erc20Tokens?: Ethereum.ERC20Token[],
	nfts?: Ethereum.NFT[],
	contracts?: Ethereum.ContractAddress[],
	tags?: [{
		name: '',
		hash: ''
	}],
	links?: string[],
	providers?: {
		theGraph?: string,
		zapper?: ZapperDeFiProtocolName,
		zerionDefiSDK?: DefiSDK.ProtocolName[],
	}
}

export type DefiAppName = string // typeof defiApps[number]['name']
export type DefiAppSlug = string // typeof defiApps[number]['slug']

export const defiApps: DefiAppConfig[] = [
	{
		name: 'Autofarm',
		slug: 'autofarm',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'autofarm',
				}
			}
		]
	},
	{
		name: 'Aave',
		slug: 'aave',
		links: [],
		colors: ['#77c0c7', '#b56da4'],
		views: [
			{
				name: 'Aave V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'aave',
					zerionDefiSDK: ['Aave', 'Aave • Staking'],
				}
			},
			{
				name: 'Aave AMM',
				slug: 'amm',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'aave',
					zerionDefiSDK: ['Aave • Uniswap Market'],
				}
			},
			{
				name: 'Aave V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
					zapper: 'aave',
					zerionDefiSDK: ['Aave V2', 'Aave V2 • Stable Debt', 'Aave V2 • Variable Debt'],
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					// zapper: 'aave'
				}
			}
		]
	},
	{
		name: 'Airswap',
		slug: 'airswap',
		links: ['https://airswap.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/airswap/airswap',
				}
			}
		]
	},
	{
		name: 'Akropolis',
		slug: 'akropolis',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-mainnet',
					zerionDefiSDK: ['Akropolis • ADEL Staking', 'Akropolis • AKRO Staking'],
				}
			}
		]
	},
	{
		name: 'Alchemix',
		slug: 'alchemix',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'alchemix',
				}
			}
		]
	},
	{
		name: 'Alpha',
		slug: 'alpha',
		links: [],
		views: [
			{
				name: 'Alpha Homora V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'alpha',
					zerionDefiSDK: ['Alpha Homora'],
				}
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'alpha',
					zerionDefiSDK: ['Alpha Homora V2'],
				}
			}
		]
	},
	{
		name: 'Ampleforth',
		slug: 'ampleforth',
		links: [],
		colors: ['#5856d6'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Ampleforth'],
				}
			}
		]
	},
	{
		name: 'Aragon',
		slug: 'aragon',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Aragon'],
				}
			}
		]
	},
	{
		name: 'Augur',
		slug: 'augur',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'augur',
				}
			}
		]
	},
	{
		name: 'BProtocol',
		slug: 'bprotocol',
		links: ['https://bprotocol.org', 'https://app.bprotocol.org'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'b-protocol',
				}
			}
		]
	},
	{
		name: 'Badger',
		slug: 'badger',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'badger',
				}
			}
		]
	},
	{
		name: 'Balancer',
		slug: 'balancer',
		links: [],
		colors: ['#536dfe'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
					zapper: 'balancer',
					zerionDefiSDK: ['Balancer'],
				}
			}
		]
	},
	{
		name: 'Bancor',
		slug: 'bancor',
		links: [],
		colors: ['#070e1f'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/blocklytics/bancor',
					zapper: 'bancor',
					zerionDefiSDK: ['Bancor', 'Bancor • Liquidity Protection', 'Bancor • Locked BNT'],
				}
			}
		]
	},
	{
		name: 'Berezka',
		slug: 'berezka',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'bancor',
					zerionDefiSDK: ['Berezka'],
				}
			}
		]
	},
	{
		name: 'Barnbridge',
		slug: 'barnbridge',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'barnbridge',
				}
			}
		]
	},
	{
		name: 'Beefy',
		slug: 'beefy',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'beefy',
				}
			}
		]
	},
	{
		name: 'Bella',
		slug: 'bella',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'bella',
				}
			}
		]
	},
	{
		name: 'Belt',
		slug: 'belt',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'belt',
				}
			}
		]
	},
	{
		name: 'Bzx',
		slug: 'bzx',
		links: [],
		colors: ['#33dfcc', '#003cda'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'bzx',
					zerionDefiSDK: ['bZx', 'bZx bZx', 'bZx • Staking', 'bZx • Vested Staking'],
				}
			}
		]
	},
	{
		name: 'Chai',
		slug: 'chai',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: ['0x06AF07097C9Eeb7fD685c692751D5C66dB49c215'],
				links: ['https://chai.money'],
				providers: {
					zapper: 'convex',
				}
			}
		]
	},
	{
		name: 'Cometh',
		slug: 'cometh',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Cometh • Staking', 'Cometh • Tube'],
				}
			}
		]
	},
	{
		name: 'Compound',
		slug: 'compound',
		links: [],
		colors: ['#01d395'],
		views: [
			{
				name: 'Compound V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'compound',
					zerionDefiSDK: ['Compound'],
				}
			},
			{
				name: 'Compound V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
					zapper: 'compound',
					zerionDefiSDK: ['Compound'],
				}
			},
			{
				name: 'Compound Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Compound Governance'],
				}
			}
		]
	},
	{
		name: 'Convex',
		slug: 'convex',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'convex',
				}
			}
		]
	},
	{
		name: 'Cover',
		slug: 'cover',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'cover',
				}
			}
		]
	},
	{
		name: 'C.R.E.A.M.',
		slug: 'cream',
		links: ['https://cream.finance'],
		colors: ['#68e2dc'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'cream',
					zerionDefiSDK: ['C.R.E.A.M.', 'C.R.E.A.M. • Staking'],
				}
			}
		]
	},
	{
		name: 'Curve',
		slug: 'curve',
		links: [],
		colors: [/*'#840000',*/ '#fd2700', '#f9ea02', '#91ff67'/*, '#0213fa'*/], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'curve',
					zerionDefiSDK: ['Curve', 'Curve • Liquidity Gauges', 'Curve • Vesting', 'Curve • Vote Escrowed CRV'],
				}
			}
		]
	},
	{
		name: 'DDEX',
		slug: 'ddex',
		links: [],
		colors: ['#012d93', '#0367d8', '#00f6fa'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['DDEX • Lending', 'DDEX • Margin', 'DDEX • Spot'],
				}
			}
		]
	},
	{
		name: 'DeFi Money Market',
		slug: 'dmm',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['DeFi Money Market']
				}
			}
		]
	},
	{
		name: 'DeFi Saver',
		slug: 'defi-saver',
		links: ['https://defisaver.com'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'defisaver',
				}
			}
		]
	},
	{
		name: 'DerivaDEX',
		slug: 'derivadex',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'derivadex',
				}
			}
		]
	},
	{
		name: 'Deversifi',
		slug: 'deversifi',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'deversifi',
				}
			}
		]
	},
	{
		name: 'Dhedge',
		slug: 'dhedge',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dhedge',
				}
			}
		]
	},
	{
		name: 'Dforce',
		slug: 'dforce',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dforce',
				}
			}
		]
	},
	{
		name: 'Dodo',
		slug: 'dodo',
		links: [],
		colors: ['#fff700'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dodo',
					zerionDefiSDK: ['DODO'],
				}
			}
		]
	},
	{
		name: 'Dsd',
		slug: 'dsd',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dsd',
				}
			}
		]
	},
	{
		name: 'dYdX',
		slug: 'dydx',
		links: [],
		colors: ['#6966ff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dydx',
					zerionDefiSDK: ['dYdX'],
				}
			}
		]
	},
	{
		name: '88mph',
		slug: '88mph',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
					zapper: '88mph',
				}
			}
		]
	},
	{
		name: 'Ellipsis',
		slug: 'ellipsis',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ellipsis',
				}
			}
		]
	},
	{
		name: 'Empty Set Dollar',
		slug: 'esd',
		links: [],
		colors: ['#312f32'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'esd',
				}
			}
		]
	},
	{
		name: 'Enzyme Finance',
		slug: 'enzyme',
		links: ['https://enzyme.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme',
					zerionDefiSDK: ['Enzyme', 'Melon']
				}
			}
		]
	},
	{
		name: 'FinNexus',
		slug: 'finnexus',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['FinNexus']
				}
			}
		]
	},
	{
		name: 'Futureswap',
		slug: 'futureswap',
		links: ['https://www.futureswap.com'],
		views: [
			{
				name: 'Futureswap V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://www.airswap.io',
					zapper: 'futureswap',
				}
			}
		]
	},
	{
		name: 'Gnosis',
		slug: 'gnosis',
		links: ['https://gnosis.io'],
		views: [
			{
				name: 'Gnosis Protocol',
				slug: 'protocol',
				links: ['https://gnosis.io/protocol'],
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Gnosis Protocol'],
				}
			}
		]
	},
	{
		name: 'Idle',
		slug: 'idle',
		links: [],
		colors: ['#0B50B0', '#0F6BEB', '#6FA4F2'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/idle-finance/idle',
					zapper: 'idle',
					zerionDefiSDK: ['Idle', 'Idle • Early Rewards', 'Idle • Risk-Adjusted'],
				}
			}
		]
	},
	{
		name: 'Inverse',
		slug: 'inverse',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'inverse',
				}
			}
		]
	},
	{
		name: 'Harvest',
		slug: 'harvest',
		links: [],
		colors: ['#fffce6', '#bbe3e2'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'harvest',
					zerionDefiSDK: ['Harvest', 'Harvest • Profit Sharing'],
				}
			}
		]
	},
	{
		name: 'Hegic',
		slug: 'hegic',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'hegic',
					zerionDefiSDK: ['zlot.finance']
				}
			}
		]
	},
	{
		name: 'KeeperDAO',
		slug: 'keeper-dao',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'keeper-dao',
					zerionDefiSDK: ['KeeperDAO'],
				}
			}
		]
	},
	{
		name: 'Kimchi Finance',
		slug: 'kimchi',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['KIMCHI'],
				}
			}
		]
	},
	{
		name: 'Kyber Network',
		slug: 'kyber',
		links: [],
		colors: ['#31cb9e'],
		views: [
			{
				name: 'KyberDAO',
				slug: 'dao',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm',
					zerionDefiSDK: ['KyberDAO'],
				}
			}
		]
	},
	{
		name: 'Linkswap',
		slug: 'linkswap',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'linkswap',
				}
			}
		]
	},
	{
		name: 'Livepeer',
		slug: 'livepeer',
		links: [],
        colors: ['#1c42ff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/livepeer/livepeer',
					zerionDefiSDK: ['Livepeer'],
				}
			}
		]
	},
	{
		name: 'Loopring',
		slug: 'loopring',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/loopring',
					zapper: 'loopring',
				}
			}
		]
	},
	{
		name: 'Liquity',
		slug: 'liquity',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/liquity/liquity',
					zapper: 'liquity',
					zerionDefiSDK: ['Liquity'],
				}
			}
		]
	},
	{
		name: 'Maker',
		slug: 'maker',
		links: ['https://makerdao.com'],
        colors: ['#4fa89b', '#6bcdba'], // unofficial // ['#1AAB9B'],
		views: [
			{
				colors: ['#f4b731'],
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'maker',
					zerionDefiSDK: ['Dai Savings Protocol', 'Dai Savings Rate'],
				}
			},
			{
				name: 'Governance',
				slug: 'governance',
				colors: ['#1AAB9B'],
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance',
					zerionDefiSDK: ['Maker Governance'],
				}
			}
		]
	},
	{
		name: 'Matic',
		slug: 'matic',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/maticnetwork/mainnet-root-subgraphs',
					zerionDefiSDK: ['Matic'],
				}
			}
		]
	},
	{
		name: 'Mooniswap',
		slug: 'mooniswap',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'mooniswap',
					zerionDefiSDK: ['Mooniswap'],
				}
			}
		]
	},
	{
		name: 'mStable',
		slug: 'mstable',
		links: [],
        colors: ['#000000'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['mStable', 'mStable • Staking', 'mStable V2'],
				}
			}
		]
	},
	{
		name: 'Mushrooms Finance',
		slug: 'mushrooms',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'mushroom',
				}
			}
		]
	},
	{
		name: 'Nexus Mutual',
		slug: 'nexus-mutual',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/nexusmutual/nexus-mutual',
					zerionDefiSDK: ['Nexus Mutual'],
				}
			}
		]
	},
	{
		name: '1inch',
		slug: '1inch',
		links: [],
		views: [
			{
				name: 'Ethereum',
				slug: 'ethereum',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/1inch-exchange/one-inch-v2',
					zapper: '1inch',
					zerionDefiSDK: ['1inch Liquidity Protocol', '1inch LP • Staking'],
				}
			},
			{
				name: 'Ethereum',
				slug: 'ethereum',
				colors: ['#d21318', '#3d3d3c'],
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Chi Gastoken by 1inch'],
				}
			},
			{
				name: 'Binance Smart Chain',
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: '1inch',
				}
			},
			{
				name: 'Polygon',
				slug: 'polygon',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: '1inch',
				}
			},
		]
	},
	{
		name: 'Opium Protocol',
		slug: 'opium',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/opiumprotocol/opium-network',
				}
			}
		]
	},
	{
		name: 'PancakeSwap',
		slug: 'pancakeswap',
		links: [],
		views: [
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'pancakeswap',
				}
			}
		]
	},
	{
		name: 'Pickle Finance',
		slug: 'pickle',
		links: ['https://app.pickle.finance', 'https://app.pickle.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'pickle',
					zerionDefiSDK: ['Pickle Finance', 'Pickle Finance • Farms', 'Pickle Finance • Staking'],
				}
			}
		]
	},
	{
		name: 'PieDAO',
		slug: 'piedao',
		links: [],
        colors: ['#d90a9d', '#9811dc', '#7732f8', '#28d4ff'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['PieDAO', 'PieDAO ExperiPies'],
				}
			}
		]
	},
	{
		name: 'PoolTogether',
		slug: 'pooltogether',
		links: [],
        colors: ['#4a31a5'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether',
					zapper: 'pooltogether',
					zerionDefiSDK: ['PoolTogether', 'PoolTogether V3'],
				}
			}
		]
	},
	{
		name: 'QuickSwap',
		slug: 'quickswap',
		links: [],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'quickswap',
				}
			}
		]
	},
	{
		name: 'Rari Capital',
		slug: 'rari',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'rari',
				}
			}
		]
	},
	{
		name: 'Rarible',
		slug: 'rarible',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/rarible/protocol',
				}
			}
		]
	},
	{
		name: 'RealT',
		slug: 'realt',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'realt',
				}
			}
		]
	},
	{
		name: 'Reflexer',
		slug: 'reflexer',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'reflexer',
					zerionDefiSDK: ['Reflexer'],
				}
			}
		]
	},
	{
		name: 'Ribbon',
		slug: 'ribbon',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ribbon',
				}
			}
		]
	},
	{
		name: 'Sablier',
		slug: 'sablier',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/sablierhq/sablier',
				}
			}
		]
	},
	{
		name: 'Saddle',
		slug: 'saddle',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'saddle',
					zerionDefiSDK: ['Saddle'],
				}
			}
		]
	},
	{
		name: 'SashimiSwap',
		slug: 'sashimiswap',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['SashimiSwap'],
				}
			}
		]
	},
	{
		name: 'S.finance',
		slug: 'sfinance',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sfinance',
				}
			},
			{
				chainId: 66,
				erc20Tokens: [],
				providers: {
					zapper: 'sfinance',
				}
			}
		]
	},
	{
		name: 'Shell',
		slug: 'shell',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'shell',
				}
			}
		]
	},
	{
		name: 'Smoothy',
		slug: 'smoothy',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'smoothy',
				}
			}
		]
	},
	{
		name: 'SnowSwap',
		slug: 'snowswap',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'snowswap',
					zerionDefiSDK: ['SnowSwap'],
				}
			}
		]
	},
	{
		name: 'Spookyswap',
		slug: 'spookyswap',
		links: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'spookyswap',
				}
			}
		]
	},
	{
		name: 'Stake DAO',
		slug: 'stake-dao',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Stake DAO'],
				}
			}
		]
	},
	{
		name: 'Superfluid',
		slug: 'superfluid',
		links: [],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
				}
			}
		]
	},
	{
		name: 'SushiSwap',
		slug: 'sushiswap',
		links: ['https://sushi.com'],
        colors: ['#016eda', '#d900c0'],
		views: [
			{
				name: 'Ethereum',
				slug: 'ethereum',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
					zerionDefiSDK: ['SushiSwap', 'SushiSwap • Staking'],
				}
			},
			{
				name: 'Fantom',
				slug: 'fantom',
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			},
			{
				name: 'Binance Smart Chain',
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			},
			{
				name: 'Polygon',
				slug: 'polygon',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			},
			{
				name: 'HECO',
				slug: 'heco',
				chainId: 128,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			},
			{
				name: 'xDai',
				slug: 'xdai',
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			},
			{
				name: 'Harmony',
				slug: 'harmony',
				chainId: 1666600000,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			},
			{
				name: 'Avalanche',
				slug: 'avalanche',
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap',
				}
			}
		]
	},
	{
		name: 'Swerve',
		slug: 'swerve',
		links: [],
        colors: ['#86fce7'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'swerve',
					zerionDefiSDK: ['Swerve', 'Swerve • Liquidity Gauges'],
				}
			}
		]
	},
	{
		name: 'Synthetix',
        colors: ['#1e1a31'],
		slug: 'synthetix',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
					zapper: 'synthetix',
					zerionDefiSDK: ['Synthetix'],
				}
			}
		]
	},
	{
		name: 'The Graph',
		slug: 'the-graph',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'the',
				}
			}
		]
	},
	{
		name: 'TokenSets',
		slug: 'tokensets',
		links: [],
        colors: ['#2D2CE5'/*, '#6BB1FF'*/],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'tokensets',
					zerionDefiSDK: ['TokenSets', 'SetToken V2'],
				}
			}
		]
	},
	{
		name: 'UMA',
		slug: 'uma',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/umaprotocol/uma',
				}
			}
		]
	},
	{
		name: 'Uniswap',
		slug: 'uniswap',
		links: [],
        colors: ['#ff007a'],
		views: [
			{
				name: 'Uniswap V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'uniswap',
					zerionDefiSDK: ['Uniswap V1'],
				}
			},
			{
				name: 'Uniswap V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
					zapper: 'uniswap',
					zerionDefiSDK: ['Uniswap V2'],
				}
			},
			{
				name: 'Uniswap V3',
				slug: 'v3',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-testing',
					zapper: 'uniswap',
					// zerionDefiSDK: ['Uniswap V3'],
				}
			}
		]
	},
	{
		name: 'Unit',
		slug: 'unit',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'unit',
				}
			}
		]
	},
	{
		name: 'USDC',
		slug: 'usdc',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/centrehq/usdc',
				}
			}
		]
	},
	{
		name: 'Upshot',
		slug: 'upshot',
		links: ['https://upshot.io'],
		views: [
			{
				name: 'Axie Infinity',
				slug: 'axie-infinity',
				chainId: 1,
				erc20Tokens: [],
				nfts: ['0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d'],
				contracts: ['0xf4985070ce32b6b1994329df787d1acc9a2dd9e2'],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-axie-infinity',
				}
			},
			{
				name: 'CryptoKitties',
				slug: 'cryptokitties',
				chainId: 1,
				erc20Tokens: [],
				nfts: ['0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'],
				contracts: ['0xb1690c08e213a35ed9bab7b318de14420fb57d8c'],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-cryptokitties',
				}
			},
			{
				name: 'CryptoPunks',
				slug: 'cryptopunks',
				chainId: 1,
				erc20Tokens: [],
				nfts: ['0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-cryptopunks',
				}
			},
			{
				name: 'Known Origin',
				slug: 'known-origin',
				chainId: 1,
				erc20Tokens: [],
				nfts: ['0xfbeef911dc5821886e1dda71586d90ed28174b7d'],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-known-origin',
				}
			},
			{
				name: 'SuperRare',
				slug: 'superrare',
				chainId: 1,
				erc20Tokens: [],
				nfts: ['0x41a322b28d0ff354040e2cbc676f0320d8c8850d'],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-superrare',
				}
			}
		]
	},
	{
		name: 'Value',
		slug: 'value',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'value',
				}
			}
		]
	},
	{
		name: 'Venus',
		slug: 'venus',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'venus',
				}
			}
		]
	},
	{
		name: 'Vesper',
		slug: 'vesper',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'vesper',
				}
			}
		]
	},
	{
		name: 'Xsigma',
		slug: 'xsigma',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'xsigma',
				}
			}
		]
	},
	{
		name: 'Yaxis',
		slug: 'yaxis',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'yaxis',
				}
			}
		]
	},
	{
		name: 'Yearn Finance',
		slug: 'yearn',
		links: [],
        colors: ['#0273f6', '#075fb9'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'yearn',
					zerionDefiSDK: ['iearn.finance (v2)', 'iearn.finance (v2/v3)', 'iearn.finance (v3)', 'Yearn Token Vaults', 'yearn.finance • Vaults'],
				}
			},
			{
				name: 'Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'yearn',
					zerionDefiSDK: ['ygov.finance (v1)', 'ygov.finance (v2)'],
				}
			}
		]
	},
	{
		name: '0x',
		slug: '0x',
		links: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['0x Staking'],
				}
			}
		]
	},
] // as const


export const defiAppsBySlug = Object.fromEntries(defiApps.map(defiAppConfig => [defiAppConfig.slug, defiAppConfig]))
export const defiAppsByProviderName = {
	zapper: Object.fromEntries(defiApps.flatMap(defiAppConfig =>
		defiAppConfig.views.map(view => view.providers?.zapper ? [view.providers.zapper, defiAppConfig] : [])
	)),
	zerionDefiSDK: Object.fromEntries(defiApps.flatMap(defiAppConfig =>
		defiAppConfig.views.flatMap(view => view.providers?.zerionDefiSDK?.map(name => [name, defiAppConfig]) ?? [])
	))
}
