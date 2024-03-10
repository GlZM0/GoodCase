import type { Item } from '../../../app';

export const shuffleCase = (items: Item) => {
	const originalItems = Array.from({ length: items.length }, (_, index) => items[index]);
	let allItems: Item[] = [];

	for (let i = 0; i < Math.ceil(100 / originalItems.length); i++) {
		allItems = allItems.concat(originalItems);
	}

	let shuffledItems = allItems.sort(() => Math.random() - 0.5);

	return shuffledItems;
};
