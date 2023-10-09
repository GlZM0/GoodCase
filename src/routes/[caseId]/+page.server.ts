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
		let balance = cookies.get('balance');
		const personaname = cookies.get('personaname');
		await prisma.user.update({
			where: {
				personaname: personaname
			},
			data: {
				balance: 150
			}
		});
	}
};
