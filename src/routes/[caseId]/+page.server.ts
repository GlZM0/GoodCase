import type { Actions, PageServerLoad } from '../$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ cookies }) => {
	const cases = await prisma.case.findMany({
		include: {
			items: true
		}
	});

	const personaname = cookies.get('personaname');
	let logged = false;

	if (!personaname) {
		console.log('u need to login');
		return {
			logged,
			cases
		};
	} else {
		logged = !logged;
		return {
			logged,
			cases
		};
	}
};

export const actions: Actions = {
	open: async ({ cookies }) => {
		console.log('u need to login');
	}
};
