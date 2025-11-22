export type Entity<
	Type,
	Id,
	Fields = null,
	Links = null
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
	& (
		Links extends null ?
			{}
		:
			{
				$links: (
					Partial<Links>
				)
			}
	)
)

export type ExtendEntity<
	_Entity extends Entity<any, any>,
	Fields = null,
	Links = null
> = (
	Entity<
		_Entity['$type'],
		_Entity['$id'],
		(
			& (_Entity extends { $fields: infer F } ? F : {})
			& (Fields extends null ? {} : Fields)
		),
		(
			& (_Entity extends { $links: infer L } ? L : {})
			& (Links extends null ? {} : Links)
		)
	>
)

// export type ExtendEntity<
// 	_Entity extends Entity<any, any>,
// 	Fields = null,
// 	Links = null
// > = (
// 	_Entity extends Entity<infer _Type, infer _Id, infer _Fields, infer _Links> ?
//         Entity<
//             _Type,
//             _Id,
//             _Fields & Fields,
//             _Links & Links
//         >
//     : _Entity extends Entity<infer _Type, infer _Id, infer _Fields> ?
//         Entity<
//             _Type,
//             _Id,
//             _Fields & Fields,
//             Links
//         >
//     : _Entity extends Entity<infer _Type, infer _Id> ?
//         Entity<
//             _Type,
//             _Id,
//             Fields,
//             Links
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
	EvmNetwork = 'EvmNetwork',
	EvmTransaction = 'EvmTransaction',
	FarcasterAccount = 'FarcasterAccount',
	Identity = 'Identity',
	Portfolio = 'Portfolio',
	ContractPosition = 'ContractPosition',
}

export type EntityByType = {
	[EntityType.Balance]: import('./Balance').Balance
	[EntityType.Coin]: import('./Coin').Coin
	[EntityType.EnsDomain]: import('./EnsDomain').EnsDomain
	[EntityType.EvmActor]: import('./EvmActor').EvmActor
	[EntityType.EvmBlock]: import('./EvmBlock').EvmBlock
	[EntityType.EvmNetwork]: import('./EvmNetwork').EvmNetwork
	[EntityType.EvmTransaction]: import('./EvmTransaction').EvmTransaction
	[EntityType.FarcasterAccount]: import('./FarcasterAccount').FarcasterAccount
	[EntityType.Identity]: import('./Identity').Identity
	[EntityType.Portfolio]: import('./Portfolio').Portfolio
	[EntityType.ContractPosition]: import('./ContractPosition').ContractPosition
}
