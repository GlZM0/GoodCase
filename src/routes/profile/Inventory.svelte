<script lang="ts">
	export let userItems: any;

	export let userHistory: any;
</script>

<section class="pt-10">
	<ul class="grid grid-cols-7">
		{#each userItems as { name, image, price, hexColor, condition, type }}
			<li
				class="border-2 rounded-3xl p-4 m-4 flex flex-col items-center bg-gradient-to-r from-rgb(21, 26, 38) to-rgb(29, 31, 49) shadow-surface-700 shadow-xl transition-all duration-200 hover:scale-105 group"
			>
				<div class="relative">
					<div class="hover:filter hover:blur-sm">
						<div class="max-w-md my-4 p-4 relative" style={`border-color: ${hexColor}`}>
							<div class="absolute inset-0 flex justify-center items-center">
								<div
									class="rounded-full h-40 w-40 opacity-80 m-10 backdrop-filter blur-3xl backdrop-blur-sm"
									style={`background-image: radial-gradient(${hexColor}, transparent)`}
								/>
							</div>

							<img
								src={image}
								alt={name}
								class="max-w-full p-4 aspect-[4/3]"
								style="position: relative; z-index: 1;"
							/>
						</div>
						<h2 class="text-base font-bold text-center">{name}</h2>
						<p class="text-base text-gray-500 mb-2 text-center">{condition}</p>
					</div>
				</div>
			</li>
		{/each}

		{#each userHistory as { name, image, price, action, hexColor, condition }}
			<li
				class="border-2 rounded-3xl p-4 m-4 flex flex-col items-center relative bg-gradient-to-r from-rgb(21, 26, 38) to-rgb(29, 31, 49) shadow-surface-700 shadow-xl transition-transform hover:scale-105"
			>
				<div class="flex items-center">
					<svg
						width="30px"
						height="30px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						stroke="#00b82e"
					>
						<g id="SVGRepo_bgCarrier" stroke-width="0" />
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
						<g id="SVGRepo_iconCarrier">
							<path
								d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21"
								stroke="#00b82e"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
					</svg>
					<p class="ml-2 text-xl">{action}</p>
				</div>

				<div class="hover:filter hover:blur-sm">
					<div class="max-w-md my-4 p-4 relative" style={`border-color: ${hexColor}`}>
						<div class="absolute inset-0 flex justify-center items-center">
							<div
								class="rounded-full h-40 w-40 opacity-80 m-10 backdrop-filter blur-3xl backdrop-blur-sm"
								style={`background-image: radial-gradient(${hexColor}, transparent)`}
							/>
						</div>

						<img
							src={image}
							alt={name}
							class="max-w-full aspect-[4/3]"
							style="position: relative; z-index: 1;"
						/>
					</div>
					<h2 class="text-base font-bold text-center">{name}</h2>
					<p class="text-base text-gray-500 mb-2 text-center">{condition}</p>
				</div>
			</li>
		{/each}
	</ul>
</section>
