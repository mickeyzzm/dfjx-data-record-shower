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
            <el-button @click="addUnitconfigBox" size="mini" type="primary">新增字典</el-button>
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
                prop="dicCode"
                width="100" 
                label="字典编号" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="dicNm"
                label="字典名称" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                    label="操作" 
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="openEditModalBox(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" @click="editeDicCon(scope.row)">编辑字典内容</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="itemContent">
            <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfig" size="mini" type="primary">新增字典内容</el-button>
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
                prop="dicCode"
                width="100" 
                label="字典内容编号" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="dicConNM"
                label="字典内容名称" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="dicConValue"
                label="字典内容值" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                prop="subDic"
                label="所属字典" 
                :resizable="false">
                </el-table-column>
                <el-table-column 
                    label="操作" 
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="openEditModal(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
    <!-- 一级菜单新增-->
    <el-dialog title="新增字典" :visible.sync="addShowModalPageBox" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformDataBox">
            <el-form-item size="mini" label="字典名称：" >
              <el-input style="width:50%" v-model="addformDataBox.dicNM" placeholder="请输入字典名称" auto-complete="off" ></el-input>
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
              <el-input style="width:50%" v-model="editformData.dicNM" placeholder="请输入字典名称" auto-complete="off" ></el-input>
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
              <el-input style="width:50%" v-model="addformData.dicConNM" placeholder="请输入字典内容名称" auto-complete="off" ></el-input>
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
              <el-input style="width:50%" v-model="editformData.dicConNM" placeholder="请输入字典内容名称" auto-complete="off" ></el-input>
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
            subDic:"",
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
                children: [
                    {
                        label: '学历字典',
                        id: 1
                    },
                    {
                        label: '是否',
                        id: 2
                    },
                    {
                        label: '公司机构属性',
                        id: 3
                    }
                ]
                }
            ],
            addformDataBox: {
                dicConNM: "",
                dicConValue: "",
                subDic: "",
            },
            editformDataBox: {
                dicConNM: "",
                dicConValue: "",
                subDic: "",
            },
            addformData: {
                dicConNM: "",
                dicConValue: "",
                subDic: "",
            },
            editformData: {
                dicConNM: "",
                dicConValue: "",
                subDic: "",
            },
            tableData0: [],
            tableDataBox: [
                {
                    dicCode: 1,
                    dicNm: '学历字典',
                },
                {
                    dicCode: 2,
                    dicNm: '是否',
                },
                {
                    dicCode: 3,
                    dicNm: '公司机构属性字典',
                },
            ],
            tableData: [],
            tableData1: [
                {
                dicCode: '1',
                dicConNM: '小学',
                dicConValue: '1',
                subDic: '学历字典',
                },
                {
                dicCode: '2',
                dicConNM: '初中',
                dicConValue: '2',
                subDic: '学历字典',
                },
                {
                dicCode: '3',
                dicConNM: '高中',
                dicConValue: '3',
                subDic: '学历字典',
                },
                {
                dicCode: '4',
                dicConNM: '大学',
                dicConValue: '4',
                subDic: '学历字典',
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
            } else if (data.id == 2) {
                this.tableData = [];
                this.itemContent = true;
                this.boxContent = false;
                this.tableData = this.tableData2;
            } else if (data.id == 3) {
                this.tableData = [];
                this.itemContent = true;
                this.boxContent = false;
                this.tableData = this.tableData3;
            }
        },
        editeDicCon(){//编辑字典内容
            this.boxContent = false;
            this.treeId = 1;
            this.$nextTick(function () {
                this.$refs.tree.setCurrentKey(1);
            })
            this.itemContent = true;
            this.tableData = this.tableData1;
        },
        addUnitconfigBox () {//一级新增
            this.addShowModalPageBox = true;
        },
        addSubmitDataFormBox: function () {//一级新增弹窗
            if (this.addformDataBox.dicConNM == "" || this.addformDataBox.dicConValue == "" || this.addformDataBox.subDic == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典名称'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformDataBox.dicConNM,
                        'person_tel': this.addformDataBox.dicConValue,
                        'person_tel': this.addformDataBox.subDic,
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
            if (this.editformDataBox.dicConNM == "" || this.editformDataBox.dicConValue == "" || this.editformDataBox.subDic == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典名称'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_id': this.user_id,
                        'person_nm': this.editformDataBox.basicClassNm,
                        'person_tel': this.editformDataBox.isEffectiveItem,
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
            this.addformData.subDic = this.tableData[0].subDic;
        },
        addSubmitDataForm: function () {//二级新增弹窗
            if (this.addformData.dicConNM == "" || this.addformData.dicConValue == "" || this.addformData.subDic == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典内容名称、字典内容值'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformData.dicConNM,
                        'person_tel': this.addformData.dicConValue,
                        'person_tel': this.addformData.subDic,
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
            this.editformData.subDic = row.subDic;
        },
        editSubmitDataForm: function () {//二级编辑弹窗 
            if (this.editformData.dicConNM == "" || this.editformData.dicConValue == "" || this.editformData.subDic == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>字典内容名称、字典内容值'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_id': this.user_id,
                        'person_nm': this.editformData.basicClassNm,
                        'person_tel': this.editformData.isEffectiveItem,
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