import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
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
	signin: async ({ request, cookies }) => {
		let data = await request.formData();
		const apikey = data.get('apikey');

		cookies.set('apikey', JSON.stringify(apikey), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		return {
			success: true
		};
	},
	logout: async ({ cookies }) => {
		cookies.delete('personaname');
		cookies.delete('avatar');
		cookies.delete('steamid64');
		cookies.delete('balance');

		return {
			success: true
		};
	}
};
