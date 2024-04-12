import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const steamid = cookies.get('steamid64');
		let userInventory: any;
		let userInventoryHistory: any;

		const user = await prisma.user.findFirst({
			where: {
				steamid: `${steamid}`
			}
		});

		if (user) {
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
				userInventoryHistory = await getUserHistoryInventory(historyItemIds);
			}
		}

		return {
			inventories: {
				userInventory: userInventory,
				userInventoryHistory: userInventoryHistory
			}
		};
	} catch (error) {
		console.error(error);

		return {
			inventories: {
				userInventory: [],
				userInventoryHistory: []
			}
		};
	}
};
