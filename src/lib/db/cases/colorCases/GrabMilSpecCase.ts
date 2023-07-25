export const getMilSpecCase = async () => {
	try {
		const milSpecCase = await prisma.case.findUnique({
			where: {
				id: '64bb95e4b2bdcb4142772c66'
			}
		});
		return milSpecCase;
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message);
		} else {
			console.log('Unexpected error', err);
		}
	} finally {
		await prisma.$disconnect();
	}
};

// getMilSpecCase()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});
