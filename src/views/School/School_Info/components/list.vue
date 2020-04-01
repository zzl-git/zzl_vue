<template>
  <div class="studentTable">
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
   
  </div>
</template>

<script>

export default {
  name: 'Student_List',
  data() {
      return {
          
      }
  },
  props:['showData'],
  created() {

  },
 methods:{
     
    
 }
}
</script>

<style lang="scss" scoped>
    
</style>
