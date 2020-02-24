<template>
  <div style="background-color: white;height:calc(100% - 50px);margin:20px 0 0 0 ;padding:30px 0 0 0;border-radius:10px;">
    <el-form ref="form"  label-width="40%">
      <el-form-item :key="unitFld.fld_id" size="mini" v-for="unitFld in unitFlds" :label="unitFld.fld_name" :error="validateUnitDatas['f'+unitFld.fld_id]">
      <!--<el-form-item :key="unitFld.fld_id" size="mini" v-for="unitFld in unitFlds" :label="unitFld.fld_name">-->
        <el-col :span="23">
            <!--<el-tooltip class="item" effect="dark" :content="dataColum.colum_desc" placement="top">-->
              <el-input v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" v-model="unitDatas['f'+unitFld.fld_id]['record_data']"
                        :disabled="isView=='Y'||unitFld.fld_range=='1'" style="width:50%;float: left;" >
                <!--<template v-if="dataColum.colum_point!=null&&dataColum.colum_point!=''" slot="append">{{dataColum.colum_point}}</template>-->
              </el-input>


              <el-date-picker v-if="unitFld.fld_data_type==2" size="mini" align="left" style="width:50%;float: left;"
                              v-model="unitDatas['f'+unitFld.fld_id]['record_data']" :disabled="isView=='Y'||unitFld.fld_range=='1'"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
              </el-date-picker>


            <el-select @change="refreshData" v-model="unitDatas['f'+unitFld.fld_id]['record_data']" v-if="unitFld.fld_data_type==3"
                       :disabled="isView=='Y'||unitFld.fld_range=='1'" style="width:50%;float: left;">
              <!--<el-select v-model="reportDataLine['f'+unitFld.fld_id]" v-if="unitFld.fld_data_type==3">-->
              <el-option v-for="dictObj in fldDicts['f'+unitFld.fld_id]"
                         :key="dictObj.dict_content_value"
                         :label="dictObj.dict_content_name"
                         :value="dictObj.dict_content_value">
              </el-option>
            </el-select>
            <!--</el-tooltip>-->
        </el-col>
      </el-form-item>
    </el-form>

    <!--<el-button v-if="isView!='Y'" @click="saveUnitContext(false)" type="info">保存</el-button>-->
    <!--&lt;!&ndash;<el-button type="primary">上一步</el-button>&ndash;&gt;-->
    <!--<el-button v-if="isView!='Y'" @click="nextStep" type="success">下一步</el-button>-->
  </div>
</template>

<script>
  import WorkMain from "@/models/public/WorkMain"

  export default {
    name: "OnedimRecord",
    describe:"一维报表填报单元",
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
        saveFlag:'N',//载入页面后是否保存当前页面数据 Y:保存 N：不做任何动作仅仅载入 S:提交 V：校验
        definedColums:[],
        columDatas:{},
        dataObject:[],
        hasMounted:false,
        unitFlds:[],
        unitDatas:{},
        fldDicts:{},
        validateUnitDatas:{}
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
          url:"/record/process/getClientFldByUnitId",
          params:{
            groupId:this.unitId,
            clientType:'PC'
          }
        }).then(response=>{
          if(loading){
            loading.close();
          }
          if(response!=null){
            let unitFldArray = []
            this.unitFldTypes = response
            response.forEach(unitTypeConfig=>{
              unitTypeConfig.unitFlds.forEach(unitFld=>{
                unitFldArray.push(unitFld)
              })
            })
            this.unitFlds =unitFldArray

          }


        }).catch(error=>{
            this.Message.success(error)
            loading.close()
          }
        );
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
          console.log(response)
          const reportDataLineMap = new Object()
          const dbDataLineArray = []
          if(response){
            const unitDatasTmp = {}
            response.forEach(reportData=>{
              const colum_id = reportData.colum_id
              const fld_id = reportData.fld_id
              unitDatasTmp['f'+fld_id] = reportData
            //   if(!dbDataLineArray[colum_id]){
            //     dbDataLineArray[colum_id] = new Object()
            //     dbDataLineArray[colum_id].colum_id = colum_id
            //   }
            //   dbDataLineArray[colum_id]["f"+fld_id] = reportData.record_data
            })
            this.unitDatas = unitDatasTmp
          }
        }).catch(error=>{
            this.Message.success(error)
          }
        );
      },
      doSaveUnitContext(processName){
        this.BaseRequest({
          url:"/record/process/saveSimpleDatas",
          method:'post',
          data:{
            report_id:this.reportId,
            job_id:this.jobId,
            reportJobInfos:Object.values(this.unitDatas)
          }
        }).then(response=>{
          // this.$emit("refreshSaveLoading",this.unitId,"保存成功")
          // this.$emit("checkStepAndSave",this.unitId,this.saveFlag)
          console.log(response)
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
        this.validateUnitDatas = {}
        let validateFailed = false
        const validateUnitDatasTmp = {}
        this.BaseRequest({
          url:"/record/process/validateSimpleDatas",
          method:'post',
          data:{
            reportJobInfos:Object.values(this.unitDatas)
          }
        }).then(response=>{
          console.log(response)

          if(response){
            const errorFldIds = Object.keys(response);
            if(errorFldIds!=null&&errorFldIds.length>0){
              validateFailed = true
            }

            errorFldIds.forEach(errorFldId=>{
              validateUnitDatasTmp['f'+errorFldId] = response[errorFldId]
            })

          }else{
            this.$emit("validateReportsCallBack",this.unitId,processName,"校验出现异常")
          }

          this.validateUnitDatas = validateUnitDatasTmp

          // this.$emit("checkStepAndSave",this.unitId,this.saveFlag)
          let failedMessage = null
          if(validateFailed){
            // this.$emit("refreshSaveLoading",this.unitId,"有输入错误")
            failedMessage = "有输入错误"
          }

          this.$emit("validateReportsCallBack",this.unitId,processName,failedMessage)

        });
      },
      doSubmitContext(){
        this.doSaveUnitContext(true)
      },
      setSaveFlag(saveFlag){
        this.saveFlag = saveFlag
      },

      getUnitDictFldContent(){
        this.BaseRequest({
          url:"/record/process/getUnitDictFldContent",
          params:{
            groupId:this.unitId
          }
        }).then(response=>{
          if(response){
            const fldIds = Object.keys(response)
            for(const fldIdIdex in fldIds){
              const dictContentList = response[fldIds[fldIdIdex]]
              this.fldDicts["f"+fldIds[fldIdIdex]] = dictContentList
            }
            this.getReportFldDatas()
          }else{
            this.getReportFldDatas()
          }
        }).catch(error=>{
            this.Message.success(error)
          }
        );
      }
    },
    mounted:function(){
      this.getUnitFldsConfig()
      this.getUnitDictFldContent()

    },
    activated(){
    }
  }
</script>

<style lang="css">
  .el-form-item__label{
    font-size:12px !important;
  }
</style>

<style scoped>
  .el-form{
    margin:0 0 30px 0;
  }

  .el-form-item{
    margin:0 0 15px 0;
  }
</style>
