import React, { useEffect, useState } from 'react';
import { CardHeader, Chip, Typography } from '@material-ui/core';
import './ChartHeader.css';
import { ApiClient } from '../../services/Api';
import { ArrowUpward } from '@material-ui/icons';

function ChartHeader(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const dateRange = props.dateRange;
  const chartData = props.chartData;

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
      const decimalFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: 'always'
      });
      
      const lastPrice = chartData[chartData.length-1].y;
      const change = lastQuote - lastPrice;
      const dateLabel = (dateRange !== '1D') ? dateRange : 'Today';
      const changeString = decimalFormatter.format(change) + ' ' + dateLabel;
      setAmountChange(changeString);
    }
  }, [chartData, lastQuote, dateRange])

  const [percentChange, setPercentChange] = useState(null);
  useEffect(() => {
    const percentFormatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const lastPrice = chartData[chartData.length-1].y;
    const percentChange = (lastQuote - lastPrice) / lastPrice;
    setPercentChange(percentFormatter.format(percentChange))
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
      <div className="stock-performance">
        <span>
        <Typography className="last-quote" >
          {currencyFormatter.format(lastQuote)}
        </Typography>
        </span>
        <div className="percent-box">
          <ArrowUpward className="direction-icon" />
          <Typography className="percent-change">
            {percentChange}
          </Typography>
        </div>
        <Typography className="amount-change">
          {amountChange}
        </Typography>
      </div>
      <Typography variant="subtitle1" className="last-updated">
        {updateTime}
      </Typography>
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