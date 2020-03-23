<template>
  <div class="studentTable" v-loading="loading">
      <el-table
        :data="showData"
        border
        style="width: 100%">
        <el-table-column
            type="selection"
            align="center"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="college"
            label="学院"
            align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="grade"
            label="年级"
            align="center"
            width="100">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            align="center"
            min-width="300">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="220">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button type="success" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination
            background
            @current-change= "currentChange"
            layout="total,prev, pager, next"
            :page-size='page'
            :pager-count='5'
            :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/school/studentList'
export default {
  name: 'Student_List',
  data() {
      return {
          showData:[],
          data:[],
          loading: true,
          count: 1,//当前页
          page: 10,//展示个数
          total: null,//总条数
      }
  },
  created() {
      this.getData()
  },
 methods:{
     //数据过滤
     filterData() {
        this.showData = this.data.filter((v,ind)=> {
            return ind>=this.page*(this.count-1) && ind<this.page*this.count
        })
     },
     //获取数据
     getData() {
        getList().then((res)=>{
            this.data = res.data.items
            this.total = this.data.length
            this.filterData()
            this.loading = false
        }) 
     },
     handleClick() {

     },
     //分页器当前页
     currentChange(v) {
         this.count = v
         this.filterData()
     }
    
 }
}
</script>

<style lang="scss" scoped>
    .studentTable {
        margin-top: 15px;
    }
    .pagination {
        text-align: right;
        margin-top: 15px;
    }
</style>
