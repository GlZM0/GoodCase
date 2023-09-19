<script lang="ts">
	import UpperNavbar from './upperNavbar/UpperNavbar.svelte';
	import LowerNavbar from './lowerNavbar/LowerNavbar.svelte';

	export let data: any;
</script>

<header>
	<UpperNavbar {data} />
	<LowerNavbar />
</header>
