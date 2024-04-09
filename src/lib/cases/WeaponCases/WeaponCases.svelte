<script lang="ts">
	export let cases;
	const ak47 = cases[10];
	const m4a1s = cases[11];
	const mp9 = cases[12];
	const mac10 = cases[13];
	const awp = cases[14];
</script>

<div class="py-6 pb-16">
	<div class="relative flex py-5 items-center">
		<div class="flex-grow border-t border-gray-400" />
		<span class="flex-shrink mx-4 text-gray-100 text-3xl">WEAPON CASES</span>
		<div class="flex-grow border-t border-gray-400" />
	</div>
	<div class="grid grid-cols-5 place-items-center">
		<div class="flex w-64 h-64 items-center justify-center main-div relative space-y-4">
			<a href={ak47.link} class="!no-underline group">
				<img
					src={ak47.image}
					alt={ak47.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{ak47.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={ak47.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-red-500 bg-gradient-to-r from-surface-800/80 to-red-500/70 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${ak47.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={m4a1s.link} class="!no-underline group">
				<img
					src={m4a1s.image}
					alt={m4a1s.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{m4a1s.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={m4a1s.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-blue-800 bg-gradient-to-r from-surface-800/80 to-blue-600/70 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${m4a1s.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={mp9.link} class="!no-underline group">
				<img
					src={mp9.image}
					alt={mp9.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{mp9.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={mp9.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-purple-600 bg-gradient-to-r from-surface-800/80 to-violet-600/70 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${mp9.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={mac10.link} class="!no-underline group">
				<img
					src={mac10.image}
					alt={mac10.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{mac10.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={mac10.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-amber-300 bg-gradient-to-r from-surface-800/80 to-amber-400/90 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${mac10.price}</p>
					</a>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center main-div">
			<a href={awp.link} class="!no-underline group">
				<img
					src={awp.image}
					alt={awp.alt}
					class="transform transition-transform scale-100 group-hover:scale-105"
				/>
				<div>
					<p class="flex text-white items-center justify-center py-3 text-xl">
						{awp.name.toUpperCase()}
					</p>
				</div>
				<div class="flex justify-center price-div">
					<a
						href={awp.link}
						class="flex !no-underline text-white p-2 w-40 border-solid border-green-600 bg-gradient-to-r from-surface-800/80 to-lime-400/90 font-bold border-2 rounded-full justify-center transform transition-transform scale-x-100 group-hover:scale-x-110"
					>
						<p class="text-md price-paragraph">${awp.price}</p>
					</a>
				</div>
			</a>
		</div>
	</div>
</div>
