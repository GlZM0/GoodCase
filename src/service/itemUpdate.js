import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		await prisma.item.update({
			where: {
				id: '65dc68cc6fa4715e6533e24f'
			},
			data: {
				caseId: '65dc5392eb73a875d8234b19'
			}
		});
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
