import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();
		let updatedBalance: number;
		let updatedInventoryHistory;
		let price = data.itemData.itemPrice;
		let userInv: any;
		let userInvHistory: any;
		let filteredInv: any;
		let newSumPriceOfItems: any;

		const user = await prisma.user.findUnique({
			where: {
				steamid: `${data.user.steamid}`
			}
		});

		const sellData = {
			itemId: data.itemData.itemId,
			action: 'sold'
		};

		const userInventoryHistory: any = user?.inventoryHistory;

		if (Array.isArray(userInventoryHistory)) {
			updatedInventoryHistory = [sellData, ...userInventoryHistory];
		} else {
			updatedInventoryHistory = [sellData];
		}

		const userActualInv: any = user?.siteInventory;

		if (Array.isArray(userActualInv)) {
			filteredInv = userActualInv.filter((item) => item !== sellData.itemId);
		} else {
			console.log('userActualInv is not an array');
		}

		const userBalance: number | undefined = user?.balance;

		updatedBalance = userBalance + price;

		if (user) {
			if (user.sumOfItemsPrice != null) newSumPriceOfItems = user.sumOfItemsPrice - price;

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
				userInv = await getUserInventory(filteredInv);
				userInvHistory = await getUserHistoryInventory(updatedInventoryHistory);
			}
		}

		const updateUser = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				balance: updatedBalance,
				sumOfItemsPrice: newSumPriceOfItems,
				siteInventory: filteredInv,
				inventoryHistory: updatedInventoryHistory
			}
		});

		await Promise.all([updateUser]);

		const responseData = {
			...data,
			updatedBalance: updatedBalance,
			sumOfItemsPrice: newSumPriceOfItems,
			siteInventory: userInv,
			userInventoryHistory: userInvHistory
		};

		const headers = {
			'Content-Type': 'application/json'
		};

		return new Response(JSON.stringify(responseData), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error(error);
	}
};
