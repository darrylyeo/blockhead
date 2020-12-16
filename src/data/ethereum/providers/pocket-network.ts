import type { Ethereum } from '../types'
// import { Pocket, Configuration, HttpRpcProvider, PocketAAT, PocketRpcProvider } from '@pokt-network/pocket-js'
// import { Pocket, Configuration, HttpProvider, HttpRpcProvider, PocketAAT, PocketProvider, PocketRpcProvider } from '@pokt-network/web3-provider'
import { POCKET_NETWORK_DISPATCH_URLS, POCKET_NETWORK_APP_AUTH_TOKEN } from '../../../config'
import { env } from '../../../config-secrets'


let pocketInstance
let pocketAAT
async function getPocketInstance(){
	if(!pocketInstance || !pocketAAT){
		const { Pocket, HttpProvider, Configuration } = await import('@pokt-network/web3-provider')

		// The dispatcher provides information about your Pocket session so that your
		// application can then connect to the decentralized network of nodes.
		// You can use one of our dispatchers or any node connected to the Pocket blockchain.
		// https://docs.pokt.network/docs/known-dispatcher-list
		const dispatchers = POCKET_NETWORK_DISPATCH_URLS.map(url => new URL(url))

		pocketInstance = new Pocket(
			dispatchers,

			new HttpProvider(dispatchers), // HttpRpcProvider

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

		pocketAAT = await unlockAAT(pocketInstance, POCKET_NETWORK_APP_AUTH_TOKEN, env.POCKET_NETWORK_PPK, env.POCKET_NETWORK_PASSPHRASE)
	}

	return { pocketInstance, pocketAAT }
}


// This is only called once to setup the Pocket Instance and AAT
async function unlockAAT(pocketInstance, aat, accountPPK, accountPassphrase) {
	const { PocketAAT } = await import('@pokt-network/web3-provider')

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
export async function getPocketNetwork(network: Ethereum.Network = 'mainnet'){
	const { PocketProvider } = await import('@pokt-network/web3-provider')
	const { pocketInstance, pocketAAT } = await getPocketInstance()
	
	const blockchainID = {
		'mainnet': '0021',
		'rinkeby': '0022',
		'ropsten': '0023',
		'goerli': '0020'
	}[network]

	const provider = new PocketProvider(blockchainID, pocketAAT, pocketInstance)
	// const provider = new PocketRpcProvider(blockchainID, pocketAAT, pocketInstance)

	return { instance: pocketInstance, provider }
}


// unlockAAT(POCKET_NETWORK_APP_AUTH_TOKEN, POCKET_NETWORK_PPK, POCKET_NETWORK_PASSPHRASE).then(async pocketAAT => {
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