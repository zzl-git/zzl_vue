<template>
  <div class="wrapper">
    <panel-group/>
    <el-row :gutter="20" class="pie-box">
      <el-col :xs="12" :sm="12" :lg="12">
         <chart-pie/>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
         <chart-line/>
      </el-col>
    </el-row>
   
    <chart-bar/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import countTo from 'vue-count-to';
import panelGroup from './components/panel-group'
import chartBar from './components/chart-bar'
import chartPie from './components/chart-pie'
import chartLine from './components/chart-line'

export default {
  components: { countTo, panelGroup, chartBar, chartPie, chartLine },
  name: 'Dashboard',
  data () {
    return {
     
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  padding: 25px;
  &-head {
    height: 70px;
    background-color: rgba(40, 167, 69, 0.8);
  }
}
.pie-box {
  margin: 20px 0;
}
</style>
