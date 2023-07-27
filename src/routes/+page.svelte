<script>
	// @ts-nocheck

	import ColorCases from '../components/cases/colorCases/ColorCases.svelte';
	import CsgoCases from '../components/cases/csgoCases/CsgoCases.svelte';
	import FiftyCases from '../components/cases/fiftyCases/FiftyCases.svelte';

	export let data;
</script>

<ColorCases prop={data} />

<CsgoCases />

<FiftyCases />
