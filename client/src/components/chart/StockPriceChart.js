import React, { useEffect, useState, useRef } from 'react';
import 'chartjs-adapter-date-fns';
import { ChartMaker } from '../../services/ChartMaker';
import './StockPriceChart.css';

function StockPriceChart(props) {
  const chartData = props.chartData;
  const dateRange = props.dateRange;
  const isChangePositive = props.isChangePositive;

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer !== null) {
      setChartInstance(prevChart => {
        if (prevChart !== null) {
          prevChart.destroy();
          const chartMaker = new ChartMaker(chartContainer, chartData, dateRange);
          return chartMaker.getChart();
        } else {
          const chartMaker = new ChartMaker(chartContainer, chartData, dateRange);
          return chartMaker.getChart();    
        }
      });
    }
  }, [chartContainer, chartData, dateRange]);

  // Conditionally update chart color
  useEffect(() => {
    if (chartInstance !== null) {
      const height = chartContainer.current.height;
      const ctx = chartContainer.current.getContext('2d');
      let gradient = ctx.createLinearGradient(0, 0, 0, height);

      (isChangePositive)
        ? gradient.addColorStop(0, 'rgb(221, 242, 229)')
        : gradient.addColorStop(0, 'rgb(253, 191, 188)');
      gradient.addColorStop(1, 'white');

      const borderColor = (isChangePositive) ? 'rgb(5, 168, 88)' : 'rgb(244,62,62)';

      chartInstance.data.datasets[0].backgroundColor = gradient;
      chartInstance.data.datasets[0].borderColor = borderColor;
      chartInstance.update();
    }
  }, [chartContainer, chartInstance, isChangePositive]);

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