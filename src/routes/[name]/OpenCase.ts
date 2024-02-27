import { RandomNumberGenerator } from './RandomNumberGenerator';
import { RangeIndexFinder } from './RangeIndex';

export class OpenCase {
	private cumulativeDistribution: number[];
	private winnerName: string;
	private winnerPrice: number;
	private winnerImage: string;
	private winnerColor: string;
	private winnerCondition: string;

	constructor(private min: number, private max: number, private myCase: any) {
		this.cumulativeDistribution = [];
		this.winnerName = '';
		this.winnerPrice = 0;
		this.winnerImage = '';
		this.winnerColor = '';
		this.winnerCondition = '';
	}

	public openCase(): void {
		let cumulative = 0;
		for (let i = 0; i <= this.myCase.items.length - 1; i++) {
			cumulative += this.myCase.items[i].chance;
			this.cumulativeDistribution.push(cumulative);
		}

		const randomNumberGenerator = new RandomNumberGenerator();
		const randomNumber = randomNumberGenerator.generator(this.min, this.max);

		const rangeIndexFinder = new RangeIndexFinder();
		const rangeIndex = rangeIndexFinder.findIndex(this.cumulativeDistribution, randomNumber);

		const winningItemName = this.myCase.items[rangeIndex].name;
		const winningItemPrice = this.myCase.items[rangeIndex].price;
		const winningItemImage = this.myCase.items[rangeIndex].image;
		const winningItemColor = this.myCase.items[rangeIndex].color;
		const winningCondition = this.myCase.items[rangeIndex].condition;

		this.winnerName = winningItemName;
		this.winnerPrice = winningItemPrice;
		this.winnerImage = winningItemImage;
		this.winnerColor = winningItemColor;
		this.winnerCondition = winningCondition;
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
}
