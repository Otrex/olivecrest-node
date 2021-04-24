const axios = require('axios')


class CoinbaseCommerce {
	constructor(api_key, api_version) {
		this.HEADERS = {
			"X-CC-Api-Key" : api_key,
			"X-CC-Version" : api_version
		}
	}

	async createCharge(data) {
		const options = {
		  headers: {...this.HEADERS}
		};
		try {
			let result = await axios.post('/save', data, options)
		} catch (err) {
			throw new Error(err)
		}
	}

	
}