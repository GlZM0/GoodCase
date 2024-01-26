export const putWinnerItemIntoPlace = (
	shuffledItems: any[],
	winnerName: string,
	winnerImage: string,
	winnerPrice: number
) => {
	shuffledItems[99] = {
		name: winnerName,
		image: winnerImage,
		price: winnerPrice
	};
};
