import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let myCase;

	try {
		const response = await fetch('http://localhost:3000/api/cases');
		if (response.ok) {
			const responseData = await response.json();
			myCase = responseData;
		} else {
			console.error('Error fetching data from the API');
		}
	} catch (error) {
		console.error('Error fetching data from the API' + error);
	}

	return {
		myCase: myCase
	};
};
