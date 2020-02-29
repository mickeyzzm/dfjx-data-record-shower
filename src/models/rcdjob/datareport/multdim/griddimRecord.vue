<template>
  <div style="width: 100%">
    <el-row v-if="isView=='N'" style="text-align: left;margin:0 0 5px 0;">
      <el-col  :span="24">
        <el-button type="primary" size="small" @click="addOne">增加一条记录</el-button>
      </el-col>
    </el-row>
    <div class="el-table el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small" style="border: 0; background-color: transparent">
        <div class="el-table__header-wrapper el-table__body-wrapper " style="overflow-x: auto !important;overflow-y: auto;" >
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="table-layout : fixed !important;">
            <thead class="has-gutter">
              <tr style="font-size: 14px;">
                <th colspan="1" rowspan="2" class="el-table_6_column_31  is-center   is-leaf " style="min-width:100px">
                  &nbsp; &nbsp; &nbsp;序号 &nbsp; &nbsp; &nbsp;
                </th>
                <th v-for="unitFldType in unitFldTypes" :colspan="unitFldType.unitFlds.length" rowspan="1" class="el-table_6_column_31  is-center   is-leaf ">
                  <span style="font-weight: bold; ">{{unitFldType.catg_name}}</span>
                </th>
                <th v-if="isView=='N'" colspan="1" rowspan="2" class="el-table_6_column_31  is-center is-leaf" style="min-width:100px">
                  &nbsp; &nbsp; &nbsp;操作&nbsp; &nbsp; &nbsp;
                </th>
              </tr>

              <tr style="font-size: 14px;">
                <th v-for="unitFld in unitFlds" colspan="1" rowspan="1" class="el-table_6_column_31  is-center is-leaf"  style="min-width:225px">
                  {{unitFld.fld_name}}
                </th>
              </tr>
            </thead>
            <tbody>
              <GriddimRecordRow v-for="(reportDataLine,rowIndex) in dbDataLineArray"
                                :key="'dbDataLineArray'+rowIndex"
                                :reportDataLine="reportDataLine"
                                :rowLineNumber="rowIndex"
                                :dataArrayName="'dbDataLineArray'"
                                :arrayIndex="rowIndex"
                                :removeLine="removeLine"
                                :reloadData="reloadData"
                                :needRecordDel="true"
                                :unitFlds="unitFlds"
                                :fldDicts="fldDicts"
                                :isView="isView"
                                :validateResultObj="validateResultObj['c'+reportDataLine.colum_id]"></GriddimRecordRow>
              <GriddimRecordRow v-for="(reportDataLine,rowIndex) in newReportDataLine"
                                :key="'newReportDataLine'+rowIndex"
                                :reportDataLine="reportDataLine"
                                :rowLineNumber="rowIndex+(dbDataLineArray!=null?dbDataLineArray.length:0)"
                                :dataArrayName="'newReportDataLine'"
                                :arrayIndex="rowIndex"
                                :removeLine="removeLine"
                                :reloadData="reloadData"
                                :needRecordDel="false"
                                :unitFlds="unitFlds"
                                :fldDicts="fldDicts"
                                :isView="isView"
                                :validateResultObj="newDataValidateResultObj['c'+rowIndex]"></GriddimRecordRow>
            </tbody>

          </table>
        </div>

        <!--<div class="el-table__body-wrapper is-scrolling-none">-->
          <!--<table style="width:100%;" cellspacing="0" cellpadding="0" border="0" class="el-table__body">-->
          <!--</table>-->
        <!--</div>-->
      </div>
  </div>
</template>

<script>
  import WorkMain from "@/models/public/WorkMain"
  import GriddimRecordRow from "@/models/rcdjob/datareport/multdim/griddimRecordRow"

  export default {
    name: "GriddimRecord",
    describe:"多维静态报表填报单元",
    components: {
      WorkMain,
      GriddimRecordRow
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
      /*
       * upReportDataLine 更新了数据的行
       * newReportDataLine 点击addone新增的行
       * delReportDataLine 从旧数据中删除的行
       */
      return {
        lastStep:false,
        definedIndexs:[],
        unitFldTypes:[],
        unitFlds:[],
        fldDicts:{},
        dbDataLineArray:[],
        newReportDataLine:[],
        delReportDataLine:[],
        validateResultObj:{},
        newDataValidateResultObj:{},
        hasMounted:false,
        cacheOptions:''
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
          const dbDataLineArray = []
          if(response){
            response.forEach(reportData=>{
              const colum_id = reportData.colum_id
              const fld_id = reportData.fld_id
              if(!dbDataLineArray[colum_id]){
                dbDataLineArray[colum_id] = new Object()
                dbDataLineArray[colum_id].colum_id = colum_id
              }
              dbDataLineArray[colum_id]["f"+fld_id] = reportData.record_data
            })
            this.dbDataLineArray = dbDataLineArray
          }
        }).catch(error=>{
            this.Message.success(error)
          }
        );
      },

      addOne(){
        const reportLineCount = this.newReportDataLine.length
        const newReportDataLineCp = this.newReportDataLine
        const newLineDatas = new Object()
        this.unitFlds.forEach(unitFld=>{
          newLineDatas["f"+unitFld.fld_id] = ''
        })
        newReportDataLineCp[reportLineCount] = newLineDatas
        this.newReportDataLine = null
        this.newReportDataLine = newReportDataLineCp
      },

      removeLine(arrayIndex,dataName,needRecordDel){
        let reportDataLineNew = new Array()
        this[dataName].forEach((reportDataLine,index)=>{
          if(index!=arrayIndex){
            reportDataLineNew.push(reportDataLine)
          }else{
            if(needRecordDel){
              this.delReportDataLine.push(reportDataLine)
            }
          }
        })

        this[dataName] = reportDataLineNew
      },

      getParseRecordData(dataLineArray){
        const reportJobDataList = new Array()
        if(dataLineArray){
          dataLineArray.forEach((reportDataLine,lineNumber)=>{
            this.unitFlds.forEach(unitFld=>{
              const reportDataValue = reportDataLine['f'+unitFld.fld_id]
              reportJobDataList.push({
                report_id:this.reportId,
                unit_id:this.unitId,
                colum_id:reportDataLine.colum_id?reportDataLine.colum_id:lineNumber,
                fld_id:unitFld.fld_id,
                record_data:reportDataValue
              })
            })
          })
        }
        return reportJobDataList
      },

      reloadData(dataName){
        console.log(dataName)
        const tmpData = this[dataName]
        this[dataName] = null
        this[dataName] = tmpData
      },

      doSaveUnitContext(processName){
        const dbDataList = this.getParseRecordData(this.dbDataLineArray)
        const newDataList = this.getParseRecordData(this.newReportDataLine)
        const delDataList = this.getParseRecordData(this.delReportDataLine)
        const gridDataObj = {
          report_id:this.reportId,
          job_id:this.jobId,
          client_type:'PC',
          reportJobInfos:dbDataList,
          newReportJobInfos:newDataList,
          delReportJobInfos:delDataList
        }

        this.BaseRequest({
          url:"/record/process/saveGridDatas",
          method:'post',
          data:gridDataObj
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
        this.validateResultObj = {}
        this.newDataValidateResultObj = {}
        const dbDataList = this.getParseRecordData(this.dbDataLineArray)
        const newDataList = this.getParseRecordData(this.newReportDataLine)
        // validateSimpleUnitContext
        const valloading = this.$loading({
          lock: true,
          text: '数据校验中.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.BaseRequest({
          url:"/record/process/validateGridDatas",
          method:'post',
          data:{
            reportJobInfos:dbDataList,
            newReportJobInfos:newDataList,
            client_type:'PC'
          }
        }).then(response=>{
          valloading.close();

          if(response){
          }else{
            this.$emit("validateReportsCallBack",this.unitId,processName,"校验出现异常")
          }

          let validateFailed = false
          const reportJobDataValidate = response.reportJobDataValidate
          const newDataValidateResultObj = response.newReportJobDataValidate
          if(reportJobDataValidate&&Object.keys(reportJobDataValidate).length>0){
            const validateUnitDatasTmp = {}
            const errorColums = Object.keys(reportJobDataValidate);

            errorColums.forEach(errorColumId=>{
              validateUnitDatasTmp['c'+errorColumId] = {}
              const errorFlds = reportJobDataValidate[errorColumId]
              if(errorFlds&&Object.keys(errorFlds).length>0){
                const errorFldIds = Object.keys(errorFlds)
                errorFldIds.forEach(errorFldId=>{
                  validateUnitDatasTmp['c'+errorColumId]['f'+errorFldId] = errorFlds[errorFldId]
                })
              }
            })
            this.validateResultObj = validateUnitDatasTmp

            validateFailed= true
          }

          if(newDataValidateResultObj&&Object.keys(newDataValidateResultObj).length>0){
            const validateUnitDatasTmp = {}
            const errorColums = Object.keys(newDataValidateResultObj);

            errorColums.forEach(errorColumId=>{
              validateUnitDatasTmp['c'+errorColumId] = {}
              const errorFlds = newDataValidateResultObj[errorColumId]
              if(errorFlds&&Object.keys(errorFlds).length>0){
                const errorFldIds = Object.keys(errorFlds)
                errorFldIds.forEach(errorFldId=>{
                  validateUnitDatasTmp['c'+errorColumId]['f'+errorFldId] = errorFlds[errorFldId]
                })
              }
            })
            this.newDataValidateResultObj = validateUnitDatasTmp

            validateFailed= true
          }

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

  .table-row{
    background-color: white;
  }

  .table-row-color{
    background-color: #F5F6FA;
  }
</style>
