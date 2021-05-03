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

  // Update the About Card
  useEffect(() => {
    let isMounted = true;

    if (selectedTicker !== '') {
      const apiClient = new ApiClient();

      apiClient.getCompanyOverview(selectedTicker)
        .then(res => (isMounted) ? updateAboutCard(res) : undefined)
        .catch(err => console.log('Error in About update: ' + err));
    }
    
    function updateAboutCard(data) {
      const wholeNumber = new Intl.NumberFormat('en-US');

      setDescription(data.description);

      setAboutList(new Map([
        ['sector', data.sector],
        ['industry', data.industry],
        ['headquarters', formatAddress(data)],
        ['employees', formatNumber(data.employees, wholeNumber)]
      ]));
    }

    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);

  // Update Key Stats Card
  useEffect(() => {
    let isMounted = true;

    if (selectedTicker !== '') {
      fetchData();
    }
    
    async function fetchData() {
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

      const apiClient = new ApiClient();
      const keyStats = await apiClient.getKeyStats(selectedTicker)
        .then(res => (isMounted) ? res : undefined)
        .catch(err => console.log('Error in Key Stats update: ' + err));

      const quote = await apiClient.getPreviousDayQuote(selectedTicker)
        .then(res => (isMounted) ? res : undefined)
        .catch(err => console.log('Error in previous day quote: ' + err));

      if (quote !== undefined) {
        setPreviousClose(formatNumber(quote.close, currency));
      }

      if (keyStats !== undefined && quote !== undefined) {
        setKeyStatList(new Map([
          ['previous close', formatNumber(quote.close, decimal)],
          ['day range', formatNumber(quote.low, currency) + " - " +
            formatNumber(quote.high, currency)],
          ['year range', formatNumber(keyStats.week52low, currency) + " - " +
            formatNumber(keyStats.week52high, currency)],
          ['market cap', abbreviateNumber(keyStats.marketcap) + ' USD'],
          ['volume', abbreviateNumber(quote.volume)],
          ['p/e ratio', formatNumber(keyStats.peRatio, decimal)],
          ['dividend yield', formatNumber(keyStats.dividendYield, percentage)],
          ['eps', formatNumber(keyStats.ttmEPS, decimal)]
        ]));
      }
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

function formatAddress(data) {
  return (
    <>
      <Typography variant="body2">
        {data.address}
      </Typography>
      { data.address2 &&
        <Typography variant="body2">
          {data.address2}
        </Typography>
      }
      <Typography variant="body2">
        {data.city + ', ' + data.state}
      </Typography>
      <Typography variant="body2">
        {data.country}
      </Typography>
    </>
  )
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