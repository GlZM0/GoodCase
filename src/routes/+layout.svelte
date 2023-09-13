<script lang="ts">
	import '../app.css';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/header/Navbar.svelte';
	import Footer from '$lib/footer/footer.svelte';

	export let data;
</script>

<AppShell>
	<Navbar {data} />

	<main class="mx-32 p-4">
		<slot />
	</main>

	<Footer />
</AppShell>
