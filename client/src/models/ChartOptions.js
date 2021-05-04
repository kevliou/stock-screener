import { enUS } from 'date-fns/locale';

export class ChartOptions {
  constructor(apiData, gradient, dateRange) {
    this.chartConfig.data.datasets[0].data = apiData;
    this.setGradient(gradient);
    this.setDateRange(dateRange);
    this.setYAxisFormat();
  }

  setDateRange(dateRange) {
    let xScale = this.chartConfig.options.scales.x;

    switch (dateRange) {
      case '1D':
        let date = new Date();
        date.setHours(16);
        date.setMinutes(0);
        date.setSeconds(0);

        xScale.time.unit = 'hour';
        xScale.type = 'time';
        xScale.max = date;
        xScale.time.displayFormats = { hour: 'hh:mm a' };
        break;
      case '5D':
        xScale.time.unit = 'day';
        xScale.type = 'timeseries';
        delete xScale.max;
        xScale.time.displayFormats = { day: 'MMM dd' };
        break;
      case '1M':
        xScale.time.unit = 'week';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.displayFormats = { week: 'MMM dd' };
        break;
      case '6M':
        xScale.time.unit = 'month';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.displayFormats = { month: 'MMM yyyy' };
        break;
      case 'YTD':
        xScale.time.unit = 'month';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.displayFormats = { month: 'MMM yyyy' };
        break;
      case '1Y':
        xScale.time.unit = 'quarter';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.displayFormats = { quarter: 'MMM yyyy' };
        break;
      case '5Y':
        xScale.time.unit = 'year';
        xScale.type = 'time';
        delete xScale.max;
        xScale.time.displayFormats = { year: 'yyyy' };
        break;
      default:
        console.log('Uncaught date range');
    }
  }

  setGradient(gradient) {
    this.chartConfig.data.datasets[0].backgroundColor = gradient;
  }

  setYAxisFormat() {
    this.chartConfig.options.scales.y.tick.callback = function(value) {
      const formatter = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2})
      return formatter(value);
    }
  }

  getConfiguration() {
    return this.chartConfig;
  } 

  chartConfig = {
    type: 'line',
    data: {
      datasets: [{
        label: 'Quote',
        data: [],
        backgroundColor: '',
        borderColor: 'rgb(5, 168, 88)',
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
            displayFormats: {},
            tooltipFormat: 'MMM dd, yyyy hh:mm a',
          },
          grid: {
            display: false,
          },
        },
        y: {
          tick: { callback: '' }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  }
}