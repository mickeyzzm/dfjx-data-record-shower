<template>
  <WorkMain :headerItems="['填报','填报数据审核']">

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
  </WorkMain>

</template>

<script>
  import WorkMain from "@/models/public/WorkMain"

  export default {
    name: "DtRpReviewMain",
    data () {
      return {
        reportDataList:[],
        eachPageNum:10,
        currPageNum:1,
        totalPage:1
      }
    },
    components: {
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
            pageSize: this.eachPageNum
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

</style>
