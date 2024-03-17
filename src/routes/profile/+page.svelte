<script lang="ts">
	import type { UserObj } from '../../app';

	export let data: UserObj;
</script>

<div class="flex px-20">
	<div>
		<div class="pt-10 pb-5">
			<h1 class="text-4xl">Your profile</h1>
		</div>
		<div>
			<img src={data.user.avatar} alt="user avatar" class="w-48" />
		</div>
	</div>
</div>
