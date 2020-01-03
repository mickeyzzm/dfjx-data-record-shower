<template>
  <WorkMain :headerItems="['应用项目管理']">
    <div class="publicClass">
      <el-row :gutter="20">
        <el-col class="align-left spaceValue" :span="24">
            <div class="headerCountentStyle">
              <el-button @click="openAddModal" type="primary" icon="el-icon-circle-plus-outline" style="margin-left:10px;">新增应用项目</el-button>
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
                  type="index"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="prj_nm"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="应用名称"> 
                </el-table-column>
                <el-table-column
                    prop="prj_cd"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="应用标识">
                </el-table-column>
                <el-table-column
                    prop="person_nm"
                    header-align="center"
                    align="center"
                    show-overflow-tooltip
                    label="联系人">
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
    <el-dialog title="新增应用项目" :visible.sync="addShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="25%" :model="addformData">
        <div class="boxForm_item">
            <span class="colorRed">*</span>
          <el-form-item size="mini" label="应用项目标识：">
            <el-input v-model="addformData.project_label" auto-complete="off" placeholder="请输入应用项目标识"></el-input>
          </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
          <el-form-item size="mini" label="应用项目名称：">
            <el-input v-model="addformData.project_name" auto-complete="off" placeholder="请输入应用项目名称"></el-input>
          </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
          <el-form-item size="mini" label="联系人：">
              <el-select size="mini"  style="width:340px;" v-model="addformData.contact_people" placeholder="请选择联系人" clearable filterable >
                  <el-option v-for="item in contactsOPtion" :key="item.person_id" :label="item.person_nm" :value="item.person_id">
                  </el-option>
              </el-select>
          </el-form-item>
        </div>
        <div class="boxForm_item">
            <el-form-item size="mini" label="应用项目说明：">
              <el-input v-model="addformData.project_Explain" placeholder="请输入应用项目说明" auto-complete="off" type="textarea" autosize></el-input>
            </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="addSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>

    <!-- 编辑 弹窗-->
    <el-dialog title="修改应用项目" :visible.sync="editShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="25%" :model="editformData">
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="应用项目标识：">
              <el-input v-model="editformData.project_label" auto-complete="off" disabled></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="应用项目名称：">
              <el-input v-model="editformData.project_name" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="联系人：">
                <el-select size="mini"  style="width:340px;" v-model="editformData.contact_people" placeholder="请选择联系人" clearable filterable >
                    <el-option v-for="item in contactsOPtion" :key="item.person_id" :label="item.person_nm" :value="item.person_id">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <el-form-item size="mini" label="应用项目说明：">
              <el-input v-model="editformData.project_Explain" auto-complete="off" type="textarea" autosize ></el-input>
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
        <el-button @click="editShowModalPage = false">取 消</el-button>
        <el-button type="primary" @click="editSubmitDataForm()">保 存</el-button>
      </div>
    </el-dialog>

    <!--查看弹窗-->
    <el-dialog title="查看应用项目" :visible.sync="seeShowModalPage" >
      <el-form  class="modal-form" label-position="right" label-width="25%" :model="seeformData">
        <el-form-item size="mini" label="应用项目标识：">
            <span>{{seeformData.project_label}}</span>
        </el-form-item>
        <el-form-item size="mini" label="应用项目名称：">
            <span>{{seeformData.project_name}}</span>
        </el-form-item>
        <el-form-item size="mini" label="联系人：">
            <span>{{seeformData.contact_people}}</span>
        </el-form-item>
        <el-form-item size="mini" label="应用项目说明：">
            <span>{{seeformData.project_Explain}}</span>
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

  export default {
    name: 'projectMain',
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
          project_name: null,
          project_label: null,
          contact_people: null,
          project_Explain: null,
        },
        editformData: {
          project_name: null,
          project_label: null,
          contact_people: null,
          project_Explain: null,
          createdTime:null,
          lastEditTime:null,
        },
        seeformData: {
          project_name: null,
          project_label: null,
          contact_people: null,
          project_Explain: null,
          createdTime:null,
          lastEditTime:null,
        },
        contactsOPtion:[],
        person_nm:null,
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
        getPersonData(){//联系人
            this.BaseRequest({
                url: '/contact/pageContactsxiala',
                method: 'get',
                params: {}
            }).then((res) => {
              this.contactsOPtion = res;
            })
        },
        getTableData: function (pageNum) {
            if (pageNum && pageNum !== '') {
              this.pageIndex = pageNum;
            } else {
              pageNum = this.pageIndex;
            }
            const $this = this;
            this.BaseRequest({
                url: '/consumption/apmanagementList',
                method: 'get',
                params: {
                'currPage': pageNum,
                'pageSize': 10,
                }
            }).then((response) => {
              console.log(response,"kk")
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
            this.$confirm('确定删除应用名【' + row.prj_nm + '】？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true,
                type: 'warning'
            }).then(() => {
                this.BaseRequest({
                    url: '/consumption/delapmanagement',    
                    method: 'get',
                    params: {'prj_cd': row.prj_cd}
                }).then((res) => {
                    this.Message.success('删除成功');
                    this.getTableData(1);
                })
            })
        },
        openAddModal: function () {//新增
            this.addShowModalPage = true;
        },
        addSubmitDataForm: function () {//新增弹窗
            if (this.addformData.project_name == null || this.addformData.project_label == null  
             || this.addformData.contact_people == null ) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>应用项目标识、应用项目名称、联系人'
                })
            }else{ 
                if( this.addformData.project_Explain == null){
                  this.addformData.project_Explain = "";
                }
                this.BaseRequest({
                    url: '/consumption/insertapmanagement',
                    method: 'get',
                    params: {
                      'prj_cd': this.addformData.project_label,
                      'prj_nm': this.addformData.project_name,
                      'person_id': this.addformData.contact_people,
                      'prj_desc': this.addformData.project_Explain == ""?"暂无":this.addformData.project_Explain,
                    }
                }).then((res) => {
                    this.Message.success('保存成功');
                    if(res == "success"){
                      this.getTableData(1);
                      this.closeModal();
                    }
                })
            }
        },
        openEditModal: function (row) {//编辑
            this.editShowModalPage = true;
            this.user_id = row.prj_cd;
            this.editformData.project_name = row.prj_nm;
            this.editformData.project_label = row.prj_cd;
            this.editformData.contact_people = row.person_nm;
            this.editformData.project_Explain = row.prj_desc;
            this.editformData.createdTime = row.create_time;
            this.editformData.lastEditTime = row.update_time;
        },
        editSubmitDataForm: function () {//编辑弹窗 
            if (this.editformData.project_name == null || this.editformData.contact_people == null) {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数不允许为空</span><br>应用项目名称、联系人'
                })
            }else{
              for(var i=0;i<this.contactsOPtion.length;i++){
                if(this.editformData.contact_people == this.contactsOPtion[i].person_nm ){
                  this.person_nm = this.contactsOPtion[i].person_id;
                }else if(this.editformData.contact_people == this.contactsOPtion[i].person_id ){
                  this.person_nm = this.contactsOPtion[i].person_id;
                }
              }
              if( this.editformData.project_Explain == null){
                 this.editformData.project_Explain = "";
              }
              this.BaseRequest({
                  url: '/consumption/updateapmanagement',
                  method: 'get',
                  params: {
                      'prj_cd': this.editformData.project_label,
                      'prj_nm': this.editformData.project_name,
                      'person_id': this.person_nm,
                      'prj_desc': this.editformData.project_Explain
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
                url: '/consumption/apmanagementselect',
                method: 'get',
                params: {
                    'prj_cd': row.prj_cd,
                }
            }).then((res) => {
                var resJson = res[0];
                this.seeformData.project_name = resJson.prj_nm;
                this.seeformData.project_label = resJson.prj_cd;
                this.seeformData.contact_people = resJson.person_nm;
                this.seeformData.project_Explain = resJson.prj_desc == ""?"暂无":resJson.prj_desc;
                this.seeformData.createdTime = resJson.create_time;
                this.seeformData.lastEditTime = resJson.update_time;
            })
        },
        closeModal: function () {
            this.addShowModalPage = false;
            this.editShowModalPage = false;
            this.seeShowModalPage = false;
            this.addformData.project_name = "";
            this.addformData.project_label = "";
            this.addformData.contact_people = "";
            this.addformData.project_Explain = "";
        },
    },
    created () {
      this.$nextTick(() => {
        this.getTableData(1);
        this.getPersonData();
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
