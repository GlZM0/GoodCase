export const calculateWin = (data: any) => {
	let won;

	const generateRandomNumber = () => {
		let randomNumber = Math.random() * (100 - 1) + 1;
		return randomNumber;
	};

	let winnerPercentage: number = generateRandomNumber();

	if (winnerPercentage > data.itemData.upgradeChance) {
		won = false;
	} else {
		won = true;
	}

	return {
		won: won,
		winnerPercentageNumber: winnerPercentage
	};
};
