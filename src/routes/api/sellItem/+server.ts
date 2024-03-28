import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();
		let updatedBalance: number;
		let updatedInventoryHistory;
		let winnerPrice = data.winnerData.winnerPrice;

		const user = await prisma.user.findUnique({
			where: {
				steamid: `${data.user.steamid}`
			}
		});

		const sellData = {
			itemId: data.winnerData.winnerId,
			action: 'sold'
		};

		const userInventoryHistory: any = user?.inventoryHistory;

		if (Array.isArray(userInventoryHistory)) {
			updatedInventoryHistory = [sellData, ...userInventoryHistory];
		} else {
			updatedInventoryHistory = [sellData];
		}

		const userBalance: number | undefined = user?.balance;

		updatedBalance = userBalance + winnerPrice;

		const updateUser = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				balance: updatedBalance,
				inventoryHistory: updatedInventoryHistory
			}
		});

		await Promise.all([updateUser]);

		const headers = {
			'Content-Type': 'application/json'
		};

		return new Response(await JSON.stringify(data), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error(error);
	}
};
