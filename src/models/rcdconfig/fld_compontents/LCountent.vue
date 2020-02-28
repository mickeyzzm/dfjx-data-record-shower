<template>
    <div>
        <div>
            <div style="text-align:left;margin-bottom:10px">
                <el-button @click="addUnitconfigBox" size="mini" type="primary">新增指标基本类别</el-button>
            </div>
            <el-table
                :data="tableDataBox"
                style="width: 80%"
                :header-cell-style="{background:'#f6f6f7',}"
                :loading="loading"
                class = "searchGrid"
                size="mini"
                border
                stripe>
                <el-table-column
                    prop="proj_id"
                    width="100"
                    label="基本类别编码"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    prop="proj_name"
                    label="基本类别名称"
                    :resizable="false">
                </el-table-column>
                <el-table-column
                    label="操作"
                    :resizable="false">
                    <template slot-scope="scope">
                        <el-button size="mini"  type="text" @click="openEditModalBox(scope.row)">编辑</el-button>
                        <el-button size="mini"  type="text" @click="deleteFld(scope.row)">删除</el-button>
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
        <!-- 一级菜单新增-->
        <el-dialog title="新增指标基本类别" :visible.sync="addShowModalPageBox" >
            <el-form  class="modal-form" label-position="right" label-width="25%" :model="addformDataBox">
                <el-form-item size="mini" label="基本类别名称：" >
                <el-input style="width:50%" v-model="addformDataBox.subClasNm" placeholder="请输入基本类别名称" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item size="mini" label="是否有效：" >
                    <el-select style="width:50%" v-model="addformDataBox.isEffectiveNm">
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
        <el-dialog title="修改指标基本类别" :visible.sync="editShowModalPageBox" >
            <el-form  class="modal-form" label-position="right" label-width="25%" :model="editformDataBox">
                <el-form-item size="mini" label="基本类别名称：" >
                    <el-input style="width:50%" v-model="editformDataBox.subClasNm" placeholder="请输入基本类别名称" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item size="mini" label="是否有效：" >
                    <el-select style="width:50%" v-model="editformDataBox.isEffectiveNm">
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
    </div>
</template>
<script>
export default {
    data () {
        return {
            isEffective:[
                {
                    name:"有效",
                    id:"0",
                },{
                    name:"无效",
                    id:"1",
                }
            ],
            pageIndex_L: 1,
            pageSize_L: 10,
            totalPage_L: 0,
            page_res_L:{},
            addShowModalPageBox:false,
            editShowModalPageBox:false,
            addformDataBox: {
                subClasNm: "",
                isEffectiveNm: "有效",
            },
            editformDataBox: {
                subClasNm: "",
                isEffectiveNm: "有效",
            },
            tableDataBox: [],
            typeCode:"",
            loading:false,
        }
    },
    methods: {
        getTableData_L(){//一级table数据
            this.BaseRequest({
                url: '/rcdDt/selectrcddtproj',
                method: 'get',
                params: {
                    'currPage': this.pageIndex_L,
                    'pageSize': this.pageSize_L,
                }
            }).then((response) => {
                this.tableDataBox = response.dataList;
                this.pageIndex_L = response.currPage,
                this.pageSize_L = response.pageSize,
                this.totalPage_L = response.totalNum,
                this.loading = false;
            })
        },
        // 当前页
        currentChangeHandle_L (val) {
            this.pageIndex_L = val;
            // 获取table数据
            this.loading = true;
            this.getTableData_L();
        },
        addUnitconfigBox () {//一级新增
            this.addShowModalPageBox = true;
            this.addformDataBox.isEffectiveNm = "有效"
        },
        addSubmitDataFormBox: function () {//一级新增弹窗
            if (this.addformDataBox.subClasNm == "" || this.addformDataBox.isEffectiveNm == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/rcdDt/insertrcddtproj',
                    method: 'get',
                    params: {
                        'proj_name': this.addformDataBox.subClasNm,
                        'is_actived': 0
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.getTableData_L();
                        this.closeModal();
                        this.$emit("getMenuData_Add_L")
                    }
                })
            }
        },
        openEditModalBox: function (row) {//一级编辑
            this.editShowModalPageBox = true;
            this.editformDataBox.subClasNm = row.proj_name;
            this.addformDataBox.isEffectiveNm = "有效"
            this.typeCode = row.proj_id;
        },
        editSubmitDataFormBox: function () {//一级编辑弹窗
            if (this.editformDataBox.subClasNm == "" || this.editformDataBox.isEffectiveNm == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/rcdDt/updatercddtproj',
                    method: 'get',
                    params: {
                        'proj_id': this.typeCode,
                        'proj_name': this.editformDataBox.subClasNm,
                        'is_actived': 0,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        this.getTableData_L();
                        this.closeModal();
                        this.$emit("getMenuData_edit_L");
                    }
                })
            }
        },
        closeModal: function () {
            this.addformDataBox.isEffectiveNm ="";
            this.addformDataBox.subClasNm ="";
            this.editformDataBox.isEffective ="";
            this.addShowModalPageBox = false;
            this.editShowModalPageBox = false;
        },
        deleteFld (row) {
            this.$confirm('确认要删除该指标基本类别', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.BaseRequest({
                    url: '/rcdDt/deletercddtproj',
                    method: 'get',
                    params: {proj_id: row.proj_id}
                }).then(data => {
                    if (data == 'success') {
                        this.$message.success('删除成功')
                        this.getTableData_L()
                        this.$emit('success')
                    } else {
                        this.$message.error('删除失败，该基本类别下的指标已在任务中使用')
                    }
                })
            }).catch(() => {
                return false
            })
        }
    },
    created () {
        this.getTableData_L()
    }
}
</script>
