const axios = require('axios');
const rateLimit = require('axios-rate-limit');
const config = require('./config');
const apiKey = config.keys.ALPHA_VANTAGE_API_KEY;
const apiClient = axios.default;

// Limit max requests to AlphaVantage to 4 requests per second
const http = rateLimit(
  apiClient.create({
    baseURL: 'https://www.alphavantage.co'
  }),
  { maxRequests: 4,
    perMilliseconds: 1000,
    maxRPS: 4,
  }
);

async function getCompanyOverview(ticker) {
  urlPath = `query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getQuote(ticker) {
  urlPath = `query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getIntraday(ticker) {
  urlPath = `query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&outputsize=full&apikey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getDailyAdjusted(ticker) {
  urlPath = `query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&interval=5min&outputsize=full&apikey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

module.exports.getCompanyOverview = getCompanyOverview;
module.exports.getQuote = getQuote;
module.exports.getIntraday = getIntraday;
module.exports.getDailyAdjusted = getDailyAdjusted;