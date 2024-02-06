import type { Actions, PageServerLoad } from '../$types';
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

export const actions: Actions = {
	open: async ({ cookies }) => {
		const personaname = cookies.get('personaname');

		if (!personaname) {
			console.log('u need to login');
		} else {
		}
	}
};
