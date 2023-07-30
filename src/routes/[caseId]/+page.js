// @ts-nocheck
export const load = ({ fetch, params }) => {
	console.log(params);

	const fetchCase = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/cases');
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				console.error('Error fetching data from the API');
			}
		} catch (error) {
			console.error('Error fetching data from the API' + error);
		}
	};

	return {
		returnedCase: fetchCase(params.caseId)
	};
};
