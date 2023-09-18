<script lang="ts">
	import ApiKeyForm from './ApiKeyForm.svelte';
	import { showModal } from '../../../stores';
	import { steamLogin } from '../../../routes/steam/signin/+server';

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
		<ApiKeyForm bind:apiKey />
		<!-- svelte-ignore a11y-autofocus -->
		<button
			class="flex justify-center items-center rounded-3xl border-2 border-gray-300 transition-transform duration-250 scale-100 hover:scale-90 active:scale-100 mt-5"
			autofocus
			on:click={() => handleClick()}>Submit</button
		>
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
