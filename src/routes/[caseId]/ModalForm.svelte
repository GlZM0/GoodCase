<script lang="ts">
	import { showWinnerModal } from '../../stores';

	export let winnerImage: string;
	export let winnerName: string;
	export let winnerPrice: number;

	let dialog: HTMLDialogElement;

	$: if (dialog && $showWinnerModal) dialog.showModal();
	$: if (dialog && !$showWinnerModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="rounded-lg p-0 h-[600px] bg-surface-700 overflow-hidden"
	bind:this={dialog}
	on:close={() => showWinnerModal.set(false)}
	on:click|self={() => {
		dialog.close();
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex justify-center items-center place-content-center space-x-2 text-white"
		on:click|stopPropagation
	>
		<div class="flex items-center justify-center">
			<div class="border-2 border-solid p-8 text-center max-w-md">
				<img
					class="mx-auto rounded-full aspect-[4/3] mb-4"
					src={winnerImage === '' ? '' : winnerImage}
					alt={winnerImage === '' ? '' : winnerName}
				/>
				<p class="text-lg mb-4">{winnerName === '' ? '' : `You just won: ${winnerName}`}</p>
				<p class="text-sm mb-6">{winnerPrice === null ? '' : winnerPrice}</p>
				<button class="bg-blue-500 text-white px-4 py-2 rounded-full mb-2">Open Next Case</button>
				<div class="flex justify-between">
					<button class="bg-red-500 text-white px-3 py-1 rounded-full">Sell Item</button>
					<button class="bg-green-500 text-white px-3 py-1 rounded-full">Keep Item</button>
				</div>
			</div>
		</div>
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
