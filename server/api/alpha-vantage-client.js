const axios = require('axios');

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
const apiClient = axios.default;

const http = apiClient.create({
  baseURL: 'https://www.alphavantage.co'
});

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

async function getFiveYearQuotes(ticker) {
  urlPath = `query?function=TIME_SERIES_WEEKLY&symbol=${ticker}&apikey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

module.exports.getFiveDayQuotes = getFiveDayQuotes;
module.exports.getFiveYearQuotes = getFiveYearQuotes;