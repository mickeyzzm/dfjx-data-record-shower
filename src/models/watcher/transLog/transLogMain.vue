<template>
  <WorkMain :headerItems="['传输日志']">
    <div class="publicClass">
      <el-row :gutter="20">
        <el-col class=" spaceValue" :span="24">
          <div class="headerCountentStyle">
              <span class="textCalss">所属应用项目：</span>
              <el-select size="mini"  style="width:150px;" v-model="projectS" placeholder="请选择项目" clearable filterable >
                  <el-option v-for="item in projectOPtion" :key="item.prj_cd" :label="item.prj_nm" :value="item.prj_cd">
                  </el-option>
              </el-select>
              <span class="textCalss">传输方式：</span>
              <el-select size="mini"  style="width:150px;" v-model="transStatuss" placeholder="请选择传输方式" clearable filterable >
                  <el-option v-for="item in transStatus" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
              </el-select> 
              <span class="textCalss">运行状态：</span> 
              <el-select size="mini"  style="width:150px;" v-model="runStatuss" placeholder="请运行状态" clearable filterable >
                  <el-option v-for="item in runStatus" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
              </el-select>
              <span class="textCalss">关键字：</span>
              <el-input placeholder="请输入数据文件名或数据集名称" prefix-icon="el-icon-search" style="width:250px;margin-right:10px;"  v-model="seachUserId"></el-input>
              <el-button  @click="getTableData(1)" type="primary" icon="el-icon-search">查 询</el-button>
              <el-button @click="resetInput()" >重 置</el-button>
          </div>
        </el-col>
        <el-col :span="24">
          <el-table
              :data="dataList"
              border
              stripe
              size="mini"
              class = "searchGrid"
              style="width:100%"
              :header-cell-style="{background:'#f6f6f7',}"
              v-loading="dataListLoading"
              >
              <el-table-column
                  prop="dt"
                  header-align="center"
                  align="center"
                  width="180"
                  show-overflow-tooltip
                  label="时间">
              </el-table-column> 
              <el-table-column
                  prop="file_nm"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="数据文件名">
              </el-table-column>
              <el-table-column
                  prop="dat_nm"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="数据集名称">
              </el-table-column>
              <el-table-column
                  prop="scnm"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="所属应用项目">
              </el-table-column>
              <el-table-column
                  prop="mode"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="传输方式">
                   <template slot-scope="scope">
                        <span v-if="scope.row.mode == 1">下载</span>
                        <span v-if="scope.row.mode == 0">上传</span>
                    </template>
              </el-table-column>
              <el-table-column
                  prop="size"
                  header-align="center"
                  align="center"
                  width="130"
                  show-overflow-tooltip
                  label="文件大小（字节）">
              </el-table-column>
              <el-table-column
                  prop="md5"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="文件MD5">
              </el-table-column>
              <el-table-column
                  prop="rate"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="传输速率(KB/s)">
              </el-table-column>
              <el-table-column
                  prop="status"
                  header-align="center"
                  align="center"
                  show-overflow-tooltip
                  label="状态">
                   <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">成功</span>
                        <span v-if="scope.row.status == 0">失败</span>
                    </template>
              </el-table-column>
              <el-table-column
                  label="操作"
                  align="center">
                  <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="seeLog(scope.row)" >点击查看日志</el-button>
                  </template>
            </el-table-column>
          </el-table>
          <el-pagination
              @current-change="currentChangeHandle"
              :current-page="pageIndex"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    
    <el-dialog
            :title="'查看日志详情'"
            :close-on-click-modal="false"
            :visible.sync="dialogTableVisible"
            >
            <el-form label-width="120px">
                <el-input
                    type="textarea"
                    autosize
                    size="mini"
                    v-model="dataCountent">
                </el-input>
            </el-form>
        </el-dialog>
  </WorkMain>
</template>

<script>
  import WorkTablePager from '@/models/public/WorkTablePager';
  import WorkMain from '@/models/public/WorkMain';
  import { required } from 'vuelidate/lib/validators';
  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  export default {
    name: 'transLogMain',
    data () {
      return {
        dataListLoading: false,
        dialogTableVisible: false,
        seeShowModalPage: false,
        dataCountent:"",
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        projectOPtion: [],
        transStatus:[
            {name:"上传",id:0},
            {name:"下载",id:1},
        ],
        runStatus:[
            {name:"成功",id:1},
            {name:"失败",id:0},
        ],
        projectS:"",
        seachUserId:"",
        runStatuss:"",
        transStatuss:"",
        page_res:{},
      }
    },
    computed: {
      
    },
    components: {
      Treeselect,
      WorkTablePager,
      WorkMain
    },
    methods: {
        resetInput: function () {
          this.projectS = "";
          this.seachUserId = "";
          this.runStatuss = "";
          this.transStatuss = "";
          this.getTableData(1);
        },
        getdatasData: function () {
          this.BaseRequest({
                url: '/log/datamanagementprojectlist',//应用项目下拉
                method: 'get',
                params: {}
            }).then((res) => {
                if (res) {
                    this.projectOPtion = res;
                }
            })
        },
        getTableData: function (pageNum) {
            if (pageNum && pageNum !== '') {
              this.pageIndex = pageNum;
            } else {
              pageNum = this.pageIndex;
            }
            if(this.projectS == null || this.seachUserId == null || this.transStatuss == null || this.runStatuss == null){
              this.projectS = "";
              this.seachUserId = "";
              this.transStatuss = "";
              this.runStatuss = "";
            }
            const $this = this;
            this.BaseRequest({
                url: '/log/transportLogList',
                method: 'get',
                params: {
                  'currPage': pageNum,
                  'pageSize': 10,
                  'prj_cd':this.projectS, 
                  'guanjianzi':this.seachUserId,
                  'mode':this.transStatuss,
                  'status':this.runStatuss
                }
            }).then((response) => {
              console.log(response,"response")
              if (response) {
                  if(this.page_res[this.pageIndex]){
                      this.dataList = this.page_res[this.pageIndex];
                  }else {
                      this.dataList = response.dataList;
                  }
                  this.totalPage = response.totalNum;
                  this.pageIndex = response.currPage;
              } else {
                  this.dataList = [];
                  this.totalPage = 0;
              }
              this.dataListLoading = false;
            })
        },
        // 当前页
        currentChangeHandle (val) {
            if(!this.page_res[this.pageIndex]){
               this.page_res[this.pageIndex] = this.dataList;
            }
            this.pageIndex = val;
            // 获取table数据
            this.dataListLoading = true;
            this.getTableData(val);
        },
        seeLog: function (row) { //查看
           this.dialogTableVisible = true;
           this.BaseRequest({
                url: '/consumption/apmanagementselectlist',
                method: 'get',
                params: {}
            }).then((res) => {
                if (res) {
                   this.dataCountent = "日志查看";
                }
            })

        },
        closeModal: function () {
            this.seeShowModalPage = false;
        },
    },
    mounted: function () {
      this.getTableData();
      this.getdatasData();
    }
  }
</script>

<style lang="css">
  .mini-font-size{
    font-size: 12px !important;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/table-page.scss";
  .searchGrid{
        min-height: calc(100vh - 202px - 64px);
  }
  .spaceValue{
    margin-bottom:15px;
  }
  .textCalss{
      font-size: 13px;
      color:#606266;
      margin-left: 10px;
      display: inline-block;
      // width:95px;
  }
  .colorRed{
    color: red;
    position: absolute;
    top: 10%;
    left: -2%;
  }
  .boxForm_item{
    position: relative;
  }
</style>
