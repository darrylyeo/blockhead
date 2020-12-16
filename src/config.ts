// import dotenv from 'dotenv'
// dotenv.config()


// Portis Wallet
export const PORTIS_DAPP_ID = '136f70ac-f0e2-4f6f-b83b-a1089ec331bb'


// Pocket Network
export const POCKET_NETWORK_DISPATCH_URLS = ['https://node1.mainnet.pokt.network:443', 'https://node2.mainnet.pokt.network:443', 'https://node3.mainnet.pokt.network:443']

export const POCKET_NETWORK_APP_AUTH_TOKEN = {
	"version": "0.0.1",
	"clientPublicKey": "bdbfc70cb8c9529903d1b4bba0a69c4b434bf40ea3b968baa4b81af1ef8c5e03",
	"applicationPublicKey": "98c2e1be1e4aac38ffffb9c1b95d8d0e4ab7dd7a6b073085dac8e4d6eda5b592",
	"applicationSignature": "8e0bfcdff2dcd41e44484bfc17ee5b7f2e5e76b6815b079a1cc12abf6620250709f25e1162c0830d1650799e7e9917f0083987caee8ea4bcee6abb53536e0703"
}
// export const POCKET_NETWORK_PPK = process.env.POCKET_NETWORK_PPK ?? ''
// export const POCKET_NETWORK_PASSPHRASE = process.env.POCKET_NETWORK_PASSPHRASE ?? ''
export { POCKET_NETWORK_PPK, POCKET_NETWORK_PASSPHRASE } from './config-secrets'


// Vega
export const VEGA_NODE_URL = 'lb.testnet.vega.xyz' // 'n06.testnet.vega.xyz'


// The Graph: ENS
export const THE_GRAPH_ENS_URL = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'


// The Graph: Uniswap
export const THE_GRAPH_UNISWAP_API_URL = 'wss://api.thegraph.com/explorer/graphql'


// Covalent
export const COVALENT_URL = `https://api.covalenthq.com`
export const COVALENT_API_KEY = 'ckey_a3230f8b678f4ea4a66bff40a54'