<template>
  <div>
    <div class="query">
      <el-select clearable v-model="reportStatus" size="mini" placeholder="请选择填报状态">
        <el-option  label="填报中" value="0"></el-option>
        <el-option  label="审批中" value="1"></el-option>
        <el-option  label="未到填写日期" value="7"></el-option>
        <el-option  label="过期" value="8"></el-option>
        <el-option  label="填报完成" value="9"></el-option>

      </el-select>
      <el-button type="primary" @click="getTableData(1)">查询</el-button>
    </div>

    <el-table
      :data="reportDataList"
      style="width: 100%"
      size="mini"
      border
      stripe>
      <el-table-column prop="report_id" width="100"  label="填报编号" :resizable="false"></el-table-column>
      <el-table-column prop="job_name"   label="任务名称" :resizable="false"></el-table-column>
      <el-table-column prop="record_origin_name"   label="所属机构" :resizable="false"></el-table-column>
      <el-table-column prop="record_user_name"   label="填报人" :resizable="false"></el-table-column>
      <el-table-column prop="record_status_cn"   label="填报状态" :resizable="false"></el-table-column>
      <el-table-column prop="job_start_dt_str"   label="开始日期" :resizable="false"></el-table-column>
      <el-table-column prop="job_end_dt_str"   label="结束日期" :resizable="false"></el-table-column>
      <el-table-column label="操作" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" @click="reportView(scope.row)" size="mini">查看</el-button>
          <el-button v-if="scope.row.record_status=='1'" type="text" @click="reportReview(scope.row,9)" size="mini">通过</el-button>
          <el-button v-if="scope.row.record_status=='1'" type="text" @click="reportReview(scope.row,0)" size="mini">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 refreshData:点击页码上一页下一页时调用的方法、pageCount:总页数-->
    <WorkTablePager @refreshData="getTableData"
                    :pageCount="totalPage">
    </WorkTablePager>
  </div>

</template>

<script>
  import WorkMain from "@/models/public/WorkMain"
  import WorkTablePager from '@/models/public/WorkTablePager'

  export default {
    name: "DtRpReviewMain",
    data () {
      return {
        reportDataList:[],
        reportStatus:null,
        eachPageNum:10,
        currPageNum:1,
        totalPage:1
      }
    },
    components: {
      WorkTablePager,
      WorkMain
    },
    methods: {
      getTableData(pageNum){
        if (pageNum && pageNum !== '') {
          this.currPageNum = pageNum
        } else {
          pageNum = this.currPageNum
        }

        const $this = this
        this.BaseRequest({
          url: "record/flow/pageJob",
          method: 'get',
          params: {
            currPage: pageNum,
            pageSize: this.eachPageNum,
            reportStatus:this.reportStatus?this.reportStatus:null
          }
        }).then(response => {
          console.log(response)
          if(response&&response.dataList){
            this.reportDataList = response.dataList
            this.totalPage = response.totalPage
          }
        })
      },
      reportView(reportData){
        this.$router.push({
          path: "/rcdjob/datareport/reportFill?reportId="+reportData.report_id+"&jobId="+reportData.job_id+"&isView=Y&back=review"
        });
      },
      reportReview(reportData,status){
        this.$confirm('确定修改报表状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString:true,
          type: 'warning'
        }).then(() => {
          this.BaseRequest({
            url: "/record/process/changeStatus",
            method: 'get',
            params: {
              reportId: reportData.report_id,
              status: status
            }
          }).then(response => {
            if(response=='SUCCESS'){
              this.Message.success("审批完成")
              this.getTableData(1)
            }else{

            }
          })
        }).catch(() => {

        });


      },
      submitReport(reportData){

      }
    },
    mounted() {
      this.reportDataList = []
      this.getTableData(1)
    }
  }
</script>

<style scoped>
  .query {
    text-align: left;
    padding:10px 0;
    margin-bottom: 20px;
  }
  .query > .el-input,.el-select {
    width: 15%;
  }
  .query > .el-input,.el-select,.el-button {
    margin-right: 20px;
  }
</style>
