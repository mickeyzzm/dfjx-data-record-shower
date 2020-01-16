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
        <div v-show="boxContent_l">
            <LCountent></LCountent>
        </div> 
        <div v-show="itemContent_ll">
             <LLCountent :tableData_ll = tableData_ll></LLCountent>
        </div>
        <div v-show="itemContent_lll">
            <LLLCountent :tableData_lll = tableData_lll></LLLCountent>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import LCountent from './fld_compontents/LCountent';//一级菜单
import LLCountent from './fld_compontents/LLCountent';//二级菜单
import LLLCountent from './fld_compontents/LLLCountent';//三级菜单
export default {
    data () {
        return {
            boxContent_l:false,
            itemContent_ll:false,
            itemContent_lll:false,
            isEmpoty:[
                {
                    name:"否",
                    id:"0",
                },{
                    name:"是",
                    id:"1",
                }
            ],
            treeId: 0,
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
                                id: 1.1,
                                children: [
                                    {
                                        label: '年龄',
                                    },
                                    {
                                        label: '性别',
                                    },
                                    {
                                        label: '是否已婚',
                                    },
                                    {
                                        label: '籍贯',
                                    }
                                ]
                            },
                            {
                                label: '教育信息',
                                id: 1.2,
                                children: [
                                    {
                                        label: '教育程度',
                                    },
                                    {
                                        label: '就读小学',
                                    },
                                    {
                                        label: '就读中学',
                                    }
                                ]
                            },
                            {
                                label: '资产信息',
                                id: 1.3,
                                children: [
                                    {
                                        label: '是否自有房产',
                                    },
                                    {
                                        label: '月薪区间',
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
            tableData0: [],
            tableData_ll: [],
            tableData_lll:[],
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
            tableData3: [
                {
                    inClaCode: '1',
                    inClaNm: '基本信息',
                    subfidClass: '人',
                },
            ],
            tableData4: [
                {
                    inClaCode: '1',
                    inClaNm: '资产状况',
                    subfidClass: '人',
                },
            ],
            tableData5: [
                {
                    inCode: '1',
                    inNm: '年龄',
                    subClass: '基本信息',
                    subfidClass: '人',
                },
            ],
            tableData6: [
                {
                    inCode: '1',
                    inNm: '教育程度',
                    subClass: '教育信息',
                    subfidClass: '人',
                },
            ],
            tableData7: [
                {
                    inCode: '1',
                    inNm: '房子',
                    subClass: '资产信息',
                    subfidClass: '人',
                },
            ],
        }
    },
    components: {
        LCountent,
        LLCountent,
        LLLCountent,
    },
    methods: {
        // 点击节点
        handleNodeClick (data) {
            if (data.id == 0) {
                this.tableData0 = [];
                this.boxContent_l = true;
                this.itemContent_lll = false;
                this.itemContent_ll = false;
                // this.tableData0 = this.tableDataBox;
            } else if (data.id == 1) {
                this.tableData_ll = [];
                this.itemContent_ll = true;
                this.itemContent_lll = false;
                this.boxContent_l = false;
                this.tableData_ll = this.tableData1;
            } else if (data.id == 2) {
                this.tableData_ll = [];
                this.itemContent_ll = true;
                this.itemContent_lll = false;
                this.boxContent_l = false;
                this.tableData_ll = this.tableData2;
            } else if (data.id == 3) {
                this.tableData_ll = [];
                this.itemContent_ll = true;
                this.itemContent_lll = false;
                this.boxContent_l = false;
                this.tableData_ll = this.tableData3;
            }else if (data.id == 4) {
                this.tableData_ll = [];
                this.itemContent_ll = true;
                this.itemContent_lll = false;
                this.boxContent_l = false;
                this.tableData_ll = this.tableData4;
            }else if (data.id == 1.1) {
                this.tableData_lll = [];
                this.itemContent_lll = true;
                this.itemContent_ll = false;
                this.boxContent_l = false;
                this.tableData_lll = this.tableData5;
            }else if (data.id == 1.2) {
                this.tableData_lll = [];
                this.itemContent_lll = true;
                this.itemContent_ll = false;
                this.boxContent_l = false;
                this.tableData_lll = this.tableData6;
            }else if (data.id == 1.3) {
                this.tableData_lll = [];
                this.itemContent_lll = true;
                this.itemContent_ll = false;
                this.boxContent_l = false;
                this.tableData_lll = this.tableData7;
            }
        },
        closeModal: function () {
            
        },
    },
    created () {
        this.$nextTick(function () {
            this.$refs.tree.setCurrentKey(0);
        })
        this.boxContent_l = true;
        // this.tableData0 = this.tableDataBox;
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