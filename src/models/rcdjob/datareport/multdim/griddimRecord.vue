<template>
  <div style="width: 100%">
    <el-form ref="form"  label-width="40%">
      <el-form ref="form"  label-width="40%">
      </el-form>

      <el-table
        :data="Object.keys(reportDataLineMap)"
        tooltip-effect="dark" size="mini"
        row-class-name="mini-font-size"
        border
        stripe
        style="width: 100%;">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column :key="unitFld.fld_id" v-for="unitFld in unitFlds" :label="unitFld.fld_name" width="200" >
          <template slot-scope="scope">
            <!--<el-form-item label-width="0"	style="margin:auto auto" size="mini" :error="scope.row[col.dim_id+'-validateErrpr']">-->
            <el-form-item label-width="0"	style="margin:auto auto" size="mini" >
              <!--<el-tooltip class="item" effect="dark" :content="'鼠标划过内容'" placement="top">-->
                <el-input v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" size="mini" v-model="reportDataLineMap[scope.row][unitFld.fld_id]" >
                  <template v-if="unitFld.fld_point!=null&&unitFld.fld_point!=''" slot="append">{{unitFld.fld_point}}</template>
                </el-input>

                <el-select v-if="unitFld.fld_data_type==3">

                </el-select>
              <!--</el-tooltip>-->
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-form>
  </div>
</template>

<script>
  import WorkMain from "@/models/public/WorkMain"

  export default {
    name: "GriddimRecord",
    describe:"多维静态报表填报单元",
    components: {
      WorkMain
    },
    props:{
      jobId:{
        type:String
      },
      reportId:{
        type:String
      },
      unitId:{
        type:Number
      },
      unitType:{
        type:Number
      },
      isView:{
        type:String
      }
    },
    data() {
      return {
        lastStep:false,
        definedIndexs:[],
        unitFlds:[],
        definedCells:[],
        definedColums:[],
        reportDataLineMap:{},
        hasMounted:false
      }
    },
    methods:{
      getUnitFldsConfig(){
        let loading = null
        if(this.saveFlag=='N') {
          loading = this.$loading({
            lock: true,
            text: '获取填报单元信息中.......',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        this.BaseRequest({
          url:"/record/process/getFldByGroupId",
          params:{
            groupId:this.unitId
          }
        }).then(response=>{
          if(loading){
            loading.close();
          }
          this.unitFlds = response

        }).catch(error=>{
            this.Message.success(error)
            loading.close()
          }
        );
      },

      getUnitDictFldContent(){

      },

      getReportFldDatas(){
        this.BaseRequest({
          url:"/record/process/getFldReportDatas",
          params:{
            jobId:this.jobId,
            reportId:this.reportId,
            groupId:this.unitId
          }
        }).then(response=>{
          const reportDataLineMap = new Object()
          if(response){
            response.forEach(reportData=>{
              const colum_id = reportData.colum_id
              const fld_id = reportData.fld_id
              const record_data = reportData.record_data
              if(!reportDataLineMap[colum_id]){
                reportDataLineMap[colum_id] = new Object()
              }
              reportDataLineMap[colum_id][fld_id] = record_data
            })
            this.reportDataLineMap = reportDataLineMap
          }
        }).catch(error=>{
            this.Message.success(error)
          }
        );
      },

      doSaveUnitContext(processName){
        let validDatas = this.getValidContext()

        this.BaseRequest({
          url:"/reportCust/saveGridUnitContext",
          method:'post',
          data:validDatas
        }).then(response=>{
          // this.$emit("refreshSaveLoading",this.unitId,"保存成功")
          // this.$emit("checkStepAndSave",this.unitId,this.saveFlag)
          if(response){
            this.$emit("saveReportsCallBack",this.unitId,processName)
          }else{
            this.$emit("saveReportsCallBack",this.unitId,processName,"保存失败")
          }
        }).catch(error => {
          this.$emit("saveReportsCallBack",this.unitId,processName,error)
        });
      },
      doValidateUnitContext(processName){
        const $this = this
        let validDatas = this.getValidContext()
        // validateSimpleUnitContext
        const valloading = this.$loading({
          lock: true,
          text: '数据校验中.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.BaseRequest({
          url:"/reportCust/validateGridUnit",
          method:'post',
          data:{
            definedColums:validDatas.definedColums,
            reportDataLineMap:validDatas.reportDataLineMap
          }
        }).then(response=>{
          valloading.close();

          if(response){
          }else{
            this.$emit("validateReportsCallBack",this.unitId,processName,"校验出现异常")
          }

          let validateFailed = false

          // this.$emit("checkStepAndSave",this.unitId,this.saveFlag)
          let failedMessage = null
          if(validateFailed){
            // this.$emit("refreshSaveLoading",this.unitId,"有输入错误")
            failedMessage = "有输入错误"

          }

          this.$emit("validateReportsCallBack",this.unitId,processName,failedMessage)
        });
      },
      setSaveFlag(saveFlag){
        this.saveFlag = saveFlag
      }
    },
    mounted:function(){
      this.getUnitFldsConfig()
      this.getUnitDictFldContent()
      this.getReportFldDatas()
    },
    activated(){
      // this.saveFlag = this.$route.params.saveFlag
      // if(this.hasMounted){
      //   const lastStepTMp = this.lastStep
      //   this.lastStep = null
      //   this.lastStep = lastStepTMp
      //   if(this.saveFlag!=null&&this.saveFlag!=undefined){
      //     if(this.saveFlag=='Y'||this.saveFlag=='S-Y'){
      //       this.$emit("refreshSaveLoading",this.unitId,"保存中....")
      //       this.doSaveUnitContext()
      //     }else if(this.saveFlag=='S'){
      //
      //     }else if(this.saveFlag=='V'||this.saveFlag=='S-V'){
      //       this.doValidateUnitContext()
      //     }
      //   }
      // }
    }
  }
</script>

<style scoped>
  .mini-font-size{
    font-size:12px;
  }
</style>
