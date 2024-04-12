<script>
	import ColorCases from '$lib/cases/colorCases/ColorCases.svelte';
	import LegendaryCases from '$lib/cases/LegendaryCases/LegendaryCases.svelte';
	import WeaponCases from '$lib/cases/WeaponCases/WeaponCases.svelte';
	import { onMount } from 'svelte';
	import { historyItems, items } from '../stores';

	export let data;
	const cases = data.cases;
</script>

<section class="mx-32">
	<ColorCases {cases} />

	<LegendaryCases {cases} />

	<WeaponCases {cases} />
</section>
