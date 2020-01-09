<template>
  <WorkMain :headerItems="['填报指标体系']">
    <div class="publicClass">
      <el-row :gutter="20">
        <el-col class="align-left spaceValue" :span="24">
          <div class="headerCountentStyle">
              <el-button @click="addShowModalPage = true" type="primary" icon="el-icon-circle-plus-outline" style="margin-left:10px;">新增指标基本类别</el-button>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="tableStyle">
            <el-table
                :data="dataList"
                border
                stripe
                size="mini"
                :header-cell-style="{background:'#f6f6f7',}"
                class = "searchGrid"
                style="width:100%"
                v-loading="dataListLoading"
                >
                <el-table-column
                    prop="id"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="基本类别编码">
                </el-table-column>
                <el-table-column
                    prop="name"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="基本类别名称">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini"  @click="openEditModal(scope.row)" >编辑</el-button>
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
    <!-- 新增 弹窗-->
    <el-dialog title="新增指标基本类别" :visible.sync="addShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="25%" :model="addformData">
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="基本类别名称：" >
              <el-input v-model="addformData.basicClassNm" placeholder="请输入基本类别名称" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="是否有效：">
              <el-select size="mini"  style="width:340px;" v-model="addformData.isEffectiveItem" placeholder="请选择" clearable filterable >
                    <el-option v-for="item in isEffective" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 弹窗-->
    <el-dialog title="修改指标基本类别" :visible.sync="editShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="25%" :model="editformData">
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="基本类别名称：" >
              <el-input v-model="editformData.basicClassNm" placeholder="请输入基本类别名称" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="是否有效：">
              <el-select size="mini"  style="width:340px;" v-model="editformData.isEffectiveItem" placeholder="请选择" clearable filterable >
                    <el-option v-for="item in isEffective" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="editSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>
    
  </WorkMain>
</template>

<script>
  import WorkTablePager from '@/models/public/WorkTablePager';
  import WorkMain from '@/models/public/WorkMain';
  import { required } from 'vuelidate/lib/validators';
  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  var myregTel = /^[1][3,4,5,7,8][0-9]{9}$/;
  var myregEmail = /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]{2,3})+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,3}$/;



  export default {
    name: 'contactsMain',
    data () {
      return {
        dataListLoading: false,
        user_id:"",
        dataList: [{
            id: '1',
            name: '人',
          },{
            id: '2',
            name: '地',
          },{
            id: '3',
            name: '物',
          },{
            id: '4',
            name: '组织',
        }],
        isEffective: [{
            id: '0',
            name: '无效',
          },{
            id: '1',
            name: '有效',
        }],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        editShowModalPage: false,
        addShowModalPage: false,
        seeShowModalPage: false,
        addformData: {
          basicClassNm: "",
          isEffectiveItem: "",
        },
        editformData: {
          basicClassNm: "",
          isEffectiveItem: "",
        },
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
                url: '/contact/pageContact',
                method: 'get',
                params: {
                'currPage': pageNum,
                'pageSize': 10,
                }
            }).then((response) => {
              console.log(response)
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
        addSubmitDataForm: function () {//新增弹窗
            if (this.addformData.basicClassNm == "" || this.addformData.isEffectiveItem == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                        'person_nm': this.addformData.basicClassNm,
                        'person_tel': this.addformData.isEffectiveItem,
                    }
                }).then((res) => {
                    if(res == "success"){
                        this.Message.success('保存成功');
                        this.getTableData(1);
                        this.closeModal();
                    }
                })
            }
        },
        openEditModal: function (row) {//编辑
            this.editShowModalPage = true;
            this.user_id = row.person_id;
            this.editformData.basicClassNm = row.name;
            this.editformData.isEffectiveItem = row.isEffectiveItem;
        },
        editSubmitDataForm: function () {//编辑弹窗 
            if (this.editformData.basicClassNm == "" || this.editformData.isEffectiveItem == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>基本类别名称、是否有效'
                })
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                       'person_id': this.user_id,
                        'person_nm': this.editformData.basicClassNm,
                        'person_tel': this.editformData.isEffectiveItem,
                    }
                }).then((res) => {
                    if(res == "success"){
                      this.Message.success('修改成功');
                      this.getTableData(1);
                      this.closeModal();
                    }
                })
            }
        },
        closeModal: function () {
            this.addShowModalPage = false;
            this.editShowModalPage = false;
            this.addformData.basicClassNm = "";
            this.addformData.isEffectiveItem = "";
        },
    },
    created () {
      this.$nextTick(() => {
        this.getTableData(1);
      })
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
