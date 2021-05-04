import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

import 'chartjs-adapter-date-fns';
import './StockPriceChart.css';
import { ChartOptions } from '../../models/ChartOptions';

function StockPriceChart(props) {
  const chartData = props.chartData;
  const dateRange = props.dateRange;

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer !== null) {
          // Clear canvas if chart instance already exists
          if (chartInstance !== null) {
            chartInstance.destroy();
          }

          // Create gradient
          const height = chartContainer.current.height;
          const ctx = chartContainer.current.getContext('2d');
          let gradient = ctx.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, 'rgb(221, 242, 229)');
          gradient.addColorStop(1, 'white');
          
          const options = new ChartOptions(chartData, gradient, dateRange);
          const chartConfig = options.getConfiguration();

          const instance = new Chart(chartContainer.current, chartConfig);
          setChartInstance(instance);
        }
  }, [chartContainer, dateRange, chartData])

  return (
    <div className="chart-container">
      <canvas
        id="stock-chart"
        ref={chartContainer}
        aria-label="stock price graph"
        role="img"
      />
    </div>
  );
}

export default StockPriceChart