import type { Item } from '../../app.d.ts';

export const getWinnerItemPosition = (container: HTMLElement, shuffledItems: Item[]) => {
	const itemsVisible = Math.ceil(container.clientWidth / 155);

	const positionOfWinnerItem = shuffledItems.length - Math.ceil(itemsVisible / 2);

	const winnerItemX = -((positionOfWinnerItem - 1) * 155) + Math.ceil(itemsVisible / 2) * 155;

	return winnerItemX;
};
