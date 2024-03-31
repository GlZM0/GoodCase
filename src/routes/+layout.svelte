<script lang="ts">
	import '../app.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from './components/header/Navbar.svelte';
	import Footer from './components/footer/footer.svelte';

	export let data;
</script>

<AppShell>
	<Navbar {data} />

	<main class="bg-surface-800">
		<slot />
	</main>

	<Footer />
</AppShell>
