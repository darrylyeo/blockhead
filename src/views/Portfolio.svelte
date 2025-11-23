<script module>
	export const PortfolioLayout = {
		Summary: 'summary',
		Full: 'full',
	} as const
</script>


<script lang="ts">
	// Types/constants
	import type { Portfolio } from '$/schema/Portfolio'
	import type { Identity } from '$/schema/Identity'
	import { IdentityType } from '$/schema/Identity'
	import type { EvmActor } from '$/schema/EvmActor'


	// Props
	let {
		portfolio = $bindable(),
		layout = PortfolioLayout.Full,
	}: {
		portfolio: Portfolio
		layout?: typeof PortfolioLayout[keyof typeof PortfolioLayout]
	} = $props()


	// Queries
	import { getDefiPositions as getDefiPositionsOctav, getNetworks as getNetworksOctav, getCoins as getCoinsOctav } from '$/data/Octav.remote'
	import { getPortfolioValue, getNfts, getDefiPositions, getHistoricalBalances, getNetworks, getCoins } from '$/data/1inch.remote'
	import { getAddressFromEns, getTransactions as getTransactionsViem, getEnsNameFromAddress } from '$/data/Viem.remote'
	import { getFarcasterFromAddress } from '$/data/Farcaster.remote'
	import { getProfitAndLoss } from '$/data/1inch.remote'

	// Identity resolution
	import { identityResolutionMap } from '$/data/_identityResolvers'
	import { EntityType } from '$/schema/_Entity'
	import { CoinType } from '$/schema/Coin'

	const resolveIdentityToActor = async (identity: Identity['$id']): Promise<EvmActor['$id'] | null> => {
		const identityEntity: Identity = {
			$type: EntityType.Identity,
			$id: identity,
			$fields: {
				links: []
			}
		}

		const preferredTypes = [IdentityType.EvmActor]
		const network = { chainId: 1 }
		
		const currentIndex = preferredTypes.indexOf(identity.type)
		const typesToLookup = preferredTypes.slice(0, currentIndex >= 0 ? currentIndex : preferredTypes.length)

		for (const result of await Promise.allSettled(
			typesToLookup.map(async (preferredType) => {
				try {
					const resolver = identityResolutionMap[identity.type]?.[preferredType]
					if (!resolver) return null
					return await resolver(identityEntity, network)
				} catch (error) {
					console.error(`Failed to lookup ${preferredType}:`, error)
					return null
				}
			})
		)) {
			if (result.status === 'fulfilled' && result.value !== null) {
				const resolved = result.value
				if (resolved.$id.type === IdentityType.EvmActor) {
					return resolved.$id.actor
				}
			}
		}

		if (identity.type === IdentityType.EvmActor) {
			return identity.actor
		}

		return null
	}


	// State
	let isEditingTitle = $state(false)
	let isAddingIdentity = $state(false)
	let newIdentity = $state(undefined as Identity['$id'] | undefined)


	// Components
	import Balance from '$/components/Balance.svelte'
	import IdentityInput from '$/components/IdentityInput.svelte'
	import IdentityComponent, { IdentityDisplayType } from '$/components/Identity.svelte'
	import IdentityResolver from '$/components/IdentityResolver.svelte'
	import DefiPosition from '$/components/DefiPosition.svelte'
</script>


{#snippet Title({
	headingLevel,
	link = false,
}: {
	headingLevel: 2 | 3
	link?: boolean
})}
	{#snippet Heading()}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<svelte:element this={`h${headingLevel}`}
			onclick={() => {
				if(!link)
					isEditingTitle = true
			}}
		>
			{portfolio.$fields.title || '[Untitled Portfolio]'}
		</svelte:element>
	{/snippet}

	{#if !isEditingTitle}
		{#if link}
			<a href="/portfolio/{portfolio.$id.id}">
				{@render Heading()}
			</a>
		{:else}
			{@render Heading()}
		{/if}
	{:else}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<form
			data-row="wrap"
			class="title-form"
			onsubmit={(e) => {
				e.preventDefault()
				const formData = new FormData(e.currentTarget)
				const newTitle = formData.get('title')
				if (newTitle && typeof newTitle === 'string') {
					portfolio.$fields.title = newTitle
				}
				isEditingTitle = false
			}}
			onkeydown={(e) => {
				if(e.key === 'Escape') {
					isEditingTitle = false
				}
			}}
		>
			<svelte:element this={`h${headingLevel}`}>
				<input
					name="title"
					value={portfolio.$fields.title}
					placeholder="Portfolio Name"
					autofocus
					onblur={() => {
						isEditingTitle = false
					}}
				/>
			</svelte:element>

			<button type="submit">Save</button>
		</form>
	{/if}
{/snippet}


<article
	data-column="gap-0"
>
	{#if layout === PortfolioLayout.Summary}
		<details
			open
			data-card="secondary"
			data-sticky-container
		>
			<summary
				data-sticky="inline"
				data-scroll-item="inline-detached padding-match-start padding-match-end"
			>
				<header data-row="wrap">
					{@render Title({
						headingLevel: 3,
						link: true,
					})}

					<div data-tag="small">Portfolio</div>
				</header>
			</summary>

			<section
				data-scroll-item="inline-detached padding-match-end"
				data-column="gap-0"
			>
				<p>{portfolio.$fields.$$identities.length} account{portfolio.$fields.$$identities.length !== 1 ? 's' : ''}</p>
			</section>
		</details>

	{:else if layout === PortfolioLayout.Full}
		<header
			data-sticky="inline"
			data-scroll-item="inline-detached padding-match-start padding-match-end"
		>
			{@render Title({
				headingLevel: 2,
			})}
		</header>

		<div
			data-column="gap-6"
		>
			<section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					data-card="secondary"
					open
					ontoggle={e => {
						if(!e.currentTarget.open)
							isAddingIdentity = false
					}}
					{@attach element => {
						if(isAddingIdentity)
							element.open = true
					}}
				>
					<summary
						data-sticky="inline"
					>
						<header data-row="wrap">
							<div data-row="gap-2">
								<h3>Accounts</h3>

								<div data-tag>
									{portfolio.$fields.$$identities.length}
								</div>
							</div>

							{#if !isAddingIdentity}
								<button
									type="button"
									onclick={() => {
										isAddingIdentity = true
									}}
								>Add Account</button>
							{/if}
						</header>
					</summary>

					<div
						data-column
					>
						{#if isAddingIdentity}
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<form
								data-card="tertiary"
								data-row="wrap"
								onsubmit={(e) => {
									e.preventDefault()

									if (!e.currentTarget.checkValidity()) {
										e.currentTarget.reportValidity()
										return
									}

									if (!newIdentity) {
										return
									}

									portfolio.$fields.$$identities.push(newIdentity)
									newIdentity = undefined
									isAddingIdentity = false
								}}
								onkeydown={(e) => {
									if(e.key === 'Escape') {
										isAddingIdentity = false
										newIdentity = undefined
									}
								}}
							>
								<label
									data-row-item="grow"
									data-column="gap-2"
								>
									Add Account
									<IdentityInput
										name="identity"
										bind:identity={newIdentity}
										network={{ chainId: 1 }}
										required
										autofocus
									/>
								</label>

								<div>
									<button type="submit">Add</button>

									<button
										type="button"
										onclick={() => {
											isAddingIdentity = false
											newIdentity = undefined
										}}
									>Cancel</button>
								</div>
							</form>
						{/if}

						<ul data-column="gap-2">
							{#each portfolio.$fields.$$identities as identity, i}
								<svelte:boundary>
									<!-- {@const actorQuery = await resolveIdentityToActor(identity)}

									{#snippet pending()}
										<p>
											Resolving identity 
											<IdentityComponent
												{identity}
											/>...
										</p>
									{/snippet} -->

									<li>
										<div data-column="gap-2">
											<div data-row>
												<IdentityComponent
													{identity}
												/>

												<button
													type="button"
													data-size="small"
													onclick={() => {
														portfolio.$fields.$$identities.splice(i, 1)
													}}
												>Remove</button>
											</div>
										</div>
									</li>
								</svelte:boundary>
							{/each}
						</ul>
					</div>
				</details>
			</section>

			<section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					open
					data-card="secondary"
				>
					<summary
						data-sticky="inline"
					>
						<header>
							<h3>Networks</h3>
						</header>
					</summary>

					{#each portfolio.$fields.$$identities as identity, i}
						<IdentityResolver
							{identity}
							preferredTypes={[IdentityType.EvmActor]}
							defaultNetwork={{ chainId: 1 }}
						>
							{#snippet children({ preferredIdentity, allResolvedIdentities })}
								{@const allIdentityEntities = [preferredIdentity, ...allResolvedIdentities]}
								
								{@const allActors = allIdentityEntities
									.flatMap(id => {
										// If identity is EvmActor, use the actor directly
										if (id.$id.type === IdentityType.EvmActor) {
											return [id.$id.actor]
										}
										// Otherwise, extract actors from links
										return id.$fields.links?.map(link => link.$actor) ?? []
									})
									.filter((actor, index, self) => 
										index === self.findIndex(a => a.address === actor.address && 
											('chainId' in a.$network ? a.$network.chainId : 1) === 
											('chainId' in actor.$network ? actor.$network.chainId : 1))
									)}

								{#if allActors.length > 0}
									<div data-column="gap-2">
										<ul data-column="gap-1">
											{#each allActors as actor}
												<li>
													<IdentityComponent
														identity={{
															type: IdentityType.EvmActor,
															actor
														}}
													/>
												</li>
											{/each}
										</ul>

										{#each allActors as actor}
											{@const networks1inch = await getNetworks({ actor })}
											{@const networksOctav = await getNetworksOctav({ actor })}
											{@const allNetworks = [...networks1inch, ...networksOctav]
												.filter((network, index, self) => 
													index === self.findIndex(n => 
														('chainId' in n.$id ? n.$id.chainId : 0) === 
														('chainId' in network.$id ? network.$id.chainId : 0)
													)
												)}

											{#if allNetworks.length > 0}
												<ul data-column="gap-2">
													{#each allNetworks as network}
														<li>
															<div data-row="wrap">
																<span>{network.$fields.name}</span>
																{#if network.$fields.nativeCurrency}
																	<span data-tag="small">
																		{network.$fields.nativeCurrency.$fields.symbol}
																	</span>
																{/if}
															</div>
														</li>
													{/each}
												</ul>
											{/if}
										{/each}
									</div>
								{/if}
							{/snippet}
						</IdentityResolver>
					{/each}
				</details>
			</section>

			<section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					open
					data-card="secondary"
				>
					<summary
						data-sticky="inline"
					>
						<header>
							<h3>Coins</h3>
						</header>
					</summary>

					{#each portfolio.$fields.$$identities as identity, i}
						<IdentityResolver
							{identity}
							preferredTypes={[IdentityType.EvmActor]}
							defaultNetwork={{ chainId: 1 }}
						>
							{#snippet children({ preferredIdentity, allResolvedIdentities })}
								{@const allIdentityEntities = [preferredIdentity, ...allResolvedIdentities]}
								
								{@const allActors = allIdentityEntities
									.flatMap(id => {
										// If identity is EvmActor, use the actor directly
										if (id.$id.type === IdentityType.EvmActor) {
											return [id.$id.actor]
										}
										// Otherwise, extract actors from links
										return id.$fields.links?.map(link => link.$actor) ?? []
									})
									.filter((actor, index, self) => 
										index === self.findIndex(a => a.address === actor.address && 
											('chainId' in a.$network ? a.$network.chainId : 1) === 
											('chainId' in actor.$network ? actor.$network.chainId : 1))
									)}

								{#if allActors.length > 0}
									<div data-column="gap-2">
										<ul data-column="gap-1">
											{#each allActors as actor}
												<li>
													<IdentityComponent
														identity={{
															type: IdentityType.EvmActor,
															actor
														}}
													/>
												</li>
											{/each}
										</ul>

										{#each allActors as actor}
											{@const coins1inch = await getCoins({ actor })}
											{@const coinsOctav = await getCoinsOctav({ actor })}
											{@const allCoins = (
												[...coins1inch, ...coinsOctav]
													.filter((coin, index, self) => {
														const coinKey = 'address' in coin.$id 
															? `${'chainId' in coin.$id.$network ? coin.$id.$network.chainId : 1}-${coin.$id.address.toLowerCase()}`
															: `native-${'chainId' in coin.$id.$network ? coin.$id.$network.chainId : 1}`
														return index === self.findIndex(c => {
															const cKey = 'address' in c.$id 
																? `${'chainId' in c.$id.$network ? c.$id.$network.chainId : 1}-${c.$id.address.toLowerCase()}`
																: `native-${'chainId' in c.$id.$network ? c.$id.$network.chainId : 1}`
															return cKey === coinKey
														})
													})
											)}

											{#if allCoins.length > 0}
												<ul data-column="gap-2">
													{#each allCoins as coin}
														<li>
															<div data-row="wrap">
																<span>
																	{#if coin.$fields.type === CoinType.NativeCurrency}
																		{coin.$fields.symbol}
																	{:else}
																		{coin.$fields.symbol} ({coin.$fields.name})
																	{/if}
																</span>
																{#if coin.$fields.icon}
																	<img src={coin.$fields.icon} alt={coin.$fields.symbol} width="24" height="24" />
																{/if}
															</div>
														</li>
													{/each}
												</ul>
											{/if}
										{/each}
									</div>
								{/if}
							{/snippet}
						</IdentityResolver>
					{/each}
				</details>
			</section>

			<section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					open
					data-card="secondary"
				>
					<summary
						data-sticky="inline"
					>
						<header>
							<h3>Positions</h3>
						</header>
					</summary>

					{#each portfolio.$fields.$$identities as identity, i}
						<IdentityResolver
							{identity}
							preferredTypes={[IdentityType.EvmActor]}
							defaultNetwork={{ chainId: 1 }}
						>
							{#snippet children({ preferredIdentity, allResolvedIdentities })}
								{@const allIdentityEntities = [preferredIdentity, ...allResolvedIdentities]}
								
								{@const allActors = allIdentityEntities
									.flatMap(id => {
										// If identity is EvmActor, use the actor directly
										if (id.$id.type === IdentityType.EvmActor) {
											return [id.$id.actor]
										}
										// Otherwise, extract actors from links
										return id.$fields.links?.map(link => link.$actor) ?? []
									})
									.filter((actor, index, self) => 
										index === self.findIndex(a => a.address === actor.address && 
											('chainId' in a.$network ? a.$network.chainId : 1) === 
											('chainId' in actor.$network ? actor.$network.chainId : 1))
									)}

								{#if allActors.length > 0}
									<div data-column="gap-2">
										<ul data-column="gap-1">
											{#each allActors as actor}
												<li>
													<IdentityComponent
														identity={{
															type: IdentityType.EvmActor,
															actor
														}}
													/>
												</li>
											{/each}
										</ul>

										{#each allActors as actor}
											{@const defiPositions1inch = await getDefiPositions({ actor })}
											{@const defiPositionsOctav = await getDefiPositionsOctav({ actor })}
											{@const allDefiPositions = [...defiPositions1inch, ...defiPositionsOctav]}

											{#if allDefiPositions.length > 0}
												<ul data-column="gap-2">
													{#each allDefiPositions as position}
														<li>
															<DefiPosition
																{position}
															/>
														</li>
													{/each}
												</ul>
											{/if}
										{/each}
									</div>
								{/if}
							{/snippet}
						</IdentityResolver>
					{/each}
				</details>
			</section>

			<!-- <section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					open
					data-card="secondary"
				>
					<summary
						data-sticky="inline"
					>
						<header>
							<h3>Transactions</h3>
						</header>
					</summary>

					{#each portfolio.$fields.$$identities as identity, i}
						{@const actor = await resolveIdentityToActor(identity)}

						{#if actor}
							{@const transactions = await getTransactionsViem(actor)}

							<ul>
								{#each transactions as transaction}
									<li>
										<div data-row="wrap">
											<span>{new Date(transaction.$fields.timestamp * 1000).toLocaleString()}</span>
											<span>{transaction.$id.hash}</span>
											<span>{transaction.$fields.value.toString()}</span>
										</div>
									</li>
								{/each}
							</ul>
						{/if}
					{/each}
				</details>
			</section>

			<section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					open
					data-card="secondary"
				>
					<summary
						data-sticky="inline"
					>
						<header>
							<h3>Historical Balances</h3>
						</header>
					</summary>

					{#each portfolio.$fields.$$identities as identity, i}
						{@const actor = await resolveIdentityToActor(identity)}

						{#if actor}
							{@const historicalBalances = await getHistoricalBalances({ actor })}

							<ul>
								{#each historicalBalances as historical}
									<li>
										<div data-column="gap-2">
											<time>{new Date(historical.timestamp * 1000).toLocaleString()}</time>
											<ul>
												{#each historical.balances as balance}
													<li>
														<Balance
															{balance}
														/>
													</li>
												{/each}
											</ul>
										</div>
									</li>
								{/each}
							</ul>
						{/if}
					{/each}
				</details>
			</section>

			<section
				data-scroll-item="inline-detached"
				data-column="gap-0"
			>
				<details
					open
					data-card="secondary"
				>
					<summary
						data-sticky="inline"
					>
						<header>
							<h3>NFTs</h3>
						</header>
					</summary>

					{#each portfolio.$fields.$$identities as identity, i}
						{@const actor = await resolveIdentityToActor(identity)}

						{#if actor}
							{@const nfts = await getNfts({ actor })}

							<ul>
								{#each nfts as nft}
									<li>
										<div data-row="wrap">
											{#if nft.$fields.image}
												<img
													src={nft.$fields.image}
													alt={nft.$fields.name ?? 'NFT'}
													width="64"
													height="64"
												/>
											{/if}
											<div data-column="gap-1">
												<span>{nft.$fields.name ?? `${nft.$id.contract} #${nft.$id.tokenId}`}</span>
												{#if nft.$fields.collection}
													<span>{nft.$fields.collection.name}</span>
												{/if}
											</div>
										</div>
									</li>
								{/each}
							</ul>
						{/if}
					{/each}
				</details>
			</section> -->
		</div>
	{/if}
</article>


<style>
	input {
		max-width: var(--sticky-sizeInline);
	}
</style>
