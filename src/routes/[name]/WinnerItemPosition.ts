export const getWinnerItemPosition = (container: HTMLElement, shuffledItems: any[]) => {
	const itemsVisible = Math.ceil(container.clientWidth / 200);

	const positionOfWinnerItem = shuffledItems.length - Math.ceil(itemsVisible / 2);

	const winnerItemX = -((positionOfWinnerItem - 1) * 200) + Math.ceil(itemsVisible / 2) * 200;

	return winnerItemX;
};
