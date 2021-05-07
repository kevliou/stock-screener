import { enUS } from 'date-fns/locale';
import Chart from 'chart.js/auto';

export class ChartMaker {
  constructor(chartContainer, chartData, dateRange, isChangePositive = true) {
    this.chartContainer = chartContainer;
    const gradient = this.getGradient(chartContainer.current, isChangePositive);

    const dataOptions = this.chartConfig.data.datasets[0];
    dataOptions.data = chartData;
    dataOptions.backgroundColor = gradient;
    dataOptions.borderColor = this.getBorderColor(isChangePositive);

    this.setDateRangeOptions(this.chartConfig, dateRange);
  }

  getGradient(chartContainer, isChangePositive) {
    const height = chartContainer.height;
    const ctx = chartContainer.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, height);

    (isChangePositive)
      ? gradient.addColorStop(0, 'rgb(221, 242, 229)')
      : gradient.addColorStop(0, 'rgb(253, 191, 188)');

    gradient.addColorStop(1, 'white');
    return gradient;
  }

  getBorderColor(isChangePositive) {
    return (isChangePositive) ? 'rgb(5, 168, 88)' : 'rgb(244,62,62)';
  }

  setDateRangeOptions(config, dateRange) {
    let xScale = config.options.scales.x;

    switch (dateRange) {
      case '1D':
        let date = new Date();
        date.setHours(16);
        date.setMinutes(0);
        date.setSeconds(0);

        xScale.time.unit = 'hour';
        xScale.type = 'time';
        xScale.max = date;
        xScale.time.tooltipFormat = 'MMM dd, yyyy hh:mm a';
        break;
      case '5D':
        xScale.time.unit = 'day';
        xScale.type = 'timeseries';
        delete xScale.max;
        xScale.time.tooltipFormat = 'MMM dd, yyyy hh:mm a';
        break;
      case '1M':
        xScale.time.unit = 'week';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.tooltipFormat = 'MMM dd, yyyy';
        break;
      case '6M':
        xScale.time.unit = 'month';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.tooltipFormat = 'MMM dd, yyyy';
        break;
      case 'YTD':
        xScale.time.unit = 'month';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.tooltipFormat = 'MMM dd, yyyy';
        break;
      case '1Y':
        xScale.time.unit = 'quarter';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.tooltipFormat = 'MMM dd, yyyy';
        break;
      case '5Y':
        xScale.time.unit = 'year';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.tooltipFormat = 'MMM dd, yyyy';
        break;
      default:
        console.log('Uncaught date range');
    }
  }

  getChart() {
    const config = this.chartConfig;
    return new Chart(this.chartContainer.current, config);
  }

  chartConfig = {
    type: 'line',
    data: {
      datasets: [{
        label: 'Quote',
        data: [],
        backgroundColor: '',
        borderColor: '',
        fill: 'start',
        pointRadius: 0,
        spanGaps: true
      }]
    },
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
            unit: '',
            displayFormats: {
              hour: 'hh:mm a',
              day: 'MMM dd',
              week: 'MMM dd',
              month: 'MMM yyyy',
              quarter: 'MMM yyyy',
              year: 'yyyy'
            },
            tooltipFormat: '',
          },
          grid: {
            display: false,
          },
        },
        y: {
          tick: { 
            callback: function(value) {
              const formatter = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
              return formatter(value) 
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }
}