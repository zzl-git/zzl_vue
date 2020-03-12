<template>
  <div class="wrapper">
    <panel-group/>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="12">
         <chart-pie/>
      </el-col>
       <el-col :xs="12" :sm="12" :lg="12">
         <chart-pie/>
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

export default {
  components: { countTo, panelGroup, chartBar, chartPie },
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
</style>
