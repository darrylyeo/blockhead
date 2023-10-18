import type { ComponentType } from 'svelte'
import type { Ethereum } from './networks/types'
import type { DefiSDK } from '../api/zerion/defiSdk'
import type { ZapperAppId } from '../api/zapper'
import { erc20TokensByContractAddress, erc20TokensBySymbol } from './tokens'


import {
	CeramicIcon,
	DiscoIcon,
	IpfsIcon,
	LensIcon,
	NounsIcon,
	UniswapIcon,
} from '../assets/icons'
import { ZoraIcon } from '../assets/networkIcons'


import CeramicPage from '../routes/apps/(withDashboard)/ceramic/+page.svelte'
import DiscoPage from '../routes/apps/(withDashboard)/disco/+page.svelte'


import { UniswapV3 } from '../api/uniswap-v3/index'
import { UniswapV3Subgraph } from '../api/uniswap-v3/subgraph'
import UniswapPage from '../routes/apps/(withDashboard)/uniswap/+page.svelte'


export type Web3AppConfig = {
	name: Web3AppName,
	slug: Web3AppSlug,
	links?: string[],
	icon?: string,
	colors?: string[],
	views: Web3AppView[]
}

export type Web3AppView = {
	name?: string,
	slug?: string,
	colors?: string[],
	chainId: Ethereum.ChainID,
	components?: ComponentType[],
	erc20Tokens?: Partial<Ethereum.ERC20Token[]>,
	nfts?: Partial<Ethereum.NftContract[]>,
	contracts?: Ethereum.Contract[],
	tags?: {
		name: '',
		hash: ''
	}[],
	links?: string[],
	providers?: {
		theGraph?: string,
		zapper?: ZapperAppId,
		zerionDefiSDK?: DefiSDK.ProtocolName[],
	},
	embeds?: {
		name: string,
		description?: string,
		src: string
	}[],
}

export type Web3AppName = string // typeof web3Apps[number]['name']
export type Web3AppSlug = string // typeof web3Apps[number]['slug']


export const web3Apps: Web3AppConfig[] = [
	{
		name: 'Aave',
		slug: 'aave',
		links: ['https://aave.com'],
		colors: ['#77c0c7', '#b56da4'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'aave-v3'
				}
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
					zapper: 'aave-v2',
					zerionDefiSDK: [
						'Aave V2',
						'Aave V2 • Stable Debt',
						'Aave V2 • Variable Debt',
						'Aave • Staking'
					]
				}
			},
			{
				name: 'Aave AMM',
				slug: 'amm',
				chainId: 1,
				providers: {
					zapper: 'aave-amm'
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'aave-v1',
					zerionDefiSDK: ['Aave', 'Aave • Uniswap Market']
				}
			},
			{
				name: 'Aave v2 Governance',
				slug: 'v1',
				chainId: 1,
				embeds: [
					{
						name: 'Aavote',
						description: 'Aavote - Aave Governance v2 Interface',
						src: 'https://aavote.netlify.app'
					}
				],
				providers: {
					zapper: 'aave-safety-module'
				}
			}
		]
	},
	{
		name: 'Aavegotchi',
		slug: 'aavegotchi',
		links: ['https://aavegotchi.com'],
		colors: ['#fa34f3', '#5100B1'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'aavegotchi'
				}
			}
		]
	},
	{
		name: 'Abracadabra',
		slug: 'abracadabra',
		links: ['https://abracadabra.money'],
		colors: ['#7b79f7'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'abracadabra'
				}
			}
		]
	},
	{
		name: 'Across',
		slug: 'across',
		links: [],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'across'
				}
			}
		]
	},
	{
		name: 'Adamant',
		slug: 'adamant',
		links: ['https://adamant.finance'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'adamant'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'adamant'
				}
			}
		]
	},
	{
		name: 'Aelin',
		slug: 'aelin',
		links: ['https://aelin.xyz'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'aelin'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'aelin'
				}
			}
		]
	},
	{
		name: 'Agave',
		slug: 'agave',
		links: ['https://agave.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'agave'
				}
			}
		]
	},
	{
		name: 'Airswap',
		slug: 'airswap',
		links: ['https://airswap.io'],
		colors: ['#2b71ff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/airswap/airswap',
					zapper: 'airswap'
				}
			}
		]
	},
	{
		name: 'Akropolis',
		slug: 'akropolis',
		links: ['https://www.akropolis.io'],
		colors: ['#ef359c', '#5346e6'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/in19farkt/akropolis-os-mainnet',
					zerionDefiSDK: [
						'Akropolis • ADEL Staking',
						'Akropolis • AKRO Staking'
					]
				}
			}
		]
	},
	{
		name: 'Alchemix',
		slug: 'alchemix',
		links: ['https://alchemix.fi'],
		views: [
			{
				name: 'Alchemix V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'alchemix-v2'
				}
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16271/thumb/photo_2021-06-13_22-16-07.jpg?1623593846',
						chainId: 1,
						address: '0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6',
						name: 'Alchemix ETH',
						symbol: 'ALETH',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14114/thumb/Alchemix_USD.png?1614410406',
						chainId: 1,
						address: '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9',
						name: 'Alchemix USD',
						symbol: 'ALUSD',
						decimals: 18
					}
				],
				providers: {
					zapper: 'alchemix'
				}
			}
		]
	},
	{
		name: 'Alkemi',
		slug: 'alkemi',
		links: ['https://alkemi.network'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x6c16119b20fa52600230f074b349da3cb861a7e3'
					}
				],
				providers: {
					zapper: 'alkemi'
				}
			}
		]
	},
	{
		name: 'Alpha Finance',
		slug: 'alpha',
		links: ['https://alphafinance.io'],
		views: [
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: ['https://homora-v2.alphafinance.io'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12738/thumb/AlphaToken_256x256.png?1617160876',
						chainId: 1,
						address: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
						name: 'Alpha Finance',
						symbol: 'ALPHA',
						decimals: 18
					}
				],
				providers: {
					zapper: 'alpha-v2',
					zerionDefiSDK: ['Alpha Homora V2']
				}
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: ['https://homora-v2.alphafinance.io'],
				chainId: 250,
				erc20Tokens: [
				],
				providers: {
					zapper: 'homora-v2'
				}
			},
			{
				name: 'Alpha Homora V2',
				slug: 'v2',
				links: ['https://homora-v2.alphafinance.io'],
				chainId: 43114,
				erc20Tokens: [
				],
				providers: {
					zapper: 'homora-v2'
				}
			},
			{
				name: 'Alpha Homora V1',
				slug: 'v1',
				links: ['https://homora.alphafinance.io'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12738/thumb/AlphaToken_256x256.png?1617160876',
						chainId: 1,
						address: '0xa1faa113cbe53436df28ff0aee54275c13b40975',
						name: 'Alpha Finance',
						symbol: 'ALPHA',
						decimals: 18
					}
				],
				providers: {
					zapper: 'alpha-v1',
					zerionDefiSDK: ['Alpha Homora']
				}
			}
		]
	},
	{
		name: 'Alpha Tokenomics',
		slug: 'alpha-tokenomics',
		links: ['https://tokenomics.alphafinance.io'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'alpha-tokenomics'
				}
			}
		]
	},
	{
		name: 'Amp',
		slug: 'amp',
		links: ['https://app.flexa.network'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'amp'
				}
			}
		]
	},
	{
		name: 'Ampleforth',
		slug: 'ampleforth',
		links: ['https://www.ampleforth.org'],
		colors: ['#5856d6'],
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
						decimals: 9
					}
				],
				providers: {
					zerionDefiSDK: ['Ampleforth'],
					zapper: 'ampleforth'
				}
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
						decimals: 18
					}
				]
			}
		]
	},
	{
		name: 'Angle',
		slug: 'angle',
		links: ['https://www.angle.money'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x31429d1856ad1377a8a0079410b297e1a9e214c2'
					}
				],
				providers: {
					zapper: 'angle'
				}
			}
		]
	},
	{
		name: 'Ape Tax',
		slug: 'ape-tax',
		links: ['https://ape.tax'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ape-tax'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'ape-tax'
				}
			}
		]
	},
	{
		name: 'Apeswap',
		slug: 'apeswap',
		links: ['https://apeswap.finance'],
		colors: ['#a16552', '#ffb300'],
		views: [
			{
				chainId: 56,
				providers: {
					zapper: 'apeswap'
				}
			}
		]
	},
	{
		name: 'APY.Finance',
		slug: 'apy',
		links: ['https://apy.finance'],
		colors: ['#d153f4', '#4d43df'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'apy'
				}
			}
		]
	},
	{
		name: 'Aragon',
		slug: 'aragon',
		links: ['https://aragon.org'],
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['Aragon']
				}
			}
		]
	},
	{
		name: 'ARCx',
		slug: 'arcx',
		links: ['https://arcx.money'],
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
						decimals: 18
					},
					erc20TokensByContractAddress['0xed30dd7e50edf3581ad970efc5d9379ce2614adb'], // ARC Governance Old
				],
				providers: {
					zapper: 'arcx'
				}
			}
		]
	},
	{
		name: 'Apecoin DAO',
		slug: 'apecoin',
		links: ['https://apecoin.com'],
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
						decimals: 18
					},
				],
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
						decimals: 18
					},
				],
				contracts: [
					{
						address: '0x831e0c7A89Dbc52a1911b78ebf4ab905354C96Ce',
					}
				]
			}
		]
	},
	{
		name: 'Argo Finance',
		slug: 'argo-finance',
		links: ['https://www.argofinance.money'],
		colors: ['#fff'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'argo-finance'
				}
			}
		]
	},
	{
		name: 'Armor',
		slug: 'armor',
		links: ['https://armor.fi'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'armor'
				}
			}
		]
	},
	{
		name: 'Arrakis',
		slug: 'arrakis',
		links: ['https://arrakis.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'arrakis'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'arrakis'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'arrakis'
				}
			}
		]
	},
	{
		name: 'Arth',
		slug: 'arth',
		links: ['https://arth.mahadao.com'],
		colors: ['#222'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'arth'
				}
			}
		]
	},
	{
		name: 'Atlendis V1',
		slug: 'atlendis-v1',
		links: ['https://app.atlendis.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'atlendis-v1'
				}
			}
		]
	},
	{
		name: 'Audius',
		slug: 'audius',
		links: ['https://audius.org'],
		colors: ['#cc0fe0', '#7e1bcc'],
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
						decimals: 18
					}
				],
				contracts: [
					{
						address: '0x819fd65026848d710fe40d8c0439f1220e069398'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/audius-infra/audius-network-mainnet'
				}
			}
		]
	},
	{
		name: 'Augur',
		slug: 'augur',
		links: ['https://www.augur.net'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'augur'
				}
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
						decimals: 15
					}
				]
			}
		]
	},
	{
		name: 'Aura',
		slug: 'aura',
		links: ['https://app.aura.finance'],
		colors: ['#7c3aed'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xc0c293ce456ff0ed870add98a0828dd4d2903dbf'
					}
				],
				providers: {
					zapper: 'aura'
				}
			}
		]
	},
	{
		name: 'Aurigami',
		slug: 'aurigami',
		links: ['https://www.aurigami.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1313161554,
				erc20Tokens: [],
				providers: {
					zapper: 'aurigami'
				}
			}
		]
	},
	{
		name: 'Aurora Plus',
		slug: 'aurora-plus',
		links: ['https://aurora.plus'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1313161554,
				erc20Tokens: [],
				providers: {
					zapper: 'aurora-plus'
				}
			}
		]
	},
	{
		name: 'Autofarm',
		slug: 'autofarm',
		links: ['https://autofarm.network'],
		views: [
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'autofarm'
				}
			}
		]
	},
	{
		name: 'Badger',
		slug: 'badger',
		links: ['https://badger.finance'],
		colors: ['#F2A52B'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14502/thumb/BADGER_DAO.png?1616559959',
						chainId: 1,
						address: '0x19d97d8fa813ee2f51ad4b4e04ea08baf4dffc28',
						name: 'Badger Sett Badger',
						symbol: 'BBADGER',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14503/thumb/DIGG.png?1616560407',
						chainId: 1,
						address: '0x7e7e112a68d8d2e221e11047a72ffc1065c38e1a',
						name: 'Badger Sett Digg',
						symbol: 'BDIGG',
						decimals: 18
					}
				],
				providers: {
					zapper: 'badger'
				}
			}
		]
	},
	{
		name: 'Balancer',
		slug: 'balancer',
		links: ['https://balancer.fi', 'https://app.balancer.fi'],
		colors: ['#536dfe'], // unofficial
		views: [
			{
				name: 'Balancer V2',
				slug: 'v2',
				chainId: 1,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
					zapper: 'balancer-v2',
					zerionDefiSDK: ['Balancer']
				}
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
						decimals: 18
					}
				]
			},
			{
				name: 'Balancer V1',
				slug: 'v1',
				chainId: 1,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer',
					zapper: 'balancer-v1',
					zerionDefiSDK: ['Balancer']
				}
			}
		]
	},
	{
		name: 'Banano',
		slug: 'banano',
		links: ['https://wrap.banano.cc'],
		colors: ['#fff'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'banano'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'banano'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'banano'
				}
			}
		]
	},
	{
		name: 'Bancor',
		slug: 'bancor',
		links: ['https://bancor.network', 'https://app.bancor.network'],
		colors: ['#070e1f'], // unofficial
		views: [
			{
				name: 'Bancor V3',
				slug: 'v3',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'bancor-v3'
				}
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14053/thumb/bancorvbnt_32.png?1614048819',
						chainId: 1,
						address: '0x48fb253446873234f2febbf9bdeaa72d9d387f94',
						name: 'Bancor Governance T',
						symbol: 'VBNT',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/10619/thumb/busd.png?1581026228',
						chainId: 1,
						address: '0x309627af60f0926daa6041b8279484312f2bf060',
						name: 'USD Bancor',
						symbol: 'USDB',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/blocklytics/bancor',
					zapper: 'bancor',
					zerionDefiSDK: [
						'Bancor',
						'Bancor • Liquidity Protection',
						'Bancor • Locked BNT'
					]
				}
			}
		]
	},
	{
		name: 'Bao Finance',
		slug: 'bao',
		links: ['https://www.bao.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'bao'
				}
			}
		]
	},
	{
		name: 'BarnBridge',
		slug: 'barnbridge',
		links: ['https://barnbridge.com'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					// erc20TokensBySymbol['BOND']
				],
				providers: {
					zapper: 'barnbridge'
				}
			},
			{
				name: 'Barnbridge Smart Alpha',
				slug: 'smart-alpha',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'barnbridge-smart-alpha'
				}
			},
			{
				name: 'BarnBridge Smart Yield',
				slug: 'smart-yield',
				links: ['https://app.barnbridge.com/smart-alpha/pools'],
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'barnbridge-smart-yield'
				}
			}
		]
	},
	{
		name: 'Based Money',
		slug: 'based-money',
		links: ['https://based.money'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'based-money'
				}
			}
		]
	},
	{
		name: 'Basis',
		slug: 'basis',
		links: ['https://basis.io'],
		views: [
			{
				name: 'Basis Cash',
				slug: 'cash',
				links: ['https://basis.cash'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/8631/thumb/l.NkwdggrR1hkSqghZ.png?1559791553',
						chainId: 1,
						address: '0x7dc59729b0adf4ae34721a1e06ef82a19e690b04',
						name: 'BTC Alpha Token',
						symbol: 'BAC',
						decimals: 8
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13251/thumb/BAS.png?1613231139',
						chainId: 1,
						address: '0x106538cc16f938776c7c180186975bca23875287',
						name: 'Basis Share',
						symbol: 'BAS',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13961/thumb/bab_1.png?1613358492',
						chainId: 1,
						address: '0xc36824905dff2eaaee7ecc09fcc63abc0af5abc5',
						name: 'Basis Bond',
						symbol: 'BAB',
						decimals: 18
					}
				],
				providers: {
					zapper: 'basis-cash'
				}
			},
			// {
			// 	name: 'Basis Dollar',
			// 	slug: 'dollar',
			// 	links: ['https://basisdollar.fi'],
			// 	chainId: 1,
			// 	erc20Tokens: [
			// 		erc20TokensBySymbol['BSD'],
			// 		erc20TokensBySymbol['BSDS'],
			// 	]
			// },
			{
				name: 'Basis Gold',
				slug: 'gold',
				links: ['https://basis.gold'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13663/thumb/pErVlwLE_400x400.png?1610601302',
						chainId: 1,
						address: '0xb34ab2f65c6e4f764ffe740ab83f982021faed6d',
						name: 'Basis Gold',
						symbol: 'BSG',
						decimals: 18
					},
					erc20TokensBySymbol['BSGS']
				],
				providers: {
					zapper: 'basis-gold'
				}
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
						decimals: 18
					},
					erc20TokensBySymbol['BSGS']
				]
			},
			{
				name: 'Basis Bond',
				slug: 'bond',
				chainId: 1,
				erc20Tokens: [
					// erc20TokensBySymbol['BSB']
				]
			}
		]
	},
	{
		name: 'BasketDAO',
		slug: 'basket',
		links: ['https://basketdao.org'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14664/thumb/BDI_200.png?1621851285',
						chainId: 1,
						address: '0x0309c98b1bffa350bcb3f9fb9780970ca32a5060',
						name: 'BasketDAO DeFi Inde',
						symbol: 'BDI',
						decimals: 18
					}
				],
				providers: {
					zapper: 'basket-dao'
				}
			}
		]
	},
	{
		name: 'Bastion Protocol',
		slug: 'bastion-protocol',
		links: ['https://bastionprotocol.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1313161554,
				erc20Tokens: [],
				providers: {
					zapper: 'bastion-protocol'
				}
			}
		]
	},
	{
		name: 'Beefy Finance',
		slug: 'beefy',
		links: ['https://www.beefy.finance'],
		views: [
			{
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'beefy'
				}
			},
			{
				slug: 'heco',
				chainId: 128,
				erc20Tokens: [],
				providers: {
					zapper: 'beefy'
				}
			},
			{
				slug: 'avalanche',
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'beefy'
				}
			},
			{
				slug: 'polygon',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'beefy'
				}
			},
			{
				slug: 'fantom',
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'beefy'
				}
			}
		]
	},
	{
		name: 'Beethoven X',
		slug: 'beethoven-x',
		links: ['https://app.beets.fi'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0xf24bcf4d1e507740041c9cfd2dddb29585adce1e'
					}
				],
				providers: {
					zapper: 'beethoven-x'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'beethoven-x'
				}
			}
		]
	},
	{
		name: 'Bella',
		slug: 'bella',
		links: ['https://bella.fi'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'bella'
				}
			}
		]
	},
	{
		name: 'Belt',
		slug: 'belt',
		links: ['https://belt.fi'],
		views: [
			{
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'belt'
				}
			},
			{
				slug: 'heco',
				chainId: 128,
				erc20Tokens: [],
				providers: {
					zapper: 'belt'
				}
			}
		]
	},
	{
		name: 'Benchmark',
		slug: 'benchmark',
		links: ['https://benchmarkprotocol.finance'],
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
						decimals: 9
					}
				],
				providers: {
					zapper: 'benchmark'
				}
			}
		]
	},
	{
		name: 'Benqi',
		slug: 'benqi',
		links: ['https://benqi.fi'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'benqi'
				}
			}
		]
	},
	{
		name: 'Bent',
		slug: 'bent',
		links: ['https://bentfinance.com'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x01597e397605bf280674bf292623460b4204c375'
					}
				],
				providers: {
					zapper: 'bent'
				}
			}
		]
	},
	{
		name: 'Berezka',
		slug: 'berezka',
		links: ['https://www.berezka.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Berezka']
				}
			}
		]
	},
	{
		name: 'Big Data Protocol',
		slug: 'big-data',
		links: ['https://bigdataprotocol.com'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'big-data'
				}
			}
		]
	},
	{
		name: 'Biswap',
		slug: 'biswap',
		links: ['https://app.beets.fi'],
		colors: [],
		views: [
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'biswap'
				}
			}
		]
	},
	{
		name: 'BitGo',
		slug: 'bitgo',
		links: ['https://www.bitgo.com'],
		colors: ['#62abf4'], // unofficial
		views: [
			{
				name: 'Wrapped Bitcoin',
				slug: 'wbtc',
				links: ['https://wbtc.network'],
				colors: ['#f7931a'], // unofficial
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744',
						chainId: 1,
						address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
						name: 'Wrapped Bitcoin',
						symbol: 'WBTC',
						decimals: 8
					}
				]
			}
		]
	},
	{
		name: 'Boring DAO',
		slug: 'boring',
		links: ['https://www.boringdao.com'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13525/thumb/gWzm2dr.png?1609390713',
						chainId: 1,
						address: '0x8064d9ae6cdf087b1bcd5bdf3531bd5d8c537a68',
						name: 'BoringDAO BTC',
						symbol: 'OBTC',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12917/thumb/bor_logo.png?1603607502',
						chainId: 1,
						address: '0x3c9d6c1c73b31c837832c72e04d3152f051fc1a9',
						name: 'BoringDAO	OLD ',
						symbol: 'BOR',
						decimals: 18
					}
				],
				providers: {
					zapper: 'boring-dao'
				}
			}
		]
	},
	{
		name: 'Botto',
		slug: 'botto',
		links: ['https://botto.com'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'botto'
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
					zapper: 'b-protocol'
				}
			}
		]
	},
	{
		name: 'bZx Protocol',
		slug: 'bzx',
		links: ['https://bzx.network'],
		colors: ['#33dfcc', '#003cda'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'bzx',
					zerionDefiSDK: [
						'bZx',
						'bZx bZx',
						'bZx • Staking',
						'bZx • Vested Staking'
					]
				}
			}
		]
	},
	{
		name: 'Ceramic',
		slug: 'ceramic',
		links: ['https://ceramic.network'],
		colors: ['#FF3600', '#FFB08A'],
		icon: CeramicIcon,
		views: [
			{
				chainId: 1,
				components: [
					CeramicPage,
				],
			}
		],
	},
	{
		name: 'Chai',
		slug: 'chai',
		links: ['https://chai.money'],
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['Chai']
				}
			}
		]
	},
	{
		name: 'Chainlink',
		slug: 'chainlink',
		links: ['https://chain.link'],
		colors: ['#375bd2'],
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
						decimals: 18
					}
				]
			}
		]
	},
	{
		name: 'Circle',
		slug: 'circle',
		links: ['https://www.circle.com/en/usdc', 'https://www.centre.io/usdc'],
		colors: ['#4ee498', '#68d7fa', '#5fbfff', '#b090f5'],
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
						decimals: 6
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/centrehq/usdc'
				}
			}
		]
	},
	{
		name: 'Clearpool',
		slug: 'clearpool',
		links: ['https://clearpool.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'clearpool'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'clearpool'
				}
			}
		]
	},
	{
		name: 'Cometh',
		slug: 'cometh',
		links: ['https://www.cometh.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Cometh • Staking', 'Cometh • Tube']
				}
			}
		]
	},
	{
		// https://compound.finance/docs#networks
		name: 'Compound',
		slug: 'compound',
		links: ['https://compound.finance'],
		colors: ['#01d395'],
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
						decimals: 18
					}
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
					zerionDefiSDK: ['Compound Governance']
				}
			},
			{
				name: 'Compound V2',
				slug: 'v2',
				colors: ['#27D3A2', '#9388FD'],
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
						decimals: 8
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/15290/thumb/cwbtc.png?1620371929',
						chainId: 1,
						address: '0xc11b1268c1a384e55c48c2391d8d480264a3a7f4',
						name: 'cWBTC	Legacy ',
						symbol: 'CWBTC',
						decimals: 8
					},
					erc20TokensBySymbol['cSAI']
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
					zapper: 'compound',
					zerionDefiSDK: ['Compound']
				}
			},
			{
				name: 'Compound V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['Compound']
				}
			}
		]
	},
	{
		name: 'Concentrator',
		slug: 'concentrator',
		links: ['https://concentrator.aladdin.club'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'concentrator'
				}
			}
		]
	},
	{
		name: 'Connext',
		slug: 'connext',
		colors: ['#29c1fc', '#9c62f9'],
		links: ['https://connext.network'],
		views: [
			{
				chainId: 1,
				erc20Tokens: []
			}
		]
	},
	{
		name: 'Convex',
		slug: 'convex',
		links: ['https://www.convexfinance.com'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/15586/thumb/convex-crv.png?1621255952',
						chainId: 1,
						address: '0x62b9c7356a2dc64a1969e19c23e4f579f9810aa7',
						name: 'Convex CRV',
						symbol: 'CVXCRV',
						decimals: 18
					}
				],
				providers: {
					zapper: 'convex'
				}
			}
		]
	},
	{
		name: 'Coslend',
		slug: 'coslend',
		links: ['https://coslend.com'],
		colors: ['#e921c3'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'coslend'
				}
			}
		]
	},
	{
		name: 'Cover Protocol',
		slug: 'cover',
		links: ['https://www.coverprotocol.com'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'cover'
				}
			}
		]
	},
	{
		name: 'Cozy Finance',
		slug: 'cozy-finance',
		links: ['https://www.cozy.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'cozy-finance'
				}
			},
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'cozy-finance'
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
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11976/thumb/Cream.png?1596593418',
						chainId: 1,
						address: '0x2ba592f78db6436527729929aaf6c908497cb200',
						name: 'Cream',
						symbol: 'CREAM',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13568/thumb/creth2.png?1609837099',
						chainId: 1,
						address: '0xcbc1065255cbc3ab41a6868c22d1f1c573ab89fd',
						name: 'Cream ETH 2',
						symbol: 'CRETH2',
						decimals: 18
					}
				],
				providers: {
					zapper: 'cream',
					zerionDefiSDK: ['C.R.E.A.M.', 'C.R.E.A.M. • Staking']
				}
			},
			{
				name: 'C.R.E.A.M. Iron Bank',
				slug: 'iron-bank',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'cream-iron-bank'
				}
			}
		]
	},
	{
		name: 'Cryptex Finance',
		slug: 'cryptex',
		links: ['https://cryptex.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'cryptex'
				}
			}
		]
	},
	{
		name: 'Curve',
		slug: 'curve',
		links: ['https://curve.fi'],
		colors: [/*'#840000',*/ '#fd2700', '#f9ea02', '#91ff67'/*, '#0213fa'*/], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12124/thumb/Curve.png?1597369484',
						chainId: 1,
						address: '0xd533a949740bb3306d119cc777fa900ba034cd52',
						name: 'Curve DAO Token',
						symbol: 'CRV',
						decimals: 18
					}
				],
				providers: {
					zapper: 'curve',
					zerionDefiSDK: [
						'Curve',
						'Curve • Liquidity Gauges',
						'Curve • Vesting',
						'Curve • Vote Escrowed CRV'
					]
				}
			}
		]
	},
	{
		name: 'DDEX',
		slug: 'ddex',
		links: ['https://ddex.io'],
		colors: ['#012d93', '#0367d8', '#00f6fa'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zerionDefiSDK: ['DDEX • Lending', 'DDEX • Margin', 'DDEX • Spot']
				}
			}
		]
	},
	{
		name: 'DeFi Dollar',
		slug: 'defi-dollar',
		links: ['https://dusd.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'defi-dollar'
				}
			}
		]
	},
	{
		name: 'Defi Kingdoms',
		slug: 'defi-kingdoms',
		links: ['https://www.defikingdoms.com'],
		colors: [],
		views: [
			{
				chainId: 1666600000,
				erc20Tokens: [],
				providers: {
					zapper: 'defi-kingdoms'
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
					zapper: 'defisaver'
				}
			}
		]
	},
	{
		name: 'DeFi Swap',
		slug: 'defi-swap',
		links: ['https://crypto.com/defi/swap'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'defi-swap'
				}
			}
		]
	},
	{
		name: 'DerivaDEX',
		slug: 'derivadex',
		links: ['https://derivadex.com'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'derivadex'
				}
			}
		]
	},
	{
		name: 'DeversiFi',
		slug: 'deversifi',
		links: ['https://www.deversifi.com'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'deversifi'
				}
			}
		]
	},
	{
		name: 'DFI Money',
		slug: 'dfi-money',
		links: ['https://dfi.money'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'dfi-money'
				}
			}
		]
	},
	{
		name: 'dForce',
		slug: 'dforce',
		links: ['https://dforce.network'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'dforce'
				}
			}
		]
	},
	{
		name: 'Dfx',
		slug: 'dfx',
		links: ['https://exchange.dfx.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dfx'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'dfx'
				}
			}
		]
	},
	{
		name: 'Dfyn Network',
		slug: 'dfyn',
		links: ['https://dfyn.network'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'dfyn'
				}
			}
		]
	},
	{
		name: 'dHEDGE',
		slug: 'dhedge',
		links: ['https://www.dhedge.org'],
		views: [
			{
				name: 'Dhedge V2',
				slug: 'v2',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'dhedge-v2'
				}
			},
			{
				name: 'Dhedge V2',
				slug: 'v2',
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'dhedge-v2'
				}
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14792/thumb/dtop.jpg?1618469418',
						chainId: 1,
						address: '0x0f4c00139602ab502bc7c1c0e71d6cb72a9fb0e7',
						name: 'dHEDGE Top Index',
						symbol: 'DTOP',
						decimals: 18
					}
				],
				providers: {
					zapper: 'dhedge'
				}
			}
		]
	},
	{
		name: 'Diffusion',
		slug: 'diffusion',
		links: ['https://app.diffusion.fi'],
		colors: ['#27D2EA'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [
					{
						address: '0x3f75ceabcdfed1aca03257dc6bdc0408e2b4b026'
					}
				],
				providers: {
					zapper: 'diffusion'
				}
			}
		]
	},
	{
		name: 'Disco',
		slug: 'disco',
		links: ['https://disco.xyz'],
		colors: ['#020218'],
		icon: DiscoIcon,
		views: [
			{
				chainId: 1,
				components: [
					DiscoPage,
				]
			}
		],
	},
	{
		name: 'DeFi Money Market',
		slug: 'dmm',
		links: ['https://defimoneymarket.com'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11677/thumb/dmm.png?1592674690',
						chainId: 1,
						address: '0xed91879919b71bb6905f23af0a68d231ecf87b14',
						name: 'DMM	Governance',
						symbol: 'DMG',
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['DeFi Money Market']
				}
			}
		]
	},
	{
		name: 'DODO',
		slug: 'dodo',
		links: ['https://dodoex.io'],
		colors: ['#fff700'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'dodo',
					zerionDefiSDK: ['DODO']
				}
			}
		]
	},
	{
		name: 'Dopex',
		slug: 'dopex',
		links: ['https://dopex.io'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16659/thumb/rDPX_200x200_Coingecko.png?1624614475',
						chainId: 1,
						address: '0x0ff5a8451a839f5f0bb3562689d9a44089738d11',
						name: 'Dopex Rebate Token',
						symbol: 'RDPX',
						decimals: 18
					}
				],
				providers: {
					zapper: 'dopex'
				}
			}
		]
	},
	{
		name: 'dYdX',
		slug: 'dydx',
		links: ['https://dydx.exchange'],
		colors: ['#6966ff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'dydx',
					zerionDefiSDK: ['dYdX']
				}
			}
		]
	},
	{
		name: 'Dynamic Set Dollar',
		slug: 'dynamic-set-dollar',
		links: ['https://dsd.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'dsd'
				}
			}
		]
	},
	{
		name: 'Ease',
		slug: 'ease',
		links: ['https://ease.org'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ease'
				}
			}
		]
	},
	{
		name: 'Eden',
		slug: 'eden',
		links: ['https://www.edennetwork.io'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'eden'
				}
			}
		]
	},
	{
		name: '88mph',
		slug: '88mph',
		links: ['https://88mph.app'],
		colors: ['#743ad5', '#d53a9d'],
		views: [
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'eighty-eight-mph-v3'
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'eighty-eight-mph-v3'
				}
			},
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'eighty-eight-mph-v3'
				}
			},
			{
				name: '88mph V3',
				slug: 'v3',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'eighty-eight-mph-v3'
				}
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/bacon-labs/eighty-eight-mph',
					zapper: '88mph'
				}
			}
		]
	},
	{
		// https://docs.element.fi/developers/public-releases
		// https://raw.githubusercontent.com/element-fi/elf-deploy/main/changelog/releases/mainnet/v1.0.0:2/addresses.json
		name: 'Element Finance',
		slug: 'element',
		links: ['https://www.element.fi'],
		colors: ['#1568CA', '#8FD8E7'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
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
					zapper: 'element'
				}
			}
		]
	},
	{
		name: 'Eleven Finance',
		slug: 'eleven-finance',
		links: ['https://eleven.finance'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'eleven-finance'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'eleven-finance'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'eleven-finance'
				}
			}
		]
	},
	{
		name: 'Ellipsis',
		slug: 'ellipsis',
		links: ['https://v2.ellipsis.finance'],
		views: [
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'ellipsis'
				}
			}
		]
	},
	{
		name: 'Empty Set Dollar',
		slug: 'empty-set-dollar',
		links: ['https://www.emptyset.finance'],
		colors: ['#312f32'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'esd'
				}
			}
		]
	},
	{
		name: 'ENS',
		slug: 'ens',
		links: ['https://ens.domains'],
		colors: ['#5284ff'],
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
						decimals: 18
					}
				],
				nfts: [
					{
						name: 'ENS: Base Registrar',
						address: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
						symbol: 'ENS'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
				}
			}
		]
	},
	{
		name: 'Enzyme Finance',
		slug: 'enzyme',
		links: ['https://enzyme.finance'],
		colors: ['#01cabe', '#6852ed'], // ['#8167e0'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/enzymefinance/enzyme',
					zerionDefiSDK: ['Enzyme', 'Melon'],
					zapper: 'enzyme-finance'
				}
			}
		]
	},
	{
		name: 'Essentia',
		slug: 'essentia',
		links: ['https://essentia.one'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'essentia'
				}
			}
		]
	},
	{
		name: 'Ethereum',
		slug: 'ethereum',
		links: ['https://ethereum.org'],
		colors: ['#627eea'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ethereum'
				}
			}
		]
	},
	{
		name: 'Etherspot',
		slug: 'etherspot',
		colors: ['#f43c48', '#f67033'],
		links: ['https://etherspot.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: []
			}
		]
	},
	{
		name: 'Euler',
		slug: 'euler',
		links: ['https://app.euler.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'euler'
				}
			}
		]
	},
	{
		name: 'Evmoswap',
		slug: 'evmoswap',
		links: ['https://app.evmoswap.org'],
		colors: ['#121212'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [
					{
						address: '0x181c262b973b22c307c646a67f64b76410d19b6b'
					}
				],
				providers: {
					zapper: 'evmoswap'
				}
			}
		]
	},
	{
		name: 'Fei Protocol',
		slug: 'fei',
		links: ['https://fei.money'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'fei'
				}
			}
		]
	},
	{
		name: 'FinNexus',
		slug: 'finnexus',
		links: ['https://www.finnexus.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					erc20TokensBySymbol['FNX']
				],
				providers: {
					zerionDefiSDK: ['FinNexus']
				}
			}
		]
	},
	{
		name: 'Fixed Forex',
		slug: 'fixed-forex',
		links: ['https://fixedforex.fi'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'fixed-forex'
				}
			}
		]
	},
	{
		name: 'Float Protocol',
		slug: 'float',
		links: ['https://floatprotocol.com'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14116/thumb/FLOAT-Bank_LOGO-reduced_01.png?1616573606',
						chainId: 1,
						address: '0x24a6a37576377f63f194caa5f518a60f45b42921',
						name: 'Float Protocol',
						symbol: 'BANK',
						decimals: 18
					}
				],
				providers: {
					zapper: 'float-protocol'
				}
			}
		]
	},
	{
		name: 'Float Capital',
		slug: 'float-capital',
		links: ['https://float.capital'],
		colors: ['#1c1d26'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0x01309a1ec476871760d9ea454628500bccc1e011'
					}
				],
				providers: {
					zapper: 'float-capital'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'float-capital'
				}
			}
		]
	},
	{
		name: 'Floor Dao',
		slug: 'floor-dao',
		links: ['https://floor.xyz'],
		colors: ['#14f5da'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xf59257e961883636290411c11ec5ae622d19455e'
					}
				],
				providers: {
					zapper: 'floor-dao'
				}
			}
		]
	},
	{
		name: 'Frax',
		slug: 'frax',
		links: ['https://frax.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13422/thumb/frax_logo.png?1608476506',
						chainId: 1,
						address: '0x853d955acef822db058eb8505911ed77f175b99e',
						name: 'Frax',
						symbol: 'FRAX',
						decimals: 18
					},
					// erc20TokensBySymbol['FSX']
				],
				providers: {
					zapper: 'frax'
				}
			}
		]
	},
	{
		name: 'Frax Lend',
		slug: 'frax-lend',
		links: ['https://frax.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'frax-lend'
				}
			}
		]
	},
	{
		name: 'Furucombo',
		slug: 'furucombo',
		links: ['https://furucombo.app'],
		colors: ['#1b1b21'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'furucombo'
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
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/14520/thumb/futureswap_logo.png?1634122916',
						chainId: 1,
						address: '0x0e192d382a36de7011f795acc4391cd302003606',
						name: 'Futureswap',
						symbol: 'FST',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/futureswap/futureswap-v1',
					zapper: 'futureswap'
				}
			}
		]
	},
	{
		name: 'Gamma Strategies',
		slug: 'gamma-strategies',
		links: ['https://www.gammastrategies.org'],
		colors: ['#FF0025'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x6bea7cfef803d1e3d5f7c0103f7ded065644e197'
					}
				],
				providers: {
					zapper: 'gamma-strategies'
				}
			}
		]
	},
	{
		name: 'Geist',
		slug: 'geist',
		links: ['https://geist.finance'],
		colors: ['#bcfd71'],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0xd8321aa83fb0a4ecd6348d4577431310a6e0814d'
					}
				],
				providers: {
					zapper: 'geist'
				}
			}
		]
	},
	{
		name: 'GMX',
		slug: 'gmx',
		links: ['https://gmx.io'],
		colors: ['#2d42fc'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [
					{
						address: '0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a'
					}
				],
				providers: {
					zapper: 'gmx'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'gmx'
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
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/662/thumb/logo_square_simple_300px.png?1609402668',
						chainId: 1,
						address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
						name: 'Gnosis',
						symbol: 'GNO',
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['Gnosis Protocol'],
					theGraph: 'https://api.thegraph.com/subgraphs/name/gnosis/protocol'
				}
			},
			{
				name: 'Gnosis Protocol',
				slug: 'protocol',
				links: ['https://gnosis.io/protocol'],
				chainId: 100,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/gnosis/protocol-xdai'
				}
			},
			{
				name: 'Gnosis Safe',
				slug: 'safe',
				links: ['https://gnosis.io/protocol'],
				chainId: 100,
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/gjeanmart/gnosis-safe-mainnet'
				}
			}
		]
	},
	{
		name: 'Good Ghosting',
		slug: 'good-ghosting',
		links: ['https://goodghosting.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'good-ghosting'
				}
			},
			{
				chainId: 42220,
				erc20Tokens: [],
				providers: {
					zapper: 'good-ghosting'
				}
			}
		]
	},
	{
		name: 'Governor DAO',
		slug: 'governor',
		links: ['https://governordao.org'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'governor-dao'
				}
			}
		]
	},
	{
		name: 'Granary Finance',
		slug: 'granary-finance',
		links: ['https://granary.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'granary-finance'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'granary-finance'
				}
			}
		]
	},
	{
		name: 'Grim',
		slug: 'grim',
		links: ['https://www.grim.finance'],
		colors: ['#c11828'],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'grim'
				}
			}
		]
	},
	{
		name: 'Gro',
		slug: 'gro',
		links: ['https://www.gro.xyz'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'gro'
				}
			}
		]
	},
	{
		name: 'Harvest Finance',
		slug: 'harvest',
		links: ['https://harvest.finance'],
		colors: ['#fffce6', '#bbe3e2'], // unofficial
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'harvest',
					zerionDefiSDK: ['Harvest', 'Harvest • Profit Sharing']
				}
			}
		]
	},
	{
		name: 'Hector Network',
		slug: 'hector-network',
		links: ['https://hector.network'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'hector-network'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'hector-network'
				}
			}
		]
	},
	{
		name: 'Hegic',
		slug: 'hegic',
		links: ['https://www.hegic.co'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13969/thumb/ezgif-4-b5306690cb32.jpg?1613385300',
						chainId: 1,
						address: '0xad7ca17e23f13982796d27d1e6406366def6ee5f',
						name: 'rHEGIC2',
						symbol: 'RHEGIC2',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13074/thumb/zhegic_logo.png?1604903561',
						chainId: 1,
						address: '0x837010619aeb2ae24141605afc8f66577f6fb2e7',
						name: 'zHEGIC',
						symbol: 'ZHEGIC',
						decimals: 18
					}
				],
				providers: {
					zapper: 'hegic'
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'zlot',
					zerionDefiSDK: ['zlot.finance']
				}
			}
		]
	},
	{
		name: 'Honeyswap',
		slug: 'honeyswap',
		links: ['https://honeyswap.org'],
		colors: ['#fff'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'honeyswap'
				}
			},
			{
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'honeyswap'
				}
			}
		]
	},
	{
		name: 'Hop',
		slug: 'hop',
		links: ['https://hop.exchange'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'hop'
				}
			},
			{
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'hop'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'hop'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'hop'
				}
			}
		]
	},
	{
		name: 'Hundred Finance',
		slug: 'hundred-finance',
		links: ['https://hundred.finance'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'hundred-finance'
				}
			},
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'hundred-finance'
				}
			},
			{
				chainId: 1666600000,
				erc20Tokens: [],
				providers: {
					zapper: 'hundred-finance'
				}
			}
		]
	},
	{
		name: 'Idle Finance',
		slug: 'idle',
		links: ['https://idle.finance'],
		colors: ['#0B50B0', '#0F6BEB', '#6FA4F2'],
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['Idle']
				}
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11934/thumb/idlesusdv3mmaxyield_32.png?1596263703',
						chainId: 1,
						address: '0xf52cdcd458bf455aed77751743180ec4a595fd3f',
						name: 'IdleSUSD	Yield ',
						symbol: 'IDLESUSDYIELD',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11930/thumb/idleusdc-safe.png?1596263257',
						chainId: 1,
						address: '0x3391bc034f2935ef0e1e41619445f998b2680d35',
						name: 'IdleUSDC	Risk Adju',
						symbol: 'IDLEUSDCSAFE',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11933/thumb/idleusdtv3maxyield_32.png?1596263688',
						chainId: 1,
						address: '0xf34842d05a1c888ca02769a633df37177415c2f8',
						name: 'IdleUSDT	Yield ',
						symbol: 'IDLEUSDTYIELD',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11929/thumb/idledai-safe.png?1596263241',
						chainId: 1,
						address: '0xa14ea0e11121e6e951e87c66afe460a00bcd6a16',
						name: 'IdleDAI	Risk Adjus',
						symbol: 'IDLEDAISAFE',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11931/thumb/idleusdt-safe.png?1596263270',
						chainId: 1,
						address: '0x28fac5334c9f7262b3a3fe707e250e01053e07b5',
						name: 'IdleUSDT	Risk Adju',
						symbol: 'IDLEUSDTSAFE',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11935/thumb/idletusdv3mMaxyield_32.png?1596263719',
						chainId: 1,
						address: '0xc278041fdd8249fe4c1aad1193876857eea3d68c',
						name: 'IdleTUSD	Best Yiel',
						symbol: 'IDLETUSDYIELD',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11936/thumb/idlewbtcv3maxyield_32.png?1596263736',
						chainId: 1,
						address: '0x8c81121b15197fa0eeaee1dc75533419dcfd3151',
						name: 'IdleWBTC	Best Yiel',
						symbol: 'IDLEWBTCYIELD',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11932/thumb/idleusdcv3_32.png?1596263673',
						chainId: 1,
						address: '0x5274891bec421b39d23760c04a6755ecb444797c',
						name: 'IdleUSDC	Yield ',
						symbol: 'IDLEUSDCYIELD',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/idle-finance/idle',
					zapper: 'idle',
					zerionDefiSDK: ['Idle • Early Rewards', 'Idle • Risk-Adjusted']
				}
			}
		]
	},
	{
		name: 'Illuvium',
		slug: 'illuvium',
		links: ['https://www.illuvium.io'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'illuvium'
				}
			}
		]
	},
	{
		name: 'Impermax',
		slug: 'impermax',
		links: ['https://www.impermax.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'impermax'
				}
			},
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'impermax'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'impermax'
				}
			}
		]
	},
	{
		name: 'Impossible Finance',
		slug: 'impossible-finance',
		links: ['https://impossible.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'impossible-finance'
				}
			}
		]
	},
	{
		name: 'Index Cooperative',
		slug: 'index-cooperative',
		links: ['https://www.indexcoop.com'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'index-coop'
				}
			}
		]
	},
	{
		name: 'Indexed Finance',
		slug: 'indexed',
		links: ['https://indexed.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'indexed'
				}
			}
		]
	},
	{
		name: 'Instadapp',
		slug: 'instadapp',
		links: ['https://instadapp.io'],
		colors: ['#3f75ff'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'instadapp'
				}
			}
		]
	},
	{
		name: 'Inverse Finance',
		slug: 'inverse',
		links: ['https://inverse.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'inverse'
				}
			}
		]
	},
	{
		name: 'IPFS',
		slug: 'ipfs',
		links: ['https://ipfs.tech'],
		colors: ['#469ea2', '#6acad1', '#083b54'],
		icon: IpfsIcon,
		views: [

		]
	},
	{
		name: 'Iron',
		slug: 'iron',
		links: ['https://iron.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'iron'
				}
			}
		]
	},
	{
		name: 'Iron Bank',
		slug: 'iron-bank',
		links: ['https://app.ib.xyz'],
		colors: ['#fff'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'iron-bank'
				}
			},
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'iron-bank'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'iron-bank'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'iron-bank'
				}
			}
		]
	},
	{
		name: 'Jones Dao',
		slug: 'jones-dao',
		links: ['https://jonesdao.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'jones-dao'
				}
			}
		]
	},
	{
		name: 'Jpegd',
		slug: 'jpegd',
		links: ['https://jpegd.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'jpegd'
				}
			}
		]
	},
	{
		name: 'Keep Network',
		slug: 'keep-network',
		links: ['https://keep.network'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'keep-network'
				}
			}
		]
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'keeper-dao',
					zerionDefiSDK: ['KeeperDAO']
				}
			}
		]
	},
	{
		name: 'Kimchi Finance',
		slug: 'kimchi',
		links: ['https://kimchi.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['KIMCHI']
				}
			}
		]
	},
	{
		name: 'Kinesis Labs',
		slug: 'kinesis-labs',
		links: ['https://app.kinesislabs.co'],
		colors: ['#fff'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'kinesis-labs'
				}
			}
		]
	},
	{
		name: 'Klima',
		slug: 'klima',
		links: ['https://www.klimadao.finance'],
		colors: [],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0x4e78011ce80ee02d2c3e649fb657e45898257815'
					}
				],
				providers: {
					zapper: 'klima'
				}
			}
		]
	},
	{
		name: 'Klondike Finance',
		slug: 'klondike',
		links: ['https://klondike.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'klondike-v2'
				}
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
						decimals: 18
					},
					erc20TokensBySymbol['KBOND']
				],
				providers: {
					zapper: 'klondike'
				}
			}
		]
	},
	{
		name: 'Kogefarm',
		slug: 'kogefarm',
		links: ['https://www.kogefarm.io'],
		colors: [],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'kogefarm'
				}
			}
		]
	},
	{
		name: 'Kyber',
		slug: 'kyber',
		links: ['https://kyber.org', 'https://kyber.network'],
		colors: ['#31cb9e'],
		views: [
			{
				name: 'Kyber Dynamic Market Maker',
				slug: 'dmm',
				links: ['https://dmm.exchange'],
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
					zapper: 'kyber-dmm',
					theGraph: 'https://api.thegraph.com/subgraphs/name/dynamic-amm/dynamic-amm'
				}
			},
			{
				name: 'Kyber Dynamic Market Maker',
				slug: 'dmm',
				links: ['https://dmm.exchange'],
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
				]
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['KyberDAO']
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'kyber-network'
				}
			}
		]
	},
	{
		name: 'Kyber Dao',
		slug: 'kyber-dao',
		links: ['https://kyber.org'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'kyber-dao'
				}
			}
		]
	},
	{
		name: 'Launchpool',
		slug: 'launchpool',
		links: ['https://launchpool.xyz'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'launchpool'
				}
			}
		]
	},
	{
		name: 'Lens',
		slug: 'lens',
		links: ['https://lens.xyz'],
		colors: ['#00501e', '#abfe2c'],
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
				]
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
				]
			},
		]
	},
	{
		name: 'Lido',
		slug: 'lido',
		links: ['https://lido.fi'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'lido'
				}
			}
		]
	},
	{
		name: 'Linkswap',
		slug: 'linkswap',
		links: ['https://linkswap.app'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'linkswap'
				}
			}
		]
	},
	{
		name: 'Liquid Driver',
		slug: 'liquid-driver',
		links: ['https://www.liquiddriver.finance'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9'
					}
				],
				providers: {
					zapper: 'liquiddriver'
				}
			}
		]
	},
	{
		name: 'Liquity',
		slug: 'liquity',
		links: ['https://www.liquity.org'],
		colors: ['#2eb6ea', '#1542cd', '#745ddf'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/liquity/liquity',
					zapper: 'liquity',
					zerionDefiSDK: ['Liquity']
				}
			},
			{
				name: 'Liquity Frontend',
				slug: 'frontend',
				chainId: 1,
				embeds: [
					{
						name: 'LiquityFi (eth.liquity.fi)',
						src: 'https://eth.liquity.fi'
					},
					{
						name: 'Liquity.App (liquity.app)',
						src: 'https://liquity.app'
					},
					{
						name: 'Lusd.eth.link (lusd.eth.link)',
						src: 'https://lusd.eth.link'
					},
					{
						name: 'Liquity Land (liquityland.com)',
						src: 'https://liquityland.com'
					},
					{
						name: 'LiquityApp (liquityapp.com)',
						src: 'https://liquityapp.com'
					}
				]
			}
		]
	},
	{
		name: 'Livepeer',
		slug: 'livepeer',
		links: ['https://livepeer.org'],
		colors: ['#00EB88', '#00A55F'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/livepeer/livepeer',
					zerionDefiSDK: ['Livepeer']
				}
			}
		]
	},
	{
		name: 'Llama Airforce',
		slug: 'llama-airforce',
		links: ['https://llama.airforce'],
		colors: ['#f8f8f8'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'llama-airforce'
				}
			}
		]
	},
	{
		name: 'Looks Rare',
		slug: 'looks-rare',
		links: ['https://looksrare.org'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'looks-rare'
				}
			}
		]
	},
	{
		name: 'Loopring',
		slug: 'loopring',
		links: [
			'https://loopring.org',
			'https://loopring.io',
			'https://exchange.loopring.io'
		],
		colors: ['#1c42ff'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/loopring',
					zapper: 'loopring'
				}
			}
		]
	},
	{
		name: 'Lydia Finance',
		slug: 'lydia',
		links: ['https://www.lydia.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'lydia'
				}
			}
		]
	},
	{
		name: 'Lyra',
		slug: 'lyra',
		links: ['https://www.lyra.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'lyra'
				}
			}
		]
	},
	{
		name: 'Lyra Avalon',
		slug: 'lyra-avalon',
		links: ['https://avalon.app.lyra.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'lyra-avalon'
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
				name: 'Maker Governance',
				slug: 'governance',
				colors: ['#1AAB9B'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/1364/thumb/Mark_Maker.png?1585191826',
						chainId: 1,
						address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
						name: 'Maker',
						symbol: 'MKR',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/protofire/makerdao-governance',
					zerionDefiSDK: ['Maker Governance']
				}
			},
			{
				colors: ['#f4b731'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/9956/thumb/dai-multi-collateral-mcd.png?1574218774',
						chainId: 1,
						address: '0x6b175474e89094c44da98b954eedeac495271d0f',
						name: 'Dai',
						symbol: 'DAI',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/1442/thumb/dai.png?1547035520',
						chainId: 1,
						address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
						name: 'Sai',
						symbol: 'SAI',
						decimals: 18
					}
				],
				providers: {
					zapper: 'maker',
					zerionDefiSDK: ['Dai Savings Protocol', 'Dai Savings Rate']
				}
			},
		]
	},
	{
		name: 'Manifold Finance',
		slug: 'manifold-finance',
		links: ['https://www.manifoldfinance.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'manifold-finance'
				}
			}
		]
	},
	{
		name: 'Maple',
		slug: 'maple',
		links: ['https://www.maple.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'maple'
				}
			}
		]
	},
	{
		name: 'Market.xyz',
		slug: 'market-xyz',
		links: ['https://www.market.xyz'],
		colors: ['#fff'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'market-xyz'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'market-xyz'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'market-xyz'
				}
			}
		]
	},
	{
		name: 'Matic',
		slug: 'matic',
		links: ['https://wallet.matic.network/staking'],
		colors: ['#8247e5', /*'#003cb2'*/],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912',
						chainId: 1,
						address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
						name: 'Polygon',
						symbol: 'MATIC',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/maticnetwork/mainnet-root-subgraphs',
					zerionDefiSDK: ['Matic'],
					zapper: 'polygon'
				}
			}
		]
	},
	{
		name: 'Mean Finance',
		slug: 'mean-finance',
		links: ['https://mean.finance'],
		colors: ['#3076F6'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'mean-finance'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'mean-finance'
				}
			}
		]
	},
	{
		name: 'Meshswap',
		slug: 'meshswap',
		links: ['https://meshswap.fi'],
		colors: [],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'meshswap'
				}
			}
		]
	},
	{
		name: 'Metavault Trade',
		slug: 'metavault-trade',
		links: ['https://metavault.trade'],
		colors: ['#FFAA27'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0x2760e46d9bb43dafcbecaad1f64b93207f9f0ed7'
					}
				],
				providers: {
					zapper: 'metavault-trade'
				}
			}
		]
	},
	{
		name: 'Mirror Protocol',
		slug: 'mirror',
		links: ['https://mirror.finance'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13514/thumb/mirror_logo_transparent.png?1611564758',
						chainId: 1,
						address: '0xd36932143f6ebdedd872d5fb0651f4b72fd15a84',
						name: 'Mirrored Apple',
						symbol: 'MAAPL',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13646/thumb/mirror_logo_transparent.png?1611565645',
						chainId: 1,
						address: '0x0cae9e4d663793c2a2a0b211c1cf4bbca2b9caa7',
						name: 'Mirrored Amazon',
						symbol: 'MAMZN',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13647/thumb/mirror_logo_transparent.png?1611565672',
						chainId: 1,
						address: '0x56aa298a19c93c6801fdde870fa63ef75cc0af72',
						name: 'Mirrored Alibaba',
						symbol: 'MBABA',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13641/thumb/mirror_logo_transparent.png?1611565240',
						chainId: 1,
						address: '0x59a921db27dd6d4d974745b7ffc5c33932653442',
						name: 'Mirrored Google',
						symbol: 'MGOOGL',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/14020/thumb/mirror_logo_transparent.png?1613718368',
						chainId: 1,
						address: '0x0e99cc0535bb6251f6679fa6e65d6d3b430e840b',
						name: 'Mirrored Facebook',
						symbol: 'MFB',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13649/thumb/mirror_logo_transparent.png?1611565655',
						chainId: 1,
						address: '0x1d350417d9787e000cc1b95d70e9536dcd91f373',
						name: 'Mirrored iShares Go',
						symbol: 'MIAU',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13396/thumb/mirror_logo_transparent.png?1611564779',
						chainId: 1,
						address: '0x41bbedd7286daab5910a1f15d12cbda839852bd7',
						name: 'Mirrored Microsoft',
						symbol: 'MMSFT',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13643/thumb/mirror_logo_transparent.png?1611565277',
						chainId: 1,
						address: '0xc8d674114bac90148d11d3c1d33c61835a0f9dcd',
						name: 'Mirrored Netflix',
						symbol: 'MNFLX',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13645/thumb/mirror_logo_transparent.png?1611565327',
						chainId: 1,
						address: '0x13b02c8de71680e71f0820c996e4be43c2f57d15',
						name: 'Mirrored Invesco QQ',
						symbol: 'MQQQ',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13642/thumb/mirror_logo_transparent.png?1611565255',
						chainId: 1,
						address: '0x9d1555d8cb3c846bb4f7d5b1b1080872c3166676',
						name: 'Mirrored iShares Si',
						symbol: 'MSLV',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13644/thumb/mirror_logo_transparent.png?1611565294',
						chainId: 1,
						address: '0x21ca39943e91d704678f5d00b6616650f066fd63',
						name: 'Mirrored Tesla',
						symbol: 'MTSLA',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13639/thumb/mirror_logo_transparent.png?1611564718',
						chainId: 1,
						address: '0xedb0414627e6f1e3f082de65cd4f9c693d78cca9',
						name: 'Mirrored Twitter',
						symbol: 'MTWTR',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13640/thumb/mirror_logo_transparent.png?1611564829',
						chainId: 1,
						address: '0x31c63146a635eb7465e5853020b39713ac356991',
						name: 'Mirrored United Sta',
						symbol: 'MUSO',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13638/thumb/mirror_logo_transparent.png?1611564742',
						chainId: 1,
						address: '0xf72fcd9dcf0190923fadd44811e240ef4533fc86',
						name: 'Mirrored ProShares ',
						symbol: 'MVIXY',
						decimals: 18
					}
				],
				providers: {
					zapper: 'mirror'
				}
			}
		]
	},
	{
		name: 'Mith Cash',
		slug: 'mith-cash',
		links: ['https://mith.cash'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13478/thumb/3uZAPv2CbXF5txM.png?1608947522',
						chainId: 1,
						address: '0xcd1cb16a67937ff8af5d726e2681010ce1e9891a',
						name: 'Themis',
						symbol: 'MIS',
						decimals: 8
					}
				],
				providers: {
					zapper: 'mith-cash'
				}
			}
		]
	},
	{
		name: 'MM.Finance',
		slug: 'mm-finance',
		links: ['https://mm.finance'],
		colors: ['#cda16f'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [
					{
						address: '0x97749c9b61f878a880dfe312d2594ae07aed7656'
					}
				],
				providers: {
					zapper: 'mm-finance'
				}
			}
		]
	},
	{
		name: 'Morpheus Swap',
		slug: 'morpheus-swap',
		links: ['https://morpheusswap.finance'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0x0789ff5ba37f72abc4d561d00648acadc897b32d'
					}
				],
				providers: {
					zapper: 'morpheus-swap'
				}
			}
		]
	},
	{
		name: 'Morpho',
		slug: 'morpho',
		links: ['https://app.morpho.xyz'],
		colors: ['#14183D'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'morpho'
				}
			}
		]
	},
	{
		name: 'mStable',
		slug: 'mstable',
		links: ['https://mstable.org'],
		colors: ['#4aa1ff', '#000000'], // '#176ede' unofficial
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
						decimals: 8
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11576/thumb/mStable_USD.png?1595591803',
						chainId: 1,
						address: '0xe2f2a5c287993345a840db3b0845fbc70f5935a5',
						name: 'mStable USD',
						symbol: 'MUSD',
						decimals: 18
					}
				],
				providers: {
					zapper: 'mstable',
					zerionDefiSDK: ['mStable', 'mStable V2']
				}
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['mStable • Staking']
				}
			}
		]
	},
	{
		name: 'Mushrooms Finance',
		slug: 'mushrooms',
		links: ['https://mushrooms.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'mushroom'
				}
			}
		]
	},
	{
		name: 'Naos',
		slug: 'naos',
		links: ['https://naos.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'naos'
				}
			}
		]
	},
	{
		name: 'Nereus Finance',
		slug: 'nereus-finance',
		links: ['https://nereus.finance'],
		colors: ['#4D4AEC'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0xfcde4a87b8b6fa58326bb462882f1778158b02f1'
					}
				],
				providers: {
					zapper: 'nereus-finance'
				}
			}
		]
	},
	{
		name: 'Nexus Mutual',
		slug: 'nexus-mutual',
		links: ['https://nexusmutual.io'],
		colors: ['#1eab89'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/11890/thumb/wrapped-nexus-mutual.jpg?1595811559',
						chainId: 1,
						address: '0x0d438f3b5175bebc262bf23753c1e53d03432bde',
						name: 'Wrapped NXM',
						symbol: 'WNXM',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/nexusmutual/nexus-mutual',
					zerionDefiSDK: ['Nexus Mutual']
				}
			}
		]
	},
	{
		name: 'Nexus Mutual',
		slug: 'nexus-mutual',
		links: ['https://nexusmutual.io'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'nexus-mutual'
				}
			}
		]
	},
	{
		name: 'NFT20',
		slug: 'nft20',
		links: ['https://nft20.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'nft20'
				}
			}
		]
	},
	{
		name: 'NFTX',
		slug: 'nftx',
		links: ['https://nftx.io'],
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
						decimals: 18
					},
					erc20TokensByContractAddress['0x0fe629d1e84e171f8ff0c1ded2cc2221caa48a3f'], // NFTX Hashmasks Index
				],
				providers: {
					zapper: 'nftx'
				}
			}
		]
	},
	{
		name: 'Notional Finance',
		slug: 'notional-finance',
		links: ['https://notional.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'notional-finance'
				}
			}
		]
	},
	{
		name: 'Nouns DAO',
		slug: 'nouns',
		links: ['https://nouns.wtf'],
		colors: ['#D53C5E'],
		icon: NounsIcon,
		views: [
			{
				chainId: 1,
				contracts: [
					{
						name: 'Nouns DAO: Treasury',
						address: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10',
					}
				],
				nfts: [
					{
						name: 'Nouns',
						address: '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
						symbol: 'NOUN'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
				}
			}
		]
	},
	{
		name: 'Nsure Network',
		slug: 'nsure-network',
		links: ['https://nsure.network'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'nsure-network'
				}
			}
		]
	},
	{
		name: 'Olympus',
		slug: 'olympus',
		links: ['https://www.olympusdao.finance'],
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
						decimals: 9
					}
				],
				providers: {
					zapper: 'olympus'
				}
			}
		]
	},
	{
		name: 'Ondo',
		slug: 'ondo',
		links: ['https://ondo.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ondo'
				}
			}
		]
	},
	{
		name: '1inch',
		slug: '1inch',
		links: ['https://1inch.io'],
		colors: ['#94a6c3', '#d82122', '#0a192b'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/1inch-exchange/one-inch-v2',
					zapper: '1inch',
					zerionDefiSDK: ['1inch Liquidity Protocol', '1inch LP • Staking']
				}
			},
			{
				name: 'Chi Gastoken',
				slug: 'chi',
				colors: ['#d21318', '#3d3d3c'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/11583/thumb/chi.png?1591331659',
						chainId: 1,
						address: '0x0000000000004946c0e9f43f4dee607b0ef1fa1c',
						name: 'Chi Gastoken',
						symbol: 'CHI',
						decimals: 0
					}
				],
				providers: {
					zerionDefiSDK: ['Chi Gastoken by 1inch']
				}
			},
			{
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: '1inch'
				}
			},
			{
				slug: 'polygon',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: '1inch'
				}
			},
			{
				name: 'Mooniswap',
				slug: 'mooniswap',
				chainId: 1,
				links: ['https://mooniswap.exchange'],
				providers: {
					zapper: 'mooniswap',
					zerionDefiSDK: ['Mooniswap']
				}
			}
		]
	},
	{
		name: 'OnX Finance',
		slug: 'onx',
		links: ['https://onx.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'onx'
				}
			}
		]
	},
	{
		name: 'OpenLeverage',
		slug: 'open-leverage',
		links: ['https://openleverage.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'openleverage'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'openleverage'
				}
			}
		]
	},
	{
		name: 'Opium Protocol',
		slug: 'opium',
		links: ['https://opium.network'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'opium-network',
					theGraph: 'https://api.thegraph.com/subgraphs/name/opiumprotocol/opium-network'
				}
			}
		]
	},
	{
		name: 'Opyn',
		slug: 'opyn',
		links: ['https://www.opyn.co'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'opyn'
				}
			}
		]
	},
	{
		name: 'Origin',
		slug: 'origin',
		links: ['https://ousd.com'],
		colors: ['#1762ee'],
		views: [
			{
				slug: 'origin',
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26'
					}
				],
				providers: {
					zapper: 'origin'
				}
			},
			{
				name: 'Origin Dollar',
				slug: 'dollar',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'origin-dollar'
				}
			},
			{
				name: 'Origin Story',
				slug: 'story',
				links: ['https://www.story.xyz'],
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'origin-story'
				}
			}
		]
	},
	{
		name: 'Orion Protocol',
		slug: 'orion',
		links: ['https://www.orionprotocol.io'],
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
						decimals: 8
					}
				],
				providers: {
					zapper: 'orion-protocol'
				}
			}
		]
	},
	{
		name: 'Otterclam',
		slug: 'otterclam',
		links: ['https://www.otterclam.finance'],
		colors: [],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						address: '0xc250e9987a032acac293d838726c511e6e1c029d'
					}
				],
				providers: {
					zapper: 'otterclam'
				}
			}
		]
	},
	{
		name: 'PancakeSwap',
		slug: 'pancakeswap',
		links: ['https://pancakeswap.finance'],
		views: [
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'pancakeswap'
				}
			}
		]
	},
	{
		name: 'Pangolin',
		slug: 'pangolin',
		links: ['https://pangolin.exchange'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'pangolin'
				}
			}
		]
	},
	{
		name: 'Paraswap',
		slug: 'paraswap',
		links: ['https://paraswap.io'],
		colors: ['#0060D8'], // unofficial
		views: []
	},
	{
		name: 'Pendle',
		slug: 'pendle',
		links: ['https://pendle.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'pendle'
				}
			}
		]
	},
	{
		name: 'Penguin',
		slug: 'penguin',
		links: ['https://penguinfinance.org'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'penguin'
				}
			}
		]
	},
	{
		name: 'Perpetual Protocol',
		slug: 'perpetual-protocol',
		links: ['https://perp.exchange'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'perpetual-protocol'
				}
			}
		]
	},
	{
		name: 'Phuture',
		slug: 'phuture',
		links: ['https://phuture.finance'],
		colors: ['#3e1fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0xe1fc4455f62a6e89476f1072530c20cf1a0622da'
					}
				],
				providers: {
					zapper: 'phuture'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'phuture'
				}
			}
		]
	},
	{
		name: 'Pickle Finance',
		slug: 'pickle',
		links: ['https://pickle.finance', 'https://app.pickle.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'pickle',
					zerionDefiSDK: [
						'Pickle Finance',
						'Pickle Finance • Farms',
						'Pickle Finance • Staking'
					]
				}
			}
		]
	},
	{
		name: 'PieDAO',
		slug: 'pie-dao',
		links: ['https://www.piedao.org'],
		colors: ['#d90a9d', '#9811dc', '#7732f8', '#28d4ff'], // unofficial
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12731/thumb/DeFi_L.png?1602070128',
						chainId: 1,
						address: '0x78f225869c08d478c34e5f645d07a87d3fe8eb78',
						name: 'PieDAO DEFI Large C',
						symbol: 'DEFI+L',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12701/thumb/DefiS.png?1601862595',
						chainId: 1,
						address: '0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c',
						name: 'PieDAO DEFI Small C',
						symbol: 'DEFI+S',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13304/thumb/piedao__.png?1607322674',
						chainId: 1,
						address: '0x8d1ce361eb68e9e05573443c407d4a3bed23b033',
						name: 'PieDAO DEFI	',
						symbol: 'DEFI++',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/10959/thumb/BTC__.png?1586499443',
						chainId: 1,
						address: '0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd',
						name: 'PieDAO BTC	',
						symbol: 'BTC++',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/13572/thumb/YPIE.png?1610437730',
						chainId: 1,
						address: '0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31',
						name: 'PieDAO Yearn Ecosys',
						symbol: 'YPIE',
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/12693/thumb/DOUGH2v.png?1602655308',
						chainId: 1,
						address: '0xad32a8e6220741182940c5abf610bde99e737b2d',
						name: 'PieDAO DOUGH v2',
						symbol: 'DOUGH',
						decimals: 18
					}
				],
				providers: {
					zapper: 'pie-dao',
					zerionDefiSDK: ['PieDAO', 'PieDAO ExperiPies']
				}
			}
		]
	},
	{
		name: 'Pika Protocol',
		slug: 'pika-protocol',
		links: ['https://app.pikaprotocol.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'pika-protocol'
				}
			}
		]
	},
	{
		name: 'Pika Protocol V3',
		slug: 'pika-protocol-v3',
		links: ['https://www.pikaprotocol.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'pika-protocol-v3'
				}
			}
		]
	},
	{
		name: 'Pirex',
		slug: 'pirex',
		links: ['https://pirex.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'pirex'
				}
			}
		]
	},
	{
		name: 'Platypus Finance',
		slug: 'platypus-finance',
		links: ['https://platypus.finance'],
		colors: ['#1c1d26'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0x22d4002028f537599be9f666d1c4fa138522f9c8'
					}
				],
				providers: {
					zapper: 'platypus-finance'
				}
			}
		]
	},
	{
		name: 'Plutus',
		slug: 'plutus',
		links: ['https://plutusdao.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'plutus'
				}
			}
		]
	},
	{
		name: 'Pods',
		slug: 'pods',
		links: ['https://www.pods.finance'],
		colors: ['#b7156b', '#C41857', '#df1d2c'], // https://docs.pods.finance/interfacing-with-pods/brand-assets
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
					theGraph: 'https://api.thegraph.com/subgraphs/name/pods-finance/pods'
				}
			}
		]
	},
	{
		name: 'Polynomial',
		slug: 'polynomial',
		links: ['https://earn.polynomial.fi'],
		colors: ['#fff'],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'polynomial'
				}
			}
		]
	},
	{
		name: 'Polywhale',
		slug: 'polywhale',
		links: ['https://polywhale.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'polywhale'
				}
			}
		]
	},
	{
		name: 'PoolTogether',
		slug: 'pooltogether',
		links: ['https://pooltogether.com'],
		colors: ['#4a31a5'],
		views: [
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: ['#843ff3'],
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'pool-together-v4'
				}
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: ['#843ff3'],
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e'
					}
				],
				providers: {
					zapper: 'pool-together-v4'
				}
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: ['#843ff3'],
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'pool-together-v4'
				}
			},
			{
				name: 'PoolTogether V4',
				slug: 'v4',
				colors: ['#843ff3'],
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'pool-together-v4'
				}
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: ['#843ff3'],
				chainId: 42220,
				erc20Tokens: [],
				providers: {
					zapper: 'pool-together-v3'
				}
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: ['#843ff3'],
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x0cec1a9154ff802e7934fc916ed7ca50bde6844e'
					}
				],
				providers: {
					zapper: 'pool-together-v3',
					zerionDefiSDK: ['PoolTogether V3']
				}
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: ['#843ff3'],
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'pool-together-v3'
				}
			},
			{
				name: 'PoolTogether V3',
				slug: 'v3',
				colors: ['#843ff3'],
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'pool-together-v3'
				}
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16255/thumb/fjRgQUo4_400x400.jpg?1623397960',
						chainId: 1,
						address: '0xd81b1a8b1ad00baa2d6609e0bae28a38713872f7',
						name: 'PoolTogether USDC T',
						symbol: 'PCUSDC',
						decimals: 6
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether',
					zapper: 'pooltogether',
					zerionDefiSDK: ['PoolTogether']
				}
			}
		]
	},
	{
		name: 'Popsicle Finance',
		slug: 'popsicle',
		links: ['https://popsicle.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'popsicle'
				}
			}
		]
	},
	{
		name: 'PowerPool',
		slug: 'powerpool',
		links: ['https://powerpool.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'powerpool'
				}
			}
		]
	},
	{
		name: 'Premia',
		slug: 'premia',
		links: ['https://premia.finance'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'premia'
				}
			},
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'premia'
				}
			}
		]
	},
	{
		name: 'Push',
		slug: 'push',
		links: ['https://push.org', 'https://app.push.org'],
		colors: ['#e20880', '#35c5f3', '#674c9f'],
		views: [
			{
				chainId: 1,
				providers: {
					zapper: 'epns',
					theGraph: 'https://api.thegraph.com/subgraphs/name/epnsproject/epnsprod'
				}
			}
		]
	},
	{
		name: 'Qi Dao',
		slug: 'qi-dao',
		links: ['https://www.mai.finance'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'qi-dao'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'qi-dao'
				}
			},
			{
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'qi-dao'
				}
			},
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'qi-dao'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'qi-dao'
				}
			}
		]
	},
	{
		name: 'QuickSwap',
		slug: 'quickswap',
		links: ['https://quickswap.exchange'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'quickswap'
				}
			}
		]
	},
	{
		name: 'R U Generous',
		slug: 'r-u-generous',
		links: ['https://www.rug.farm'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'r-u-generous'
				}
			}
		]
	},
	{
		name: 'RAILGUN',
		slug: 'railgun',
		links: ['https://railgun.ch'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'railgun'
				}
			}
		]
	},
	{
		name: 'Rally',
		slug: 'rally',
		links: ['https://rally.io'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'rally'
				}
			}
		]
	},
	{
		name: 'Rari Capital',
		slug: 'rari',
		links: ['https://www.rari.capital'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'rari'
				}
			}
		]
	},
	{
		name: 'Rari Capital',
		slug: 'rari',
		links: ['https://rari.capital'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'rari'
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'rari-fuse'
				}
			}
		]
	},
	{
		name: 'Rarible',
		slug: 'rarible',
		links: ['https://rarible.com'],
		colors: ['#FEDA03'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/rarible/protocol'
				}
			}
		]
	},
	{
		name: 'RealT',
		slug: 'realt',
		links: ['https://realt.co'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'realt'
				}
			}
		]
	},
	{
		name: 'Reaper',
		slug: 'reaper',
		links: ['https://www.reaper.farm'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'reaper'
				}
			}
		]
	},
	{
		name: 'Redacted Cartel',
		slug: 'redacted-cartel',
		links: ['https://www.redacted.finance'],
		colors: ['#27A5F2'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'redacted-cartel'
				}
			}
		]
	},
	{
		name: 'Reflexer',
		slug: 'reflexer',
		links: ['https://reflexer.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						chainId: 1,
						address: '0x54735d716995071585a4f6ba341a6ded79756f09',
						name: 'FLUX Token',
						symbol: 'FLX',
						decimals: 18
					}
				],
				providers: {
					zapper: 'reflexer',
					zerionDefiSDK: ['Reflexer']
				}
			}
		]
	},
	{
		name: 'Ren',
		slug: 'ren',
		links: ['https://renproject.io'],
		colors: ['#f5f6f8'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x408e41876cccdc0f92210600ef50372656052a38'
					}
				],
				providers: {
					zapper: 'ren'
				}
			}
		]
	},
	{
		name: 'Revert Finance',
		slug: 'revert-finance',
		links: ['https://revert.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'revert-finance'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'revert-finance'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'revert-finance'
				}
			},
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'revert-finance'
				}
			}
		]
	},
	{
		name: 'Rhino Fi',
		slug: 'rhino-fi',
		links: ['https://rhino.fi'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'rhino-fi'
				}
			}
		]
	},
	{
		name: 'Ribbon',
		slug: 'ribbon',
		links: ['https://www.ribbon.finance', 'https://app.ribbon.finance'],
		views: [
			{
				name: 'Ribbon V2',
				slug: 'v2',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ribbon-v2'
				}
			},
			{
				name: 'Ribbon V2',
				slug: 'v2',
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'ribbon-v2'
				}
			},
			{
				name: 'Ribbon V1',
				slug: 'v1',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'ribbon'
				}
			}
		]
	},
	{
		name: 'Robo Vault',
		slug: 'robo-vault',
		links: ['https://robo-vault.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'robo-vault'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'robo-vault'
				}
			}
		]
	},
	{
		name: 'Rocket Pool',
		slug: 'rocket-pool',
		links: ['https://rocketpool.net'],
		colors: ['#f97516'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'rocket-pool'
				}
			}
		]
	},
	{
		name: 'Rook',
		slug: 'rook',
		links: ['https://www.rook.fi'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'rook'
				}
			}
		]
	},
	{
		name: 'Rubicon',
		slug: 'rubicon',
		links: ['https://app.rubicon.finance'],
		colors: ['#ba2f2a'],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'rubicon'
				}
			}
		]
	},
	{
		name: 'Sablier',
		slug: 'sablier',
		links: ['https://sablier.finance'],
		colors: ['#f77423', '#fbce5b'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sablier',
					theGraph: 'https://api.thegraph.com/subgraphs/name/sablierhq/sablier'
				}
			}
		]
	},
	{
		name: 'Saddle',
		slug: 'saddle',
		links: ['https://saddle.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'saddle',
					zerionDefiSDK: ['Saddle']
				}
			}
		]
	},
	{
		name: 'SashimiSwap',
		slug: 'sashimiswap',
		links: ['https://sashimi.cool'],
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
						decimals: 18
					}
				],
				providers: {
					zerionDefiSDK: ['SashimiSwap']
				}
			}
		]
	},
	{
		name: 'Scarecrow',
		slug: 'scarecrow',
		links: ['https://app.scarecrow.fi'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [
					{
						address: '0x46e1ee17f51c52661d04238f1700c547de3b84a1'
					}
				],
				providers: {
					zapper: 'scarecrow'
				}
			}
		]
	},
	{
		name: 'Scream',
		slug: 'scream',
		links: ['https://scream.sh'],
		colors: [],
		views: [
			{
				name: 'Scream V2',
				slug: 'v2',
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'scream-v2'
				}
			},
			{
				name: 'Scream V1',
				slug: 'v1',
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'scream'
				}
			}
		]
	},
	{
		name: 'S.finance',
		slug: 'sfinance',
		links: ['https://s.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sfinance'
				}
			},
			{
				chainId: 66,
				erc20Tokens: [],
				providers: {
					zapper: 'sfinance'
				}
			}
		]
	},
	{
		name: 'Shapeshift',
		slug: 'shapeshift',
		links: ['https://shapeshift.com/'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'shapeshift'
				}
			}
		]
	},
	{
		name: 'SharedStake',
		slug: 'sharedstake',
		links: ['https://www.sharedstake.org/'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					erc20TokensByContractAddress['0x84810bcf08744d5862b8181f12d17bfd57d3b078'] // SharedStake Governance Token (SGT)
				],
				providers: {
					zapper: 'shared-stake'
				}
			}
		]
	},
	{
		name: 'Shell',
		slug: 'shell',
		links: ['https://www.shellprotocol.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'shell'
				}
			}
		]
	},
	{
		name: 'Single',
		slug: 'single',
		links: ['https://app.singlefinance.io'],
		colors: ['#7480FF'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'single'
				}
			}
		]
	},
	{
		name: 'Smoothy',
		slug: 'smoothy',
		links: ['https://www.smoothy.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'smoothy'
				}
			}
		]
	},
	{
		name: 'Snowball',
		slug: 'snowball',
		links: ['https://snowball.network/'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'snowball'
				}
			}
		]
	},
	{
		name: 'Snowbank',
		slug: 'snowbank',
		links: ['https://www.snowbank.finance'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'snowbank'
				}
			}
		]
	},
	{
		name: 'Snowdog',
		slug: 'snowdog',
		links: ['https://www.snowdogdao.com'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'snowdog'
				}
			}
		]
	},
	{
		name: 'SnowSwap',
		slug: 'snowswap',
		links: ['https://snowswap.org'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'snowswap',
					zerionDefiSDK: ['SnowSwap']
				}
			}
		]
	},
	{
		name: 'Solace',
		slug: 'solace',
		links: ['https://solace.fi'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'solace'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'solace'
				}
			},
			{
				chainId: 1313161554,
				erc20Tokens: [],
				providers: {
					zapper: 'solace'
				}
			}
		]
	},
	{
		name: 'Solarbeam',
		slug: 'solarbeam',
		links: ['https://solarbeam.io'],
		colors: [],
		views: [
			{
				chainId: 1285,
				erc20Tokens: [],
				providers: {
					zapper: 'solarbeam'
				}
			}
		]
	},
	{
		name: 'Solidex',
		slug: 'solidex',
		links: ['https://solidexfinance.com'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'solidex'
				}
			}
		]
	},
	{
		name: 'Solidly',
		slug: 'solidly',
		links: ['https://solidly.exchange'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'solidly'
				}
			}
		]
	},
	{
		name: 'Spartacus',
		slug: 'spartacus',
		links: ['https://app.spartacus.finance'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'spartacus'
				}
			}
		]
	},
	{
		name: 'SpiritSwap',
		slug: 'spiritswap',
		links: ['https://www.spiritswap.finance'],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'spiritswap'
				}
			}
		]
	},
	{
		name: 'SpookySwap',
		slug: 'spookyswap',
		links: ['https://spookyswap.finance'],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'spookyswap'
				}
			}
		]
	},
	{
		name: 'Spool',
		slug: 'spool',
		links: ['https://app.spool.fi'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x40803cea2b2a32bda1be61d3604af6a814e70976'
					}
				],
				providers: {
					zapper: 'spool'
				}
			}
		]
	},
	{
		name: 'Squid',
		slug: 'squid',
		links: ['https://squid.xyz'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'squid'
				}
			}
		]
	},
	{
		name: 'Stake DAO',
		slug: 'stake-dao',
		links: ['https://stakedao.org'],
		colors: ['#7c3aed'], // unofficial
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'stake-dao',
					zerionDefiSDK: ['Stake DAO']
				}
			}
		]
	},
	{
		name: 'Stargate',
		slug: 'stargate',
		links: ['https://stargate.finance'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			},
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'stargate'
				}
			}
		]
	},
	{
		name: 'Steak Hut',
		slug: 'steak-hut',
		links: ['https://www.steakhut.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'steak-hut'
				}
			}
		]
	},
	{
		name: 'Stormswap',
		slug: 'stormswap',
		links: ['https://stormswap.finance'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'stormswap'
				}
			}
		]
	},
	{
		name: 'Streamr',
		slug: 'streamr',
		links: ['https://streamr.network'],
		colors: ['#FF5C00', '#0D009A'], // https://streamr.network/design/#colours
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
						decimals: 18
					}
				]
			}
		]
	},
	{
		name: 'Strongblock',
		slug: 'strongblock',
		links: ['https://strongblock.com'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [
					{
						address: '0x990f341946a3fdb507ae7e52d17851b87168017c'
					}
				],
				providers: {
					zapper: 'strongblock'
				}
			}
		]
	},
	{
		name: 'Strudel Finance',
		slug: 'strudel',
		links: ['https://strudel.finance'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'snowball'
				}
			}
		]
	},
	{
		name: 'Sturdy',
		slug: 'sturdy',
		links: ['https://app.sturdy.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sturdy'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'sturdy'
				}
			}
		]
	},
	{
		name: 'Sudoswap',
		slug: 'sudoswap',
		links: ['https://sudoswap.xyz'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sudoswap'
				}
			}
		]
	},
	{
		// https://docs.superfluid.finance/superfluid/networks/networks
		name: 'Superfluid',
		slug: 'superfluid',
		links: ['https://www.superfluid.finance/home'],
		colors: ['#10BB34', '#12141E'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [
					{
						chainId: 137,
						address: '0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3',
						name: 'Super MATIC',
						symbol: 'MATICx',
						decimals: 18
					},
					{
						chainId: 137,
						address: '0x27e1e4E6BC79D93032abef01025811B7E4727e85',
						name: 'Super WETH (PoS)',
						symbol: 'ETHx',
						decimals: 18
					},
					{
						chainId: 137,
						address: '0xCAa7349CEA390F89641fe306D93591f87595dc1F',
						name: 'Super USDC (PoS)',
						symbol: 'USDCx',
						decimals: 18
					},
					{
						chainId: 137,
						address: '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2',
						name: 'Super DAI (PoS)',
						symbol: 'DAIx',
						decimals: 18
					},
					{
						chainId: 137,
						address: '0x4086eBf75233e8492F1BCDa41C7f2A8288c2fB92',
						name: 'Super WBTC (PoS)',
						symbol: 'WBTCx',
						decimals: 18
					}
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
					zapper: 'superfluid'
				}
			},
			{
				chainId: 100,
				erc20Tokens: [
					{
						chainId: 100,
						address: '0x59988e47A3503AaFaA0368b9deF095c818Fdca01',
						name: 'Super xDAI',
						symbol: 'xDAIx',
						decimals: 18
					}
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
					zapper: 'superfluid'
				}
			}
		]
	},
	{
		name: 'Sushi',
		slug: 'sushi',
		links: ['https://sushi.com'],
		colors: ['#016eda', '#d900c0'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'sushiswap',
					zerionDefiSDK: ['SushiSwap', 'SushiSwap • Staking']
				}
			},
			{
				name: 'Bentobox',
				slug: 'bentobox',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap-bentobox'
				}
			},
			{
				name: 'Kashi',
				slug: 'kashi',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap-kashi'
				}
			},
			{
				slug: 'fantom',
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			},
			{
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			},
			{
				slug: 'polygon',
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			},
			{
				slug: 'heco',
				chainId: 128,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			},
			{
				slug: 'gnosis',
				chainId: 100,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			},
			{
				slug: 'harmony',
				chainId: 1666600000,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			},
			{
				slug: 'avalanche',
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'sushiswap'
				}
			}
		]
	},
	{
		name: 'Swapr',
		slug: 'swapr',
		links: ['https://swapr.eth.link'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'swapr'
				}
			}
		]
	},
	{
		name: 'Swerve',
		slug: 'swerve',
		links: ['https://swerve.fi'],
		colors: ['#86fce7'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'swerve',
					zerionDefiSDK: ['Swerve', 'Swerve • Liquidity Gauges']
				}
			}
		]
	},
	{
		name: 'Symphony',
		slug: 'symphony',
		links: ['https://app.symphony.finance'],
		colors: ['#1f222c'],
		views: [
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'symphony'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'symphony'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'symphony'
				}
			}
		]
	},
	{
		name: 'Synapse',
		slug: 'synapse',
		links: ['https://synapseprotocol.com'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			},
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'synapse'
				}
			}
		]
	},
	{
		name: 'Synlev',
		slug: 'synlev',
		links: ['https://synlev.com'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'synlev'
				}
			}
		]
	},
	{
		name: 'Synthetix',
		colors: ['#00d1ff', '#1e1a31'],
		slug: 'synthetix',
		links: ['https://www.synthetix.io'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/synthetixio-team/synthetix',
					zapper: 'synthetix',
					zerionDefiSDK: ['Synthetix']
				}
			},
			{
				name: 'Synthetix Mintr',
				slug: 'mintr',
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'mintr'
				}
			}
		]
	},
	{
		name: 'Tarot',
		slug: 'tarot',
		links: ['https://www.tarot.to'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'tarot'
				}
			}
		]
	},
	{
		name: 'Tectonic',
		slug: 'tectonic',
		links: ['https://tectonic.finance'],
		colors: ['#000024'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'tectonic'
				}
			}
		]
	},
	{
		name: 'Teddy Cash',
		slug: 'teddy-cash',
		links: ['https://teddy.cash'],
		colors: ['#fff'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'teddy-cash'
				}
			}
		]
	},
	{
		name: 'Tellor',
		slug: 'tellor',
		links: ['https://tellor.io'],
		colors: ['#20f092'],
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
						decimals: 18
					}
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
				]
			}
		]
	},
	{
		name: 'Tempus',
		slug: 'tempus',
		links: ['https://tempus.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'tempus'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'tempus'
				}
			}
		]
	},
	{
		name: 'Tenderize',
		slug: 'tenderize',
		links: ['https://app.tenderize.me'],
		colors: ['#fff'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'tenderize'
				}
			},
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'tenderize'
				}
			}
		]
	},
	{
		name: 'Thales',
		slug: 'thales',
		links: ['https://thalesmarket.io'],
		colors: [],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'thales'
				}
			}
		]
	},
	{
		name: 'The Graph',
		slug: 'the-graph',
		links: ['https://thegraph.com'],
		colors: ['#4ca4ff', '#6f4cff'], // unofficial
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'the-graph'
				}
			}
		]
	},
	{
		name: 'Tokemak',
		slug: 'tokemak',
		links: ['https://www.tokemak.xyz'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'tokemak'
				}
			}
		]
	},
	{
		name: 'Tokenlon',
		slug: 'tokenlon',
		links: ['https://tokenlon.im'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'tokenlon'
				}
			}
		]
	},
	{
		name: 'Tokens',
		slug: 'tokens',
		links: ['https://ethereum.org'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 56,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 42220,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 1666600000,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 137,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			},
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'tokens'
				}
			}
		]
	},
	{
		name: 'TokenSets',
		slug: 'tokensets',
		links: ['https://www.tokensets.com'],
		colors: ['#2D2CE5'/*, '#6BB1FF'*/],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'tokensets',
					zerionDefiSDK: ['TokenSets', 'SetToken V2']
				}
			}
		]
	},
	{
		name: 'Tomb',
		slug: 'tomb',
		links: ['https://tomb.finance'],
		colors: [],
		views: [
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'tomb'
				}
			}
		]
	},
	{
		name: 'Tornado Cash',
		slug: 'tornado-cash',
		links: ['https://tornado.cash'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'tornado-cash'
				}
			}
		]
	},
	{
		name: 'Trader Joe',
		slug: 'trader-joe',
		links: ['https://traderjoexyz.com'],
		colors: ['#ee6662'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd'
					}
				],
				providers: {
					zapper: 'trader-joe'
				}
			},
			{
				name: 'Trader Joe Banker',
				slug: 'banker',
				chainId: 43114,
				erc20Tokens: [
					{
						address: '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd'
					}
				],
				providers: {
					zapper: 'trader-joe-banker'
				}
			}
		]
	},
	{
		name: 'Trisolaris',
		slug: 'trisolaris',
		links: ['https://www.trisolaris.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1313161554,
				erc20Tokens: [],
				providers: {
					zapper: 'trisolaris'
				}
			}
		]
	},
	{
		name: 'Truefi',
		slug: 'truefi',
		links: ['https://truefi.io'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'truefi'
				}
			}
		]
	},
	{
		name: 'Ubeswap',
		slug: 'ubeswap',
		links: ['https://ubeswap.org'],
		colors: ['#a261b6'],
		views: [
			{
				chainId: 42220,
				erc20Tokens: [
					{
						address: '0x00be915b9dcf56a3cbe739d9b9c202ca692409ec'
					}
				],
				providers: {
					zapper: 'ubeswap'
				}
			}
		]
	},
	{
		name: 'UMA',
		slug: 'uma',
		links: ['https://umaproject.org'],
		colors: ['#ff4a4a'],
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
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/umaprotocol/uma'
				}
			}
		]
	},
	{
		name: 'Umami Finance',
		slug: 'umami-finance',
		links: ['https://umami.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'umami-finance'
				}
			}
		]
	},
	{
		// https://umbrella-network.readme.io/docs/umb-token-contracts
		name: 'Umbrella',
		slug: 'umbrella',
		links: ['https://www.umb.network'],
		colors: ['#2B28B7', '#000000'], // #06f398
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
						decimals: 18
					},
					{
						name: 'Umbrella Reward #1',
						address: '0x1b17dbb40fbed8735e7fe8c9eb02c20984fadfd6',
						symbol: 'rUMB1',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/cfengliu/umbrella'
				}
			},
			{
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
				contracts: [
					{
						name: 'Contract Registry',
						address: '0xb2C6c4162c0d2B6963C62A9133331b4D0359AA34',
					},
				]
			}
		]
	},
	{
		name: 'Unagii',
		slug: 'unagii',
		links: ['https://www.unagii.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'unagii'
				}
			}
		]
	},
	{
		name: 'Uniswap',
		slug: 'uniswap',
		links: ['https://uniswap.org', 'https://app.uniswap.org'],
		colors: ['#FC72FF'],
		icon: UniswapIcon,
		views: [
			...UniswapV3.SUPPORTED_CHAIN_IDS.map(chainId => ({
				name: 'Uniswap V3',
				slug: 'v3',
				colors: ['#FC72FF'],
				chainId,
				erc20Tokens: [],
				components: [
					UniswapPage,
				],
				providers: {
					theGraph: UniswapV3Subgraph.subgraphUrls[chainId]?.hosted,
					...chainId === 1 && {
						zapper: 'uniswap-v3',
						zerionDefiSDK: ['Uniswap V3'],
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
				colors: ['#ff007a'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604',
						chainId: 1,
						address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
						name: 'Uniswap',
						symbol: 'UNI',
						decimals: 18
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
					zapper: 'uniswap-v2',
					zerionDefiSDK: ['Uniswap V2']
				}
			},
			{
				name: 'Uniswap V1',
				slug: 'v1',
				colors: ['#DC6BE5'],
				chainId: 1,
				erc20Tokens: [
					// {
					// 	address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
					// }
				],
				providers: {
					zapper: 'uniswap-v1',
					zerionDefiSDK: ['Uniswap V1']
				}
			}
		]
	},
	{
		// https://github.com/unitprotocol/core/blob/master/CONTRACTS.md
		name: 'Unit Protocol',
		slug: 'unit',
		links: ['https://unit.xyz'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/6013/thumb/Pax_Dollar.png?1629877204',
						chainId: 1,
						address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
						name: 'Pax Dollar',
						symbol: 'USDP',
						decimals: 18
					}
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
					zapper: 'unit'
				}
			},
			{
				name: 'Binance Smart Chain',
				slug: 'bsc',
				chainId: 56,
				erc20Tokens: [],
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
					zapper: 'unit'
				}
			}
		]
	},
	{
		name: 'Universe',
		slug: 'universe',
		links: ['https://universe.xyz'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'universe'
				}
			}
		]
	},
	{
		name: 'Upshot',
		slug: 'upshot',
		links: ['https://upshot.io', 'https://app.upshot.io'],
		colors: ['#e44bbe', '#0091ff', '#ff5628'],
		views: [
			{
				name: 'Axie Infinity',
				slug: 'axie-infinity',
				links: ['https://axieinfinity.com/'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/13029/thumb/axie_infinity_logo.png?1604471082',
						chainId: 1,
						address: '0xbb0e17ef65f82ab018d8edd776e8dd940327b28b',
						name: 'Axie Infinity',
						symbol: 'AXS',
						decimals: 18
					}
				],
				nfts: [
					{
						address: '0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d'
					}
				],
				contracts: [
					{
						address: '0xf4985070ce32b6b1994329df787d1acc9a2dd9e2'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-axie-infinity'
				}
			},
			{
				name: 'CryptoKitties',
				slug: 'cryptokitties',
				links: ['https://www.cryptokitties.co'],
				chainId: 1,
				erc20Tokens: [
					{
						icon: 'https://assets.coingecko.com/coins/images/8797/thumb/WCK.png?1561705836',
						chainId: 1,
						address: '0x09fe5f0236f0ea5d930197dce254d77b04128075',
						name: 'Wrapped CryptoKitti',
						symbol: 'WCK',
						decimals: 18
					}
				],
				nfts: [
					{
						address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d'
					}
				],
				contracts: [
					{
						address: '0xb1690c08e213a35ed9bab7b318de14420fb57d8c'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-cryptokitties'
				}
			},
			{
				name: 'CryptoPunks',
				slug: 'cryptopunks',
				links: ['https://www.larvalabs.com/cryptopunks'],
				chainId: 1,
				erc20Tokens: [],
				nfts: [
					{
						address: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-cryptopunks'
				}
			},
			{
				name: 'Known Origin',
				slug: 'known-origin',
				links: ['https://knownorigin.io'],
				chainId: 1,
				erc20Tokens: [],
				nfts: [
					{
						address: '0xfbeef911dc5821886e1dda71586d90ed28174b7d'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-known-origin'
				}
			},
			{
				name: 'SuperRare',
				slug: 'superrare',
				links: ['https://superrare.com'],
				chainId: 1,
				erc20Tokens: [],
				nfts: [
					{
						address: '0x41a322b28d0ff354040e2cbc676f0320d8c8850d'
					}
				],
				providers: {
					theGraph: 'https://api.thegraph.com/subgraphs/name/upshot-tech/nft-analytics-superrare'
				}
			}
		]
	},
	{
		name: 'Vader',
		slug: 'vader',
		links: ['https://www.vaderprotocol.org'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'vader'
				}
			}
		]
	},
	{
		name: 'Value DeFi',
		slug: 'value',
		links: ['https://valuedefi.io'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16253/thumb/Vesper_Token_600.png?1623394697',
						chainId: 1,
						address: '0x677ddbd918637e5f2c79e164d402454de7da8619',
						name: 'Vesper V Dollar',
						symbol: 'VUSD',
						decimals: 18
					}
				],
				providers: {
					zapper: 'value'
				}
			}
		]
	},
	{
		name: 'Vector Finance',
		slug: 'vector-finance',
		links: ['https://vectorfinance.io'],
		colors: ['#fff'],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'vector-finance'
				}
			}
		]
	},
	{
		name: 'Velodrome',
		slug: 'velodrome',
		links: ['https://app.velodrome.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 10,
				erc20Tokens: [],
				providers: {
					zapper: 'velodrome'
				}
			}
		]
	},
	{
		name: 'Venus',
		slug: 'venus',
		links: ['https://www.venus.io'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'venus'
				}
			}
		]
	},
	{
		name: 'Vesper',
		slug: 'vesper',
		links: ['https://vesper.finance'],
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
						decimals: 18
					},
					{
						icon: 'https://assets.coingecko.com/coins/images/16253/thumb/Vesper_Token_600.png?1623394697',
						chainId: 1,
						address: '0x677ddbd918637e5f2c79e164d402454de7da8619',
						name: 'Vesper V Dollar',
						symbol: 'VUSD',
						decimals: 18
					}
				],
				providers: {
					zapper: 'vesper'
				}
			}
		]
	},
	{
		name: 'Vesta Finance',
		slug: 'vesta-finance',
		links: ['https://vestafinance.xyz'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [
					{
						address: '0xa684cd057951541187f288294a1e1c2646aa2d24'
					}
				],
				providers: {
					zapper: 'vesta-finance'
				}
			}
		]
	},
	{
		name: 'Votium',
		slug: 'votium',
		links: ['https://votium.app'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'votium'
				}
			}
		]
	},
	{
		name: 'VVS Finance',
		slug: 'vvs-finance',
		links: ['https://vvs.finance'],
		colors: ['#fff'],
		views: [
			{
				chainId: 25,
				erc20Tokens: [],
				providers: {
					zapper: 'vvs-finance'
				}
			}
		]
	},
	{
		name: 'Waultswap',
		slug: 'waultswap',
		links: ['https://wault.finance'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'waultswap'
				}
			}
		]
	},
	{
		name: 'WePiggy',
		slug: 'wepiggy',
		links: ['https://wepiggy.com'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'wepiggy'
				}
			}
		]
	},
	{
		name: 'Wonderland',
		slug: 'wonderland',
		links: ['https://www.wonderland.money'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'wonderland'
				}
			},
			{
				chainId: 250,
				erc20Tokens: [],
				providers: {
					zapper: 'wonderland'
				}
			}
		]
	},
	{
		name: 'X2Y2',
		slug: 'x2y2',
		links: ['https://x2y2.io'],
		colors: [],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'x2y2'
				}
			}
		]
	},
	{
		name: 'xSigma',
		slug: 'xsigma',
		links: ['https://www.xsigma.fi'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'xsigma'
				}
			}
		]
	},
	{
		name: 'xToken',
		slug: 'xtoken',
		links: ['https://xtoken.market'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'xtoken'
				}
			}
		]
	},
	{
		name: 'Yam Finance',
		slug: 'yam',
		links: ['https://yam.finance'],
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
						decimals: 24
					}
				],
				providers: {
					zapper: 'yam'
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'yam'
				}
			}
		]
	},
	{
		name: 'yAxis',
		slug: 'yaxis',
		links: ['https://www.yaxis.io'],
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
						decimals: 18
					},
					erc20TokensBySymbol['SYAX']
				],
				providers: {
					zapper: 'yaxis'
				}
			}
		]
	},
	{
		name: 'Yearn',
		slug: 'yearn',
		links: ['https://yearn.finance'],
        colors: ['#0273f6', '#075fb9'], // unofficial
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'yearn',
					zerionDefiSDK: [
						'iearn.finance (v2)',
						'iearn.finance (v2/v3)',
						'iearn.finance (v3)',
						'Yearn Token Vaults',
						'yearn.finance • Vaults'
					]
				}
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'yearn',
					zerionDefiSDK: ['ygov.finance (v1)', 'ygov.finance (v2)']
				}
			}
		]
	},
	{
		name: 'Yield Protocol',
		slug: 'yield-protocol',
		links: ['https://app.yieldprotocol.com'],
		colors: ['#fff'],
		views: [
			{
				chainId: 1,
				erc20Tokens: [],
				providers: {
					zapper: 'yield-protocol'
				}
			},
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'yield-protocol'
				}
			}
		]
	},
	{
		name: 'Yield Yak',
		slug: 'yield-yak',
		links: ['https://yieldyak.com'],
		colors: [],
		views: [
			{
				chainId: 43114,
				erc20Tokens: [],
				providers: {
					zapper: 'yield-yak'
				}
			}
		]
	},
	{
		name: 'Zerotwohm',
		slug: 'zerotwohm',
		links: ['https://umami.finance'],
		colors: [],
		views: [
			{
				chainId: 42161,
				erc20Tokens: [],
				providers: {
					zapper: 'zerotwohm'
				}
			}
		]
	},
	{
		name: '0x',
		slug: '0x',
		links: ['https://0x.org'],
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
						decimals: 18
					}
				],
				providers: {
					zapper: 'zero-x',
					zerionDefiSDK: ['0x Staking']
				}
			}
		]
	},
	{
		name: 'Zora',
		slug: 'zora',
		links: ['https://zora.co'],
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
				links: ['https://zora.energy'],
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
				links: ['https://zora.energy'],
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
	}
] // as const


export const web3AppsBySlug = Object.fromEntries(web3Apps.map(web3AppConfig => [web3AppConfig.slug, web3AppConfig]))
export const web3AppsByProviderName = {
	zapper: Object.fromEntries(web3Apps.flatMap(web3AppConfig =>
		web3AppConfig.views.map(view => view.providers?.zapper ? [view.providers.zapper, web3AppConfig] : [])
	)),
	zerionDefiSDK: Object.fromEntries(web3Apps.flatMap(web3AppConfig =>
		web3AppConfig.views.flatMap(view => view.providers?.zerionDefiSDK?.map(name => [name, web3AppConfig]) ?? [])
	))
}


const infrastructureApps = [
	'ipfs',
	'the-graph',
	// 'push',
].map(slug => web3AppsBySlug[slug])

const identityApps = [
	'ens',
	'ceramic',
	'disco',
	'lens',
].map(slug => web3AppsBySlug[slug])

const oracleNetworks = [
	'chainlink',
	'tellor',
	// 'umbrella',
].map(slug => web3AppsBySlug[slug])

const decentralizedExchanges = [
	'uniswap',
	'curve',
	'1inch',
	'balancer',
	// 'kyber',
	'paraswap',
	'sushi',
	'0x'
].map(slug => web3AppsBySlug[slug])

const defiPrimitives = [
	'aave',
	'compound',
	'maker',
	'yearn',
	'synthetix',
	'superfluid',
	// 'uma',
].map(slug => web3AppsBySlug[slug])

const crossChainInfrastructure = [
	'matic',
	'connext',
	'etherspot',
].map(slug => web3AppsBySlug[slug])

const institutionalDefi = [
	'circle',
	'bitgo',
	'nexus-mutual',
].map(slug => web3AppsBySlug[slug])

const creatorApps = [
	'audius',
	'nouns',
	'zora',
	// 'apecoin',
	// 'livepeer',
	// 'rarible',
].map(slug => web3AppsBySlug[slug])

// const collectibleCommunities = [
// 	'apecoin',
// 	'nouns',
// ].map(slug => web3AppsBySlug[slug])

export const web3AppsBySection = [
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
		title: 'Other Apps (Experimental)',
		apps: web3Apps.filter(appConfig => ![
			...infrastructureApps,
			...oracleNetworks,
			...crossChainInfrastructure,
			...defiPrimitives,
			...decentralizedExchanges,
			...institutionalDefi,
			...creatorApps,
			// ...collectibleCommunities
		].includes(appConfig)),
		isFeatured: false
	}
]


import { networksByChainID } from './networks'

export const getWeb3AppSupportedNetworks = (app: Web3AppConfig) => new Set(app.views.map(view => networksByChainID[view.chainId]))
