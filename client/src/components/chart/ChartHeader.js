import React, { useEffect, useState } from 'react';
import { CardHeader, Chip, Typography } from '@material-ui/core';
import PriceChangePercent from './PriceChangePercent';
import PriceChangeAmount from './PriceChangeAmount';
import { useApi } from '../ApiHook';
import './ChartHeader.css';

function ChartHeader(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const dateRange = props.dateRange;
  const chartData = props.chartData;
  const isChangePositive = props.isChangePositive;
  const handlePriceChange = props.handlePriceChange;

  const [quoteApiData] = useApi('/getQuote', selectedTicker)
  const [lastQuote, setLastQuote] = useState(undefined);
  const [updateTime, setUpdateTime] = useState(undefined);
  useEffect(() => {
    if (quoteApiData !== undefined) {
      const dateOptions = {
        dateStyle: 'long',
        timeStyle: 'long',
        timeZone: 'America/New_York'
      }
      const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions)

      setUpdateTime(dateFormatter.format(new Date(quoteApiData.t * 1000)))
      setLastQuote(quoteApiData.c)

    } else {
      setLastQuote(undefined);
    }
  }, [quoteApiData])

  const [amountChange, setAmountChange] = useState(null);
  useEffect(() => {
    if (chartData !== undefined && lastQuote !== undefined) {
      const startPrice = chartData[0].y;
      const change = lastQuote - startPrice;
      handlePriceChange((change >= 0) ? true: false);
      setAmountChange(change);
    }
  }, [chartData, lastQuote, handlePriceChange])

  const [percentChange, setPercentChange] = useState(null);
  useEffect(() => {
    if (chartData !== undefined && lastQuote !== undefined) {
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
      { lastQuote &&
        <>
          <div className="stock-performance">
            <span>
              <Typography className="last-quote" >
                {currencyFormatter.format(lastQuote)}
              </Typography>
            </span>
            {percentChange &&
              <PriceChangePercent
                isChangePositive={isChangePositive}
                percentChange={percentChange}
              />
            }
            {amountChange &&
              <PriceChangeAmount
                isChangePositive={isChangePositive}
                amountChange={amountChange}
                dateRange={dateRange}
              />
            }
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