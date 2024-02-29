<script lang="ts">
	import UpperNavbar from './upperNavbar/UpperNavbar.svelte';
	import LowerNavbar from './lowerNavbar/LowerNavbar.svelte';
	import type { UserObj } from '../../../app';

	export let data: UserObj;
</script>

<header>
	<UpperNavbar {data} />
	<LowerNavbar />
</header>
