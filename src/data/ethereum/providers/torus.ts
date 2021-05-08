// import OpenLogin, { OPENLOGIN_NETWORK } from '@toruslabs/openlogin'
import { env } from '../../../config-secrets'
import { loadScript } from '../../../utils/load-script'
import type { Ethereum } from '../types'

const { TORUS_PROJECT_ID, TORUS_OPENLOGIN_SECRET } = env

export async function getTorusOpenLogin(network: Ethereum.Network){
	await loadScript('https://cdn.jsdelivr.net/npm/@toruslabs/openlogin@0')
	const {default: OpenLogin, OPENLOGIN_NETWORK, LOGIN_PROVIDER} = globalThis.Openlogin
	// const {default: OpenLogin, OPENLOGIN_NETWORK} = (await import('@toruslabs/openlogin'))

	const networkTypeByChainID: Record<Ethereum.ChainID, typeof OPENLOGIN_NETWORK[keyof typeof OPENLOGIN_NETWORK]> = {
		1: OPENLOGIN_NETWORK.MAINNET
	}

	const torusOpenLogin = new OpenLogin({
		clientId: TORUS_PROJECT_ID,
		network: networkTypeByChainID[network.chainId],
		iframeUrl: 'https://beta.openlogin.com',
		uxMode: 'popup'
	})

	await torusOpenLogin.init()

	const privateKey = await torusOpenLogin.login({
		display: 'popup'
	})
	console.log(torusOpenLogin)

	return torusOpenLogin
}