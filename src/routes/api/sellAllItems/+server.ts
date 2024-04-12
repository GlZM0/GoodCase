import prisma from '$lib/prisma';

export const POST = async ({ cookies }) => {
	try {
		const steamid = cookies.get('steamid64');
		let updatedInventoryHistory;
		let newBalance;
		let updatedUser;
		let userInventory;
		let userInventoryHistory;

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

			updatedUser = await prisma.user.update({
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

			const getUserInventory = async (itemIds: string[]) => {
				try {
					const userItems = await prisma.item.findMany({
						where: {
							id: { in: itemIds }
						}
					});

					return userItems;
				} catch (error) {
					console.error('Error fetching item data:', error);
					throw error;
				}
			};

			const getUserHistoryInventory = async (itemData: any) => {
				try {
					const itemsWithAction = [];

					for (const item of itemData) {
						const itemId = item.itemId;
						const action = item.action;

						const foundItem = await prisma.item.findUnique({ where: { id: itemId } });

						if (foundItem) {
							const itemWithAction = { ...foundItem, action: action };
							itemsWithAction.push(itemWithAction);
						}
					}
					return itemsWithAction;
				} catch (error) {
					console.error(error);
				}
			};

			const itemIds: string[] = user.siteInventory as string[];
			const historyItemIds: any = user.inventoryHistory;
			if (itemIds != undefined || historyItemIds != undefined) {
				userInventory = await getUserInventory(itemIds);
				userInventoryHistory = await getUserHistoryInventory(updatedInventoryHistory);
			}
		}

		const responseData = {
			user: {
				newBalance: newBalance,
				siteInventory: userInventory,
				inventoryHistory: userInventoryHistory
			}
		};

		return new Response(JSON.stringify(responseData), {
			status: 200
		});
	} catch (error) {
		console.error(error);
	}
};
