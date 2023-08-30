import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const name = event.cookies.get('name');

	if (!name) {
		return await resolve(event);
	}
	console.log(name);

	return await resolve(event);
};
