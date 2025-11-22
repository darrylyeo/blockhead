export type Entity<
	Id,
	Fields,
	Links = never
> = {
	$id: (
		Id
	)
	$fields: (
		Fields
	)
	$links: (
		Partial<Links>
	)
	$entity: (
		& Id
		& Fields
		& Partial<Links>
	)
}

export type ExtendEntity<
	_Entity extends Entity<any, any, any>,
	Fields,
	Links = never
> = (
	_Entity extends Entity<infer _Id, infer _Fields, infer _Links> ?
		Entity<
			_Id,
			_Fields & Fields,
			_Links & Partial<Links>
		>
	:
		never
)
