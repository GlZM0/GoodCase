<script lang="ts">
	import { ProgressRadial, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import {
		selectedItem,
		selectedWinnerItem,
		upgradeChance,
		won,
		cashback,
		balance,
		winnerPercentage
	} from '../../stores';
	import type { ProfileItem } from '../../app';
	import { onMount } from 'svelte';
	import { animate, spring, timeline } from 'motion';
	export let data;

	$: userInv = data.userInventory;
	$: items = data.items;

	let itemContainer: HTMLElement;

	const toastStore = getToastStore();

	const upgradeToast = () => {
		const t: ToastSettings = {
			message: 'Pick an item you want to upgrade to',
			background: 'bg-gradient-to-r from-surface-700 to-red-500 text-white',
			classes: 'border-4 border-red-500 font-bold'
		};
		toastStore.trigger(t);
	};

	onMount(() => {
		selectedItem.update((value) => (value = null));
		selectedWinnerItem.update((value) => (value = null));
		won.update((value) => (value = null));
	});

	toastStore.clear();

	const calculateUpgraderItems = async (itemData: ProfileItem) => {
		const response = await fetch('../api/calculateUpgraderItem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemData: itemData
			})
		});

		const responseData = await response.json();
		if (response.status === 200) {
			items = responseData.items;
		}
	};

	const upgradeItem = async (
		selectedUserItem: any,
		selectedWinnerItem: any,
		upgradeChance: any
	) => {
		let itemData = {
			selectedUserItem: selectedUserItem,
			selectedWinnerItem: selectedWinnerItem,
			upgradeChance: upgradeChance
		};

		const response = await fetch('../api/upgradeItem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemData: itemData
			})
		});

		const responseData = await response.json();
		if (response.status === 200) {
			let winnerPercentageNumber = parseFloat(responseData.winnerPercentage);
			let turnover = 720 + winnerPercentageNumber * 3.6;
			console.log(winnerPercentageNumber);
			winnerPercentage.update((value) => (value = turnover));
			console.log($winnerPercentage);

			animate(
				itemContainer,
				{ rotate: $winnerPercentage },
				{ easing: spring({ damping: 60, stiffness: 10, mass: 2, restSpeed: 1 }) }
			).finished.then(() => {
				won.update((value) => (value = responseData.won));
			});

			if ($won === true) {
				userInv = responseData.siteInventory;
				selectedItem.update((value: any) => (value = $selectedWinnerItem));
				calculateUpgraderItems($selectedWinnerItem);
			} else {
				userInv = responseData.siteInventory;
				cashback.update((value) => (value = responseData.cashback));
				balance.update((value) => (value = $balance + $cashback));
				selectedItem.update((value) => (value = null));
			}
		}
	};
</script>

<div class="py-6">
	<div class="relative flex py-5 items-center">
		<div class="flex-grow border-t border-gray-400" />
		<span class="flex-shrink mx-4 text-gray-100 text-3xl">Upgrader</span>
		<div class="flex-grow border-t border-gray-400" />
	</div>
	<div class="grid grid-cols-5 place-items-center gap-32 mx-32 py-10">
		<div class="flex items-center justify-center col-span-2">
			{#if $selectedItem}
				<div
					class="flex relative w-80 h-80 border-2 rounded-3xl p-2 m-2"
					style={`border-top-color: ${$selectedItem.colorHex}`}
				>
					<div class="m-auto">
						<span class="absolute top-4 right-4 text-white font-bold">${$selectedItem.price}</span>
						<div class="max-w-md">
							<img
								src={$selectedItem.image}
								alt={$selectedItem.name}
								class="max-w-full aspect-[4/3]"
							/>
						</div>
						<h2 class="text-base font-bold text-center">{$selectedItem.name}</h2>
						{#if $selectedItem.condition}
							<p class="text-base text-gray-500 mb-2 text-center">{$selectedItem.condition}</p>
						{/if}
					</div>
				</div>
			{:else}
				<div class="flex relative border-2 rounded-3xl p-2 m-2 w-80 h-80">
					<div class="m-auto">
						<div class="text-3xl">Select an item</div>
					</div>
				</div>
			{/if}
		</div>

		{#if $won === null && $upgradeChance}
			<div class="relative">
				<div class="rounded-full border-4 border-white flex">
					<div bind:this={itemContainer}>
						<ProgressRadial
							class="absolute inset-0 h-96 w-96"
							font={64}
							meter="stroke-surface-400/80"
							track="stroke-surface-800/60"
							stroke={515}
							value={$upgradeChance}
						/>
					</div>
					<div
						class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-5xl"
					>
						{$upgradeChance.toFixed(2)}%
					</div>
				</div>
				<div class="absolute top-[0.95rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<svg
						width="40px"
						height="40px"
						viewBox="-1.6 -1.6 19.20 19.20"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						transform="matrix(1, 0, 0, -1, 0, 0)rotate(0)"
						stroke="#ffffff"
						stroke-width="0.00016"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke="#CCCCCC"
							stroke-width="0.32"
						/><g id="SVGRepo_iconCarrier"
							><path
								fill="#ffffff"
								d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
							/></g
						></svg
					>
				</div>
			</div>
		{:else if $won === true}
			<div
				class="flex flex-col font-bold text-gray-300 bg-green-500/30 justify-center text-center items-center rounded-full border-4 border-white h-96 w-96"
			>
				<svg
					version="1.1"
					id="Uploaded to svgrepo.com"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					width="100px"
					height="100px"
					viewBox="0 0 32 32"
					xml:space="preserve"
					fill="#22c55e"
					stroke="#22c55e"
					stroke-width="0.00032"
					><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					/><g id="SVGRepo_iconCarrier">
						<style type="text/css">
							.bentblocks_een {
								fill: #22c55e;
							}
						</style>
						<path
							class="bentblocks_een"
							d="M26,4H6C4.9,4,4,4.9,4,6v6c0,1.1,0.9,2,2,2h2c0.087,0,0.171-0.015,0.256-0.026 c0.717,2.821,2.928,5.037,5.744,5.764V22H8v6h16v-6h-6v-2.262c2.817-0.726,5.027-2.943,5.744-5.764C23.829,13.985,23.913,14,24,14h2 c1.1,0,2-0.9,2-2V6C28,4.9,27.1,4,26,4z M8,12H6V6h2V12z M22,24v2H10v-2H22z M22,12c0,3.308-2.692,6-6,6s-6-2.692-6-6V6h12V12z M26,12h-2V6h2V12z M17,14h-2V8h2V14z"
						/>
					</g></svg
				>
				<p class="text-5xl font-bold text-green-500">WIN</p>
			</div>
		{:else if $won === false}
			<div
				class="flex flex-col font-bold text-gray-300 bg-red-500/30 justify-center text-center items-center rounded-full border-4 border-white h-96 w-96"
			>
				<svg
					width="100px"
					height="100px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#ef4444"
					><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					/><g id="SVGRepo_iconCarrier">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.55339 16.3975C9.5258 15.6767 10.715 15.25 12 15.25C13.285 15.25 14.4742 15.6767 15.4466 16.3975C15.7794 16.6441 15.8492 17.1138 15.6025 17.4466C15.3559 17.7794 14.8862 17.8492 14.5534 17.6025C13.825 17.0627 12.9459 16.75 12 16.75C11.0541 16.75 10.175 17.0627 9.44661 17.6025C9.11385 17.8492 8.64413 17.7794 8.39747 17.4466C8.15082 17.1138 8.22062 16.6441 8.55339 16.3975Z"
							fill="#ef4444"
						/>
						<path
							d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
							fill="#ef4444"
						/>
						<path
							d="M10 10.5C10 11.3284 9.55229 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55229 9 10 9.67157 10 10.5Z"
							fill="#ef4444"
						/>
					</g></svg
				>
				<p class="text-5xl font-bold text-red-500">LOSS</p>
				<p class="text-xl text-red-500">Cashback ${$cashback.toFixed(3)}</p>
			</div>
		{:else}
			<div
				class="col-span-1 font-bold text-gray-300 rounded-full border-4 border-white flex items-center justify-center h-96 w-96"
			>
				<p class="text-3xl">Pick any item</p>
			</div>
		{/if}
		<div class="flex items-center justify-center col-span-2 p-5">
			{#if $selectedWinnerItem}
				<div
					class="flex relative w-80 h-80 border-2 rounded-3xl p-2 m-2"
					style={`border-top-color: ${$selectedWinnerItem.colorHex}`}
				>
					<div class="m-auto">
						<span class="absolute top-4 right-4 text-white font-bold"
							>${$selectedWinnerItem.price}</span
						>
						<div class="max-w-md">
							<img
								src={$selectedWinnerItem.image}
								alt={$selectedWinnerItem.name}
								class="max-w-full aspect-[4/3]"
							/>
						</div>
						<h2 class="text-base font-bold text-center">{$selectedWinnerItem.name}</h2>
						{#if $selectedWinnerItem.condition}
							<p class="text-base text-gray-500 mb-2 text-center">
								{$selectedWinnerItem.condition}
							</p>
						{/if}
					</div>
				</div>
			{:else}
				<div class="flex relative border-2 rounded-3xl p-2 m-2 w-80 h-80">
					<div class="m-auto">
						<div class="text-3xl">Select an item</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="text-center py-10">
		{#if $selectedItem}
			<button
				class="uppercase font-bold border-2 p-4 rounded-full w-1/12 hover:scale-95 transition-all duration-200 border-green-500 bg-gradient-to-r from-green-500/10 to-green-500/30 hover:from-green-500 hover:to-green-500"
				on:click={() => {
					if ($selectedItem && $selectedWinnerItem) {
						upgradeItem($selectedItem, $selectedWinnerItem, $upgradeChance);
					} else {
						upgradeToast();
					}
				}}
			>
				Upgrade
			</button>
		{:else}
			<button
				class="uppercase font-bold border-2 p-4 rounded-full w-1/12 border-gray-500 bg-gray-700 cursor-default"
			>
				Pick items
			</button>
		{/if}
	</div>
	<div class="grid grid-cols-2 place-items-center gap-32 mx-32 py-10">
		<div class="items-start w-full border-2 rounded-lg p-5 grid grid-cols-4 h-full">
			{#each userInv as { caseIDs, color, id, name, image, price, colorHex, condition, type }}
				<li
					class="border-2 rounded-3xl p-2 m-2 h-60 flex flex-col items-center transition-all duration-200 group relative overflow-hidden hover:scale-105"
					style={`border-top-color: ${colorHex}`}
				>
					<div class="relative">
						<span class="absolute top-1 right-1 text-white font-bold">${price}</span>
						<div class="max-w-md">
							<img src={image} alt={name} class="max-w-full aspect-[4/3]" />
						</div>
						<h2 class="text-base font-bold text-center">{name}</h2>
						<p class="text-base text-gray-500 mb-2 text-center">{condition}</p>
					</div>

					<div
						class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-full group-hover:transition-all group-hover:duration-200 group-hover:translate-y-0"
					>
						<button
							class="w-28 h-28 py-2 px-4 flex items-center justify-center mb-2 border-2 rounded-full border-red-500 bg-gradient-to-r from-surface-700/80 to-red-400/60 hover:from-red-500 hover:to-red-500"
							on:click={async () => {
								won.update((value) => (value = null));

								let itemData = {
									caseIDs: caseIDs,
									color: color,
									colorHex: colorHex,
									condition: condition,
									id: id,
									name: name,
									image: image,
									price: price,
									type: type
								};

								calculateUpgraderItems(itemData);

								selectedWinnerItem.update((value) => (value = null));
								upgradeChance.update((value) => (value = null));
								selectedItem.update((value) => (value = itemData));
							}}
						>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0" />
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
								<g id="SVGRepo_iconCarrier">
									<path
										d="M4 12H20M12 4V20"
										stroke="#f5f5f5"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</g>
							</svg>
						</button>
					</div>
				</li>
			{/each}
		</div>
		<div class="items-start w-full border-2 rounded-lg p-5 grid grid-cols-4 h-full">
			{#each items.slice(0, 12) as { caseIDs, color, id, name, image, price, colorHex, condition, type }}
				<li
					class="border-2 rounded-3xl p-2 m-2 h-60 flex flex-col items-center transition-all duration-200 group relative overflow-hidden hover:scale-105"
					style={`border-top-color: ${colorHex}`}
				>
					<div class="relative">
						<span class="absolute top-1 right-1 text-white font-bold">${price}</span>
						<div class="max-w-md">
							<img src={image} alt={name} class="max-w-full aspect-[4/3]" />
						</div>
						<h2 class="text-base font-bold text-center">{name}</h2>
						<p class="text-base text-gray-500 mb-2 text-center">
							{#if condition}
								<p class="text-base text-gray-500 mb-2 text-center">
									{condition}
								</p>
							{/if}
						</p>
					</div>

					<div
						class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-full group-hover:transition-all group-hover:duration-200 group-hover:translate-y-0"
					>
						<button
							class="w-28 h-28 py-2 px-4 flex items-center justify-center mb-2 border-2 rounded-full border-red-500 bg-gradient-to-r from-surface-700/80 to-red-400/60 hover:from-red-500 hover:to-red-500"
							on:click={() => {
								won.update((value) => (value = null));

								let itemData = {
									caseIDs: caseIDs,
									color: color,
									colorHex: colorHex,
									condition: condition,
									id: id,
									name: name,
									image: image,
									price: price,
									type: type
								};

								selectedWinnerItem.update((value) => (value = itemData));

								let userItemPrice = $selectedItem.price;
								let winnerItemPrice = $selectedWinnerItem.price;
								if (winnerItemPrice > userItemPrice) {
									let chance = (userItemPrice / winnerItemPrice) * 0.9 * 100;
									upgradeChance.update((value) => (value = chance));
								} else {
									selectedItem.update((value) => (value = null));
								}
							}}
						>
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0" />
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
								<g id="SVGRepo_iconCarrier">
									<path
										d="M4 12H20M12 4V20"
										stroke="#f5f5f5"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</g>
							</svg>
						</button>
					</div>
				</li>
			{/each}
		</div>
	</div>
</div>
