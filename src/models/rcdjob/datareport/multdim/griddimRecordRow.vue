<template>
  <tr class="el-table__row mini-font-size " >
    <td style="width:60px" colspan="1" rowspan="1" class="  is-center table-row" :class="{'table-row-color':(rowLineNumber%2==0)}">
      {{rowLineNumber+1}}
    </td>
    <td v-for="unitFld in unitFlds" colspan="1" rowspan="1" class="is-center table-row " :class="{'table-row-color':(rowLineNumber%2==0)}">
      <!--<td v-for="(unitFld,index) in unitFlds" colspan="1" rowspan="1" class="is-center table-row ">{{index}}-->
      <div class="cell">
        <div class="el-form-item" style="margin: auto;">
          <div class="el-form-item__content">
            <div v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" class="el-input el-input--mini "
                 v-bind:class="{ 'el-input-group el-input-group--append':(unitFld.fld_point!=null&&unitFld.fld_point!=''),
                                 'is-disabled': (isView=='Y'||unitFld.fld_range=='1')}">
              <input :disabled="isView=='Y'||unitFld.fld_range=='1'" placeholder="请输入" v-model="reportDataLine['f'+unitFld.fld_id]" class="el-input__inner"></input>
              <div v-if="unitFld.fld_point!=null&&unitFld.fld_point!=''" class="el-input-group__append">{{unitFld.fld_point}}</div>
            </div>
            <!--<el-input  v-if="unitFld.fld_data_type==0||unitFld.fld_data_type==1" size="mini" v-model="reportDataLineArray[rowLineNumber][unitFld.fld_id]" >-->
            <!--<template v-if="unitFld.fld_point!=null&&unitFld.fld_point!=''" slot="append">{{unitFld.fld_point}}</template>-->
            <!--</el-input>-->
            <el-date-picker v-if="unitFld.fld_data_type==2" size="mini" align="left"
                            v-model="reportDataLine['f'+unitFld.fld_id]"
                            :disabled="isView=='Y'||unitFld.fld_range=='1'"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>

            <el-select :disabled="isView=='Y'||unitFld.fld_range=='1'" @change="refreshData" v-model="reportDataLine['f'+unitFld.fld_id]" v-if="unitFld.fld_data_type==3">
            <!--<el-select v-model="reportDataLine['f'+unitFld.fld_id]" v-if="unitFld.fld_data_type==3">-->
              <el-option v-for="dictObj in fldDicts['f'+unitFld.fld_id]"
                         :key="dictObj.dict_content_value"
                         :label="dictObj.dict_content_name"
                         :value="dictObj.dict_content_value">
              </el-option>
            </el-select>
            <div v-if="validateResultObj!=null&&validateResultObj['f'+unitFld.fld_id]!=null"
                 style="padding:0;margin:0;font-size:8px;color:red;">{{validateResultObj['f'+unitFld.fld_id]}}</div>
          </div>
        </div>
      </div>
    </td>


    <td v-if="isView=='N'" colspan="1" rowspan="1" class="  is-center  table-row " :class="{'table-row-color':(rowLineNumber%2==0)}">
      <el-button type="text" size="small" @click="removeLine(arrayIndex,dataArrayName,needRecordDel)">删除</el-button>
    </td>

  </tr>

</template>


<script>
  import WorkMain from "@/models/public/WorkMain"

  export default {
    name: "GriddimRecordRow",
    describe:"表格内的数据行",
    components: {
      WorkMain
    },
    props:{
      dataArrayName:{
        type:String
      },
      reportDataLine:{
        type:Object
      },
      rowLineNumber:{
        type:Number
      },
      arrayIndex:{
        type:Number
      },
      unitFlds:{
        type:Array
      },
      fldDicts:{
        type:Object
      },
      removeLine:{
        type:Function
      },
      needRecordDel:{
        type:Boolean
      },
      validateResultObj:{
        type:Object
      },
      isView:{
        type:String
      }
    },
    data() {
      return {}
    },
    methods:{
      refreshData(){
        let arrayDataCopy = this.reportDataLine
        this.reportDataLine = null
        this.reportDataLine = arrayDataCopy
      }
    },
    mounted:function(){

    },
    activated(){

    }
  }
</script>
