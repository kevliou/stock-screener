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

  // Update the About Card
  useEffect(() => {
    let isMounted = true;

    if (selectedTicker !== '') {
      const apiClient = new ApiClient();

      apiClient.getCompanyOverview(selectedTicker)
        .then(res => (isMounted) ? updateAboutCard(res) : undefined)
        .catch(err => console.log('Error retrieving About data: ' + err));
    }
    
    function updateAboutCard(apiData) {
      const wholeNumber = new Intl.NumberFormat('en-US');

      setDescription(apiData.description);

      setAboutList(new Map([
        ['sector', apiData.sector],
        ['industry', apiData.industry],
        ['headquarters', formatAddress(apiData)],
        ['employees', formatNumber(apiData.employees, wholeNumber)]
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
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const decimal = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      const percentage = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const apiClient = new ApiClient();

      let keyStatMap = new Map([
        ['previous close', null],
        ['day range', null],
        ['year range', null],
        ['market cap', null],
        ['volume', null],
        ['p/e ratio', null],
        ['dividend yield', null],
        ['eps', null]
      ]);
    
      // Fetch key stats data from api
      const keyStatsProm = await apiClient.getKeyStats(selectedTicker)
        .then(res => updateKeyStats(res))
        .catch(err => console.log('Error retrieving Key Stats: ' + err));

      // Fetch previous quote data from api
      const quoteProm = await apiClient.getPreviousDayQuote(selectedTicker)
        .then(res => updateQuote(res))
        .catch(err => console.log('Error retrieving previous day quote: ' + err));

      function updateKeyStats(apiData) {
        keyStatMap.set('year range', formatNumber(apiData.week52low, currency) + " - " +
          formatNumber(apiData.week52high, currency));
        keyStatMap.set('market cap', abbreviateNumber(apiData.marketcap) + ' USD');
        keyStatMap.set('p/e ratio', formatNumber(apiData.peRatio, decimal));
        keyStatMap.set('dividend yield', formatNumber(apiData.dividendYield, percentage));
        keyStatMap.set('eps', formatNumber(apiData.ttmEPS, decimal));      
      }

      function updateQuote(apiData) {
        keyStatMap.set('previous close', formatNumber(apiData.close, decimal));
        keyStatMap.set('day range', formatNumber(apiData.low, currency) + " - " +
          formatNumber(apiData.high, currency));
        keyStatMap.set('volume', abbreviateNumber(apiData.volume));
      }

      Promise.all([keyStatsProm, quoteProm])
        .then((isMounted) ? setKeyStatList(keyStatMap) : undefined);
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