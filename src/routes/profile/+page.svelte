<script lang="ts">
	import type { UserObj } from '../../app';
	import Profile from './Profile.svelte';
	import { balance } from '../../stores';
	import { onMount } from 'svelte';

	export let data: UserObj;

	const bigAvatar = data.user.bigAvatar;
	const name = data.user.personaname;
	const steamid = data.user.steamid;

	const userProfileLink = `https://steamcommunity.com/profiles/${steamid}`;

	$: userInv = data.inventories.userInventory;
	$: userInvHistory = data.inventories.userInventoryHistory;
	$: userSumOfItemsPrice = data.sumOfItemsPrice;

	const sellAllItems = async () => {
		const response = await fetch('../api/sellAllItems', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseData = await response.json();
		const newBalance = responseData.user.newBalance;
		if (response.status === 200) {
			balance.update((value) => (value = newBalance));
			userSumOfItemsPrice = 0;
			userInv = [];
			userInvHistory = responseData.user.inventoryHistory;
		}
	};

	const sellItem = async (itemId: any, itemPrice: any) => {
		let itemData = {
			itemId: itemId,
			itemPrice: itemPrice
		};

		const response = await fetch('../api/sellItem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemData: itemData,
				user: data.user
			})
		});

		const responseData = await response.json();
		if (response.status === 200) {
			balance.update((value) => (value = responseData.updatedBalance));
			userSumOfItemsPrice = responseData.sumOfItemsPrice;
			userInv = responseData.siteInventory;
			userInvHistory = responseData.userInventoryHistory;
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
					{#if userSumOfItemsPrice > 0}
						<button
							class="w-[13%] h-12 border-2 rounded-full border-red-500 bg-gradient-to-r from-surface-700/80 to-red-400/60 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 flex items-center justify-center mr-4 mb-2"
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
							Sell all for ${userSumOfItemsPrice.toFixed(2)}
						</button>
					{:else}
						<button
							class="w-[13%] h-12 border-2 rounded-full border-gray-500 bg-gray-700 text-white font-bold py-2 flex items-center justify-center mr-4 mb-2 cursor-default"
						>
							No items to sell
						</button>
					{/if}
				</div>
				<section class="pt-10">
					<ul class="grid grid-cols-7">
						{#each userInv as { id, name, image, price, colorHex, condition, type }}
							<li
								class="border-2 rounded-3xl p-4 m-4 flex flex-col items-center transition-all duration-200 group relative overflow-hidden hover:scale-105"
								style={`border-top-color: ${colorHex}`}
							>
								<div class="relative h-[19rem] flex flex-col justify-center items-center">
									<span class="absolute top-1 right-1 text-white font-bold"
										>${price.toFixed(2)}</span
									>
									<div class="max-w-md">
										<img src={image} alt={name} class="max-w-full aspect-[4/3]" />
									</div>
									<h2 class="text-base font-bold text-center">{name}</h2>
									<p class="text-base text-gray-500 mb-2 text-center">
										{#if condition}
											<p class="text-base text-gray-500 mb-2 text-center">
												{condition}
											</p>
										{/if}
									</p>
								</div>
								<div
									class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-full group-hover:transition-all group-hover:duration-200 group-hover:translate-y-0"
								>
									<button
										class="w-[75%] h-12 border-2 rounded-full border-red-500 bg-gradient-to-r from-surface-700/80 to-red-400/60 hover:from-red-500 hover:to-red-500 text-white font-bold py-2 px-4 flex items-center justify-center mb-2"
										on:click={() => {
											sellItem(id, price);
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
											<g
												id="SVGRepo_tracerCarrier"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
											<g id="SVGRepo_iconCarrier">
												<title>shopping-cart</title>
												<g
													id="Page-1"
													stroke="none"
													stroke-width="1"
													fill="none"
													fill-rule="evenodd"
												>
													<g id="icon" fill="#ffffff" transform="translate(42.666667, 85.333333)">
														<path
															d="M7.10542736e-15,-1.42108547e-14 L70.3622093,-1.42108547e-14 L89.7493333,85.3333333 L378.389061,85.3333333 L337.246204,277.333333 L89.6377907,277.333333 L36.288,42.6666667 L7.10542736e-15,42.6666667 L7.10542736e-15,-1.42108547e-14 Z M325.610667,128 L99.456,128 L123.690667,234.666667 L302.741333,234.666667 L325.610667,128 Z M138.666667,384 C156.339779,384 170.666667,369.673112 170.666667,352 C170.666667,334.326888 156.339779,320 138.666667,320 C120.993555,320 106.666667,334.326888 106.666667,352 C106.666667,369.673112 120.993555,384 138.666667,384 Z M288,384 C305.673112,384 320,369.673112 320,352 C320,334.326888 305.673112,320 288,320 C270.326888,320 256,334.326888 256,352 C256,369.673112 270.326888,384 288,384 Z"
															id="Combined-Shape"
														/>
													</g>
												</g>
											</g>
										</svg>
										Sell for ${price.toFixed(2)}
									</button>
								</div>
							</li>
						{/each}

						{#each userInvHistory as { name, image, price, action, colorHex, condition }}
							<li
								class="border-2 rounded-3xl p-4 m-4 flex flex-col items-center transition-all duration-200 hover:scale-105 group"
								style={`border-top-color: ${colorHex}`}
							>
								<div class="relative h-[19rem] flex flex-col justify-center items-center">
									<div class="absolute top-1 left-0">
										{#if action == 'sold'}
											<div class="flex items-center">
												<svg
													width="20px"
													height="20px"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													stroke="#00b82e"
												>
													<g id="SVGRepo_bgCarrier" stroke-width="0" />
													<g
														id="SVGRepo_tracerCarrier"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
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
												<p class="ml-2 text-md">{action}</p>
											</div>
										{:else if action == 'upgraded'}
											<div class="flex items-center">
												<svg
													fill="#eab308"
													height="20px"
													width="20px"
													version="1.1"
													id="Layer_1"
													xmlns="http://www.w3.org/2000/svg"
													xmlns:xlink="http://www.w3.org/1999/xlink"
													viewBox="-51.18 -51.18 614.16 614.16"
													xml:space="preserve"
													transform="matrix(1, 0, 0, 1, 0, 0)"
													class="svg-stroke"
													stroke="#eab308"
													stroke-width="26"
												>
													<g id="SVGRepo_bgCarrier" stroke-width="0" />
													<g
														id="SVGRepo_tracerCarrier"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke="#CCCCCC"
														stroke-width="1.023602"
													/>
													<g id="SVGRepo_iconCarrier">
														<g>
															<g>
																<g>
																	<path
																		d="M263.535,248.453c-4.16-4.16-10.88-4.16-15.04,0L3.054,493.787c-4.053,4.267-3.947,10.987,0.213,15.04 c4.16,3.947,10.667,3.947,14.827,0l237.867-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213 c3.947-4.16,3.947-10.667,0-14.827L263.535,248.453z"
																	/>
																	<path
																		d="M18.201,263.493l237.76-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213c3.947-4.16,3.947-10.667,0-14.827 L263.535,3.12c-4.16-4.16-10.88-4.16-15.04,0L3.054,248.453c-4.053,4.267-3.947,10.987,0.213,15.04 C7.534,267.547,14.041,267.547,18.201,263.493z"
																	/>
																</g>
															</g>
														</g>
													</g>
												</svg>
												<p class="ml-2 text-md">{action}</p>
											</div>
										{/if}
									</div>
									<span class="absolute top-1 right-0 text-white text-md">${price.toFixed(2)}</span>
									<div class="max-w-md">
										<img src={image} alt={name} class="max-w-full aspect-[4/3]" />
									</div>
									<h2 class="text-base font-bold text-center">{name}</h2>
									<p class="text-base text-gray-500 mb-2 text-center">
										{#if condition}
											<p class="text-base text-gray-500 mb-2 text-center">
												{condition}
											</p>
										{/if}
									</p>
								</div>
							</li>
						{/each}
					</ul>
				</section>
			</div>
		</div>
	</div>
</div>
