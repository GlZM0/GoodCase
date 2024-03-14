import type { Item } from '../../../app';
import type { RequestEvent } from './$types';
import { shuffleCase } from './CaseShuffler';
import { OpenCase } from './OpenCase';
import { putWinnerItemIntoPlace } from './PutWinnerItem';
import prisma from '$lib/prisma';
import type { SiteInventory } from '../../../app';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const data = await request.json();

		let newBalance = data.user.balance - data.cases.price;

		const updateUserBalance = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				balance: newBalance
			}
		});

		let shuffledItems = shuffleCase(data.cases.items as Item[]);

		const openSystem = new OpenCase(0, 100, data.cases);

		openSystem.openCase();
		const winnerName = openSystem.getWinnerName();
		const winnerPrice = openSystem.getWinnerPrice();
		const winnerImage = openSystem.getWinnerImage();
		const winnerColor = openSystem.getWinnerColor();
		const winnerCondition = openSystem.getWinnerCondition();
		const winnerId = openSystem.getWinnerId();

		putWinnerItemIntoPlace(
			shuffledItems,
			winnerName,
			winnerImage,
			winnerPrice,
			winnerColor,
			winnerCondition
		);

		const responseBody = {
			winnerName: winnerName,
			winnerPrice: winnerPrice,
			winnerImage: winnerImage,
			winnerColor: winnerColor,
			winnerCondition: winnerCondition
		};

		const user = await prisma.user.findUnique({
			where: {
				steamid: `${data.user.steamid}`
			}
		});
		//TODO: faster database update, parallel animation to backend
		const userInventory: any = user?.siteInventory;

		let updatedInventory;

		if (Array.isArray(userInventory)) {
			updatedInventory = [...userInventory, winnerId];
		} else {
			updatedInventory = [winnerId];
		}
		console.log(updatedInventory);

		const updateUserInventory = prisma.user.update({
			where: {
				steamid: `${data.user.steamid}`
			},
			data: {
				siteInventory: updatedInventory
			}
		});

		await Promise.all([updateUserBalance, updateUserInventory]);

		const headers = {
			'Content-Type': 'application/json'
		};

		return new Response(await JSON.stringify(responseBody), {
			status: 200,
			headers
		});
	} catch (error) {
		console.error('Error handling incoming request', error);
		return new Response(await JSON.stringify({ error: 'Internal server error.' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
