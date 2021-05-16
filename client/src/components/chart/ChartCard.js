import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import StockPriceChart from './StockPriceChart';
import DateToggleButtons from './DateToggleButtons';
import ChartHeader from './ChartHeader';
import { useChartData } from './ChartHooks';
import './ChartCard.css';
import TransitionManager from '../transition/TransitionManager';

function ChartCard(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;

  const [dateRange, setDateRange] = useState('1D');
  const handleDateClick = (e, newDateRange) => {
    if (newDateRange !== null) {
      setDateRange(newDateRange);
    }
  }

  // Fetch data on ticker change
  const [chartData, chartLoading, chartError] = useChartData(dateRange, selectedTicker);
  useEffect(() => {
    // Reset to 1 day view on new ticker selected
    setDateRange('1D');
  }, [selectedTicker]);

  const [isChangePositive, setIsChangePositive] = useState(null);
  function handlePriceChange(isPositive) {
    setIsChangePositive(isPositive);
  }

  return (
    <Card>
      <ChartHeader
        selectedTicker={selectedTicker}
        selectedName={selectedName}
        dateRange={dateRange}
        chartData={chartData}
        isChangePositive={isChangePositive}
        handlePriceChange={handlePriceChange}
      />
      <CardContent className="content">
        <DateToggleButtons
          dateRange={dateRange}
          handleDateClick={handleDateClick}
        />
        <div>
          <TransitionManager
            content={chartData &&
              <StockPriceChart
                dateRange={dateRange}
                chartData={chartData}
                isChangePositive={isChangePositive}
              />
            }
            isLoading={chartLoading}
            loadingMessage="Loading"
            error={chartError}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartCard