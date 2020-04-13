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
        <el-button type="primary" @click="allData">全部信息</el-button>
      </div>
    </div>
    <!-- 表格组件  -->
    <div class="atudentList"  v-loading="loading">
      <student-list
      ref="studentList" 
      :showData='showData'
      @handleClick = "handleClick" 
      @delData = "delData" 
      ></student-list>
    </div>
    <!-- 分页器 -->
     <div class="pagination">
        <el-pagination
            v-if="showPagination"
            background
            @current-change= "currentChange"
            layout="total,prev, pager, next"
            :page-size='page'
            :pager-count='5'
            :current-page = 'count'
            :total="total">
        </el-pagination>
    </div>
    
  </div>
</template>

<script>
import StudentList from './components/list'
import { getList } from '@/api/school/studentList'
import { mapGetters  } from 'vuex'
export default {
  components: { StudentList },
  name: 'School_info',
  data() {
    return {
      showPagination: true,
      grade: '',//年级 
      college:'',//学院
      showData:[],//展示的数据
      data:[],//全部数据
      loading: true,
      count: 1,//当前页
      page: 10,//展示个数
      total: null,//总条数
    }
  },
  created(){
    this.getData()
  },
  computed: {
    ...mapGetters([
      'gradeList',
      'collegeList',
    ])
  },
  methods:{
    hendleData(){
       this.hendleShowData()
    },
    //数据过滤
     filterData(data) {
        this.showData = data.filter((v,ind)=> {
            return ind>=this.page*(this.count-1) && ind<this.page*this.count
        })
        this.total = data.length
     },
     //获取数据
     getData() {
        getList().then((res)=>{
            this.data = res.data.items
            this.total = this.data.length
            this.filterData(this.data)
            this.loading = false
        }) 
     },
    //  更改数据
     handleClick(data) {
       let showDataInd = this.showData.findIndex((v)=>{
         return v.id == data.id
       })
        let dataInd = this.data.findIndex((v)=>{
         return v.id == data.id
       })
        // this.showData[showDataInd] = data
        this.data[dataInd] = data
        this.$set(this.showData, showDataInd, data)//$set api 更新dom
     },
    //  删除数据
     delData(id){
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          let showDataInd = this.showData.findIndex((v)=>{
              return v.id == id
            })
              let dataInd = this.data.findIndex((v)=>{
              return v.id == id
            })
          this.showData.splice(showDataInd,1)
          this.data.splice(dataInd,1)
          if(this.grade||this.college){
            this.hendleShowData(this.count)
          }else {
            this.filterData(this.data)
          }
          
          this.loading = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
     },
    //  显示全部数据
     allData(){
       this.showData = this.data;
       this.count = 1;
       this.total = this.data.showData
       this.grade = "";
       this.college = "";
       this.filterData(this.showData)
     },
     //分页器当前页
     currentChange(v) {
        this.count = v
        if(this.grade||this.college){
          this.hendleShowData(v)
          return
        }
        this.filterData(this.data)
     },
    //  根据年级 学校查询
     hendleShowData(num=1) {
        this.showPagination = false
        this.showData = []
        const data= this.data.filter((v,ind)=> {
              if(!this.grade){
                return true
              }
              return v.grade == this.grade
          }).filter((v)=>{
            if(!this.college){
                return true
              }
            return v.college == this.college
        })
        this.showData.push(...data) 
        this.count = num
        this.filterData(this.showData)
        this.showPagination = true
     }
  }
 
}
</script>

<style lang="scss" scoped>
  .head {
    display: flex;
    flex-wrap: wrap;
    .collegeBox {
      margin: 0 15px;
    }
  }
  .studentTable {
        margin-top: 15px;
    }
    .pagination {
        text-align: right;
        margin-top: 15px;
    }
</style>
