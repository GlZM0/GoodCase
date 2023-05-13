<script>
	import { onMount } from 'svelte';

	/**
	 * @type {any[]}
	 */
	let skins = [];

	onMount(async () => {
		const response = await fetch('https://bymykel.github.io/CSGO-API/api/en/skins.json');
		skins = await response.json();
		console.log(skins);
	});
</script>

{#each skins as skin (skin.id)}
	{#if skin.weapon == 'MAC-10'}
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<div class="columns-3">
			<h5>
				<img src={skin.image} alt="Skin image" />
				{skin.name}
			</h5>
		</div>
	{/if}
{/each}
