<template>
  <WorkMain :headerItems="['联系人管理']">
    <div class="publicClass">
      <el-row :gutter="20">
        <el-col class="align-left spaceValue" :span="24">
          <div class="headerCountentStyle">
              <el-button @click="openAddModal" type="primary" icon="el-icon-circle-plus-outline" style="margin-left:10px;">新增联系人</el-button>
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
                    prop="person_id"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="编号">
                </el-table-column>
                <el-table-column
                    prop="person_nm"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="联系人姓名">
                </el-table-column>
                <el-table-column
                    prop="person_tel"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="联系人电话">  
                </el-table-column>
                <el-table-column
                    prop="person_email"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="联系人邮箱">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="mini"  @click="openEditModal(scope.row)" >编辑</el-button>
                        <el-button type="text" size="mini" @click="see(scope.row)" >查看</el-button>
                        <el-button type="text" size="mini" @click="delUser(scope.row)" >删除</el-button>
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
    <el-dialog title="新增联系人信息" :visible.sync="addShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="25%" :model="addformData">
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="联系人姓名：" >
              <el-input v-model="addformData.contacts_name" placeholder="请输入联系人姓名" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="联系人电话：">
              <el-input v-model="addformData.contacts_tel" placeholder="请输入联系人电话" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <el-form-item size="mini" label="联系人邮箱：">
              <el-input v-model="addformData.contacts_email" placeholder="请输入联系人邮箱" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 弹窗-->
    <el-dialog title="修改联系人信息" :visible.sync="editShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="25%" :model="editformData">
        <div class="boxForm_item">
          <span class="colorRed">*</span>
          <el-form-item size="mini" label="联系人姓名：">
            <el-input v-model="editformData.contacts_name" auto-complete="off" ></el-input>
          </el-form-item>
        </div>
        <div class="boxForm_item">
          <span class="colorRed">*</span>
          <el-form-item size="mini" label="联系人电话：">
            <el-input v-model="editformData.contacts_tel" auto-complete="off" ></el-input>
          </el-form-item>
        </div>
        <div class="boxForm_item">
          <el-form-item size="mini" label="联系人邮箱：">
            <el-input v-model="editformData.contacts_email" auto-complete="off" ></el-input>
          </el-form-item>
        </div>
        <el-form-item size="mini" label="创建时间：">
          <el-input v-model="editformData.createdTime" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item size="mini" label="最后修改时间：">
          <el-input v-model="editformData.lastEditTime" auto-complete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="editSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>

    <!--查看弹窗-->
    <el-dialog title="查看联系人信息" :visible.sync="seeShowModalPage" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="seeformData">
        <el-form-item size="mini" label="联系人姓名：">
            <span>{{seeformData.contacts_name}}</span>
        </el-form-item>
        <el-form-item size="mini" label="联系人电话：">
            <span>{{seeformData.contacts_tel}}</span>
        </el-form-item>
        <el-form-item size="mini" label="联系人邮箱：">
            <span>{{seeformData.contacts_email}}</span>
        </el-form-item>
        <el-form-item size="mini" label="创建时间：">
            <span>{{seeformData.createdTime}}</span>
        </el-form-item>
        <el-form-item size="mini" label="最后修改时间：">
            <span>{{seeformData.lastEditTime}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="seeShowModalPage = false">关 闭</el-button>
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
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        editShowModalPage: false,
        addShowModalPage: false,
        seeShowModalPage: false,
        addformData: {
          contacts_name: "",
          contacts_tel: "",
          contacts_email: "",
        },
        editformData: {
          contacts_name: "",
          contacts_tel: "",
          contacts_email: "",
          createdTime:"",
          lastEditTime:"",
        },
        seeformData: {
          contacts_name: "",
          contacts_tel: "",
          contacts_email: "",
          createdTime:"",
          lastEditTime:"",
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
        delUser: function (row) {//删除
            this.$confirm('确定删除联系人【' + row.person_nm + '】？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
            }).then(() => {
              this.BaseRequest({
                  url: '/contact/delpageContact',    
                  method: 'get',
                  params: {'person_id': row.person_id}
              }).then((res) => {
                  if(res == "success"){
                    this.Message.success('删除成功');
                    this.getTableData(1);
                  }
              })
            })
        },
        openAddModal: function () {//新增
            this.addShowModalPage = true;
        },
        addSubmitDataForm: function () {//新增弹窗
            if (this.addformData.contacts_name == "" || this.addformData.contacts_tel == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>联系人姓名、电话'
                })
            }else if(!myregTel.test(this.addformData.contacts_tel)){
                  this.Message.warning('请输入正确的手机号');
            }else if(!myregEmail.test(this.addformData.contacts_email)){
                  this.Message.warning('请输入正确的邮箱');
            }else{
                this.BaseRequest({
                    url: '/contact/insertpageContact',
                    method: 'get',
                    params: {
                    'person_nm': this.addformData.contacts_name,
                    'person_tel': this.addformData.contacts_tel,
                    'person_email': this.addformData.contacts_email,
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
            this.editformData.contacts_name = row.person_nm;
            this.editformData.contacts_tel = row.person_tel;
            this.editformData.contacts_email = row.person_email;
            this.editformData.createdTime = row.create_time;
            this.editformData.lastEditTime = row.update_time;
        },
        editSubmitDataForm: function () {//编辑弹窗 
            if (this.editformData.contacts_name == "" || this.editformData.contacts_tel == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>联系人姓名、电话'
                })
            }else if(!myregTel.test(this.editformData.contacts_tel)){
                  this.Message.warning('请输入正确的手机号');
            }else if(!myregEmail.test(this.editformData.contacts_email)){
                  this.Message.warning('请输入正确的邮箱');
            }else{
                this.BaseRequest({
                    url: '/contact/updatepageContact',
                    method: 'get',
                    params: {
                    'person_id': this.user_id,
                    'person_nm': this.editformData.contacts_name,
                    'person_tel': this.editformData.contacts_tel,
                    'person_email': this.editformData.contacts_email
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
        see: function (row) { //查看
            const $this = this;
            this.seeShowModalPage = true;
            this.BaseRequest({
              url: '/contact/pageContactselect',
              method: 'get',
              params: {
                  'person_id': row.person_id,
              }
            }).then((res) => {
              var resJson = res[0]; 
              this.seeformData.contacts_name = resJson.person_nm;
              this.seeformData.contacts_tel = resJson.person_tel;
              this.seeformData.contacts_email = resJson.person_email;
              this.seeformData.createdTime = resJson.create_time;
              this.seeformData.lastEditTime = resJson.update_time;
            })
        },
        closeModal: function () {
            this.addShowModalPage = false;
            this.editShowModalPage = false;
            this.seeShowModalPage = false;
            this.addformData.contacts_name = "";
            this.addformData.contacts_tel = "";
            this.addformData.contacts_email = "";
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
</style>
