<template>
  <div class="main">
    <div class="query">
      <el-input v-model="keyWorld" clearable size="mini" placeholder="请输入任务名称"></el-input>
      <el-select v-model="optionValue" clearable size="mini" placeholder="请选择任务状态">
        <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="query">查询</el-button>
      <el-button type="primary" @click="addJobconfig">新增任务</el-button>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%"
    size="mini"
    border
    stripe>
      <el-table-column type="index" width="100" label="填报任务编号" :resizable="false"></el-table-column>
      <el-table-column prop="jobconfigNm" label="填报任务名称" :resizable="false"></el-table-column>
      <el-table-column label="填报状态" :resizable="false">
        <template slot-scope="scope">
          <span v-if="scope.row.state === 0">已下发</span>
          <span v-else-if="scope.row.state === 1">编辑中</span>
          <span v-else-if="scope.row.state === 2">审批中</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" column-key="date" label="填报开始时间" :resizable="false"></el-table-column>
      <el-table-column prop="endTime" column-key="date" label="填报结束时间" :resizable="false"></el-table-column>
      <el-table-column label="操作" width="400" :resizable="false">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state === 1" type="text" @click="editJobconfig(scope.row)" size="mini">编辑</el-button>
          <el-button v-if="scope.row.state === 1" type="text" @click="unitconfig" size="mini">填报组维护</el-button>
          <el-button v-if="scope.row.state === 1" type="text" @click="rcdusercg" size="mini">填报人维护</el-button>
          <el-button v-if="scope.row.state === 1" type="text" size="mini">任务下发</el-button>
          <el-button v-if="scope.row.state !== 1" type="text" @click="detailJobconfig(scope.row)" size="mini">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          :button-texts="['移除','添加']"
          :data="transferTable">
        </el-transfer>
        <div style="margin-top:10px">
          <el-button type="primary" @click="canelUnitconfig">取消</el-button>
          <el-button type="primary" @click="subUnitconfig">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 填报人弹窗 -->
    <el-dialog
      title="选择填报人"
      :visible.sync="rcdusercgDialog"
      custom-class="selrcdusercg"
      :close-on-click-modal="false"
      width="50%">
      <div style="width:80%;">
        <div style="text-align:left;margin-bottom:30px;">
        <span>请选择机构：</span>
        <el-select style="width:22%;" :filterable="true" v-model="agencyValue">
          <el-option v-for="item in agency" :key="item.value" :label="item.name" :value="item.value"></el-option>
        </el-select>
        <el-button type="primary" @click="agencyUser">获取机构下用户</el-button>
        </div>
        <el-table
          :data="rcdusercgTable"
          style="width:100%"
          size="mini"
          border
          stripe>
          <el-table-column type="selection"></el-table-column>
          <el-table-column type="index" width="130" label="填报人id" :resizable="false"></el-table-column>
          <el-table-column prop="name" label="填报人名称" :resizable="false"></el-table-column>
        </el-table>
        <div style="margin-top:30px;text-align:right;">
          <el-button type="primary" @click="canelRcdusercg">取消</el-button>
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
      <el-form :model="FormData">
          <el-form-item class="public" label="填报任务名称：">
            <el-input :readonly="isRead" v-model="FormData.jobconfigNm" placeholder="请输入填报任务名称"></el-input>
          </el-form-item>
          <el-form-item class="public" label="任务开始日期：">
            <el-date-picker
              size="mini"
              v-model="FormData.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              :readonly="isRead"
              style="width:100%"
              placeholder="请指定任务开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="public" style="margin-bottom:30px;" label="任务结束日期：">
            <el-date-picker
              size="mini"
              v-model="FormData.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              :readonly="isRead"
              style="width:100%"
              placeholder="请指定任务结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="isShow" style="margin-bottom:0;" class="addJob">
            <el-button type="primary" @click="canelJobconfig">取消</el-button>
            <el-button type="primary" @click="subJobconfig" style="margin-right:0">确认</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyWorld: '',
      options: [
        { name: '已下发', value: 0 },
        { name: '编辑中', value: 1 },
        { name: '审批中', value: 2 }
      ],
      optionValue: null,
      tableData: [
        {
          jobconfigNm: '小学在读学生信息',
          state: 1,
          startTime: '2020-1-1',
          endTime: '2020-1-3'
        },
        {
          jobconfigNm: '1月份蔬菜价格统计',
          state: 1,
          startTime: '2020-1-5',
          endTime: '2020-1-7'
        },
        {
          jobconfigNm: '12月份蔬菜价格统计',
          state: 2,
          startTime: '2020-1-8',
          endTime: '2020-1-10'
        }
      ],
      unitconfigDialog: false,
      rcdusercgDialog: false,
      jobconfigDialog: false,
      table: [
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
      transferTable: [],
      value: [],
      agency: [
        {name: '机构1', value: 1},
        {name: '机构2', value: 2}
      ],
      agencyValue: 1,
      rcdusercgTable: [
        {name: '张三'},
        {name: '李四'},
        {name: '王五'}
      ],
      rcdusercgTable1: [
        {name: '张三1'},
        {name: '李四1'},
        {name: '王五1'}
      ],
      FormData: {
        jobconfigNm: '',
        startTime: '',
        endTime: ''
      },
      isShow: true,
      isRead: false,
      title: '新增'
    }
  },
  methods: {
    // 查询
    query () {
      console.log(this.optionValue + 'hh')
    },
    // 新增任务
    addJobconfig () {
      this.title = '新增'
      this.jobconfigDialog = true
    },
    // 新增任务确定
    subJobconfig () {
      this.jobconfigDialog = false
      console.log(this.addFormData)
    },
    // 新增任务取消
    canelJobconfig () {
      this.jobconfigDialog = false
    },
    // 任务窗口关闭
    jobconfigClose () {
      this.FormData = {}
      this.isShow = true
      this.isRead = false
    },
    // 任务编辑
    editJobconfig (row) {
      this.title = '修改'
      this.jobconfigDialog = true
      this.FormData = row
    },
    // 任务详情
    detailJobconfig (row) {
      this.title = '查看'
      this.jobconfigDialog = true
      this.FormData = row
      this.isShow = false
      this.isRead = true
    },
    // 任务组确定
    subUnitconfig () {
      this.unitconfigDialog = false
    },
    // 任务组取消
    canelUnitconfig () {
      this.unitconfigDialog = false
    },
    // 填报人确定
    subRcdusercg () {
      this.rcdusercgDialog = false
    },
    // 填报人取消
    canelRcdusercg () {
      this.rcdusercgDialog = false
    },
    // 选择填报组
    unitconfig () {
      this.unitconfigDialog = true
      this.transferTable = []
      if (this.table.length > 0) {
        for (let i = 0; i <= this.table.length; i++) {
          let _this = this
          this.transferTable.push({
            key: i,
            label: _this.table[i].unitconfigNm
          })
        }
      }
    },
    // 选择填报人
    rcdusercg () {
      this.rcdusercgDialog = true
    },
    // 获取机构下用户
    agencyUser () {
      if (this.agencyValue === 2) {
        this.rcdusercgTable = this.rcdusercgTable1
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/scss/rcdjobconfig/jobconfig.scss';
</style>
