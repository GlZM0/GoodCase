export class RangeIndexFinder {
	findIndex(cumulativeDistribution: number[], randomNumber: number): number {
		for (let i = 0; i < cumulativeDistribution.length; i++) {
			if (randomNumber <= cumulativeDistribution[i]) {
				return i;
			}
		}
		return cumulativeDistribution.length - 1;
	}
}
