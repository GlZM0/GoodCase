import type { Item } from '../../../app';

export const shuffleCase = (items: Item) => {
	const originalItems = Array.from({ length: items.length }, (_, index) => items[index]);
	let allItems: Item[] = [];

	const numOfRepeats = Math.ceil(100 / originalItems.length);
	for (let i = 0; i < numOfRepeats; i++) {
		allItems.push(...originalItems);
	}
	const trimmedItems = allItems.slice(0, 100);

	let shuffledItems = trimmedItems.sort(() => Math.random() - 0.5);

	return shuffledItems;
};
