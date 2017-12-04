'use strict'

let authenticationChartConfiguration = {
  scaleShowVerticalLines: false,
  showLines: false,
  scaleShowLabels: false,
  scales: {
    xAxes: [{
      display: false,
      barThickness: 20
    }],
    yAxes: [{
      display: false,
      ticks: { beginAtZero: true }
    }],
  }
}

module.exports = authenticationChartConfiguration