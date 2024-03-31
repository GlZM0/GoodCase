import type { LayoutServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const personaname = cookies.get('personaname');
	const steamid = cookies.get('steamid64');
	const avatar = cookies.get('avatar');

	const userExists = !!(await prisma.user.findFirst({
		where: {
			personaname: personaname
		}
	}));

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
		const user = await prisma.user.findFirst({
			where: {
				steamid: steamid
			}
		});

		const logged = true;
		return {
			user: {
				steamid: steamid,
				logged: logged,
				personaname: user?.personaname,
				avatar: user?.avatar,
				bigAvatar: user?.bigAvatar,
				balance: user?.balance
			}
		};
	}
};
