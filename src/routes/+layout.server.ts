import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const personaname = await cookies.get('personaname');
	const steamid = await cookies.get('steamid64');
	const avatar = await cookies.get('avatar');

	if (!personaname || !steamid || !avatar) {
		const logged = false;
		return {
			user: {
				logged: logged
			}
		};
	} else {
		const logged = true;
		console.log(personaname);
		return {
			user: {
				logged: logged,
				personaname: personaname,
				steamid: steamid,
				avatar: avatar
			}
		};
	}
};
