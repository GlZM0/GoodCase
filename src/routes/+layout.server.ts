import type { LayoutServerLoad } from './$types';
import prisma from '$lib/prisma';
import { balance, items } from '../stores';
import { get } from 'svelte/store';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const personaname = cookies.get('personaname');
	const steamid = cookies.get('steamid64');
	const avatar = cookies.get('avatar');
	let userInventory: any;
	let userInventoryHistory: any;

	const userExists = !!(await prisma.user.findFirst({
		where: {
			personaname: personaname
		}
	}));

	let user;
	if (userExists) {
		user = await prisma.user.findFirst({
			where: {
				personaname: personaname
			}
		});
	} else {
		console.log('user not exist/is not logged');
	}

	if (!personaname || !steamid || !avatar) {
		const logged = false;
		return {
			user: {
				logged: logged
			}
		};
	} else {
		const user = await prisma.user.findFirst({
			where: {
				steamid: steamid
			}
		});

		if (user) {
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
			if (itemIds != null || historyItemIds != null) {
				userInventory = await getUserInventory(itemIds);
				userInventoryHistory = await getUserHistoryInventory(historyItemIds);
			}
		}

		const logged = true;
		return {
			user: {
				steamid: steamid,
				logged: logged,
				personaname: user?.personaname,
				avatar: user?.avatar,
				bigAvatar: user?.bigAvatar,
				balance: user?.balance,
				siteInventory: userInventory,
				inventoryHistory: userInventoryHistory
			}
		};
	}
};
