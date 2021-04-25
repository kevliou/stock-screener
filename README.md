# Stock Screener

This project creates a stock screening website built with React frontend and Express backend. Users can enter US-exchange listed companies or stock tickers to pull up financial information from [Alpha Vantage](https://www.alphavantage.co/).

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

Install the dependencies:
```
npm install
```

Create a config.js file to store the API key:
```
> cd server
> touch config.js
```

Config.js file should contain:
``` javascript
const keys = {
    'ALPHA_VANTAGE_API_KEY' : '[insert key here]'
}

module.exports.keys = keys;
```

### Running the Application

To launch the server and client at the same time:
```
> cd server
> npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

To launch either the server or the client only, navigate to the relevant project directory and run:
```
npm start
```

## Related Projects

To be populated

## License

This project uses the following license: [MIT License](LICENSE.md)