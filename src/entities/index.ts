// Types/constants
import type { Actor } from './actor'
import type { App } from './app'
import type { Balance } from './balance'
import type { Block } from './block'
import type { Contract } from './contract'
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
	// Beacon = 'Beacon',
	// Blob = 'Blob',
	Block = 'Block',
	Contract = 'Contract',
	// Ens = 'Ens',
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
	: _EntityType extends EntityType.Block ?
		Block
	: _EntityType extends EntityType.Contract ?
		Contract
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
