export class RandomNumberGenerator {
	generator(min: number, max: number): number {
		return parseFloat((Math.random() * (max - min) + min).toFixed(2));
	}
}
