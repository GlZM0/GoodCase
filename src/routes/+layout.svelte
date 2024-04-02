<script lang="ts">
	import '../app.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from './components/header/Navbar.svelte';
	import Footer from './components/footer/footer.svelte';
	import { onMount } from 'svelte';
	import { balance } from '../stores';

	export let data;

	onMount(async () => {
		let userBalance = data.user.balance;
		if (data) balance.update((value) => (value = data.user.balance || 0));
	});
</script>

<AppShell>
	<Navbar {data} />

	<main class="bg-surface-800">
		<slot />
	</main>

	<Footer />
</AppShell>
