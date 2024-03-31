import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();
		let updatedInventory;
		let winnerId = data.winnerItem.winnerId;
		let winnerPrice = data.winnerItem.winnerPrice;

		const user = await prisma.user.findUnique({
			where: {
				steamid: `${data.user.steamid}`
			}
		});

		const userInventory: any = user?.siteInventory || [];

		if (Array.isArray(userInventory)) {
			updatedInventory = [winnerId, ...userInventory];
		} else {
			updatedInventory = [winnerId];
		}

		let userSumOfItemsPrice: any = user?.sumOfItemsPrice;
		let newSum = userSumOfItemsPrice + winnerPrice;

		const updateUserData = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				siteInventory: updatedInventory,
				sumOfItemsPrice: newSum
			}
		});

		await Promise.all([updateUserData]);

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
