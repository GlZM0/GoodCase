<script lang="ts">
	import '../app.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from './components/header/Navbar.svelte';
	import Footer from './components/footer/footer.svelte';

	export let data;
</script>

<AppShell>
	<Navbar {data} />

	<main class="mx-32 p-4">
		<slot />
	</main>

	<Footer />
</AppShell>
