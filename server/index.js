const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
const tickerPath = './data/ticker-dictionary.json';
const suggestionsPath = './data/autocomplete-suggestions.json';
const suggestionList = JSON.parse(
    fs.readFileSync(suggestionsPath, 'utf-8', (res, err) => {
        if (err) {
            console.log('Suggestion file read failed: ' + err)
        }
    })
);

app.get('/api/getTickerDict', cors(corsOptions), (req, res) => {
    const file = fs.readFileSync(tickerPath,'utf8', (res, err) => {
        if (err) {
            console.log('Ticker dictionary file read failed: ' + err)
            return
        }
    });
    res.json(file);
    console.log('Sent ticker dictionary');
});

app.get('/api/getSuggestion', cors(), (req, res) => {
    // console.log(suggestionList['APPL']);
    const searchTerm = formatSearch(req.query.id);
    res.json(suggestionList[searchTerm]);
    console.log('Search term: ' + searchTerm);
    console.log('Results: ' + suggestionList[searchTerm]);
});

function formatSearch(unformattedName){
    // Upper case Company Name and remove any non-alphanumerics except for spaces between words
    let name = String(unformattedName).toUpperCase();
    return name.replace(/[^0-9a-z\s]/gi,'').trim();
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);