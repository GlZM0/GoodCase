import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Case } from '../app';

export const load: PageServerLoad = async ({ cookies }) => {
	const steamid = cookies.get('steamid64');
	let userInventory: any;
	let userInventoryHistory: any;

	const cases: Case = await prisma.case.findMany({
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
		cookies.delete('personaname', { path: '/' });
		cookies.delete('avatar', { path: '/' });
		cookies.delete('steamid64', { path: '/' });
		cookies.delete('balance', { path: '/' });
		cookies.delete('apikey', { path: '/' });

		return {
			success: true
		};
	}
};
