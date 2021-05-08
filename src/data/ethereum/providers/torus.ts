// import OpenLogin, { OPENLOGIN_NETWORK } from '@toruslabs/openlogin'
import { getDefaultProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { env } from '../../../config-secrets'
import { loadScript } from '../../../utils/load-script'
import type { Ethereum } from '../types'

export async function getTorusOpenLogin(network: Ethereum.Network){
	await loadScript('https://cdn.jsdelivr.net/npm/@toruslabs/openlogin@0')
	const {default: OpenLogin, OPENLOGIN_NETWORK, LOGIN_PROVIDER} = globalThis.Openlogin
	// const {default: OpenLogin, OPENLOGIN_NETWORK} = (await import('@toruslabs/openlogin'))

	const networkTypeByChainID: Record<Ethereum.ChainID, typeof OPENLOGIN_NETWORK[keyof typeof OPENLOGIN_NETWORK]> = {
		1: OPENLOGIN_NETWORK.MAINNET
	}

	const { TORUS_PROJECT_ID, TORUS_OPENLOGIN_SECRET } = env

	const torusOpenLogin = new OpenLogin({
		clientId: TORUS_PROJECT_ID,
		network: networkTypeByChainID[network.chainId],
		uxMode: 'popup'
	})

	await torusOpenLogin.init()

	if(!torusOpenLogin.privKey){
		await torusOpenLogin.login({
			display: 'popup'
		})
	}

	console.log(torusOpenLogin)

	const provider = new Wallet(torusOpenLogin.privKey, getDefaultProvider())

	return { instance: torusOpenLogin, provider }
}