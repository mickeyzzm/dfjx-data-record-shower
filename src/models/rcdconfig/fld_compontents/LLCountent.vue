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
                prop="proj_id"
                width="100"
                label="指标类别编码"
                :resizable="false">
            </el-table-column>
            <el-table-column
                prop="catg_name"
                label="指标类别名称"
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
                    <el-button size="mini"  type="text" @click="openEditModal_ll(scope.row)">编辑</el-button>
                    <el-button size="mini"  type="text" @click="deleteFld(scope.row)">删除</el-button>
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
        tableData_ll:{
          type:Array,default:[],
        },
        proj_id:{
          proj_id:String,default:"",
        },
        nodeLabel:{
          nodeLabel:String,default:"",
        },
        pageIndex_LL:{
          pageIndex_LL:Number,default:1,
        },
        pageSize_LL:{
          pageSize_LL:String,default:10,
        },
        totalPage_LL:{
          totalPage_LL:String,default:0,
        },
        page_res_LL:{
          page_res_LL:Object,default:"",
        },
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
        currentChangeHandle_LL(val){
            this.$emit("currentChangeHandle_LL",val)
        },
        addUnitconfig_ll () {//二级新增
            this.addShowModalPage_ll = true;
            this.addformData_ll.subfidClass = this.nodeLabel;
        },
        addSubmitDataForm_ll() {//二级新增弹窗
            if (this.addformData_ll.inClaNm == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标类别名称'
                })
            }else{
                this.BaseRequest({
                    url: '/rcdDt/inserttixircddtprojer',
                    method: 'get',
                    params: {
                        'proj_id': this.proj_id,
                        'catg_name': this.addformData_ll.inClaNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.$emit("getTableData_LL");
                        this.$emit("getMenuData_Add_LL");
                        this.closeModal();
                    }
                })
            }
        },
        openEditModal_ll(row) {//二级编辑
            this.editShowModalPage_ll = true;
            this.editformData_ll.subfidClass = row.proj_name;
            this.editformData_ll.inClaNm = row.catg_name;
            this.typeCode = row.catg_id;
        },
        editSubmitDataForm_ll() {//二级编辑弹窗
            if ( this.editformData_ll.inClaNm == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>指标类别名称'
                })
            }else{
                this.BaseRequest({
                    url: '/rcdDt/updatetixircddtprojer',
                    method: 'get',
                    params: {
                        'catg_id': this.typeCode,
                        'proj_id': this.proj_id,
                        'catg_name': this.editformData_ll.inClaNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        this.$emit("getTableData_LL");
                        this.$emit("getMenuData_edit_LL");
                        this.closeModal();
                    }
                })
            }
        },
        closeModal() {
            this.addShowModalPage_ll = false;
            this.editShowModalPage_ll = false;
            this.addformData_ll.inClaNm = "";
            this.editformData_ll.inClaNm = "";
        },
        deleteFld (row) {
            this.$confirm('确认要删除该指标类别', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.BaseRequest({
                    url: '/rcdDt/deletrcddtcatg',
                    method: 'get',
                    params: {catg_id: row.catg_id}
                }).then(data => {
                    if (data == 'success') {
                        this.$message.success('删除成功')
                        this.$emit("getTableData_LL")
                    } else {
                        this.$message.error('删除失败，该指标类别下的指标已在任务中使用')
                    }
                })
            }).catch(() => {
                return false
            })
        }
    },
    created () {

    }
}
</script>
