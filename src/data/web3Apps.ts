// Shims
import shimSetDifference from 'set.prototype.difference'
shimSetDifference.shim()


// Types/constants
import type { ComponentType } from 'svelte'
import type { Ethereum } from './networks/types'
import type { LlamafolioAdapterName } from '$/api/defillama/llamafolio'
import type { DefiSDK } from '$/api/zerion/defiSdk/index'
// import type { ZapperAppId } from '$/api/zapper-old'
import type { ZapperAppName } from '$/api/zapper'
import { erc20TokensByContractAddress, erc20TokensBySymbol } from './tokens'
import type { DeepReadonly } from '$/utils/DeepReadonly'
import { networkBySlug } from '$/data/networks'


import {
	CeramicIcon,
	DiscoIcon,
	EthereumAttestationServiceIcon,
	FarcasterIcon,
	IpfsIcon,
	LensIcon,
	MoxieIcon,
	NounsIcon,
	PythIcon,
	UniswapIcon,
	ZapperIcon,
	ZerionIcon,
} from '$/assets/icons'
import {
	ArbitrumIcon,
	ArbitrumOneIcon,
	AuroraIcon,
	BaseIcon,
	BlastIcon,
	DegenIcon,
	EthereumIcon,
	LineaIcon,
	MantleIcon,
	MetalIcon,
	MetisIcon,
	OptimismIcon,
	PolygonIcon,
	ZoraIcon,
	ZksyncIcon,
} from '$/assets/networkIcons'


import CeramicPage from '$/routes/apps/(withDashboard)/ceramic/+page.svelte'
import DiscoPage from '$/routes/apps/(withDashboard)/disco/+page.svelte'
import EasPage from '$/routes/apps/(withDashboard)/eas/network/[networkSlug=isNetworkSlug]/+page.svelte'
import MoxiePage from '$/routes/apps/(withDashboard)/moxie/network/[networkSlug=isNetworkSlug]/+page.svelte'


import { UniswapV3 } from '$/api/uniswap-v3/index'
import { UniswapV3Subgraph } from '$/api/uniswap-v3/subgraph'
import UniswapPage from '$/routes/apps/(withDashboard)/uniswap/+page.svelte'


export type Web3AppConfig = {
	name: string,
	slug: string,
	links?: string[],
	icon?: string,
	colors?: string[],
	showCustomUi?: boolean | ('Dashboard' | 'Explorer' | 'Account')[],
	views: Web3AppView[],
}

export type Web3AppView = {
	showOn?: ('Dashboard' | 'Explorer' | 'Account')[],
	name?: string,
	slug?: string,
	colors?: string[],
	chainId?: Ethereum.ChainId,
	components?: ComponentType[],
	erc20Tokens?: Partial<Ethereum.Erc20Token>[],
	nfts?: Partial<Ethereum.NftContract>[],
	contracts?: Ethereum.Contract[],
	tags?: string[],
	links?: string[],
	providers?: {
		llamafolio?: LlamafolioAdapterName,
		theGraph?: string,
		zapper?: ZapperAppName,
		zerionDefiSDK?: DefiSDK.ProtocolName[],
	},
	embeds?: {
		name: string,
		description?: string,
		src: string,
	}[],
}


export const web3Apps = [
	{
		name: 'Aarna',
		slug: 'aarna',
		links: [
			'https://www.aarna.ai',
		],
		views: [
			{
				providers: {
					zapper: 'aarna',
				},
			},
		],
	},
	{
		name: 'Aave',
		slug: 'aave',
		links: [
			'https://aave.com',
		],
		colors: [
			'#77c0c7',
			'#b56da4',
		],
		views: [
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
						chainId: 1,
						address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
						name: 'Aave',
						symbol: 'AAVE',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'aave-v3',
					zapper: 'aave-v3',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 10,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 8453,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 250,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 42161,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 100,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 56,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 137,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V3',
				slug: 'v3',
				chainId: 43114,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
						chainId: 1,
						address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
						name: 'Aave',
						symbol: 'AAVE',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'aave-v2',
					theGraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
					zapper: 'aave-v2',
					zerionDefiSDK: [
						'Aave V2',
						'Aave V2 • Stable Debt',
						'Aave V2 • Variable Debt',
						'Aave • Staking',
					],
				},
			},
			{
				name: 'Aave V2',
				slug: 'v2',
				chainId: 137,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave V2',
				slug: 'v2',
				chainId: 43114,
				providers: {
					llamafolio: 'aave-v2',
				},
			},
			{
				name: 'Aave AMM',
				slug: 'amm',
				chainId: 1,
				providers: {
					zapper: 'aave-amm',
				},
			},
			{
				name: 'Aave V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/1365/thumb/ethlend.png?1547394586',
						chainId: 1,
						address: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',
						name: 'Aave	OLD ',
						symbol: 'LEND',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'aave-v1',
					zerionDefiSDK: [
						'Aave',
						'Aave • Uniswap Market',
					],
				},
			},
			{
				name: 'Aave V2 Governance',
				slug: 'v2-governance',
				chainId: 1,
				embeds: [
					{
						name: 'Aavote',
						description: 'Aavote - Aave Governance v2 Interface',
						src: 'https://aavote.netlify.app',
					},
				],
				providers: {
					zapper: 'aave-safety-module',
				},
			},
		],
	},
	{
		name: 'Aavegotchi',
		slug: 'aavegotchi',
		links: [
			'https://aavegotchi.com',
		],
		colors: [
			'#fa34f3',
			'#5100B1',
		],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12467/thumb/ghst_200.png?1600750321',
						chainId: 1,
						address: '0x3f382dbd960e3a9bbceae22651e88158d2791550',
						name: 'Aavegotchi',
						symbol: 'GHST',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'aavegotchi',
				},
			},
		],
	},
	{
		name: 'Abacus',
		slug: 'abacus',
		links: [
			'https://abacus.tech',
		],
		views: [
			{
				name: 'The Ennead',
				slug: 'the-ennead',
				links: [
					'https://app.ennead.farm/home',
				],
				chainId: undefined,
				providers: {
					zapper: 'the-ennead',
				},
			},
		],
	},
	{
		name: 'Aboard',
		slug: 'aboard',
		links: [
			'https://aboard.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Aboard',
				},
			},
		],
	},
	{
		name: 'Abracadabra',
		slug: 'abracadabra',
		links: [
			'https://abracadabra.money',
		],
		colors: [
			'#7b79f7',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/15861/thumb/abracadabra-3.png?1622544862',
						chainId: 1,
						address: '0x090185f2135308bad17527004364ebcc2d37e5f6',
						name: 'Spell Token',
						symbol: 'SPELL',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'abracadabra',
					zapper: 'abracadabra',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'abracadabra',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'abracadabra',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'abracadabra',
				},
			},
		],
	},
	{
		name: 'AbstraDEX',
		slug: 'abstra',
		links: [
			'https://abstradex.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'abstra',
				},
			},
		],
	},
	{
		name: 'Ace Of Base',
		slug: 'ace-of-base',
		links: [
			'http://aceofbase.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ace-of-base',
				},
			},
		],
	},
	{
		name: 'Acquire.Fi',
		slug: 'acquire-fi',
		links: [
			'https://acquire.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'acquire-fi',
				},
			},
		],
	},
	{
		name: 'Across',
		slug: 'across',
		links: [
			'https://across.to',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'across',
					zapper: 'across',
				},
			},
		],
	},
	{
		name: 'Acryptos',
		slug: 'acryptos',
		links: [
			'https://app.acryptos.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'acryptos',
				},
			},
		],
	},
	{
		name: 'Adamant',
		slug: 'adamant',
		links: [
			'https://adamant.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'adamant',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'adamant',
				},
			},
		],
	},
	{
		name: 'Adrastia',
		slug: 'adrastia',
		links: [
			'https://adrastia.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Adrastia',
				},
			},
		],
	},
	{
		name: 'Ad World',
		slug: 'ad-world',
		links: [
			'https://adworld.game',
		],
		views: [
			{
				name: 'Rainbow World',
				slug: 'rainbow-world',
				chainId: 8453,
				providers: {
					zapper: 'rainbow-world',
				},
			},
		],
	},
	{
		name: 'Aelin',
		slug: 'aelin',
		links: [
			'https://aelin.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'aelin',
				},
			},
			{
				chainId: 10,
				providers: {
					zapper: 'aelin',
				},
			},
		],
	},
	{
		name: 'Aerodrome',
		slug: 'aerodrome',
		links: [
			'https://aerodrome.finance',
		],
		colors: [
			'#2a54f3',
			'#0c0d1d',
			'#0433ff',
			'#9cadff',
			'#f5f3e6',
			'#ff1100',
		],
		views: [
			{
				chainId: 8453,
				erc20Tokens: [
					{
						chainId: 8453,
						address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631',
						name: 'Aerodrome',
						symbol: 'AERO',
						decimals: 18,
					},
				],
				// https://aerodrome.finance/security#contracts
				contracts: [
					{
						name: 'AirdropDistributor',
						address: '0xE4c69af018B2EA9e575026c0472B6531A2bC382F',
					},
					{
						name: 'ArtProxy',
						address: '0xE9992487b2EE03b7a91241695A58E0ef3654643E',
					},
					{
						name: 'FactoryRegistry',
						address: '0x5C3F18F06CC09CA1910767A34a20F771039E37C0',
					},
					{
						name: 'Forwarder',
						address: '0x15e62707FCA7352fbE35F51a8D6b0F8066A05DCc',
					},
					{
						name: 'GaugeFactory',
						address: '0x35f35cA5B132CaDf2916BaB57639128eAC5bbcb5',
					},
					{
						name: 'ManagedRewardsFactory',
						address: '0xFdA1fb5A2a5B23638C7017950506a36dcFD2bDC3',
					},
					{
						name: 'Minter',
						address: '0xeB018363F0a9Af8f91F06FEe6613a751b2A33FE5',
					},
					{
						name: 'PoolFactory',
						address: '0x420DD381b31aEf6683db6B902084cB0FFECe40Da',
					},
					{
						name: 'RewardsDistributor',
						address: '0x227f65131A261548b057215bB1D5Ab2997964C7d',
					},
					{
						name: 'Router',
						address: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
					},
					{
						name: 'Voter',
						address: '0x16613524e02ad97eDfeF371bC883F2F5d6C480A5',
					},
					{
						name: 'VotingEscrow',
						address: '0xeBf418Fe2512e7E6bd9b87a8F0f294aCDC67e6B4',
					},
					{
						name: 'VotingRewardsFactory',
						address: '0x45cA74858C579E717ee29A86042E0d53B252B504',
					},
					// Slipstream
					{
						name: 'GaugeFactory',
						address: '0xD30677bd8dd15132F251Cb54CbDA552d2A05Fb08',
					},
					{
						name: 'GaugeImplementation',
						address: '0xF5601F95708256A118EF5971820327F362442D2d',
					},
					{
						name: 'MixedQuoter',
						address: '0x0A5aA5D3a4d28014f967Bf0f29EAA3FF9807D5c6',
					},
					{
						name: 'NonfungiblePositionManager',
						address: '0x827922686190790b37229fd06084350E74485b72',
					},
					{
						name: 'NonfungibleTokenPositionDescriptor',
						address: '0x01b0CaCB9A8004e08D075c919B5dF3b59FD53c55',
					},
					{
						name: 'PoolFactory',
						address: '0x5e7BB104d84c7CB9B682AaC2F3d509f5F406809A',
					},
					{
						name: 'PoolImplementation',
						address: '0xeC8E5342B19977B4eF8892e02D8DAEcfa1315831',
					},
					{
						name: 'Quoter',
						address: '0x254cF9E1E6e233aa1AC962CB9B05b2cfeAaE15b0',
					},
					{
						name: 'SwapFeeModule',
						address: '0xF4171B0953b52Fa55462E4d76ecA1845Db69af00',
					},
					{
						name: 'UnstakedFeeModule',
						address: '0x0AD08370c76Ff426F534bb2AFFD9b5555338ee68',
					},
					{
						name: 'UniversalRouter',
						address: '0x6Cb442acF35158D5eDa88fe602221b67B400Be3E',
					},
					// Misc
					{
						name: 'Prices Oracle',
						address: '0xee717411f6E44F9feE011835C8E6FAaC5dEfF166',
					},
					{
						name: 'SlipstreamHelper',
						address: '0x0AD09A66af0154a84e86F761313d02d0abB6edd5',
					},
				],
				providers: {
					llamafolio: 'aerodrome',
					zapper: 'aerodrome',
				},
			},
		],
	},
	{
		name: 'Aethir',
		slug: 'aethir',
		links: [
			'https://aethir.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'aethir',
				},
			},
		],
	},
	{
		name: 'Aevo',
		slug: 'aevo',
		links: [
			'https://www.aevo.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'aevo',
				},
			},
		],
	},
	{
		name: 'Affine DeFi',
		slug: 'affine',
		links: [
			'https://affinedefi.com',
			'https://app.affinedefi.com',
			'https://earn-app.affinedefi.com',
		],
		colors: [
			'#00FF84',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					// Eigenlayer
					{
						chainId: 1,
						address: '0x47657094e3AF11c47d5eF4D3598A1536B394EEc4',
						name: 'Affine ultraETH',
						symbol: 'ultraETH',
						decimals: 26,
					},
					// Symbiotic
					{
						chainId: 1,
						address: '0x0D53bc2BA508dFdf47084d511F13Bb2eb3f8317B',
						name: 'Affine ultraETHs',
						symbol: 'ultraETHs',
						decimals: 26,
					},
				],
				providers: {
					llamafolio: 'affine-defi',
					zapper: 'affine',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'affine-defi',
					zapper: 'affine',
				},
			},
		],
	},
	{
		name: 'Agave',
		slug: 'agave',
		links: [
			'https://agave.finance',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'agave',
					zapper: 'agave',
				},
			},
		],
	},
	{
		name: 'Agility',
		slug: 'agility',
		links: [
			'https://agilitylsd.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'agility-lsd',
					zapper: 'agility',
				},
			},
		],
	},
	{
		name: 'Agni Finance',
		slug: 'agnifinance',
		links: [
			'https://agni.finance',
		],
		views: [
			{
				providers: {
					zapper: 'agnifinance',
				},
			},
		],
	},
	{
		name: 'AIDOGE',
		slug: 'ai-doge',
		links: [
			'https://aidoge.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ai-doge',
				},
			},
		],
	},
	{
		name: 'AIMBOT',
		slug: 'aim-bot',
		links: [
			'https://www.aim-bot.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'aim-bot',
				},
			},
		],
	},
	{
		name: 'Airpuff',
		slug: 'air-puff',
		links: [
			'https://www.airpuff.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'air-puff',
				},
			},
		],
	},
	{
		name: 'Airswap',
		slug: 'airswap',
		links: [
			'https://airswap.io',
		],
		colors: [
			'#2b71ff',
		],
		views: [
			{
				chainId: 1,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/airswap/airswap',
					zapper: 'airswap',
				},
			},
		],
	},
	{
		name: 'Ajna',
		slug: 'ajna',
		links: [
			'https://www.ajna.finance',
		],
		views: [
			{
				name: 'Ajna V2',
				slug: 'v2',
				chainId: undefined,
				providers: {
					zapper: 'ajna',
				},
			},
		],
	},
	{
		name: 'Akropolis',
		slug: 'akropolis',
		links: [
			'https://www.akropolis.io',
		],
		colors: [
			'#ef359c',
			'#5346e6',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/3328/thumb/Akropolis.png?1547037929',
						chainId: 1,
						address: '0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7',
						name: 'Akropolis',
						symbol: 'AKRO',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-mainnet',
					zapper: 'akropolis',
					zerionDefiSDK: [
						'Akropolis • ADEL Staking',
						'Akropolis • AKRO Staking',
					],
				},
			},
		],
	},
	{
		name: 'Aladdin DAO',
		slug: 'aladdin-dao',
		links: [
			'https://app.aladdin.club',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'aladdin-dao',
				},
			},
		],
	},
	{
		name: 'Alaya AI',
		slug: 'alaya-ai',
		links: [
			'https://www.aialaya.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'alaya-ai',
				},
			},
		],
	},
	{
		name: 'Alchemix',
		slug: 'alchemix',
		links: [
			'https://alchemix.fi',
		],
		views: [
			{
				name: 'Alchemix V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					llamafolio: 'alchemix',
					zapper: 'alchemix-v2',
				},
			},
			{
				name: 'Alchemix V2',
				slug: 'v2',
				chainId: 10,
				providers: {
					llamafolio: 'alchemix',
				},
			},
			{
				name: 'Alchemix V2',
				slug: 'v2',
				chainId: 250,
				providers: {
					llamafolio: 'alchemix',
				},
			},
			{
				name: 'Alchemix V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14113/thumb/Alchemix.png?1614409874',
						chainId: 1,
						address: '0xdbdb4d16eda451d0503b854cf79d55697f90c8df',
						name: 'Alchemix',
						symbol: 'ALCX',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16271/thumb/photo_2021-06-13_22-16-07.jpg?1623593846',
						chainId: 1,
						address: '0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6',
						name: 'Alchemix ETH',
						symbol: 'ALETH',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14114/thumb/Alchemix_USD.png?1614410406',
						chainId: 1,
						address: '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9',
						name: 'Alchemix USD',
						symbol: 'ALUSD',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'alchemix',
				},
			},
		],
	},
	{
		name: 'ALEX',
		slug: 'alex',
		links: [
			'https://alexlab.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'alex',
				},
			},
		],
	},
	{
		name: 'Alien Base',
		slug: 'alien-base',
		links: [
			'https://alienbase.xyz',
			'https://app.alienbase.xyz',
		],
		colors: [
			'#0a4efc',
		],
		views: [
			{
				chainId: 8453,
				erc20Tokens: [
					{
						address: '0x1dd2d631c92b1acdfcdd51a0f7145a50130050c4',
						name: 'AlienBase',
						symbol: 'ALB',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'alien-base',
					zapper: 'alien-based',
				},
			},
		],
	},
	{
		name: 'AlienSwap',
		slug: 'alienswap',
		links: [
			'https://alienswap.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'alienswap-nft-marketplace',
				},
			},
		],
	},
	{
		name: 'Alkemi',
		slug: 'alkemi',
		links: [
			'https://alkemi.network',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x6c16119b20fa52600230f074b349da3cb861a7e3',
					},
				],
				providers: {
					zapper: 'alkemi',
				},
			},
		],
	},
	{
		name: 'Alkimi Exchange',
		slug: 'alkimi-exchange',
		links: [
			'https://www.alkimi.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'alkimi-exchange',
				},
			},
		],
	},
	{
		name: 'Allbridge',
		slug: 'allbridge',
		links: [
			'https://allbridge.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'allbridge',
				},
			},
		],
	},
	{
		name: 'AllianceBlock',
		slug: 'allianceblock',
		links: [
			'https://www.fundrs.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'allianceblock',
				},
			},
		],
	},
	{
		name: 'Aloe Labs',
		slug: 'aloe-labs',
		links: [
			'https://aloe.capital',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: ' aloe-labs',
				},
			},
		],
	},
	{
		name: 'Alongside',
		slug: 'alongside',
		links: [
			'https://www.alongside.xyz',
		],
		colors: [
			'#0A0A0B',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xF17A3fE536F8F7847F1385ec1bC967b2Ca9caE8D',
						name: 'Alongside Crypto Market Index',
						symbol: 'AMKT',
						decimals: 18,
					},
				],
				// https://docs.amktdao.com/amkt-documentation/amkt-documentation/developers
				contracts: [
					{
						name : 'Proxy Admin',
						address: '0x998930C351EcB4918A5c5238B62d5277fE45ab9b',
					},
					{
						name : 'Proxy (Token)',
						address: '0xF17A3fE536F8F7847F1385ec1bC967b2Ca9caE8D',
					},
					{
						name : 'Vault',
						address: '0xf3bCeDaB2998933c6AAD1cB31430D8bAb329dD8C',
					},
					{
						name : 'Issuance',
						address: '0x7D1775061A3a713E778aF23806330B532Fa006B0',
					},
					{
						name : 'Invokeable Bounty',
						address: '0xE13Ee59C41c67696754277cDC73710f6D65Ef2Ac',
					},
					{
						name : 'Active Bounty',
						address: '0x0DAF7e851f6054085432229150c1706988aBc562',
					},
					{
						name : 'Alongside Governor',
						address: '0xb6a6f2a56693Dc4f893f8396D945f7dFe03aA9ba',
					},
					{
						name : 'Timelock Controller',
						address: '0x4c362faB50Bc81F0F58ef2DA6b6E10b55FC1d478',
					},
					{
						name : 'Quoter',
						address: '0xE3BE63E1B959c152212ce1dD45D0d2f749eB227c',
					},
				],
				providers: {
					llamafolio: 'alongside',
				},
			},
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0xB87904DB461005FC716a6BF9F2d451c33b10b80b',
						name: 'Alongside Crypto Market Index',
						symbol: 'AMKT',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'alongside',
				},
			},
			{
				chainId: 42161,
				erc20Tokens: [
					{
						address: '0x498C620C7C91C6eba2E3Cd5485383f41613b7EB6',
						name: 'Alongside Crypto Market Index',
						symbol: 'AMKT',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'alongside',
				},
			},
			{
				chainId: 10,
				erc20Tokens: [
					{
						address: '0xC27D9BC194a648fE3069955a5126699C4e49351C',
						name: 'Alongside Crypto Market Index',
						symbol: 'AMKT',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'alongside',
				},
			},
			{
				chainId: 8453,
				erc20Tokens: [
					{
						address: '0x13F4196cC779275888440b3000AE533BbBbC3166',
						name: 'Alongside Crypto Market Index',
						symbol: 'AMKT',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'alongside',
				},
			},
		],
	},
	{
		name: 'Alpaca Finance',
		slug: 'alpaca',
		links: [
			'https://www.alpacafinance.org',
		],
		views: [
			{
				chainId: 1,
				// https://docs.alpacafinance.org/our-protocol-1/transparency
				providers: {
					llamafolio: 'alpaca-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'alpaca-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'alpaca-finance',
				},
			},
		],
	},
	{
		name: 'Alpha Tokenomics',
		slug: 'alpha-tokenomics',
		links: [
			'https://tokenomics.alphafinance.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'alpha-tokenomics',
				},
			},
		],
	},
	{
		name: 'Alpha Finance',
		slug: 'alpha',
		links: [
			'https://alphafinance.io',
		],
		views: [
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: [
					'https://homora-v2.alphaventuredao.io',
					'https://homora-v2.alphafinance.io',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12738/thumb/AlphaToken_256x256.png?1617160876',
						chainId: 1,
						address: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
						name: 'Alpha Finance',
						symbol: 'ALPHA',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'homora-v2',
					zapper: 'alpha-v2',
					zerionDefiSDK: [
						'Alpha Homora V2',
					],
				},
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: [
					'https://homora-v2.alphaventuredao.io',
					'https://homora-v2.alphafinance.io',
				],
				chainId: 250,
				providers: {
					llamafolio: 'homora-v2',
					zapper: 'homora-v2',
				},
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: [
					'https://homora-v2.alphaventuredao.io',
					'https://homora-v2.alphafinance.io',
				],
				chainId: 43114,
				providers: {
					llamafolio: 'homora-v2',
					zapper: 'homora-v2',
				},
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: [
					'https://homora-v2.alphaventuredao.io',
					'https://homora-v2.alphafinance.io',
				],
				chainId: 1,
				providers: {
					llamafolio: 'homora-v2',
					zapper: 'homora-v2',
				},
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: [
					'https://homora-v2.alphaventuredao.io',
					'https://homora-v2.alphafinance.io',
				],
				chainId: 10,
				providers: {
					llamafolio: 'homora-v2',
					zapper: 'homora-v2',
				},
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: [
					'https://homora-v2.alphaventuredao.io',
					'https://homora-v2.alphafinance.io',
				],
				chainId: 56,
				providers: {
					llamafolio: 'homora-v2',
					zapper: 'homora-v2',
				},
			},
			{
				name: 'Alpha Homora V1',
				slug: 'v1',
				links: [
					'https://homora.alphafinance.io',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12738/thumb/AlphaToken_256x256.png?1617160876',
						chainId: 1,
						address: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
						name: 'Alpha Finance',
						symbol: 'ALPHA',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'alpha-v1',
					zerionDefiSDK: [
						'Alpha Homora',
					],
				},
			},
		],
	},
	{
		name: 'Altered State Machine',
		slug: 'altered-state-machine',
		links: [
			'https://www.alteredstatemachine.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'altered-state-machine',
				},
			},
		],
	},
	{
		name: 'AltLayer',
		slug: 'altlayer',
		links: [
			'https://altlayer.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'altlayer',
				},
			},
		],
	},
	{
		name: 'ALTS by adidas',
		slug: 'alts-adidas',
		links: [
			'https://collect.adidas.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'alts-adidas',
				},
			},
		],
	},
	{
		name: 'Always Liquid',
		slug: 'alwyas-liquid',
		links: [
			'https://alwaysliquid.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'alwyas-liquid',
				},
			},
		],
	},
	{
		name: 'Ambient',
		slug: 'ambient',
		links: [
			'https://ambient.finance',
			'https://us.ambient.finance',
		],
		// https://docs.ambient.finance/developers/deployed-contracts
		views: [
			{
				chainId: 1,
				contracts: [
					{
						name: 'CrocSwapDex',
						address: '0xAaAaAAAaA24eEeb8d57D431224f73832bC34f688',
					},
					{
						name: 'CrocPolicy',
						address: '0x0b6CD0ECb176cb39Ad99B3A0E4294167a80B68a3',
					},
					{
						name: 'CrocQuery',
						address: '0xCA00926b6190c2C59336E73F02569c356d7B6b56',
					},
					{
						name: 'CrocImpact',
						address: '0x3e3EDd3eD7621891E574E5d7f47b1f30A994c0D0',
					},
					{
						name: 'CrocSwapRouter',
						address: '0x533E164ded63f4c55E83E1f409BDf2BaC5278035',
					},
					{
						name: 'CrocSwapRouterBypass',
						address: '0xa3e58B0cB05447398358B6C59E4B2465342EFEd2',
					},
					// Governance Contracts
					{
						name: 'Ops Multisig',
						address: '0x9fACdcfb3b58D85d0440aF292D64480Ad2503A6e',
					},
					{
						name: 'Ops Timelock',
						address: '0x41114A13230625A2735FaA7183e528Ed2538cB7b',
					},
					{
						name: 'Treasury Multisig',
						address: '0xDBD8D583a18C99e7f5191351E6E739AF8e62DaC3',
					},
					{
						name: 'Treasury Timelock',
						address: '0x7237C120FCA2081f1A36AB933B065389174962B7',
					},
				],
				providers: {
					llamafolio: 'ambient',
					zapper: 'ambient-finance',
				},
			},
			{
				chainId: 81457,
				contracts: [
					{
						name: 'CrocSwapDex',
						address: '0xaAaaaAAAFfe404EE9433EEf0094b6382D81fb958',
					},
					{
						name: 'CrocPolicy',
						address: '0x503E3DfDdD22D1c4A9787D2DAc8643AFc58c162C',
					},
					{
						name: 'CrocQuery',
						address: '0xA3BD3bE19012De72190c885FB270beb93e36a8A7',
					},
					{
						name: 'CrocImpact',
						address: '0x6A699AB45ADce02891E6115b81Dfb46CAa5efDb9',
					},
					{
						name: 'CrocSwapRouter',
						address: '0xaab17419F062bB28CdBE82f9FC05E7C47C3F6194',
					},
					{
						name: 'CrocSwapRouterBypass',
						address: '0xd83eF4d0e968A96329aC297bBf049CDdaC7E0362',
					},
					{
						name: 'Blast Points Operator',
						address: '0xd45C74BFB150Bc2Cb94e471638283e99E4Da14EB',
					},
					// Governance Contracts
					{
						name: 'Treasury Multisig',
						address: '0xc73C8C60ea7d7f4338F9A8542927F4F1471e36ed',
					},
					{
						name: 'Treasury Timelock',
						address: '0x19D005f3d4A9C5B0211457339dDa9822Dc2dEE94',
					},
				],
			},
			{
				chainId: 534352,
				contracts: [
					{
						name: 'CrocSwapDex',
						address: '0xaaaaAAAACB71BF2C8CaE522EA5fa455571A74106',
					},
					{
						name: 'CrocPolicy',
						address: '0x70b161F2f0A18Bd1865021F25f9e895021E9DC4f',
					},
					{
						name: 'CrocQuery',
						address: '0x62223e90605845Cf5CC6DAE6E0de4CDA130d6DDf',
					},
					{
						name: 'CrocImpact',
						address: '0xc2c301759B5e0C385a38e678014868A33E2F3ae3',
					},
					{
						name: 'CrocSwapRouter',
						address: '0xfB5f26851E03449A0403Ca945eBB4201415fd1fc',
					},
					{
						name: 'CrocSwapRouterBypass',
						address: '0xED5535C6237f72BD9b4fDEAa3b6D8d9998b4C4e4',
					},
					// Governance contracts
					{
						name: 'Ops Multisig',
						address: '0x1E0cc2fbEb09e320223A380357978d651ed652bC',
					},
					{
						name: 'Ops Timelock',
						address: '0xDb0eE1193C4D05eb644efb2a1db13275b8F5994f',
					},
					{
						name: 'Treasury Multisig',
						address: '0x81956099675d25363d17B983125dD99269A9f26F',
					},
					{
						name: 'Treasury Timelock',
						address: '0x51D3BA9CA9a120dA0BCf8b487Bd42878758f7916',
					},
				],
			},
		],
	},
	{
		name: 'Ambire Wallet',
		slug: 'ambire',
		links: [
			'https://www.ambire.com',
		],
		colors: [
			'#6000ff',
			'#b46cf3',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'ambire-wallet',
				},
			},
		],
	},
	{
		name: 'Ampera',
		slug: 'amp',
		links: [
			'https://ampera.xyz',
			'https://amptoken.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'amp',
				},
			},
		],
	},
	{
		name: 'Amphor',
		slug: 'amphor',
		links: [
			'https://amphor.io',
		],
		views: [
			{
				chainId: 1,
				// https://defivaults.gitbook.io/amphor/boosted-eth-vault-v1/contract-addresses
				providers: {
					llamafolio: 'amphor',
					zapper: 'amphor',
				},
			},
		],
	},
	{
		name: 'Amphora Protocol',
		slug: 'amphora-protocol',
		links: [
			'https://amphorafinance.com',
			'https://amphora-protocol.gitbook.io/amphora-protocol',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'amphora-protocol',
				},
			},
		],
	},
	{
		name: 'Ampleforth',
		slug: 'ampleforth',
		links: [
			'https://www.ampleforth.org',
		],
		colors: [
			'#5856d6',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/4708/thumb/Ampleforth.png?1561684250',
						chainId: 1,
						address: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
						name: 'Ampleforth',
						symbol: 'AMPL',
						decimals: 9,
					},
				],
				providers: {
					zerionDefiSDK: [
						'Ampleforth',
					],
					zapper: 'ampleforth',
				},
			},
			{
				name: 'Ampleforth Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14917/thumb/photo_2021-04-22_00.00.03.jpeg?1619020835',
						chainId: 1,
						address: '0x77fba179c79de5b7653f68b5039af940ada60ce0',
						name: 'Ampleforth Governan',
						symbol: 'FORTH',
						decimals: 18,
					},
				],
			},
		],
	},
	{
		name: 'Angle',
		slug: 'angle',
		links: [
			'https://www.angle.money',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x31429d1856ad1377a8a0079410b297e1a9e214c2',
					},
				],
				providers: {
					zapper: 'angle',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'angle',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'angle',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'angle',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'angle',
				},
			},
			{
				name: 'Merkl',
				slug: 'merkl',
				links: [
					'https://merkl.angle.money',
				],
				providers: {
					zapper: 'merkl',
				},
			},
		],
	},
	{
		name: 'Ankr',
		slug: 'ankr',
		links: [
			'https://www.ankr.com',
			'https://www.ankr.com/staking/stake',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'ankr',
					zapper: 'ankr-staking',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'ankr',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'ankr',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'ankr',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'ankr',
				},
			},
		],
	},
	{
		name: 'Annex',
		slug: 'annex',
		links: [
			'https://www.annex.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'annex',
				},
			},
		],
	},
	{
		name: 'Anomalous Materials',
		slug: 'anomalous-materials',
		links: [
			'https://anma.io',
		],
		views: [
			{
				name: 'A Machine For Dying',
				slug: 'a-machine-for-dying',
				links: [
					'https://diabolicalmachines.anma.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'a-machine-for-dying',
				},
			},
		],
	},
	{
		name: 'Anvil',
		slug: 'anvil',
		links: [
			'https://anvil.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'anvil',
				},
			},
		],
	},
	{
		name: 'Anyone Protocol',
		slug: 'anyone-protocol',
		links: [
			'https://www.anyone.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'anyone-protocol',
				},
			},
		],
	},
	{
		name: 'Anzem',
		slug: 'anzem',
		links: [
			'https://anzen.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'anzem',
				},
			},
		],
	},
	{
		name: 'Ape Express',
		slug: 'ape-express',
		links: [
			'https://ape.express',
		],
		views: [
			{
				providers: {
					zapper: 'ape-express',
				},
			},
		],
	},
	{
		name: 'Ape Portal',
		slug: 'ape-portal',
		links: [
			'https://apechain.com/portal',
		],
		views: [
			{
				providers: {
					zapper: 'ape-portal',
				},
			},
		],
	},
	{
		name: 'Ape Tax',
		slug: 'ape-tax',
		links: [
			'https://ape.tax',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'ape-tax',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'ape-tax',
				},
			},
		],
	},
	{
		name: 'ApeCoin DAO',
		slug: 'apecoin',
		links: [
			'https://apecoin.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/24383/thumb/apecoin.jpg?1647476455',
						chainId: 1,
						address: '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
						name: 'ApeCoin',
						symbol: 'APE',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'apecoin',
				},
			},
			{
				name: 'Staking',
				slug: 'staking',
				links: [
					'https://apecoinstaking.io',
				],
				chainId: 1,
				providers: {
					zapper: 'ape-coin-staking',
				},
			},
			{
				chainId: 5,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/24383/thumb/apecoin.jpg?1647476455',
						chainId: 5,
						address: '0x328507DC29C95c170B56a1b3A758eB7a9E73455c',
						name: 'ApeCoin',
						symbol: 'APE',
						decimals: 18,
					},
				],
				contracts: [
					{
						address: '0x831e0c7A89Dbc52a1911b78ebf4ab905354C96Ce',
					},
				],
			},
			{
				name: 'NF3 APE',
				slug: 'nf3-ape',
				links: [
					'https://apecoinstaking.io',
				],
				chainId: 1,
				providers: {
					llamafolio: 'nf3-ape',
				},
			},
		],
	},
	{
		name: 'ApeSwap',
		slug: 'apeswap',
		links: [
			'https://apeswap.finance',
		],
		colors: [
			'#a16552',
			'#ffb300',
		],
		views: [
			{
				name: 'Swap',
				slug: 'swap',
				chainId: 56,
				providers: {
					llamafolio: 'apeswap-lending',
					zapper: 'apeswap',
				},
			},
			{
				name: 'AMM',
				slug: 'amm',
				chainId: 56,
				providers: {
					llamafolio: 'apeswap-amm',
					zapper: 'apeswap',
				},
			},
			{
				name: 'AMM',
				slug: 'amm',
				chainId: 137,
				providers: {
					llamafolio: 'apeswap-amm',
					zapper: 'apeswap',
				},
			},
			{
				name: 'AMM',
				slug: 'amm',
				chainId: 1,
				providers: {
					llamafolio: 'apeswap-amm',
					zapper: 'apeswap',
				},
			},
		],
	},
	{
		name: 'ApeX Protocol',
		slug: 'apex-protocol',
		links: [
			'https://www.apex.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ApeX-Protocol',
				},
			},
		],
	},
	{
		name: 'API3',
		slug: 'api3',
		links: [
			'https://api3.eth.link',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'api3',
					llamafolio: 'api3',
				},
			},
		],
	},
	{
		name: 'ApolloX',
		slug: 'apollox',
		links: [
			'https://www.apollox.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'apollox',
					zapper: 'ApolloX',
				},
			},
		],
	},
	{
		name: 'Aptos Bridge',
		slug: 'aptos-brisge',
		links: [
			'https://theaptosbridge.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Aptos-brisge',
				},
			},
		],
	},
	{
		name: 'APWine',
		slug: 'apwine',
		links: [
			'https://apwine.fi',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'apwine',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'apwine',
				},
			},
		],
	},
	{
		name: 'APY.Finance',
		slug: 'apy',
		links: [
			'https://apy.finance',
		],
		colors: [
			'#d153f4',
			'#4d43df',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13041/thumb/1*AvkD-OLocausbxqUzezZ0A.png?1604577922',
						chainId: 1,
						address: '0x95a4492f028aa1fd432ea71146b433e7b4446611',
						name: 'APY Finance',
						symbol: 'APY',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'apy',
				},
			},
		],
	},
	{
		name: 'Aragon',
		slug: 'aragon',
		links: [
			'https://aragon.org',
			'https://aragon.org/aragon-app',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/681/thumb/JelZ58cv_400x400.png?1601449653',
						chainId: 1,
						address: '0xa117000000f279d81a1d3cc75430faa017fa5a2e',
						name: 'Aragon',
						symbol: 'ANT',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'aragon',
					zerionDefiSDK: [
						'Aragon',
					],
				},
			},
		],
	},
	{
		name: `Arbi's Finance`,
		slug: 'arbis-finance',
		links: [
			'https://arbis.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'arbis-finance',
				},
			},
		],
	},
	{
		name: 'ArbiDEX',
		slug: 'arbidex',
		links: [
			'https://arbidex.fi',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'arbitrum-exchange',
				},
			},
		],
	},
	{
		name: 'Arbitrum',
		slug: 'arbitrum',
		icon: ArbitrumIcon,
		colors: [
			'#28a0f0',
		],
		views: [
			{
				name: 'Arbitrum Governance',
				slug: 'arbitrum',
				links: [
					'https://arbitrum.foundation',
				],
				chainId: 1,
				providers: {
					zapper: 'arbitrum',
				},
			},
			{
				name: 'Arbitrum Bridge',
				slug: 'arbitrum-bridge',
				icon: ArbitrumOneIcon,
				colors: [
					'#1b4add',
				],
				links: [
					'https://bridge.arbitrum.io',
				],
				chainId: 1,
				providers: {
					zapper: 'arbitrum-bridge',
				},
			},
		],
	},
	{
		name: 'Arbor Finance',
		slug: 'arbor-finance',
		links: [
			'https://app.arbor.finance/offerings',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'arbor-finance',
				},
			},
		],
	},
	{
		name: 'Arbswap',
		slug: 'arbswap',
		links: [
			'https://arbswap.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'arbswap',
					zapper: 'Arbswap',
				},
			},
		],
	},
	{
		name: 'Arc Swap',
		slug: 'arc-swap',
		links: [
			'https://www.arc.market',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'arc-swap',
				},
			},
		],
	},
	{
		name: 'Arcade',
		slug: 'arcade',
		links: [
			'https://www.arcade.xyz',
			'https://app.arcade.xyz/home',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'arcade',
				},
			},
		],
	},
	{
		name: 'Arcadia Finance',
		slug: 'arcadia-finance',
		links: [
			'https://arcadia.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'arcadia-finance',
				},
			},
		],
	},
	{
		name: 'ARCx',
		slug: 'arcx',
		links: [
			'https://arcx.money',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/15652/thumb/coingecko-arcx-400x400.png?1634285525',
						chainId: 1,
						address: '0x1321f1f1aa541a56c31682c57b80ecfccd9bb288',
						name: 'ARC Governance',
						symbol: 'ARCX',
						decimals: 18,
					},
					erc20TokensByContractAddress['0xed30dd7e50edf3581ad970efc5d9379ce2614adb'], // ARC Governance Old
				],
				providers: {
					zapper: 'arcx',
				},
			},
		],
	},
	{
		name: 'Argent',
		slug: 'argent',
		links: [
			'https://www.argent.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'argent',
				},
			},
		],
	},
	{
		name: 'Argo Finance',
		slug: 'argo-finance',
		links: [
			'https://www.argofinance.money',
		],
		views: [
			{
				chainId: 25,
				providers: {
					zapper: 'argo-finance',
				},
			},
		],
	},
	{
		name: 'Arkham',
		slug: 'arkham',
		links: [
			'https://www.arkhamintelligence.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'arkham',
				},
			},
		],
	},
	{
		name: 'Armor',
		slug: 'armor',
		links: [
			'https://armor.fi',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13748/thumb/armor.png?1611425846',
						chainId: 1,
						address: '0x1337def16f9b486faed0293eb623dc8395dfe46a',
						name: 'ARMOR',
						symbol: 'ARMOR',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'armor',
				},
			},
		],
	},
	{
		name: 'ARPA Staking',
		slug: 'arpa-staking',
		links: [
			'https://staking.arpanetwork.io/en-US/stake?action=Stake',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'arpa-staking',
				},
			},
		],
	},
	{
		name: 'Arrakis Finance',
		slug: 'arrakis',
		links: [
			'https://arrakis.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'arrakis-finance',
					zapper: 'arrakis',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'arrakis-finance',
					zapper: 'arrakis',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'arrakis-finance',
					zapper: 'arrakis',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'arrakis-finance',
				},
			},
		],
	},
	{
		name: 'Art Blocks',
		slug: 'art-blocks',
		links: [
			'https://www.artblocks.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Art-Blocks',
				},
			},
		],
	},
	{
		name: 'Art Gobblers',
		slug: 'art-gobblers',
		links: [
			'https://artgobblers.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'art-gobblers',
				},
			},
		],
	},
	{
		name: 'ArtRun',
		slug: 'artrun',
		links: [
			'https://artrun.io',
		],
		views: [
			{
				providers: {
					zapper: 'art-run',
				},
			},
		],
	},
	{
		name: 'Artchains',
		slug: 'artchains',
		links: [
			'https://artchains.app',
		],
		views: [
			{
				providers: {
					zapper: 'artchains',
				},
			},
		],
	},
	{
		name: 'Artemis Finance',
		slug: 'artemis-finance',
		links: [
			'https://artemisfinance.io/home',
		],
		views: [
			{
				providers: {
					zapper: 'artemis-finance',
				},
			},
		],
	},
	{
		name: 'Arth',
		slug: 'arth',
		links: [
			'https://arth.mahadao.com',
		],
		colors: [
			'#222',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'arth',
				},
			},
		],
	},
	{
		name: 'Arweave',
		slug: 'arweave',
		links: [
			'https://ao.arweave.dev',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'arweave',
				},
			},
		],
	},
	{
		name: 'Astaria',
		slug: 'astaria',
		links: [
			'https://astaria.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'astaria',
				},
			},
		],
	},
	{
		name: 'Astrid',
		slug: 'astrid',
		links: [
			'https://astrid.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Astrid',
				},
			},
		],
	},
	{
		name: 'Asymetrix Protocol',
		slug: 'asymetrix-protocol',
		links: [
			'https://asymetrix.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'asymetrix-protocol',
					zapper: 'asymetrix',
				},
			},
		],
	},
	{
		name: 'Asymmetry Finance',
		slug: 'asymmetry-finance',
		links: [
			'https://www.asymmetry.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'asymmetry-finance',
					zapper: 'asymmetry-finance',
				},
			},
		],
	},
	{
		name: 'Atari Onchain Arcade',
		slug: 'atari-onchain-arcade',
		links: [
			'https://www.arcade.fun',
		],
		views: [
			{
				providers: {
					zapper: 'onchainarcade',
				},
			},
		],
	},
	{
		name: 'Athena Finance',
		slug: 'athena-finance',
		links: [
			'https://www.athenafinance.io',
		],
		views: [
			{
				providers: {
					zapper: 'athena-finance',
				},
			},
		],
	},
	{
		name: 'Atlantis Loans',
		slug: 'atlantis-loans',
		links: [
			'https://atlantis.loans',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'atlantis-loans',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'atlantis-loans',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'atlantis-loans',
				},
			},
		],
	},
	{
		name: 'Atlas USV',
		slug: 'atlas-usv',
		links: [
			'https://www.atlasusv.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'atlas-usv',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'atlas-usv',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'atlas-usv',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'atlas-usv',
				},
			},
		],
	},
	{
		name: 'AtlasNavi',
		slug: 'atlasnavi',
		links: [
			'https://www.atlasnavi.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'atlasnavi',
				},
			},
		],
	},
	{
		name: 'Atlendis',
		slug: 'atlendis',
		links: [
			'https://app.atlendis.io',
		],
		views: [
			{
				name: 'Atlendis V1',
				slug: 'v1',
				chainId: 137,
				providers: {
					zapper: 'atlendis-v1',
				},
			},
		],
	},
	{
		name: 'Audius',
		slug: 'audius',
		links: [
			'https://audius.org',
		],
		colors: [
			'#cc0fe0',
			'#7e1bcc',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12913/thumb/AudiusCoinLogo_2x.png?1603425727',
						chainId: 1,
						address: '0x18aaa7115705e8be94bffebde57af9bfc265b998',
						name: 'Audius',
						symbol: 'AUDIO',
						decimals: 18,
					},
				],
				contracts: [
					{
						address: '0x819fd65026848d710fe40d8c0439f1220e069398',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/audius-infra/audius-network-mainnet',
				},
			},
		],
	},
	{
		name: 'Augur',
		slug: 'augur',
		links: [
			'https://www.augur.net',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/309/thumb/REP.png?1596339859',
						chainId: 1,
						address: '0x221657776846890989a759ba2973e427dff5c9bb',
						name: 'Augur',
						symbol: 'REP',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'augur',
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12597/thumb/nX10wsB.png?1600997655',
						chainId: 1,
						address: '0x44ea84a85616f8e9cd719fc843de31d852ad7240',
						name: 'NO Trump Augur Pred',
						symbol: 'NTRUMP',
						decimals: 15,
					},
				],
			},
		],
	},
	{
		name: 'Augury Finance',
		slug: 'augury-finance',
		links: [
			'https://augury.finance',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'augury-finance',
				},
			},
		],
	},
	{
		name: 'Aura',
		slug: 'aura',
		links: [
			'https://aura.finance',
			'https://app.aura.finance',
		],
		colors: [
			'#7c3aed',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xc0c293ce456ff0ed870add98a0828dd4d2903dbf',
					},
				],
				providers: {
					llamafolio: 'aura',
					zapper: 'aura',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'aura',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'aura',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'aura',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'aura',
				},
			},
		],
	},
	{
		name: 'Aurelius',
		slug: 'aurelius',
		links: [
			'https://www.aurelius.finance',
		],
		views: [
			{
				providers: {
					zapper: 'aurelius',
				},
			},
		],
	},
	{
		name: 'Aurigami',
		slug: 'aurigami',
		links: [
			'https://www.aurigami.finance',
		],
		views: [
			{
				chainId: 1313161554,
				providers: {
					zapper: 'aurigami',
				},
			},
		],
	},
	{
		name: 'Aurora+',
		slug: 'aurora-plus',
		icon: AuroraIcon,
		colors: [
			'#92d36f',
		],
		links: [
			'https://aurora.plus',
		],
		views: [
			{
				chainId: 1313161554,
				providers: {
					zapper: 'aurora-plus',
				},
			},
		],
	},
	{
		name: 'Autoearn Finance',
		slug: 'autoearn-finance',
		links: [
			'https://www.autoearn.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'autoearn-finance',
				},
			},
		],
	},
	{
		name: 'Autofarm',
		slug: 'autofarm',
		links: [
			'https://autofarm.network',
		],
		views: [
			{
				chainId: 56,
				providers: {
					zapper: 'autofarm',
				},
			},
		],
	},
	{
		name: 'AutoLayer',
		slug: 'autolayer',
		links: [
			'https://autolayer.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'autolayer',
				},
			},
		],
	},
	{
		name: 'Autotronic',
		slug: 'autotronic',
		links: [
			'https://autotronic.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Autotronic',
				},
			},
		],
	},
	{
		name: 'Auxo',
		slug: 'auxo',
		links: [
			'https://auxo.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'auxo',
				},
			},
		],
	},
	{
		name: 'Avalaunch',
		slug: 'avalaunch',
		links: [
			'https://avalaunch.app',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'avalaunch',
				},
			},
		],
	},
	{
		name: 'Avalon Finance',
		slug: 'avalon',
		links: [
			'https://app.avalonfinance.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'avalon',
				},
			},
		],
	},
	{
		name: 'Avantis',
		slug: 'avantis',
		links: [
			'https://www.avantisfi.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'avantis',
				},
			},
		],
	},
	{
		name: 'Avastars',
		slug: 'avastars',
		links: [
			'https://avastars.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'avastars',
				},
			},
		],
	},
	{
		name: 'Avolend',
		slug: 'avolend',
		links: [
			'https://www.avolend.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'avolend',
				},
			},
		],
	},
	{
		name: 'Ax Protocol',
		slug: 'ax-protocol',
		links: [
			'https://www.ax.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Ax-Protocol',
				},
			},
		],
	},
	{
		name: 'Axe Cap',
		slug: 'axe-cap',
		links: [
			'https://www.axecap.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'axe-cap',
				},
			},
		],
	},
	{
		name: 'Axelar',
		slug: 'axelar',
		links: [
			'https://axelar.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'axelar',
				},
			},
		],
	},
	{
		name: 'Axiom',
		slug: 'axiom',
		links: [
			'https://www.axiom.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'axiom',
				},
			},
		],
	},
	{
		name: 'Aztec Bridge',
		slug: 'aztec',
		links: [
			'https://aztec.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'aztec',
				},
			},
		],
	},
	{
		name: 'Azuro',
		slug: 'azuro',
		links: [
			'https://azuro.org',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'azuro',
					zapper: 'azuro',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'azuro',
					zapper: 'azuro',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'azuro',
					zapper: 'azuro',
				},
			},
		],
	},
	{
		name: 'Babylon Finance',
		slug: 'babylon-finance',
		links: [
			'https://www.babylon.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'babylon-finance',
				},
			},
		],
	},
	{
		name: 'Backed Finance',
		slug: 'backed-finance',
		links: [
			'https://backed.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'backed-finance',
				},
			},
		],
	},
	{
		name: 'Badger',
		slug: 'badger',
		links: [
			'https://badger.finance',
		],
		colors: [
			'#F2A52B',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13287/thumb/badger_dao_logo.jpg?1607054976',
						chainId: 1,
						address: '0x3472a5a71965499acd81997a54bba8d852c6e53d',
						name: 'Badger DAO',
						symbol: 'BADGER',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14502/thumb/BADGER_DAO.png?1616559959',
						chainId: 1,
						address: '0x19d97d8fa813ee2f51ad4b4e04ea08baf4dffc28',
						name: 'Badger Sett Badger',
						symbol: 'BBADGER',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14503/thumb/DIGG.png?1616560407',
						chainId: 1,
						address: '0x7e7e112a68d8d2e221e11047a72ffc1065c38e1a',
						name: 'Badger Sett Digg',
						symbol: 'BDIGG',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'badger-dao',
					zapper: 'badger',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'badger-dao',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'badger-dao',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'badger-dao',
				},
			},
		],
	},
	{
		name: 'BakerySwap',
		slug: 'bakery-swap',
		links: [
			'https://www.bakeryswap.org',
		],
		views: [
			{
				providers: {
					zapper: 'bakery-swap',
				},
			},
		],
	},
	{
		name: 'Balancer',
		slug: 'balancer',
		links: [
			'https://balancer.fi',
			'https://app.balancer.fi',
		],
		colors: [
			'#536dfe',
		], // unofficial
		views: [
			{
				name: 'Balancer V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					llamafolio: 'balancer',
					theGraph: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
					zapper: 'balancer-v2',
					zerionDefiSDK: [
						'Balancer',
					],
				},
			},
			{
				name: 'Balancer V2',
				slug: 'v2',
				chainId: 42161,
				providers: {
					llamafolio: 'balancer',
				},
			},
			{
				name: 'Balancer V2',
				slug: 'v2',
				chainId: 100,
				providers: {
					llamafolio: 'balancer',
				},
			},
			{
				name: 'Balancer V2',
				slug: 'v2',
				chainId: 43114,
				providers: {
					llamafolio: 'balancer',
				},
			},
			{
				name: 'Balancer V2',
				slug: 'v2',
				chainId: 137,
				providers: {
					llamafolio: 'balancer',
				},
			},
			{
				name: 'Balancer Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11683/thumb/Balancer.png?1592792958',
						chainId: 1,
						address: '0xba100000625a3754423978a60c9317c58a424e3d',
						name: 'Balancer',
						symbol: 'BAL',
						decimals: 18,
					},
				],
			},
			{
				name: 'Balancer V1',
				slug: 'v1',
				links: [
					'https://pools.balancer.exchange',
				],
				chainId: 1,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
					llamafolio: 'balancer',
					zapper: 'balancer-v1',
					zerionDefiSDK: [
						'Balancer',
					],
				},
			},
		],
	},
	{
		name: 'Baldex',
		slug: 'baldex',
		links: [
			'https://www.baldex.hair',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Baldex',
				},
			},
		],
	},
	{
		name: 'Balmy',
		slug: 'balmy',
		links: [
			'https://balmy.xyz',
			'https://mean.finance',
		],
		colors: [
			'#3076F6',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'mean-finance',
					zapper: 'mean-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'mean-finance',
					zapper: 'mean-finance',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'mean-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'mean-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'mean-finance',
				},
			},
		],
	},
	{
		name: 'Banana Gun',
		slug: 'banana-gun',
		links: [
			'https://bananagun.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'banana-gun',
				},
			},
		],
	},
	{
		name: 'Banano',
		slug: 'banano',
		links: [
			'https://wrap.banano.cc',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'banano',
				},
			},
			{
				chainId: 56,
				providers: {
					zapper: 'banano',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'banano',
				},
			},
		],
	},
	{
		name: 'Bancor',
		slug: 'bancor',
		links: [
			'https://bancor.network',
			'https://app.bancor.network',
		],
		colors: [
			'#070e1f',
		], // unofficial
		views: [
			{
				name: 'Bancor V3',
				slug: 'v3',
				chainId: 1,
				providers: {
					llamafolio: 'bancor-v3',
					zapper: 'bancor-v3',
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/736/thumb/bancor-bnt.png?1628822309',
						chainId: 1,
						address: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',
						name: 'Bancor Network Toke',
						symbol: 'BNT',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14053/thumb/bancorvbnt_32.png?1614048819',
						chainId: 1,
						address: '0x48fb253446873234f2febbf9bdeaa72d9d387f94',
						name: 'Bancor Governance T',
						symbol: 'VBNT',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/10619/thumb/busd.png?1581026228',
						chainId: 1,
						address: '0x309627af60f0926daa6041b8279484312f2bf060',
						name: 'USD Bancor',
						symbol: 'USDB',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/blocklytics/bancor',
					zapper: 'bancor',
					zerionDefiSDK: [
						'Bancor',
						'Bancor • Liquidity Protection',
						'Bancor • Locked BNT',
					],
				},
			},
		],
	},
	{
		name: 'Bank AI',
		slug: 'bank-ai',
		links: [
			'https://bankai.app',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'bank-ai',
				},
			},
		],
	},
	{
		name: 'Bao Finance',
		slug: 'bao',
		links: [
			'https://www.bao.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13547/thumb/BaoLogo.png?1615342483',
						chainId: 1,
						address: '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1',
						name: 'Bao Finance',
						symbol: 'BAO',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'bao',
				},
			},
		],
	},
	{
		name: 'BarnBridge',
		slug: 'barnbridge',
		links: [
			'https://barnbridge.com',
		],
		views: [
			{
				name: 'BarnBridge V2',
				slug: 'v2',
				links: [
					'https://app.barnbridge.com',
				],
				chainId: 1,
				providers: {
					zapper: 'barnbridge-v2',
				},
			},
			{
				name: 'BarnBridge V2',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					// erc20TokensBySymbol['BOND'],
				],
				providers: {
					zapper: 'barnbridge',
				},
			},
			{
				name: 'BarnBridge Smart Alpha',
				slug: 'smart-alpha',
				chainId: 1,
				providers: {
					zapper: 'barnbridge-smart-alpha',
				},
			},
			{
				name: 'BarnBridge Smart Yield',
				slug: 'smart-yield',
				links: [
					'https://app.barnbridge.com/smart-alpha/pools',
				],
				chainId: 1,
				providers: {
					zapper: 'barnbridge-smart-yield',
				},
			},
		],
	},
	{
		name: 'Base',
		slug: 'base',
		icon: BaseIcon,
		colors: [
			'#0052ff',
		],
		links: [
			'https://base.org',
		],
		views: [
			{
				name: 'Base Bridge',
				slug: 'bridge',
				links: [
					'https://bridge.base.org',
				],
				chainId: undefined,
				providers: {
					zapper: 'base-bridge',
				},
			},
		],
	},
	{
		name: 'BaseBomb',
		slug: 'base-bomb',
		links: [
			'https://basebomb.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'base-bomb',
				},
			},
		],
	},
	{
		name: 'Base Colors',
		slug: 'basecolors',
		links: [
			'https://basecolors.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'basecolors',
				},
			},
		],
	},
	{
		name: 'BaseMax',
		slug: 'basemax',
		links: [
			'https://www.basemax.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'base-max-finance',
				},
			},
		],
	},
	{
		name: 'Base Name Service',
		slug: 'base-name-service',
		links: [
			'https://www.basename.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'base-name-service-app',
				},
			},
		],
	},
	{
		name: 'Base Paint',
		slug: 'base-paint',
		links: [
			'https://basepaint.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'base-paint',
				},
			},
		],
	},
	{
		name: 'BASE PUNK',
		slug: 'base-punk',
		links: [
			'https://basepunk.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'base-punk',
				},
			},
		],
	},
	{
		name: 'Basewords',
		slug: 'base-words',
		links: [
			'https://www.basewords.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'base-words',
				},
			},
		],
	},
	{
		name: 'Based Bits',
		slug: 'basedbits',
		links: [
			'https://www.basedbits.fun',
		],
		views: [
			{
				providers: {
					zapper: 'basedbits',
				},
			},
		],
	},
	{
		name: 'BasedFarm',
		slug: 'based-farm',
		links: [
			'https://based.farm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'based-farm',
				},
			},
		],
	},
	{
		name: 'Based Markets',
		slug: 'based-markets',
		links: [
			'https://www.based.markets',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					zapper: ' basedmarkets',
					llamafolio: 'basedmarkets',
				},
			},
		],
	},
	{
		name: 'Based Money',
		slug: 'based-money',
		links: [
			'https://based.money',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12115/thumb/Based.png?1597261198',
						chainId: 1,
						address: '0x68a118ef45063051eac49c7e647ce5ace48a68a5',
						name: 'Based Money',
						symbol: 'BASED',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'based-money',
				},
			},
		],
	},
	{
		name: 'Based Money Finance',
		slug: 'based-money-finance',
		links: [
			'https://www.basedmoney.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'based-money-finance',
				},
			},
		],
	},
	{
		name: 'Based Rate',
		slug: 'based-rate',
		links: [
			'https://basedrate.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Based-Rate',
				},
			},
		],
	},
	{
		name: 'Basenames',
		slug: 'basenames',
		links: [
			'https://www.base.org/names',
		],
		views: [
			{
				providers: {
					zapper: 'basenames',
				},
			},
		],
	},
	{
		name: 'BaseSwap',
		slug: 'baseswap',
		links: [
			'https://baseswap.fi',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'baseswap',
					zapper: 'baseswap',
				},
			},
		],
	},
	{
		name: 'BaseYield',
		slug: 'baseyield',
		links: [
			'https://app.baseyield.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'baseyield',
				},
			},
		],
	},
	{
		name: 'Basin DAO',
		slug: 'basin-dao',
		links: [
			'https://www.basinfinance.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'basin-dao',
				},
			},
		],
	},
	{
		name: 'Basis',
		slug: 'basis',
		links: [
			'https://basis.io',
		],
		views: [
			{
				name: 'Basis Cash',
				slug: 'cash',
				links: [
					'https://basis.cash',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/8631/thumb/l.NkwdggrR1hkSqghZ.png?1559791553',
						chainId: 1,
						address: '0x7dc59729b0adf4ae34721a1e06ef82a19e690b04',
						name: 'BTC Alpha Token',
						symbol: 'BAC',
						decimals: 8,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13251/thumb/BAS.png?1613231139',
						chainId: 1,
						address: '0x106538cc16f938776c7c180186975bca23875287',
						name: 'Basis Share',
						symbol: 'BAS',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13961/thumb/bab_1.png?1613358492',
						chainId: 1,
						address: '0xc36824905dff2eaaee7ecc09fcc63abc0af5abc5',
						name: 'Basis Bond',
						symbol: 'BAB',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'basis-cash',
				},
			},
			// {
			// 	name: 'Basis Dollar',
			// 	slug: 'dollar',
			// 	links: [
			// 	'https://basisdollar.fi',
			// ],
			// 	chainId: 1,
			// 	erc20Tokens: [
			// 		erc20TokensBySymbol['BSD'],
			// 		erc20TokensBySymbol['BSDS'],
			// 	],
			// },
			{
				name: 'Basis Gold',
				slug: 'gold',
				links: [
					'https://basis.gold',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13663/thumb/pErVlwLE_400x400.png?1610601302',
						chainId: 1,
						address: '0xb34ab2f65c6e4f764ffe740ab83f982021faed6d',
						name: 'Basis Gold',
						symbol: 'BSG',
						decimals: 18,
					},
					erc20TokensBySymbol['BSGS'],
				],
				providers: {
					zapper: 'basis-gold',
				},
			},
			{
				name: 'Basis Coin',
				slug: 'coin',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13530/thumb/Basiscoin_Share.png?1609406623',
						chainId: 1,
						address: '0x03066da434e5264ef0b32f787923f974a5726fdc',
						name: 'Basis Coin Share',
						symbol: 'BCS',
						decimals: 18,
					},
					erc20TokensBySymbol['BSGS'],
				],
			},
			{
				name: 'Basis Bond',
				slug: 'bond',
				chainId: 1,
				erc20Tokens: [
					// erc20TokensBySymbol['BSB'],
				],
			},
		],
	},
	{
		name: 'BasketDAO',
		slug: 'basket',
		links: [
			'https://basketdao.org',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14766/thumb/BasketCoin_logo_light-250x250_wbg.png?1618306694',
						chainId: 1,
						address: '0xc03841b5135600312707d39eb2af0d2ad5d51a91',
						name: 'BasketCoin',
						symbol: 'BSKT',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14664/thumb/BDI_200.png?1621851285',
						chainId: 1,
						address: '0x0309c98b1bffa350bcb3f9fb9780970ca32a5060',
						name: 'BasketDAO DeFi Inde',
						symbol: 'BDI',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'basket-dao',
				},
			},
		],
	},
	{
		name: 'Baso Finance',
		slug: 'baso-finance',
		links: [
			'https://www.baso.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Baso-Finance',
				},
			},
		],
	},
	{
		name: 'Bass Exchange',
		slug: 'bass-exchange',
		links: [
			'https://www.bass.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Bass-Exchange',
				},
			},
		],
	},
	{
		name: 'Bastion',
		slug: 'bastion-protocol',
		links: [
			'https://bastionprotocol.com',
		],
		views: [
			{
				chainId: 1313161554,
				providers: {
					zapper: 'bastion-protocol',
				},
			},
		],
	},
	{
		name: 'BattleFly',
		slug: 'battlefly',
		links: [
			'https://play.battlefly.game',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'battlefly',
				},
			},
		],
	},
	{
		name: 'Battleground',
		slug: 'battleground',
		links: [
			'https://www.battleth.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'battleground',
				},
			},
		],
	},
	{
		name: 'Bazed Games',
		slug: 'bazed-games',
		links: [
			'https://bazed.bet',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bazed-games',
				},
			},
		],
	},
	{
		name: 'BeagleSwap',
		slug: 'beagle-swap',
		links: [
			'https://beagleswap.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'beagle-swap',
				},
			},
		],
	},
	{
		name: 'Beam',
		slug: 'beam',
		links: [
			'https://www.onbeam.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Beam',
				},
			},
		],
	},
	{
		name: 'Beanstalk',
		slug: 'beanstalk',
		links: [
			'https://bean.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'beanstalk',
				},
			},
		],
	},
	{
		name: 'Bebop',
		slug: 'bebop',
		links: [
			'https://bebop.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bebop',
				},
			},
		],
	},
	{
		name: 'Bedrock',
		slug: 'bedrock',
		links: [
			'https://www.bedrock.technology',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bedrock',
				},
			},
			{
				name: 'Bedrock uniETH',
				slug: 'bedrock-unieth',
				links: [
					'https://bedrock.rockx.com/unieth',
				],
				chainId: 1,
				providers: {
					llamafolio: 'bedrock-unieth',
				},
			},
		],
	},
	{
		name: 'Beefy Finance',
		slug: 'beefy',
		links: [
			'https://beefy.com',
			'https://www.beefy.finance',
			'https://app.beefy.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 128,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'beefy',
					zapper: 'beefy',
				},
			},
		],
	},
	{
		name: 'BeerMe',
		slug: 'beerme',
		links: [
			'https://beerme.world',
		],
		views: [
			{
				providers: {
					zapper: 'beerme',
				},
			},
		],
	},
	{
		name: 'Beethoven X',
		slug: 'beethoven-x',
		links: [
			'https://beets.fi',
			'https://app.beets.fi',
		],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e',
					},
				],
				providers: {
					llamafolio: 'beethoven-x',
					zapper: 'beethoven-x',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'beethoven-x',
					zapper: 'beethoven-x',
				},
			},
		],
	},
	{
		name: 'Bella',
		slug: 'bella',
		links: [
			'https://bella.fi',
			'https://fs.bella.fi',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12478/thumb/Bella.png?1602230054',
						chainId: 1,
						address: '0xa91ac63d040deb1b7a5e4d4134ad23eb0ba07e14',
						name: 'Bella Protocol',
						symbol: 'BEL',
						decimals: 18,
					},
				],
				providers: {
					llamafolio:'bella-protocol',
					zapper: 'bella',
				},
			},
		],
	},
	{
		name: 'Belt',
		slug: 'belt',
		links: [
			'https://belt.fi',
		],
		views: [
			{
				slug: 'bsc',
				chainId: 56,
				providers: {
					llamafolio: 'belt-finance',
					zapper: 'belt',
				},
			},
			{
				slug: 'heco',
				chainId: 128,
				providers: {
					zapper: 'belt',
				},
			},
		],
	},
	{
		name: 'Benchmark',
		slug: 'benchmark',
		links: [
			'https://benchmarkprotocol.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13212/thumb/benchmark_protocol.jpg?1606267583',
						chainId: 1,
						address: '0x67c597624b17b16fb77959217360b7cd18284253',
						name: 'Benchmark Protocol',
						symbol: 'MARK',
						decimals: 9,
					},
				],
				providers: {
					zapper: 'benchmark',
				},
			},
		],
	},
	{
		name: 'BendDAO',
		slug: 'bend-dao',
		links: [
			'https://www.benddao.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'benddao',
					zapper: 'bend-dao',
				},
			},
		],
	},
	{
		name: 'Benji Bananas',
		slug: 'benji-bananas',
		links: [
			'https://benjibananas.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'benji-bananas',
				},
			},
		],
	},
	{
		name: 'Benqi',
		slug: 'benqi',
		links: [
			'https://benqi.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'benqi',
				},
			},
			{
				name: 'Benqi Lending',
				slug: 'lending',
				chainId: 43114,
				providers: {
					llamafolio: 'benqi-lending',
					zapper: 'benqi',
				},
			},
			{
				name: 'Benqi Staked Avax',
				slug: 'staked-avax',
				links: [
					'https://staking.benqi.fi',
				],
				chainId: 43114,
				providers: {
					llamafolio: 'benqi-staked-avax',
				},
			},
		],
	},
	{
		name: 'Bent',
		slug: 'bent',
		links: [
			'https://bentfinance.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x01597e397605bf280674bf292623460b4204c375',
					},
				],
				providers: {
					zapper: 'bent',
				},
			},
		],
	},
	{
		name: 'Beraplug',
		slug: 'beraplug',
		links: [
			'https://www.plug.sucks',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'beraplug',
				},
			},
		],
	},
	{
		name: 'Berezka',
		slug: 'berezka',
		links: [
			'https://www.berezka.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zerionDefiSDK: [
						'Berezka',
					],
				},
			},
		],
	},
	{
		name: 'BetSwirl',
		slug: 'bet-swirl',
		links: [
			'https://www.betswirl.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bet-swirl',
				},
			},
		],
	},
	{
		name: 'Betsy The Bot',
		slug: 'betsy-the-bot',
		links: [
			'https://betsythebot.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'betsy-the-bot',
				},
			},
		],
	},
	{
		name: 'Bibliotheca DAO',
		slug: 'bibliotheca-dao',
		links: [
			'https://bibliothecadao.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bibliotheca',
				},
			},
		],
	},
	{
		name: 'Biconomy',
		slug: 'biconomy',
		links: [
			'https://www.biconomy.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'biconomy',
				},
			},
		],
	},
	{
		name: 'Bifrost',
		slug: 'bifrost',
		links: [
			'https://bifrost.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'bifrost-liquid-staking',
				},
			},
		],
	},
	{
		name: 'Big Data Protocol',
		slug: 'big-data',
		links: [
			'https://bigdataprotocol.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14222/thumb/logo_BDP_200.png?1615088501',
						chainId: 1,
						address: '0xf3dcbc6d72a4e1892f7917b7c43b74131df8480e',
						name: 'Big Data Protocol',
						symbol: 'BDP',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'big-data-protocol',
					zapper: 'big-data',
				},
			},
		],
	},
	{
		name: 'Big Time',
		slug: 'big-time',
		links: [
			'https://bigtime.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'big-time',
				},
			},
		],
	},
	{
		name: 'Binance Staked ETH',
		slug: 'binance-staked-eth',
		links: [
			'https://www.binance.com/en/wbeth',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'binance-staked-eth',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'binance-staked-eth',
				},
			},
		],
	},
	{
		name: 'Binary Markets',
		slug: 'binary-markets',
		links: [
			'https://binarymarkets.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Binary-markets',
				},
			},
		],
	},
	{
		name: 'Binaryx Platform',
		slug: 'binaryx-platform',
		links: [
			'https://www.binaryx.com',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'binaryx-platform',
				},
			},
		],
	},
	{
		name: 'Biswap',
		slug: 'biswap',
		links: [
			'https://biswap.org',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'biswap',
					zapper: 'biswap',
				},
			},
		],
	},
	{
		name: 'Bitcoin Minetrix',
		slug: 'bitcoin-minetrix',
		links: [
			'https://bitcoinminetrix.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bitcoinminetrix',
				},
			},
		],
	},
	{
		name: 'Bitget Wallet',
		slug: 'bitget-wallet',
		links: [
			'https://web3.bitget.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Bitget-Wallet',
				},
			},
		],
	},
	{
		name: 'BitGo',
		slug: 'bitgo',
		links: [
			'https://www.bitgo.com',
		],
		colors: [
			'#62abf4',
		], // unofficial
		views: [
			{
				name: 'Wrapped Bitcoin',
				slug: 'wbtc',
				links: [
					'https://wbtc.network',
				],
				colors: [
					'#f7931a',
				], // unofficial
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744',
						chainId: 1,
						address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
						name: 'Wrapped Bitcoin',
						symbol: 'WBTC',
						decimals: 8,
					},
				],
				providers: {
					zapper: 'bitgo',
				},
			},
		],
	},
	{
		name: 'BitPay',
		slug: 'bitpay',
		links: [
			'https://bitpay.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bitpay',
				},
			},
		],
	},
	{
		name: 'Bitrock',
		slug: 'bitrock',
		links: [
			'https://bit-rock.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bitrock',
				},
			},
		],
	},
	{
		name: 'Bitstamp',
		slug: 'bitstamp',
		links: [
			'https://www.bitstamp.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bitstamp',
				},
			},
		],
	},
	{
		name: 'BitTorrent Chain',
		slug: 'bittorrent-chain',
		links: [
			'https://bttc.bittorrent.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bittorrent',
				},
			},
		],
	},
	{
		name: 'Black Station',
		slug: 'black-station',
		links: [
			'https://blackstation.puma.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'black-station-puma',
				},
			},
		],
	},
	{
		name: 'Blackwing',
		slug: 'black-wing',
		links: [
			'https://blackwing.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'black-wing',
				},
			},
		],
	},
	{
		name: 'Blackrock Fund',
		slug: 'blackrock-fund',
		links: [
			'https://www.blackrockfund.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'blackrockfund',
				},
			},
		],
	},
	{
		name: 'BladeSwap',
		slug: 'bladeswap',
		links: [
			'https://bladeswap.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bladeswap',
				},
			},
		],
	},
	{
		name: 'Blast',
		slug: 'blast',
		icon: BlastIcon,
		colors: [
			'#fcfc03',
		],
		links: [
			'https://blast.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'blast',
				},
			},
			{
				name: 'Blast Bridge',
				slug: 'blast',
				chainId: 1,
				providers: {
					zapper: 'blast',
				},
			},
		],
	},
	{
		name: 'BlastDEX',
		slug: 'blast-dex',
		links: [
			'https://blastdex.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blast-dex',
				},
			},
		],
	},
	{
		name: 'Blast Runners',
		slug: 'blast-runners',
		links: [
			'https://blastrunners.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blast_runners',
				},
			},
		],
	},
	{
		name: 'Blast Swap',
		slug: 'blast-swap',
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blast-swap',
				},
			},
		],
	},
	{
		name: 'Blasterswap',
		slug: 'blasterswap',
		links: [
			'https://blasterswap.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blasterswap',
				},
			},
		],
	},
	{
		name: 'BlastGoo',
		slug: 'blastgoo',
		links: [
			'https://blastgoo.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blastgoo',
				},
			},
		],
	},
	{
		name: 'BlastNYAN',
		slug: 'blastnyan',
		links: [
			'https://blastnyan.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blastnyan',
				},
			},
		],
	},
	{
		name: 'Blastr',
		slug: 'blastr',
		links: [
			'https://blastr.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blastr',
				},
			},
		],
	},
	{
		name: 'Block Tools',
		slug: 'block-tools',
		links: [
			'https://www.blocktools.org/magic',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Block-Tools',
				},
			},
		],
	},
	{
		name: 'Bloom',
		slug: 'bloom',
		links: [
			'https://bloom.garden',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'bloom',
				},
			},
		],
	},
	{
		name: 'Bloom',
		slug: 'bloom',
		links: [
			'https://x.com/BloomOnBlast',
		],
		views: [
			{
				providers: {
					zapper: 'bloom',
				},
			},
		],
	},
	{
		name: 'Blueberry',
		slug: 'blueberry',
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blueberry',
				},
			},
		],
	},
	{
		name: 'Blueberry Protocol',
		slug: 'blueberry-protocol',
		links: [
			'https://app.blueberry.garden',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'blueberry-protocol',
				},
			},
			{
				name: 'Blueberry Lend',
				slug: 'blueberry-lend',
				links: [
					'https://app.blueberry.garden/lend',
				],
				chainId: 1,
				providers: {
					llamafolio: 'blueberry-lend',
				},
			},
		],
	},
	{
		name: 'BlueBit Finance',
		slug: 'bluebit',
		links: [
			'https://bluebit.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bluebit',
				},
			},
		],
	},
	{
		name: 'Blueprint',
		slug: 'blueprint',
		links: [
			'https://blueprint.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'blueprint',
				},
			},
		],
	},
	{
		name: 'Blur',
		slug: 'blur',
		links: [
			'https://blur.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'blur',
					zapper: 'blur',
				},
			},
			{
				name: 'Blur Lend',
				slug: 'lend',
				links: [
					'https://blur.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'blur-lend',
				},
			},
		],
	},
	{
		name: 'BNB Chain',
		slug: 'bnb-chain',
		views: [
			{
				name: 'BNB Chain Staking',
				slug: 'staking',
				links: [
					'https://www.bnbchain.org/en/bnb-staking',
				],
				chainId: undefined,
				providers: {
					zapper: 'bnb-chain-staking',
				},
			},
		],
	},
	{
		name: '.bns Name Service',
		slug: 'bns-name-service',
		links: [
			'https://basename.domains',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'base-name-service',
				},
			},
		],
	},
	{
		name: 'BOB Fusion',
		slug: 'bob-fusion',
		links: [
			'https://gobob.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'bob-fusion',
					zapper: 'bob_fusion',
				},
			},
		],
	},
	{
		name: 'Bonfire',
		slug: 'bonfire',
		links: [
			'https://linktr.ee/bonfireth',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bonfire',
				},
			},
		],
	},
	{
		name: 'Bonkler',
		slug: 'bonkler',
		links: [
			'https://bonkler.remilia.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bonkler',
				},
			},
		],
	},
	{
		name: 'Boost',
		slug: 'boost',
		links: [
			'https://boost.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'boost',
				},
			},
		],
	},
	{
		name: 'Boring DAO',
		slug: 'boring',
		links: [
			'https://www.boringdao.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/16429/thumb/Tjq3pXEH_400x400.jpg?1623997009',
						chainId: 1,
						address: '0xbc19712feb3a26080ebf6f2f7849b417fdd792ca',
						name: 'BoringDAO',
						symbol: 'BORING',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13525/thumb/gWzm2dr.png?1609390713',
						chainId: 1,
						address: '0x8064d9ae6cdf087b1bcd5bdf3531bd5d8c537a68',
						name: 'BoringDAO BTC',
						symbol: 'OBTC',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12917/thumb/bor_logo.png?1603607502',
						chainId: 1,
						address: '0x3c9d6c1c73b31c837832c72e04d3152f051fc1a9',
						name: 'BoringDAO	OLD ',
						symbol: 'BOR',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'boring-dao',
				},
			},
		],
	},
	{
		name: 'Boring Security',
		slug: 'boring-security',
		links: [
			'https://boringsecurity.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'boring-security',
				},
			},
		],
	},
	{
		name: 'Botto',
		slug: 'botto',
		links: [
			'https://botto.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'botto',
				},
			},
		],
	},
	{
		name: 'BounceBit',
		slug: 'bounce-bit',
		links: [
			'https://bouncebit.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bounce-bit',
				},
			},
		],
	},
	{
		name: 'B.Protocol',
		slug: 'b-protocol',
		links: [
			'https://www.bprotocol.org',
			'https://app.bprotocol.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'b.protocol',
					zapper: 'b-protocol',
				},
			},
		],
	},
	{
		name: 'Bracket Game',
		slug: 'bracket-game',
		links: [
			'https://bracket.game',
		],
		views: [
			{
				providers: {
					zapper: 'bracket-game',
				},
			},
		],
	},
	{
		name: 'Brahma',
		slug: 'brahma',
		links: [
			'https://www.brahma.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'brahma',
				},
			},
		],
	},
	{
		name: 'Brawler Bearz',
		slug: 'brawler-bearz',
		links: [
			'https://www.brawlerbearz.club',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'brawler-bearz',
				},
			},
		],
	},
	{
		name: 'BrewSwap',
		slug: 'brew-swap',
		links: [
			'https://earn.brewlabs.info',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'brew-swap',
				},
			},
		],
	},
	{
		name: 'Bridgeworld',
		slug: 'bridgeworld',
		links: [
			'https://bridgeworld.treasure.lol',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bridgeworld',
				},
			},
		],
	},
	{
		name: 'Bright Moments',
		slug: 'bright-moments',
		links: [
			'https://www.brightmoments.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Bright-Moments',
				},
			},
		],
	},
	{
		name: 'Brrito',
		slug: 'brrito',
		links: [
			'https://www.brrito.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'brrito',
				},
			},
			{
				name: 'J.Page',
				slug: 'j-page',
				links: [
					'https://j.page',
				],
				chainId: 1,
				providers: {
					zapper: 'j-page',
				},
			},
		],
	},
	{
		name: 'BSCSwap',
		slug: 'bscswap',
		links: [
			'https://bscswap.finance',
		],
		views: [
			{
				providers: {
					zapper: 'bscswap',
				},
			},
		],
	},
	{
		name: 'BSX',
		slug: 'bsx',
		links: [
			'https://www.bsx.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bsx',
				},
			},
		],
	},
	{
		name: 'BTC20',
		slug: 'btc-twenty',
		links: [
			'https://btc20.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'btc-twenty',
				},
			},
		],
	},
	{
		name: 'BTCETF',
		slug: 'btcetf',
		links: [
			'https://btcetftoken.io/en',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'btcetf',
				},
			},
		],
	},
	{
		name: 'Buffer Finance',
		slug: 'buffer-finance',
		links: [
			'https://buffer.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Buffer-Finance',
				},
			},
		],
	},
	{
		name: 'builder.fi',
		slug: 'builder-fi',
		links: [
			'https://www.builder.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'builder-fi',
				},
			},
		],
	},
	{
		name: 'Build',
		slug: 'buildtop',
		links: [
			'https://build.top',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'buildtop',
				},
			},
		],
	},
	{
		name: 'BulbaSwap',
		slug: 'bulba-swap',
		links: [
			'https://bulbaswap.io',
		],
		views: [
			{
				providers: {
					zapper: 'bulba-swap',
				},
			},
		],
	},
	{
		name: 'Bullet Game',
		slug: 'bullet-game',
		links: [
			'https://bulletgame.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'bullet-game',
				},
			},
		],
	},
	{
		name: 'Bullishs',
		slug: 'bullishs',
		links: [
			'https://t.me/BullishsBot',
		],
		views: [
			{
				providers: {
					zapper: 'bullishs',
				},
			},
		],
	},
	{
		name: 'Bulls & Apes Project',
		slug: 'bulls-and-apes',
		links: [
			'https://www.bullsandapesproject.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Bulls-and-Apes-Project',
				},
			},
		],
	},
	{
		name: 'Bulls On The Block',
		slug: 'bulls-on-the-block',
		links: [
			'https://bullsontheblock.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Bulls-on-the-block',
				},
			},
		],
	},
	{
		name: 'Bungee',
		slug: 'bungee',
		links: [
			'https://www.bungee.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Bungee',
				},
			},
		],
	},
	{
		name: 'Bunni',
		slug: 'bunni',
		links: [
			'https://bunni.pro',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'bunni',
					zapper: 'bunni',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'bunni',
					zapper: 'bunni',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'bunni',
					zapper: 'bunni',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'bunni',
					zapper: 'bunni',
				},
			},
		],
	},
	{
		name: 'bZx Protocol',
		slug: 'bzx',
		links: [
			'https://bzx.network',
		],
		colors: [
			'#33dfcc',
			'#003cda',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11811/thumb/bzrx.png?1594563172',
						chainId: 1,
						address: '0x56d811088235f11c8920698a204a5010a788f4b3',
						name: 'bZx Protocol',
						symbol: 'BZRX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'bzx',
					zerionDefiSDK: [
						'bZx',
						'bZx bZx',
						'bZx • Staking',
						'bZx • Vested Staking',
					],
				},
			},
		],
	},
	{
		name: 'CafeSwap',
		slug: 'cafeswap',
		links: [
			'https://x.com/CafeSwapFinance',
		],
		views: [
			{
				providers: {
					zapper: 'cafeswap',
				},
			},
		],
	},
	{
		name: 'Cambria',
		slug: 'cambria',
		links: [
			'https://arena.cambria.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cambria',
				},
			},
		],
	},
	{
		name: 'Camelot',
		slug: 'camelot',
		links: [
			'https://camelot.exchange',
		],
		views: [
			{
				name: 'Camelot V3',
				slug: 'v3',
				links: [
					'https://app.camelot.exchange',
				],
				chainId: undefined,
				providers: {
					zapper: 'camelot-v3',
				},
			},
			{
				name: 'Camelot V1',
				slug: 'v1',
				chainId: undefined,
				providers: {
					zapper: 'camelot',
				},
			},
		],
	},
	{
		name: 'Canary',
		slug: 'canary',
		links: [
			'https://canary.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'canary',
				},
			},
		],
	},
	{
		name: 'CAP',
		slug: 'cap-finance',
		links: [
			'https://www.cap.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'cap-finance',
					zapper: 'cap',
				},
			},
		],
	},
	{
		name: 'CAR',
		slug: 'car',
		links: [
			'https://1.car',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'CAR',
				},
			},
		],
	},
	{
		name: 'Carbon',
		slug: 'carbon-defi',
		links: [
			'https://app.carbondefi.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'carbon-defi',
				},
			},
		],
	},
	{
		name: 'Carol Protocol',
		slug: 'carol-protocol',
		links: [
			'https://carol.finance/bonding',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Carol-Protocol',
				},
			},
		],
	},
	{
		name: 'DigiCask',
		slug: 'cask-protocol',
		links: [
			'https://www.digicask.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cask-protocol',
				},
			},
		],
	},
	{
		name: 'Cat in a Box',
		slug: 'cat-in-a-box',
		links: [
			'https://catinabox.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'cat-in-a-box',
					zapper: 'cat-in-a-box-finance',
				},
			},
		],
	},
	{
		name: 'Cat Town',
		slug: 'cat-town',
		links: [
			'https://cat.town',
		],
		views: [
			{
				providers: {
					zapper: 'cat-town',
				},
			},
		],
	},
	{
		name: 'Caviar',
		slug: 'caviar',
		links: [
			'https://www.caviar.sh',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'caviar',
				},
			},
		],
	},
	{
		name: 'cega',
		slug: 'cega',
		links: [
			'https://app.cega.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'cega',
					zapper: 'cega',
				},
			},
		],
	},
	{
		name: 'Celer',
		slug: 'celer',
		links: [
			'https://celer.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'celer',
				},
			},
		],
	},
	{
		name: 'Centaurify',
		slug: 'centaurify',
		links: [
			'https://www.centaurify.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'centaurify',
				},
			},
		],
	},
	{
		name: 'Centrifuge',
		slug: 'centrifuge',
		links: [
			'https://tinlake.centrifuge.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'centrifuge',
				},
			},
		],
	},
	{
		name: 'Ceramic',
		slug: 'ceramic',
		links: [
			'https://ceramic.network',
		],
		colors: [
			'#FF3600',
			'#FFB08A',
		],
		icon: CeramicIcon,
		views: [
			{
				chainId: 1,
				components: [
					CeramicPage,
				],
			},
		],
	},
	{
		name: 'Chai',
		slug: 'chai',
		links: [
			'https://chai.money',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/10147/thumb/CHAI.png?1576467289',
						chainId: 1,
						address: '0x06af07097c9eeb7fd685c692751d5c66db49c215',
						name: 'Chai',
						symbol: 'CHAI',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'Chai',
					],
					zapper: 'chai-money',
				},
			},
		],
	},
	{
		name: 'Chainchat',
		slug: 'chain-chat',
		links: [
			'https://zapper.xyz/chat',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chain-chat',
				},
			},
		],
	},
	{
		name: 'Chain Games',
		slug: 'chain-games',
		links: [
			'https://chaingames.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chain-games',
				},
			},
		],
	},
	{
		name: 'Chainlink',
		slug: 'chainlink',
		links: [
			'https://chain.link',
		],
		colors: [
			'#375bd2',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700',
						chainId: 1,
						address: '0x514910771af9ca656af840dff83e8264ecf986ca',
						name: 'Chainlink',
						symbol: 'LINK',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'chainlink',
					zapper: 'chainlink',
				},
			},
		],
	},
	{
		name: 'Chainrunners',
		slug: 'chainrunners',
		links: [
			'https://www.chainrunners.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chainrunners',
				},
			},
		],
	},
	{
		name: 'ChainX',
		slug: 'chainx',
		links: [
			'https://chainx.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ChainX',
				},
			},
		],
	},
	{
		name: 'Channels Finance',
		slug: 'channels-finance',
		links: [
			'https://channels.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'channels-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'channels-finance',
				},
			},
		],
	},
	{
		name: 'Charm Finance',
		slug: 'charm-finance',
		links: [
			'https://www.charm.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'charm-finance',
				},
			},
		],
	},
	{
		name: 'Chimpers',
		slug: 'chimpers',
		links: [
			'https://dojo.chimpers.xyz/outside',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chimpers',
				},
			},
		],
	},
	{
		name: 'Chimpzee',
		slug: 'chimpzee',
		links: [
			'https://chimpzee.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chimpzee',
				},
			},
		],
	},
	{
		name: 'Chromia',
		slug: 'chromia',
		links: [
			'https://chromia.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chromia',
				},
			},
		],
	},
	{
		name: 'Chronos',
		slug: 'chronos',
		links: [
			'https://app.chronos.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'chronos',
				},
			},
		],
	},
	{
		name: 'Cigarette Token',
		slug: 'cigarette-token',
		links: [
			'https://cigtoken.eth.limo',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cig-token-eth',
				},
			},
		],
	},
	{
		name: 'Cipher',
		slug: 'cipher-fan',
		links: [
			'https://cipher.fan',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cipher-fan',
				},
			},
		],
	},
	{
		name: 'The Circle',
		slug: 'circle-on-shape',
		links: [
			'https://www.circleonshape.network',
		],
		views: [
			{
				providers: {
					zapper: 'circle-on-shape',
				},
			},
		],
	},
	{
		name: 'Circle',
		slug: 'circle',
		links: [
			'https://www.circle.com/en/usdc',
			'https://www.centre.io/usdc',
		],
		colors: [
			'#4ee498',
			'#68d7fa',
			'#5fbfff',
			'#b090f5',
		],
		views: [
			{
				name: 'USDC',
				slug: 'usdc',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
						chainId: 1,
						address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
						name: 'USD Coin',
						symbol: 'USDC',
						decimals: 6,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/centrehq/usdc',
					zapper: 'circle',
				},
			},
		],
	},
	{
		name: 'CitaDAO',
		slug: 'citadao',
		links: [
			'https://citadao.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'citadao',
				},
			},
		],
	},
	{
		name: 'Citadel',
		slug: 'citadel',
		links: [
			'https://www.citadelswap.xyz',
			'https://app.citadelswap.xyz',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'citadelswap',
					zapper: 'citadel',
				},
			},
		],
	},
	{
		name: 'Clankers',
		slug: 'clankers',
		links: [
			'https://www.clanker.world/clanker',
		],
		views: [
			{
				providers: {
					zapper: 'clankers',
				},
			},
		],
	},
	{
		name: 'ClashMon:Ignition',
		slug: 'clashmon-ignition',
		links: [
			'https://clashmon.iskra.world/en',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ClashMon-Ignition',
				},
			},
		],
	},
	{
		name: 'Clearpool',
		slug: 'clearpool',
		links: [
			'https://clearpool.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'clearpool',
					zapper: 'clearpool',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'clearpool',
					zapper: 'clearpool',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'clearpool',
					zapper: 'clearpool',
				},
			},
		],
	},
	{
		name: 'CLever',
		slug: 'clever',
		links: [
			'https://clever.aladdin.club',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'clever',
					zapper: 'clever',
				},
			},
		],
	},
	{
		name: 'Clipper',
		slug: 'clipper',
		links: [
			'https://clipper.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'clipper',
				},
			},
		],
	},
	{
		name: 'Clique',
		slug: 'clique',
		links: [
			'https://www.clique.social',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'clique',
				},
			},
		],
	},
	{
		name: 'Clone Force',
		slug: 'clone-force',
		links: [
			'https://cloneforce.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'clone-force',
				},
			},
		],
	},
	{
		name: 'Clusters',
		slug: 'clusters',
		links: [
			'https://clusters.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'clusters',
				},
			},
		],
	},
	{
		name: 'Cog Finance',
		slug: 'cog-finance',
		links: [
			'https://www.cog.finance',
		],
		views: [
			{
				providers: {
					zapper: 'cog-finance',
				},
			},
		],
	},
	{
		name: 'Coin Tool',
		slug: 'coin-tool',
		links: [
			'https://cointool.app/dashboard',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coin-tool',
				},
			},
		],
	},
	{
		name: 'Coin98',
		slug: 'coin98',
		links: [
			'https://coin98.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coin98',
				},
			},
		],
	},
	{
		name: 'Coinbase',
		slug: 'coinbase',
		links: [
			'https://www.coinbase.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coinbase',
				},
			},
			{
				name: 'Coinbase Commerce',
				slug: 'commerce',
				links: [
					'https://www.coinbase.com/commerce',
				],
				chainId: undefined,
				providers: {
					zapper: 'coinbase-commerce',
				},
			},
			{
				name: 'Coinbase Wrapped Staked ETH',
				slug: 'wrapped-staked-eth',
				links: [
					'https://www.coinbase.com/price/coinbase-wrapped-staked-eth',
				],
				chainId: 42161,
				providers: {
					llamafolio: 'coinbase-wrapped-staked-eth',
				},
			},
			{
				name: 'Coinbase Wrapped Staked ETH',
				slug: 'wrapped-staked-eth',
				links: [
					'https://www.coinbase.com/price/coinbase-wrapped-staked-eth',
				],
				chainId: 137,
				providers: {
					llamafolio: 'coinbase-wrapped-staked-eth',
				},
			},
			{
				name: 'Coinbase Wrapped Staked ETH',
				slug: 'wrapped-staked-eth',
				links: [
					'https://www.coinbase.com/price/coinbase-wrapped-staked-eth',
				],
				chainId: 1,
				providers: {
					llamafolio: 'coinbase-wrapped-staked-eth',
				},
			},
			{
				name: 'Coinbase Wrapped Staked ETH',
				slug: 'wrapped-staked-eth',
				links: [
					'https://www.coinbase.com/price/coinbase-wrapped-staked-eth',
				],
				chainId: 10,
				providers: {
					llamafolio: 'coinbase-wrapped-staked-eth',
				},
			},
			{
				name: 'Coinbase Wrapped Staked ETH',
				slug: 'wrapped-staked-eth',
				links: [
					'https://www.coinbase.com/price/coinbase-wrapped-staked-eth',
				],
				chainId: 8453,
				providers: {
					llamafolio: 'coinbase-wrapped-staked-eth',
				},
			},
		],
	},
	{
		name: 'Coinbase Wallet',
		slug: 'coinbase-wallet',
		links: [
			'https://www.coinbase.com/wallet',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coinbasewallet',
				},
			},
		],
	},
	{
		name: 'Coinwind',
		slug: 'coinwind',
		links: [
			'https://www.coinwind.pro',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'coinwind',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'coinwind',
				},
			},
		],
	},
	{
		name: 'Colony',
		slug: 'colony',
		links: [
			'https://www.colonylab.io',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'colony',
				},
			},
		],
	},
	{
		name: 'Cometh',
		slug: 'cometh',
		links: [
			'https://www.cometh.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zerionDefiSDK: [
						'Cometh • Staking',
						'Cometh • Tube',
					],
				},
			},
			{
				name: 'Comethswap',
				slug: 'comethswap',
				links: [
					'https://swap.cometh.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'comethswap',
				},
			},
		],
	},
	{
		// https://compound.finance/docs#networks
		name: 'Compound',
		slug: 'compound',
		links: [
			'https://compound.finance',
		],
		colors: [
			'#01d395',
		],
		views: [
			{
				name: 'Compound Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/10775/thumb/COMP.png?1592625425',
						chainId: 1,
						address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
						name: 'Compound',
						symbol: 'COMP',
						decimals: 18,
					},
				],
				contracts: [
					{
						name: 'Comptroller',
						address: '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b',
					},
					{
						name: 'Governance',
						address: '0xc0da02939e1441f497fd74f78ce7decb17b66529',
					},
					{
						name: 'Timelock',
						address: '0x6d903f6003cca6255d85cca4d3b5e5146dc33925',
					},
				],
				providers: {
					zerionDefiSDK: [
						'Compound Governance',
					],
				},
			},
			{
				name: 'Compound III',
				slug: 'v3',
				links: [
					'https://v3-app.compound.finance',
				],
				chainId: 42161,
				providers: {
					llamafolio: 'compound-v3',
					zapper: 'compound-v3',
				},
			},
			{
				name: 'Compound III',
				slug: 'v3',
				links: [
					'https://v3-app.compound.finance',
				],
				chainId: 137,
				providers: {
					llamafolio: 'compound-v3',
					zapper: 'compound-v3',
				},
			},
			{
				name: 'Compound III',
				slug: 'v3',
				links: [
					'https://v3-app.compound.finance',
				],
				chainId: 1,
				providers: {
					llamafolio: 'compound-v3',
					zapper: 'compound-v3',
				},
			},
			{
				name: 'Compound V3',
				slug: 'v3',
				links: [
					'https://v3-app.compound.finance',
				],
				chainId: 8453,
				providers: {
					llamafolio: 'compound-v3',
					zapper: 'compound-v3',
				},
			},
			{
				name: 'Compound V2',
				slug: 'v2',
				colors: [
					'#27D3A2',
					'#9388FD',
				],
				chainId: 1,
				erc20Tokens: [
					erc20TokensBySymbol['cCOMP'],
					erc20TokensBySymbol['cUSDC'],
					erc20TokensBySymbol['cUSDT'],
					erc20TokensBySymbol['cDAI'],
					erc20TokensBySymbol['cETH'],
					erc20TokensBySymbol['cUNI'],
					erc20TokensBySymbol['cZRX'],
					erc20TokensBySymbol['cBAT'],
					{
						icon: 'https://assets.coingecko.com/coins/images/10823/thumb/cwbtc.png?1584331700',
						chainId: 1,
						address: '0xccf4429db6322d5c611ee964527d42e5d685dd6a',
						name: 'cWBTC',
						symbol: 'CWBTC',
						decimals: 8,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/15290/thumb/cwbtc.png?1620371929',
						chainId: 1,
						address: '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4',
						name: 'cWBTC	Legacy ',
						symbol: 'CWBTC',
						decimals: 8,
					},
					erc20TokensBySymbol['cSAI'],
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
					llamafolio: 'compound-v2',
					zapper: 'compound',
					zerionDefiSDK: [
						'Compound',
					],
				},
			},
			{
				name: 'Compound V1',
				slug: 'v1',
				chainId: 1,
				providers: {
					zerionDefiSDK: [
						'Compound',
					],
				},
			},
		],
	},
	{
		name: 'Concentrator',
		slug: 'concentrator',
		links: [
			'https://concentrator.aladdin.club',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'concentrator',
					zapper: 'concentrator',
				},
			},
		],
	},
	{
		name: 'Conic Finance',
		slug: 'conic-finance',
		links: [
			'https://conic.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'conic-finance',
					zapper: 'conic-finance',
				},
			},
		],
	},
	{
		name: 'Connext',
		slug: 'connext',
		colors: [
			'#29c1fc',
			'#9c62f9',
		],
		links: [
			'https://connext.network',
		],
		views: [
			{
				chainId: 1,
			},
			{
				name: 'Connext Bridge',
				slug: 'bridge',
				links: [
					'https://bridge.connext.network',
				],
				chainId: undefined,
				providers: {
					zapper: 'connext-bridge',
				},
			},
		],
	},
	{
		name: 'Contango',
		slug: 'contango',
		links: [
			'http://app.contango.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'contango',
				},
			},
		],
	},
	{
		name: 'Convergence',
		slug: 'convergence',
		links: [
			'https://cvg.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'convergence',
				},
			},
		],
	},
	{
		name: 'Convex',
		slug: 'convex',
		links: [
			'https://www.convexfinance.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/15585/thumb/convex.png?1621256328',
						chainId: 1,
						address: '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b',
						name: 'Convex Finance',
						symbol: 'CVX',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/15586/thumb/convex-crv.png?1621255952',
						chainId: 1,
						address: '0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7',
						name: 'Convex CRV',
						symbol: 'CVXCRV',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'convex-finance',
					zapper: 'convex',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'convex-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'convex-finance',
				},
			},
			{
				name: 'Convex Frax',
				slug: 'convex-frax',
				links: [
					'https://frax.convexfinance.com',
				],
				chainId: undefined,
				providers: {
					zapper: 'convex-frax',
				},
			},
			{
				name: 'Convex F(x)',
				slug: 'fx',
				links: [
					'https://fx.convexfinance.com',
				],
				chainId: undefined,
				providers: {
					zapper: 'convex-fx',
				},
			},
			{
				name: 'Convex Prisma',
				slug: 'prisma',
				links: [
					'https://prisma.convexfinance.com',
				],
				chainId: undefined,
				providers: {
					zapper: 'convex-prisma',
				},
			},
		],
	},
	{
		name: 'Coordinape',
		slug: 'coordinape',
		links: [
			'https://coordinape.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coordinape',
				},
			},
		],
	},
	{
		name: 'Copra Finance',
		slug: 'copra-finance',
		links: [
			'https://www.copra.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'copra-finance',
				},
			},
		],
	},
	{
		name: 'Core DAO',
		slug: 'core-dao',
		links: [
			'https://coredao.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Core-DAO',
				},
			},
		],
	},
	{
		name: 'Coresky',
		slug: 'coresky',
		links: [
			'https://www.coresky.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coresky',
				},
			},
		],
	},
	{
		name: 'corn',
		slug: 'corn',
		links: [
			'https://usecorn.com',
		],
		views: [
			{
				providers: {
					zapper: 'corn',
				},
			},
		],
	},
	{
		name: 'Corruptions',
		slug: 'corruptions',
		links: [
			'https://corruptions.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'corruptions',
				},
			},
		],
	},
	{
		name: 'Coslend',
		slug: 'coslend',
		links: [
			'https://coslend.com',
		],
		colors: [
			'#e921c3',
		],
		views: [
			{
				chainId: 25,
				providers: {
					zapper: 'coslend',
				},
			},
		],
	},
	{
		name: 'Coti',
		slug: 'coti',
		links: [
			'https://coti.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'coti',
				},
			},
		],
	},
	{
		name: 'Cover Protocol',
		slug: 'cover',
		links: [
			'https://www.coverprotocol.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13563/thumb/1_eWBbDaqpxXqt7WYPSP4qSw.jpeg?1609822578',
						chainId: 1,
						address: '0x4688a8b1f292fdab17e9a90c8bc379dc1dbd8713',
						name: 'Cover Protocol',
						symbol: 'COVER',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'cover',
				},
			},
		],
	},
	{
		name: 'CoW Swap',
		slug: 'cow-swap',
		colors: [
			'#65D9FF',
		],
		links: [
			'https://cow.fi',
			'https://swap.cow.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'cow-swap',
					zapper: 'cow-swap',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'cow-swap',
					zapper: 'cow-swap',
				},
			},
		],
	},
	{
		name: 'Cozy Finance',
		slug: 'cozy-finance',
		links: [
			'https://www.cozy.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'cozy-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'cozy-finance',
					zapper: 'cozy-finance',
				},
			},
		],
	},
	{
		name: 'C.R.E.A.M.',
		slug: 'cream',
		links: [
			'https://cream.finance',
		],
		colors: [
			'#68e2dc',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11976/thumb/Cream.png?1596593418',
						chainId: 1,
						address: '0x2ba592f78db6436527729929aaf6c908497cb200',
						name: 'Cream',
						symbol: 'CREAM',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13568/thumb/creth2.png?1609837099',
						chainId: 1,
						address: '0xcbc1065255cbc3ab41a6868c22d1f1c573ab89fd',
						name: 'Cream ETH 2',
						symbol: 'CRETH2',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'cream-finance',
					zapper: 'cream',
					zerionDefiSDK: [
						'C.R.E.A.M.',
						'C.R.E.A.M. • Staking',
					],
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'cream-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'cream-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'cream-finance',
				},
			},
			{
				name: 'Lending',
				slug: 'lending',
				chainId: 42161,
				providers: {
					llamafolio: 'cream-lending',
				},
			},
			{
				name: 'Lending',
				slug: 'lending',
				chainId: 56,
				providers: {
					llamafolio: 'cream-lending',
				},
			},
			{
				name: 'Lending',
				slug: 'lending',
				chainId: 137,
				providers: {
					llamafolio: 'cream-lending',
				},
			},
			{
				name: 'Lending',
				slug: 'lending',
				chainId: 1,
				providers: {
					llamafolio: 'cream-lending',
				},
			},
			{
				name: 'C.R.E.A.M. Iron Bank',
				slug: 'iron-bank',
				chainId: 1,
				providers: {
					zapper: 'cream-iron-bank',
				},
			},
			{
				name: 'CRETH2',
				slug: 'creth2',
				links: [
					'https://classic.cream.finance/eth2',
				],
				chainId: 1,
				providers: {
					llamafolio: 'creth2',
				},
			},
		],
	},
	{
		name: 'Credmark',
		slug: 'credmark',
		links: [
			'https://credmark.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'credmark',
				},
			},
		],
	},
	{
		name: 'Crescent Swap',
		slug: 'crescent-swap',
		links: [
			'https://crescentswap.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'crescent-swap',
				},
			},
		],
	},
	{
		name: 'Cryptex Finance',
		slug: 'cryptex',
		links: [
			'https://cryptex.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14932/thumb/glossy_icon_-_C200px.png?1619073171',
						chainId: 1,
						address: '0x321c2fe4446c7c963dc41dd58879af648838f98d',
						name: 'Cryptex Finance',
						symbol: 'CTX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'cryptex',
				},
			},
		],
	},
	{
		name: 'CryptoPhunks Auction House',
		slug: 'crypto-phunks-auction-house',
		links: [
			'https://phunks.auction',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'crypto-phunks-auction-house',
				},
			},
		],
	},
	{
		name: 'CryptoPunks Marketplace',
		slug: 'crypto-punks',
		links: [
			'https://cryptopunks.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'crypto-punks',
				},
			},
		],
	},
	{
		name: 'CryptoComposite',
		slug: 'cryptocomposite',
		links: [
			'https://www.cryptocomposite.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cryptocomposite',
				},
			},
		],
	},
	{
		name: 'Crypto Valleys',
		slug: 'cryptovalleys',
		links: [
			'https://cryptovalleys.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cryptovalleys',
				},
			},
		],
	},
	{
		name: 'Curve',
		slug: 'curve',
		links: [
			'https://curve.fi',
		],
		colors: [
			// '#840000',
			'#fd2700',
			'#f9ea02',
			'#91ff67',
			// '#0213fa',
		], // unofficial
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'curve-dex',
					zapper: 'curve',
					zerionDefiSDK: [
						'Curve',
						'Curve • Liquidity Gauges',
					],
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				chainId: 1284,
				providers: {
					llamafolio: 'curve-dex',
				},
			},
			{
				name: 'Curve DAO',
				slug: 'dao',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12124/thumb/Curve.png?1597369484',
						chainId: 1,
						address: '0xd533a949740bb3306d119cc777fa900ba034cd52',
						name: 'Curve DAO Token',
						symbol: 'CRV',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'Curve • Vesting',
						'Curve • Vote Escrowed CRV',
					],
				},
			},
			{
				chainId: 1,
				name: 'Curve Stablecoin',
				slug: 'crvusd',
				links: [
					'https://crvusd.curve.fi/#/ethereum/markets',
				],
				providers: {
					llamafolio: 'crvusd',
					zapper: 'curve-stablecoin',
				},
			},
		],
	},
	{
		name: 'cVault Finance',
		slug: 'cvault-finance',
		links: [
			'https://cvault.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'cvault-finance',
				},
			},
		],
	},
	{
		name: 'Cyber',
		slug: 'cyber',
		links: [
			'https://cyber.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cyber',
				},
			},
		],
	},
	{
		name: 'Cyberblast V2',
		slug: 'cyberblast-v2',
		links: [
			'https://cyberblast.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cyberblast-v2',
				},
			},
		],
	},
	{
		name: 'CyberConnect',
		slug: 'cyberconnect',
		links: [
			'https://cyberconnect.me',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'CyberConnect',
				},
			},
		],
	},
	{
		name: 'CyberKongz Genkai',
		slug: 'cyberkongz-genkai',
		links: [
			'https://genkai.cyberkongz.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cyberkongz-genkai',
				},
			},
		],
	},
	{
		name: 'Cyclone',
		slug: 'cyclone',
		links: [
			'https://cyclone.xyz',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'cyclone',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'cyclone',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'cyclone',
				},
			},
		],
	},
	{
		name: 'Cygnus Finance',
		slug: 'cygnus-finance',
		links: [
			'https://cygnus.finance',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'cygnus-finance',
				},
			},
		],
	},
	{
		name: 'Cygnus Finance',
		slug: 'cygnus-finance',
		links: [
			'https://www.cygnus.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'cygnus-finance',
				},
			},
		],
	},
	{
		name: 'DackieSwap',
		slug: 'dackie-swap',
		links: [
			'https://www.dackieswap.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dackie-swap',
				},
			},
		],
	},
	{
		name: 'Daily Meme',
		slug: 'daily-meme',
		links: [
			'https://www.dailymeme.io',
		],
		views: [
			{
				providers: {
					zapper: 'daily-meme',
				},
			},
		],
	},
	{
		name: 'Daimo',
		slug: 'daimo',
		links: [
			'https://daimo.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Daimo',
				},
			},
		],
	},
	{
		name: 'DAO Maker',
		slug: 'dao-maker',
		links: [
			'https://daomaker.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'DAO-Maker',
				},
			},
		],
	},
	{
		name: 'Dapp Radar',
		slug: 'dapp-radar',
		links: [
			'https://dappradar.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dapp-radar',
				},
			},
		],
	},
	{
		name: 'Dappmon',
		slug: 'dappmon',
		links: [
			'https://play.dappmon.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'dappmon',
				},
			},
		],
	},
	{
		name: 'Dappnode',
		slug: 'dappnode',
		links: [
			'https://dappnode.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dappnode',
				},
			},
		],
	},
	{
		name: 'Data Ownership Protocol',
		slug: 'data-ownership-protocol',
		links: [
			'https://dop.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'data-ownership-protocol',
				},
			},
		],
	},
	{
		name: 'Datamine Network',
		slug: 'datamine-network',
		links: [
			'https://datamine-crypto.github.io/realtime-decentralized-dashboard',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'datamine-network',
				},
			},
		],
	},
	{
		name: 'Davos Protocol',
		slug: 'davos-protocol',
		links: [
			'https://davos.xyz',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'davos-protocol',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'davos-protocol',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'davos-protocol',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'davos-protocol',
				},
			},
		],
	},
	{
		name: 'Davos',
		slug: 'davos',
		links: [
			'https://davos.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'davos',
				},
			},
		],
	},
	{
		name: 'Daxio',
		slug: 'daxio',
		links: [
			'https://daxio.com/index',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Daxio',
				},
			},
		],
	},
	{
		name: 'DBXen',
		slug: 'db-xen',
		links: [
			'https://dbxen.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'db-xen',
				},
			},
			{
				name: 'DBXeNFT',
				slug: 'dbxenft',
				links: [
					'https://dbxen.org',
				],
				chainId: undefined,
				providers: {
					zapper: 'dbxenft',
				},
			},
		],
	},
	{
		name: 'DDEX',
		slug: 'ddex',
		links: [
			'https://ddex.io',
		],
		colors: [
			'#012d93',
			'#0367d8',
			'#00f6fa',
		], // unofficial
		views: [
			{
				chainId: 1,
				providers: {
					zerionDefiSDK: [
						'DDEX • Lending',
						'DDEX • Margin',
						'DDEX • Spot',
					],
				},
			},
		],
	},
	{
		name: 'DeSyn Protocol',
		slug: 'de-syn',
		links: [
			'https://www.desyn.io',
		],
		views: [
			{
				providers: {
					zapper: 'de-syn',
				},
			},
		],
	},
	{
		name: '0xDEAFBEEF',
		slug: 'deafbeef',
		links: [
			'https://deafbeef.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dead-beef',
				},
			},
		],
	},
	{
		name: 'DeBank',
		slug: 'debank',
		links: [
			'https://debank.com',
		],
		views: [
			{
				name: 'DeBank Hi',
				slug: 'hi',
				links: [
					'https://debank.com/hi',
				],
				chainId: undefined,
				providers: {
					zapper: 'debank-hi',
				},
			},
		],
	},
	{
		name: 'deBridge',
		slug: 'debridge',
		links: [
			'https://debridge.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'debridge',
				},
			},
		],
	},
	{
		name: 'Deca',
		slug: 'deca',
		links: [
			'https://deca.art',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'deca',
				},
			},
		],
	},
	{
		name: 'DeFi Dollar',
		slug: 'defi-dollar',
		links: [
			'https://dusd.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'defi-dollar',
				},
			},
		],
	},
	{
		name: 'Defi Kingdoms',
		slug: 'defi-kingdoms',
		links: [
			'https://www.defikingdoms.com',
		],
		views: [
			{
				chainId: 1666600000,
				providers: {
					zapper: 'defi-kingdoms',
				},
			},
		],
	},
	{
		name: 'DeFi Money Market',
		slug: 'defi-money-market',
		links: [
			'https://defimoneymarket.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11677/thumb/dmm.png?1592674690',
						chainId: 1,
						address: '0xed91879919b71bb6905f23af0a68d231ecf87b14',
						name: 'DMM Governance',
						symbol: 'DMG',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'DeFi Money Market',
					],
				},
			},
		],
	},
	{
		name: 'DeFi Saver',
		slug: 'defi-saver',
		links: [
			'https://defisaver.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'defisaver',
				},
			},
		],
	},
	{
		name: 'DeFi Swap',
		slug: 'defi-swap',
		links: [
			'https://defi-swap.org',
			'https://crypto.com/defi/swap',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'defi-swap',
					zapper: 'defi-swap',
				},
			},
		],
	},
	{
		name: 'De.Fi',
		slug: 'de-fi',
		links: [
			'https://de.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'defi',
				},
			},
		],
	},
	{
		name: 'Defibox',
		slug: 'defibox',
		links: [
			'https://defibox.io',
		],
		views: [
			{
				providers: {
					zapper: 'defibox',
				},
			},
		],
	},
	{
		name: 'DefiEdge',
		slug: 'defiedge',
		links: [
			'https://www.defiedge.io',
			'https://app.defiedge.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'defiedge',
				},
			},
		],
	},
	{
		name: 'DeFiner',
		slug: 'definer',
		links: [
			'https://definer.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'definer',
				},
			},
		],
	},
	{
		name: 'Definitive',
		slug: 'definitive',
		links: [
			'https://www.definitive.fi',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'definitive.fi',
					zapper: 'definitive',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'definitive.fi',
					zapper: 'definitive',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'definitive.fi',
					zapper: 'definitive',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'definitive.fi',
					zapper: 'definitive',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'definitive.fi',
					zapper: 'definitive',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'definitive.fi',
					zapper: 'definitive',
				},
			},
		],
	},
	{
		name: 'Definix',
		slug: 'definix',
		links: [
			'https://definix.com/en',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'definix',
				},
			},
		],
	},
	{
		name: 'Definix',
		slug: 'definix',
		links: [
			'https://definix.com/en',
		],
		views: [
			{
				providers: {
					zapper: 'definix',
				},
			},
		],
	},
	{
		name: 'DefiPlaza',
		slug: 'defiplaza',
		links: [
			'https://defiplaza.net',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'defiplaza',
					zapper: 'defiplaza',
				},
			},
		],
	},
	{
		name: 'DefiSaver',
		slug: 'defisaver',
		links: [
			'https://defisaver.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'defisaver',
				},
			},
		],
	},
	{
		name: 'Defrag',
		slug: 'defrag',
		links: [
			'https://defrag.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'defrag',
				},
			},
		],
	},
	{
		name: 'Degen',
		slug: 'degen',
		icon: DegenIcon,
		colors: [
			'#a36efe',
			'#4c2896',
		],
		links: [
			'https://www.degen.tips',
		],
		views: [
			{
				name: 'Degen Bridge',
				slug: 'bridge',
				links: [
					'https://bridge.degen.tips',
				],
				chainId: undefined,
				providers: {
					zapper: 'degentips',
				},
			},
			{
				name: 'Degen Airdrop',
				slug: 'airdrop',
				chainId: undefined,
				providers: {
					zapper: 'degen',
				},
			},
		],
	},
	{
		name: 'Degen Names',
		slug: 'degen-names',
		links: [
			'https://degenname.lol',
		],
		views: [
			{
				providers: {
					zapper: 'degen-names',
				},
			},
		],
	},
	{
		name: 'Degen Radio',
		slug: 'degen-radio',
		links: [
			'https://degenradio.lol',
		],
		views: [
			{
				providers: {
					zapper: 'degen-radio',
				},
			},
		],
	},
	{
		name: 'DegenSwap',
		slug: 'degen-swap',
		links: [
			'https://www.swapdegen.tips',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'degen-swap',
				},
			},
		],
	},
	{
		name: 'Degen Zoo',
		slug: 'degen-zoo',
		links: [
			'https://www.degenzoo.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Degen-Zoo',
				},
			},
		],
	},
	{
		name: 'DeGods Staking',
		slug: 'degods',
		links: [
			'https://degods.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'degods',
				},
			},
		],
	},
	{
		name: 'Delegate Cash',
		slug: 'delegate-cash',
		links: [
			'https://delegate.cash',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'delegate-cash',
				},
			},
		],
	},
	{
		name: 'DeltaPrime',
		slug: 'deltaprime',
		links: [
			'https://deltaprime.io',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'deltaprime',
					zapper: 'deltaprime',
				},
			},
		],
	},
	{
		name: 'DePay',
		slug: 'depay',
		links: [
			'https://depay.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'depay',
				},
			},
		],
	},
	{
		name: 'Deq',
		slug: 'deq-fi',
		links: [
			'https://deq.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'deq-fi',
				},
			},
		],
	},
	{
		name: 'DerivaDEX',
		slug: 'derivadex',
		links: [
			'https://derivadex.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'derivadex',
					zapper: 'derivadex',
				},
			},
		],
	},
	{
		name: 'DerpDEX',
		slug: 'derpdex',
		links: [
			'https://derpdex.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'DerpDEX',
				},
			},
		],
	},
	{
		name: 'DeversiFi',
		slug: 'deversifi',
		links: [
			'https://www.deversifi.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/16414/thumb/DVF_02.png?1625826746',
						chainId: 1,
						address: '0xdddddd4301a082e62e84e43f474f044423921918',
						name: 'DVF',
						symbol: 'DVF',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'deversifi',
				},
			},
		],
	},
	{
		name: 'DFI Money',
		slug: 'dfi-money',
		links: [
			'https://dfi.money',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11902/thumb/YFII-logo.78631676.png?1598677348',
						chainId: 1,
						address: '0xa1d0e215a23d7030842fc67ce582a6afa3ccab83',
						name: 'DFI money',
						symbol: 'YFII',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'dfi-money',
				},
			},
		],
	},
	{
		name: 'dForce',
		slug: 'dforce',
		links: [
			'https://dforce.network',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/9709/thumb/xlGxxIjI_400x400.jpg?1571006794',
						chainId: 1,
						address: '0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0',
						name: 'dForce Token',
						symbol: 'DF',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'dforce',
					zapper: 'dforce',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'dforce',
					zapper: 'dforce',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'dforce',
					zapper: 'dforce',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'dforce',
					zapper: 'dforce',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'dforce',
					zapper: 'dforce',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'dforce',
					zapper: 'dforce',
				},
			},
		],
	},
	{
		name: 'DFX Finance',
		slug: 'dfx',
		links: [
			'https://dfx.finance',
			'https://exchange.dfx.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'dfx',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'dfx',
				},
			},
		],
	},
	{
		name: 'Dfyn',
		slug: 'dfyn',
		links: [
			'https://dfyn.network',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11902/thumb/YFII-logo.78631676.png?1598677348',
						chainId: 1,
						address: '0xa1d0e215a23d7030842fc67ce582a6afa3ccab83',
						name: 'DFI money',
						symbol: 'YFII',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'dfyn',
				},
			},
		],
	},
	{
		name: 'dHEDGE',
		slug: 'dhedge',
		links: [
			'https://www.dhedge.org',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'dhedge',
					zapper: 'dhedge-v2',
				},
			},
			{
				name: 'dHEDGE V2',
				slug: 'v2',
				chainId: 10,
				providers: {
					llamafolio: 'dhedge',
					zapper: 'dhedge-v2',
				},
			},
			{
				name: 'dHEDGE V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					llamafolio: 'dhedge',
					zapper: 'dhedge-v2',
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12508/thumb/dht.png?1600752201',
						chainId: 1,
						address: '0xca1207647ff814039530d7d35df0e1dd2e91fa84',
						name: 'dHEDGE DAO',
						symbol: 'DHT',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14792/thumb/dtop.jpg?1618469418',
						chainId: 1,
						address: '0x0f4c00139602ab502bc7c1c0e71d6cb72a9fb0e7',
						name: 'dHEDGE Top Index',
						symbol: 'DTOP',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'dhedge',
				},
			},
		],
	},
	{
		name: 'DIA',
		slug: 'dia',
		links: [
			'https://www.diadata.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'DIA',
				},
			},
		],
	},
	{
		name: 'Diamondswap',
		slug: 'diamondswap',
		links: [
			'https://diamondswap.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Diamondswap',
				},
			},
		],
	},
	{
		name: 'Diffusion',
		slug: 'diffusion',
		links: [
			'https://app.diffusion.fi',
		],
		colors: [
			'#27D2EA',
		],
		views: [
			{
				chainId: 25,
				erc20Tokens: [
					{
						address: '0x3f75ceabcdfed1aca03257dc6bdc0408e2b4b026',
					},
				],
				providers: {
					zapper: 'diffusion',
				},
			},
		],
	},
	{
		name: 'DigiToads',
		slug: 'digi-toads',
		links: [
			'https://digitoads.world',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'digi-toads',
				},
			},
		],
	},
	{
		name: 'Dimension X',
		slug: 'dimension-x',
		links: [
			'https://dimensionxnft.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dimension-x',
				},
			},
		],
	},
	{
		name: 'Dimensionals',
		slug: 'dimensionals',
		links: [
			'https://www.dimensionals.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dimensionals',
				},
			},
		],
	},
	{
		name: 'DIN',
		slug: 'din',
		links: [
			'https://din.lol',
		],
		views: [
			{
				providers: {
					zapper: 'din',
				},
			},
		],
	},
	{
		name: 'Dinari',
		slug: 'dinari',
		links: [
			'https://dinari.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dinari',
				},
			},
		],
	},
	{
		name: 'Dinero-PirexETH',
		slug: 'dinero-pirexeth',
		links: [
			'https://dineroismoney.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'dinero-pirexeth',
				},
			},
		],
	},
	{
		name: 'DinoLFG',
		slug: 'dino-flg',
		links: [
			'https://dinolfg.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dino',
				},
			},
		],
	},
	{
		name: 'Dip Exchange',
		slug: 'dip-exchange',
		links: [
			'https://dip.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dip-exchange',
				},
			},
		],
	},
	{
		name: 'Disco',
		slug: 'disco',
		links: [
			'https://disco.xyz',
		],
		colors: [
			'#020218',
		],
		icon: DiscoIcon,
		views: [
			{
				chainId: 1,
				components: [
					DiscoPage,
				],
			},
		],
	},
	{
		name: 'Disperse',
		slug: 'disperse',
		links: [
			'https://disperse.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'disperse',
				},
			},
		],
	},
	{
		name: 'Distracted Dudes',
		slug: 'distracted-dudes',
		links: [
			'https://www.distracteddudes.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'distracted-dudes',
				},
			},
		],
	},
	{
		name: 'DistrictOne',
		slug: 'districtone',
		links: [
			'https://districtone.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'districtone',
				},
			},
		],
	},
	{
		name: 'Diva',
		slug: 'diva',
		links: [
			'https://staking.foundation',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'diva',
				},
			},
		],
	},
	{
		name: 'DLN',
		slug: 'dln',
		links: [
			'https://dln.trade',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'DLN',
				},
			},
		],
	},
	{
		name: 'Dmail Network',
		slug: 'dmail-network',
		links: [
			'https://dmail.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Dmail-Network',
				},
			},
		],
	},
	{
		name: 'DODO',
		slug: 'dodo',
		links: [
			'https://dodoex.io',
		],
		colors: [
			'#fff700',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12651/thumb/dodo_logo.png?1601433025',
						chainId: 1,
						address: '0x43dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd',
						name: 'DODO',
						symbol: 'DODO',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'dodo',
					zerionDefiSDK: [
						'DODO',
					],
				},
			},
		],
	},
	{
		name: 'Dogliens',
		slug: 'dogliens',
		links: [
			'https://www.dogliens.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dogliens',
				},
			},
		],
	},
	{
		name: 'Dolomite',
		slug: 'dolomite',
		links: [
			'https://dolomite.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dolomite',
				},
			},
		],
	},
	{
		name: 'DOLZ.io',
		slug: 'dolz-io',
		links: [
			'https://dolz.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'DOLZ-io',
				},
			},
		],
	},
	{
		name: 'Doodles',
		slug: 'doodles',
		links: [
			'https://doodles.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'doodles',
				},
			},
		],
	},
	{
		name: 'Dookey Dash',
		slug: 'dookeydash',
		links: [
			'https://dookeydash.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dookeydash',
				},
			},
		],
	},
	{
		name: 'Dopex',
		slug: 'dopex',
		links: [
			'https://dopex.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/16652/thumb/DPX_%281%29.png?1624598630',
						chainId: 1,
						address: '0xeec2be5c91ae7f8a338e1e5f3b5de49d07afdc81',
						name: 'Dopex',
						symbol: 'DPX',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16659/thumb/rDPX_200x200_Coingecko.png?1624614475',
						chainId: 1,
						address: '0x0ff5a8451a839f5f0bb3562689d9a44089738d11',
						name: 'Dopex Rebate Token',
						symbol: 'RDPX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'dopex',
				},
			},
		],
	},
	{
		name: 'Dot',
		slug: 'dot',
		links: [
			'https://dot.fan',
		],
		views: [
			{
				providers: {
					zapper: 'dot',
				},
			},
		],
	},
	{
		name: 'Draft Shares',
		slug: 'draft-shares',
		links: [
			'https://draftshares.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'draft-shares',
				},
			},
		],
	},
	{
		name: 'DREAMBYT3',
		slug: 'dreambyt3',
		links: [
			'https://dreambyt3.com/ethereum',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'DRΞAMBYT3',
				},
			},
		],
	},
	{
		name: 'Drops',
		slug: 'drops',
		links: [
			'https://drops.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'drops',
				},
			},
		],
	},
	{
		name: 'Duo Exchange',
		slug: 'duo-exchange',
		links: [
			'https://www.duo.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'duo-exchange',
				},
			},
		],
	},
	{
		name: 'DXswap',
		slug: 'dx-swap',
		links: [
			'https://dxdao.eth.link',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dx-swap',
				},
			},
		],
	},
	{
		name: 'DYAD',
		slug: 'dyad',
		links: [
			'https://dyadstable.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'dyad',
				},
			},
		],
	},
	{
		name: 'dYdX',
		slug: 'dydx',
		links: [
			'https://dydx.exchange',
		],
		colors: [
			'#6966ff',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'dydx',
					zapper: 'dydx',
					zerionDefiSDK: [
						'dYdX',
					],
				},
			},
		],
	},
	{
		name: 'Dynamic Set Dollar',
		slug: 'dynamic-set-dollar',
		links: [
			'https://dsd.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13249/thumb/DSD.jpg?1606713628',
						chainId: 1,
						address: '0xbd2f0cd039e0bfcf88901c98c0bfac5ab27566e3',
						name: 'Dynamic Set Dollar',
						symbol: 'DSD',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'dsd',
				},
			},
		],
	},
	{
		name: 'Dyorswap',
		slug: 'dyorswap',
		links: [
			'https://dyorswap.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dyorswap',
				},
			},
		],
	},
	{
		name: 'Dypius',
		slug: 'dypius',
		links: [
			'https://www.dypius.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dypius',
				},
			},
		],
	},
	{
		name: 'Dystopia',
		slug: 'dystopia',
		links: [
			'https://www.dystopia.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'dystopia',
				},
			},
		],
	},
	{
		name: 'Earncaster',
		slug: 'earncaster',
		links: [
			'https://earncaster.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'earncaster',
				},
			},
		],
	},
	{
		name: 'Ethereum Attestation Service',
		slug: 'eas',
		icon: EthereumAttestationServiceIcon,
		colors: [
			'#4c63b6',
			// '#7b93db',
			// '#bed0f7',
		],
		links: [
			'https://attest.org',
			// 'https://attest.sh',
		],

		showCustomUi: ['Explorer', 'Account'],
		
		/**
		 * @link https://docs.attest.org/docs/quick--start/contracts
		 */
		views: [
			{
				showOn: ['Dashboard'],
		
				chainId: 1,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v0.26)',
						address: '0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587',
					},
					{
						name: 'SchemaRegistry (v0.26)',
						address: '0xA7b39296258348C78294F95B872b282326A97BDF',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 10,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.0.1)',
						address: '0x4200000000000000000000000000000000000021',
					},
					{
						name: 'SchemaRegistry (v1.0.1)',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EIP712Proxy (v1.2.1)',
						address: '0xE132c2E90274B44FfD8090b58399D04ddc060AE1',
					},
					{
						name: 'Indexer (v1.2.1)',
						address: '0x6dd0CB3C3711c8B5d03b3790e5339Bbc2Bbcf934',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 8453,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.0.1)',
						address: '0x4200000000000000000000000000000000000021',
					},
					{
						name: 'SchemaRegistry (v1.0.1)',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EIP712Proxy (v1.2.0)',
						address: '0xF095fE4b23958b08D38e52d5d5674bBF0C03cbF6',
					},
					{
						name: 'Indexer (v1.2.0)',
						address: '0x37AC6006646f2e687B7fB379F549Dc7634dF5b84',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 42161,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v0.26)',
						address: '0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458',
					},
					{
						name: 'SchemaRegistry (v0.26)',
						address: '0xA310da9c5B885E7fb3fbA9D66E9Ba6Df512b78eB',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 42170,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.3.0)',
						address: '0x6d3dC0Fe5351087E3Af3bDe8eB3F7350ed894fc3',
					},
					{
						name: 'SchemaRegistry (v1.3.0)',
						address: '0x49563d0DA8DF38ef2eBF9C1167270334D72cE0AE',
					},
					{
						name: 'EIP712Proxy (v1.3.0)',
						address: '0xEbf2DeeD690F8A68b8248d6a12231ee70ED2154A',
					},
					{
						name: 'Indexer (v1.3.0)',
						address: '0x7182Be5e84aFEe9Dc29C69D081F8A0FA834d6CB8',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 137,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.3.0)',
						address: '0x5E634ef5355f45A855d02D66eCD687b1502AF790',
					},
					{
						name: 'SchemaRegistry (v1.3.0)',
						address: '0x7876EEF51A891E737AF8ba5A5E0f0Fd29073D5a7',
					},
					{
						name: 'EIP712Proxy (v1.3.0)',
						address: '0x4be71865917C7907ccA531270181D9B7dD4f2733',
					},
					{
						name: 'Indexer (v1.3.0)',
						address: '0x12d0f50Eb2d67b14293bdDA2C248358f3dfE5308',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 534352,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.3.0)',
						address: '0xC47300428b6AD2c7D03BB76D05A176058b47E6B0',
					},
					{
						name: 'SchemaRegistry (v1.3.0)',
						address: '0xD2CDF46556543316e7D34e8eDc4624e2bB95e3B6',
					},
					{
						name: 'EIP712Proxy (v1.3.0)',
						address: '0x77b7DA1c40762Cd8AFfE2069b575328EfD4D9801',
					},
					{
						name: 'Indexer (v1.3.0)',
						address: '0x8314bc1B2f7F286cb4f0323FE7119C0F99D4A083',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 59144,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.2.0)',
						address: '0xaEF4103A04090071165F78D45D83A0C0782c2B2a',
					},
					{
						name: 'SchemaRegistry (v1.2.0)',
						address: '0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 11155111,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.2.0)',
						address: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
					},
					{
						name: 'SchemaRegistry (v1.2.0)',
						address: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
					},
					{
						name: 'EIP712Proxy (v1.2.0)',
						address: '0x9C9d17bEE150E4eCDf3b99baFA62c08Cb30E82BC',
					},
					{
						name: 'Indexer (v1.2.0)',
						address: '0xaEF4103A04090071165F78D45D83A0C0782c2B2a',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 11155420,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.0.2)',
						address: '0x4200000000000000000000000000000000000021',
					},
					{
						name: 'SchemaRegistry (v1.0.2)',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EIP712Proxy (v1.0.2)',
						address: '0x37AC6006646f2e687B7fB379F549Dc7634dF5b84',
					},
					{
						name: 'Indexer (v1.0.2)',
						address: '0x97e6822A36E38D4d93C0c810CC2be1C6Fd492b64',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 420,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.0.1)',
						address: '0x4200000000000000000000000000000000000021',
					},
					{
						name: 'SchemaRegistry (v1.0.1)',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EIP712Proxy (v1.0.1)',
						address: '0x88D1bd62AC014424b987CE5ABf311BD7749e426B',
					},
					{
						name: 'Indexer (v1.0.1)',
						address: '0xa42428D1bf904d762adD02b27ADac26d53643782',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 84532,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.2.0)',
						address: '0x4200000000000000000000000000000000000021',
					},
					{
						name: 'SchemaRegistry (v1.2.0)',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EIP712Proxy (v1.2.0)',
						address: '0xAd64A04c20dDBbA7cBb0EcAe4823095B4adA5c57',
					},
					{
						name: 'Indexer (v1.2.0)',
						address: '0x2C7BCE69D5Ee84EF73CC9286416F68E60F9A61b3',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 84531,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.0.1)',
						address: '0x4200000000000000000000000000000000000021',
					},
					{
						name: 'SchemaRegistry (v1.0.1)',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EIP712Proxy (v1.0.1)',
						address: '0x37AC6006646f2e687B7fB379F549Dc7634dF5b84',
					},
					{
						name: 'Indexer (v1.0.1)',
						address: '0xE0893F47009776D6aEC3De8455Cb0ed325Eea74a',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 421613,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.1.0)',
						address: '0xaEF4103A04090071165F78D45D83A0C0782c2B2a',
					},
					{
						name: 'SchemaRegistry (v1.1.0)',
						address: '0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 80001,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.1.0)',
						address: '0xaEF4103A04090071165F78D45D83A0C0782c2B2a',
					},
					{
						name: 'SchemaRegistry (v1.1.0)',
						address: '0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],

				chainId: 80002,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.3.0)',
						address: '0xb101275a60d8bfb14529C421899aD7CA1Ae5B5Fc',
					},
					{
						name: 'SchemaRegistry (v1.3.0)',
						address: '0x23c5701A1BDa89C61d181BD79E5203c730708AE7',
					},
					{
						name: 'EIP712Proxy (v1.3.0)',
						address: '0xA0ec8a80a0b8496B9Cf6Ee703bC16ABdC9F4cf2e',
					},
					{
						name: 'Indexer (v1.3.0)',
						address: '0x9F07c0B0E52C36D78Ac8ABfC543c77f83888ac64',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
			{
				showOn: ['Dashboard'],
		
				chainId: 59140,
				components: [
					EasPage,
				],
				contracts: [
					{
						name: 'EAS (v1.2.0)',
						address: '0xaEF4103A04090071165F78D45D83A0C0782c2B2a',
					},
					{
						name: 'SchemaRegistry (v1.2.0)',
						address: '0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797',
					},
				],
				providers: {
					zapper: 'eas',
				},
			},
		]
	},
	{
		name: 'Ease',
		slug: 'ease',
		links: [
			'https://ease.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'ease',
				},
			},
		],
	},
	{
		name: 'eBTC Finance',
		slug: 'ebtcfinance',
		links: [
			'https://www.ebtc.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ebtcfinance',
				},
			},
		],
	},
	{
		name: 'Ecosapiens',
		slug: 'ecosapiens',
		links: [
			'https://www.ecosapiens.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ecosapiens',
				},
			},
		],
	},
	{
		name: 'Eden',
		slug: 'eden',
		links: [
			'https://www.edennetwork.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'eden',
				},
			},
		],
	},
	{
		name: 'Ethereum Follow Protocol',
		slug: 'efp',
		links: [
			'https://ethfollow.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'ethereum-follow-protocol',
				},
			},
		],
	},
	{
		name: 'EGGFAM',
		slug: 'eggfam',
		links: [
			'https://eggfam.lol',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'eggfam',
				},
			},
		],
	},
	{
		name: 'Eggs',
		slug: 'eggs',
		links: [
			'https://eggs.care',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'eggs',
				},
			},
		],
	},
	{
		name: 'EigenLayer',
		slug: 'eigenlayer',
		links: [
			'https://www.eigenlayer.xyz',
		],
		colors: [
			'#1a0d6d',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'eigenlayer',
					zapper: 'eigen-layer',
				},
			},
		],
	},
	{
		name: '88mph',
		slug: '88mph',
		links: [
			'https://88mph.app',
		],
		colors: [
			'#743ad5',
			'#d53a9d',
		],
		views: [
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 43114,
				providers: {
					zapper: 'eighty-eight-mph-v3',
				},
			},
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13137/thumb/yfU-_Tcj_400x400.png?1605581509',
						chainId: 1,
						address: '0x8888801af4d980682e47f1a9036e589479e835c5',
						name: '88mph',
						symbol: 'MPH',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'eighty-eight-mph-v3',
				},
			},
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 250,
				providers: {
					zapper: 'eighty-eight-mph-v3',
				},
			},
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 137,
				providers: {
					zapper: 'eighty-eight-mph-v3',
				},
			},
			{
				name: '88mph V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13137/thumb/yfU-_Tcj_400x400.png?1605581509',
						chainId: 1,
						address: '0x8888801af4d980682e47f1a9036e589479e835c5',
						name: '88mph',
						symbol: 'MPH',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
					zapper: 'eighty-eight-mph',
					// zapper: '88mph',
				},
			},
		],
	},
	{
		name: 'Ekos Genesis Collection',
		slug: 'ekos-genesis-collection',
		links: [
			'https://www.ekos.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ekos-genesis-collection',
				},
			},
		],
	},
	{
		name: 'Element',
		slug: 'element',
		links: [
			'https://element.market',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'element-marketplace',
				},
			},
		],
	},
	{
		// https://docs.element.fi/developers/public-releases
		// https://raw.githubusercontent.com/element-fi/elf-deploy/main/changelog/releases/mainnet/v1.0.0:2/addresses.json
		name: 'Element Protocol',
		slug: 'element-protocol',
		links: [
			'https://www.element.fi',
		],
		colors: [
			'#1568CA',
			'#8FD8E7',
		],
		views: [
			{
				chainId: 1,
				contracts: [
					{
						name: 'trancheFactory',
						address: '0x62F161BF3692E4015BefB05A03a94A40f520d1c0',
					},
					{
						name: 'userProxy',
						address: '0xEe4e158c03A10CBc8242350d74510779A364581C',
					},
					{
						name: 'balancerVault',
						address: '0xBA12222222228d8Ba445958a75a0704d566BF2C8',
					},
					{
						name: 'weightedPoolFactory',
						address: '0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9',
					},
					{
						name: 'convergentCurvePoolFactory',
						address: '0xb7561f547F3207eDb42A6AfA42170Cd47ADD17BD',
					},
					
					// yearn lusd3crv-f
					{
						name: 'wrapped position',
						address: '0xed279fdd11ca84beef15af5d39bb4d4bee23f0ca',
					},
					{
						name: 'vault',
						address: '0x5fA5B62c8AF877CB37031e0a3B2f34A78e3C56A6',
					},
					
					// tranches
				],
				providers: {
					zapper: 'element',
				},
			},
		],
	},
	{
		name: 'Elephant Money',
		slug: 'elephant-money',
		links: [
			'https://elephant.money',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'elephant-money',
				},
			},
		],
	},
	{
		name: 'Eleven Finance',
		slug: 'eleven-finance',
		links: [
			'https://eleven.finance',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'eleven-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					zapper: 'eleven-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'eleven-finance',
				},
			},
		],
	},
	{
		name: 'Elixir',
		slug: 'elixir',
		links: [
			'https://elixir.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'elixir',
				},
			},
		],
	},
	{
		name: 'Elk Finance',
		slug: 'elkfinance',
		links: [
			'https://elk.finance',
		],
		views: [
			{
				providers: {
					zapper: 'elkfinance',
				},
			},
		],
	},
	{
		name: 'Ellipsis',
		slug: 'ellipsis',
		links: [
			'https://ellipsis.finance',
			'https://v2.ellipsis.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'ellipsis-finance',
					zapper: 'ellipsis',
				},
			},
		],
	},
	{
		name: 'Empty Set Dollar',
		slug: 'empty-set-dollar',
		links: [
			'https://www.emptyset.finance',
		],
		colors: [
			'#312f32',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12440/thumb/esd_logo_circle.png?1603676421',
						chainId: 1,
						address: '0x36f3fd68e7325a35eb768f1aedaae9ea0689d723',
						name: 'Empty Set Dollar',
						symbol: 'ESD',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'esd',
				},
			},
		],
	},
	{
		name: 'Endaoment',
		slug: 'endaoment',
		links: [
			'https://endaoment.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'endaoment',
				},
			},
		],
	},
	{
		name: 'Enigma Economy',
		slug: 'enigmaeconomy',
		links: [
			'https://side.xyz/enigmaeconomy',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'enigmaeconomy',
				},
			},
		],
	},
	{
		name: 'EnjinStarter',
		slug: 'enjinstarter',
		links: [
			'https://enjinstarter.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'enjinstarter',
				},
			},
		],
	},
	{
		name: 'ENKI',
		slug: 'enki',
		links: [
			'https://www.enkixyz.com/home',
		],
		views: [
			{
				providers: {
					zapper: 'enki',
				},
			},
		],
	},
	{
		name: 'ENS',
		slug: 'ens',
		links: [
			'https://ens.domains',
		],
		colors: [
			'#5284ff',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/19785/thumb/acatxTm8_400x400.jpg?1635850140',
						chainId: 1,
						address: '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72',
						name: 'Ethereum Name Service',
						symbol: 'ENS',
						decimals: 18,
					},
				],
				nfts: [
					{
						name: 'ENS: Base Registrar',
						address: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
						symbol: 'ENS',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
					zapper: 'ens',
				},
			},
		],
	},
	{
		name: 'Ensuro',
		slug: 'ensuro',
		links: [
			'https://ensuro.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ensuro',
				},
			},
		],
	},
	{
		name: 'Entangle',
		slug: 'entangle',
		links: [
			'https://entangle.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'entangle',
				},
			},
		],
	},
	{
		name: 'Enzyme Finance',
		slug: 'enzyme',
		links: [
			'https://enzyme.finance',
		],
		colors: [
			'#01cabe',
			'#6852ed',
		], // ['#8167e0'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/605/thumb/Enzyme_Icon_Secondary.png?1611576629',
						chainId: 1,
						address: '0xec67005c4e498ec7f55e092bd1d35cbc47c91892',
						name: 'Enzyme',
						symbol: 'MLN',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme',
					zerionDefiSDK: [
						'Enzyme',
						'Melon',
					],
					zapper: 'enzyme-finance',
				},
			},
		],
	},
	{
		name: 'Epoch Island',
		slug: 'epoch-island',
		links: [
			'https://epochisland.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'epoch-island',
				},
			},
		],
	},
	{
		name: 'Epsylon',
		slug: 'epsylon',
		links: [
			'https://www.epsylon.finance',
			'https://x.com/epsylon_finance',
		],
		views: [
			{
				providers: {
					zapper: 'epsylon',
				},
			},
		],
	},
	{
		name: 'Equalizer Exchange',
		slug: 'equalizer-exchange',
		links: [
			'https://equalizer.exchange',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'equalizer-exchange',
					zapper: 'equalizer',
					// zapper: 'Equalizer',
				},
			},
		],
	},
	{
		name: 'Equation',
		slug: 'equation',
		links: [
			'https://equation.org',
		],
		views: [
			{
				name: 'Equation V2',
				slug: 'v2',
				links: [
					'https://equation.trade',
				],
				providers: {
					zapper: 'equation-v2',
				},
			},
			{
				name: 'Equation DAO',
				slug: 'equation-dao',
				chainId: undefined,
				providers: {
					zapper: 'Equation-DAO',
				},
			},
		],
	},
	{
		name: 'Equilibria',
		slug: 'equilibria',
		links: [
			'https://equilibria.fi/home',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'equilibria',
					zapper: 'equilibria',
					// zapper: 'equilibria-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'equilibria',
					zapper: 'equilibria',
					// zapper: 'equilibria-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'equilibria',
					zapper: 'equilibria',
					// zapper: 'equilibria-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'equilibria',
					zapper: 'equilibria',
					// zapper: 'equilibria-finance',
				},
			},
		],
	},
	{
		name: 'EspressoBot - 2049',
		slug: 'espresso-systems',
		links: [
			'https://espressobot.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Espresso-Systems',
				},
			},
		],
	},
	{
		name: 'Essentia',
		slug: 'essentia',
		links: [
			'https://essentia.one',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/2483/thumb/Essentia-token.jpg?1547036604',
						chainId: 1,
						address: '0xfc05987bd2be489accf0f509e44b0145d68240f7',
						name: 'Essentia',
						symbol: 'ESS',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'essentia',
				},
			},
		],
	},
	{
		name: 'Etch Market',
		slug: 'etch-market',
		links: [
			'https://www.etch.market',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'etch-market',
				},
			},
		],
	},
	{
		name: 'Eternal Legacy',
		slug: 'eternal-legacy',
		links: [
			'https://eternallegacy.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'eternal-legacy',
				},
			},
		],
	},
	{
		name: 'Ethena',
		slug: 'ethena',
		links: [
			'https://www.ethena.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'ethena',
					zapper: 'ethena',
				},
			},
		],
	},
	{
		name: 'EtherDelta',
		slug: 'ether-delta',
		links: [
			'https://buycoinnow.com/buy-ethereum',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ether-delta',
				},
			},
		],
	},
	{
		name: 'ether.fi',
		slug: 'ether-fi',
		links: [
			'https://ether.fi',
			'https://app.ether.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'ether.fi',
					zapper: 'ether-fi',
				},
			},
		],
	},
	{
		name: 'Ethereum',
		slug: 'ethereum',
		icon: EthereumIcon,
		colors: [
			'#627eea',
		],
		links: [
			'https://ethereum.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'ethereum',
				},
			},
			{
				name: 'Ethereum Staking',
				slug: 'ethereum-staking',
				links: [
					'https://ethereum.org',
				],
				chainId: 1,
				providers: {
					zapper: 'ethereum-staking',
				},
			},
		],
	},
	{
		name: 'Ethereum Credit Guild',
		slug: 'ethereum-credit-guild',
		links: [
			'https://app.creditguild.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ethereum-credit-guild',
				},
			},
		],
	},
	{
		name: 'Etherspot',
		slug: 'etherspot',
		colors: [
			'#f43c48',
			'#f67033',
		],
		links: [
			'https://etherspot.io',
		],
		views: [
			{
				chainId: 1,
			},
		],
	},
	{
		name: 'Ethos Reserve',
		slug: 'ethos-reserve',
		links: [
			'https://www.ethos.finance',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'ethos-reserve',
				},
			},
		],
	},
	{
		name: 'Ethscriptions',
		slug: 'ethscriptions',
		links: [
			'https://ethscriptions.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ethscriptions',
				},
			},
		],
	},
	{
		name: 'EthXY',
		slug: 'ethxy',
		links: [
			'https://ethxy.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'eth-xy',
				},
			},
		],
	},
	{
		name: 'Euclid Finance',
		slug: 'euclid-finance',
		links: [
			'https://euclidfinance.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'euclid-finance',
					zapper: 'euclid',
				},
			},
		],
	},
	{
		name: 'EulerBeats',
		slug: 'euler-beats',
		links: [
			'https://eulerbeats.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'euler-beats',
				},
			},
		],
	},
	{
		name: 'Euler',
		slug: 'euler',
		links: [
			'https://www.euler.finance',
			'https://app.euler.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'euler',
					zapper: 'euler',
				},
			},
		],
	},
	{
		name: 'EV Terminal',
		slug: 'ev-terminal',
		links: [
			'https://docs.evterminal.io',
		],
		views: [
			{
				name: 'sage',
				slug: 'sage',
				links: [
					'https://x.com/SageERC314',
				],
				chainId: undefined,
				providers: {
					zapper: 'sage',
				},
			},
		],
	},
	{
		name: 'EverRise',
		slug: 'everrise',
		links: [
			'https://www.everrise.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'everrise',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'everrise',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'everrise',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'everrise',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'everrise',
				},
			},
		],
	},
	{
		name: 'Evil Pepe',
		slug: 'evil-pepe',
		links: [
			'https://evilpepecoin.com/en',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'evil-pepe',
				},
			},
		],
	},
	{
		name: 'Evmoswap',
		slug: 'evmoswap',
		links: [
			'https://app.evmoswap.org',
		],
		colors: [
			'#121212',
		],
		views: [
			{
				chainId: 25,
				erc20Tokens: [
					{
						address: '0x181c262b973b22c307c646a67f64b76410d19b6b',
					},
				],
				providers: {
					zapper: 'evmoswap',
				},
			},
		],
	},
	{
		name: 'Exactly',
		slug: 'exactly',
		links: [
			'https://exact.ly',
			'https://app.exact.ly',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'exactly',
					zapper: 'exactly',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'exactly',
					zapper: 'exactly',
				},
			},
		],
	},
	{
		name: 'Excalibur',
		slug: 'excalibur',
		links: [
			'https://excalibur.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'excalibur',
				},
			},
		],
	},
	{
		name: 'Exponential',
		slug: 'exponential',
		links: [
			'https://exponential.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'exponential',
				},
			},
		],
	},
	{
		name: 'Extra Finance',
		slug: 'extra-finance',
		links: [
			'https://app.extrafi.io',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'extra-finance',
					zapper: 'extra',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'extra-finance',
					zapper: 'extra',
				},
			},
		],
	},
	{
		name: 'Factor',
		slug: 'factor',
		links: [
			'https://factor.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'factor',
				},
			},
		],
	},
	{
		name: 'Fantasy.Top',
		slug: 'fantasy-top',
		links: [
			'https://fantasy.top',
		],
		views: [
			{
				providers: {
					zapper: 'fantasy-top',
				},
			},
		],
	},
	{
		name: 'Fantohm',
		slug: 'fantohm',
		links: [
			'https://www.fantohm.com',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'fantohm',
				},
			},
		],
	},
	{
		name: 'Farcaster',
		slug: 'farcaster',
		links: [
			'https://www.farcaster.xyz',
		],
		colors: [
			'#8a63d2',
		],
		icon: FarcasterIcon,
		showCustomUi: true,
		views: [
			{
				showOn: ['Dashboard'],

				chainId: 10,

				contracts: [
					{
						name: 'IdRegistry',
						address: '0x00000000fc6c5f01fc30151999387bb99a9f489b',
					},
					{
						name: 'StorageRegistry',
						address: '0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d',
					},
					{
						name: 'KeyRegistry',
						address: '0x00000000fc1237824fb747abde0ff18990e59b7e',
					},
					{
						name: 'IdGateway',
						address: '0x00000000fc25870c6ed6b6c7e41fb078b7656f69',
					},
					{
						name: 'KeyGateway',
						address: '0x00000000fc56947c7e7183f8ca4b62398caadf0b',
					},
					{
						name: 'Bundler',
						address: '0x00000000fc04c910a0b5fea33b03e0447ad0b0aa',
					},
					{
						name: 'SignedKeyRequestValidator',
						address: '0x00000000fc700472606ed4fa22623acf62c60553',
					},
					{
						name: 'RecoveryProxy',
						address: '0x00000000fcb080a4d6c39a9354da9eb9bc104cd7',
					},
				],

				providers: {
					zapper: 'Farcaster',
				},
			},
		],
	},
	{
		name: 'FarFantasy',
		slug: 'farfantasy',
		links: [
			'https://farfantasy.com',
		],
		views: [
			{
				providers: {
					zapper: 'farfantasy',
				},
			},
		],
	},
	{
		name: 'Farworld',
		slug: 'farworld',
		links: [
			'https://farworld.gg',
		],
		views: [
			{
				providers: {
					zapper: 'farworld',
				},
			},
		],
	},
	{
		name: 'fBomb',
		slug: 'fbomb',
		links: [
			'https://www.fbomb.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fbomb',
				},
			},
		],
	},
	{
		name: 'Federated Nouns Governance Pool',
		slug: 'federated-nouns-governance-pool',
		links: [
			'https://www.federation.wtf/governance-pools',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'federated-nouns-governance-pool',
				},
			},
		],
	},
	{
		name: 'Fei Protocol',
		slug: 'fei',
		links: [
			'https://fei.money',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14570/thumb/ZqsF51Re_400x400.png?1617082206',
						chainId: 1,
						address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
						name: 'Fei USD',
						symbol: 'FEI',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'fei',
				},
			},
		],
	},
	{
		name: 'Fellowship',
		slug: 'fellowship',
		links: [
			'https://fellowship.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fellowship',
				},
			},
		],
	},
	{
		name: 'FerdyFlip',
		slug: 'ferdy-flip',
		links: [
			'https://www.ferdyflip.xyz',
			'https://x.com/ferdyfishh',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ferdy-flip',
				},
			},
		],
	},
	{
		name: 'Fetch.AI',
		slug: 'fetch-ai',
		links: [
			'https://fetch.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fetch',
				},
			},
		],
	},
	{
		name: 'Fiat24',
		slug: 'fiat24',
		links: [
			'https://fiat24.com',
			'https://app.fiat24.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fiat24',
				},
			},
		],
	},
	{
		name: 'FinNexus',
		slug: 'finnexus',
		links: [
			'https://www.finnexus.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					erc20TokensBySymbol['FNX'],
				],
				providers: {
					zerionDefiSDK: [
						'FinNexus',
					],
				},
			},
		],
	},
	{
		name: 'Firebird Finance',
		slug: 'firebird-finance',
		links: [
			'https://firebird.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'firebird-finance',
				},
			},
		],
	},
	{
		name: 'FireBot',
		slug: 'firebot',
		links: [
			'https://firebot.gg',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'firebot',
				},
			},
		],
	},
	{
		name: 'Fishing Frenzy',
		slug: 'fishing-frenzy',
		links: [
			'https://fishingfrenzy.co',
		],
		views: [
			{
				providers: {
					zapper: 'fishing-frenzy',
				},
			},
		],
	},
	{
		name: 'Fit Club',
		slug: 'fitclub',
		links: [
			'https://www.fitclub.tech',
		],
		views: [
			{
				providers: {
					zapper: 'fitclub',
				},
			},
		],
	},
	{
		name: 'Fixed Forex',
		slug: 'fixed-forex',
		links: [
			'https://fixedforex.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'fixed-forex',
				},
			},
		],
	},
	{
		name: 'Flamincome',
		slug: 'flamincome',
		links: [
			'https://flamincome.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'flamincome',
				},
			},
		],
	},
	{
		name: 'Flare',
		slug: 'flare',
		links: [
			'https://flare.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Flare',
				},
			},
		],
	},
	{
		name: 'Flat Money',
		slug: 'flat-money',
		links: [
			'https://flat.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'flat-money',
				},
			},
		],
	},
	{
		name: 'Float Capital',
		slug: 'float-capital',
		links: [
			'https://float.capital',
		],
		colors: [
			'#1c1d26',
		],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0x01309a1ec476871760d9ea454628500bccc1e011',
					},
				],
				providers: {
					zapper: 'float-capital',
				},
			},
			{
				chainId: 43114,
				providers: {
					zapper: 'float-capital',
				},
			},
		],
	},
	{
		name: 'Float Protocol',
		slug: 'float',
		links: [
			'https://floatprotocol.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/15502/thumb/FLOAT_LOGO-reduced_01.png?1621081152',
						chainId: 1,
						address: '0xb05097849bca421a3f51b249ba6cca4af4b97cb9',
						name: 'Float Protocol	Flo',
						symbol: 'FLOAT',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14116/thumb/FLOAT-Bank_LOGO-reduced_01.png?1616573606',
						chainId: 1,
						address: '0x24a6a37576377f63f194caa5f518a60f45b42921',
						name: 'Float Protocol',
						symbol: 'BANK',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'float-protocol',
				},
			},
		],
	},
	{
		name: 'Floki',
		slug: 'floki',
		links: [
			'https://floki.com',
		],
		views: [
			{
				providers: {
					zapper: 'floki',
				},
			},
		],
	},
	{
		name: 'FloorDAO',
		slug: 'floor-dao',
		links: [
			'https://floor.xyz',
		],
		colors: [
			'#14f5da',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xf59257e961883636290411c11ec5ae622d19455e',
					},
				],
				providers: {
					llamafolio: 'floor-dao',
					zapper: 'floor-dao',
				},
			},
		],
	},
	{
		name: 'Flooring Protocol',
		slug: 'flooring-protocol',
		links: [
			'https://www.flooring.io/collections',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Flooring-Protocol',
				},
			},
		],
	},
	{
		name: 'FLOOZ',
		slug: 'flooz',
		links: [
			'https://flooz.xyz/trade',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'flooz',
				},
			},
		],
	},
	{
		name: 'Florence Finance',
		slug: 'florence-finance',
		links: [
			'https://florence.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'florence-finance',
				},
			},
		],
	},
	{
		name: 'Florence Finance',
		slug: 'florencefinance',
		links: [
			'https://www.florence.finance',
		],
		views: [
			{
				providers: {
					zapper: 'florencefinance',
				},
			},
		],
	},
	{
		name: 'Fluence',
		slug: 'fluence',
		links: [
			'https://fluence.network',
		],
		views: [
			{
				providers: {
					zapper: 'fluence',
				},
			},
		],
	},
	{
		name: 'Fluid',
		slug: 'fluid',
		links: [
			'https://fluid.instadapp.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'fluid',
				},
			},
		],
	},
	{
		name: 'Fluidity',
		slug: 'fluidity',
		links: [
			'https://fluidity.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fluidity',
				},
			},
		],
	},
	{
		name: 'Flux Finance',
		slug: 'flux-finance',
		links: [
			'https://fluxfinance.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'flux-finance',
					zapper: 'flux-finance',
				},
			},
		],
	},
	{
		name: 'Forgotten Runes',
		slug: 'forgotten-runes',
		links: [
			'https://www.forgottenrunes.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'forgotten-runes',
				},
			},
		],
	},
	{
		name: 'Fortress Loans',
		slug: 'fortress-loans',
		links: [
			'https://fortress.loans',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'fortress-loans',
				},
			},
		],
	},
	{
		name: 'Foundation',
		slug: 'foundation',
		links: [
			'https://foundation.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'foundation',
				},
			},
		],
	},
	{
		name: 'Fractional Art',
		slug: 'fractional-art',
		links: [
			'https://fractional.art',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'fractional-art',
				},
			},
		],
	},
	{
		name: 'Frame',
		slug: 'frame',
		links: [
			'https://frametoken.us',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'frame',
				},
			},
		],
	},
	{
		name: 'Frax',
		slug: 'frax',
		links: [
			'https://frax.finance',
		],
		views: [
			{
				name: 'Frax V3',
				slug: 'frax-v3',
				chainId: undefined,
				providers: {
					zapper: 'frax-v3',
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13422/thumb/frax_logo.png?1608476506',
						chainId: 1,
						address: '0x853d955acef822db058eb8505911ed77f175b99e',
						name: 'Frax',
						symbol: 'FRAX',
						decimals: 18,
					},
					// erc20TokensBySymbol['FSX'],
				],
				providers: {
					llamafolio: 'frax-finance',
					zapper: 'frax',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'frax-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'frax-finance',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'frax-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'frax-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'frax-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'frax-finance',
				},
			},
			{
				name: 'Frax Swap',
				slug: 'swap',
				providers: {
					zapper: 'frax-swap',
				},
			},
			{
				name: 'Frax Lend',
				slug: 'lend',
				links: [
					'https://app.frax.finance/fraxlend/available-pairs',
				],
				chainId: 1,
				providers: {
					llamafolio: 'fraxlend',
					zapper: 'frax-lend',
				},
			},
		],
	},
	{
		name: 'Fren Pet',
		slug: 'fren-pet',
		links: [
			'https://frenpet.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fren-pet',
				},
			},
		],
	},
	{
		name: 'Frensly',
		slug: 'frensly',
		links: [
			'https://frensly.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Frensly',
				},
			},
		],
	},
	{
		name: 'friend.tech',
		slug: 'friend-tech',
		links: [
			'https://www.friend.tech',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'friend-tech',
				},
			},
		],
	},
	{
		name: 'FT33 DAO',
		slug: 'friendtech33-dao',
		links: [
			'https://friendtech33.xyz',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'ft33-dao',
					zapper: 'ft-three-three',
				},
			},
		],
	},
	{
		name: 'Frogswap',
		slug: 'frog-swap',
		links: [
			'https://frogswap.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'frog-swap',
				},
			},
		],
	},
	{
		name: 'FTSX',
		slug: 'ftsx',
		links: [
			'https://ftsx.tech',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ftsx',
				},
			},
		],
	},
	{
		name: 'Fuel',
		slug: 'fuel',
		links: [
			'https://fuel.network',
		],
		views: [
			{
				providers: {
					zapper: 'fuel',
				},
			},
		],
	},
	{
		name: 'Fuji Finance',
		slug: 'fuji-finance',
		links: [
			'https://v1.fuji.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fuji-finance',
				},
			},
		],
	},
	{
		name: 'Funarcade',
		slug: 'funarcade',
		links: [
			'https://funarcade.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'funarcade',
				},
			},
		],
	},
	{
		name: 'Fungify',
		slug: 'fungify',
		links: [
			'https://fungify.it',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fungify',
				},
			},
		],
	},
	{
		name: 'Furucombo',
		slug: 'furucombo',
		links: [
			'https://furucombo.app',
		],
		colors: [
			'#1b1b21',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'furucombo',
				},
			},
		],
	},
	{
		name: 'Futureswap',
		slug: 'futureswap',
		links: [
			'https://www.futureswap.com',
		],
		views: [
			{
				name: 'Futureswap V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14520/thumb/futureswap_logo.png?1634122916',
						chainId: 1,
						address: '0x0e192d382a36de7011f795acc4391cd302003606',
						name: 'Futureswap',
						symbol: 'FST',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/futureswap/futureswap-v1',
					zapper: 'futureswap',
				},
			},
		],
	},
	{
		name: 'f(x) protocol',
		slug: 'fx-protocol',
		links: [
			'https://fx.aladdin.club',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'fx-protocol',
					zapper: 'fx-protocol',
				},
			},
		],
	},
	{
		name: 'FXDX',
		slug: 'fxdx',
		links: [
			'https://fxdx.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'fxdx-exchange',
				},
			},
		],
	},
	{
		name: 'Fyde',
		slug: 'fyde',
		links: [
			'https://www.fyde.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'fyde-protocol',
				},
			},
			{
				name: 'Fyde Treasury Protocol',
				slug: 'fyde-treasury-protocol',
				chainId: undefined,
				providers: {
					zapper: 'fyde-treasury-protocol',
				},
			},
		],
	},
	{
		name: 'Gains Network',
		slug: 'gains-network',
		links: [
			'https://gainsnetwork.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'gains-network',
					zapper: 'gains-network',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'gains-network',
					zapper: 'gains-network',
				},
			},
		],
	},
	{
		name: 'Gala Games',
		slug: 'gala-games',
		links: [
			'https://app.gala.games',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gala-games',
				},
			},
		],
	},
	{
		name: 'Galxe',
		slug: 'galxe',
		links: [
			'https://galxe.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'galxe',
				},
			},
		],
	},
	{
		name: 'Gambit Trade',
		slug: 'gambit-trade',
		links: [
			'https://gambit.trade',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'gambit-trade',
				},
			},
		],
	},
	{
		name: 'GameSwift',
		slug: 'gameswift',
		links: [
			'https://gameswift.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'GameSwift',
				},
			},
		],
	},
	{
		name: 'Gamma Strategies',
		slug: 'gamma-strategies',
		links: [
			'https://www.gamma.xyz',
			'https://www.gammastrategies.org',
		],
		colors: [
			'#FF0025',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x6bea7cfef803d1e3d5f7c0103f7ded065644e197',
					},
				],
				providers: {
					llamafolio: 'gamma',
					zapper: 'gamma-strategies',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 1284,
				providers: {
					llamafolio: 'gamma',
				},
			},
			{
				chainId: 42220,
				providers: {
					llamafolio: 'gamma',
				},
			},
		],
	},
	{
		name: 'Gangster Arena',
		slug: 'gangster-arena',
		links: [
			'https://gangsterarena.com/login',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gangster-arena',
				},
			},
		],
	},
	{
		name: 'Gas.zip',
		slug: 'gas-zip',
		links: [
			'https://www.gas.zip',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Gas-zip',
				},
			},
		],
	},
	{
		name: 'Gaslite Drop',
		slug: 'gaslitedrop',
		links: [
			'https://drop.gaslite.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gaslitedrop',
				},
			},
		],
	},
	{
		name: 'Gearbox',
		slug: 'gearbox',
		links: [
			'https://gearbox.fi ',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gearbox',
				},
			},
		],
	},
	{
		name: 'Geist',
		slug: 'geist',
		links: [
			'https://geist.finance',
		],
		colors: [
			'#bcfd71',
		],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0xd8321aa83fb0a4ecd6348d4577431310a6e0814d',
					},
				],
				providers: {
					llamafolio: 'geist',
					zapper: 'geist',
				},
			},
		],
	},
	{
		name: 'Gelato',
		slug: 'gelato',
		links: [
			'https://www.gelato.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Gelato',
				},
			},
		],
	},
	{
		name: 'Gemach DAO',
		slug: 'gemach-dao',
		links: [
			'https://gemach.io',
			'https://glend.gemach.io',
		],
		views: [
			{
				name: 'Tender.fi',
				slug: 'tender-fi',
				links: [
					'https://www.tender.fi',
				],
				chainId: undefined,
				providers: {
					zapper: 'tender-fi',
					// zapper: 'Tender-fi',
				},
			},
		],
	},
	{
		name: 'Gemini',
		slug: 'gemini',
		links: [
			'https://www.gemini.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gemini',
				},
			},
		],
	},
	{
		name: 'Generative Dungeon',
		slug: 'generative-dungeon',
		links: [
			'https://generativedungeon.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'generative-dungeon',
				},
			},
		],
	},
	{
		name: 'Genesis LRT',
		slug: 'genesis-lrt',
		links: [
			'https://www.genesislrt.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'genesis-lrt',
				},
			},
		],
	},
	{
		name: 'GenomesDAO',
		slug: 'genomesdao',
		links: [
			'https://genomes.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'GenomesDAO',
				},
			},
		],
	},
	{
		name: 'Gensokishi',
		slug: 'gensokishi',
		links: [
			'https://genso.game',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'gensokishi',
				},
			},
		],
	},
	{
		name: 'GET Protocol',
		slug: 'get-protocol',
		links: [
			'https://www.get-protocol.io',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'get-protocol',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'get-protocol',
				},
			},
		],
	},
	{
		name: 'GhostDAG',
		slug: 'ghosdag',
		links: [
			'https://www.ghostdag.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ghosdag',
				},
			},
		],
	},
	{
		name: 'GIBXSwap',
		slug: 'gibx-swap',
		links: [
			'https://gibxswap.io',
		],
		views: [
			{
				providers: {
					zapper: 'gibx-swap',
				},
			},
		],
	},
	{
		name: 'Gitcoin',
		slug: 'gitcoin',
		links: [
			'https://gitcoin.co',
		],
		colors: [
			'#00433B',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'gitcoin',
					zapper: 'gitcoin',
				},
			},
		],
	},
	{
		name: 'Giveth',
		slug: 'giveth',
		links: [
			'https://giveth.io',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'giveth',
				},
			},
		],
	},
	{
		name: 'Glori Finance',
		slug: 'glori-finance',
		links: [
			'https://www.glori.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'glori-finance',
				},
			},
		],
	},
	{
		name: 'Glow Labs',
		slug: 'glow-labs',
		links: [
			'https://glowlabs.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'glow-labs',
				},
			},
		],
	},
	{
		name: 'gm. studio',
		slug: 'gm-studio',
		links: [
			'https://www.gmstudio.art',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gm-studio',
				},
			},
		],
	},
	{
		name: 'gm.io',
		slug: 'gm-io',
		links: [
			'https://gm.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gm.io',
				},
			},
		],
	},
	{
		name: 'GMD Protocol',
		slug: 'gmdprotocol',
		links: [
			'https://gmdprotocol.com',
		],
		views: [
			{
				providers: {
					zapper: 'gmdprotocol',
				},
			},
		],
	},
	{
		name: 'GMX',
		slug: 'gmx',
		links: [
			'https://gmx.io',
		],
		colors: [
			'#2d42fc',
		],
		views: [
			{
				name: 'GMX V2',
				slug: 'v2',
				chainId: 42161,
				providers: {
					llamafolio: 'gmx-v2',
					zapper: 'gmx-v2',
				},
			},
			{
				name: 'GMX V2',
				slug: 'v2',
				chainId: 43114,
				providers: {
					llamafolio: 'gmx-v2',
					zapper: 'gmx-v2',
				},
			},
			{
				name: 'GMX V1',
				slug: 'v1',
				chainId: 42161,
				erc20Tokens: [
					{
						address: '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a',
					},
				],
				providers: {
					llamafolio: 'gmx',
					zapper: 'gmx',
				},
			},
			{
				name: 'GMX V1',
				slug: 'v1',
				chainId: 43114,
				providers: {
					llamafolio: 'gmx-v1',
					zapper: 'gmx',
				},
			},
		],
	},
	{
		name: 'Gnars',
		slug: 'gnars',
		links: [
			'https://www.gnars.wtf',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gnars',
				},
			},
		],
	},
	{
		name: 'GnomeLand',
		slug: 'gnomeland',
		links: [
			'https://www.gnomeland.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gnomeland',
				},
			},
		],
	},
	{
		name: 'Gnosis',
		slug: 'gnosis',
		links: [
			'https://gnosis.io',
		],
		views: [
			{
				name: 'Gnosis Protocol',
				slug: 'protocol',
				links: [
					'https://gnosis.io/protocol',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/662/thumb/logo_square_simple_300px.png?1609402668',
						chainId: 1,
						address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
						name: 'Gnosis',
						symbol: 'GNO',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'gnosis-protocol-v1',
					zerionDefiSDK: [
						'Gnosis Protocol',
					],
					theGraph: 'https://api.thegraph.com/subgraphs/name/gnosis/protocol',
				},
			},
			{
				name: 'Gnosis Protocol',
				slug: 'protocol',
				links: [
					'https://gnosis.io/protocol',
				],
				chainId: 100,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/gnosis/protocol-xdai',
				},
			},
			{
				name: 'Gnosis Safe',
				slug: 'safe',
				links: [
					'https://gnosis.io/protocol',
				],
				chainId: 100,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-mainnet',
				},
			},
		],
	},
	{
		name: 'Gnosis Chain',
		slug: 'gnosis-chain',
		links: [
			'https://www.gnosis.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gnosis',
				},
			},
		],
	},
	{
		name: 'GoGoPool',
		slug: 'gogopool',
		links: [
			'https://www.gogopool.com',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'gogopool',
					zapper: 'gogopool',
				},
			},
		],
	},
	{
		name: 'Gold Retriever',
		slug: 'gold-retriever',
		links: [
			'https://goldretriever.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gold-retriever',
				},
			},
		],
	},
	{
		name: 'Goldfinch',
		slug: 'goldfinch',
		links: [
			'https://goldfinch.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'goldfinch',
					zapper: 'goldfinch',
				},
			},
		],
	},
	{
		name: 'Goldlink',
		slug: 'goldlink',
		links: [
			'https://www.goldlink.io',
		],
		views: [
			{
				providers: {
					zapper: 'goldlink',
				},
			},
		],
	},
	{
		name: 'Golem Foundation',
		slug: 'golem-foundation',
		links: [
			'https://golem.foundation',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'golem-foundation',
				},
			},
		],
	},
	{
		name: 'Gondi',
		slug: 'gondi',
		links: [
			'https://www.gondi.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gondi',
				},
			},
		],
	},
	{
		name: 'The Gong',
		slug: 'gong',
		links: [
			'https://etherscan.io/address/0xc3f1aae9459ff9f8bbcbd144f70ca1fc01eb3362#code',
		],
		views: [
			{
				chainId: 1,
				contracts: [
					{
						address: '0xc3f1aae9459ff9f8bbcbd144f70ca1fc01eb3362',
					},
				],
				providers: {
					zapper: 'gong',
				},
			},
		],
	},
	{
		name: 'Gooch Island',
		slug: 'gooch-island',
		links: [
			'https://gooch.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gooch-island',
				},
			},
		],
	},
	{
		name: 'goodblocks',
		slug: 'good-blocks',
		links: [
			'https://goodblocks.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'good-blocks',
				},
			},
		],
	},
	{
		name: 'Good Entry',
		slug: 'good-entry',
		links: [
			'https://goodentry.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'good-entry',
				},
			},
		],
	},
	{
		name: 'Good Ghosting',
		slug: 'good-ghosting',
		links: [
			'https://goodghosting.com',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'good-ghosting',
				},
			},
			{
				chainId: 42220,
				providers: {
					zapper: 'good-ghosting',
				},
			},
		],
	},
	{
		name: 'GoodEntry',
		slug: 'goodentry',
		links: [
			'https://goodentry.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'goodentry',
				},
			},
		],
	},
	{
		name: 'Governor DAO',
		slug: 'governor',
		links: [
			'https://governordao.org',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13140/thumb/GDAOlogo2-bird.png?1605591842',
						chainId: 1,
						address: '0x515d7e9d75e2b76db60f8a051cd890eba23286bc',
						name: 'Governor DAO',
						symbol: 'GDAO',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'governor-dao',
				},
			},
		],
	},
	{
		name: 'Govi DAO',
		slug: 'govi-dao',
		links: [
			'https://github.com/govi-dao/cvi-contracts',
		],
		views: [
			{
				providers: {
					zapper: 'govi-dao',
				},
			},
		],
	},
	{
		name: 'Granary Finance',
		slug: 'granary-finance',
		links: [
			'https://granary.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'granary-finance',
					zapper: 'granary-finance',
				},
			},
		],
	},
	{
		name: 'Gravita Protocol',
		slug: 'gravita-protocol',
		links: [
			'https://www.gravitaprotocol.com',
			'https://app.gravitaprotocol.com',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'gravita-protocol',
					zapper: 'gravita',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'gravita-protocol',
					zapper: 'gravita',
				},
			},
		],
	},
	{
		name: 'Gravity Bridge',
		slug: 'gravity-bridge',
		links: [
			'https://www.gravitybridge.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gravity-bridge',
				},
			},
		],
	},
	{
		name: 'Grim',
		slug: 'grim',
		links: [
			'https://www.grim.finance',
		],
		colors: [
			'#c11828',
		],
		views: [
			{
				chainId: 250,
				providers: {
					zapper: 'grim',
				},
			},
		],
	},
	{
		name: 'Gro',
		slug: 'gro',
		links: [
			'https://www.gro.xyz',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/18673/thumb/613f171979749061aaa1edf9_Icon-GRO-256x256-Square.png?1632876204',
						chainId: 1,
						address: '0x3ec8798b81485a254928b70cda1cf0a2bb0b74d7',
						name: 'Gro DAO Token',
						symbol: 'GRO',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'gro',
					zapper: 'gro',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'gro',
				},
			},
		],
	},
	{
		name: 'GuildFi',
		slug: 'guildfi',
		links: [
			'https://guildfi.com',
		],
		views: [
			{
				providers: {
					zapper: 'guildfi',
				},
			},
		],
	},
	{
		name: 'Guiser',
		slug: 'guiser',
		links: [
			'https://guiser-stake.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'guiser',
				},
			},
		],
	},
	{
		name: 'Gyro',
		slug: 'gyro',
		links: [
			'https://gyro.money',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'gyro',
				},
			},
		],
	},
	{
		name: 'Gyroscope',
		slug: 'gyroscope',
		links: [
			'https://gyro.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'gyroscope',
				},
			},
		],
	},
	{
		name: 'Hakuswap',
		slug: 'hakuswap',
		links: [
			'https://hakuswap.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hakuswap',
				},
			},
		],
	},
	{
		name: 'HaloFi',
		slug: 'halofi',
		links: [
			'https://app.halofi.me',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'halofi',
				},
			},
		],
	},
	{
		name: 'handle.fi',
		slug: 'handle-fi',
		links: [
			'https://www.handle.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'handle-fi',
				},
			},
		],
	},
	{
		name: 'Handshake',
		slug: 'handshake',
		links: [
			'https://www.transient.fun/handshake/feed',
		],
		views: [
			{
				providers: {
					zapper: 'handshake',
				},
			},
		],
	},
	{
		name: 'Harvest Finance',
		slug: 'harvest',
		links: [
			'https://harvest.finance',
		],
		colors: [
			'#fffce6',
			'#bbe3e2',
		], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12304/thumb/Harvest.png?1613016180',
						chainId: 1,
						address: '0xa0246c9032bc3a600820415ae600c6388619a14d',
						name: 'Harvest Finance',
						symbol: 'FARM',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'harvest',
					zerionDefiSDK: [
						'Harvest',
						'Harvest • Profit Sharing',
					],
				},
			},
		],
	},
	{
		name: 'Harvest',
		slug: 'harvest',
		links: [
			'https://harvest.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'harvest',
				},
			},
		],
	},
	{
		name: 'Hashflow',
		slug: 'hashflow',
		links: [
			'https://app.hashflow.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hashflow',
				},
			},
			{
				name: 'Hashverse by Hashflow',
				slug: 'hashverse',
				links: [
					'https://www.hashflow.com/hashverse/home',
				],
				chainId: undefined,
				providers: {
					zapper: 'hashverse',
				},
			},
		],
	},
	{
		name: 'Hats.Finance',
		slug: 'hats-finance',
		links: [
			'https://hats.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hats-finance',
				},
			},
		],
	},
	{
		name: 'Hector Network',
		slug: 'hector-network',
		links: [
			'https://hector.network',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'hector-network',
					zapper: 'hector-network',
				},
			},
			{
				chainId: 56,
				providers: {
					zapper: 'hector-network',
				},
			},
		],
	},
	{
		name: 'HedgeFarm',
		slug: 'hedgefarm',
		links: [
			'https://www.hedgefarm.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hedgefarm',
				},
			},
		],
	},
	{
		name: 'Hedgey',
		slug: 'hedgey',
		links: [
			'https://hedgey.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hedgey',
				},
			},
		],
	},
	{
		name: 'Hedgey',
		slug: 'hedgey',
		links: [
			'https://app.hedgey.finance',
		],
		views: [
			{
				providers: {
					zapper: 'hedgy',
				},
			},
		],
	},
	{
		name: 'Hedron',
		slug: 'hedron',
		links: [
			'https://hedron.pro',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hedron',
				},
			},
		],
	},
	{
		name: 'Hegic',
		slug: 'hegic',
		links: [
			'https://www.hegic.co',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12454/thumb/new.png?1628668523',
						chainId: 1,
						address: '0x584bc13c7d411c00c01a62e8019472de68768430',
						name: 'Hegic',
						symbol: 'HEGIC',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13969/thumb/ezgif-4-b5306690cb32.jpg?1613385300',
						chainId: 1,
						address: '0xad7ca17e23f13982796d27d1e6406366def6ee5f',
						name: 'rHEGIC2',
						symbol: 'RHEGIC2',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13074/thumb/zhegic_logo.png?1604903561',
						chainId: 1,
						address: '0x837010619aeb2ae24141605afc8f66577f6fb2e7',
						name: 'zHEGIC',
						symbol: 'ZHEGIC',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'hegic',
				},
			},
			{
				name: 'zLOT Finance',
				slug: 'zlot',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13073/thumb/z-LOT-logo-transparent.png?1604900416',
						chainId: 1,
						address: '0xa8e7ad77c60ee6f30bac54e2e7c0617bd7b5a03e',
						name: 'zLOT',
						symbol: 'ZLOT',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'zlot',
					zerionDefiSDK: [
						'zlot.finance',
					],
				},
			},
		],
	},
	{
		name: 'Helio',
		slug: 'helio',
		links: [
			'https://helio.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'helio',
				},
			},
		],
	},
	{
		name: 'Helix',
		slug: 'helix',
		links: [
			'https://helixbridge.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'helix',
				},
			},
		],
	},
	{
		name: 'HELLO Labs',
		slug: 'hello-labs',
		links: [
			'https://bridge.hello.one/bridge/getting-started',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'HELLO-Labs',
				},
			},
		],
	},
	{
		name: 'Helooo',
		slug: 'helooo',
		links: [
			'',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Helooo',
				},
			},
		],
	},
	{
		name: 'Hercules',
		slug: 'hercules',
		links: [
			'https://www.hercules.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'hercules',
				},
			},
		],
	},
	{
		name: 'Hermes Protocol',
		slug: 'hermes-protocol',
		links: [
			'https://hermes.maiadao.io',
		],
		views: [
			{
				providers: {
					zapper: 'hermes-protocol',
				},
			},
		],
	},
	{
		name: 'Heroes of Mavia',
		slug: 'heroes-of-mavia',
		links: [
			'https://www.mavia.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'heroes-of-mavia',
				},
			},
		],
	},
	{
		name: 'Heroglyphs',
		slug: 'heroglyphs',
		links: [
			'https://warpcast.com/heroglyphs',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'heroglyphs',
				},
			},
		],
	},
	{
		name: 'Hex',
		slug: 'hex',
		links: [
			'https://hex.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'hex',
					zapper: 'hex',
				},
			},
		],
	},
	{
		name: 'HiPvP',
		slug: 'hi-pvp',
		links: [
			'https://www.hipvpgame.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hi-pvp',
				},
			},
		],
	},
	{
		name: 'Hidden Hand',
		slug: 'hidden-hand',
		links: [
			'https://hiddenhand.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hidden-hand',
				},
			},
		],
	},
	{
		name: 'Hifi Finance',
		slug: 'hifi-finance',
		links: [
			'https://hifi.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hifi-finance',
				},
			},
		],
	},
	{
		name: 'Highlight',
		slug: 'highlight',
		links: [
			'https://highlight.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'highlight',
				},
			},
		],
	},
	{
		name: 'Hippo Swap',
		slug: 'hipposwap',
		links: [
			'https://hipposwap.finance',
		],
		views: [
			{
				providers: {
					zapper: 'hipposwap',
				},
			},
		],
	},
	{
		name: 'HMX',
		slug: 'hmx',
		links: [
			'https://hmx.org/arbitrum',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'hmx',
					// zapper: 'HMX',
					llamafolio: 'hmx',
				},
			},
		],
	},
	{
		name: 'Holdstation',
		slug: 'hold-station',
		links: [
			'https://holdstation.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hold-station',
				},
			},
		],
	},
	{
		name: 'Hollywood X Pepe',
		slug: 'hollywood-x-pepe',
		links: [
			'https://hollywoodxpepe.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hollywood-x-pepe',
				},
			},
		],
	},
	{
		name: 'Holograph',
		slug: 'holograph',
		links: [
			'https://www.holograph.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Holograph',
				},
			},
		],
	},
	{
		name: 'Holonym',
		slug: 'holonym',
		links: [
			'https://holonym.id',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'holonym',
				},
			},
		],
	},
	{
		name: 'Honeyswap',
		slug: 'honeyswap',
		links: [
			'https://honeyswap.org',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'honeyswap',
					zapper: 'honeyswap',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'honeyswap',
					zapper: 'honeyswap',
				},
			},
		],
	},
	{
		name: 'Honor World',
		slug: 'honorworld',
		links: [
			'https://app.honorworld.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'honorworld',
				},
			},
		],
	},
	{
		name: 'Hooked',
		slug: 'hooked',
		links: [
			'https://hooked.io',
		],
		views: [
			{
				providers: {
					zapper: 'hooked',
				},
			},
		],
	},
	{
		name: 'Hop',
		slug: 'hop',
		links: [
			'https://hop.exchange',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'hop-protocol',
					zapper: 'hop',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'hop-protocol',
					zapper: 'hop',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'hop-protocol',
					zapper: 'hop',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'hop-protocol',
					zapper: 'hop',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'hop-protocol',
					zapper: 'hop',
				},
			},
		],
	},
	{
		name: 'Hope.money',
		slug: 'hope-money',
		links: [
			'https://hope.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Hope-money',
				},
			},
		],
	},
	{
		name: 'HOPR',
		slug: 'hopr',
		links: [
			'https://hoprnet.org',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'hopr',
					zapper: 'hopr',
				},
			},
		],
	},
	{
		name: 'Horiza',
		slug: 'horiza',
		links: [
			'https://horiza.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'horiza',
				},
			},
		],
	},
	{
		name: 'HorizonDEX',
		slug: 'horizon-dex',
		links: [
			'https://horizondex.io',
			'https://app.horizondex.io/swap',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'horizon-dex',
				},
			},
		],
	},
	{
		name: 'Horizon Protocol',
		slug: 'horizon-protocol',
		links: [
			'https://horizonprotocol.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'horizon-protocol',
				},
			},
		],
	},
	{
		name: 'Houdini Swap',
		slug: 'houdini-swap',
		links: [
			'https://houdiniswap.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'houdini-swap',
				},
			},
		],
	},
	{
		name: 'House Money',
		slug: 'house-money',
		links: [
			'https://www.housemoney.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'house-money',
				},
			},
		],
	},
	{
		name: 'Hummus Exchange',
		slug: 'hummus-exchange',
		links: [
			'https://www.hummus.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'hummus-exchange',
				},
			},
		],
	},
	{
		name: 'Hundred Finance',
		slug: 'hundred-finance',
		links: [
			'https://hundred.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'hundred-finance',
					zapper: 'hundred-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'hundred-finance',
					zapper: 'hundred-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'hundred-finance',
					zapper: 'hundred-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'hundred-finance',
					zapper: 'hundred-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'hundred-finance',
					zapper: 'hundred-finance',
				},
			},
			{
				chainId: 1666600000,
				providers: {
					zapper: 'hundred-finance',
				},
			},
		],
	},
	{
		name: 'Hunny Play',
		slug: 'hunny-play',
		links: [
			'https://hunnyplay.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hunny-play',
				},
			},
		],
	},
	{
		name: 'Hunt Town',
		slug: 'hunt-town',
		links: [
			'https://hunt.town',
		],
		views: [
			{
				providers: {
					zapper: 'hunt-town',
				},
			},
		],
	},
	{
		name: 'HurricaneSwap',
		slug: 'hurricaneswap',
		links: [
			'https://hurricaneswap.com',
		],
		views: [
			{
				providers: {
					zapper: 'hurricaneswap',
				},
			},
		],
	},
	{
		name: 'HV-MTL',
		slug: 'hv-mtl',
		links: [
			'https://hv-mtl.com',
		],
		views: [
			{
				name: 'HV-MTL Forge',
				slug: 'forge',
				chainId: undefined,
				providers: {
					zapper: 'hv-mtl-forge',
				},
			},
		],
	},
	{
		name: 'HyperJump',
		slug: 'hyperjump',
		links: [
			'https://hyperjump.app',
			'https://x.com/Hyperjump_fi',
		],
		views: [
			{
				providers: {
					zapper: 'hyperjump',
				},
			},
		],
	},
	{
		name: 'Hyperlane',
		slug: 'hyperlane',
		links: [
			'https://www.hyperlane.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hyperlane',
				},
			},
		],
	},
	{
		name: 'Hyperliquid',
		slug: 'hyperliquid',
		links: [
			'https://hyperliquid.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hyperliquid',
				},
			},
		],
	},
	{
		name: 'Hyperlock Finance',
		slug: 'hyperlock-finance',
		links: [
			'https://hyperlock.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'hyperlock-finance',
				},
			},
		],
	},
	{
		name: 'Hypersub',
		slug: 'hypersub',
		links: [
			'https://www.hypersub.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'hypersub',
				},
			},
		],
	},
	{
		name: 'IceCreamSwap',
		slug: 'ice-cream-swap',
		links: [
			'https://icecreamswap.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ice-cream-swap',
				},
			},
		],
	},
	{
		name: 'Ichi',
		slug: 'ichi',
		links: [
			'https://www.ichi.org',
		],
		views: [
			{
				providers: {
					zapper: 'ichi',
				},
			},
		],
	},
	{
		name: 'Icosa',
		slug: 'icosa',
		links: [
			'https://icosa.pro',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'icosa',
				},
			},
		],
	},
	{
		name: 'Idle Finance',
		slug: 'idle',
		links: [
			'https://idle.finance',
		],
		colors: [
			'#0B50B0',
			'#0F6BEB',
			'#6FA4F2',
		],
		views: [
			{
				name: 'Idle Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13286/thumb/token-logo.png?1607004948',
						chainId: 1,
						address: '0x875773784af8135ea0ef43b5a374aad105c5d39e',
						name: 'IDLE',
						symbol: 'IDLE',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'Idle',
					],
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11901/thumb/idledai_32.png?1595990312',
						chainId: 1,
						address: '0x3fe7940616e5bc47b0775a0dccf6237893353bb4',
						name: 'IdleDAI	Best Yield',
						symbol: 'IDLEDAIYIELD',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11934/thumb/idlesusdv3mmaxyield_32.png?1596263703',
						chainId: 1,
						address: '0xf52cdcd458bf455aed77751743180ec4a595fd3f',
						name: 'IdleSUSD	Yield ',
						symbol: 'IDLESUSDYIELD',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11930/thumb/idleusdc-safe.png?1596263257',
						chainId: 1,
						address: '0x3391bc034f2935ef0e1e41619445f998b2680d35',
						name: 'IdleUSDC	Risk Adju',
						symbol: 'IDLEUSDCSAFE',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11933/thumb/idleusdtv3maxyield_32.png?1596263688',
						chainId: 1,
						address: '0xf34842d05a1c888ca02769a633df37177415c2f8',
						name: 'IdleUSDT	Yield ',
						symbol: 'IDLEUSDTYIELD',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11929/thumb/idledai-safe.png?1596263241',
						chainId: 1,
						address: '0xa14ea0e11121e6e951e87c66afe460a00bcd6a16',
						name: 'IdleDAI	Risk Adjus',
						symbol: 'IDLEDAISAFE',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11931/thumb/idleusdt-safe.png?1596263270',
						chainId: 1,
						address: '0x28fac5334c9f7262b3a3fe707e250e01053e07b5',
						name: 'IdleUSDT	Risk Adju',
						symbol: 'IDLEUSDTSAFE',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11935/thumb/idletusdv3mMaxyield_32.png?1596263719',
						chainId: 1,
						address: '0xc278041fdd8249fe4c1aad1193876857eea3d68c',
						name: 'IdleTUSD	Best Yiel',
						symbol: 'IDLETUSDYIELD',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11936/thumb/idlewbtcv3maxyield_32.png?1596263736',
						chainId: 1,
						address: '0x8c81121b15197fa0eeaee1dc75533419dcfd3151',
						name: 'IdleWBTC	Best Yiel',
						symbol: 'IDLEWBTCYIELD',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11932/thumb/idleusdcv3_32.png?1596263673',
						chainId: 1,
						address: '0x5274891bec421b39d23760c04a6755ecb444797c',
						name: 'IdleUSDC	Yield ',
						symbol: 'IDLEUSDCYIELD',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'idle',
					theGraph: 'https://api.thegraph.com/subgraphs/name/idle-finance/idle',
					zapper: 'idle',
					zerionDefiSDK: [
						'Idle • Early Rewards',
						'Idle • Risk-Adjusted',
					],
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'idle',
				},
			},
		],
	},
	{
		name: 'iGames',
		slug: 'igames',
		links: [
			'https://igames.world',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'igames',
				},
			},
		],
	},
	{
		name: 'Illuvium',
		slug: 'illuvium',
		links: [
			'https://www.illuvium.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14468/thumb/ILV.JPG?1617182121',
						chainId: 1,
						address: '0x767fe9edc9e0df98e07454847909b5e959d7ca0e',
						name: 'Illuvium',
						symbol: 'ILV',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'illuvium',
					zapper: 'illuvium',
				},
			},
		],
	},
	{
		name: 'Imaginary Rides',
		slug: 'imaginary-rides',
		links: [
			'https://rides.imaginaryones.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'imaginary-rides',
				},
			},
		],
	},
	{
		name: 'imgnAI',
		slug: 'imgnai',
		links: [
			'https://app.imgnai.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'imgnai',
				},
			},
		],
	},
	{
		name: 'Immutable X Bridge',
		slug: 'immutable-x-bridge',
		links: [
			'https://www.immutable.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'immutable-x-bridge',
				},
			},
		],
	},
	{
		name: 'Impermax',
		slug: 'impermax',
		links: [
			'https://www.impermax.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'impermax',
				},
			},
			{
				chainId: 1,
				providers: {
					zapper: 'impermax',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'impermax',
				},
			},
		],
	},
	{
		name: 'Impossible Finance',
		slug: 'impossible-finance',
		links: [
			'https://impossible.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'impossible-finance',
				},
			},
		],
	},
	{
		name: 'Inception',
		slug: 'inception',
		links: [
			'https://www.inceptionlrt.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'inception',
				},
			},
		],
	},
	{
		name: 'Index Cooperative',
		slug: 'index-cooperative',
		links: [
			'https://www.indexcoop.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12729/thumb/index.png?1634894321',
						chainId: 1,
						address: '0x0954906da0bf32d5479e25f46056d22f08464cab',
						name: 'Index Cooperative',
						symbol: 'INDEX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'index-coop',
				},
			},
		],
	},
	{
		name: 'Indexed Finance',
		slug: 'indexed',
		links: [
			'https://indexed.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13546/thumb/indexed-light.74bb5471.png?1609712728',
						chainId: 1,
						address: '0x86772b1409b61c639eaac9ba0acfbb6e238e5f83',
						name: 'Indexed Finance',
						symbol: 'NDX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'indexed',
				},
			},
		],
	},
	{
		name: 'Infinex',
		slug: 'infinex',
		links: [
			'https://infinex.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Infinex',
				},
			},
		],
	},
	{
		name: 'Influence',
		slug: 'influence',
		links: [
			'https://www.influenceth.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Influence',
				},
			},
		],
	},
	{
		name: 'Infusion',
		slug: 'infusion',
		links: [
			'https://infusion.finance',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'infusion',
				},
			},
		],
	},
	{
		name: 'Infusion',
		slug: 'infusion',
		links: [
			'https://infusion.finance',
		],
		views: [
			{
				providers: {
					zapper: 'infusion',
				},
			},
		],
	},
	{
		name: 'INIT Capital',
		slug: 'init-capital',
		links: [
			'https://init.capital',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'init-capital',
				},
			},
		],
	},
	{
		name: 'Injective',
		slug: 'injective',
		links: [
			'https://injective.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Injective',
				},
			},
		],
	},
	{
		name: 'insrt',
		slug: 'insrt',
		links: [
			'https://app.insrt.fun/mint',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'insrt',
				},
			},
		],
	},
	{
		name: 'Instadapp',
		slug: 'instadapp',
		links: [
			'https://instadapp.io',
		],
		colors: [
			'#3f75ff',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14688/thumb/30hFM0-n_400x400.jpg?1617786420',
						chainId: 1,
						address: '0x6f40d4a6237c257fff2db00fa0510deeecd303eb',
						name: 'Instadapp',
						symbol: 'INST',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'instadapp',
				},
			},
		],
	},
	{
		name: 'InsurAce',
		slug: 'insurace',
		links: [
			'https://insurace.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'insurace',
				},
			},
		],
	},
	{
		name: 'Integral',
		slug: 'integral',
		links: [
			'https://integral.link',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'integral',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'integral',
				},
			},
		],
	},
	{
		name: 'IntentX',
		slug: 'intentx',
		links: [
			'https://intentx.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'intentx',
				},
			},
		],
	},
	{
		name: 'Interport Finance',
		slug: 'interport-finance',
		links: [
			'https://interport.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'interport-finance',
					zapper: 'interport',
				},
			},
		],
	},
	{
		name: 'Inverse Finance',
		slug: 'inverse',
		links: [
			'https://inverse.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14205/thumb/inverse_finance.jpg?1614921871',
						chainId: 1,
						address: '0x41d5d79431a913c4ae7d69a668ecdfe5ff9dfb68',
						name: 'Inverse Finance',
						symbol: 'INV',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'inverse-finance',
					zapper: 'inverse',
				},
			},
			{
				name: 'Inverse Finance - FiRM',
				slug: 'inverse-firm',
				links: [
					'https://www.inverse.finance/firm',
				],
				chainId: undefined,
				providers: {
					zapper: 'inverse-firm',
				},
			},
		],
	},
	{
		name: 'Ionic Protcool',
		slug: 'ionic-protocol',
		links: [
			'https://www.ionic.money',
		],
		views: [
			{
				providers: {
					zapper: 'ionic-protocol',
				},
			},
		],
	},
	{
		name: 'IPFS',
		slug: 'ipfs',
		links: [
			'https://ipfs.tech',
		],
		colors: [
			'#469ea2',
			'#6acad1',
			'#083b54',
		],
		icon: IpfsIcon,
		views: [

		],
	},
	{
		name: 'IPOR',
		slug: 'ipor',
		links: [
			'https://www.ipor.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'ipor',
					zapper: 'ipor-protocol',
				},
			},
		],
	},
	{
		name: 'IQ',
		slug: 'iq',
		links: [
			'https://iq.wiki',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'iq',
				},
			},
		],
	},
	{
		name: 'Iron Bank',
		slug: 'iron-bank',
		links: [
			'https://ib.xyz',
			'https://app.ib.xyz',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'iron-bank',
					zapper: 'iron-bank',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'iron-bank',
					zapper: 'iron-bank',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'iron-bank',
					zapper: 'iron-bank',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'iron-bank',
					zapper: 'iron-bank',
				},
			},
		],
	},
	{
		name: 'Iron',
		slug: 'iron',
		links: [
			'https://iron.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'iron',
				},
			},
		],
	},
	{
		name: 'Ironclad Protocol',
		slug: 'ironclad-protocol',
		links: [
			'https://www.ironclad.finance',
		],
		views: [
			{
				providers: {
					zapper: 'ironclad-protocol',
				},
			},
		],
	},
	{
		name: 'iso3166SharesV1',
		slug: 'iso-shares-v1',
		links: [
			'https://etherscan.io/address/0xb72749a16410db6b3feac000a5a90c2f6cf7935e',
		],
		views: [
			{
				chainId: 1,
				contracts: [
					{
						address: '0xb72749a16410db6b3feac000a5a90c2f6cf7935e',
					},
				],
				providers: {
					zapper: 'iso-shares-v1',
				},
			},
		],
	},
	{
		name: 'iZUMi Finance',
		slug: 'izumi-finance',
		links: [
			'https://izumi.finance/home',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'izumi-finance',
					zapper: 'izumi',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'izumi-finance',
					zapper: 'izumi',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'izumi-finance',
					zapper: 'izumi',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'izumi-finance',
					zapper: 'izumi',
				},
			},
		],
	},
	{
		name: 'Jade Protocol',
		slug: 'jade-protocol',
		links: [
			'https://www.jadeprotocol.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'jade-protocol',
				},
			},
		],
	},
	{
		name: 'Jarvis',
		slug: 'jarvis',
		links: [
			'https://jarvis.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'jarvis',
				},
			},
		],
	},
	{
		name: 'Jaypeggers',
		slug: 'jaypeggers',
		links: [
			'https://jaypeggers.com',
			'https://jaypeggers.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'jaypeggers',
					zapper: 'jaypeggers',
				},
			},
		],
	},
	{
		name: 'Jeeves',
		slug: 'jeeves',
		links: [
			'https://app.degenjeeves.com',
		],
		views: [
			{
				providers: {
					zapper: 'jeeves',
				},
			},
		],
	},
	{
		name: 'Jelly Beans',
		slug: 'jelly-beans',
		links: [
			'https://jellybeans.wtf',
		],
		views: [
			{
				providers: {
					zapper: 'jelly-beans',
				},
			},
		],
	},
	{
		name: 'JetSwap',
		slug: 'jetswap',
		links: [
			'https://jetswap.finance',
		],
		views: [
			{
				providers: {
					zapper: 'jetswap',
				},
			},
		],
	},
	{
		name: 'JOJO Exchange',
		slug: 'jojo-exchange',
		links: [
			'https://jojo.exchange',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					zapper: 'jojo-exchange',
				},
			},
		],
	},
	{
		name: 'JokeRace',
		slug: 'joke-race',
		links: [
			'https://www.jokerace.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'joke-race',
				},
			},
		],
	},
	{
		name: 'Jones DAO',
		slug: 'jones-dao',
		links: [
			'https://jonesdao.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'jones-dao',
					zapper: 'jones-dao',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'jones-dao',
					zapper: 'jones-dao',
				},
			},
		],
	},
	{
		name: `JPEG'd`,
		slug: 'jpegd',
		links: [
			'https://jpegd.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'jpegd',
				},
			},
		],
	},
	{
		name: 'Juice Finance',
		slug: 'juice-finance',
		links: [
			'https://www.juice.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'juice-finance',
				},
			},
		],
	},
	{
		name: 'Juicebox',
		slug: 'juicebox',
		links: [
			'https://juicebox.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'juicebox',
				},
			},
		],
	},
	{
		name: 'Juiced',
		slug: 'juiced',
		links: [
			'https://juiced.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'juiced',
				},
			},
		],
	},
	{
		name: 'JulSwap X',
		slug: 'julswap-x',
		links: [
			'https://julswap.com/#/swap',
		],
		views: [
			{
				providers: {
					zapper: 'julswap-x',
				},
			},
		],
	},
	{
		name: 'The Junkyard',
		slug: 'junkyard',
		links: [
			'https://junkyard.wtf',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'junkyard',
				},
			},
		],
	},
	{
		name: 'KaijuKingz',
		slug: 'kaiju-kingz',
		links: [
			'https://kaijukingz.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'kaiju-kingz',
				},
			},
		],
	},
	{
		name: 'Karak',
		slug: 'karak',
		links: [
			'https://karak.network',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'karak',
					zapper: 'karak',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'karak',
					zapper: 'karak',
				},
			},
		],
	},
	{
		name: 'Kassandra DAO',
		slug: 'kassandra',
		links: [
			'https://kassandra.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'kassandra',
				},
			},
		],
	},
	{
		name: 'Keekusaurs',
		slug: 'keekusaur',
		links: [
			'https://www.gmcafe.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'keekusaur',
				},
			},
		],
	},
	{
		name: 'Keep Network',
		slug: 'keep-network',
		links: [
			'https://keep.network',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/3373/thumb/IuNzUb5b_400x400.jpg?1589526336',
						chainId: 1,
						address: '0x85eee30c52b0b379b046fb0f85f4f3dc3009afec',
						name: 'Keep Network',
						symbol: 'KEEP',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'keep-network',
				},
			},
		],
	},
	{
		name: 'Keep3r Network',
		slug: 'keep3r-network',
		links: [
			'https://keep3r.network',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'keep3r-network',
					zapper: 'keeper',
				},
			},
		],
	},
	{
		name: 'KeeperDAO',
		slug: 'keeper-dao',
		links: ['https://keeperdao.com', 'https://app.keeperdao.com'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13005/thumb/keeper_dao_logo.jpg?1604316506',
						chainId: 1,
						address: '0xfa5047c9c78b8877af97bdcb85db743fd7313d4a',
						name: 'KeeperDAO',
						symbol: 'ROOK',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'keeper-dao',
					zerionDefiSDK: [
						'KeeperDAO',
					],
				},
			},
		],
	},
	{
		name: 'Kelp DAO',
		slug: 'kelp-dao',
		links: [
			'https://kelpdao.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'kelp-dao',
					zapper: 'kelp',
				},
			},
		],
	},
	{
		name: 'Keom Protocol',
		slug: 'keom-protocol',
		links: [
			'https://keom.io',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'keom-protocol',
				},
			},
		],
	},
	{
		name: 'Keungz',
		slug: 'keungz',
		links: [
			'https://keungz.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'keungz',
				},
			},
		],
	},
	{
		name: 'kiloex',
		slug: 'kiloex',
		links: [
			'https://www.kiloex.io',
		],
		views: [
			{
				providers: {
					zapper: 'kiloex',
				},
			},
		],
	},
	{
		name: 'Kim Exchange',
		slug: 'kim-exchange',
		links: [
			'https://www.kim.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'kim-exchange',
				},
			},
		],
	},
	{
		name: 'Kimchi Finance',
		slug: 'kimchi',
		links: [
			'https://kimchi.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12302/thumb/VBa2Z60o_400x400.png?1598982471',
						chainId: 1,
						address: '0x1e18821e69b9faa8e6e75dffe54e7e25754beda0',
						name: 'KIMCHI finance',
						symbol: 'KIMCHI',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'KIMCHI',
					],
				},
			},
		],
	},
	{
		name: 'Kine Finance',
		slug: 'kine-finance',
		links: [
			'https://kine.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'kine-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'kine-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'kine-finance',
				},
			},
		],
	},
	{
		name: 'Kinesis Labs',
		slug: 'kinesis-labs',
		links: [
			'https://app.kinesislabs.co',
		],
		views: [
			{
				chainId: 25,
				providers: {
					zapper: 'kinesis-labs',
				},
			},
		],
	},
	{
		name: 'King of the Degens',
		slug: 'king-of-the-degens',
		links: [
			'https://www.degen.game/kotd',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'king-of-the-degens',
				},
			},
		],
	},
	{
		name: 'Kinza Finance',
		slug: 'kinza-finance',
		links: [
			'https://kinza.finance',
		],
		views: [
			{
				chainId: 204,
				providers: {
					llamafolio: 'kinza-finance',
					zapper: 'kinza',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'kinza-finance',
					zapper: 'kinza',
				},
			},
		],
	},
	{
		name: 'Kleros',
		slug: 'kleros',
		links: [
			'https://kleros.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'kleros',
				},
			},
		],
	},
	{
		name: 'Klima',
		slug: 'klima',
		links: [
			'https://www.klimadao.finance',
		],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0x4e78011ce80ee02d2c3e649fb657e45898257815',
					},
				],
				providers: {
					llamafolio: 'klima-dao',
					zapper: 'klima',
				},
			},
		],
	},
	{
		name: 'Klondike Finance',
		slug: 'klondike',
		links: [
			'https://klondike.finance',
		],
		views: [
			{
				name: 'Klondike Finance v2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14508/thumb/WPQvZkDk_400x400.jpg?1616578143',
						chainId: 1,
						address: '0xbf15797bb5e47f6fb094a4abdb2cfc43f77179ef',
						name: 'Klondike Finance v2',
						symbol: 'KLONX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'klondike-v2',
				},
			},
			{
				name: 'Klondike Finance v1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					erc20TokensBySymbol['KLON'],
					{
						icon: 'https://assets.coingecko.com/coins/images/13789/thumb/klondike.jpg?1611759492',
						chainId: 1,
						address: '0xe6c3502997f97f9bde34cb165fbce191065e068f',
						name: 'Klondike BTC',
						symbol: 'KBTC',
						decimals: 18,
					},
					erc20TokensBySymbol['KBOND'],
				],
				providers: {
					zapper: 'klondike',
				},
			},
		],
	},
	{
		name: 'KnownOirigin',
		slug: 'known-origin',
		links: [
			'https://knownorigin.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'known-origin',
				},
			},
		],
	},
	{
		name: 'Kogefarm',
		slug: 'kogefarm',
		links: [
			'https://www.kogefarm.io',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'kogefarm',
				},
			},
		],
	},
	{
		name: 'Koi Finance',
		slug: 'koi-finance',
		links: [
			'https://dapp.koi.finance/swap',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'koi-finance',
				},
			},
		],
	},
	{
		name: 'Kokonut Swap',
		slug: 'kokonut-swap',
		links: [
			'https://kokonutswap.finance',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'kokonut-swap',
				},
			},
		],
	},
	{
		name: 'Kommunitas',
		slug: 'kommunitas',
		links: [
			'https://kommunitas.net',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'kommunitas',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'kommunitas',
				},
			},
		],
	},
	{
		name: 'Kōyō Finance',
		slug: 'koyo',
		links: [
			'https://koyo.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'koyo',
				},
			},
		],
	},
	{
		name: 'Kroma',
		slug: 'kroma',
		links: [
			'https://kroma.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Kroma',
				},
			},
		],
	},
	{
		name: 'KTX Finance',
		slug: 'ktx-finance',
		links: [
			'https://ktx.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ktx-finance',
				},
			},
		],
	},
	{
		name: 'Kucoin',
		slug: 'kucoin',
		links: [
			'https://www.kucoin.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'kucoin',
				},
			},
		],
	},
	{
		name: 'Kuroro Beasts',
		slug: 'kuroro-beasts',
		links: [
			'https://www.kuroro.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'kuroro-beasts',
				},
			},
		],
	},
	{
		name: 'Kwenta',
		slug: 'kwenta',
		links: [
			'https://kwenta.eth.limo',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'kwenta',
					zapper: 'kwenta',
				},
			},
		],
	},
	{
		name: 'Kyber',
		slug: 'kyber',
		links: [
			'https://kyber.org',
			'https://kyber.network',
		],
		colors: [
			'#31cb9e',
		],
		views: [
			{
				// name: 'Kyber Dynamic Market Maker',
				// slug: 'dmm',
				// links: [
				// 	'https://dmm.exchange',
				// ],
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 1,
				contracts: [
					{
						address: '0x833e4083B7ae46CeA85695c4f7ed25CDAd8886dE',
					},
					{
						address: '0x1c87257f5e8609940bc751a07bb085bb7f8cdbe6',
					},
					{
						address: '0x6a65e062ce8290007301296f3c6ae446af7bdeec',
					},
					{
						address: '0x306121f1344ac5f84760998484c0176d7bfb7134',
					},
					{
						address: '0xce9874c42dce7fffbe5e48b026ff1182733266cb',
					},
					{
						address: '0xd343d5dba2fba55eef58189619c05e33cab95ca1',
					},
					{
						address: '0x1cf68Bbc2b6D3C6CfE1BD3590CF0E10b06a05F17',
					},
					{
						address: '0x61639D6eC06C13a96B5eB9560b359D7c648C7759',
					},
				],
				providers: {
					llamafolio: 'kyberswap',
					zapper: 'kyber-dmm',
					theGraph: 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 59144,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 10,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 8453,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 250,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 42161,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 56,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 137,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap',
				slug: 'swap',
				links: [
					'https://kyberswap.com',
				],
				chainId: 43114,
				providers: {
					llamafolio: 'kyberswap',
				},
			},
			{
				name: 'KyberSwap Elastic',
				slug: 'kyberswap-elastic',
				chainId: undefined,
				providers: {
					zapper: 'kyberswap-elastic',
				},
			},
			{
				name: 'KyberSwap Classic',
				slug: 'kyberswap-classic',
				links: [
					'https://kyberswap.com/swap',
				],
				chainId: undefined,
				providers: {
					zapper: 'kyberswap-classic',
				},
			},
			{
				name: 'Kyber Dynamic Market Maker',
				slug: 'dmm',
				links: [
					'https://dmm.exchange',
				],
				chainId: 137,
				contracts: [
					{
						address: '0x5f1fe642060b5b9658c15721ea22e982643c095c',
					},
					{
						address: '0x546C79662E028B661dFB4767664d0273184E4dD1',
					},
					{
						address: '0xd8B9E9444fCBF26BEA4BAdd6142dD6a962BCA86A',
					},
					{
						address: '0x37e6449B0e99BeFD2A708eA048d970F4FF4dC65d',
					},
					{
						address: '0x45963db838a070cF7BE8e7046fD63e23d376c665',
					},
					{
						address: '0x95D708e9eE04b0136b98579141624d19c89B9d68',
					},
					{
						address: '0x3904aC366D348636694CB6720aa1540e76441b1B',
					},
					{
						address: '0x7018C0bd73255C8966d0B26634E0BC0c7595D255',
					},
				],
			},
			{
				name: 'KyberDAO v2',
				slug: 'dao-v2',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14899/thumb/RwdVsGcw_400x400.jpg?1618923851',
						chainId: 1,
						address: '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202',
						name: 'Kyber Network Cryst',
						symbol: 'KNC',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'kyber-dao',
					zerionDefiSDK: [
						'KyberDAO',
					],
				},
			},
			{
				name: 'KyberDAO v1',
				slug: 'dao-v1',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/947/thumb/logo-kncl.png?1618984814',
						chainId: 1,
						address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
						name: 'Kyber Network Cryst',
						symbol: 'KNCL',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'kyber-network',
				},
			},
			{
				name: 'KyberSwap Aggregator',
				slug: 'kyberswap-aggregator',
				chainId: undefined,
				providers: {
					zapper: 'kyberswap-aggregator',
				},
			},
		],
	},
	{
		name: 'L2 Marathon',
		slug: 'l2-marathon',
		links: [
			'https://l2marathon.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'l-two-marathon',
				},
			},
		],
	},
	{
		name: 'LandTorn',
		slug: 'land-torn',
		links: [
			'https://landtorn.com/lorak',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'land-torn',
				},
			},
		],
	},
	{
		name: 'Launchpool',
		slug: 'launchpool',
		links: [
			'https://launchpool.xyz',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14041/thumb/dGUvV0HQ_400x400.jpg?1613976219',
						chainId: 1,
						address: '0x6149c26cd2f7b5ccdb32029af817123f6e37df5b',
						name: 'Launchpool',
						symbol: 'LPOOL',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'launchpool',
				},
			},
		],
	},
	{
		name: 'LayerAI',
		slug: 'layer-ai',
		links: [
			'https://layerai.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'layer-ai',
				},
			},
		],
	},
	{
		name: 'Layer2DAO',
		slug: 'layer2dao',
		links: [
			'https://www.layer2dao.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'layer2dao',
				},
			},
		],
	},
	{
		name: 'Layer3',
		slug: 'layer-3',
		links: [
			'https://layer3.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'layer-3',
				},
			},
		],
	},
	{
		name: 'LayerBank',
		slug: 'layerbank',
		links: [
			'https://layerbank.finance',
		],
		views: [
			{
				chainId: 59144,
				providers: {
					llamafolio: 'layerbank',
					zapper: 'layer-bank',
				},
			},
		],
	},
	{
		name: 'LayerZero',
		slug: 'layerzero',
		links: [
			'https://layerzero.network',
		],
		views: [
			{
				name: 'LayerZero Bridge',
				slug: 'bridge',
				chainId: undefined,
				providers: {
					zapper: 'layer-zero',
				},
			},
		],
	},
	{
		name: 'League of Kingdoms',
		slug: 'league-of-kingdoms',
		links: [
			'https://linktr.ee/leagueofkingdoms',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'league-of-kingdoms',
				},
			},
		],
	},
	{
		name: 'LeagueDAO',
		slug: 'leaguedao',
		links: [
			'https://leaguedao.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'leaguedao',
				},
			},
		],
	},
	{
		name: 'LeetSwap',
		slug: 'leetswap',
		links: [
			'https://leetswap.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'leet-swap',
				},
			},
		],
	},
	{
		name: 'Lemma Finance',
		slug: 'lemma-finance',
		links: [
			'https://v2.lemma.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'lemma-finance',
				},
			},
		],
	},
	{
		name: 'Lemon',
		slug: 'lemon',
		links: [
			'https://beta.lemon.tips',
		],
		views: [
			{
				providers: {
					zapper: 'lemon',
				},
			},
		],
	},
	{
		name: 'LemonBlast',
		slug: 'lemonblast',
		links: [
			'https://lemonblast.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: ' lemonblast',
				},
			},
		],
	},
	{
		name: 'Lendle.xyz',
		slug: 'lendle',
		links: [
			'https://www.lendle.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'lendle',
				},
			},
		],
	},
	{
		name: 'Lens',
		slug: 'lens',
		links: [
			'https://lens.xyz',
		],
		colors: [
			'#00501e',
			'#abfe2c',
		],
		icon: LensIcon,
		views: [
			{
				chainId: 137,
				contracts: [
					{
						name: 'LensHub Proxy',
						address: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
					},
					{
						name: 'LensHub Implementation',
						address: '0xeCd1d11B69FFd9794d45269247f9Fc139462bC12',
					},
					{
						name: 'PublishingLogic',
						address: '0x931519D41797C73b9CE993B52c1af900373b5b43',
					},
					{
						name: 'InteractionLogic',
						address: '0xe71291f49C4b572EF6e864Ba54E50C13A6D407e7',
					},
					{
						name: 'ProfileTokenURILogic',
						address: '0x3FA902A571E941dCAc6081d57917994DDB0F9A9d',
					},
					{
						name: 'FeeCollectModule',
						address: '0x1292E6dF9a4697DAAfDDBD61D5a7545A634af33d',
					},
					{
						name: 'LimitedFeeCollectModule',
						address: '0xEF13EFa565FB29Cd55ECf3De2beb6c69bD988212',
					},
					{
						name: 'TimedFeeCollectModule',
						address: '0xbf4E6C28d7f37C867CE62cf6ccb9efa4C7676F7F',
					},
					{
						name: 'LimitedTimedFeeCollectModule',
						address: '0x7B94f57652cC1e5631532904A4A038435694636b',
					},
					{
						name: 'RevertCollectModule',
						address: '0xa31FF85E840ED117E172BC9Ad89E55128A999205',
					},
					{
						name: 'FreeCollectModule',
						address: '0x23b9467334bEb345aAa6fd1545538F3d54436e96',
					},
					{
						name: 'FeeFollowModule',
						address: '0x80ae0e6048d6e295Ee6520b07Eb6EC4485193FD6',
					},
					{
						name: 'ProfileFollowModule',
						address: '0x057ccDf5153bE1081830a6C3D507C9dfE1ac8e4E',
					},
					{
						name: 'RevertFollowModule',
						address: '0x6640e4Fb3fd56a6d7DfF3C351dFd9Ab7E57fb769',
					},
					{
						name: 'FollowerOnlyReferenceModule',
						address: '0x17317F96f0C7a845FFe78c60B10aB15789b57Aaa',
					},
					{
						name: 'FollowNFT',
						address: '0xb0298c5540f4cfb3840c25d290be3ef3fe09fa8c',
					},
					{
						name: 'CollectNFT',
						address: '0x2172758ebb894c43e0be01e37d065118317d7eec',
					},
					{
						name: 'LensPeriphery',
						address: '0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f',
					},
					{
						name: 'ModuleGlobals',
						address: '0x3Df697FF746a60CBe9ee8D47555c88CB66f03BB9',
					},
					{
						name: 'ProfileCreationProxy',
						address: '0x1eeC6ecCaA4625da3Fa6Cd6339DBcc2418710E8a',
					},
					{
						name: 'UIDataProvider',
						address: '0x8b0A28a8DE1de77668260A876c6DCF0330183742',
					},
				],
				providers: {
					zapper: 'lens',
				},
			},
			{
				chainId: 80001,
				contracts: [
					{
						name: 'LensHub Proxy',
						address: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
					},
					{
						name: 'LensHub Implementation',
						address: '0x45cf9Ba12b43F6c8B7148E06A6f84c5B9ad3Dd44',
					},
					{
						name: 'PublishingLogic',
						address: '0x7f9bfF8493F821111741b93429A6A6F79DC546F0',
					},
					{
						name: 'InteractionLogic',
						address: '0x845242e2Cd249af8D4f0D7085DefEAc3381815E3',
					},
					{
						name: 'ProfileTokenURILogic',
						address: '0xf62c27B7B70A33739A7C088097fc20609A80eE58',
					},
					{
						name: 'FeeCollectModule',
						address: '0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82',
					},
					{
						name: 'LimitedFeeCollectModule',
						address: '0xFCDA2801a31ba70dfe542793020a934F880D54aB',
					},
					{
						name: 'TimedFeeCollectModule',
						address: '0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db',
					},
					{
						name: 'LimitedTimedFeeCollectModule',
						address: '0xDa76E44775C441eF53B9c769d175fB2948F15e1C',
					},
					{
						name: 'RevertCollectModule',
						address: '0x5E70fFD2C6D04d65C3abeBa64E93082cfA348dF8',
					},
					{
						name: 'FreeCollectModule',
						address: '0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c',
					},
					{
						name: 'FeeFollowModule',
						address: '0xe7AB9BA11b97EAC820DbCc861869092b52B65C06',
					},
					{
						name: 'ProfileFollowModule',
						address: '0x8c32203df6b1A04E25145346e2DaAD0B4712C20D',
					},
					{
						name: 'RevertFollowModule',
						address: '0x8c822Fc029EBdE62Da1Ed1072534c5e112dAE48c',
					},
					{
						name: 'FollowerOnlyReferenceModule',
						address: '0x7Ea109eC988a0200A1F79Ae9b78590F92D357a16',
					},
					{
						name: 'FollowNFT',
						address: '0x1a2bb1bc90aa5716f5eb85fd1823338bd1b6f772',
					},
					{
						name: 'CollectNFT',
						address: '0x39dcB881eBdB0DF708412754468c99B4EbD2E370',
					},
					{
						name: 'LensPeriphery',
						address: '0xD5037d72877808cdE7F669563e9389930AF404E8',
					},
					{
						name: 'ModuleGlobals',
						address: '0x1353aAdfE5FeD85382826757A95DE908bd21C4f9',
					},
					{
						name: 'MockProfileCreationProxy',
						address: '0x420f0257D43145bb002E69B14FF2Eb9630Fc4736',
					},
					{
						name: 'UIDataProvider',
						address: '0x4fF8EB275b2817fB2e7893bFF7ae7994e54e0730',
					},
				],
			},
			{
				name: 'Sandbox Mumbai',
				slug: 'mumbai-sandbox',
				chainId: 80001,
				contracts: [
					{
						name: 'LensHub Proxy',
						address: '0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5',
					},
					{
						name: 'LensHub Implementation',
						address: '0x7836c7cb79b7f3d53e92c95bf43798ada212fe4e',
					},
					{
						name: 'PublishingLogic',
						address: '0xDaDB107743e91249929C55132A238a3E735eA7eC',
					},
					{
						name: 'InteractionLogic',
						address: '0xB91F340BEab90580d557F1332704bF5DB9c35A9D',
					},
					{
						name: 'ProfileTokenURILogic',
						address: '0x5A39B7A9507044509Ef97D4EA306Dc8bA9DB818e',
					},
					{
						name: 'FeeCollectModule',
						address: '0xD57C675b542bFC24242a1088514306fFaeaFc6Fb',
					},
					{
						name: 'LimitedFeeCollectModule',
						address: '0x27742f7e82356e1c1e4177C11f627B5Dc18E4686',
					},
					{
						name: 'TimedFeeCollectModule',
						address: '0x6Bf382f52398DAdD3969Fb9C1AB3a1Bab8268F4E',
					},
					{
						name: 'LimitedTimedFeeCollectModule',
						address: '0x75Df383C587B0de2EB00FeA95B9b8e3AF35EbCe6',
					},
					{
						name: 'RevertCollectModule',
						address: '0x75fe7513709E6Ca573d017cE979F7d35192CE0d5',
					},
					{
						name: 'FreeCollectModule',
						address: '0x11C45Cbc6fDa2dbe435C0079a2ccF9c4c7051595',
					},
					{
						name: 'FeeFollowModule',
						address: '0xE98a40DB1170B3A46ffa7bA84335A0A0e9A65C2d',
					},
					{
						name: 'ProfileFollowModule',
						address: '0x62D0EcAB45428087d91a94EE33E141B7496Ad7c3',
					},
					{
						name: 'RevertFollowModule',
						address: '0x65004331Ae1c3D35DF81aEC6E8C259167Bbe64E2',
					},
					{
						name: 'FollowerOnlyReferenceModule',
						address: '0xB080AAc00E53FBeb04917F22096721d602c70759',
					},
					{
						name: 'FollowNFT',
						address: '0xf51b134ca8f54fdf19eb49001fe337b1e93cf707',
					},
					{
						name: 'CollectNFT',
						address: '0x57F4040B6a38C26e8a92527e3495EB936496CCc9',
					},
					{
						name: 'LensPeriphery',
						address: '0xa6bcF4398824A199965f89094796DFCcEa81b1a6',
					},
					{
						name: 'ModuleGlobals',
						address: '0xcbCC5b9611d22d11403373432642Df9Ef7Dd81AD',
					},
					{
						name: 'MockProfileCreationProxy',
						address: '0x4fe8deB1cf6068060dE50aA584C3adf00fbDB87f',
					},
					{
						name: 'MockSandboxGovernance',
						address: '0x1677d9cc4861f1c85ac7009d5f06f49c928ca2ad',
					},
					{
						name: 'UIDataProvider',
						address: '0x5dDD1d6c04E805D830574A31Bf7979D416c6d7c5',
					},
				],
			},
		],
	},
	{
		name: 'LeonicornSwap',
		slug: 'leonicornswap',
		links: [
			'https://dex.leonicornswap.com/home',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'leonicornswap',
				},
			},
		],
	},
	{
		name: 'LEVEL Finance',
		slug: 'level-finance',
		links: [
			'https://app.level.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'LEVEL-Finance',
				},
			},
		],
	},
	{
		name: 'Levinswap',
		slug: 'levinswap',
		links: [
			'https://levinswap.org',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'levinswap',
				},
			},
		],
	},
	{
		name: 'Lido',
		slug: 'lido',
		links: [
			'https://lido.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'lido',
					zapper: 'lido',
				},
			},
			{
				chainId: 1284,
				providers: {
					llamafolio: 'lido',
				},
			},
		],
	},
	{
		name: 'Life DAO',
		slug: 'life-dao',
		links: [
			'https://lifedao.finance',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'life-dao',
				},
			},
		],
	},
	{
		name: 'Li.Fi',
		slug: 'lifi',
		links: [
			'https://li.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'lifi',
				},
			},
		],
	},
	{
		name: 'LightLink',
		slug: 'lightlink',
		links: [
			'https://lightlink.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'light-link',
				},
			},
		],
	},
	{
		name: 'Lil Nouns DAO',
		slug: 'lil-nouns-dao',
		links: [
			'https://lilnouns.wtf',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'lil-nouns-dao',
				},
			},
		],
	},
	{
		name: 'Limitless',
		slug: 'limitless',
		links: [
			'https://limitlessfi.app',
		],
		views: [
			{
				providers: {
					zapper: 'limitless',
				},
			},
		],
	},
	{
		name: 'Linea',
		slug: 'linea',
		icon: LineaIcon,
		colors: [
			'#61DFFF',
		],
		links: [
			'https://linea.build',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'linea',
				},
			},
		],
	},
	{
		name: 'Linear Finance',
		slug: 'linear-finance',
		links: [
			'https://linear.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'linear-finance',
				},
			},
		],
	},
	{
		name: 'Linkdrop',
		slug: 'linkdrop',
		links: [
			'https://www.linkdrop.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'link-drop',
				},
			},
		],
	},
	{
		name: 'LinkPool',
		slug: 'linkpool',
		links: [
			'https://linkpool.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'link-pool',
				},
			},
		],
	},
	{
		name: 'Linkswap',
		slug: 'linkswap',
		links: [
			'https://linkswap.app',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'linkswap',
				},
			},
		],
	},
	{
		name: 'LINQ',
		slug: 'linq',
		links: [
			'https://www.linqgroup.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'LINQ',
				},
			},
		],
	},
	{
		name: 'Liqee',
		slug: 'liqee',
		links: [
			'https://liqee.io',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'liqee',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'liqee',
				},
			},
		],
	},
	{
		name: 'Liquid Collective',
		slug: 'liquid-collective',
		links: [
			'https://liquidcollective.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'liquid-collective',
				},
			},
		],
	},
	{
		name: 'Liquid Driver',
		slug: 'liquid-driver',
		links: [
			'https://www.liquiddriver.finance',
		],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9',
					},
				],
				providers: {
					llamafolio: 'liquid-driver',
					zapper: 'liquiddriver',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'liquid-driver',
				},
			},
		],
	},
	{
		name: 'Liquid Finance',
		slug: 'liquid-finance',
		links: [
			'https://liquidfinance.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'liquid-finance',
				},
			},
		],
	},
	{
		name: 'LSDAI',
		slug: 'liquid-savings-dai',
		links: [
			'https://lsd.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'liquid-savings-dai',
				},
			},
		],
	},
	{
		name: 'LiquidDriver',
		slug: 'liquiddriver',
		links: [
			'https://www.liquiddriver.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'liquiddriver',
				},
			},
		],
	},
	{
		name: 'Liquidity.money',
		slug: 'liquidity-money',
		links: [
			'https://liquidity.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'liquidity-money',
				},
			},
		],
	},
	{
		name: 'Liquis',
		slug: 'liquis',
		links: [
			'https://www.liquis.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'liquis',
				},
			},
		],
	},
	{
		name: 'Liquity',
		slug: 'liquity',
		links: [
			'https://www.liquity.org',
		],
		colors: [
			'#2eb6ea',
			'#1542cd',
			'#745ddf',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14665/thumb/200-lqty-icon.png?1617631180',
						chainId: 1,
						address: '0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d',
						name: 'Liquity',
						symbol: 'LQTY',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'liquity',
					theGraph: 'https://api.thegraph.com/subgraphs/name/liquity/liquity',
					zapper: 'liquity',
					zerionDefiSDK: [
						'Liquity',
					],
				},
			},
			{
				name: 'Liquity Frontend',
				slug: 'frontend',
				chainId: 1,
				embeds: [
					{
						name: 'LiquityFi (eth.liquity.fi)',
						src: 'https://eth.liquity.fi',
					},
					{
						name: 'Liquity.App (liquity.app)',
						src: 'https://liquity.app',
					},
					{
						name: 'Lusd.eth.link (lusd.eth.link)',
						src: 'https://lusd.eth.link',
					},
					{
						name: 'Liquity Land (liquityland.com)',
						src: 'https://liquityland.com',
					},
					{
						name: 'LiquityApp (liquityapp.com)',
						src: 'https://liquityapp.com',
					},
				],
			},
			{
				name: 'Chicken Bonds',
				slug: 'chicken-bonds',
				links: [
					'https://www.chickenbonds.org',
				],
				chainId: 1,
				providers: {
					llamafolio: 'lusd-chickenbonds',
					zapper: 'chicken-bond',
				},
			},
		],
	},
	{
		name: 'LiqWrap',
		slug: 'liqwrap',
		links: [
			'https://liqwrap.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'LiqWrap',
				},
			},
		],
	},
	{
		name: 'ListaDAO',
		slug: 'lista',
		links: [
			'https://lista.org',
		],
		views: [
			{
				name: 'Synclub Staked BNB',
				slug: 'synclub-staked-bnb',
				links: [
					'https://www.synclub.io',
				],
				chainId: 56,
				providers: {
					llamafolio: 'synclub-staked-bnb',
				},
			},
		],
	},
	{
		name: 'Lista DAO',
		slug: 'listadao',
		links: [
			'https://lista.org',
		],
		views: [
			{
				providers: {
					zapper: 'listadao',
				},
			},
		],
	},
	{
		name: 'Livepeer',
		slug: 'livepeer',
		links: [
			'https://livepeer.org',
		],
		colors: [
			'#00EB88',
			'#00A55F',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/7137/thumb/logo-circle-green.png?1619593365',
						chainId: 1,
						address: '0x58b6a8a3302369daec383334672404ee733ab239',
						name: 'Livepeer',
						symbol: 'LPT',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/livepeer/livepeer',
					zapper: 'Livepeer',
					zerionDefiSDK: [
						'Livepeer',
					],
				},
			},
		],
	},
	{
		name: 'Llama Airforce',
		slug: 'llama-airforce',
		links: [
			'https://llama.airforce',
		],
		colors: [
			'#f8f8f8',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'llama-airforce',
					zapper: 'llama-airforce',
				},
			},
		],
	},
	{
		name: 'LlamaPay',
		slug: 'llamapay',
		links: [
			'https://llamapay.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'llamapay',
					zapper: 'llamapay',
				},
			},
		],
	},
	{
		name: 'LlamaSwap',
		slug: 'llamaswap',
		links: [
			'https://swap.defillama.com/?chain=ethereum&from=0x0000000000000000000000000000000000000000',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'llamaswap',
				},
			},
		],
	},
	{
		name: 'LocalCoinSwap',
		slug: 'localcoinswap',
		links: [
			'https://localcoinswap.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'LocalCoinSwap',
				},
			},
		],
	},
	{
		name: 'Locus Finance',
		slug: 'locus-finance',
		links: [
			'https://www.locus.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'locus-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'locus-finance',
				},
			},
		],
	},
	{
		name: 'Lodestar Finance',
		slug: 'lodestar-finance',
		links: [
			'https://www.lodestarfinance.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'lodestar-finance',
				},
			},
			{
				name: 'Lodestar V1',
				slug: 'v1',
				chainId: undefined,
				providers: {
					zapper: 'lodestar-v1',
				},
			},
			{
				name: 'Lodestar V0',
				slug: 'v0',
				chainId: undefined,
				providers: {
					zapper: 'lodestar-v0',
				},
			},
		],
	},
	{
		name: 'LogX',
		slug: 'logx',
		links: [
			'https://app.logx.trade/#BTC',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'logx',
				},
			},
		],
	},
	{
		name: 'Lombard Finance',
		slug: 'lombard',
		links: [
			'https://www.lombard.finance/app/vault',
		],
		views: [
			{
				providers: {
					zapper: 'lombard',
				},
			},
		],
	},
	{
		name: 'LooksRare',
		slug: 'looks-rare',
		links: [
			'https://looksrare.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'looksrare',
					zapper: 'looks-rare',
				},
			},
		],
	},
	{
		name: 'Loopring',
		slug: 'loopring',
		links: [
			'https://loopring.org',
			'https://loopring.io',
			'https://exchange.loopring.io',
		],
		colors: [
			'#1c42ff',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/913/thumb/LRC.png?1572852344',
						chainId: 1,
						address: '0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',
						name: 'Loopring',
						symbol: 'LRC',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/loopring',
					zapper: 'loopring',
				},
			},
		],
	},
	{
		name: 'Loopring',
		slug: 'loopring',
		links: [
			'https://loopring.org',
		],
		views: [
			{
				providers: {
					zapper: 'Loopring',
				},
			},
		],
	},
	{
		name: 'Loot Genie',
		slug: 'loot-genie',
		links: [
			'https://www.lootgenie.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'loot-genie',
				},
			},
		],
	},
	{
		name: 'Looter',
		slug: 'looter',
		links: [
			'https://www.looter.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Looter',
				},
			},
		],
	},
	{
		name: 'love.game',
		slug: 'love-game',
		links: [
			'https://www.love.game',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'love-game',
				},
			},
		],
	},
	{
		name: 'Love Hate Inu',
		slug: 'love-hate-inu',
		links: [
			'https://www.okx.com/join/lhinu',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'love-hate-inu',
				},
			},
		],
	},
	{
		name: 'LSD Protocol',
		slug: 'lsd-protocol',
		links: [
			'https://lsdprotocol.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'lsd-protocol',
				},
			},
		],
	},
	{
		name: 'Lucky Block',
		slug: 'lucky-block',
		links: [
			'https://www.luckyblock.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Lucky-Block-Casino-&-Sportsbook',
				},
			},
		],
	},
	{
		name: 'LVCDIA',
		slug: 'lvcdia',
		links: [
			'https://lvcidia.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'lvcdia',
				},
			},
		],
	},
	{
		name: 'Lybra Finance',
		slug: 'lybra-finance',
		links: [
			'https://lybra.finance',
		],
		views: [
			{
				name: 'Lybra V2',
				slug: 'v2',
				chainId: 42161,
				providers: {
					llamafolio: 'lybra-v2',
				},
			},
			{
				name: 'Lybra V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					llamafolio: 'lybra-v2',
				},
			},
			{
				name: 'Lybra V1',
				slug: 'v1',
				chainId: 1,
				providers: {
					llamafolio: 'lybra-v1',
				},
			},
			{
				chainId: undefined,
				providers: {
					zapper: 'lydia',
					// zapper: 'lybra-finance',
				},
			},
		],
	},
	{
		name: 'Lyra',
		slug: 'lyra',
		links: [
			'https://www.lyra.finance',
			'https://app.lyra.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'lyra',
					zapper: 'lyra',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'lyra',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'lyra',
				},
			},
			{
				name: 'Lyra Avalon',
				slug: 'lyra-avalon',
				links: [
					'https://avalon.app.lyra.finance',
				],
				chainId: 10,
				providers: {
					zapper: 'lyra-avalon',
				},
			},
		],
	},
	{
		name: 'Maestro',
		slug: 'maestro',
		links: [
			'https://www.maestrobots.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'maestro',
				},
			},
		],
	},
	{
		name: 'Magic Eden',
		slug: 'magic-eden',
		links: [
			'https://magiceden.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'magic-eden',
				},
			},
		],
	},
	{
		name: 'Magic Swap',
		slug: 'magicswap',
		links: [
			'https://magicswap.lol',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'magicswap',
				},
			},
		],
	},
	{
		name: 'Magnate Finance',
		slug: 'magnate-finance',
		links: [
			'https://www.magnate.finance',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'magnate-finance',
					zapper: 'magnate-finance',
				},
			},
		],
	},
	{
		name: 'Magpie',
		slug: 'magpie',
		links: [
			'https://www.magpiexyz.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'magpie',
					zapper: 'magpie',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'magpie',
					zapper: 'magpie',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'magpie',
					zapper: 'magpie',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'magpie',
					zapper: 'magpie',
				},
			},
			{
				name: 'Campie',
				slug: 'campie',
				links: [
					'https://www.camelot.magpiexyz.io/stake',
				],
				chainId: undefined,
				providers: {
					zapper: 'campie',
				},
			},
			{
				name: 'Eigenpie',
				slug: 'eigenpie',
				links: [
					'https://www.eigenlayer.magpiexyz.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'eigenpie',
				},
			},
			{
				name: 'Penpie',
				slug: 'penpie',
				links: [
					'https://www.pendle.magpiexyz.io/stake',
				],
				chainId: undefined,
				providers: {
					zapper: 'penpie',
				},
			},
			{
				name: 'Radpie',
				slug: 'radpie',
				links: [
					'https://www.radiant.magpiexyz.io/stake',
				],
				chainId: undefined,
				providers: {
					zapper: 'radpie',
					// zapper: 'Radpie',
				},
			},
		],
	},
	{
		name: 'MahaDAO',
		slug: 'mahadao',
		links: [
			'https://gov.mahadao.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mahadao',
				},
			},
		],
	},
	{
		name: 'MakerDAO',
		slug: 'maker',
		links: [
			'https://makerdao.com',
		],
		colors: [
			'#4fa89b',
			'#6bcdba',
		], // unofficial // ['#1AAB9B'],
		views: [
			{
				name: 'Maker Governance',
				slug: 'governance',
				colors: [
					'#1AAB9B',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/1364/thumb/Mark_Maker.png?1585191826',
						chainId: 1,
						address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
						name: 'Maker',
						symbol: 'MKR',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance',
					zerionDefiSDK: [
						'Maker Governance',
					],
				},
			},
			{
				colors: [
					'#f4b731',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/9956/thumb/dai-multi-collateral-mcd.png?1574218774',
						chainId: 1,
						address: '0x6b175474e89094c44da98b954eedeac495271d0f',
						name: 'Dai',
						symbol: 'DAI',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/1442/thumb/dai.png?1547035520',
						chainId: 1,
						address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
						name: 'Sai',
						symbol: 'SAI',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'makerdao',
					zapper: 'maker',
					zerionDefiSDK: [
						'Dai Savings Protocol',
						'Dai Savings Rate',
					],
				},
			},
		],
	},
	{
		name: 'Manifold',
		slug: 'manifold',
		links: [
			'https://manifold.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'manifold',
				},
			},
		],
	},
	{
		name: 'Manifold Finance',
		slug: 'manifold-finance',
		links: [
			'https://www.manifoldfinance.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'manifold-finance',
				},
			},
		],
	},
	{
		name: 'Manta Pacific',
		slug: 'manta-pacific',
		links: [
			'https://pacific.manta.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'manta-pacific',
				},
			},
		],
	},
	{
		name: 'MantisSwap',
		slug: 'mantisswap',
		links: [
			'https://mantissa.finance',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'mantisswap',
				},
			},
		],
	},
	{
		name: 'Mantle',
		slug: 'mantle',
		icon: MantleIcon,
		colors: [
			'#000000',
		],
		links: [
			'https://www.mantle.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mantle-network',
				},
			},
			{
				name: 'Mantle Staked ETH',
				slug: 'mantle-staked-eth',
				links: [
					'https://www.mantle.xyz/meth',
				],
				chainId: 1,
				providers: {
					llamafolio: 'mantle-staked-eth',
				},
			},
			{
				name: 'BitDAO',
				slug: 'bitdao',
				links: [
					'https://www.bitdao.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'bit-dao',
				},
			},
			{
				name: 'Mantle Reward Station',
				slug: 'mantlerewardstation',
				links: [
					'https://rewards.mantle.xyz',
				],
				providers: {
					zapper: 'mantlerewardstation',
				},
			},
		],
	},
	{
		name: 'MantleSwap',
		slug: 'mantle-swap',
		links: [
			'https://mantleswap.org',
		],
		views: [
			{
				providers: {
					zapper: 'mantle-swap',
				},
			},
		],
	},
	{
		name: 'MANTRA',
		slug: 'mantra',
		links: [
			'https://www.mantrachain.io',
		],
		views: [
			{
				name: 'MANTRA Finance',
				slug: 'finance',
				chainId: undefined,
				providers: {
					zapper: 'mantra-finance',
				},
			},
		],
	},
	{
		name: 'Maple',
		slug: 'maple',
		links: [
			'https://www.maple.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'maple',
					zapper: 'maple',
				},
			},
		],
	},
	{
		name: 'Market.xyz',
		slug: 'market-xyz',
		links: [
			'https://www.market.xyz',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'market-xyz',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'market-xyz',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'market-xyz',
				},
			},
		],
	},
	{
		name: 'Marlin',
		slug: 'marlin',
		links: [
			'https://www.marlin.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Marlin',
				},
			},
		],
	},
	{
		name: 'MARSWAP',
		slug: 'marswap',
		links: [
			'https://zk.marswap.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'marswap',
				},
			},
		],
	},
	{
		name: 'MasterDEX',
		slug: 'masterdex',
		links: [
			'https://masterdex.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'masterdex',
				},
			},
		],
	},
	{
		name: 'Match Finance',
		slug: 'match-finance',
		links: [
			'https://www.matchfinance.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'match-finance',
				},
			},
		],
	},
	{
		name: 'Mathcastles',
		slug: 'mathcastles',
		links: [
			'https://x.com/mathcastles',
		],
		views: [
			{
				name: 'Terraforms',
				slug: 'terraforms',
				links: [
					'https://x.com/terradream_bot',
				],
				chainId: undefined,
				providers: {
					zapper: 'terraforms',
				},
			},
		],
	},
	{
		name: 'Matrix Farm',
		slug: 'matrix-farm',
		links: [
			'https://matrix.farm',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'matrix-farm',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'matrix-farm',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'matrix-farm',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'matrix-farm',
				},
			},
		],
	},
	{
		name: 'MATR1X',
		slug: 'matr1x',
		links: [
			'https://matr1x.io',
		],
		views: [
			{
				name: 'MATR1X FIRE',
				slug: 'fire',
				chainId: undefined,
				providers: {
					zapper: 'matrix',
				},
			},
		],
	},
	{
		name: 'Maverick Protocol',
		slug: 'maverick-protocol',
		links: [
			'https://www.mav.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'maverick-protocol',
				},
			},
		],
	},
	{
		name: 'Maximus',
		slug: 'maximus',
		links: [
			'https://bento.me/maximusdao',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Maximus',
				},
			},
		],
	},
	{
		name: 'Mayan',
		slug: 'mayan',
		links: [
			'https://mayan.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mayan',
				},
			},
		],
	},
	{
		name: 'MCT',
		slug: 'mct',
		links: [
			'https://mct.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mct',
				},
			},
		],
	},
	{
		name: 'MDEX',
		slug: 'mdex',
		links: [
			'https://mdex.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'mdex',
				},
			},
		],
	},
	{
		name: 'Mellow Finance',
		slug: 'mellow-finance',
		links: [
			'https://app.mellow.finance/restake',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mellow-finance',
				},
			},
		],
	},
	{
		name: 'Meme Kombat',
		slug: 'meme-kombat',
		links: [
			'https://memekombat.io/#howItWorks',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meme-kombat',
				},
			},
		],
	},
	{
		name: 'Memeland',
		slug: 'meme-land',
		links: [
			'https://www.memeland.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meme-land',
				},
			},
		],
	},
	{
		name: 'meme.market',
		slug: 'meme-market',
		links: [
			'https://meme.market',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meme.market',
				},
			},
		],
	},
	{
		name: 'Memecoin.new',
		slug: 'memecoin-new',
		links: [
			'https://memecoin.new',
		],
		views: [
			{
				providers: {
					zapper: 'memecoin-new',
				},
			},
		],
	},
	{
		name: 'Mendi Finance',
		slug: 'mendi-finance',
		links: [
			'https://mendi.finance',
		],
		views: [
			{
				chainId: 59144,
				providers: {
					llamafolio: 'mendi-finance',
					zapper: 'mendifinance',
				},
			},
		],
	},
	{
		name: 'Merchant Moe',
		slug: 'merchantmoe',
		links: [
			'https://merchantmoe.com',
		],
		views: [
			{
				providers: {
					zapper: 'merchantmoe',
				},
			},
		],
	},
	{
		name: 'Meridian',
		slug: 'meridian-finance',
		links: [
			'https://www.meridianfinance.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meridian-finance',
				},
			},
		],
	},
	{
		name: 'Merit Circle',
		slug: 'merit-circle',
		links: [
			'https://meritcircle.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'merit-circle',
					zapper: 'merit-circle',
				},
			},
		],
	},
	{
		name: 'Merkly',
		slug: 'merkly',
		links: [
			'https://minter.merkly.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'merkly',
				},
			},
		],
	},
	{
		name: 'Merlin Chain',
		slug: 'merlin-chain',
		links: [
			'https://merlinchain.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'merlin-chain',
				},
			},
		],
	},
	{
		name: 'Merlins Seal',
		slug: 'merlins-seal',
		links: [
			'https://merlinchain.io/bridge/staking',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'merlins-seal',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'merlins-seal',
				},
			},
		],
	},
	{
		name: 'MES Protocol',
		slug: 'mes-protocol',
		links: [
			'https://www.mesprotocol.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mes-protocol',
				},
			},
		],
	},
	{
		name: 'Mesher',
		slug: 'mesher',
		links: [
			'https://center.mesher.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'mesher',
				},
			},
		],
	},
	{
		name: 'Meshswap',
		slug: 'meshswap',
		links: [
			'https://meshswap.fi',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'meshswap',
				},
			},
		],
	},
	{
		name: 'Meson.Network',
		slug: 'meson-network',
		links: [
			'https://www.meson.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meson-network',
				},
			},
		],
	},
	{
		name: 'Mest',
		slug: 'mest',
		links: [
			'https://mest.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Mest',
				},
			},
		],
	},
	{
		name: 'MetaFactory',
		slug: 'meta-factory',
		links: [
			'https://shop.metafactory.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meta-factory',
				},
			},
		],
	},
	{
		name: 'Meta Monopoly',
		slug: 'meta-monopoly',
		links: [
			'https://www.metamonopoly.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Meta-Monopoly',
				},
			},
		],
	},
	{
		name: 'Meta Pool',
		slug: 'meta-pool',
		links: [
			'https://metapool.app',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'meta-pool',
				},
			},
		],
	},
	{
		name: 'MetaStreet',
		slug: 'meta-street',
		links: [
			'https://www.metastreet.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'meta-street',
				},
			},
		],
	},
	{
		name: 'Metacade',
		slug: 'metacade',
		links: [
			'https://metacade.co/en',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'metacade',
				},
			},
		],
	},
	{
		name: 'Metal L2',
		slug: 'metal',
		links: [
			'https://metall2.com',
		],
		icon: MetalIcon,
		colors: [
			'#4400E2',
			'#F94E6C', 
			'#FFCB00',
		],
		views: [
			{
				chainId: 1,
				name: 'Ethereum (L1)',
				contracts: [
					{
						name: 'AnchorStateRegistryProxy',
						address: '0x18DAc71c228D1C32c99489B7323d441E1175e443',
					},
					{
						name: 'BatchSubmitter',
						address: '0x6887246668a3b87F54DeB3b94Ba47a6f63F32985',
					},
					{
						name: 'Challenger',
						address: '0x9BA6e03D8B90dE867373Db8cF1A58d2F7F006b3A',
					},
					{
						name: 'DelayedWETHProxy',
						address: '0xE497B094d6DbB3D5E4CaAc9a14696D7572588d14',
					},
					{
						name: 'DisputeGameFactoryProxy',
						address: '0xe5965Ab5962eDc7477C8520243A95517CD252fA9',
					},
					{
						name: 'FaultDisputeGame',
						address: '0x4146DF64D83acB0DcB0c1a4884a16f090165e122',
					},
					{
						name: 'Guardian',
						address: '0x09f7150D8c019BeF34450d6920f6B3608ceFdAf2',
					},
					{
						name: 'L1CrossDomainMessengerProxy',
						address: '0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1',
					},
					{
						name: 'L1ERC721BridgeProxy',
						address: '0x5a7749f83b81B301cAb5f48EB8516B986DAef23D',
					},
					{
						name: 'L1StandardBridgeProxy',
						address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
					},
					{
						name: 'MIPS',
						address: '0x0f8EdFbDdD3c0256A80AD8C0F2560B1807873C9c',
					},
					{
						name: 'OptimismMintableERC20FactoryProxy',
						address: '0x75505a97BD334E7BD3C476893285569C4136Fa0F',
					},
					{
						name: 'OptimismPortalProxy',
						address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
					},
					{
						name: 'PermissionedDisputeGame',
						address: '0xE9daD167EF4DE8812C1abD013Ac9570C616599A0',
					},
					{
						name: 'PreimageOracle',
						address: '0xD326E10B8186e90F4E2adc5c13a2d0C137ee8b34',
					},
					{
						name: 'Proposer',
						address: '0x473300df21D047806A082244b417f96b32f13A33',
					},
					{
						name: 'ProxyAdmin',
						address: '0x543bA4AADBAb8f9025686Bd03993043599c6fB04',
					},
					{
						name: 'ProxyAdminOwner',
						address: '0x5a0Aae59D09fccBdDb6C6CcEB07B7279367C3d2A',
					},
					{
						name: 'SystemConfigOwner',
						address: '0x847B5c174615B1B7fDF770882256e2D3E95b9D92',
					},
					{
						name: 'SystemConfigProxy',
						address: '0x229047fed2591dbec1eF1118d64F7aF3dB9EB290',
					},
					{
						name: 'UnsafeBlockSigner',
						address: '0xAAAA45d9549EDA09E70937013520214382Ffc4A2',
					},
				],
			},
			{
				chainId: 1,
				name: 'Ethereum Legacy Contracts (L1)',
				contracts: [
					{
						name: 'AddressManager',
						address: '0xdE1FCfB0851916CA5101820A69b13a4E276bd81F',
					},
				],
			},
			{
				chainId: 59144,
				name: 'Metal L2 (L2)',
				contracts: [
					{
						name: 'L2ToL1MessagePasser',
						address: '0x4200000000000000000000000000000000000016',
					},
					{
						name: 'L2CrossDomainMessenger',
						address: '0x4200000000000000000000000000000000000007',
					},
					{
						name: 'L2StandardBridge',
						address: '0x4200000000000000000000000000000000000010',
					},
					{
						name: 'L2ERC721Bridge',
						address: '0x4200000000000000000000000000000000000014',
					},
					{
						name: 'SequencerFeeVault',
						address: '0x4200000000000000000000000000000000000011',
					},
					{
						name: 'OptimismMintableERC20Factory',
						address: '0x4200000000000000000000000000000000000012',
					},
					{
						name: 'OptimismMintableERC721Factory',
						address: '0x4200000000000000000000000000000000000017',
					},
					{
						name: 'L1Block',
						address: '0x4200000000000000000000000000000000000015',
					},
					{
						name: 'GasPriceOracle',
						address: '0x420000000000000000000000000000000000000F',
					},
					{
						name: 'ProxyAdmin',
						address: '0x4200000000000000000000000000000000000018',
					},
					{
						name: 'BaseFeeVault',
						address: '0x4200000000000000000000000000000000000019',
					},
					{
						name: 'L1FeeVault',
						address: '0x420000000000000000000000000000000000001A',
					},
					{
						name: 'GovernanceToken',
						address: '0x4200000000000000000000000000000000000042',
					},
					{
						name: 'SchemaRegistry',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EAS',
						address: '0x4200000000000000000000000000000000000021',
					},
				],
			},
			{
				chainId: 59144,
				name: 'Metal L2 Legacy Contracts (L2)',
				contracts: [
					{
						name: 'L1MessageSender',
						address: '0x4200000000000000000000000000000000000001',
					},
					{
						name: 'DeployerWhitelist',
						address: '0x4200000000000000000000000000000000000002',
					},
					{
						name: 'LegacyERC20ETH',
						address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
					},
					{
						name: 'L1BlockNumber',
						address: '0x4200000000000000000000000000000000000013',
					},
					{
						name: 'LegacyMessagePasser',
						address: '0x4200000000000000000000000000000000000000',
					},
				],
			},
			{
				chainId: 11155111,
				name: 'Sepolia (L1)',
				contracts: [
					{
						name: 'AnchorStateRegistryProxy',
						address: '0x218CD9489199F321E1177b56385d333c5B598629',
					},
					{
						name: 'BatchSubmitter',
						address: '0x8F23BB38F531600e5d8FDDaAEC41F13FaB46E98c',
					},
					{
						name: 'Challenger',
						address: '0xfd1D2e729aE8eEe2E146c033bf4400fE75284301',
					},
					{
						name: 'DelayedWETHProxy',
						address: '0xF3D833949133e4E4D3551343494b34079598EA5a',
					},
					{
						name: 'DisputeGameFactoryProxy',
						address: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1',
					},
					{
						name: 'FaultDisputeGame',
						address: '0xD5Bc8c45692aada756f2d68f0a2002d6Bf130C42',
					},
					{
						name: 'Guardian',
						address: '0x7a50f00e8D05b95F98fE38d8BeE366a7324dCf7E',
					},
					{
						name: 'L1CrossDomainMessengerProxy',
						address: '0x58Cc85b8D04EA49cC6DBd3CbFFd00B4B8D6cb3ef',
					},
					{
						name: 'L1ERC721BridgeProxy',
						address: '0xd83e03D576d23C9AEab8cC44Fa98d058D2176D1f',
					},
					{
						name: 'L1StandardBridgeProxy',
						address: '0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1',
					},
					{
						name: 'MIPS',
						address: '0xFF760A87E41144b336E29b6D4582427dEBdB6dee',
					},
					{
						name: 'OptimismMintableERC20FactoryProxy',
						address: '0x868D59fF9710159C2B330Cc0fBDF57144dD7A13b',
					},
					{
						name: 'OptimismPortalProxy',
						address: '0x16Fc5058F25648194471939df75CF27A2fdC48BC',
					},
					{
						name: 'PermissionedDisputeGame',
						address: '0xBEA4384faCBcf51279962fbCFb8f16F9eD2fe0C6',
					},
					{
						name: 'PreimageOracle',
						address: '0x627F825CBd48c4102d36f287be71f4234426b9e4',
					},
					{
						name: 'Proposer',
						address: '0x49277EE36A024120Ee218127354c4a3591dc90A9',
					},
					{
						name: 'ProxyAdmin',
						address: '0x189aBAAaa82DfC015A588A7dbaD6F13b1D3485Bc',
					},
					{
						name: 'ProxyAdminOwner',
						address: '0x1Eb2fFc903729a0F03966B917003800b145F56E2',
					},
					{
						name: 'SystemConfigOwner',
						address: '0xfd1D2e729aE8eEe2E146c033bf4400fE75284301',
					},
					{
						name: 'SystemConfigProxy',
						address: '0x034edD2A225f7f429A63E0f1D2084B9E0A93b538',
					},
					{
						name: 'UnsafeBlockSigner',
						address: '0x57CACBB0d30b01eb2462e5dC940c161aff3230D3',
					},
				],
			},
			{
				chainId: 11155111,
				name: 'Metal L2 Testnet (L2)',
				contracts: [
					{
						name: 'L2ToL1MessagePasser',
						address: '0x4200000000000000000000000000000000000016',
					},
					{
						name: 'L2CrossDomainMessenger',
						address: '0x4200000000000000000000000000000000000007',
					},
					{
						name: 'L2StandardBridge',
						address: '0x4200000000000000000000000000000000000010',
					},
					{
						name: 'L2ERC721Bridge',
						address: '0x4200000000000000000000000000000000000014',
					},
					{
						name: 'SequencerFeeVault',
						address: '0x4200000000000000000000000000000000000011',
					},
					{
						name: 'OptimismMintableERC20Factory',
						address: '0x4200000000000000000000000000000000000012',
					},
					{
						name: 'OptimismMintableERC721Factory',
						address: '0x4200000000000000000000000000000000000017',
					},
					{
						name: 'L1Block',
						address: '0x4200000000000000000000000000000000000015',
					},
					{
						name: 'GasPriceOracle',
						address: '0x420000000000000000000000000000000000000F',
					},
					{
						name: 'ProxyAdmin',
						address: '0x4200000000000000000000000000000000000018',
					},
					{
						name: 'BaseFeeVault',
						address: '0x4200000000000000000000000000000000000019',
					},
					{
						name: 'L1FeeVault',
						address: '0x420000000000000000000000000000000000001A',
					},
					{
						name: 'GovernanceToken',
						address: '0x4200000000000000000000000000000000000042',
					},
					{
						name: 'SchemaRegistry',
						address: '0x4200000000000000000000000000000000000020',
					},
					{
						name: 'EAS',
						address: '0x4200000000000000000000000000000000000021',
					},
				],
			},
		],
	},
	{
		name: 'Metamask',
		slug: 'metamask',
		links: [
			'https://metamask.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'metamask',
				},
			},
		],
	},
	{
		name: 'MetaTdex',
		slug: 'metatdex',
		links: [
			'https://www.metatdex.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'metatdex',
				},
			},
		],
	},
	{
		name: 'Metavault Trade',
		slug: 'metavault-trade',
		links: [
			'https://metavault.trade',
		],
		colors: [
			'#FFAA27',
		],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0x2760e46d9bb43dafcbecaad1f64b93207f9f0ed7',
					},
				],
				providers: {
					zapper: 'metavault-trade',
				},
			},
		],
	},
	{
		name: 'MetaWin',
		slug: 'metawin',
		links: [
			'https://metawin.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'metawin',
				},
			},
		],
	},
	{
		name: 'MetaX',
		slug: 'metax',
		links: [
			'https://meta-x.io/planetMan/mint',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'MetaX',
				},
			},
		],
	},
	{
		name: 'Metis',
		slug: 'metis',
		icon: MetisIcon,
		colors: [
			'#00cfff',
		],
		links: [
			'https://metis.io',
		],
		views: [
			{
				name: 'Metis Bridge',
				slug: 'metis-bridge',
				links: [
					'https://bridge.metis.io/home',
				],
				chainId: undefined,
				providers: {
					zapper: 'metis-bridge',
				},
			},
		],
	},
	{
		name: 'Metronome',
		slug: 'metronome',
		links: [
			'https://metronome.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'metronome',
					zapper: 'metronome',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'metronome',
					zapper: 'metronome',
				},
			},
		],
	},
	{
		name: 'MEV Bot',
		slug: 'mev-bot',
		links: [
			'https://boost.flashbots.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mev-bot',
				},
			},
		],
	},
	{
		name: 'MEV Protocol',
		slug: 'mev-protocol',
		links: [
			'https://mev.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'mev-protocol',
					zapper: 'mev-io',
				},
			},
		],
	},
	{
		name: 'Mezo Network',
		slug: 'mezo-network',
		links: [
			'https://mezo.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mezo-network',
				},
			},
		],
	},
	{
		name: 'Midas Capital',
		slug: 'midas',
		links: [
			'https://app.midascapital.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'midas',
				},
			},
		],
	},
	{
		name: 'Mighty Action Heros',
		slug: 'mightyactionheros',
		links: [
			'https://app.mightynet.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mightyactionheros',
				},
			},
		],
	},
	{
		name: 'mimic',
		slug: 'mimic',
		links: [
			'https://www.mimic.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mimic',
				},
			},
		],
	},
	{
		name: 'Mimo Labs',
		slug: 'mimo',
		links: [
			'https://www.mimo.capital',
		],
		views: [
			{
				providers: {
					zapper: 'mimo',
				},
			},
		],
	},
	{
		name: 'Mind Network',
		slug: 'mindnetwork',
		links: [
			'https://www.mindnetwork.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'mindnetwork',
				},
			},
		],
	},
	{
		name: 'mintBase',
		slug: 'mintbase',
		links: [
			'https://mintbase.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mintBase',
				},
			},
		],
	},
	{
		name: 'Mint Club',
		slug: 'mintclub',
		links: [
			'https://mint.club',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mintclub',
				},
			},
		],
	},
	{
		name: 'MintDAO',
		slug: 'mintdao',
		links: [
			'https://mintdao.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mintdao',
				},
			},
		],
	},
	{
		name: 'Mint.fun',
		slug: 'mintfun',
		links: [
			'https://mint.fun',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mintfun',
				},
			},
		],
	},
	{
		name: 'Mintify',
		slug: 'mintify',
		links: [
			'https://mintify.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mintify',
				},
			},
		],
	},
	{
		name: 'Mirror Protocol',
		slug: 'mirror',
		links: [
			'https://mirror.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13295/thumb/mirror_logo_transparent.png?1611554658',
						chainId: 1,
						address: '0x09a3ecafa817268f77be1283176b946c4ff2e608',
						name: 'Mirror Protocol',
						symbol: 'MIR',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13514/thumb/mirror_logo_transparent.png?1611564758',
						chainId: 1,
						address: '0xd36932143f6ebdedd872d5fb0651f4b72fd15a84',
						name: 'Mirrored Apple',
						symbol: 'MAAPL',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13646/thumb/mirror_logo_transparent.png?1611565645',
						chainId: 1,
						address: '0x0cae9e4d663793c2a2a0b211c1cf4bbca2b9caa7',
						name: 'Mirrored Amazon',
						symbol: 'MAMZN',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13647/thumb/mirror_logo_transparent.png?1611565672',
						chainId: 1,
						address: '0x56aa298a19c93c6801fdde870fa63ef75cc0af72',
						name: 'Mirrored Alibaba',
						symbol: 'MBABA',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13641/thumb/mirror_logo_transparent.png?1611565240',
						chainId: 1,
						address: '0x59a921db27dd6d4d974745b7ffc5c33932653442',
						name: 'Mirrored Google',
						symbol: 'MGOOGL',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14020/thumb/mirror_logo_transparent.png?1613718368',
						chainId: 1,
						address: '0x0e99cc0535bb6251f6679fa6e65d6d3b430e840b',
						name: 'Mirrored Facebook',
						symbol: 'MFB',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13649/thumb/mirror_logo_transparent.png?1611565655',
						chainId: 1,
						address: '0x1d350417d9787e000cc1b95d70e9536dcd91f373',
						name: 'Mirrored iShares Go',
						symbol: 'MIAU',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13396/thumb/mirror_logo_transparent.png?1611564779',
						chainId: 1,
						address: '0x41bbedd7286daab5910a1f15d12cbda839852bd7',
						name: 'Mirrored Microsoft',
						symbol: 'MMSFT',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13643/thumb/mirror_logo_transparent.png?1611565277',
						chainId: 1,
						address: '0xc8d674114bac90148d11d3c1d33c61835a0f9dcd',
						name: 'Mirrored Netflix',
						symbol: 'MNFLX',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13645/thumb/mirror_logo_transparent.png?1611565327',
						chainId: 1,
						address: '0x13b02c8de71680e71f0820c996e4be43c2f57d15',
						name: 'Mirrored Invesco QQ',
						symbol: 'MQQQ',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13642/thumb/mirror_logo_transparent.png?1611565255',
						chainId: 1,
						address: '0x9d1555d8cb3c846bb4f7d5b1b1080872c3166676',
						name: 'Mirrored iShares Si',
						symbol: 'MSLV',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13644/thumb/mirror_logo_transparent.png?1611565294',
						chainId: 1,
						address: '0x21ca39943e91d704678f5d00b6616650f066fd63',
						name: 'Mirrored Tesla',
						symbol: 'MTSLA',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13639/thumb/mirror_logo_transparent.png?1611564718',
						chainId: 1,
						address: '0xedb0414627e6f1e3f082de65cd4f9c693d78cca9',
						name: 'Mirrored Twitter',
						symbol: 'MTWTR',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13640/thumb/mirror_logo_transparent.png?1611564829',
						chainId: 1,
						address: '0x31c63146a635eb7465e5853020b39713ac356991',
						name: 'Mirrored United Sta',
						symbol: 'MUSO',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13638/thumb/mirror_logo_transparent.png?1611564742',
						chainId: 1,
						address: '0xf72fcd9dcf0190923fadd44811e240ef4533fc86',
						name: 'Mirrored ProShares ',
						symbol: 'MVIXY',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'mirror',
				},
			},
		],
	},
	{
		name: 'Mith Cash',
		slug: 'mith-cash',
		links: [
			'https://mith.cash',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/3484/thumb/mithril.png?1548085086',
						chainId: 1,
						address: '0x3893b9422cd5d70a81edeffe3d5a1c6a978310bb',
						name: 'Mithril',
						symbol: 'MITH',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13478/thumb/3uZAPv2CbXF5txM.png?1608947522',
						chainId: 1,
						address: '0xcd1cb16a67937ff8af5d726e2681010ce1e9891a',
						name: 'Themis',
						symbol: 'MIS',
						decimals: 8,
					},
				],
				providers: {
					zapper: 'mith-cash',
				},
			},
		],
	},
	{
		name: 'Mitosis',
		slug: 'mitosis',
		links: [
			'https://expedition.mitosis.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mitosis',
				},
			},
		],
	},
	{
		name: 'MM.Finance',
		slug: 'mm-finance',
		links: [
			'https://mm.finance',
		],
		colors: [
			'#cda16f',
		],
		views: [
			{
				chainId: 25,
				erc20Tokens: [
					{
						address: '0x97749c9b61f878a880dfe312d2594ae07aed7656',
					},
				],
				providers: {
					zapper: 'mm-finance',
				},
			},
		],
	},
	{
		name: 'MOBLAND',
		slug: 'mobland',
		links: [
			'https://mob.land',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mobland',
				},
			},
		],
	},
	{
		name: 'MOCA (Museum of Crypto Art)',
		slug: 'moca',
		links: [
			'https://app.museumofcryptoart.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'moca',
				},
			},
		],
	},
	{
		name: 'Mode Network',
		slug: 'mode-network',
		links: [
			'https://www.mode.network',
		],
		views: [
			{
				providers: {
					zapper: 'mode-network',
				},
			},
		],
	},
	{
		name: 'MODragon',
		slug: 'modragon',
		links: [
			'https://www.mobox.io/dragonverse',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'modragon',
				},
			},
		],
	},
	{
		name: 'Monolith',
		slug: 'monolith',
		links: [
			'https://monolith.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'monolith',
				},
			},
		],
	},
	{
		name: 'Monoswap',
		slug: 'monoswap',
		links: [
			'https://www.monoswap.io',
		],
		views: [
			{
				name: 'Monoswap V2',
				slug: 'v2',
				chainId: undefined,
				providers: {
					zapper: 'monoswap-v2',
				},
			},
		],
	},
	{
		name: 'Moola',
		slug: 'moola',
		links: [
			'https://moola.market',
		],
		views: [
			{
				chainId: 42220,
				providers: {
					zapper: 'moola',
				},
			},
		],
	},
	{
		name: 'MoonBase',
		slug: 'moonbase',
		links: [
			'https://www.moonbase.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'MoonBase',
				},
			},
		],
	},
	{
		name: 'Moonbeam Staking',
		slug: 'moonbeam-staking',
		links: [
			'https://apps.moonbeam.network/moonbeam/staking',
		],
		views: [
			{
				providers: {
					zapper: 'moonbeam-staking',
				},
			},
		],
	},
	{
		name: 'Moonbirds',
		slug: 'moonbirds',
		links: [
			'https://www.proof.xyz/moonbirds',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'moonbirds',
				},
			},
		],
	},
	{
		name: 'Moonrock',
		slug: 'moonrock',
		links: [
			'https://moonrock.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'moonrock',
				},
			},
		],
	},
	{
		name: 'Moonwell',
		slug: 'moonwell',
		links: [
			'https://moonwell.fi',
		],
		views: [
			{
				chainId: 1284,
				providers: {
					llamafolio: 'moonwell',
					zapper: 'moonwell',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'moonwell',
					zapper: 'moonwell',
				},
			},
		],
	},
	{
		name: 'MORCHI',
		slug: 'morchi',
		links: [
			'https://morchi.mooar.com',
		],
		views: [
			{
				providers: {
					zapper: 'morchi',
				},
			},
		],
	},
	{
		name: 'MorFi',
		slug: 'morfi',
		links: [
			'https://morfi.io',
		],
		views: [
			{
				providers: {
					zapper: 'morfi',
				},
			},
		],
	},
	{
		name: 'Morph Bridge',
		slug: 'morph-bridge',
		links: [
			'https://bridge.morphl2.io',
		],
		views: [
			{
				providers: {
					zapper: 'morph-bridge',
				},
			},
		],
	},
	{
		name: 'Morpheus Swap',
		slug: 'morpheus-swap',
		links: [
			'https://morpheusswap.finance',
		],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0x0789ff5ba37f72abc4d561d00648acadc897b32d',
					},
				],
				providers: {
					llamafolio: 'morpheus-swap',
					zapper: 'morpheus-swap',
				},
			},
		],
	},
	{
		name: 'Morpheus',
		slug: 'morpheus',
		links: [
			'https://mor.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'morpheus',
				},
			},
		],
	},
	{
		name: 'Morphex',
		slug: 'morphex',
		links: [
			'https://www.morphex.trade',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'morphex',
					zapper: 'morphex',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'morphex',
					zapper: 'morphex',
				},
			},
		],
	},
	{
		name: 'Morpho',
		slug: 'morpho',
		links: [
			'https://morpho.org',
			'https://app.morpho.org',
			'https://app.morpho.xyz',
		],
		colors: [
			'#14183D',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'morpho',
				},
			},
			{
				chainId: 1,
				name: 'Morpho Aave',
				slug: 'morpho-aave',
				links: [
					'https://aavev2.morpho.org',
				],
				providers: {
					llamafolio: 'morpho-aave',
				},
			},
			{
				chainId: 1,
				name: 'Morpho AaveV3',
				slug: 'morpho-aavev3',
				links: [
					'https://aavev3.morpho.org',
				],
				providers: {
					llamafolio: 'morpho-aavev3',
				},
			},
			{
				chainId: 1,
				name: 'Morpho Blue',
				slug: 'morpho-blue',
				links: [
					'https://app.morpho.org',
				],
				providers: {
					llamafolio: 'morpho-blue',
				},
			},
			{
				chainId: 1,
				name: 'Morpho Compound',
				slug: 'morpho-compound',
				links: [
					'https://compound.morpho.org',
				],
				providers: {
					llamafolio: 'morpho-compound',
				},
			},
		],
	},
	{
		name: 'Moshi.cam',
		slug: 'moshicam',
		links: [
			'https://moshi.cam',
		],
		views: [
			{
				providers: {
					zapper: 'moshicam',
				},
			},
		],
	},
	{
		name: 'Mountain Protocol',
		slug: 'mountain-protocol',
		links: [
			'https://mountainprotocol.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'mountain-protocol',
					zapper: 'mountain-protocol',
				},
			},
		],
	},
	{
		name: 'Mover',
		slug: 'mover',
		links: [
			'https://viamover.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'mover',
				},
			},
		],
	},
	{
		name: 'Moxie',
		slug: 'moxie',
		icon: MoxieIcon,
		colors: [
			'#6a2de0',
			'#8e55ff',
			'#a577ff',
			'#bb99ff',
			'#d2bbff',
			'#e8ddff',
		],
		links: [
			'https://www.moxie.xyz',
		],

		showCustomUi: ['Explorer', 'Account'],

		views: [
			{
				showOn: ['Dashboard'],

				chainId: 8453,
				components: [
					MoxiePage,
				],
				erc20Tokens: [
					{
						symbol: 'MOXIE',
						address: '0x8C9037D1Ef5c6D1f6816278C7AAF5491d24CD527',
					},
				],
				providers: {
					zapper: 'moxie-protocol',
				},
			},
		],
	},
	{
		name: 'mStable',
		slug: 'mstable',
		links: [
			'https://mstable.org',
		],
		colors: [
			'#4aa1ff',
			'#000000',
		], // '#176ede' unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/7180/thumb/logo_brown.png?1547043731',
						chainId: 1,
						address: '0x7e8c149f70437eba6785f9059190a5b08abf03de',
						name: 'MiniBitcoin',
						symbol: 'MBTC',
						decimals: 8,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11576/thumb/mStable_USD.png?1595591803',
						chainId: 1,
						address: '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
						name: 'mStable USD',
						symbol: 'MUSD',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'mstable',
					zapper: 'mstable',
					zerionDefiSDK: [
						'mStable',
						'mStable V2',
					],
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11846/thumb/mStable.png?1594950533',
						chainId: 1,
						address: '0xa3bed4e1c75d00fa6f4e5e6922db7261b5e9acd2',
						name: 'mStable Governance ',
						symbol: 'MTA',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'mStable • Staking',
					],
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'mstable',
				},
			},
		],
	},
	{
		name: 'Mu Exchange',
		slug: 'mu-exchange',
		links: [
			'https://www.mu.exchange',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'mu-exchange',
					zapper: 'mu-finance',
				},
			},
		],
	},
	{
		name: 'MugenFinance',
		slug: 'mugenfinance',
		links: [
			'https://www.mugenfinance.com',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'mugenfinance',
				},
			},
		],
	},
	{
		name: 'Multichain',
		slug: 'multichain',
		links: [
			'https://multichain.org',
			'https://app.multichain.org',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
			{
				chainId: 42220,
				providers: {
					llamafolio: 'multichain',
					zapper: 'multichain',
				},
			},
		],
	},
	{
		name: 'Mummy Finance',
		slug: 'mummy-finance',
		links: [
			'https://www.mummy.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'mummy-finance',
					zapper: 'mummy-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'mummy-finance',
					zapper: 'mummy-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'mummy-finance',
					zapper: 'mummy-finance',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'mummy-finance',
					zapper: 'mummy-finance',
				},
			},
		],
	},
	{
		name: 'Munchables',
		slug: 'munchables',
		links: [
			'https://www.munchables.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'munchables',
				},
			},
		],
	},
	{
		name: 'Mushrooms Finance',
		slug: 'mushrooms',
		links: [
			'https://mushrooms.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/16825/thumb/logo200x200.png?1625834139',
						chainId: 1,
						address: '0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611',
						name: 'Million',
						symbol: 'MM',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'mushroom',
				},
			},
		],
	},
	{
		name: 'MUX',
		slug: 'mux',
		links: [
			'https://mux.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mux',
				},
			},
		],
	},
	{
		name: 'MXC',
		slug: 'mxc',
		links: [
			'https://www.mxc.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mxc',
				},
			},
		],
	},
	{
		name: 'Mycelium',
		slug: 'mycelium',
		links: [
			'https://swaps.mycelium.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'mycelium',
				},
			},
		],
	},
	{
		name: 'Nametag',
		slug: 'nametag',
		links: [
			'https://nametag.org',
		],
		views: [
			{
				name: 'Tagify',
				slug: 'tagify',
				chainId: undefined,
				providers: {
					zapper: 'tagify',
				},
			},
		],
	},
	{
		name: 'Naos',
		slug: 'naos',
		links: [
			'https://naos.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'naos',
				},
			},
		],
	},
	{
		name: 'Napier Finance',
		slug: 'napier-finance',
		links: [
			'https://napier.finance',
		],
		views: [
			{
				providers: {
					zapper: 'napier-finance',
				},
			},
		],
	},
	{
		name: 'Nasdex',
		slug: 'nasdex',
		links: [
			'https://www.nasdex.xyz',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'nasdex',
				},
			},
		],
	},
	{
		name: 'Native',
		slug: 'native',
		links: [
			'https://native.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'native',
				},
			},
		],
	},
	{
		name: 'NEAR',
		slug: 'near',
		links: [
			'https://near.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'near-protocol',
				},
			},
		],
	},
	{
		name: 'Nebula Revelation',
		slug: 'nebula-revelation',
		links: [
			'https://nebularevelation.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nebula-revelation',
				},
			},
		],
	},
	{
		name: 'Nemesis DAO',
		slug: 'nemesis-dao',
		links: [
			'https://nemesisdao.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'nemesis-dao',
				},
			},
		],
	},
	{
		name: 'NEO TOKYO',
		slug: 'neo-tokyo',
		links: [
			'https://neotokyo.codes',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'NEO-TOKYO',
				},
			},
		],
	},
	{
		name: 'NEOPIN Pool',
		slug: 'neopin-pool',
		links: [
			'https://app.neopin.io/swap',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'neopin-pool',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'neopin-pool',
				},
			},
		],
	},
	{
		name: 'Nereus Finance',
		slug: 'nereus-finance',
		links: [
			'https://nereus.finance',
		],
		colors: [
			'#4D4AEC',
		],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0xfcde4a87b8b6fa58326bb462882f1778158b02f1',
					},
				],
				providers: {
					zapper: 'nereus-finance',
				},
			},
		],
	},
	{
		name: 'Nether Fi',
		slug: 'nether-fi',
		links: [
			'https://netherlabs.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nether-fi',
				},
			},
		],
	},
	{
		name: 'Netswap',
		slug: 'netswap',
		links: [
			'https://netswap.io',
		],
		views: [
			{
				providers: {
					zapper: 'netswap',
				},
			},
		],
	},
	{
		name: 'New Dawn',
		slug: 'new-dawn',
		links: [
			'https://newdawn.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'New-Dawn',
				},
			},
		],
	},
	{
		name: 'New Order',
		slug: 'new-order',
		links: [
			'https://www.neworder.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'new-order',
				},
			},
		],
	},
	{
		name: 'NewThrone',
		slug: 'newthrone',
		links: [
			'https://www.newthrone.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'NewThrone',
				},
			},
		],
	},
	{
		name: 'Nexus Mutual',
		slug: 'nexus-mutual',
		links: [
			'https://nexusmutual.io',
		],
		colors: [
			'#1eab89',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11810/thumb/nexus-mutual.jpg?1594547726',
						chainId: 1,
						address: '0xd7c49cee7e9188cca6ad8ff264c1da2e69d4cf3b',
						name: 'Nexus Mutual',
						symbol: 'NXM',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11890/thumb/wrapped-nexus-mutual.jpg?1595811559',
						chainId: 1,
						address: '0x0d438f3b5175bebc262bf23753c1e53d03432bde',
						name: 'Wrapped NXM',
						symbol: 'WNXM',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'nexus-mutual',
					theGraph: 'https://api.thegraph.com/subgraphs/name/nexusmutual/nexus-mutual',
					zapper: 'nexus-mutual',
					zerionDefiSDK: [
						'Nexus Mutual',
					],
				},
			},
		],
	},
	{
		name: 'NFT Degen',
		slug: 'nft-degen',
		links: [
			'https://nftdegen.lol',
		],
		views: [
			{
				providers: {
					zapper: 'nft-degen',
				},
			},
		],
	},
	{
		name: 'NFT Worlds',
		slug: 'nft-worlds',
		links: [
			'https://nftworlds.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nft-worlds',
				},
			},
		],
	},
	{
		name: 'NFT20',
		slug: 'nft20',
		links: [
			'https://nft20.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'nft20',
				},
			},
		],
	},
	{
		name: 'NFTEarth',
		slug: 'nftearth',
		links: [
			'https://nftearth.exchange/ethereum',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'NFTEarth',
				},
			},
		],
	},
	{
		name: 'NFTfi',
		slug: 'nftfi',
		links: [
			'https://nftfi.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nft-fi',
				},
			},
		],
	},
	{
		name: 'NFTs2Me',
		slug: 'nfts2me',
		links: [
			'https://nfts2me.com',
		],
		views: [
			{
				chainId: undefined,
				contracts: [
					{
						address: '0x00000000001594c61dd8a6804da9ab58ed2483ce',
					}
				],
				providers: {
					zapper: '0x00000000001594c61dd8a6804da9ab58ed2483ce',
				},
			},
		],
	},
	{
		name: 'NFTX',
		slug: 'nftx',
		links: [
			'https://nftx.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13574/thumb/NFTX_%28Real%29.jpg?1613449530',
						chainId: 1,
						address: '0x87d73e916d7057945c9bcd8cdd94e42a6f47f776',
						name: 'NFTX',
						symbol: 'NFTX',
						decimals: 18,
					},
					erc20TokensByContractAddress['0x0fe629d1e84e171f8ff0c1ded2cc2221caa48a3f'], // NFTX Hashmasks Index
				],
				providers: {
					zapper: 'nftx',
				},
			},
		],
	},
	{
		name: 'NFTY.Finance',
		slug: 'nfty',
		links: [
			'https://www.nfty.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nfty',
				},
			},
		],
	},
	{
		name: 'nice2win',
		slug: 'nice2win',
		links: [
			'https://nice2win.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nice2win',
				},
			},
		],
	},
	{
		name: 'Nifty Island',
		slug: 'nifty-island',
		links: [
			'https://niftyisland.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nifty-island',
				},
			},
		],
	},
	{
		name: 'Nile Exchange',
		slug: 'nile-exchange',
		links: [
			'https://www.nile.build',
		],
		views: [
			{
				providers: {
					zapper: 'nile-exchange',
				},
			},
		],
	},
	{
		name: '9dcc',
		slug: '9dcc-iteration-03',
		links: [
			'https://www.9dcc.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: '9dcc-iteration-03',
				},
			},
		],
	},
	{
		name: '9inch',
		slug: '9inch',
		links: [
			'https://www.9inch.io',
			'https://app.9inch.io/?chain=pulsechain',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: '9inch',
					zapper: '9inch-DEX',
				},
			},
		],
	},
	{
		name: 'Nocturne',
		slug: 'nocturne',
		links: [
			'https://nocturne.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nocturne',
				},
			},
		],
	},
	{
		name: 'Node AI',
		slug: 'node-ai',
		links: [
			'https://nodes.ai',
			'https://manage.nodes.ai/dashboard',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'node-ai',
				},
			},
		],
	},
	{
		name: 'NodeDAO',
		slug: 'nodedao',
		links: [
			'https://www.nodedao.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'nodedao',
				},
			},
		],
	},
	{
		name: 'Noggles',
		slug: 'noggles',
		links: [
			'https://noggles.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'noggles',
				},
			},
		],
	},
	{
		name: 'Nomis',
		slug: 'nomis',
		links: [
			'https://nomis.cc',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nomis',
				},
			},
		],
	},
	{
		name: 'Non-Fungible Fungi',
		slug: 'non-fungibile-fungi',
		links: [
			'https://www.thefungi.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'non-fungibile-fungi',
				},
			},
		],
	},
	{
		name: 'Not Financial Advice',
		slug: 'nfa',
		links: [
			'https://nfa.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'n=f(a)',
				},
			},
		],
	},
	{
		name: 'Notional Finance',
		slug: 'notional-finance',
		links: [
			'https://notional.finance',
		],
		views: [
			{
				name: 'Notional Finance V3',
				slug: 'v3',
				chainId: undefined,
				providers: {
					zapper: 'notional-finance-v3',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'notional',
					zapper: 'notional-finance',
				},
			},
		],
	},
	{
		name: 'Nouns Builder',
		slug: 'nouns-builder',
		links: [
			'https://nouns.build',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'nouns-builder',
				},
			},
		],
	},
	{
		name: 'Nouns DAO',
		slug: 'nouns',
		links: [
			'https://nouns.wtf',
		],
		colors: [
			'#D53C5E',
		],
		icon: NounsIcon,
		views: [
			{
				chainId: 1,
				contracts: [
					{
						name: 'Nouns DAO: Treasury',
						address: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10',
					},
				],
				nfts: [
					{
						name: 'Nouns',
						address: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
						symbol: 'NOUN',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
					zapper: 'nouns-dao',
				},
			},
		],
	},
	{
		name: 'Nova DAO',
		slug: 'nova-dao',
		links: [
			'https://novadao.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Nova-DAO',
				},
			},
		],
	},
	{
		name: 'Nsure Network',
		slug: 'nsure-network',
		links: [
			'https://nsure.network',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12948/thumb/Nsure_token.png?1603778876',
						chainId: 1,
						address: '0x20945ca1df56d237fd40036d47e866c7dccd2114',
						name: 'Nsure Network',
						symbol: 'NSURE',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'nsure-network',
				},
			},
		],
	},
	{
		name: 'Numbers Protocol',
		slug: 'numbers-protocol',
		links: [
			'https://www.numbersprotocol.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'numbers-protocol',
				},
			},
		],
	},
	{
		name: 'Numerai',
		slug: 'numerai',
		links: [
			'https://numer.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'numerai',
				},
			},
		],
	},
	{
		name: 'numun.fi',
		slug: 'numunfi',
		links: [
			'https://numun.fi',
		],
		views: [
			{
				providers: {
					zapper: 'numunfi',
				},
			},
		],
	},
	{
		name: 'OasisSwap',
		slug: 'oasis-swap',
		links: [
			'https://oasisswap.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'oasis-swap',
				},
			},
		],
	},
	{
		name: 'Oath',
		slug: 'oath',
		links: [
			'https://www.oath.eco',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'oath',
				},
			},
		],
	},
	{
		name: 'Ocean Protocol',
		slug: 'ocean-protocol',
		links: [
			'https://oceanprotocol.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ocean-protocol',
				},
			},
		],
	},
	{
		name: 'Odos',
		slug: 'odos',
		links: [
			'https://odos.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'odos',
				},
			},
		],
	},
	{
		name: 'OKX',
		slug: 'okx',
		links: [
			'https://www.okx.com',
		],
		views: [
			{
				name: 'OKX DEX',
				slug: 'okx-dex',
				links: [
					'https://www.okx.com/web3',
				],
				chainId: undefined,
				providers: {
					zapper: 'okx-dex',
				},
			},
		],
	},
	{
		name: 'Olive',
		slug: 'olive',
		links: [
			'https://www.oliveapp.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'olive',
				},
			},
		],
	},
	{
		name: 'OlympusDAO',
		slug: 'olympus',
		links: [
			'https://www.olympusdao.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14483/thumb/token_OHM_%281%29.png?1628311611',
						chainId: 1,
						address: '0x383518188c0c6d7730d91b2c03a03c837814a899',
						name: 'Olympus',
						symbol: 'OHM',
						decimals: 9,
					},
				],
				providers: {
					llamafolio: 'olympus-dao',
					zapper: 'olympus',
				},
			},
		],
	},
	{
		name: 'OmniBTC',
		slug: 'omni-btc',
		links: [
			'https://app.omnibtc.finance/swap',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'omni-btc',
				},
			},
		],
	},
	{
		name: 'OmniKingdoms',
		slug: 'omni-kingdoms',
		links: [
			'https://www.omnikingdoms.io',
		],
		views: [
			{
				providers: {
					zapper: 'omni-kingdoms',
				},
			},
		],
	},
	{
		name: 'Omni Network',
		slug: 'omni-network',
		links: [
			'https://omni.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'omni-network',
				},
			},
		],
	},
	{
		name: 'OmniX',
		slug: 'omni-x',
		links: [
			'https://omnix.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'omni-x',
				},
			},
		],
	},
	{
		name: 'Omni Liquid Staking',
		slug: 'omnilst',
		links: [
			'https://omni.ls',
		],
		views: [
			{
				providers: {
					zapper: 'omnilst',
				},
			},
		],
	},
	{
		name: 'Ondo',
		slug: 'ondo',
		links: [
			'https://ondo.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'ondo-finance',
					zapper: 'ondo',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'ondo-finance',
				},
			},
		],
	},
	{
		name: '1inch',
		slug: '1inch',
		links: [
			'https://1inch.io',
			'https://1inch.exchange',
		],
		colors: [
			'#94a6c3',
			'#d82122',
			'#0a192b',
		],
		views: [
			{
				slug: 'ethereum',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13469/thumb/1inch-token.png?1608803028',
						chainId: 1,
						address: '0x111111111117dc0aa78b770fa6a738034120c302',
						name: '1inch',
						symbol: '1INCH',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: '1inch-network',
					theGraph: 'https://api.thegraph.com/subgraphs/name/1inch-exchange/one-inch-v2',
					zapper: 'one-inch',
					// zapper: '1inch',
					zerionDefiSDK: [
						'1inch Liquidity Protocol',
						'1inch LP • Staking',
					],
				},
			},
			{
				name: 'Chi Gastoken',
				slug: 'chi',
				colors: [
					'#d21318',
					'#3d3d3c',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11583/thumb/chi.png?1591331659',
						chainId: 1,
						address: '0x0000000000004946c0e9f43f4dee607b0ef1fa1c',
						name: 'Chi Gastoken',
						symbol: 'CHI',
						decimals: 0,
					},
				],
				providers: {
					zerionDefiSDK: [
						'Chi Gastoken by 1inch',
					],
				},
			},
			{
				slug: 'bsc',
				chainId: 56,
				providers: {
					zapper: 'one-inch',
					// zapper: '1inch',
				},
			},
			{
				slug: 'polygon',
				chainId: 137,
				providers: {
					zapper: 'one-inch',
					// zapper: '1inch',
				},
			},
			{
				name: 'Mooniswap',
				slug: 'mooniswap',
				chainId: 1,
				links: [
					'https://mooniswap.exchange',
				],
				providers: {
					zapper: 'mooniswap',
					zerionDefiSDK: [
						'Mooniswap',
					],
				},
			},
		],
	},
	{
		name: 'OnX Finance',
		slug: 'onx',
		links: [
			'https://onx.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13445/thumb/onxlogo-1.png?1608629659',
						chainId: 1,
						address: '0xe0ad1806fd3e7edf6ff52fdb822432e847411033',
						name: 'OnX Finance',
						symbol: 'ONX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'onx',
				},
			},
		],
	},
	{
		name: 'Onyx Protocol',
		slug: 'onyx-protocol',
		links: [
			'https://app.onyx.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'onyx-protocol',
				},
			},
		],
	},
	{
		name: 'Ooki',
		slug: 'ooki',
		links: [
			'https://ooki.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ooki',
				},
			},
		],
	},
	{
		name: 'Open Dollar',
		slug: 'open-dollar',
		links: [
			'https://www.opendollar.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'open-dollar',
				},
			},
		],
	},
	{
		name: 'OpenLeverage',
		slug: 'open-leverage',
		links: [
			'https://openleverage.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'openleverage',
				},
			},
			{
				chainId: 56,
				providers: {
					zapper: 'openleverage',
				},
			},
		],
	},
	{
		name: 'OpenOcean',
		slug: 'open-ocean',
		links: [
			'https://openocean.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'open-ocean',
				},
			},
		],
	},
	{
		name: 'OpenEden',
		slug: 'openeden',
		links: [
			'https://openeden.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'openeden',
				},
			},
		],
	},
	{
		name: 'OpenLeverage',
		slug: 'openleverage',
		links: [
			'https://openleverage.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'openleverage',
				},
			},
		],
	},
	{
		name: 'OpenSea',
		slug: 'opensea',
		links: [
			'https://opensea.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'opensea',
				},
			},
			{
				name: 'Opensea Pro',
				slug: 'gem',
				links: [
					'https://pro.opensea.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'gem',
				},
			},
		],
	},
	{
		name: 'OpenXswap',
		slug: 'openxswap',
		links: [
			'https://openxswap.exchange',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'openxswap',
				},
			},
		],
	},
	{
		name: 'Opium',
		slug: 'opium',
		links: [
			'https://opium.network',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13758/thumb/opium-token-black_%281%29.png?1611767960',
						chainId: 1,
						address: '0x888888888889c00c67689029d7856aac1065ec11',
						name: 'Opium',
						symbol: 'OPIUM',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'opium',
					zapper: 'opium-network',
					theGraph: 'https://api.thegraph.com/subgraphs/name/opiumprotocol/opium-network',
				},
			},
		],
	},
	{
		name: 'OPNX',
		slug: 'opnx',
		links: [
			'https://opnx.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'opnx',
				},
			},
		],
	},
	{
		name: 'Opolis',
		slug: 'opolis',
		links: [
			'https://opolis.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'opolis',
				},
			},
		],
	},
	{
		name: 'Optimism',
		slug: 'optimism',
		icon: OptimismIcon,
		colors: [
			'#ff0420',
		],
		links: [
			'https://www.optimism.io',
		],
		views: [
			{
				name: 'Optimism Governance',
				slug: 'optimism',
				chainId: undefined,
				providers: {
					zapper: 'optimism',
				},
			},
			{
				name: 'Optimism Gateway',
				slug: 'optimism-gateway',
				links: [
					'https://gateway.optimism.io/welcome',
				],
				chainId: undefined,
				providers: {
					zapper: 'optimism-gateway',
				},
			},
		],
	},
	{
		name: 'OPX Finance',
		slug: 'opx-finance',
		links: [
			'https://www.opx.finance/#/trade',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'opx-finance',
					zapper: 'opx',
				},
			},
		],
	},
	{
		name: 'Opyn',
		slug: 'opyn',
		links: [
			'https://www.opyn.co',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'opyn',
				},
			},
			{
				name: 'Squeeth',
				slug: 'squeeth',
				links: [
					'https://squeeth.opyn.co',
				],
				chainId: 1,
				providers: {
					llamafolio: 'opyn-squeeth',
				},
			},
		],
	},
	{
		name: 'Orange Finance',
		slug: 'orange-finance',
		links: [
			'https://app.orangefinance.io',
		],
		views: [
			{
				providers: {
					zapper: 'orange-finance',
				},
			},
		],
	},
	{
		name: 'ORA',
		slug: 'oraprotocol',
		links: [
			'https://www.ora.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'oraprotocol',
				},
			},
		],
	},
	{
		name: 'ORB',
		slug: 'orb',
		links: [
			'https://www.orbtoken.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'orb',
				},
			},
		],
	},
	{
		name: 'Orbit Protocol',
		slug: 'orbit-protocol',
		links: [
			'https://app.orbitlending.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'orbit-protocol',
				},
			},
		],
	},
	{
		name: 'Orbiter Finance',
		slug: 'orbiter-finance',
		links: [
			'https://www.orbiter.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'orbiter-finance',
				},
			},
		],
	},
	{
		name: 'Orderly Network',
		slug: 'orderly-network',
		links: [
			'https://orderly.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'orderly-network',
				},
			},
		],
	},
	{
		name: 'Origami Finance',
		slug: 'origami',
		links: [
			'https://origami.finance',
		],
		views: [
			{
				providers: {
					zapper: 'origami',
				},
			},
		],
	},
	{
		name: 'Origin DeFi',
		slug: 'origin-defi',
		links: [
			'https://www.originprotocol.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'origin-defi',
				},
			},
		],
	},
	{
		name: 'Origin Story',
		slug: 'origin-story',
		links: [
			'https://www.story.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'origin-story',
				},
			},
		],
	},
	{
		name: 'Origin',
		slug: 'origin',
		links: [
			'https://ousd.com',
		],
		colors: [
			'#1762ee',
		],
		views: [
			{
				slug: 'origin',
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26',
					},
				],
				providers: {
					zapper: 'origin',
				},
			},
			{
				name: 'Origin Dollar',
				slug: 'dollar',
				chainId: 1,
				providers: {
					llamafolio: 'origin-dollar',
					zapper: 'origin-dollar',
				},
			},
			{
				name: 'Origin Dollar Governance',
				slug: 'origin-dollar-governance',
				chainId: undefined,
				providers: {
					zapper: 'origin-dollar-governance',
				},
			},
			{
				name: 'Origin Story',
				slug: 'story',
				links: [
					'https://www.story.xyz',
				],
				chainId: 1,
				providers: {
					zapper: 'origin-story',
				},
			},
		],
	},
	{
		name: 'Orion Protocol',
		slug: 'orion',
		links: [
			'https://www.orionprotocol.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11841/thumb/orion_logo.png?1594943318',
						chainId: 1,
						address: '0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a',
						name: 'Orion Protocol',
						symbol: 'ORN',
						decimals: 8,
					},
				],
				providers: {
					zapper: 'orion-protocol',
				},
			},
		],
	},
	{
		name: 'OstrichSwap',
		slug: 'ostrich-love',
		links: [
			'https://ostrich.love',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ostrich-love',
				},
			},
		],
	},
	{
		name: 'OTSea',
		slug: 'otsea',
		links: [
			'https://www.otsea.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'otsea',
				},
			},
		],
	},
	{
		name: 'Otterclam',
		slug: 'otterclam',
		links: [
			'https://www.otterclam.finance',
		],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0xc250e9987a032acac293d838726c511e6e1c029d',
					},
				],
				providers: {
					zapper: 'otterclam',
				},
			},
		],
	},
	{
		name: 'Overload Finance',
		slug: 'overload',
		links: [
			'https://app.overload.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'overload',
				},
			},
		],
	},
	{
		name: 'OVERLORD',
		slug: 'overlord',
		links: [
			'https://www.overlord.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'OVERLORD',
				},
			},
		],
	},
	{
		name: 'Overnight Finance',
		slug: 'overnight',
		links: [
			'https://overnight.fi',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'overnight-finance',
					zapper: 'overnight',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'overnight-finance',
					zapper: 'overnight',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'overnight-finance',
					zapper: 'overnight',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'overnight-finance',
					zapper: 'overnight',
				},
			},
		],
	},
	{
		name: 'Overtime Markets',
		slug: 'overtime-markets',
		links: [
			'https://www.overtimemarkets.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'overtime-markets',
				},
			},
		],
	},
	{
		name: 'Owlto Finance',
		slug: 'owlto-finance',
		links: [
			'https://owlto.finance/bridge',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Owlto-Finance',
				},
			},
		],
	},
	{
		name: 'PAAL AI',
		slug: 'paal-ai',
		links: [
			'https://paalai.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'paal-ai',
					zapper: 'paal-ai',
				},
			},
		],
	},
	{
		name: 'Pac Finance',
		slug: 'pac-finance',
		links: [
			'https://www.pac.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pac-finance',
				},
			},
		],
	},
	{
		name: 'PAID NETWORK',
		slug: 'paid-network',
		links: [
			'https://paidnetwork.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'paid-network',
				},
			},
		],
	},
	{
		name: 'Paladin',
		slug: 'paladin',
		links: [
			'https://paladin.vote',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'paladin-finance',
					zapper: 'paladin',
				},
			},
			{
				name: 'Paladin Warlord',
				slug: 'paladin-warlord',
				links: [
					'https://warlord.paladin.vote',
				],
				chainId: 1,
				providers: {
					llamafolio: 'paladin-warlord',
				},
			},
		],
	},
	{
		name: 'Palette',
		slug: 'palette',
		links: [
			'https://palette.haus',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'palette',
				},
			},
		],
	},
	{
		name: 'Palm NFT Studio',
		slug: 'palm-studio',
		links: [
			'https://palmnftstudio.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'palm-studio',
				},
			},
		],
	},
	{
		name: 'PancakeSwap',
		slug: 'pancakeswap',
		links: [
			'https://pancakeswap.finance',
		],
		views: [
			{
				name: 'PancakeSwap V3',
				slug: 'v3',
				chainId: undefined,
				providers: {
					zapper: 'pancakeswap-v3',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'pancakeswap',
					zapper: 'pancakeswap',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'pancakeswap',
				},
			},
		],
	},
	{
		name: 'Pandora',
		slug: 'pandora',
		links: [
			'https://pandora.digital',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'pandora',
				},
			},
		],
	},
	{
		name: 'Pangolin',
		slug: 'pangolin',
		links: [
			'https://pangolin.exchange',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'pangolin',
					zapper: 'pangolin',
				},
			},
		],
	},
	{
		name: 'Panoptic',
		slug: 'panoptic',
		links: [
			'https://panoptic.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'panoptic',
				},
			},
		],
	},
	{
		name: 'Panz Raffle',
		slug: 'panz-raffle',
		links: [
			'https://panz.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'panz-raffle',
				},
			},
		],
	},
	{
		name: 'Papr',
		slug: 'papr',
		links: [
			'https://papr.wtf',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'papr',
				},
			},
		],
	},
	{
		name: 'Own The Doge',
		slug: 'own-the-doge',
		links: [
			'https://www.ownthedoge.com',
		],
		views: [
			{
				name: 'Pixel Portal',
				slug: 'pixel-portal',
				links: [
					'https://pixels.ownthedoge.com',
				],
				views: [
					{
						providers: {
							zapper: 'pixelportal',
						},
					},
				],
			},
		],
	},
	{
		name: 'Papyrus Swap',
		slug: 'papyrus-swap',
		links: [
			'https://papyrusswap.com',
		],
		views: [
			{
				providers: {
					zapper: 'papyrus-swap',
				},
			},
		],
	},
	{
		name: 'ParaX',
		slug: 'para-space',
		links: [
			'https://parax.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'para-space',
				},
			},
		],
	},
	{
		name: 'Parabol',
		slug: 'parabol',
		links: [
			'https://www.parabol.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'parabol',
				},
			},
		],
	},
	{
		name: 'Paragons DAO',
		slug: 'paragonsdao',
		links: [
			'https://paragonsdao.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ParagonsDAO',
				},
			},
		],
	},
	{
		name: 'Parallax Finance',
		slug: 'parallax-finance',
		links: [
			'https://parallaxfinance.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'parallax-finance',
				},
			},
		],
	},
	{
		name: 'Parallel Protocol',
		slug: 'parallel-protocol',
		links: [
			'https://mimo.capital',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'parallel-protocol',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'parallel-protocol',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'parallel-protocol',
				},
			},
		],
	},
	{
		name: 'Parallel TCG',
		slug: 'parallel-tcg',
		links: [
			'https://parallel.life',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'parallel',
				},
			},
		],
	},
	{
		name: 'Paraswap',
		slug: 'paraswap',
		links: [
			'https://paraswap.io',
		],
		colors: [
			'#0060D8',
		], // unofficial
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'paraswap',
					zapper: 'paraswap',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'paraswap',
					zapper: 'paraswap',
				},
			},
		],
	},
	{
		name: 'Particle Network',
		slug: 'partcile-network',
		links: [
			'https://particle.network',
		],
		views: [
			{
				providers: {
					zapper: 'partcile-network',
				},
			},
		],
	},
	{
		name: 'Particle',
		slug: 'particle',
		links: [
			'https://www.particle.trade',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'particle',
				},
			},
		],
	},
	{
		name: 'PartyDAO',
		slug: 'party-dao',
		links: [
			'https://www.party.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'party-dao',
				},
			},
		],
	},
	{
		name: 'PartySwap',
		slug: 'partyswap',
		links: [
			'https://partyswap.io',
			'https://app.partyswap.io',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'partyswap',
				},
			},
		],
	},
	{
		name: 'Paycaster',
		slug: 'paycaster',
		links: [
			'https://paycaster.co',
		],
		views: [
			{
				providers: {
					zapper: 'paycaster',
				},
			},
		],
	},
	{
		name: 'Peapods Finance',
		slug: 'peapods-finance',
		links: [
			'https://peapods.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'peapods-finance',
				},
			},
		],
	},
	{
		name: 'Pear Protocol',
		slug: 'pear-protocol',
		links: [
			'https://beta.pear.garden',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pear-protocol',
				},
			},
		],
	},
	{
		name: 'PearlFi',
		slug: 'pearlfi',
		links: [
			'https://www.pearl.exchange',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'pearlfi',
					zapper: 'pearl-fi',
				},
			},
		],
	},
	{
		name: 'Pencils Protocol',
		slug: 'pencils-protocol',
		links: [
			'https://pencilsprotocol.io',
		],
		views: [
			{
				providers: {
					zapper: 'pencils-protocol',
				},
			},
		],
	},
	{
		name: 'Pendle',
		slug: 'pendle',
		links: [
			'https://pendle.finance',
		],
		views: [
			{
				name: 'Pendle V3',
				slug: 'v3',
				chainId: undefined,
				providers: {
					zapper: 'pendle-v3',
				},
			},
			{
				name: 'Pendle V2',
				slug: 'v2',
				chainId: undefined,
				providers: {
					zapper: 'pendle-v2',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'pendle',
					zapper: 'pendle',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'pendle',
					zapper: 'pendle',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'pendle',
					zapper: 'pendle',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'pendle',
					zapper: 'pendle',
				},
			},
		],
	},
	{
		name: 'Penguin Finance',
		slug: 'penguin-finance',
		links: [
			'https://penguinfinance.org',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14359/thumb/Screen-Shot-2021-03-10-at-1-05-40-AM.png?1615629402',
						chainId: 1,
						address: '0x30bcd71b8d21fe830e493b30e90befba29de9114',
						name: 'Penguin Party Fish',
						symbol: 'FISH',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'penguin',
				},
			},
		],
	},
	{
		name: 'Perennial',
		slug: 'perennial',
		links: [
			'https://perennial.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'perennial',
					zapper: 'Perennial',
				},
			},
		],
	},
	{
		name: 'Perion',
		slug: 'perion',
		links: [
			'https://perion.gg',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'perion',
				},
			},
		],
	},
	{
		name: 'Perpetual Protocol',
		slug: 'perpetual-protocol',
		links: [
			'https://perp.com',
			'https://app.perp.com',
			'https://perp.exchange',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12381/thumb/60d18e06844a844ad75901a9_mark_only_03.png?1628674771',
						chainId: 1,
						address: '0xbc396689893d065f41bc2c6ecbee5e0085233447',
						name: 'Perpetual Protocol',
						symbol: 'PERP',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'perpetual-protocol',
					zapper: 'perpetual-protocol',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'perpetual-protocol',
				},
			},
		],
	},
	{
		name: 'Pharaoh Exchange',
		slug: 'pharaoh-exchange',
		links: [
			'https://pharaoh.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'pharaoh-exchange',
				},
			},
		],
	},
	{
		name: 'Phemex',
		slug: 'phemex',
		links: [
			'https://phemex.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'phemex',
				},
			},
		],
	},
	{
		name: 'Phonon',
		slug: 'phonon',
		links: [
			'https://www.phonon.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'phonon',
				},
			},
		],
	},
	{
		name: 'Phuture',
		slug: 'phuture',
		links: [
			'https://phuture.finance',
		],
		colors: [
			'#3e1fff',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xe1fc4455f62a6e89476f1072530c20cf1a0622da',
					},
				],
				providers: {
					zapper: 'phuture',
				},
			},
			{
				chainId: 43114,
				providers: {
					zapper: 'phuture',
				},
			},
		],
	},
	{
		name: 'Pichi Finance',
		slug: 'pichi-finance',
		links: [
			'https://pichi.finance',
		],
		views: [
			{
				name: 'Michi Protocol',
				slug: 'michi',
				chainId: undefined,
				providers: {
					zapper: 'michi',
				},
			},
		],
	},
	{
		name: 'Pickle Finance',
		slug: 'pickle',
		links: [
			'https://pickle.finance',
			'https://app.pickle.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12435/thumb/pickle_finance_logo.jpg?1599817746',
						chainId: 1,
						address: '0x429881672b9ae42b8eba0e26cd9c73711b891ca5',
						name: 'Pickle Finance',
						symbol: 'PICKLE',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'pickle',
					zerionDefiSDK: [
						'Pickle Finance',
						'Pickle Finance • Farms',
						'Pickle Finance • Staking',
					],
				},
			},
		],
	},
	{
		name: 'PieDAO',
		slug: 'pie-dao',
		links: [
			'https://www.piedao.org',
		],
		colors: [
			'#d90a9d',
			'#9811dc',
			'#7732f8',
			'#28d4ff',
		], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13560/thumb/BCP.png?1609813753',
						chainId: 1,
						address: '0xe4f726adc8e89c6a6017f01eada77865db22da14',
						name: 'PieDAO Balanced Cry',
						symbol: 'BCP',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12731/thumb/DeFi_L.png?1602070128',
						chainId: 1,
						address: '0x78f225869c08d478c34e5f645d07a87d3fe8eb78',
						name: 'PieDAO DEFI Large C',
						symbol: 'DEFI+L',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12701/thumb/DefiS.png?1601862595',
						chainId: 1,
						address: '0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c',
						name: 'PieDAO DEFI Small C',
						symbol: 'DEFI+S',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13304/thumb/piedao__.png?1607322674',
						chainId: 1,
						address: '0x8d1ce361eb68e9e05573443c407d4a3bed23b033',
						name: 'PieDAO DEFI	',
						symbol: 'DEFI++',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/10959/thumb/BTC__.png?1586499443',
						chainId: 1,
						address: '0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd',
						name: 'PieDAO BTC	',
						symbol: 'BTC++',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13572/thumb/YPIE.png?1610437730',
						chainId: 1,
						address: '0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31',
						name: 'PieDAO Yearn Ecosys',
						symbol: 'YPIE',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12693/thumb/DOUGH2v.png?1602655308',
						chainId: 1,
						address: '0xad32a8e6220741182940c5abf610bde99e737b2d',
						name: 'PieDAO DOUGH v2',
						symbol: 'DOUGH',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'piedao',
					zapper: 'pie-dao',
					zerionDefiSDK: [
						'PieDAO',
						'PieDAO ExperiPies',
					],
				},
			},
		],
	},
	{
		name: 'PieDAO',
		slug: 'pie-dao',
		links: [
			'https://www.piedao.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pie-dao',
				},
			},
		],
	},
	{
		name: 'Pika Protocol',
		slug: 'pika-protocol',
		links: [
			'https://www.pikaprotocol.com',
			'https://app.pikaprotocol.com',
		],
		views: [
			{
				name: 'Pika Protocol V4',
				slug: 'v4',
				chainId: 10,
				providers: {
					zapper: 'pika-protocol-v4',
				},
			},
			{
				name: 'Pika Protocol V3',
				slug: 'v3',
				chainId: 10,
				providers: {
					zapper: 'pika-protocol-v3',
				},
			},
			{
				name: 'Pika Protocol V2',
				slug: 'v2',
				chainId: 10,
				providers: {
					llamafolio: 'pika-protocol',
					zapper: 'pika-protocol',
				},
			},
		],
	},
	{
		name: 'Pinata',
		slug: 'pinata',
		links: [
			'https://pinata.cloud',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pinata',
				},
			},
		],
	},
	{
		name: 'Pingu Exchange',
		slug: 'pingu-exchange',
		links: [
			'https://pingu.exchange',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'pingu-exchange',
					zapper: 'pingu-exchange',
				},
			},
		],
	},
	{
		name: 'PinkSale',
		slug: 'pink-sale',
		links: [
			'https://www.pinksale.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pink-sale',
				},
			},
		],
	},
	{
		name: 'Pira Finance',
		slug: 'pira-finance',
		links: [
			'https://www.pira.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Pira-Finance',
				},
			},
		],
	},
	{
		name: 'Pirate Nation',
		slug: 'pirate-nation',
		links: [
			'https://www.piratenation.foundation',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pirate-nation',
				},
			},
		],
	},
	{
		name: 'Pirex',
		slug: 'pirex',
		links: [
			'https://pirex.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'pirex',
				},
			},
		],
	},
	{
		name: 'Pixel Map',
		slug: 'pixel-map',
		links: [
			'https://pixelmap.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pixel-map',
				},
			},
		],
	},
	{
		name: 'Pixel Vault',
		slug: 'pixel-vault',
		links: [
			'https://pixelvault.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pixel-vault',
				},
			},
		],
	},
	{
		name: 'Pixelmon Trainer Adventure',
		slug: 'pixelmon-trainer-adventure',
		links: [
			'https://www.pixelmon.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pixelmon-trainer-adventure',
				},
			},
		],
	},
	{
		name: 'Pixels',
		slug: 'pixels',
		links: [
			'https://www.pixels.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'pixels',
				},
			},
		],
	},
	{
		name: 'Pixl',
		slug: 'pixl',
		links: [
			'https://pixl.so',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pixl',
				},
			},
		],
	},
	{
		name: 'Pixotchi',
		slug: 'pixotchi',
		links: [
			'https://app.pixotchi.tech',
		],
		views: [
			{
				providers: {
					zapper: 'pixotchi',
				},
			},
		],
	},
	{
		name: 'PLANET IX',
		slug: 'planet-i-x',
		links: [
			'https://planetix.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'planet-i-x',
				},
			},
		],
	},
	{
		name: 'Planet-X',
		slug: 'planet-x',
		links: [
			'https://www.playplanetx.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'planet-x',
				},
			},
		],
	},
	{
		name: 'PlantBaseSwap',
		slug: 'plantbaseswap',
		links: [
			'https://www.plantbaseswap.xyz/home',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'PlantBaseSwap',
				},
			},
		],
	},
	{
		name: 'Platypus Finance',
		slug: 'platypus-finance',
		links: [
			'https://platypus.finance',
		],
		colors: [
			'#1c1d26',
		],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0x22d4002028f537599be9f666d1c4fa138522f9c8',
					},
				],
				providers: {
					llamafolio: 'platypus-finance',
					zapper: 'platypus-finance',
				},
			},
		],
	},
	{
		name: 'PLEXUS',
		slug: 'plexus',
		links: [
			'https://www.plexus.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'plexus',
				},
			},
		],
	},
	{
		name: 'PlutusDAO',
		slug: 'plutus',
		links: [
			'https://plutusdao.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'plutus',
				},
			},
		],
	},
	{
		name: 'pNetwork',
		slug: 'pnetwork',
		links: [
			'https://pnetwork-association.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pnetwork',
				},
			},
		],
	},
	{
		name: 'Pods',
		slug: 'pods',
		links: [
			'https://www.pods.finance',
		],
		colors: [
			'#b7156b',
			'#C41857',
			'#df1d2c',
		], // https://docs.pods.finance/interfacing-with-pods/brand-assets
		views: [
			// https://docs.pods.finance/developers/deployed-contracts
			{
				chainId: 137,
				contracts: [
					{
						name: 'ConfigurationManager',
						address: '0x2971c946d793f3b846A5AEC2Ac9EC945763a82a9',
					},
					{
						name: 'EmergencyStop',
						address: '0x4Add3C66196945ad9c9B35Bf8391D145A65E3337',
					},
					{
						name: 'CapProvider',
						address: '0x3b2f5264ef121F7e269Be54b2A75d3E1c04b5430',
					},
					{
						name: 'PodPutBuilder',
						address: '0x19Cd96c3412E42EE1cAbD023e443aEdE7d209826',
					},
					{
						name: 'WPodPutBuilder',
						address: '0x70a21cbB30DE94E21A84A62f5F060C2Cd4daf824',
					},
					{
						name: 'PodCallBuilder',
						address: '0x343E548a47c386C73fa8738bc3488F32b0bBbeec',
					},
					{
						name: 'WPodCallBuilder',
						address: '0x3177D77699358e8015eFE1fFCB68a3C4ACa35547',
					},
					{
						name: 'OptionFactory',
						address: '0x35601f9C2458172D8d9f4B3Fa2CC33620af632f3',
					},
					{
						name: 'NormalDistribution',
						address: '0x94ea57A96e02f2F1b3dcB18105Cd6cFa36FB8Ab2',
					},
					{
						name: 'BlackScholes',
						address: '0xC6AB9Cdf5aaFDa905D9e2BE0692e5F575fcDc849',
					},
					{
						name: 'IVGuesser',
						address: '0xab5627f4ECb905cE535ECf704eBB1Dc9405D66eA',
					},
					{
						name: 'IVProvider',
						address: '0xC51e13FdcEfc232bFc4741B2C0C24483110B5028',
					},
					{
						name: 'PriceProvider',
						address: '0x7f105cC52d66d8664cDdC935f8A8AE7941032d18',
					},
					{
						name: 'FeePoolBuilder',
						address: '0x712a6E19Dc4e709E025DDB22C030f51CDeFdbC43',
					},
					{
						name: 'OptionAMMFactory',
						address: '0x7B4401FD0070cA78C7C93aa335D6000Ee0D629F7',
					},
					{
						name: 'OptionHelper',
						address: '0xB7dEF03006eC72Ef409C41fAEE2619e4bFdB547F',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/pods-finance/pods',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'pods',
				},
			},
			{
				name: 'Pods Yield',
				slug: 'pods-yield',
				chainId: undefined,
				providers: {
					zapper: 'pods-yield',
				},
			},
		],
	},
	{
		name: 'Points',
		slug: 'points',
		links: [
			'https://points-token.vercel.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'points',
				},
			},
		],
	},
	{
		name: 'Polka City',
		slug: 'polka-city',
		links: [
			'https://app.polkacity.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'polka-city',
				},
			},
		],
	},
	{
		name: 'Polkastarter',
		slug: 'polkastarter',
		links: [
			'https://polkastarter.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'polkastarter',
					zapper: 'polkastarter',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'polkastarter',
					zapper: 'polkastarter',
				},
			},
		],
	},
	{
		name: 'Polygon',
		slug: 'polygon',
		icon: PolygonIcon,
		colors: [
			'#8247e5',
		],
		links: [
			'https://polygon.technology',
		],
		views: [
			{
				name: 'Polygon Bridge',
				slug: 'bridge',
				links: [
					'https://wallet.polygon.technology',
				],
				chainId: undefined,
				providers: {
					zapper: 'polygon-bridge',
				},
			},
			{
				name: 'Polygon Staking',
				slug: 'staking',
				chainId: undefined,
				providers: {
					zapper: 'polygon-staking',
				},
			},
			{
				name: 'Matic',
				slug: 'matic',
				links: [
					'https://wallet.matic.network/staking',
				],
				colors: [
					'#8247e5',
					// '#003cb2',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
						chainId: 1,
						address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
						name: 'Polygon',
						symbol: 'MATIC',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/maticnetwork/mainnet-root-subgraphs',
					zerionDefiSDK: [
						'Matic',
					],
					zapper: 'polygon',
				},
			},
		],
	},
	{
		name: 'Polygon zkEVM',
		slug: 'polygon-zkevm',
		links: [
			'https://polygon.technology',
		],
		views: [
			{
				name: 'Polygon zkEVM Bridge',
				slug: 'bridge',
				chainId: undefined,
				providers: {
					zapper: 'polygon-zkevm-bridge',
				},
			},
		],
	},
	{
		name: 'Polyhedra Network',
		slug: 'polyhedra',
		links: [
			'https://polyhedra.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'polyhedra',
				},
			},
		],
	},
	{
		name: 'Polymarket',
		slug: 'polymarket',
		links: [
			'https://polymarket.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'polymarket',
				},
			},
		],
	},
	{
		name: 'Polynomial',
		slug: 'polynomial',
		links: [
			'https://earn.polynomial.fi',
		],
		views: [
			{
				chainId: 10,
				providers: {
					zapper: 'polynomial',
				},
			},
		],
	},
	{
		name: 'Polywhale',
		slug: 'polywhale',
		links: [
			'https://polywhale.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'polywhale',
				},
			},
		],
	},
	{
		name: 'Pond0x',
		slug: 'pond-0x',
		links: [
			'https://www.pond0x.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pond-0x',
				},
			},
		],
	},
	{
		name: 'Poolside',
		slug: 'poolside',
		links: [
			'https://www.poolside.party',
			'https://app.poolside.party',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'poolside',
					zapper: 'poolside',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'poolside',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'poolside',					zapper: 'poolside',
				},
			},
		],
	},
	{
		name: 'PoolTogether',
		slug: 'pooltogether',
		links: [
			'https://pooltogether.com',
		],
		colors: [
			'#4a31a5',
		],
		views: [
			{
				name: 'PoolTogether V5',
				slug: 'v5',
				chainId: undefined,
				providers: {
					zapper: 'pool-together-v5',
				},
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: [
					'#843ff3',
				],
				chainId: 43114,
				providers: {
					zapper: 'pool-together-v4',
				},
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: [
					'#843ff3',
				],
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e',
					},
				],
				providers: {
					zapper: 'pool-together-v4',
				},
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: [
					'#843ff3',
				],
				chainId: 10,
				providers: {
					zapper: 'pool-together-v4',
				},
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: [
					'#843ff3',
				],
				chainId: 137,
				providers: {
					zapper: 'pool-together-v4',
				},
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: [
					'#843ff3',
				],
				chainId: 42220,
				providers: {
					zapper: 'pool-together-v3',
				},
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: [
					'#843ff3',
				],
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e',
					},
				],
				providers: {
					zapper: 'pool-together-v3',
					zerionDefiSDK: [
						'PoolTogether V3',
					],
				},
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: [
					'#843ff3',
				],
				chainId: 100,
				providers: {
					zapper: 'pool-together-v3',
				},
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: [
					'#843ff3',
				],
				chainId: 137,
				providers: {
					zapper: 'pool-together-v3',
				},
			},
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14003/thumb/PoolTogether.png?1613585632',
						chainId: 1,
						address: '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e',
						name: 'PoolTogether',
						symbol: 'POOL',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16255/thumb/fjRgQUo4_400x400.jpg?1623397960',
						chainId: 1,
						address: '0xd81b1a8b1ad00baa2d6609e0bae28a38713872f7',
						name: 'PoolTogether USDC T',
						symbol: 'PCUSDC',
						decimals: 6,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether',
					zapper: 'pooltogether',
					zerionDefiSDK: [
						'PoolTogether',
					],
				},
			},
		],
	},
	{
		name: 'Popsicle Finance',
		slug: 'popsicle',
		links: [
			'https://popsicle.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14586/thumb/ice.png?1617188825',
						chainId: 1,
						address: '0xf16e81dce15b08f326220742020379b855b87df9',
						name: 'Popsicle Finance',
						symbol: 'ICE',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'popsicle-finance',
					zapper: 'popsicle',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'popsicle-finance',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'popsicle-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'popsicle-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'popsicle-finance',
				},
			},
		],
	},
	{
		name: 'Port3 Network',
		slug: 'port3-network',
		links: [
			'https://port3.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'port3-network',
				},
			},
		],
	},
	{
		name: 'Portal',
		slug: 'portal',
		links: [
			'https://www.portalgaming.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Portal',
				},
			},
		],
	},
	{
		name: 'Portal Bridge',
		slug: 'portal-bridge',
		links: [
			'https://www.portalbridge.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'portal',
				},
			},
		],
	},
	{
		name: 'Portals',
		slug: 'portals',
		links: [
			'https://portals.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'portals',
				},
			},
		],
	},
	{
		name: 'The Potatoz',
		slug: 'potatoz',
		links: [
			'https://www.memeland.com/potatoz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'potatoz',
				},
			},
		],
	},
	{
		name: 'Powerledger',
		slug: 'powerledger',
		links: [
			'https://www.powerledger.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'powerledger',
				},
			},
		],
	},
	{
		name: 'PowerPool',
		slug: 'powerpool',
		links: [
			'https://powerpool.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12266/thumb/Powerpool.jpg?1598621373',
						chainId: 1,
						address: '0x38e4adb44ef08f22f5b5b76a8f0c2d0dcbe7dca1',
						name: 'PowerPool Concentra',
						symbol: 'CVP',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'powerpool',
				},
			},
		],
	},
	{
		name: 'PowerTrade',
		slug: 'powertrade',
		links: [
			'https://power.trade',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'powertrade',
				},
			},
		],
	},
	{
		name: 'Premia',
		slug: 'premia',
		links: [
			'https://premia.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'premia',
				},
			},
			{
				chainId: 42161,
				providers: {
					zapper: 'premia',
				},
			},
		],
	},
	{
		name: 'Preon Finance',
		slug: 'preon-finance',
		links: [
			'https://app.preon.finance/borrow',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'preon-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'preon-finance',
				},
			},
		],
	},
	{
		name: 'Prime Staked ETH',
		slug: 'prime-staked-eth',
		links: [
			'https://www.primestaked.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'prime-staked-eth',
				},
			},
		],
	},
	{
		name: 'Prime Protocol',
		slug: 'primeprotocol',
		links: [
			'https://www.primeprotocol.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'primeprotocol',
				},
			},
		],
	},
	{
		name: 'Prisma Finance',
		slug: 'prisma-finance',
		links: [
			'https://prismafinance.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'prisma-finance',
					zapper: 'prisma-finance',
				},
			},
		],
	},
	{
		name: 'Promethios',
		slug: 'promethios',
		links: [
			'https://www.promethios.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'promethios',
				},
			},
		],
	},
	{
		name: 'Proof of Humanity',
		slug: 'proof-of-humanity',
		links: [
			'https://proofofhumanity.id',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'proof-of-humanity',
				},
			},
		],
	},
	{
		name: 'Prosper',
		slug: 'prosper',
		links: [
			'https://prosper-fi.com',
			'https://x.com/prosperfi_xyz',
		],
		views: [
			{
				providers: {
					zapper: 'prosper',
				},
			},
		],
	},
	{
		name: 'Protectorate Protocol',
		slug: 'protectorate-protocol',
		links: [
			'https://app.protectorate.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'protectorate-protocol',
				},
			},
		],
	},
	{
		name: 'Proxy',
		slug: 'proxy',
		links: [
			'https://btcproxy.io',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'proxy',
				},
			},
		],
	},
	{
		name: 'ProxySwap',
		slug: 'proxyswap',
		links: [
			'https://www.proxyswap.tips',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'proxyswap',
				},
			},
		],
	},
	{
		name: 'pSTAKE',
		slug: 'pstake',
		links: [
			'https://pstake.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'pstake-finance',
					zapper: 'p-stake',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'pstake-finance',
					zapper: 'p-stake',
				},
			},
		],
	},
	{
		name: 'Psychedelics Anonymous',
		slug: 'psychedelics-anonymous',
		links: [
			'https://psychedelicsanonymous.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'psychedelics-anonymous',
				},
			},
		],
	},
	{
		name: 'Public Goods Network',
		slug: 'public-goods-network',
		links: [
			'https://publicgoods.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'public-goods-network',
				},
			},
		],
	},
	{
		name: 'Puffer Finance',
		slug: 'puffer-finance',
		links: [
			'https://www.puffer.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'puffer-finance',
					zapper: 'puffer-finance',
				},
			},
		],
	},
	{
		name: 'Pullix',
		slug: 'pullix',
		links: [
			'https://pullix.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pullix',
				},
			},
		],
	},
	{
		name: 'PulseChain',
		slug: 'pulse-chain',
		links: [
			'https://pulsechain.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pulse-chain',
				},
			},
		],
	},
	{
		name: 'pumpBTC',
		slug: 'pump-btc',
		links: [
			'https://mainnet.pumpbtc.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pump-btc',
				},
			},
		],
	},
	{
		name: 'Pupniks',
		slug: 'pupniks',
		links: [
			'https://www.pupniks.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pupniks',
				},
			},
		],
	},
	{
		name: 'Purple Bridge DEX',
		slug: 'purple-bridge-dex',
		links: [
			'https://purplebridge.link',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'purple-bridge-dex',
				},
			},
		],
	},
	{
		name: 'Push',
		slug: 'push',
		links: [
			'https://push.org',
			'https://app.push.org',
			'https://epns.io',
		],
		colors: [
			'#e20880',
			'#35c5f3',
			'#674c9f',
		],
		views: [
			{
				chainId: 1,
				providers: {
					// zapper: 'epns',
					zapper: 'push-protocol',
					theGraph: 'https://api.thegraph.com/subgraphs/name/epnsproject/epnsprod',
				},
			},
		],
	},
	{
		name: 'PVP Casino',
		slug: 'pvp-casino',
		links: [
			'https://pvpcasino.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pvp-casino',
				},
			},
		],
	},
	{
		name: 'PymeDAO',
		slug: 'pymedao',
		links: [
			'https://www.pymedao.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'pymedao',
				},
			},
		],
	},
	{
		name: 'Pyth',
		slug: 'pyth',
		icon: PythIcon,
		colors: [
			'#e6dafe',
			'#7142cf',
		],
		links: [
			'https://pyth.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Pyth-Network ',
				},
			},
		],
	},
	{
		name: 'QiDao',
		slug: 'qi-dao',
		links: [
			'https://www.mai.finance',
			'https://app.mai.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'qidao',
				},
			},
			{
				chainId: 59144,
				providers: {
					llamafolio: 'qidao',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'qidao',
					zapper: 'qi-dao',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'qidao',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'qidao',
					zapper: 'qi-dao',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'qidao',
					zapper: 'qi-dao',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'qidao',
					zapper: 'qi-dao',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'qidao',
				},
			},
			{
				chainId: 1284,
				providers: {
					llamafolio: 'qidao',
				},
			},
			{
				chainId: 100,
				providers: {
					zapper: 'qi-dao',
				},
			},
		],
	},
	{
		name: 'Quantfury',
		slug: 'quantfury',
		links: [
			'https://quantfury.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Quantfury',
				},
			},
		],
	},
	{
		name: 'Quanto Swap',
		slug: 'quanto',
		links: [
			'https://quantoswap.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'quanto',
				},
			},
		],
	},
	{
		name: 'Quantum Wealth Network',
		slug: 'quantum-wealth-network',
		links: [
			'https://www.quantumwealthnetwork.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'quantum-wealth-network',
				},
			},
		],
	},
	{
		name: 'QuickSwap',
		slug: 'quickswap',
		links: [
			'https://quickswap.exchange',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'quickswap-dex',
					zapper: 'quickswap',
				},
			},
		],
	},
	{
		name: 'R U Generous',
		slug: 'r-u-generous',
		links: [
			'https://www.rug.farm',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'r-u-generous',
				},
			},
		],
	},
	{
		name: 'r/datadao',
		slug: 'r-datadao',
		links: [
			'https://www.rdatadao.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'r/datadao',
				},
			},
		],
	},
	{
		name: 'RabbitHole',
		slug: 'rabbit-hole',
		links: [
			'https://rabbithole.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rabbit-hole',
				},
			},
		],
	},
	{
		name: 'RabbitX',
		slug: 'rabbit-x',
		links: [
			'https://app.rabbitx.io/trade/-',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rabbit-x',
				},
			},
		],
	},
	{
		name: 'Rabby',
		slug: 'rabby',
		links: [
			'https://rabby.io',
		],
		views: [
			{
				providers: {
					zapper: 'rabby',
				},
			},
		],
	},
	{
		name: 'Radiant',
		slug: 'radiant',
		links: [
			'https://radiant.capital',
			'https://app.radiant.capital',
		],
		views: [
			{
				name: 'Radiant V2',
				slug: 'v2',
				chainId: 42161,
				providers: {
					llamafolio: 'radiant-v2',
					zapper: 'radiant-v2',
				},
			},
			{
				name: 'Radiant V2',
				slug: 'v2',
				chainId: 56,
				providers: {
					llamafolio: 'radiant-v2',
					zapper: 'radiant-v2',
				},
			},
			{
				name: 'Radiant V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					llamafolio: 'radiant-v2',
					zapper: 'radiant-v2',
				},
			},
			{
				name: 'Radiant V1',
				slug: 'v1',
				chainId: 42161,
				providers: {
					llamafolio: 'radiant-v1',
					zapper: 'radiant-capital',
				},
			},
		],
	},
	{
		name: 'RadioShack',
		slug: 'radioshack',
		links: [
			'https://www.radioshack.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'radioshack',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'radioshack',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'radioshack',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'radioshack',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'radioshack',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'radioshack',
				},
			},
		],
	},
	{
		name: 'Rafldex',
		slug: 'rafldex',
		links: [
			'https://www.rafldex.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rafldex',
				},
			},
		],
	},
	{
		name: 'Raft',
		slug: 'raft',
		links: [
			'https://raft.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'raft',
					zapper: 'raft',
				},
			},
		],
	},
	{
		name: 'Rage Trade',
		slug: 'rage-trade',
		links: [
			'https://www.rage.trade',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'rage-trade',
					zapper: 'Rage-Trade',
				},
			},
		],
	},
	{
		name: 'RAI Finance',
		slug: 'rai-finance',
		links: [
			'https://rai.finance',
		],
		views: [
			{
				name: 'Soswap',
				slug: 'soswap',
				links: [
					'https://soswap.rai.finance',
				],
				chainId: 8453,
				providers: {
					llamafolio: 'soswap',
					zapper: 'RAI-Finance',
				},
			},
		],
	},
	{
		name: 'RAILGUN',
		slug: 'railgun',
		links: [
			'https://railgun.org',
			'https://railgun.ch',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'railgun',
					zapper: 'railgun',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'railgun',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'railgun',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'railgun',
				},
			},
		],
	},
	{
		name: 'Rainbow Wallet',
		slug: 'rainbow-wallet',
		links: [
			'https://rainbow.me',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rainbow-wallet',
				},
			},
		],
	},
	{
		name: 'Rally',
		slug: 'rally',
		links: [
			'https://rally.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12843/thumb/image.png?1611212077',
						chainId: 1,
						address: '0xf1f955016ecbcd7321c7266bccfb96c68ea5e49b',
						name: 'Rally',
						symbol: 'RLY',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'rally',
				},
			},
		],
	},
	{
		name: 'RAMSES',
		slug: 'ramses',
		links: [
			'https://www.ramses.exchange',
		],
		views: [
			{
				name: 'Ramses V2',
				slug: 'v2',
				chainId: 42161,
				providers: {
					zapper: 'ramses-v2',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'ramses-exchange',
					zapper: 'ramses',
				},
			},
		],
	},
	{
		name: 'Range Protocol',
		slug: 'range-protocol',
		links: [
			'https://www.rangeprotocol.com',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'range-protocol',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'range-protocol',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'range-protocol',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'range-protocol',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'range-protocol',
				},
			},
		],
	},
	{
		name: 'Rango',
		slug: 'rango',
		links: [
			'https://rango.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'Rango',
				},
			},
		],
	},
	{
		name: 'Rari Capital',
		slug: 'rari',
		links: [
			'https://rari.capital',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12900/thumb/Rari_Logo_Transparent.png?1613978014',
						chainId: 1,
						address: '0xd291e7a03283640fdc51b121ac401383a46cc623',
						name: 'Rari Governance Tok',
						symbol: 'RGT',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'rari',
				},
			},
			{
				name: 'Rari Fuse',
				slug: 'fuse',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/10347/thumb/vUXKHEe.png?1601523640',
						chainId: 1,
						address: '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d',
						name: 'Fuse',
						symbol: 'FUSE',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'rari-fuse',
				},
			},
		],
	},
	{
		name: 'Rari Capital',
		slug: 'rari',
		links: [
			'https://www.rari.capital',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12900/thumb/Rari_Logo_Transparent.png?1613978014',
						chainId: 1,
						address: '0xd291e7a03283640fdc51b121ac401383a46cc623',
						name: 'Rari Governance Tok',
						symbol: 'RGT',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'rari',
				},
			},
		],
	},
	{
		name: 'Rarible',
		slug: 'rarible',
		links: [
			'https://rarible.com',
		],
		colors: [
			'#FEDA03',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11845/thumb/Rari.png?1594946953',
						chainId: 1,
						address: '0xfca59cd816ab1ead66534d82bc21e7515ce441cf',
						name: 'Rarible',
						symbol: 'RARI',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/rarible/protocol',
				},
			},
		],
	},
	{
		name: 'Rarible',
		slug: 'rarible',
		links: [
			'https://rarible.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rarible',
				},
			},
		],
	},
	{
		name: '/Reach',
		slug: 'reach',
		links: [
			'https://www.getreach.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'reach',
				},
			},
		],
	},
	{
		name: 'ReactorFusion',
		slug: 'reactorfusion',
		links: [
			'https://reactorfusion.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'reactorfusion',
				},
			},
		],
	},
	{
		name: 'Realm',
		slug: 'realm',
		links: [
			'https://app.rlm.land',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'realm',
				},
			},
		],
	},
	{
		name: 'Realms.World',
		slug: 'realms-world',
		links: [
			'https://realms.world',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'realms',
				},
			},
		],
	},
	{
		name: 'RealT',
		slug: 'realt',
		links: [
			'https://realt.co',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'realt',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'realt',
				},
			},
			{
				name: 'RealT RMM',
				slug: 'rmm',
				links: [
					'https://rmm.realtoken.network',
				],
				chainId: undefined,
				providers: {
					zapper: 'realt-rmm',
				},
			},
		],
	},
	{
		name: 'Reaper',
		slug: 'reaper',
		links: [
			'https://www.reaper.farm',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'reaper-farm',
					zapper: 'reaper',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'reaper-farm',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'reaper-farm',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'reaper-farm',
				},
			},
		],
	},
	{
		name: 'Reboot',
		slug: 'reboot',
		links: [
			'https://www.reboot.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'reboot',
				},
			},
		],
	},
	{
		name: 'Redacted Cartel',
		slug: 'redacted-cartel',
		links: [
			'https://www.redacted.finance',
		],
		colors: [
			'#27A5F2',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'redacted',
					zapper: 'redacted-cartel',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'redacted',
				},
			},
			{
				name: 'Dinero',
				slug: 'dinero',
				links: [
					'https://dinero.xyz',
					'https://dineroismoney.com',
				],
				views: [
					{
						chainId: 0x1,
						providers: {
							zapper: 'dinero',
						},
					},
				],
			},
		],
	},
	{
		name: 'Reflexer',
		slug: 'reflexer',
		links: [
			'https://reflexer.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						chainId: 1,
						address: '0x54735d716995071585a4f6ba341a6ded79756f09',
						name: 'FLUX Token',
						symbol: 'FLX',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'reflexer',
					zapper: 'reflexer',
					zerionDefiSDK: [
						'Reflexer',
					],
				},
			},
		],
	},
	{
		name: 'Ren',
		slug: 'ren',
		links: [
			'https://renproject.io',
		],
		colors: [
			'#f5f6f8',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x408e41876cccdc0f92210600ef50372656052a38',
					},
				],
				providers: {
					zapper: 'ren',
				},
			},
		],
	},
	{
		name: 'Renzo',
		slug: 'renzo',
		links: [
			'https://www.renzoprotocol.com',
			'https://app.renzoprotocol.com/restake',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'renzo',
					zapper: 'renzo',
				},
			},
		],
	},
	{
		name: 'Request Finance',
		slug: 'request-finance',
		links: [
			'https://www.request.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'request_finance',
				},
			},
		],
	},
	{
		name: 'Reserve Protocol',
		slug: 'reserve-protocol',
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'reserve-protocol',
				},
			},
		],
	},
	{
		name: 'Reserve Protocol',
		slug: 'reserve',
		links: [
			'https://reserve.org',
			'https://app.reserve.org',
			'https://register.app',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'reserve',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'reserve',
				},
			},
		],
	},
	{
		name: 'Resolv',
		slug: 'resolv',
		links: [
			'https://resolv.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'resolv',
				},
			},
		],
	},
	{
		name: 'Restake Finance',
		slug: 'restake-finance',
		links: [
			'https://www.restakefinance.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'restake-finance',
				},
			},
		],
	},
	{
		name: 'Retik Finance',
		slug: 'retik-finance',
		links: [
			'https://retik.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'retik-finance',
				},
			},
		],
	},
	{
		name: 'Retro',
		slug: 'retro',
		links: [
			'https://retro.finance',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'retro',
				},
			},
		],
	},
	{
		name: 'Reunit Wallet',
		slug: 'reunit-wallet',
		links: [
			'https://everywhere.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'reunit-wallet',
				},
			},
		],
	},
	{
		name: 'Revert Finance',
		slug: 'revert-finance',
		links: [
			'https://revert.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'revert-finance',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'revert-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					zapper: 'revert-finance',
				},
			},
			{
				chainId: 42161,
				providers: {
					zapper: 'revert-finance',
				},
			},
		],
	},
	{
		name: 'Reya Labs',
		slug: 'reya-labs',
		links: [
			'https://reya.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'reya-labs',
				},
			},
		],
	},
	{
		name: 'rhino.fi',
		slug: 'rhino-fi',
		links: [
			'https://rhino.fi',
			'https://app.rhino.fi'
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'rhino.fi',
					zapper: 'rhino-fi',
				},
			},
		],
	},
	{
		name: 'Rho Markets',
		slug: 'rho-markets',
		links: [
			'https://www.rhomarkets.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'rho-markets',
				},
			},
		],
	},
	{
		name: 'Ribbon',
		slug: 'ribbon',
		links: [
			'https://www.ribbon.finance',
			'https://app.ribbon.finance',
		],
		views: [
			{
				name: 'Ribbon V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					zapper: 'ribbon-v2',
				},
			},
			{
				name: 'Ribbon V2',
				slug: 'v2',
				chainId: 43114,
				providers: {
					zapper: 'ribbon-v2',
				},
			},
			{
				name: 'Ribbon V1',
				slug: 'v1',
				chainId: 1,
				providers: {
					llamafolio: 'ribbon-finance',
					zapper: 'ribbon',
				},
			},
			{
				name: 'Ribbon Lend',
				slug: 'ribbon-lend',
				links: [
					'https://lend.ribbon.finance',
				],
				chainId: undefined,
				providers: {
					zapper: 'ribbon-lend',
				},
			},
		],
	},
	{
		name: 'Rigoblock',
		slug: 'rigoblock',
		links: [
			'https://rigoblock.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rigoblock',
				},
			},
		],
	},
	{
		name: 'Ring Exchange',
		slug: 'ring-exchange',
		links: [
			'https://ring.exchange',
		],
		views: [
			{
				name: 'Ring Swap',
				slug: 'swap',
				chainId: undefined,
				providers: {
					zapper: 'ring-swap',
				},
			},
			{
				name: 'Ring Few',
				slug: 'few',
				chainId: undefined,
				providers: {
					zapper: 'ring-few',
				},
			},
		],
	},
	{
		name: 'Risk Harbor',
		slug: 'risk-harbor',
		links: [
			'https://www.riskharbor.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'risk-harbor',
				},
			},
		],
	},
	{
		name: 'RNS.ID',
		slug: 'rns-id',
		links: [
			'https://rns.id',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'RNS-ID',
				},
			},
		],
	},
	{
		name: 'Robo Vault',
		slug: 'robo-vault',
		links: [
			'https://robo-vault.com',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'robo-vault',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'robo-vault',
				},
			},
		],
	},
	{
		name: 'Robots.Farm',
		slug: 'robots-farm',
		links: [
			'https://robots.farm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'robots.farm',
				},
			},
		],
	},
	{
		name: 'RociFi',
		slug: 'roci-fi',
		links: [
			'https://roci.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'roci-fi',
				},
			},
		],
	},
	{
		name: 'Rocket Pool',
		slug: 'rocket-pool',
		links: [
			'https://rocketpool.net',
		],
		colors: [
			'#f97516',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'rocket-pool',
					zapper: 'rocket-pool',
				},
			},
		],
	},
	{
		name: 'Rocket Sam',
		slug: 'rocket-sam',
		links: [
			'https://rocketsam.io/pools/mantle',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rocket-sam',
				},
			},
		],
	},
	{
		name: 'RocketSwap',
		slug: 'rocket-swap',
		links: [
			'https://rocketswap.cc',
			'https://app.rocketswap.cc/exchange/swap',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					zapper: 'rocket-swap',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'rocketswap-base',
				},
			},
		],
	},
	{
		name: 'Rodeo',
		slug: 'rodeo',
		links: [
			'https://www.rodeofinance.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Rodeo',
				},
			},
		],
	},
	{
		name: 'Rodeo',
		slug: 'rodeo',
		links: [
			'https://rodeo.club',
		],
		views: [
			{
				providers: {
					zapper: 'rodeo',
				},
			},
		],
	},
	{
		name: 'Ronin Bridge',
		slug: 'ronin-bridge',
		links: [
			'https://roninchain.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ronin-bridge',
				},
			},
		],
	},
	{
		name: 'Rook',
		slug: 'rook',
		links: [
			'https://www.rook.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'rook',
					zapper: 'rook',
				},
			},
		],
	},
	{
		name: 'Router Protocol',
		slug: 'router-protocol',
		links: [
			'https://www.routerprotocol.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'router-protocol',
				},
			},
		],
	},
	{
		name: 'Rubic',
		slug: 'rubic',
		links: [
			'https://rubic.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rubic',
				},
			},
		],
	},
	{
		name: 'Rubicon',
		slug: 'rubicon',
		links: [
			'https://rubicon.finance',
			'https://app.rubicon.finance/swap',
		],
		colors: [
			'#ba2f2a',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'rubicon',
					zapper: 'rubicon',
				},
			},
		],
	},
	{
		name: 'RubyScore',
		slug: 'rubyscore',
		links: [
			'https://rubyscore.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rubyscore',
				},
			},
		],
	},
	{
		name: 'Rug Radio',
		slug: 'rug-radio',
		links: [
			'https://www.rug.fm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rug-radio',
				},
			},
		],
	},
	{
		name: 'rug.fun',
		slug: 'rug-fun',
		links: [
			'http://rug.fun',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rugfun',
				},
			},
		],
	},
	{
		name: 'RULER Tax',
		slug: 'ruler-tax',
		links: [
			'https://ruler.tax',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ruler-tax',
				},
			},
		],
	},
	{
		name: 'Rumble Racing Stars',
		slug: 'rumble-racing-stars',
		links: [
			'https://rumbleracingstar.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rumble-racing-stars',
				},
			},
		],
	},
	{
		name: 'Rysk',
		slug: 'rysk',
		links: [
			'https://www.rysk.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'rysk-finance',
				},
			},
		],
	},
	{
		name: 'Ryze.Fi',
		slug: 'ryze-fi',
		links: [
			'https://ryze.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ryzefi',
				},
			},
		],
	},
	{
		name: 'SA World',
		slug: 'sa-world',
		links: [
			'https://saworld.io',
		],
		views: [
			{
				providers: {
					zapper: 'sa-world',
				},
			},
		],
	},
	{
		name: 'Sablier',
		slug: 'sablier',
		links: [
			'https://sablier.finance',
		],
		colors: [
			'#f77423',
			'#fbce5b',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'sablier',
					theGraph: 'https://api.thegraph.com/subgraphs/name/sablierhq/sablier',
				},
			},
		],
	},
	{
		name: 'Saddle',
		slug: 'saddle',
		links: [
			'https://saddle.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'saddle',
					zerionDefiSDK: [
						'Saddle',
					],
				},
			},
		],
	},
	{
		name: 'Safe',
		slug: 'safe',
		links: [
			'https://safe.global',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'safe-gnosis',
				},
			},
		],
	},
	{
		name: 'Saita Swap',
		slug: 'saita-swap',
		links: [
			'https://dex.saita.pro',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'saita-swap',
				},
			},
		],
	},
	{
		name: 'SakePerp',
		slug: 'sake-perp',
		links: [
			'https://sakeperp.fi',
		],
		views: [
			{
				providers: {
					zapper: 'sake-perp',
				},
			},
		],
	},
	{
		name: 'SakePerp',
		slug: 'sakeperp',
		links: [
			'https://www.sakeperp.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'sakeperp',
				},
			},
		],
	},
	{
		name: 'SamSwap',
		slug: 'samswap',
		links: [
			'',
		],
		views: [
			{
				providers: {
					zapper: 'SamSwap',
				},
			},
		],
	},
	{
		name: 'Sandbox',
		slug: 'sandbox',
		links: [
			'https://www.sandbox.game/en',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sandbox',
				},
			},
		],
	},
	{
		name: 'Sanko GameCorp',
		slug: 'sanko-gamecorp',
		links: [
			'https://sankodreammachine.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sanko-gamecorp',
				},
			},
		],
	},
	{
		name: 'Sappy Seals',
		slug: 'sappy-seals',
		links: [
			'https://www.sappyseals.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sappy-seals',
					// zapper: 'Sappy-Seals',
				},
			},
		],
	},
	{
		name: 'SashimiSwap',
		slug: 'sashimiswap',
		links: [
			'https://sashimi.cool',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12427/thumb/SashimiSwap-200x200.png?1601347413',
						chainId: 1,
						address: '0xc28e27870558cf22add83540d2126da2e4b464c2',
						name: 'Sashimi',
						symbol: 'SASHIMI',
						decimals: 18,
					},
				],
				providers: {
					zerionDefiSDK: [
						'SashimiSwap',
					],
				},
			},
		],
	},
	{
		name: 'SatsDAO',
		slug: 'sats-dao',
		links: [
			'https://sats.do',
		],
		views: [
			{
				providers: {
					zapper: 'sats-dao',
				},
			},
		],
	},
	{
		name: 'Scale',
		slug: 'scale',
		links: [
			'https://base.equalizer.exchange',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'scale',
				},
			},
		],
	},
	{
		name: 'Scarecrow',
		slug: 'scarecrow',
		links: [
			'https://app.scarecrow.fi',
		],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0x46e1ee17f51c52661d04238f1700c547de3b84a1',
					},
				],
				providers: {
					zapper: 'scarecrow',
				},
			},
		],
	},
	{
		name: 'Super Champs: Bullet League',
		slug: 'scbulletleague',
		links: [
			'https://www.superchamps.com/super-champs-bullet-league?',
		],
		views: [
			{
				providers: {
					zapper: 'scbulletleague',
				},
			},
		],
	},
	{
		name: 'SCHIZOPOSTERS',
		slug: 'schizoposters',
		links: [
			'https://schizoposters.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'SCHIZOPOSTERS',
				},
			},
		],
	},
	{
		name: 'Scramble Finance',
		slug: 'scramble-finance',
		links: [
			'https://scramble.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'scramble-finance',
				},
			},
		],
	},
	{
		name: 'Scream',
		slug: 'scream',
		links: [
			'https://scream.sh',
		],
		views: [
			{
				name: 'Scream V2',
				slug: 'v2',
				chainId: 250,
				providers: {
					zapper: 'scream-v2',
				},
			},
			{
				name: 'Scream V1',
				slug: 'v1',
				chainId: 250,
				providers: {
					llamafolio: 'scream',
					zapper: 'scream',
				},
			},
		],
	},
	{
		name: 'Scroll',
		slug: 'scroll',
		links: [
			'https://scroll.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Scroll',
				},
			},
		],
	},
	{
		name: 'sDAI',
		slug: 'sdai',
		links: [
			'https://agavefinance.eth.limo',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'sdai',
				},
			},
		],
	},
	{
		name: 'Seamless Protocol',
		slug: 'seamless-protocol',
		links: [
			'https://www.seamlessprotocol.com',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'seamless-protocol',
					zapper: 'Seamless-Protocol',
				},
			},
		],
	},
	{
		name: 'SecondLive',
		slug: 'secondlive',
		links: [
			'https://secondlive.world',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'SecondLive',
				},
			},
		],
	},
	{
		name: 'Secured Finance',
		slug: 'secured-finance',
		links: [
			'https://secured.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'secured-finance',
				},
			},
		],
	},
	{
		name: 'Seed Club',
		slug: 'seed-club',
		links: [
			'https://www.seedclub.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'seed-club',
				},
			},
		],
	},
	{
		name: 'Seedify',
		slug: 'seedify',
		links: [
			'https://launchpad.seedify.fund',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'seedify',
				},
			},
		],
	},
	{
		name: 'Segment Finance',
		slug: 'segment-finance',
		links: [
			'https://app.segment.finance',
		],
		views: [
			{
				providers: {
					zapper: 'segment-finance',
				},
			},
		],
	},
	{
		name: 'Sentiment',
		slug: 'sentiment',
		links: [
			'https://www.sentiment.xyz',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'sentiment',
					zapper: 'sentiment',
				},
			},
		],
	},
	{
		name: 'SERAPH: In The Darkness',
		slug: 'seraph',
		links: [
			'https://www.seraph.game/#/main',
		],
		views: [
			{
				providers: {
					zapper: 'seraph',
				},
			},
		],
	},
	{
		name: 'Serious Market',
		slug: 'seriousmarket',
		links: [
			'https://serious.market',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'seriousmarket',
				},
			},
		],
	},
	{
		name: 'S.finance',
		slug: 'sfinance',
		links: [
			'https://s.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'sfinance',
				},
			},
			{
				chainId: 66,
				providers: {
					zapper: 'sfinance',
				},
			},
		],
	},
	{
		name: 'Shape Stacks',
		slug: 'shape-stacks',
		links: [
			'https://stack.shape.network/about',
		],
		views: [
			{
				providers: {
					zapper: 'shape-stacks',
				},
			},
		],
	},
	{
		name: 'Shapepe Swap',
		slug: 'shapepe-swap',
		links: [
			'https://shapepe.network',
		],
		views: [
			{
				providers: {
					zapper: 'shapepe-swap',
				},
			},
		],
	},
	{
		name: 'Shapeshift',
		slug: 'shapeshift',
		links: [
			'https://shapeshift.com',
			'https://app.shapeshift.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'shapeshift',
				},
			},
		],
	},
	{
		name: 'SharedStake',
		slug: 'sharedstake',
		links: [
			'https://www.sharedstake.org',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					erc20TokensByContractAddress['0x84810bcf08744d5862b8181f12d17bfd57d3b078'], // SharedStake Governance Token (SGT)
				],
				providers: {
					llamafolio: 'sharedstake',
					zapper: 'shared-stake',
				},
			},
		],
	},
	{
		name: 'Shark',
		slug: 'shark',
		links: [
			'https://sharkscoin.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Shark',
				},
			},
		],
	},
	{
		name: 'SharkSwap',
		slug: 'sharkswap',
		links: [
			'https://www.sharkswap.finance',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					zapper: 'SharkSwap',
				},
			},
		],
	},
	{
		name: 'Sharky Swap',
		slug: 'sharky-swap',
		links: [
			'http://sharkyswap.xyz/swap',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sharky-swap',
				},
			},
		],
	},
	{
		name: 'Shell',
		slug: 'shell',
		links: [
			'https://www.shellprotocol.io',
		],
		views: [
			{
				name: 'Shell V2',
				slug: 'v2',
				chainId: undefined,
				providers: {
					zapper: 'shell-v2',
				},
			},
				{
				chainId: 1,
				providers: {
					zapper: 'shell',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'shell-protocol',
				},
			},
		],
	},
	{
		name: 'Sherlock',
		slug: 'sherlock',
		links: [
			'https://sherlock.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'sherlock',
				},
			},
		],
	},
	{
		name: 'Shiba Memu',
		slug: 'shiba-memu',
		links: [
			'https://shibamemu.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'shiba-memu',
				},
			},
		],
	},
	{
		name: 'ShibaSwap',
		slug: 'shibaswap',
		links: [
			'https://shibaswap.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'shibaswap',
					zapper: 'shiba-swap',
				},
			},
		],
	},
	{
		name: 'Shibuya',
		slug: 'shibuya',
		links: [
			'https://www.shibuya.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'shibuya',
				},
			},
		],
	},
	{
		name: 'Shido',
		slug: 'shido',
		links: [
			'https://shido.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'shido',
				},
			},
		],
	},
	{
		name: 'Shift',
		slug: 'shift',
		links: [
			'https://www.shift.lol',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'shift',
				},
			},
		],
	},
	{
		name: 'SideShift',
		slug: 'sideshift',
		links: [
			'https://sideshift.ai',
			'https://sideshift.ai/staking',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'sideshift',
					zapper: 'sideshift',
				},
			},
		],
	},
	{
		name: 'Silo Finance',
		slug: 'silo-finance',
		links: [
			'https://app.silo.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'silo-finance',
					zapper: 'silo-finance',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'silo-finance',
					zapper: 'silo-finance',
				},
			},
			{
				name: 'Silo Llama',
				slug: 'llama',
				chainId: undefined,
				providers: {
					zapper: 'silo-llama',
				},
			},
		],
	},
	{
		name: 'Single',
		slug: 'single',
		links: [
			'https://app.singlefinance.io',
		],
		colors: [
			'#7480FF',
		],
		views: [
			{
				chainId: 25,
				providers: {
					zapper: 'single',
				},
			},
		],
	},
	{
		name: 'Singularity DAO',
		slug: 'singularity-dao',
		links: [
			'https://www.singularitydao.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'singularity-dao',
				},
			},
		],
	},
	{
		name: 'Sipher',
		slug: 'sipher',
		links: [
			'https://playsipher.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sipher',
				},
			},
		],
	},
	{
		name: 'SKALE',
		slug: 'skale-network',
		links: [
			'https://skale.space',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'skale-network',
				},
			},
		],
	},
	{
		name: 'Skeb Coin',
		slug: 'skeb-coin',
		links: [
			'https://stake.skebcoin.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'skeb-coin',
				},
			},
		],
	},
	{
		name: 'Sky',
		slug: 'sky',
		links: [
			'https://sky.money',
		],
		views: [
			{
				providers: {
					zapper: 'sky',
				},
			},
		],
	},
	{
		name: 'Skydrome',
		slug: 'skydrome',
		links: [
			'https://skydrome.finance',
		],
		views: [
			{
				providers: {
					zapper: 'skydrome',
				},
			},
		],
	},
	{
		name: 'Skyoneer',
		slug: 'skyoneer',
		links: [
			'https://www.skyoneer.com',
		],
		views: [
			{
				name: 'CropXYZ',
				slug: 'cropxyz',
				links: [
					'https://www.skyoneer.com',
					'https://play.cropxyz.com',
				],
				chainId: undefined,
				providers: {
					zapper: 'cropxyz',
				},
			},
		],
	},
	{
		name: 'Slice',
		slug: 'slice',
		links: [
			'https://slice.so',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'slice',
				},
			},
		],
	},
	{
		name: 'Sloika',
		slug: 'sloika',
		links: [
			'https://sloika.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sloika',
				},
			},
		],
	},
	{
		name: 'SmarDex',
		slug: 'smardex',
		links: [
			'https://smardex.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'smardex',
					zapper: 'SmarDex',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'smardex',
					zapper: 'SmarDex',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'smardex',
					zapper: 'SmarDex',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'smardex',
					zapper: 'SmarDex',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'smardex',
					zapper: 'SmarDex',
				},
			},
		],
	},
	{
		name: 'Smol Dapp',
		slug: 'smol',
		links: [
			'https://smold.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'smoldapp',
				},
			},
		],
	},
	{
		name: 'Smol Age',
		slug: 'smolage',
		links: [
			'https://www.smolage.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'smolage',
				},
			},
		],
	},
	{
		name: 'Smolverse',
		slug: 'smolverse',
		links: [
			'https://smolverse.lol',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'smolverse',
				},
			},
		],
	},
	{
		name: 'Smoothy',
		slug: 'smoothy',
		links: [
			'https://smoothy.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/15039/thumb/dDxKgwPN_400x400.jpg?1619507030',
						chainId: 1,
						address: '0xbf776e4fca664d791c4ee3a71e2722990e003283',
						name: 'Smoothy',
						symbol: 'SMTY',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'smoothy',
					zapper: 'smoothy',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'smoothy',
				},
			},
		],
	},
	{
		name: 'Snaky Cat',
		slug: 'snakycat',
		links: [
			'https://snakycat.io',
		],
		views: [
			{
				providers: {
					zapper: 'snakycat',
				},
			},
		],
	},
	{
		name: 'Snapshot',
		slug: 'snapshot',
		links: [
			'https://snapshot.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'snapshot',
				},
			},
		],
	},
	{
		name: 'Snowball',
		slug: 'snowball',
		links: [
			'https://snowball.network',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'snowball',
				},
			},
		],
	},
	{
		name: 'Snowbank',
		slug: 'snowbank',
		links: [
			'https://www.snowbank.finance',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'snowbank',
					zapper: 'snowbank',
				},
			},
		],
	},
	{
		name: 'Snowdog',
		slug: 'snowdog',
		links: [
			'https://www.snowdogdao.com',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'snowdog',
				},
			},
		],
	},
	{
		name: 'SnowSwap',
		slug: 'snowswap',
		links: [
			'https://snowswap.org',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12751/thumb/uQBJL3A.png?1602237225',
						chainId: 1,
						address: '0xfe9a29ab92522d14fc65880d817214261d8479ae',
						name: 'Snowswap',
						symbol: 'SNOW',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'snowswap',
					zerionDefiSDK: [
						'SnowSwap',
					],
				},
			},
		],
	},
	{
		name: 'Soaps.tech',
		slug: 'soaps-tech',
		links: [
			'https://soaps.tech',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'soaps-tech',
				},
			},
		],
	},
	{
		name: 'Soccersm',
		slug: 'soccersm',
		links: [
			'https://soccersm.ai',
		],
		views: [
			{
				providers: {
					zapper: 'soccersm',
				},
			},
		],
	},
	{
		name: 'Sociogram',
		slug: 'sociogram',
		links: [
			'https://sociogram.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Sociogram',
				},
			},
		],
	},
	{
		name: 'Socket',
		slug: 'socket',
		links: [
			'https://www.socket.tech',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'socket',
				},
			},
		],
	},
	{
		name: 'The Soft DAO',
		slug: 'soft-dao',
		links: [
			'https://www.thesoftdao.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'soft-dao',
				},
			},
		],
	},
	{
		name: 'Solace',
		slug: 'solace',
		links: [
			'https://solace.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'solace',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'solace',
				},
			},
			{
				chainId: 1313161554,
				providers: {
					zapper: 'solace',
				},
			},
		],
	},
	{
		name: 'Solana',
		slug: 'solana',
		links: [
			'https://solana.com',
		],
		views: [
			{
				name: 'Solana Staking',
				slug: 'staking',
				links: [
					'https://solana.com/staking',
				],
				chainId: undefined,
				providers: {
					zapper: 'solana-staking',
				},
			},
		],
	},
	{
		name: 'Solarbeam',
		slug: 'solarbeam',
		links: [
			'https://solarbeam.io',
		],
		views: [
			{
				chainId: 1285,
				providers: {
					zapper: 'solarbeam',
				},
			},
		],
	},
	{
		name: 'Solidus AI TECH',
		slug: 'solidus-ai-tech',
		links: [
			'https://aitech.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ai-tech',
				},
			},
		],
	},
	{
		name: 'Solid World',
		slug: 'solid-world',
		links: [
			'https://www.solid.world',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'solid-world',
				},
			},
		],
	},
	{
		name: 'Solidex',
		slug: 'solidex',
		links: [
			'https://solidexfinance.com',
		],
		views: [
			{
				chainId: 250,
				providers: {
					zapper: 'solidex',
				},
			},
		],
	},
	{
		name: 'SolidLizard',
		slug: 'solidlizard',
		links: [
			'https://solidlizard.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'solidlizard',
					zapper: 'solid-lizard',
				},
			},
		],
	},
	{
		name: 'Solidly',
		slug: 'solidly',
		links: [
			'https://solidly.exchange',
		],
		views: [
			{
				name: 'V2',
				slug: 'v2',
				links: [
					'https://solidly.com',
				],
				chainId: 1,
				providers: {
					llamafolio: 'solidly-v2',
				},
			},
			{
				name: 'V1',
				slug: 'v1',
				chainId: 250,
				providers: {
					zapper: 'solidly',
				},
			},
		],
	},
	{
		name: 'SoliSnek Finance',
		slug: 'solisnek-finance',
		links: [
			'https://www.solisnek.finance',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'solisnek-finance',
				},
			},
		],
	},
	{
		name: 'Solunea',
		slug: 'solunea',
		links: [
			'https://www.solunea.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'solunea',
				},
			},
		],
	},
	{
		name: 'Solv Protocol',
		slug: 'solv-protocol',
		links: [
			'https://solv.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'solv-protocol',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'solv-protocol',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'solv-protocol',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'solv-protocol',
				},
			},
		],
	},
	{
		name: 'Solv Protocol',
		slug: 'solv-protocol',
		links: [
			'https://solv.finance',
		],
		views: [
			{
				providers: {
					zapper: 'solv-protocol',
				},
			},
		],
	},
	{
		name: 'Sommelier',
		slug: 'sommelier',
		links: [
			'https://www.sommelier.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'sommelier',
					zapper: 'sommelier',
					// zapper: 'sommelier-finance',
				},
			},
		],
	},
	{
		name: 'Song a Day World',
		slug: 'song-a-day',
		links: [
			'https://songaday.world',
		],
		views: [
			{
				name: 'Song a Day Daily Auction',
				slug: 'auction',
				chainId: undefined,
				providers: {
					zapper: 'song-a-day',
				},
			},
		],
	},
	{
		name: 'Song.Tech',
		slug: 'songtech',
		links: [
			'https://www.song.tech',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'songtech',
				},
			},
		],
	},
	{
		name: 'Sonik Coin',
		slug: 'sonik',
		links: [
			'https://sonikcoin.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sonik',
				},
			},
		],
	},
	{
		name: 'Sonne Finance',
		slug: 'sonne-finance',
		links: [
			'https://sonne.finance',
		],
		views: [
			{
				chainId: 10,
				providers: {
					llamafolio: 'sonne-finance',
					zapper: 'sonne',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'sonne-finance',
					zapper: 'sonne',
				},
			},
		],
	},
	{
		name: 'SORA',
		slug: 'sora',
		links: [
			'https://sora.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'SORA',
				},
			},
		],
	},
	{
		name: 'Sorare',
		slug: 'sorare',
		links: [
			'https://sorare.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sorare',
				},
			},
		],
	},
	{
		name: 'SoulSwap',
		slug: 'soul-swap',
		links: [
			'https://exchange.soulswap.finance/swap',
		],
		views: [
			{
				providers: {
					zapper: 'soul-swap',
				},
			},
		],
	},
	{
		name: 'Sound.xyz',
		slug: 'sound-xyz',
		links: [
			'https://www.sound.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sound-xyz',
				},
			},
		],
	},
	{
		name: 'Sovryn',
		slug: 'sovryn',
		links: [
			'https://sovryn.com',
		],
		views: [
			{
				providers: {
					zapper: 'sovryn',
				},
			},
		],
	},
	{
		name: 'SPACE ID',
		slug: 'space-id',
		links: [
			'https://space.id',
		],
		views: [
			{
				name: '.arb Name Service',
				slug: 'arb-id',
				links: [
					'https://arb.space.id',
				],
				chainId: 42161,
				providers: {
					zapper: 'arbid',
				},
			},
		],
	},
	{
		name: 'Space Riders',
		slug: 'space-riders',
		links: [
			'https://spaceriders.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Space-Riders',
				},
			},
		],
	},
	{
		name: 'Spacebar',
		slug: 'spacebar',
		links: [
			'https://www.spacebar.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'spacebar',
				},
			},
		],
	},
	{
		name: 'SpaceCatch',
		slug: 'spacecatch',
		links: [
			'https://spacecatch.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'spacecatch',
				},
			},
		],
	},
	{
		name: 'Spark',
		slug: 'spark',
		links: [
			'https://www.spark.fi',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'spark',
					zapper: 'spark',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'spark',
					zapper: 'spark',
				},
			},
		],
	},
	{
		name: 'Sparkswap',
		slug: 'sparkswap',
		links: [
			'https://sparkswap.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'sparkswap',
				},
			},
		],
	},
	{
		name: 'Spartacus',
		slug: 'spartacus',
		links: [
			'https://app.spartacus.finance',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'spartacus',
					zapper: 'spartacus',
				},
			},
		],
	},
	{
		name: 'SpartaDex',
		slug: 'spartadex',
		links: [
			'https://spartadex.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'spartadex',
					zapper: 'SpartaDex',
				},
			},
		],
	},
	{
		name: 'Sperax',
		slug: 'sperax',
		links: [
			'https://www.sperax.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sperax',
				},
			},
		],
	},
	{
		name: 'Sphere Finance',
		slug: 'sphere-finance',
		links: [
			'https://sphere.finance',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'sphere-finance',
				},
			},
		],
	},
	{
		name: 'Spice Finance',
		slug: 'spice-finance',
		links: [
			'https://www.spicefi.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'spice-finance',
					zapper: 'spice-finance',
				},
			},
		],
	},
	{
		name: 'Spiko',
		slug: 'spiko',
		links: [
			'https://www.spiko.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'spiko',
				},
			},
		],
	},
	{
		name: 'Spiral DAO',
		slug: 'spiral-dao',
		links: [
			'https://spiral.farm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'spiral-dao',
				},
			},
		],
	},
	{
		name: 'SpiritSwap',
		slug: 'spiritswap',
		links: [
			'https://www.spiritswap.finance',
			'https://app.spiritswap.finance'
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'spiritswap',
					zapper: 'spiritswap',
				},
			},
		],
	},
	{
		name: 'Splice Finance',
		slug: 'splice-finance',
		links: [
			'https://app.splice.fi',
		],
		views: [
			{
				providers: {
					zapper: 'splice-finance',
				},
			},
		],
	},
	{
		name: 'Splinterlands',
		slug: 'splinterlands',
		links: [
			'https://splinterlands.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'splinterlands',
				},
			},
		],
	},
	{
		name: 'Splits',
		slug: 'splits',
		links: [
			'https://splits.org',
			'https://www.0xsplits.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zero-x-splits',
				},
			},
		],
	},
	{
		name: 'SpookySwap',
		slug: 'spookyswap',
		links: [
			'https://spooky.fi',
			'https://spookyswap.finance',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'spookyswap',
					zapper: 'spookyswap',
				},
			},
		],
	},
	{
		name: 'Spool',
		slug: 'spool',
		links: [
			'https://www.spool.fi',
			'https://app.spool.fi',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x40803cea2b2a32bda1be61d3604af6a814e70976',
					},
				],
				providers: {
					llamafolio: 'spool-protocol',
					zapper: 'spool',
				},
			},
		],
	},
	{
		name: 'Spork DAO',
		slug: 'spork-dao',
		links: [
			'https://www.sporkdao.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'spork-dao',
				},
			},
		],
	},
	{
		name: 'Squid',
		slug: 'squid',
		links: [
			'https://www.squidrouter.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'squid-router',
				},
			},
		],
	},
	{
		name: 'SquidDAO',
		slug: 'squid-dao',
		links: [
			'https://squid.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'squid',
				},
			},
		],
	},
	{
		name: 'Stabl.fi',
		slug: 'stabl-fi',
		links: [
			'https://stabl.fi',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'stabl.fi',
				},
			},
		],
	},
	{
		name: 'Stack',
		slug: 'stack',
		links: [
			'https://www.stack.so',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'stack',
				},
			},
		],
	},
	{
		name: 'Stader',
		slug: 'stader',
		links: [
			'https://staderlabs.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'stader',
					zapper: 'stader',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'stader',
					zapper: 'stader',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'stader',
					zapper: 'stader',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'stader',
					zapper: 'stader',
				},
			},
		],
	},
	{
		name: 'StaFi Protocol',
		slug: 'stafi',
		links: [
			'https://www.stafi.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'stafi',
					zapper: 'sta-fi',
				},
			},
		],
	},
	{
		name: 'Stake DAO',
		slug: 'stake-dao',
		links: [
			'https://stakedao.org',
		],
		colors: [
			'#7c3aed',
		], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13724/thumb/stakedao_logo.jpg?1611195011',
						chainId: 1,
						address: '0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f',
						name: 'Stake DAO',
						symbol: 'SDT',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'stakedao',
					zapper: 'stake-dao',
					zerionDefiSDK: [
						'Stake DAO',
					],
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'stakedao',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'stakedao',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'stakedao',
				},
			},
		],
	},
	{
		name: 'stake.link',
		slug: 'stake-link',
		links: [
			'https://stake.link',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'stake.link',
					zapper: 'stake-link',
				},
			},
		],
	},
	{
		name: 'StakedCelo',
		slug: 'staked-celo',
		links: [
			'https://app.stcelo.xyz/connect',
		],
		views: [
			{
				chainId: 42220,
				providers: {
					zapper: 'staked-celo',
				},
			},
		],
	},
	{
		name: 'stakedFLIP',
		slug: 'stakedflip',
		links: [
			'https://stakedflip.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'stakedflip',
				},
			},
		],
	},
	{
		name: 'Stakefish',
		slug: 'stakefish',
		links: [
			'https://stake.fish',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'stakefish',
				},
			},
		],
	},
	{
		name: 'StakeHound',
		slug: 'stakehound',
		links: [
			'https://stakehound.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'stakehound',
				},
			},
		],
	},
	{
		name: 'Stakeland',
		slug: 'stakeland',
		links: [
			'https://www.stakeland.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'stakeland',
				},
			},
		],
	},
	{
		name: 'StakeStone',
		slug: 'stakestone',
		links: [
			'https://stakestone.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'stakestone',
				},
			},
		],
	},
	{
		name: 'StakeWise',
		slug: 'stakewise',
		links: [
			'https://stakewise.io',
		],
		views: [
			{
				chainId: 100,
				providers: {
					llamafolio: 'stakewise',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'stakewise',
					zapper: 'stakewise',
				},
			},
		],
	},
	{
		name: 'Stargate',
		slug: 'stargate',
		links: [
			'https://stargate.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'stargate',
					zapper: 'stargate',
				},
			},
			{
				chainId: 59144,
				providers: {
					llamafolio: 'stargate',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'stargate',
				},
			},
		],
	},
	{
		name: 'Starknet',
		slug: 'starknet',
		links: [
			'https://www.starknet.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'starknet',
				},
			},
			{
				name: 'StarkGate Bridge',
				slug: 'starkgate',
				links: [
					'https://starkgate.starknet.io',
				],
				chainId: undefined,
				providers: {
					zapper: 'starkgate',
				},
			},
		],
	},
	{
		name: 'SteakHut',
		slug: 'steak-hut',
		links: [
			'https://www.steakhut.finance',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'steak-hut',
				},
			},
		],
	},
	{
		name: 'Steer Protocol',
		slug: 'steer-protocol',
		links: [
			'https://steer.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
			{
				chainId: 59144,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'steer-protocol',
					zapper: 'Steer-Protocol',
				},
			},
		],
	},
	{
		name: 'StellaSwap',
		slug: 'stellaswap',
		links: [
			'https://stellaswap.com',
		],
		views: [
			{
				providers: {
					zapper: 'stellaswap',
				},
			},
		],
	},
	{
		name: 'STEPN',
		slug: 'stepn',
		links: [
			'https://www.stepn.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'stepn',
				},
			},
		],
	},
	{
		name: 'Sterling Finance',
		slug: 'sterling-finance',
		links: [
			'https://x.com/Sterling_Fi',
		],
		views: [
			{
				providers: {
					zapper: 'sterling-finance',
				},
			},
		],
	},
	{
		name: 'Stoke Fire',
		slug: 'stoke-fire',
		links: [
			'https://stokefire.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'stoke-fire',
				},
			},
		],
	},
	{
		name: 'Stormswap',
		slug: 'stormswap',
		links: [
			'https://stormswap.finance',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'stormswap',
				},
			},
		],
	},
	{
		name: 'Stream Finance',
		slug: 'stream-finance',
		links: [
			'https://streamprotocol.money',
		],
		views: [
			{
				providers: {
					zapper: 'stream-finance',
				},
			},
		],
	},
	{
		name: 'Streamr',
		slug: 'streamr',
		links: [
			'https://streamr.network',
		],
		colors: [
			'#FF5C00',
			'#0D009A',
		], // https://streamr.network/design/#colours
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/1115/thumb/streamr.png?1547035101',
						chainId: 1,
						address: '0x0cf0ee63788a0849fe5297f3407f701e122cc023',
						name: 'Streamr XDATA',
						symbol: 'XDATA',
						decimals: 18,
					},
				],
			},
		],
	},
	{
		name: 'Strike',
		slug: 'strike',
		links: [
			'https://strike.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'strike',
					zapper: 'strike',
				},
			},
		],
	},
	{
		name: 'Strongblock',
		slug: 'strongblock',
		links: [
			'https://strongblock.com',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x990f341946a3fdb507ae7e52d17851b87168017c',
					},
				],
				providers: {
					zapper: 'strongblock',
				},
			},
		],
	},
	{
		name: 'Strudel Finance',
		slug: 'strudel',
		links: [
			'https://strudel.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13854/thumb/1614634281474-TRDL_LOGO_PNG.png?1614671874',
						chainId: 1,
						address: '0x297d33e17e61c2ddd812389c2105193f8348188a',
						name: 'Strudel Finance',
						symbol: 'TRDL',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'snowball',
				},
			},
		]
	},
	{
		name: 'Sturdy',
		slug: 'sturdy',
		links: [
			'https://sturdy.finance',
			'https://app.sturdy.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'sturdy',
					zapper: 'sturdy',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'sturdy',
					zapper: 'sturdy',
				},
			},
		],
	},
	{
		name: 'stUSDT',
		slug: 'stusdt',
		links: [
			'https://stusdt.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'stusdt',
					zapper: 'stusdt',
				},
			},
		],
	},
	{
		name: 'Sudoswap',
		slug: 'sudoswap',
		links: [
			'https://sudoswap.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'sudoswap',
					zapper: 'sudoswap',
				},
			},
		],
	},
	{
		name: 'Sugartown',
		slug: 'sugartown',
		links: [
			'https://visitsugartown.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sugartown',
				},
			},
		],
	},
	{
		name: 'Summer.fi',
		slug: 'summer-fi',
		links: [
			'https://summer.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'summer.fi',
					zapper: 'summer-fi',
					// zapper: 'Summer-fi',
				},
			},
		],
	},
	{
		name: 'Superbridge',
		slug: 'superbridge',
		links: [
			'https://superbridge.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'superbridge',
				},
			},
		],
	},
	{
		name: 'SuperFarm',
		slug: 'superfarm',
		links: [
			'https://superfarm.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'superfarm',
					zapper: 'super-farm',
				},
			},
		],
	},
	{
		// https://docs.superfluid.finance/superfluid/networks/networks
		name: 'Superfluid',
		slug: 'superfluid',
		links: [
			'https://www.superfluid.finance',
		],
		colors: [
			'#10BB34',
			'#12141E',
		],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						chainId: 137,
						address: '0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3',
						name: 'Super MATIC',
						symbol: 'MATICx',
						decimals: 18,
					},
					{
						chainId: 137,
						address: '0x27e1e4E6BC79D93032abef01025811B7E4727e85',
						name: 'Super WETH (PoS)',
						symbol: 'ETHx',
						decimals: 18,
					},
					{
						chainId: 137,
						address: '0xCAa7349CEA390F89641fe306D93591f87595dc1F',
						name: 'Super USDC (PoS)',
						symbol: 'USDCx',
						decimals: 18,
					},
					{
						chainId: 137,
						address: '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2',
						name: 'Super DAI (PoS)',
						symbol: 'DAIx',
						decimals: 18,
					},
					{
						chainId: 137,
						address: '0x4086eBf75233e8492F1BCDa41C7f2A8288c2fB92',
						name: 'Super WBTC (PoS)',
						symbol: 'WBTCx',
						decimals: 18,
					},
				],
				contracts: [
					{
						name: 'Resolver',
						address: '0xE0cc76334405EE8b39213E620587d815967af39C',
					},
					{
						name: 'Host',
						address: '0x3E14dC1b13c488a8d5D310918780c983bD5982E7',
					},
					{
						name: 'CFAv1',
						address: '0x6EeE6060f715257b970700bc2656De21dEdF074C',
					},
					{
						name: 'IDAv1',
						address: '0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1',
					},
					{
						name: 'SuperTokenFactory',
						address: '0x2C90719f25B10Fc5646c82DA3240C76Fa5BcCF34',
					},
				],
				providers: {
					zapper: 'superfluid',
				},
			},
			{
				chainId: 100,
				erc20Tokens: [
					{
						chainId: 100,
						address: '0x59988e47A3503AaFaA0368b9deF095c818Fdca01',
						name: 'Super xDAI',
						symbol: 'xDAIx',
						decimals: 18,
					},
				],
				contracts: [
					{
						name: 'Resolver',
						address: '0xD2009765189164b495c110D61e4D301729079911',
					},
					{
						name: 'Host',
						address: '0x2dFe937cD98Ab92e59cF3139138f18c823a4efE7',
					},
					{
						name: 'CFAv1',
						address: '0xEbdA4ceF883A7B12c4E669Ebc58927FBa8447C7D',
					},
					{
						name: 'IDAv1',
						address: '0x7888ac96F987Eb10E291F34851ae0266eF912081',
					},
					{
						name: 'SuperTokenFactory',
						address: '0x23410e2659380784498509698ed70E414D384880',
					},

					{
						name: 'WORK SuperToken',
						address: '0x0872d200f74e4a45e830eccc9e8b8f605df7ce06',
					},
				],
				providers: {
					zapper: 'superfluid',
				},
			},
		],
	},
	{
		name: 'Superform Labs',
		slug: 'superform-labs',
		links: [
			'https://www.superform.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'superform-labs',
				},
			},
		],
	},
	{
		name: 'SuperMarket',
		slug: 'supermarket',
		links: [
			'https://www.supermarket.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'supermarket',
				},
			},
		],
	},
	{
		name: 'SuperRare',
		slug: 'superrare',
		links: [
			'https://superrare.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'super-rare',
				},
			},
		],
	},
	{
		name: 'Superstate',
		slug: 'superstate',
		links: [
			'https://superstate.co',
		],
		views: [
			{
				providers: {
					zapper: 'superstate',
				},
			},
		],
	},
	{
		name: 'SuperVerse DAO',
		slug: 'superverse-dao',
		links: [
			'https://superverse.cool',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'SuperVerse-DAO',
				},
			},
		],
	},
	{
		name: 'Supreme Kong',
		slug: 'supreme-kong',
		links: [
			'https://www.supremekong.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Supreme-kong',
				},
			},
		],
	},
	{
		name: 'Sushi',
		slug: 'sushi',
		links: [
			'https://sushi.com',
		],
		colors: [
			'#016eda',
			'#d900c0',
		],
		views: [
			{
				slug: 'ethereum',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688',
						chainId: 1,
						address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
						name: 'Sushi',
						symbol: 'SUSHI',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
					zerionDefiSDK: [
						'SushiSwap',
						'SushiSwap • Staking',
					],
				},
			},
			{
				name: 'SushiSwap Bentobox',
				slug: 'bentobox',
				chainId: 1,
				providers: {
					zapper: 'sushiswap-bentobox',
				},
			},
			{
				name: 'SushiSwap Kashi',
				slug: 'kashi',
				chainId: 1,
				providers: {
					zapper: 'sushiswap-kashi',
				},
			},
			{
				slug: 'fantom',
				chainId: 250,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'bsc',
				chainId: 56,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'polygon',
				chainId: 137,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'heco',
				chainId: 128,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'gnosis',
				chainId: 100,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'harmony',
				chainId: 1666600000,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'avalanche',
				chainId: 43114,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				slug: 'arbitrum',
				chainId: 42161,
				providers: {
					llamafolio: 'sushiswap',
					zapper: 'sushiswap',
				},
			},
			{
				name: 'SushiSwap FuroStream',
				slug: 'furo-stream',
				links: [
					'https://www.sushi.com/furo',
				],
				chainId: undefined,
				providers: {
					zapper: 'sushi-swap-furo-stream',
				},
			},
			{
				name: 'SushiXSwap',
				slug: 'x-swap',
				links: [
					'https://www.sushi.com/swap/cross-chain',
				],
				chainId: undefined,
				providers: {
					zapper: 'sushi-x-swap',
				},
			},
		],
	},
	{
		name: 'Swaap',
		slug: 'swaap',
		links: [
			'https://www.swaap.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'swaap',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'swaap',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'swaap',
				},
			},
		],
	},
	{
		name: 'Swaap',
		slug: 'swaapfinance',
		links: [
			'https://www.swaap.finance',
		],
		views: [
			{
				providers: {
					zapper: 'swaapfinance',
				},
			},
		],
	},
	{
		name: 'SwapBased',
		slug: 'swapbased',
		links: [
			'https://swapbased.finance',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'swapbased',
					zapper: 'swap-based',
				},
			},
		],
	},
	{
		name: 'SwapBlast',
		slug: 'swapblast',
		links: [
			'https://swapblast.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'swap-blast',
				},
			},
		],
	},
	{
		name: 'SwapMode',
		slug: 'swapmode',
		links: [
			'https://swapmode.fi',
		],
		views: [
			{
				providers: {
					zapper: 'swapmode',
				},
			},
		],
	},
	{
		name: 'Swapr',
		slug: 'swapr',
		links: [
			'https://swapr.eth.limo',
			'https://swapr.eth.link',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'swapr',
					zapper: 'swapr',
				},
			},
			{
				chainId: 100,
				providers: {
					llamafolio: 'swapr',
					zapper: 'swapr',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'swapr',
					zapper: 'swapr',
				},
			},
		],
	},
	{
		name: 'Swell',
		slug: 'swell',
		links: [
			'https://www.swellnetwork.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'swell',
					zapper: 'swell',
				},
			},
		],
	},
	{
		name: 'Swerve',
		slug: 'swerve',
		links: [
			'https://swerve.fi',
		],
		colors: [
			'#86fce7',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12361/thumb/swerve.png?1599278316',
						chainId: 1,
						address: '0xb8baa0e4287890a5f79863ab62b7f175cecbd433',
						name: 'Swerve',
						symbol: 'SWRV',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'swerve',
					zerionDefiSDK: [
						'Swerve',
						'Swerve • Liquidity Gauges',
					],
				},
			},
		],
	},
	{
		name: 'SWFT Blockchain',
		slug: 'swft-blockchain',
		links: [
			'https://www.swft.pro',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'SWFT-Blockchain',
				},
			},
		],
	},
	{
		name: 'Swivel Finance',
		slug: 'swivel-finance',
		links: [
			'https://swivel.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'swivel-finance',
				},
			},
		],
	},
	{
		name: 'Symbiosis',
		slug: 'symbiosis',
		links: [
			'https://symbiosis.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'symbiosis',
				},
			},
		],
	},
	{
		name: 'Symbiotic',
		slug: 'symbiotic',
		links: [
			'https://symbiotic.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'symbiotic',
				},
			},
		],
	},
	{
		name: 'Symphony',
		slug: 'symphony',
		links: [
			'https://app.symphony.finance',
		],
		colors: [
			'#1f222c',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'symphony',
				},
			},
			{
				chainId: 10,
				providers: {
					zapper: 'symphony',
				},
			},
			{
				chainId: 43114,
				providers: {
					zapper: 'symphony',
				},
			},
		],
	},
	{
		name: 'Synapse',
		slug: 'synapse',
		links: [
			'https://synapseprotocol.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'synapse',
					zapper: 'synapse',
				},
			},
		],
	},
	{
		name: 'SyncSwap',
		slug: 'syncswap',
		links: [
			'https://syncswap.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'sync-swap',
				},
			},
		],
	},
	{
		name: 'Syncus DAO',
		slug: 'syncus',
		links: [
			'https://syncus.fi',
			'https://app.syncus.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'syncus',
					zapper: 'syncus-dao',
				},
			},
		],
	},
	{
		name: 'SynFutures',
		slug: 'synfutures',
		links: [
			'https://www.synfutures.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'synfutures',
				},
			},
		],
	},
	{
		name: 'Synlev',
		slug: 'synlev',
		links: [
			'https://synlev.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'synlev',
				},
			},
		],
	},
	{
		name: 'Synonym Finance',
		slug: 'synonym-finance',
		links: [
			'https://app.synonym.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'synonym-finance',
				},
			},
		],
	},
	{
		name: 'Synthetix',
		colors: [
			'#00d1ff',
			'#1e1a31',
		],
		slug: 'synthetix',
		links: [
			'https://www.synthetix.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/3406/thumb/SNX.png?1598631139',
						chainId: 1,
						address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
						name: 'Synthetix Network T',
						symbol: 'SNX',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'synthetix',
					theGraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
					zapper: 'synthetix',
					zerionDefiSDK: [
						'Synthetix',
					],
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'synthetix',
				},
			},
			{
				name: 'Synthetix Mintr',
				slug: 'mintr',
				chainId: 1,
				providers: {
					zapper: 'mintr',
				},
			},
		],
	},
	{
		name: 'Synthswap',
		slug: 'synthswap',
		links: [
			'https://www.synthswap.io/home',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'synthswap',
				},
			},
		],
	},
	{
		name: 'Syrup',
		slug: 'syrup',
		links: [
			'https://syrup.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'syrup',
				},
			},
		],
	},
	{
		name: 'TAI',
		slug: 'tai',
		links: [
			'https://tai.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tai',
				},
			},
		],
	},
	{
		name: 'Talent Protocol',
		slug: 'talent-protocol',
		links: [
			'https://talentprotocol.com',
		],
		views: [
			{
				providers: {
					zapper: 'talent-protocol',
				},
			},
		],
	},
	{
		name: 'Tales of Elleria',
		slug: 'talesofelleria',
		links: [
			'https://talesofelleria.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'talesofelleria',
				},
			},
		],
	},
	{
		name: 'Tally',
		slug: 'tally',
		links: [
			'https://www.tally.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tally',
				},
			},
		],
	},
	{
		name: 'Tangible',
		slug: 'tangible',
		links: [
			'https://www.tangible.store',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'tangible',
				},
			},
		],
	},
	{
		name: 'Tapioca',
		slug: 'tapioca',
		links: [
			'https://www.tapioca.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'tapioca',
				},
			},
		],
	},
	{
		name: 'Tarot',
		slug: 'tarot',
		links: [
			'https://www.tarot.to',
		],
		views: [
			{
				chainId: 250,
				providers: {
					zapper: 'tarot',
				},
			},
		],
	},
	{
		name: 'Tasties',
		slug: 'tasties',
		links: [
			'https://tasties.io/#home',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tasties',
				},
			},
		],
	},
	{
		name: 'Teahouse',
		slug: 'teahouse',
		links: [
			'https://teahouse.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'teahouse',
				},
			},
		],
	},
	{
		name: 'Tectonic',
		slug: 'tectonic',
		links: [
			'https://tectonic.finance',
		],
		colors: [
			'#000024',
		],
		views: [
			{
				chainId: 25,
				providers: {
					zapper: 'tectonic',
				},
			},
		],
	},
	{
		name: 'Teddy Cash',
		slug: 'teddy-cash',
		links: [
			'https://teddy.cash',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'teddy-cash',
				},
			},
		],
	},
	{
		name: 'Tellor',
		slug: 'tellor',
		links: [
			'https://tellor.io',
		],
		colors: [
			'#20f092',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/9644/thumb/Blk_icon_current.png?1584980686',
						chainId: 1,
						address: '0x88df592f8eb5d7bd38bfef7deb0fbc02cf3778a0',
						name: 'Tellor',
						symbol: 'TRB',
						decimals: 18,
					},
				],
				contracts: [
					{
						name: 'Oracle',
						address: '0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0',
					},
					{
						name: 'Lens',
						address: '0xB2b6c6232d38faE21656703cAC5A74e5314741D4',
					},
					{
						name: 'Fellowship (trusted addresses)',
						address: '0xCA240cf523cD9163C2A8465B2642B04749704625',
					},
					{
						name: 'Rivendell (voting logic)',
						address: '0xd53412ff046B13318C05e923919d8dB07C3cB3E9',
					},
				],
				providers: {
					zapper: 'Tellor',
				},
			},
		],
	},
	{
		name: 'TemplarDAO',
		slug: 'templar-dao',
		links: [
			'https://templar.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'templar-dao',
				},
			},
		],
	},
	{
		name: 'TempleDAO',
		slug: 'templedao',
		links: [
			'https://www.templedao.link',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'templedao',
				},
			},
		],
	},
	{
		name: 'Tempus',
		slug: 'tempus',
		links: [
			'https://tempus.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'tempus',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'tempus',
				},
			},
		],
	},
	{
		name: '10KTF',
		slug: '10ktf',
		links: [
			'https://10ktf.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ten-k-t-f',
				},
			},
		],
	},
	{
		name: 'Tender Finance',
		slug: 'tender-finance',
		links: [
			'https://www.tender.fi',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'tender-finance',
				},
			},
		],
	},
	{
		name: 'Tenderize',
		slug: 'tenderize',
		links: [
			'https://app.tenderize.me',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'tenderize',
				},
			},
			{
				chainId: 1,
				providers: {
					zapper: 'tenderize',
				},
			},
		],
	},
	{
		name: 'Tensorplex',
		slug: 'tensorplex',
		links: [
			'https://stake.tensorplex.ai',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'tensorplex',
					zapper: 'tensorplex',
				},
			},
		],
	},
	{
		name: 'Tessera',
		slug: 'tessera',
		links: [
			'https://tessera.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tessera',
				},
			},
		],
	},
	{
		name: 'Tesseract',
		slug: 'tesseract',
		links: [
			'https://tesr.finance',
		],
		views: [
			{
				providers: {
					zapper: 'tesseract',
				},
			},
		],
	},
	{
		name: 'Tethys Finance',
		slug: 'tethys-finance',
		links: [
			'https://tethys.finance',
		],
		views: [
			{
				providers: {
					zapper: 'tethys-finance',
				},
			},
		],
	},
	{
		name: 'Tetu',
		slug: 'tetu',
		links: [
			'http://tetu.io',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'tetu',
					zapper: 'tetu',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'tetu',
					zapper: 'tetu',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'tetu',
					zapper: 'tetu',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'tetu',
					zapper: 'tetu',
				},
			},
		],
	},
	{
		name: 'TG Casino',
		slug: 'tg-casino',
		links: [
			'https://tg.casino/#home',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'TG-Casino',
				},
			},
		],
	},
	{
		name: 'Thales',
		slug: 'thales',
		links: [
			'https://thalesmarket.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'thales',
					zapper: 'thales',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'thales',
					zapper: 'thales',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'thales',
					zapper: 'thales',
				},
			},
		],
	},
	{
		name: 'The Barren Court',
		slug: 'the-barren-court',
		links: [
			'https://wildlands.thebarrencourt.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'the-barren-court',
				},
			},
		],
	},
	{
		name: 'The Base Farm',
		slug: 'the-base-farm',
		links: [
			'https://wildbase.farm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'WILD-BASE',
				},
			},
		],
	},
	{
		name: 'The Graph',
		slug: 'the-graph',
		links: [
			'https://thegraph.com',
		],
		colors: [
			'#4ca4ff',
			'#6f4cff',
		], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13397/thumb/Graph_Token.png?1608145566',
						chainId: 1,
						address: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
						name: 'The Graph',
						symbol: 'GRT',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'the-graph',
				},
			},
		],
	},
	{
		name: 'The Idols',
		slug: 'the-idols',
		links: [
			'https://www.theidols.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'the-idols',
					zapper: 'the-idols',
				},
			},
		],
	},
	{
		name: 'The LLamas',
		slug: 'the-llamas',
		links: [
			'https://www.thellamas.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'the-llamas',
				},
			},
		],
	},
	{
		name: 'The OpenDAO',
		slug: 'the-opendao',
		views: [
			{
				name: 'SOS',
				slug: 'sos',
				links: [
					'https://www.theopendao.com/#sos',
				],
				chainId: 1,
				providers: {
					llamafolio: 'the-open-dao-sos',
				},
			},
		],
	},
	{
		name: 'The Plague Of Frogs',
		slug: 'the-plague-of-frogs',
		links: [
			'https://www.plaguebrands.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: ' The-Plague-Of-Frogs',
				},
			},
		],
	},
	{
		name: 'The Root Network',
		slug: 'the-root-network',
		links: [
			'https://www.therootnetwork.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'the-root-network',
				},
			},
		],
	},
	{
		name: 'THE WATCH',
		slug: 'the-watch',
		links: [
			'https://www.thewatch.com/home',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'THE-WATCH',
				},
			},
		],
	},
	{
		name: 'THE WOLVES',
		slug: 'the-wolves',
		links: [
			'https://www.thewolves.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'the-wolves',
				},
			},
		],
	},
	{
		name: 'The Beacon',
		slug: 'thebeacon',
		links: [
			'https://thebeacon.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'thebeacon',
				},
			},
		],
	},
	{
		name: 'THENA',
		slug: 'thena',
		links: [
			'https://www.thena.fi',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'thena',
				},
			},
		],
	},
	{
		name: 'Thena',
		slug: 'thena',
		links: [
			'https://thena.fi',
		],
		views: [
			{
				providers: {
					zapper: 'thena',
				},
			},
		],
	},
	{
		name: 'TheRundown',
		slug: 'therundown',
		links: [
			'https://therundown.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'therundown',
				},
			},
		],
	},
	{
		name: 'Thetanuts Finance',
		slug: 'thetanuts-finance',
		links: [
			'https://www.thetanuts.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'thetanuts-finance',
				},
			},
		],
	},
	{
		name: 'Tholgar',
		slug: 'tholgar',
		links: [
			'https://tholgar.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'tholgar',
				},
			},
		],
	},
	{
		name: 'THORSwap',
		slug: 'thorswap',
		links: [
			'https://thorswap.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'thorswap',
				},
			},
		],
	},
	{
		name: 'Threshold Network',
		slug: 'threshold-network',
		links: [
			'https://threshold.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'threshold-network',
				},
			},
		],
	},
	{
		name: 'ThriveCoin',
		slug: 'thrivecoin',
		links: [
			'https://app.thrivecoin.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'thrivecoin',
				},
			},
		],
	},
	{
		name: 'Thruster',
		slug: 'thruster',
		links: [
			'https://www.thruster.finance',
		],
		views: [
			{
				name: 'Thruster V3',
				slug: 'v3',
				chainId: undefined,
				providers: {
					zapper: 'thruster-v3',
				},
			},
			{
				name: 'Thruster V2',
				slug: 'v2',
				chainId: 81457,
				providers: {
					zapper: 'thruster-v2',
				},
			},
		],
	},
	{
		name: 'Tidal Flats',
		slug: 'tidal-flats',
		links: [
			'https://airdrop.tidalflats.studio',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tidal-flats',
				},
			},
		],
	},
	{
		name: 'Tigris Protocol',
		slug: 'tigris-protocol',
		links: [
			'https://tigris.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tigris',
				},
			},
		],
	},
	{
		name: 'Tigris Trade',
		slug: 'tigris-trade',
		links: [
			'https://tigris.trade',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'tigris',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'tigris',
				},
			},
		],
	},
	{
		name: 'Timeless Finance',
		slug: 'timeless-finance',
		links: [
			'https://timelessfi.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'timeless-finance',
				},
			},
		],
	},
	{
		name: 'Timeswap',
		slug: 'timeswap',
		links: [
			'https://timeswap.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'timeswap',
				},
			},
		],
	},
	{
		name: 'Timewarp',
		slug: 'timewarp',
		links: [
			'https://timewarp.finance',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'timewarp',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'timewarp',
				},
			},
		],
	},
	{
		name: 'TinFun',
		slug: 'tinfun',
		links: [
			'https://www.tinfun.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tinfun',
				},
			},
		],
	},
	{
		name: 'Tip Coin',
		slug: 'tipcoin',
		links: [
			'https://thetipcoin.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tipcoin',
				},
			},
		],
	},
	// {
	// 	name: 'Titan X',
	// 	slug: 'titan-x',
	// 	links: [
	// 		'https://titanx.org',
	// 	],
	// 	views: [
	// 		{
	// 			chainId: 0x1,
	// 			providers: {
	// 				zapper: 'Titan-X',
	// 			},
	// 		},
	// 	],
	// },
	{
		name: 'TITLES',
		slug: 'titles',
		links: [
			'https://titles.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'titles',
				},
			},
		],
	},
	{
		name: 'TLX',
		slug: 'tlx',
		links: [
			'https://tlx.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tlx',
				},
			},
		],
	},
	{
		name: 'TMR.NEWS',
		slug: 'tmr-news',
		links: [
			'https://tmr.news',
		],
		views: [
			{
				providers: {
					zapper: 'tmrnews',
				},
			},
		],
	},
	{
		name: 'tofuNFT',
		slug: 'tofunft',
		links: [
			'https://tofunft.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tofuNFT',
				},
			},
		],
	},
	{
		name: 'Tokamak Network',
		slug: 'tokamak-network',
		links: [
			'https://tokamak.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Tokamak-Network',
				},
			},
		],
	},
	{
		name: 'Tokan Exchange',
		slug: 'tokan-exchange',
		links: [
			'https://www.tokan.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'tokan-exchange',
				},
			},
		],
	},
	{
		name: 'Tokemak',
		slug: 'tokemak',
		links: [
			'https://www.tokemak.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'tokemak',
					zapper: 'tokemak',
				},
			},
		],
	},
	{
		name: 'Token MultiSender',
		slug: 'multisender',
		links: [
			'https://multisender.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'token_multisender',
				},
			},
		],
	},
	{
		name: 'TokenBound',
		slug: 'token-bound',
		links: [
			'https://tokenbound.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'token-bound',
				},
			},
		],
	},
	{
		name: 'TokenBridge',
		slug: 'token-bridge',
		links: [
			'https://docs.tokenbridge.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'token-bridge',
				},
			},
		],
	},
	{
		name: 'TokenFi',
		slug: 'tokenfi',
		links: [
			'https://tokenfi.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tokenfi',
				},
			},
		],
	},
	{
		name: 'Tokenlon',
		slug: 'tokenlon',
		links: [
			'https://tokenlon.im',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13454/thumb/lon_logo.png?1608701720',
						chainId: 1,
						address: '0x0000000000095413afc295d19edeb1ad7b71c952',
						name: 'Tokenlon',
						symbol: 'LON',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'tokenlon',
					zapper: 'tokenlon',
				},
			},
		],
	},
	{
		name: 'Tokens',
		slug: 'tokens',
		links: [
			'https://ethereum.org',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 43114,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 56,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 42220,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 1666600000,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 1,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 10,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 137,
				providers: {
					zapper: 'tokens',
				},
			},
			{
				chainId: 25,
				providers: {
					zapper: 'tokens',
				},
			},
		],
	},
	{
		name: 'TokenSets', // Set Protocol
		slug: 'tokensets',
		links: [
			'https://www.tokensets.com',
		],
		colors: [
			'#2D2CE5',
			// '#6BB1FF',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12465/thumb/defi_pulse_index_set.png?1600051053',
						chainId: 1,
						address: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
						name: 'DeFiPulse Index',
						symbol: 'DPI',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'set-protocol',
					zapper: 'tokensets',
					zerionDefiSDK: [
						'TokenSets',
						'SetToken V2',
					],
				},
			},
		],
	},
	{
		name: 'TokensFarm',
		slug: 'tokensfarm',
		links: [
			'https://tokensfarm.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'tokensfarm',
				},
			},
		],
	},
	{
		name: 'Tokepad',
		slug: 'tokepad',
		links: [
			'https://tokepad.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tokepad',
				},
			},
		],
	},
	{
		name: 'Tokiemon',
		slug: 'tokiemon',
		links: [
			'https://app.tokiemon.io',
		],
		views: [
			{
				providers: {
					zapper: 'tokiemon',
				},
			},
		],
	},
	{
		name: 'Tomb',
		slug: 'tomb',
		links: [
			'https://tomb.finance',
		],
		views: [
			{
				chainId: 250,
				providers: {
					zapper: 'tomb',
				},
			},
		],
	},
	{
		name: 'Tonpound',
		slug: 'tonpound',
		links: [
			'https://app.tonpound.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'tonpound',
				},
			},
		],
	},
	{
		name: 'Topia',
		slug: 'topia',
		links: [
			'https://www.topia.gg',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'topia',
				},
			},
		],
	},
	{
		name: 'Tornado Cash',
		slug: 'tornado-cash',
		links: [
			'https://tornado.cash',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13496/thumb/ZINt8NSB_400x400.jpg?1609193407',
						chainId: 1,
						address: '0x77777feddddffc19ff86db637967013e6c6a116c',
						name: 'Tornado Cash',
						symbol: 'TORN',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'tornado-cash',
					zapper: 'tornado-cash',
				},
			},
		],
	},
	{
		name: 'Torus',
		slug: 'torus',
		links: [
			'https://torus.farm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Torus',
				},
			},
		],
	},
	{
		name: 'Toucan',
		slug: 'toucan',
		links: [
			'https://toucan.earth',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'toucan',
				},
			},
		],
	},
	{
		name: 'Toupée Tech',
		slug: 'toupee-tech',
		links: [
			'https://www.toupee.tech',
		],
		views: [
			{
				chainId: 8453,
				providers: {
					llamafolio: 'toupee.tech',
					zapper: 'toupee-tech',
				},
			},
		],
	},
	{
		name: 'TProtocol',
		slug: 'tprotocol',
		links: [
			'https://www.tprotocol.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'tprotocol',
				},
			},
		],
	},
	{
		name: 'Trader Joe',
		slug: 'trader-joe',
		links: [
			'https://traderjoexyz.com',
		],
		colors: [
			'#ee6662',
		],
		views: [
			{
				name: 'Trader Joe V2',
				slug: 'v2',
				chainId: undefined,
				providers: {
					zapper: 'trader-joe-v2',
				},
			},
			{
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
					},
				],
				providers: {
					llamafolio: 'trader-joe',
					zapper: 'trader-joe',
				},
			},
			{
				name: 'Banker Joe',
				slug: 'banker',
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
					},
				],
				providers: {
					zapper: 'trader-joe-banker',
				},
			},
		],
	},
	{
		name: 'Tranchess',
		slug: 'tranchess',
		links: [
			'https://tranchess.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tranchess',
				},
			},
		],
	},
	{
		name: 'Transit Finance',
		slug: 'transit-finance',
		links: [
			'https://www.transit.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'transit-finance',
				},
			},
		],
	},
	{
		name: 'Treasure',
		slug: 'treasure',
		links: [
			'https://www.treasure.lol',
			'https://app.treasure.lol',
		],
		views: [
			{
				name: 'TreasureDAO',
				slug: 'treasuredao',
				chainId: 42161,
				providers: {
					llamafolio: 'treasuredao',
					zapper: 'treasure',
				},
			},
		],
	},
	{
		name: 'Trisolaris',
		slug: 'trisolaris',
		links: [
			'https://www.trisolaris.io',
		],
		views: [
			{
				chainId: 1313161554,
				providers: {
					zapper: 'trisolaris',
				},
			},
		],
	},
	{
		name: 'TrueBlocks',
		slug: 'trueblocks',
		links: [
			'https://trueblocks.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'trueblocks',
				},
			},
		],
	},
	{
		name: 'TrueFi',
		slug: 'truefi',
		links: [
			'https://truefi.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'truefi',
					zapper: 'truefi',
				},
			},
		],
	},
	{
		name: 'TruFin Protocol',
		slug: 'trufin-protocol',
		links: [
			'https://www.trufin.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'trufin-protocol',
				},
			},
		],
	},
	{
		name: 'TruFin Protocol',
		slug: 'trufin-protocol',
		links: [
			'https://www.trufin.io',
		],
		views: [
			{
				providers: {
					zapper: 'trufin-protocol',
				},
			},
		],
	},
	{
		name: 'Truflation',
		slug: 'truflation',
		links: [
			'https://truflation.com',
		],
		views: [
			{
				providers: {
					zapper: 'truflation',
				},
			},
		],
	},
	{
		name: 'Trugly',
		slug: 'trugly',
		links: [
			'https://www.trugly.meme',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'trugly',
				},
			},
		],
	},
	{
		name: 'TrustSwap',
		slug: 'trustswap',
		links: [
			'https://trustswap.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'trustswap',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'trustswap',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'trustswap',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'trustswap',
				},
			},
		],
	},
	{
		name: 'TTCasino',
		slug: 'ttcasino',
		links: [
			'https://ttcasino.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'TTCasino',
				},
			},
		],
	},
	{
		name: 'TulipArt',
		slug: 'tulip-art',
		links: [
			'https://tulipart.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'tulip-art',
				},
			},
		],
	},
	{
		name: 'Turkeys',
		slug: 'turkeys',
		links: [
			'https://www.turkeys.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'turkeys',
				},
			},
		],
	},
	{
		name: 'TXN',
		slug: 'txn',
		links: [
			'https://txncrypto.com/app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'txn',
				},
			},
		],
	},
	{
		name: 'Ubeswap',
		slug: 'ubeswap',
		links: [
			'https://ubeswap.org',
		],
		colors: [
			'#a261b6',
		],
		views: [
			{
				chainId: 42220,
				erc20Tokens: [
					{
						address: '0x00be915b9dcf56a3cbe739d9b9c202ca692409ec',
					},
				],
				providers: {
					zapper: 'ubeswap',
				},
			},
		],
	},
	{
		name: 'Ultimate Champions',
		slug: 'ultimate-champions',
		links: [
			'https://beta.ultimate-champions.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ultimatechampions',
				},
			},
		],
	},
	{
		name: 'UMA',
		slug: 'uma',
		links: [
			'https://umaproject.org',
		],
		colors: [
			'#ff4a4a',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/10951/thumb/UMA.png?1586307916',
						chainId: 1,
						address: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
						name: 'UMA',
						symbol: 'UMA',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/umaprotocol/uma',
				},
			},
		],
	},
	{
		name: 'Umami Finance',
		slug: 'umami-finance',
		links: [
			'https://umami.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'umami-finance',
					zapper: 'umami-finance',
				},
			},
		],
	},
	{
		name: 'Umbra',
		slug: 'umbra',
		links: [
			'https://app.umbra.cash',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Umbra',
				},
			},
		],
	},
	{
		// https://umbrella-network.readme.io/docs/umb-token-contracts
		name: 'Umbrella',
		slug: 'umbrella',
		links: [
			'https://www.umb.network',
		],
		colors: [
			'#2B28B7',
			'#000000',
		], // #06f398,
		views: [
			{
				slug: 'ethereum',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13913/thumb/Umbrella_Network_Logo-Vertical_Version.png?1612836176',
						chainId: 1,
						address: '0x6fc13eace26590b80cccab1ba5d51890577d83b2',
						name: 'Umbrella Network',
						symbol: 'UMB',
						decimals: 18,
					},
					{
						name: 'Umbrella Reward #1',
						address: '0x1b17dbb40fbed8735e7fe8c9eb02c20984fadfd6',
						symbol: 'rUMB1',
						decimals: 18,
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/cfengliu/umbrella',
					zapper: 'umbrella-network',
				},
			},
			{
				slug: 'bsc',
				chainId: 56,
				contracts: [
					{
						name: 'Contract Registry',
						address: '0xb2C6c4162c0d2B6963C62A9133331b4D0359AA34',
					},
				],
			},
		],
	},
	{
		name: 'Umee',
		slug: 'umee',
		links: [
			'https://umee.cc',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'umee',
				},
			},
		],
	},
	{
		name: 'Unagii',
		slug: 'unagii',
		links: [
			'https://www.unagii.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'unagii',
				},
			},
		],
	},
	{
		name: 'UNCX',
		slug: 'uncx',
		links: [
			'https://uncx.network',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'uncx',
				},
			},
		],
	},
	{
		name: 'Unibot',
		slug: 'unibot',
		links: [
			'https://unibot.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'unibot',
				},
			},
		],
	},
	{
		name: 'uniBTC',
		slug: 'unibtc',
		links: [
			'https://www.unibtc.ai',
		],
		views: [
			{
				providers: {
					zapper: 'unibtc',
				},
			},
		],
	},
	{
		name: 'Unicly',
		slug: 'unicly',
		links: [
			'https://app.unic.ly',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'unicly',
				},
			},
		],
	},
	{
		name: 'UniDex',
		slug: 'unidex',
		links: [
			'https://www.unidex.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'unidex',
				},
			},
		],
	},
	{
		name: 'Union Finance',
		slug: 'union',
		links: [
			'https://union.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'union',
				},
			},
		],
	},
	{
		name: 'Unipilot',
		slug: 'unipilot',
		links: [
			'https://unipilot.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'unipilot',
				},
			},
		],
	},
	{
		name: 'Unisocks',
		slug: 'unisocks',
		links: [
			'https://socks.uniswap.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'unisocks',
				},
			},
		],
	},
	{
		name: 'Uniswap',
		slug: 'uniswap',
		links: [
			'https://uniswap.org',
			'https://app.uniswap.org',
		],
		colors: [
			'#FC72FF',
		],
		icon: UniswapIcon,
		views: [
			...UniswapV3.SUPPORTED_CHAIN_IDS.map(chainId => ({
				name: 'Uniswap V3',
				slug: 'v3',
				colors: [
					'#FC72FF',
				],
				chainId,
				components: [
					UniswapPage,
				],
				providers: {
					llamafolio: 'uniswap-v3',
					theGraph: UniswapV3Subgraph.subgraphUrls[chainId]?.hosted ,
					zapper: 'uniswap-v3',
					...chainId === 1 && {
						zerionDefiSDK: [
							'Uniswap V3',
						],
					},
				},
				contracts: Object.entries(UniswapV3.deployedContractsByChainId[chainId] ?? {})
				.map(([name, address]) => ({
					name,
					address,
				})),
			})),
			{
				name: 'Uniswap V2',
				slug: 'v2',
				colors: [
					'#ff007a',
				],
				chainId: 1,
				providers: {
					llamafolio: 'uniswap-v2',
					theGraph: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
					zapper: 'uniswap-v2',
					zerionDefiSDK: [
						'Uniswap V2',
					],
				},
			},
			{
				name: 'Uniswap V1',
				slug: 'v1',
				colors: [
					'#DC6BE5',
				],
				chainId: 1,
				erc20Tokens: [
					// {
					// 	address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
					// },
				],
				providers: {
					zapper: 'uniswap-v1',
					zerionDefiSDK: [
						'Uniswap V1',
					],
				},
			},
			{
				name: 'UniswapX',
				slug: 'uniswapx',
				links: [
					'https://app.uniswap.org/#/swap',
				],
				chainId: undefined,
				providers: {
					zapper: 'uniswapx',
				},
			},
			{
				name: 'Uniswap NFT Marketplace',
				slug: 'nft-aggregator',
				links: [
					'https://app.uniswap.org/#/nfts',
				],
				chainId: undefined,
				providers: {
					zapper: 'uniswap-nft-aggregator',
				},
			},
			{
				name: 'Uniswap Governance',
				slug: 'governance',
				links: [
					'https://gov.uniswap.org',
				],
				chainId: 1,
				providers: {
					zapper: 'uniswap-governance',
				},
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604',
						chainId: 1,
						address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
						name: 'Uniswap',
						symbol: 'UNI',
						decimals: 18,
					},
				],
			},
		],
	},
	{
		// https://github.com/unitprotocol/core/blob/master/CONTRACTS.md
		name: 'Unit Protocol',
		slug: 'unit',
		links: [
			'https://unit.xyz',
		],
		views: [
			{
				slug: 'ethereum',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13359/thumb/unit_telegram.png?1607878022',
						chainId: 1,
						address: '0x92e187a03b6cd19cb6af293ba17f2745fd2357d5',
						name: 'Unit Protocol New',
						symbol: 'DUCK',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/6013/thumb/Pax_Dollar.png?1629877204',
						chainId: 1,
						address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
						name: 'Pax Dollar',
						symbol: 'USDP',
						decimals: 18,
					},
				],
				contracts: [
					// Core
					{
						name: 'Vault',
						address: '0xb1cFF81b9305166ff1EFc49A129ad2AfCd7BCf19',
					},
					{
						name: 'USDP',
						address: '0x1456688345527bE1f37E9e627DA0837D6f08C925',
					},
					{
						name: 'VaultParameters',
						address: '0xB46F8CF42e504Efe8BEf895f848741daA55e9f1D',
					},
					{
						name: 'VaultManagerParameters',
						address: '0x203153522B9EAef4aE17c6e99851EE7b2F7D312E',
					},
					{
						name: 'LiquidationAuction02',
						address: '0xaEF1ed4C492BF4C57221bE0706def67813D79955',
					},
					{
						name: 'CDPManager01',
						address: '0x0e13ab042eC5AB9Fc6F43979406088B9028F66fA',
					},
					{
						name: 'CDPManager01_Fallback',
						address: '0xaD3617D11f4c1d30603551eA75e9Ace9CB386e15',
					},
					
					// Helpers & Registries
					{
						name: 'OracleRegistry',
						address: '0x75fBFe26B21fd3EA008af0C764949f8214150C8f',
					},
					{
						name: 'ParametersBatchUpdater',
						address: '0x4DD1A6DB148BEcDADAdFC407D23b725eDd3cfB6f',
					},
					{
						name: 'AssetParametersViewer',
						address: '0xd51F509Fb80b4fF4D4Bfb4144eEd877F0F499AF6',
					},
					{
						name: 'CollateralRegistry',
						address: '0x3DB39B538Db1123389c77F888a213F1A6dd22EF3',
					},
					{
						name: 'CDPRegistry',
						address: '0x1a5Ff58BC3246Eb233fEA20D32b79B5F01eC650c',
					},
					{
						name: 'ForceTransferAssetStore',
						address: '0xF7633FA353E74Edb211B1d22e23c96aE4d7b24C0',
					},
				],
				providers: {
					zapper: 'unit',
				},
			},
			{
				name: 'BNB Smart Chain',
				slug: 'bsc',
				chainId: 56,
				contracts: [
					// Core
					{
						name: 'Vault',
						address: '0xdacfeed000e12c356fb72ab5089e7dd80ff4dd93',
					},
					{
						name: 'USDP',
						address: '0xdacd011a71f8c9619642bf482f1d4ceb338cffcf',
					},
					{
						name: 'VaultParameters',
						address: '0x56c7CA666d192332F72a5842E72eED5f59F0fb48',
					},
					{
						name: 'VaultManagerParameters',
						address: '0x99f2B13C28A4183a5d5e0fe02B1B5aeEe85FAF5A',
					},
					{
						name: 'LiquidationAuction02',
						address: '0x852de08f3cD5b92dD8b3B92b321363D04EeEc39E',
					},
					{
						name: 'CDPManager01',
						address: '0x1337daC01Fc21Fa21D17914f96725f7a7b73868f',
					},
					
					// Helpers & Registries
					{
						name: 'OracleRegistry',
						address: '0xbea721ACe12e881cb44Dbe9361ffEd9141CE547F',
					},
					{
						name: 'CollateralRegistry',
						address: '0xA1ad3602697c15113E089C2723c15eBF3038465C',
					},
					{
						name: 'CDPRegistry',
						address: '0xE8372dcef80189c0F88631507f6466b3f60E24A4',
					},
					{
						name: 'ForceTransferAssetStore',
						address: '0x7815ed0f9B00E7b34f52543779783023c7621fA1',
					},
					{
						name: 'PancakeV2Twap',
						address: '0x11b1bd923f4D0669958e16A511567f540Bc21d2e',
					},
				],
				providers: {
					zapper: 'unit',
				},
			},
		],
	},
	{
		name: 'Unitus',
		slug: 'unitus',
		links: [
			'https://unitus.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'unitus',
					zapper: 'unitus',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'unitus',
					zapper: 'unitus',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'unitus',
					zapper: 'unitus',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'unitus',
					zapper: 'unitus',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'unitus',
					zapper: 'unitus',
				},
			},
		],
	},
	{
		name: 'Universe',
		slug: 'universe',
		links: [
			'https://universe.xyz',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/15809/thumb/universexyz.png?1621950483',
						chainId: 1,
						address: '0x618679df9efcd19694bb1daa8d00718eacfa2883',
						name: 'Universe XYZ',
						symbol: 'XYZ',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'universe',
				},
			},
		],
	},
	{
		name: 'Unlockd Finance',
		slug: 'unlockd-finance',
		links: [
			'https://www.unlockd.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'unlockd-finance',
				},
			},
		],
	},
	{
		name: 'Unlonely',
		slug: 'unlonely',
		links: [
			'https://www.unlonely.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Unlonely',
				},
			},
		],
	},
	{
		name: 'unshETH',
		slug: 'unsheth',
		links: [
			'https://unsheth.xyz',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'unsheth',
					zapper: 'unsheth',
				},
			},
		],
	},
	{
		name: 'Unstoppable Finance',
		slug: 'unstoppable',
		links: [
			'https://www.unstoppable.ooo',
		],
		views: [
			{
				name: 'GLP Autocompounder',
				slug: 'glp-autocompounder',
				links: [
					'https://www.unstoppable.ooo',
					'https://glp.unstoppablefinance.org',
				],
				chainId: undefined,
				providers: {
					zapper: 'unstoppable',
				},
			},
		],
	},
	{
		name: 'Upshot',
		slug: 'upshot',
		links: ['https://upshot.io', 'https://app.upshot.io'],
		colors: [
			'#e44bbe',
			'#0091ff',
			'#ff5628',
		],
		views: [
			{
				name: 'Axie Infinity',
				slug: 'axie-infinity',
				links: [
					'https://axieinfinity.com',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13029/thumb/axie_infinity_logo.png?1604471082',
						chainId: 1,
						address: '0xbb0e17ef65f82ab018d8edd776e8dd940327b28b',
						name: 'Axie Infinity',
						symbol: 'AXS',
						decimals: 18,
					},
				],
				nfts: [
					{
						address: '0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d',
					},
				],
				contracts: [
					{
						address: '0xf4985070ce32b6b1994329df787d1acc9a2dd9e2',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-axie-infinity',
				},
			},
			{
				name: 'CryptoKitties',
				slug: 'cryptokitties',
				links: [
					'https://www.cryptokitties.co',
				],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/8797/thumb/WCK.png?1561705836',
						chainId: 1,
						address: '0x09fe5f0236f0ea5d930197dce254d77b04128075',
						name: 'Wrapped CryptoKitti',
						symbol: 'WCK',
						decimals: 18,
					},
				],
				nfts: [
					{
						address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
					},
				],
				contracts: [
					{
						address: '0xb1690c08e213a35ed9bab7b318de14420fb57d8c',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-cryptokitties',
				},
			},
			{
				name: 'CryptoPunks',
				slug: 'cryptopunks',
				links: [
					'https://www.larvalabs.com/cryptopunks',
				],
				chainId: 1,
				nfts: [
					{
						address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-cryptopunks',
				},
			},
			{
				name: 'Known Origin',
				slug: 'known-origin',
				links: [
					'https://knownorigin.io',
				],
				chainId: 1,
				nfts: [
					{
						address: '0xfbeef911dc5821886e1dda71586d90ed28174b7d',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-known-origin',
				},
			},
			{
				name: 'SuperRare',
				slug: 'superrare',
				links: [
					'https://superrare.com',
				],
				chainId: 1,
				nfts: [
					{
						address: '0x41a322b28d0ff354040e2cbc676f0320d8c8850d',
					},
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-superrare',
				},
			},
		],
	},
	{
		name: 'Upstreet',
		slug: 'upstreet',
		links: [
			'https://upstreet.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'upstreet',
				},
			},
		],
	},
	{
		name: 'Urbit',
		slug: 'urbit',
		links: [
			'https://urbit.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'urbit',
				},
			},
		],
	},
	{
		name: 'USDFI Lending',
		slug: 'usdfi-lending',
		links: [
			'https://lending.usdfi.com/usdlend',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'usdfi-lending',
				},
			},
		],
	},
	{
		name: 'Usual',
		slug: 'usual',
		links: [
			'https://usual.money',
		],
		views: [
			{
				providers: {
					zapper: 'usual',
				},
			},
		],
	},
	{
		name: 'USDV.Money',
		slug: 'usvd-money',
		links: [
			'https://usdv.money',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'usvd-money',
				},
			},
		],
	},
	{
		name: 'UwU Lend',
		slug: 'uwu-lend',
		links: [
			'https://www.uwulend.fi',
			'https://app.uwulend.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'uwu-lend',
					zapper: 'uwu-lend',
				},
			},
		],
	},
	{
		name: 'Vader',
		slug: 'vader',
		links: [
			'https://www.vaderprotocol.org',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'vader',
				},
			},
		],
	},
	{
		name: 'Valas Finance',
		slug: 'valas-finance',
		links: [
			'https://valasfinance.com',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'valas-finance',
				},
			},
		],
	},
	{
		name: 'Valhalla',
		slug: 'valhalla',
		links: [
			'https://joinvalhalla.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'valhalla',
				},
			},
		],
	},
	{
		name: 'Value DeFi',
		slug: 'value',
		links: [
			'https://valuedefi.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12525/thumb/value_logo_-_500x500.png?1601478115',
						chainId: 1,
						address: '0x49e833337ece7afe375e44f4e3e8481029218e5c',
						name: 'Value DeFi',
						symbol: 'VALUE',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16253/thumb/Vesper_Token_600.png?1623394697',
						chainId: 1,
						address: '0x677ddbd918637e5f2c79e164d402454de7da8619',
						name: 'Vesper V Dollar',
						symbol: 'VUSD',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'value',
				},
			},
		],
	},
	{
		name: 'Vanar',
		slug: 'vanar',
		links: [
			'https://vanarchain.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vanar',
				},
			},
		],
	},
	{
		name: 'VaporDex',
		slug: 'vapordex',
		links: [
			'https://www.vapordex.io',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'vapordex',
				},
			},
		],
	},
	{
		name: 'VaporDEX',
		slug: 'vapordex',
		links: [
			'https://www.vapordex.io',
		],
		views: [
			{
				providers: {
					zapper: 'vapordex',
				},
			},
		],
	},
	{
		name: 'Vaporwave Finance',
		slug: 'vaporwave-finance',
		links: [
			'https://www.vaporwave.farm',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vaporwave-finance',
				},
			},
		],
	},
	{
		name: 'VaultCraft',
		slug: 'vault-craft',
		links: [
			'https://vaultcraft.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vault-craft',
				},
			},
		],
	},
	{
		name: 'Vault Tech',
		slug: 'vault-tech',
		links: [
			'https://vault.tech',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'vault-tech',
				},
			},
		],
	},
	{
		name: 'Vaultka',
		slug: 'vaultka',
		links: [
			'https://www.vaultka.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Vaultka',
				},
			},
		],
	},
	{
		name: 'Vector Finance',
		slug: 'vector-finance',
		links: [
			'https://vectorfinance.io',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'vector-finance',
					zapper: 'vector-finance',
				},
			},
		],
	},
	{
		name: 'Vector Reserve',
		slug: 'vector-reserve',
		links: [
			'https://vectorreserve.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'vector-reserve',
				},
			},
		],
	},
	{
		name: 'Vector Reserve',
		slug: 'vector-reserve',
		links: [
			'https://www.vectorreserve.com',
		],
		views: [
			{
				providers: {
					zapper: 'vector-reserve',
				},
			},
		],
	},
	{
		name: 'Vega Protocol',
		slug: 'vega-protocol',
		links: [
			'https://vegaprotocol.eth.limo',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vega-protocol',
				},
			},
		],
	},
	{
		name: 'Vela',
		slug: 'vela',
		links: [
			'https://www.vela.exchange',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vela',
				},
			},
		],
	},
	{
		name: 'Velocimeter',
		slug: 'velocimeter',
		links: [
			'https://www.velocimeter.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'velocimeter',
				},
			},
		],
	},
	{
		name: 'Velodrome',
		slug: 'velodrome',
		links: [
			'https://velodrome.finance',
			'https://app.velodrome.finance',
		],
		views: [
			{
				name: 'V2',
				slug: 'v2',
				chainId: 10,
				providers: {
					llamafolio: 'velodrome-v2',
					zapper: 'velodrome-v2',
				},
			},
			{
				name: 'V1',
				slug: 'v1',
				chainId: 10,
				providers: {
					llamafolio: 'velodrome-v1',
					zapper: 'velodrome',
				},
			},
		],
	},
	{
		name: 'Vendor Finance',
		slug: 'vendor-finance',
		links: [
			'https://vendor.finance/borrow',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vendor-finance',
				},
			},
		],
	},
	{
		name: 'Venus',
		slug: 'venus',
		links: [
			'https://venus.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'venus',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'venus',
				},
			},
		],
	},
	{
		name: 'Verasity',
		slug: 'verasity',
		links: [
			'https://verasity.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'verasity',
				},
			},
		],
	},
	{
		name: 'Verse Payments',
		slug: 'verse-payments',
		links: [
			'https://verse.me/en',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'verse-payments',
				},
			},
		],
	},
	{
		name: 'Verse',
		slug: 'verse',
		links: [
			'https://verse.bitcoin.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'verse',
					zapper: 'verse',
				},
			},
		],
	},
	{
		name: 'Vertex',
		slug: 'vertex',
		links: [
			'https://vertexprotocol.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Vertex',
				},
			},
		],
	},
	{
		name: 'Vesper',
		slug: 'vesper',
		links: [
			'https://vesper.finance',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13527/thumb/vesper_logo.jpg?1609399927',
						chainId: 1,
						address: '0x1b40183efb4dd766f11bda7a7c3ad8982e998421',
						name: 'Vesper Finance',
						symbol: 'VSP',
						decimals: 18,
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16253/thumb/Vesper_Token_600.png?1623394697',
						chainId: 1,
						address: '0x677ddbd918637e5f2c79e164d402454de7da8619',
						name: 'Vesper V Dollar',
						symbol: 'VUSD',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'vesper',
					zapper: 'vesper',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'vesper',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'vesper',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'vesper',
				},
			},
		],
	},
	{
		name: 'Vessel',
		slug: 'vessel',
		links: [
			'https://vessel.finance',
		],
		views: [
			{
				providers: {
					zapper: 'vessel',
				},
			},
		],
	},
	{
		name: 'Vesta Finance',
		slug: 'vesta-finance',
		links: [
			'https://vestafinance.xyz',
		],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [
					{
						address: '0xa684cd057951541187f288294a1e1c2646aa2d24',
					},
				],
				providers: {
					zapper: 'vesta-finance',
				},
			},
		],
	},
	{
		name: 'Vibe',
		slug: 'vibe',
		links: [
			'https://www.vibe.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vibe',
				},
			},
		],
	},
	{
		name: 'Victoria VR',
		slug: 'victoria-vr',
		links: [
			'https://www.victoriavr.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Victoria-VR',
				},
			},
		],
	},
	{
		name: 'VirtuSwap',
		slug: 'virtuswap',
		links: [
			'https://virtuswap.io',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'virtuswap',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'virtuswap',
				},
			},
		],
	},
	{
		name: 'Virus World',
		slug: 'virus-world',
		links: [
			'https://virusworld.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Virus-World',
				},
			},
		],
	},
	{
		name: 'Visor',
		slug: 'visor',
		links: [
			'https://www.visor.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'visor',
				},
			},
		],
	},
	{
		name: 'VMPX',
		slug: 'vmpx',
		links: [
			'https://vmpx.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'vmpx',
				},
			},
		],
	},
	{
		name: 'VolBoost',
		slug: 'volboost',
		links: [
			'https://volboost.com',
		],
		views: [
			{
				providers: {
					zapper: 'volboost',
				},
			},
		],
	},
	{
		name: 'Volta Club',
		slug: 'volta-club',
		links: [
			'https://volta.club',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					llamafolio: 'volta-club',
				},
			},
		],
	},
	{
		name: 'VOLTICHANGE',
		slug: 'voltichange',
		links: [
			'https://voltichange.net',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'VOLTICHANGE',
				},
			},
		],
	},
	{
		name: 'Votium',
		slug: 'votium',
		links: [
			'https://votium.app',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'votium',
				},
			},
		],
	},
	{
		name: 'VulcanDex',
		slug: 'vulcandex',
		links: [
			'https://vulcandex.app',
		],
		views: [
			{
				chainId: 137,
				providers: {
					llamafolio: 'vulcandex',
				},
			},
		],
	},
	{
		name: 'VV',
		slug: 'vv',
		links: [
			'https://vv.xyz',
		],
		views: [
			{
				name: 'Infinity',
				slug: 'infinity',
				links: [
					'https://infinity.vv.xyz',
				],
				views: [
					{
						chainId: 0x1,
						providers: {
							zapper: 'infinity',
						},
					},
				],
			},
			{
				name: 'Checks - VV Originals',
				slug: 'checks-vv-originals',
				links: [
					'https://checks.art',
				],
				chainId: undefined,
				providers: {
					zapper: 'checks-vv-originals',
				},
			},
			{
				name: 'Checks - Elements Auction',
				slug: 'checks-elements-auction',
				links: [
					'https://elements.checks.art',
				],
				chainId: undefined,
				providers: {
					zapper: 'checks-elements-auction',
				},
			},
		],
	},
	{
		name: 'VVS Finance',
		slug: 'vvs-finance',
		links: [
			'https://vvs.finance',
		],
		views: [
			{
				chainId: 25,
				providers: {
					zapper: 'vvs-finance',
				},
			},
		],
	},
	{
		name: 'WAGMI',
		slug: 'wagmi',
		links: [
			'https://wagmi.com',
		],
		views: [
			{
				chainId: 324,
				providers: {
					llamafolio: 'wagmi',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'wagmi',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'wagmi',
				},
			},
		],
	},
	{
		name: 'WAGMI Games',
		slug: 'wagma-games',
		links: [
			'https://wagmigame.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wagma-games',
				},
			},
		],
	},
	{
		name: 'Wall Street Memes',
		slug: 'wall-street-memes',
		links: [
			'https://wallstmemes.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wall-st-memes',
				},
			},
		],
	},
	{
		name: 'WannaBet',
		slug: 'wanabet',
		links: [
			'https://wannabet.cc',
		],
		views: [
			{
				providers: {
					zapper: 'wanabet',
				},
			},
		],
	},
	{
		name: 'Wand Finance',
		slug: 'wand-finance',
		links: [
			'https://wand.fi',
		],
		views: [
			{
				providers: {
					zapper: 'wand-finance',
				},
			},
		],
	},
	{
		name: 'Warden',
		slug: 'warden',
		links: [
			'https://www.wardenswap.com',
		],
		views: [
			{
				providers: {
					zapper: 'warden',
				},
			},
		],
	},
	{
		name: 'Warpcast',
		slug: 'warpcast',
		links: [
			'https://warpcast.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'warpcast',
				},
			},
		],
	},
	{
		name: 'Wasabi',
		slug: 'wasabi',
		links: [
			'https://www.wasabi.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wasabi',
				},
			},
		],
	},
	{
		name: 'Wault Finance',
		slug: 'wault-finance',
		links: [
			'https://wault.finance',
		],
		views: [
			{
				providers: {
					zapper: 'wault-finance',
				},
			},
		],
	},
	{
		name: 'Waultswap',
		slug: 'waultswap',
		links: [
			'https://wault.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'waultswap',
				},
			},
		],
	},
	{
		name: 'Wayfinder',
		slug: 'wayfinder',
		links: [
			'https://wayfinder.ai',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wayfinder',
				},
			},
		],
	},
	{
		name: 'wdym',
		slug: 'wdym',
		links: [
			'https://wdym.wtf',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wdym',
				},
			},
		],
	},
	{
		name: 'WEB3WAR',
		slug: 'web3war',
		links: [
			'https://www.w3w.game',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'web3war',
				},
			},
		],
	},
	{
		name: 'WELL3',
		slug: 'well3',
		links: [
			'https://well.eco',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'well3',
				},
			},
		],
	},
	{
		name: 'WePiggy',
		slug: 'wepiggy',
		links: [
			'https://wepiggy.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'wepiggy',
					zapper: 'wepiggy',
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'wepiggy',
					zapper: 'wepiggy',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'wepiggy',
					zapper: 'wepiggy',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'wepiggy',
					zapper: 'wepiggy',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'wepiggy',
					zapper: 'wepiggy',
				},
			},
		],
	},
	{
		name: 'Whale Game',
		slug: 'whale-game',
		links: [
			'https://whalegame.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'whale-game',
				},
			},
		],
	},
	{
		name: 'Whiteheart',
		slug: 'whiteheart',
		links: [
			'https://www.whiteheart.finance',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'whiteheart',
					zapper: 'whiteheart',
				},
			},
		],
	},
	{
		name: 'Whop Marketplace',
		slug: 'whop-payments',
		links: [
			'https://whop.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'whop-payments',
				},
			},
		],
	},
	{
		name: 'WigoSwap',
		slug: 'wigoswap',
		links: [
			'https://wigoswap.io',
		],
		views: [
			{
				chainId: 250,
				providers: {
					llamafolio: 'wigoswap',
				},
			},
		],
	},
	{
		name: 'Wild',
		slug: 'wild',
		links: [
			'https://wild.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wild-xyz',
				},
			},
		],
	},
	{
		name: 'WINR Protocol',
		slug: 'winr-protocol',
		links: [
			'https://winr.games',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'winr-protocol',
					zapper: 'winr',
				},
			},
		],
	},
	{
		name: 'Wolf Game',
		slug: 'wolf-game',
		links: [
			'https://wolf.game',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wolf-game',
				},
			},
		],
	},
	{
		name: 'Wombat Exchange',
		slug: 'wombat-exchange',
		links: [
			'https://www.wombat.exchange',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'wombat-exchange',
					zapper: 'wombat-exchange',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'wombat-exchange',
					zapper: 'wombat-exchange',
				},
			},
		],
	},
	{
		name: 'Wonderland',
		slug: 'wonderland',
		links: [
			'https://www.wonderland.money',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'wonderland',
				},
			},
			{
				chainId: 250,
				providers: {
					zapper: 'wonderland',
				},
			},
		],
	},
	{
		name: 'WOOFi',
		slug: 'woofi',
		links: [
			'https://woo.org',
			'https://fi.woo.org',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'woofi',
				},
			},
			{
				chainId: 56,
				providers: {
					llamafolio: 'woofi',
				},
			},
			{
				chainId: 43114,
				providers: {
					llamafolio: 'woofi',
				},
			},
			{
				chainId: 137,
				providers: {
					llamafolio: 'woofi',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'woofi',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'woofi',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'woofi',
				},
			},
		],
	},
	{
		name: 'WOOFi',
		slug: 'woofi',
		links: [
			'https://woo.org',
		],
		views: [
			{
				providers: {
					zapper: 'woofi',
				},
			},
		],
	},
	{
		name: 'WORDS',
		slug: 'words-art',
		links: [
			'https://www.words.art',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'words-art',
				},
			},
		],
	},
	{
		name: 'World',
		slug: 'world',
		links: [
			'https://world.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Worldcoin',
				},
			},
		],
	},
	{
		name: 'World Art',
		slug: 'world-art',
		links: [
			'https://world-art-eta.vercel.app',
		],
		views: [
			{
				providers: {
					zapper: 'world-art',
				},
			},
		],
	},
	{
		name: 'World PvP',
		slug: 'world-pvp',
		links: [
			'https://worldpvp.co',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'worldpvp',
				},
			},
		],
	},
	{
		name: 'Wormhole',
		slug: 'wormhole',
		links: [
			'https://wormhole.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'wormhole',
				},
			},
		],
	},
	{
		name: 'wow',
		slug: 'wow',
		links: [
			'https://wow.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'wow',
				},
			},
		],
	},
	{
		name: 'XNouns',
		slug: 'x-nouns',
		links: [
			'https://xnouns.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'x-nouns',
				},
			},
		],
	},
	{
		name: 'X WINNER',
		slug: 'x-winner',
		links: [
			'https://xwinner.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'x-winner',
				},
			},
		],
	},
	{
		name: 'X2Y2',
		slug: 'x2y2',
		links: [
			'https://x2y2.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'x2y2',
					zapper: 'x2y2',
				},
			},
		],
	},
	{
		name: 'XAI',
		slug: 'xai',
		links: [
			'https://xai.games',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xai',
				},
			},
		],
	},
	{
		name: 'XDAO',
		slug: 'xdao',
		links: [
			'https://www.xdao.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xdao',
				},
			},
		],
	},
	{
		name: 'XDEFI',
		slug: 'xdefi',
		links: [
			'https://www.xdefi.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xdefi',
				},
			},
		],
	},
	{
		name: 'XEN Crypto',
		slug: 'xen',
		links: [
			'https://xen.network',
			'https://faircrypto.org',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xen',
				},
			},
		],
	},
	{
		name: 'Xena Finance',
		slug: 'xena-finance',
		links: [
			'https://xena.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'Xena-Finance',
				},
			},
		],
	},
	{
		name: 'Xenify',
		slug: 'xenify',
		links: [
			'https://xenify.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xenify',
				},
			},
		],
	},
	{
		name: 'xPET',
		slug: 'xpet',
		links: [
			'https://www.xpet.tech',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xpet',
				},
			},
		],
	},
	{
		name: 'XRP20',
		slug: 'xrp-20',
		links: [
			'https://xrp20coin.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xrp-20',
				},
			},
		],
	},
	{
		name: 'xSigma',
		slug: 'xsigma',
		links: [
			'https://www.xsigma.fi',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14090/thumb/logo_128.png?1619775781',
						chainId: 1,
						address: '0x7777777777697cfeecf846a76326da79cc606517',
						name: 'xSigma',
						symbol: 'SIG',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'xsigma',
				},
			},
		],
	},
	{
		name: 'XSwap',
		slug: 'xswap',
		links: [
			'https://xswap.link',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'xswap',
				},
			},
		],
	},
	{
		name: 'xToken',
		slug: 'xtoken',
		links: [
			'https://xtoken.market',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14089/thumb/xToken.png?1614226407',
						chainId: 1,
						address: '0x7f3edcdd180dbe4819bd98fee8929b5cedb3adeb',
						name: 'xToken',
						symbol: 'XTK',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'xtoken',
				},
			},
		],
	},
	{
		name: 'XY Finance',
		slug: 'xy-finance',
		links: [
			'https://app.xy.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'XY-Finance',
				},
			},
		],
	},
	{
		name: 'Y2k Finance',
		slug: 'y2k-finance',
		links: [
			'https://www.y2k.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'y2k-finance',
				},
			},
		],
	},
	{
		name: 'Yam Finance',
		slug: 'yam',
		links: [
			'https://yam.finance',
		],
		views: [
			{
				name: 'Yam Finance V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12179/thumb/YAM-v2.png?1597892396',
						chainId: 1,
						address: '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a',
						name: 'YAM v2',
						symbol: 'YAMV2',
						decimals: 24,
					},
				],
				providers: {
					zapper: 'yam',
				},
			},
			{
				name: 'Yam Finance V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12530/thumb/YAM-icon.png?1600495536',
						chainId: 1,
						address: '0x0aacfbec6a24756c20d41914f2caba817c0d8521',
						name: 'YAM',
						symbol: 'YAM',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'yam',
				},
			},
		],
	},
	{
		name: 'Yama Finance',
		slug: 'yama-finance',
		links: [
			'https://yama.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'yama-finance',
				},
			},
		],
	},
	{
		name: 'Yamato Protocol',
		slug: 'yamato-protocol',
		links: [
			'https://app.yamato.fi',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'yamato-protocol',
					zapper: 'yamato',
				},
			},
		],
	},
	{
		name: 'yAxis',
		slug: 'yaxis',
		links: [
			'https://www.yaxis.io',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12620/thumb/Logo.png?1608310944',
						chainId: 1,
						address: '0x0ada190c81b814548ddc2f6adc4a689ce7c1fe73',
						name: 'yAxis',
						symbol: 'YAXIS',
						decimals: 18,
					},
					erc20TokensBySymbol['SYAX'],
				],
				providers: {
					zapper: 'yaxis',
				},
			},
		],
	},
	{
		name: 'Yay!',
		slug: 'yay',
		links: [
			'https://portal.yay.space/stake',
		],
		views: [
			{
				providers: {
					zapper: 'yay',
				},
			},
		],
	},
	{
		name: 'Yearn',
		slug: 'yearn',
		links: [
			'https://yearn.finance',
		],
		colors: [
			'#0273f6',
			'#075fb9',
		], // unofficial
		views: [
			{
				name: 'Yearn V3',
				slug: 'v3',
				chainId: undefined,
				providers: {
					zapper: 'yearn-v3',
				},
			},
			{
				chainId: 1,
				providers: {
					llamafolio: 'yearn-finance',
					zapper: 'yearn',
					zerionDefiSDK: [
						'iearn.finance (v2)',
						'iearn.finance (v2/v3)',
						'iearn.finance (v3)',
						'Yearn Token Vaults',
						'yearn.finance • Vaults',
					],
				},
			},
			{
				chainId: 42161,
				providers: {
					llamafolio: 'yearn-finance',
				},
			},
			{
				chainId: 10,
				providers: {
					llamafolio: 'yearn-finance',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'yearn-finance',
				},
			},
			{
				chainId: 8453,
				providers: {
					llamafolio: 'yearn-finance',
				},
			},
			{
				name: 'Yearn Governance',
				slug: 'governance',
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11849/thumb/yfi-192x192.png?1598325330',
						chainId: 1,
						address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
						name: 'yearn finance',
						symbol: 'YFI',
						decimals: 18,
					},
				],
				providers: {
					llamafolio: 'yearn-finance',
					zapper: 'yearn',
					zerionDefiSDK: [
						'ygov.finance (v1)',
						'ygov.finance (v2)',
					],
				},
			},
		],
	},
	{
		name: 'YetiSwap',
		slug: 'yetiswap',
		links: [
			'https://www.yetiswap.app',
		],
		views: [
			{
				providers: {
					zapper: 'yetiswap',
				},
			},
		],
	},
	{
		name: 'Yield Guild Gaming',
		slug: 'yield-guild-gaming',
		links: [
			'https://www.yieldguild.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yield-guild-gaming',
				},
			},
		],
	},
	{
		name: 'Yield Nest',
		slug: 'yield-nest',
		links: [
			'https://www.yieldnest.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yield-nest',
				},
			},
		],
	},
	{
		name: 'Yield Protocol',
		slug: 'yield-protocol',
		links: [
			'https://app.yieldprotocol.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'yield-protocol',
				},
			},
			{
				chainId: 42161,
				providers: {
					zapper: 'yield-protocol',
				},
			},
		],
	},
	{
		name: 'Yield Yak',
		slug: 'yield-yak',
		links: [
			'https://yieldyak.com',
		],
		views: [
			{
				chainId: 43114,
				providers: {
					zapper: 'yield-yak',
				},
			},
		],
	},
	{
		name: 'YieldFlow',
		slug: 'yieldflow',
		links: [
			'https://yieldflow.com',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'yieldflow',
				},
			},
		],
	},
	{
		name: 'yieldification',
		slug: 'yieldification',
		links: [
			'https://yieldification.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yieldification',
				},
			},
		],
	},
	{
		name: 'Ylide',
		slug: 'ylide',
		links: [
			'https://ylide.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ylide',
				},
			},
		],
	},
	{
		name: 'Yogapetz',
		slug: 'yoga-petz',
		links: [
			'https://yogapetz.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yoga-petz',
				},
			},
		],
	},
	{
		name: 'YOLO GAMES',
		slug: 'yolo-games',
		links: [
			'https://yologames.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yolo-games',
				},
			},
		],
	},
	{
		name: 'Yoshi Exchange',
		slug: 'yoshi-exchange',
		links: [
			'https://yoshi.exchange',
		],
		views: [
			{
				chainId: 56,
				providers: {
					llamafolio: 'yoshi-exchange',
				},
			},
			{
				chainId: 250,
				providers: {
					llamafolio: 'yoshi-exchange',
				},
			},
		],
	},
	{
		name: 'Yoyo',
		slug: 'yoyo',
		links: [
			'https://www.yoyo.meme',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yoyo',
				},
			},
		],
	},
	{
		name: 'Yup',
		slug: 'yup',
		links: [
			'https://yup.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'yup',
				},
			},
		],
	},
	{
		name: 'Zapper',
		slug: 'zapper',
		icon: ZapperIcon,
		colors: [
			'#784ffe',
		],
		links: [
			'https://www.zapper.xyz',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zapper',
				},
			},
		],
	},
	{
		name: 'Zeno Exchange',
		slug: 'zeno-exchange',
		links: [
			'https://zeno.exchange',
		],
		views: [
			{
				providers: {
					zapper: 'zeno-exchange',
				},
			},
		],
	},
	{
		name: 'ZenoLend',
		slug: 'zenolend',
		links: [
			'https://www.zeno.finance',
		],
		views: [
			{
				providers: {
					zapper: 'zenolend',
				},
			},
		],
	},
	{
		name: 'Zentry',
		slug: 'zentry',
		links: [
			'https://zentry.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zentry',
				},
			},
		],
	},
	{
		name: 'Zerion',
		slug: 'zerion',
		icon: ZerionIcon,
		colors: [
			'#2461ed',
		],
		links: [
			'https://zerion.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zerion',
				},
			},
		],
	},
	{
		name: 'ZeroLend',
		slug: 'zerolend',
		links: [
			'https://zerolend.xyz',
		],
		views: [
			{
				chainId: 324,
				providers: {
					llamafolio: 'zerolend',
					zapper: 'zero-lend',
				},
			},
		],
	},
	{
		name: '0VIX',
		slug: '0vix',
		links: [
			'https://www.0vix.com',
		],
		views: [
			{
				chainId: 137,
				providers: {
					zapper: 'zero-vix',
					llamafolio: '0vix',
				},
			},
		],
	},
	{
		name: '0x',
		slug: '0x',
		links: [
			'https://0x.org',
		],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/863/thumb/0x.png?1547034672',
						chainId: 1,
						address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
						name: '0x',
						symbol: 'ZRX',
						decimals: 18,
					},
				],
				providers: {
					zapper: 'zero-x',
					zerionDefiSDK: [
						'0x Staking',
					],
				},
			},
		],
	},
	{
		name: '0xmons',
		slug: '0xmons',
		links: [
			'https://0xmons.xyz',
		],
		views: [
			{
				name: '0xmons Multisender',
				slug: '0xmons-multisender',
				links: [
					'https://0xmons.xyz/#/multisender',
				],
				chainId: 1,
				providers: {
					zapper: '0xmons-multisender',
				},
			},
		],
	},
	{
		name: '0x0',
		slug: '0x0',
		links: [
			'https://0x0.ai',
		],
		views: [
			{
				name: '0x0 Audits',
				slug: 'audits',
				chainId: undefined,
				providers: {
					zapper: 'zero-x-zero-audits',
				},
			},
		],
	},
	{
		name: 'Zerotwohm',
		slug: 'zerotwohm',
		links: [
			'https://umami.finance',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					zapper: 'zerotwohm',
				},
			},
		],
	},
	{
		name: 'Zharta',
		slug: 'zharta',
		links: [
			'https://www.zharta.io',
		],
		views: [
			{
				chainId: 1,
				providers: {
					llamafolio: 'zharta',
					zapper: 'zharta',
				},
			},
		],
	},
	{
		name: 'ZipSwap',
		slug: 'zip-swap',
		links: [
			'https://zipswap.fi',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zip-swap',
				},
			},
		],
	},
	{
		name: 'Zircuit',
		slug: 'zircuit',
		links: [
			'https://www.zircuit.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zircuit',
				},
			},
			{
				name: 'Zircuit Staking',
				slug: 'zircuit-staking',
				links: [
					'https://stake.zircuit.com',
				],
				chainId: 1,
				providers: {
					llamafolio: 'zircuit-staking',
				},
			},
		],
	},
	{
		name: 'ZKasino',
		slug: 'zkasino',
		links: [
			'https://play.zkasino.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zkasino',
				},
			},
		],
	},
	{
		name: 'zkBob',
		slug: 'zkbob',
		links: [
			'https://www.zkbob.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zkbob',
				},
			},
		],
	},
	{
		name: 'ZKEX',
		slug: 'zkex',
		links: [
			'https://zkex.com',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'ZKEX',
				},
			},
		],
	},
	{
		name: 'ZKFair',
		slug: 'zkfair',
		links: [
			'https://zkfair.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zkfair',
				},
			},
		],
	},
	{
		name: 'zkLink',
		slug: 'zklink',
		links: [
			'https://zk.link',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zk-link',
				},
			},
		],
	},
	{
		name: 'zkMe',
		slug: 'zkme',
		links: [
			'https://zk.me',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zkme',
				},
			},
		],
	},
	{
		name: 'zkSwap Finance',
		slug: 'zkswap-finance',
		links: [
			'https://zkswap.finance',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zk-swap-finance',
				},
			},
		],
	},
	{
		name: 'ZKsync',
		slug: 'zksync',
		icon: ZksyncIcon,
		colors: [
			'##214af6',
		],
		links: [
			'https://zksync.io',
		],
		views: [
			{
				name: 'zkSync Bridge',
				slug: 'zksync-bridge',
				chainId: undefined,
				providers: {
					zapper: 'zksync-bridge',
				},
			},
			{
				name: 'zkSync Era',
				slug: 'zksync-era',
				chainId: undefined,
				providers: {
					zapper: 'zksync-era',
				},
			},
		],
	},
	{
		name: 'Zonic',
		slug: 'zonic',
		links: [
			'https://zonic.app',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zonic',
				},
			},
		],
	},
	{
		name: 'ZooDAO',
		slug: 'zoodao',
		links: [
			'https://zoodao.com',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'zoodao',
				},
			},
		],
	},
	{
		name: 'Zora',
		slug: 'zora',
		links: [
			'https://zora.co',
		],
		colors: [
			'#A1723A',
			'#531002',
			'#2B5DF0',
			'#387AFA',
			'#FCB8D4',
			'#FFFFFF',
		],
		icon: ZoraIcon,
		views: [
			{
				name: 'Zora Network',
				links: [
					'https://zora.energy',
				],
				chainId: 7777777,
				contracts: [
					// ERC-721 Factory
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0xA2c2A96A232113Dd4993E8b048EEbc3371AE8d85',
					},
					
					// ERC-1155 Factory
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0x35ca784918bf11692708c1D530691704AAcEA95E',
					},

					// OP Stack
					{
						name: 'OptimismPortalProxy',
						address: '0x1a0ad011913A150f69f6A19DF447A0CfD9551054',
					},
					{
						name: 'OptimismPortal',
						address: '0x43260ee547c3965bb2a0174763bb8FEcC650BA4A',
					},
					{
						name: 'SystemConfigProxy',
						address: '0xA3cAB0126d5F504B071b81a3e8A2BBBF17930d86',
					},
					{
						name: 'L1ERC721Bridge',
						address: '0xDBCdA21518AF39E7feb9748F6718D3db11591461',
					},
					{
						name: 'SystemDictator',
						address: '0x2E44e62992f14b904Bfefd93e63D98D7dA4fcD66',
					},
					{
						name: 'PortalSender',
						address: '0xd6C5Df0a29562521b2B26fAc218e3dAf0a4dFC9B',
					},
					{
						name: 'L1StandardBridge',
						address: '0xbF6acaF315477b15D638bf4d91eA48FA79b58335',
					},
					{
						name: 'Lib_AddressManager',
						address: '0xEF8115F2733fb2033a7c756402Fc1deaa56550Ef',
					},
					{
						name: 'L2OutputOracleProxy',
						address: '0x9E6204F750cD866b299594e2aC9eA824E2e5f95c',
					},
					{
						name: 'OptimismMintableERC20FactoryProxy',
						address: '0xc52BC7344e24e39dF1bf026fe05C4e6E23CfBcFf',
					},
					{
						name: 'Proxy__OVM_L1StandardBridge',
						address: '0x3e2Ea9B92B7E48A52296fD261dc26fd995284631',
					},
					{
						name: 'ProxyAdmin',
						address: '0xD4ef175B9e72cAEe9f1fe7660a6Ec19009903b49',
					},
					{
						name: 'OptimismMintableERC20Factory',
						address: '0x84ee4b9673598ca2FbDad4Ba4a27A58D6328Ec46',
					},
					{
						name: 'Proxy__OVM_L1CrossDomainMessenger',
						address: '0xdC40a14d9abd6F410226f1E6de71aE03441ca506',
					},
					{
						name: 'L1ERC721BridgeProxy',
						address: '0x83A4521A3573Ca87f3a971B169C5A0E1d34481c3',
					},
					{
						name: 'SystemConfig',
						address: '0x17fb7c8Ce213F1A7691ee41EA880ABf6eBC6fa95',
					},
					{
						name: 'L1CrossDomainMessenger',
						address: '0x363B4B1ADa52E50353f746999bd9E94395190d2C',
					},
					{
						name: 'L2OutputOracle',
						address: '0x89336159Edd615260a95309e46343602D6b6489e',
					},
					{
						name: 'SystemDictatorProxy',
						address: '0x50bA02c0Ca5E7bF772913EaF24Fb1fd3842a5f19',
					},
				],
			},
			{
				name: 'Zora Network Goerli',
				slug: 'network-goerli',
				links: [
					'https://zora.energy',
				],
				chainId: 999,
				contracts: [
					// ERC-721 Factory
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0xeB29A4e5b84fef428c072debA2444e93c080CE87',
					},
					
					// ERC-1155 Factory
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0x6a357139C1bcDcf0B3AB9bC447932dDdcb956703',
					},
					
					// OP Stack
					{
						name: 'OptimismPortalProxy',
						address: '0xDb9F51790365e7dc196e7D072728df39Be958ACe',
					},
					{
						name: 'SystemConfigProxy',
						address: '0xF66C9A5E4fE1A8a9bc44a4aF80505a4C3620Ee64',
					},
					{
						name: 'L1StandardBridge',
						address: '0x39CCDe9769d52d61189AB799d91665A11b5f3464',
					},
					{
						name: 'L1ERC721Bridge',
						address: '0x7e3A6D16c3017b7876138350749981704cA333E',
					},
					{
						name: 'L1ERC721BridgeProxy',
						address: '0x57C1C6b596ce90C0e010c358DD4Aa052404bB70F',
					},
					{
						name: 'L1CrossDomainMessenger',
						address: '0x9779A9D2f3B66A4F4d27cB99Ab6cC1266b3Ca9af',
					},
					{
						name: 'ProxyAdmin',
						address: '0x6Cce41f8C6AABf78E1DA6caF8f78B14946dF6FcF',
					},
					{
						name: 'Lib_AddressManager',
						address: '0x54f4676203dEDA6C08E0D40557A119c602bFA246',
					},
					{
						name: 'SystemDictator',
						address: '0xe82aF391cCc61257012F5eC08A2D1066230Cb103',
					},
					{
						name: 'Proxy__OVM_L1StandardBridge',
						address: '0x7CC09AC2452D6555d5e0C213Ab9E2d44eFbFc956',
					},
					{
						name: 'PortalSender',
						address: '0xe9C0CB1B8b158F6397aF04977F331de97233c9a6',
					},
					{
						name: 'L2OutputOracle',
						address: '0x5881e7B1429FE78b1c98eBAe55d67184597a787c',
					},
					{
						name: 'L2OutputOracleProxy',
						address: '0xdD292C9eEd00f6A32Ff5245d0BCd7f2a15f24e00',
					},
					{
						name: 'Proxy__OVM_L1CrossDomainMessenger',
						address: '0xD87342e16352D33170557A7dA1e5fB966a60FafC',
					},
					{
						name: 'OptimismMintableERC20Factory',
						address: '0xF75dE219ac74548635261166E40dF6f1dB5aCfeD',
					},
					{
						name: 'OptimismPortal',
						address: '0xc2112491c6A6994f1Aa299FA0A2a0397d7D2b438',
					},
					{
						name: 'SystemDictatorProxy',
						address: '0x0c1E5Dec2E43B7F97c69Fc68f996F5d4F36E1619',
					},
					{
						name: 'SystemConfig',
						address: '0x37Cb720FEb69998712a89a0808c9434F59B26750',
					},
					{
						name: 'OptimismMintableERC20FactoryProxy',
						address: '0x69E16C9e03d7Def18A5d88e3c5c2e037946346eF',
					},
				],
			},
			{
				chainId: 1,
				contracts: [
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0xF74B146ce44CC162b601deC3BE331784DB111DC1',
					},
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0xA6C5f2DE915240270DaC655152C3f6A91748cb85',
					},
				],
				providers: {
					zapper: 'zora',
				},
			},
			{
				chainId: 5,
				contracts: [
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0xb9583D05Ba9ba8f7F14CCEe3Da10D2bc0A72f519',
					},
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0x8732b4bCa198509bB9c40f9a24638Be1eaB7D30c',
					},
				],
			},
			{
				chainId: 8453,
				contracts: [
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0x58C3ccB2dcb9384E5AB9111CD1a5DEA916B0f33c',
					},
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0x9b24FD165a371042e5CA81e8d066d25CAD11EDE7',
					},
				],
			},
			{
				chainId: 84531,
				contracts: [
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0x87cfd516c5ea86e50b950678CA970a8a28de27ac',
					},
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0x9b24FD165a371042e5CA81e8d066d25CAD11EDE7',
					},
				],
			},
			{
				chainId: 10,
				contracts: [
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0x7d1a46c6e614A0091c39E102F2798C27c1fA8892',
					},
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0x78b524931e9d847c40BcBf225c25e154a7B05fDA',
					},
				],
			},
			{
				chainId: 420,
				contracts: [
					{
						name: 'ZoraNFTCreatorProxy',
						address: '0x3C1ebcF36Ca9DD9371c9aA99c274e4988906c6E3',
					},
					{
						name: 'ZoraCreator1155FactoryImpl',
						address: '0xb0C56317E9cEBc6E0f7A59458a83D0A9ccC3e955',
					},
				],
			},
		],
	},
	{
		name: 'Z Protocol',
		slug: 'z-protocol',
		links: [
			'https://www.zprotocol.xyz',
		],
		views: [
			{
				providers: {
					zapper: 'zprotocol',
				},
			},
		],
	},
	{
		name: 'Zunami Protocol',
		slug: 'zunami',
		links: [
			'https://app.zunami.io',
		],
		views: [
			{
				chainId: undefined,
				providers: {
					zapper: 'zunami',
				},
			},
		],
	},
	{
		name: 'Zyberswap',
		slug: 'zyberswap',
		links: [
			'https://www.zyberswap.io',
			'https://app.zyberswap.io/exchange/besttrade',
		],
		views: [
			{
				chainId: 42161,
				providers: {
					llamafolio: 'zyberswap',
					zapper: 'zyberswap',
				},
			},
		],
	},
] as const satisfies DeepReadonly<Web3AppConfig[]>

export type Web3AppName = typeof web3Apps[number]['name']
export type Web3AppSlug = typeof web3Apps[number]['slug']


export const web3AppsBySlug = Object.fromEntries(web3Apps.map(web3AppConfig => [web3AppConfig.slug, web3AppConfig]))

export const web3AppsByProviderName = {
	llamafolio: Object.fromEntries(web3Apps.flatMap(web3AppConfig =>
		web3AppConfig.views.map(view => view.providers?.llamafolio ? [view.providers.llamafolio, web3AppConfig] : [])
	)) as Record<ZapperAppName, Web3AppConfig>,
	zapper: Object.fromEntries(web3Apps.flatMap(web3AppConfig =>
		web3AppConfig.views.map(view => view.providers?.zapper ? [view.providers.zapper, web3AppConfig] : [])
	)) as Record<ZapperAppName, Web3AppConfig>,
	zerionDefiSDK: Object.fromEntries(web3Apps.flatMap(web3AppConfig =>
		web3AppConfig.views.flatMap(view => view.providers?.zerionDefiSDK?.map(name => [name, web3AppConfig]) ?? [])
	)) as Record<DefiSDK.ProtocolName, Web3AppConfig>,
} as const


const infrastructureApps = ([
	'ipfs',
	'the-graph',
	// 'push',
] as const)
.map(slug => web3AppsBySlug[slug])

const identityApps = ([
	'ens',
	'eas',
	// 'ceramic',
	'disco',
] as const)
.map(slug => web3AppsBySlug[slug])

const socialApps = ([
	'farcaster',
	'lens',
] as const)
.map(slug => web3AppsBySlug[slug])

const oracleNetworks = ([
	'chainlink',
	'pyth',
	'tellor',
	// 'umbrella',
] as const)
.map(slug => web3AppsBySlug[slug])

const decentralizedExchanges = ([
	'uniswap',
	'curve',
	'1inch',
	'balancer',
	// 'kyber',
	'paraswap',
	'sushi',
	'0x',
] as const)
.map(slug => web3AppsBySlug[slug])

const defiPrimitives = ([
	'aave',
	'compound',
	'maker',
	'yearn',
	'synthetix',
	'superfluid',
	// 'uma',
] as const)
.map(slug => web3AppsBySlug[slug])

const crossChainInfrastructure = ([
	'matic',
	'connext',
	'etherspot',
] as const)
.map(slug => web3AppsBySlug[slug])

const institutionalDefi = ([
	'circle',
	'bitgo',
	'nexus-mutual',
] as const)
.map(slug => web3AppsBySlug[slug])

const creatorApps = ([
	'audius',
	'nouns',
	'zora',
	// 'apecoin',
	// 'livepeer',
	// 'rarible',
] as const)
.map(slug => web3AppsBySlug[slug])

// const collectibleCommunities = ([
// 	'apecoin',
// 	'nouns',
// ] as const)
//	.map(slug => web3AppsBySlug[slug])

export const appForNetwork = new Map(
	([
		['arbitrum-one', 'arbitrum'],
		['aurora', 'aurora-plus'],
		['base', 'base'],
		['blast', 'blast'],
		['degen', 'degen'],
		['ethereum', 'ethereum'],
		['linea', 'linea'],
		['metal', 'metal'],
		['metis', 'metis'],
		['optimism', 'optimism'],
		['polygon', 'polygon'],
		['zksync', 'zksync'],
	] as const)
		.map(([networkSlug, appSlug]) => [
			networkBySlug.get(networkSlug)!,
			web3AppsBySlug[appSlug]
		])
)

export const networkApps = [...appForNetwork.values()]

export const web3AppsBySection = ([
	{
		title: 'Data Infrastucture',
		apps: infrastructureApps,
		isFeatured: true,
	},
	{
		title: 'Identity Primitives',
		apps: identityApps,
		isFeatured: true,
	},
	{
		title: 'Social Networks',
		apps: socialApps,
		isFeatured: true,
	},
	{
		title: 'Creator Communities',
		apps: creatorApps,
		isFeatured: true,
	},
	{
		title: 'Decentralized Exchanges',
		apps: decentralizedExchanges,
		isFeatured: true,
	},
	{
		title: 'DeFi Primitives',
		apps: defiPrimitives,
		isFeatured: true,
	},
	{
		title: 'Institutional DeFi',
		apps: institutionalDefi,
		isFeatured: true,
	},
	// {
	// 	title: 'Cross-Chain Infrastructure',
	// 	apps: crossChainInfrastructure,
	// 	isFeatured: true,
	// },
	{
		title: 'Oracle Networks',
		apps: oracleNetworks,
		isFeatured: true,
	},
	// {
	// 	title: 'Collectible Communities',
	// 	apps: collectibleCommunities,
	// 	isFeatured: true,
	// },
	{
		title: 'EVM Networks',
		apps: networkApps,
		isFeatured: true,
	},
	{
		title: 'Other Apps (Experimental)',
		apps: [...(
			new Set(web3Apps)
				.difference(
					new Set([
						...infrastructureApps,
						...identityApps,
						...socialApps,
						...oracleNetworks,
						...crossChainInfrastructure,
						...defiPrimitives,
						...decentralizedExchanges,
						...institutionalDefi,
						...creatorApps,
						// ...collectibleCommunities
						...networkApps,
					])
			)
		)],
		isCollapsible: true,
	},
]) as const


import { networkByChainId } from './networks'

export const getWeb3AppSupportedNetworks = (app: Web3AppConfig) => new Set(app.views.map(view => networkByChainId.get(view.chainId)))

