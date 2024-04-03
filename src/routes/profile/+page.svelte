<script lang="ts">
	import type { UserObj } from '../../app';
	import Inventory from './Inventory.svelte';
	import Profile from './Profile.svelte';
	import { balance, items, historyItems } from '../../stores';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	export let data: UserObj;

	const bigAvatar = data.user.bigAvatar;
	const name = data.user.personaname;
	const steamid = data.user.steamid;

	const userProfileLink = `https://steamcommunity.com/profiles/${steamid}`;

	$: userItems = $items;
	$: userHistory = $historyItems;

	let areItems: boolean = false;

	onMount(() => {
		userItems = $items;
		userHistory = $historyItems;

		addHexColor(userItems);
		addHexColor(userHistory);

		if (userItems != null || userHistory != null) {
			areItems = true;
		} else {
			areItems = false;
		}
	});

	const addHexColor = (userItems: any) => {
		console.log(userItems);
		userItems.forEach((item: any) => {
			item.hexColor = getColorHex(item.color);
		});
	};

	const getColorHex = (item: any) => {
		switch (item.toLowerCase()) {
			case 'blue':
				return '#2563eb';
			case 'purple':
				return '#7c3aed';
			case 'pink':
				return '#d946ef';
			case 'red':
				return '#dc2626';
			default:
				return '';
		}
	};

	const sellAllItems = async () => {
		const response = await fetch('../api/sellAllItems', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseData = await response.json();
		const newBalance = responseData.newBalance;
		if (response.status === 200) {
			const userAllItems = userItems as any[];
			const itemsWithAction = userAllItems.map((item) => ({
				...item,
				action: 'sold'
			}));
			balance.update((value) => (value = newBalance));
			historyItems.update((value: any) => {
				return value.concat(itemsWithAction);
			});
			items.update((value) => (value = []));
		}
	};
</script>

<div class="min-w-full min-h-full">
	<div>
		<div class="bg-surface-800 py-8">
			<div class="relative flex py-5 items-center">
				<div class="flex-grow border-t border-gray-400" />
				<span class="flex-shrink mx-4 text-gray-100 text-3xl">Your Profile</span>
				<div class="flex-grow border-t border-gray-400" />
			</div>
			<Profile {userProfileLink} {bigAvatar} {name} {steamid} />
		</div>

		<div class="bg-surface-700">
			<div class="relative flex py-5 items-center">
				<div class="flex-grow border-t border-gray-400" />
				<span class="flex-shrink mx-4 text-gray-100 text-3xl">Inventory</span>
				<div class="flex-grow border-t border-gray-400" />
			</div>
			<div class="px-32">
				<div class="grid justify-items-end">
					<button
						class="w-[15%] h-12 border-2 rounded-full border-red-500 bg-gradient-to-r from-surface-700/80 to-red-400/60 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 flex items-center justify-center mr-4 mb-2"
						on:click={() => {
							sellAllItems();
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 mr-2"
							viewBox="0 0 512 512"
							fill="none"
							stroke="#000000"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0" />
							<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
							<g id="SVGRepo_iconCarrier">
								<title>shopping-cart</title>
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="icon" fill="#ffffff" transform="translate(42.666667, 85.333333)">
										<path
											d="M7.10542736e-15,-1.42108547e-14 L70.3622093,-1.42108547e-14 L89.7493333,85.3333333 L378.389061,85.3333333 L337.246204,277.333333 L89.6377907,277.333333 L36.288,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 Z M325.610667,128 L99.456,128 L123.690667,234.666667 L302.741333,234.666667 L325.610667,128 Z M138.666667,384 C156.339779,384 170.666667,369.673112 170.666667,352 C170.666667,334.326888 156.339779,320 138.666667,320 C120.993555,320 106.666667,334.326888 106.666667,352 C106.666667,369.673112 120.993555,384 138.666667,384 Z M288,384 C305.673112,384 320,369.673112 320,352 C320,334.326888 305.673112,320 288,320 C270.326888,320 256,334.326888 256,352 C256,369.673112 270.326888,384 288,384 Z"
											id="Combined-Shape"
										/>
									</g>
								</g>
							</g>
						</svg>
						Sell all
					</button>
				</div>
				{#if areItems}
					<Inventory {userItems} {userHistory} />
				{:else}
					<p>No items</p>
				{/if}
			</div>
		</div>
	</div>
</div>
