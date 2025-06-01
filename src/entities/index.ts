// Types/constants
import type { Actor } from './actor'
import type { App } from './app'
import type { Balance } from './balance'
import type { AnyBeaconEntity } from './beacon'
import type { Blob } from './blob'
import type { Block } from './block'
import type { Contract } from './contract'
import type { ENSDomain } from './ens'
import type { Event } from './event'
import type { Network } from './network'
import type { Nft } from './nft'
import type { Storage } from './storage'
import type { Token } from './token'
import type { Trace } from './trace'
import type { Transaction } from './transaction'
import type { Transfer } from './transfer'
import type { Validator } from './validator'

export enum EntityType {
	Actor = 'Actor',
	App = 'App',
	Balance = 'Balance',
	Beacon = 'Beacon',
	Blob = 'Blob',
	Block = 'Block',
	Contract = 'Contract',
	Ens = 'Ens',
	Event = 'Event',
	Network = 'Network',
	Nft = 'Nft',
	Storage = 'Storage',
	Token = 'Token',
	Trace = 'Trace',
	Transaction = 'Transaction',
	Transfer = 'Transfer',
	Validator = 'Validator',
}

export type Entity<_EntityType extends EntityType = EntityType> = (
	_EntityType extends EntityType.Actor ?
		Actor
	: _EntityType extends EntityType.App ?
		App
	: _EntityType extends EntityType.Balance ?
		Balance
	: _EntityType extends EntityType.Beacon ?
		AnyBeaconEntity
	: _EntityType extends EntityType.Blob ?
		Blob
	: _EntityType extends EntityType.Block ?
		Block
	: _EntityType extends EntityType.Contract ?
		Contract
	: _EntityType extends EntityType.Ens ?
		ENSDomain
	: _EntityType extends EntityType.Event ?
		Event
	: _EntityType extends EntityType.Network ?
		Network
	: _EntityType extends EntityType.Nft ?
		Nft
	: _EntityType extends EntityType.Storage ?
		Storage
	: _EntityType extends EntityType.Token ?
		Token
	: _EntityType extends EntityType.Trace ?
		Trace
	: _EntityType extends EntityType.Transaction ?
		Transaction
	: _EntityType extends EntityType.Transfer ?
		Transfer
	: _EntityType extends EntityType.Validator ?
		Validator
	:
		never
)

export const getEntityId = {
	[EntityType.Actor]: (entity: Entity<EntityType.Actor>) => `${entity.chainId}:${entity.address}`,
	[EntityType.App]: (entity: Entity<EntityType.App>) => `${entity.slug}`,
	[EntityType.Balance]: (entity: Entity<EntityType.Balance>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Beacon]: (entity: Entity<EntityType.Beacon>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Blob]: (entity: Entity<EntityType.Blob>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Block]: (entity: Entity<EntityType.Block>) => `${entity.chainId}:${entity.blockNumber ?? entity.blockHash}`,
	[EntityType.Contract]: (entity: Entity<EntityType.Contract>) => `${entity.chainId}:${entity.address}`,
	[EntityType.Ens]: (entity: Entity<EntityType.Ens>) => `${entity.chainId}:${entity.name}`,
	[EntityType.Event]: (entity: Entity<EntityType.Event>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Network]: (entity: Entity<EntityType.Network>) => `${entity.chainId}`,
	[EntityType.Nft]: (entity: Entity<EntityType.Nft>) => `${entity.chainId}:${entity.contractAddress}:${entity.tokenId}`,
	[EntityType.Storage]: (entity: Entity<EntityType.Storage>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Token]: (entity: Entity<EntityType.Token>) => `${entity.chainId}:${entity.address}`,
	[EntityType.Trace]: (entity: Entity<EntityType.Trace>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Transaction]: (entity: Entity<EntityType.Transaction>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Transfer]: (entity: Entity<EntityType.Transfer>) => `${entity.chainId}:${entity.id}`,
	[EntityType.Validator]: (entity: Entity<EntityType.Validator>) => `${entity.chainId}:${entity.index}`,
} as const satisfies { [key in EntityType]: (entity: Entity<key>) => string }
