import type { PageServerLoad } from '../$types';
import prisma from '$lib/prisma';

interface InventoryItem {
	itemId: string;
	action: string;
}

export const load: PageServerLoad = async ({ cookies }) => {
	const steamid = await cookies.get('steamid64');

	const userItemIds = await prisma.user.findMany({
		where: {
			steamid: `${steamid}`
		},
		select: {
			siteInventory: true
		}
	});

	const userInventoryHistory = await prisma.user.findMany({
		where: {
			steamid: `${steamid}`
		},
		select: {
			inventoryHistory: true
		}
	});

	if (!userItemIds || userItemIds.length === 0) {
		throw new Error('User items not found');
	}

	/* USER INVENTORY HISTORY */

	const getUserHistoryInventory = async (itemData: any) => {
		try {
			const itemsWithAction = [];

			for (const item of itemData) {
				const itemId = item.itemId;
				const action = item.action;

				const foundItem = await prisma.item.findUnique({ where: { id: itemId } });

				if (foundItem) {
					// Create an action field and append it to the found item
					const itemWithAction = { ...foundItem, action: action };
					itemsWithAction.push(itemWithAction);
				}
			}

			console.log('Items with action retrieved successfully:', itemsWithAction);
			return itemsWithAction;
		} catch (error) {
			console.error(error);
		}
	};

	/* USER INVENTORY */

	const itemIds: string[] = userItemIds[0].siteInventory as string[];

	const getUserInventory = async (itemIds: string[]) => {
		try {
			const itemsPromises = itemIds.map((itemId) =>
				prisma.item.findMany({
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

	/* END */

	const historyIdAction: any = userInventoryHistory[0].inventoryHistory;
	const userHistory = await getUserHistoryInventory(historyIdAction);
	const userItems = await getUserInventory(itemIds);

	return {
		userItems,
		userHistory
	};
};
