const express = require('express');
const router = express.Router();

// Define API routes
router.get('/getTickerDict', getTickerDict);
router.get('/getSuggestion', getSuggestion);
router.get('/getOverview', getOverview);
router.get('/getKeyStats', getKeyStats);
router.get('/getQuote', getQuote)
router.get('/getPreviousDayQuote', getPreviousDayQuote);
router.get('/getIntradayQuotes', getIntradayQuotes);
router.get('/getFiveDayQuotes', getFiveDayQuotes);
router.get('/getAnnualQuotes', getAnnualQuotes);
router.get('/getFiveYearQuotes', getFiveYearQuotes);

module.exports = router

const fs = require('fs');
const avClient = require('./api/alpha-vantage-client');
const iexClient = require('./api/iex-client');
const polygonClient = require('./api/polygon-client');
const finnhubClient = require('./api/finnhub-client');

const tickerPath = './data/ticker-dictionary.json';
const suggestionsPath = './data/autocomplete-suggestions.json';
const suggestionList = JSON.parse(
  fs.readFileSync(suggestionsPath, 'utf-8', (res, err) => {
    if (err) {
      console.log('Suggestion file read failed: ' + err)
    }
  })
);

async function getTickerDict(req, res) {
  const file = fs.readFileSync(tickerPath, 'utf8', (res, err) => {
    if (err) {
      console.log('Ticker dictionary file read failed: ' + err)
      return
    }
  });
  res.json(file);
  console.log('Sent ticker dictionary');
}

async function getSuggestion(req, res) {
  const searchTerm = formatSearch(req.query.id);
  res.json(suggestionList[searchTerm]);
  console.log('Results: ' + suggestionList[searchTerm]);
}

async function getOverview(req, res) {
  const ticker = req.query.id;
  res.json(await iexClient.getCompanyOverview(ticker));
  console.log(new Date().toString() + ' Sent company overview for ' + ticker);
}

async function getKeyStats(req, res) {
  const ticker = req.query.id;
  res.json(await iexClient.getKeyStats(ticker));
  console.log(new Date().toString() + ' Sent key stats for ' + ticker);
}

async function getQuote(req, res) {
  const ticker = req.query.id;
  res.json(await finnhubClient.getQuote(ticker));
  console.log(new Date().toString() + ' Sent last quote ' + ticker);
}

async function getPreviousDayQuote(req, res) {
  const ticker = req.query.id;
  res.json(await iexClient.getPreviousDayQuote(ticker));
  console.log(new Date().toString() + ' Sent previous quote ' + ticker);
}

async function getIntradayQuotes(req, res) {
  const ticker = req.query.id;
  res.json(await iexClient.getIntradayQuotes(ticker));
  console.log(new Date().toString() + ' Sent intraday for ' + ticker);
}

async function getFiveDayQuotes(req, res) {
  const ticker = req.query.id;
  res.json(await avClient.getFiveDayQuotes(ticker));
  console.log(new Date().toString() + ' Sent five day for ' + ticker);
}

async function getAnnualQuotes(req, res) {
  const ticker = req.query.id;
  res.json(await polygonClient.getAnnualQuotes(ticker));
  console.log(new Date().toString() + ' Sent annual for ' + ticker);
}

async function getFiveYearQuotes(req, res) {
  const ticker = req.query.id;
  res.json(await avClient.getFiveYearQuotes(ticker));
  console.log(new Date().toString() + ' Sent five year for ' + ticker);
}

function formatSearch(unformattedName) {
  // Upper case Company Name and remove any non-alphanumerics except for spaces between words
  let name = String(unformattedName).toUpperCase();
  return name.replace(/[^0-9a-z\s]/gi, '').trim();
}