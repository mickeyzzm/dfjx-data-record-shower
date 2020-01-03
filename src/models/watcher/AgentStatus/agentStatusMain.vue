<template>
  <WorkMain :headerItems="['Agent状态']">
    <div class="publicClass">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="tableStyle">
            <el-table
                :data="dataList"
                border
                stripe
                size="mini"
                class = "searchGrid"
                :header-cell-style="{background:'#f4f3f3',}"
                style="width:100%"
                v-loading="dataListLoading"
                >
                <el-table-column
                    prop="agent"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="agent"> 
                </el-table-column>
                <el-table-column
                    prop="prj_nm"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="所属应用项目">
                </el-table-column>
                <el-table-column
                    prop="ip"
                    header-align="center"
                    align="center"
                    label="IP地址">
                </el-table-column>
                <el-table-column
                    prop="public_key"
                    header-align="center"
                    align="center"
                    label="公钥">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="publicKeySee(scope.row)" >点击查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="agent_status"
                    header-align="center"
                    align="center"
                    width="110"
                    show-overflow-tooltip
                    label="Agent运行状态">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.agent_status == 1" type="success" icon="el-icon-check" circle></el-button>
                        <el-button v-if="scope.row.agent_status == 0" type="danger" icon="el-icon-close" circle></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sftp_status"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="SFTP链路检查">
                </el-table-column>
                <el-table-column
                    prop="last_heart"
                    header-align="center"
                    align="center"
                    width="140"
                    show-overflow-tooltip
                    label="最后心跳间隔（秒）">
                </el-table-column>
                <el-table-column
                    prop="version"
                    header-align="center"
                    align="center"
                    width="80"
                    show-overflow-tooltip
                    label="运行版本">
                </el-table-column>
                <el-table-column
                    prop="start_time"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="本次启动时间">
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
    <el-dialog
        :title="'公钥详情'"
        :close-on-click-modal="false"
        :visible.sync="dialogTableVisible">
        <el-form ref="dataForm" label-width="120px">
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
    name: 'projectMain',
    data () {
      return {
        dataListLoading: false,
        dialogTableVisible: false,
        dataCountent:"",
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
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
        getTableData: function (pageNum) {
            if (pageNum && pageNum !== '') {
              this.pageIndex = pageNum;
            } else {
              pageNum = this.pageIndex;
            }
            const $this = this;
            this.BaseRequest({
                url: '/monitor/selectTbagentList',
                method: 'get',
                params: {
                'currPage': pageNum,
                'pageSize': 10,
                }
            }).then((response) => {
              console.log(response,"agent")
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
        publicKeySee(row){
             //查看采集日志
            this.dialogTableVisible = true;
            this.dataCountent = row.public_key
        },
    },
    mounted: function () {
      this.getTableData(1);
    }
  }
</script>

<style lang="css">
  .mini-font-size{
    font-size: 12px !important;
  }
  .el-form-item__content{
    text-align: left;
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
  .colorRed{
    color: red;
    position: absolute;
    top: 10%;
    left: -2%;
  }
  .boxForm_item{
    position: relative;
  }
  .el-button--mini.is-circle{
    padding:2px!important;
  }
</style>
