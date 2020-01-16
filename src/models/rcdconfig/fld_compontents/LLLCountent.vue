<template>
    <div>
        <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfig_lll" size="mini" type="primary">新增指标</el-button>
        </div>
        <el-table
            :data="tableData_lll"
            style="width: 80%"
            :header-cell-style="{background:'#f6f6f7',}"
            class = "searchGrid"
            size="mini"
            border
            stripe>
            <el-table-column 
                prop="inCode"
                width="100" 
                label="指标编码" 
                :resizable="false">
            </el-table-column>
            <el-table-column 
                prop="inNm"
                label="指标名称" 
                :resizable="false">
            </el-table-column>
            <el-table-column 
                prop="subClass"
                label="所属类别" 
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
                    <el-button size="mini" type="text" @click="openEditModal_lll(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 三级菜单新增-->
        <el-dialog title="新增指标" :visible.sync="addShowModalPage_lll" >
            <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformData_lll">
                <el-form-item size="mini" label="指标基本类别：" >
                    <el-input style="width:50%" v-model="addformData_lll.subfidClass" disabled  placeholder="请输入指标基本类别" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item size="mini" label="指标类别：">
                    <el-input style="width:50%" v-model="addformData_lll.inClass" disabled placeholder="请输入指标类别"></el-input>
                </el-form-item>
                <el-form-item size="mini" label="指标名称："> 
                    <el-input style="width:50%" v-model="addformData_lll.inClaNm" placeholder="请输入指标名称"></el-input>
                </el-form-item>
                <el-form-item size="mini" label="数据类型：">
                    <el-select style="width:50%" v-model="addformData_lll.dataType">
                        <el-option
                            v-for="item in dataTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="是否可空：">
                    <el-select style="width:50%" v-model="addformData_lll.isEmpoty">
                        <el-option
                            v-for="item in isEmpoty"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="数据字典：" v-if="addformData_lll.dataType == 2">
                   <el-input style="width:37%" v-model="addformData_lll.datafid" placeholder="请输入数据字典"></el-input>
                    <el-button @click="datafidBtn_add()" type="primary">选择</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary" @click="addSubmitDataForm_lll()">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 三级菜单编辑-->
        <el-dialog title="修改指标" :visible.sync="editShowModalPage_lll" >
            <el-form  class="modal-form" label-position="right" label-width="25%" :model="editformData_lll">
                <el-form-item size="mini" label="指标基本类别：" >
                    <el-input style="width:50%" v-model="editformData_lll.subfidClass" disabled placeholder="请输入指标基本类别" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item size="mini" label="指标类别："> 
                    <el-input style="width:50%" v-model="editformData_lll.inClass" disabled placeholder="请输入指标类别"></el-input>
                </el-form-item>
                <el-form-item size="mini" label="指标名称："> 
                    <el-input style="width:50%" v-model="editformData_lll.inClaNm" placeholder="请输入指标名称"></el-input>
                </el-form-item>
                <el-form-item size="mini" label="数据类型：">
                    <el-select style="width:50%" v-model="editformData_lll.dataType">
                        <el-option
                            v-for="item in dataTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="是否可空：">
                    <el-select style="width:50%" v-model="editformData_lll.isEmpoty">
                        <el-option
                            v-for="item in isEmpoty"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="数据字典：" v-if="editformData_lll.dataType == 2">
                    <el-input style="width:37%" v-model="editformData_lll.datafid" placeholder="请输入数据字典"></el-input>
                    <el-button @click="datafidBtn_edit()" type="primary">选择</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModal">取 消</el-button>
                    <el-button type="primary" @click="editSubmitDataForm_lll()">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 数据字典弹窗 新增-->
        <el-dialog title="新增数据字典内容" :visible.sync="addShowModalPage_dataFid" >
            <el-container>
                <el-aside style="width: 30%">
                <el-tree
                    :data="treeData"
                    node-key="id"
                    @node-click="handleNodeClick_lll"
                    :default-expanded-keys="[treeId_Add]"
                    :highlight-current="true"
                    ref="tree"
                ></el-tree>
                </el-aside>
                <el-main style="padding: 0 20px;">
                    <div v-show="itemContent">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="{background:'#f6f6f7',}"
                            @selection-change="handleSelectionChange_add"
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
                                prop="dicConNM"
                                label="字典名称" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column 
                                prop="dicConValue"
                                label="字典值" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column
                                :resizable="false"
                                type="selection">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-main>
            </el-container>
            <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModalDatafid">取 消</el-button>
                    <el-button type="primary" @click="addSubmitDataForm_dataFid()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 数据字典弹窗 修改-->
        <el-dialog title="修改数据字典内容" :visible.sync="editShowModalPage_dataFid" >
            <el-container>
                <el-aside style="width: 30%">
                    <el-tree
                        :data="treeData"
                        node-key="id"
                        @node-click="handleNodeClick_lll"
                        :default-expanded-keys="[treeId_Add]"
                        :highlight-current="true"
                        ref="tree"
                    ></el-tree>
                </el-aside>
                <el-main style="padding: 0 20px;">
                    <div v-show="itemContent">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            :header-cell-style="{background:'#f6f6f7',}"
                            @selection-change="handleSelectionChange_edit"
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
                                prop="dicConNM"
                                label="字典名称" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column 
                                prop="dicConValue"
                                label="字典值" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column
                                :resizable="false"
                                type="selection">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-main>
            </el-container>
            <div slot="footer" class="dialog-footer">
                    <el-button @click="closeModalDatafid">取 消</el-button>
                    <el-button type="primary" @click="editSubmitDataForm_dataFid()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:{
      tableData_lll:{type:Array,default:[]},
    },
    data () {
        return {
            itemContent:false,
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
            tableData0: [],
            tableData: [],
            tableData1: [
                {
                dicCode: '1',
                dicConNM: '小学',
                dicConValue: '1',
                },
                {
                dicCode: '2',
                dicConNM: '初中',
                dicConValue: '2',
                },
                {
                dicCode: '3',
                dicConNM: '高中',
                dicConValue: '3',
                },
                {
                dicCode: '4',
                dicConNM: '大学',
                dicConValue: '4',
                },
            ],
            tableData2: [
                {
                dicCode: '1',
                dicConNM: '是',
                dicConValue: '1',
                },
                {
                dicCode: '2',
                dicConNM: '否',
                dicConValue: '2',
                },
            ],
            tableData3: [
                {
                dicCode: '1',
                dicConNM: '机构',
                dicConValue: '1',
                },
                {
                dicCode: '2',
                dicConNM: '公司',
                dicConValue: '2',
                },
            ],
            checked:[],
            isEmpoty:[
                {
                    name:"否",
                    id:"0",
                },{
                    name:"是",
                    id:"1",
                }
            ],
            dataTypes:[
                {
                    name:"字符串",
                    id:"0",
                },{
                    name:"数字",
                    id:"1",
                },{
                    name:"数据字典",
                    id:"2",
                }
            ],
            addShowModalPage_lll:false,
            editShowModalPage_lll:false,
            addShowModalPage_dataFid:false,
            editShowModalPage_dataFid:false,
            datafidShowModalPage:false,
            addformData_lll: {
                subfidClass: "",
                inClass : "",
                inClaNm : "",
                dataType : "",
                isEmpoty : "",
                datafid: "",
            },
            editformData_lll: {    
                subfidClass: "",
                inClass : "",
                inClaNm : "",
                dataType : "",
                isEmpoty : "",
                datafid: "",
            },
            treeId_Add: 1,
            multipleSelection_add: [],
            multipleSelection_edit: [],
            typeCode:"",
        }
    },
    methods: {
        handleNodeClick_lll (data) {
            if (data.id == 1) {
                this.tableData = [];
                this.itemContent = true;
                this.tableData = this.tableData1;
            } else if (data.id == 2) {
                this.tableData = [];
                this.itemContent = true;
                this.tableData = this.tableData2;
            } else if (data.id == 3) {
                this.tableData = [];
                this.itemContent = true;
                this.tableData = this.tableData3;
            }
        },
        handleSelectionChange_add(val){
            for(var i=0;i<val.length;i++){
                this.multipleSelection_add.push(val[i].dicCode);
            }
        },
        handleSelectionChange_edit(val){
            this.multipleSelection_edit = val.dicCode;
            // console.log(this.multipleSelection_edit,"ee")
        },
        datafidBtn_add(){//数据字典选择按钮 新增
            this.addShowModalPage_dataFid = true;
            this.itemContent = true;
            this.tableData = this.tableData1;
            this.treeId_Add = 1;
            this.$nextTick(function () {
                this.$refs.tree.setCurrentKey(1);
            })
        },
        addSubmitDataForm_dataFid(){//数据字典选择按钮 新增弹窗
            var addSelections = this.multipleSelection_add;
            var selections = JSON.stringify(addSelections);
            console.log(selections,"sss")
            this.BaseRequest({
                url: '/contact/updatepageContact',
                method: 'get',
                params: {
                    'person_id': selections, 
                }
            }).then((res) => {
                if(res == "success"){
                    this.Message.success('添加成功');
                    this.closeModalDatafid();
                }
            })
        },
        datafidBtn_edit(){//数据字典 修改
            this.editShowModalPage_dataFid = true;
        },
        editSubmitDataForm_dataFid(){//数据字典 修改弹窗
            var editSelections = this.multipleSelection_edit
            var selections = JSON.stringify(editSelections);
             this.BaseRequest({
                url: '/contact/updatepageContact',
                method: 'get',
                params: {
                    'person_id': selections, 
                }
            }).then((res) => {
                if(res == "success"){
                    this.Message.success('添加成功');
                    this.closeModalDatafid();
                }
            })
        },
        addUnitconfig_lll () {//三级新增
            this.addShowModalPage_lll = true; 
            this.addformData_lll.subfidClass = this.tableData_lll[0].subfidClass;
            this.addformData_lll.inClass = this.tableData_lll[0].subClass;
        },
        addSubmitDataForm_lll: function () {//三级新增弹窗  
            if (this.addformData_lll.inClaNm == "" || this.addformData_lll.dataType == "" || this.addformData_lll.isEmpoty == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,    
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标名称、数据类型、是否可空'
                })
            }else if(this.addformData_lll.dataType == 2 && this.addformData_lll.datafid == ""){
                    this.$notify({
                        dangerouslyUseHTMLString: true,    
                        message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>数据字典'
                    })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformData_lll.inClaNm,
                        'person_tel': this.addformData_lll.dataType,
                        'person_tel': this.addformData_lll.isEmpoty,
                        'person_tel': this.addformData_lll.datafid,
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
        openEditModal_lll: function (row) {//三级编辑
            this.editShowModalPage_lll = true;
            this.typeCode = row.typeCode;
            this.editformData_lll.subfidClass = row.subfidClass;
            this.editformData_lll.inClass = row.subClass;
            this.editformData_lll.inClaNm = row.inNm;
        },
        editSubmitDataForm_lll: function () {//三级编辑弹窗
            if (this.editformData_lll.inClaNm == "" || this.editformData_lll.dataType == "" || this.editformData_lll.isEmpoty == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,    
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标名称、数据类型、是否可空'
                })
            }else if(this.editformData_lll.dataType == 2 && this.editformData_lll.datafid == ""){
                    this.$notify({
                        dangerouslyUseHTMLString: true,    
                        message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>数据字典'
                    })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_id': this.typeCode, 
                        'person_tel': this.editformData_lll.inClaNm,
                        'person_nm': this.editformData_lll.dataType,
                        'person_tel': this.editformData_lll.isEmpoty,
                        'person_tel': this.editformData_lll.datafid,
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
            this.addShowModalPage_lll = false;
            this.editShowModalPage_lll = false;
            this.addformData_lll.inClaNm = "";
            this.addformData_lll.dataType = "";
            this.addformData_lll.isEmpoty = "";
            this.addformData_lll.datafid = "";
            this.editformData_lll.inClaNm = "";
            this.editformData_lll.dataType = "";
            this.editformData_lll.isEmpoty = "";
            this.editformData_lll.datafid = "";
        },
        closeModalDatafid(){
            this.addShowModalPage_dataFid = false;
            this.editShowModalPage_dataFid = false;
            this.treeId_Add = 1;
        }
    },
    created () {

    }
}
</script>