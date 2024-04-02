// @ts-nocheck
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		const itemsYouWant = 25;
		const totalItemsNeeded = itemsYouWant * 4;

		const items = await prisma.item.findMany({
			where: {
				name: {
					contains: 'fade'
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

		const requiredCount1 = Math.ceil(0.8 * itemsYouWant);
		let countRequirement1 = 0;
		let countRequirement2 = 0;

		for (const item of shuffledItems) {
			if (countRequirement1 < requiredCount1 && item.price < 30) {
				itemsToSelect.push(item);
				countRequirement1++;
			} else if (
				countRequirement1 >= requiredCount1 &&
				countRequirement2 < itemsYouWant - requiredCount1 &&
				item.price > 31 &&
				item.price < 800
			) {
				itemsToSelect.push(item);
				countRequirement2++;
			}

			if (itemsToSelect.length === itemsYouWant) break;
		}

		// itemsToSelect.map((item) => {
		// 	console.log(item.price);
		// });
		// console.log(itemsToSelect.length);
		console.log(itemsToSelect);

		// itemsDbPush(itemsToSelect);
	} catch (error) {
		console.error('Error creating item:', error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
};

const itemsDbPush = async (selectedItems) => {
	const caseId = '660be51843332be15987e566';
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
