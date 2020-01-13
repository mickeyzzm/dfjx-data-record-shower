<template>
  <el-container>
    <el-aside style="width: 20%">
      <el-tree
        :data="treeData"
        node-key="id"
        @node-click="handleNodeClick"
        :default-expanded-keys="[1]"
        :highlight-current="true"
        ref="tree"
      ></el-tree>
    </el-aside>
    <el-main>
      <div style="text-align:left">
        <el-button :disabled="treeId === 0" @click="addUnitconfig" size="mini" type="primary">新增任务组</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 90%"
        size="mini"
        border
        stripe
        >
        <el-table-column type="index" width="100" label="指标编码" :resizable="false"></el-table-column>
        <el-table-column prop="unitconfigNm" label="指标名称" :resizable="false"></el-table-column>
        <el-table-column label="状态" :resizable="false">
          <template slot-scope="scope">
            <span
              :style="scope.row.unitconfigState === 0 ? 'color:red':'color:blue'"
            >{{scope.row.unitconfigState === 0 ? '停用':'启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :resizable="false">
          <template slot-scope="scope">
            <el-button type="text" size="mini">{{scope.row.unitconfigState === 0 ? '启用':'停用'}}</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      title="新增任务组"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%">
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
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="canel">
            <el-button type="primary">取消</el-button>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
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
          unitconfigState: 1
        },
        {
          unitconfigNm: '四年级在读学生信息',
          unitconfigState: 1
        },
        {
          unitconfigNm: '五年级在读学生信息',
          unitconfigState: 1
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
      dialogVisible: false,
      treeId: 1,
      options: [
        {name: '启用', value: 1},
        {name: '停用', value: 0}
      ],
      value: 1,
      keyWorld: ''
    }
  },
  methods: {
    // 新增任务组
    addUnitconfig () {
      this.dialogVisible = true
    },
    // 点击节点
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
.el-container {
  height: 100%;
  padding: 30px 20px;
}
.el-main {
  padding-top: 0;
  padding-left: 50px;
}
.el-table {
  margin-top: 20px;
}
.el-aside {
  border-right: 1px solid #c0c4cc;
}
/deep/ .el-dialog__header {
  border-bottom: 1px solid #c0c4cc;
}
/deep/ .el-dialog__header .el-dialog__title{
  font-size: 16px;
  padding-top: 10px;
}
.el-form .el-form-item:nth-child(1),.el-form-item:nth-child(2) {
  display: flex;
}
.el-form {
  padding: 0 20px;
}
/deep/ .public .el-form-item__content {
  flex: 3;
}
/deep/ .canel .el-form-item__content {
  text-align: right;
}
.canel {
  margin: 30px 0 0 0;
}
</style>
