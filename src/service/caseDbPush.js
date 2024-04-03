// File to push data to database using prisma

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.case.create({
		data: {
			name: 'awp',
			image:
				'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJU5c6jh7-HnvD8J_WExW0C7pUo3-jDpdXx0FHs-RBla2r6LIHGIwE2Y1_X-Fi7w-m7gZS0ot2Xnp9XPRld',
			alt: 'awp-case',
			link: '../../../awp',
			price: 13.99
		}
	});

	const allCases = await prisma.case.findMany({
		include: {
			items: true
		}
	});
	// console.dir(allCases, { depth: null });
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
