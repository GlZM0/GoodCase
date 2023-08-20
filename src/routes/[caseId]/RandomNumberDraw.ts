class RandomNumberDraw {
	private numbers: number[];

	constructor(numbers: number[]) {
		const sum = numbers.reduce((acc, num) => acc + num, 0);
		if (sum !== 100) {
			throw new Error('The numbers must add up to 100%.');
		}

		this.numbers = numbers;
	}

	drawRandomNumber(): number {
		const randomNumber = Math.random() * 100; // Generate a random number between 0 and 100

		let currentSum = 0;
		for (let i = 0; i < this.numbers.length; i++) {
			currentSum += this.numbers[i];
			if (randomNumber <= currentSum) {
				// The random number falls within this range, return the corresponding percentage
				return this.numbers[i];
			}
		}

		return 0; // Should never reach this line
	}
}

// Usage example:
const numbers = [17, 73, 36.7, 23.7];
const randomNumberDrawer = new RandomNumberDraw(numbers);

const randomDrawnNumber = randomNumberDrawer.drawRandomNumber();
console.log(`Randomly drawn number: ${randomDrawnNumber}%`);
