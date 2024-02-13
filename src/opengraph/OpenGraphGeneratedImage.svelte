<script lang="ts">
	// Inputs
	export let width = 1910
	export let height = 1000
	export let title = ''
	export let subtitle = ''
	export let annotation = ''
	export let bodyComponent: BodyComponent | undefined
	export let bodyComponentProps: BodyComponentProps | undefined
	export let url: URL
	export let primaryColor = ''


	// Functions
	const clamp = (min: number, value: number, max: number) => Math.min(Math.max(min, value), max)
</script>


<main
	class="column"
	style={`
		width: ${width}px;
		height: ${height}px;
		background: linear-gradient(155deg, #01002d, ${primaryColor});
	`}
>
	<header class="column">
		<div class="row">
			<h1
				class="title"
				style={`
					font-size: ${clamp(24, 1.2 * width / title.length, 44)}px;
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

	<div class="content column">
		<slot />
	</div>

	<footer class="row">
		<div class="row">
			<img
				class="logo"
				src={`https://blockhead.info/Blockhead-Logo.svg`}
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
</main>


<style>
	main {
		padding: 2em;
		row-gap: 1.5em;

		background-size: 100% 250%;
		color: #fff;
		font-size: 30px;
		font-family: Ubuntu, sans-serif;
	}

	header {
		margin-top: -0.5em;
		justify-content: flex-start;
	}

	.content {
		flex: 1;
		overflow: hidden;
	}

	.logo {
		width: 90px;
		height: 90px;
	}
</style>
