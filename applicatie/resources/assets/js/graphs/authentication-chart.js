'use strict'

import generalConfiguration from './general-configuration'

class AuthenticationChart {

  static generate(id) {
    var ctx = document.getElementById(id).getContext('2d')
    var createdChart = new Chart(
      ctx, 
      { type: 'bar',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
          datasets: [{ 
            data: [ 35, 54, 56, 35, 49, 53, 37, 57, 30, 36, 35, 34, 54, 43, 60, 37, 36, 45, 34, 41, 39, 47, 49, 60, 45 ], 
            backgroundColor: '#CC0000'
          }] 
        },
        options: generalConfiguration
      }
    )
    return createdChart
  }

  static randomUpdate(chart) {
    chart.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return Math.floor(Math.random() * 30) + 30;
        });
    });
    chart.update();
  }

  static startRandomIntervalUpdating(chart) {
    var chartUpdater = setInterval(function() { AuthenticationChart.randomUpdate(chart) }, 2500);
  }

}

export { AuthenticationChart as default }