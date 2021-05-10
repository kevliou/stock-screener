# Stock Screener

This project creates a stock screening website built with React and a slim Express backend. Users can enter US-exchange listed companies or stock tickers to pull up financial information from multiple financial APIs. Multiple APIs were used due to differences in information provided and call rate limits.

A mock up of the site can be found in this [link](https://kevliou.github.io/stock-screener). It is deployed on GitHub Pages and Heroku.

## Development Setup

### Prerequisites

Install [Node.js](https://nodejs.org/en/download/), which should include [Node Package Manager](https://www.npmjs.com/get-npm)

Register for free API keys from the following sites:
* [Alpha Vantage Support](https://www.alphavantage.co/support/#api-key)
* [Polygon](https://polygon.io/dashboard/signup)
* [IEX Cloud](https://iexcloud.io/cloud-login#/register)
* [Finnhub](https://finnhub.io/register)

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

Create an environment variables file to store your API keys:
```
> cd server
> touch .env
```

The .env file should contain:
```
ALPHA_VANTAGE_API_KEY=ENTER_YOUR_KEY_HERE
POLYGON_KEY=ENTER_YOUR_KEY_HERE
IEX_KEY=ENTER_YOUR_KEY_HERE
FINNHUB_KEY=ENTER_YOUR_KEY_HERE
```

### Running the Application

To launch the server and client concurrently:
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

The predictive autocomplete suggestions for the search bar was created in a separate project. It was based on Nasdaq stock screener data. More information can be found [here](https://github.com/kevliou/stock-autocomplete-suggestions).

## License

This project uses the following license: [MIT License](LICENSE.md)