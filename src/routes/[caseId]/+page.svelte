<script>
	// @ts-nocheck

	export let data;
	const myCase = data.returnedCase;
	let winnerName = '';
	let winnerPrice = '';

	const openCase = (min, max) => {
		const cumulativeDistribution = [];
		let cumulative = 0;
		for (let i = 0; i <= 20; i++) {
			cumulative += myCase[0].items[i].chance;
			cumulativeDistribution.push(cumulative);
		}

		const generateRandomNumber = (min, max) => {
			return (Math.random() * (max - min) + min).toFixed(2);
		};

		const getRangeIndex = (generateRandomNumber) => {
			for (let i = 0; i < cumulativeDistribution.length; i++) {
				if (randomNumber <= cumulativeDistribution[i]) {
					return i;
				}
			}
			return cumulativeDistribution.length - 1;
		};

		const randomNumber = generateRandomNumber(min, max);
		const rangeIndex = getRangeIndex(randomNumber);
		const winningItemName = myCase[0].items[rangeIndex].name;
		const winningItemPrice = myCase[0].items[rangeIndex].price;

		winnerName = winningItemName;
		winnerPrice = winningItemPrice;
	};
</script>

<main>
	<div>
		<div class="flex justify-center pt-8 pb-8">
			<div class="w-96 border-2 border-solid rounded-lg">
				<div class="justify-center flex">
					<button class="bg-red-500 flex" on:click={() => openCase(0, 100)}>
						<div class="p-4">Open case</div>
						<div class="p-4">{myCase[0].price}</div>
					</button>
				</div>
				<p>{winnerName === '' ? '' : `You just won: ${winnerName}`}</p>
				<p>{winnerPrice === '' ? '' : winnerPrice}</p>
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
