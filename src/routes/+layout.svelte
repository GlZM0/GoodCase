<script lang="ts">
	import '../app.css';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import { AppShell, Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	let profileMenu: PopupSettings = {
		event: 'click',
		target: 'exampleMenu',
		placement: 'bottom'
	};
</script>

<AppShell>
	<header class="p-4 bg-surface-800 h-30">
		<div class="mx-32 flex justify-between">
			<div class="flex items-center">
				<img
					src="https://cdn.7tv.app/emote/6268904f4f54759b7184fa72/4x.webp"
					alt="Logo"
					class="h-16 mr-2"
				/>
				<h1 class="text-lg font-semibold">GoodCase</h1>
			</div>
			<!-- svelte-ignore` a11y-click-events-have-key-events -->
			<div class="flex items-center p-4">
				<div class="mr-4">
					<h3 class="text-lg font-medium">GIZMO</h3>
					<p class="text-sm text-gray-300">Balans: 1000 zł</p>
				</div>
				<div class="flex-shrink-0">
					<div class="relative">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- <div class="flex items-center" id="profileAvatar" use:popup={profileMenu}>
						<Avatar
							src="https://avatars.akamai.steamstatic.com/cc65b2e51c12c364fdb62d61b2232e804b4c789a_full.jpg"
							class="rounded-[14px] hover:rounded-[20px] transition-all duration-200 w-16 cursor-pointer"
						/>
						
					</div> -->
						<button class="btn variant-filled" use:popup={profileMenu}>Click</button>
						<div class="card p-4 w-72 shadow-xl" data-popup="exampleMenu">
							<!-- NOTE: Keep this wrapper, .space-y will affect the arrow -->
							<div class="space-y-4">
								<Avatar
									src="https://pbs.twimg.com/profile_images/1587479781544759297/TINbbJLC_400x400.png"
									width="w-16"
								/>
								<div>
									<p class="font-bold">Skeleton</p>
									<p class="opacity-50">@SkeletonUI</p>
								</div>
								<p>
									Skeleton is a fully featured UI component library using the power of Svelte +
									Tailwind.
								</p>
								<div class="flex gap-4">
									<small><strong>50</strong> <span class="opacity-50">Following</span></small>
									<small><strong>440</strong> <span class="opacity-50">Followers</span></small>
								</div>
								<a
									class="btn variant-soft w-full"
									href="https://twitter.com/SkeletonUI"
									target="_blank"
									rel="noreferrer"
								>
									View on Twitter
								</a>
							</div>
							<!-- Arrow -->
							<div class="arrow bg-surface-100-800-token" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</AppShell>

<main class="mx-32 p-4">
	<slot />
</main>

<footer class="p-4 bg-surface-800">
	<div class="mx-32">Hello from footer</div>
</footer>
