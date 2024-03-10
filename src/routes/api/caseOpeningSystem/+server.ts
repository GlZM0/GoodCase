import type { Item } from '../../../app';
import type { RequestEvent } from './$types';
import { shuffleCase } from './CaseShuffler';
import { OpenCase } from './OpenCase';
import { putWinnerItemIntoPlace } from './PutWinnerItem';

export const POST = async ({ request }: RequestEvent) => {
	try {
		const cases = await request.json();

		let shuffledItems = shuffleCase(cases.items as Item[]);

		const openSystem = new OpenCase(0, 100, cases);

		openSystem.openCase();
		const winnerName = openSystem.getWinnerName();
		const winnerPrice = openSystem.getWinnerPrice();
		const winnerImage = openSystem.getWinnerImage();
		const winnerColor = openSystem.getWinnerColor();
		const winnerCondition = openSystem.getWinnerCondition();

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
