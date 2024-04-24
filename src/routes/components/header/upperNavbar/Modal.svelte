<script lang="ts">
	import { enhance } from '$app/forms';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { showApiModal } from '../../../../stores';
	import { steamLogin } from '../../../api/steam/signin/+server';

	let dialog: HTMLDialogElement;
	let apiKey: string;

	const toastStore2 = getToastStore();

	const apiToast = () => {
		const t: ToastSettings = {
			message: 'Provide correct api key',
			background: 'bg-gradient-to-r from-surface-700 to-red-500 text-white',
			classes: 'border-4 border-red-500 font-bold'
		};
		toastStore2.trigger(t);
	};

	toastStore2.clear();

	const login = () => {
		dialog.close();
		steamLogin();
	};

	$: if (dialog && $showApiModal) dialog.showModal();
	$: if (dialog && !$showApiModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="justify-center rounded-[32px] p-0 h-[500px] w-[500px] bg-surface-700 overflow-hidden"
	bind:this={dialog}
	on:close={() => {
		showApiModal.set(false);
	}}
	on:click|self={() => {
		dialog.close();
	}}
>
	<div
		class="flex flex-col justify-center items-center text-center space-y-2 text-white h-full"
		on:click|stopPropagation
	>
		<button
			class="absolute top-4 right-4"
			on:click|self={() => {
				dialog.close();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-10 w-10 mr-2"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
		<form method="POST" action="?/signin" use:enhance>
			<label for="apiKey" class="label">
				<span class="text-3xl"> Put your Steam API Key here: </span>
			</label>
			<input
				type="text"
				class="input p-1 border-2 my-5 placeholder:pl-1"
				placeholder="API KEY"
				name="apikey"
				bind:value={apiKey}
			/>
			<div class="flex flex-col items-center">
				<button
					type="submit"
					on:click={() => {
						if (apiKey.length === 32) {
							login();
						} else {
							apiToast();
						}
					}}
					class="border-2 my-5 p-1 rounded-lg w-40 h-16 text-xl">Submit</button
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
