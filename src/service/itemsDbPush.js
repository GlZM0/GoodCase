import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	try {
		await prisma.item.create({
			data: {
				name: 'MP9 | Mount Fuji',
				color: 'purple',
				image:
					'https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZh7P7YKAJE-da_q5CCmfzLP7LWnn8fu8EmjLySrYikjQ2xqRE-Yz_xJtCSc1A2aF_ZqVa5ku66jMe6tJTJn2wj5HcLkc-m3A',
				condition: 'Minimal Wear',
				price: 6.28,
				chance: 10
			}
		});
		console.log('Item created successfully!');
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
