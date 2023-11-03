import { networksBySlug } from '.'

export const consensusMechanisms = {
	'ethash': {
		type: 'Proof of Work',
		algorithm: 'Ethash',
		links: [
			'https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash/',
		],
	},
	'gasper': {
		type: 'Proof of Stake',
		algorithm: 'Gasper',
		links: [
			'https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/gasper/',
			'https://arxiv.org/abs/2003.03052',
		],
	},
}

export const updatesByNetwork = new Map([
	[networksBySlug['ethereum'], [
		// {
		// 	name: 'Shanghai',
		// 	blockNumber: ,
		// 	consensus: consensusMechanisms.proofOfStake,
		// 	links: [],
		// },
		{
			name: 'Paris',
			blockNumber: 15537394n,
			consensus: consensusMechanisms.gasper,
			links: [
				'https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement',
			],
		},
		{
			name: 'Gray Glacier',
			blockNumber: 15050000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2022/06/16/gray-glacier-announcement',
			]
		},
		{
			name: 'Arrow Glacier',
			blockNumber: 13773000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement',
			]
		},
		{
			name: 'London',
			blockNumber: 12965000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2021/07/15/london-mainnet-announcement',
				'https://eips.ethereum.org/EIPS/eip-1559',
				'https://eips.ethereum.org/EIPS/eip-3198',
				'https://eips.ethereum.org/EIPS/eip-3529',
				'https://eips.ethereum.org/EIPS/eip-3541',
				'https://eips.ethereum.org/EIPS/eip-3554',
			],
		},
		{
			name: 'Berlin',
			blockNumber: 12244000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement',
				'https://eips.ethereum.org/EIPS/eip-2070',
			],
		},
		{
			name: 'Muir Glacier',
			blockNumber: 9200000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement',
				'https://eips.ethereum.org/EIPS/eip-2387',
			],
		},
		{
			name: 'Istanbul',
			blockNumber: 9069000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement',
				'https://eips.ethereum.org/EIPS/eip-1679',
			],
		},
		{
			name: 'Constantinople',
			blockNumber: 7280000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2019/01/11/ethereum-constantinople-upgrade-announcement',
				'https://eips.ethereum.org/EIPS/eip-1013',
			],
		},
		{
			name: 'Byzantium',
			blockNumber: 4370000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement',
				'https://eips.ethereum.org/EIPS/eip-609',
			],
		},
		{
			name: 'Spurious Dragon',
			blockNumber: 2675000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://eips.ethereum.org/EIPS/eip-607',
				'https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon',
			],
		},
		{
			name: 'Tangerine Whistle',
			blockNumber: 2463000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/',
				'https://blog.ethereum.org/2016/10/13/announcement-imminent-hard-fork-eip150-gas-cost-changes',
				'https://eips.ethereum.org/EIPS/eip-608',
				'https://eips.ethereum.org/EIPS/eip-150',
			],
		},
		{
			name: 'DAO Fork',
			blockNumber: 1920000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2016/07/20/hard-fork-completed',
				'https://eips.ethereum.org/EIPS/eip-779',
			],
			hardForks: [
				networksBySlug['ethereum-classic'],
			],
		},
		{
			name: 'Homestead',
			blockNumber: 1150000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2016/02/29/homestead-release',
				'https://eips.ethereum.org/EIPS/eip-2',
			],
		},
		{
			name: 'Thawing Frontier',
			blockNumber: 200000n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2015/08/04/the-thawing-frontier',
				'https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1',
			]
		},
		{
			name: 'Frontier',
			blockNumber: 1n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare',
			],
		},
		{
			name: 'Genesis',
			blockNumber: 0n,
			consensus: consensusMechanisms.ethash,
			links: [
				'https://blog.ethereum.org/2015/07/27/final-steps',
			]
		},
	]]
])
