<script lang="ts">
	import type { UserObj } from '../../../../app';

	export let data: UserObj;

	let balance = data.user.balance;
	let avatar = data.user.avatar;
	let personaname = data.user.personaname;
</script>

<div class="flex-shrink-0">
	<div class="relative">
		{#await data}
			<p>... waiting</p>
		{:then data}
			<div class="flex flex-row">
				<div class="flex items-center pr-10 cursor-pointer">
					<button
						class="border-2 border-green-500 flex items-center rounded-full bg-gradient-to-r from-green-500/10 to-green-500/30 hover:from-green-500 hover:to-green-500"
						style="max-width: fit-content;"
						on:click={() => {
							console.log('runs modal to deposit funds');
						}}
					>
						<span class="text-2xl text-[#fff] pr-10 pl-6">${balance}</span>
						<div class="border-2 border-green-500 rounded-full">
							<svg
								class="w-14 h-14"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4 12H20M12 4V20"
									stroke="#ffffff"
									stroke-width="4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</div>
					</button>
				</div>

				<div class="flex items-center">
					<div class="border-2 flex items-center rounded-full w-[200px] relative">
						<span class="flex items-center">
							<img src={avatar} class="rounded-full w-14" alt="your avatar" />
							<div class="pl-5 overflow-hidden whitespace-nowrap w-[150px]">
								<p class="text-2xl">{personaname}</p>
							</div>
						</span>
						<a href="../../../profile">
							<div
								class="absolute top-0 left-0 w-full h-full rounded-full bg-gray-700 opacity-0 hover:opacity-20 transition-opacity duration-200"
							/></a
						>
					</div>

					<form action="/?/logout" method="POST">
						<button class="pl-10" type="submit">
							<svg
								width="50px"
								height="50px"
								viewBox="0 0 24 24"
								fill="#d0d0d0"
								class="hover:fill-white"
								xmlns="http://www.w3.org/2000/svg"
								><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								/><g id="SVGRepo_iconCarrier"
									><path
										d="M2 6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v2a1 1 0 1 1-2 0V6H4v12h9v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm15.293 2.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L18.586 13H9a1 1 0 1 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 0-1.414z"
									/></g
								></svg
							>
						</button>
					</form>
				</div>
			</div>
		{/await}
	</div>
</div>
