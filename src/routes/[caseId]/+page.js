// @ts-ignore
export const load = ({ fetch, params }) => {
	console.log(params);

	// @ts-ignore
	const fetchCase = async (id) => {
		// @ts-ignore
		const res = await fetch(`https://dummyjson.com/products/${id}`);
		const data = await res.json();
		return data;
	};

	return {
		case: fetchCase(params.caseId)
	};
};
