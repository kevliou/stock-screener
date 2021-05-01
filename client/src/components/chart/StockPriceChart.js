import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import './StockPriceChart.css';

function StockPriceChart(props) {
  const chartOptions = props.chartOptions;

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    let gradient;
    if (chartContainer !== null) {
      const height = chartContainer.current.height;
      const ctx = chartContainer.current.getContext('2d');
      gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgb(221, 242, 229)');
      gradient.addColorStop(1, 'white');
    }

    const data = {
      datasets: [{
        backgroundColor: gradient,
        borderColor: 'rgb(5, 168, 88)',
        data: chartOptions.data,
        fill: 'start',
        pointRadius: 0,
        spanGaps: false
      }]
    };

    const chartConfig = {
      type: 'line',
      data: data,
      options: {
        adapter: {
          date: {
            locale: enUS
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            intersect: false,
            displayColors: false,
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: chartOptions.unit,
              displayFormats: chartOptions.displayFormats,
              tooltipFormat: 'MMM dd, yyyy hh:mm a',
            },
            grid: {
              display: false,
            },
            ticks: {
              // major: {
              //   enabled: true
              // }
              //   // autoSkip: false,
              //   callback: function(value, index, values) {
              //     return (index % 10) ? '' : value;
              //   }
            },
          },
          y: {
            ticks: {
              callback: function (value, index, values) {
                return Number.parseFloat(value).toFixed(2);
              }
            }
          }
        }
      }
    };

    if (chartContainer !== null) {
      // Clear canvas if chart instance already exists
      if (chartInstance !== null) {
        chartInstance.destroy();
      }

      const instance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(instance);
    }
  }, [chartContainer, chartOptions]);


  return (
    <canvas
      id="stock-chart"
      ref={chartContainer}
      aria-label="stock price graph"
      role="img"
      on
    />
  );
}

export default StockPriceChart