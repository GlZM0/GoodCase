<script>
	export let data;
	const myCase = data.returnedCase;
</script>

<main>
	<div>
		<div class="grid grid-cols-5">
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
