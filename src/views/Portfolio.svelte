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
	import { getPortfolio } from '$/data/Octav.remote'
	import { getAddressFromEns } from '$/data/Viem.remote'

	const resolveIdentityToActor = async (identity: Identity['$id']): Promise<EvmActor['$id'] | null> => {
		if (identity.type === IdentityType.EvmActor) {
			return identity.actor
		}
		if (identity.type === IdentityType.EnsDomain) {
			const address = await getAddressFromEns({
				ensName: identity.ensDomain.name,
				network: { chainId: 1 },
			})
			return address?.$id || null
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
	import IdentityComponent from '$/components/Identity.svelte'
</script>


{#snippet Title({
	headingLevel,
	link = false,
}: {
	headingLevel: 1 | 2
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
	data-card={layout === PortfolioLayout.Summary ? '' : undefined}
	data-column="gap-0"
>
	{#if layout === PortfolioLayout.Summary}
		<details open>
			<summary
				data-sticky="inline"
				data-scroll-item="inline-detached padding-match-start padding-match-end"
			>
				<header data-row="wrap">
					{@render Title({
						headingLevel: 2,
						link: true,
					})}

					<div data-tag="small">Portfolio</div>
				</header>
			</summary>

			<section
				data-scroll-item="inline-detached"
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
				headingLevel: 1,
			})}
		</header>

		<section
			data-scroll-item="inline-detached"
			data-column="gap-0"
		>
			<details
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
					data-scroll-item="inline-detached padding-match-start padding-match-end"
				>
					<header data-row="wrap">
						<div data-row="gap-2">
							<h2>Accounts</h2>

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
					data-scroll-item="inline-detached padding-match-end"
					data-column
				>
					{#if isAddingIdentity}
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<form
							data-card="secondary"
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
							<li>
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
							</li>
						{/each}
					</ul>
				</div>
			</details>
		</section>

		<section
			data-scroll-item="inline-detached"
			data-column="gap-0"
		>
			<details open>
				<summary
					data-sticky="inline"
					data-scroll-item="inline-detached padding-match-start padding-match-end"
				>
					<header>
						<h2>Coins</h2>
					</header>
				</summary>

				{#each portfolio.$fields.$$identities as identity, i}
					{@const actor = await resolveIdentityToActor(identity)}

					{#if actor}
						{@const balances = await getPortfolio({ actor })}

						<ol>
							{#each balances as balance}
								<li>
									<Balance
										{balance}
									/>
								</li>
							{/each}
						</ol>
					{/if}
				{/each}
			</details>
		</section>
	{/if}
</article>


<style>
	input {
		max-width: var(--sticky-sizeInline);
	}
</style>
