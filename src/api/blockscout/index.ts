// Types/constants
import type { Ethereum } from '$/data/networks/types'


/**
 * @link https://github.com/blockscout/frontend-configs/tree/main/configs/featured-networks
 */
export const blockscoutFeaturedNetworks = [
	{
		label: 'Arbitrum Blueberry',
		chainId: 88153591557,
		explorerUrl: 'arb-blueberry.gelatoscout.com',
		group: 'Mainnets',
	},
	{
		label: 'ARTIS-Σ1',
		chainId: undefined,
		explorerUrl: 'blockscout.com/artis/sigma1',
		group: 'Other',
	},
	{
		label: 'Astar (EVM)',
		chainId: 592,
		explorerUrl: 'astar.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Astar (Subscan)',
		chainId: undefined,
		explorerUrl: 'astar.subscan.io',
		group: 'Mainnets',
	},
	{
		label: 'Astar zkEVM',
		chainId: undefined,
		explorerUrl: 'astar-zkevm.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Astar zKyoto',
		chainId: undefined,
		explorerUrl: 'astar-zkyoto.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Base Chain',
		chainId: 8453,
		explorerUrl: 'base.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Base Göerli',
		chainId: 84531,
		explorerUrl: 'base-goerli.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Base Sepolia',
		chainId: 84532,
		explorerUrl: 'base-sepolia.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Blackfort',
		chainId: 4999,
		explorerUrl: 'blackfort.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blackfort Testnet',
		chainId: 4777,
		explorerUrl: 'blackfort-testnet.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blast',
		chainId: 81457,
		explorerUrl: 'blast.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blast Testnet',
		chainId: 168587773,
		explorerUrl: 'blast-testnet.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blockscout Athens-3 Explorer',
		chainId: 7001,
		explorerUrl: 'zetachain-athens-3.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'CDK Stavanger',
		chainId: 686669576,
		explorerUrl: 'polygon-cdk-stavanger.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Creditcoin Devnet',
		chainId: 102032,
		explorerUrl: 'creditcoin-devnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Creditcoin Testnet',
		chainId: 102031,
		explorerUrl: 'creditcoin-testnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'ETC Mordor',
		chainId: 63,
		explorerUrl: 'etc-mordor.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Ethereum',
		chainId: 1,
		explorerUrl: 'eth.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Ethereum Classic',
		chainId: 61,
		explorerUrl: 'etc.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Etherlink',
		chainId: 42793,
		explorerUrl: 'explorer.etherlink.com',
		group: 'Mainnets',
	},
	{
		label: 'Etherlink Testnet',
		chainId: 128123,
		explorerUrl: 'testnet-explorer.etherlink.com',
		group: 'Mainnets',
	},
	{
		label: 'Fuse',
		chainId: 122,
		explorerUrl: 'explorer.fuse.io',
		group: 'Mainnets',
	},
	{
		label: 'Garnet Testnet',
		chainId: 17069,
		explorerUrl: 'explorer.garnetchain.com',
		group: 'Testnets',
	},
	{
		label: 'Gnosis Chain',
		chainId: 100,
		explorerUrl: 'gnosis.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Gnosis Chain Chiado',
		chainId: 10200,
		explorerUrl: 'gnosis-chiado.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Goerli',
		chainId: 5,
		explorerUrl: 'eth-goerli.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Holesky',
		chainId: 17000,
		explorerUrl: 'eth-holesky.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Immutable',
		chainId: 13371,
		explorerUrl: 'explorer.immutable.com',
		group: 'Mainnets',
	},
	{
		label: 'Immutable Testnet',
		chainId: 13473,
		explorerUrl: 'explorer.testnet.immutable.com',
		group: 'Testnets',
	},
	{
		label: 'IOTA EVM Mainnet',
		chainId: 8822,
		explorerUrl: 'explorer.evm.iota.org',
		group: 'Mainnets',
	},
	{
		label: 'IOTA EVM Testnet',
		chainId: 1075,
		explorerUrl: 'explorer.evm.testnet.iotaledger.net',
		group: 'Testnets',
	},
	{
		label: 'IOTA L1 Mainnet',
		chainId: undefined,
		explorerUrl: 'explorer.iota.org',
		group: 'Mainnets',
	},
	{
		label: 'IOTA L1 testnet',
		chainId: undefined,
		explorerUrl: 'explorer.iota.org/iota-testnet',
		group: 'Testnets',
	},
	{
		label: 'Kusama',
		chainId: undefined,
		explorerUrl: 'kusama.subscan.io',
		group: 'Other',
	},
	{
		label: 'LightLink Pegasus',
		chainId: undefined,
		explorerUrl: 'pegasus.lightlink.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'LightLink Phoenix',
		chainId: undefined,
		explorerUrl: 'phoenix.lightlink.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Lisk Mainnet',
		chainId: 1135,
		explorerUrl: 'blockscout.lisk.com',
		group: 'Mainnets',
	},
	{
		label: 'Lisk Sepolia Testnet',
		chainId: 4202,
		explorerUrl: 'sepolia-blockscout.lisk.com',
		group: 'Mainnets',
	},
	{
		label: 'LUKSO L14',
		chainId: undefined,
		explorerUrl: 'blockscout.com/lukso/l14',
		group: 'Other',
	},
	{
		label: 'Neon',
		chainId: 245022934,
		explorerUrl: 'neon.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Neon Devnet',
		chainId: 245022926,
		explorerUrl: 'neon-devnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Neon Mainnet',
		chainId: 245022934,
		explorerUrl: 'neon.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Official testnet explorer',
		chainId: undefined,
		explorerUrl: 'explorer.zetachain.com',
		group: 'Testnets',
	},
	{
		label: 'Omni Testnet',
		chainId: 165,
		explorerUrl: 'omni-testnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Omni X-Explorer',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.omni.network',
		group: 'Testnets',
	},
	{
		label: 'OP Celestia Raspberry',
		chainId: 123420111,
		explorerUrl: 'opcelestia-raspberry.gelatoscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Optimism',
		chainId: 10,
		explorerUrl: 'optimism.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Optimism Bedrock Beta',
		chainId: undefined,
		explorerUrl: 'blockscout.com/optimism/bedrock-beta',
		group: 'Testnets',
	},
	{
		label: 'Optimism Goerli',
		chainId: 420,
		explorerUrl: 'optimism-goerli.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Optimism Opcraft',
		chainId: undefined,
		explorerUrl: 'blockscout.com/optimism/opcraft',
		group: 'Other',
	},
	{
		label: 'Optimism Sepolia',
		chainId: 11155420,
		explorerUrl: 'optimism-sepolia.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Pegasus Testnet',
		chainId: 1891,
		explorerUrl: 'pegasus.lightlink.io',
		group: 'Testnets',
	},
	{
		label: 'Phoenix Mainnet',
		chainId: 1890,
		explorerUrl: 'phoenix.lightlink.io',
		group: 'Mainnets',
	},
	{
		label: 'Playblock',
		chainId: 1829,
		explorerUrl: 'explorer.playblock.io',
		group: 'Mainnets',
	},
	{
		label: 'Playnance',
		chainId: undefined,
		explorerUrl: 'playnance.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'POA',
		chainId: undefined,
		explorerUrl: 'blockscout.com/poa/core',
		group: 'Other',
	},
	{
		label: 'POA Sokol',
		chainId: undefined,
		explorerUrl: 'blockscout.com/poa/sokol',
		group: 'Other',
	},
	{
		label: 'Polkadot',
		chainId: undefined,
		explorerUrl: 'polkadot.subscan.io',
		group: 'Other',
	},
	{
		label: 'Polygon',
		chainId: 137,
		explorerUrl: 'polygon.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Polygon Blackberry',
		chainId: 94204209,
		explorerUrl: 'polygon-blackberry.gelatoscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Puppynet Testnet',
		chainId: 157,
		explorerUrl: 'puppyscan.shib.io',
		group: 'Testnets',
	},
	{
		label: 're.al',
		chainId: 111188,
		explorerUrl: 'explorer.re.al',
		group: 'Mainnets',
	},
	{
		label: 'Redstone',
		chainId: 690,
		explorerUrl: 'explorer.redstone.xyz',
		group: 'Mainnets',
	},
	{
		label: 'Reya Cronos',
		chainId: 89346162,
		explorerUrl: 'reya-cronos.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Reya Mainnet',
		chainId: 1729,
		explorerUrl: 'explorer.reya.network',
		group: 'Mainnets',
	},
	{
		label: 'Rootstock Mainnet',
		chainId: 30,
		explorerUrl: 'rootstock.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Rootstock Testnet',
		chainId: 31,
		explorerUrl: 'rootstock-testnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'RSK',
		chainId: undefined,
		explorerUrl: 'blockscout.com/rsk/mainnet',
		group: 'Mainnets',
	},
	{
		label: 'Sepolia',
		chainId: 11155111,
		explorerUrl: 'eth-sepolia.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Shibarium',
		chainId: undefined,
		explorerUrl: 'shibariumscan.io',
		group: 'Mainnets',
	},
	{
		label: 'Shibuya (EVM)',
		chainId: 81,
		explorerUrl: 'shibuya.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Shibuya (Subscan)',
		chainId: undefined,
		explorerUrl: 'shibuya.subscan.io',
		group: 'Testnets',
	},
	{
		label: 'Shiden (EVM)',
		chainId: 336,
		explorerUrl: 'shiden.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Shiden (Subscan)',
		chainId: undefined,
		explorerUrl: 'shiden.subscan.io',
		group: 'Mainnets',
	},
	{
		label: 'Shimmer EVM',
		chainId: 148,
		explorerUrl: 'explorer.evm.shimmer.network',
		group: 'Mainnets',
	},
	{
		label: 'Shimmer EVM Testnet',
		chainId: 1073,
		explorerUrl: 'explorer.evm.testnet.shimmer.network',
		group: 'Testnets',
	},
	{
		label: 'Shimmer L1 Mainnet',
		chainId: undefined,
		explorerUrl: 'explorer.shimmer.network/shimmer',
		group: 'Mainnets',
	},
	{
		label: 'Shimmer L1 Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.shimmer.network/testnet',
		group: 'Testnets',
	},
	{
		label: 'Spark',
		chainId: 123,
		explorerUrl: 'explorer.fusespark.io',
		group: 'Testnets',
	},
	{
		label: 'Stability',
		chainId: 101010,
		explorerUrl: 'stability.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Stability Testnet',
		chainId: 20180427,
		explorerUrl: 'stability-testnet.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Unreal',
		chainId: 18233,
		explorerUrl: 'unreal.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'ZetaChain Mainnet',
		chainId: undefined,
		explorerUrl: 'zetachain.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'ZetaChain testnet',
		chainId: 7001,
		explorerUrl: 'zetachain-athens-3.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'zkEVM',
		chainId: 1101,
		explorerUrl: 'zkevm.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'zkSync',
		chainId: 324,
		explorerUrl: 'zksync.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'zkSync Sepolia',
		chainId: 300,
		explorerUrl: 'zksync-sepolia.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Zora',
		chainId: 7777777,
		explorerUrl: 'explorer.zora.energy',
		group: 'Mainnets',
	},
	{
		label: 'Zora Sepolia',
		chainId: 999999999,
		explorerUrl: 'sepolia.explorer.zora.energy',
		group: 'Testnets',
	},
] as const satisfies {
	label: string,
	chainId?: Ethereum.ChainId,
	explorerUrl: string,
	group?: string,
}[]


/**
 * @link https://www.blockscout.com/chains-and-projects
 */
export const blockscoutProjects = [
	{
		label: '5dax',
		chainId: undefined,
		explorerUrl: 'scan.5dax.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Acala',
		chainId: undefined,
		explorerUrl: 'blockscout.acala.network',
		host: 'Self-hosted',
		ecosystem: 'Polkadot',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Adil Chain',
		chainId: undefined,
		explorerUrl: '.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Aevo',
		chainId: 2999,
		explorerUrl: 'explorer.aevo.xyz',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Aevo Testnet',
		chainId: 11155112,
		explorerUrl: 'explorer-testnet.aevo.xyz',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Aleph Zero Testnet',
		chainId: 2039,
		explorerUrl: 'aleph-zero.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'AlienX',
		chainId: 10241025,
		explorerUrl: 'hal.explorer.caldera.xyz',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Align',
		chainId: undefined,
		explorerUrl: 'v2.explorer.align.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Allo',
		chainId: undefined,
		explorerUrl: 'explorer.allo.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethererum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Alltra',
		chainId: undefined,
		explorerUrl: 'alltra.global',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Alvey Chain',
		chainId: undefined,
		explorerUrl: 'alveyscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'AmazeToken Mainnet',
		chainId: undefined,
		explorerUrl: 'amazechain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'AmazeToken Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.amazechain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'AME Chain',
		chainId: undefined,
		explorerUrl: 'www.blockscout.com/amescan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Amino X',
		chainId: undefined,
		explorerUrl: 'aminox.blockscout.alphacarbon.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Amino X Testnet',
		chainId: undefined,
		explorerUrl: 'aminoxtestnet.blockscout.alphacarbon.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ammer',
		chainId: 1337,
		explorerUrl: 'explorer.ammer.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ancient8 Celestia Testnet',
		chainId: 28122024,
		explorerUrl: 'scanv2-testnet.ancient8.gg',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Ancient8 Mainnet',
		chainId: 888888888,
		explorerUrl: 'scan.ancient8.gg',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Ancient8 Testnet',
		chainId: 2863311531,
		explorerUrl: 'testnet.a8scan.io',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Ankr',
		chainId: undefined,
		explorerUrl: 'testnetscan.ankr.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Antimatter B2',
		chainId: undefined,
		explorerUrl: 'b2-explorer.antimatter.finance',
		host: 'Self-hosted',
		ecosystem: 'Binance Smart Chain',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Arbitrum Nova',
		chainId: undefined,
		explorerUrl: 'nova-explorer.arbitrum.io',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Arbitrum One Nitro',
		chainId: 42161,
		explorerUrl: 'arbitrum.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Arbitrum Sepolia Testnet',
		chainId: undefined,
		explorerUrl: 'sepolia-explorer.arbitrum.io',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Arise',
		chainId: undefined,
		explorerUrl: 'star-inno-scan-sit.arisetech.dev',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Artela',
		chainId: 11822,
		explorerUrl: 'betanet-scan.artela.network',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Arthera',
		chainId: undefined,
		explorerUrl: 'explorer-test.arthera.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Astar',
		chainId: 592,
		explorerUrl: 'astar.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Polkadot',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Astar Shibuya',
		chainId: 81,
		explorerUrl: 'shibuya.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Polkadot',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Astar zkEVM',
		chainId: undefined,
		explorerUrl: 'astar-zkevm.explorer.startale.com',
		host: 'Gelato RaaS',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'zk Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Astar zKyoto',
		chainId: undefined,
		explorerUrl: 'zkyoto.explorer.startale.com',
		host: 'Gelato RaaS',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'Auna',
		chainId: undefined,
		explorerUrl: '90249000-0-bcs-blockscout.aunablockchain.cl',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Aurora',
		chainId: 1313161554,
		explorerUrl: 'explorer.mainnet.aurora.dev',
		host: 'Self-hosted',
		ecosystem: 'Near',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Automata',
		chainId: undefined,
		explorerUrl: 'explorer.ata.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Autonity Bakerloo',
		chainId: 65010002,
		explorerUrl: 'bakerloo.autonity.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Autonity Piccadilly',
		chainId: 65100002,
		explorerUrl: 'piccadilly.autonity.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Aves Network',
		chainId: 33333,
		explorerUrl: 'avescan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Avive Sepolia Testnet',
		chainId: undefined,
		explorerUrl: 'sepolia.avive.world',
		host: 'Altlayer',
		ecosystem: 'Arbitrum',
		tags: [
			'L3',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Axiomesh',
		chainId: undefined,
		explorerUrl: 'scan.gemini.axiomesh.io/home',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Bahamut',
		chainId: undefined,
		explorerUrl: 'www.ftnscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bahamut',
		chainId: undefined,
		explorerUrl: 'ftnscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bahamut Ocean Testnet',
		chainId: 4058,
		explorerUrl: 'ocean.ftnscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Base',
		chainId: 8453,
		explorerUrl: 'base.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Base Sepolia',
		chainId: 84532,
		explorerUrl: 'base-sepolia.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'BChain',
		chainId: undefined,
		explorerUrl: 'bficscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'BenSwap',
		chainId: undefined,
		explorerUrl: 'smartscout.cash',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'BEVM',
		chainId: undefined,
		explorerUrl: 'scan-canary.bevm.io',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Bidao Smart Chain',
		chainId: undefined,
		explorerUrl: '.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'BiFrost Network',
		chainId: undefined,
		explorerUrl: 'explorer.mainnet.bifrostnetwork.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Bit Rock',
		chainId: 7171,
		explorerUrl: 'explorer.bit-rock.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bit Rock Testnet',
		chainId: 7771,
		explorerUrl: 'testnetscan.bit-rock.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Bitcoin EVM',
		chainId: undefined,
		explorerUrl: 'explorer.bitcoinevm.com',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bitgert',
		chainId: undefined,
		explorerUrl: 'brisescan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bitica',
		chainId: undefined,
		explorerUrl: 'biticablockchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bitkub',
		chainId: undefined,
		explorerUrl: 'www.bkcscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bitkub',
		chainId: undefined,
		explorerUrl: 'www.bkcscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1'
		],
	},
	{
		label: 'bitlambda',
		chainId: 31692,
		explorerUrl: 'blockscan.bitlambda.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Bitrock Blockchain',
		chainId: 7171,
		explorerUrl: 'explorer.bit-rock.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Biz Smart Chain Testnet',
		chainId: 808080,
		explorerUrl: 'testnet.btscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Blackfort',
		chainId: 4999,
		explorerUrl: 'blackfort.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Blackfort testnet',
		chainId: 4777,
		explorerUrl: 'blackfort-testnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Blast',
		chainId: 81457,
		explorerUrl: 'blast.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Blast Sepolia Testnet',
		chainId: 168587773,
		explorerUrl: 'blast-testnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Blockwell',
		chainId: undefined,
		explorerUrl: 'explorer.firechain.blockwell.ai',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'BlockX Atlantis',
		chainId: undefined,
		explorerUrl: 'explorer.blockxnet.com',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Bloxberg',
		chainId: undefined,
		explorerUrl: 'blockexplorer.bloxberg.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Botanix',
		chainId: undefined,
		explorerUrl: 'blockscout.botanixlabs.dev',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'BPX Chain',
		chainId: undefined,
		explorerUrl: 'explorer.mainnet.bpxchain.cc',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'BRC Chain',
		chainId: undefined,
		explorerUrl: 'scan.brcchain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'BTS Holdings',
		chainId: undefined,
		explorerUrl: 'btsscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Bubs',
		chainId: undefined,
		explorerUrl: '.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Callisto',
		chainId: undefined,
		explorerUrl: 'explorer.callisto.network',
		host: 'Self-hosted',
		ecosystem: 'Callisto',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Camelark',
		chainId: undefined,
		explorerUrl: 'scan.camelark.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Canto',
		chainId: undefined,
		explorerUrl: 'tuber.build',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Canxiom',
		chainId: undefined,
		explorerUrl: 'explorer.canxium.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Canxiom',
		chainId: undefined,
		explorerUrl: 'cerium-explorer.canxium.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'CaoTianChain',
		chainId: undefined,
		explorerUrl: 'ctblock.cn',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'capx',
		chainId: undefined,
		explorerUrl: 'capxscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'Care.Chain',
		chainId: undefined,
		explorerUrl: 'explorer.carechain.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Celo',
		chainId: undefined,
		explorerUrl: 'explorer.celo.org/mainnet',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Celo Alphajores',
		chainId: undefined,
		explorerUrl: 'explorer.celo.org/alfajores',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Celo Baklava',
		chainId: undefined,
		explorerUrl: 'explorer.celo.org/baklava',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Chainers',
		chainId: 2145,
		explorerUrl: 'explorer.chainers.io',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Chiliz',
		chainId: undefined,
		explorerUrl: 'explorer.chiliz.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Chuangzhen',
		chainId: undefined,
		explorerUrl: 'czchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Clique',
		chainId: 8853,
		explorerUrl: 'explorer.myclique.io',
		host: 'Conduit',
		ecosystem: 'Base',
		tags: [
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Cloudwalk',
		chainId: undefined,
		explorerUrl: 'explorer.devnet.cloudwalk.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'CLV',
		chainId: undefined,
		explorerUrl: 'clvscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'CONET',
		chainId: undefined,
		explorerUrl: 'scan.conet.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Connext Testnet',
		chainId: 6398,
		explorerUrl: 'connext-sepolia.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'CosVM',
		chainId: undefined,
		explorerUrl: 'explorer.cosvm.net',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Credit Smart Chain',
		chainId: undefined,
		explorerUrl: 'scan.creditsmartchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Creditcoin testnet',
		chainId: 102031,
		explorerUrl: 'creditcoin-testnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Cronos',
		chainId: undefined,
		explorerUrl: 'cronos.org/explorer',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Crossbell',
		chainId: undefined,
		explorerUrl: 'scan.crossbell.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Cryptnic',
		chainId: undefined,
		explorerUrl: 'explorer.cryptnic.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Crypto TEX',
		chainId: undefined,
		explorerUrl: 'ctexscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Crystaleum',
		chainId: undefined,
		explorerUrl: 'view.crystaleum.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'CUN',
		chainId: undefined,
		explorerUrl: 'scan.coopunion.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Dao Finance',
		chainId: undefined,
		explorerUrl: 'scan.daofinance.me',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Debank Sepolia Testnet',
		chainId: undefined,
		explorerUrl: 'sepolia-explorer.testnet.debank.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'DeeLance Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.deelance.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Degen',
		chainId: 666666666,
		explorerUrl: 'explorer.degen.tips',
		host: 'Conduit',
		ecosystem: 'Arbitrum',
		tags: [
			'Mainnet',
			'L3'
		],
	},
	{
		label: 'DODO Chain',
		chainId: undefined,
		explorerUrl: 'testnet-scan.dodochain.com',
		host: 'Altlayer',
		ecosystem: 'Arbitrum',
		tags: [
			'L3',
			'Testnet'
		],
	},
	{
		label: 'Dogechain',
		chainId: undefined,
		explorerUrl: 'explorer.dogechain.dog',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Dogechain Testnet',
		chainId: undefined,
		explorerUrl: 'explorer-testnet.dogechain.dog',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Doorgod',
		chainId: undefined,
		explorerUrl: 'explorer.emerald.oasis.doorgod.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Doric',
		chainId: undefined,
		explorerUrl: 'explorer.doric.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'DOS',
		chainId: 7979,
		explorerUrl: 'doscan.io',
		host: 'Self-hosted',
		ecosystem: 'Avalanche',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'DreyerX',
		chainId: 23452,
		explorerUrl: 'scan.dreyerx.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'DxD Scan',
		chainId: undefined,
		explorerUrl: 'dxdscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Eagle Network',
		chainId: undefined,
		explorerUrl: 'egonscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'ECLAT SmartChain',
		chainId: undefined,
		explorerUrl: 'eclatscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ecrox',
		chainId: undefined,
		explorerUrl: 'ecroxscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ecrox Testnet',
		chainId: undefined,
		explorerUrl: 'testnet-explorer.ecroxscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Testnet'
		],
	},
	{
		label: 'edeXa',
		chainId: 1995,
		explorerUrl: 'explorer.testnet.edexa.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Edgeware',
		chainId: 2021,
		explorerUrl: 'edgscan.live',
		host: 'Self-hosted',
		ecosystem: 'Polkadot',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ekta',
		chainId: undefined,
		explorerUrl: 'ektascan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Elastos',
		chainId: undefined,
		explorerUrl: 'eth.elastos.io',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Elhereum Network',
		chainId: undefined,
		explorerUrl: 'explorer.elhereum.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Eluv',
		chainId: undefined,
		explorerUrl: 'exp.contentfabric.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Energi',
		chainId: undefined,
		explorerUrl: 'explorer.energi.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Energy Web',
		chainId: undefined,
		explorerUrl: 'explorer.energyweb.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Energy Web Volta',
		chainId: undefined,
		explorerUrl: 'volta-explorer.energyweb.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Ephemery Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.ephemery.dev',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'EraSwap',
		chainId: undefined,
		explorerUrl: 'eraswap.info',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ethereum',
		chainId: 1,
		explorerUrl: 'eth.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ethereum Classic',
		chainId: 61,
		explorerUrl: 'etc.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ethereum Classic Mordor',
		chainId: 63,
		explorerUrl: 'etc-mordor.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Ethereum Göerli',
		chainId: 5,
		explorerUrl: 'eth-goerli.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Ethereum Sepolia',
		chainId: 11155111,
		explorerUrl: 'eth-sepolia.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Ethergem',
		chainId: undefined,
		explorerUrl: 'blockscout.egem.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Etherlink',
		chainId: 42793,
		explorerUrl: 'explorer.etherlink.com',
		host: 'Blockscout',
		ecosystem: 'Tezos',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Etherlink Testnet',
		chainId: 128123,
		explorerUrl: 'testnet-explorer.etherlink.com',
		host: 'Blockscout',
		ecosystem: 'Tezos',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Etherlite',
		chainId: undefined,
		explorerUrl: 'explorer.etherlite.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Etho',
		chainId: undefined,
		explorerUrl: 'explorer.ethoprotocol.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Exosama',
		chainId: undefined,
		explorerUrl: 'explorer.exosama.com',
		host: 'Self-hosted',
		ecosystem: 'Polkadot',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Fhenix',
		chainId: undefined,
		explorerUrl: 'demoexplorer.fhenix.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Filecoin Virtual Machine',
		chainId: 314,
		explorerUrl: 'filecoin.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Filecoin',
		tags: [
			'Mainnet',
			'L1'
		],
	},
	{
		label: 'Findora',
		chainId: undefined,
		explorerUrl: 'evm.findorascan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Flare Network',
		chainId: undefined,
		explorerUrl: 'flare-explorer.flare.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Flare Network Coston',
		chainId: undefined,
		explorerUrl: 'coston-explorer.flare.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Flare Network Coston2',
		chainId: undefined,
		explorerUrl: 'coston2-explorer.flare.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Flare Network Songbird Canary',
		chainId: undefined,
		explorerUrl: 'songbird-explorer.flare.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Flare Networks',
		chainId: undefined,
		explorerUrl: 'flare-explorer.flare.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Flashbots',
		chainId: undefined,
		explorerUrl: 'explorer.rigil.suave.flashbots.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Testnet'
		],
	},
	{
		label: 'Flexidao',
		chainId: undefined,
		explorerUrl: 'explorer.google.flexidao.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1'
		],
	},
	{
		label: 'Fortress Chain',
		chainId: 372,
		explorerUrl: 'explorer.fortresschain.finance',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Frax',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.frax.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Fuse',
		chainId: 122,
		explorerUrl: 'explorer.fuse.io',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Fuse Sparknet',
		chainId: 123,
		explorerUrl: 'explorer.fusespark.io',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Future Finance',
		chainId: undefined,
		explorerUrl: 'fufiscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Fvidi',
		chainId: undefined,
		explorerUrl: 'scan.fvidi.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Gameswift',
		chainId: 10888,
		explorerUrl: 'testnet.gameswift.io',
		host: 'Gelato RaaS',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'zk Rollup'
		],
	},
	{
		label: 'Gauss',
		chainId: undefined,
		explorerUrl: 'explorer.gaussgang.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'GDCC',
		chainId: undefined,
		explorerUrl: 'www.gdccscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Gnosis',
		chainId: 100,
		explorerUrl: 'gnosis.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Gnosis',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Gnosis Chiado Testnet',
		chainId: 100,
		explorerUrl: 'gnosis.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Gnosis',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Gold',
		chainId: 4653,
		explorerUrl: 'explorer.gold.dev',
		host: 'Conduit',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'GoldXchain',
		chainId: undefined,
		explorerUrl: 'testnet-explorer.goldxchain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'GoldXchain',
		chainId: undefined,
		explorerUrl: 'explorer.goldxchain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'GON',
		chainId: undefined,
		explorerUrl: 'gonscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'GroveCoin',
		chainId: undefined,
		explorerUrl: 'grvscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'HAP',
		chainId: undefined,
		explorerUrl: 'blockscout.hap.land',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'HAQQ',
		chainId: undefined,
		explorerUrl: 'explorer.haqq.network',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'HAQQ Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.testedge2.haqq.network',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Haven1',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.haven1.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Hexapod',
		chainId: undefined,
		explorerUrl: 'blockscout.dragonfly.hexapod.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Hexapod Dragonfly',
		chainId: undefined,
		explorerUrl: 'blockscout.dragonfly.hexapod.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2'
		],
	},
	{
		label: 'Hexapod Mantis',
		chainId: undefined,
		explorerUrl: 'blockscout.mantis.hexapod.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Holesky',
		chainId: 17000,
		explorerUrl: 'eth-holesky.blockscout.com',
		host: 'Blockscout',
		ecosystem: '',
		tags: [
			'L1'
		],
	},
	{
		label: 'Horizen Eon',
		chainId: undefined,
		explorerUrl: 'eon-explorer.horizenlabs.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Hydra Chain',
		chainId: undefined,
		explorerUrl: 'hydragon.hydrachain.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Hydradx',
		chainId: undefined,
		explorerUrl: 'explorer.evm.hydration.cloud',
		host: 'Self-hosted',
		ecosystem: 'Polkadot',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Hypr',
		chainId: undefined,
		explorerUrl: 'explorer.hypr.network',
		host: 'Conduit',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'zk Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Hypr Testnet',
		chainId: undefined,
		explorerUrl: 'testnet-blockscout.hypr.network',
		host: 'Conduit',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'IDChain',
		chainId: undefined,
		explorerUrl: 'explorer.idchain.one',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'iExec',
		chainId: undefined,
		explorerUrl: 'blockscout.bellecour.iex.ec',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Immutable zkEVM',
		chainId: undefined,
		explorerUrl: 'explorer.immutable.com',
		host: 'Blockscout',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'zk Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Immutable zkEVM Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.immutable.com',
		host: 'Blockscout',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'INT',
		chainId: undefined,
		explorerUrl: 'blockscout.explorer.intchain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'IOTA EVM',
		chainId: undefined,
		explorerUrl: 'explorer.evm.iota.org',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'IOTA EVM testnet',
		chainId: 1075,
		explorerUrl: 'explorer.evm.testnet.iotaledger.net',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'iTachyons Mainnet',
		chainId: undefined,
		explorerUrl: 'tacscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'iTachyons Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.tacscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'J20',
		chainId: undefined,
		explorerUrl: 'exp.j2o.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Japan Open Chain',
		chainId: undefined,
		explorerUrl: 'explorer.japanopenchain.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Japan Open Chain Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.japanopenchain.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'JBC Blockchain',
		chainId: 8899,
		explorerUrl: 'exp-l1-ng.jibchain.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Kalycoin',
		chainId: 3888,
		explorerUrl: 'kalyscan.io',
		host: 'Self-hosted',
		ecosystem: 'Binance',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Kardiachain',
		chainId: undefined,
		explorerUrl: 'explorer.kardiachain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Karura',
		chainId: undefined,
		explorerUrl: 'blockscout.karura.network',
		host: 'Self-hosted',
		ecosystem: 'Polkadot',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Kava Chain',
		chainId: undefined,
		explorerUrl: 'testnet.kavascan.com',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'KBC',
		chainId: undefined,
		explorerUrl: 'scan.kbcfoundation.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'KeeeX',
		chainId: undefined,
		explorerUrl: 'blk.keeex.me',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1'
		],
	},
	{
		label: 'KeK Chain',
		chainId: undefined,
		explorerUrl: 'mainnet-explorer.kekchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'KeK Chain',
		chainId: undefined,
		explorerUrl: 'testnet-explorer.kekchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Kinto',
		chainId: 7887,
		explorerUrl: 'explorer.kinto.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Kroma',
		chainId: undefined,
		explorerUrl: 'blockscout.kroma.network',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Kroma Sepolia',
		chainId: undefined,
		explorerUrl: 'blockscout.sepolia.kroma.network',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Kronobit',
		chainId: undefined,
		explorerUrl: 'explorer.qbitscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'KuCoin CC',
		chainId: undefined,
		explorerUrl: 'scan.kcc.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'LACChain Testnet',
		chainId: undefined,
		explorerUrl: 'blockscout.openprotestnet.lac-net.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'LACNet',
		chainId: undefined,
		explorerUrl: 'explorer.lacnet.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Lambda',
		chainId: undefined,
		explorerUrl: 'explorer.lambda.im',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Latest Chain',
		chainId: undefined,
		explorerUrl: 'scan.latestchain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Layer Edge',
		chainId: undefined,
		explorerUrl: 'testnet-explorer.layeredge.io',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Libex',
		chainId: undefined,
		explorerUrl: 'explorer.libex.ai',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Lif3',
		chainId: 8869,
		explorerUrl: 'lif3scout.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Lightlink',
		chainId: 1890,
		explorerUrl: 'phoenix.lightlink.io',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Lightlink Testnet',
		chainId: 1891,
		explorerUrl: 'pegasus.lightlink.io',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'Testnet',
			'L2'
		],
	},
	{
		label: 'Linea',
		chainId: 59144,
		explorerUrl: 'explorer.linea.build',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet',
			'zk Rollup'
		],
	},
	{
		label: 'Linea',
		chainId: undefined,
		explorerUrl: 'explorer.goerli.linea.build',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet',
			'zk Rollup'
		],
	},
	{
		label: 'LiquiChain',
		chainId: undefined,
		explorerUrl: 'testnet.liquichain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Lisk',
		chainId: 1135,
		explorerUrl: 'blockscout.lisk.com',
		host: 'Gelato RaaS',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Lisk Sepolia Testnet',
		chainId: 4202,
		explorerUrl: 'sepolia-blockscout.lisk.com',
		host: 'Gelato RaaS',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Lit Protocol',
		chainId: undefined,
		explorerUrl: 'chain.litprotocol.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Loom',
		chainId: undefined,
		explorerUrl: 'basechain-blockexplorer.dappchains.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Loop',
		chainId: undefined,
		explorerUrl: 'explorer.mainnetloop.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Loop Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.testnetloop.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Loot',
		chainId: undefined,
		explorerUrl: 'explorer.lootchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Lukso',
		chainId: 42,
		explorerUrl: 'explorer.execution.mainnet.lukso.network',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Lumio',
		chainId: 8866,
		explorerUrl: 'explorer.lumio.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Lumio',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.lumio.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'LycanChain',
		chainId: 721,
		explorerUrl: 'explorer.lycanchain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Lyra',
		chainId: 957,
		explorerUrl: 'explorer.lyra.finance',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Mainnetz',
		chainId: undefined,
		explorerUrl: 'explorer.mainnetz.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Manta Pacific',
		chainId: 169,
		explorerUrl: 'pacific-explorer.manta.network',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Mantle',
		chainId: 5000,
		explorerUrl: 'explorer.mantle.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Mantle Sepolia Testnet',
		chainId: 5003,
		explorerUrl: 'explorer.sepolia.mantle.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Match',
		chainId: undefined,
		explorerUrl: 'lisbon.matchscan.io',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Meta Apes',
		chainId: undefined,
		explorerUrl: 'explorer.bas.metaapesgame.com',
		host: 'Self-hosted',
		ecosystem: 'Binance Smart Chain',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'MetaChain',
		chainId: undefined,
		explorerUrl: 'exp.metachain.asia',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Metachain One',
		chainId: 112358,
		explorerUrl: 'explorer.metachain.one',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'MetaDAP',
		chainId: undefined,
		explorerUrl: 'explorer.chain.metadap.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Metal Blockchain',
		chainId: undefined,
		explorerUrl: 'metalscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Metis',
		chainId: undefined,
		explorerUrl: 'andromeda-explorer.metis.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Mezcal',
		chainId: undefined,
		explorerUrl: 'mezcal-testnet.explorer.caldera.xyz',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2'
		],
	},
	{
		label: 'Milkomeda',
		chainId: undefined,
		explorerUrl: 'explorer-cardano-evm.c1.milkomeda.com',
		host: 'Self-hosted',
		ecosystem: 'Cardano',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Mind Smart Chain',
		chainId: undefined,
		explorerUrl: 'mainnet.mindscan.info',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Mitgate',
		chainId: undefined,
		explorerUrl: 'explorer.mitgate.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Mixin',
		chainId: undefined,
		explorerUrl: 'scan.mvm.dev',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Mode',
		chainId: 34443,
		explorerUrl: 'explorer.mode.network',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Mode Sepolia Testnet',
		chainId: 919,
		explorerUrl: 'sepolia.explorer.mode.network',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Modulus',
		chainId: undefined,
		explorerUrl: 'eye.moduluszk.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'Monetary',
		chainId: undefined,
		explorerUrl: 'testnet.monetary.fi',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Morpher',
		chainId: undefined,
		explorerUrl: 'morpher.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'MuGambo',
		chainId: undefined,
		explorerUrl: 'explorer.mugambo.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'MultiVAC',
		chainId: undefined,
		explorerUrl: 'mtvscout.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Muster Network',
		chainId: undefined,
		explorerUrl: 'muster-explorer.alt.technology',
		host: 'Altlayer',
		ecosystem: 'Arbitrum',
		tags: [
			'Mainnet',
			'Optimistic Rollup',
			'L3'
		],
	},
	{
		label: 'MXC',
		chainId: undefined,
		explorerUrl: 'explorer.mxc.com',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'zk Rollup',
			'Mainnet',
			'L3'
		],
	},
	{
		label: 'Nahmii',
		chainId: undefined,
		explorerUrl: 'explorer.nahmii.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'NCOG Earth Chain',
		chainId: undefined,
		explorerUrl: 'bs-explorer.ncogchain.earth',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Neon',
		chainId: 245022934,
		explorerUrl: 'neon.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Solana',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Neon Devnet',
		chainId: 245022926,
		explorerUrl: 'neon-devnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Solana',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Neptune Digital',
		chainId: undefined,
		explorerUrl: 'wuscan.neptunedigital.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Nero Chain Testnet',
		chainId: undefined,
		explorerUrl: 'testnetscan.nerochain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet',
			'zk Rollup'
		],
	},
	{
		label: 'Nexi',
		chainId: undefined,
		explorerUrl: 'nexiscan.com',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Nordek',
		chainId: undefined,
		explorerUrl: 'nordekscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Nordek Testnet',
		chainId: undefined,
		explorerUrl: 'testnet-explorer.nordekscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Ntity',
		chainId: undefined,
		explorerUrl: 'blockscout.ntity.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ntity Haradev',
		chainId: undefined,
		explorerUrl: 'blockscout.haradev.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Nuls',
		chainId: undefined,
		explorerUrl: '.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1'
		],
	},
	{
		label: 'NUMBLOCK',
		chainId: undefined,
		explorerUrl: 'testnet.numblock.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'NUMBLOCK',
		chainId: undefined,
		explorerUrl: 'mainnet.numblock.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Oasis',
		chainId: undefined,
		explorerUrl: 'explorer.sapphire.oasis.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Oasis Emerald',
		chainId: undefined,
		explorerUrl: 'explorer.emerald.oasis.dev',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Oasis Sapphire',
		chainId: undefined,
		explorerUrl: 'explorer.sapphire.oasis.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Oasys',
		chainId: 248,
		explorerUrl: 'explorer.oasys.games',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Oasys HOME Verse',
		chainId: undefined,
		explorerUrl: 'explorer.oasys.homeverse.games',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Oasys HUB Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.testnet.oasys.games',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Oasys Sand Verse',
		chainId: undefined,
		explorerUrl: 'explorer.sandverse.oasys.games',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'OctaSpace',
		chainId: undefined,
		explorerUrl: 'scan.octa.space',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'OMAX',
		chainId: undefined,
		explorerUrl: 'omaxscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Omni testnet',
		chainId: 165,
		explorerUrl: 'omni-testnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Onchain AI',
		chainId: undefined,
		explorerUrl: 'explorer.onchain-ai.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Onchain AI Testnet',
		chainId: undefined,
		explorerUrl: 'explorertest.onchain-ai.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Only',
		chainId: 728696,
		explorerUrl: 'onlyscan.info',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Only Layer',
		chainId: 728696,
		explorerUrl: 'onlyscan.info',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'ONUS Chain',
		chainId: undefined,
		explorerUrl: 'explorer.onuschain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Open Campus Testnet',
		chainId: 656476,
		explorerUrl: 'opencampus-codex.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L3',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'OpenEX',
		chainId: undefined,
		explorerUrl: 'scan.long.openex.network',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Optimism',
		chainId: 10,
		explorerUrl: 'optimism.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Optimism Sepolia',
		chainId: 11155420,
		explorerUrl: 'optimism-sepolia.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Orb 3',
		chainId: undefined,
		explorerUrl: 'orb3scan.tech',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Orderly',
		chainId: 291,
		explorerUrl: 'explorer.orderly.network',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Orderly Testnet',
		chainId: 4460,
		explorerUrl: 'testnet-explorer.orderly.org',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Otona',
		chainId: 81247166294,
		explorerUrl: 'testnet.otoscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L3',
			'Mainnet'
		],
	},
	{
		label: 'Ozone',
		chainId: undefined,
		explorerUrl: 'ozonescan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ozone Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.ozonescan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'P12',
		chainId: undefined,
		explorerUrl: 'explorer.p12.games',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Pagzi Tech Inc',
		chainId: undefined,
		explorerUrl: 'pgscan.pagzi.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Parallel',
		chainId: 1024,
		explorerUrl: 'explorer.parallel.fi',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Parallel',
		chainId: 1024,
		explorerUrl: 'explorer.parallel.fi',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'PATEX',
		chainId: undefined,
		explorerUrl: 'patexscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'PGN Mainnet',
		chainId: 424,
		explorerUrl: 'explorer.publicgoods.network',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'PGN Testnet',
		chainId: 58008,
		explorerUrl: 'explorer.sepolia.publicgoods.network',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Phi Network',
		chainId: undefined,
		explorerUrl: 'phiscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Pixel',
		chainId: undefined,
		explorerUrl: 'scan.pixelsoftwares.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1'
		],
	},
	{
		label: 'Pixie Chain',
		chainId: undefined,
		explorerUrl: 'scan.chain.pixie.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Playnance',
		chainId: undefined,
		explorerUrl: 'playnance.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Ethereum',
		tags: [
			'L3',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Playnance Playblock',
		chainId: 1829,
		explorerUrl: 'explorer.playblock.io',
		host: 'Gelato RaaS',
		ecosystem: 'Ethereum',
		tags: [
			'L3',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Playota',
		chainId: undefined,
		explorerUrl: 'scan.playota.app',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Plume',
		chainId: 161221135,
		explorerUrl: 'plume-testnet.explorer.caldera.xyz',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Point Network',
		chainId: undefined,
		explorerUrl: 'explorer.pointnetwork.io',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Polygon PoS',
		chainId: 137,
		explorerUrl: 'polygon.blockscout.com',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Polygon zkEVM',
		chainId: 1101,
		explorerUrl: 'zkevm.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Polygon',
		tags: [
			'Mainnet',
			'L2'
		],
	},
	{
		label: 'Polygon zkEVM Cardona Testnet',
		chainId: undefined,
		explorerUrl: 'explorer-ui.cardona.zkevm-rpc.com',
		host: 'Blockscout',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Pontem Lumio',
		chainId: 8866,
		explorerUrl: 'explorer.lumio.io',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Poo Chain',
		chainId: undefined,
		explorerUrl: 'blockscout.pooscan.co',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Pools Mobility',
		chainId: undefined,
		explorerUrl: 'scan.poolsmobility.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'PRM Smartchain',
		chainId: undefined,
		explorerUrl: 'prmscan.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Prom Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.promscan.io',
		host: 'Altlayer',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'Proof of Play Apex',
		chainId: 70700,
		explorerUrl: 'explorer.apex.proofofplay.com',
		host: 'Conduit',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Public Mint',
		chainId: undefined,
		explorerUrl: 'explorer.publicmint.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Pulsechain 9mm',
		chainId: undefined,
		explorerUrl: 'scan.9mm.pro',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Q',
		chainId: undefined,
		explorerUrl: 'explorer.q.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Qitmeer',
		chainId: undefined,
		explorerUrl: 'evm.meerscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Qitmeer Testnet',
		chainId: 8131,
		explorerUrl: 'testnet-qng.qitmeer.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Quadrans',
		chainId: undefined,
		explorerUrl: 'explorer.quadrans.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Quai Newtork',
		chainId: undefined,
		explorerUrl: 'cyprus1.colosseum.quaiscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Rails Network',
		chainId: undefined,
		explorerUrl: 'explore.steamexchange.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Ramestta',
		chainId: undefined,
		explorerUrl: 'v2.ramascan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Rapid Chain',
		chainId: undefined,
		explorerUrl: 'rapidscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Rebus',
		chainId: undefined,
		explorerUrl: 'evm.rebuschain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Redecoin',
		chainId: undefined,
		explorerUrl: 'explorer3.redecoin.eu',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Redstone',
		chainId: 690,
		explorerUrl: 'explorer.redstone.xyz',
		host: 'Blockscout',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Redstone Garnet',
		chainId: undefined,
		explorerUrl: 'garnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'REI Chain',
		chainId: undefined,
		explorerUrl: 'reiscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Rei Network',
		chainId: undefined,
		explorerUrl: 'scan.rei.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'REXX',
		chainId: undefined,
		explorerUrl: 'rexxnetwork.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Reya',
		chainId: 1729,
		explorerUrl: 'explorer.reya.network',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Reya Cronos',
		chainId: 89346162,
		explorerUrl: 'reya-cronos.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Rikeza',
		chainId: undefined,
		explorerUrl: 'rikscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Rollux',
		chainId: 570,
		explorerUrl: 'explorer.rollux.com',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Rootstock',
		chainId: 30,
		explorerUrl: 'rootstock.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Rootstock Testnet',
		chainId: 31,
		explorerUrl: 'rootstock-testnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Rumsan',
		chainId: undefined,
		explorerUrl: 'explorer.rumsan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'saakuru',
		chainId: undefined,
		explorerUrl: 'explorer.saakuru.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'SCS Chain',
		chainId: undefined,
		explorerUrl: 'testnetscan.scschain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'SeeleN',
		chainId: undefined,
		explorerUrl: 'seeleview.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Sei',
		chainId: undefined,
		explorerUrl: 'seitrace.com/?chain=pacific-1',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Shibarium',
		chainId: 109,
		explorerUrl: 'www.shibariumscan.io',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Shibarium Puppynet',
		chainId: 157,
		explorerUrl: 'puppyscan.shib.io',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'Shiden',
		chainId: 336,
		explorerUrl: 'shiden.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Polkadot',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Shieldtech',
		chainId: undefined,
		explorerUrl: 'kyberscan.shieldtechgroup.is',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Shimmer',
		chainId: 148,
		explorerUrl: 'explorer.evm.shimmer.network',
		host: 'Blockscout',
		ecosystem: 'IOTA',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Shimmer Testnet',
		chainId: 1073,
		explorerUrl: 'explorer.evm.testnet.shimmer.network',
		host: 'Blockscout',
		ecosystem: 'IOTA',
		tags: [
			'Testnet',
			'L1'
		],
	},
	{
		label: 'Shine Chain',
		chainId: undefined,
		explorerUrl: 'shinescan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Shyft Mainnet',
		chainId: undefined,
		explorerUrl: 'bx.shyft.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Shyft Testnet',
		chainId: undefined,
		explorerUrl: 'bx.testnet.shyft.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Siberium',
		chainId: 111111,
		explorerUrl: 'explorer.main.siberium.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Sidra',
		chainId: undefined,
		explorerUrl: 'explorer.xsidra.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Sidra',
		chainId: undefined,
		explorerUrl: 'explorer.xsidra.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Sidra Chain',
		chainId: undefined,
		explorerUrl: 'ledger.sidrachain.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Siriusnet',
		chainId: undefined,
		explorerUrl: 'scan.siriusnet.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Skale',
		chainId: 2046399126,
		explorerUrl: 'elated-tan-skat.explorer.mainnet.skalenodes.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'SkyHigh Mainnet',
		chainId: 1476,
		explorerUrl: 'skhscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'SOROS',
		chainId: undefined,
		explorerUrl: 'sorosscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'SpectreScan',
		chainId: undefined,
		explorerUrl: 'spectre-scan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'SpectreScan Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.spectre-scan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Stability',
		chainId: 101010,
		explorerUrl: 'stability.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Stability Testnet',
		chainId: 20180427,
		explorerUrl: 'stability-testnet.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Ethereum',
		tags: [
			'Testnet'
		],
	},
	{
		label: 'Stack',
		chainId: 78225,
		explorerUrl: 'explorer.stack.so',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Stack Testnet',
		chainId: 782251,
		explorerUrl: 'testnet.explorer.stack.so',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Step Network',
		chainId: undefined,
		explorerUrl: 'stepscan.io',
		host: 'Self-hosted',
		ecosystem: 'Avalanche',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Storage Protocol',
		chainId: undefined,
		explorerUrl: 'explorer.storageprotocol.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Stratis',
		chainId: undefined,
		explorerUrl: 'explorer.stratisevm.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet',
			'L1'
		],
	},
	{
		label: 'Swan',
		chainId: undefined,
		explorerUrl: 'saturn-explorer.swanchain.io',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'SwissDLT',
		chainId: undefined,
		explorerUrl: 'explorer.swissdlt.ch',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Swisstronik Testnet',
		chainId: 1291,
		explorerUrl: 'explorer-evm.testnet.swisstronik.com',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'SX Network',
		chainId: 416,
		explorerUrl: 'explorer.sx.technology',
		host: 'Self-hosted',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Syndicate',
		chainId: undefined,
		explorerUrl: 'explorer-frame.syndicate.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet',
			'L3'
		],
	},
	{
		label: 'Syndr Mainnet',
		chainId: undefined,
		explorerUrl: 'explorer.syndr.com',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Syndr Testnet',
		chainId: undefined,
		explorerUrl: 'sepolia-explorer.syndr.com',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'Testnet'
		],
	},
	{
		label: 'Syscoin',
		chainId: undefined,
		explorerUrl: 'explorer.syscoin.org',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'Mainnet',
			'L1'
		],
	},
	{
		label: 'TabiChain Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.tabiscan.com',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1'
		],
	},
	{
		label: 'Taiko',
		chainId: 167000,
		explorerUrl: 'blockscoutapi.mainnet.taiko.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L2',
			'Mainnet',
			'zk Rollup'
		],
	},
	{
		label: 'Taiko Hekla Testnet',
		chainId: undefined,
		explorerUrl: 'explorer.hekla.taiko.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Testnet',
			'L2',
			'zk Rollup'
		],
	},
	{
		label: 'Talium',
		chainId: undefined,
		explorerUrl: 'explorer.talium.fr',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Tangible re.al',
		chainId: 111188,
		explorerUrl: 'explorer.re.al',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Tangible Unreal testnet',
		chainId: 18233,
		explorerUrl: 'unreal.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Tangle',
		chainId: 5845,
		explorerUrl: 'explorer.tangle.tools',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Tangle Testnet',
		chainId: 3799,
		explorerUrl: 'testnet-explorer.tangle.tools',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'TCC Network',
		chainId: undefined,
		explorerUrl: 'scan.tccworld.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Tecra',
		chainId: undefined,
		explorerUrl: 'explorer.tecra.space',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Tenet',
		chainId: undefined,
		explorerUrl: 'tenetscan.io',
		host: 'Self-hosted',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Thundercore',
		chainId: undefined,
		explorerUrl: 'explorer.thundercore.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Thundercore Testnet',
		chainId: undefined,
		explorerUrl: 'explorer-testnet.thundercore.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'TIME',
		chainId: undefined,
		explorerUrl: 'testnet-scanner.timenetwork.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Token X',
		chainId: undefined,
		explorerUrl: 'scan.tokenx.finance',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'TOKEN.UZ',
		chainId: 2409,
		explorerUrl: 'scan.cctld.token.uz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'TokenE',
		chainId: undefined,
		explorerUrl: 'scan.tokene.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Tomb',
		chainId: undefined,
		explorerUrl: 'tombscout.com',
		host: 'Self-hosted',
		ecosystem: 'Fantom',
		tags: [
			'L2',
			'Mainnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Treschain',
		chainId: undefined,
		explorerUrl: 'treschain.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'U2U Network',
		chainId: undefined,
		explorerUrl: 'u2uscan.xyz',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ubit Scan',
		chainId: undefined,
		explorerUrl: 'ubitscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Ubit Scan Testnet',
		chainId: undefined,
		explorerUrl: 'testnet.ubitscan.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'uNiq Diamonds',
		chainId: undefined,
		explorerUrl: 'explorer.uniq.diamonds',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Uniq Digital Coin',
		chainId: undefined,
		explorerUrl: 'udcexplorer.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Universal Unit Coin',
		chainId: undefined,
		explorerUrl: 'explorer.universalunitcoin.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Velas',
		chainId: undefined,
		explorerUrl: 'evmexplorer.velas.com',
		host: 'Self-hosted',
		ecosystem: 'Solana',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Velo Labs',
		chainId: undefined,
		explorerUrl: 'novascan.velo.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'VERIDOC Ledger',
		chainId: undefined,
		explorerUrl: 'veridocledger.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Verify',
		chainId: 1833,
		explorerUrl: 'verify-testnet.blockscout.com',
		host: 'Gelato RaaS',
		ecosystem: 'Polygon',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Virtualscan',
		chainId: 713,
		explorerUrl: 'vrcscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Virtualscan DXB Testnet',
		chainId: 195,
		explorerUrl: 'dxb.vrcscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Vision',
		chainId: undefined,
		explorerUrl: 'www.visionscan.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'VRCScan',
		chainId: 713,
		explorerUrl: 'vrcscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'VRCScan Testnet',
		chainId: 195,
		explorerUrl: 'dxb.vrcscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethererum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Vyvo Smart Chain',
		chainId: undefined,
		explorerUrl: 'vscscan.org',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'WatchData',
		chainId: undefined,
		explorerUrl: 'catamite.explorer.watchdata.io',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Wikiwoop',
		chainId: 139,
		explorerUrl: 'explorer.wikiwoop.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Worldland',
		chainId: undefined,
		explorerUrl: 'scan.worldland.foundation',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Worldland Testnet',
		chainId: undefined,
		explorerUrl: 'scan.worldland.foundation',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Xai',
		chainId: undefined,
		explorerUrl: 'explorer.xai-chain.net',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'Xai Testnet',
		chainId: undefined,
		explorerUrl: 'testnet-explorer-v2.xai-chain.net',
		host: 'Self-hosted',
		ecosystem: 'Arbitrum',
		tags: [
			'L2'
		],
	},
	{
		label: 'Xana',
		chainId: undefined,
		explorerUrl: 'xanachain.xana.net',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'XCAP',
		chainId: undefined,
		explorerUrl: 'xcap.explorer.xcap.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'XRP Ledger',
		chainId: undefined,
		explorerUrl: 'evm-sidechain.xrpl.org',
		host: 'Self-hosted',
		ecosystem: 'Ripple',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'Xterio Chain (BNB)',
		chainId: undefined,
		explorerUrl: 'bnb.xterscan.io',
		host: 'Altlayer',
		ecosystem: 'Binance Smart Chain',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Xuv',
		chainId: undefined,
		explorerUrl: 'www.xuvscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'Mainnet'
		],
	},
	{
		label: 'ZCore',
		chainId: undefined,
		explorerUrl: 'testnet.zcore.network',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'Zenith',
		chainId: undefined,
		explorerUrl: 'scan.zenithchain.co',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Zenith',
		chainId: undefined,
		explorerUrl: 'scan.zenithchain.co',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Zenta Chain testnet',
		chainId: 1432,
		explorerUrl: 'explorer-sepolia.zentachain.io',
		host: 'Self-hosted',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Testnet',
			'Optimistic Rollup'
		],
	},
	{
		label: 'Zetachain',
		chainId: 7000,
		explorerUrl: 'zetachain.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Mainnet'
		],
	},
	{
		label: 'Zetachain Testnet',
		chainId: 7001,
		explorerUrl: 'zetachain-athens-3.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'Cosmos',
		tags: [
			'L1',
			'Testnet'
		],
	},
	{
		label: 'zkFair',
		chainId: 42766,
		explorerUrl: 'scan.zkfair.io',
		host: 'Self-hosted',
		ecosystem: 'Celestia',
		tags: [
			'L2',
			'zk Rollup',
			'Mainnet'
		],
	},
	{
		label: 'zkFair Testnet',
		chainId: 42766,
		explorerUrl: 'testnet-scan.zkfair.io',
		host: 'Self-hosted',
		ecosystem: 'Celestia',
		tags: [
			'L2',
			'zk Rollup',
			'Testnet'
		],
	},
	{
		label: 'zkSats',
		chainId: undefined,
		explorerUrl: 'explorer.zksats.io',
		host: 'Self-hosted',
		ecosystem: 'Bitcoin/BCH',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'zkSync Era',
		chainId: 324,
		explorerUrl: 'zksync.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'zkSync',
		tags: [
			'L2',
			'Mainnet'
		],
	},
	{
		label: 'zkSync Era Sepolia Testnet',
		chainId: 300,
		explorerUrl: 'zksync-sepolia.blockscout.com',
		host: 'Blockscout',
		ecosystem: 'zkSync',
		tags: [
			'L2',
			'Testnet'
		],
	},
	{
		label: 'Zora',
		chainId: 7777777,
		explorerUrl: 'explorer.zora.energy',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Mainnet'
		],
	},
	{
		label: 'Zora Sepolia Testnet',
		chainId: 999999999,
		explorerUrl: 'sepolia.explorer.zora.energy',
		host: 'Conduit',
		ecosystem: 'Optimism',
		tags: [
			'L2',
			'Optimistic Rollup',
			'Testnet'
		],
	},
	{
		label: 'ZYX Network',
		chainId: undefined,
		explorerUrl: 'zyxscan.com',
		host: 'Self-hosted',
		ecosystem: 'Ethereum',
		tags: [
			'L1',
			'Mainnet'
		],
	}
] as const satisfies {
	label: string,
	chainId?: number,
	explorerUrl: string,
	host: string,
	ecosystem: string,
	tags: string[],
}[]


export const blockscoutProviderConfigs = [
	...blockscoutFeaturedNetworks.map(({ group, ...config }) => ({
		...config,
		tags: (
			group === 'Mainnets' ?
				['Mainnet']
			: group === 'Testnets' ?
				['Testnet']
			:
				[]
		),
	})),
	...blockscoutProjects,
] as const satisfies {
	label: string,
	chainId?: Ethereum.ChainId,
	explorerUrl: string,
	host?: string,
	ecosystem?: string,
	tags?: string[],
}[]

export const blockscoutInstancesByChainId = Object.fromEntries(
	blockscoutProviderConfigs
		.map(config => [
			config.chainId,
			config,
		])
)

export const getBlockscoutRestEndpoint = (
	chainId: Ethereum.ChainId,
) => (
	`https://${blockscoutInstancesByChainId[chainId].explorerUrl}/api/v2`
)
