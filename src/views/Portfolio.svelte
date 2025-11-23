<script module>
	export const PortfolioLayout = {
		Summary: 'summary',
		Full: 'full',
	} as const
</script>


<script lang="ts">
	// Types/constants
	import type { Portfolio } from '$/schema/Portfolio.ts'


	// Props
	let {
		portfolio = $bindable(),
		layout = PortfolioLayout.Full,
	}: {
		portfolio: Portfolio
		layout?: typeof PortfolioLayout[keyof typeof PortfolioLayout]
	} = $props()


	// Functions
	import { isEvmAddress } from '$/schema/EvmActor.ts'
	import { getPortfolio } from '$/data/Octav.remote'


	// State
	let isEditingTitle = $state(false)
	let isAddingAddress = $state(false)


	// Components
	import Balance from '$/components/Balance.svelte'
</script>


{#snippet Title({
	headingLevel,
	link = false,
}: {
	headingLevel: 1 | 2
	link?: boolean
})}
	{#snippet Heading()}
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
				<p>{portfolio.$fields.$$actors.length} account{portfolio.$fields.$$actors.length !== 1 ? 's' : ''}</p>
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
						isAddingAddress = false
				}}
				{@attach element => {
					if(isAddingAddress)
						element.open = true
				}}
			>
				<summary
					data-sticky="inline"
					data-scroll-item="inline-detached padding-match-start padding-match-end"
				>
					<header data-row="wrap">
						<h2>Accounts</h2>

						{#if !isAddingAddress}
							<button
								type="button"
								onclick={() => {
									isAddingAddress = true
								}}
							>Add Account</button>
						{/if}
					</header>
				</summary>

				<div
					data-scroll-item="inline-detached padding-match-end"
				>
					{#if isAddingAddress}
						<form
							data-card="secondary"
							data-row="wrap"
							onsubmit={(e) => {
								e.preventDefault()

								const formData = new FormData(e.currentTarget)
								const address = formData.get('address')

								if(!isEvmAddress(address)){
									e.currentTarget.reportValidity({
										validity: {
											customError: 'Invalid Ethereum address',
										},
									})
									return
								}

								portfolio.$fields.$$actors.push({
									$network: { chainId: 1 },
									address,
								})

								isAddingAddress = false
							}}
							onkeydown={(e) => {
								if(e.key === 'Escape')
									isAddingAddress = false
							}}
						>
							<label
								data-row-item="grow"
								data-column="gap-2"
							>
								Add Account
								<input
									name="address"
									placeholder="0x... / ENS Name"
								/>
							</label>

							<div>
								<button type="submit">Add</button>

								<button
									type="button"
									onclick={() => {
										isAddingAddress = false
									}}
								>Cancel</button>
							</div>
						</form>
					{/if}

					<ul>
						{#each portfolio.$fields.$$actors as actor, i}
							<li>
								{actor.address}

								<menu>
									<li>
										<button
											type="button"
											onclick={() => {
												portfolio.$fields.$$actors.splice(i, 1)
											}}
										>Remove</button>
									</li>
								</menu>
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

				{#each portfolio.$fields.$$actors as actor, i}
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
