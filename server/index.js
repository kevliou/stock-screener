const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
const tickerPath = './data/ticker-dictionary.json';


app.get('/api/getTickerDict', cors(corsOptions), (req, res) => {
    const file = fs.readFileSync(tickerPath,'utf8', (res, err) => {
        if (err) {
            console.log('File read failed:')
            return
        }
    });
    res.json(file);
});

// An api endpoint that returns a short list of items
app.get('/api/getList', cors(corsOptions), (req,res) => {
    const list = [
        {"ticker": "AAPL"},
        {"ticker": "MSFT"},
    ]
    res.json(list);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);