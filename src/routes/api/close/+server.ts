import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();
		let updatedInventory;
		let winnerId = data.winnerItem.winnerId;

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

		const updateUserInventory = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				siteInventory: updatedInventory
			}
		});

		await Promise.all([updateUserInventory]);

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
