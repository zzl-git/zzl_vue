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
    <!-- 表格组件 -->
    <div class="atudentList"  v-loading="loading">
      <student-list
      ref="studentList" 
      :showData='showData' 
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
    <!-- 编辑查看框 -->
    <el-dialog title="信息列表" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <!-- <el-form-item label="活动名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import StudentList from './components/list'
import { getList } from '@/api/school/studentList'
export default {
  components: { StudentList },
  name: 'School_info',
  data() {
    return {
      dialogFormVisible:false,//控制弹框弹框
      showPagination: true,
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
        showData:[],//展示的数据
        data:[],//全部数据
        loading: true,
        count: 1,//当前页
        page: 10,//展示个数
        total: null,//总条数
        formData: {}
    }
  },
  created(){
    this.getData()
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
     handleClick() {

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
  .studentTable {
        margin-top: 15px;
    }
    .pagination {
        text-align: right;
        margin-top: 15px;
    }
</style>
