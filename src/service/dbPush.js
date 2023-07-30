//File to push data to database using prisma

// @ts-nocheck
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

main = async () => {
	await prisma.case.create({
		data: {
			name: 'restricted',
			image:
				'https://csgocases.com/uploads/gallery/oryginal/60a3d30a395fa4a6e63252f04325de4c91ffc095.png',
			alt: 'restricted-case',
			link: '../../../restricted',
			price: 7.25,
			items: {
				create: [
					{
						name: 'M4A1-S | Emphorosaur-S',
						color: 'purple',
						image: 'https://cdn.key-drop.com/csgo_icons/e7/e754503a8fca82d085a53bf2fec3912e.png',
						condition: 'factory new',
						price: 24.99,
						chance: 2.45
					},
					{
						name: 'P250 | Verdigris',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/6d/6d5aab0d0d776cb03e96ea0b1aa3b0da.png',
						condition: 'factory new',
						price: 2.4,
						chance: 0.75
					},
					{
						name: 'P90 | Cocoa Rampage',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/64/6450eb85f0b3b549e1d2944e91877851.png',
						condition: 'factory new',
						price: 3.8,
						chance: 1.87
					},
					{
						name: 'SSG 08 | Abyss',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/e0/e084b414278ec1576c10d1247a06bf41.png',
						condition: 'factory new',
						price: 17.15,
						chance: 0.17
					},
					{
						name: 'Tec-9 | Fubar',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/f9/f9b9f74c85caf9b0b327f05c346f4dcc.png',
						condition: 'minimal wear',
						price: 0.45,
						chance: 11.79
					},
					{
						name: 'MP5-SD | Condition Zero',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/68/684cbccc948a3174f9ae76117b9642ac.png',
						condition: 'factory new',
						price: 4.9,
						chance: 0.75
					},
					{
						name: 'P90 | Facility Negative',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/23/233d14c6b8f1cd14adba753c0909aade.png',
						condition: 'factory new',
						price: 6.35,
						chance: 1.01
					},
					{
						name: 'Glock-18 | Bunsen Burner',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/9d/9d176645456b218c26927de1ef54d6d2.png',
						condition: 'factory new',
						price: 14.3,
						chance: 9.29
					},
					{
						name: 'MP7 | Cirrus',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/9d/9d176645456b218c26927de1ef54d6d2.png',
						condition: 'factory new',
						price: 13.3,
						chance: 10.0
					},
					{
						name: 'R8 Revolver | Blaze',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/a9/a9207efd410114c31edbd820e387efec.png',
						condition: 'factory new',
						price: 9.35,
						chance: 1.11
					},
					{
						name: 'MAC-10 | Oceanic',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/e5/e5fd02b09eae355ea0e81b344223fe21.png',
						condition: 'factory new',
						price: 1.1,
						chance: 10.99
					},
					{
						name: 'Galil AR | Dusk Ruins',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/e1/e17df8cc60b49637e22bfc8bcd8b62ca.png',
						condition: 'factory new',
						price: 57.5,
						chance: 0.35
					},
					{
						name: 'MAC-10 | Nuclear Garden',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/0f/0f52a2af2696ec567df13b06b886ba0e.png',
						condition: 'factory new',
						price: 59.2,
						chance: 0.29
					},
					{
						name: 'MP9 | Modest Threat',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/b9/b941ce18d3ebd56ded90894c8778f91a.png',
						condition: 'factory new',
						price: 1.2,
						chance: 8.49
					},
					{
						name: 'Five-Seven | Flame Test',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/8b/8b991e645e373b9b12e0b79d86bd2143.png',
						condition: 'factory new',
						price: 1.1,
						chance: 9.11
					},
					{
						name: 'Negev | Drop Me',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/88/8841c79a2377eeecec8c3b6b08c0c198.png',
						condition: 'factory new',
						price: 1.53,
						chance: 7.36
					},
					{
						name: 'FAMAS | Survivor Z',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/90/903ef6bf7f7b01b63eef6c8955390741.png',
						condition: 'factory new',
						price: 2.56,
						chance: 6.69
					},
					{
						name: 'M4A1-S | VariCamo',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/07/07350171c1e54289bb3049ca9490a404.png',
						condition: 'factory new',
						price: 10.65,
						chance: 1.2
					},
					{
						name: 'AK-47 | Uncharted',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/c1/c1c2dc8b26822829e8493a61a4f0cd56.png',
						condition: 'factory new',
						price: 5.3,
						chance: 3.77
					},
					{
						name: 'P2000 | Imperial',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/91/9142a487fa623cf841a7d4f8a2ae35ff.png',
						condition: 'factory new',
						price: 1.75,
						chance: 4.83
					},
					{
						name: 'USP-S | Black Lotus',
						color: 'blue',
						image: 'https://cdn.key-drop.com/csgo_icons/cb/cbc0f453ed997d0e3e6eba71ecef00ce.png',
						condition: 'factory new',
						price: 24.0,
						chance: 0.59
					}
				]
			}
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
