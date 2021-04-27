import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { enUS } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import EquityChartData from '../../services/EquityChartData';

function StockPriceChart(props) {
  const intraday = props.intraday;

  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (intraday !== undefined) {
      const equityChartData = new EquityChartData(intraday);
      setChartData(equityChartData.getChartData());
    }
  }, [intraday]);

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    let gradient;
    if(chartContainer !== null) {
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
        data: chartData,
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
              unit: 'hour',
              displayFormats: {
                hour: 'hh:mm a',
              },
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
              callback: function(value, index, values) {
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
  }, [chartContainer, chartData]);


  return(
    <canvas
      id="stockChart"
      ref={chartContainer}
      width="400"
      height="200"
      aria-label="stock price graph"
      role="img"
    />
  );
}

export default StockPriceChart