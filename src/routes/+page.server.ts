import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const cases = await prisma.case.findMany({
		include: {
			items: true
		}
	});

	return {
		cases
	};
};
