import React, { useEffect, useState } from 'react';
import { CardHeader, Chip, Typography } from '@material-ui/core';
import './ChartHeader.css';
import { ApiClient } from '../../services/Api';

import PriceChangePercent from './PriceChangePercent';
import PriceChangeAmount from './PriceChangeAmount';

function ChartHeader(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const dateRange = props.dateRange;
  const chartData = props.chartData;
  const isChangePositive = props.isChangePositive;
  const handlePriceChange = props.handlePriceChange;

  const [lastQuote, setLastQuote] = useState(null);
  const [updateTime, setUpdateTime] = useState(null);
  useEffect(() => {
    const dateOptions = {
      dateStyle: 'long',
      timeStyle: 'long',
      timeZone: 'America/New_York'
    }
    const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions)

    async function getQuote() {
      const apiClient = new ApiClient();
      apiClient.getQuote(selectedTicker)
        .then(res => {
          setUpdateTime(dateFormatter.format(new Date(res.t * 1000)))
          setLastQuote(res.c)
        });
    }
    
    if (selectedTicker !== '') {
      setLastQuote(null)
      getQuote();
    }
  }, [selectedTicker])

  const [amountChange, setAmountChange] = useState(null);
  useEffect(() => {
    if (chartData !== undefined) {
      const startPrice = chartData[0].y;
      const change = lastQuote - startPrice;
      handlePriceChange((change >= 0) ? true: false);
      setAmountChange(change);
    }
  }, [chartData, lastQuote, handlePriceChange])

  const [percentChange, setPercentChange] = useState(null);
  useEffect(() => {
    if (chartData !== undefined) {
      const startPrice = chartData[0].y;
      const percentChange = (lastQuote - startPrice) / startPrice;
      setPercentChange(percentChange);
    }
  }, [chartData, lastQuote])

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let header = (
    <>
      <Typography variant="h1">
        {selectedName}
      </Typography>
      { chartData &&
        <>
          <div className="stock-performance">
            <span>
              <Typography className="last-quote" >
                {currencyFormatter.format(lastQuote)}
              </Typography>
            </span>
            <PriceChangePercent
              isChangePositive={isChangePositive}
              percentChange={percentChange}
            />
            <PriceChangeAmount
              isChangePositive={isChangePositive}
              amountChange={amountChange}
              dateRange={dateRange}
            />
          </div>
          <Typography variant="subtitle1" className="last-updated">
            {updateTime}
          </Typography>
        </>
      }
    </>
  );

  return (
    <CardHeader
      title={header}
      disableTypography={true}
      action={
        <Chip
          color="primary"  
          label={selectedTicker}
        />
      }
    />
  );
}

export default ChartHeader