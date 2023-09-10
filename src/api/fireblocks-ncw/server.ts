// EdgeDB database
import { createClient } from 'edgedb'

import e from './edgedb/dbschema/edgeql-js'

export const client = createClient()


// tRPC Context
import type { RequestEvent } from '@sveltejs/kit'
import type { inferAsyncReturnType } from '@trpc/server'

export const createContext = async (event: RequestEvent) => {
	return {
		auth: {
			payload: {
				sub: 'test-user',
			},
		},
	}
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>


// tRPC Router
import { initTRPC } from '@trpc/server'

export const t = initTRPC.context<TrpcContext>().create()

import z from 'zod'

export const router = t.router({
	login: t.procedure
		.input(z.object({
			auth: z.object({
				payload: z.object({
					sub: z.string(),
				}),
			}),
		}))
		.output(z.object({
			id: z.string(),
		}))
		.mutation(async ({
			ctx: {
				auth: {
					payload: {
						sub,
					},
				},
			},
		}) => (
			await e.select(
				e.insert(e.User, {
					sub,
				}).unlessConflict(user => ({
					on: user.sub,
					else: user,
				})),
			)
				.run(client)
		)),

	saveMessage: t.procedure
		.input(z.object({
			walletId: z.string(),
			deviceId: z.string(),
			physicalDeviceId: z.string(),
			data: z.string(),
		}))
		.mutation(async ({
			input: {
				walletId,
				deviceId,
				physicalDeviceId,
				data,
			},
		}) => (
			await e.insert(e.Message, {
				device: e.select(e.Device, () => ({
					filter_single: {
						deviceId,
						walletId,
					},
				})),
				physicalDevice: e.select(e.PhysicalDevice.assert_single(), () => (
					e.insert(e.PhysicalDevice, {
						physicalDeviceId,
					})
					.unlessConflict(physicalDevice => ({
						on: physicalDevice.physicalDeviceId,
						else: physicalDevice,
					}))
				)),
				message: data,
			})
				.run(client)
		)),

	getMessages: t.procedure
		.input(z.object({
			physicalDeviceId: z.string().optional(),
			timeout: z.number().int().min(0).max(20).optional(),
			batchSize: z.number().int().min(1).max(20).optional(),
		}))
		.output(z.array(z.object({
			id: z.string(),
			message: z.any(),
		})))
		.query(async ({
			ctx: {
				auth: {
					payload: {
						sub,
					},
				},
			},
			input: {
				physicalDeviceId,
				timeout = 10,
				batchSize = 10,
			},
		}) => (
			await e.update(e.Message, message => ({
				set: {
					lastSeen: e.datetime_current(),
				},

				filter: e.op(
					// either unseen messages
					e.all(
						e.set(
							!physicalDeviceId || e.op(message.physicalDevice.physicalDeviceId, '=', physicalDeviceId),
							e.op('exists', message.lastSeen),
							e.op(message.device.user.sub, '=', sub),
						)
					),
					'or',
					// or - messages that were last seen after a visibility timeout
					e.all(
						e.set(
							!physicalDeviceId || e.op(message.physicalDevice.physicalDeviceId, '=', physicalDeviceId),
							e.op(message.lastSeen, '<', e.op(e.datetime_current(), '-', e.duration(`${timeout} seconds`))),
							e.op(message.device.user.sub, '=', sub),
						),
					),
				),
				order: {
					id: 'ASC',
				},
				limit: batchSize,

				id: true,
				message: true,
			}))
				.run(client)
		)),

	deleteMessage: t.procedure
		.input(z.object({
			messageId: z.string(),
			deviceId: z.string(),
		}))
		.mutation(async ({
			ctx: {
				auth: {
					payload: {
						sub,
					},
				},
			},
			input: {
				messageId,
				deviceId,
			},
		}) => (
			await e.delete(e.Message, message => ({
				filter_single: {
					id: messageId,
					device: {
						id: deviceId,
						user: {
							sub,
						},
					},
				},
			}))
				.run(client)
		)),
})

export type TrpcRouter = typeof router
