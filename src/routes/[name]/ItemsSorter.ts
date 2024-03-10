import type { Case } from '../../app';

export const sortItems = (cases: Case) => {
	let sortedItems = cases.items;
	sortedItems.sort((a: any, b: any) => {
		return b.price - a.price;
	});
	return sortedItems;
};
