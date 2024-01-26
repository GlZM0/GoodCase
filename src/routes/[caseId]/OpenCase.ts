import { RandomNumberGenerator } from './RandomNumberGenerator';
import { RangeIndexFinder } from './RangeIndex';

export class OpenCase {
	private cumulativeDistribution: number[];
	private winnerName: string;
	private winnerPrice: number;
	private winnerImage: string;

	constructor(private min: number, private max: number, private myCase: any) {
		this.cumulativeDistribution = [];
		this.winnerName = '';
		this.winnerPrice = 0;
		this.winnerImage = '';
	}

	public openCase(): void {
		let cumulative = 0;
		for (let i = 0; i <= 20; i++) {
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

		this.winnerName = winningItemName;
		this.winnerPrice = winningItemPrice;
		this.winnerImage = winningItemImage;
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
}
