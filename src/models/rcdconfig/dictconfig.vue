<template>
  <el-container>
    <el-aside style="width: 20%">
      <el-tree
        :data="treeData"
        node-key="id"
        @node-click="handleNodeClick"
        :default-expanded-keys="[treeId]"
        :highlight-current="true"
        ref="tree"
      ></el-tree>
    </el-aside>
    <el-main>
      <!-- 第一级菜单 -->
        <div v-show="boxContent">
            <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfigBox" size="mini" type="primary">新增字典</el-button>
            </div>
            <el-table
                :data="tableData0"
                style="width: 80%"
                :header-cell-style="{background:'#f6f6f7',}"
                :loading="loading"
                class = "searchGrid"
                size="mini"
                border
                stripe>
                <el-table-column
                    prop="dict_id"
                    width="100"
                    label="字典编号"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    prop="dict_name"
                    label="字典名称"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    label="操作"
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="openEditModalBox(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" @click="deleteDicCon(scope.row)">删除</el-button>
                        <!-- <el-button size="mini" type="text" @click="editeDicCon(scope.row)">编辑字典内容</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="currentChangeHandle_L"
                :current-page="pageIndex_L"
                :page-size="pageSize_L"
                :total="totalPage_L"
                layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <!-- 第二级菜单 -->
        <div v-show="itemContent">
            <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfig" size="mini" type="primary">新增字典内容</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 80%"
                :header-cell-style="{background:'#f6f6f7',}"
                :loading="loading"
                class = "searchGrid"
                size="mini"
                border
                stripe>
                <el-table-column
                    prop="dict_content_id"
                    width="100"
                    label="字典内容编号"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    prop="dict_content_name"
                    label="字典内容名称"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    prop="dict_content_value"
                    label="字典内容值"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    prop="dict_name"
                    label="所属字典"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    label="操作"
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="openEditModal(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" @click="deldteEditModal(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="currentChangeHandle_LL"
                :current-page="pageIndex_LL"
                :page-size="pageSize_LL"
                :total="totalPage_LL"
                layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </el-main>
    <!-- 一级菜单新增-->
    <el-dialog title="新增字典" :visible.sync="addShowModalPageBox" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformDataBox">
            <el-form-item size="mini" label="字典名称：" >
              <el-input style="width:50%" v-model="addformDataBox.dicNm" placeholder="请输入字典名称" auto-complete="off" ></el-input>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addSubmitDataFormBox()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 一级菜单编辑-->
    <el-dialog title="修改字典" :visible.sync="editShowModalPageBox" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="editformDataBox">
            <el-form-item size="mini" label="字典名称：" >
              <el-input style="width:50%" v-model="editformDataBox.dicNm" placeholder="请输入字典名称" auto-complete="off" ></el-input>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="editSubmitDataFormBox()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 二级菜单新增-->
    <el-dialog title="新增字典内容" :visible.sync="addShowModalPage" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformData">
            <el-form-item label="所属字典：">
                <el-input style="width:50%" v-model="addformData.subDic" disabled placeholder="请输入所属字典"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="字典内容名称：" >
              <el-input style="width:50%" v-model="addformData.dicConNm" placeholder="请输入字典内容名称" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="字典内容值：">
              <el-input style="width:50%" v-model="addformData.dicConValue" placeholder="请输入字典内容值"></el-input>
            </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 二级菜单编辑-->
    <el-dialog title="修改字典内容" :visible.sync="editShowModalPage" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="editformData">
            <el-form-item label="所属字典：">
                <el-input style="width:50%" v-model="editformData.subDic" disabled placeholder="请输入所属字典"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="字典内容名称：" >
              <el-input style="width:50%" v-model="editformData.dicConNm" placeholder="请输入字典内容名称" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="字典内容值：">
              <el-input style="width:50%" v-model="editformData.dicConValue" placeholder="请输入字典内容值"></el-input>
            </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="editSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            pageIndex_L: 1,
            pageSize_L: 10,
            totalPage_L: 0,
            page_res_L:{},
            pageIndex_LL: 1,
            pageSize_LL: 10,
            totalPage_LL: 0,
            page_res_LL:{},
            boxContent:false,
            itemContent:false,
            addShowModalPage:false,
            editShowModalPage:false,
            addShowModalPageBox:false,
            editShowModalPageBox:false,
            treeData: [
                {
                    label: '数据字典',
                    id:0,
                    children: []
                }
            ],
            addformDataBox: {
                dicNm: "",
            },
            editformDataBox: {
                dicNm: "",
            },
            addformData: {
                dicConNm: "",
                dicConValue: "",
                subDic: "",
            },
            editformData: {
                dicConNm: "",
                dicConValue: "",
                subDic: "",
            },
            tableData0: [],
            tableData: [],
            treeId: 0,
            dict_id:"",
            dict_content_id:"",
            editformDataBoxDict_id:"",
            nodeLL:[],
        }
    },
    methods: {
        getMenuData(){//左侧菜单数据
            this.treeData[0].children = [];
            this.BaseRequest({
                url: '/dictionary/selectleftDataDictionary',
                method: 'get',
                params: {}
            }).then((res) => {
                res.map(item => {
                    this.treeData[0].children.push({
                        label: item.dict_name,
                        id: item.dict_id
                    })
                })
            })
        },
        getTableData_L(pageNum_L){//一级table数据
            this.tableData0 = [];
            this.boxContent = true;
            this.itemContent = false;
            if (pageNum_L && pageNum_L !== '') {
                this.pageIndex_L = pageNum_L;
            } else {
                pageNum_L = this.pageIndex_L;
            }
            this.BaseRequest({
                url: '/dictionary/dataDictionarylist',
                method: 'get',
                params: {
                    'currPage': pageNum_L,
                    'pageSize': 10,
                }
            }).then((response) => {
                this.loading = true;
                if (response) {
                  if(this.page_res_L[this.pageIndex_L]){
                      this.tableData0 = this.page_res_L[this.pageIndex_L];
                  }else {
                      this.tableData0 = response.dataList;
                  }
                  this.totalPage_L = response.totalNum;
                  this.pageIndex_L = response.currPage;
              } else {
                  this.tableData0 = [];
                  this.totalPage_L = 0;
              }
              this.loading = false;
            })
        },
        getTableData_LL(pageNum_LL){//二级table数据
            this.itemContent = true;
            this.boxContent = false;
            this.tableData = [];
            // if(!dict_id){
            //     dict_id = "1";
            // }
            if (pageNum_LL && pageNum_LL !== '') {
                this.pageIndex_LL = pageNum_LL;
            } else {
                pageNum_LL = this.pageIndex_LL;
            }
            this.BaseRequest({
                url: '/dictionary/selectDataDictionary',
                method: 'get',
                params: {
                    'currPage': pageNum_LL,
                    'pageSize': 10,
                    'dict_id': this.dict_id,
                }
            }).then((response) => {
              console.log(response,"response")
                this.loading = true;
                if (response) {
                  // if(this.page_res_LL[this.pageIndex_LL]){
                  //     this.tableData = this.page_res_LL[this.pageIndex_LL];
                  // }else {
                      this.tableData = response.dataList;
                  // }
                  this.totalPage_LL = response.totalNum;
                  this.pageIndex_LL = response.currPage;
              } else {
                  this.tableData = [];
                  this.totalPage_LL = 0;
              }
              this.loading = false;
            })
        },
        currentChangeHandle_L (val) { // 一级当前页
            // if(!this.page_res_L[this.pageIndex_L]){
            //    this.page_res_L[this.pageIndex_L] = this.tableData0;
            // }
            this.pageIndex_L = val;
            this.getTableData_L(val);
        },
        currentChangeHandle_LL (val) { //二级当前页
            // if(!this.page_res_LL[this.pageIndex_LL]){
            //    this.page_res_LL[this.pageIndex_LL] = this.tableData;
            // }
            this.pageIndex_LL = val;
            // 获取table数据
            this.getTableData_LL(val);
        },
        handleNodeClick (node) {// 点击节点
            this.dict_id = node.id;
            this.nodeLL = node;
            // console.log(node,"node")
            if (node.id == 0) {
                this.getTableData_L();
            } else if(node.id != 0 ){
                this.tableData = [];
                this.getTableData_LL(1,node.id);
            }
        },
        // editeDicCon(row){//编辑字典内容
        //     this.boxContent = false;
        //     this.treeId = row.dict_id;
        //     this.$nextTick(function () {
        //         this.$refs.tree.setCurrentKey(row.dict_id);
        //         this.itemContent = true;
        //         this.getTableData_LL(1,row.dict_id);
        //     })
        // },
        addUnitconfigBox () {//一级新增
            this.addShowModalPageBox = true;
        },
        addSubmitDataFormBox () {//一级新增弹窗
            if (this.addformDataBox.dicNm == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典名称'
                })
            }else{
                this.BaseRequest({
                    url: '/dictionary/insertDataDictionary',
                    method: 'get',
                    params: {
                        'dict_name': this.addformDataBox.dicNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.getMenuData();
                        this.getTableData_L(1);
                        this.closeModal();
                    }
                })
            }
        },
        openEditModalBox(row) {//一级编辑
            this.editShowModalPageBox = true;
            this.editformDataBox.dicNm = row.dict_name;
            this.editformDataBoxDict_id = row.dict_id;
        },
        editSubmitDataFormBox() {//一级编辑弹窗
            if (this.editformDataBox.dicNm == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典名称'
                })
            }else{
                this.BaseRequest({
                    url: '/dictionary/updateDataDictionarybydictid',
                    method: 'get',
                    params: {
                        'dict_id': this.editformDataBoxDict_id,
                        'dict_name': this.editformDataBox.dicNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.getMenuData()
                        this.getTableData_L(1);
                        this.closeModal();
                    }
                })
            }
        },
        addUnitconfig () {//二级新增
            this.addShowModalPage = true;
            this.addformData.subDic = this.nodeLL.label;
        },
        addSubmitDataForm() {//二级新增弹窗

            if (this.addformData.dicConNm == "" || this.addformData.dicConValue == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典内容名称、字典内容值'
                })
            }else{
                this.BaseRequest({
                    url: '/dictionary/inserttypeDataDictionary',
                    method: 'get',
                    params: {
                        'dict_id':this.dict_id,
                        'dict_content_name': this.addformData.dicConNm,
                        'dict_content_value': this.addformData.dicConValue,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.getTableData_LL(1);
                        this.closeModal();
                    }
                })
            }
        },
        openEditModal(row) {//二级编辑
            this.editShowModalPage = true;
            this.dict_content_id = row.dict_content_id;
            this.editformData.subDic = row.dict_name;
            this.editformData.dicConNm = row.dict_content_name;
            this.editformData.dicConValue = row.dict_content_value;
        },
        editSubmitDataForm() {//二级编辑弹窗
            if (this.editformData.dicConNm == "" || this.editformData.dicConValue == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典内容名称、字典内容值'
                })
            }else{
                this.BaseRequest({
                    url: '/dictionary/updateDataDictionary',
                    method: 'get',
                    params: {
                        'dict_id':this.dict_id,
                        'dict_content_id': this.dict_content_id,
                        'dict_content_name': this.editformData.dicConNm,
                        'dict_content_value': this.editformData.dicConValue,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        this.getTableData_LL(1);
                        this.closeModal();
                    }
                })
            }
        },
        closeModal() {
            this.addShowModalPage = false;
            this.editShowModalPage = false;
            this.addShowModalPageBox = false;
            this.editShowModalPageBox = false;
            this.addformDataBox.dicNm = "" ;
            this.addformData.dicConNm ="" ;
            this.addformData.dicConValue ="";
        },
        deldteEditModal (row) {
            this.$confirm('确认要删除该字典内容吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning'
                }).then(() => {
                this.BaseRequest({
                    url: '/dictionary/deleteDataDictionary',
                    method: 'get',
                    params: {
                        dict_content_id: row.dict_content_id
                    }
                }).then(data => {
                    if (data === 'success') {
                    this.$message.success('删除成功')
                    this.getTableData_LL();
                    this.closeModal();
                    } else {
                    this.$message.error('删除失败')
                    }
                })
                }).catch(() => {
                return false
                })
        },
        deleteDicCon (row) {
            this.$confirm('确认要删除该字典吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                type: 'warning'
                }).then(() => {
                this.BaseRequest({
                    url: '/dictionary/deleteDataDictionarybydictid',
                    method: 'get',
                    params: {
                        dict_id: row.dict_id
                    }
                }).then(data => {
                    if (data === 'success') {
                    this.$message.success('删除成功')
                    this.getTableData_L();
                    this.closeModal();
                    this.getMenuData()
                    } else {
                    this.$message.error('删除失败')
                    }
                })
                }).catch(() => {
                    return false
            })
        }
    },
    created () {
        this.$nextTick(function () {
            this.$refs.tree.setCurrentKey(0);
            this.getMenuData();
            this.getTableData_LL();
            this.getTableData_L();
        })
        this.boxContent = true;
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
