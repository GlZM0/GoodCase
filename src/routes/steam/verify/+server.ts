import { redirect, type RequestEvent } from '@sveltejs/kit';

export const GET = async ({ url, cookies }: RequestEvent) => {
	const verifyParams = url.searchParams;
	verifyParams.set('openid.mode', 'check_authentication');

	const verifyUrl = 'https://steamcommunity.com/openid/login' + '?' + verifyParams.toString();

	const responseFromSteamIsValid = await fetch(verifyUrl);
	const res = await responseFromSteamIsValid.text();

	let userSteamID64: any;
	if (res.includes('true')) {
		userSteamID64 = verifyParams.get('openid.claimed_id')?.replace(/^\D+/g, '');
		console.log('Request has been validated by OpenID, Client ID:' + userSteamID64);

		cookies.set('steamid64', userSteamID64, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});
	} else {
		console.log('Status 408: Request timeout');
	}

	const userSteamApiKey = '2FF10F7E7396BCFA996099E1A39777A8';
	const userDataLink = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${userSteamApiKey}&steamids=${userSteamID64}`;

	const responseFromSteamUserInfo = await fetch(userDataLink);
	const resp = await responseFromSteamUserInfo.text();
	const userJsonResp = JSON.parse(resp);

	const userData = userJsonResp['response']['players'][0];
	const personaname = userData.personaname;
	const avatar = userData.avatarmedium;

	cookies.set('personaname', personaname, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});
	cookies.set('avatar', avatar, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, 'http://localhost:5173');
};
