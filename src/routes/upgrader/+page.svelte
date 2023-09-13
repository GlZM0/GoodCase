<script>
	const handleClick = () => {
		console.log('hello');
	};
</script>

<main>
	<div>
		<div class="flex justify-center pt-8 pb-8">div with winning item</div>
		<div>
			<ul class="grid grid-cols-6">
				<button
					type="button"
					on:click={handleClick}
					class="border-2 border-gray-300 border-solid rounded-lg hover:border-gray-500 transition-transform scale-100 hover:scale-90 active:scale-100"
				>
					<li class="p-8 m-4 w-auto h-auto">
						<p>item 1</p>
						<img
							src="https://cdn.key-drop.com/csgo_icons/b0/b0a3b4f4eaff2002de26e417f403097c.png"
							alt="item"
						/>
						<p>Price: 5 PLN</p>
						<p>Chance: 9%</p>
					</li>
				</button>
				<button
					type="button"
					on:click={handleClick}
					class="border-2 border-gray-300 border-solid rounded-lg hover:border-gray-500 transition-transform scale-100 hover:scale-90 active:scale-100"
				>
					<li class="p-8 m-4 w-auto h-auto">
						<p>item 1</p>
						<img
							src="https://cdn.key-drop.com/csgo_icons/b0/b0a3b4f4eaff2002de26e417f403097c.png"
							alt="item"
						/>
						<p>Price: 1 PLN</p>
						<p>Chance: 10%</p>
					</li>
				</button>
			</ul>
		</div>
	</div>
</main>
