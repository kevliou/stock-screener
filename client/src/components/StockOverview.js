import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { ApiClient } from '../services/Api';
import AboutCard from './other/AboutCard';
import KeyStatsCard from './other/KeyStatsCard';
import ChartCard from './chart/ChartCard';
import './StockOverview.css';

function StockOverview(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;

  const [aboutList, setAboutList] = useState(undefined);
  const [keyStatList, setKeyStatList] = useState(undefined);
  const [description, setDescription] = useState('');
  const [previousClose, setPreviousClose] = useState('');

  useEffect(() => {
    const apiClient = new ApiClient();

    const wholeNumber = new Intl.NumberFormat('en-US');
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    });
    const decimal = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2,
    });
    const percentage = new Intl.NumberFormat('en-US', {
      style: 'percent',
      maximumFractionDigits: 2,
    });

    let isMounted = true;
    async function fetchData() {
      const overview = await apiClient.getCompanyOverview(selectedTicker)
        .then(res => (isMounted) ? res : undefined);

      const quote = await apiClient.getQuote(selectedTicker)
        .then(res => (isMounted) ? res : undefined);

      if (overview !== undefined) {
        setDescription(overview.Description);
      }

      if (quote !== undefined) {
        setPreviousClose(formatNumber(quote['08. previous close'], currency));
      }

      if (overview !== undefined) {
        setAboutList(new Map([
          ['sector', overview.Sector],
          ['industry', overview.Industry],
          ['headquarters', formatAddress(overview.Address)],
          ['employees', formatNumber(overview.FullTimeEmployees, wholeNumber)]
        ]));
      }

      if (overview !== undefined && quote !== undefined) {
        setKeyStatList(new Map([
          ['previous close', formatNumber(quote['08. previous close'], decimal)],
          ['day range', formatNumber(quote['04. low'], currency) + " - " +
            formatNumber(quote['03. high'], currency)],
          ['year range', formatNumber(overview['52WeekLow'], currency) + " - " +
            formatNumber(overview['52WeekHigh'], currency)],
          ['market cap', abbreviateNumber(overview.MarketCapitalization) + ' USD'],
          ['volume', abbreviateNumber(quote['06. volume'])],
          ['p/e ratio', formatNumber(overview.PERatio, decimal)],
          ['dividend yield', formatNumber(overview.DividendYield, percentage)],
          ['eps', formatNumber(overview.EPS, decimal)],
          ['exchange', overview.Exchange]
        ]));
      }
    }

    if (selectedTicker !== '') {
      fetchData();
    }

    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);

  return (
    <div className="container">
      <div className="chart-card">
        <ChartCard
          selectedTicker={selectedTicker}
          selectedName={selectedName}
          previousClose={previousClose}
        />
      </div>
      <div className="key-stat-card">
        {keyStatList &&
          <KeyStatsCard
            keyStatList={keyStatList}
          />
        }
      </div>
      <div className="about-card">
        {aboutList &&
          <AboutCard
            description={description}
            aboutList={aboutList}
          />
        }
      </div>
    </div>
  );
}

function formatAddress(unformattedAddress) {
  if (unformattedAddress === undefined) {
    return;
  }

  let address = unformattedAddress.split(',');
  return (
    <>
      <Typography variant="body2">
        {address[0]}
      </Typography>
      <Typography variant="body2">
        {address[1] + ', ' + address[2]}
      </Typography>
      <Typography variant="body2">
        {address[3]}
      </Typography>
    </>
  );
}

function formatNumber(value, formatter) {
  if (!isNaN(value)) {
    return formatter.format(value);
  } else {
    return 'N/A';
  }
}

function abbreviateNumber(amount) {
  if (amount < 1000) {
    return amount;
  }

  const digits = Math.floor(Math.log10(amount) + 1);

  // Adjustment down if exactly divisible by 3, e.g. 100,000 = 100K not 0.1M
  const thousands = Math.floor(digits / 3) - (digits % 3 === 0);
  const symbol = "KMBT".charAt(thousands - 1);
  const roundedNum = (amount / Math.pow(10, thousands * 3)).toFixed(2);

  return roundedNum + symbol;
}

export default StockOverview