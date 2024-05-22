import type {  } from '$/data/networks/types'
// import { Pocket, Configuration, HttpRpcProvider, PocketAAT, PocketRpcProvider } from '@pokt-network/pocket-js'
// import { Pocket, Configuration, HttpProvider, HttpRpcProvider, PocketAAT, PocketProvider, PocketRpcProvider } from '@pokt-network/web3-provider'


const POCKET_NETWORK_DISPATCH_URLS = [
	'https://node1.mainnet.pokt.network:443',
	'https://node2.mainnet.pokt.network:443',
	'https://node3.mainnet.pokt.network:443',
	'https://node4.mainnet.pokt.network:443',
	'https://node5.mainnet.pokt.network:443',
	'https://node6.mainnet.pokt.network:443',
	'https://node7.mainnet.pokt.network:443',
	'https://node8.mainnet.pokt.network:443',
	'https://node9.mainnet.pokt.network:443',
	'https://node10.mainnet.pokt.network:443',
	'https://seed1.mainnet.pokt.network:443',
	'https://seed2.mainnet.pokt.network:443',
]

const POCKET_NETWORK_APP_AUTH_TOKEN = {
	"version": "0.0.1",
	"clientPublicKey": "bdbfc70cb8c9529903d1b4bba0a69c4b434bf40ea3b968baa4b81af1ef8c5e03",
	"applicationPublicKey": "98c2e1be1e4aac38ffffb9c1b95d8d0e4ab7dd7a6b073085dac8e4d6eda5b592",
	"applicationSignature": "8e0bfcdff2dcd41e44484bfc17ee5b7f2e5e76b6815b079a1cc12abf6620250709f25e1162c0830d1650799e7e9917f0083987caee8ea4bcee6abb53536e0703"
}


// https://docs.pokt.network/docs/supported-networks-on-mainnet
const pocketNetworkChainIDs: Record<Ethereum.ChainID, string> = {
	// 1: '0021', // Mainnet Full Node
	1: '0022', // Mainnet Archival
	3: '0023', // Ropsten Full Node
	42: '0024', // Kovan Full Node
	4: '0025', // Rinkeby Full Node
	5: '0026', // Gorli Full Node
	100: '0027', // xDAI Full Node
}


let pocketInstance
let pocketAAT
async function getPocketInstance(){
	if(!pocketInstance || !pocketAAT){
		const { Pocket, HttpRpcProvider, Configuration } = await import('@pokt-network/pocket-js')

		// The dispatcher provides information about your Pocket session so that your
		// application can then connect to the decentralized network of nodes.
		// You can use one of our dispatchers or any node connected to the Pocket blockchain.
		// https://docs.pokt.network/docs/known-dispatcher-list
		const dispatchers = POCKET_NETWORK_DISPATCH_URLS

		pocketInstance = new Pocket(
			dispatchers.map(url => new URL(url)),

			new HttpRpcProvider(dispatchers.join(',')),

			// (optional) Configuration stores multiple properties used to interact with the Pocket Network. 
			new Configuration(
				// maxDispatchers - (optional) Maximun amount of dispatchers urls to be stored in rounting table, default 0.
				5,
				// maxSessions - (optional) Maximun amount of sessions to be stored for the session manager, default 0.
				1000,
				// maxConsensusNodes - (optional) Maximun amount of nodes for local consensus, mandatory ODD number, default 0.
				0,
				// requestTimeOut - (optional) Maximun timeout for every request in miliseconds, default 0.
				40000
			)
		)

		pocketAAT = await unlockAAT(pocketInstance, POCKET_NETWORK_APP_AUTH_TOKEN, POCKET_NETWORK_PPK, POCKET_NETWORK_PASSPHRASE)
	}

	return { pocketInstance, pocketAAT }
}


// This is only called once to setup the Pocket Instance and AAT
async function unlockAAT(pocketInstance, aat, accountPPK, accountPassphrase) {
	const { PocketAAT } = await import('@pokt-network/pocket-js')

	try {
		const account = await pocketInstance.keybase.importPPKFromJSON(
			accountPassphrase,
			JSON.stringify(accountPPK),
			accountPassphrase
		)
		// @ts-ignore
		await pocketInstance.keybase.unlockAccount(account.addressHex, accountPassphrase, 0)
		return await PocketAAT.fromSignature(
			aat.version,
			account.publicKey.toString('hex'),
			aat.applicationPublicKey,
			aat.applicationSignature
		)
	} catch(e) {
		console.error(e)
	}
}


// https://docs.pokt.network/docs/web3-provider
export async function getPocketNetwork(network: Ethereum.Network){
	const { PocketProvider } = await import('@pokt-network/web3-provider')
	const { pocketInstance, pocketAAT } = await getPocketInstance()
	
	const provider = new PocketProvider(pocketNetworkChainIDs[network.chainId], pocketAAT, pocketInstance)
	// const provider = new PocketRpcProvider(blockchainID, pocketAAT, pocketInstance)

	return { instance: pocketInstance, provider }
}


// unlockAAT(publicEnv.PUBLIC_POCKET_NETWORK_APP_AUTH_TOKEN, publicEnv.PUBLIC_POCKET_NETWORK_PPK, publicEnv.PUBLIC_POCKET_NETWORK_PASSPHRASE).then(async pocketAAT => {
// 	// See https://docs.pokt.network/docs/supported-networks-on-mainnet for blockchain choices
// 	const blockchain = "0021" // Ethereum mainnet
	
// 	// Call this every time you want to fetch RPC data
// 	try {
// 		return await pocketInstance.sendRelay(
// 			'{"jsonrpc":"2.0","id":1,"method":"net_version","params":[]}',
// 			blockchain,
// 			pocketAAT
// 		)
// 	} catch (e) {
// 		console.error(e)
// 	}
// })