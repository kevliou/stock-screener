const express = require('express');
const router = express.Router();

// Define API routes
router.get('/getTickerDict', getTickerDict);
router.get('/getSuggestion', getSuggestion);
router.get('/getOverview', getOverview);
router.get('/getQuote', getQuote);
router.get('/getIntraday', getIntraday);

module.exports = router

const fs = require('fs');
const apiClient = require('./apiClient');

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
    res.json(await apiClient.getCompanyOverview(ticker));
    console.log('Sent company overview for ' + ticker);
}

async function getQuote(req, res) {
  const ticker = req.query.id;
  res.json(await apiClient.getQuote(ticker));
  console.log('Sent quote for ' + ticker);
}

async function getIntraday(req, res) {
  const ticker = req.query.id;
  res.json(await apiClient.getIntraday(ticker));
  console.log('Sent intraday for ' + ticker);
}

function formatSearch(unformattedName){
    // Upper case Company Name and remove any non-alphanumerics except for spaces between words
    let name = String(unformattedName).toUpperCase();
    return name.replace(/[^0-9a-z\s]/gi,'').trim();
}