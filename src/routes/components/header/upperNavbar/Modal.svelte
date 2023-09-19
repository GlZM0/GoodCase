<script lang="ts">
	import { enhance } from '$app/forms';
	import { showModal } from '../../../../stores';
	import { steamLogin } from '../../../api/steam/signin/+server';

	let dialog: HTMLDialogElement;
	let apiKey: number;

	const handleClick = () => {
		localStorage.setItem('apikey', JSON.stringify(apiKey));
		dialog.close();
		steamLogin();
	};

	$: if (dialog && $showModal) dialog.showModal();
	$: if (dialog && !$showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="rounded p-0 w-1/2 h-1/4 bg-surface-700"
	bind:this={dialog}
	on:close={() => {
		showModal.set(false);
	}}
	on:click|self={() => {
		dialog.close();
	}}
>
	<div class="flex justify-center items-center space-x-2 text-white" on:click|stopPropagation>
		<form method="POST" action="?/signin" use:enhance>
			<label for="apiKey" class="label">
				<span> Put your Steam API Key here: </span>
			</label>
			<input
				type="text"
				class="input p-1 border-2 m-1 placeholder:pl-1"
				placeholder="API KEY"
				name="apikey"
				bind:value={apiKey}
			/>
			<div class="flex flex-col items-center">
				<button type="submit" on:click={handleClick} class="border-2 my-2 p-1 rounded-lg"
					>Submit</button
				>
			</div>
			<p>
				Where to find my Api Key? <a
					href="https://steamcommunity.com/dev/apikey"
					class="text-red-700 font-semibold"
					target="_blank">CLICK</a
				>
			</p>
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
