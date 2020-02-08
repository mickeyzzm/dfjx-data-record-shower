<template>
  <div class="main">
    <div class="query">
      <el-input v-model="keyWorld" clearable size="mini" style="width:15%;" placeholder="请输入填报人名称"></el-input>
      <el-button type="primary" @click="rcdusercgList">查询</el-button>
      <el-button type="primary" @click="insertUser">新增填报人</el-button>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{background:'#f6f6f7'}"
    size="mini"
    border
    stripe>
      <el-table-column prop="user_id" width="100" label="填报人编号" :resizable="false"></el-table-column>
      <el-table-column prop="origin_name" label="填报人所属机构" :resizable="false"></el-table-column>
      <el-table-column prop="user_name_cn" label="填报人姓名" :resizable="false"></el-table-column>
      <el-table-column label="操作" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editUser(scope.row)">编辑</el-button>
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
      :title="title + '填报人'"
      :visible.sync="dialogVisible "
      :close-on-click-modal="false"
      @opened="opened"
      @close="isResquest = false"
      width="50%">
      <el-container>
        <el-aside style="width:30%">
          <el-tree
            :data="treeData"
            node-key="id"
            @node-click="handleNodeClick"
            :default-expanded-keys="active"
            :highlight-current="true"
            :props="defaultProps"
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
            <el-table-column prop="user_id" width="120" label="用户Id" :resizable="false"></el-table-column>
            <el-table-column prop="user_name_cn" label="用户名称" :resizable="false"></el-table-column>
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
      treeData: [],
      rcdusercgTable: [],
      current: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      currentNode: '',
      userid: [],
      active: [],
      currentRow: {},
      title: ''
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
    opened () {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.currentRow.origin_id)
      })
      this.active = []
      this.active.push(this.currentRow.origin_id)
    },
    insertUser () {
      this.dialogVisible = true
      this.title = '新增'
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
    },
    // 提交新增填报人
    subRcdusercg () {
      if (this.current.length > 0) {
        this.userid = []
        this.current.map(item => {
          this.userid.push(item.user_id)
        })
        this.BaseRequest({
          url: '/reporting/insertrcdpersonconfig',
          method: 'get',
          params: {
            origin_id: this.currentNode,
            userid: this.userid.join(',')
          }
        }).then(data => {
          if (data === 'success') {
            this.rcdusercgList()
            this.dialogVisible = false
            this.$message.success('添加成功')
            this.$nextTick(() => {
              this.$refs.multipleTable.clearSelection()
            })
          } else {
            this.$message.error('添加失败')
          }
        })
      } else {
        this.$message('未选择填报人')
      }
    },
    // 点击节点
    handleNodeClick (node) {
      if (this.current.length > 0) {
        this.$confirm('检测有已经选择未提交的数据，是否保存?', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.subRcdusercg()
        }).catch(() => {
          this.useroriginassignlist(node)
        })
      } else {
        this.useroriginassignlist(node)
      }
    },
    // 点击节点获取对应表
    useroriginassignlist (node) {
      if (node.id > 1) {
        this.BaseRequest({
          url: '/reporting/useroriginassignlist',
          method: 'get',
          params: {origin_id: node.id}
        }).then(data => {
          if (data.length > 0) {
            this.currentNode = node.id
            this.rcdusercgTable = data
          }
        })
      }
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
    // 修改填报人
    editUser (row) {
      this.currentRow = row
      this.dialogVisible = true
      this.title = '修改'
      this.BaseRequest({
        url: '/reporting/useroriginassignlist',
        method: 'get',
        params: {origin_id: row.origin_id}
      }).then(data => {
        this.rcdusercgTable = data
        this.selectedUser(row)
      })
    },
    // 获取已选择的用户
    selectedUser (row) {
      this.BaseRequest({
        url: '/reporting/selectrcdpersonconfig',
        method: 'get',
        params: {
          origin_id: row.origin_id
        }
      }).then(checkeddata => {
        checkeddata.map(item => {
          this.rcdusercgTable.map((element, index) => {
            if (element.user_id === item.user_id) {
              this.$nextTick(() => {
                this.$refs.multipleTable.toggleRowSelection(this.rcdusercgTable[index])
              })
            }
          })
        })
      })
    },
    // 选择填报人
    handlecheck (value) {
      this.current = value
    },
    // 获取组织结构
    getOriginDatas () {
      this.BaseRequest({
        url: '/reporting/getOriginDatas',
        method: 'get'
      }).then(data => {
        this.treeData = data.list
      })
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
  },
  mounted () {
    this.getOriginDatas()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rcdjobconfig/rcdusercg.scss';
</style>
