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

export type Entity<
	_EntityType extends EntityType
> = {
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
