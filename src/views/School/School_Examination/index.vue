<template>
    <div class="content">
        <div class="headTitle">
            场地审核
        </div>
        <div class="content_main">
            <el-tabs type="border-card" v-model="tabName">
                <el-tab-pane name="1" label="全部"></el-tab-pane>
                <el-tab-pane name="2" label="待审核"></el-tab-pane>
                <el-tab-pane name="3" label="已通过"></el-tab-pane>
                <el-tab-pane name="4" label="已驳回"></el-tab-pane>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" v-for="item in showList" :key="item.id">
                        <el-card class="field-card">
                            <div slot="header" class="field-head">
                                <span>{{item.name}}</span>
                                <span>{{item.rejectReason}}</span>
                                <el-tag :type="item.status===0?'warning':item.status===1?'':'success'">{{item.status|statusToString}}</el-tag>
                            </div>
                            <div class="field-body">
                                <div class="field-info">
                                    <p>申请方：{{item.applicant}}</p>
                                    <p>使用时间：{{item.dateTime}}</p>
                                    <el-popover
                                        class="field-reason"
                                        placement="top-end"
                                        width="300"
                                        trigger="click"
                                        :content="item.reason">
                                        <p slot="reference">申请理由：{{item.reason}}</p>
                                    </el-popover>
                                </div>
                                <div class="field-btn">
                                    <el-button type="success" :disabled="item.status !==1" size="small" icon="el-icon-circle-check" @click="rejectAdopt(item.id)">通过</el-button>
                                    <el-button type="danger"  :disabled="item.status !==1" size="small" icon="el-icon-circle-close" @click="showRejectDialog(item.id)">驳回</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <p v-if="!showList.length" class="noData">暂无数据</p>
                <el-pagination
                    class="pagination"
                    v-if="showList.length"
                    background
                    @current-change="currentChange"
                    :page-size="page"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </el-tabs>
        </div>

        <el-dialog
            title="驳回原因"
            :visible.sync="rejectDialog"
            width="30%"
            >
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入驳回原因"
                v-model.trim="rejectText">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectDialog = false;$message('已取消')">取 消</el-button>
                <el-button type="primary" @click="rejectFnc">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getExaminationList } from '@/api/school/examination'
export default {
  name: 'examination_index',
  data () {
    return {
        tabName: "1",
        list:[],
        showList:[],
        total: 0,//总条数
        page: 9,//每页展示条数
        rejectDialog: false,//驳回原因输入框
        rejectText: '',//驳回理由
        openId: ''//编辑内容的id
    }
  },
  filters: {
    statusToString: function (value) {
            switch(value) {
                case 0:
                   return '已驳回'
                case 1:
                   return '待审核'
                case 2:
                   return '已通过'
            } 
        }
    },
  watch:{
      tabName(){
          this.currentFilterFnc(1)
      }
  },
  created(){
      this.getlist()
  },
  methods:{
    //   获取数据
      getlist(){
          getExaminationList().then((res)=>{
              this.list = res.data.items
              this.showList = res.data.items
              this.total =this.list.length
              this.currentFilterFnc(1)
          })
      },
      //获取当前页
      currentChange(v){
          this.currentFilterFnc(v)
      },
    //   分页器过滤函数
      currentFilterFnc(num){
          let data = this.list.filter((v,ind)=>{
              return this.tabName==="1"? true : v.status ===this.getStatus()
          })
          this.total = data.length
          this.showList = data.filter((v,ind)=>{
              return this.page*(num-1)<= ind &&ind <this.page*num
          })
      },
      getStatus(){
          switch(this.tabName){
                case '2':
                    return 1;
                case '3':
                    return 2;
                case '4':
                    return 0;
          }
      },
      //驳回的方法
      rejectFnc(){
         this.$confirm('确认要驳回么, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
           }).then(()=> {
            this.rejectDialog = false
            let index = this.list.findIndex((v,ind)=>{
                return v.id === this.openId
            })
            this.list[index].rejectReason = this.rejectText
            this.list[index].status = 0
            this.currentFilterFnc(1)
            this.rejectText = ''
            this.$message({
                message: '驳回成功',
                type: 'success'
            });
          })
          .catch(()=> {
              this.rejectDialog = false
              this.rejectText = ''
              this.$message('已取消');
          });
      },
    //   显示驳回输入框
      showRejectDialog(id){
          this.openId = id
          this.rejectDialog = true
      },
      rejectAdopt(id){
           this.$confirm('是否通过审核?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
           })
           .then(()=> {
               let index = this.list.findIndex((v,ind)=>{
                return v.id ===id
            })
            this.list[index].status = 2
            this.$message({
                message: '操作成功',
                type: 'success'
            });
            this.currentFilterFnc(1)
           })
           .catch(()=> {
              this.rejectDialog = false
              this.rejectText = ''
              this.$message('已取消');
          });
           
      }
  }
}
</script>

<style lang="scss" scoped>
    .field {
        &-card {
            margin-top: 10px;
        }
        &-head {
            display: flex;
            justify-content: space-between;
        }
        &-body {
            display: flex;
            height: 100px;
        }
        &-btn {
            text-align: right;
            width: 90px;
            align-self: flex-end;
            .el-button+.el-button {
                margin: 10px 0 0;
            }
        }
        &-info {
            flex: 1;
            p {
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
        }
        &-reason {
            cursor: pointer;
        }
    }
    .pagination {
        margin-top: 25px;
        text-align: right;
    }
</style>
