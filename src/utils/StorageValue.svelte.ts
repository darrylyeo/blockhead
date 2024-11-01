export class StorageValue<
	Value,
	SerializedValue = Value,
> {
	key: string
	value: Value = $state()!
	deserialize: ((_: SerializedValue) => Value)
	serialize: ((_: Value) => SerializedValue)
	storage?: Storage

	constructor(
		key: string,
		defaultValue: Value,
		{
			deserialize = (_: SerializedValue) => _ as unknown as Value,
			serialize = (_: Value) => _ as unknown as SerializedValue,
			storage = globalThis.localStorage,
		}: {
			deserialize?: ((_: SerializedValue) => Value)
			serialize?: ((_: Value) => SerializedValue)
			storage?: Storage
		} = {},
	) {
		this.key = key
		this.deserialize = deserialize
		this.serialize = serialize
		this.storage = storage
		this.value = this.#_value ?? defaultValue

		$effect(() => {
			if(!this.storage) return

			if (this.value !== undefined)
				this.storage.setItem(this.key, JSON.stringify(this.serialize(this.value)))
			else
				this.storage.removeItem(this.key)
		})

		$effect(() => {
			const controller = new AbortController()

			globalThis.addEventListener?.(
				'storage',
				e => {
					if(e.key === this.key)
						this.value = this.#_value ?? defaultValue
				},
				{
					signal: controller.signal,
				},
			)

			return () => {
				controller.abort()
			}
		})
	}

	get #_value() {
		if(!this.storage) return

		const json = this.storage.getItem(this.key)

		if(json) try {
			return this.deserialize(JSON.parse(json) as SerializedValue)
		} catch(error){
			console.error(error)
			return undefined
		}
	}
}
