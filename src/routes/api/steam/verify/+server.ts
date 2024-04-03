import { redirect, type RequestEvent } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET = async ({ url, cookies }: RequestEvent) => {
	let userExists;
	let userSteamID64: string | undefined;
	let userSteamApiKey;
	let personaname;
	let avatar;
	let profileurl;
	let bigAvatar;

	const verifyParams = url.searchParams;
	verifyParams.set('openid.mode', 'check_authentication');

	const verifyUrl = 'https://steamcommunity.com/openid/login' + '?' + verifyParams.toString();

	const responseFromSteamIsValid = await fetch(verifyUrl);
	const res = await responseFromSteamIsValid.text();

	if (res.includes('true')) {
		if (userSteamID64 !== null) {
			userSteamID64 = verifyParams.get('openid.claimed_id')?.replace(/^\D+/g, '');

			console.log('Request has been validated by OpenID, Client ID:' + userSteamID64);

			if (userSteamID64 !== undefined) {
				cookies.set('steamid64', userSteamID64, {
					path: '/',
					maxAge: 60 * 60 * 24 * 30
				});
			}
		} else {
			userSteamID64 = undefined;
		}
	} else {
		console.log('Status 408: Request timeout');
	}

	userSteamApiKey = cookies.get('apikey')?.slice(1, -1);

	const userDataLink = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${userSteamApiKey}&steamids=${userSteamID64}`;

	const responseFromSteamUserInfo = await fetch(userDataLink);

	const resp = await responseFromSteamUserInfo.text();
	const userJsonResp = JSON.parse(resp);

	const userData = userJsonResp['response']['players'][0];
	personaname = userData.personaname;
	avatar = userData.avatarmedium;
	bigAvatar = userData.avatarfull;
	profileurl = userData.profileurl;

	userExists = !!(await prisma.user.findFirst({
		where: {
			steamapikey: JSON.stringify(userSteamApiKey)
		}
	}));

	if (!userExists) {
		var clearBalance = 0;
		await prisma.user.create({
			data: {
				steamapikey: JSON.stringify(userSteamApiKey),
				steamid: userSteamID64?.toString() ?? '',
				personaname: personaname,
				profileurl: profileurl,
				avatar: avatar,
				bigAvatar: bigAvatar,
				balance: clearBalance,
				sumOfItemsPrice: 0,
				siteInventory: null,
				inventoryHistory: null
			}
		});
		cookies.set('balance', JSON.stringify(clearBalance), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});
	} else {
		const user = await prisma.user.findFirst({
			where: {
				steamid: userSteamID64
			}
		});

		cookies.set('balance', JSON.stringify(user?.balance), {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});
	}

	cookies.set('personaname', personaname, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});
	cookies.set('avatar', avatar, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, 'https://good-case.vercel.app/');
};
