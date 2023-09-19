<script>
	// @ts-nocheck

	import ColorCases from '$lib/cases/colorCases/ColorCases.svelte';
	import CsgoCases from '$lib/cases/csgoCases/CsgoCases.svelte';
	import FiftyCases from '$lib/cases/fiftyCases/FiftyCases.svelte';

	export let data;

	// if (form?.success) {
	// 	console.log('success');
	// }
</script>

<ColorCases {data} />

<CsgoCases />

<FiftyCases />
