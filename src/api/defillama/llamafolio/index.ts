// Types/constants
import type { Ethereum } from '$/data/networks/types'

export const supportedChains = {
	'arbitrum': 42161,
	'arbitrum-nova': 42170,
	'avalanche': 43114,
	'base': 8453,
	'bnb-chain': 56,
	'celo': 42220,
	'ethereum': 1,
	'fantom': 250,
	'gnosis': 100,
	'linea': 59144,
	'moonbeam': 1284,
	'opbnb': 204,
	'optimism': 10,
	'polygon': 137,
	'polygon-zkevm': 1101,
	'zksync-era': 324,
} satisfies Record<string, Ethereum.ChainId>

export type ChainName = keyof typeof supportedChains

// https://github.com/llamafolio/llamafolio-api/tree/master/src/adapters
export type LlamafolioAdapterName = (
	| '0vix'
	| '1inch-network'
	| '9inch'
	| 'aave-v2'
	| 'aave-v3'
	| 'abracadabra'
	| 'across'
	| 'aerodrome'
	| 'affine-defi'
	| 'agave'
	| 'agility-lsd'
	| 'alchemix'
	| 'alien-base'
	| 'alongside'
	| 'alpaca-finance'
	| 'ambient'
	| 'ambire-wallet'
	| 'amphor'
	| 'angle'
	| 'ankr'
	| 'annex'
	| 'apeswap-amm'
	| 'apeswap-lending'
	| 'api3'
	| 'apollox'
	| 'apwine'
	| 'arbis-finance'
	| 'arbitrum-exchange'
	| 'arbswap'
	| 'arc-swap'
	| 'arpa-staking'
	| 'arrakis-finance'
	| 'asymetrix-protocol'
	| 'asymmetry-finance'
	| 'atlantis-loans'
	| 'atlas-usv'
	| 'augury-finance'
	| 'aura'
	| 'avalaunch'
	| 'azuro'
	| 'b.protocol'
	| 'babylon-finance'
	| 'badger-dao'
	| 'balancer'
	| 'bancor-v3'
	| 'bank-ai'
	| 'basedmarkets'
	| 'baseswap'
	| 'bedrock-unieth'
	| 'beefy'
	| 'beethoven-x'
	| 'bella-protocol'
	| 'belt-finance'
	| 'benddao'
	| 'benqi-lending'
	| 'benqi-staked-avax'
	| 'bifrost-liquid-staking'
	| 'big-data-protocol'
	| 'binance-staked-eth'
	| 'binaryx-platform'
	| 'biswap'
	| 'blackrockfund'
	| 'blast'
	| 'bloom'
	| 'blueberry-lend'
	| 'blueprint'
	| 'blur'
	| 'bob-fusion'
	| 'bunni'
	| 'cap-finance'
	| 'cat-in-a-box'
	| 'cega'
	| 'centrifuge'
	| 'chainlink'
	| 'channels-finance'
	| 'charm-finance'
	| 'citadao'
	| 'citadelswap'
	| 'clearpool'
	| 'clever'
	| 'coinbase-wrapped-staked-eth'
	| 'coinwind'
	| 'colony'
	| 'compound-v2'
	| 'compound-v3'
	| 'concentrator'
	| 'conic-finance'
	| 'convex-finance'
	| 'copra-finance'
	| 'cow-swap'
	| 'cozy-finance'
	| 'cream-finance'
	| 'cream-lending'
	| 'creth2'
	| 'crvusd'
	| 'curve-dex'
	| 'cvault-finance'
	| 'cyclone'
	| 'cygnus-finance'
	| 'davos-protocol'
	| 'defi-swap'
	| 'definitive.fi'
	| 'definix'
	| 'defiplaza'
	| 'deltaprime'
	| 'derivadex'
	| 'dforce'
	| 'dhedge'
	| 'dinero-pirexeth'
	| 'dyad'
	| 'dydx'
	| 'eigenlayer'
	| 'elephant-money'
	| 'ellipsis-finance'
	| 'equalizer-exchange'
	| 'equilibria'
	| 'ethena'
	| 'ether.fi'
	| 'ethos-reserve'
	| 'euclid-finance'
	| 'euler'
	| 'everrise'
	| 'exactly'
	| 'extra-finance'
	| 'fantohm'
	| 'firebot'
	| 'flamincome'
	| 'floor-dao'
	| 'florence-finance'
	| 'fluid'
	| 'flux-finance'
	| 'fortress-loans'
	| 'fractional-art'
	| 'frax-finance'
	| 'fraxlend'
	| 'ft33-dao'
	| 'fx-protocol'
	| 'fyde-protocol'
	| 'gains-network'
	| 'gambit-trade'
	| 'gamma'
	| 'gammaswap'
	| 'gearbox'
	| 'geist'
	| 'genesis-lrt'
	| 'gensokishi'
	| 'get-protocol'
	| 'gitcoin'
	| 'giveth'
	| 'glori-finance'
	| 'gmx'
	| 'gmx-v1'
	| 'gmx-v2'
	| 'gnosis-protocol-v1'
	| 'gogopool'
	| 'goldfinch'
	| 'goodentry'
	| 'granary-finance'
	| 'gravita-protocol'
	| 'gro'
	| 'gyro'
	| 'hector-network'
	| 'hex'
	| 'hmx'
	| 'homora-v2'
	| 'honeyswap'
	| 'hop-protocol'
	| 'hopr'
	| 'horiza'
	| 'horizon-protocol'
	| 'houdini-swap'
	| 'hundred-finance'
	| 'idle'
	| 'illuvium'
	| 'infusion'
	| 'integral'
	| 'interport-finance'
	| 'inverse-finance'
	| 'ipor'
	| 'iron-bank'
	| 'izumi-finance'
	| 'jaypeggers'
	| 'jones-dao'
	| 'karak'
	| 'keep3r-network'
	| 'kelp-dao'
	| 'keom-protocol'
	| 'kine-finance'
	| 'kinza-finance'
	| 'klima-dao'
	| 'kokonut-swap'
	| 'kommunitas'
	| 'kwenta'
	| 'kyberswap'
	| 'layerbank'
	| 'leonicornswap'
	| 'levinswap'
	| 'lido'
	| 'life-dao'
	| 'linear-finance'
	| 'liqee'
	| 'liquid-collective'
	| 'liquid-driver'
	| 'liquid-finance'
	| 'liquity'
	| 'llama-airforce'
	| 'llamapay'
	| 'locus-finance'
	| 'lodestar-finance'
	| 'looksrare'
	| 'lusd-chickenbonds'
	| 'lybra-v1'
	| 'lybra-v2'
	| 'lyra'
	| 'magnate-finance'
	| 'magpie'
	| 'makerdao'
	| 'mantisswap'
	| 'mantle-staked-eth'
	| 'maple'
	| 'matrix-farm'
	| 'mdex'
	| 'mean-finance'
	| 'mendi-finance'
	| 'merit-circle'
	| 'merlins-seal'
	| 'mesher'
	| 'meta-pool'
	| 'metronome'
	| 'mev-protocol'
	| 'moonwell'
	| 'morpheus-swap'
	| 'morphex'
	| 'morpho-aave'
	| 'morpho-aavev3'
	| 'morpho-blue'
	| 'morpho-compound'
	| 'mountain-protocol'
	| 'mover'
	| 'mstable'
	| 'mu-exchange'
	| 'mugenfinance'
	| 'multichain'
	| 'mummy-finance'
	| 'nasdex'
	| 'nemesis-dao'
	| 'neopin-pool'
	| 'nexus-mutual'
	| 'nf3-ape'
	| 'nodedao'
	| 'notional'
	| 'olympus-dao'
	| 'ondo-finance'
	| 'onyx-protocol'
	| 'openxswap'
	| 'opium'
	| 'opx-finance'
	| 'opyn-squeeth'
	| 'origin-defi'
	| 'origin-dollar'
	| 'overnight-finance'
	| 'paal-ai'
	| 'paladin-finance'
	| 'paladin-warlord'
	| 'pancakeswap'
	| 'pandora'
	| 'pangolin'
	| 'parallel-protocol'
	| 'paraswap'
	| 'peapods-finance'
	| 'pearlfi'
	| 'pendle'
	| 'perennial'
	| 'perion'
	| 'perpetual-protocol'
	| 'piedao'
	| 'pika-protocol'
	| 'pingu-exchange'
	| 'platypus-finance'
	| 'pods'
	| 'polkastarter'
	| 'poolside'
	| 'popsicle-finance'
	| 'preon-finance'
	| 'prime-staked-eth'
	| 'prisma-finance'
	| 'protectorate-protocol'
	| 'proxy'
	| 'pstake-finance'
	| 'puffer-finance'
	| 'purple-bridge-dex'
	| 'qidao'
	| 'quickswap-dex'
	| 'radiant-v1'
	| 'radiant-v2'
	| 'radioshack'
	| 'raft'
	| 'rage-trade'
	| 'railgun'
	| 'ramses-exchange'
	| 'range-protocol'
	| 'realt'
	| 'reaper-farm'
	| 'redacted'
	| 'reflexer'
	| 'renzo'
	| 'reserve'
	| 'restake-finance'
	| 'retro'
	| 'rhino.fi'
	| 'ribbon-finance'
	| 'rocket-pool'
	| 'rocketswap-base'
	| 'rook'
	| 'rubicon'
	| 'sakeperp'
	| 'scale'
	| 'scream'
	| 'sdai'
	| 'seamless-protocol'
	| 'sentiment'
	| 'set-protocol'
	| 'sharedstake'
	| 'shell-protocol'
	| 'sherlock'
	| 'shibaswap'
	| 'sideshift'
	| 'silo-finance'
	| 'smardex'
	| 'smoothy'
	| 'snowbank'
	| 'solid-world'
	| 'solidlizard'
	| 'solidly-v2'
	| 'solv-protocol'
	| 'sommelier'
	| 'sonne-finance'
	| 'soswap'
	| 'spark'
	| 'spartacus'
	| 'spartadex'
	| 'sphere-finance'
	| 'spice-finance'
	| 'spiritswap'
	| 'spookyswap'
	| 'spool'
	| 'stabl.fi'
	| 'stader'
	| 'stafi'
	| 'stake.link'
	| 'stakedao'
	| 'stakehound'
	| 'stakewise'
	| 'stargate'
	| 'steer-protocol'
	| 'strike'
	| 'sturdy'
	| 'stusdt'
	| 'sudoswap'
	| 'summer.fi'
	| 'superfarm'
	| 'sushiswap'
	| 'swaap'
	| 'swapbased'
	| 'swapr'
	| 'swell'
	| 'synapse'
	| 'synclub-staked-bnb'
	| 'syncus'
	| 'synthetix'
	| 'tangible'
	| 'templedao'
	| 'tender-finance'
	| 'tensorplex'
	| 'tetu'
	| 'thales'
	| 'the-idols'
	| 'the-open-dao-sos'
	| 'thena'
	| 'tholgar'
	| 'tigris'
	| 'timewarp'
	| 'tokemak'
	| 'tokenlon'
	| 'tonpound'
	| 'tornado-cash'
	| 'toupee.tech'
	| 'tprotocol'
	| 'trader-joe'
	| 'treasuredao'
	| 'truefi'
	| 'trufin-protocol'
	| 'trustswap'
	| 'umami-finance'
	| 'unicly'
	| 'uniswap-v2'
	| 'uniswap-v3'
	| 'unitus'
	| 'unsheth'
	| 'usdfi-lending'
	| 'uwu-lend'
	| 'valas-finance'
	| 'vapordex'
	| 'vault-tech'
	| 'vector-finance'
	| 'vector-reserve'
	| 'velodrome-v1'
	| 'velodrome-v2'
	| 'venus'
	| 'verse'
	| 'vesper'
	| 'virtuswap'
	| 'volta-club'
	| 'vulcandex'
	| 'wagmi'
	| 'wallet'
	| 'wepiggy'
	| 'whiteheart'
	| 'wigoswap'
	| 'winr-protocol'
	| 'wombat-exchange'
	| 'woofi'
	| 'x2y2'
	| 'yama-finance'
	| 'yamato-protocol'
	| 'yearn-finance'
	| 'yieldflow'
	| 'yoshi-exchange'
	| 'zerolend'
	| 'zharta'
	| 'zircuit-staking'
	| 'zoodao'
	| 'zyberswap'
)

export type ProtocolWithBalances = (
	| {
		id: 'wallet',
		chain: ChainName,
		balanceUSD: number,
		debtUSD: 0,
		rewardUSD: 0,
		groups: {
			balanceUSD: number,
			balances: Balance[],
		}[]
	}
	| {
		id: Exclude<LlamafolioAdapterName, 'wallet'>,
		chain: ChainName,
		balanceUSD: number,
		debtUSD: number,
		rewardUSD: number,
		groups: {
			fromAddress: Ethereum.Address,
			balanceUSD: number,
			debtUSD: number,
			rewardUSD: number,
			balances: DefiBalance[],
		}[],
		isDeprecated: true,
	}
)

type Balance = (
	& (
		| Record<string, never>
		| {
			name: string,
		}
	)
	& {
		address: Ethereum.Address,
		symbol: string,
		decimals: number,
	}
	& (
		| Record<string, never>
		| {
			stable: boolean,
		}
	)
	& {
		amount: number | `${bigint}`,
	}
	& (
		| Record<string, never>
		| {
			price: number,
			balanceUSD: number,
		}
	)
)

type DefiBalance = (
	& Balance
	& (
		| Record<string, never>
		| {
			category: 'farm',
			underlyings: Balance[],
		}
		| {
			category: 'lend',
			collateralUSD: number,
			underlyings: Balance[],
		}
		| {
			category: 'lp',
			underlyings: Balance[],
		}
		| {
			category: 'stake',
			underlyings: Balance[],
		}
	)
)

export type Protocol = {
	name: string,
	url: string,
	logo: string,
	category: string,
	slug: string,
	chains: ChainName[],
	symbol: string,
	tvl: number,
	twitter: string,
	description: string,
}


// Functions
import {
	getBalancesByAddress as _getBalancesByAddress,
	getProtocols as _getProtocols,
} from './api'

export const getBalancesByAddress = async ({
	address,
}: {
	address: Ethereum.Address,
}) => (
	await _getBalancesByAddress(
		address
	)
		.then(result => JSON.parse(result))
) as {
	status: string,
	updatedAt: number,
	nextUpdateAt: number,
	protocols: ProtocolWithBalances[],
}

export const getProtocols = async () => (
	await _getProtocols()
		.then(result => JSON.parse(result))
) as {
	protocols: Protocol[],
	count: number,
}
