const SERVER_URI = process.env.REACT_APP_BASE_URL;

const fetchPredictions = async searchTerm => {
	try {
		const encodedSearch = encodeURIComponent(searchTerm);
		const url = `${SERVER_URI}predictions?searchTerm=${encodedSearch}`;
		let response = await fetch(url);
		response = await response.text();
		response = response
			.replace(/[\t]+/g, '')
			.split('\n')
			.filter(ele => ele.length)
			.map(ele => {
				ele = ele.substr(43);
				return {
					id: ele.substring(ele.indexOf('/') + 1, ele.indexOf('"')),
					name: ele.substring(ele.indexOf('>') + 1, ele.indexOf('<') - 1)
				}
			});
		return response;
	} catch (e) {
		console.error(e);
	}
};

const postCompany = async company => {
	try {
		const url = `${SERVER_URI}companies`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(company)
		});
		return await response.json();
	} catch (e) {
		console.error(e);
	}
};

const fetchCompanies = async () => {
	try {
		const url = `${SERVER_URI}companies`;
		const response = await fetch(url);
		return await response.json();
	} catch (e) {
		console.error(e);
	}
};

export { fetchPredictions, postCompany, fetchCompanies }
