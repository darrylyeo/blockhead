

<script lang="ts" generics="
	T extends import('$/schema/_Entity').Entity<any, any>
">
	// Types/constants
	import { entityQueryMap } from '$/data/_queries'


	// Props
	let {
		entity,
		network,
		queries: queriesBindable = $bindable(),
		children,
	}: {
		entity: T
		network?: import('$/schema/EvmNetwork').EvmNetwork['$id']
		queries?: unknown[]
		children: import('svelte').Snippet<[{ entity: T, queries: unknown[] }]>
	} = $props()


	// State
	let queries = $state([] as unknown[])

	$effect(() => {
		Promise.allSettled(
			(entityQueryMap[entity.$type as keyof typeof entityQueryMap] ?? []).map(async (config) => {
				try {
					const params = config.getParams(entity.$id as any, { network })
					return await config.queryFn(params)
				} catch (error) {
					console.error('Query error:', error)
					return null
				}
			})
		).then((results) => {
			queries = results
				.filter((r) => r.status === 'fulfilled' && r.value !== null)
				.map((r) => (r.status === 'fulfilled' ? r.value : null))
		})
	})

	$effect(() => {
		queriesBindable = queries
	})
</script>


{@render children({
	entity,
	queries,
})}
