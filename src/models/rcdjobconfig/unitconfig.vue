<template>
  <el-container>
    <el-aside style="width: 20%">
      <el-tree
        :data="treeData"
        node-key="job_id"
        @node-click="handleNodeClick"
        :expand-on-click-node="false"
        :default-expanded-keys="[-1]"
        :highlight-current="true"
        ref="treeBox"
      ></el-tree>
    </el-aside>
    <el-main>
      <div style="text-align:left">
        <el-button :disabled="treeId === -1" @click="insertUnit" size="mini" type="primary">新增任务组</el-button>
      </div>
      <el-table :header-cell-style="{background:'#f6f6f7'}" :data="tableData" style="width: 90%" size="mini" border stripe>
        <el-table-column type="index" width="100" label="任务组编码" :resizable="false"></el-table-column>
        <el-table-column prop="job_unit_name" label="任务组名称" :resizable="false"></el-table-column>
        <el-table-column label="状态" :resizable="false">
          <template slot-scope="scope">
            <span
              :style="scope.row.job_unit_active == 0 ? 'color:red':'color:blue'"
            >{{scope.row.job_unit_active == 0 ? "停用":"启用"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :resizable="false">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="fldconfig(scope.row)">指标</el-button>
            <el-button type="text" size="mini" @click="deletercdjobunitconfig(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPageIndex"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, prev, pager, next, jumper">
    </el-pagination>
    </el-main>
    <!-- 新增任务组弹窗 -->
    <el-dialog
      title="新增任务组"
      :visible.sync="unitDialogVisible"
      :close-on-click-modal="false"
      width="30%">
      <el-form :model="insertJobForm">
        <el-form-item class="public" label="任务组名称：">
          <el-input v-model="insertJobForm.job_unit_name" placeholder="请输入任务组名称"></el-input>
        </el-form-item>
        <el-form-item class="public" label="任务组状态：">
          <el-select style="width:100%" v-model="insertJobForm.job_unit_active">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="public" label="任务组类型：">
          <el-select style="width:100%" v-model="insertJobForm.job_unit_type">
            <el-option
              v-for="item in unittype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="canel">
          <el-button @click="unitDialogVisible = false" type="primary">取消</el-button>
          <el-button @click="subUnitconfig" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 任务组关联指标弹窗 -->
    <el-dialog
      title="选择指标"
      :visible.sync="flgDialogVisible"
      :close-on-click-modal="false"
      width="30%">
      <div style="width:80%">
        <el-tree
          :data="flgTreeData"
          node-key="fld_id"
          show-checkbox
          :highlight-current="true"
          :default-expanded-keys="activeRcdt"
          ref="tree"
        ></el-tree>
        <div style="text-align:right;margin-top:30px">
          <el-button @click="flgDialogVisible = false" type="primary">取消</el-button>
          <el-button @click="subFlg" type="primary">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </el-container>
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
      treeData: [
        {
          label: '填报任务',
          job_id: -1,
          children: []
        }
      ],
      tableData: [],
      flgTreeData: [],
      unitDialogVisible: false,
      flgDialogVisible: false,
      treeId: '',
      insertJobForm: {job_unit_name: '', job_unit_type: 0, job_unit_active: 0},
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 }
      ],
      unittype: [
        { label: '单项', value: 1 },
        { label: '表格', value: 0 }
      ],
      keyWorld: '',
      nodeList: [],
      jobUnitid: [],
      activeList: [],
      current: {},
      activeRcdt: []
    }
  },
  methods: {
    // 左侧菜单
    leftTreeList () {
      this.BaseRequest({
        url: '/reporting/leftrcdjobconfig',
        method: 'get'
      }).then(data => {
        if (data.length > 0) {
          data.map(item => {
            this.treeData[0].children.push({
              label: item.job_name,
              job_id: item.job_id,
              id: item.job_id
            })
          })
        }
        this.$nextTick(() => {
          this.$refs.treeBox.setCurrentKey(data[0].job_id)
        })
      })
    },
    // 新增任务组
    insertUnit () {
      this.unitDialogVisible = true
      this.insertJobForm = {job_unit_name: '', job_unit_type: 0, job_unit_active: 0}
    },
    // 任务组列表
    unitList () {
      this.BaseRequest({
        url: '/reporting/rcdjobunitconfiglist',
        method: 'get',
        params: {
          currPage: this.pagination.currentPageIndex,
          pageSize: this.pagination.pageSize,
          job_id: this.treeId ? this.treeId : 1
        }
      }).then(data => {
        this.tableData = data.dataList
        this.pagination.total = data.totalNum
        this.pagination.currentPageIndex = data.currPage
        this.pagination.pageSize = data.pageSize
      })
    },
    // 提交新增
    subUnitconfig () {
      this.BaseRequest({
        url: '/reporting/insertrcdjobunitconfig',
        method: 'get',
        params: {
          job_id: this.treeId ? this.treeId : 1,
          ...this.insertJobForm
        }
      }).then(data => {
        this.unitDialogVisible = false
        if (data === 'success') {
          this.unitList()
          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    // 删除任务组
    deletercdjobunitconfig (row) {
      this.$confirm('确认要删除该任务组吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.BaseRequest({
          url: '/reporting/deletercdjobunitconfig',
          method: 'get',
          params: {
            job_unit_id: row.job_unit_id
          }
        }).then(data => {
          if (data === 'success') {
            this.$message.success('删除成功')
            this.unitList()
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        return false
      })
    },
    // 左侧导航点击节点
    handleNodeClick (node) {
      this.treeId = node.job_id
      if (node.job_id === -1) {
        return false
      }
      this.unitList(node)
    },
    // 指标
    fldconfig (row) {
      this.flgDialogVisible = true
      this.current = row
      this.selectrcdjobunitfld()
    },
    // 关联指标一级菜单
    leftrcddtMenuSt () {
      this.BaseRequest({
        url: '/rcdDt/leftrcddtproj',
        method: 'get'
      }).then(data => {
        if (data.length > 0) {
          data.map(item => {
            this.flgTreeData.push({
              label: item.proj_name,
              proj_id: item.proj_id,
              disabled: true,
              children: []
            })
            this.leftrcddtMenuNd(item.proj_id)
          })
        }
      })
    },
    // 关联指标二级菜单
    leftrcddtMenuNd (projId) {
      this.BaseRequest({
        url: '/rcdDt/leftrcddtcatg',
        method: 'get',
        params: {proj_id: projId}
      }).then(data => {
        if (data.length > 0) {
          this.flgTreeData.map(item => {
            if (item.proj_id === projId) {
              item.children = []
              data.map(element => {
                this.leftrcddtMenuRd(element.catg_id)
                item.children.push({
                  label: element.catg_name,
                  catg_id: element.catg_id,
                  children: [],
                  disabled: true
                })
              })
            }
          })
        }
      })
    },
    // 关联指标三级菜单
    leftrcddtMenuRd (catgId) {
      this.BaseRequest({
        url: '/rcdDt/leftrcddtfld',
        method: 'get',
        params: {catg_id: catgId}
      }).then(data => {
        if (data.length > 0) {
          this.flgTreeData.map(item => {
            if (item.children.length > 0) {
              item.children.map(element => {
                if (element.catg_id === catgId) {
                  element.disabled = false
                  element.children = []
                  data.map(rcdt => {
                    element.children.push({
                      label: rcdt.fld_name,
                      fld_id: rcdt.fld_id
                    })
                  })
                }
              })
            }
          })
        }
      })
    },
    // 获取任务组已经绑定的指标
    selectrcdjobunitfld () {
      this.BaseRequest({
        url: '/reporting/selectrcdjobunitfld',
        method: 'get',
        params: {
          job_unit_id: this.current.job_unit_id
        }
      }).then(data => {
        this.$refs.tree.setCheckedNodes(data)
        this.activeRcdt = []
        data.map(item => {
          this.activeRcdt.push(item.fld_id)
        })
      })
    },
    // 提交选择指标
    subFlg () {
      this.nodeList = this.$refs.tree.getCheckedNodes()
      this.jobUnitid = []
      this.nodeList.map(item => {
        if (item.fld_id) {
          this.jobUnitid.push(item.fld_id)
        }
      })
      this.BaseRequest({
        url: '/reporting/rcdjobunitfld',
        method: 'get',
        params: {
          fld_id: this.jobUnitid.join(','),
          jobunitid: JSON.stringify(this.current.job_unit_id)
        }
      }).then(data => {
        if (data === 'success') {
          this.flgDialogVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
          this.flgDialogVisible = false
        }
      })
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.pagination.currentPageIndex = val
    }
  },
  created () {
    this.leftTreeList()
    this.unitList()
    this.leftrcddtMenuSt()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rcdjobconfig/unitconfig.scss';
</style>
