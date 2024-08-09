// Types/constants
import type { Ethereum } from './types'
import { DataAvailabilityProvider } from '$/data/networks/data-availability'
import { RollupProvider, RollupStack } from '$/data/networks/rollups'

type NetworkWithRollupInfo = {
	id: string,
	name: Ethereum.Network['name'],
	chainId: Ethereum.Network['chainId'],
	parent: Ethereum.Network['parent'],
	rollup: {
		provider: RollupProvider,
		stack: RollupStack,
		dataAvailabilityLayer?: DataAvailabilityProvider,
	},
	rpc: Ethereum.Network['rpc'],
	explorers?: Ethereum.Network['explorers'],
}

export const conduitNetworks = [
	{
		id: 'aevo-mainnet-prod-0',
		name: 'Aevo Mainnet',
		chainId: 2999,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-aevo-mainnet-prod-0.t.conduit.xyz',
			'wss://rpc-aevo-mainnet-prod-0.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.aevo.xyz',
			},
		],
	},
	{
		id: 'aevo-testnet-k1zx5a2ajj',
		name: 'Aevo Testnet',
		chainId: 11155112,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-aevo-testnet-k1zx5a2ajj.t.conduit.xyz',
			'wss://rpc-aevo-testnet-k1zx5a2ajj.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-testnet.aevo.xyz',
			},
		],
	},
	{
		id: 'alleged-jade-loon-fqlx1rs2zw',
		name: 'alleged-jade-loon',
		chainId: 94061,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://alleged-jade-loon-fqlx1rs2zw-ce9add79572853e0.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
		},
		rpc: [
			'https://rpc-alleged-jade-loon-fqlx1rs2zw.t.conduit.xyz',
			'wss://rpc-alleged-jade-loon-fqlx1rs2zw.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-alleged-jade-loon-fqlx1rs2zw.t.conduit.xyz',
			},
		],
	},
	{
		id: 'ancient-8-celestia-wib77nnwsq',
		name: 'Ancient8 Celestia Testnet',
		chainId: 28122024,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://ancient-8-celestia-wib77nnwsq.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpcv2-testnet.ancient8.gg',
			'wss://rpcv2-testnet.ancient8.gg',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://scanv2-testnet.ancient8.gg',
			},
		],
	},
	{
		id: 'ancient8-mainnet-0',
		name: 'Ancient8 Mainnet',
		chainId: 888888888,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.ancient8.gg',
			'wss://rpc.ancient8.gg',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://scan.ancient8.gg',
			},
		],
	},
	{
		id: 'ancient8-testnet-sepolia-cccpuosety',
		name: 'Ancient8 Testnet',
		chainId: 2863311531,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://ancient8-testnet-sepolia-cccpuosety.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-testnet.ancient8.gg',
			'wss://rpc-testnet.ancient8.gg',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet.a8scan.io',
			},
		],
	},
	{
		id: 'apechain-test-qbuapbatak',
		name: 'apechain-test',
		chainId: 111,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://apechain-test-qbuapbatak.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-apechain-test-qbuapbatak.t.conduit.xyz',
			'wss://rpc-apechain-test-qbuapbatak.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-apechain-test-qbuapbatak.t.conduit.xyz',
			},
		],
	},
	{
		id: 'applicable-peach-boar-8s5uzcsath',
		name: 'applicable-peach-boar',
		chainId: 9393,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://applicable-peach-boar-8s5uzcsath.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-applicable-peach-boar-8s5uzcsath.t.conduit.xyz',
			'wss://rpc-applicable-peach-boar-8s5uzcsath.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-applicable-peach-boar-8s5uzcsath.t.conduit.xyz',
			},
		],
	},
	{
		id: 'armed-bronze-cephalopod-zqf47no0je',
		name: 'armed-bronze-cephalopod',
		chainId: 78222,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://armed-bronze-cephalopod-zqf47no0je.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-armed-bronze-cephalopod-zqf47no0je.t.conduit.xyz',
			'wss://rpc-armed-bronze-cephalopod-zqf47no0je.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-armed-bronze-cephalopod-zqf47no0je.t.conduit.xyz',
			},
		],
	},
	{
		id: 'associated-olive-tern-hyjrxhpz7g',
		name: 'associated-olive-tern',
		chainId: 14233358,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://associated-olive-tern-hyjrxhpz7g.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-associated-olive-tern-hyjrxhpz7g.t.conduit.xyz',
			'wss://rpc-associated-olive-tern-hyjrxhpz7g.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-associated-olive-tern-hyjrxhpz7g.t.conduit.xyz',
			},
		],
	},
	{
		id: 'basedog-base-sepolia-0',
		name: 'basedog-base-sepolia-0',
		chainId: 2912311999,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-basedog-base-sepolia-0.t.conduit.xyz',
			'wss://rpc-basedog-base-sepolia-0.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-basedog-base-sepolia-0.t.conduit.xyz',
			},
		],
	},
	{
		id: 'beyond-indigo-playground-xz87sjgmaj',
		name: 'beyond-indigo-playground',
		chainId: 59185,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://beyond-indigo-playground-xz87sjgmaj.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-beyond-indigo-playground-xz87sjgmaj.t.conduit.xyz',
			'wss://rpc-beyond-indigo-playground-xz87sjgmaj.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-beyond-indigo-playground-xz87sjgmaj.t.conduit.xyz',
			},
		],
	},
	{
		id: 'bibi-chain-testnet-o5x3awt98d',
		name: 'bibi-chain-testnet',
		chainId: 616161,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://bibi-chain-testnet-o5x3awt98d.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-bibi-chain-testnet-o5x3awt98d.t.conduit.xyz',
			'wss://rpc-bibi-chain-testnet-o5x3awt98d.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-bibi-chain-testnet-o5x3awt98d.t.conduit.xyz',
			},
		],
	},
	{
		id: 'bit2-z2t7fxe8ku',
		name: 'bit2',
		chainId: 222222,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://bit2-z2t7fxe8ku-b9ac48ffb864bafe.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Plasma,
		},
		rpc: [
			'https://rpc.bit2.network',
			'wss://rpc.bit2.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.bit2.network',
			},
		],
	},
	{
		id: 'blt-testnet-79hfrj5phj',
		name: 'blt-testnet',
		chainId: 9048,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://blt-testnet-79hfrj5phj.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.EigenDa,
		},
		rpc: [
			'https://rpc.testnet.blt.xyz',
			'wss://rpc.testnet.blt.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.testnet.blt.xyz',
			},
		],
	},
	{
		id: 'bob-mainnet-0',
		name: 'BOB Mainnet',
		chainId: 60808,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc.gobob.xyz',
			'wss://rpc.gobob.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.gobob.xyz',
			},
		],
	},
	{
		id: 'boxchain-t4zoh9y5dr',
		name: 'boxchain',
		chainId: 42299,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://boxchain-t4zoh9y5dr.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-boxchain-t4zoh9y5dr.t.conduit.xyz',
			'wss://rpc-boxchain-t4zoh9y5dr.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-boxchain-t4zoh9y5dr.t.conduit.xyz',
			},
		],
	},
	{
		id: 'breach-testnet-89s4hwjp6v',
		name: 'breach-testnet',
		chainId: 98133,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://breach-testnet-89s4hwjp6v.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-breach-testnet-89s4hwjp6v.t.conduit.xyz',
			'wss://rpc-breach-testnet-89s4hwjp6v.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-breach-testnet-89s4hwjp6v.t.conduit.xyz',
			},
		],
	},
	{
		id: 'camp-network-4xje7wy105',
		name: 'camp-network',
		chainId: 90354,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://camp-network-4xje7wy105.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-camp-network-4xje7wy105.t.conduit.xyz',
			'wss://rpc-camp-network-4xje7wy105.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-camp-network-4xje7wy105.t.conduit.xyz',
			},
		],
	},
	{
		id: 'casino-testnet-24ac2kas4x',
		name: 'casino-testnet',
		chainId: 15891,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://casino-testnet-24ac2kas4x.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-casino-testnet-24ac2kas4x.t.conduit.xyz',
			'wss://rpc-casino-testnet-24ac2kas4x.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-casino-testnet-24ac2kas4x.t.conduit.xyz',
			},
		],
	},
	{
		id: 'casterchain-testnet-l3-k2m3cnoqb8',
		name: 'casterchain-testnet-l3',
		chainId: 777777,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://casterchain-testnet-l3-k2m3cnoqb8.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://casterchain.farcaster.com',
			'wss://casterchain.farcaster.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://casterchainscan.io',
			},
		],
	},
	{
		id: 'chronicle-yellowstone-testnet-9qgmzfcohk',
		name: 'Chronicle Yellowstone - Lit Protocol Testnet',
		chainId: 175188,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://chronicle-yellowstone-testnet-9qgmzfcohk-ee92f00c441a5ac4.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://yellowstone-rpc.litprotocol.com',
			'wss://yellowstone-rpc.litprotocol.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://yellowstone-explorer.litprotocol.com',
			},
		],
	},
	{
		id: 'cmdao-bbq-chain-bhj93we3mz',
		name: 'cmdao-bbq-chain',
		chainId: 190,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://cmdao-bbq-chain-bhj93we3mz.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://bbqchain-rpc.commudao.xyz',
			'wss://bbqchain-rpc.commudao.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://bbqchain-exp.commudao.xyz',
			},
		],
	},
	{
		id: 'codex-testnet-ithb8klb1r',
		name: 'Codex Testnet',
		chainId: 6513784,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://codex-testnet-ithb8klb1r-82ca998871981f38.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.codex-stg.xyz',
			'wss://rpc.codex-stg.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.codex-stg.xyz',
			},
		],
	},
	{
		id: 'conduit-privy-demo-x4th9jbvm8',
		name: 'conduit-privy-demo',
		chainId: 20966,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-conduit-privy-demo-x4th9jbvm8.t.conduit.xyz',
			'wss://rpc-conduit-privy-demo-x4th9jbvm8.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-conduit-privy-demo-x4th9jbvm8.t.conduit.xyz',
			},
		],
	},
	{
		id: 'defli-chain-01-jerg8a427n',
		name: 'defli-chain-01',
		chainId: 19582,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://defli-chain-01-jerg8a427n.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-defli-chain-01-jerg8a427n.t.conduit.xyz',
			'wss://rpc-defli-chain-01-jerg8a427n.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-defli-chain-01-jerg8a427n.t.conduit.xyz',
			},
		],
	},
	{
		id: 'degen-mainnet-1',
		name: 'Degen Chain',
		chainId: 666666666,
		parent: {
			type: 'L2',
			chain: 'eip155-8453',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://degen-mainnet-1-57d82ceb00e0c299.mainnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc.degen.tips',
			'wss://rpc.degen.tips',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.degen.tips',
			},
		],
	},
	{
		id: 'donatuz-mainnet-0',
		name: 'Donatuz Mainnet',
		chainId: 42026,
		parent: {
			type: 'L2',
			chain: 'eip155-8453',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.EigenDa,
		},
		rpc: [
			'https://rpc.donatuz.com',
			'wss://rpc.donatuz.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.donatuz.com',
			},
		],
	},
	{
		id: 'donatuz-testnet-7d859quk38',
		name: 'Donatuz Testnet',
		chainId: 42019,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://donatuz-testnet-7d859quk38-2f33acd7c3e2821a.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.EigenDa,
		},
		rpc: [
			'https://rpc-test.donatuz.com',
			'wss://rpc-test.donatuz.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-test.donatuz.com',
			},
		],
	},
	{
		id: 'fragile-harlequin-beaver-c2v8pbfrb9',
		name: 'fragile-harlequin-beaver',
		chainId: 26846,
		parent: {
			type: 'L2',
			chain: 'eip155-999999999',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://fragile-harlequin-beaver-c2v8pbfrb9.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-fragile-harlequin-beaver-c2v8pbfrb9.t.conduit.xyz',
			'wss://rpc-fragile-harlequin-beaver-c2v8pbfrb9.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-fragile-harlequin-beaver-c2v8pbfrb9.t.conduit.xyz',
			},
		],
	},
	{
		id: 'gold-mainnet-0',
		name: 'Gold Mainnet',
		chainId: 4653,
		parent: {
			type: 'L2',
			chain: 'eip155-8453',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://chain-rpc.gold.dev',
			'wss://chain-rpc.gold.dev',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.gold.dev',
			},
		],
	},
	{
		id: 'hedwig-testnet-6uuksiwu6t',
		name: 'hedwig-testnet',
		chainId: 150150,
		parent: {
			type: 'L2',
			chain: 'eip155-919',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://hedwig-testnet-6uuksiwu6t.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-testnet.hedwig.build',
			'wss://rpc-testnet.hedwig.build',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-testnet.hedwig.build',
			},
		],
	},
	{
		id: 'hello-l3-world-g5x787qets',
		name: 'hello-l3-world',
		chainId: 2442,
		parent: {
			type: 'L2',
			chain: 'eip155-919',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://hello-l3-world-g5x787qets.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-hello-l3-world-g5x787qets.t.conduit.xyz',
			'wss://rpc-hello-l3-world-g5x787qets.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-hello-l3-world-g5x787qets.t.conduit.xyz',
			},
		],
	},
	{
		id: 'herodotus-g2odctwqyx',
		name: 'herodotus',
		chainId: 2137420,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://herodotus-g2odctwqyx-f25cc5fc48bc4ece.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
		},
		rpc: [
			'https://rpc-herodotus-g2odctwqyx.t.conduit.xyz',
			'wss://rpc-herodotus-g2odctwqyx.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-herodotus-g2odctwqyx.t.conduit.xyz',
			},
		],
	},
	{
		id: 'kardon-0nmtt9l5r0',
		name: 'kardon',
		chainId: 47528,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://kardon-0nmtt9l5r0.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
		},
		rpc: [
			'https://rpc-kardon-0nmtt9l5r0.t.conduit.xyz',
			'wss://rpc-kardon-0nmtt9l5r0.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-kardon-0nmtt9l5r0.t.conduit.xyz',
			},
		],
	},
	{
		id: 'kinachain-wgz98ps05b',
		name: 'KinaChain',
		chainId: 30397,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://kinachain-wgz98ps05b-8aa191d636c74035.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://api-v1.kinachain.com',
			'wss://api-v1.kinachain.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://scan.kinachain.com',
			},
		],
	},
	{
		id: 'liq-markets-testnet-rpfhpui87b',
		name: 'liq-markets-testnet',
		chainId: 12323,
		parent: {
			type: 'L2',
			chain: 'eip155-919',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://liq-markets-testnet-rpfhpui87b.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-liq-markets-testnet-rpfhpui87b.t.conduit.xyz',
			'wss://rpc-liq-markets-testnet-rpfhpui87b.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-liq-markets-testnet-rpfhpui87b.t.conduit.xyz',
			},
		],
	},
	{
		id: 'lll3-6wwv553o40',
		name: 'L3',
		chainId: 91945,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://lll3-6wwv553o40-de4ac33d97b2fa74.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-lll3-6wwv553o40.t.conduit.xyz',
			'wss://rpc-lll3-6wwv553o40.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-lll3-6wwv553o40.t.conduit.xyz',
			},
		],
	},
	{
		id: 'lyra-mainnet-0',
		name: 'Lyra Mainnet',
		chainId: 957,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.lyra.finance',
			'wss://rpc.lyra.finance',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.lyra.finance',
			},
		],
	},
	{
		id: 'memecoin-3-gy4apoe5lp',
		name: 'memecoin-3',
		chainId: 12049,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-memecoin-3-gy4apoe5lp.t.conduit.xyz',
			'wss://rpc-memecoin-3-gy4apoe5lp.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-memecoin-3-gy4apoe5lp.t.conduit.xyz',
			},
		],
	},
	{
		id: 'metal-mainnet-0',
		name: 'metal-mainnet-0',
		chainId: 1750,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://metal-mainnet.mainnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc.metall2.com',
			'wss://rpc.metall2.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.metall2.com',
			},
		],
	},
	{
		id: 'mint-mainnet-0',
		name: 'Mint Mainnet',
		chainId: 185,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://mint-mainnet-0.mainnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc.mintchain.io',
			'wss://rpc.mintchain.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.mintchain.io',
			},
		],
	},
	{
		id: 'mint-sepolia-testnet-ijtsrc4ffq',
		name: 'Mint Sepolia Testnet',
		chainId: 1687,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://mint-sepolia-testnet-ijtsrc4ffq.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://sepolia-testnet-rpc.mintchain.io',
			'wss://sepolia-testnet-rpc.mintchain.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://sepolia-testnet-explorer.mintchain.io',
			},
		],
	},
	{
		id: 'mode-mainnet-0',
		name: 'Mode Mainnet',
		chainId: 34443,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://mainnet.mode.network',
			'wss://mainnet.mode.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.mode.network',
			},
		],
	},
	{
		id: 'mode-sepolia-vtnhnpim72',
		name: 'Mode Sepolia',
		chainId: 919,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://mode-sepolia-vtnhnpim72.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://sepolia.mode.network',
			'wss://sepolia.mode.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://sepolia.explorer.mode.network',
			},
		],
	},
	{
		id: 'nft-zfsudi6337',
		name: 'NFT.ART',
		chainId: 43068,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://nft-zfsudi6337.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.nft.art',
			'wss://rpc.nft.art',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://scan.nft.art',
			},
		],
	},
	{
		id: 'nutty-white-toucan-4hthksa5n7',
		name: 'nutty-white-toucan',
		chainId: 58250,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://nutty-white-toucan-4hthksa5n7.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-nutty-white-toucan-4hthksa5n7.t.conduit.xyz',
			'wss://rpc-nutty-white-toucan-4hthksa5n7.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-nutty-white-toucan-4hthksa5n7.t.conduit.xyz',
			},
		],
	},
	{
		id: 'onchain-points-8n0qkkpr2j',
		name: 'Onchain Points',
		chainId: 17071,
		parent: {
			type: 'L2',
			chain: 'eip155-8453',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://onchain-points-8n0qkkpr2j-2e823481129b7ebb.mainnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc.onchainpoints.xyz',
			'wss://rpc.onchainpoints.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.onchainpoints.xyz',
			},
		],
	},
	{
		id: 'orderly-l2-4460-sepolia-8tc3sd7dvy',
		name: 'Orderly Testnet',
		chainId: 4460,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://orderly-l2-4460-sepolia-8tc3sd7dvy.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://testnet-rpc.orderly.org',
			'wss://testnet-rpc.orderly.org',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet-explorer.orderly.org',
			},
		],
	},
	{
		id: 'orderly-mainnet-0',
		name: 'Orderly Mainnet',
		chainId: 291,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.orderly.network',
			'wss://rpc.orderly.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.orderly.network',
			},
		],
	},
	{
		id: 'origyn-network-ytbrtr4djq',
		name: 'origyn-network',
		chainId: 86420,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://origyn-network-ytbrtr4djq-c4ad7875058af8fb.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-origyn-network-ytbrtr4djq.t.conduit.xyz',
			'wss://rpc-origyn-network-ytbrtr4djq.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.origyn.alphadevs.dev',
			},
		],
	},
	{
		id: 'ox-chain-2s86s7wp21',
		name: 'OX Chain',
		chainId: 6699,
		parent: {
			type: 'L2',
			chain: 'eip155-8453',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://ox-chain-2s86s7wp21-b5bff5387f11130a.mainnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc.oxscan.io',
			'wss://rpc.oxscan.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://oxscan.io',
			},
		],
	},
	{
		id: 'pgn-mainnet-0',
		name: 'PGN Mainnet',
		chainId: 424,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.publicgoods.network',
			'wss://rpc.publicgoods.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.publicgoods.network',
			},
		],
	},
	{
		id: 'pgn-sepolia-i4td3ji6i0',
		name: 'PGN Testnet',
		chainId: 58008,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://pgn-sepolia-i4td3ji6i0.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://sepolia.publicgoods.network',
			'wss://sepolia.publicgoods.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.sepolia.publicgoods.network',
			},
		],
	},
	{
		id: 'photon-test-dyvm5z44x1',
		name: 'photon-test',
		chainId: 54555,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://photon-test-dyvm5z44x1.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-test.photonchain.io',
			'wss://rpc-test.photonchain.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet.photonchain.io',
			},
		],
	},
	{
		id: 'photon-test2-fwpdejxljj',
		name: 'Photon testnet2',
		chainId: 55551,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://photon-test2-fwpdejxljj.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-test2.photonchain.io',
			'wss://rpc-test2.photonchain.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet2.photonchain.io',
			},
		],
	},
	{
		id: 'play-ai-testnet-vfiyfzat85',
		name: 'PlayAI Testnet',
		chainId: 30821,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://play-ai-testnet-vfiyfzat85-b913d388f5e35baa.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-testnet.playai.network',
			'wss://rpc-testnet.playai.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-testnet.playai.network',
			},
		],
	},
	{
		id: 'prod-testnet-0eakp60405',
		name: 'prod-testnet',
		chainId: 901,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://prod-testnet-0eakp60405.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-prod-testnet-0eakp60405.t.conduit.xyz',
			'wss://rpc-prod-testnet-0eakp60405.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-prod-testnet-0eakp60405.t.conduit.xyz',
			},
		],
	},
	{
		id: 'proofofplay-apex-mainnet-0',
		name: 'Proof of Play Apex',
		chainId: 70700,
		parent: {
			type: 'L2',
			chain: 'eip155-42161',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc.apex.proofofplay.com',
			'wss://rpc.apex.proofofplay.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.apex.proofofplay.com',
			},
		],
	},
	{
		id: 'prost-1h-sv2cc82c3x',
		name: 'Powerloom Testnet (Prost 1H)',
		chainId: 11165,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://prost-1h-sv2cc82c3x.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-prost-1h.powerloom.io',
			'wss://rpc-prost-1h.powerloom.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-prost-1h.powerloom.io',
			},
		],
	},
	{
		id: 'prost-1m-r7hqpbi3do',
		name: 'Powerloom Pre-mainnet (Prost 1M)',
		chainId: 11169,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://prost-1m-r7hqpbi3do-710c5ab3c56383fe.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.EigenDa,
		},
		rpc: [
			'https://rpc-prost1m.powerloom.io',
			'wss://rpc-prost1m.powerloom.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-prost1m.powerloom.io',
			},
		],
	},
	{
		id: 'publish-testnet-ounnpxnfup',
		name: 'publish-testnet',
		chainId: 12547,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://publish-testnet-ounnpxnfup-e853b550713a3b4c.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://testnetrpc.publishinc.io',
			'wss://testnetrpc.publishinc.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet.publishinc.io',
			},
		],
	},
	{
		id: 'puff-bob-jznbxtoq7h',
		name: 'bob-testnet',
		chainId: 111,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://puff-bob-jznbxtoq7h.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://sepolia.rpc.gobob.xyz',
			'wss://sepolia.rpc.gobob.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet-explorer.gobob.xyz',
			},
		],
	},
	{
		id: 'sepolia-superseed-826s35710w',
		name: 'Sepolia Superseed',
		chainId: 53302,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://sepolia-superseed-826s35710w.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://sepolia.superseed.xyz',
			'wss://sepolia.superseed.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://sepolia-explorer.superseed.xyz',
			},
		],
	},
	{
		id: 'shallow-qnrd3xufeb',
		name: 'shallow',
		chainId: 445,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://shallow-qnrd3xufeb.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-shallow-qnrd3xufeb.t.conduit.xyz',
			'wss://rpc-shallow-qnrd3xufeb.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-shallow-qnrd3xufeb.t.conduit.xyz',
			},
		],
	},
	{
		id: 'six-nine-four-two-zero-hfsvasz25m',
		name: 'six-nine-four-two-zero',
		chainId: 6942069,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://six-nine-four-two-zero-hfsvasz25m.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-six-nine-four-two-zero-hfsvasz25m.t.conduit.xyz',
			'wss://rpc-six-nine-four-two-zero-hfsvasz25m.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-six-nine-four-two-zero-hfsvasz25m.t.conduit.xyz',
			},
		],
	},
	{
		id: 'skilled-lavender-donkey-qxjqx1l7iw',
		name: 'skilled-lavender-donkey',
		chainId: 17406,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://skilled-lavender-donkey-qxjqx1l7iw.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.mal.network',
			'wss://rpc.mal.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://scan.mal.network',
			},
		],
	},
	{
		id: 'socialist-crimson-egret-us23k50ftr',
		name: 'socialist-crimson-egret',
		chainId: 56832,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-socialist-crimson-egret-us23k50ftr.t.conduit.xyz',
			'wss://rpc-socialist-crimson-egret-us23k50ftr.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-socialist-crimson-egret-us23k50ftr.t.conduit.xyz',
			},
		],
	},
	{
		id: 'stan-testnet-jv9wf5wws3',
		name: 'Stan Testnet',
		chainId: 88808,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://stan-testnet-jv9wf5wws3.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.EigenDa,
		},
		rpc: [
			'https://rpc.smartly.ventures',
			'wss://rpc.smartly.ventures',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.smartly.ventures',
			},
		],
	},
	{
		id: 'stratovm-bjabr7rqni',
		name: 'StratoVM',
		chainId: 93747,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://stratovm-bjabr7rqni-914ebb28bee9e223.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.stratovm.io',
			'wss://rpc.stratovm.io',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.stratovm.io',
			},
		],
	},
	{
		id: 'superconnect-kkwmx41xx2',
		name: 'superconnect',
		chainId: 19702,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://superconnect-kkwmx41xx2-13265ed1e301e050.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-superconnect-kkwmx41xx2.t.conduit.xyz',
			'wss://rpc-superconnect-kkwmx41xx2.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-superconnect-kkwmx41xx2.t.conduit.xyz',
			},
		],
	},
	{
		id: 'swop-testnet-gpsi47b39a',
		name: 'swop-testnet',
		chainId: 48380,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://swop-testnet-gpsi47b39a.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-swop-testnet-gpsi47b39a.t.conduit.xyz',
			'wss://rpc-swop-testnet-gpsi47b39a.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-swop-testnet-gpsi47b39a.t.conduit.xyz',
			},
		],
	},
	{
		id: 'tragic-blue-barnacle-dhnvfyle0o',
		name: 'tragic-blue-barnacle',
		chainId: 79199,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://tragic-blue-barnacle-dhnvfyle0o.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://rpc-tragic-blue-barnacle-dhnvfyle0o.t.conduit.xyz',
			'wss://rpc-tragic-blue-barnacle-dhnvfyle0o.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-tragic-blue-barnacle-dhnvfyle0o.t.conduit.xyz',
			},
		],
	},
	{
		id: 'vesuvius-as793xpg5g',
		name: 'Chronicle Vesuvius - Lit Protocol Testnet',
		chainId: 2311,
		parent: {
			type: 'L2',
			chain: 'eip155-421614',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://vesuvius-as793xpg5g-02715ed21ab71892.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
			dataAvailabilityLayer: DataAvailabilityProvider.ArbitrumAnytrust,
		},
		rpc: [
			'https://vesuvius-rpc.litprotocol.com',
			'wss://vesuvius-rpc.litprotocol.com',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://vesuvius-explorer.litprotocol.com',
			},
		],
	},
	{
		id: 'wave-rq3xhlxu3s',
		name: 'wave',
		chainId: 12813,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://wave-rq3xhlxu3s.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-wave-rq3xhlxu3s.t.conduit.xyz',
			'wss://rpc-wave-rq3xhlxu3s.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-wave-rq3xhlxu3s.t.conduit.xyz',
			},
		],
	},
	{
		id: 'wonderful-sapphire-orca-06mqimj955',
		name: 'wonderful-sapphire-orca',
		chainId: 111041,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-wonderful-sapphire-orca-06mqimj955.t.conduit.xyz',
			'wss://rpc-wonderful-sapphire-orca-06mqimj955.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-wonderful-sapphire-orca-06mqimj955.t.conduit.xyz',
			},
		],
	},
	{
		id: 'xprotocol-testnet-kzg4iy2205',
		name: 'XProtocol Testnet',
		chainId: 83144,
		parent: {
			type: 'L2',
			chain: 'eip155-84532',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://xprotocol-testnet-kzg4iy2205-78dfc42d43b4628b.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc.testnet.xprotocol.org',
			'wss://rpc.testnet.xprotocol.org',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.testnet.xprotocol.org',
			},
		],
	},
	{
		id: 'yourseed-do21uz4fue',
		name: 'yourseed',
		chainId: 3897,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-yourseed-do21uz4fue.t.conduit.xyz',
			'wss://rpc-yourseed-do21uz4fue.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-yourseed-do21uz4fue.t.conduit.xyz',
			},
		],
	},
	{
		id: 'zcloak-testnet-acd9a0cwwb',
		name: 'zcloak-testnet',
		chainId: 17688,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://zcloak-testnet-acd9a0cwwb-dc1fc83385c5c725.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://testnet-rpc.zcloak.network',
			'wss://testnet-rpc.zcloak.network',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://testnet.zcloak.network',
			},
		],
	},
	{
		id: 'zero-dev-arb-orbit-50jwa02os2',
		name: 'zero-dev-arb-orbit',
		chainId: 15893,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.ArbitrumOrbit,
		},
		rpc: [
			'https://rpc-zero-dev-arb-orbit-50jwa02os2.t.conduit.xyz',
			'wss://rpc-zero-dev-arb-orbit-50jwa02os2.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-zero-dev-arb-orbit-50jwa02os2.t.conduit.xyz',
			},
		],
	},
	{
		id: 'zero-dev-op-stack-ja2munlcde',
		name: 'zero-dev-op-stack',
		chainId: 75920,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://zero-dev-op-stack-ja2munlcde-08e01d7d28772e42.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc-zero-dev-op-stack-ja2munlcde.t.conduit.xyz',
			'wss://rpc-zero-dev-op-stack-ja2munlcde.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-zero-dev-op-stack-ja2munlcde.t.conduit.xyz',
			},
		],
	},
	{
		id: 'zesty-turquoise-mastodon-7hpfe3rj8b',
		name: 'zesty-turquoise-mastodon',
		chainId: 59578,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://zesty-turquoise-mastodon-7hpfe3rj8b.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
			dataAvailabilityLayer: DataAvailabilityProvider.Celestia,
		},
		rpc: [
			'https://rpc-zesty-turquoise-mastodon-7hpfe3rj8b.t.conduit.xyz',
			'wss://rpc-zesty-turquoise-mastodon-7hpfe3rj8b.t.conduit.xyz',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer-zesty-turquoise-mastodon-7hpfe3rj8b.t.conduit.xyz',
			},
		],
	},
	{
		id: 'zora-mainnet-0',
		name: 'Zora Mainnet',
		chainId: 7777777,
		parent: {
			type: 'L2',
			chain: 'eip155-1',
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://rpc.zora.energy',
			'wss://rpc.zora.energy',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://explorer.zora.energy',
			},
		],
	},
	{
		id: 'zora-sepolia-0thyhxtf5e',
		name: 'Zora Sepolia Testnet',
		chainId: 999999999,
		parent: {
			type: 'L2',
			chain: 'eip155-11155111',
			bridges: [
				{
					name: 'Superbridge Rollies',
					url: 'https://zora-sepolia-0thyhxtf5e.testnets.rollbridge.app',
				},
			],
		},
		rollup: {
			provider: RollupProvider.Conduit,
			stack: RollupStack.OpStack,
		},
		rpc: [
			'https://sepolia.rpc.zora.energy',
			'wss://sepolia.rpc.zora.energy',
		],
		explorers: [
			{
				name: 'Blockscout',
				url: 'https://sepolia.explorer.zora.energy',
			},
		],
	},
] as const satisfies NetworkWithRollupInfo[]

export const conduitNetworkByChainId = new Map(
	conduitNetworks
		.map(network => [
			network.chainId,
			network,
		])
)
