<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { OpenCase } from './OpenCase';
	import { animate, spring } from 'motion';
	import { showWinnerModal } from '../../stores';
	import { putWinnerItemIntoPlace } from './PutWinnerItem';
	import ModalForm from './ModalForm.svelte';
	import { getWinnerItemPosition } from './WinnerItemPosition';
	import { Sound } from 'svelte-sound';
	import opening_mp3 from '../../static/openingSound.mp3';
	import caseOpenEnd_mp3 from '../../static/caseOpenEnd.mp3';
	import { isApiKey } from '$routes/components/header/upperNavbar/UpperNavbar.svelte';
	import type { Case, Item } from '../../app';

	export let data: Case;
	const cases = data.cases;
	const isLoggedIn = data.logged;
	const openSystem = new OpenCase(0, 100, cases[0]);
	let caseName = cases[0].name.toUpperCase();

	let caseOpeningSound = new Sound(opening_mp3);
	let caseOpenEndSound = new Sound(caseOpenEnd_mp3);

	let winnerName = '';
	let winnerPrice = 0;
	let winnerImage = '';
	let winnerColor = '';
	let winnerCondition = '';

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
		sortItems();

		const originalItems = Array.from(
			{ length: cases[0].items.length },
			(_, index) => cases[0].items[index]
		);
		let allItems: Item[] = [];

		for (let i = 0; i < Math.ceil(100 / originalItems.length); i++) {
			allItems = allItems.concat(originalItems);
		}

		shuffleCase();
	});

	const sortItems = () => {
		sortedItems = cases[0].items;
		sortedItems.sort((a, b) => {
			return b.price - a.price;
		});
	};

	const shuffleCase = () => {
		const originalItems = Array.from(
			{ length: cases[0].items.length },
			(_, index) => cases[0].items[index]
		);
		let allItems: Item[] = [];

		for (let i = 0; i < Math.ceil(100 / originalItems.length); i++) {
			allItems = allItems.concat(originalItems);
		}

		shuffledItems = allItems.sort(() => Math.random() - 0.5);
	};

	const handleLoginClick = () => {
		isApiKey();
	};

	const openCase = () => {
		caseOpeningSound.play();

		isOpening = true;
		shuffleCase();

		openSystem.openCase();
		winnerName = openSystem.getWinnerName();
		winnerPrice = openSystem.getWinnerPrice();
		winnerImage = openSystem.getWinnerImage();
		winnerColor = openSystem.getWinnerColor();
		winnerCondition = openSystem.getWinnerCondition();

		putWinnerItemIntoPlace(
			shuffledItems,
			winnerName,
			winnerImage,
			winnerPrice,
			winnerColor,
			winnerCondition
		);

		if (winnerColor == 'blue') {
			winnerColor = 'rgb(59 130 246)';
		} else if (winnerColor == 'purple') {
			winnerColor = 'rgb(136,71,255)';
		}

		const winnerItemX = getWinnerItemPosition(container, shuffledItems);

		animate(
			itemsContainer,
			{ x: [0, winnerItemX - 100 + Math.random() * 200] },
			{ easing: spring({ damping: 60, stiffness: 10, mass: 2, restSpeed: 1 }) }
		).finished.then(() => {
			showWinnerModal.set(true);
			if (isAudio) caseOpenEndSound.play();
			isOpening = false;
		});
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
					<!-- naprawić dźwięk, użyć volume https://github.com/goldfire/howler.js/#options -->
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
					class="border-4 border-solid border-white rounded-lg overflow-hidden w-[1400px] relative"
					bind:this={container}
				>
					<div class="flex justify-center w-full absolute top-0 left-75 z-10">
						<div class="w-[6px] h-[200px] border-[3px] border-white" />
					</div>

					<div class="w-max flex" bind:this={itemsContainer}>
						{#each shuffledItems as { name, image }}
							<div
								class="w-[200px] h-[200px] border-2 border-gray-600/50 border-solid flex items-center justify-center"
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
						<form method="POST" action="?/open" use:enhance>
							{#if !isLoggedIn}
								<button
									class="flex justify-center items-center rounded-full w-[250px] bg-gray-700"
									on:click={handleLoginClick}
								>
									<div class="p-6">
										<p class="font-semibold text-xl">You need to login</p>
									</div>
								</button>
							{:else}
								<button
									type="submit"
									class="flex justify-center items-center rounded-full w-[250px]"
									style={gradientStyle}
									on:click={openCase}
									disabled={isOpening}
								>
									<div class="p-6">
										{#if isOpening}
											<h1 class="font-semibold text-xl">Opening...</h1>
										{:else}
											<h1 class="font-semibold text-xl">
												Open {cases[0].price} PLN
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
								/>
							{/if}
						</form>
					</div>
				</div>
			</div>
		</section>
		<section class="pt-10 px-32">
			<ul class="grid grid-cols-6">
				{#each sortedItems as { name, image, price, chance }}
					<li class="border-2 border-solid rounded-lg p-8 m-4 w-auto h-auto">
						<p>{name}</p>
						<img src={image} alt="item" />
						<p>Price: {price} PLN</p>
						<p>Chance: {chance}%</p>
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
