// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		const itemsYouWant = 5;
		const totalItemsNeeded = itemsYouWant * 4;

		const items = await prisma.item.findMany({
			where: {
				OR: [
					{ name: { contains: 'Talon' } },
					{ name: { contains: 'Ursus' } },
					{ name: { contains: 'Skeleton' } },
					{ name: { contains: 'Kukri' } },
					{ name: { contains: 'Paracord' } }
				]
			},
			select: {
				id: true,
				name: true,
				price: true
			},
			take: totalItemsNeeded
		});

		const shuffledItems = shuffleArray(items);

		const itemsToSelect = [];
		const encounteredNames = new Set();

		const requiredCount1 = Math.ceil(0.8 * itemsYouWant);
		let countRequirement1 = 0;

		for (const item of shuffledItems) {
			if (
				!item.name.includes('Souvenir') &&
				!item.name.includes('Sticker') &&
				!encounteredNames.has(item.name)
			) {
				itemsToSelect.push(item);
				countRequirement1++;
				encounteredNames.add(item.name);
			}

			if (countRequirement1 === itemsYouWant) break;
		}

		// const newItem = {
		// 	id: '65e76d373c1fdc6e83c70380',
		// 	name: 'AWP | Containment Breach',
		// 	price: 475.069
		// };
		// const updatedItems = [...itemsToSelect, newItem];

		// console.log(updatedItems);
		// itemsToSelect.map((item) => {
		// 	console.log(item.name + ' ' + item.price);
		// });
		// console.log(itemsToSelect.length);
		console.log(itemsToSelect);
		const myItems = [
			{ id: '65e76d373c1fdc6e83c7093a' },
			{ id: '65e76d373c1fdc6e83c6f918' },
			{ id: '66115921acc3709a8117f1cf' },
			{ id: '65e76d373c1fdc6e83c706b0' },
			{ id: '65e76d373c1fdc6e83c6da57' },
			{ id: '65e97fbcfe5ededef34bec98' },
			{ id: '661149e7acc3709a8117ec9b' },
			{ id: '65e98528fe5ededef34bee9b' },
			{ id: '65e76d373c1fdc6e83c6fe19' },
			{ id: '65e76d373c1fdc6e83c7039e' },
			{ id: '65e76d373c1fdc6e83c702e4' },
			{ id: '65e76d373c1fdc6e83c702af' },
			{ id: '661158dfacc3709a8117f19c' },
			{ id: '65e76d373c1fdc6e83c6fb5f' },
			{ id: '65e76d373c1fdc6e83c6d780' },
			{ id: '65e76d373c1fdc6e83c70241' },
			{ id: '65e76d373c1fdc6e83c6d1b2' },
			{ id: '65e76d373c1fdc6e83c7042a' },
			{ id: '65e76d373c1fdc6e83c6db09' },
			{ id: '65e76d373c1fdc6e83c6f918' }
		];

		itemsDbPush(myItems);
	} catch (error) {
		console.error('Error creating item:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};

const itemsDbPush = async (selectedItems) => {
	const caseId = '660d9aff53490ccacc069630';
	const itemIds = selectedItems.map((item) => item.id);

	const items = await prisma.item.findMany({
		where: { id: { in: itemIds } }
	});

	const updatedItems = await Promise.all(
		items.map(async (item) => {
			const updatedItem = await prisma.item.update({
				where: { id: item.id },
				data: { caseIDs: caseId }
			});
			return updatedItem;
		})
	);

	const updatedCase = await prisma.case.update({
		where: { id: caseId },
		data: { items: { connect: updatedItems.map((item) => ({ id: item.id })) } },
		include: { items: true }
	});

	console.log('Case updated:', updatedCase);
};

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

main().catch(async (error) => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
