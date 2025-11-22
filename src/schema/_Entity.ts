export type Entity<
	Type,
	Id,
	Fields = Record<string, unknown>,
	Links = Record<string, unknown>
> = {
	$type: Type
	$id: (
		Id
	)
	$fields: (
		Fields
	)
	$links: (
		Partial<Links>
	)
	// $entity: (
	// 	& Partial<Links>
	// 	& Fields
	// 	& Id
	// )
}

export type ExtendEntity<
	Type,
	_Entity extends Entity<any, any>,
	Fields,
	Links = never
> = (
	_Entity extends Entity<infer _Id, infer _Fields, infer _Links> ?
		Entity<
			Type,
			_Id,
			_Fields & Fields,
			_Links & Partial<Links>
		>
	:
		never
)

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
}
