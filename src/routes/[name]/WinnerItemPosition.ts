import type { Item } from '../../app.d.ts';

export const getWinnerItemPosition = (container: HTMLElement, shuffledItems: Item[]) => {
	const itemsVisible = Math.ceil(container.clientWidth / 200);

	const positionOfWinnerItem = shuffledItems.length - Math.ceil(itemsVisible / 2);

	const winnerItemX = -((positionOfWinnerItem - 1) * 200) + Math.ceil(itemsVisible / 2) * 200;

	return winnerItemX;
};
