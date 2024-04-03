// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		const itemsYouWant = 25;
		const totalItemsNeeded = itemsYouWant * 10;

		const items = await prisma.item.findMany({
			where: {
				name: {
					contains: 'Fade'
				}
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
		const encounteredNames = new Set(); // Keep track of encountered item names

		const requiredCount1 = Math.ceil(0.8 * itemsYouWant);
		let countRequirement1 = 0;

		for (const item of shuffledItems) {
			// Check if the name doesn't contain 'Souvenir' and hasn't been encountered before
			if (
				!item.name.includes('Souvenir') &&
				!item.name.includes('Sticker') &&
				!encounteredNames.has(item.name)
			) {
				itemsToSelect.push(item);
				countRequirement1++;
				encounteredNames.add(item.name); // Add the name to the set of encountered names
			}

			if (countRequirement1 === itemsYouWant) break;
		}

		// itemsToSelect.map((item) => {
		// 	console.log(item.name + ' ' + item.price);
		// });
		// console.log(itemsToSelect.length);
		// console.log(itemsToSelect);
		const myItems = [
			{ id: '65e76d373c1fdc6e83c70b39' },
			{ id: '65e76d373c1fdc6e83c6fdc6' },
			{ id: '65e76d373c1fdc6e83c70899' },
			{ id: '65e76d373c1fdc6e83c6ccdf' },
			{ id: '65e76d373c1fdc6e83c6c88b' },
			{ id: '65e76d373c1fdc6e83c6f715' },
			{ id: '65e76d373c1fdc6e83c6cc77' },
			{ id: '65e76d373c1fdc6e83c6dabe' },
			{ id: '65e76d373c1fdc6e83c6fbb2' },
			{ id: '65e76d373c1fdc6e83c6fb35' },
			{ id: '65e76d373c1fdc6e83c6e075' },
			{ id: '65e76d373c1fdc6e83c6c329' },
			{ id: '65e76d373c1fdc6e83c6e613' },
			{ id: '65e76d373c1fdc6e83c6d540' },
			{ id: '65e979d8fe5ededef34be803' },
			{ id: '65e76d373c1fdc6e83c6d920' },
			{ id: '65e76d373c1fdc6e83c6c35b' },
			{ id: '65e76d373c1fdc6e83c6c585' },
			{ id: '65e76d373c1fdc6e83c6d8f7' },
			{ id: '65e97b28fe5ededef34be91d' },
			{ id: '65e76d373c1fdc6e83c6d324' },
			{ id: '65e76d373c1fdc6e83c6eb18' },
			{ id: '65e76d373c1fdc6e83c6d522' },
			{ id: '65e76d373c1fdc6e83c6f566' },
			{ id: '65e76d373c1fdc6e83c6c4f2' }
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
	const caseId = '660d673455011028ff93fa0a';
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
