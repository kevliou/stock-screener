import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

function StockPriceChart(props) {
  const intraday = props.intraday;

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };
    
  const chartConfig = {
    type: 'line',
    data: data,
    options: {}
  };

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
    }
  }, [chartContainer]);

  return(
    <div>
      <canvas 
        id = "stockChart" 
        ref = {chartContainer}
        width = "400" 
        height = "400" 
      />
    </div>
  );
}

export default StockPriceChart