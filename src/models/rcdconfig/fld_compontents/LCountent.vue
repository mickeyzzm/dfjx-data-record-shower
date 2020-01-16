<template>
    <div>
        <div style="text-align:left;margin-bottom:10px">
            <el-button @click="addUnitconfigBox" size="mini" type="primary">新增指标基本类别</el-button>
        </div>
        <el-table
            :data="tableDataBox"
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
                prop="subClasNm"
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
            tableDataBox: [
                {
                    indexCode:"1",
                    subClasNm:"人"
                },
                {
                    indexCode:"2",
                    subClasNm:"物"
                },
                {
                    indexCode:"3",
                    subClasNm:"地"
                },
                {
                    indexCode:"4",
                    subClasNm:"组织"
                },
            ],
            typeCode:"",
        }
    },
    methods: {
        addUnitconfigBox () {//一级新增
            this.addShowModalPageBox = true;
        },
        addSubmitDataFormBox: function () {//一级新增弹窗
            if (this.addformDataBox.subClasNm == "" || this.addformDataBox.isEffective == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformDataBox.subClasNm,
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
            this.editformDataBox.subClasNm = row.subClasNm;
            this.typeCode = row.typeCode;
        },
        editSubmitDataFormBox: function () {//一级编辑弹窗 
            if (this.editformDataBox.subClasNm == "" || this.editformDataBox.isEffective == "" ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                        'person_id': this.typeCode,
                        'person_nm': this.editformDataBox.subClasNm,
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
        closeModal: function () {
            this.addformDataBox.isEffectiveNm ="";
            this.addformDataBox.subClasNm ="";
            this.editformDataBox.isEffective ="";
            this.addShowModalPageBox = false;
            this.editShowModalPageBox = false;
        },
    },
    created () {
        
    }
}
</script>