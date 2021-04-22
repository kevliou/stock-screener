const express = require('express');
const router = express.Router();

// Define API routes
router.get('/getTickerDict', getTickerDict);
router.get('/getSuggestion', getSuggestion);
router.get('/getOverview', getOverview);

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

module.exports = router

function formatSearch(unformattedName){
    // Upper case Company Name and remove any non-alphanumerics except for spaces between words
    let name = String(unformattedName).toUpperCase();
    return name.replace(/[^0-9a-z\s]/gi,'').trim();
}