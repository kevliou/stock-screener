import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { enUS } from 'date-fns/locale';
import { parse, format } from 'date-fns';
import 'chartjs-adapter-date-fns';

function StockPriceChart(props) {
  const intraday = props.intraday;

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    // const labels = [
    //   'January','',
    //   // 'February',
    //   'March','',
    //   // 'April',
    //   'May','',
    //   // 'June',
    // ];

    const data = {
      // labels: labels,
      datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        // data: [65, 59, 70, 81, 56, 55, 40],
        data: [
          {x:'January', y:65},
          {x:'February', y:59},
          {x:'March', y:81},
          {x:'April', y:56},
          {x:'May', y:55},
          {x:'June', y:40},
        ]
        // data: parseIntraday(intraday)
      }]
    };
      
    const chartConfig = {
      type: 'line',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            type: 'time',
            unit: 'month',
            time: { 
              displayFormats: {
                month: 'MM'
              }
            },
            ticks: {
              autoSkip: false,
              // callback: function(value, index, values) {
              //   // return (index % 2) ? '' : value;
              // }
            }
          }
          
          // adapter: {
          //   date: {
          //     locale: enUS
          //   }
          // },
            // time: {
            //   unit: 'hour',
            //   // unit: 'hour'
            //   parser: 'YYYY-MM-DD HH:mm:ss',
            //   displayFormats: {
            //     hour: 'HH:mm'
            //   }
            // }
          // }]
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
  }, [chartContainer, intraday]);

  

  // const data = {
  //   labels: labels,
  //   datasets: [{
  //     label: 'My First dataset',
  //     backgroundColor: 'rgb(255, 99, 132)',
  //     borderColor: 'rgb(255, 99, 132)',
  //     data: [65, 59, 70, 81, 56, 55, 40],
  //   }]
  // };
    
  // const chartConfig = {
  //   type: 'line',
  //   data: data,
  //   options: {
  //   }
  // };









  // const chartConfig = {
  //   type: 'line',
  //   data: data,
  //   options: {
  //     parsing: {
  //       xAxisKey: 'time',
  //       yAxisKey: 'close'
  //     },
  //     scales: {
  //       xAxes: [{
  //         type: 'time',
  //         adapter: {
  //           date: {
  //             locale: enUS
  //           }
  //         },
  //         time: {
  //           unit: 'minute',
  //           parser: 'YYYY/MM/DD HH:mm:SS'
  //         }
  //       }]
  //     }
  //   }
  // };

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

function parseIntraday(data) {
  const result = [];
  const timeSeriesData = data['Time Series (5min)'];

  for (let key in timeSeriesData) {
    // console.log(parse(key,'yyyy-MM-dd HH:mm:ss',new Date()));

	  let entry = {
  	  time: key,
      // time: parse(key,'yyyy-MM-dd HH:mm:ss','mm:ss'),
      close: timeSeriesData[key]['4. close'],
      volume: timeSeriesData[key]['5. volume'],
    }
    result.push(entry);
  }

  return result;
}

export default StockPriceChart