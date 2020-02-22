<template>
  <div class="main">
    <div class="query">
      <el-input v-model="jobNm" clearable size="mini" placeholder="请输入任务名称"></el-input>
      <el-select v-model="jobStatus" size="mini" placeholder="请选择任务状态">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="rcdjobconfigList">查询</el-button>
      <el-button type="primary" @click="clearOption">清空选项</el-button>
      <el-button type="primary" @click="addJobconfig">新增任务</el-button>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{background:'#f6f6f7'}"
    size="mini"
    border
    stripe>
      <el-table-column type="index" width="100" label="填报任务编号" :resizable="false"></el-table-column>
      <el-table-column prop="job_name" label="填报任务名称" :resizable="false"></el-table-column>
      <el-table-column label="填报状态" :resizable="false">
        <template slot-scope="scope">
          <span v-if="scope.row.job_status === 0">正常</span>
          <span v-else-if="scope.row.job_status === 1">失效</span>
          <span v-else-if="scope.row.job_status === 2">锁定</span>
          <span v-else-if="scope.row.job_status === 3">软删除</span>
          <span v-else-if="scope.row.job_status === 4">已发布</span>
          <span v-else-if="scope.row.job_status === 5">发布中</span>
        </template>
      </el-table-column>
      <el-table-column prop="job_start_dt" column-key="date" label="填报开始时间" :resizable="false"></el-table-column>
      <el-table-column prop="job_end_dt" column-key="date" label="填报结束时间" :resizable="false"></el-table-column>
      <el-table-column label="操作" width="500" :resizable="false">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.job_status === 0" @click="editJobconfig(scope.row)" size="mini">编辑</el-button>
          <el-button type="text" v-if="scope.row.job_status === 0" @click="unitconfig(scope.row)" size="mini">填报组维护</el-button>
          <el-button type="text" v-if="scope.row.job_status === 0" @click="rcdusercg(scope.row)" size="mini">填报人维护</el-button>
          <el-button type="text" v-if="scope.row.job_status === 0" @click="makeJob(scope.row)" size="mini">任务下发</el-button>
          <el-button type="text" v-if="scope.row.job_status === 0" @click="deleteJob(scope.row)" size="mini">删除</el-button>
          <el-button type="text" v-if="scope.row.job_status === 4" @click="detailJobconfig(scope.row)" size="mini">查看</el-button>
          <el-button type="text" v-else-if="scope.row.job_status === 5" @click="detailJobconfig(scope.row)" size="mini">查看</el-button>
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
    <!-- 填报组弹窗 -->
    <el-dialog
      title="选择任务组"
      :visible.sync="unitconfigDialog"
      :close-on-click-modal="false"
      width="75%">
      <div style="width: 100%">
        <el-transfer
          v-model="value"
          :titles="['待选择任务组','已选择任务组']"
          :props="{key: 'job_unit_id', label: 'job_unit_name'}"
          :button-texts="['移除','添加']"
          :data="transferTable">
        </el-transfer>
        <div style="margin-top:10px">
          <el-button type="primary" @click="unitconfigDialog = false">取消</el-button>
          <el-button type="primary" @click="subUnitconfig" >确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 填报人弹窗 -->
    <el-dialog
      title="选择填报人"
      :visible.sync="rcdusercgDialog"
      custom-class="selrcdusercg"
      :close-on-click-modal="false"
      width="55%">
      <div style="width:80%;">
        <div style="text-align:left;margin-bottom:30px;">
        <span>请选择机构：</span>
        <el-cascader
          v-model="agencyValue"
          :options="agency"
          style="width: 35%"
          :show-all-levels="false"
          :props="props"
          placeholder="请选择机构"
          :filterable="true"
          ref="mycascader"
          @change="handleChange">
        </el-cascader>
        <el-button type="primary" @click="agencyUser">获取机构下用户</el-button>
        </div>
        <el-table
          :data="rcdusercgTable"
          style="width:100%"
          :header-cell-style="{background:'#f6f6f7'}"
          size="mini"
          @selection-change="handlecheck"
          border
          ref="multipleTable"
          stripe>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="user_id" width="130" label="填报人id" :resizable="false"></el-table-column>
          <el-table-column prop="user_name_cn" label="填报人名称" :resizable="false"></el-table-column>
        </el-table>
        <div style="margin-top:30px;text-align:right;">
          <el-button type="primary" @click="rcdusercgDialog = false">取消</el-button>
          <el-button style="margin-right:0;" type="primary" @click="subRcdusercg">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 新建、编辑、查看任务 -->
    <el-dialog
      :visible.sync="jobconfigDialog"
      :title="title + '任务'"
      :close-on-click-modal="false"
      @close="jobconfigClose"
      width="35%">
      <el-form
        :rules="rules"
        ref="ruleForm"
        :hide-required-asterisk="hide_asterisk"
        :show-message="false"
        :model="FormData">
          <el-form-item class="public" label="填报任务名称：" prop="job_name">
            <el-input style="width:100%" clearable :readonly="isRead" v-model="FormData.job_name" placeholder="请输入填报任务名称"></el-input>
          </el-form-item>
          <el-form-item v-if="!isShow" class="public" label="已选择任务组：">
            <el-dropdown v-for="item in selectedUnit" :key="item.job_unit_id" trigger="click">
              <span class="el-dropdown-link">
                {{item.job_unit_name}}<i v-if="item.unitfld.length > 0" class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="element in item.unitfld" :key="Math.abs(element.fld_id)" class="clearfix">
                  {{element.fld_name}}
                  <el-badge class="mark"/>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
          <el-form-item v-if="!isShow" class="public" label="已选择填报人：">
            <el-tag style="margin-right:8px;box-sizing: border-box;" v-for="item in selectedUser" :key="item.user_id">{{item.user_name_cn}}</el-tag>
          </el-form-item>
          <el-form-item class="public text1" label="任务开始日期：" prop="job_start_dt">
            <el-date-picker
              style="width:100%"
              size="mini"
              v-model="FormData.job_start_dt"
              type="date"
              value-format="yyyy-MM-dd"
              :readonly="isRead"
              placeholder="请指定任务开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="public text2" style="margin-bottom:30px;" label="任务结束日期：" prop="job_end_dt">
            <el-date-picker
              style="width:100%"
              size="mini"
              v-model="FormData.job_end_dt"
              type="date"
              value-format="yyyy-MM-dd"
              :readonly="isRead"
              placeholder="请指定任务结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="isShow" style="margin-bottom:0;" class="addJob">
            <el-button type="primary" @click="jobconfigDialog = false">取消</el-button>
            <el-button v-if="!isSave" type="primary" @click="subJobconfig" >确定</el-button>
            <el-button v-else type="primary" @click="saveJobconfig">确定</el-button>
          </el-form-item>
        </el-form>
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
      jobNm: '',
      options: [
        { name: '已发布', value: 4 },
        { name: '正常', value: 0 },
        { name: '审批中', value: 5 }
      ],
      jobStatus: '',
      tableData: [],
      unitconfigDialog: false,
      rcdusercgDialog: false,
      jobconfigDialog: false,
      transferTable: [],
      value: [],
      ary1: [],
      ary2: [],
      isResquest: false,
      agency: [],
      agencyValue: [],
      rcdusercgTable: [],
      FormData: {
        job_name: '',
        job_start_dt: '',
        job_end_dt: ''
      },
      rules: {
        job_name: [{required: true, trigger: 'blur'}],
        job_start_dt: [{required: true, trigger: 'blur'}],
        job_end_dt: [{required: true, trigger: 'blur'}]
      },
      isShow: true,
      isSave: false,
      isRead: false,
      title: '新增',
      currPage: {},
      gagid: 0,
      props: {
        value: 'id',
        label: 'label'
      },
      currentAgency: '',
      currentData: [],
      userid: [],
      selectedUnit: [],
      selectedUser: [],
      showJob_id: '',
      hide_asterisk: false
    }
  },
  methods: {
    // 获取任务列表
    rcdjobconfigList () {
      this.BaseRequest({
        url: '/fillinatask/rcdjobconfiglist',
        method: 'get',
        params: {
          currPage: this.pagination.currentPageIndex,
          pageSize: this.pagination.pageSize,
          job_name: this.jobNm,
          job_status: this.jobStatus
        }
      }).then(data => {
        this.tableData = data.dataList
        this.pagination.total = data.totalNum
        this.pagination.currentPageIndex = data.currPage
        this.pagination.pageSize = data.pageSize
      })
    },
    clearOption () {
      this.jobNm = ''
      this.jobStatus = ''
      this.rcdjobconfigList()
    },
    // 新增任务
    addJobconfig () {
      this.title = '新增'
      this.hide_asterisk = false
      this.jobconfigDialog = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 新增任务确定
    subJobconfig () {
      this.$refs.ruleForm.validate(vaild => {
        if (vaild) {
          if (this.FormData.job_start_dt < this.FormData.job_end_dt) {
            this.BaseRequest({
              url: '/fillinatask/insertrcdjobconfig',
              method: 'get',
              params: this.FormData
            }).then(data => {
              if (data === 'success') {
                this.rcdjobconfigList()
                this.$message.success('新增成功')
                this.jobconfigDialog = false
              } else {
                this.$message.error('新增失败')
                this.jobconfigDialog = false
              }
            })
          } else {
            this.$message.error('结束日期不能早于开始时间')
          }
        } else {
          this.$message.error('请检查必要信息填写完整!')
        }
      })
    },
    // 任务编辑
    editJobconfig (row) {
      this.BaseRequest({
        url: '/fillinatask/selectrcdjobconfigjobid',
        method: 'get',
        params: {
          job_id: row.job_id
        }
      }).then(data => {
        this.FormData = data[0]
      })
      this.title = '修改'
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.jobconfigDialog = true
      this.isSave = true
      this.current = row
    },
    // 保存修改
    saveJobconfig () {
      this.$refs.ruleForm.validate(vaild => {
        if (vaild) {
          if (this.FormData.job_start_dt < this.FormData.job_end_dt) {
            this.BaseRequest({
              url: '/fillinatask/updatercdjobconfig',
              method: 'get',
              params: {
                job_id: this.current.job_id,
                ...this.FormData
              }
            }).then(data => {
              if (data === 'success') {
                this.rcdjobconfigList()
                this.$message.success('修改成功')
                this.jobconfigDialog = false
              } else {
                this.$message.error('修改失败')
                this.jobconfigDialog = false
              }
            })
          } else {
            this.$message.error('结束日期不能早于开始时间')
          }
        } else {
          this.$message.error('请检查必要信息填写完整!')
        }
      })
    },
    // 任务详情
    detailJobconfig (row) {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.title = '查看'
      this.hide_asterisk = true
      this.jobconfigDialog = true
      this.FormData = row
      this.isShow = false
      this.isRead = true
      // 已选择得任务组
      this.BaseRequest({
        url: '/fillinatask/selectRcdJobUnitConfigyi',
        method: 'get',
        params: {job_id: row.job_id}
      }).then(data => {
        this.selectedUnit = []
        if (data.length > 0) {
          data.map(item => {
            this.selectedUnit.push({
              job_unit_id: item.job_unit_id,
              job_unit_name: item.job_unit_name,
              unitfld: []
            })
            this.BaseRequest({
              url: '/reporting/selectrcdjobunitfld',
              method: 'get',
              params: {
                job_unit_id: item.job_unit_id
              }
            }).then(unitfld => {
              if (unitfld.length > 0) {
                this.selectedUnit.map(element => {
                  if (element.job_unit_id == item.job_unit_id) {
                    element.unitfld = unitfld
                  }
                })
              }
            })
          })
        }
      })
      // 已绑定得填报人
      this.BaseRequest({
        url: '/fillinatask/huixianrcdjobpersonassign',
        method: 'get',
        params: {
          job_id: row.job_id
        }
      }).then(checkedUser => {
        console.log(checkedUser)
        this.selectedUser = checkedUser
      })
    },
    leaveHandle () {
      this.showJob_id = ''
    },
    // 任务窗口关闭
    jobconfigClose () {
      this.FormData = {}
      this.isShow = true
      this.isRead = false
      this.isSave = false
    },
    // 选择填报组
    unitconfig (row) {
      this.unitconfigDialog = true
      this.current = row
      this.selectRcdJobUnitConfig(row)
    },
    // 待选择任务组
    selectRcdJobUnitConfig (row) {
      this.BaseRequest({
        url: '/fillinatask/selectRcdJobUnitConfig',
        method: 'get',
        params: {job_id: row.job_id}
      }).then(data => {
        this.ary1 = data
        this.selectRcdJobUnitConfigyi(row)
      })
    },
    // 已选择任务组
    selectRcdJobUnitConfigyi (row) {
      this.BaseRequest({
        url: '/fillinatask/selectRcdJobUnitConfigyi',
        method: 'get',
        params: {job_id: row.job_id}
      }).then(data => {
        this.isResquest = false
        data.map(item => {
          this.value.push(item.job_unit_id)
        })
        this.ary2 = data
        this.transferTable = this.ary1.concat(this.ary2)
      })
    },
    // 任务组确定
    subUnitconfig () {
      this.BaseRequest({
        url: '/fillinatask/updateRcdJobUnitConfigyi',
        method: 'get',
        params: {
          job_id: JSON.stringify(this.current.job_id),
          jobunitid: this.value.join(',')
        }
      }).then(data => {
        if (data === 'success') {
          this.unitconfigDialog = false
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
          this.unitconfigDialog = false
        }
      })
    },
    // 选择填报人
    rcdusercg (row) {
      this.rcdusercgDialog = true
      this.current = row
      // 已经绑定的用户
      this.BaseRequest({
        url: '/fillinatask/huixianrcdjobpersonassign',
        method: 'get',
        params: {job_id: row.job_id}
      }).then(checkeddata => {
        this.agencyValue = []
        if (checkeddata.length > 0) {
          this.BaseRequest({
            url: '/reporting/useroriginassignlist',
            method: 'get',
            params: {origin_id: checkeddata[0].origin_id}
          }).then(data => {
            this.rcdusercgTable = data
            checkeddata.map(item => {
              data.map((element, index) => {
                if (item.user_id == element.user_id) {
                  this.$nextTick(() => {
                    this.$refs.multipleTable.toggleRowSelection(this.rcdusercgTable[index])
                  })
                }
              })
            })
          })
        } else {
          this.rcdusercgTable = []
          this.agencyValue = []
        }
      })
    },
    // 填报人确定
    subRcdusercg () {
      if (this.currentData.length > 0) {
        this.userid = []
        this.currentData.map(item => {
          this.userid.push(item.user_id)
        })
        this.BaseRequest({
          url: '/fillinatask/insertrcdjobpersonassign',
          method: 'get',
          params: {
            userid: this.userid.join(','),
            job_id: JSON.stringify(this.current.job_id)
          }
        }).then(data => {
          if (data === 'success') {
            this.rcdjobconfigList()
            this.$message.success('新增成功')
            this.rcdusercgDialog = false
          } else {
            this.$message.error('新增失败')
            this.rcdusercgDialog = false
          }
        })
      } else {
        this.$message('未选择填报人')
      }
    },
    // 获取组织结构
    getOriginDatas (value) {
      this.BaseRequest({
        url: '/reporting/getOriginDatas',
        method: 'get',
        params: {orgId: 0}
      }).then(data => {
        this.agency = data
      })
    },
    // 获取机构下用户
    agencyUser () {
      this.BaseRequest({
        url: '/reporting/useroriginassignlistsysorigin',
        method: 'get',
        params: {origin_id: this.currentAgency}
      }).then(data => {
        this.rcdusercgTable = data
      })
    },
    // 选择机构时改变
    handleChange (value) {
      this.currentAgency = value[value.length - 1]
    },
    // 选择用户改变
    handlecheck (value) {
      this.currentData = value
    },
    // 任务下发
    makeJob (row) {
      this.$confirm('确认要下发该任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.BaseRequest({
          url: 'record/process/makeJob',
          method: 'get',
          params: {jobId: row.job_id}
        }).then(data => {  
          if (data == 'SUCCESS') {
            this.$message.success('任务发布成功')
            this.rcdjobconfigList()
          } else {
            this.$message.error('任务发布失败')
          }   
        })
      }).catch(() => {
        return false
      })
    },
    // 删除任务
    deleteJob (row) {
      this.$confirm('确认要删除该任务', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.job_status == 0) {
          this.BaseRequest({
            url: '/fillinatask/deletercdjobconfig',
            method: 'get',
            params: {job_id: row.job_id}
          }).then(data => {
            if (data == 'success') {
              this.$message.success('删除成功')
              this.rcdjobconfigList()
            } else {
              this.$message.error('删除失败')
            }
          })
        } else {
          this.$message.warning('当前任务不能删除')
        }
      }).catch(() => {
        return false
      })
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.pagination.currentPageIndex = val
      this.rcdjobconfigList()
    }
  },
  created () {
    this.rcdjobconfigList()
    this.getOriginDatas()
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/rcdjobconfig/jobconfig.scss';
</style>
