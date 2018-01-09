<template>
  <div class="relations-graph-canvas-container">
    <canvas id="relations-graph-canvas" />
  </div>
</template>

<script>
  const chartConfiguration = {
    scaleShowVerticalLines: false,
    showLines: false,
    scaleShowLabels: false,
    tooltips: false,
    scales: {
      xAxes: [{
        gridLines: { drawBorder: false, display: false },
        barThickness: 12
      }],
      yAxes: [{
        gridLines: { drawBorder: false },
        ticks: { beginAtZero: true }
      }]
    }
  }

  export default {
    props: {
      relations: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    data() {
      return {
        labels: ['0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'],
        datasets: [{
          data: [30, 34, 36, 38, 34, 45, 46, 55, 50, 60, 63, 64, 66, 66, 70, 68, 66, 69, 72, 74, 76, 78],
          backgroundColor: '#ff2b46',
          borderWidth: 1,
          showLine: true
        }]
      }
    },
    computed: {
      relationsDataSet() {
        let relationsLabels = {
          '0%': 0,
          '5%': 0,
          '10%': 0,
          '15%': 0,
          '20%': 0,
          '25%': 0,
          '30%': 0,
          '35%': 0,
          '40%': 0,
          '45%': 0,
          '50%': 0,
          '55%': 0,
          '60%': 0,
          '65%': 0,
          '70%': 0,
          '75%': 0,
          '80%': 0,
          '85%': 0,
          '90%': 0,
          '95%': 0,
          '100%': 0
        }

        this.relations.forEach((relation) => {
          relationsLabels[`${(Math.round(relation.insight_total / 10) * 10).toString()}%`] += 1
        })

        return relationsLabels
      }
    },
    mounted() {
      let ctx = document.getElementById('relations-graph-canvas').getContext('2d')
      let gradient = ctx.createLinearGradient(0, 0, 0, 320)
      gradient.addColorStop(0, 'rgba(255, 43, 70, 1)')
      gradient.addColorStop(1, 'rgba(255, 43, 70, 0)')

      let self = this
      let myChart = new Chart(ctx, {
        type: 'line',
        options: chartConfiguration,
        data: {
          labels: self.labels,
          datasets: self.datasets
        }
      })

      myChart.data.datasets[0].backgroundColor = gradient
      myChart.update()
    }
  }
</script>

<style lang="scss">
  .relations-graph-canvas-container {
    position: relative;
    max-height: 355px;
    height:100%;
    width:100%;
    transform: translateY(15px);
  }
</style>
