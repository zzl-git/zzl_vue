<template>
  <div class="content">
    <div class="headTitle">
      信息统计
    </div>
    <div class="head">
      <div class="gradeBox">
        <el-select v-model="grade" placeholder="请选择年级">
          <el-option
            v-for="item in gradeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="collegeBox">
        <el-select v-model="college" placeholder="请选择学院">
          <el-option
            v-for="item in collegeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="buttonBox">
        <el-button type="primary" @click="hendleData">搜索</el-button>
      </div>
    </div>
    <div class="atudentList">
      <student-list
       v-if="hendleData1"
      ref="studentList" 
      :grade='grade' 
      :college='college'></student-list>
    </div>
  </div>
</template>

<script>
import StudentList from './components/list'
export default {
  components: {StudentList},
  name: 'School_info',
  data() {
    return {
       hendleData1: true,
      grade: '',//年级 
      college:'',//学院
      collegeList:[{
          value: '商学院',
          label: '商学院'
        },{
          value: '马克思主义学院',
          label: '马克思主义学院'
        }, {
          value: '教育科学学院',
          label: '教育科学学院'
        }, {
          value: '体育学院',
          label: '体育学院'
        }, {
          value: '文学与传媒学院',
          label: '文学与传媒学院'
        }, {
          value: '外国语学院',
          label: '外国语学院'
        }, {
          value: '历史与档案学院',
          label: '历史与档案学院'
        }, {
          value: '数学与大数据学院',
          label: '数学与大数据学院'
        }, {
          value: '物理与电子科学学院',
          label: '物理与电子科学学院'
        }, {
          value: '化学与材料学院',
          label: '化学与材料学院'
        }, {
          value: '地理与资源学院',
          label: '地理与资源学院'
        }, {
          value: '生物科学学院',
          label: '生物科学学院'
        }, {
          value: '旅游文化学院',
          label: '旅游文化学院'
        }, {
          value: '音乐舞蹈学院',
          label: '音乐舞蹈学院'
        }, {
          value: '美术与设计学院',
          label: '美术与设计学院'
        }, {
          value: '创新创业学院',
          label: '创新创业学院'
        }, {
          value: '继续教育学院',
          label: '继续教育学院'
        }],
      gradeList: [{
          value: '2016',
          label: '2016'
        }, {
          value: '2017',
          label: '2017'
        }, {
          value: '2018',
          label: '2018'
        }, {
          value: '2019',
          label: '2019'
        }],
    }
  },
  methods:{
    hendleData(){
       this.$refs.studentList.hendleShowData()
        this.hendleData1 = false
       this.$nextTick(()=>{
            this.hendleData1 = true
        })
    }
  }
 
}
</script>

<style lang="scss" scoped>
  .content {
    margin: 20px;
  }
  .head {
    display: flex;
    flex-wrap: wrap;
    .collegeBox {
      margin: 0 15px;
    }
  }
</style>
