<style>
	.loading {
		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
		padding: var(--padding-outer);
		animation: ScaleIn 0.2s;

		display: flex;
		align-items: center;
		gap: var(--padding-inner);
	}
	.spinner {
		display: inline-flex;
		place-items: center;
		font-size: 1.25em;

		animation: Spin 1s linear infinite;
	}

	@keyframes ScaleIn {
		from { transform: scale(0); }
	}

	@keyframes Spin {
		from { transform: rotate(0); }
		to { transform: rotate(360deg); }
	}
</style>

<div class="loading">
	<span class="spinner">
		<slot name="spinner">🧭</slot>
	</span>
	<slot></slot>
</div>