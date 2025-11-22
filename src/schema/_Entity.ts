export type Entity<
	Type,
	Id,
	Fields = null,
> = (
	& {
		$type: Type
		$id: Id
	}
	& (
		Fields extends null ?
			{}
		:
			{
				$fields: (
					Fields
				)
			}
	)
)

export type ExtendEntity<
	_Entity extends Entity<any, any>,
	Fields = null
> = (
	Entity<
		_Entity['$type'],
		_Entity['$id'],
		(
			& (_Entity extends { $fields: infer F } ? F : {})
			& (Fields extends null ? {} : Fields)
		)
	>
)

// export type ExtendEntity<
// 	_Entity extends Entity<any, any>,
// 	Fields = null,
// 	Links = null
// > = (
// 	_Entity extends Entity<infer _Type, infer _Id, infer _Fields> ?
//         Entity<
//             _Type,
//             _Id,
//             _Fields & Fields,
//         >
//     : _Entity extends Entity<infer _Type, infer _Id> ?
//         Entity<
//             _Type,
//             _Id,
//             Fields,
//         >
//     :
//         never
// )

export enum EntityType {
	Balance = 'Balance',
	Coin = 'Coin',
	EnsDomain = 'EnsDomain',
	EvmActor = 'EvmActor',
	EvmBlock = 'EvmBlock',
	EvmContractPosition = 'EvmContractPosition',
	EvmEvent = 'EvmEvent',
	EvmNetwork = 'EvmNetwork',
	EvmTransaction = 'EvmTransaction',
	EvmTrace = 'EvmTrace',
	FarcasterAccount = 'FarcasterAccount',
	Identity = 'Identity',
	Portfolio = 'Portfolio',
}

export type EntityByType = {
	[EntityType.Balance]: import('./Balance').Balance
	[EntityType.Coin]: import('./Coin').Coin
	[EntityType.EnsDomain]: import('./EnsDomain').EnsDomain
	[EntityType.EvmActor]: import('./EvmActor').EvmActor
	[EntityType.EvmBlock]: import('./EvmBlock').EvmBlock
	[EntityType.EvmContractPosition]: import('./EvmContractPosition').EvmContractPosition
	[EntityType.EvmEvent]: import('./EvmEvent').EvmEvent
	[EntityType.EvmNetwork]: import('./EvmNetwork').EvmNetwork
	[EntityType.EvmTransaction]: import('./EvmTransaction').EvmTransaction
	[EntityType.EvmTrace]: import('./EvmTrace').EvmTrace
	[EntityType.FarcasterAccount]: import('./FarcasterAccount').FarcasterAccount
	[EntityType.Identity]: import('./Identity').Identity
	[EntityType.Portfolio]: import('./Portfolio').Portfolio
}
