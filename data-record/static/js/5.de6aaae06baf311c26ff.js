webpackJsonp([5],{HBB1:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),n=i.n(a),o=i("Dd8w"),s=i.n(o),r={data:function(){return{pagination:{total:0,currentPageIndex:1,pageSize:10},jobNm:"",options:[{name:"已下发",value:4},{name:"编辑中",value:0},{name:"审批中",value:5}],jobStatus:"",tableData:[],unitconfigDialog:!1,rcdusercgDialog:!1,jobconfigDialog:!1,transferTable:[],value:[],ary1:[],ary2:[],isResquest:!1,agency:[],agencyValue:[],rcdusercgTable:[],FormData:{job_name:"",job_start_dt:"",job_end_dt:""},isShow:!0,isSave:!1,isRead:!1,title:"新增",currPage:{},defaultProps:{children:"children",label:"name",value:"id"},currentAgency:"",currentData:[],userid:[],selectedUnit:[],selectedUser:[],showJob_id:""}},methods:{rcdjobconfigList:function(){var t=this;this.BaseRequest({url:"/fillinatask/rcdjobconfiglist",method:"get",params:{currPage:this.pagination.currentPageIndex,pageSize:this.pagination.pageSize,job_name:this.jobNm,job_status:this.jobStatus}}).then(function(e){t.tableData=e.dataList,t.pagination.total=e.dataList.length})},clearOption:function(){this.jobNm="",this.jobStatus="",this.rcdjobconfigList()},addJobconfig:function(){this.title="新增",this.jobconfigDialog=!0},subJobconfig:function(){var t=this;this.BaseRequest({url:"/fillinatask/insertrcdjobconfig",method:"get",params:this.FormData}).then(function(e){"success"===e?(t.rcdjobconfigList(),t.$message.success("新增成功"),t.jobconfigDialog=!1):(t.$message.error("新增失败"),t.jobconfigDialog=!1)})},editJobconfig:function(t){this.title="修改",this.jobconfigDialog=!0,this.FormData=t,this.isSave=!0,this.current=t},saveJobconfig:function(){var t=this;this.BaseRequest({url:"/fillinatask/updatercdjobconfig",method:"get",params:s()({job_id:this.current.job_id},this.FormData)}).then(function(e){"success"===e?(t.rcdjobconfigList(),t.$message.success("修改成功"),t.jobconfigDialog=!1):(t.$message.error("修改失败"),t.jobconfigDialog=!1)})},detailJobconfig:function(t){var e=this;this.title="查看",this.jobconfigDialog=!0,this.FormData=t,this.isShow=!1,this.isRead=!0,this.BaseRequest({url:"/fillinatask/selectRcdJobUnitConfigyi",method:"get",params:{job_id:t.job_id}}).then(function(t){e.selectedUnit=[],t.length>0&&t.map(function(t){e.selectedUnit.push({job_unit_id:t.job_unit_id,job_unit_name:t.job_unit_name,unitfld:[]}),e.BaseRequest({url:"/reporting/selectrcdjobunitfld",method:"get",params:{job_unit_id:t.job_unit_id}}).then(function(i){i.length>0&&e.selectedUnit.map(function(e){e.job_unit_id==t.job_unit_id&&(e.unitfld=i)})})})}),this.BaseRequest({url:"/fillinatask/huixianrcdjobpersonassign",method:"get",params:{job_id:t.job_id}}).then(function(t){e.selectedUser=t})},leaveHandle:function(){this.showJob_id=""},jobconfigClose:function(){this.FormData={},this.isShow=!0,this.isRead=!1,this.isSave=!1},unitconfig:function(t){this.unitconfigDialog=!0,this.current=t,this.selectRcdJobUnitConfig(t)},selectRcdJobUnitConfig:function(t){var e=this;this.BaseRequest({url:"/fillinatask/selectRcdJobUnitConfig",method:"get",params:{job_id:t.job_id}}).then(function(i){e.ary1=i,e.selectRcdJobUnitConfigyi(t)})},selectRcdJobUnitConfigyi:function(t){var e=this;this.BaseRequest({url:"/fillinatask/selectRcdJobUnitConfigyi",method:"get",params:{job_id:t.job_id}}).then(function(t){e.isResquest=!1,t.map(function(t){e.value.push(t.job_unit_id)}),e.ary2=t,e.transferTable=e.ary1.concat(e.ary2)})},subUnitconfig:function(){var t=this;this.BaseRequest({url:"/fillinatask/updateRcdJobUnitConfigyi",method:"get",params:{job_id:n()(this.current.job_id),jobunitid:this.value.join(",")}}).then(function(e){"success"===e?(t.unitconfigDialog=!1,t.$message.success("添加成功")):(t.$message.error("添加失败"),t.unitconfigDialog=!1)})},rcdusercg:function(t){var e=this;this.rcdusercgDialog=!0,this.current=t,this.BaseRequest({url:"/fillinatask/huixianrcdjobpersonassign",method:"get",params:{job_id:t.job_id}}).then(function(t){e.agencyValue=[],t.length>0?e.BaseRequest({url:"/reporting/useroriginassignlist",method:"get",params:{origin_id:t[0].origin_id}}).then(function(i){e.rcdusercgTable=i,t.map(function(t){e.rcdusercgTable.map(function(i,a){i.user_id===t.user_id&&e.$nextTick(function(){e.$refs.multipleTable.toggleRowSelection(e.rcdusercgTable[a])})})})}):(e.rcdusercgTable=[],e.agencyValue=[])})},subRcdusercg:function(){var t=this;this.currentData.length>0?(this.userid=[],this.currentData.map(function(e){t.userid.push(e.user_id)}),this.BaseRequest({url:"/fillinatask/insertrcdjobpersonassign",method:"get",params:{userid:this.userid.join(","),job_id:n()(this.current.job_id)}}).then(function(e){"success"===e?(t.rcdjobconfigList(),t.$message.success("新增成功"),t.rcdusercgDialog=!1):(t.$message.error("新增失败"),t.rcdusercgDialog=!1)})):this.$message("未选择填报人")},agencyUser:function(){var t=this;this.BaseRequest({url:"/reporting/useroriginassignlistsysorigin",method:"get",params:{origin_id:this.currentAgency}}).then(function(e){t.rcdusercgTable=e})},handleChange:function(t){this.currentAgency=t[t.length-1]},handlecheck:function(t){this.currentData=t},makeJob:function(t){var e=this;this.$confirm("确认要下发该任务吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1,type:"warning"}).then(function(){e.BaseRequest({url:"record/process/makeJob",method:"get",params:{jobId:t.job_id}}).then(function(t){"SUCCESS"==t?(e.$message.success("任务发布成功"),e.rcdjobconfigList()):e.$message.error("任务发布失败")})}).catch(function(){return!1})},deleteJob:function(t){var e=this;this.$confirm("确认要删除该任务","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){0==t.job_status?e.BaseRequest({url:"/fillinatask/deletercdjobconfig",method:"get",params:{job_id:t.job_id}}).then(function(t){"success"==t?(e.$message.success("删除成功"),e.rcdjobconfigList()):e.$message.error("删除失败")}):e.$message.warning("当前任务不能删除")}).catch(function(){return!1})},handleSizeChange:function(t){this.pagination.pageSize=t},handleCurrentChange:function(t){this.pagination.currentPageIndex=t}},created:function(){this.rcdjobconfigList()}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main"},[i("div",{staticClass:"query"},[i("el-input",{attrs:{clearable:"",size:"mini",placeholder:"请输入任务名称"},model:{value:t.jobNm,callback:function(e){t.jobNm=e},expression:"jobNm"}}),t._v(" "),i("el-select",{attrs:{size:"mini",placeholder:"请选择任务状态"},model:{value:t.jobStatus,callback:function(e){t.jobStatus=e},expression:"jobStatus"}},t._l(t.options,function(t){return i("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})})),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.rcdjobconfigList}},[t._v("查询")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.clearOption}},[t._v("清空选项")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addJobconfig}},[t._v("新增任务")])],1),t._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"header-cell-style":{background:"#f6f6f7"},size:"mini",border:"",stripe:""}},[i("el-table-column",{attrs:{type:"index",width:"100",label:"填报任务编号",resizable:!1}}),t._v(" "),i("el-table-column",{attrs:{prop:"job_name",label:"填报任务名称",resizable:!1}}),t._v(" "),i("el-table-column",{attrs:{label:"填报状态",resizable:!1},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.job_status?i("span",[t._v("正常")]):1===e.row.job_status?i("span",[t._v("失效")]):2===e.row.job_status?i("span",[t._v("锁定")]):3===e.row.job_status?i("span",[t._v("软删除")]):4===e.row.job_status?i("span",[t._v("已发布")]):5===e.row.job_status?i("span",[t._v("发布中")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"job_start_dt","column-key":"date",label:"填报开始时间",resizable:!1}}),t._v(" "),i("el-table-column",{attrs:{prop:"job_end_dt","column-key":"date",label:"填报结束时间",resizable:!1}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"500",resizable:!1},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.editJobconfig(e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),0===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.unitconfig(e.row)}}},[t._v("填报组维护")]):t._e(),t._v(" "),0===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.rcdusercg(e.row)}}},[t._v("填报人维护")]):t._e(),t._v(" "),0===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.makeJob(e.row)}}},[t._v("任务下发")]):t._e(),t._v(" "),0===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.deleteJob(e.row)}}},[t._v("删除")]):t._e(),t._v(" "),4===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.detailJobconfig(e.row)}}},[t._v("查看")]):5===e.row.job_status?i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){t.detailJobconfig(e.row)}}},[t._v("查看")]):t._e()]}}])})],1),t._v(" "),i("el-pagination",{attrs:{"current-page":t.pagination.currentPageIndex,"page-sizes":[10,15,20],"page-size":t.pagination.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.pagination.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),t._v(" "),i("el-dialog",{attrs:{title:"选择任务组",visible:t.unitconfigDialog,"close-on-click-modal":!1,width:"75%"},on:{"update:visible":function(e){t.unitconfigDialog=e}}},[i("div",{staticStyle:{width:"100%"}},[i("el-transfer",{attrs:{titles:["待选择任务组","已选择任务组"],props:{key:"job_unit_id",label:"job_unit_name"},"button-texts":["移除","添加"],data:t.transferTable},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),i("div",{staticStyle:{"margin-top":"10px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.unitconfigDialog=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.subUnitconfig}},[t._v("确定")])],1)],1)]),t._v(" "),i("el-dialog",{attrs:{title:"选择填报人",visible:t.rcdusercgDialog,"custom-class":"selrcdusercg","close-on-click-modal":!1,width:"55%"},on:{"update:visible":function(e){t.rcdusercgDialog=e}}},[i("div",{staticStyle:{width:"80%"}},[i("div",{staticStyle:{"text-align":"left","margin-bottom":"30px"}},[i("span",[t._v("请选择机构：")]),t._v(" "),i("el-cascader",{ref:"mycascader",staticStyle:{width:"35%"},attrs:{"show-all-levels":!1,props:t.defaultProps,placeholder:"请选择机构",filterable:!0,options:t.agency},on:{change:t.handleChange},model:{value:t.agencyValue,callback:function(e){t.agencyValue=e},expression:"agencyValue"}}),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.agencyUser}},[t._v("获取机构下用户")])],1),t._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.rcdusercgTable,"header-cell-style":{background:"#f6f6f7"},size:"mini",border:"",stripe:""},on:{"selection-change":t.handlecheck}},[i("el-table-column",{attrs:{type:"selection"}}),t._v(" "),i("el-table-column",{attrs:{prop:"user_id",width:"130",label:"填报人id",resizable:!1}}),t._v(" "),i("el-table-column",{attrs:{prop:"user_name_cn",label:"填报人名称",resizable:!1}})],1),t._v(" "),i("div",{staticStyle:{"margin-top":"30px","text-align":"right"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.rcdusercgDialog=!1}}},[t._v("取消")]),t._v(" "),i("el-button",{staticStyle:{"margin-right":"0"},attrs:{type:"primary"},on:{click:t.subRcdusercg}},[t._v("确认")])],1)],1)]),t._v(" "),i("el-dialog",{attrs:{visible:t.jobconfigDialog,title:t.title+"任务","close-on-click-modal":!1,width:"35%"},on:{"update:visible":function(e){t.jobconfigDialog=e},close:t.jobconfigClose}},[i("el-form",{attrs:{model:t.FormData}},[i("el-form-item",{staticClass:"public",attrs:{label:"填报任务名称："}},[i("el-input",{staticStyle:{width:"100%"},attrs:{readonly:t.isRead,placeholder:"请输入填报任务名称"},model:{value:t.FormData.job_name,callback:function(e){t.$set(t.FormData,"job_name",e)},expression:"FormData.job_name"}})],1),t._v(" "),t.isShow?t._e():i("el-form-item",{staticClass:"public",attrs:{label:"已选择任务组："}},t._l(t.selectedUnit,function(e){return i("el-dropdown",{key:e.job_unit_id,attrs:{trigger:"click"}},[i("span",{staticClass:"el-dropdown-link"},[t._v("\n              "+t._s(e.job_unit_name)),e.unitfld.length>0?i("i",{staticClass:"el-icon-caret-bottom el-icon--right"}):t._e()]),t._v(" "),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},t._l(e.unitfld,function(e){return i("el-dropdown-item",{key:Math.abs(e.fld_id),staticClass:"clearfix"},[t._v("\n                "+t._s(e.fld_name)+"\n                "),i("el-badge",{staticClass:"mark"})],1)}))],1)})),t._v(" "),t.isShow?t._e():i("el-form-item",{staticClass:"public",attrs:{label:"已选择填报人："}},t._l(t.selectedUser,function(e){return i("el-tag",{key:e.user_id,staticStyle:{"margin-right":"8px","box-sizing":"border-box"}},[t._v(t._s(e.user_name_cn))])})),t._v(" "),i("el-form-item",{staticClass:"public text1",attrs:{label:"任务开始日期："}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{size:"mini",type:"date","value-format":"yyyy-MM-dd",readonly:t.isRead,placeholder:"请指定任务开始日期"},model:{value:t.FormData.job_start_dt,callback:function(e){t.$set(t.FormData,"job_start_dt",e)},expression:"FormData.job_start_dt"}})],1),t._v(" "),i("el-form-item",{staticClass:"public text2",staticStyle:{"margin-bottom":"30px"},attrs:{label:"任务结束日期："}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{size:"mini",type:"date","value-format":"yyyy-MM-dd",readonly:t.isRead,placeholder:"请指定任务结束日期"},model:{value:t.FormData.job_end_dt,callback:function(e){t.$set(t.FormData,"job_end_dt",e)},expression:"FormData.job_end_dt"}})],1),t._v(" "),t.isShow?i("el-form-item",{staticClass:"addJob",staticStyle:{"margin-bottom":"0"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.jobconfigDialog=!1}}},[t._v("取消")]),t._v(" "),t.isSave?i("el-button",{attrs:{type:"primary"},on:{click:t.saveJobconfig}},[t._v("确定")]):i("el-button",{attrs:{type:"primary"},on:{click:t.subJobconfig}},[t._v("确定")])],1):t._e()],1)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(r,l,!1,function(t){i("q811")},"data-v-9c999b82",null);e.default=c.exports},mvHQ:function(t,e,i){t.exports={default:i("qkKv"),__esModule:!0}},q811:function(t,e){},qkKv:function(t,e,i){var a=i("FeBl"),n=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}}});
//# sourceMappingURL=5.de6aaae06baf311c26ff.js.map