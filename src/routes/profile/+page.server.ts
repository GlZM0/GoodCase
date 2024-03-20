import type { PageServerLoad } from '../$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	const steamid = await cookies.get('steamid64');

	const items = await prisma.user.findMany({
		where: {
			steamid: `${steamid}`
		},
		select: {
			siteInventory: true
		}
	});

	if (!items) throw new Error('Items not found');

	const itemIds: string[] = items[0].siteInventory as string[];

	return {
		items
	};
};
