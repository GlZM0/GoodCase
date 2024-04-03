<script>
	import ColorCases from '$lib/cases/colorCases/ColorCases.svelte';
	import CsgoCases from '$lib/cases/csgoCases/CsgoCases.svelte';
	import FiftyCases from '$lib/cases/fiftyCases/FiftyCases.svelte';

	export let data;
	const cases = data.cases;
</script>

<section class="mx-32">
	<ColorCases {cases} />

	<CsgoCases {cases} />

	<FiftyCases />
</section>
