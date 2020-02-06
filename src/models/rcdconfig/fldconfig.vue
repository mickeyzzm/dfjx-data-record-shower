<template>
  <el-container>
    <el-aside style="width: 20%">
        <el-tree
          :data="flgTreeData"
          node-key="id"
          :highlight-current="true"
          @node-click="handleNodeClick"
          :default-expanded-keys="activeRcdt"
          ref="tree"
        ></el-tree>
    </el-aside>
    <el-main>
        <div v-show="boxContent_l">
            <LCountent @getMenuData_Add_L="leftrcddtMenuSt" @getMenuData_edit_L="leftrcddtMenuSt"></LCountent>
        </div>
        <div v-show="itemContent_ll">
            <LLCountent :tableData_ll = "tableData_ll"  :proj_id = "proj_id" @getMenuData_Add_LL="leftrcddtMenuNd" @getMenuData_edit_LL="leftrcddtMenuNd" @getTableData_LL="getTableData_LL" :pageIndex_LL = "pageIndex_LL" :pageSize_LL = "pageSize_LL" :totalPage_LL = "totalPage_LL" :page_res_LL = "page_res_LL" @currentChangeHandle_LL="currentChangeHandle_LL"></LLCountent>
        </div>
        <div v-show="itemContent_lll">
            <LLLCountent :tableData_lll = "tableData_lll" :catg_id = "catg_id" @getMenuData_Add_LLL="leftrcddtMenuRd" @getMenuData_edit_LLL="leftrcddtMenuRd" @getTableData_LLL="getTableData_LLL" :pageIndex_LLL = "pageIndex_LLL" :pageSize_LLL = "pageSize_LLL" :totalPage_LLL = "totalPage_LLL" :page_res_LLL = "page_res_LLL" @currentChangeHandle_LLL="currentChangeHandle_LLL"></LLLCountent>
        </div>
    </el-main>
  </el-container>
</template>

<script>
  import LCountent from './fld_compontents/LCountent';//一级菜单
  import LLCountent from './fld_compontents/LLCountent';//二级菜单
  import LLLCountent from './fld_compontents/LLLCountent';//三级菜单
    export default {
      data () {
          return {
              pageIndex_LL: 1,
              pageSize_LL: 10,
              totalPage_LL: 0,
              page_res_LL:{},

              pageIndex_LLL: 1,
              pageSize_LLL: 10,
              totalPage_LLL: 0,
              page_res_LLL:{},
              boxContent_l:false,
              itemContent_ll:false,
              itemContent_lll:false,
              isEmpoty:[
                  {
                      name:"否",
                      id:"0",
                  },{
                      name:"是",
                      id:"1",
                  }
              ],
              treeId: 1,
              // treeData: [
              //     {
              //         label: '指标体系',
              //         fld_id:0,
              //         children: []
              //     }
              // ],
              flgTreeData: [
                // {
                //   label: '指标体系',
                //   id:0,
                //   children: []
                // }
              ],
              activeRcdt: [],
              tableData0: [],
              tableData_ll: [],
              tableData_lll:[],
              tableData5: [
                  {
                      inCode: '1',
                      inNm: '年龄',
                      subClass: '基本信息',
                      subfidClass: '人',
                  },
              ],
              tableData6: [
                  {
                      inCode: '1',
                      inNm: '教育程度',
                      subClass: '教育信息',
                      subfidClass: '人',
                  },
              ],
              tableData7: [
                  {
                      inCode: '1',
                      inNm: '房子',
                      subClass: '资产信息',
                      subfidClass: '人',
                  },
              ],
              proj_id:"",
              catg_id:"",
              loading:false,
          }
      },
      components: {
          LCountent,
          LLCountent,
          LLLCountent,
      },
      methods: {
          // 关联指标一级菜单
          leftrcddtMenuSt () {
              // this.flgTreeData[0].children = [];
              this.BaseRequest({
                  url: '/rcdDt/leftrcddtproj',
                  method: 'get'
              }).then(data => {
                // console.log(data,"人11")
                  if (data.length > 0) {
                  data.map(item => {
                      this.flgTreeData.push({
                        label: item.proj_name,
                        proj_id: item.proj_id,
                        disabled: true,
                        children: []
                      })
                      this.leftrcddtMenuNd(item.proj_id)
                  })
                  }
              })
          },
          // 关联指标二级菜单
          leftrcddtMenuNd (projId) {
              // this.flgTreeData[0].children = [];
              this.BaseRequest({
                  url: '/rcdDt/leftrcddtcatg',
                  method: 'get',
                  params: {proj_id: projId}
              }).then(data => {
                // console.log(data,"22")
                  if (data.length > 0) {
                  this.flgTreeData.map(item => {
                      if (item.proj_id === projId) {
                      item.children = []
                      data.map(element => {
                          this.leftrcddtMenuRd(element.catg_id)
                          item.children.push({
                          label: element.catg_name,
                          catg_id: element.catg_id,
                          children: []
                          })
                      })
                      }
                  })
                  }
              })
          },
          // 关联指标三级菜单
          leftrcddtMenuRd (catgId) {
              // this.flgTreeData[0].children = [];
              this.BaseRequest({
                  url: '/rcdDt/leftrcddtfld',
                  method: 'get',
                  params: {catg_id: catgId}
              }).then(data => {
                // console.log(data,"333")
                  if (data.length > 0) {
                  this.flgTreeData.map(item => {
                      if (item.children.length > 0) {
                      item.children.map(element => {
                          if (element.catg_id === catgId) {
                          element.children = []
                          data.map(rcdt => {
                              element.children.push({
                              label: rcdt.fld_name,
                              fld_id: rcdt.fld_id
                              })
                          })
                          }
                      })
                      }
                  })
                  }
              })
          },
          getTableData_LL(pageNum_LL){//二级table数据
              if (pageNum_LL && pageNum_LL !== '') {
                  this.pageIndex_LL = pageNum_LL;
              } else {
                  pageNum_LL = this.pageIndex_LL;
              }
              this.BaseRequest({
                  url: '/rcdDt/selecttixircddtprojer',
                  method: 'get',
                  params: {
                      'proj_id': this.proj_id,
                      'currPage': pageNum_LL,
                      'pageSize': 10,
                  }
              }).then((response) => {
                  this.loading = true;
                  if (response) {
                      if(this.page_res_LL[this.pageIndex_LL]){
                          this.tableData_ll = this.page_res_LL[this.pageIndex_LL];
                      }else {
                          this.tableData_ll = response.dataList;
                      }
                      this.totalPage_LL = response.totalNum;
                      this.pageIndex_LL = response.currPage;
                  } else {
                      this.tableData_ll = [];
                      this.totalPage_LL = 0;
                  }
                  this.loading = false;
              })
          },
          getTableData_LLL(pageNum_LLL){//三级table数据
              // console.log(this.catg_id,"catg_idget")
              if (pageNum_LLL && pageNum_LLL !== '') {
                  this.pageIndex_LLL = pageNum_LLL;
              } else {
                  pageNum_LLL = this.pageIndex_LLL;
              }
              this.BaseRequest({
                  url: '/rcdDt/selecttixircddtproj',
                  method: 'get',
                  params: {
                      'catg_id': this.catg_id,
                      'currPage': pageNum_LLL,
                      'pageSize': 10,
                  }
              }).then((response) => {
                  this.loading = true;
                  if (response) {
                      if(this.page_res_LLL[this.pageIndex_LLL]){
                          this.tableData_lll = this.page_res_LL[this.pageIndex_LLL];
                      }else {
                          this.tableData_lll = response.dataList;
                      }
                      this.totalPage_LLL = response.totalNum;
                      this.pageIndex_LLL = response.currPage;
                  } else {
                      this.tableData_lll = [];
                      this.totalPage_LLL = 0;
                  }
                  this.loading = false;
              })
          },
          handleNodeClick (node) {// 点击节点
              console.log(node,"node")
              this.proj_id = node.proj_id;
              this.catg_id = node.catg_id;
              if(node.id == 0){
                  this.boxContent_l = true;
                  this.itemContent_ll = false;
                  this.itemContent_lll = false;
              }else if(node.proj_id != 0 && node.proj_id){
                  this.itemContent_ll = true;
                  this.boxContent_l = false;
                  this.itemContent_lll = false;
                  this.getTableData_LL();
              }else if(node.catg_id){
                  this.itemContent_lll = true;
                  this.boxContent_l = false;
                  this.itemContent_ll = false;
                  this.getTableData_LLL();
              }
          },
          currentChangeHandle_LL(val){
              if(!this.page_res_LL[this.pageIndex_LL]){
                this.page_res_LL[this.pageIndex_LL] = this.tableData_ll;
              }
              this.pageIndex_LL = val;
              // 获取table数据
              this.getTableData_LL(val);
          },
          currentChangeHandle_LLL(val){
              if(!this.page_res_LLL[this.pageIndex_LLL]){
                this.page_res_LLL[this.pageIndex_LLL] = this.tableData_lll;
              }
              this.pageIndex_LLL = val;
              // 获取table数据
              this.getTableData_LLL(val);
          },
      },
      created () {
          this.$nextTick(function () {
              this.$refs.tree.setCurrentKey(0);
              this.leftrcddtMenuSt ();
          })
          this.boxContent_l = true;
      }
    }
</script>

<style lang="css">
  .mini-font-size{
    font-size: 12px !important;
  }
  .el-form-item__content{
    text-align: left;
  }
  .el-container {
    height: 100%;
    }
    .el-aside {
    border: 1px solid #eee;
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/table-page.scss";
  .searchGrid{
        min-height: calc(100vh - 202px - 64px);
  }
</style>
