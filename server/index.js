const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

// All API routes are defined in routes.js
const routes = require('./routes');
app.use('/api', cors(corsOptions), routes);

app.use(errorHandling);

function errorHandling(error, req, res, next) {
    if (res.headersSent) {
        next (error);
    } else {
        res.status(500);
        res.json({
            message: error.message,
            ...(process.env.NODE_ENV === 'production' ? null: {stack: error.stack}),
        });
    }
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);