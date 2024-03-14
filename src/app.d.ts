import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		interface Item {
			id: string;
			name: string;
			color: string;
			image: string;
			condition: string;
			price: number;
			type: string;
			chance?: number;
			caseIDs: string[];
			dropProbability?: number;
			dropRangeStart?: number;
			dropRangeEnd?: number;
		}

		interface Case {
			alt: string;
			id: string;
			image: string;
			items: Item[];
			link: string;
			name: string;
			price: number;
			itemIds: string[];
		}

		interface User {
			avatar: string;
			balance: 350;
			logged: boolean;
			personaname: string;
			steamid: string;
		}

		interface UserObj {
			user: User[];
		}

		interface SiteInventory {
			[key: string]: {
				winnerName: string;
				winnerPrice: number;
				winnerImage: string;
				winnerColor: string;
				winnerCondition: string;
			};
		}
	}
	var prisma: PrismaClient;
}

export { Item, Case, UserObj, SiteInventory };
