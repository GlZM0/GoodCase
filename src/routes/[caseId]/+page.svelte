<script>
	import { OpenCase } from './OpenCase';
	export let data;

	const myCase = data.returnedCase;
	const openSystem = new OpenCase(0, 100, myCase[0]);
	let winnerName = '';
	let winnerPrice = 0;

	const openCase = () => {
		openSystem.openCase();
		winnerName = openSystem.getWinnerName();
		winnerPrice = openSystem.getWinnerPrice();
	};
</script>

<main>
	<div>
		<div class="flex justify-center pt-8 pb-8">
			<div class="w-96 border-2 border-solid rounded-lg">
				<div class="justify-center flex">
					<button class="bg-red-500 flex" on:click={() => openCase()}>
						<div class="p-4">Open case</div>
						<div class="p-4">{myCase[0].price}</div>
					</button>
				</div>
				<p>{winnerName === '' ? '' : `You just won: ${winnerName}`}</p>
				<p>{winnerPrice === null ? '' : winnerPrice}</p>
			</div>
		</div>
		<div class="grid grid-cols-6">
			{#each myCase[0].items as { name, image, price, chance }}
				<div class="border-2 border-solid rounded-lg p-8 m-4 w-auto h-auto">
					<p>{name}</p>
					<img src={image} alt="item" />
					<p>Price: {price} PLN</p>
					<p>Chance: {chance}</p>
				</div>
			{/each}
		</div>
	</div>
</main>
