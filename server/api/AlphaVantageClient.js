const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const config = require('../config');

const apiKey = config.keys.ALPHA_VANTAGE_API_KEY;
const apiClient = axios.default;

// Limit max requests to AlphaVantage to 5 requests per minute
const http = rateLimit(
  apiClient.create({
    baseURL: 'https://www.alphavantage.co'
  }),
  { maxRequests: 4,
    perMilliseconds: 1000,
  }
);

async function getFiveDayQuotes(ticker) {
  urlPath = `query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=30min&outputsize=full&apikey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

module.exports.getFiveDayQuotes = getFiveDayQuotes;