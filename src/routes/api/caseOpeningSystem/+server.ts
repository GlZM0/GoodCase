import type { Item } from '../../../app';
import type { RequestEvent } from './$types';
import { shuffleCase } from './CaseShuffler';
import { OpenCase } from './OpenCase';
import { putWinnerItemIntoPlace } from './PutWinnerItem';
import prisma from '$lib/prisma';
import { balance } from '../../../stores';

export const POST = async ({ request, cookies }: RequestEvent) => {
	try {
		const data = await request.json();
		const steamid = cookies.get('steamid64');

		const user: any = await prisma.user.findUnique({
			where: {
				steamid: `${steamid}`
			}
		});

		if (user.balance >= data.cases.price) {
			const userBalance: number = data.user.balance;
			const casePrice: number = data.cases.price;

			let newBalance: number = (userBalance * 100 - casePrice * 100) / 100;

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
				winnerCondition: winnerCondition,
				newBalance: newBalance,
				winnerId: winnerId
			};

			await Promise.all([updateUserBalance]);

			const headers = {
				'Content-Type': 'application/json'
			};

			return new Response(JSON.stringify(responseBody), {
				status: 200,
				headers
			});
		} else {
			return new Response('Payment Required: Insufficient funds.', {
				status: 402
			});
		}
	} catch (error) {
		console.error('Error handling incoming request', error);
		return new Response(JSON.stringify({ error: 'Internal server error.' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
