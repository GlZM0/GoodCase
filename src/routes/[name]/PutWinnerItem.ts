import type { Item } from '../../app.d.ts';

export const putWinnerItemIntoPlace = (
	shuffledItems: Item,
	winnerName: string,
	winnerImage: string,
	winnerPrice: number,
	winnerColor: string,
	winnerCondition: string
) => {
	shuffledItems[99] = {
		name: winnerName,
		image: winnerImage,
		price: winnerPrice,
		color: winnerColor,
		condition: winnerCondition
	};
};
