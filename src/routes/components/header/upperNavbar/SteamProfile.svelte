<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	export let data: any;

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let exampleMenu: PopupSettings = {
		event: 'click',
		target: 'exampleMenu',
		placement: 'bottom'
	};
</script>

<div class="flex-shrink-0">
	<div class="relative">
		{#await data}
			<p>... waiting</p>
		{:then data}
			<img
				src={data.user.avatar}
				class="rounded-[14px] hover:rounded-[20px] transition-all duration-200 w-16 cursor-pointer"
				alt="your avatar"
				use:popup={exampleMenu}
			/>
			<div class="card p-4 w-44 shadow-xl" data-popup="exampleMenu">
				<!-- NOTE: Keep this wrapper, .space-y will affect the arrow -->
				<div class="space-y-4">
					<div>
						<p class="font-bold text-white"><a href="/" class="no-underline">Profile</a></p>
						<p class="font-bold"><a href="../../../upgrader" class="no-underline">Upgrader</a></p>
						<form action="?/logout" method="POST">
							<button><p class="font-bold">LOG OUT</p></button>
						</form>
					</div>
				</div>
				<!-- Arrow -->
				<div class="arrow bg-surface-100-800-token" />
			</div>
		{/await}
	</div>
</div>
