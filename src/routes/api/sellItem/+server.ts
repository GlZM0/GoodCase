import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();
		let updatedBalance;
		let winnerPrice = data.winnerPrice;

		const user = await prisma.user.findUnique({
			where: {
				steamid: `${data.user.steamid}`
			}
		});

		const userBalance: number | undefined = user?.balance;

		updatedBalance = (userBalance + winnerPrice).toFixed(2);
		console.log(updatedBalance);

		const updateUserBalance = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				balance: updatedBalance
			}
		});

		await Promise.all([updateUserBalance]);

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
