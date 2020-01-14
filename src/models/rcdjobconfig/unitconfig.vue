<template>
  <el-container>
    <el-aside style="width: 20%">
      <el-tree
        :data="treeData"
        node-key="id"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :default-expanded-keys="[1]"
        :highlight-current="true"
        ref="tree"
      ></el-tree>
    </el-aside>
    <el-main>
      <div style="text-align:left">
        <el-button :disabled="treeId === 0" @click="Unitconfig" size="mini" type="primary">新增任务组</el-button>
      </div>
      <el-table :data="tableData" style="width: 90%" size="mini" border stripe>
        <el-table-column type="index" width="100" label="指标编码" :resizable="false"></el-table-column>
        <el-table-column prop="unitconfigNm" label="指标名称" :resizable="false"></el-table-column>
        <el-table-column label="状态" :resizable="false">
          <template slot-scope="scope">
            <span
              :style="scope.row.unitconfigState === 0 ? 'color:red':'color:blue'"
            >{{scope.row.unitconfigState === 0 ? "停用":"启用"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :resizable="false">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="fldconfig(scope.row)">指标</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <!-- 新增任务组弹窗 -->
    <el-dialog
      title="新增任务组"
      :visible.sync="unitDialogVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form>
        <el-form-item class="public" label="任务组名称：">
          <el-input v-model="keyWorld" placeholder="请输入任务组名称"></el-input>
        </el-form-item>
        <el-form-item class="public" label="任务组状态：">
          <el-select style="width:100%" v-model="value">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="canel">
          <el-button @click="canelUnitconfig" type="primary">取消</el-button>
          <el-button @click="subUnitconfig" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 任务组关联指标弹窗 -->
    <el-dialog
      title="指标"
      :visible.sync="flgDialogVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <div style="width:80%">
        <el-tree
          :data="flgTreeData"
          node-key="id"
          @node-click="handleNodeClickFlg"
          :default-expanded-keys="[1.1]"
          show-checkbox
          :highlight-current="true"
          ref="tree"
        ></el-tree>
        <div style="text-align:right;margin-top:30px">
          <el-button type="primary">取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      treeData: [
        {
          label: '填报任务',
          id: 0,
          children: [
            {
              label: '小学在读学生信息',
              id: 1
            },
            {
              label: '1月份蔬菜价格统计',
              id: 2
            },
            {
              label: '12月份蔬菜价格统计',
              id: 3
            }
          ]
        }
      ],
      tableData: [],
      flgTreeData: [
        {
          label: '人',
          id: 1,
          disabled: true,
          children: [
            {
              label: '基本信息',
              id: 1.1,
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
          id: 2,
          disabled: true
        },
        {
          label: '物',
          id: 3,
          disabled: true
        },
        {
          label: '组织',
          id: 4,
          disabled: true
        }
      ],
      tableData1: [
        {
          unitconfigNm: '一年级在读学生信息',
          unitconfigState: 1
        },
        {
          unitconfigNm: '二年级在读学生信息',
          unitconfigState: 1
        },
        {
          unitconfigNm: '三年级在读学生信息',
          unitconfigState: 0
        },
        {
          unitconfigNm: '四年级在读学生信息',
          unitconfigState: 1
        },
        {
          unitconfigNm: '五年级在读学生信息',
          unitconfigState: 0
        },
        {
          unitconfigNm: '六年级在读学生信息',
          unitconfigState: 1
        }
      ],
      tableData2: [
        {
          unitconfigNm: '本地蔬菜价格',
          unitconfigState: 1
        },
        {
          unitconfigNm: '外地蔬菜价格',
          unitconfigState: 1
        },
        {
          unitconfigNm: '进口蔬菜价格',
          unitconfigState: 0
        }
      ],
      tableData3: [
        {
          unitconfigNm: '进口蔬菜价格',
          unitconfigState: 0
        },
        {
          unitconfigNm: '外地蔬菜价格',
          unitconfigState: 1
        },
        {
          unitconfigNm: '本地蔬菜价格',
          unitconfigState: 0
        }
      ],
      unitDialogVisible: false,
      flgDialogVisible: false,
      treeId: 1,
      options: [{ name: '启用', value: 1 }, { name: '停用', value: 0 }],
      value: 1,
      keyWorld: ''
    }
  },
  methods: {
    // 新增任务组
    Unitconfig () {
      this.unitDialogVisible = true
    },
    // 取消新增
    canelUnitconfig () {
      this.unitDialogVisible = false
    },
    // 提交新增
    subUnitconfig () {
      this.unitDialogVisible = false
    },
    // 左侧导航点击节点
    handleNodeClick (data) {
      this.treeId = data.id
      if (this.treeId === 1) {
        this.tableData = this.tableData1
      } else if (this.treeId === 2) {
        this.tableData = this.tableData2
      } else if (this.treeId === 3) {
        this.tableData = this.tableData3
      } else if (this.treeId === 0) {
        this.treeId = 0
      }
    },
    // 指标点击节点
    handleNodeClickFlg (data) {

    },
    // 指标
    fldconfig (row) {
      this.flgDialogVisible = true
    },
    // 取消选择指标
    canelFlg () {
      this.flgDialogVisible = false
    },
    // 提交选择指标
    subFlg () {
      this.flgDialogVisible = false
    }
  },
  created () {
    this.$nextTick(function () {
      this.$refs.tree.setCurrentKey(1)
    })
    this.tableData = this.tableData1
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rcdjobconfig/unitconfig.scss';
</style>
