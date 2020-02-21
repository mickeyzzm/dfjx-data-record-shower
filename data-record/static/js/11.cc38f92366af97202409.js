webpackJsonp([11],{dCpY:function(e,t){},pY3X:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"main"},[i("div",{staticClass:"query"},[i("el-input",{staticStyle:{width:"15%"},attrs:{clearable:"",size:"mini",placeholder:"请输入填报人名称"},model:{value:e.keyWorld,callback:function(t){e.keyWorld=t},expression:"keyWorld"}}),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.rcdusercgList}},[e._v("查询")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.insertUser}},[e._v("新增填报人")])],1),e._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,"header-cell-style":{background:"#f6f6f7"},size:"mini",border:"",stripe:""}},[i("el-table-column",{attrs:{prop:"user_id",width:"100",label:"填报人编号",resizable:!1}}),e._v(" "),i("el-table-column",{attrs:{prop:"origin_name",label:"填报人所属机构",resizable:!1}}),e._v(" "),i("el-table-column",{attrs:{prop:"user_name_cn",label:"填报人姓名",resizable:!1}}),e._v(" "),i("el-table-column",{attrs:{label:"操作",resizable:!1},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){e.editUser(t.row)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){e.deleteUser(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.pagination.currentPageIndex,"page-sizes":[10,15,20],"page-size":e.pagination.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.pagination.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),i("el-dialog",{attrs:{title:e.title+"填报人",visible:e.dialogVisible,"close-on-click-modal":!1,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},opened:e.opened,close:function(t){e.isResquest=!1}}},[i("el-container",[i("el-aside",{staticStyle:{width:"40%"}},[i("el-tree",{ref:"tree",attrs:{data:e.treeData,"node-key":"id","default-expanded-keys":e.active,"highlight-current":!0,props:e.defaultProps},on:{"node-click":e.handleNodeClick}})],1),e._v(" "),i("el-main",{staticStyle:{padding:"0 20px"}},[i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.rcdusercgTable,size:"mini","header-cell-style":{background:"#f6f6f7"},border:"",stripe:""},on:{"selection-change":e.handlecheck}},[i("el-table-column",{attrs:{type:"selection",resizable:!1}}),e._v(" "),i("el-table-column",{attrs:{prop:"user_id",width:"120",label:"用户Id",resizable:!1}}),e._v(" "),i("el-table-column",{attrs:{prop:"user_name_cn",label:"用户名称",resizable:!1}})],1),e._v(" "),i("div",{staticStyle:{"text-align":"right","margin-top":"40px"}},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),e._v(" "),i("el-button",{staticStyle:{"margin-right":"0"},attrs:{type:"primary"},on:{click:e.subRcdusercg}},[e._v("确认")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")({data:function(){return{pagination:{total:0,currentPageIndex:1,pageSize:10},keyWorld:"",tableData:[],dialogVisible:!1,treeData:[],rcdusercgTable:[],current:[],defaultProps:{children:"children",label:"label",isLeaf:"leaf"},currentNode:"",userid:[],active:[],currentRow:{},title:""}},methods:{rcdusercgList:function(){var e=this;this.BaseRequest({url:"/reporting/rcdpersonconfiglist",method:"get",params:{currPage:this.pagination.currentPageIndex,pageSize:this.pagination.pageSize,user_name:this.keyWorld}}).then(function(t){e.tableData=t.dataList,e.pagination.total=t.dataList.length})},opened:function(){this.active=[],this.active.push(this.currentRow.origin_id)},insertUser:function(){var e=this;this.rcdusercgTable=[],this.dialogVisible=!0,this.title="新增",this.$nextTick(function(){e.$refs.multipleTable.clearSelection()})},subRcdusercg:function(){var e=this;this.current.length>0?(this.userid=[],this.current.map(function(t){e.userid.push(t.user_id)}),this.BaseRequest({url:"/reporting/insertrcdpersonconfig",method:"get",params:{origin_id:this.currentNode,userid:this.userid.join(",")}}).then(function(t){"success"===t?(e.rcdusercgList(),e.dialogVisible=!1,e.$message.success("添加成功"),e.$nextTick(function(){e.$refs.multipleTable.clearSelection()})):e.$message.error("添加失败")})):this.$message("未选择填报人")},handleNodeClick:function(e){var t=this;this.getOriginDatas(e),this.current.length>0?this.$confirm("检测有已经选择未提交的数据，是否保存?","提示",{confirmButtonText:"保存",cancelButtonText:"取消",type:"warning"}).then(function(){t.subRcdusercg()}).catch(function(){t.useroriginassignlist(e)}):this.useroriginassignlist(e)},useroriginassignlist:function(e){var t=this;e.id>1&&this.BaseRequest({url:"/reporting/useroriginassignlist",method:"get",params:{origin_id:e.id}}).then(function(i){i.length>0&&(t.currentNode=e.id,t.rcdusercgTable=i)})},deleteUser:function(e){var t=this;this.$confirm("确认要删除该用户吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1,type:"warning"}).then(function(){t.BaseRequest({url:"/reporting/deletercdpersonconfig",method:"get",params:{user_id:e.user_id}}).then(function(e){"success"===e?(t.$message.success("删除成功"),t.rcdusercgList()):t.$message.error("删除失败")})}).catch(function(){return!1})},editUser:function(e){var t=this;this.getOriginDatas(),this.currentRow=e,this.dialogVisible=!0,this.title="修改",this.BaseRequest({url:"/reporting/useroriginassignlist",method:"get",params:{origin_id:e.origin_id}}).then(function(i){t.rcdusercgTable=i,t.selectedUser(e)})},selectedUser:function(e){var t=this;this.BaseRequest({url:"/reporting/selectrcdpersonconfig",method:"get",params:{origin_id:e.origin_id}}).then(function(e){e.map(function(e){t.rcdusercgTable.map(function(i,n){i.user_id===e.user_id&&t.$nextTick(function(){t.$refs.multipleTable.toggleRowSelection(t.rcdusercgTable[n])})})})})},handlecheck:function(e){this.current=e},getOriginDatas:function(e){var t=this;this.BaseRequest({url:"/reporting/getOriginDatasorgId",method:"get",params:{orgId:e?e.id:0}}).then(function(i){e?0==e.parentId?(t.treeData[0].children=[],i.map(function(e){t.treeData[0].children.push({id:e.id,label:e.label,parentId:e.parentId,children:[]})})):1==e.parentId?i.map(function(e){t.treeData[0].children.map(function(n){if(e.parentId==n.id)return n.children=i,n.children.map(function(e){t.$set(e,"children",[])}),!1})}):i.length>0&&i.map(function(e){t.treeData[0].children.map(function(t){t.children.length>0&&t.children.map(function(t){if(e.parentId==t.id)return t.children=i,!1})})}):(t.treeData=[],i.map(function(e){t.treeData.push({id:e.id,label:e.label,parentId:e.parentId,children:[]})}))})},handleSizeChange:function(e){this.pagination.pageSize=e},handleCurrentChange:function(e){this.pagination.currentPageIndex=e}},created:function(){this.rcdusercgList()},mounted:function(){this.getOriginDatas()}},n,!1,function(e){i("dCpY")},"data-v-793bff07",null);t.default=r.exports}});
//# sourceMappingURL=11.cc38f92366af97202409.js.map