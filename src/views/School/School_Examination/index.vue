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
                                <el-tag :type="item.status===0?'warning':'success'">{{item.status|statusToString}}</el-tag>
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
                                    <el-button type="success" size="small" icon="el-icon-circle-check">通过</el-button>
                                    <el-button type="danger" size="small" icon="el-icon-circle-close">驳回</el-button>
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
        page: 6,//每页展示条数
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
         this.screenList()
      }
  },
  created(){
      this.getlist()
  },
  methods:{
    //   筛选状态
      screenList(){
          switch(this.tabName) {
                case '1':
                    this.showList = this.list
                   break;
                case '2':
                    this.filterFnc(1)
                   break;
                case '3':
                    this.filterFnc(2)
                   break;
                case '4':
                    this.filterFnc(0)
                break;
            } 
      },
    //   状态过滤函数
      filterFnc(num){
           this.showList = this.list.filter((v)=>{
                return v.status ===num
            })
      },
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
          this.showList = this.list.filter((v,ind)=>{
              return this.page*(num-1)< ind &&ind <=this.page*num
          })
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
        text-align: center;
    }
</style>
