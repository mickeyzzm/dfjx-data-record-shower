<template>
  <WorkMain :headerItems="['系统参数配置']">
    <div class="publicClass">
      <el-row>
          <el-col :span="24">
              <el-form  class="modal-form" label-position="right" label-width="21%" :model="sysParamsConfig">
                  <el-form-item size="mini" label="参数加解密key：">
                      <span>{{sysParamsConfig.paramsKey}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="secret key：">
                      <span>{{sysParamsConfig.secretKey}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="服务心跳周期（秒）：">
                      <span>{{sysParamsConfig.servWeek}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="数据文件有效期（天）：">
                      <span>{{sysParamsConfig.dataFileWeek}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="日志有效期（天）：">
                      <span>{{sysParamsConfig.logEffective}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="文件传输超时时长（秒）：">
                      <span>{{sysParamsConfig.fileTransLength}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="传输限速（KB/s）：">
                      <span>{{sysParamsConfig.TransLimiting}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="传输自动重试次数：">
                      <span>{{sysParamsConfig.TransAutoFreQuency}}</span>
                  </el-form-item>

                  <el-form-item size="mini" label="创建时间：">
                      <span>{{sysParamsConfig.createdTime}}</span>
                  </el-form-item>
                  <el-form-item size="mini" label="最后修改时间：">
                      <span>{{sysParamsConfig.lastEditTime}}</span>
                  </el-form-item>
              </el-form>
          </el-col>
          <el-col :span="11">
              <div class="editBtn" ><el-button size="mini"  @click="openEditModal()" >修 改</el-button></div> 
          </el-col>
      </el-row>
    </div>

    <!-- 编辑 弹窗-->
    <el-dialog title="修改系统参数" :visible.sync="editShowModalPage" >
      <el-form  class="modal-form" label-position="left" label-width="41%" :model="editSysParamsConfig">
        <div class="boxForm_item">
          <span class="colorRed">*</span>
          <el-form-item size="mini" label="参数加解密key：">
            <el-input v-model="editSysParamsConfig.paramsKey" auto-complete="off" disabled></el-input>
          </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="secret key：">
                <el-input v-model="editSysParamsConfig.secretKey" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="服务心跳周期（秒）：">
                <el-input v-model="editSysParamsConfig.servWeek" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="数据文件有效期（天）：">
                <el-input v-model="editSysParamsConfig.dataFileWeek" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
            <span class="colorRed">*</span>
            <el-form-item size="mini" label="日志有效期（天）：">
                <el-input v-model="editSysParamsConfig.logEffective" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
             <span class="colorRed">*</span>
            <el-form-item size="mini" label="文件传输超时时长（秒）：">
                <el-input v-model="editSysParamsConfig.fileTransLength" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
             <span class="colorRed">*</span>
            <el-form-item size="mini" label="传输限速（KB/s）：">
                <el-input v-model="editSysParamsConfig.TransLimiting" auto-complete="off" ></el-input>
            </el-form-item>
        </div>
        <div class="boxForm_item">
             <span class="colorRed">*</span>
            <el-form-item size="mini" label="传输自动重试次数：">
                <el-input v-model="editSysParamsConfig.TransAutoFreQuency" auto-complete="off" ></el-input>
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
  var reg = /^\d+$|^\d+[.]?\d+$/;

  export default {
    name: 'sysParamsConfigMain',
    data () {
      return {
        editShowModalPage: false,
        sysParamsConfig: {
            id:"",
            paramsKey: "",
            secretKey: "",
            servWeek: "",
            dataFileWeek:"",
            logEffective:"",
            fileTransLength:"",
            TransLimiting:"",
            TransAutoFreQuency:"",
            createdTime:"",
            lastEditTime:"",
        },
        editSysParamsConfig: {
            paramsKey: '',
            secretKey: '',
            servWeek: '',
            dataFileWeek:'',
            logEffective:"",
            fileTransLength:'',
            TransLimiting:'',
            TransAutoFreQuency:'',
        },
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
       getdataList(){
          this.BaseRequest({
              url: '/parameter/parameterselect',
              method: 'get',
              params: {}
          }).then((res) => {
            console.log(res)
            var json = res[0];
            this.sysParamsConfig.id = json.id;
            this.sysParamsConfig.paramsKey = json.aes_key; 
            this.sysParamsConfig.secretKey = json.secret_key; 
            this.sysParamsConfig.servWeek = json.heart_freq;
            this.sysParamsConfig.dataFileWeek = json.file_backup; 
            this.sysParamsConfig.logEffective = json.log_backup; 
            this.sysParamsConfig.fileTransLength = json.tran_timeout;
            this.sysParamsConfig.TransLimiting = json.limit_rate;
            this.sysParamsConfig.TransAutoFreQuency = json.retries;
            this.sysParamsConfig.createdTime = json.create_time;
            this.sysParamsConfig.lastEditTime = json.update_time;
          })
       },
        openEditModal: function () {//修改
            this.editShowModalPage = true;
            this.editSysParamsConfig.id = this.sysParamsConfig.id;
            this.editSysParamsConfig.paramsKey = this.sysParamsConfig.paramsKey;
            this.editSysParamsConfig.secretKey = this.sysParamsConfig.secretKey;
            this.editSysParamsConfig.servWeek = this.sysParamsConfig.servWeek;
            this.editSysParamsConfig.dataFileWeek = this.sysParamsConfig.dataFileWeek;
            this.editSysParamsConfig.logEffective = this.sysParamsConfig.logEffective;
            this.editSysParamsConfig.fileTransLength = this.sysParamsConfig.fileTransLength;
            this.editSysParamsConfig.TransLimiting = this.sysParamsConfig.TransLimiting;
            this.editSysParamsConfig.TransAutoFreQuency = this.sysParamsConfig.TransAutoFreQuency;
        },
        editSubmitDataForm: function () {//修改弹窗 
            if (this.editSysParamsConfig.secretKey == "" 
                || this.editSysParamsConfig.servWeek == "" || this.editSysParamsConfig.dataFileWeek == "" || this.editSysParamsConfig.logEffective == ""
                || this.editSysParamsConfig.fileTransLength == "" || this.editSysParamsConfig.TransLimiting == "" || this.editSysParamsConfig.TransAutoFreQuency == "") {
                this.$notify({
                    dangerouslyUseHTMLString: true,       
                    message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数均平不允许为空</span><br>secret key、服务心跳周期（秒）、数据文件有效期（天）、日志有效期（天）、文件传输超时时长（秒)、传输限速（KB/s)、传输自动重试次数'
                })
            }else if(!reg.test(this.editSysParamsConfig.servWeek) || !reg.test(this.editSysParamsConfig.dataFileWeek)|| !reg.test(this.editSysParamsConfig.logEffective)
                || !reg.test(this.editSysParamsConfig.fileTransLength) || !reg.test(this.editSysParamsConfig.TransLimiting) || !reg.test(this.editSysParamsConfig.TransAutoFreQuency)) {
                this.$notify({
                      dangerouslyUseHTMLString: true,       
                      message: '<span style="font-size:15px;color:red;font-weight: bold">以下参数只能输入数字</span><br>服务心跳周期（秒）、数据文件有效期（天）、日志有效期（天）、文件传输超时时长（秒)、传输限速（KB/s)、传输自动重试次数'
                  })
            }else{
                this.BaseRequest({
                    url: '/parameter/updateparameter',
                    method: 'get',
                    params: {
                        'id': this.editSysParamsConfig.id,
                        'aes_key': this.editSysParamsConfig.paramsKey,
                        'secret_key':this.editSysParamsConfig.secretKey, 
                        'heart_freq':this.editSysParamsConfig.servWeek,
                        'file_backup':this.editSysParamsConfig.dataFileWeek, 
                        'log_backup':this.editSysParamsConfig.logEffective, 
                        'tran_timeout':this.editSysParamsConfig.fileTransLength,
                        'limit_rate':this.editSysParamsConfig.TransLimiting,
                        'retries':this.editSysParamsConfig.TransAutoFreQuency,
                    }
                }).then((res) => {
                    this.Message.success('修改成功');
                    this.getdataList();
                    this.closeModal();
                })
            }
        },
        closeModal: function () {
            this.editShowModalPage = false;
        },
    },
    mounted: function () {
      this.getdataList();
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
  .editBtn{
   margin-top: 15px;
  }
</style>
