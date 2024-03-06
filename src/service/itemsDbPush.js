import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		const caseId = '64bb95e4b2bdcb4142772c66';
		const itemIds = [
			'65e76d373c1fdc6e83c6c14a',
			'65e76d373c1fdc6e83c6c167',
			'65e76d373c1fdc6e83c6c16a',
			'65e76d373c1fdc6e83c6c188',
			'65e76d373c1fdc6e83c6c189',
			'65e76d373c1fdc6e83c6c193',
			'65e76d373c1fdc6e83c6c1a0',
			'65e76d373c1fdc6e83c6c1aa',
			'65e76d373c1fdc6e83c6c1b1',
			'65e76d373c1fdc6e83c6c1b2',
			'65e76d373c1fdc6e83c6c1b7',
			'65e76d373c1fdc6e83c6c1b9',
			'65e76d373c1fdc6e83c6c1c3',
			'65e76d373c1fdc6e83c6c1c4',
			'65e76d373c1fdc6e83c6c1cb',
			'65e76d373c1fdc6e83c6c1d0',
			'65e76d373c1fdc6e83c6c1da',
			'65e76d373c1fdc6e83c6c11d',
			'65e76d373c1fdc6e83c6c128',
			'65e76d373c1fdc6e83c6c130'
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
