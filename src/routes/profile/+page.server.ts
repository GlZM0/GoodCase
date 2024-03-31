import type { PageServerLoad } from '../$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	const steamid = cookies.get('steamid64');

	const userItems = await prisma.user.findUnique({
		where: {
			steamid: `${steamid}`
		},
		select: {
			siteInventory: true,
			inventoryHistory: true
		}
	});

	if (!userItems) {
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
					const itemWithAction = { ...foundItem, action: action };
					itemsWithAction.push(itemWithAction);
				}
			}
			return itemsWithAction;
		} catch (error) {
			console.error(error);
		}
	};

	/* USER INVENTORY */

	const itemIds: string[] = userItems.siteInventory as string[];

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

	/* END */

	const historyIdAction: any = userItems.inventoryHistory;
	const userHistory = await getUserHistoryInventory(historyIdAction);
	const userActualItems = await getUserInventory(itemIds);

	return {
		userActualItems,
		userHistory
	};
};
