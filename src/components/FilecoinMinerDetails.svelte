<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let minerDetails: Filecoin.Miner

	// (View options)
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3


	// Functions
	import { formatPercent } from '$/utils/formatPercent'


	// Components
	import Address from './Address.svelte'
	import BytesCount from './BytesCount.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
</script>


<div class="row wrap align-stretch flex-fill">
	<section class="card">
		<svelte:element this={`h${headingLevel + 1}`}>
			Related Actors
		</svelte:element>

		<hr>

		<dl>
			<dt>Owner</dt>
			<dd>
				<Address
					{network}
					address={minerDetails.ownerActor.shortAddress ?? minerDetails.ownerActor.robustAddress}
					format="middle-truncated"
				/>
			</dd>

			<dt>Beneficiary</dt>
			<dd>
				<Address
					{network}
					address={minerDetails.beneficiaryActor.shortAddress ?? minerDetails.beneficiaryActor.robustAddress}
					format="middle-truncated"
				/>
			</dd>

			<dt>Worker</dt>
			<dd>
				<Address
					{network}
					address={minerDetails.workerActor.shortAddress ?? minerDetails.workerActor.robustAddress}
					format="middle-truncated"
				/>
			</dd>

			<dt>Controllers</dt>
			<dd>
				{#if minerDetails.controlActors.length}
					<ul>
						{#each minerDetails.controlActors as controlActor}
							<li>
								<Address
									{network}
									address={controlActor.shortAddress}
									format="middle-truncated"
								/>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="placeholder" data-after="–"></div>
				{/if}
			</dd>
		</dl>
	</section>

	<section class="card">
		<svelte:element this={`h${headingLevel + 1}`}>
			Networking
		</svelte:element>

		<hr>

		<dl>
			<dt>Peer ID</dt>
			<dd>
				<output>{minerDetails.peerId}</output>
			</dd>

			<dt>Multi-Addresses</dt>
			<dd>
				{#if minerDetails.multiAddresses.length}
					<ul>
						{#each minerDetails.multiAddresses as multiAddress}
							<li>
								<output>{multiAddress}</output>
							</li>
						{/each}
					</ul>
				{:else}
					<div class="placeholder" data-after="–"></div>
				{/if}
			</dd>
		</dl>
	</section>

	<section class="card">
		<svelte:element this={`h${headingLevel + 1}`}>
			Contributions
		</svelte:element>

		<hr>

		<dl>
			<dt>Blocks Mined</dt>
			<dd>
				<TweenedNumber value={minerDetails.minedBlocksCount} /> blocks
			</dd>

			<dt>Weighted Blocks Mined</dt>
			<dd>
				<TweenedNumber value={minerDetails.minedBlocksWeightedCount} /> blocks
			</dd>

			<dt>Total Rewards</dt>
			<dd>
				<TokenBalance
					token={network.nativeCurrency}
					balance={minerDetails.totalRewards}
				/>
			</dd>
		</dl>
	</section>

	<section class="card">
		<svelte:element this={`h${headingLevel + 1}`}>
			Influence
		</svelte:element>

		<hr>

		<dl>
			{#each [
				{
					label: 'Raw Byte Power',
					value: minerDetails.power.rawBytePower,
					globalValue: minerDetails.globalPower.rawBytePower
				},
				{
					label: 'Quality Adjusted Power',
					value: minerDetails.power.qualityAdjustedPower,
					globalValue: minerDetails.globalPower.qualityAdjustedPower
				}
			] as { label, value, globalValue }}
				<dt>{label}</dt>
				<dd class="column inline">
					<TweenedNumber value={value.value} />
					<small>(<span>#{value.rank}</span>・<span>{formatPercent(Number(value.value) / Number(globalValue.value))} of network</span>)</small>
				</dd>
			{/each}
		</dl>
	</section>

	<section class="card">
		<svelte:element this={`h${headingLevel + 1}`}>
			Miner Balances
		</svelte:element>

		<hr>

		<dl>
			<dt>Available</dt>
			<dd>
				<TokenBalance
					token={network.nativeCurrency}
					balance={minerDetails.availableBalance}
				/>
			</dd>

			<dt>Pledged</dt>
			<dd class="column">
				<TokenBalance
					token={network.nativeCurrency}
					balance={minerDetails.pledgeBalance}
				/>

				<dl>
					{#each [
						{
							label: 'Sectors',
							value: minerDetails.sectorPledgeBalance,
						},
						{
							label: 'Vested',
							value: minerDetails.vestingFunds,
						},
					] as { label, value } (label)}
						{@const totalValue = minerDetails.pledgeBalance}

						<dt>{label}</dt>
						<dd>
							<TokenBalance
								token={network.nativeCurrency}
								balance={value}
							/>

							<small>({formatPercent(Number(value) / Number(totalValue))})</small>
						</dd>
					{/each}
				</dl>
			</dd>

			<dt>Pre-Commit Deposits</dt>
			<dd>
				<TokenBalance
					token={network.nativeCurrency}
					balance={minerDetails.preCommitDeposits}
				/>
			</dd>
		</dl>
	</section>

	<section class="card">
		<svelte:element this={`h${headingLevel + 1}`}>
			Sectors
		</svelte:element>

		<hr>

		<dl>
			<dt>Total</dt>
			<dd class="column">
				<span>
					<TweenedNumber value={minerDetails.sectors.live} /> sectors

					<small>(<BytesCount
						bytesCount={minerDetails.sectors.live * minerDetails.sectorSize}
						format={{
							showDecimalPlaces: 4,
						}}
					/>)</small>
				</span>

				<dl>
					{#each [
						{
							label: 'Active',
							value: minerDetails.sectors.active,
						},
						{
							label: 'Faulty',
							value: minerDetails.sectors.faulty,
						},
						{
							label: 'Recovering',
							value: minerDetails.sectors.recovering,
						},
					] as { label, value } (label)}
						{@const totalValue = minerDetails.sectors.live}

						<dt>{label}</dt>
						<dd>
							{#if value}
								<span>
									<TweenedNumber value={value} /> sectors
								</span>

								<small>({
									#if value !== totalValue
										}<BytesCount
											bytesCount={value * minerDetails.sectorSize}
											format={{
												showDecimalPlaces: 4,
											}}
										/>・{
									/if}{
									formatPercent(value / totalValue)
								})</small>
							{:else}
								<span class="placeholder" data-after="–" />
							{/if}
						</dd>
					{/each}
				</dl>
			</dd>

			<dt>Size</dt>
			<dd>
				<BytesCount
					bytesCount={minerDetails.sectorSize}
					format={{
						showDecimalPlaces: 0,
					}}
				/> / sector
			</dd>

			<dt>Pledge Requirement</dt>
			<dd>
				<TokenBalance
					token={network.nativeCurrency}
					balance={minerDetails.initialPledgeRequirement}
				/> / sector
			</dd>
		</dl>
	</section>
</div>


<style>
	small {
		opacity: 0.66;
	}

	dd:has(> dl) {
		display: contents;

		> dl {
			display: contents;

			display: grid;
			grid-template-columns: subgrid;
			grid-column: 1 / -1;
			row-gap: 0.5em;

			margin-top: calc(0.5em - var(--padding-inner));

			font-size: smaller;
		}

		dt:has(+ &) {
			display: contents;
		}
	}
</style>
