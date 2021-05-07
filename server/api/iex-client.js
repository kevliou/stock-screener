const axios = require('axios');

const apiKey = process.env.IEX_KEY;
const apiClient = axios.default;
const http = apiClient.create({
  baseURL: 'https://cloud.iexapis.com/stable'
});

async function getCompanyOverview(ticker) {
  urlPath = `/stock/${ticker}/company?token=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getKeyStats(ticker) {
  urlPath = `/stock/${ticker}/stats?token=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getPreviousDayQuote(ticker) {
  urlPath = `/stock/${ticker}/previous?token=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getIntradayQuotes(ticker) {
  urlPath = `/stock/${ticker}/intraday-prices?token=${apiKey}&chartIEXOnly=true`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

module.exports.getCompanyOverview = getCompanyOverview;
module.exports.getKeyStats = getKeyStats;
module.exports.getPreviousDayQuote = getPreviousDayQuote;
module.exports.getIntradayQuotes = getIntradayQuotes;