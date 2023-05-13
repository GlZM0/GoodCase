<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let exampleMenu: PopupSettings = {
		event: 'click',
		target: 'exampleMenu',
		placement: 'bottom'
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
				<h3 class="text-lg font-medium">GIZMO</h3>
				<p class="text-sm text-gray-300">Balans: 1000 zł</p>
			</div>
			<div class="flex-shrink-0">
				<div class="relative">
					<img
						src="https://avatars.akamai.steamstatic.com/cc65b2e51c12c364fdb62d61b2232e804b4c789a_full.jpg"
						class="rounded-[14px] hover:rounded-[20px] transition-all duration-200 w-16 cursor-pointer"
						alt="avatar"
						use:popup={exampleMenu}
					/>
					<div class="card p-4 w-44 shadow-xl" data-popup="exampleMenu">
						<!-- NOTE: Keep this wrapper, .space-y will affect the arrow -->
						<div class="space-y-4">
							<div>
								<p class="font-bold text-white"><a href="/" class="no-underline">Profile</a></p>
								<p class="font-bold"><a href="../upgrader" class="no-underline">Upgrader</a></p>
								<p class="font-bold text-white">
									<a href="../login" class="no-underline">LOGIN</a>
								</p>
							</div>
						</div>
						<!-- Arrow -->
						<div class="arrow bg-surface-100-800-token" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
