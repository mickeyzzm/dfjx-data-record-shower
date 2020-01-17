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
        ref="tree"
      ></el-tree>
    </el-aside>
    <el-main>
      <div style="text-align:left">
        <el-button :disabled="treeId === -1" @click="unitDialogVisible = true" size="mini" type="primary">新增任务组</el-button>
      </div>
      <el-table :header-cell-style="{background:'#f6f6f7'}" :data="tableData" style="width: 90%" size="mini" border stripe>
        <el-table-column type="index" width="100" label="指标编码" :resizable="false"></el-table-column>
        <el-table-column prop="job_unit_name" label="指标名称" :resizable="false"></el-table-column>
        <el-table-column label="状态" :resizable="false">
          <template slot-scope="scope">
            <span
              :style="scope.row.job_unit_active === 0 ? 'color:red':'color:blue'"
            >{{scope.row.job_unit_active === 0 ? "停用":"启用"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :resizable="false">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="fldconfig(scope.row)">指标</el-button>
            <el-button type="text" size="mini">删除</el-button>
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
              :label="item.name"
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
          node-key="id"
          @node-click="handleNodeClickFlg"
          :default-expanded-keys="[1.1]"
          :default-checked-keys="jobUnitid"
          show-checkbox
          :highlight-current="true"
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
      options: [
        { name: '启用', value: 1 },
        { name: '停用', value: 0 }
      ],
      insertJobForm: {job_unit_name: '', job_unit_active: 0},
      keyWorld: '',
      nodeList: [],
      jobUnitid: [],
      current: {}
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
      })
    },
    // 任务组列表
    unitList (node) {
      this.BaseRequest({
        url: '/reporting/rcdjobunitconfiglist',
        method: 'get',
        params: {
          currPage: this.pagination.currentPageIndex,
          pageSize: this.pagination.pageSize,
          job_id: node ? node.job_id : 1
        }
      }).then(data => {
        this.tableData = data.dataList
        this.pagination.total = this.tableData.length
      })
    },
    // 提交新增
    subUnitconfig () {
      this.BaseRequest({
        url: '/reporting/insertrcdjobunitconfig',
        method: 'get',
        params: {
          job_id: 1,
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
    // 左侧导航点击节点
    handleNodeClick (node) {
      this.treeId = node.job_id
      this.unitList(node)
    },
    // 关联指标菜单
    leftrcddtMenu () {
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
          })
        }
      })
    },
    // 指标
    fldconfig (row) {
      this.leftrcddtMenu()
      this.flgDialogVisible = true
      this.current = row
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
          fld_id: JSON.stringify(this.current.job_unit_id),
          jobunitid: this.jobUnitid.join(',')
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
    // 指标点击节点
    handleNodeClickFlg (node) {
      if (node.proj_id) {
        this.BaseRequest({
          url: '/rcdDt/leftrcddtcatg',
          method: 'get',
          params: {proj_id: node.proj_id}
        }).then(data => {
          if (data.length > 0) {
            this.flgTreeData.map(item => {
              if (item.proj_id === node.proj_id) {
                item.children = []
                data.map(element => {
                  item.children.push({
                    label: element.catg_name,
                    catg_id: element.catg_id,
                    children: []
                  })
                })
              }
            })
          }
        })
      } else if (node.catg_id) {
        this.BaseRequest({
          url: '/rcdDt/leftrcddtfld',
          method: 'get',
          params: {catg_id: node.catg_id}
        }).then(data => {
          if (data.length > 0) {
            this.flgTreeData.map(item => {
              item.children.map(element => {
                if (element.catg_id === node.catg_id) {
                  element.children = []
                  data.map(rcdt => {
                    element.children.push({
                      label: rcdt.fld_name,
                      fld_id: rcdt.fld_id
                    })
                  })
                }
              })
            })
          }
        })
      } else {
        return false
      }
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
    this.leftTreeList()
    this.unitList()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/rcdjobconfig/unitconfig.scss';
</style>
