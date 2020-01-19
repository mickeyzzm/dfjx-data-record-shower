<template>
  <div class="main">
    <div class="query">
      <el-input v-model="keyWorld" size="mini" style="width:15%;" placeholder="请输入填报人名称"></el-input>
      <el-button type="primary" @click="rcdusercgList">查询</el-button>
      <el-button type="primary" @click="addRcdusercg">新增填报人</el-button>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{background:'#f6f6f7'}"
    size="mini"
    border
    stripe>
      <el-table-column type="index" width="100" label="填报人编号" :resizable="false"></el-table-column>
      <el-table-column prop="origin_name" label="填报人所属机构" :resizable="false"></el-table-column>
      <el-table-column prop="user_name" label="填报人姓名" :resizable="false"></el-table-column>
      <el-table-column label="操作" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPageIndex"
      :page-sizes="[10, 15, 20]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    ></el-pagination>
    <!-- 新增填报人弹窗 -->
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
            :header-cell-style="{background:'#f6f6f7'}"
            border
            stripe
            ref="multipleTable"
            >
            <el-table-column type="selection" :resizable="false"></el-table-column>
            <el-table-column type="index" width="120" label="用户Id" :resizable="false"></el-table-column>
            <el-table-column prop="rcdusercgNm" label="用户名称" :resizable="false"></el-table-column>
          </el-table>
          <div style="text-align:right;margin-top:40px;">
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
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
      // 分页
      pagination: {
        total: 0,
        currentPageIndex: 1,
        pageSize: 10
      },
      keyWorld: '',
      tableData: [],
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
      current: []
    }
  },
  methods: {
    // 获取填报人列表
    rcdusercgList () {
      this.BaseRequest({
        url: '/reporting/rcdpersonconfiglist',
        method: 'get',
        params: {
          currPage: this.pagination.currentPageIndex,
          pageSize: this.pagination.pageSize,
          user_name: this.keyWorld
        }
      }).then(data => {
        this.tableData = data.dataList
        this.pagination.total = data.dataList.length
      })
    },
    // 新增填报人
    addRcdusercg () {
      this.dialogVisible = true
      this.BaseRequest({
        url: '/reporting/getOriginDatas',
        method: 'get'
      }).then(data => {
        console.log(data)
      })
    },
    // 点击节点
    handleNodeClick (data) {

    },
    // 确认
    subRcdusercg () {
      this.dialogVisible = false
    },
    // 删除
    deleteUser (row) {
      this.$confirm('确认要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.BaseRequest({
          url: '/reporting/deletercdpersonconfig',
          method: 'get',
          params: {
            user_id: row.user_id
          }
        }).then(data => {
          if (data === 'success') {
            this.$message.success('删除成功')
            this.rcdusercgList()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        return false
      })
    },
    handlecheck (value) {
      this.currentData = value
    },
    close () {
      this.$refs.multipleTable.clearSelection()
    },
    // 页数改变
    handleSizeChange (val) {
      this.pagination.pageSize = val
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.pagination.currentPageIndex = val
    }
  },
  created () {
    this.rcdusercgList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rcdjobconfig/rcdusercg.scss';
</style>
