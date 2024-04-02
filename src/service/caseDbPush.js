// File to push data to database using prisma

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.case.create({
		data: {
			name: 'fade',
			image:
				'https://cdn.csgocases.com/unsigned/aHR0cHM6Ly9jc2dvY2FzZXMuY29tL3VwbG9hZHMvZ2FsbGVyeS9vcnlnaW5hbC83ZjFiYTc3ZTEwZGRhYjc3MzUxMGY1NDMyNjE2NWExNmFiODMwMjIxLnBuZw==.png',
			alt: 'fade-case',
			link: '../../../fade',
			price: 14.39
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
