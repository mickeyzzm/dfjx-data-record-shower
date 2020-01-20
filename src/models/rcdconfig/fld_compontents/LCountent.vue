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
                    name:"无效",
                    id:"0",
                },{
                    name:"有效",
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
                isEffectiveNm: "",
            },
            editformDataBox: {
                subClasNm: "",
                isEffectiveNm: "",
            },
            tableDataBox: [],
            typeCode:"",
            loading:false,
        }
    },
    methods: {
        getTableData_L(pageNum_L){//一级table数据
            if (pageNum_L && pageNum_L !== '') {
                this.pageIndex_L = pageNum_L;
            } else {
                pageNum_L = this.pageIndex_L;
            }
            this.BaseRequest({
                url: '/rcdDt/selectrcddtproj',
                method: 'get',
                params: {
                    'currPage': pageNum_L,
                    'pageSize': 10,
                }
            }).then((response) => {
                // console.log(res,"一级table数据")
                this.loading = true;
                if (response) {
                    if(this.page_res_L[this.pageIndex_L]){
                        this.tableDataBox = this.page_res_L[this.pageIndex_L];
                    }else {
                        this.tableDataBox = response.dataList;
                    }
                    this.totalPage_L = response.totalNum;
                    this.pageIndex_L = response.currPage;
                } else {
                    this.tableDataBox = [];
                    this.totalPage_L = 0;
                }
                this.loading = false;
            })
        },
        // 当前页
        currentChangeHandle_L (val) {
            if(!this.page_res_L[this.pageIndex_L]){
               this.page_res_L[this.pageIndex_L] = this.tableDataBox;
            }
            this.pageIndex_L = val;
            // 获取table数据
            this.loading = true;
            this.getTableData_L(val);
        },
        addUnitconfigBox () {//一级新增
            this.addShowModalPageBox = true;
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
                        'is_actived': this.addformDataBox.isEffectiveNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.getTableData_L(1);
                        this.closeModal();
                        this.$emit("getMenuData_Add_L")
                    }
                })
            }
        },
        openEditModalBox: function (row) {//一级编辑
            this.editShowModalPageBox = true;
            this.editformDataBox.subClasNm = row.proj_name;
            this.editformDataBox.isEffectiveNm = row.is_actived==0?"无效":"有效";
            this.typeCode = row.proj_id;
        },
        editSubmitDataFormBox: function () {//一级编辑弹窗 
            if (this.editformDataBox.subClasNm == "" || this.editformDataBox.isEffectiveNm == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else if(this.editformDataBox.isEffectiveNm == "无效"){
                this.editformDataBox.isEffectiveNm = 0;
            }else if( this.editformDataBox.isEffectiveNm == "有效"){
                this.editformDataBox.isEffectiveNm = 1;
            }else{
                this.BaseRequest({
                    url: '/rcdDt/updatercddtproj',
                    method: 'get',
                    params: {
                        'proj_id': this.typeCode,
                        'proj_name': this.editformDataBox.subClasNm,
                        'is_actived': this.editformDataBox.isEffectiveNm,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('修改成功');
                        this.getTableData_L(1);
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
    },
    created () {
        this.$nextTick(function () {
            this.getTableData_L(1);
        })
    }
}
</script>