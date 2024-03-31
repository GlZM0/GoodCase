<script lang="ts">
	export let balance: any;
	export let userProfileLink: string;
	export let bigAvatar: string;
	export let name: string;
	export let steamid: string;
</script>

<div class="grid grid-cols-3 items-center">
	<div class="flex items-center justify-center h-full">
		<div class="text-center">
			<p class="text-2xl mb-5 font-semibold">Balance:</p>
			<div
				class="border-4 cursor-pointer border-red-500 bg-gradient-to-r from-red-500/10 to-red-500/30 hover:from-red-500 hover:to-red-500 rounded-2xl p-4 w-auto font-semibold hover:transition-all duration-200"
			>
				<button
					on:click={() => {
						console.log('deposit balance');
					}}
					class="flex"
				>
					<p class="text-2xl px-2">${balance}</p>
					<p class="text-2xl px-2">Deposit</p>
				</button>
			</div>
		</div>
	</div>

	<div class="text-center">
		<div class="flex flex-col items-center">
			<a href={userProfileLink} class="flex flex-col items-center">
				<img
					src={bigAvatar}
					alt="user avatar"
					class="w-40 rounded-3xl border-4 border-full border-green-500"
				/>
			</a>
			<a href={userProfileLink}>
				<h1 class="text-3xl pb-2">{name}</h1>
				<h2 class="text-lg pb-4">SteamID: {steamid}</h2>
			</a>
		</div>
	</div>

	<div class="flex items-center justify-center h-full">
		<div class="text-center">
			<p class="text-2xl mb-5 font-semibold">Your Tradelink:</p>
			<input
				type="text"
				placeholder="Your Steam Trade URL"
				class="p-2 border bg-transparent text-xl rounded-2xl w-96 focus:border-2 focus:border-green-500"
			/>

			<label for="" class="pt-2">
				<a
					href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
					target="_blank"
					class="text-lg underline text-gray-300 hover:text-gray-100 duration-300"
					>Get the Tradelink</a
				>
			</label>
		</div>
	</div>
</div>
