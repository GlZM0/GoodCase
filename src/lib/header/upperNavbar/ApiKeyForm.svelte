<script lang="ts">
	export let apiKey: number;
</script>

<form>
	<label for="apiKey" class="label">
		<span> Put your Steam API Key here: </span>
	</label>
	<input type="text" class="input" placeholder="API KEY" name="apikey" bind:value={apiKey} />
</form>
