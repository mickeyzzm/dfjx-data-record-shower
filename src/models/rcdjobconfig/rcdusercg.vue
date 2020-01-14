<template>
  <div class="main">
    <div class="query">
      <el-input v-model="keyWorld" size="mini" style="width:15%;" placeholder="请输入任务名称"></el-input>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="addRcdusercg">新增填报人</el-button>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    size="mini"
    border
    stripe>
      <el-table-column type="index" width="100" label="填报人编号" :resizable="false"></el-table-column>
      <el-table-column prop="rcdusercg" label="填报人所属机构" :resizable="false"></el-table-column>
      <el-table-column prop="rcdusercgNm" label="填报人姓名" :resizable="false"></el-table-column>
      <el-table-column label="操作" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增联系人弹窗 -->
    <el-dialog
      title="新增填报人"
      :visible.sync="dialogVisible "
      :close-on-click-modal="false"
      @close="close"
      width="50%">
      <el-container>
        <el-aside style="width:30%">
          <el-tree
            :data="treeData"
            node-key="id"
            @node-click="handleNodeClick"
            :default-expanded-keys="[1]"
            :highlight-current="true"
            ref="tree"
          ></el-tree>
        </el-aside>
        <el-main style="padding: 0 20px;">
          <el-table
            :data="rcdusercgTable"
            style="width: 100%"
            size="mini"
            @selection-change="handlecheck"
            border
            stripe
            ref="multipleTable"
            >
            <el-table-column type="selection" :resizable="false"></el-table-column>
            <el-table-column type="index" width="120" label="用户Id" :resizable="false"></el-table-column>
            <el-table-column prop="rcdusercgNm" label="用户名称" :resizable="false"></el-table-column>
          </el-table>
          <div style="text-align:right;margin-top:40px;">
            <el-button type="primary" @click="canelRcdusercg">取消</el-button>
            <el-button style="margin-right:0;" type="primary" @click="subRcdusercg">确认</el-button>
          </div>
        </el-main>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyWorld: '',
      tableData: [
        {
          rcdusercg: 'xx委员会',
          rcdusercgNm: '张三'
        },
        {
          rcdusercg: 'xx居委会',
          rcdusercgNm: '李四'
        },
        {
          rcdusercg: 'xx公司',
          rcdusercgNm: '王五'
        }
      ],
      dialogVisible: false,
      treeData: [
        {
          label: '组织结构',
          id: 0,
          children: [
            {
              label: '大兴区信访局',
              id: 1,
              children: [
                {
                  label: 'xx镇信访局',
                  id: 1.1
                },
                {
                  label: 'xx街道信访局',
                  id: 1.2
                }
              ]
            },
            {
              label: '中国某某公司',
              id: 2,
              children: [
                {
                  label: '北京xx公司',
                  id: 2.1,
                  children: [
                    {
                      label: '大兴xx公司'
                    }
                  ]
                }
              ]
            },
            {
              label: '大兴区某某局',
              id: 3,
              children: [
                {
                  label: 'xx街道办事处',
                  id: 3.1
                }
              ]
            }
          ]
        }
      ],
      rcdusercgTable: [],
      rcdusercgTable1: [
        {rcdusercgNm: '张三'},
        {rcdusercgNm: '李四'}
      ],
      currentData: []
    }
  },
  methods: {
    // 查询
    query () {
      console.log(this.optionValue + 'hh')
    },
    // 新增填报人
    addRcdusercg () {
      this.dialogVisible = true
      this.rcdusercgTable = this.rcdusercgTable1
      this.$nextTick(function () {
        this.$refs.tree.setCurrentKey(1.1)
      })
    },
    // 点击节点
    handleNodeClick (data) {
    },
    // 取消
    canelRcdusercg () {
      this.dialogVisible = false
    },
    // 确认
    subRcdusercg () {
      this.dialogVisible = false
    },
    handlecheck (value) {
      this.currentData = value
    },
    close () {
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rcdjobconfig/rcdusercg.scss';
</style>
