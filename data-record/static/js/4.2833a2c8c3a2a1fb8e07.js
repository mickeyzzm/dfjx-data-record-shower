webpackJsonp([4],{"9dp3":function(t,e){},Gkc7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("fZjL"),i=a.n(n),s=a("gRE1"),o=a.n(s),r={name:"OnedimRecord",describe:"一维报表填报单元",components:{WorkMain:a("j1XB").a},props:{jobId:{type:String},reportId:{type:String},unitId:{type:Number},unitType:{type:Number},isView:{type:String}},data:function(){return{lastStep:!1,saveFlag:"N",definedColums:[],columDatas:{},dataObject:[],hasMounted:!1,unitFlds:[],unitDatas:{},validateUnitDatas:{}}},methods:{getUnitFldsConfig:function(){var t=this,e=null;"N"==this.saveFlag&&(e=this.$loading({lock:!0,text:"获取填报单元信息中.......",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"})),this.BaseRequest({url:"/record/process/getClientFldByUnitId",params:{groupId:this.unitId,clientType:"PC"}}).then(function(a){if(e&&e.close(),null!=a){var n=[];t.unitFldTypes=a,a.forEach(function(t){t.unitFlds.forEach(function(t){n.push(t)})}),t.unitFlds=n}}).catch(function(a){t.Message.success(a),e.close()})},getReportFldDatas:function(){var t=this;this.BaseRequest({url:"/record/process/getFldReportDatas",params:{jobId:this.jobId,reportId:this.reportId,groupId:this.unitId}}).then(function(e){console.log(e);new Object;if(e){var a={};e.forEach(function(t){t.colum_id;var e=t.fld_id;a["f"+e]=t}),t.unitDatas=a}}).catch(function(e){t.Message.success(e)})},doSaveUnitContext:function(t){var e=this;this.BaseRequest({url:"/record/process/saveSimpleDatas",method:"post",data:{report_id:this.reportId,job_id:this.jobId,reportJobInfos:o()(this.unitDatas)}}).then(function(a){console.log(a),a?e.$emit("saveReportsCallBack",e.unitId,t):e.$emit("saveReportsCallBack",e.unitId,t,"保存失败")}).catch(function(a){e.$emit("saveReportsCallBack",e.unitId,t,a)})},doValidateUnitContext:function(t){var e=this;this.validateUnitDatas={};var a=!1,n={};this.BaseRequest({url:"/record/process/validateSimpleDatas",method:"post",data:{reportJobInfos:o()(this.unitDatas)}}).then(function(s){if(console.log(s),s){var o=i()(s);null!=o&&o.length>0&&(a=!0),o.forEach(function(t){n["f"+t]=s[t]})}else e.$emit("validateReportsCallBack",e.unitId,t,"校验出现异常");e.validateUnitDatas=n;var r=null;a&&(r="有输入错误"),e.$emit("validateReportsCallBack",e.unitId,t,r)})},doSubmitContext:function(){this.doSaveUnitContext(!0)},setSaveFlag:function(t){this.saveFlag=t}},mounted:function(){this.getUnitFldsConfig(),this.getReportFldDatas()},activated:function(){}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"background-color":"white",height:"calc(100% - 50px)",margin:"20px 0 0 0",padding:"30px 0 0 0","border-radius":"10px"}},[a("el-form",{ref:"form",attrs:{"label-width":"40%"}},t._l(t.unitFlds,function(e){return a("el-form-item",{key:e.fld_id,attrs:{size:"mini",label:e.fld_name,error:t.validateUnitDatas["f"+e.fld_id]}},[a("el-col",{attrs:{span:23}},[a("el-input",{staticStyle:{width:"50%",float:"left"},attrs:{disabled:"Y"==t.isView},model:{value:t.unitDatas["f"+e.fld_id].record_data,callback:function(a){t.$set(t.unitDatas["f"+e.fld_id],"record_data",a)},expression:"unitDatas['f'+unitFld.fld_id]['record_data']"}})],1)],1)}))],1)},staticRenderFns:[]};var d=a("VU/8")(r,l,!1,function(t){a("9dp3"),a("tuxb")},"data-v-eec00b9a",null);e.default=d.exports},TmV0:function(t,e,a){a("fZOM"),t.exports=a("FeBl").Object.values},fZOM:function(t,e,a){var n=a("kM2E"),i=a("mbce")(!1);n(n.S,"Object",{values:function(t){return i(t)}})},gRE1:function(t,e,a){t.exports={default:a("TmV0"),__esModule:!0}},mbce:function(t,e,a){var n=a("lktj"),i=a("TcQ7"),s=a("NpIQ").f;t.exports=function(t){return function(e){for(var a,o=i(e),r=n(o),l=r.length,d=0,c=[];l>d;)s.call(o,a=r[d++])&&c.push(t?[a,o[a]]:o[a]);return c}}},tuxb:function(t,e){}});
//# sourceMappingURL=4.2833a2c8c3a2a1fb8e07.js.map