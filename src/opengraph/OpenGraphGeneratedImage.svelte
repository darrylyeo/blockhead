<script lang="ts">
	// Inputs
	export let width = 1620
	export let height = 1080
	export let title = ''
	export let subtitle = ''
	export let annotation = ''
	export let body = ''
	export let url: URL
	export let primaryColor = ''


	// Functions
	const clamp = (min: number, value: number, max: number) => Math.min(Math.max(min, value), max)
</script>


<main
	class="card column"
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

		<h2
			class="subtitle"
		>{subtitle}</h2>
	</header>

	<div class="column">
		<p>{body}</p>
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
						font-size: ${clamp(20, width * 1.1 / `${url.host}${url.pathname}`.length, 40)}px;
					`}
				>
					<strong>{url.host}</strong>{url.pathname}
				</output>
			</p>
		</div>
	</footer>
</main>


<style>
	* {
		box-sizing: border-box;
	}

	main {
		padding: 2.5em;

		background-size: 100% 250%;
		color: #fff;
		font-size: 24px;
		font-family: Ubuntu, sans-serif;
	}

	h1, h2 {
		font-weight: 400;
	}

	h1, h2, output {
		font-family: 'Fira Code', monospace;
		word-spacing: -0.2em;
	}

	.title {
		font-size: 1.5em;
	}

	.subtitle {
		margin-top: -1.25em;
		font-size: 1.3em;
		opacity: 0.5;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.25em;
	}
	.row > :last-child {
		text-align: right;
	}

	.column {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		justify-content: space-between;
		gap: 1em;
	}

	.annotation {
		opacity: 0.4;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	header {
		margin-top: -0.5em;
		justify-content: flex-start;
	}

	.logo {
		width: 90px;
		height: 90px;
	}

	.url {
		color: rgba(255, 255, 255, 0.5);
	}
	.url strong {
		color: rgba(255, 255, 255, 0.75);
	}
</style>