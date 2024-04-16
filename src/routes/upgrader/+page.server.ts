import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const steamid = cookies.get('steamid64');
		let userInventory: any;

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

			const itemIds: string[] = user.siteInventory as string[];
			if (itemIds != undefined) {
				userInventory = await getUserInventory(itemIds);
			}
		}

		const items = await prisma.item.findMany({
			where: {
				OR: [
					{ type: { contains: 'Rifle' } },
					{ type: { contains: 'Pistol' } },
					{ type: { contains: 'SMG' } },
					{ type: { contains: 'Shotgun' } },
					{ type: { contains: 'Agent' } }
				],
				NOT: [{ name: { contains: 'Souvenir' } }, { name: { contains: 'StatTrak' } }]
			},
			take: 24,
			orderBy: {
				price: 'asc'
			}
		});

		return {
			userInventory: userInventory,
			items: items
		};
	} catch (error) {
		console.error(error);

		return {
			userInventory: [],
			items: []
		};
	}
};
