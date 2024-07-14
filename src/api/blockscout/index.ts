// Types/constants
import type { Ethereum } from '$/data/networks/types'
import { networksBySlug } from '$/data/networks'

// https://github.com/blockscout/frontend-configs/tree/main/configs/featured-networks
export const blockscoutProviderConfigs: {
	label: string,
	networkSlug: Ethereum.NetworkSlug,
	domain: string,
	group?: string,
}[] = [
	{
		label: 'Arbitrum Blueberry',
		networkSlug: 'arbitrum-blueberry',
		domain: 'arb-blueberry.gelatoscout.com',
		group: 'Mainnets',
	},
	{
		label: 'ARTIS-Σ1',
		networkSlug: 'artis-sigma1',
		domain: 'blockscout.com/artis/sigma1',
		group: 'Other',
	},
	{
		label: 'Astar (EVM)',
		networkSlug: 'astar-evm',
		domain: 'astar.blockscout.com', // blockscout.com/astar
		group: 'Mainnets',
	},
	{
		label: 'Astar (Subscan)',
		networkSlug: 'astar-subscan',
		domain: 'astar.subscan.io',
		group: 'Mainnets',
	},
	{
		label: 'Astar zkEVM',
		networkSlug: 'astar-zkevm',
		domain: 'astar-zkevm.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Astar zKyoto',
		networkSlug: 'astar-zkyoto',
		domain: 'astar-zkyoto.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Base Chain',
		networkSlug: 'base-chain',
		domain: 'base.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Base Göerli',
		networkSlug: 'base-goerli',
		domain: 'base-goerli.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Base Sepolia',
		networkSlug: 'base-sepolia',
		domain: 'base-sepolia.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Blackfort',
		networkSlug: 'blackfort',
		domain: 'blackfort.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blackfort Testnet',
		networkSlug: 'blackfort-testnet',
		domain: 'blackfort-testnet.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blast',
		networkSlug: 'blast',
		domain: 'blast.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blast Testnet',
		networkSlug: 'blast-testnet',
		domain: 'blast-testnet.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Blockscout Athens-3 Explorer',
		networkSlug: 'zetachain-athens-3',
		domain: 'zetachain-athens-3.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'CDK Stavanger',
		networkSlug: 'polygon-cdk-stavanger',
		domain: 'polygon-cdk-stavanger.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Creditcoin Devnet',
		networkSlug: 'creditcoin-devnet',
		domain: 'creditcoin-devnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Creditcoin Testnet',
		networkSlug: 'creditcoin-testnet',
		domain: 'creditcoin-testnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'ETC Mordor',
		networkSlug: 'etc-mordor',
		domain: 'etc-mordor.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Ethereum',
		networkSlug: 'ethereum',
		domain: 'eth.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Ethereum Classic',
		networkSlug: 'ethereum-classic',
		domain: 'etc.blockscout.com', // blockscout.com/etc/mainnet
		group: 'Mainnets',
	},
	{
		label: 'Etherlink',
		networkSlug: 'etherlink',
		domain: 'explorer.etherlink.com',
		group: 'Mainnets',
	},
	{
		label: 'Etherlink Testnet',
		networkSlug: 'etherlink-testnet',
		domain: 'testnet-explorer.etherlink.com',
		group: 'Mainnets',
	},
	{
		label: 'Fuse',
		networkSlug: 'fuse',
		domain: 'explorer.fuse.io',
		group: 'Mainnets',
	},
	{
		label: 'Garnet Testnet',
		networkSlug: 'garnet-testnet',
		domain: 'explorer.garnetchain.com',
		group: 'Testnets',
	},
	{
		label: 'Gnosis Chain',
		networkSlug: 'gnosis',
		domain: 'gnosis.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Gnosis Chain Chiado',
		networkSlug: 'gnosis-chiado',
		domain: 'gnosis-chiado.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Goerli',
		networkSlug: 'ethereum-goerli',
		domain: 'eth-goerli.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Holesky',
		networkSlug: 'ethereum-holesky',
		domain: 'eth-holesky.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Immutable',
		networkSlug: 'immutable',
		domain: 'explorer.immutable.com',
		group: 'Mainnets',
	},
	{
		label: 'Immutable Testnet',
		networkSlug: 'immutable-testnet',
		domain: 'explorer.testnet.immutable.com',
		group: 'Testnets',
	},
	{
		label: 'IOTA EVM Mainnet',
		networkSlug: 'iota-evm-mainnet',
		domain: 'explorer.evm.iota.org',
		group: 'Mainnets',
	},
	{
		label: 'IOTA EVM Testnet',
		networkSlug: 'iota-evm-testnet',
		domain: 'explorer.evm.testnet.iotaledger.net',
		group: 'Testnets',
	},
	{
		label: 'IOTA L1 Mainnet',
		networkSlug: 'iota-l1-mainnet',
		domain: 'explorer.iota.org',
		group: 'Mainnets',
	},
	{
		label: 'IOTA L1 testnet',
		networkSlug: 'iota-l1-testnet',
		domain: 'explorer.iota.org/iota-testnet',
		group: 'Testnets',
	},
	{
		label: 'Kusama',
		networkSlug: 'kusama',
		domain: 'kusama.subscan.io',
		group: 'Other',
	},
	{
		label: 'LightLink Pegasus',
		networkSlug: 'lightlink-pegasus',
		domain: 'pegasus.lightlink.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'LightLink Phoenix',
		networkSlug: 'lightlink-phoenix',
		domain: 'phoenix.lightlink.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Lisk Mainnet',
		networkSlug: 'lisk-mainnet',
		domain: 'blockscout.lisk.com',
		group: 'Mainnets',
	},
	{
		label: 'Lisk Sepolia Testnet',
		networkSlug: 'lisk-sepolia',
		domain: 'sepolia-blockscout.lisk.com',
		group: 'Mainnets',
	},
	{
		label: 'LUKSO L14',
		networkSlug: 'lukso-l14',
		domain: 'blockscout.com/lukso/l14',
		group: 'Other',
	},
	{
		label: 'Neon',
		networkSlug: 'neon',
		domain: 'neon.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Neon Devnet',
		networkSlug: 'neon-devnet',
		domain: 'neon-devnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Neon Mainnet',
		networkSlug: 'neon-mainnet',
		domain: 'neon.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Official testnet explorer',
		networkSlug: 'zetachain-testnet',
		domain: 'explorer.zetachain.com',
		group: 'Testnets',
	},
	{
		label: 'Omni Testnet',
		networkSlug: 'omni-testnet',
		domain: 'omni-testnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Omni X-Explorer',
		networkSlug: 'omni-x-explorer',
		domain: 'explorer.testnet.omni.network',
		group: 'Testnets',
	},
	{
		label: 'OP Celestia Raspberry',
		networkSlug: 'op-celestia-raspberry',
		domain: 'opcelestia-raspberry.gelatoscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Optimism',
		networkSlug: 'optimism',
		domain: 'optimism.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Optimism Bedrock Beta',
		networkSlug: 'optimism-bedrock-beta',
		domain: 'blockscout.com/optimism/bedrock-beta',
		group: 'Testnets',
	},
	{
		label: 'Optimism Goerli',
		networkSlug: 'optimism-goerli',
		domain: 'optimism-goerli.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Optimism Opcraft',
		networkSlug: 'optimism-opcraft',
		domain: 'blockscout.com/optimism/opcraft',
		group: 'Other',
	},
	{
		label: 'Optimism Sepolia',
		networkSlug: 'optimism-sepolia',
		domain: 'optimism-sepolia.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Pegasus Testnet',
		networkSlug: 'pegasus-testnet',
		domain: 'pegasus.lightlink.io',
		group: 'Testnets',
	},
	{
		label: 'Phoenix Mainnet',
		networkSlug: 'phoenix',
		domain: 'phoenix.lightlink.io',
		group: 'Mainnets',
	},
	{
		label: 'Playblock',
		networkSlug: 'playblock',
		domain: 'explorer.playblock.io',
		group: 'Mainnets',
	},
	{
		label: 'Playnance',
		networkSlug: 'playnance',
		domain: 'playnance.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'POA',
		networkSlug: 'poa',
		domain: 'blockscout.com/poa/core',
		group: 'Other',
	},
	{
		label: 'POA Sokol',
		networkSlug: 'poa-sokol',
		domain: 'blockscout.com/poa/sokol',
		group: 'Other',
	},
	{
		label: 'Polkadot',
		networkSlug: 'polkadot',
		domain: 'polkadot.subscan.io',
		group: 'Other',
	},
	{
		label: 'Polygon',
		networkSlug: 'polygon',
		domain: 'polygon.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Polygon Blackberry',
		networkSlug: 'polygon-blackberry',
		domain: 'polygon-blackberry.gelatoscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Puppynet Testnet',
		networkSlug: 'puppynet-testnet',
		domain: 'puppyscan.shib.io',
		group: 'Testnets',
	},
	{
		label: 're.al',
		networkSlug: 'real',
		domain: 'explorer.re.al',
		group: 'Mainnets',
	},
	{
		label: 'Redstone',
		networkSlug: 'redstone',
		domain: 'explorer.redstone.xyz',
		group: 'Mainnets',
	},
	{
		label: 'Reya Cronos',
		networkSlug: 'reya-cronos',
		domain: 'reya-cronos.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Reya Mainnet',
		networkSlug: 'reya-mainnet',
		domain: 'explorer.reya.network',
		group: 'Mainnets',
	},
	{
		label: 'Rootstock Mainnet',
		networkSlug: 'rootstock-mainnet',
		domain: 'rootstock.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Rootstock Testnet',
		networkSlug: 'rootstock-testnet',
		domain: 'rootstock-testnet.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'RSK',
		networkSlug: 'rsk',
		domain: 'blockscout.com/rsk/mainnet',
		group: 'Mainnets',
	},
	{
		label: 'Sepolia',
		networkSlug: 'ethereum-sepolia',
		domain: 'eth-sepolia.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'Shibarium',
		networkSlug: 'shibarium',
		domain: 'shibariumscan.io',
		group: 'Mainnets',
	},
	{
		label: 'Shibuya (EVM)',
		networkSlug: 'shibuya-evm',
		domain: 'shibuya.blockscout.com', // blockscout.com/shibuya
		group: 'Testnets',
	},
	{
		label: 'Shibuya (Subscan)',
		networkSlug: 'shibuya-subscan',
		domain: 'shibuya.subscan.io',
		group: 'Testnets',
	},
	{
		label: 'Shiden (EVM)',
		networkSlug: 'shiden-evm',
		domain: 'shiden.blockscout.com', // blockscout.com/shiden
		group: 'Mainnets',
	},
	{
		label: 'Shiden (Subscan)',
		networkSlug: 'shiden-subscan',
		domain: 'shiden.subscan.io',
		group: 'Mainnets',
	},
	{
		label: 'Shimmer EVM',
		networkSlug: 'shimmer-evm',
		domain: 'explorer.evm.shimmer.network', // iota-shimmer.blockscout.com
		group: 'Mainnets',
	},
	{
		label: 'Shimmer EVM Testnet',
		networkSlug: 'shimmer-evm-testnet',
		domain: 'explorer.evm.testnet.shimmer.network',
		group: 'Testnets',
	},
	{
		label: 'Shimmer L1 Mainnet',
		networkSlug: 'shimmer-l1-mainnet',
		domain: 'explorer.shimmer.network/shimmer',
		group: 'Mainnets',
	},
	{
		label: 'Shimmer L1 Testnet',
		networkSlug: 'shimmer-l1-testnet',
		domain: 'explorer.shimmer.network/testnet',
		group: 'Testnets',
	},
	{
		label: 'Spark',
		networkSlug: 'spark',
		domain: 'explorer.fusespark.io',
		group: 'Testnets',
	},
	{
		label: 'Stability',
		networkSlug: 'stability',
		domain: 'stability.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Stability Testnet',
		networkSlug: 'stability-testnet',
		domain: 'stability-testnet.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Unreal',
		networkSlug: 'unreal',
		domain: 'unreal.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'ZetaChain Mainnet',
		networkSlug: 'zetachain-mainnet',
		domain: 'zetachain.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'ZetaChain testnet',
		networkSlug: 'zetachain-testnet',
		domain: 'zetachain-athens-3.blockscout.com',
		group: 'Testnets',
	},
	{
		label: 'zkEVM',
		networkSlug: 'zkevm',
		domain: 'zkevm.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'zkSync',
		networkSlug: 'zksync',
		domain: 'zksync.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'zkSync Sepolia',
		networkSlug: 'zksync-sepolia',
		domain: 'zksync-sepolia.blockscout.com',
		group: 'Mainnets',
	},
	{
		label: 'Zora',
		networkSlug: 'zora',
		domain: 'explorer.zora.energy',
		group: 'Mainnets',
	},
	{
		label: 'Zora Sepolia',
		networkSlug: 'zora-sepolia',
		domain: 'sepolia.explorer.zora.energy',
		group: 'Testnets',
	},
]

export const blockscoutInstancesByChainId = Object.fromEntries(
	blockscoutProviderConfigs
		.filter(config => (
			config.networkSlug in networksBySlug
		))
		.map(config => [
			networksBySlug[config.networkSlug].chainId,
			config,
		])
)

export const getBlockscoutRestEndpoint = (
	chainId: Ethereum.ChainID,
) => (
	`https://${blockscoutInstancesByChainId[chainId].domain}/api/v2`
)
