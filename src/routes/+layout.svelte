<script lang="ts">
	import '../app.css';
	import { AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import Navbar from './components/header/Navbar.svelte';
	import Footer from './components/footer/footer.svelte';
	import { onMount } from 'svelte';
	import { balance } from '../stores';

	export let data;
	initializeStores();

	onMount(async () => {
		let userBalance = data.user.balance;
		if (data) {
			balance.update((value) => (value = userBalance || 0));
		}
	});
</script>

<Toast />
<AppShell>
	<Navbar {data} />

	<main class="bg-surface-800">
		<slot />
	</main>

	<Footer />
</AppShell>
