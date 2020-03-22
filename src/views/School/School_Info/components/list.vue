<template>
  <div class="studentTable">
      <el-table
        :data="data"
        border
        v-loading="loading"
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="100">
        </el-table-column>
        <el-table-column
        prop="address"
        label="地址"
        align="center"
        width="auto">
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
            layout="prev, pager, next"
            :total="100">
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
          data:[],
          loading: true
      }
  },
  created() {
      this.getData()

  },
 methods:{
     getData() {
        getList().then((res)=>{
            this.data = res.data.items
            this.loading = false
        }) 
     },
     handleClick() {

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
