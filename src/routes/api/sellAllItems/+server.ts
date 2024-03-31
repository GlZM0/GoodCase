import prisma from '$lib/prisma';

export const POST = async ({ cookies }) => {
	const steamid = cookies.get('steamid64');
	let updatedInventoryHistory;

	const user = await prisma.user.findUnique({
		where: {
			steamid: `${steamid}`
		},
		select: {
			balance: true,
			sumOfItemsPrice: true,
			siteInventory: true,
			inventoryHistory: true
		}
	});

	if (user) {
		let newBalance;
		if (user.sumOfItemsPrice) {
			newBalance = user.balance + user.sumOfItemsPrice || 0;
		}

		const siteInventory: any = user.siteInventory;
		const inventoryHistory = user.inventoryHistory;

		const itemsWithSellData = siteInventory.map((itemId: any) => ({
			itemId: itemId,
			action: 'sold'
		}));

		if (Array.isArray(inventoryHistory)) {
			updatedInventoryHistory = [...itemsWithSellData, ...inventoryHistory];
		} else {
			updatedInventoryHistory = [itemsWithSellData];
		}

		console.log(updatedInventoryHistory);

		const updatedUser = await prisma.user.update({
			where: {
				steamid: `${steamid}`
			},
			data: {
				balance: newBalance,
				sumOfItemsPrice: 0,
				siteInventory: [],
				inventoryHistory: updatedInventoryHistory
			}
		});
	}

	return new Response('ELO', {
		status: 200
	});
};
