// https://ncw-developers.fireblocks.com/docs/webhook-configuration

import { error, json } from '@sveltejs/kit'

import crypto from 'node:crypto'

import type { RequestHandler } from './$types'

import {
	PRIVATE_FIREBLOCKS_SANDBOX_WEBHOOK_PUBLIC_KEY as FIREBLOCKS_SANDBOX_WEBHOOK_PUBLIC_KEY,
	PRIVATE_FIREBLOCKS_PRODUCTION_WEBHOOK_PUBLIC_KEY as FIREBLOCKS_PRODUCTION_WEBHOOK_PUBLIC_KEY,
} from '$env/static/private'

import { trpc } from '../../../../api/fireblocks-ncw/trpc'

const isSandbox = true

export const POST: RequestHandler = async ({ request, fetch }) => {
	const messageString = JSON.stringify(request.body)
	const signature = request.headers.get('fireblocks-signature')

	if(!signature) throw error(500, 'Signature not found')

	const verifier = crypto.createVerify('RSA-SHA512')
	verifier.write(messageString)
	verifier.end()

	const publicKey = isSandbox ? FIREBLOCKS_SANDBOX_WEBHOOK_PUBLIC_KEY : FIREBLOCKS_PRODUCTION_WEBHOOK_PUBLIC_KEY

	const isVerified = verifier.verify(publicKey, signature, 'base64')
	console.log('Verified:', isVerified)

	if(!isVerified) throw error(500, 'Invalid signature')

	const message = JSON.parse(messageString)

	try {
		if(message.type === 'NCW_DEVICE_MESSAGE'){
			const { walletId, deviceId, physicalDeviceId, data } = message

			return json(
				await trpc().saveMessage.mutate({
					walletId,
					deviceId,
					physicalDeviceId,
					data,
				})
			)
		}
	}catch(e){
		console.error(e)
		throw error(500, e?.message)
	}

	return new Response()
}
