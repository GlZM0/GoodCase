<script>
	export let cases;

	const fade = cases[5];
	const boreal = cases[6];
	const beast = cases[7];
	const vulcan = cases[8];
	const superknives = cases[9];
</script>

<div class="py-6">
	<div class="relative flex py-5 items-center">
		<div class="flex-grow border-t border-gray-400" />
		<span class="flex-shrink mx-4 text-gray-100 text-3xl">LEGENDARY CASES</span>
		<div class="flex-grow border-t border-gray-400" />
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
						class="flex !no-underline text-white p-2 w-40 border-solid border-purple-500 bg-gradient-to-r from-purple-500/80 via-pink-400 to-amber-400 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
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
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={beast.link} class="!no-underline group">
				<img
					src={beast.image}
					alt={beast.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{beast.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={beast.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-yellow-400 bg-gradient-to-r from-yellow-200/20 to-yellow-300 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${beast.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={vulcan.link} class="!no-underline group">
				<img
					src={vulcan.image}
					alt={vulcan.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{vulcan.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={vulcan.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-blue-500 bg-gradient-to-r from-cyan-300/10 to-cyan-400/70 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${vulcan.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={superknives.link} class="!no-underline group">
				<img
					src={superknives.image}
					alt={superknives.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{superknives.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={superknives.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-cyan-500 bg-gradient-to-r from-surface-700/80 to-teal-300/70 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${superknives.price}</p>
					</a>
				</div>
			</a>
		</div>
	</div>
</div>
