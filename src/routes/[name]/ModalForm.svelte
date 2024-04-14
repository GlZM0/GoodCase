<script lang="ts">
	import type { User } from '@prisma/client';
	import { balance, showWinnerModal, items } from '../../stores';

	export let openCase: any;
	export let winnerImage: string;
	export let winnerName: string;
	export let winnerPrice: number;
	export let winnerColor: string;
	export let winnerCondition: string;
	export let winnerId: string;
	export let user: User;
	export let winnerHexColor: string;

	let dialog: HTMLDialogElement;

	$: if (dialog && $showWinnerModal) dialog.showModal();
	$: if (dialog && !$showWinnerModal) dialog.close();

	const openNext = () => {
		openCase();
	};

	const close = async () => {
		let winnerItem = {
			winnerId: winnerId,
			winnerName: winnerName,
			winnerImage: winnerImage,
			winnerPrice: winnerPrice,
			winnerColor: winnerColor,
			winnerCondition: winnerCondition,
			winnerHexColor: winnerHexColor
		};

		const response = await fetch('../api/close', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				winnerItem: winnerItem,
				user: user
			})
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const responseData = await response.json();
		const userItems = responseData.siteInventory;

		items.update((value) => (value = userItems));
	};

	const sellItem = async () => {
		let itemData = {
			itemId: winnerId,
			itemPrice: winnerPrice
		};

		const response = await fetch('../api/sellItem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemData: itemData,
				user: user
			})
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const responseData = await response.json();
		balance.update((value) => (value = responseData.updatedBalance));
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="justify-center rounded-[32px] p-0 h-[700px] w-[800px] bg-surface-700 overflow-hidden"
	bind:this={dialog}
	on:close={() => showWinnerModal.set(false)}
	on:click|self={() => {
		close();
		dialog.close();
	}}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="flex flex-col justify-center items-center space-y-2 text-white h-full"
		on:click|stopPropagation
	>
		<button
			class="absolute top-4 right-4"
			on:click={() => {
				close();
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
		<div class="items-center justify-center h-screen text-center">
			<div class="flex flex-col justify-center items-center space-y-4">
				<h2 class="text-green-500 text-2xl font-bold">YOU WON</h2>
				<h1 class="text-4xl">{winnerName === '' ? '' : winnerName}</h1>
				<h1 class="text-md">{winnerName === null ? '' : '(' + winnerCondition + ')'}</h1>
			</div>
			<div>
				<div class="max-w-md my-4 p-4 relative" style={`border-color: ${winnerHexColor}`}>
					<div class="absolute inset-0 flex justify-center items-center">
						<div
							class="rounded-full h-full w-full m-10 opacity-50 backdrop-filter blur-3xl backdrop-blur-sm"
							style={`background-image: radial-gradient(${winnerHexColor}, transparent)`}
						/>
					</div>

					<img
						src={winnerImage === '' ? '' : winnerImage}
						alt={winnerImage === '' ? '' : winnerName}
						class="mb-4 max-w-full aspect-[4/3]"
						style="position: relative; z-index: 1;"
					/>
				</div>
			</div>
			<div>
				<div class="flex justify-center pb-1">
					<button
						class="w-full h-12 border-2 rounded-full border-red-500 bg-gradient-to-r from-surface-700/80 to-red-400/60 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 px-4 flex items-center justify-center mr-4 mb-2"
						on:click={() => {
							sellItem();
							dialog.close();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 mr-2"
							viewBox="0 0 512 512"
							fill="none"
							stroke="#000000"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0" />
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
							<g id="SVGRepo_iconCarrier">
								<title>shopping-cart</title>
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="icon" fill="#ffffff" transform="translate(42.666667, 85.333333)">
										<path
											d="M7.10542736e-15,-1.42108547e-14 L70.3622093,-1.42108547e-14 L89.7493333,85.3333333 L378.389061,85.3333333 L337.246204,277.333333 L89.6377907,277.333333 L36.288,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 Z M325.610667,128 L99.456,128 L123.690667,234.666667 L302.741333,234.666667 L325.610667,128 Z M138.666667,384 C156.339779,384 170.666667,369.673112 170.666667,352 C170.666667,334.326888 156.339779,320 138.666667,320 C120.993555,320 106.666667,334.326888 106.666667,352 C106.666667,369.673112 120.993555,384 138.666667,384 Z M288,384 C305.673112,384 320,369.673112 320,352 C320,334.326888 305.673112,320 288,320 C270.326888,320 256,334.326888 256,352 C256,369.673112 270.326888,384 288,384 Z"
											id="Combined-Shape"
										/>
									</g>
								</g>
							</g>
						</svg>

						Sell for ${winnerPrice}
					</button>
					<button
						class="w-full h-12 border-2 border-green-500 bg-gradient-to-r from-surface-700/80 to-green-500/60 hover:from-green-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mb-2"
						on:click={() => {
							close();
							dialog.close();
							openNext();
						}}
					>
						<svg
							width="30px"
							height="30px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><g id="SVGRepo_iconCarrier">
								<g id="Edit / Redo">
									<path
										id="Vector"
										d="M13.9998 8H18.9998V3M18.7091 16.3569C17.7772 17.7918 16.4099 18.8902 14.8079 19.4907C13.2059 20.0913 11.4534 20.1624 9.80791 19.6937C8.16246 19.225 6.71091 18.2413 5.66582 16.8867C4.62073 15.5321 4.03759 13.878 4.00176 12.1675C3.96593 10.4569 4.47903 8.78001 5.46648 7.38281C6.45392 5.98561 7.86334 4.942 9.48772 4.40479C11.1121 3.86757 12.8661 3.86499 14.4919 4.39795C16.1177 4.93091 17.5298 5.97095 18.5209 7.36556"
										stroke="#ffffff"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</g>
							</g></svg
						>
						<p class="pl-2">Open Next</p>
					</button>
				</div>

				<div class="flex justify-center pb-1">
					<a
						class="w-full h-12 border-2 border-yellow-500 bg-gradient-to-r from-surface-700/80 to-yellow-500/60 hover:from-yellow-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mr-4 mb-2"
						href="../upgrader"
					>
						<svg
							fill="#ffffff"
							height="20px"
							width="20px"
							version="1.1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="-51.18 -51.18 614.16 614.16"
							xml:space="preserve"
							transform="matrix(1, 0, 0, 1, 0, 0)"
							stroke="#ffffff"
							stroke-width="25.590049999999998"
							><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke="#CCCCCC"
								stroke-width="1.023602"
							/><g id="SVGRepo_iconCarrier">
								<g>
									<g>
										<g>
											<path
												d="M263.535,248.453c-4.16-4.16-10.88-4.16-15.04,0L3.054,493.787c-4.053,4.267-3.947,10.987,0.213,15.04 c4.16,3.947,10.667,3.947,14.827,0l237.867-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213 c3.947-4.16,3.947-10.667,0-14.827L263.535,248.453z"
											/>
											<path
												d="M18.201,263.493l237.76-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L263.535,3.12c-4.16-4.16-10.88-4.16-15.04,0L3.054,248.453c-4.053,4.267-3.947,10.987,0.213,15.04 C7.534,267.547,14.041,267.547,18.201,263.493z"
											/>
										</g>
									</g>
								</g>
							</g></svg
						>
						<button
							on:click={() => {
								close();
								dialog.close();
							}}
						>
							<p class="pl-2">Upgrader</p>
						</button>
					</a>

					<a
						class="w-full h-12 border-2 border-orange-500 bg-gradient-to-r from-surface-700/80 to-orange-500/60 hover:from-orange-500 hover:to-orange-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center mb-2"
						href="../contracts"
					>
						<svg
							width="30px"
							height="30px"
							viewBox="0 0 1024 1024"
							class="icon"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							fill="#ffffff"
							stroke="#ffffff"
							><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							/><g id="SVGRepo_iconCarrier"
								><path
									d="M182.52 146.2h585.14v256h73.15V73.06H109.38v877.71h256v-73.14H182.52z"
									fill="#ffffff"
								/><path
									d="M255.67 219.34h438.86v73.14H255.67zM255.67 365.63h365.71v73.14H255.67zM255.67 511.91H475.1v73.14H255.67zM775.22 458.24L439.04 794.42l-0.52 154.64 155.68 0.52L930.38 613.4 775.22 458.24z m51.72 155.16l-25.43 25.43-51.73-51.72 25.44-25.44 51.72 51.73z m-77.14 77.15L620.58 819.77l-51.72-51.72 129.22-129.22 51.72 51.72zM511.91 876.16l0.17-51.34 5.06-5.06 51.72 51.72-4.85 4.85-52.1-0.17z"
									fill="#ffffff"
								/></g
							></svg
						>
						<button
							on:click={() => {
								close();
								dialog.close();
							}}
						>
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<p class="pl-2">Contracts</p>
						</button>
					</a>
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
