// import OpenLogin, { OPENLOGIN_NETWORK } from '@toruslabs/openlogin'
import { getDefaultProvider, Wallet } from 'ethers'
import * as publicEnv from '$env/static/public'
import { loadScript } from '$/utils/loadScript'
import type { Ethereum } from '$/data/networks/types'

export async function getTorusOpenLogin(network: Ethereum.Network){
	await loadScript('https://cdn.jsdelivr.net/npm/@toruslabs/openlogin@0')
	const {default: OpenLogin, OPENLOGIN_NETWORK, LOGIN_PROVIDER} = globalThis.Openlogin
	// const {default: OpenLogin, OPENLOGIN_NETWORK} = (await import('@toruslabs/openlogin'))

	const networkTypeByChainID: Record<Ethereum.ChainId, typeof OPENLOGIN_NETWORK[keyof typeof OPENLOGIN_NETWORK]> = {
		1: OPENLOGIN_NETWORK.MAINNET
	}

	const torusOpenLogin = new OpenLogin({
		clientId: publicEnv.PUBLIC_TORUS_PROJECT_ID,
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