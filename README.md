# Stock Screener

This project creates a stock screening website built with React frontend and Express backend. Users can enter US-exchange listed companies or tickers to pull up financial information from [Alpha Vantage](https://www.alphavantage.co/).

## Development Setup

### Prerequisites

Make sure you have the following:
* Install [Node.js](https://nodejs.org/en/download/), which should include [Node Package Manager](https://www.npmjs.com/get-npm)
* Register for a free API key from [Alpha Vantage Support](https://www.alphavantage.co/support/#api-key)

### Downloading Project

To clone the repository:
```
git clone https://github.com/kevliou/stock-screener.git
```

### Setting Up a Project

1. Install the dependencies:
```
npm install
```

2. Create a config.js file with the API key:
```
cd server
touch config.js
```

3. Config.js file should contain:
``` javascript
const keys = {
    'ALPHA_VANTAGE_API_KEY' : '[insert key here]'
}

module.exports.keys = keys;
```

### Running the Application

To launch both the frontend and backend:
```
cd server
npm run dev
```

To launch only the backend:
```
cd server
npm start
```

To launch only the frontend:
```
cd client
npm start
```

## Related Projects

To be populated

## License

This project uses the following license: [MIT License](LICENSE.md)