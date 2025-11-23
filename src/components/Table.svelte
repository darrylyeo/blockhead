<script module lang="ts">
	// Types
	import type { Snippet } from 'svelte'

	export type Column<
		RowValue = any,
		CellValue = any,
		ColumnId extends string = string
	> = {
		id: ColumnId
		name: string
		value: (row: RowValue) => CellValue

		isSticky?: boolean

		sort?: {
			isDefault?: boolean
			defaultDirection: SortDirection
			compare?: (a: CellValue, b: CellValue, rowA: RowValue, rowB: RowValue) => number
		}

		HeaderTitle?: Snippet<
			[
				{
					column: Column<RowValue, CellValue, ColumnId>
				},
			]
		>

		Cell?: Snippet<
			[
				{
					row: RowValue
					column: Column<RowValue, CellValue, ColumnId>
					value: CellValue
				},
			]
		>

		subcolumns?: Column<RowValue, CellValue, ColumnId>[]
		isDefaultExpanded?: boolean
	}

	export enum SortDirection {
		Ascending = 'asc',
		Descending = 'desc',
	}

	type SortState<ColumnId extends string = string> = {
		columnId: ColumnId
		direction: SortDirection
	}

	import { SvelteMap, SvelteSet } from 'svelte/reactivity'

	// State
	export class TableState<
		RowValue = any,
		CellValue = any,
		ColumnId extends string = string
	> {
		columns: Column<RowValue, CellValue, ColumnId>[] = $state([])

		#columnsById = $derived(
			new SvelteMap(
				this.columns
					.flatMap(function flatten(column): (typeof column)[] {
						return [column, ...(column.subcolumns?.flatMap(flatten) ?? [])]
					})
					.map(column => [column.id, column]),
			),
		)

		#isColumnExpanded = $state(new SvelteSet<ColumnId>())

		columnsVisible = $derived.by(() => {
			const getVisibleColumns = (
				columns: Column<RowValue, CellValue, ColumnId>[],
			): Column<RowValue, CellValue, ColumnId>[] =>
				columns.flatMap(column =>
					column.subcolumns?.length && this.#isColumnExpanded.has(column.id)
						? getVisibleColumns(column.subcolumns)
						: [column],
				)

			return getVisibleColumns(this.columns)
		})

		#defaultColumnSort?: SortState<ColumnId>

		sortState?: SortState<ColumnId> = $state(this.#defaultColumnSort)

		sortedColumn = $derived(
			this.sortState?.columnId && this.#columnsById.get(this.sortState.columnId),
		)

		maxHeaderLevel = $derived.by(() => {
			const getMaxLevel = (columns: Column<RowValue, CellValue, ColumnId>[]): number =>
				Math.max(
					1,
					...columns.map(column =>
						!column.subcolumns?.length ? 1 : 1 + getMaxLevel(column.subcolumns),
					),
				)

			return getMaxLevel(this.columns)
		})

		rows = $state<RowValue[]>([])

		#rowIsDisabled?: (row: RowValue, table: TableState<RowValue, CellValue, ColumnId>) => boolean

		#displaceDisabledRows: boolean

		rowsSorted = $derived.by(() => {
			if (!this.sortState) {
				return this.rows
			}

			const { columnId, direction } = this.sortState

			const column = this.#columnsById.get(columnId)

			return this.rows.toSorted((a, b) => {
				if (this.#displaceDisabledRows && this.#rowIsDisabled) {
					const isRowADisplaced = this.#rowIsDisabled(a, this)
					const isRowBDisplaced = this.#rowIsDisabled(b, this)

					if (isRowADisplaced || isRowBDisplaced) {
						return isRowADisplaced && isRowBDisplaced ? 0 : isRowADisplaced ? 1 : -1
					}
				}

				const aVal = column?.value(a)
				const bVal = column?.value(b)

				return aVal === undefined || aVal === null
					? direction === 'asc'
						? 1
						: -1
					: bVal === undefined || bVal === null
						? direction === 'asc'
							? -1
							: 1
						: column?.sort?.compare
							? direction === 'asc'
								? column.sort.compare(aVal, bVal, a, b)
								: column.sort.compare(bVal, aVal, b, a)
							: typeof aVal === 'string' && typeof bVal === 'string'
								? direction === 'asc'
									? aVal.localeCompare(bVal)
									: bVal.localeCompare(aVal)
								: aVal < bVal
									? direction === 'asc'
										? -1
										: 1
									: aVal > bVal
										? direction === 'asc'
											? 1
											: -1
										: 0
			})
		})

		pageSize: number = $state(Infinity)

		currentPage = $state(1)

		rowsVisible = $derived(
			this.rowsSorted.slice(
				(this.currentPage - 1) * this.pageSize || 0,
				((this.currentPage - 1) * this.pageSize || 0) + this.pageSize,
			),
		)

		totalPages = $derived(Math.max(1, Math.ceil(this.rows.length / this.pageSize)))

		canGoBack = $derived(this.rows.length > 0 && this.currentPage > 1)

		canGoForward = $derived(this.rows.length > 0 && this.currentPage < this.totalPages)

		constructor({
			data,
			columns,
			pageSize,
			rowIsDisabled,
			displaceDisabledRows,
		}: {
			data: RowValue[]
			columns: Column<RowValue, CellValue, ColumnId>[]
			pageSize?: number
			rowIsDisabled?: (row: RowValue, table: TableState<RowValue, CellValue, ColumnId>) => boolean
			displaceDisabledRows?: boolean
		}) {
			this.rows = [...data]
			this.columns = columns
			this.pageSize = pageSize || Infinity

			const defaultSortedColumn = this.columns.find(column => column.sort?.isDefault)

			this.#defaultColumnSort = this.sortState = defaultSortedColumn && {
				columnId: defaultSortedColumn.id,
				direction: defaultSortedColumn.sort?.defaultDirection ?? SortDirection.Ascending,
			}

			this.#rowIsDisabled = rowIsDisabled
			this.#displaceDisabledRows = displaceDisabledRows ?? false

			const initializeIsColumnExpanded = (columns: Column<RowValue, CellValue, ColumnId>[]) => {
				columns.forEach(column => {
					if (column.isDefaultExpanded) {
						this.#isColumnExpanded.add(column.id)
					}

					if (column.subcolumns?.length) {
						initializeIsColumnExpanded(column.subcolumns)
					}
				})
			}

			initializeIsColumnExpanded(columns)
		}

		toggleColumnSort = (columnId: ColumnId) => {
			const column = this.#columnsById.get(columnId)

			if (!column?.sort) {
				return false
			}

			this.sortState =
				this.sortState?.columnId !== columnId
					? {
							columnId,
							direction: column.sort.defaultDirection,
						}
					: this.sortState?.direction === column.sort.defaultDirection
						? {
								columnId,
								direction: column.sort.defaultDirection === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending,
							}
						: this.#defaultColumnSort

			return true
		}

		isColumnExpanded = (columnId: ColumnId): boolean => this.#isColumnExpanded.has(columnId)

		toggleIsColumnExpanded = (columnId: ColumnId) => {
			if (this.#isColumnExpanded.has(columnId)) {
				this.#isColumnExpanded.delete(columnId)
			} else {
				this.#isColumnExpanded.add(columnId)
			}
		}
	}
</script>


<script lang="ts" generics="
	_TableState extends TableState,
	RowId
">
	// Types
	import type { SvelteHTMLElements } from 'svelte/elements'

	type _RowValue = _TableState extends TableState<infer RowValue, any, any> ? RowValue : any
	type _CellValue = _TableState extends TableState<any, infer CellValue, any> ? CellValue : any
	type _ColumnId = _TableState extends TableState<any, any, infer ColumnId> ? ColumnId : string
	type _Column = Column<_RowValue, _CellValue, _ColumnId>


	// IDs
	const id = $props.id()


	// Props
	let {
		tableId = `table_${id}`,

		rows,
		rowId: getRowId,
		rowIsDisabled,
		displaceDisabledRows = false,
		onRowClick,

		columns,
		sortedColumn = $bindable(),

		expandHeaderCells = true,

		cellVerticalAlign,
		Cell,

		...restProps
	}: SvelteHTMLElements['div'] & {
		tableId?: string

		rows: _RowValue[]

		rowId?: (row: _RowValue, index: number) => RowId
		rowIsDisabled?: (row: _RowValue, table: TableState<_RowValue, _CellValue, _ColumnId>) => boolean
		onRowClick?: (row: _RowValue, rowId?: RowId) => void
		displaceDisabledRows?: boolean

		columns: _Column[]
		sortedColumn?: _Column | undefined

		expandHeaderCells?: boolean

		Cell?: Snippet<[{
			row: _RowValue
			column: _Column
			value: _CellValue
		}]>
		cellVerticalAlign?: (args: {
			row: _RowValue
			column: _Column
			value: _CellValue
		}) => 'top' | 'middle' | 'bottom' | 'baseline' | undefined
	} = $props()


	// State
	let table = $derived(
		new TableState({
			data: rows,
			columns,
			rowIsDisabled,
			displaceDisabledRows,
		})
	)

	$effect(() => {
		sortedColumn = table.sortedColumn
	})


	// Functions
	const getColumnSpan = (column: _Column): number => (
		!column.subcolumns?.length ?
			1
		:
			column.subcolumns
				.reduce(
					(sum, childColumn) => (
						!childColumn.subcolumns?.length ?
							sum + 1
						:
							sum + getColumnSpan(childColumn)
					),
					0
				)
	)


	// Transitions/animations
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
	import { fade, fly } from 'svelte/transition'
</script>


<div
	{...restProps}
	id={tableId}
	class="container {'class' in restProps ? restProps.class : ''}"
>
	<table>
		<colgroup>
			{#each table.columnsVisible as column (column.id)}
				{@const columnSpan = getColumnSpan(column)}
				{@const isSortable = !!column.sort}

				<col
					span={columnSpan}
					data-sortable={isSortable ? '' : undefined}
					data-sort={table.sortState?.columnId === column.id ? table.sortState?.direction : undefined}
				/>
			{/each}
		</colgroup>

		<thead data-sticky="block">
			{@render headerRows(table.columns, 0)}

			{#snippet headerRows(columns: (_Column | undefined)[], level: number)}
				{@const nextLevelColumns =
					columns
						.flatMap(column => (
							!column ?
								[undefined]
							: column.subcolumns?.length && table.isColumnExpanded(column.id) ?
								column.subcolumns
							:
								Array.from({ length: getColumnSpan(column) }, () => undefined)
						))
				}

				<tr in:fly={{ y: '-50%', duration: 300, easing: expoOut }}>
					{#each columns as column, index (column?.id ?? `blank-${level}-${index}`)}
						{#if column}
							{@render headerCell(column, level)}
						{:else if !expandHeaderCells}
							<th class="blank-cell"></th>
						{/if}
					{/each}
				</tr>

				{#if nextLevelColumns.some(column => column)}
					{@render headerRows(nextLevelColumns, level + 1)}
				{/if}
			{/snippet}

			{#snippet headerCell(column: _Column, level: number)}
				{@const colspan = getColumnSpan(column)}
				{@const isSortable = !!column.sort}
				{@const isExpandable = !!column.subcolumns?.length}
				{@const isExpanded = table.isColumnExpanded(column.id)}

				<th
					{colspan}
					rowspan={
						expandHeaderCells && (!isExpandable || !isExpanded) ?
							table.maxHeaderLevel - level
						:
							undefined
					}
					data-header-level={level}
					data-sortable={isSortable ? '' : undefined}
					data-sort={table.sortState?.columnId === column.id ? table.sortState?.direction : undefined}
					data-sticky={column.isSticky ? 'inline' : undefined}
					data-expandable={isExpandable ? '' : undefined}
					data-expanded={isExpandable && isExpanded ? '' : undefined}
				>
					<div
						class="header-cell-content"
						data-sticky-container
					>
						{#snippet HeaderTitle()}
							<span
								class="header-title"
							>
								{#if column.HeaderTitle}
									{@render column.HeaderTitle({ column })}
								{:else}
									{column.name}
								{/if}
							</span>
						{/snippet}

						<div data-sticky-container>
							{#if isSortable}
								<label class="sort-label" data-pressable="to-containing">
									<span data-sticky="no-backdrop">
										{@render HeaderTitle()}

										<button
											type="button"
											aria-label={`Sort by ${column.name}`}
											class="sort-button"
											onclick={() => {
												table.toggleColumnSort(column.id)
											}}
											disabled={!column.sort}
										></button>
									</span>
								</label>
							{:else}
								<span data-sticky>
									{@render HeaderTitle()}
								</span>
							{/if}
						</div>

						{#if isExpandable}
							<button
								type="button"
								class="expansion-button"
								data-sticky
								onclick={() => {
									table.toggleIsColumnExpanded(column.id)
								}}
								title={isExpanded ? 'Collapse' : 'Expand'}
								aria-label={isExpanded ? 'Collapse' : 'Expand'}
							></button>
						{/if}
					</div>
				</th>
			{/snippet}
		</thead>

		<tbody>
			{#each table.rowsVisible as row, index (getRowId?.(row, index))}
				{@const rowId = getRowId?.(row, index)}

				<tr
					tabIndex={onRowClick ? 0 : undefined}
					data-pressable={onRowClick ? '' : undefined}
					onclick={() => {
						onRowClick?.(row, rowId)
					}}
					onkeypress={e => {
						if(e.code === 'Enter' || e.code === 'Space'){
							onRowClick?.(row, rowId)
						}
					}}
					onkeyup={e => {
						if(e.code === 'ArrowUp'){
							e.preventDefault()

							const row = e.currentTarget.previousElementSibling ?? e.currentTarget.parentElement?.lastElementChild

							if(row instanceof HTMLElement)
								row.focus()
						}
						else if(e.code === 'ArrowDown'){
							e.preventDefault()

							const row = e.currentTarget.nextElementSibling ?? e.currentTarget.parentElement?.firstElementChild

							if(row instanceof HTMLElement)
								row.focus()
						}
					}}
					animate:flip={{ duration: 300, easing: expoOut }}
					data-disabled={rowIsDisabled?.(row, table) ? '' : undefined}
				>
					{#each table.columnsVisible as column (column.id)}
						{@const isSortable = !!column.sort}
						{@const value = column.value?.(row)}
						{@const columnSpan = getColumnSpan(column)}

						<td
							colspan={columnSpan}
							data-sortable={isSortable ? '' : undefined}
							data-sort={table.sortState?.columnId === column.id ? table.sortState?.direction : undefined}
							data-sticky={column.isSticky ? 'inline' : undefined}
							style:--table-cell-verticalAlign={
								cellVerticalAlign?.({
									row,
									column,
									value,
								})
							}
							animate:flip={{ duration: 300, easing: expoOut }}
							in:fade={{ duration: 300, easing: expoOut }}
						>
							{#if column.Cell}
								{@render column.Cell({
									row,
									column,
									value,
								})}
							{:else if Cell}
								{@render Cell({
									row,
									column,
									value,
								})}
							{:else}
								{value}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>


<style>
	.container {
		--table-backgroundColor: light-dark(#fdfdfd, #22242b);
		--table-outerBorderColor: var(--border-color);
		--table-innerBorderColor: color-mix(in oklch, var(--border-color) 50%, transparent);
		--table-outerBorderWidth: 1px;
		--table-innerBorderWidth: 1px;
		--table-cornerRadius: 1rem;
		--table-cell-verticalAlign: middle;
		--table-cell-padding: 0.75em;

		scroll-padding: var(--table-outerBorderWidth);

		background-color: var(--table-backgroundColor);
		box-shadow: 0 0 0 var(--table-outerBorderWidth) var(--table-outerBorderColor) inset;
		border-radius: calc(var(--table-cornerRadius) + var(--table-outerBorderWidth));

		clip-path: inset(
			0 0 0 0
			round calc(var(--table-cornerRadius) + var(--table-outerBorderWidth))
		);
	}

	:where(table) {
		min-width: 100%;
		width: max-content;
		/* margin-inline: calc(-1 * var(--table-borderWidth)); */

		border-collapse: separate;
		border-spacing: var(--table-innerBorderWidth);

		:where(thead) {
			font-size: 0.75em;
			text-wrap: nowrap;

			position: sticky;
			top: 0;
			z-index: 1;

			border-start-start-radius: calc(var(--table-cornerRadius) + var(--table-outerBorderWidth));
			border-start-end-radius: calc(var(--table-cornerRadius) + var(--table-outerBorderWidth));

			&[data-sticky] {
				/* Safari: apply `backdrop-filter` and `background-color` to `thead` instead of `thead::before` */
				@supports (hanging-punctuation: first) and (font: -apple-system-body) and (-webkit-appearance: none) {
					background-color: var(--sticky-backgroundColor);
					backdrop-filter: var(--sticky-backdropFilter);

					&::before {
						content: none !important;
					}
				}
			}

			@container not scroll-state(stuck: none) {
				border-start-start-radius: 0;
				border-start-end-radius: 0;
			}

			:where(tr) {
				:where(th) {
					&[data-header-level='0'] {
						font-weight: 700;
						font-size: 1.1em;
						background-color: color-mix(in oklch, var(--table-backgroundColor), rgba(255, 255, 255, 0.02));
					}
					&[data-header-level='1'] {
						font-weight: 600;
						font-size: 0.825em;
						background-color: color-mix(in oklch, var(--table-backgroundColor), rgba(255, 255, 255, 0.01));
					}
					&[data-header-level='2'] {
						font-weight: 500;
						font-size: 0.7em;
						background-color: color-mix(in oklch, var(--table-backgroundColor), rgba(255, 255, 255, 0.005));
					}
					&[data-header-level='3'] {
						font-weight: 400;
						font-size: 0.7em;
						background-color: color-mix(in oklch, var(--table-backgroundColor), rgba(255, 255, 255, 0.0025));
					}

					> .header-cell-content {
						display: grid;
						grid-auto-flow: column;
						grid-template-columns: 1fr;
						grid-auto-columns: auto;
						align-items: center;
						gap: 0.25em;

						&[data-sticky-container] {
							--sticky-paddingInlineEnd: 0.5em;
						}

						> [data-sticky-container] {
							--sticky-paddingInlineEnd: 1em;
						}
					}

					&[data-sortable] {
						--column-sortIndicator-transform: perspective(1000px) scale(0);
						--column-sortIndicator-fontSize: 0;

						&[data-sort='asc'] {
							--column-sortIndicator-transform: perspective(1000px);
							--column-sortIndicator-fontSize: 1em;
						}

						&[data-sort='desc'] {
							--column-sortIndicator-transform: perspective(1000px) rotateX(180deg);
							--column-sortIndicator-fontSize: 1em;
						}

						&[data-sort] {
							filter: brightness(150%);
						}

						.sort-label {
							line-height: 1;

							display: flex;
							align-items: center;
							justify-content: center;
							cursor: pointer;

							padding: var(--table-cell-padding);

							.sort-button {
								margin-inline-start: 0.5em;
								display: inline-block;
								padding: 0;

								background-color: transparent;
								border: none;
								outline: none;

								&::after {
									content: '↑';

									display: inline-block;

									font-size: var(--column-sortIndicator-fontSize);
									font-family: system-ui;

									transform: var(--column-sortIndicator-transform);

									transition-property: transform, font-size;
								}
							}
						}

						&:has(.sort-button:focus) {
							outline: var(--table-outerBorderWidth) solid var(--accent);
							outline-offset: calc(-1 * var(--table-outerBorderWidth));
							border-radius: 0.5em;
						}

						.header-title {
							white-space: wrap;
							flex: 0 0 0;
							width: 0;
							min-width: fit-content;
						}
					}

					&[data-expandable] {
						--isExpanded: 0;

						cursor: pointer;

						&[data-expanded] {
							--isExpanded: 1;
						}

						.expansion-button {
							margin: var(--table-cell-padding);
							margin-inline-start: calc(-2 * var(--table-cell-padding));

							background-color: transparent;

							flex: 0 0 auto;
							font-size: 0.75em;
							padding: 0.33em;
							border: none;

							transition-property: background-color, transform, opacity;

							&:hover {
								background-color: rgba(255, 255, 255, 0.15);
							}

							&:after {
								content: '';
								width: 1em;
								height: 1em;
								background-color: currentColor;
								mask-image: var(--icon-chevron);
								transform: perspective(100px) rotateX(calc(var(--isExpanded) * -180deg));
								transition-property: transform;
							}
						}
					}
				}

				&:first-child {
					border-start-start-radius: var(--table-cornerRadius) !important;
					border-start-end-radius: var(--table-cornerRadius) !important;

					:where(th) {
						&:first-child {
							border-start-start-radius: var(--table-cornerRadius) !important;
						}
						&:last-child {
							border-start-end-radius: var(--table-cornerRadius) !important;
						}
					}
				}

				@container not scroll-state(stuck: none) {
					&:first-child {
						border-start-start-radius: 0.5em !important;
						border-start-end-radius: 0.5em !important;

						:where(th) {
							&:first-child {
								border-start-start-radius: 0.5em !important;
							}
							&:last-child {
								border-start-end-radius: 0.5em !important;
							}
						}
					}
				}
			}
		}

		:where(tbody) {
			isolation: isolate;

			border-end-start-radius: calc(var(--table-cornerRadius) + var(--table-outerBorderWidth));
			border-end-end-radius: calc(var(--table-cornerRadius) + var(--table-outerBorderWidth));

			counter-reset: TableRowCount;

			:where(tr) {
				--table-row-backgroundColor: light-dark(rgba(0, 0, 0, 0.03), rgba(255, 255, 255, 0.03));

				&:not([data-disabled]) {
					counter-increment: TableRowCount;
				}

				counter-reset: TableColumnCount;

				box-shadow:
					0 var(--table-innerBorderWidth) var(--table-innerBorderColor),
					0 calc(-1 * var(--table-innerBorderWidth)) var(--table-innerBorderColor);

				&:nth-of-type(odd) {
					background-color: var(--table-row-backgroundColor);
				}

				&[data-pressable] {
					cursor: pointer;

					& td.sticky {
						transition: var(--pressable-transitionOutDuration) var(--pressable-transitionOutDuration)
							var(--transition-easeOutExpo);
					}

					&:hover {
						--table-row-backgroundColor: light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.05));
					}

					&:active:not(:has([tabindex='0']:active)) {
						&:active {
							--borderColor: transparent;
						}

						box-shadow: none;

						& td.sticky {
							backdrop-filter: none;
							transition:
								all var(--active-transitionInDuration),
								backdrop-filter none;
							opacity: 0;
							scale: 0.9;
						}
					}
				}

				&[data-disabled] {
					filter: grayscale();
					opacity: 0.3;
				}

				> :where(td) {
					box-shadow: var(--table-innerBorderWidth) 0 var(--table-row-backgroundColor);
					vertical-align: var(--table-cell-verticalAlign);

					counter-increment: TableColumnCount;

					/* When sorting a non-sticky column, fade cells from other non-sticky columns */
					tr:has(:not([data-sticky])[data-sort]) &[data-sortable]:not([data-sort], [data-sticky], :hover, :focus-within) {
						opacity: 0.66;
					}
				}
			}
		}

		:where(
			th,
			td
		) {
			&[data-align='start'] {
				text-align: start;
				align-items: start;
				transform-origin: left;
			}
			&[data-align='end'] {
				text-align: end;
				align-items: end;
				transform-origin: right;
			}

			@container (width < 48rem) {
				&[data-sticky] {
					position: static !important;

					&:before {
						content: none !important;
					}
				}
			}
		}

		:where(th) {
			position: relative;
		}

		:where(td) {
			padding: var(--table-cell-padding);
		}
	}
</style>
