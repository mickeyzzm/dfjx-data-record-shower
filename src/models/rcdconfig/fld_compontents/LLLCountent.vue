<template>
    <div>
        <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfig_lll" size="mini" type="primary">新增指标</el-button>
        </div>
        <el-table
            :data="tableData_lll"
            style="width: 80%"
            :header-cell-style="{background:'#f6f6f7',}"
            :loading="loading"
            class = "searchGrid"
            size="mini"
            border
            stripe>
            <el-table-column 
                prop="catg_id"
                width="100" 
                label="指标编码" 
                :resizable="false">
            </el-table-column>
            <el-table-column 
                prop="fld_name"
                label="指标名称" 
                :resizable="false">
            </el-table-column>
            <el-table-column 
                prop="catg_name"
                label="所属类别" 
                :resizable="false">
            </el-table-column>
            <el-table-column 
                prop="proj_name"
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
        <el-pagination
            @current-change="currentChangeHandle_LLL"
            :current-page="pageIndex_LLL"
            :page-size="pageSize_LLL"
            :total="totalPage_LLL"
            layout="total, prev, pager, next, jumper">
        </el-pagination>
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
                <el-form-item size="mini" label="指标类型：">
                    <el-select style="width:50%" v-model="addformData_lll.fld_type">
                        <el-option
                            v-for="item in fld_types"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="数据字典：" v-show="showDatafid_add">
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
                <el-form-item size="mini" label="数据类型：" >
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
                <el-form-item size="mini" label="指标类型：">
                    <el-select style="width:50%" v-model="editformData_lll.fld_type">
                        <el-option
                            v-for="item in fld_types"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" label="数据字典：" v-show="showDatafid_edit">
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
                            :data="tableDataAdd"
                            style="width: 100%"
                            :header-cell-style="{background:'#f6f6f7',}"
                            @selection-change="handleSelectionChange_add"
                            class = "searchGrid"
                            size="mini"
                            border
                            stripe>
                            <el-table-column 
                                prop="dict_content_id"
                                width="100" 
                                label="字典编号" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column 
                                prop="dict_content_name"
                                label="字典名称" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column 
                                prop="dict_content_value"
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
                            :data="tableDataEdit"
                            style="width: 100%"
                            :header-cell-style="{background:'#f6f6f7',}"
                            @selection-change="handleSelectionChange_edit"
                            class = "searchGrid"
                            size="mini"
                            border
                            stripe>
                            <el-table-column 
                                prop="dict_content_id"
                                width="100" 
                                label="字典编号" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column 
                                prop="dict_content_name"
                                label="字典名称" 
                                :resizable="false">
                            </el-table-column>
                            <el-table-column 
                                prop="dict_content_value"
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
        tableData_lll:{
          type:Array,default:[],
        },
        catg_id:{
          catg_id:String,default:"",
        },
        pageIndex_LLL:{
          pageIndex_LLL:String,default:1,
        },
        pageSize_LLL:{
          pageSize_LLL:String,default:10,
        },
        totalPage_LLL:{
          totalPage_LLL:String,default:0,
        },
        page_res_LLL:{
          page_res_LLL:Object,default:"",
        },
    },
    data () {
        return {
            showDatafid_add:false,
            showDatafid_edit:false,
            dicPageIndex_LLL: 1,
            dicPageSize_LLL: 10,
            dicTotalPage_LLL: 0,
            dicPage_res_LLL:{},
            itemContent:false,
            treeData: [
                { 
                label: '数据字典',
                id:0,
                children: []
                }
            ],
            tableData0: [],
            tableDataAdd: [],
            tableDataEdit: [],
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
            fld_types:[
                {
                    name:"通用指标",
                    id:"0",
                },{
                    name:"突发指标",
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
                    name:"日期",
                    id:"2",
                },{
                    name:"数据字典",
                    id:"3",
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
                fld_types:"",
                datafid: "",
                datafidArry: [],
            },
            editformData_lll: {    
                subfidClass: "",
                inClass : "",
                inClaNm : "",
                dataType : "",
                isEmpoty : "",
                fld_types:"",
                datafid: "",
                datafidArry: [],
            },
            treeId_Add: 1,
            multipleSelection_add: [],
            multipleSelection_edit: [],
            typeCode:"",
            loading:false,
            dataDicDict_id:"",
            checkSelectionArry_edit:[],
            checkSelectionArry_add:[],
        }
    },
    watch: {
        'addformData_lll.dataType':function(val){
            if(val == 3){
                 this.showDatafid_add = true;
            }
        },
        'editformData_lll.dataType':function(val){
            if(val == 3){
                 this.showDatafid_edit = true;
            }
        }
    },
    methods: {
        getDataDicLeftMenuData(){//左侧菜单数据
            this.BaseRequest({
                url: '/dictionary/selectleftDataDictionary',
                method: 'get',
                params: {}
            }).then((res) => {
                // console.log(res,"顶顶顶顶")
                res.map(item => {
                    this.treeData[0].children.push({
                        label: item.dict_name,
                        id: item.dict_id
                    })
                })
            })
        },
        getDataDicTableDataAdd(dicPageNum_LLL){//三级菜单 新增 数据字典table数据
            this.tableData = [];
            this.itemContent = true;
            if (dicPageNum_LLL && dicPageNum_LLL !== '') {
                this.dicPageIndex_LLL = dicPageNum_LLL;
            } else {
                dicPageNum_LLL = this.dicPageIndex_LLL;
            }
            this.BaseRequest({
                url: '/dictionary/selectDataDictionary',
                method: 'get',
                params: {
                    'dict_id': this.dataDicDict_id,
                    'currPage': dicPageNum_LLL,
                    'pageSize': 10,
                }
            }).then((res) => {
                // console.log(res,"数据字典table 新增");
                this.loading = true;
                if(res){
                    this.tableDataAdd = res.dataList;
                    this.loading = false;
                } 
            })
        },
        getDataDicTableDataEdit(dicPageNum_LLL){//三级菜单 编辑 数据字典table数据
            this.tableData = [];
            this.itemContent = true;
            if (dicPageNum_LLL && dicPageNum_LLL !== '') {
                this.dicPageIndex_LLL = dicPageNum_LLL;
            } else {
                dicPageNum_LLL = this.dicPageIndex_LLL;
            }
            this.BaseRequest({
                url: '/dictionary/selectDataDictionary',
                method: 'get',
                params: {
                    'dict_id': this.dataDicDict_id,
                    'currPage': dicPageNum_LLL,
                    'pageSize': 10,
                }
            }).then((res) => {
                // console.log(res,"数据字典table 新增");
                this.loading = true;
                if(res){
                    this.tableDataEdit = res.dataList;
                    this.loading = false;
                } 
            })
        },
        handleNodeClick_lll (node) {
            this.dataDicDict_id = node.id;
            this.getDataDicTableDataAdd();
            this.getDataDicTableDataEdit();
            for(var i in node){
                if(node[i] == node.id){
                    this.addformData_lll.datafid = node.label;
                }
            }
        },
        handleSelectionChange_add(val){
            this.checkSelectionArry_add = val;
            this.multipleSelection_add = [];
            for(var i=0;i<val.length;i++){
                this.multipleSelection_add.push(val[i].dict_content_id);
            }
            this.addformData_lll.datafidArry = this.multipleSelection_add;
        },
        handleSelectionChange_edit(val){
            this.checkSelectionArry_edit = val;
            this.multipleSelection_edit = [];
            for(var i=0;i<val.length;i++){
                this.multipleSelection_edit.push(val[i].dict_content_id);
            }
            this.editformData_lll.datafidArry = this.multipleSelection_edit;
        },
        datafidBtn_add(){//数据字典选择按钮 新增
            this.addShowModalPage_dataFid = true;
            this.getDataDicTableDataAdd();
            this.itemContent = true;
            this.treeId_Add = 1;
            this.$nextTick(function () {
                this.$refs.tree.setCurrentKey(1);
            })
        },
        addSubmitDataForm_dataFid(){//数据字典选择按钮 新增弹窗
            if(this.checkSelectionArry_add.length == 0){
                this.Message.warning('请选择字典');
            }else{
                this.addShowModalPage_dataFid = false;
            }
        },
        datafidBtn_edit(){//数据字典选择按钮 修改
            this.editShowModalPage_dataFid = true;
            this.itemContent = true;
            this.treeId_Add = 1;
            this.getDataDicTableDataEdit();
            this.$nextTick(function () {
                this.$refs.tree.setCurrentKey(1);
            })
        },
        editSubmitDataForm_dataFid(){//数据字典选择按钮 修改弹窗
            if(this.checkSelectionArry_edit.length == 0){
                this.Message.warning('请选择字典');
            }else{
                this.editShowModalPage_dataFid = false;
            }
        },
        addUnitconfig_lll () {//三级新增
            this.addShowModalPage_lll = true; 
            this.addformData_lll.subfidClass = this.tableData_lll[0].proj_name;
            this.addformData_lll.inClass = this.tableData_lll[0].catg_name;
        },
        addSubmitDataForm_lll() {//三级新增弹窗
            if (this.addformData_lll.inClaNm == "" || this.addformData_lll.dataType == "" || this.addformData_lll.isEmpoty == "" || this.addformData_lll.fld_type == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,    
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标名称、数据类型、是否可空、指标类型'
                })
            }else if(this.addformData_lll.dataType == 2 && this.addformData_lll.datafid == ""){
                    this.$notify({
                        dangerouslyUseHTMLString: true,    
                        message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>数据字典'
                    })
            }else{
                this.BaseRequest({
                    url: '/rcdDt/insertrcddtfld',
                    method: 'get',
                    params: {
                        'catg_id': this.catg_id,
                        'fld_name': this.addformData_lll.inClaNm,
                        'fld_data_type': this.addformData_lll.dataType,
                        'fld_is_null': this.addformData_lll.isEmpoty,
                        'fld_type':this.addformData_lll.fld_type,
                        'dict_content_id': this.addformData_lll.datafidArry.join(","),
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.$emit("getTableData_LLL");
                        this.$emit("getMenuData_Add_LLL");
                        this.closeModal();
                    }
                })
            }
        },
        openEditModal_lll(row) {//三级编辑
            this.editShowModalPage_lll = true;
            this.typeCode = row.fld_id;
            this.editformData_lll.subfidClass = row.proj_name;
            this.editformData_lll.inClass = row.catg_name;
            this.editformData_lll.inClaNm = row.fld_name;
            this.editformData_lll.isEmpoty = row.fld_is_null==0?"否":"是";
            this.editformData_lll.fld_type = row.fld_type==0?"通用指标":"突发指标";
            if(row.fld_data_type == 0){
                this.editformData_lll.dataType = "字符串";
            }else if(row.fld_data_type == 1){
                this.editformData_lll.dataType = "数据";
            }else if(row.fld_data_type == 2){
                this.editformData_lll.dataType = "日期";
            }else if(row.fld_data_type == 3){
                this.editformData_lll.dataType = "数据字典";
                if(this.editformData_lll.dataType == "数据字典"){
                    this.showDatafid_edit = true;
                }
                // this.editformData_lll.datafid = false;
            }
        },
        editSubmitDataForm_lll(){//三级编辑弹窗
            if (this.editformData_lll.inClaNm == "" || this.editformData_lll.dataType == "" || this.editformData_lll.isEmpoty == "" || this.editformData_lll.fld_type == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,    
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标名称、数据类型、是否可空、指标类型'
                })
            }else if(this.editformData_lll.dataType == 3 && this.editformData_lll.datafid == ""){
                    this.$notify({
                        dangerouslyUseHTMLString: true,    
                        message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>数据字典'
                    })
            }else if(this.editformData_lll.dataType == "字符串"){
                this.editformData_lll.dataType = 0;
            }else if( this.editformData_lll.dataType == "数字"){
                this.editformData_lll.dataType = 1;
            }else if( this.editformData_lll.dataType == "日期"){
                this.editformData_lll.dataType = 2;
            }else if( this.editformData_lll.dataType == "数据字典"){
                this.editformData_lll.dataType = 3;
            }else if( this.editformData_lll.isEmpoty == "否"){
                this.editformData_lll.isEmpoty = 0;
            }else if( this.editformData_lll.isEmpoty == "是"){
                this.editformData_lll.isEmpoty = 1;
            }else if( this.editformData_lll.fld_type == "通用指标"){
                this.editformData_lll.fld_type = 0;
            }else if( this.editformData_lll.fld_type == "突发指标"){
                this.editformData_lll.fld_type = 1;
            }else{
                this.BaseRequest({
                    url: '/rcdDt/updatercddtfld',
                    method: 'get',
                    params: {
                        'fld_id': this.typeCode,
                        'catg_id': this.catg_id,
                        'fld_name': this.editformData_lll.inClaNm,
                        'fld_data_type': this.editformData_lll.dataType,
                        'fld_is_null': this.editformData_lll.isEmpoty,
                        'fld_type':this.editformData_lll.fld_type,
                        'dict_content_id': this.editformData_lll.datafidArry.join(","),
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        this.$emit("getTableData_LLL");
                        this.$emit("getMenuData_edit_LLL");
                        this.editShowModalPage_lll = false;
                    }
                })
            }
        },
        currentChangeHandle_LLL(val){
            this.$emit("currentChangeHandle_LLL",val)
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
        this.$nextTick(function () {
            this.getDataDicLeftMenuData();
            this.getDataDicTableDataAdd(); 
            this.getDataDicTableDataEdit(); 
            
        })
    }
}
</script>