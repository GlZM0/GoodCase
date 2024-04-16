import type { RequestEvent } from './$types';
import { calculateWin } from './WinCalculator';
import prisma from '$lib/prisma';

export const POST = async ({ request, cookies }: RequestEvent) => {
	try {
		const data = await request.json();
		const steamid = cookies.get('steamid64');

		let updatedInventoryHistory;
		let filteredInv: any;
		let updatedUserInventory;
		let userInventory;
		let balance;

		let responseData;

		let pickedUserItem = data.itemData.selectedUserItem;
		let winnerItem = data.itemData.selectedWinnerItem;

		let calculatorData = calculateWin(data);

		const user = await prisma.user.findUnique({
			where: {
				steamid: `${steamid}`
			}
		});

		if (calculatorData.won) {
			const upgradedData = {
				itemId: pickedUserItem.id,
				action: 'upgraded'
			};

			const userInventoryHistory: any = user?.inventoryHistory;

			if (Array.isArray(userInventoryHistory)) {
				updatedInventoryHistory = [upgradedData, ...userInventoryHistory];
			} else {
				updatedInventoryHistory = [upgradedData];
			}

			const userActualInv: any = user?.siteInventory;

			if (Array.isArray(userActualInv)) {
				filteredInv = userActualInv.filter((item) => item !== upgradedData.itemId);
				updatedUserInventory = [winnerItem.id, ...filteredInv];
			} else {
				console.log('userActualInv is not an array');
			}

			let sumOfItemsPrice: any = user?.sumOfItemsPrice;
			sumOfItemsPrice = sumOfItemsPrice - pickedUserItem.price + winnerItem.price;

			const updateUser = await prisma.user.update({
				where: {
					steamid: `${steamid}`
				},
				data: {
					inventoryHistory: updatedInventoryHistory,
					siteInventory: updatedUserInventory,
					sumOfItemsPrice: sumOfItemsPrice
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

			if (updatedUserInventory) {
				userInventory = await getUserInventory(updatedUserInventory);
			}

			responseData = {
				won: calculatorData.won,
				winnerPercentage: calculatorData.winnerPercentageNumber,
				siteInventory: userInventory
			};
		} else {
			const upgradedData = {
				itemId: pickedUserItem.id,
				action: 'upgraded'
			};

			const userInventoryHistory: any = user?.inventoryHistory;

			if (Array.isArray(userInventoryHistory)) {
				updatedInventoryHistory = [upgradedData, ...userInventoryHistory];
			} else {
				updatedInventoryHistory = [upgradedData];
			}

			const userActualInv: any = user?.siteInventory;

			if (Array.isArray(userActualInv)) {
				filteredInv = userActualInv.filter((item) => item !== upgradedData.itemId);
				updatedUserInventory = [...filteredInv];
			} else {
				console.log('userActualInv is not an array');
			}

			let sumOfItemsPrice: any = user?.sumOfItemsPrice;
			sumOfItemsPrice = sumOfItemsPrice - pickedUserItem.price;
			let cashback = pickedUserItem.price * 0.02;
			if (user) balance = user?.balance + cashback;

			const updateUser = await prisma.user.update({
				where: {
					steamid: `${steamid}`
				},
				data: {
					inventoryHistory: updatedInventoryHistory,
					siteInventory: updatedUserInventory,
					sumOfItemsPrice: sumOfItemsPrice,
					balance: balance
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

			if (updatedUserInventory) {
				userInventory = await getUserInventory(updatedUserInventory);
			}

			responseData = {
				won: calculatorData.won,
				winnerPercentage: calculatorData.winnerPercentageNumber,
				siteInventory: userInventory,
				cashback: cashback
			};
		}

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
