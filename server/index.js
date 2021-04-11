const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000/*'
}

// An api endpoint that returns a short list of items
app.get('/api/getList', cors(corsOptions), (req,res) => {
    const list = [
        {"ticker": "AAPL", "name": "Apple Inc"},
        {"ticker": "MSFT", "name": "Microsoft Corporation"},
    ]
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    //console.log(req);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);