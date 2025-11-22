<script module lang="ts">
	// Types
	export type NavigationItem = {
		id: string
		title: string
		icon?: string
		href?: string
		children?: NavigationItem[]
	}
</script>


<script lang="ts">
	// Props
	let {
		items,
		currentPathname,
	}: {
		items: NavigationItem[]
		currentPathname: string
	} = $props()


	// State
	import { SvelteMap } from 'svelte/reactivity'

	let isOpen = $state(
		new SvelteMap<NavigationItem, boolean>()
	)

	let searchValue = $state(
		''
	)

	let effectiveSearchValue = $derived(
		searchValue.trim().toLowerCase()
	)


	// Functions
	const hasCurrentPage = (item: NavigationItem) => (
		currentPathname === item.href
		|| (item.children?.some(hasCurrentPage) ?? false)
	)

	const fuzzyMatch = (text: string, query: string): [number, number][] | undefined => {
		const ranges: [number, number][] = []
		let textIndex = 0

		for (const char of query) {
			textIndex = text.toLowerCase().indexOf(char, textIndex)

			if (textIndex === -1) return

			const lastRange = ranges.at(-1)

			if (lastRange && lastRange[1] === textIndex) {
				lastRange[1]++
			} else {
				ranges.push([textIndex, textIndex + 1])
			}

			textIndex++
		}

		return ranges
	}

	const matchesSearch = (item: NavigationItem, query: string): boolean => (
		!query
		|| !!fuzzyMatch(item.title, query)
		|| (item.children?.some((child) => matchesSearch(child, query)) ?? false)
	)

	const highlightText = (text: string, query: string) => {
		const ranges = fuzzyMatch(text, query)

		return (
			ranges ?
				[
					...ranges.flatMap(([start, end], i, arr) => [
						text.slice(arr[i - 1]?.[1] ?? 0, start),
						`<mark>${text.slice(start, end)}</mark>`,
					]),
					text.slice(ranges.at(-1)?.[1] ?? 0),
				]
					.join('')
			:
				text
		)
	}
</script>


<search data-column="gap-3">
	<input
		type="search"
		data-sticky
		bind:value={searchValue}
		placeholder="Search (⌘+K)"
		{@attach element => {
			const abortController = new AbortController()

			let lastFocusedElement: HTMLElement | undefined = $state()

			globalThis.addEventListener(
				'keydown',
				event => {
					if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
						event.preventDefault()

						if(document.activeElement instanceof HTMLElement)
							lastFocusedElement = document.activeElement

						element.focus()
					}
				},
				{ signal: abortController.signal }
			)

			element.addEventListener(
				'blur',
				() => {
					lastFocusedElement?.focus()
					lastFocusedElement = undefined
				},
				{ signal: abortController.signal }
			)

			return () => {
				abortController.abort()
				lastFocusedElement?.focus()
				lastFocusedElement = undefined
			}
		}}
		onkeyup={event => {
			if (event.key === 'Escape')
				event.currentTarget.blur()
		}}
	/>

	{@render navigationItems(items)}
</search>


{#snippet navigationItems(items: NavigationItem[])}
	<menu>
		{#each (
			effectiveSearchValue ?
				items.filter(item => matchesSearch(item, effectiveSearchValue))
			:
				items
		) as item (item.id)}
			<li>
				{@render navigationItem(item)}
			</li>
		{/each}
	</menu>
{/snippet}


{#snippet navigationItem(item: NavigationItem)}
	{#if !item.children?.length}
		{@render linkable(item)}
	{:else}
		<details
			bind:open={
				() => (
					effectiveSearchValue ?
						matchesSearch(item, effectiveSearchValue)
					:
						isOpen.get(item) ?? isOpen.set(item, hasCurrentPage(item)).get(item)
				),
				_ => {
					if (!effectiveSearchValue && _ !== undefined)
						isOpen.set(item, _)
				}
			}
			data-sticky-container
		>
			<summary data-sticky>
				{@render linkable(item)}
			</summary>

			{@render navigationItems(item.children)}
		</details>
	{/if}
{/snippet}


{#snippet linkable(item: NavigationItem)}
	{#if item.href}
		<a
			href={item.href}
			aria-current={currentPathname === item.href ? 'page' : undefined}
			{...item.href.startsWith('http') && {
				target: '_blank',
				rel: 'noreferrer',
			}}
		>
			{#if item.icon}
				<span class="icon">{@html item.icon}</span>
			{/if}

			<span>{@html effectiveSearchValue ? highlightText(item.title, effectiveSearchValue) : item.title}</span>
		</a>
	{:else}
		{#if item.icon}
			<span class="icon">{@html item.icon}</span>
		{/if}

		<span>{@html effectiveSearchValue ? highlightText(item.title, effectiveSearchValue) : item.title}</span>
	{/if}
{/snippet}


<style>
	menu {
		display: grid;
		gap: 2px;
		list-style: none;
		font-size: 0.975em;

		li {
			display: grid;
		}
	}

	details {
		&[data-sticky-container] {
			--sticky-marginBlockStart: 1.75rem;
			--sticky-paddingBlockStart: 0.5rem;
		}
	}

	a {
		color: inherit;
		font-weight: inherit;

		&:hover {
			color: var(--accent);
			text-decoration: none;
		}

		&[aria-current] {
			background-color: var(--background-primary);
			font-weight: 700;
		}
	}

	summary,
	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		> .icon {
			display: flex;
			font-size: 1.25em;
			width: 1em;
			height: 1em;
			line-height: 1;

			:global(
				img,
				svg
			) {
				border-radius: 0.125rem;
				width: 100%;
				height: 100%;
			}
		}

		:global(mark) {
			font-weight: 600;
			text-decoration: underline;
			background-color: transparent;
			color: inherit;
		}
	}

	summary,
	a:not(summary a) {
		padding: 0.45rem 0.45rem;
		border-radius: 0.375rem;
		font-weight: 500;

		transition-property: opacity, scale, background-color, color, outline;

		&:hover:not(:has(a:hover)) {
			background-color: var(--background-primary);
			color: var(--accent);
		}

		&:focus {
			outline: 2px solid var(--accent);
			outline-offset: -1px;
		}

		&:active {
			background-color: var(--background-primary);
		}
	}

	details:not([open]) > summary::after {
		transform: perspective(100px) rotateX(180deg) rotate(-90deg);
	}

	summary ~ * {
		margin-inline-start: 2em;
		margin-block-start: 2px;

		margin-inline-start: 1.25em;
		margin-block-start: 2px;
		padding-inline-start: 0.75em;
		box-shadow: -1px 0 var(--border-color);
	}
</style>
