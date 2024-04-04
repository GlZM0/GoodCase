<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, spring } from 'motion';
	import { balance, showWinnerModal, items } from '../../stores';
	import { putWinnerItemIntoPlace } from '../api/caseOpeningSystem/PutWinnerItem';
	import ModalForm from './ModalForm.svelte';
	import { getWinnerItemPosition } from './WinnerItemPosition';
	import { Sound } from 'svelte-sound';
	import opening_mp3 from '../../static/openingSound.mp3';
	import caseOpenEnd_mp3 from '../../static/caseOpenEnd.mp3';
	import { isApiKey } from '$routes/components/header/upperNavbar/UpperNavbar.svelte';
	import type { Case, Item } from '../../app';
	import { sortItems } from './ItemsSorter';
	import { shuffleCase } from '../api/caseOpeningSystem/CaseShuffler';

	export let data: Case;
	const cases = data.cases;
	const isLoggedIn = data.logged;
	let caseName = cases[0].name.toUpperCase();
	let color: string;

	let user = data.user;
	let canOpen = data.canOpen;

	let winnerName: string;
	let winnerColor: string;
	let winnerImage: string;
	let winnerPrice: number;
	let winnerCondition: string;
	let newBalance: number;
	let winnerId: string;

	let caseOpeningSound = new Sound(opening_mp3);
	let caseOpenEndSound = new Sound(caseOpenEnd_mp3);

	let shuffledItems: Item[] = [];
	let sortedItems: Item[] = [];

	let isOpening = false;
	let isAudio = true;

	let container: HTMLElement;
	let itemsContainer: HTMLElement;

	$: gradientStyle = isOpening
		? 'background-color: rgba(55, 65, 81, 1)'
		: 'background-image: linear-gradient(to right, rgba(220, 227, 238, 0.4), rgba(75, 85, 99, 0.8))';

	onMount(() => {
		sortedItems = sortItems(cases[0]);

		const originalItems = Array.from(
			{ length: cases[0].items.length },
			(_, index) => cases[0].items[index]
		);
		let allItems: Item[] = [];

		const numOfRepeats = Math.ceil(100 / originalItems.length);
		for (let i = 0; i < numOfRepeats; i++) {
			allItems.push(...originalItems);
		}
		shuffledItems = allItems.slice(0, 100);

		shuffledItems = shuffleCase(cases[0].items);

		const mapDisplayColor = (color: string) => {
			switch (color) {
				case 'Industrial':
					return '#5E98D9';
				case 'Blue':
					return '#2563eb';
				case 'Purple':
					return '#7c3aed';
				case 'Pink':
					return '#d946ef';
				case 'Red':
					return '#dc2626';
				case 'Yellow':
					return '#eab308';
				default:
					return '';
			}
		};

		sortedItems.forEach((item) => {
			if (item.name.startsWith('★')) {
				item.color = 'Yellow';
			}
			item.displayColor = mapDisplayColor(item.color);
		});
	});

	const openCase = async () => {
		const response = await fetch('../api/caseOpeningSystem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				cases: cases[0],
				user: data.user
			})
		});

		if (response.status === 200) {
			const responseData = await response.json();

			winnerName = responseData.winnerName;
			winnerColor = responseData.winnerColor;
			winnerImage = responseData.winnerImage;
			winnerPrice = responseData.winnerPrice;
			winnerCondition = responseData.winnerCondition;
			newBalance = responseData.newBalance;
			winnerId = responseData.winnerId;

			balance.update((value) => (value = newBalance));
			// items.update((value) => value += )

			caseOpeningSound.play();

			isOpening = true;

			shuffledItems = putWinnerItemIntoPlace(
				shuffledItems,
				winnerName,
				winnerImage,
				winnerPrice,
				winnerColor,
				winnerCondition
			);

			if (winnerColor == 'blue') {
				color = '#2563eb';
			} else if (winnerColor == 'purple') {
				color = '#7c3aed';
			} else if (winnerColor == 'pink') {
				color = '#d946ef';
			} else if (winnerColor == 'red') {
				color = '#dc2626';
			}

			const winnerItemX = getWinnerItemPosition(container, shuffledItems);

			animate(
				itemsContainer,
				{ x: [0, winnerItemX - 77.5 + Math.random() * 155] },
				{ easing: spring({ damping: 60, stiffness: 10, mass: 2, restSpeed: 1 }) }
			).finished.then(() => {
				showWinnerModal.set(true);
				if (isAudio) caseOpenEndSound.play();
				isOpening = false;
			});
		} else {
			console.log('you need to deposit money');
		}
	};
</script>

<main>
	<div>
		<section class="pt-10">
			<div class="flex justify-center w-full pb-4 text-3xl font-bold text-white">
				<h1>{caseName}</h1>
			</div>
			<div class="flex justify-center pb-10">
				<button
					on:click={() => {
						isAudio = !isAudio;
						caseOpeningSound;
					}}
				>
					<!-- TODO: naprawić dźwięk, użyć volume https://github.com/goldfire/howler.js/#options -->
					<svg
						class:non-active-stroke={!isAudio}
						width="40px"
						height="40px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
							id="SVGRepo_tracerCarrier"
							stroke-linecap="round"
							stroke-linejoin="round"
						/><g id="SVGRepo_iconCarrier">
							<path
								d="M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M16 8.99998C16.5 9.49998 17 10.5 17 12C17 13.5 16.5 14.5 16 15M3 10.5V13.5C3 14.6046 3.5 15.5 5.5 16C7.5 16.5 9 21 12 21C14 21 14 3 12 3C9 3 7.5 7.5 5.5 8C3.5 8.5 3 9.39543 3 10.5Z"
								stroke="#d1d1d1"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g></svg
					>
				</button>
			</div>

			<div class="flex justify-center w-full">
				<div
					class="border-4 border-solid border-white rounded-lg overflow-hidden w-[1085px] h-[155px] relative"
					bind:this={container}
				>
					<div class="flex justify-center w-full absolute top-0 left-75 z-10">
						<div class="w-[6px] h-[155px] border-[3px] border-white" />
					</div>

					<div class="w-max flex" bind:this={itemsContainer}>
						{#each shuffledItems as { name, image }}
							<div
								class="w-[155px] h-[155px] border-2 border-gray-600/50 border-solid flex items-center justify-center"
							>
								<div class="m-1">
									<img class="flex aspect-[4/3]" src={image} alt={name} />
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex justify-center pt-8 pb-8">
				<div class="border-4 border-solid rounded-full open-button">
					<div class="justify-center flex">
						{#if !isLoggedIn}
							<button
								class="flex justify-center items-center rounded-full w-60 h-16 bg-gray-700"
								on:click={() => {
									isApiKey();
								}}
							>
								<div class="p-6">
									<p class="font-semibold text-xl">You need to login</p>
								</div>
							</button>
						{:else if canOpen}
							<button
								type="submit"
								class="flex justify-center items-center rounded-full w-60 h-16"
								style={gradientStyle}
								disabled={isOpening}
								on:click={openCase}
							>
								<div class="p-6">
									{#if isOpening}
										<h1 class="font-semibold text-xl">Opening...</h1>
									{:else}
										<h1 class="font-semibold text-xl">
											Open ${cases[0].price}
										</h1>
									{/if}
								</div>
							</button>
							<ModalForm
								{winnerImage}
								{winnerName}
								{winnerPrice}
								{winnerColor}
								{openCase}
								{winnerCondition}
								{winnerId}
								{user}
							/>
						{:else}
							<button
								type="submit"
								class="flex justify-center items-center rounded-full w-60 h-16 bg-gradient-to-r from-surface-500/90 to-red-500/80 hover:from-red-500 hover:to-red-500 text-white font-bold"
								on:click={() => {
									console.log('modal to deposit money');
								}}
							>
								<h1 class="font-semibold text-xl">No balance</h1>
							</button>
						{/if}
					</div>
				</div>
			</div>
		</section>
		<section class="pt-10 px-32">
			<ul class="grid grid-cols-7">
				{#each sortedItems as { name, image, price, chance, condition, displayColor, dropRangeStart, dropRangeEnd }}
					<li
						class="border-2 rounded-3xl p-4 m-4 flex flex-col items-center bg-gradient-to-r from-rgb(21, 26, 38) to-rgb(29, 31, 49) shadow-surface-700 shadow-xl transition-all duration-200 hover:scale-105 group"
					>
						<div class="relative">
							<div class="">
								<div class="max-w-md my-4 p-4 relative" style={`border-color: ${displayColor}`}>
									<!-- <div class="absolute inset-0 flex justify-center items-center">
										<div
											class="rounded-full h-40 w-40 m-10 backdrop-filter blur-3xl backdrop-blur-sm"
											style={`background-image: radial-gradient(${displayColor}, transparent)`}
										/>
									</div> -->

									<img
										src={image}
										alt={name}
										class="max-w-full p-4 aspect-[4/3]"
										style="position: relative; z-index: 1;"
									/>
								</div>
								<h2 class="text-base font-bold text-center">{name}</h2>
								<p class="text-base text-gray-500 mb-2 text-center">{condition}</p>
								<p>${price}</p>
								<p>{chance}%</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>

<style>
	.non-active-stroke path {
		stroke: #808080;
	}

	.open-button {
		transform: scale(1);
		transition: transform 0.3s ease;
	}
	.open-button:hover {
		transform: scale(0.9);
		transition: transform 0.3s ease;
	}
</style>
