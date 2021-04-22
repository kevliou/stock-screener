const axios = require('axios');
const config = require('./config');
const apiKey = config.keys.ALPHA_VANTAGE_API_KEY;
const apiClient = axios.default;

const instance = apiClient.create({
    baseURL: 'https://www.alphavantage.co'
});

async function getCompanyOverview(ticker) {
    urlPath = `query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`

    return new Promise((resolve, reject) => {
        resolve(instance.get(urlPath)
            .then(res => res.data)
        ).catch( err => {
            reject(console.log(err))
        });
    });
}

module.exports.getCompanyOverview = getCompanyOverview;