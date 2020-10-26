import { Pocket, Configuration, HttpRpcProvider, PocketAAT } from '@pokt-network/pocket-js';
import { POCKET_NETWORK_DISPATCH_URL, POCKET_NETWORK_APP_AUTH_TOKEN, POCKET_NETWORK_PPK, POCKET_NETWORK_PASSPHRASE } from '../../../config'

// The dispatcher provides information about your Pocket session so that your
// application can then connect to the decentralized network of nodes.
// You can use one of our dispatchers or any node connected to the Pocket blockchain.
const dispatchURL = new URL(POCKET_NETWORK_DISPATCH_URL)
const rpcProvider = new HttpRpcProvider(dispatchURL)
const configuration = new Configuration(5, 1000, 0, 40000)

export const pocketInstance = new Pocket([dispatchURL], rpcProvider, configuration)

// This is only called once to setup the Pocket Instance and AAT
async function unlockAAT(aat, accountPPK, accountPassphrase) {
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
			// @ts-ignore
			account.publicKey.toString('hex'),
			aat.applicationPublicKey,
			aat.applicationSignature
		)
	} catch(e) {
		console.error(e)
	}
}

unlockAAT(POCKET_NETWORK_APP_AUTH_TOKEN, POCKET_NETWORK_PPK, POCKET_NETWORK_PASSPHRASE).then(async pocketAAT => {
	// See https://docs.pokt.network/docs/supported-networks-on-mainnet for blockchain choices
	const blockchain = "0021" // Ethereum mainnet
	
	// Call this every time you want to fetch RPC data
	try {
		return await pocketInstance.sendRelay(
			'{"jsonrpc":"2.0","id":1,"method":"net_version","params":[]}',
			blockchain,
			pocketAAT
		)
	} catch (e) {
		console.error(e)
	}
})


export function getPocketNetwork(){
	return { provider: {} }
}