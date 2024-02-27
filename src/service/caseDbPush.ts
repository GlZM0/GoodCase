// File to push data to database using prisma

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.case.create({
		data: {
			name: 'restricted',
			image:
				'https://csgocases.com/uploads/gallery/oryginal/60a3d30a395fa4a6e63252f04325de4c91ffc095.png',
			alt: 'restricted-case',
			link: '../../../restricted',
			price: 7.25
		}
	});

	const allCases = await prisma.case.findMany({
		include: {
			items: true
		}
	});
	console.dir(allCases, { depth: null });
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
