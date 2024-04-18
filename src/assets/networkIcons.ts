// Types
import type { Ethereum } from '$/data/networks/types'


// Components
import ArbitrumIcon from './networks/Arbitrum.svg'
import AuroraIcon from './networks/Aurora.svg'
import AvalancheIcon from './networks/Avalanche.svg'
import BaseIcon from './networks/Base.svg'
import CeloIcon from './networks/Celo.svg'
import CronosIcon from './networks/Cronos.svg'
import DegenIcon from './tokens/DEGEN.svg'
import EvmosIcon from './networks/Evmos.svg'
import EthereumIcon from './networks/Ethereum.svg'
import FilecoinIcon from './networks/Filecoin.svg'
import FvmIcon from './networks/FVM.svg'
import GnosisIcon from './networks/Gnosis.svg'
import HarmonyIcon from './networks/Harmony.svg'
import MetisIcon from './networks/Metis.png'
import ModeIcon from './networks/Mode.svg'
// import NahmiiIcon from './networks/Nahmii.svg'
// import NervosIcon from './networks/Nervos.svg'
import OptimismIcon from './networks/Optimism.svg'
import PolygonIcon from './networks/Polygon.svg'
import PolygonZkevmIcon from './networks/Polygon-zkEVM.svg'
import ScrollIcon from './networks/Scroll.svg'
// import ReefIcon from './networks/Reef.svg'
import SKALEIcon from './networks/SKALE.svg'
import ZoraIcon from './networks/Zora.svg'

import { tokenIcons } from './tokenIcons'

export const networkIcons = {
	'arbitrum-one': ArbitrumIcon,
	'aurora': AuroraIcon,
	'avalanche': tokenIcons.AVAX, // AvalancheIcon,
	'base': BaseIcon,
	'celo': CeloIcon,
	'cronos': CronosIcon,
	'degen': DegenIcon,
	'ethereum': tokenIcons.ETH, // EthereumIcon,
	'evmos': EvmosIcon,
	'filecoin': FilecoinIcon,
	'fvm': FvmIcon,
	'gnosis': GnosisIcon,
	'harmony': HarmonyIcon,
	'mantle': tokenIcons.MNT,
	'metis': MetisIcon,
	'mode': ModeIcon,
	'optimism': OptimismIcon,
	// 'nahmii': NahmiiIcon,
	// 'nervos': NervosIcon,
	'polygon': tokenIcons.MATIC, // PolygonIcon,
	'polygon-zkevm': PolygonZkevmIcon, // PolygonIcon,
	// 'reef': ReefIcon,
	'scroll': ScrollIcon,
	'skale': SKALEIcon,
	'zora': ZoraIcon,
} as const satisfies Record<Ethereum.NetworkSlug, string>
