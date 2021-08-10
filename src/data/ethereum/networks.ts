import type { Ethereum } from './types'

import { INFURA_PROJECT_ID } from '../../config-secrets'


// https://github.com/ethereum-lists/chains
// https://chainid.network

export const networks: Ethereum.Network[] = [
	{
		"name": "Acala Mandala Testnet",
		"chainId": 595,
		"shortName": "maca",
		"slug": "acala-mandala",
		"chain": "mACA",
		"network": "testnet",
		"networkId": 595,
		"nativeCurrency": {
			"name": "Acala Mandala Token",
			"symbol": "mACA",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://acala.network"
	},
	{
		"name": "Acala Network",
		"chainId": 787,
		"shortName": "aca",
		"slug": "acala",
		"chain": "ACA",
		"network": "mainnet",
		"networkId": 787,
		"nativeCurrency": {
			"name": "Acala Token",
			"symbol": "ACA",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://acala.network"
	},
	{
		"name": "Akroma",
		"chainId": 200625,
		"shortName": "aka",
		"slug": "akroma",
		"chain": "AKA",
		"network": "mainnet",
		"networkId": 200625,
		"nativeCurrency": {
			"name": "Akroma Ether",
			"symbol": "AKA",
			"decimals": 18
		},
		"rpc": [
			"https://remote.akroma.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://akroma.io"
	},
	{
		"name": "Aquachain",
		"chainId": 61717561,
		"shortName": "aqua",
		"slug": "aquachain",
		"chain": "AQUA",
		"network": "mainnet",
		"networkId": 61717561,
		"nativeCurrency": {
			"name": "Aquachain Ether",
			"symbol": "AQUA",
			"decimals": 18
		},
		"rpc": [
			"https://c.onical.org",
			"https://tx.aquacha.in/api"
		],
		"faucets": [
			"https://aquacha.in/faucet"
		],
		"explorers": [],
		"infoURL": "https://aquachain.github.io"
	},
	{
		"name": "ARTIS sigma1",
		"chainId": 246529,
		"shortName": "ats",
		"slug": "artis",
		"chain": "ARTIS",
		"network": "sigma1",
		"networkId": 246529,
		"nativeCurrency": {
			"name": "ARTIS sigma1 Ether",
			"symbol": "ATS",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.sigma1.artis.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://artis.eco"
	},
	{
		"name": "ARTIS Testnet tau1",
		"chainId": 246785,
		"shortName": "atstau",
		"slug": "artis-tau1",
		"chain": "ARTIS",
		"network": "tau1",
		"networkId": 246785,
		"nativeCurrency": {
			"name": "ARTIS tau1 Ether",
			"symbol": "tATS",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.tau1.artis.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://artis.network"
	},
	{
		"name": "Atheios",
		"chainId": 1620,
		"shortName": "ath",
		"slug": "atheios",
		"chain": "ATH",
		"network": "mainnet",
		"networkId": 11235813,
		"nativeCurrency": {
			"name": "Atheios Ether",
			"symbol": "ATH",
			"decimals": 18
		},
		"rpc": [
			"https://wallet.atheios.com:8797"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://atheios.com"
	},
	{
		"name": "Athereum",
		"chainId": 43110,
		"shortName": "avaeth",
		"slug": "athereum",
		"chain": "ATH",
		"network": "athereum",
		"networkId": 43110,
		"nativeCurrency": {
			"name": "Athereum Ether",
			"symbol": "ATH",
			"decimals": 18
		},
		"rpc": [
			"https://ava.network:21015/ext/evm/rpc"
		],
		"faucets": [
			"http://athfaucet.ava.network//?address=${ADDRESS}"
		],
		"explorers": [],
		"infoURL": "https://athereum.ava.network"
	},
	{
		"name": "Auxilium Network",
		"chainId": 28945486,
		"shortName": "auxi",
		"slug": "auxilium",
		"chain": "AUX",
		"network": "mainnet",
		"networkId": 28945486,
		"nativeCurrency": {
			"name": "Auxilium coin",
			"symbol": "AUX",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.auxilium.global"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://auxilium.global"
	},
	{
		"name": "Avalanche C-Chain",
		"chainId": 43114,
		"shortName": "Avalanche",
		"slug": "avalanche",
		"chain": "AVAX",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Avalanche",
			"symbol": "AVAX",
			"decimals": 18
		},
		"rpc": [
			"https://api.avax.network/ext/bc/C/rpc"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://cchain.explorer.avax.network/"
	},
	{
		"name": "Avalanche Fuji Testnet",
		"chainId": 43113,
		"shortName": "Fuji",
		"slug": "avalanche-fuji",
		"chain": "AVAX",
		"network": "testnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Avalanche",
			"symbol": "AVAX",
			"decimals": 18
		},
		"rpc": [
			"https://api.avax-test.network/ext/bc/C/rpc"
		],
		"faucets": [
			"https://faucet.avax-test.network/"
		],
		"explorers": [],
		"infoURL": "https://cchain.explorer.avax-test.network"
	},
	{
		"name": "Beresheet Testnet",
		"chainId": 2022,
		"shortName": "edgt",
		"slug": "beresheet-testnet",
		"chain": "EDG",
		"network": "beresheet",
		"networkId": 2022,
		"nativeCurrency": {
			"name": "Testnet Edge",
			"symbol": "tEDG",
			"decimals": 18
		},
		"rpc": [
			"https://beresheet1.edgewa.re"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "http://edgewa.re"
	},
	{
		"name": "Binance Smart Chain",
		"chainId": 56,
		"shortName": "bnb",
		"slug": "bsc",
		"chain": "BSC",
		"network": "mainnet",
		"networkId": 56,
		"nativeCurrency": {
			"name": "Binance Chain Native Token",
			"symbol": "BNB",
			"decimals": 18
		},
		"rpc": [
			"https://bsc-dataseed1.binance.org",
			"https://bsc-dataseed2.binance.org",
			"https://bsc-dataseed3.binance.org",
			"https://bsc-dataseed4.binance.org",
			"https://bsc-dataseed1.defibit.io",
			"https://bsc-dataseed2.defibit.io",
			"https://bsc-dataseed3.defibit.io",
			"https://bsc-dataseed4.defibit.io",
			"https://bsc-dataseed1.ninicoin.io",
			"https://bsc-dataseed2.ninicoin.io",
			"https://bsc-dataseed3.ninicoin.io",
			"https://bsc-dataseed4.ninicoin.io",
			"wss://bsc-ws-node.nariox.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.binance.org"
	},
	{
		"name": "Binance Smart Chain Testnet",
		"chainId": 97,
		"shortName": "bnbt",
		"slug": "bsc-testnet",
		"chain": "BSC",
		"network": "Chapel",
		"networkId": 97,
		"nativeCurrency": {
			"name": "Binance Chain Native Token",
			"symbol": "tBNB",
			"decimals": 18
		},
		"rpc": [
			"https://data-seed-prebsc-1-s1.binance.org:8545",
			"https://data-seed-prebsc-2-s1.binance.org:8545",
			"https://data-seed-prebsc-1-s2.binance.org:8545",
			"https://data-seed-prebsc-2-s2.binance.org:8545",
			"https://data-seed-prebsc-1-s3.binance.org:8545",
			"https://data-seed-prebsc-2-s3.binance.org:8545"
		],
		"faucets": [
			"https://testnet.binance.org/faucet-smart"
		],
		"explorers": [],
		"infoURL": "https://testnet.binance.org/"
	},
	{
		"name": "Bitcoin",
		"chainId": undefined,
		"shortName": "btc",
		"slug": "bitcoin",
		"chain": "BTC",
		"network": "mainnet",
		"networkId": undefined,
		"nativeCurrency": {
			"name": "Bitcoin",
			"symbol": "BTC",
			"decimals": 8
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://bitcoin.org"
	},
	{
		"name": "bloxberg",
		"chainId": 8995,
		"shortName": "berg",
		"slug": "bloxberg",
		"chain": "bloxberg",
		"network": "mainnet",
		"networkId": 8995,
		"nativeCurrency": {
			"name": "BERG",
			"symbol": "U+25B3",
			"decimals": 18
		},
		"rpc": [
			"https://core.bloxberg.org"
		],
		"faucets": [
			"https://faucet.bloxberg.org/"
		],
		"explorers": [],
		"infoURL": "https://bloxberg.org"
	},
	{
		"name": "Callisto",
		"chainId": 820,
		"shortName": "clo",
		"slug": "callisto",
		"chain": "CLO",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Callisto Mainnet Ether",
			"symbol": "CLO",
			"decimals": 18
		},
		"rpc": [
			"https://clo-geth.0xinfra.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://callisto.network"
	},
	{
		"name": "Callisto Testnet",
		"chainId": 821,
		"shortName": "tclo",
		"slug": "callisto-testnet",
		"chain": "CLO",
		"network": "testnet",
		"networkId": 2,
		"nativeCurrency": {
			"name": "Callisto Testnet Ether",
			"symbol": "TCLO",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://callisto.network"
	},
	{
		"name": "Celo",
		"chainId": 42220,
		"shortName": "CELO",
		"slug": "celo",
		"chain": "CELO",
		"network": "Mainnet",
		"networkId": 42220,
		"nativeCurrency": {
			"name": "CELO",
			"symbol": "CELO",
			"decimals": 18
		},
		"rpc": [
			"https://forno.celo.org",
			"wss://forno.celo.org/ws"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://docs.celo.org/"
	},
	{
		"name": "Celo Alfajores Testnet",
		"chainId": 44787,
		"shortName": "ALFA",
		"slug": "celo-alfajores",
		"chain": "CELO",
		"network": "Alfajores",
		"networkId": 44787,
		"nativeCurrency": {
			"name": "CELO",
			"symbol": "CELO",
			"decimals": 18
		},
		"rpc": [
			"https://alfajores-forno.celo-testnet.org",
			"wss://alfajores-forno.celo-testnet.org/ws"
		],
		"faucets": [
			"https://celo.org/developers/faucet",
			"https://cauldron.pretoriaresearchlab.io/alfajores-faucet"
		],
		"explorers": [],
		"infoURL": "https://docs.celo.org/"
	},
	{
		"name": "Celo Baklava Testnet",
		"chainId": 62320,
		"shortName": "BKLV",
		"slug": "celo-baklava",
		"chain": "CELO",
		"network": "Baklava",
		"networkId": 62320,
		"nativeCurrency": {
			"name": "CELO",
			"symbol": "CELO",
			"decimals": 18
		},
		"rpc": [
			"https://baklava-forno.celo-testnet.org"
		],
		"faucets": [
			"https://docs.google.com/forms/d/e/1FAIpQLSdfr1BwUTYepVmmvfVUDRCwALejZ-TUva2YujNpvrEmPAX2pg/viewform",
			"https://cauldron.pretoriaresearchlab.io/baklava-faucet"
		],
		"explorers": [],
		"infoURL": "https://docs.celo.org/"
	},
	{
		"name": "Clover",
		"chainId": 1024,
		"shortName": "clv",
		"slug": "clover",
		"chain": "Clover",
		"network": "clover mainnet",
		"networkId": 1024,
		"nativeCurrency": {
			"name": "Clover",
			"symbol": "CLV",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://clover.finance"
	},
	{
		"name": "Clover Testnet",
		"chainId": 1023,
		"shortName": "tclv",
		"slug": "clover-testnet",
		"chain": "Clover",
		"network": "clover testnet",
		"networkId": 1023,
		"nativeCurrency": {
			"name": "Clover",
			"symbol": "CLV",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://clover.finance"
	},
	{
		"name": "CoinEx Smart Chain",
		"chainId": 52,
		"shortName": "cet",
		"slug": "coinex",
		"chain": "CSC",
		"network": "mainnet",
		"networkId": 52,
		"nativeCurrency": {
			"name": "CoinEx Chain Native Token",
			"symbol": "cet",
			"decimals": 18
		},
		"rpc": [
			"https://rpc-mainnet.coinex.net"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "http://www.coinex.org/"
	},
	{
		"name": "CoinEx Smart Chain Testnet",
		"chainId": 53,
		"shortName": "tcet",
		"slug": "coinex-testnet",
		"chain": "CSC",
		"network": "testnet",
		"networkId": 53,
		"nativeCurrency": {
			"name": "CoinEx Chain Test Native Token",
			"symbol": "cett",
			"decimals": 18
		},
		"rpc": [
			"https://rpc-testnet.coinex.net"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "http://www.coinex.org/"
	},
	{
		"name": "Darwinia Crab Network",
		"chainId": 44,
		"shortName": "crab",
		"slug": "crab",
		"chain": "crab",
		"network": "Crab network",
		"networkId": 44,
		"nativeCurrency": {
			"name": "Crab Token",
			"symbol": "CRING",
			"decimals": 9
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://crab.network/"
	},
	{
		"name": "Darwinia Pangolin Testnet",
		"chainId": 43,
		"shortName": "darwinia",
		"slug": "pangolin-darwinia",
		"chain": "pangolin",
		"network": "free testnet",
		"networkId": 43,
		"nativeCurrency": {
			"name": "Pangolin RING",
			"symbol": "PRING",
			"decimals": 9
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://darwinia.network/"
	},
	{
		"name": "DBChain Testnet",
		"chainId": 67,
		"shortName": "dbm",
		"slug": "dbchain-testnet",
		"chain": "DBM",
		"network": "testnet",
		"networkId": 67,
		"nativeCurrency": {
			"name": "DBChain Testnet",
			"symbol": "DBM",
			"decimals": 18
		},
		"rpc": [
			"http://test-rpc.dbmbp.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "http://test.dbmbp.com"
	},
	{
		"name": "Diode Prenet",
		"chainId": 15,
		"shortName": "diode",
		"slug": "diode-prenet",
		"chain": "DIODE",
		"network": "mainnet",
		"networkId": 15,
		"nativeCurrency": {
			"name": "Diodes",
			"symbol": "DIODE",
			"decimals": 18
		},
		"rpc": [
			"https://prenet.diode.io:8443/",
			"wss://prenet.diode.io:8443/ws"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://diode.io/prenet"
	},
	{
		"name": "Diode Testnet Staging",
		"chainId": 13,
		"shortName": "dstg",
		"slug": "diode-staging",
		"chain": "DIODE",
		"network": "testnet",
		"networkId": 13,
		"nativeCurrency": {
			"name": "Staging Diodes",
			"symbol": "sDIODE",
			"decimals": 18
		},
		"rpc": [
			"https://staging.diode.io:8443/",
			"wss://staging.diode.io:8443/ws"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://diode.io/staging"
	},
	{
		"name": "Edgeware",
		"chainId": 2021,
		"shortName": "edg",
		"slug": "edgeware",
		"chain": "EDG",
		"network": "mainnet",
		"networkId": 2021,
		"nativeCurrency": {
			"name": "Edge",
			"symbol": "EDG",
			"decimals": 18
		},
		"rpc": [
			"https://mainnet1.edgewa.re"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "http://edgewa.re"
	},
	{
		"name": "ELA-DID-Sidechain",
		"chainId": 22,
		"shortName": "eladid",
		"slug": "elastos-did",
		"chain": "ETH",
		"network": "mainnet",
		"networkId": 22,
		"nativeCurrency": {
			"name": "Elastos",
			"symbol": "ELA",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.elastos.org/"
	},
	{
		"name": "ELA-DID-Sidechain Testnet",
		"chainId": 23,
		"shortName": "eladidt",
		"slug": "elastos-did-testnet",
		"chain": "ETH",
		"network": "testnet",
		"networkId": 23,
		"nativeCurrency": {
			"name": "Elastos",
			"symbol": "tELA",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://elaeth.io/"
	},
	{
		"name": "ELA-ETH-Sidechain",
		"chainId": 20,
		"shortName": "elaeth",
		"slug": "elastos",
		"chain": "ETH",
		"network": "mainnet",
		"networkId": 20,
		"nativeCurrency": {
			"name": "Elastos",
			"symbol": "ELA",
			"decimals": 18
		},
		"rpc": [
			"https://mainrpc.elaeth.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.elastos.org/"
	},
	{
		"name": "ELA-ETH-Sidechain Testnet",
		"chainId": 21,
		"shortName": "elaetht",
		"slug": "elastos-testnet",
		"chain": "ETH",
		"network": "testnet",
		"networkId": 21,
		"nativeCurrency": {
			"name": "Elastos",
			"symbol": "tELA",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.elaeth.io"
		],
		"faucets": [
			"https://faucet.elaeth.io/"
		],
		"explorers": [],
		"infoURL": "https://elaeth.io/"
	},
	{
		"name": "Ellaism",
		"chainId": 64,
		"shortName": "ella",
		"slug": "ellaism",
		"chain": "ELLA",
		"network": "mainnet",
		"networkId": 64,
		"nativeCurrency": {
			"name": "Ellaism Ether",
			"symbol": "ELLA",
			"decimals": 18
		},
		"rpc": [
			"https://jsonrpc.ellaism.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ellaism.org"
	},
	{
		"name": "Energi",
		"chainId": 39797,
		"shortName": "nrg",
		"slug": "energi",
		"chain": "NRG",
		"network": "mainnet",
		"networkId": 39797,
		"nativeCurrency": {
			"name": "Energi",
			"symbol": "NRG",
			"decimals": 18
		},
		"rpc": [
			"https://nodeapi.gen3.energi.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.energi.world/"
	},
	{
		"name": "Energi Testnet",
		"chainId": 49797,
		"shortName": "tnrg",
		"slug": "energi-testnet",
		"chain": "NRG",
		"network": "testnet",
		"networkId": 49797,
		"nativeCurrency": {
			"name": "Energi",
			"symbol": "tNRG",
			"decimals": 18
		},
		"rpc": [
			"https://nodeapi.test3.energi.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.energi.world/"
	},
	{
		"name": "Energy Web Chain",
		"chainId": 246,
		"shortName": "ewt",
		"slug": "energyweb",
		"chain": "Energy Web Chain",
		"network": "mainnet",
		"networkId": 246,
		"nativeCurrency": {
			"name": "Energy Web Token",
			"symbol": "EWT",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.energyweb.org",
			"wss://rpc.energyweb.org/ws"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://energyweb.org"
	},
	{
		"name": "Energy Web Volta Testnet",
		"chainId": 73799,
		"shortName": "vt",
		"slug": "energyweb-volta",
		"chain": "Volta",
		"network": "testnet",
		"networkId": 73799,
		"nativeCurrency": {
			"name": "Volta Token",
			"symbol": "VT",
			"decimals": 18
		},
		"rpc": [
			"https://volta-rpc.energyweb.org",
			"wss://volta-rpc.energyweb.org/ws"
		],
		"faucets": [
			"https://voltafaucet.energyweb.org"
		],
		"explorers": [],
		"infoURL": "https://energyweb.org"
	},
	{
		"name": "Ether-1",
		"chainId": 1313114,
		"shortName": "etho",
		"slug": "etho",
		"chain": "ETHO",
		"network": "mainnet",
		"networkId": 1313114,
		"nativeCurrency": {
			"name": "Ether-1 Ether",
			"symbol": "ETHO",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.ether1.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ether1.org"
	},
	{
		"name": "Ethereum",
		"chainId": 1,
		"shortName": "eth",
		"slug": "ethereum",
		"chain": "ETH",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Ether",
			"symbol": "ETH",
			"decimals": 18
		},
		"rpc": [
			"https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}",
			"wss://mainnet.infura.io/ws/v3/${INFURA_PROJECT_ID}",
			"https://api.mycryptoapi.com/eth",
			"https://cloudflare-eth.com"
		],
		"faucets": [],
		"explorers": [
			{
				"name": "etherscan",
				"url": "https://etherscan.io",
				"standard": "EIP3091"
			}
		],
		"infoURL": "https://ethereum.org"
	},
	{
		"name": "Ethereum Classic",
		"chainId": 61,
		"shortName": "etc",
		"slug": "ethereumclassic",
		"chain": "ETC",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Ethereum Classic Ether",
			"symbol": "ETC",
			"decimals": 18
		},
		"rpc": [
			"https://ethereumclassic.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ethereumclassic.org"
	},
	{
		"name": "Ethereum Classic Testnet Kotti",
		"chainId": 6,
		"shortName": "kot",
		"slug": "ethereumclassic-kotti",
		"chain": "ETC",
		"network": "kotti",
		"networkId": 6,
		"nativeCurrency": {
			"name": "Kotti Ether",
			"symbol": "KOT",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://explorer.jade.builders/?network=kotti"
	},
	{
		"name": "Ethereum Classic Testnet Morden",
		"chainId": 62,
		"shortName": "tetc",
		"slug": "ethereumclassic-morden",
		"chain": "ETC",
		"network": "testnet",
		"networkId": 2,
		"nativeCurrency": {
			"name": "Ethereum Classic Testnet Ether",
			"symbol": "TETC",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ethereumclassic.org"
	},
	{
		"name": "Ethereum Classic Testnet Mordor",
		"chainId": 63,
		"shortName": "metc",
		"slug": "ethereumclassic-mordor",
		"chain": "ETC",
		"network": "testnet",
		"networkId": 7,
		"nativeCurrency": {
			"name": "Mordor Classic Testnet Ether",
			"symbol": "METC",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://github.com/eth-classic/mordor/"
	},
	{
		"name": "Ethereum Testnet Görli",
		"chainId": 5,
		"shortName": "gor",
		"slug": "ethereum-goerli",
		"chain": "ETH",
		"network": "goerli",
		"networkId": 5,
		"nativeCurrency": {
			"name": "Görli Ether",
			"symbol": "GOR",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.goerli.mudit.blog/",
			"https://rpc.slock.it/goerli ",
			"https://goerli.prylabs.net/"
		],
		"faucets": [
			"https://goerli-faucet.slock.it/?address=${ADDRESS}",
			"https://faucet.goerli.mudit.blog"
		],
		"explorers": [],
		"infoURL": "https://goerli.net/#about"
	},
	{
		"name": "Ethereum Testnet Kovan",
		"chainId": 42,
		"shortName": "kov",
		"slug": "ethereum-kovan",
		"chain": "ETH",
		"network": "kovan",
		"networkId": 42,
		"nativeCurrency": {
			"name": "Kovan Ether",
			"symbol": "KOV",
			"decimals": 18
		},
		"rpc": [
			"https://kovan.poa.network",
			"http://kovan.poa.network:8545",
			"https://kovan.infura.io/v3/${INFURA_PROJECT_ID}",
			"wss://kovan.infura.io/ws/v3/${INFURA_PROJECT_ID}",
			"ws://kovan.poa.network:8546"
		],
		"faucets": [
			"https://faucet.kovan.network",
			"https://gitter.im/kovan-testnet/faucet"
		],
		"explorers": [],
		"infoURL": "https://kovan-testnet.github.io/website"
	},
	{
		"name": "Ethereum Testnet Rinkeby",
		"chainId": 4,
		"shortName": "rin",
		"slug": "ethereum-rinkeby",
		"chain": "ETH",
		"network": "rinkeby",
		"networkId": 4,
		"nativeCurrency": {
			"name": "Rinkeby Ether",
			"symbol": "RIN",
			"decimals": 18
		},
		"rpc": [
			"https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}",
			"wss://rinkeby.infura.io/ws/v3/${INFURA_PROJECT_ID}"
		],
		"faucets": [
			"https://faucet.rinkeby.io"
		],
		"explorers": [],
		"infoURL": "https://www.rinkeby.io"
	},
	{
		"name": "Ethereum Testnet Ropsten",
		"chainId": 3,
		"shortName": "rop",
		"slug": "ethereum-ropsten",
		"chain": "ETH",
		"network": "ropsten",
		"networkId": 3,
		"nativeCurrency": {
			"name": "Ropsten Ether",
			"symbol": "ROP",
			"decimals": 18
		},
		"rpc": [
			"https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}",
			"wss://ropsten.infura.io/ws/v3/${INFURA_PROJECT_ID}"
		],
		"faucets": [
			"https://faucet.ropsten.be?${ADDRESS}"
		],
		"explorers": [],
		"infoURL": "https://github.com/ethereum/ropsten"
	},
	{
		"name": "EtherGem",
		"chainId": 1987,
		"shortName": "egem",
		"slug": "ethergem",
		"chain": "EGEM",
		"network": "mainnet",
		"networkId": 1987,
		"nativeCurrency": {
			"name": "EtherGem Ether",
			"symbol": "EGEM",
			"decimals": 18
		},
		"rpc": [
			"https://jsonrpc.egem.io/custom"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://egem.io"
	},
	{
		"name": "EtherInc",
		"chainId": 101,
		"shortName": "eti",
		"slug": "etherinc",
		"chain": "ETI",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "EtherInc Ether",
			"symbol": "ETI",
			"decimals": 18
		},
		"rpc": [
			"https://api.einc.io/jsonrpc/mainnet"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://einc.io"
	},
	{
		"name": "Ethermint Testnet",
		"chainId": 777,
		"shortName": "emint",
		"slug": "ethermint-testnet",
		"chain": "ETHERMINT",
		"network": "testnet",
		"networkId": 777,
		"nativeCurrency": {
			"name": "Photon",
			"symbol": "Photon",
			"decimals": 18
		},
		"rpc": [
			"http://54.210.246.165:8545"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://docs.ethermint.zone"
	},
	{
		"name": "Ethersocial Network",
		"chainId": 31102,
		"shortName": "esn",
		"slug": "ethersocial",
		"chain": "ESN",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Ethersocial Network Ether",
			"symbol": "ESN",
			"decimals": 18
		},
		"rpc": [
			"https://api.esn.gonspool.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ethersocial.org"
	},
	{
		"name": "Evrice Network",
		"chainId": 1010,
		"shortName": "EVC",
		"slug": "evrice",
		"chain": "EVC",
		"network": "Evrice",
		"networkId": 1010,
		"nativeCurrency": {
			"name": "Evrice",
			"symbol": "EVC",
			"decimals": 18
		},
		"rpc": [
			"https://meta.evrice.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://evrice.com"
	},
	{
		"name": "Expanse Network",
		"chainId": 2,
		"shortName": "exp",
		"slug": "expanse",
		"chain": "EXP",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Expanse Network Ether",
			"symbol": "EXP",
			"decimals": 18
		},
		"rpc": [
			"https://node.expanse.tech"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://expanse.tech"
	},
	{
		"name": "Fantom Opera",
		"chainId": 250,
		"shortName": "ftm",
		"slug": "fantom",
		"chain": "FTM",
		"network": "mainnet",
		"networkId": 250,
		"nativeCurrency": {
			"name": "Fantom",
			"symbol": "FTM",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.fantom.network",
			"https://fantomscan.io/rpc"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://fantom.foundation"
	},
	{
		"name": "Firenze test network",
		"chainId": 78110,
		"shortName": "firenze",
		"slug": "primuschain-firenze",
		"chain": "ETH",
		"network": "testnet",
		"networkId": 78110,
		"nativeCurrency": {
			"name": "Firenze Ether",
			"symbol": "FIN",
			"decimals": 18
		},
		"rpc": [
			"https://ethnode.primusmoney.com/firenze"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://primusmoney.com"
	},
	{
		"name": "Flare",
		"chainId": 14,
		"shortName": "flr",
		"slug": "flare",
		"chain": "FLR",
		"network": "flare",
		"networkId": 14,
		"nativeCurrency": {
			"name": "Spark",
			"symbol": "FLR",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://flare.xyz"
	},
	{
		"name": "Flare Testnet Coston",
		"chainId": 16,
		"shortName": "cflr",
		"slug": "flare-coston",
		"chain": "FLR",
		"network": "coston",
		"networkId": 16,
		"nativeCurrency": {
			"name": "Coston Spark",
			"symbol": "CFLR",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://github.com/flare-eng/coston"
	},
	{
		"name": "420coin",
		"chainId": 2020,
		"shortName": "420",
		"slug": "fourtwenty",
		"chain": "420",
		"network": "mainnet",
		"networkId": 2020,
		"nativeCurrency": {
			"name": "Fourtwenty",
			"symbol": "420",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://420integrated.com"
	},
	{
		"name": "Freight Trust Network",
		"chainId": 211,
		"shortName": "EDI",
		"slug": "freight",
		"chain": "EDI",
		"network": "freight & trade network",
		"networkId": 0,
		"nativeCurrency": {
			"name": "Freight Trust Native",
			"symbol": "0xF",
			"decimals": 18
		},
		"rpc": [
			"http://13.57.207.168:3435",
			"https://app.freighttrust.net/ftn/${API_KEY}"
		],
		"faucets": [
			"http://faucet.freight.sh"
		],
		"explorers": [],
		"infoURL": "https://freighttrust.com"
	},
	{
		"name": "Fuse",
		"chainId": 122,
		"shortName": "fuse",
		"slug": "fuse",
		"chain": "FUSE",
		"network": "mainnet",
		"networkId": 122,
		"nativeCurrency": {
			"name": "Fuse",
			"symbol": "FUSE",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.fuse.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://fuse.io/"
	},
	{
		"name": "Fusion",
		"chainId": 32659,
		"shortName": "fsn",
		"slug": "fusion",
		"chain": "FSN",
		"network": "mainnet",
		"networkId": 32659,
		"nativeCurrency": {
			"name": "Fusion",
			"symbol": "FSN",
			"decimals": 18
		},
		"rpc": [
			"https://mainnet.anyswap.exchange",
			"https://fsn.dev/api"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.fusion.org/"
	},
	{
		"name": "GoChain",
		"chainId": 60,
		"shortName": "go",
		"slug": "gochain",
		"chain": "GO",
		"network": "mainnet",
		"networkId": 60,
		"nativeCurrency": {
			"name": "GoChain Ether",
			"symbol": "GO",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.gochain.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://gochain.io"
	},
	{
		"name": "GoodData",
		"chainId": 33,
		"shortName": "GooD",
		"slug": "gooddata",
		"chain": "GooD",
		"network": "mainnet",
		"networkId": 33,
		"nativeCurrency": {
			"name": "GoodData Mainnet Ether",
			"symbol": "GooD",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.goodata.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.goodata.org"
	},
	{
		"name": "Harmony Shard 0",
		"chainId": 1666600000,
		"shortName": "hmy-s0",
		"slug": "harmony-shard0",
		"chain": "Harmony",
		"network": "mainnet",
		"networkId": 1666600000,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://api.harmony.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Shard 1",
		"chainId": 1666600001,
		"shortName": "hmy-s1",
		"slug": "harmony-shard1",
		"chain": "Harmony",
		"network": "mainnet",
		"networkId": 1666600001,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://s1.api.harmony.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Shard 2",
		"chainId": 1666600002,
		"shortName": "hmy-s2",
		"slug": "harmony-shard2",
		"chain": "Harmony",
		"network": "mainnet",
		"networkId": 1666600002,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://s2.api.harmony.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Shard 3",
		"chainId": 1666600003,
		"shortName": "hmy-s3",
		"slug": "harmony-shard3",
		"chain": "Harmony",
		"network": "mainnet",
		"networkId": 1666600003,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://s3.api.harmony.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Testnet Shard 0",
		"chainId": 1666700000,
		"shortName": "hmy-b-s0",
		"slug": "harmony-testnet-shard0",
		"chain": "Harmony",
		"network": "testnet",
		"networkId": 1666700000,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://api.s0.b.hmny.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Testnet Shard 1",
		"chainId": 1666700001,
		"shortName": "hmy-b-s1",
		"slug": "harmony-testnet-shard1",
		"chain": "Harmony",
		"network": "testnet",
		"networkId": 1666700001,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://api.s1.b.hmny.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Testnet Shard 2",
		"chainId": 1666700002,
		"shortName": "hmy-b-s2",
		"slug": "harmony-testnet-shard2",
		"chain": "Harmony",
		"network": "testnet",
		"networkId": 1666700002,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://api.s2.b.hmny.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "Harmony Testnet Shard 3",
		"chainId": 1666700003,
		"shortName": "hmy-b-s3",
		"slug": "harmony-testnet-shard3",
		"chain": "Harmony",
		"network": "testnet",
		"networkId": 1666700003,
		"nativeCurrency": {
			"name": "ONE",
			"symbol": "ONE",
			"decimals": 18
		},
		"rpc": [
			"https://api.s3.b.hmny.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.harmony.one/"
	},
	{
		"name": "High Performance Blockchain",
		"chainId": 269,
		"shortName": "hpb",
		"slug": "hpb",
		"chain": "HPB",
		"network": "mainnet",
		"networkId": 100,
		"nativeCurrency": {
			"name": "High Performance Blockchain Ether",
			"symbol": "HPB",
			"decimals": 18
		},
		"rpc": [
			"https://hpb.app"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://hpbscan.org/"
	},
	{
		"name": "Huobi ECO Chain",
		"chainId": 128,
		"shortName": "heco",
		"slug": "heco",
		"chain": "Heco",
		"network": "mainnet",
		"networkId": 128,
		"nativeCurrency": {
			"name": "Huobi ECO Chain Native Token",
			"symbol": "HT",
			"decimals": 18
		},
		"rpc": [
			"https://http-mainnet.hecochain.com",
			"wss://ws-mainnet.hecochain.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://hecoinfo.com"
	},
	{
		"name": "Huobi ECO Chain Testnet",
		"chainId": 256,
		"shortName": "hecot",
		"slug": "heco-testnet",
		"chain": "Heco",
		"network": "testnet",
		"networkId": 256,
		"nativeCurrency": {
			"name": "Huobi ECO Chain Test Native Token",
			"symbol": "htt",
			"decimals": 18
		},
		"rpc": [
			"https://http-testnet.hecochain.com",
			"wss://ws-testnet.hecochain.com"
		],
		"faucets": [
			"https://scan-testnet.hecochain.com/faucet"
		],
		"explorers": [],
		"infoURL": "https://testnet.hecoinfo.com"
	},
	{
		"name": "IOLite",
		"chainId": 18289463,
		"shortName": "ilt",
		"slug": "iolite",
		"chain": "ILT",
		"network": "mainnet",
		"networkId": 18289463,
		"nativeCurrency": {
			"name": "IOLite Ether",
			"symbol": "ILT",
			"decimals": 18
		},
		"rpc": [
			"https://net.iolite.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://iolite.io"
	},
	{
		"name": "IoTeX Network",
		"chainId": 4689,
		"shortName": "iotex-mainnet",
		"slug": "iotex",
		"chain": "IOTX",
		"network": "mainnet",
		"networkId": 4689,
		"nativeCurrency": {
			"name": "IoTeX",
			"symbol": "IOTX",
			"decimals": 18
		},
		"rpc": [
			"https://babel-api.mainnet.iotex.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://iotex.io"
	},
	{
		"name": "IoTeX Network Testnet",
		"chainId": 4690,
		"shortName": "iotex-testnet",
		"slug": "iotex-testnet",
		"chain": "IOTX",
		"network": "testnet",
		"networkId": 4690,
		"nativeCurrency": {
			"name": "IoTeX",
			"symbol": "IOTX",
			"decimals": 18
		},
		"rpc": [
			"https://babel-api.testnet.iotex.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://iotex.io"
	},
	{
		"name": "IPOS Network",
		"chainId": 1122334455,
		"shortName": "ipos",
		"slug": "ipos",
		"chain": "IPOS",
		"network": "mainnet",
		"networkId": 1122334455,
		"nativeCurrency": {
			"name": "IPOS Network Ether",
			"symbol": "IPOS",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.iposlab.com",
			"https://rpc2.iposlab.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://iposlab.com"
	},
	{
		"name": "Joys Digital",
		"chainId": 35855456,
		"shortName": "JOYS",
		"slug": "joys",
		"chain": "JOYS",
		"network": "mainnet",
		"networkId": 35855456,
		"nativeCurrency": {
			"name": "JOYS",
			"symbol": "JOYS",
			"decimals": 18
		},
		"rpc": [
			"https://node.joys.digital"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://joys.digital"
	},
	{
		"name": "Joys Digital TestNet",
		"chainId": 99415706,
		"shortName": "TOYS",
		"slug": "joys-testnet",
		"chain": "TOYS",
		"network": "testnet",
		"networkId": 99415706,
		"nativeCurrency": {
			"name": "TOYS",
			"symbol": "TOYS",
			"decimals": 18
		},
		"rpc": [
			"https://toys.joys.cash/"
		],
		"faucets": [
			"https://faucet.joys.digital/"
		],
		"explorers": [],
		"infoURL": "https://joys.digital"
	},
	{
		"name": "Karura Network",
		"chainId": 686,
		"shortName": "kar",
		"slug": "karura",
		"chain": "KAR",
		"network": "mainnet",
		"networkId": 686,
		"nativeCurrency": {
			"name": "Karura Token",
			"symbol": "KAR",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://karura.network"
	},
	{
		"name": "Klaytn Cypress",
		"chainId": 8217,
		"shortName": "Cypress",
		"slug": "klaytn-cypress",
		"chain": "KLAY",
		"network": "cypress",
		"networkId": 8217,
		"nativeCurrency": {
			"name": "KLAY",
			"symbol": "KLAY",
			"decimals": 18
		},
		"rpc": [
			"https://node-api.klaytnapi.com/v1/klaytn"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.klaytn.com/"
	},
	{
		"name": "Klaytn Testnet Baobab",
		"chainId": 1001,
		"shortName": "Baobab",
		"slug": "klaytn-baobab",
		"chain": "KLAY",
		"network": "baobab",
		"networkId": 1001,
		"nativeCurrency": {
			"name": "KLAY",
			"symbol": "KLAY",
			"decimals": 18
		},
		"rpc": [
			"https://node-api.klaytnapi.com/v1/klaytn"
		],
		"faucets": [
			"https://baobab.wallet.klaytn.com/access?next=faucet"
		],
		"explorers": [],
		"infoURL": "https://www.klaytn.com/"
	},
	{
		"name": "KorthoTest",
		"chainId": 8285,
		"shortName": "Kortho",
		"slug": "kortho-testnet",
		"chain": "Kortho",
		"network": "Test",
		"networkId": 8285,
		"nativeCurrency": {
			"name": "Kortho Test",
			"symbol": "KTO",
			"decimals": 11
		},
		"rpc": [
			"https://www.krotho-test.net"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.kortho.io/"
	},
	{
		"name": "Lightstreams",
		"chainId": 163,
		"shortName": "pht",
		"slug": "lightstreams",
		"chain": "PHT",
		"network": "mainnet",
		"networkId": 163,
		"nativeCurrency": {
			"name": "Lightstreams PHT",
			"symbol": "PHT",
			"decimals": 18
		},
		"rpc": [
			"https://node.mainnet.lightstreams.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://explorer.lightstreams.io"
	},
	{
		"name": "Lightstreams Testnet",
		"chainId": 162,
		"shortName": "tpht",
		"slug": "lightstreams-testnet",
		"chain": "PHT",
		"network": "sirius",
		"networkId": 162,
		"nativeCurrency": {
			"name": "Lightstreams PHT",
			"symbol": "PHT",
			"decimals": 18
		},
		"rpc": [
			"https://node.sirius.lightstreams.io"
		],
		"faucets": [
			"https://discuss.lightstreams.network/t/request-test-tokens"
		],
		"explorers": [],
		"infoURL": "https://explorer.sirius.lightstreams.io"
	},
	{
		"name": "Lisinski",
		"chainId": 385,
		"shortName": "lisinski",
		"slug": "lisinski",
		"chain": "CRO",
		"network": "mainnet",
		"networkId": 385,
		"nativeCurrency": {
			"name": "Lisinski Ether",
			"symbol": "LISINSKI",
			"decimals": 18
		},
		"rpc": [
			"https://rpc-bitfalls1.lisinski.online"
		],
		"faucets": [
			"https://pipa.lisinski.online"
		],
		"explorers": [],
		"infoURL": "https://lisinski.online"
	},
	{
		"name": "MathChain",
		"chainId": 1139,
		"shortName": "MATH",
		"slug": "mathchain",
		"chain": "MATH",
		"network": "mainnet",
		"networkId": 1139,
		"nativeCurrency": {
			"name": "MathChain",
			"symbol": "MATH",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://mathchain.org"
	},
	{
		"name": "MathChain Testnet",
		"chainId": 1140,
		"shortName": "tMATH",
		"slug": "mathchain-testnet",
		"chain": "MATH",
		"network": "testnet",
		"networkId": 1140,
		"nativeCurrency": {
			"name": "MathChain",
			"symbol": "MATH",
			"decimals": 18
		},
		"rpc": [
			"https://galois-hk.maiziqianbao.net/rpc"
		],
		"faucets": [
			"https://scan.boka.network/#/Galois/faucet"
		],
		"explorers": [],
		"infoURL": "https://mathchain.org"
	},
	{
		"name": "Metadium",
		"chainId": 11,
		"shortName": "meta",
		"slug": "metadium",
		"chain": "META",
		"network": "mainnet",
		"networkId": 11,
		"nativeCurrency": {
			"name": "Metadium Mainnet Ether",
			"symbol": "META",
			"decimals": 18
		},
		"rpc": [
			"https://api.metadium.com/prod"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://metadium.com"
	},
	{
		"name": "Metadium Testnet",
		"chainId": 12,
		"shortName": "kal",
		"slug": "metadium-testnet",
		"chain": "META",
		"network": "testnet",
		"networkId": 12,
		"nativeCurrency": {
			"name": "Metadium Testnet Ether",
			"symbol": "KAL",
			"decimals": 18
		},
		"rpc": [
			"https://api.metadium.com/dev"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://metadium.com"
	},
	{
		"name": "Meter",
		"chainId": 82,
		"shortName": "Meter",
		"slug": "meter",
		"chain": "METER",
		"network": "mainnet",
		"networkId": 82,
		"nativeCurrency": {
			"name": "Meter",
			"symbol": "MTR",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.meter.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.meter.io"
	},
	{
		"name": "MintMe.com Coin",
		"chainId": 24734,
		"shortName": "mintme",
		"slug": "mintme",
		"chain": "MINTME",
		"network": "mainnet",
		"networkId": 37480,
		"nativeCurrency": {
			"name": "MintMe.com Coin",
			"symbol": "MINTME",
			"decimals": 18
		},
		"rpc": [
			"https://node1.mintme.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.mintme.com"
	},
	{
		"name": "Mix",
		"chainId": 76,
		"shortName": "mix",
		"slug": "mix",
		"chain": "MIX",
		"network": "mainnet",
		"networkId": 76,
		"nativeCurrency": {
			"name": "Mix Ether",
			"symbol": "MIX",
			"decimals": 18
		},
		"rpc": [
			"https://rpc2.mix-blockchain.org:8647"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://mix-blockchain.org"
	},
	{
		"name": "Moonbeam Polkadot",
		"chainId": 1284,
		"shortName": "mbeam",
		"slug": "moonbeam",
		"chain": "MOON",
		"network": "moonbeam",
		"networkId": 1284,
		"nativeCurrency": {
			"name": "Glimmer",
			"symbol": "GLMR",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://moonbeam.network/networks/moonbeam/"
	},
	{
		"name": "Moonbeam Testnet Moonbase Alpha",
		"chainId": 1287,
		"shortName": "mbase",
		"slug": "mbase",
		"chain": "MOON",
		"network": "moonbase",
		"networkId": 1287,
		"nativeCurrency": {
			"name": "Dev",
			"symbol": "DEV",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.testnet.moonbeam.network",
			"wss://wss.testnet.moonbeam.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://docs.moonbeam.network/networks/testnet/"
	},
	{
		"name": "Moonriver Kusama",
		"chainId": 1285,
		"shortName": "mriver",
		"slug": "moonriver",
		"chain": "MOON",
		"network": "moonriver",
		"networkId": 1285,
		"nativeCurrency": {
			"name": "River",
			"symbol": "RIVER",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://moonbeam.network/networks/moonriver/"
	},
	{
		"name": "Moonrock Rococo",
		"chainId": 1286,
		"shortName": "mrock",
		"slug": "moonrock",
		"chain": "MOON",
		"network": "moonrock",
		"networkId": 1286,
		"nativeCurrency": {
			"name": "Rocs",
			"symbol": "ROC",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": ""
	},
	{
		"name": "Musicoin",
		"chainId": 7762959,
		"shortName": "music",
		"slug": "musicoin",
		"chain": "MUSIC",
		"network": "mainnet",
		"networkId": 7762959,
		"nativeCurrency": {
			"name": "Musicoin",
			"symbol": "MUSIC",
			"decimals": 18
		},
		"rpc": [
			"https://mewapi.musicoin.tw"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://musicoin.tw"
	},
	{
		"name": "NEAR BetaNet",
		"chainId": 1313161556,
		"shortName": "nearb",
		"slug": "near-betanet",
		"chain": "NEAR",
		"network": "betanet",
		"networkId": 1313161556,
		"nativeCurrency": {
			"name": "NEAR",
			"symbol": "bNEAR",
			"decimals": 24
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://near.org/"
	},
	{
		"name": "NEAR MainNet",
		"chainId": 1313161554,
		"shortName": "near",
		"slug": "near",
		"chain": "NEAR",
		"network": "mainnet",
		"networkId": 1313161554,
		"nativeCurrency": {
			"name": "NEAR",
			"symbol": "NEAR",
			"decimals": 24
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://near.org/"
	},
	{
		"name": "NEAR TestNet",
		"chainId": 1313161555,
		"shortName": "neart",
		"slug": "near-testnet",
		"chain": "NEAR",
		"network": "testnet",
		"networkId": 1313161555,
		"nativeCurrency": {
			"name": "NEAR",
			"symbol": "tNEAR",
			"decimals": 24
		},
		"rpc": [],
		"faucets": [
			"https://wallet.testnet.near.org"
		],
		"explorers": [],
		"infoURL": "https://near.org/"
	},
	{
		"name": "Nepal Blockchain Network",
		"chainId": 977,
		"shortName": "yeti",
		"slug": "nepal",
		"chain": "YETI",
		"network": "mainnet",
		"networkId": 977,
		"nativeCurrency": {
			"name": "Nepal Blockchain Network Ether",
			"symbol": "YETI",
			"decimals": 18
		},
		"rpc": [
			"https://api.nepalblockchain.dev",
			"https://api.nepalblockchain.network"
		],
		"faucets": [
			"https://faucet.nepalblockchain.network"
		],
		"explorers": [],
		"infoURL": "https://nepalblockchain.network"
	},
	{
		"name": "Newton",
		"chainId": 1012,
		"shortName": "new",
		"slug": "newton",
		"chain": "NEW",
		"network": "mainnet",
		"networkId": 1012,
		"nativeCurrency": {
			"name": "Newton",
			"symbol": "NEW",
			"decimals": 18
		},
		"rpc": [
			"https://global.rpc.mainnet.newtonproject.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.newtonproject.org/"
	},
	{
		"name": "Newton Testnet",
		"chainId": 1007,
		"shortName": "tnew",
		"slug": "newton-testnet",
		"chain": "NEW",
		"network": "testnet",
		"networkId": 1007,
		"nativeCurrency": {
			"name": "Newton",
			"symbol": "NEW",
			"decimals": 18
		},
		"rpc": [
			"https://rpc1.newchain.newtonproject.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.newtonproject.org/"
	},
	{
		"name": "Oasis Ethereum ParaTime",
		"chainId": 69,
		"shortName": "oasis",
		"slug": "oasis-paratime",
		"chain": "ETH",
		"network": "mainnet",
		"networkId": 69,
		"nativeCurrency": {
			"name": "Oasis Ether",
			"symbol": "OETH",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.oasiseth.org:8545"
		],
		"faucets": [
			"http://faucet.oasiseth.org"
		],
		"explorers": [],
		"infoURL": "https://www.oasiseth.org"
	},
	{
		"name": "OKExChain",
		"chainId": 66,
		"shortName": "okt",
		"slug": "okexchain",
		"chain": "okexchain",
		"network": "mainnet",
		"networkId": 66,
		"nativeCurrency": {
			"name": "OKExChain Global Utility Token",
			"symbol": "OKT",
			"decimals": 18
		},
		"rpc": [
			"https://exchainrpc.okex.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.okex.com/okexchain"
	},
	{
		"name": "OKExChain Testnet",
		"chainId": 65,
		"shortName": "tokt",
		"slug": "okexchain-testnet",
		"chain": "okexchain",
		"network": "testnet",
		"networkId": 65,
		"nativeCurrency": {
			"name": "OKExChain Global Utility Token in testnet",
			"symbol": "OKT",
			"decimals": 18
		},
		"rpc": [
			"https://exchaintestrpc.okex.org"
		],
		"faucets": [
			"https://www.okex.com/drawdex"
		],
		"explorers": [],
		"infoURL": "https://www.okex.com/okexchain"
	},
	{
		"name": "Optimism",
		"chainId": 10,
		"shortName": "oeth",
		"slug": "optimism",
		"chain": "ETH",
		"network": "mainnet",
		"networkId": 10,
		"nativeCurrency": {
			"name": "Ether",
			"symbol": "OETH",
			"decimals": 18
		},
		"rpc": [
			"https://mainnet.optimism.io/"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://optimism.io"
	},
	{
		"name": "Optimistic Ethereum Testnet Goerli",
		"chainId": 420,
		"shortName": "ogor",
		"slug": "optimistic-goerli",
		"chain": "ETH",
		"network": "goerli",
		"networkId": 420,
		"nativeCurrency": {
			"name": "Görli Ether",
			"symbol": "GOR",
			"decimals": 18
		},
		"rpc": [
			"https://goerli.optimism.io/"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://optimism.io"
	},
	{
		"name": "Optimistic Ethereum Testnet Kovan",
		"chainId": 69,
		"shortName": "okov",
		"slug": "optimistic-kovan",
		"chain": "ETH",
		"network": "kovan",
		"networkId": 69,
		"nativeCurrency": {
			"name": "Kovan Ether",
			"symbol": "KOR",
			"decimals": 18
		},
		"rpc": [
			"https://kovan.optimism.io/"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://optimism.io"
	},
	{
		"name": "pegglecoin",
		"chainId": 42069,
		"shortName": "PC",
		"slug": "pegglecoin",
		"chain": "42069",
		"network": "mainnet",
		"networkId": 42069,
		"nativeCurrency": {
			"name": "pegglecoin",
			"symbol": "peggle",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://teampeggle.com"
	},
	{
		"name": "PepChain Churchill",
		"chainId": 13371337,
		"shortName": "tpep",
		"slug": "pepchain-churchill",
		"chain": "PEP",
		"network": "testnet",
		"networkId": 13371337,
		"nativeCurrency": {
			"name": "PepChain Churchill Ether",
			"symbol": "TPEP",
			"decimals": 18
		},
		"rpc": [
			"https://churchill-rpc.pepchain.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://pepchain.io"
	},
	{
		"name": "Pirl",
		"chainId": 3125659152,
		"shortName": "pirl",
		"slug": "pirl",
		"chain": "PIRL",
		"network": "mainnet",
		"networkId": 3125659152,
		"nativeCurrency": {
			"name": "Pirl Ether",
			"symbol": "PIRL",
			"decimals": 18
		},
		"rpc": [
			"https://wallrpc.pirl.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://pirl.io"
	},
	{
		"name": "POA Network Core",
		"chainId": 99,
		"shortName": "skl",
		"slug": "poa",
		"chain": "POA",
		"network": "core",
		"networkId": 99,
		"nativeCurrency": {
			"name": "POA Network Core Ether",
			"symbol": "SKL",
			"decimals": 18
		},
		"rpc": [
			"https://core.poanetwork.dev",
			"http://core.poanetwork.dev:8545",
			"https://core.poa.network",
			"ws://core.poanetwork.dev:8546"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://poa.network"
	},
	{
		"name": "POA Network Sokol",
		"chainId": 77,
		"shortName": "poa",
		"slug": "poa-sokol",
		"chain": "POA",
		"network": "sokol",
		"networkId": 77,
		"nativeCurrency": {
			"name": "POA Sokol Ether",
			"symbol": "POA",
			"decimals": 18
		},
		"rpc": [
			"https://sokol.poa.network",
			"wss://sokol.poa.network/wss",
			"ws://sokol.poa.network:8546"
		],
		"faucets": [
			"https://faucet-sokol.herokuapp.com"
		],
		"explorers": [],
		"infoURL": "https://poa.network"
	},
	{
		"name": "Polygon",
		"chainId": 137,
		"shortName": "polygon",
		"slug": "polygon",
		"chain": "Polygon",
		"network": "mainnet",
		"networkId": 137,
		"nativeCurrency": {
			"name": "Polygon",
			"symbol": "MATIC",
			"decimals": 18
		},
		"rpc": [
			"https://rpc-mainnet.matic.network",
			"wss://ws-mainnet.matic.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://polygon.technology"
	},
	{
		"name": "Polygon Testnet Mumbai",
		"chainId": 80001,
		"shortName": "maticmum",
		"slug": "polygon-mumbai",
		"chain": "Polygon",
		"network": "testnet",
		"networkId": 80001,
		"nativeCurrency": {
			"name": "Matic",
			"symbol": "tMATIC",
			"decimals": 18
		},
		"rpc": [
			"https://rpc-mumbai.matic.today",
			"wss://ws-mumbai.matic.today"
		],
		"faucets": [
			"https://faucet.matic.network/"
		],
		"explorers": [],
		"infoURL": "https://matic.network/"
	},
	{
		"name": "PrimusChain mainnet",
		"chainId": 78,
		"shortName": "primuschain",
		"slug": "primuschain",
		"chain": "PC",
		"network": "mainnet",
		"networkId": 78,
		"nativeCurrency": {
			"name": "Primus Ether",
			"symbol": "PETH",
			"decimals": 18
		},
		"rpc": [
			"https://ethnode.primusmoney.com/mainnet"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://primusmoney.com"
	},
	{
		"name": "RSK",
		"chainId": 30,
		"shortName": "rsk",
		"slug": "rsk",
		"chain": "RSK",
		"network": "mainnet",
		"networkId": 30,
		"nativeCurrency": {
			"name": "RSK Mainnet Ether",
			"symbol": "RBTC",
			"decimals": 18
		},
		"rpc": [
			"https://public-node.rsk.co",
			"https://mycrypto.rsk.co"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://rsk.co"
	},
	{
		"name": "RSK Testnet",
		"chainId": 31,
		"shortName": "trsk",
		"slug": "rsk-testnet",
		"chain": "RSK",
		"network": "testnet",
		"networkId": 31,
		"nativeCurrency": {
			"name": "RSK Testnet Ether",
			"symbol": "tRBTC",
			"decimals": 18
		},
		"rpc": [
			"https://public-node.testnet.rsk.co",
			"https://mycrypto.testnet.rsk.co"
		],
		"faucets": [
			"https://faucet.testnet.rsk.co"
		],
		"explorers": [],
		"infoURL": "https://rsk.co"
	},
	{
		"name": "Rupaya",
		"chainId": 499,
		"shortName": "rupx",
		"slug": "rupaya",
		"chain": "RUPX",
		"network": "mainnet",
		"networkId": 499,
		"nativeCurrency": {
			"name": "Rupaya",
			"symbol": "RUPX",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.rupx.io"
	},
	{
		"name": "SGC Testnet",
		"chainId": 102,
		"shortName": "sgc",
		"slug": "sgc",
		"chain": "SGC",
		"network": "SGC testnet",
		"networkId": 102,
		"nativeCurrency": {
			"name": "SGC",
			"symbol": "SGC",
			"decimals": 18
		},
		"rpc": [
			"https://substrate.org.cn"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://web3games.blockspaper.com/en/"
	},
	{
		"name": "SoterOne",
		"chainId": 68,
		"shortName": "SO1",
		"slug": "soterone",
		"chain": "SOTER",
		"network": "mainnet",
		"networkId": 68,
		"nativeCurrency": {
			"name": "SoterOne Mainnet Ether",
			"symbol": "SOTER",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.soter.one"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.soterone.com"
	},
	{
		"name": "Tao Network",
		"chainId": 558,
		"shortName": "tao",
		"slug": "tao",
		"chain": "TAO",
		"network": "core",
		"networkId": 558,
		"nativeCurrency": {
			"name": "Tao",
			"symbol": "TAO",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.testnet.tao.network",
			"http://rpc.testnet.tao.network:8545",
			"https://rpc.tao.network",
			"wss://rpc.tao.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://tao.network"
	},
	{
		"name": "TBWG Chain",
		"chainId": 35,
		"shortName": "tbwg",
		"slug": "tbwg",
		"chain": "TBWG",
		"network": "mainnet",
		"networkId": 35,
		"nativeCurrency": {
			"name": "TBWG Ether",
			"symbol": "TBG",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.tbwg.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://tbwg.io"
	},
	{
		"name": "Telos EVM",
		"chainId": 40,
		"shortName": "Telos EVM",
		"slug": "telos",
		"chain": "TLOS",
		"network": "mainnet",
		"networkId": 40,
		"nativeCurrency": {
			"name": "Telos",
			"symbol": "TLOS",
			"decimals": 18
		},
		"rpc": [
			"https://mainnet.telos.net/evm"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://telos.net"
	},
	{
		"name": "Telos EVM Testnet",
		"chainId": 41,
		"shortName": "Telos EVM Testnet",
		"slug": "telos-testnet",
		"chain": "TLOS",
		"network": "testnet",
		"networkId": 41,
		"nativeCurrency": {
			"name": "Telos",
			"symbol": "TLOS",
			"decimals": 18
		},
		"rpc": [
			"https://testnet.telos.net/evm"
		],
		"faucets": [
			"https://app.telos.net/testnet/developers"
		],
		"explorers": [],
		"infoURL": "https://telos.net"
	},
	{
		"name": "Teslafunds",
		"chainId": 1856,
		"shortName": "tsf",
		"slug": "teslafunds",
		"chain": "TSF",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {
			"name": "Teslafunds Ether",
			"symbol": "TSF",
			"decimals": 18
		},
		"rpc": [
			"https://tsfapi.europool.me"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://teslafunds.io"
	},
	{
		"name": "ThaiChain",
		"chainId": 7,
		"shortName": "tch",
		"slug": "thaichain",
		"chain": "TCH",
		"network": "mainnet",
		"networkId": 7,
		"nativeCurrency": {
			"name": "ThaiChain Ether",
			"symbol": "TCH",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.dome.cloud"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://thaichain.io"
	},
	{
		"name": "ThaiChain 2.0 ThaiFi",
		"chainId": 17,
		"shortName": "tfi",
		"slug": "thaifi",
		"chain": "TCH",
		"network": "thaifi",
		"networkId": 17,
		"nativeCurrency": {
			"name": "Thaifi Ether",
			"symbol": "TFI",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.thaifi.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://exp.thaifi.com"
	},
	{
		"name": "ThunderCore",
		"chainId": 108,
		"shortName": "TT",
		"slug": "thundercore",
		"chain": "TT",
		"network": "mainnet",
		"networkId": 108,
		"nativeCurrency": {
			"name": "ThunderCore Mainnet Ether",
			"symbol": "TT",
			"decimals": 18
		},
		"rpc": [
			"https://mainnet-rpc.thundercore.com"
		],
		"faucets": [
			"https://faucet.thundercore.com"
		],
		"explorers": [],
		"infoURL": "https://thundercore.com"
	},
	{
		"name": "ThunderCore Testnet",
		"chainId": 18,
		"shortName": "TST",
		"slug": "thundercore-testnet",
		"chain": "TST",
		"network": "testnet",
		"networkId": 18,
		"nativeCurrency": {
			"name": "ThunderCore Testnet Ether",
			"symbol": "TST",
			"decimals": 18
		},
		"rpc": [
			"https://testnet-rpc.thundercore.com"
		],
		"faucets": [
			"https://faucet-testnet.thundercore.com"
		],
		"explorers": [],
		"infoURL": "https://thundercore.com"
	},
	{
		"name": "TomoChain",
		"chainId": 88,
		"shortName": "tomo",
		"slug": "tomochain",
		"chain": "TOMO",
		"network": "mainnet",
		"networkId": 88,
		"nativeCurrency": {
			"name": "TomoChain Ether",
			"symbol": "TOMO",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.tomochain.com"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://tomocoin.io"
	},
	{
		"name": "Ubiq Network",
		"chainId": 8,
		"shortName": "ubq",
		"slug": "ubiq",
		"chain": "UBQ",
		"network": "mainnet",
		"networkId": 88,
		"nativeCurrency": {
			"name": "Ubiq Ether",
			"symbol": "UBQ",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.octano.dev",
			"https://pyrus2.ubiqscan.io"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ubiqsmart.com"
	},
	{
		"name": "Ubiq Network Testnet",
		"chainId": 9,
		"shortName": "tubq",
		"slug": "ubiq-testnet",
		"chain": "UBQ",
		"network": "mainnet",
		"networkId": 2,
		"nativeCurrency": {
			"name": "Ubiq Testnet Ether",
			"symbol": "TUBQ",
			"decimals": 18
		},
		"rpc": [],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://ethersocial.org"
	},
	{
		"name": "Valorbit",
		"chainId": 38,
		"shortName": "val",
		"slug": "valorbit",
		"chain": "VAL",
		"network": "mainnet",
		"networkId": 38,
		"nativeCurrency": {
			"name": "Valorbit",
			"symbol": "VAL",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.valorbit.com/v2"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://valorbit.com"
	},
	{
		"name": "Wanchain",
		"chainId": 888,
		"shortName": "wan",
		"slug": "wanchain",
		"chain": "WAN",
		"network": "mainnet",
		"networkId": 888,
		"nativeCurrency": {
			"name": "Wancoin",
			"symbol": "WAN",
			"decimals": 18
		},
		"rpc": [
			"https://gwan-ssl.wandevs.org:56891/"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://www.wanscan.org"
	},
	{
		"name": "Wanchain Testnet",
		"chainId": 999,
		"shortName": "twan",
		"slug": "wanchain-testnet",
		"chain": "WAN",
		"network": "testnet",
		"networkId": 999,
		"nativeCurrency": {
			"name": "Wancoin",
			"symbol": "WAN",
			"decimals": 18
		},
		"rpc": [
			"https://gwan-ssl.wandevs.org:46891/"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://testnet.wanscan.org"
	},
	{
		"name": "Webchain",
		"chainId": 24484,
		"shortName": "web",
		"slug": "webchain",
		"chain": "WEB",
		"network": "mainnet",
		"networkId": 37129,
		"nativeCurrency": {
			"name": "Webchain Ether",
			"symbol": "WEB",
			"decimals": 18
		},
		"rpc": [
			"https://node1.webchain.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://webchain.network"
	},
	{
		"name": "Wegochain Rubidium",
		"chainId": 5869,
		"shortName": "rbd",
		"slug": "wegochain",
		"chain": "RBD",
		"network": "mainnet",
		"networkId": 5869,
		"nativeCurrency": {
			"name": "Rubid",
			"symbol": "RBD",
			"decimals": 18
		},
		"rpc": [
			"https://proxy.wegochain.io",
			"http://wallet.wegochain.io:7764"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "http://wegochain.io"
	},
	{
		"name": "xDAI",
		"chainId": 100,
		"shortName": "xdai",
		"slug": "xdai",
		"chain": "XDAI",
		"network": "mainnet",
		"networkId": 100,
		"nativeCurrency": {
			"name": "xDAI",
			"symbol": "xDAI",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.xdaichain.com",
			"https://xdai.poanetwork.dev",
			"wss://rpc.xdaichain.com/wss",
			"wss://xdai.poanetwork.dev/wss",
			"http://xdai.poanetwork.dev",
			"https://dai.poa.network",
			"ws://xdai.poanetwork.dev:8546"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://forum.poa.network/c/xdai-chain"
	},
	{
		"name": "Xerom",
		"chainId": 1313500,
		"shortName": "xero",
		"slug": "xerom",
		"chain": "XERO",
		"network": "mainnet",
		"networkId": 1313500,
		"nativeCurrency": {
			"name": "Xerom Ether",
			"symbol": "XERO",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.xerom.org"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://xerom.org"
	},
	{
		"name": "XinFin Apothem Testnet",
		"chainId": 51,
		"shortName": "TXDC",
		"slug": "xinfin-apothem",
		"chain": "TXDC",
		"network": "testnet",
		"networkId": 51,
		"nativeCurrency": {
			"name": "XinFinTest",
			"symbol": "TXDC",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.apothem.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://xinfin.org"
	},
	{
		"name": "XinFin Network",
		"chainId": 50,
		"shortName": "xdc",
		"slug": "xinfin",
		"chain": "XDC",
		"network": "mainnet",
		"networkId": 50,
		"nativeCurrency": {
			"name": "XinFin",
			"symbol": "XDC",
			"decimals": 18
		},
		"rpc": [
			"https://rpc.xinfin.network"
		],
		"faucets": [],
		"explorers": [],
		"infoURL": "https://xinfin.org"
	}
]

export const networksByChainID: Record<Ethereum.ChainID, Ethereum.Network> = {}
for(const network of networks)
	networksByChainID[network.chainId] = network

export const networksBySlug: Record<string, Ethereum.Network> = {}
for(const network of networks)
	networksBySlug[network.slug] = network

export const availableNetworks = [1, 137, 43114, 56, 250].map(chainID => networksByChainID[chainID])


export function getNetworkRPC(network: Ethereum.Network){
	return network.rpc[0].replace('${INFURA_PROJECT_ID}', INFURA_PROJECT_ID)
}