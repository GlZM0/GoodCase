<script>
	// @ts-nocheck

	import ColorCases from '../modules/cases/colorCases/ColorCases.svelte';
	import CsgoCases from '../modules/cases/csgoCases/CsgoCases.svelte';
	import FiftyCases from '../modules/cases/fiftyCases/FiftyCases.svelte';

	export let data;
</script>

<ColorCases prop={data} />

<CsgoCases />

<FiftyCases />
