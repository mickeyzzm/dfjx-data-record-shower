<template>
  <div class="main">

    <el-table
      :data="reportDataList"
      style="width: 100%"
      size="mini"
      border
      stripe>
      <el-table-column prop="report_id"   label="填报编号" :resizable="false"></el-table-column>
      <el-table-column prop="record_origin_id"   label="所属机构" :resizable="false"></el-table-column>
      <el-table-column prop="record_user_id"   label="填报人" :resizable="false"></el-table-column>
      <el-table-column prop="record_status_cn"   label="填报状态" :resizable="false"></el-table-column>
      <el-table-column label="操作" width="400" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" @click="reportFill(scope.row)" size="mini">填报</el-button>
          <el-button type="text" @click="submitReport(scope.row)" size="mini">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    name: "datareportMainPage",
    data () {
      return {
        reportDataList:[],
        eachPageNum:10,
        currPageNum:1,
        totalPage:1
      }
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
          url: "record/process/pageJob",
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
      reportFill(reportData){
        this.$router.push({
          path: "/rcdjob/datareport/reportFill?reportId="+reportData.report_id+"&jobId="+reportData.job_id+"&isView=N"
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
