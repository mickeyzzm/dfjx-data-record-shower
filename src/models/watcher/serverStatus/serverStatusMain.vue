<template>
  <WorkMain :headerItems="['server状态']">
    <div class="publicClass">
      <el-row>
        <el-col :span="24">
          <el-row>
              <div>
                  <img src="../../../../static/image/serverImg.png" alt="" class="activeimg">
                  <img src="../../../../static/image/serverImg.png" alt="" class="standbyimg">
              </div>
              <div class="countent">
                  <p><span>状态：</span><span >{{isStatusRun1}}</span></p>
                  <p><span>状态：</span><span >{{isStatusRun2}}</span></p>
              </div>
              <div class="countents">
                  <p><span>服务器:</span><span>{{server1}}</span></p>
                  <p><span>服务器:</span><span>{{server2}}</span></p>
              </div>
              <div class="countentfooter">总共存储空间{{totalSpace}}&nbsp;&nbsp;&nbsp;已使用空间{{alreadyUsed}}&nbsp;&nbsp;&nbsp;剩余空间{{surplusSpace}} </div>
          </el-row>
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
    name: 'serverStatusMain',
    data () {
      return {
        isStatusRun1:"",
        isStatusRun2:"",
        server1:"",
        server2:"",
        totalSpace:"",
        surplusSpace:"",
        alreadyUsed:"",
        message: 'Hello',
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
              url: '/monitor/tbserverselect',
              method: 'get',
              params: {}
          }).then((res) => {
              // console.log(res)
              var json = res[0];
              this.isStatusRun1 = json.status1;
              this.isStatusRun2 = json.status2;
              this.server1 = json.server1;
              this.server2 = json.server2;
              this.totalSpace = json.total;
              this.alreadyUsed = json.used;
              this.surplusSpace = json.free;
          })
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
  .activeimg{
    display: inline-block;
  }
  .standbyimg{
    display: inline-block;
    margin-left: 200px;
  }
  .countent,.countents{
      display: flex;
      color: #555958;
      justify-content: center;  
  }
  .countent p:nth-child(2){
     margin-left: 170px;
  }
  .countents p:nth-child(2){
     margin-left: 90px;
  }
  .countentfooter{
      margin-top: 10px;
      font-size: 15px;
  }
  .publicClass{
    padding-top: 100px;
    height: 88%;
  }
  // .activeT{
  //   color: blue;
  // }
  // .activeF{
  //   color: red;
  // }
</style>
