<template>
  <div class="wrapper">
    <panel-group/>
    <el-row :gutter="20" class="pie-box">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="home_head">
          分院人数以及占比
        </div>
        <chart-pie/>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="home_head">
          每年人数占比
        </div>
         <chart-line/>
      </el-col>
    </el-row>
    <div class="home_head">
      数据分析图
    </div>
    <chart-bar/>
  </div>
</template>

<script>
import panelGroup from './components/panel-group'
import chartBar from './components/chart-bar'
import chartPie from './components/chart-pie'
import chartLine from './components/chart-line'

export default {
  components: { panelGroup, chartBar, chartPie, chartLine },
  name: 'Dashboard',
  data () {
    return {
     
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper >>> .chart-box {
  width: 100%;
  height: 500px;
}
.wrapper >>> .echarts {
        width: 100%;
        height: 100%;
  }
.wrapper {
  margin: 25px;
  &-head {
    height: 70px;
    background-color: rgba(40, 167, 69, 0.8);
  }
}

.pie-box {
  margin: 20px 0;
}

.home_head {
  width: 100%;
  height: 70px;
  line-height: 70px;
  background: rgba(54, 163, 247, 0.6);
  color: #fff;
  font-size: 20px;
  padding-left: 20px;
  margin: 15px 0;
}
</style>
