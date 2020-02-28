<template>
  <div>
    <div class="query">
      <el-input v-model="reportName" size="mini" placeholder="请输入任务名称"></el-input>

      <el-select clearable v-model="reportStatus" size="mini" placeholder="请选择填报状态">
        <el-option  label="填报中" value="0"></el-option>
        <el-option  label="审核中" value="1"></el-option>
        <el-option  label="未开始" value="7"></el-option>
        <el-option  label="已过期" value="8"></el-option>
        <el-option  label="已完成" value="9"></el-option>

      </el-select>
      <el-button type="primary" @click="getTableData(1)">查询</el-button>
    </div>

    <el-table
      :data="reportDataList"
      style="width: 100%"
      size="mini"
      border
      stripe>
      <el-table-column prop="report_id"   label="填报编号" :resizable="false"></el-table-column>
      <el-table-column prop="job_name"   label="任务名称" :resizable="false"></el-table-column>
      <!--<el-table-column prop="record_origin_id"   label="所属机构" :resizable="false"></el-table-column>-->
      <!--<el-table-column prop="record_user_name"   label="填报人" :resizable="false"></el-table-column>-->
      <el-table-column prop="record_status_cn"   label="填报状态" :resizable="false"></el-table-column>
      <el-table-column prop="job_start_dt_str"   label="开始日期" :resizable="false"></el-table-column>
      <el-table-column prop="job_end_dt_str"   label="结束日期" :resizable="false"></el-table-column>
      <el-table-column label="操作" width="400" :resizable="false">
        <template slot-scope="scope">
          <el-button v-if="scope.row.record_status!='0'" type="text" @click="reportView(scope.row)" size="mini">查看</el-button>
          <el-button v-if="scope.row.record_status=='0'" type="text" @click="reportFill(scope.row)" size="mini">填报</el-button>
          <!--<el-button v-if="scope.row.record_status=='0'" type="text" @click="submitReport(scope.row)" size="mini">提交</el-button>-->
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
    name: "datareportMainPage",
    data () {
      return {
        reportDataList:[],
        reportStatus:null,
        reportName:null,
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
          url: "record/process/pageJob",
          method: 'get',
          params: {
            currPage: pageNum,
            pageSize: this.eachPageNum,
            reportStatus:this.reportStatus?this.reportStatus:null,
            reportName:this.reportName?this.reportName:null
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
          path: "/rcdjob/datareport/reportFill?reportId="+reportData.report_id+"&jobId="+reportData.job_id+"&isView=Y&back=record"
        });
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
