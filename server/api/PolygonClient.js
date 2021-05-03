const axios = require('axios');
const config = require('../config');

const apiKey = config.keys.POLYGON_KEY;
const apiClient = axios.default;
const http = apiClient.create({
  baseURL: 'https://api.polygon.io'
});

async function getAnnualQuotes (ticker) {
  const today = new Date();
  // One year offset
  let fromDate = formatDate(new Date(today - 365 * 60 * 60 * 24 * 1000));
  let toDate = formatDate(today);

  urlPath = `/v2/aggs/ticker/${ticker}/range/1/day/${fromDate}/${toDate}?unadjusted=true&sort=asc&apiKey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

async function getFiveYearQuotes (ticker) {
  const today = new Date();
  // One year offset
  let fromDate = formatDate(new Date(today - 5 * 365 * 60 * 60 * 24 * 1000));
  let toDate = formatDate(today);

  urlPath = `/v2/aggs/ticker/${ticker}/range/7/day/${fromDate}/${toDate}?unadjusted=true&sort=asc&apiKey=${apiKey}`

  return new Promise((resolve, reject) => {
    resolve(http.get(urlPath)
      .then(res => res.data)
    ).catch(err => {
      reject(console.log(err))
    });
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  let month = `${date.getMonth()+1}`;
  let day = `${date.getDate()}`;

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

module.exports.getAnnualQuotes = getAnnualQuotes;
module.exports.getFiveYearQuotes = getFiveYearQuotes;