<script lang="ts">
	let status: 'idle' | 'submitting' | 'submitted' = 'idle'

	let promise: Promise


	import AddressInput from '../components/AddressInput.svelte'
	import Loader from '../components/Loader.svelte'


	import { fly } from 'svelte/transition'
</script>


<style>
	form {
		text-align: left;
	}
	.card {
		gap: 1.25rem;
		padding: 1.5rem;
	}

	h3, label > span, section > span {
		text-transform: uppercase;
		font-family: Pally;
		color: rgba(var(--rgb-light-dark-inverse), 0.8);
		letter-spacing: 0.2ch;
	}

	.column {
		flex: 1;
	}

	label {
		gap: 0.25rem;
	}

	span {
		transition: 0.2s;
	}

	.fields {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}

	.checkboxes {
		justify-content: center;
		gap: 0.75rem;
	}
	input[type="checkbox"] {
		display: none;
	}
	input[type="checkbox"] ~ span {
		background-color: rgba(var(--rgb-light-dark-inverse), 0.2);
		padding: 0.2em 0.5em;
		border-radius: 0.25em;
		transition: 0.2s;
		cursor: pointer;
	}
	input[type="checkbox"]:not(:checked) ~ span {
		opacity: 0.5;
	}
	label:hover input[type="checkbox"] ~ span {
		scale: 1.02;
	}
	label:active input[type="checkbox"] ~ span {
		scale: 0.99;
	}
	label:hover input[type="checkbox"]:not(:checked) ~ span {
		opacity: 0.66;
	}
	input[type="checkbox"]:checked ~ span {
		box-shadow: 0 0 0 1px rgba(var(--rgb-light-dark-inverse), 0.33);
		box-shadow: 0 0 0 1.5px var(--primary-color);
		scale: 1.025;
	}

	.thank-you .emoji {
		font-size: 2em;
	}
	.thank-you h3 {
		font-size: 1.5rem;
	}
	.thank-you p {
		color: rgba(var(--rgb-light-dark-inverse), 0.66);
		line-height: 1.75;
	}
	.thank-you strong {
		color: rgba(var(--rgb-light-dark-inverse), 0.8);
	}
</style>


<div id="contact" class="stack align-top">
	{#if status === 'idle'}
		<form
			class="column card"
			name="contact"
			method="POST"
			netlify
			netlify-honeypot="blockhead"
			on:submit|preventDefault={({ target }) => {
				promise = fetch("/", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: new URLSearchParams(new FormData(target)).toString(),
				}).then(r => r.text())

				status = 'submitting'
			}}
			transition:fly={{ x: -50, duration: 300 }}
		>
			<input type="hidden" name="form-name" value="contact" />

			<header class="row spaced">
				<h3>Leave feedback + stay updated!</h3>
				<span class="card-annotation">drop your ENS for a surprise</span>
			</header>

			<hr>

			<section class="fields">
				<label class="column">
					<span>Name</span>
					<input type="text" name="name" placeholder="Vitalik Buterin" />
				</label>

				<label class="column">
					<span>Email*</span>
					<input type="email" name="email" placeholder="vitalik.buterin@ethereum.org" required />
				</label>

				<input type="text" name="blockhead" hidden />

				<label class="column">
					<span>Address / ENS</span>
					<AddressInput name="ethereum-address" placeholder="vitalik.eth / 0x123456...abcdef" />
				</label>

				<label class="column">
					<span>How'd you get here?*</span>
					<input type="text" name="referral" placeholder="Twitter / Google / Event / IRL" required />
				</label>
			</section>

			<hr>

			<!-- <fieldset class="column"> -->
			<section class="column">
				<header class="bar">
					<span>I identify as a:</span>
					<span class="card-annotation">Select all that apply</span>
				</header>

				<div class="row checkboxes">
					<label class="row-inline"><input type="checkbox" name="role" value="crypto-investor"><span>crypto investor</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="defi-user"><span>DeFi user</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="nft-collector"><span>NFT collector</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="dao-contributor"><span>DAO contributor</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="web3-developer"><span>web3 builder</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="data-scientist"><span>data scientist</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="smart-contract-dev"><span>smart contract dev</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="frontend-dev"><span>frontend dev</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="student"><span>student</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="researcher"><span>researcher</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="entrepreneur"><span>entrepreneur</span></label>
					<label class="row-inline"><input type="checkbox" name="role" value="venture-capitalist"><span>venture capitalist</span></label>
				</div>
			</section>
			<!-- </fieldset> -->

			<hr>

			<section class="column">
				<div class="bar">
					<span>Anything else?</span>
					<span class="card-annotation">feedback / feature requests</span>
				</div>

				<textarea
					name="message"
					placeholder="gm・thoughts・feedback・feature requests・found a bug・integrate my project!・hopes & dreams・dark secrets・wen new features?"
					rows="4"
				/>
			</section>

			<hr>

			<footer class="row spaced">
				<span />
				<button type="submit">Sign up ›</button>
			</footer>
		</form>
	{:else}
		<section
			transition:fly={{ x: -50, duration: 300 }}
		>
			<Loader
				loadingMessage="Submitting..."
				errorMessage="Couldn't submit the form."
				fromPromise={promise && (() => promise)}
				then={(result) => {
					console.log("Form submitted", result)
					status = 'submitted'
				}}
				let:result={result}
			>
				<div class="thank-you card column">
					<span class="emoji">💝</span>

					<h3>Thank you</h3>

					<p>for supporting <strong>open source software</strong>,<br>
						<strong>public goods</strong>, <strong>decentralization</strong>, and<br>
						<strong>resilient financial & internet infrastructure</strong><br>
						to last for generations to come ✨</p>

					<p>– Darryl</p>

					<hr>

					<a href="https://twitter.com/0xblockhead" target="_blank"><button type="button" class="medium" style="--primary-color: rgb(29, 155, 240)">Follow @0xBlockhead on Twitter</button></a>

					<a href="https://twitter.com/0xblockhead" target="_blank"><button type="button" class="small" style="--primary-color: rgb(29, 155, 240)">Follow @darryl__yeo on Twitter</button></a>

					<p>
						<button type="button" class="small cancel" on:click={() => status = 'idle'}>‹ Back</button>
					</p>
				</div>
			</Loader>
		</section>
	{/if}
</div>
