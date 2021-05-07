const axios = require('axios');

const apiKey = process.env.FINNHUB_KEY;
const apiClient = axios.default;
const http = apiClient.create({
  baseURL: 'https://finnhub.io'
});

async function getQuote(ticker) {
  urlPath = `/api/v1/quote?symbol=${ticker}&token=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

module.exports.getQuote = getQuote;