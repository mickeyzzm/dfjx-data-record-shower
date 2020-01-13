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
        <div v-show="boxContent">
            <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfigBox" size="mini" type="primary">新增指标基本类别</el-button>
            </div>
            <el-table
                :data="tableData0"
                style="width: 80%"
                :header-cell-style="{background:'#f6f6f7',}"
                class = "searchGrid"
                size="mini"
                border
                stripe>
                <el-table-column 
                prop="indexCode"
                width="100" 
                label="基本类别编码" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="indexNm"
                label="基本类别名称" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                    label="操作" 
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="openEditModalBox(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="itemContent">
            <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfig" size="mini" type="primary">新增指标类别</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 80%"
                :header-cell-style="{background:'#f6f6f7',}"
                class = "searchGrid"
                size="mini"
                border
                stripe>
                <el-table-column 
                prop="inClaCode"
                width="100" 
                label="指标类别编码" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="inClaNm"
                label="指标类别名称" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="subfidClass"
                label="所属基本类别" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                    label="操作" 
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="openEditModal(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
    <!-- 一级菜单新增-->
    <el-dialog title="新增指标基本类别" :visible.sync="addShowModalPageBox" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformDataBox">
            <el-form-item size="mini" label="基本类别名称：" >
              <el-input style="width:50%" v-model="addformDataBox.indexCode" placeholder="请输入基本类别名称" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="是否有效：" >
                <el-select style="width:50%" v-model="addformDataBox.indexNm">
                    <el-option
                        v-for="item in isEffective"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
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
            <el-form-item size="mini" label="基本类别名称：" >
              <el-input style="width:50%" v-model="editformDataBox.indexCode" placeholder="请输入基本类别名称" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="是否有效：" >
                <el-select style="width:50%" v-model="editformDataBox.indexNm">
                    <el-option
                        v-for="item in isEffective"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
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
            <el-form-item size="mini" label="所属基本类别：" >
              <el-input style="width:50%" v-model="addformData.subfidClass" placeholder="请输入所属基本类别" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="指标类别名称：">
              <el-input style="width:50%" v-model="addformData.inClaNm" placeholder="请输入指标类别名称"></el-input>
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
            <el-form-item size="mini" label="所属基本类别：" >
              <el-input style="width:50%" v-model="editformData.subfidClass" placeholder="请输入所属基本类别" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="指标类别名称：">
              <el-input style="width:50%" v-model="editformData.inClaNm" placeholder="请输入指标类别名称"></el-input>
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
            isEffective:[
                {
                    name:"无效",
                    id:"0",
                },{
                    name:"有效",
                    id:"1",
                }
            ],
            boxContent:false,
            itemContent:false,
            addShowModalPage:false,
            editShowModalPage:false,
            addShowModalPageBox:false,
            editShowModalPageBox:false,
            treeData: [
                { 
                label: '指标体系',
                id:0,
                children: [
                    {
                        label: '人',
                        id: 1,
                        children: [
                            {
                                label: '基本信息',
                                id: 1,
                                children: [
                                    {
                                        label: '年龄',
                                        id: 1
                                    },
                                    {
                                        label: '性别',
                                        id: 2
                                    },
                                    {
                                        label: '是否已婚',
                                        id: 3
                                    },
                                    {
                                        label: '籍贯',
                                        id: 4
                                    }
                                ]
                            },
                            {
                                label: '教育信息',
                                id: 2,
                                children: [
                                    {
                                        label: '教育程度',
                                        id: 1
                                    },
                                    {
                                        label: '就读小学',
                                        id: 2
                                    },
                                    {
                                        label: '就读中学',
                                        id: 3
                                    }
                                ]
                            },
                            {
                                label: '资产信息',
                                id: 3,
                                children: [
                                    {
                                        label: '是否自有房产',
                                        id: 1
                                    },
                                    {
                                        label: '月薪区间',
                                        id: 2
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: '地',
                        id: 2
                    },
                    {
                        label: '物',
                        id: 3
                    },
                    {
                        label: '组织',
                        id: 4
                    }
                ]
                }
            ],
            addformDataBox: {
                indexNm: "",
                isEffective: "",
            },
            editformDataBox: {
                indexNm: "",
                isEffective: "",
            },
            addformData: {
                subfidClass: "",
                inClaNm: "",
            },
            editformData: {    
                subfidClass: "",
                inClaNm: "",
            },
            tableData0: [],
            tableDataBox: [
                {
                    indexCode:"1",
                    indexNm:"人"
                },
                {
                    indexCode:"2",
                    indexNm:"物"
                },
                {
                    indexCode:"3",
                    indexNm:"地"
                },
                {
                    indexCode:"4",
                    indexNm:"组织"
                },
            ],
            tableData: [],
            tableData1: [
                {
                    inClaCode: '1',
                    inClaNm: '基本信息',
                    subfidClass: '人',
                },
                {
                    inClaCode: '2',
                    inClaNm: '教育经历',
                    subfidClass: '人',
                },
                {
                    inClaCode: '3',
                    inClaNm: '资产状况', 
                    subfidClass: '人',
                },
            ],
            tableData2: [
                {
                dicCode: '1',
                dicConNM: '是',
                dicConValue: '1',
                subDic: '是否字典',
                },
                {
                dicCode: '2',
                dicConNM: '否',
                dicConValue: '2',
                subDic: '是否字典',
                },
            ],
            tableData3: [
                {
                dicCode: '1',
                dicConNM: '机构',
                dicConValue: '1',
                subDic: '公司机构属性字典',
                },
                {
                dicCode: '2',
                dicConNM: '公司',
                dicConValue: '2',
                subDic: '公司机构属性字典',
                },
            ],
            treeId: 0,
        }
    },
    methods: {
        // 点击节点
        handleNodeClick (data) {
            if (data.id == 0) {
                this.tableData0 = [];
                this.boxContent = true;
                this.itemContent = false;
                this.tableData0 = this.tableDataBox;
            } else if (data.id == 1) {
                this.tableData = [];
                this.itemContent = true;
                this.boxContent = false;
                this.tableData = this.tableData1;
                console.log(this.tableData,"1")
            } else if (data.id == 2) {
                this.tableData = [];
                this.itemContent = true;
                this.boxContent = false;
                this.tableData = this.tableData2;
                console.log(this.tableData,"2")
            } else if (data.id == 3) {
                this.tableData = [];
                this.itemContent = true;
                this.boxContent = false;
                this.tableData = this.tableData3;
                console.log(this.tableData,"3")
            }
        },
        addUnitconfigBox () {//一级新增
            this.addShowModalPageBox = true;
        },
        addSubmitDataFormBox: function () {//一级新增弹窗
            if (this.addformDataBox.indexNm == "" || this.addformDataBox.isEffective == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformDataBox.indexNm,
                        'person_tel': this.addformDataBox.isEffective,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        // this.getTableData(1);
                        this.closeModal();
                    }
                })
            }
        },
        openEditModalBox: function (row) {//一级编辑
            this.editShowModalPageBox = true;
        },
        editSubmitDataFormBox: function () {//一级编辑弹窗 
            if (this.editformDataBox.indexNm == "" || this.editformDataBox.isEffective == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_id': this.user_id,
                        'person_nm': this.editformDataBox.indexNm,
                        'person_tel': this.editformDataBox.isEffective,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        // this.getTableData(1);
                        this.closeModal();
                    }
                })
            }
        },
        addUnitconfig () {//二级新增
            this.addShowModalPage = true;
        },
        addSubmitDataForm: function () {//二级新增弹窗  
            if (this.addformData.subfidClass == "" || this.addformData.inClaNm == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,    
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>所属基本类别、指标类别名称'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformData.subfidClass,
                        'person_tel': this.addformData.inClaNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        // this.getTableData(1);
                        this.closeModal();
                    }
                })
            }
        },
        openEditModal: function (row) {//二级编辑
            this.editShowModalPage = true;
            this.user_id = row.person_id;
            this.editformData.basicClassNm = row.name;
            this.editformData.isEffectiveItem = row.isEffectiveItem;
        },
        editSubmitDataForm: function () {//二级编辑弹窗 
            if (this.editformData.subfidClass == "" || this.editformData.inClaNm == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>所属基本类别、指标类别名称'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_id': this.user_id,
                        'person_nm': this.editformData.subfidClass,
                        'person_tel': this.editformData.inClaNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        // this.getTableData(1);
                        this.closeModal();
                    }
                })
            }
        },
        closeModal: function () {
            this.addShowModalPage = false;
            this.editShowModalPage = false;
            this.addShowModalPageBox = false;
            this.editShowModalPageBox = false;
            this.addformData.basicClassNm = "";
            this.addformData.isEffectiveItem = "";
        },
    },
    created () {
        this.$nextTick(function () {
            this.$refs.tree.setCurrentKey(0);
        })
        this.boxContent = true;
        this.tableData0 = this.tableDataBox;
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