import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
	const verifyParams = url.searchParams;
	verifyParams.set('openid.mode', 'check_authentication');

	const verifyUrl = 'https://steamcommunity.com/openid/login' + '?' + verifyParams.toString();

	const responseFromSteamIsValid = await fetch(verifyUrl);
	const res = await responseFromSteamIsValid.text();

	let userSteamID64;
	if (res.includes('true')) {
		userSteamID64 = verifyParams.get('openid.claimed_id')?.replace(/^\D+/g, '');
		console.log('Request has been validated by OpenID, Client ID:' + userSteamID64);
	} else {
		console.log('Status 408: Request timeout');
	}

	const userSteamApiKey = 'YOUR_STEAM_API_KEY';
	const userDataLink = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${userSteamApiKey}&steamids=${userSteamID64}`;

	const responseFromSteamUserInfo = await fetch(userDataLink);
	const resp = await responseFromSteamUserInfo.text();
	const userJsonResp = JSON.parse(resp);

	const userData = userJsonResp['response']['players'][0];
	const steamID = userData.steamid;
	const name = userData.personaname;
	const avatar = userData.avatarmedium;

	cookies.set('steamID', steamID, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});
	cookies.set('name', name, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});
	cookies.set('avatar', avatar, {
		path: '/',
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, 'http://localhost:5173');
};
