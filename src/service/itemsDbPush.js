import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		const caseId = '65dc5392eb73a875d8234b19';
		const itemIds = [
			'65e76d373c1fdc6e83c6c4cb',
			'65e76d373c1fdc6e83c6f903',
			'65e76d373c1fdc6e83c6e8c5',
			'65e76d373c1fdc6e83c70c15',
			'65e76d373c1fdc6e83c7067a',
			'65e76d373c1fdc6e83c6c32a',
			'65e984fdfe5ededef34bee7e',
			'65e76d373c1fdc6e83c6ecae',
			'65e76d373c1fdc6e83c6f954',
			'65e76d373c1fdc6e83c6d4d6',
			'65e76d373c1fdc6e83c6d540',
			'65e76d373c1fdc6e83c708cb',
			'65e76d373c1fdc6e83c6c424',
			'65e97a7bfe5ededef34be88c',
			'65e983b8fe5ededef34bedfb',
			'65e76d373c1fdc6e83c6e01a',
			'65e76d373c1fdc6e83c6c8fc',
			'65e76d373c1fdc6e83c6edfa',
			'65e76d373c1fdc6e83c6f39b',
			'65e76d373c1fdc6e83c6ee7d',
			'65e979d8fe5ededef34be803',
			'65e76d373c1fdc6e83c70603',
			'65e76d373c1fdc6e83c6c94a',
			'65e76d373c1fdc6e83c6ee25',
			'65e76d373c1fdc6e83c6cf3f',
			'65e97d59fe5ededef34beb0e',
			'65e76d373c1fdc6e83c6d2c4',
			'65e76d373c1fdc6e83c6f224',
			'65e76d373c1fdc6e83c6da42'
		];

		// Retrieve the items based on their IDs
		const items = await prisma.item.findMany({
			where: { id: { in: itemIds } }
		});

		// Update each item's caseId field to the caseId of the case
		const updatedItems = await Promise.all(
			items.map(async (item) => {
				const updatedItem = await prisma.item.update({
					where: { id: item.id },
					data: { caseIDs: caseId }
				});
				return updatedItem;
			})
		);

		// Connect the items to the case
		const updatedCase = await prisma.case.update({
			where: { id: caseId },
			data: { items: { connect: updatedItems.map((item) => ({ id: item.id })) } },
			include: { items: true } // Include associated items in the result
		});

		console.log('Case updated:', updatedCase);
	} catch (error) {
		console.error('Error updating case:', error);
		throw error; // Rethrow the error to be caught by the caller
	} finally {
		await prisma.$disconnect();
	}
};

main().catch(async (error) => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
