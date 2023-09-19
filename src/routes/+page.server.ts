import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { steamLogin } from './api/steam/signin/+server';

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
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const apikey = data.get('apikey');

		// try {
		// 	await prisma.user.findFirst({
		// 		where: {
		// 			steamid: apikey
		// 		}
		// 	})
		// }

		cookies.set('apikey', JSON.stringify(apikey), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		console.log(apikey);

		return {
			success: true
		};
	}
};
