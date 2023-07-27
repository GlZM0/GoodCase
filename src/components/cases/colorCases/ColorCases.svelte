<script lang="ts">
	export let prop;
	const myCase = prop.myCase;
</script>

<div>
	<h2 class="py-14">COLOR CASES</h2>
	<div class="grid grid-cols-5">
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/" class="!no-underline"
				><img src={myCase.image} alt={myCase.alt} />
				<div>
					<h4 class="flex text-white items-center justify-center pt-8">{myCase.name}</h4>
				</div>
				<div>
					<a
						href={myCase.link}
						class="!no-underline flex !text-white items-center justify-center pt-4 border-solid border-blue-600 border-2 rounded-full"
						>{myCase.price} PLN</a
					>
				</div>
			</a>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/60a3d30a395fa4a6e63252f04325de4c91ffc095.png"
					alt="restricted-case"
				/></a
			>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/3b093de47d224a0490b98c628d48dc362b53ee79.png"
					alt="classified-case"
				/></a
			>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/1b22c8b86430986063b1c18f3e9360e94e79206e.png"
					alt="covert-case"
				/></a
			>
		</div>
		<div class="flex w-64 h-64 items-center justify-center">
			<a href="/"
				><img
					src="https://csgocases.com/uploads/gallery/oryginal/ba688495e129493a89c550b86221a884a6c2089a.png"
					alt="knife-case"
				/></a
			>
		</div>
	</div>
</div>
