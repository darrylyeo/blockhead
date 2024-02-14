<script lang="ts">
	// Inputs
	export let width = 1910
	export let height = 1000
	export let title = ''
	export let subtitle = ''
	export let annotation = ''
	export let backgroundIcon = ''
	export let bodyComponent: BodyComponent | undefined
	export let bodyComponentProps: BodyComponentProps | undefined
	export let url: URL
	export let primaryColor = ''


	// Functions
	const clamp = (min: number, value: number, max: number) => Math.min(Math.max(min, value), max)
</script>


<div
	class="layout column"
	style={`
		width: ${width}px;
		height: ${height}px;
	`}
>
	<div
		style={`
			background: linear-gradient(155deg, #01002d, ${primaryColor});
			background-size: 100% 250%;
		`}
	>
		{#if backgroundIcon}
			<img
				class="background-icon"
				src={backgroundIcon}
				width={1}
				height={300}
			/>
		{/if}
	</div>

	<div
		class="column"
	>
		<header class="column">
			<div class="row">
				<h1
					class="title"
					style={`
						font-size: ${clamp(24, 1.2 * width / title.length, 48)}px;
					`}
				>{title}</h1>

				<p class="annotation">{annotation}</p>
			</div>

			{#if subtitle}
				<h2
					class="subtitle"
				>{subtitle}</h2>
			{/if}
		</header>

		<main class="column">
			<slot />
		</main>

		<footer class="row">
			<div class="row">
				<img
					class="logo"
					src={new URL(`/Blockhead-Logo.svg`, url.origin).toString()}
				/>

				<p>
					<output
						class="url"
						style={`
							font-size: ${clamp(20, width * 1.3 / `${url.host}${url.pathname}`.length, 50)}px;
						`}
					>
						<strong>{url.host}</strong>{url.pathname}
					</output>
				</p>
			</div>
		</footer>
	</div>
</div>


<style>
	.layout {
		color: #fff;
		font-size: 30px;
		font-family: Ubuntu, sans-serif;
	}

	.layout > * {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 2em;
		row-gap: 2em;
	}

	header {
		justify-content: flex-start;
		gap: 2.25em;
	}

	.title {
		font-size: 1.5em;
	}

	.subtitle {
		margin-top: -1.25em;
		font-size: 1.25em;
		opacity: 0.5;
	}

	main {
		flex: 1;
		overflow: hidden;
	}

	.logo {
		width: 90px;
		height: 90px;
	}

	.background-icon {
		position: absolute;
		right: -12rem;
		top: -12rem;
		width: 50rem;
		height: 50rem;
		opacity: 0.06;
	}
</style>
