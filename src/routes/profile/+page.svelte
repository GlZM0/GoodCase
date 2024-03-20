<script lang="ts">
	import type { UserObj } from '../../app';

	export let data: UserObj;

	const bigAvatar = data.user.bigAvatar;
</script>

<div class="flex">
	<div>
		<div class="py-14 pb-5">
			<h1 class="text-3xl">Your profile</h1>
		</div>
		<div>
			<img src={bigAvatar} alt="user avatar" class="w-48" />
		</div>
	</div>
</div>
