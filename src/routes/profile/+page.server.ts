import type { PageServerLoad } from '../$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	const steamid = cookies.get('steamid64');
	let userInventory: any;
	let userInventoryHistory: any;

	const user = await prisma.user.findUnique({
		where: {
			steamid: `${steamid}`
		}
	});

	if (!user) {
		throw new Error('User items not found');
	}

	/* USER INVENTORY HISTORY */

	const getUserInventory = async (itemIds: string[]) => {
		try {
			const itemsPromises = itemIds.map((itemId) =>
				prisma.item.findUnique({
					where: {
						id: itemId
					}
				})
			);
			const userItems = await Promise.all(itemsPromises);

			return userItems.flat();
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
	userInventory = await getUserInventory(itemIds);
	userInventoryHistory = await getUserHistoryInventory(historyItemIds);

	return {
		userInventory,
		userInventoryHistory
	};
};
