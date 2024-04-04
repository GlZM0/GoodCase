<script lang="ts">
	import '../app.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from './components/header/Navbar.svelte';
	import Footer from './components/footer/footer.svelte';
	import { onMount } from 'svelte';
	import { balance, items, historyItems } from '../stores';

	export let data;

	onMount(async () => {
		let userBalance = data.user.balance;
		let userInventory = data.user.userEndItems;
		let userHistoryInventory = data.user.userEndInventoryHistory;
		if (data) {
			balance.update((value) => (value = userBalance || 0));
			items.update((value) => (value = userInventory));
			historyItems.update((value) => (value = userHistoryInventory));
		}
	});
</script>

<AppShell>
	<Navbar {data} />

	<main class="bg-surface-800">
		<slot />
	</main>

	<Footer />
</AppShell>
