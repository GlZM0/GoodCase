import { RandomNumberGenerator } from './caseUtils/RandomNumberGenerator';
import type { Case } from '../../../app.d.ts';

export class OpenCase {
	private winnerName: string;
	private winnerPrice: number;
	private winnerImage: string;
	private winnerColor: string;
	private winnerCondition: string;
	private winnerId: string;

	constructor(private min: number, private max: number, private myCase: Case) {
		this.winnerName = '';
		this.winnerPrice = 0;
		this.winnerImage = '';
		this.winnerColor = '';
		this.winnerCondition = '';
		this.winnerId = '';
	}

	public openCase(): void {
		const randomNumberGenerator = new RandomNumberGenerator();
		const randomNumber = randomNumberGenerator.generator(0, 999999);

		let winningItemIndex = -1;
		for (let i = 0; i < this.myCase.items.length; i++) {
			const item = this.myCase.items[i];
			if (randomNumber >= item.dropRangeStart && randomNumber < item.dropRangeEnd) {
				winningItemIndex = i;
				break;
			}
		}

		if (winningItemIndex !== -1) {
			const winningItem = this.myCase.items[winningItemIndex];
			this.winnerName = winningItem.name;
			this.winnerPrice = winningItem.price;
			this.winnerImage = winningItem.image;
			this.winnerColor = winningItem.color;
			this.winnerCondition = winningItem.condition;
			this.winnerId = winningItem.id;
		} else {
			console.error('No winning item found for random number:', randomNumber);
		}
	}

	public getWinnerName(): string {
		return this.winnerName;
	}

	public getWinnerPrice(): number {
		return this.winnerPrice;
	}

	public getWinnerImage(): string {
		return this.winnerImage;
	}

	public getWinnerColor(): string {
		return this.winnerColor;
	}

	public getWinnerCondition(): string {
		return this.winnerCondition;
	}

	public getWinnerId(): string {
		return this.winnerId;
	}
}
