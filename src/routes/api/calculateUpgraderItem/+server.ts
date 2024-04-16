import type { RequestEvent } from './$types';
import prisma from '$lib/prisma';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();

		let findPrice: number = data.itemData.price * 1.15;

		const items = await prisma.item.findMany({
			where: {
				price: {
					gt: findPrice
				},
				OR: [
					{ type: { contains: 'Rifle' } },
					{ type: { contains: 'Pistol' } },
					{ type: { contains: 'SMG' } },
					{ type: { contains: 'Shotgun' } },
					{ type: { contains: 'Agent' } }
				],
				NOT: [{ name: { contains: 'Souvenir' } }, { name: { contains: 'StatTrak' } }]
			},
			take: 100,
			orderBy: {
				price: 'asc'
			}
		});

		const responseData = {
			items: items
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
