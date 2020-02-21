webpackJsonp([3,4,10],{"307n":function(t,e){},"9dp3":function(t,e){},BV7j:function(t,e){},Gkc7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("fZjL"),a=i.n(n),o=i("gRE1"),s=i.n(o),r={name:"OnedimRecord",describe:"一维报表填报单元",components:{WorkMain:i("j1XB").a},props:{jobId:{type:String},reportId:{type:String},unitId:{type:Number},unitType:{type:Number},isView:{type:String}},data:function(){return{lastStep:!1,saveFlag:"N",definedColums:[],columDatas:{},dataObject:[],hasMounted:!1,unitFlds:[],unitDatas:{},validateUnitDatas:{}}},methods:{getUnitFldsConfig:function(){var t=this,e=null;"N"==this.saveFlag&&(e=this.$loading({lock:!0,text:"获取填报单元信息中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})),this.BaseRequest({url:"/record/process/getClientFldByUnitId",params:{groupId:this.unitId,clientType:"PC"}}).then(function(i){if(e&&e.close(),null!=i){var n=[];t.unitFldTypes=i,i.forEach(function(t){t.unitFlds.forEach(function(t){n.push(t)})}),t.unitFlds=n}}).catch(function(i){t.Message.success(i),e.close()})},getReportFldDatas:function(){var t=this;this.BaseRequest({url:"/record/process/getFldReportDatas",params:{jobId:this.jobId,reportId:this.reportId,groupId:this.unitId}}).then(function(e){console.log(e);new Object;if(e){var i={};e.forEach(function(t){t.colum_id;var e=t.fld_id;i["f"+e]=t}),t.unitDatas=i}}).catch(function(e){t.Message.success(e)})},doSaveUnitContext:function(t){var e=this;this.BaseRequest({url:"/record/process/saveSimpleDatas",method:"post",data:{report_id:this.reportId,job_id:this.jobId,reportJobInfos:s()(this.unitDatas)}}).then(function(i){console.log(i),i?e.$emit("saveReportsCallBack",e.unitId,t):e.$emit("saveReportsCallBack",e.unitId,t,"保存失败")}).catch(function(i){e.$emit("saveReportsCallBack",e.unitId,t,i)})},doValidateUnitContext:function(t){var e=this;this.validateUnitDatas={};var i=!1,n={};this.BaseRequest({url:"/record/process/validateSimpleDatas",method:"post",data:{reportJobInfos:s()(this.unitDatas)}}).then(function(o){if(console.log(o),o){var s=a()(o);null!=s&&s.length>0&&(i=!0),s.forEach(function(t){n["f"+t]=o[t]})}else e.$emit("validateReportsCallBack",e.unitId,t,"校验出现异常");e.validateUnitDatas=n;var r=null;i&&(r="有输入错误"),e.$emit("validateReportsCallBack",e.unitId,t,r)})},doSubmitContext:function(){this.doSaveUnitContext(!0)},setSaveFlag:function(t){this.saveFlag=t}},mounted:function(){this.getUnitFldsConfig(),this.getReportFldDatas()},activated:function(){}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"background-color":"white",height:"calc(100% - 50px)",margin:"20px 0 0 0",padding:"30px 0 0 0","border-radius":"10px"}},[i("el-form",{ref:"form",attrs:{"label-width":"40%"}},t._l(t.unitFlds,function(e){return i("el-form-item",{key:e.fld_id,attrs:{size:"mini",label:e.fld_name,error:t.validateUnitDatas["f"+e.fld_id]}},[i("el-col",{attrs:{span:23}},[i("el-input",{staticStyle:{width:"50%",float:"left"},attrs:{disabled:"Y"==t.isView},model:{value:t.unitDatas["f"+e.fld_id].record_data,callback:function(i){t.$set(t.unitDatas["f"+e.fld_id],"record_data",i)},expression:"unitDatas['f'+unitFld.fld_id]['record_data']"}})],1)],1)}))],1)},staticRenderFns:[]};var d=i("VU/8")(r,l,!1,function(t){i("9dp3"),i("tuxb")},"data-v-eec00b9a",null);e.default=d.exports},Jel1:function(t,e){},PaOl:function(t,e){},TmV0:function(t,e,i){i("fZOM"),t.exports=i("FeBl").Object.values},fZOM:function(t,e,i){var n=i("kM2E"),a=i("mbce")(!1);n(n.S,"Object",{values:function(t){return a(t)}})},gRE1:function(t,e,i){t.exports={default:i("TmV0"),__esModule:!0}},hkO7:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("fZjL"),a=i.n(n),o=i("j1XB"),s={name:"GriddimRecordRow",describe:"表格内的数据行",components:{WorkMain:o.a},props:{dataArrayName:{type:String},reportDataLine:{type:Object},rowLineNumber:{type:Number},arrayIndex:{type:Number},unitFlds:{type:Array},fldDicts:{type:Object},removeLine:{type:Function},needRecordDel:{type:Boolean},validateResultObj:{type:Object}},data:function(){return{}},methods:{refreshData:function(){var t=this.reportDataLine;this.reportDataLine=null,this.reportDataLine=t}},mounted:function(){},activated:function(){}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("tr",{staticClass:"el-table__row mini-font-size "},[i("td",{staticClass:"  is-center table-row",class:{"table-row-color":t.rowLineNumber%2==0},staticStyle:{width:"60px"},attrs:{colspan:"1",rowspan:"1"}},[t._v("\n    "+t._s(t.rowLineNumber+1)+"\n  ")]),t._v(" "),t._l(t.unitFlds,function(e){return i("td",{staticClass:"is-center table-row ",class:{"table-row-color":t.rowLineNumber%2==0},attrs:{colspan:"1",rowspan:"1"}},[i("div",{staticClass:"cell"},[i("div",{staticClass:"el-form-item",staticStyle:{margin:"auto"}},[i("div",{staticClass:"el-form-item__content"},[0==e.fld_data_type||1==e.fld_data_type?i("div",{staticClass:"el-input el-input--mini ",class:{"el-input-group el-input-group--append":null!=e.fld_point&&""!=e.fld_point}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.reportDataLine["f"+e.fld_id],expression:"reportDataLine['f'+unitFld.fld_id]"}],staticClass:"el-input__inner",attrs:{placeholder:"请输入"},domProps:{value:t.reportDataLine["f"+e.fld_id]},on:{input:function(i){i.target.composing||t.$set(t.reportDataLine,"f"+e.fld_id,i.target.value)}}}),t._v(" "),null!=e.fld_point&&""!=e.fld_point?i("div",{staticClass:"el-input-group__append"},[t._v(t._s(e.fld_point))]):t._e()]):t._e(),t._v(" "),2==e.fld_data_type?i("el-date-picker",{attrs:{size:"mini",align:"left",type:"date",placeholder:"选择日期"},model:{value:t.reportDataLine["f"+e.fld_id],callback:function(i){t.$set(t.reportDataLine,"f"+e.fld_id,i)},expression:"reportDataLine['f'+unitFld.fld_id]"}}):t._e(),t._v(" "),3==e.fld_data_type?i("el-select",{on:{change:t.refreshData},model:{value:t.reportDataLine["f"+e.fld_id],callback:function(i){t.$set(t.reportDataLine,"f"+e.fld_id,i)},expression:"reportDataLine['f'+unitFld.fld_id]"}},t._l(t.fldDicts["f"+e.fld_id],function(t){return i("el-option",{key:t.dict_content_value,attrs:{label:t.dict_content_name,value:t.dict_content_value}})})):t._e(),t._v(" "),null!=t.validateResultObj[t.reportDataLine.colum_id]&&null!=t.validateResultObj[t.reportDataLine.colum_id][e.fld_id]?i("div",{staticStyle:{padding:"0",margin:"0","font-size":"8px",color:"red"}},[t._v(t._s(t.validateResultObj[t.reportDataLine.colum_id][e.fld_id]))]):t._e()],1)])])])}),t._v(" "),i("td",{staticClass:"  is-center  table-row ",class:{"table-row-color":t.rowLineNumber%2==0},attrs:{colspan:"1",rowspan:"1"}},[i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.removeLine(t.arrayIndex,t.dataArrayName,t.needRecordDel)}}},[t._v("删除")])],1)],2)},staticRenderFns:[]},l=i("VU/8")(s,r,!1,null,null,null).exports,d={name:"GriddimRecord",describe:"多维静态报表填报单元",components:{WorkMain:o.a,GriddimRecordRow:l},props:{jobId:{type:String},reportId:{type:String},unitId:{type:Number},unitType:{type:Number},isView:{type:String}},data:function(){return{lastStep:!1,definedIndexs:[],unitFldTypes:[],unitFlds:[],fldDicts:{},dbDataLineArray:[],newReportDataLine:[],delReportDataLine:[],validateResultObj:{},newDataValidateResultObj:{},hasMounted:!1,cacheOptions:""}},methods:{getUnitFldsConfig:function(){var t=this,e=null;"N"==this.saveFlag&&(e=this.$loading({lock:!0,text:"获取填报单元信息中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})),this.BaseRequest({url:"/record/process/getClientFldByUnitId",params:{groupId:this.unitId,clientType:"PC"}}).then(function(i){if(e&&e.close(),null!=i){var n=[];t.unitFldTypes=i,i.forEach(function(t){t.unitFlds.forEach(function(t){n.push(t)})}),t.unitFlds=n}}).catch(function(i){t.Message.success(i),e.close()})},getUnitDictFldContent:function(){var t=this;this.BaseRequest({url:"/record/process/getUnitDictFldContent",params:{groupId:this.unitId}}).then(function(e){if(e){var i=a()(e);for(var n in i){var o=e[i[n]];t.fldDicts["f"+i[n]]=o}}}).catch(function(e){t.Message.success(e)})},getReportFldDatas:function(){var t=this;this.BaseRequest({url:"/record/process/getFldReportDatas",params:{jobId:this.jobId,reportId:this.reportId,groupId:this.unitId}}).then(function(e){new Object;var i=[];e&&(e.forEach(function(t){var e=t.colum_id,n=t.fld_id;i[e]||(i[e]=new Object,i[e].colum_id=e),i[e]["f"+n]=t.record_data}),t.dbDataLineArray=i)}).catch(function(e){t.Message.success(e)})},addOne:function(){var t=this.newReportDataLine.length,e=this.newReportDataLine,i=new Object;this.unitFlds.forEach(function(t){i["f"+t.fld_id]=""}),e[t]=i,this.newReportDataLine=null,this.newReportDataLine=e},removeLine:function(t,e,i){var n=this,a=new Array;this[e].forEach(function(e,o){o!=t?a.push(e):i&&n.delReportDataLine.push(e)}),this[e]=a},getParseRecordData:function(t){var e=this,i=new Array;return t&&t.forEach(function(t,n){e.unitFlds.forEach(function(a){var o=t["f"+a.fld_id];i.push({report_id:e.reportId,unit_id:e.unitId,colum_id:t.colum_id?t.colum_id:n,fld_id:a.fld_id,record_data:o})})}),i},reloadData:function(t){console.log(t);var e=this[t];this[t]=null,this[t]=e},doSaveUnitContext:function(t){var e=this,i=this.getParseRecordData(this.dbDataLineArray),n=this.getParseRecordData(this.newReportDataLine),a=this.getParseRecordData(this.delReportDataLine),o={report_id:this.reportId,job_id:this.jobId,reportJobInfos:i,newReportJobInfos:n,delReportJobInfos:a};this.BaseRequest({url:"/record/process/saveGridDatas",method:"post",data:o}).then(function(i){i?e.$emit("saveReportsCallBack",e.unitId,t):e.$emit("saveReportsCallBack",e.unitId,t,"保存失败")}).catch(function(i){e.$emit("saveReportsCallBack",e.unitId,t,i)})},doValidateUnitContext:function(t){var e=this;this.validateResultObj={},this.newDataValidateResultObj={};var i=this.getParseRecordData(this.dbDataLineArray),n=this.getParseRecordData(this.newReportDataLine),o=this.$loading({lock:!0,text:"数据校验中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.BaseRequest({url:"/record/process/validateGridDatas",method:"post",data:{reportJobInfos:i,newReportJobInfos:n}}).then(function(i){o.close(),i||e.$emit("validateReportsCallBack",e.unitId,t,"校验出现异常");var n=!1,s=i.reportJobDataValidate,r=i.newReportJobDataValidate;s&&a()(s).length>0&&(e.validateResultObj=s,n=!0),r&&a()(r).length>0&&(e.newDataValidateResultObj=r,n=!0);var l=null;n&&(l="有输入错误"),e.$emit("validateReportsCallBack",e.unitId,t,l)})},setSaveFlag:function(t){this.saveFlag=t}},mounted:function(){this.getUnitFldsConfig(),this.getUnitDictFldContent(),this.getReportFldDatas()},activated:function(){}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{width:"100%"}},[i("el-row",{staticStyle:{"text-align":"left",margin:"0 0 5px 0"}},[i("el-col",{attrs:{span:24}},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.addOne}},[t._v("增加一条记录")])],1)],1),t._v(" "),i("div",{staticClass:"el-table el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition el-table--small",staticStyle:{border:"0","background-color":"transparent"}},[i("div",{staticClass:"el-table__header-wrapper el-table__body-wrapper ",staticStyle:{"overflow-x":"auto !important","overflow-y":"auto"}},[i("table",{staticClass:"el-table__header",attrs:{cellspacing:"0",cellpadding:"0",border:"0"}},[i("thead",{staticClass:"has-gutter"},[i("tr",{staticStyle:{"font-size":"14px"}},[i("th",{staticClass:"el-table_6_column_31  is-center   is-leaf ",attrs:{colspan:"1",rowspan:"2"}},[t._v("\n                     序号      \n              ")]),t._v(" "),t._l(t.unitFldTypes,function(e){return i("th",{staticClass:"el-table_6_column_31  is-center   is-leaf ",attrs:{colspan:e.unitFlds.length,rowspan:"1"}},[i("span",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(e.catg_name))])])}),t._v(" "),i("th",{staticClass:"el-table_6_column_31  is-center is-leaf",attrs:{colspan:"1",rowspan:"2"}},[t._v("\n                     操作     \n              ")])],2),t._v(" "),i("tr",{staticStyle:{"font-size":"14px"}},t._l(t.unitFlds,function(e){return i("th",{staticClass:"el-table_6_column_31  is-center is-leaf",staticStyle:{"min-width":"225px"},attrs:{colspan:"1",rowspan:"1"}},[t._v("\n                "+t._s(e.fld_name)+"\n              ")])}))]),t._v(" "),i("tbody",[t._l(t.dbDataLineArray,function(e,n){return i("GriddimRecordRow",{key:"dbDataLineArray"+n,attrs:{reportDataLine:e,rowLineNumber:n,dataArrayName:"dbDataLineArray",arrayIndex:n,removeLine:t.removeLine,reloadData:t.reloadData,needRecordDel:!0,unitFlds:t.unitFlds,fldDicts:t.fldDicts,validateResultObj:t.validateResultObj}})}),t._v(" "),t._l(t.newReportDataLine,function(e,n){return i("GriddimRecordRow",{key:"newReportDataLine"+n,attrs:{reportDataLine:e,rowLineNumber:n,dataArrayName:"newReportDataLine",arrayIndex:n,removeLine:t.removeLine,reloadData:t.reloadData,needRecordDel:!1,unitFlds:t.unitFlds,fldDicts:t.fldDicts,validateResultObj:t.newDataValidateResultObj}})})],2)])])])],1)},staticRenderFns:[]};var u=i("VU/8")(d,c,!1,function(t){i("307n")},"data-v-7e76c9c8",null);e.default=u.exports},mbce:function(t,e,i){var n=i("lktj"),a=i("TcQ7"),o=i("NpIQ").f;t.exports=function(t){return function(e){for(var i,s=a(e),r=n(s),l=r.length,d=0,c=[];l>d;)o.call(s,i=r[d++])&&c.push(t?[i,s[i]]:s[i]);return c}}},nMLz:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("j1XB"),a=i("Gkc7"),o=i("hkO7"),s={name:"ReportContextRoot",describe:"报送填报主页面",components:{OnedimRecord:a.default,GriddimRecord:o.default},props:{jobId:{type:String},reportId:{type:String},unitEntity:{type:Object},isView:{type:String}},data:function(){return{reportDefinedId:"",saveFlag:"N"}},methods:{doSaveContext:function(t){this.$refs.recordTemplate.doSaveUnitContext(t)},doValidateUnitContext:function(t){this.$refs.recordTemplate.doValidateUnitContext(t)},doSaveAndValidate:function(t){"SAVE"==t?this.doSaveContext("SAVEANDVALIDATE"):"VALIDATE"==t&&this.doValidateUnitContext("SAVEANDVALIDATE")},doSubmitContext:function(t){"SAVE"==t?this.doSaveContext("SUBMIT"):"VALIDATE"==t&&this.doValidateUnitContext("SUBMIT")},getFolumarData:function(){this.$refs.recordTemplate.getUnitContext(!0)},saveReportsCallBack:function(t,e,i){"SUBMIT"==e?this.$emit("submitReportsCallBack",t,this.unitEntity.job_unit_name,i,"SAVE"):"SAVEANDVALIDATE"==e?this.$emit("saveAndValidateCallBack",t,this.unitEntity.job_unit_name,i,"SAVE"):this.$emit("saveReportsCallBack",t,i)},validateReportsCallBack:function(t,e,i){"SUBMIT"==e?this.$emit("submitReportsCallBack",t,this.unitEntity.job_unit_name,i,"VALIDATE"):"SAVEANDVALIDATE"==e?this.$emit("saveAndValidateCallBack",t,this.unitEntity.job_unit_name,i,"VALIDATE"):this.$emit("validateReportsCallBack",t,this.unitEntity.job_unit_name,i)}},mounted:function(){this.$refs.recordTemplate},activated:function(){}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"fill-root"},["1"==t.unitEntity.job_unit_type?i("OnedimRecord",{ref:"recordTemplate",attrs:{jobId:t.jobId,reportId:t.reportId,unitId:t.unitEntity.job_unit_id,unitType:t.unitEntity.job_unit_type,isView:t.isView,saveFlag:t.saveFlag},on:{saveReportsCallBack:t.saveReportsCallBack,validateReportsCallBack:t.validateReportsCallBack}}):t._e(),t._v(" "),"0"==t.unitEntity.job_unit_type?i("GriddimRecord",{ref:"recordTemplate",attrs:{jobId:t.jobId,reportId:t.reportId,unitId:t.unitEntity.job_unit_id,unitType:t.unitEntity.job_unit_type,isView:t.isView,saveFlag:t.saveFlag},on:{saveReportsCallBack:t.saveReportsCallBack,validateReportsCallBack:t.validateReportsCallBack}}):t._e()],1)},staticRenderFns:[]};var l=i("VU/8")(s,r,!1,function(t){i("Jel1"),i("PaOl")},"data-v-cb4b2080",null).exports,d={inject:["reload"],name:"ReportFill",describe:"报送填报主页面",components:{WorkMain:n.a,ReportContextRoot:l},data:function(){return{reportId:"",jobId:"",isView:"N",auth:"N",reportStats:"",activeStepNum:0,currUnitId:"",reportCust:{},unitEntities:[],unitEntityLink:{},doSomethinLoading:null,doneCount:0,doneExcetionMessage:null,validateResult:{},showSignInfos:!1,signInfomationsError:{reportCustName:"",reportAccountName:"",reportLeaderName:""},agreeReadMe:!0,notAgreeReadMe:!1,showReadMe:!0,signInfomations:{reportCustName:"",reportAccountName:"",reportLeaderName:""},currUser:{}}},methods:{checkUnitStep:function(){var t=this,e=this.$loading({lock:!0,text:"获取填报组信息中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.BaseRequest({url:"/record/process/checkUnitStep",params:{reportId:this.reportId}}).then(function(i){i&&(t.unitEntities=i,null!=t.unitEntities&&t.unitEntities.length>0&&(t.currUnitId=t.unitEntities[0].job_unit_id),e.close())})},stepClick:function(t,e){var i=this.unitEntities[e].job_unit_id;this.currUnitId=i,this.activeStepNum=e},doSaveContext:function(){var t=this;this.validateResult={},this.doneCount=0,this.doneExcetionMessage=null,this.doSomethinLoading=this.$loading({lock:!0,text:"保存中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.unitEntities.forEach(function(e){var i=e.job_unit_id;t.$refs["reportContextRef"+i][0].doSaveContext()})},doSaveAndValidate:function(t){var e=this;this.validateResult={},this.doneCount=0,this.doneExcetionMessage=null,this.doSomethinLoading=this.$loading({lock:!0,text:"保存中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.unitEntities.forEach(function(i){var n=i.job_unit_id;e.$refs["reportContextRef"+n][0].doSaveAndValidate(t)})},doValidateContext:function(){var t=this;this.doneCount=0,this.doneExcetionMessage=null,this.doSomethinLoading=this.$loading({lock:!0,text:"校验中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.unitEntities.forEach(function(e){var i=e.unit_id;t.$refs["reportContextRef"+i][0].doValidateUnitContext()})},doRefreshFomular:function(t){var e=this;this.doSomethinLoading=this.$loading({lock:!0,text:"刷新公式中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.BaseRequest({url:"/reportCust/refreshFomular",params:{jobId:this.jobId,reportId:this.reportId}}).then(function(i){i?(e.doSomethinLoading.close(),e.$notify({title:"公式刷新完毕",type:"success",message:"动态计算项已按照您的填写更新"}),t?e.reportCommitAuth():e.unitEntities.forEach(function(t){var i=t.unit_id;e.$refs["reportContextRef"+i][0].getFolumarData()})):(e.doSomethinLoading.close(),e.$notify({title:"公式刷新失败",type:"error",message:"刷新公式异常"}))}).catch(function(t){e.doSomethinLoading.close(),e.$notify({title:"公式刷新失败",type:"error",message:t})})},confirmSubmit:function(){this.showSignInfos=!0},confirmReadMe:function(){this.agreeReadMe?this.showReadMe=!1:this.Message("请勾选下方同意选项")},doSign:function(){var t=this,e=!1;null!=this.signInfomations.reportCustName&&""!=this.signInfomations.reportCustName&&void 0!=this.signInfomations.reportCustName||(this.signInfomationsError.reportCustName="填报人不允许为空",e=!0),null!=this.signInfomations.reportAccountName&&""!=this.signInfomations.reportAccountName&&void 0!=this.signInfomations.reportAccountName||(this.signInfomationsError.reportAccountName="财务人员不允许为空",e=!0),null!=this.signInfomations.reportLeaderName&&""!=this.signInfomations.reportLeaderName&&void 0!=this.signInfomations.reportLeaderName||(this.signInfomationsError.reportLeaderName="公司负责人不允许为空",e=!0),e||this.BaseRequest({url:"/reportCust/signReport",method:"post",data:{report_id:this.reportId,report_cust_name:this.signInfomations.reportCustName,report_account_name:this.signInfomations.reportAccountName,report_leader_name:this.signInfomations.reportLeaderName}}).then(function(e){console.log(e),e&&"SUCCESS"==e?(t.showSignInfos=!1,t.showReadMe=!0,t.doSubmitContext("VALIDATE")):t.Message.error("签名失败")})},doSubmitContext:function(t){this.doneCount=0,this.doneExcetionMessage=null;var e=this;function i(){e.doSomethinLoading=e.$loading({lock:!0,text:"提交中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),e.unitEntities.forEach(function(i){var n=i.unit_id;e.$refs["reportContextRef"+n][0].doSubmitContext(t)})}"SAVE"==t?i():this.$confirm("提交操作将使该报送报表进入审批流程，进入审批流程后将无法修改填报数据。请确认数据正确性！","提示",{confirmButtonText:"确定提交",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){i()}).catch(function(){})},saveReportsCallBack:function(t,e){this.doneCount=this.doneCount+1,e&&(this.doneExcetionMessage?this.doneExcetionMessage=this.doneExcetionMessage+"<br>"+e:this.doneExcetionMessage=e),this.doneCount==this.unitEntities.length&&(this.doSomethinLoading.close(),this.doSomethinLoading=null,this.doneCount=0,this.doneExcetionMessage?this.$notify({title:"保存失败",type:"error",dangerouslyUseHTMLString:!0,message:this.doneExcetionMessage}):this.$notify({title:"保存成功",type:"success",message:"您已成功保存报表信息"}))},saveAndValidateCallBack:function(t,e,i,n){if(this.doneCount=this.doneCount+1,i?("VALIDATE"==n&&(this.validateResult[t]="error"),i=e+":"+i,this.doneExcetionMessage?this.doneExcetionMessage=this.doneExcetionMessage+"<br>"+i:this.doneExcetionMessage=i):"VALIDATE"==n&&(this.validateResult[t]="success"),this.doneCount==this.unitEntities.length){this.doSomethinLoading.close(),this.doSomethinLoading=null,this.doneCount=0;var a="保存";if("VALIDATE"==n){a="校验";var o=this.unitEntities;this.unitEntities=null,this.unitEntities=o}if(this.doneExcetionMessage)this.$notify({title:a+"失败",dangerouslyUseHTMLString:!0,type:"error",message:this.doneExcetionMessage});else{var s="您已成功保存报表信息";"VALIDATE"==n&&(s="所有输入项均校验通过"),this.$notify({title:a+"成功",type:"success",message:s}),"SAVE"==n||"VALIDATE"==n&&this.doSaveAndValidate("SAVE")}}},validateReportsCallBack:function(t,e,i){if(this.doneCount=this.doneCount+1,i?(this.validateResult[t]="error",i=e+":"+i,this.doneExcetionMessage?this.doneExcetionMessage=this.doneExcetionMessage+"<br>"+i:this.doneExcetionMessage=i):this.validateResult[t]="success",this.doneCount==this.unitEntities.length){this.doSomethinLoading.close(),this.doSomethinLoading=null,this.doneCount=0;var n=this.unitEntities;this.unitEntities=null,this.unitEntities=n,this.doneExcetionMessage?this.$notify({title:"校验失败",type:"error",dangerouslyUseHTMLString:!0,message:this.doneExcetionMessage}):this.$notify({title:"校验成功",type:"success",message:"所有输入项均校验通过"})}},submitReportsCallBack:function(t,e,i,n){if(this.doneCount=this.doneCount+1,i?("VALIDATE"==n&&(this.validateResult[t]="error"),i=e+":"+i,this.doneExcetionMessage?this.doneExcetionMessage=this.doneExcetionMessage+"<br>"+i:this.doneExcetionMessage=i):"VALIDATE"==n&&(this.validateResult[t]="success"),this.doneCount==this.unitEntities.length){this.doSomethinLoading.close(),this.doSomethinLoading=null,this.doneCount=0;var a="保存";if("VALIDATE"==n){a="校验";var o=this.unitEntities;this.unitEntities=null,this.unitEntities=o}if(this.doneExcetionMessage)this.$notify({title:a+"失败",dangerouslyUseHTMLString:!0,type:"error",message:this.doneExcetionMessage});else{var s="您已成功保存报表信息";"VALIDATE"==n&&(s="所有输入项均校验通过"),this.$notify({title:a+"成功",type:"success",message:s}),"SAVE"==n||"VALIDATE"==n&&this.doSubmitContext("SAVE")}}},reportCommitAuth:function(){var t=this,e=this.reportId,i=this.$loading({lock:!0,text:"提交审批",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});this.BaseRequest({url:"/reportCust/doCommitAuth",method:"get",params:{reportId:e}}).then(function(e){i.close(),t.$notify({title:"提交成功",type:"success",message:"您的报表已提交审批，请等待上级审批"}),t.$router.push({path:"/record/report/reportMain"})})},handlePass:function(){var t=this;this.$confirm("确认【通过】审批该报表？","提示",{confirmButtonText:"确定提交",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){var e="ReportReviewOperator",i="reportApproval";if("1"==t.reportStats)e="ReportApprovalOperator",i="reportApproval";else{if("2"!=t.reportStats)return void t.Message.error("任务状态丢失");e="ReportReviewOperator",i="reportReview"}t.BaseRequest({url:"/reportApproval/"+e,method:"get",params:{reportId:t.reportId,reportStatus:"pass"}}).then(function(){t.Message.success("审批成功"),t.$router.push({path:"/record/"+i})})}).catch(function(){})},handleReject:function(){var t=this;this.$confirm("确认【驳回】审批该报表？","提示",{confirmButtonText:"确定提交",cancelButtonText:"取消",dangerouslyUseHTMLString:!0,type:"warning"}).then(function(){var e="ReportReviewOperator",i="reportApproval";if("1"==t.reportStats)e="ReportApprovalOperator",i="reportApproval";else{if("2"!=t.reportStats)return void t.Message.error("任务状态丢失");e="ReportReviewOperator",i="reportReview"}t.BaseRequest({url:"/reportApproval/"+e,method:"get",params:{reportId:t.reportId,reportStatus:"reject"}}).then(function(){t.Message.success("驳回成功"),t.$router.push({path:"/record/"+i})})}).catch(function(){})},checkUnitShow:function(t){return!0}},mounted:function(){this.reportId=this.$route.query.reportId,this.jobId=this.$route.query.jobId,null!=this.$route.query.isView&&""!=this.$route.query.isView&&(this.isView=this.$route.query.isView),null!=this.$route.params.auth&&""!=this.$route.params.auth&&(this.auth=this.$route.params.auth),null!=this.$route.query.reportStats&&""!=this.$route.query.reportStats&&(this.reportStats=this.$route.query.reportStats),this.checkUnitStep()},activated:function(){}},c={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("WorkMain",{attrs:{headerItems:["报送管理","报表管理","报表填写"]}},[i("div",{staticClass:"fill-root"},[t.unitEntities.length>1?i("div",{staticClass:"fill-steps"},[i("el-steps",{attrs:{"process-status":"finish",direction:"vertical",active:t.activeStepNum}},t._l(t.unitEntities,function(e,n){return t.checkUnitShow(e)?i("el-step",{key:n,class:{"bold-step":t.activeStepNum==n},staticStyle:{"font-weight":"bold","font-color":"black"},attrs:{status:null!=t.validateResult[e.job_unit_id]?t.validateResult[e.job_unit_id]:"finish",title:e.job_unit_name},nativeOn:{click:function(e){return i=e,t.stepClick(i,n);var i}}}):t._e()}))],1):t._e(),t._v(" "),i("div",{staticClass:"fill-context",class:{"fill-context-full":1==t.unitEntities.length}},[i("div",{staticClass:"fill-context-children"},t._l(t.unitEntities,function(e){return i("ReportContextRoot",{key:e.job_unit_id,ref:"reportContextRef"+e.job_unit_id,refInFor:!0,staticClass:"fill-context-child",class:{"fill-context-hide":t.currUnitId!=e.job_unit_id},attrs:{jobId:t.jobId,reportId:t.reportId,unitEntity:e,isView:t.isView},on:{saveReportsCallBack:t.saveReportsCallBack,validateReportsCallBack:t.validateReportsCallBack,submitReportsCallBack:t.submitReportsCallBack,saveAndValidateCallBack:t.saveAndValidateCallBack}},[t._v(t._s(e.job_unit_name)+"\n          >")])})),t._v(" "),i("div",{staticClass:"fill-context-options"},["Y"!=t.isView?i("el-button",{attrs:{type:"danger"},on:{click:t.doSaveContext}},[t._v("保存")]):t._e(),t._v(" "),"Y"!=t.isView?i("el-button",{attrs:{type:"success"},on:{click:function(e){t.doSaveAndValidate("VALIDATE")}}},[t._v("校验")]):t._e(),t._v(" "),"Y"!=t.isView?i("el-button",{attrs:{type:"warning"},on:{click:t.confirmSubmit}},[t._v("提交")]):t._e(),t._v(" "),"Y"==t.auth?i("el-button",{attrs:{type:"success"},on:{click:t.handlePass}},[t._v("通过")]):t._e(),t._v(" "),"Y"==t.auth?i("el-button",{attrs:{type:"danger"},on:{click:t.handleReject}},[t._v("驳回")]):t._e()],1)])]),t._v(" "),i("el-dialog",{attrs:{title:t.showReadMe?"真实性声明":"请签名",visible:t.showSignInfos},on:{"update:visible":function(e){t.showSignInfos=e}}},[t.showReadMe?i("div",{staticClass:"sign-readme"},[i("div",{staticClass:"readme-context"},[t._v("\n        本人确保表中所有的数据和信息真实准确，应对其负责。\n      ")]),t._v(" "),i("div",{staticClass:"readme-footer"},[i("el-row",{staticStyle:{"text-align":"left",margin:"5px 0 0 10px"}},[i("el-col",{attrs:{span:24}},[i("el-checkbox",{model:{value:t.agreeReadMe,callback:function(e){t.agreeReadMe=e},expression:"agreeReadMe"}},[i("span",{staticClass:"sign-readme-checkinfo"},[t._v("\n                我已阅读以上条款，并保证提交数据的真实性以及准确性。\n              ")])])],1)],1),t._v(" "),i("el-row",{staticStyle:{"text-align":"right"}},[i("el-button",{attrs:{type:"primary",disabled:!t.agreeReadMe},on:{click:t.confirmReadMe}},[t._v("确 认")])],1)],1)]):t._e(),t._v(" "),t.showReadMe?t._e():i("div",{staticClass:"sign-customers"},[i("el-form",{ref:"siginForm",attrs:{"label-position":"right","label-width":"30%"}},[i("el-form-item",{attrs:{label:"填报人签名",error:t.signInfomationsError.reportCustName,prop:"reportCustName"}},[i("el-col",{attrs:{span:18}},[i("el-input",{attrs:{placeholder:"请输入填报人姓名"},model:{value:t.signInfomations.reportCustName,callback:function(e){t.$set(t.signInfomations,"reportCustName",e)},expression:"signInfomations.reportCustName"}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"财务人员签名",error:t.signInfomationsError.reportAccountName,prop:"reportAccountName"}},[i("el-col",{attrs:{span:18}},[i("el-input",{attrs:{placeholder:"请输入财务人员姓名"},model:{value:t.signInfomations.reportAccountName,callback:function(e){t.$set(t.signInfomations,"reportAccountName",e)},expression:"signInfomations.reportAccountName"}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"公司领导签名",error:t.signInfomationsError.reportLeaderName,prop:"reportLeaderName"}},[i("el-col",{attrs:{span:18}},[i("el-input",{attrs:{placeholder:"请输入公司领导姓名"},model:{value:t.signInfomations.reportLeaderName,callback:function(e){t.$set(t.signInfomations,"reportLeaderName",e)},expression:"signInfomations.reportLeaderName"}})],1)],1)],1)],1),t._v(" "),t.showReadMe?t._e():i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:t.doSign}},[t._v("确定")])],1)])],1)},staticRenderFns:[]};var u=i("VU/8")(d,c,!1,function(t){i("sI2U"),i("BV7j")},"data-v-fd5dcdbe",null);e.default=u.exports},sI2U:function(t,e){},tuxb:function(t,e){}});
//# sourceMappingURL=3.4129e83595dfb9ca708b.js.map