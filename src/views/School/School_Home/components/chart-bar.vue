<template>
    <div class="chart-box">
      <v-chart :options="polar"/>
    </div>
</template>

<script>
export default {
  name: 'chartBar',
  data () {
    return {
      polar: {
          legend: {},
          tooltip: {},
          dataset: {
              dimensions: ['product', '2017', '2018', '2019'],
              source: [
                  {product: '男女比列', '2017': 43.3, '2018': 85.8, '2019': 93.7},
                  {product: '城乡比列', '2017': 83.1, '2018': 73.4, '2019': 55.1},
                  {product: '有无男朋友比列', '2017': 72.4, '2018': 53.9, '2019': 39.1},
                  {product: '其他', '2017': 86.4, '2018': 65.2, '2019': 82.5}
              ]
          },
          xAxis: {type: 'category'},
          yAxis: {},
          series: [
              {
                type: 'bar',
                itemStyle:{
                  color: '#40c9c6'
                }
              },
              {
                type: 'bar',
                itemStyle:{
                  color: '#36a3f7'
                }
              },
              {
                type: 'bar',
                itemStyle:{
                  color: '#f4516c'
                }
              }
          ],
        animationDuration: 2000
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-box {
  width: 100%;
  height: 500px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
}
.echarts {
  width: 100% !important;
  height: 100% !important;
}

</style>
