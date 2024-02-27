<script>
	// @ts-nocheck

	import ColorCases from '$lib/cases/colorCases/ColorCases.svelte';
	import CsgoCases from '$lib/cases/csgoCases/CsgoCases.svelte';
	import FiftyCases from '$lib/cases/fiftyCases/FiftyCases.svelte';

	export let data;
	const cases = data.cases;
</script>

<ColorCases {cases} />

<CsgoCases />

<FiftyCases />
