import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		const items = await prisma.item.findMany({
			where: {
				color: 'Blue'
			},
			select: {
				id: true,
				name: true
			},
			take: 20
		});

		console.log(items);
		console.log('Item updated successfully!');
	} catch (error) {
		console.error('Error creating item:', error);
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
