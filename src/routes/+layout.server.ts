import type { LayoutServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const personaname = await cookies.get('personaname');
	const steamid = await cookies.get('steamid64');
	const avatar = await cookies.get('avatar');
	const balance = await cookies.get('balance');

	const userExists = !!(await prisma.user.findFirst({
		where: {
			personaname: personaname
		}
	}));

	// console.log(userExists);

	let user;
	if (userExists) {
		user = await prisma.user.findFirst({
			where: {
				personaname: personaname
			}
		});
	} else {
		console.log('user not exist/is not logged');
	}

	if (!personaname || !steamid || !avatar) {
		const logged = false;
		return {
			user: {
				logged: logged
			}
		};
	} else {
		const logged = true;
		return {
			user: {
				logged: logged,
				personaname: personaname,
				steamid: steamid,
				avatar: avatar,
				balance: user?.balance
			}
		};
	}
};
