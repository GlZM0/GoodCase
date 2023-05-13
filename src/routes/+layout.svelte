<script lang="ts">
	import '../app.css';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '../modules/navbar/Navbar.svelte';
	import Footer from '../modules/footer/footer.svelte';
</script>

<AppShell>
	<Navbar />

	<main class="mx-32 p-4">
		<slot />
	</main>

	<Footer />
</AppShell>
