<template>
  <WorkMain :headerItems="['传输状态查询']">
    <div class="publicClass">
      <el-row :gutter="20">
        <el-col class="align-left spaceValue" :span="24">
          <div class="headerCountentStyle">
            <span class="textCalss">关键字：</span>
            <el-input placeholder="请输入数据文件名或数据集名称" prefix-icon="el-icon-search" style="width:250px;margin-right:10px;"  v-model="seachUserId"></el-input>
            <el-button  @click="getTableData(1)" type="primary" icon="el-icon-search">查 询</el-button>
            <el-button @click="resetInput()" >重 置</el-button>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="tableStyle">
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
                    label="生产所属应用项目">
                </el-table-column>
                <el-table-column
                    prop="xfnm"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="消费所属应用项目">
                </el-table-column>
                <el-table-column
                    prop="status"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="上传状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">成功</span>
                        <span v-if="scope.row.status == 0">失败</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="statusxiazai"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="下载状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.statusxiazai == 1">成功</span>
                        <span v-if="scope.row.statusxiazai == 0">失败</span>
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
          </div>
        </el-col>
      </el-row>
    </div>
  </WorkMain>
</template>

<script>
  import WorkTablePager from '@/models/public/WorkTablePager';
  import WorkMain from '@/models/public/WorkMain';
  import { required } from 'vuelidate/lib/validators';
  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  export default {
    name: 'transStatusQueryMain',
    data () {
      return {
        dataListLoading: false,
        user_id:"",
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        editShowModalPage: false,
        addShowModalPage: false,
        seeShowModalPage: false,
        projectOPtion: [],
        seachUserId:"",
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
          this.seachUserId = "";
          this.getTableData(1);
        },
        getdatasData: function () {
          this.BaseRequest({
                url: '/consumption/apmanagementselectlist',
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
            if(this.seachUserId == null){
              this.seachUserId = "";
            }
            const $this = this;
            this.BaseRequest({
                url: '/log/transportLogstatusList',
                method: 'get',
                params: {
                  'currPage': pageNum,
                  'pageSize': 10,
                  'guanjianzi': this.seachUserId,
                }
            }).then((response) => {
              console.log(response,"list")
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
