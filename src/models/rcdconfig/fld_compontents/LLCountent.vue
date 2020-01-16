<template>
    <div>
        <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfig_ll" size="mini" type="primary">新增指标类别</el-button>
        </div>
        <el-table
            :data="tableData_ll"
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
                    <el-button size="mini"  type="text" @click="openEditModal_ll(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 二级菜单新增-->
        <el-dialog title="新增指标类别" :visible.sync="addShowModalPage_ll" >
            <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformData_ll">
                <el-form-item size="mini" label="所属基本类别：" >
                    <el-input style="width:50%" v-model="addformData_ll.subfidClass" disabled placeholder="请输入所属基本类别" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item size="mini" label="指标类别名称：">
                    <el-input style="width:50%" v-model="addformData_ll.inClaNm" placeholder="请输入指标类别名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary" @click="addSubmitDataForm_ll()">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 二级菜单编辑-->
        <el-dialog title="修改指标类别" :visible.sync="editShowModalPage_ll" >
            <el-form  class="modal-form" label-position="right" label-width="25%" :model="editformData_ll">
                <el-form-item size="mini" label="所属基本类别：" >
                    <el-input style="width:50%" v-model="editformData_ll.subfidClass" disabled placeholder="请输入所属基本类别" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item size="mini" label="指标类别名称：">
                    <el-input style="width:50%" v-model="editformData_ll.inClaNm" placeholder="请输入指标类别名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeModal">取 消</el-button>
                <el-button type="primary" @click="editSubmitDataForm_ll()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:{
      tableData_ll:{type:Array,default:[]},
    },
    data () {
        return {
            addShowModalPage_ll:false,
            editShowModalPage_ll:false,
            addformData_ll: {
                subfidClass: "",
                inClaNm: "",
            },
            editformData_ll: {    
                subfidClass: "",
                inClaNm: "",
            },
            typeCode:"",
        }
    },
    methods: {
        addUnitconfig_ll () {//二级新增
            this.addShowModalPage_ll = true;
            this.addformData_ll.subfidClass = this.tableData_ll[0].subfidClass;
        },
        addSubmitDataForm_ll: function () {//二级新增弹窗  
            if (this.addformData_ll.inClaNm == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,    
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标类别名称'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformData_ll.subfidClass,
                        'person_tel': this.addformData_ll.inClaNm,
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
        openEditModal_ll: function (row) {//二级编辑
            this.editShowModalPage_ll = true;
            this.editformData_ll.subfidClass = row.subfidClass;
            this.editformData_ll.inClaNm = row.inClaNm;
            this.typeCode = row.typeCode;
        },
        editSubmitDataForm_ll: function () {//二级编辑弹窗 
            if ( this.editformData_ll.inClaNm == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标类别名称'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.typeCode,
                        'person_nm': this.editformData_ll.subfidClass,
                        'person_tel': this.editformData_ll.inClaNm,
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
            this.addShowModalPage_ll = false;
            this.editShowModalPage_ll = false;
            this.addformData_ll.inClaNm = "";
            this.editformData_ll.inClaNm = "";
        },
    },
    created () {
        
    }
}
</script>