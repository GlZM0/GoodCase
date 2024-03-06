import type { Item } from '../../app.d.ts';

export const putWinnerItemIntoPlace = (
	shuffledItems: Item,
	winnerName: string,
	winnerImage: string,
	winnerPrice: number,
	winnerColor: string,
	winnerCondition: string
) => {
	shuffledItems[94] = {
		name: winnerName,
		image: winnerImage,
		price: winnerPrice,
		color: winnerColor,
		condition: winnerCondition
	};
};
