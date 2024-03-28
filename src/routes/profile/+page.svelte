<script lang="ts">
	import type { UserObj } from '../../app';

	export let data: UserObj;

	const bigAvatar = data.user.bigAvatar;
	const name = data.user.personaname;
	const steamid = data.user.steamid;
	const balance = data.user.balance.toFixed(2);

	const userProfileLink = `https://steamcommunity.com/profiles/${steamid}`;

	const userItems = data.userItems;
	const userHistory = data.userHistory;

	const addHexColor = (items: any) => {
		items.forEach((item: any) => {
			item.hexColor = getColorHex(item.color);
		});
	};

	const getColorHex = (item: any) => {
		switch (item.toLowerCase()) {
			case 'blue':
				return '#0000FF';
		}
	};

	addHexColor(userItems);
	addHexColor(userHistory);
</script>

<div class="flex">
	<div>
		<div class="relative flex py-5 items-center">
			<div class="flex-grow border-t border-gray-400" />
			<span class="flex-shrink mx-4 text-gray-100 text-3xl">Your Profile</span>
			<div class="flex-grow border-t border-gray-400" />
		</div>
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
		<div class="py-5">
			<div class="relative flex py-5 items-center">
				<div class="flex-grow border-t border-gray-400" />
				<span class="flex-shrink mx-4 text-gray-100 text-3xl">Inventory</span>
				<div class="flex-grow border-t border-gray-400" />
			</div>
			<section class="pt-10 px-32">
				<ul class="grid grid-cols-6">
					{#each userItems as { name, image, price, hexColor }}
						<li
							class="border-2 border-solid rounded-lg p-8 m-4 w-auto h-auto"
							style={`border-color: ${hexColor}`}
						>
							<p>{name}</p>
							<img src={image} alt="item" />
							<p>Price: ${price}</p>
						</li>
					{/each}
					{#each userHistory as { name, image, price, action, hexColor }}
						<li
							class="border-2 border-solid rounded-lg p-8 m-4 w-auto h-auto"
							style={`border-color: ${hexColor}`}
						>
							<p>{name}</p>
							<img src={image} alt="item" />
							<p>Price: ${price}</p>
							<p>{action}</p>
						</li>
					{/each}
				</ul>
			</section>
		</div>
	</div>
</div>
