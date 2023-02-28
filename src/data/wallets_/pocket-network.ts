import type { Ethereum } from '../../networks/types'
// import { Pocket, Configuration, HttpRpcProvider, PocketAAT, PocketRpcProvider } from '@pokt-network/pocket-js'
// import { Pocket, Configuration, HttpProvider, HttpRpcProvider, PocketAAT, PocketProvider, PocketRpcProvider } from '@pokt-network/web3-provider'
import { POCKET_NETWORK_DISPATCH_URLS, POCKET_NETWORK_APP_AUTH_TOKEN } from '../../../config'
import { env } from '../../../env'


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


// unlockAAT(env.POCKET_NETWORK_APP_AUTH_TOKEN, env.POCKET_NETWORK_PPK, env.POCKET_NETWORK_PASSPHRASE).then(async pocketAAT => {
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