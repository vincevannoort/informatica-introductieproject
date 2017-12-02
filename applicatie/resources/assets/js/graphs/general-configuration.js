'use strict'

let generalConfiguration = {
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

module.exports = generalConfiguration