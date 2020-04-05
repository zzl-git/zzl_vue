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
            <el-button @click="openClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button  @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
            <el-button  @click="deleteData(scope.row)" type="danger" size="small">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
   <!-- 编辑查看框 -->
    <el-dialog title="信息列表" :visible.sync="dialogFormVisible" width="60%">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input :disabled="isEdit" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item  label="年龄" prop="age">
          <el-input :disabled="isEdit" v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input :disabled="isEdit" v-model="formData.grade"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-input :disabled="isEdit" v-model="formData.college"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input :disabled="isEdit" v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="explain">
          <el-input :disabled="isEdit" type="textarea" :autosize="true" v-model="formData.explain"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Student_List',
  data() {
      return {
        isEdit: true,//是否可编辑 true不可编辑
        openId: '',//编辑id
        dialogFormVisible:false,//控制弹框弹框
        formData: {
          age: '',
          college: '',
          grade: '',
          name: '',
          address: '',
          explain: ''
        }
      }
  },
  props:['showData'],
  created() {

  },
 methods:{
   //打开查看框
     openClick(row){
       this.dialogFormVisible=true,
      this.isEdit = true
       this.formData = {
          age: row.age,
          college: row.college,
          grade: row.grade,
          name: row.name,
          address: row.address,
          explain: row.explain
       }
     },
    //  打开编辑框
     handleClick(row){
       this.dialogFormVisible=true
       this.openId = row.id
       this.isEdit = false
       this.formData = {
          age: row.age,
          college: row.college,
          grade: row.grade,
          name: row.name,
          address: row.address,
          explain: row.explain
       }
     }
    ,
    // 编辑数据
    editData() {
      let data = {
          id: this.openId,
          age: this.formData.age,
          college: this.formData.college,
          grade: this.formData.grade,
          name: this.formData.name,
          address: this.formData.address,
          explain: this.formData.explain
      }
      this.$emit("handleClick",data)
      this.dialogFormVisible=false
    },
    //  删除数据
    deleteData(row){
        const id = row.id
        this.$emit("delData",id)
      }
 }
}
</script>

<style lang="scss" scoped>
    // .studentTable >>> .el-textarea__inner {
    //   min-height: 120px !important;
    // }
</style>
