import type { PageServerLoad } from '../$types';
import prisma from '$lib/prisma';
import type { Item } from '../../app.d.ts';

const calcDropProbabilities = (caseItems: Item[]) => {
	const totalSum: number = caseItems.reduce((acc, item) => acc + item.price, 0);

	const reflectedPercentages: number[] = caseItems.map(
		(item) => ((totalSum - item.price) / totalSum) * 999999
	);

	const sumReflectedPercentages: number = reflectedPercentages.reduce(
		(acc, percentage) => acc + percentage,
		0
	);

	const adjustedPercentages: number[] = reflectedPercentages.map((percentage) =>
		Math.round((percentage / sumReflectedPercentages) * 999999)
	);

	const sumAdjustedProbabilities: number = adjustedPercentages.reduce(
		(acc, probability) => acc + probability,
		0
	);

	if (sumAdjustedProbabilities !== 999999) {
		const diff = 999999 - sumAdjustedProbabilities;
		const maxIndex = adjustedPercentages.reduce(
			(maxIndex, currentProbability, currentIndex, probabilities) =>
				currentProbability > probabilities[maxIndex] ? currentIndex : maxIndex,
			0
		);
		adjustedPercentages[maxIndex] += diff;
	}

	let rangeStart: number = 0;
	for (let i = 0; i < caseItems.length; i++) {
		const rangeEnd = rangeStart + adjustedPercentages[i];
		caseItems[i].dropProbability = adjustedPercentages[i];
		caseItems[i].dropRangeStart = rangeStart;
		caseItems[i].dropRangeEnd = rangeEnd;
		caseItems[i].chance = ((adjustedPercentages[i] / 999999) * 100).toFixed(2);
		rangeStart = rangeEnd;
	}

	return caseItems;
};

export const load: PageServerLoad = async ({ cookies, params }) => {
	const { name } = params as { name: string };

	const cases = await prisma.case.findMany({
		where: {
			name: `${name}`
		},
		include: {
			items: true
		}
	});

	if (cases.length === 0) {
		console.error(`Case with name '${name}' not found.`);
		return {
			status: 404,
			error: new Error(`Case with name '${name}' not found.`)
		};
	}

	const caseItems = cases[0].items;
	calcDropProbabilities(caseItems as Item[]);

	const personaname = cookies.get('personaname');
	let logged = false;

	if (!personaname) {
		console.log('u need to login');
		return {
			logged,
			cases
		};
	} else {
		logged = !logged;
		return {
			logged,
			cases
		};
	}
};
