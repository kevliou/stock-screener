import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { useApi } from '../ApiHook';
import TransitionManager from '../transition/TransitionManager';
import DataTable from './DataTable';
import './KeyStatsCard.css';

function KeyStatsCard(props) {
  const selectedTicker = props.selectedTicker;
  const formatNumber = props.formatNumber;
  
  const [keyStatData, keyStatLoading, keyStatError] = useApi('/getKeyStats', selectedTicker);
  const [previousDayQuoteData, previousDayQuoteLoading, previousDayQuoteError] = useApi('/getPreviousDayQuote', selectedTicker);
  const [keyStatList, setKeyStatList] = useState(undefined);

  // Update Key Stats Card
  useEffect(() => {
    if (keyStatData !== undefined && previousDayQuoteData !== undefined) {
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

      updateKeyStats(keyStatData);
      updateQuote(previousDayQuoteData);
      setKeyStatList(keyStatMap);
    } else { 
      setKeyStatList(undefined);
    }
  }, [keyStatData, previousDayQuoteData, formatNumber]);

  return (
    <Card>
      <CardHeader
        title="Key stats"
      />
      <CardContent className="content">
        <TransitionManager
          content={<DataTable list={keyStatList} />}
          isLoading={keyStatLoading || previousDayQuoteLoading}
          loadingMessage="Loading"
          error={keyStatError || previousDayQuoteError}
        />
      </CardContent>
    </Card>
  );
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

export default KeyStatsCard