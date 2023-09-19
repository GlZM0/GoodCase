<script lang="ts">
	import SteamProfile from './SteamProfile.svelte';
	import Modal from './Modal.svelte';
	import { showModal } from '../../../../stores';
	import { steamLogin } from '$routes/api/steam/signin/+server';

	export let data: any;

	const isLogged = data.user.logged;

	const isApiKey = () => {
		if (localStorage.getItem('apikey')) {
			steamLogin();
		} else {
			showModal.set(true);
		}
	};
</script>

<div class="p-4 bg-surface-800 h-30">
	<div class="mx-32 flex justify-between">
		<div class="flex items-center">
			<a href="/" class="!no-underline !text-white !flex !text-center !items-center"
				><img
					src="https://cdn.7tv.app/emote/6268904f4f54759b7184fa72/4x.webp"
					alt="Logo"
					class="h-16 mr-2"
				/>
				<span><h1 class="text-lg font-semibold">GoodCase</h1></span>
			</a>
		</div>
		<!-- svelte-ignore` a11y-click-events-have-key-events -->
		<div class="flex items-center p-4">
			<div class="mr-4">
				{#if isLogged}
					<SteamProfile {data} />
				{:else}
					<button on:click={isApiKey}>
						<div
							class="flex justify-center items-center space-x-2 bg-gray-700 p-4 rounded-3xl border-2 border-gray-300 transition-transform duration-250 scale-100 hover:scale-90 active:scale-100"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-14" viewBox="0 0 496 512"
								><path
									d="M496 256c0 137-111.2 248-248.4 248-113.8 0-209.6-76.3-239-180.4l95.2 39.3c6.4 32.1 34.9 56.4 68.9 56.4 39.2 0 71.9-32.4 70.2-73.5l84.5-60.2c52.1 1.3 95.8-40.9 95.8-93.5 0-51.6-42-93.5-93.7-93.5s-93.7 42-93.7 93.5v1.2L176.6 279c-15.5-.9-30.7 3.4-43.5 12.1L0 236.1C10.2 108.4 117.1 8 247.6 8 384.8 8 496 119 496 256zM155.7 384.3l-30.5-12.6a52.79 52.79 0 0 0 27.2 25.8c26.9 11.2 57.8-1.6 69-28.4 5.4-13 5.5-27.3.1-40.3-5.4-13-15.5-23.2-28.5-28.6-12.9-5.4-26.7-5.2-38.9-.6l31.5 13c19.8 8.2 29.2 30.9 20.9 50.7-8.3 19.9-31 29.2-50.8 21zm173.8-129.9c-34.4 0-62.4-28-62.4-62.3s28-62.3 62.4-62.3 62.4 28 62.4 62.3-27.9 62.3-62.4 62.3zm.1-15.6c25.9 0 46.9-21 46.9-46.8 0-25.9-21-46.8-46.9-46.8s-46.9 21-46.9 46.8c.1 25.8 21.1 46.8 46.9 46.8z"
								/></svg
							>
							<div class="text-gray-300">Sign in through Steam</div>
						</div>
					</button>
					<Modal />
				{/if}
			</div>
		</div>
	</div>
</div>
