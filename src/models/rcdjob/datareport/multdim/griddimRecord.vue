<template>
  <div style="width: 100%">
    <!--<el-form ref="form"  label-width="40%">-->
    <el-row style="text-align: left;margin:0 0 5px 0;">
      <el-col  :span="24">
        <el-button type="primary" size="small" @click="addOne">增加一条记录</el-button>
      </el-col>
    </el-row>
    <div class="el-table el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small">
        <div class="el-table__header-wrapper">
          <table style="width:100%;" cellspacing="0" cellpadding="0" border="0" class="el-table__header">
            <thead class="has-gutter">
              <tr style="font-size: 14px;">
                <th style="width:60px" colspan="1" rowspan="1" class="el-table_6_column_31  is-center   is-leaf">
                  序号
                </th>
                <th v-for="unitFld in unitFlds" colspan="1" rowspan="1" class="el-table_6_column_31  is-center   is-leaf">
                  {{unitFld.fld_name}}
                </th>
                <th style="width:100px" colspan="1" rowspan="1" class="el-table_6_column_31  is-center   is-leaf">
                  操作
                </th>
              </tr>
            </thead>
          </table>
        </div>

        <div class="el-table__body-wrapper is-scrolling-none">
          <table style="width:100%;" cellspacing="0" cellpadding="0" border="0" class="el-table__body">
            <tbody>
              <tr v-for="(reportDataLine,rowLineNumber) in reportDataLineArray" class="el-table__row mini-font-size">
                <td style="width:60px" colspan="1" rowspan="1" class="  is-center   ">
                  {{rowLineNumber+1}}
                </td>
                <td v-for="unitFld in unitFlds" colspan="1" rowspan="1" class="is-center">
                  <div class="cell">
                    <div class="el-form-item" style="margin: auto;">
                      <div class="el-form-item__content">
                        <div v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" class="el-input el-input--mini "
                             v-bind:class="{ 'el-input-group el-input-group--append':(unitFld.fld_point!=null&&unitFld.fld_point!='') }">
                          <input v-model="reportDataLine['f'+unitFld.fld_id]" class="el-input__inner"></input>
                          <div v-if="unitFld.fld_point!=null&&unitFld.fld_point!=''" class="el-input-group__append">{{unitFld.fld_point}}</div>
                        </div>
                        <!--<el-input  v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" size="mini" v-model="reportDataLineArray[rowLineNumber][unitFld.fld_id]" >-->
                          <!--<template v-if="unitFld.fld_point!=null&&unitFld.fld_point!=''" slot="append">{{unitFld.fld_point}}</template>-->
                        <!--</el-input>-->
                        <el-date-picker v-if="unitFld.fld_data_type==2" size="mini" align="left"
                                        v-model="reportDataLine[unitFld.fld_id]"
                                        type="date"
                                        placeholder="选择日期">
                        </el-date-picker>

                        <el-select @change="refreshData" v-model="reportDataLine['f'+unitFld.fld_id]" v-if="unitFld.fld_data_type==3">
                          <el-option v-for="dictObj in fldDicts['f'+unitFld.fld_id]"
                                     :key="dictObj.dict_content_value"
                                     :label="dictObj.dict_content_name"
                                     :value="dictObj.dict_content_value">
                          </el-option>
                        </el-select>

                        <div v-if="validateResultObj[rowLineNumber]!=null&&validateResultObj[rowLineNumber][unitFld.fld_id]!=null"
                             style="padding:0;margin:0;font-size:8px;color:red;">{{validateResultObj[rowLineNumber][unitFld.fld_id]}}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td style="width:100px" colspan="1" rowspan="1" class="  is-center   ">
                  <el-button type="text" size="small" @click="removeLine(rowLineNumber)">删除</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      <!--<el-table-->
        <!--:data="reportDataLineArray"-->
        <!--tooltip-effect="dark" size="mini"-->
        <!--row-class-name="mini-font-size"-->
        <!--border-->
        <!--stripe-->
        <!--style="width: 100%;">-->
        <!--<el-table-column label="序号" type="index" width="60" align="center"></el-table-column>-->
        <!--<el-table-column :key="unitFld.fld_id" v-for="unitFld in unitFlds" :label="unitFld.fld_name" width="200" >-->
          <!--<template slot-scope="scope">-->
            <!--&lt;!&ndash;<el-form-item label-width="0"	style="margin:auto auto" size="mini" :error="scope.row[col.dim_id+'-validateErrpr']">&ndash;&gt;-->
            <!--<el-form-item label-width="0"	style="margin:auto auto" size="mini" >-->
              <!--&lt;!&ndash;<el-tooltip class="item" effect="dark" :content="'鼠标划过内容'" placement="top">&ndash;&gt;-->
                <!--<el-input v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" size="mini" v-model="scope.row[unitFld.fld_id]" >-->
                  <!--<template v-if="unitFld.fld_point!=null&&unitFld.fld_point!=''" slot="append">{{unitFld.fld_point}}</template>-->
                <!--</el-input>-->
                <!--<el-date-picker v-if="unitFld.fld_data_type==2" size="mini" align="left"-->
                                <!--v-model="scope.row[unitFld.fld_id]"-->
                                <!--type="date"-->
                                <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
                <!--<el-select v-model="scope.row[unitFld.fld_id]" v-if="unitFld.fld_data_type==3">-->
                  <!--<el-option v-for="dictObj in fldDicts[unitFld.fld_id]"-->
                             <!--:key="dictObj.dict_content_value"-->
                             <!--:label="dictObj.dict_content_name"-->
                             <!--:value="dictObj.dict_content_value">-->
                  <!--</el-option>-->
                <!--</el-select>-->

              <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
            <!--</el-form-item>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button type="text" size="small" @click="removeLine(scope.row)">删除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->

      <!--</el-table>-->
    <!--</el-form>-->
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
        fldDicts:{},
        reportDataLineArray:[],
        validateResultObj:{},
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
          const reportDataLineArray = []
          if(response){
            response.forEach(reportData=>{
              const colum_id = reportData.colum_id
              const fld_id = reportData.fld_id
              if(!reportDataLineArray[colum_id]){
                reportDataLineArray[colum_id] = new Object()
              }
              reportDataLineArray[colum_id]["f"+fld_id] = reportData.record_data
            })
            this.reportDataLineArray = reportDataLineArray
          }
        }).catch(error=>{
            this.Message.success(error)
          }
        );
      },

      addOne(){
        const reportLineCount = this.reportDataLineArray.length
        const reportDataLineArrayCopy = this.reportDataLineArray
        const newLineDatas = new Object()
        this.unitFlds.forEach(unitFld=>{
          newLineDatas["f"+unitFld.fld_id] = ''
        })
        reportDataLineArrayCopy[reportLineCount] = newLineDatas
        this.reportDataLineArray = null
        this.reportDataLineArray = reportDataLineArrayCopy
      },

      removeLine(lineNumber){
        let reportDataLineNew = new Array()
        this.reportDataLineArray.forEach((reportDataLine,index)=>{
          if(index!=lineNumber){
            reportDataLineNew.push(reportDataLine)
          }
        })

        this.reportDataLineArray = reportDataLineNew
      },

      refreshData(eventValue){
        //element导致界面不刷新，需要主动修改data值让页面的watcher发现
        const reportDataLineArrayCopy = this.reportDataLineArray
        this.reportDataLineArray = null
        this.reportDataLineArray = reportDataLineArrayCopy

      },

      getParseRecordData(){
        const reportJobDataList = new Array()
        if(this.reportDataLineArray){
          this.reportDataLineArray.forEach((reportDataLine,lineNumber)=>{
            this.unitFlds.forEach(unitFld=>{
              const reportDataValue = reportDataLine['f'+unitFld.fld_id]
              reportJobDataList.push({
                report_id:this.reportId,
                unit_id:this.unitId,
                colum_id:lineNumber,
                fld_id:unitFld.fld_id,
                record_data:reportDataValue
              })
            })
          })
        }
        return reportJobDataList
      },

      doSaveUnitContext(processName){
        const gridDataObj = {
          report_id:this.reportId,
          job_id:this.jobId,
          reportJobDataList:this.getParseRecordData()
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

        const recordDataList = this.getParseRecordData()
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
            reportJobDataList:recordDataList
          }
        }).then(response=>{
          valloading.close();

          if(response){
          }else{
            this.$emit("validateReportsCallBack",this.unitId,processName,"校验出现异常")
          }

          let validateFailed = false
          console.log(Object.keys(response).length)
          if(response&&Object.keys(response).length>0){
            this.validateResultObj = response
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
