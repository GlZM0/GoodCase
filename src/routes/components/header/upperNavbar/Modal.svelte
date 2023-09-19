<script lang="ts">
	import { enhance } from '$app/forms';
	import { showModal } from '../../../../stores';
	import { steamLogin } from '../../../api/steam/signin/+server';

	let dialog: HTMLDialogElement;
	let apiKey: number;

	const handleClick = () => {
		dialog.close();
		steamLogin();
	};

	$: if (dialog && $showModal) dialog.showModal();
	$: if (dialog && !$showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="rounded p-0 w-96 h-32 bg-surface-700"
	bind:this={dialog}
	on:close={() => {
		showModal.set(false);
	}}
	on:click|self={() => {
		dialog.close();
	}}
>
	<div class="flex justify-center items-center space-x-2 text-white" on:click|stopPropagation>
		<form method="POST" action="/" use:enhance>
			<label for="apiKey" class="label">
				<span> Put your Steam API Key here: </span>
			</label>
			<input type="text" class="input" placeholder="API KEY" name="apikey" bind:value={apiKey} />
			<button type="submit" on:click={handleClick}>Submit</button>
		</form>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
