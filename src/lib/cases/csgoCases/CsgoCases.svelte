<script>
	export let cases;

	const fade = cases[5];
	const boreal = cases[6];
</script>

<div>
	<div>
		<h2 class="py-8 text-3xl">CS:GO CASES</h2>
	</div>
	<div class="grid grid-cols-5 place-items-center">
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={fade.link} class="!no-underline group">
				<img
					src={fade.image}
					alt={fade.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{fade.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={fade.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-purple-500 bg-gradient-to-r from-purple-500/80 to-amber-400 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${fade.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={boreal.link} class="!no-underline group">
				<img
					src={boreal.image}
					alt={boreal.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{boreal.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={boreal.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-green-700 bg-gradient-to-r from-surface-700/80 to-green-500/70 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${boreal.price}</p>
					</a>
				</div>
			</a>
		</div>
	</div>
</div>
