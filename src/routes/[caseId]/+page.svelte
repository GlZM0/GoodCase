<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { OpenCase } from './OpenCase';
	import { animate, spring } from 'motion';
	import { showWinnerModal } from '../../stores';
	import { putWinnerItemIntoPlace } from './PutWinnerItem';
	import ModalForm from './ModalForm.svelte';
	import { getWinnerItemPosition } from './WinnerItemPosition';

	export let data;
	const myCase = data.cases;
	const openSystem = new OpenCase(0, 100, myCase[0]);
	let winnerName = '';
	let winnerPrice = 0;
	let winnerImage = '';
	let shuffledItems: any[] = [];
	let sortedItems: any[] = [];

	let container: HTMLElement;
	let itemsContainer: HTMLElement;

	const sortItems = () => {
		sortedItems = myCase[0].items;
		sortedItems.sort((a, b) => {
			return b.price - a.price;
		});
	};

	onMount(() => {
		sortItems();

		const originalItems = Array.from({ length: 21 }, (_, index) => myCase[0].items[index]);
		let allItems: any[] = [];

		for (let i = 0; i < Math.ceil(100 / originalItems.length); i++) {
			allItems = allItems.concat(originalItems);
		}

		shuffleCase();
	});

	const shuffleCase = () => {
		const originalItems = Array.from({ length: 21 }, (_, index) => myCase[0].items[index]);
		let allItems: any[] = [];

		for (let i = 0; i < Math.ceil(100 / originalItems.length); i++) {
			allItems = allItems.concat(originalItems);
		}

		shuffledItems = allItems.sort(() => Math.random() - 0.5);
	};

	// @ts-ignore
	const openCase = () => {
		shuffleCase();

		openSystem.openCase();
		winnerName = openSystem.getWinnerName();
		winnerPrice = openSystem.getWinnerPrice();
		winnerImage = openSystem.getWinnerImage();

		putWinnerItemIntoPlace(shuffledItems, winnerName, winnerImage, winnerPrice);

		const winnerItemX = getWinnerItemPosition(container, shuffledItems);

		animate(
			itemsContainer,
			{ x: [0, winnerItemX - 100 + Math.random() * 200] },
			{ easing: spring({ damping: 60, stiffness: 10, mass: 2, restSpeed: 1 }) }
		).finished.then(() => {
			showWinnerModal.set(true);
		});
	};
</script>

<main>
	<div>
		<section class="pt-10">
			<div class="flex justify-center w-full">
				<div
					class="border-4 border-solid border-white rounded-lg overflow-hidden w-[1400px] relative"
					bind:this={container}
				>
					<div class="flex justify-center w-full absolute top-0 left-75 z-10">
						<div class="w-[6px] h-[200px] border-[3px] border-white" />
					</div>

					<div class="w-max flex" bind:this={itemsContainer}>
						{#each shuffledItems as { name, image, price }}
							<div
								class="w-[200px] h-[200px] border-2 border-gray-600/50 border-solid flex items-center justify-center"
							>
								<img class="flex aspect-[4/3]" src={image} alt={name} />
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="flex justify-center pt-8 pb-8">
				<div class="w-auto border-4 border-solid rounded-full">
					<div class="justify-center flex">
						<form method="POST" action="?/open" use:enhance>
							<button type="submit" class="bg-red-500 flex rounded-full" on:click={openCase}>
								<div class="p-4">Open case</div>
								<div class="p-4">{myCase[0].price}</div>
							</button>
							<ModalForm {winnerImage} {winnerName} {winnerPrice} />
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
