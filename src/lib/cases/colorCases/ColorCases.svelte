<script lang="ts">
	export let cases;
	const milSpec = cases[0];
	const restricted = cases[1];
</script>

<div>
	<h2 class="py-14 text-3xl">COLOR CASES</h2>
	<div class="grid grid-cols-5">
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={milSpec.link} class="!no-underline">
				<img src={milSpec.image} alt={milSpec.alt} />
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{milSpec.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={milSpec.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-blue-600 bg-gradient-to-r from-surface-700/80 to-blue-500/60 font-bold border-2 rounded-full justify-center"
						><p class="text-md price-paragraph">${milSpec.price}</p></a
					>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={restricted.link} class="!no-underline">
				<img src={restricted.image} alt={restricted.alt} />
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{restricted.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={restricted.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-purple-600 bg-gradient-to-r from-surface-700/80 to-purple-500/60 font-bold border-2 rounded-full justify-center"
						><p class="text-md price-paragraph">${restricted.price}</p></a
					>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/3b093de47d224a0490b98c628d48dc362b53ee79.png"
					alt="classified-case"
				/></a
			>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/1b22c8b86430986063b1c18f3e9360e94e79206e.png"
					alt="covert-case"
				/></a
			>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/ba688495e129493a89c550b86221a884a6c2089a.png"
					alt="knife-case"
				/></a
			>
		</div>
	</div>
</div>

<style>
	.main-div img {
		transform: scale(1);
		transition: transform 0.2s ease;
	}
	.main-div:hover img {
		transform: scale(1.05);
		transition: transform 0.2s ease;
	}

	.price-div {
		transform: scaleX(1);
		transition: transform 0.2s ease;
	}

	.main-div:hover .price-div {
		transform: scaleX(1.1);
		transition: transform 0.2s ease;
	}

	.main-div:hover .price-div a p {
		transform: scaleX(0.95);
	}

	.main-div:hover .price-div a {
		background-color: #2563eb;
		background-image: linear-gradient(to right, #2563eb, #2563eb);
		border-color: #2563eb;
		transition: background-color 0.3 ease;
	}
</style>
