<template>
  <div class="fill-root">
      <!--<router-view ref="fillContext"-->
                   <!--@checkStepAndSave="checkStepAndSave"-->
                   <!--@refreshSaveLoading="refreshSaveLoading"-->
                   <!--@refreshReportFill="checkUnitStep" :key="$route.fullPath"></router-view>-->
    <OnedimRecord v-if="unitEntity.job_unit_type=='1'" ref="recordTemplate"
                  @saveReportsCallBack="saveReportsCallBack"
                  @validateReportsCallBack="validateReportsCallBack"
                  :jobId="jobId"
                  :reportId="reportId"
                  :unitId="unitEntity.job_unit_id"
                  :unitType="unitEntity.job_unit_type"
                  :isView="isView"
                  :saveFlag="saveFlag"></OnedimRecord>

    <GriddimRecord v-if="unitEntity.job_unit_type=='0'" ref="recordTemplate"
                   @saveReportsCallBack="saveReportsCallBack"
                   @validateReportsCallBack="validateReportsCallBack"
                   :jobId="jobId"
                   :reportId="reportId"
                   :unitId="unitEntity.job_unit_id"
                   :unitType="unitEntity.job_unit_type"
                   :isView="isView"
                   :saveFlag="saveFlag"></GriddimRecord>
  </div>


</template>

<script>
  import OnedimRecord from "@/models/rcdjob/datareport/onedim/onedimRecord"
  import GriddimRecord from "@/models/rcdjob/datareport/multdim/griddimRecord"


  export default {
    name: "ReportContextRoot",
    describe:"报送填报主页面",
    components: {
      OnedimRecord,
      GriddimRecord
    },
    props:{
      jobId:{
        type:String
      },
      reportId:{
        type:String
      },
      unitEntity:{
        type:Object
      },
      isView:{
        type:String
      }

    },
    data() {
      return {
        reportDefinedId:'',
        saveFlag:'N'
      }
    },
    methods:{
      doSaveContext(processName){
        this.$refs.recordTemplate.doSaveUnitContext(processName)
      },
      doValidateUnitContext(processName){
        this.$refs.recordTemplate.doValidateUnitContext(processName)
      },
      doSaveAndValidate(prcessName){
        //console.log("doSaveAndValidate is running...."+prcessName)
        if(prcessName=='SAVE'){
          this.doSaveContext("SAVEANDVALIDATE")
        }else if(prcessName=='VALIDATE'){
          this.doValidateUnitContext("SAVEANDVALIDATE")
        }
      },
      doSubmitContext(prcessName){
        if(prcessName=='SAVE'){
          this.doSaveContext("SUBMIT")

        }else if(prcessName=='VALIDATE'){
          this.doValidateUnitContext("SUBMIT")
        }
      },
      getFolumarData(){
        const justRefreshFomular = true
        this.$refs.recordTemplate.getUnitContext(justRefreshFomular)
      },
      saveReportsCallBack(unitId,processName,saveException){
        if(processName=='SUBMIT'){
          this.$emit("submitReportsCallBack",unitId,this.unitEntity.job_unit_name,saveException,"SAVE")
        }else if(processName=='SAVEANDVALIDATE'){
          this.$emit("saveAndValidateCallBack",unitId,this.unitEntity.job_unit_name,saveException,"SAVE")
        } else{
          this.$emit("saveReportsCallBack",unitId,saveException)
        }
      },
      validateReportsCallBack(unitId,processName,saveException){
        if(processName=='SUBMIT'){
          this.$emit("submitReportsCallBack",unitId,this.unitEntity.job_unit_name,saveException,"VALIDATE")
        }else if(processName=='SAVEANDVALIDATE'){
          this.$emit("saveAndValidateCallBack",unitId,this.unitEntity.job_unit_name,saveException,"VALIDATE")
        }else{
          this.$emit("validateReportsCallBack",unitId,this.unitEntity.job_unit_name,saveException)
        }
      }
    },

    mounted() {
      var height= this.$refs.recordTemplate //100

      //console.log(height)
      // this.selectActiveStep('N')
    },
    activated() {
    }
  }
</script>

<style lang="css">
  .el-step__main>div{
    font-size:13px !important;
    font-weight: normal;
  }
</style>

<style scoped>
  .fill-root{
    width:100%;
    height:100%;
    padding:0 0 0 0 ;
  }
  .fill-steps{
    width:200px;
    height:80%;
    padding:50px 0 0 100px;
    float: left;
    /*position:absolute;*/
    /*z-index: 10086;*/
  }
  .fill-context{
    width:calc(100% - 340px);
    height:90%;
    margin:40px 0 0 0px;
    float: right;
    overflow: auto;
  }

  .fill-context-child{
    width: 100%;
    height:calc(100% - 50px);
    float: left;
    overflow: auto;
  }

  .fill-context-options{
    width: 100%;
    height:30px;
    margin:10px 0 0 0 ;
    float: left;
  }

  .el-step{
    cursor: pointer;
  }

</style>
