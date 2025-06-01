<script lang="ts">
	// Types/constants
	import type { Validator } from '$/entities/validator'
	import { EntityType } from '$/entities'


	// Props
	let { validator }: { validator: Validator } = $props()


	// Components
	import Entity from '$/components/Entity.svelte'
	import EntitySection from '$/components/EntitySection.svelte'
</script>


<Entity
	type={EntityType.Validator}
	id={validator.index?.toString() ?? validator.pubkey ?? 'unknown'}
	title={validator.index ? `Validator ${validator.index}` : validator.pubkey ?? 'Unknown Validator'}
	annotation="Validator"
>
	<EntitySection
		title="Basic Information"
		entityType="validator-basic"
	>
		<dl>
			<dt>Index</dt>
			<dd>{validator.index}</dd>

			<dt>Public Key</dt>
			<dd style="word-break: break-all;">{validator.pubkey}</dd>

			<dt>Withdrawal Credentials</dt>
			<dd style="word-break: break-all;">
				{validator.withdrawalCredentials}
			</dd>

			<dt>Chain ID</dt>
			<dd>{validator.chainId}</dd>

			<dt>Status</dt>
			<dd>{validator.status}</dd>

			<dt>Slashed</dt>
			<dd>{validator.slashed ? 'Yes' : 'No'}</dd>
		</dl>
	</EntitySection>

	<EntitySection
		title="Activation & Exit"
		entityType="validator-lifecycle"
	>
		<dl>
			{#if validator.activationEpoch !== undefined}
				<dt>Activation Epoch</dt>
				<dd>{validator.activationEpoch}</dd>
			{/if}

			{#if validator.activationEligibilityEpoch !== undefined}
				<dt>Activation Eligibility Epoch</dt>
				<dd>{validator.activationEligibilityEpoch}</dd>
			{/if}

			{#if validator.exitEpoch !== undefined}
				<dt>Exit Epoch</dt>
				<dd>{validator.exitEpoch}</dd>
			{/if}

			{#if validator.withdrawableEpoch !== undefined}
				<dt>Withdrawable Epoch</dt>
				<dd>{validator.withdrawableEpoch}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Balances"
		entityType="validator-balances"
	>
		<dl>
			<dt>Balance</dt>
			<dd>{validator.balance} Gwei</dd>

			<dt>Effective Balance</dt>
			<dd>{validator.effectiveBalance} Gwei</dd>

			{#if validator.withdrawnAmount}
				<dt>Withdrawn Amount</dt>
				<dd>{validator.withdrawnAmount} Gwei</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Performance"
		entityType="validator-performance"
	>
		<dl>
			<dt>Performance Rating</dt>
			<dd>{validator.performance}</dd>

			<dt>Effectiveness</dt>
			<dd>{validator.effectiveness}%</dd>

			<dt>Attestation Success Rate</dt>
			<dd>{validator.attestationSuccessRate}%</dd>

			{#if validator.proposalSuccessRate !== undefined}
				<dt>Proposal Success Rate</dt>
				<dd>{validator.proposalSuccessRate}%</dd>
			{/if}

			{#if validator.syncCommitteeSuccessRate !== undefined}
				<dt>Sync Committee Success Rate</dt>
				<dd>{validator.syncCommitteeSuccessRate}%</dd>
			{/if}

			{#if validator.missedAttestations !== undefined}
				<dt>Missed Attestations</dt>
				<dd>{validator.missedAttestations}</dd>
			{/if}

			{#if validator.missedProposals !== undefined}
				<dt>Missed Proposals</dt>
				<dd>{validator.missedProposals}</dd>
			{/if}
		</dl>
	</EntitySection>

	<EntitySection
		title="Rewards & Penalties"
		entityType="validator-rewards"
	>
		<dl>
			<dt>Total Rewards</dt>
			<dd>{validator.totalRewards} Gwei</dd>

			<dt>Total Penalties</dt>
			<dd>{validator.totalPenalties} Gwei</dd>

			{#if validator.rewardsLastEpoch}
				<dt>Rewards Last Epoch</dt>
				<dd>{validator.rewardsLastEpoch} Gwei</dd>
			{/if}

			{#if validator.penaltiesLastEpoch}
				<dt>Penalties Last Epoch</dt>
				<dd>{validator.penaltiesLastEpoch} Gwei</dd>
			{/if}

			{#if validator.mevRewards}
				<dt>MEV Rewards</dt>
				<dd>{validator.mevRewards} Gwei</dd>
			{/if}

			{#if validator.mevBlocksProposed !== undefined}
				<dt>MEV Blocks Proposed</dt>
				<dd>{validator.mevBlocksProposed}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if validator.slashed}
		<EntitySection
			title="Slashing Details"
			entityType="validator-slashing"
		>
			<dl>
				{#if validator.slashingReason}
					<dt>Slashing Reason</dt>
					<dd>{validator.slashingReason}</dd>
				{/if}

				{#if validator.slashingEpoch !== undefined}
					<dt>Slashing Epoch</dt>
					<dd>{validator.slashingEpoch}</dd>
				{/if}

				{#if validator.slashingPenalty}
					<dt>Slashing Penalty</dt>
					<dd>{validator.slashingPenalty} Gwei</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<EntitySection
		title="Operator Information"
		entityType="validator-operator"
	>
		<dl>
			{#if validator.operatorAddress}
				<dt>Operator Address</dt>
				<dd>
					<a href="/actor/{validator.operatorAddress}"
						>{validator.operatorAddress}</a
					>
				</dd>
			{/if}

			{#if validator.feeRecipient}
				<dt>Fee Recipient</dt>
				<dd>
					<a href="/actor/{validator.feeRecipient}"
						>{validator.feeRecipient}</a
					>
				</dd>
			{/if}

			{#if validator.graffiti}
				<dt>Graffiti</dt>
				<dd>{validator.graffiti}</dd>
			{/if}

			{#if validator.clientName}
				<dt>Client</dt>
				<dd>{validator.clientName} {validator.clientVersion || ''}</dd>
			{/if}
		</dl>
	</EntitySection>

	{#if validator.isPoolValidator}
		<EntitySection
			title="Pool Information"
			entityType="validator-pool"
		>
			<dl>
				{#if validator.poolName}
					<dt>Pool Name</dt>
					<dd>{validator.poolName}</dd>
				{/if}

				{#if validator.poolAddress}
					<dt>Pool Address</dt>
					<dd>
						<a href="/actor/{validator.poolAddress}"
							>{validator.poolAddress}</a
						>
					</dd>
				{/if}

				{#if validator.poolFee !== undefined}
					<dt>Pool Fee</dt>
					<dd>{validator.poolFee}%</dd>
				{/if}
			</dl>
		</EntitySection>
	{/if}

	<EntitySection
		title="Activity"
		entityType="validator-activity"
	>
		<dl>
			{#if validator.lastAttestationSlot !== undefined}
				<dt>Last Attestation Slot</dt>
				<dd>{validator.lastAttestationSlot}</dd>
			{/if}

			{#if validator.lastProposalSlot !== undefined}
				<dt>Last Proposal Slot</dt>
				<dd>{validator.lastProposalSlot}</dd>
			{/if}

			<dt>Created At</dt>
			<dd>
				<time
					datetime={new Date(
						validator.createdAt * 1000,
					).toISOString()}
					>{new Date(
						validator.createdAt * 1000,
					).toLocaleString()}</time
				>
			</dd>

			{#if validator.lastActiveAt}
				<dt>Last Active</dt>
				<dd>
					<time
						datetime={new Date(
							validator.lastActiveAt * 1000,
						).toISOString()}
						>{new Date(
							validator.lastActiveAt * 1000,
						).toLocaleString()}</time
					>
				</dd>
			{/if}

			<dt>Updated At</dt>
			<dd>
				<time
					datetime={new Date(
						validator.updatedAt * 1000,
					).toISOString()}
					>{new Date(
						validator.updatedAt * 1000,
					).toLocaleString()}</time
				>
			</dd>
		</dl>
	</EntitySection>
</Entity>
