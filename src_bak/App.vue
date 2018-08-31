<template>
  <div id="app">
    <!--顶部标题  start-->
    <el-row :class="['headBg']">
      <el-col :span="18" :offset="3" :class="['headFont']">行政服务单</el-col>
    </el-row>
    <!--顶部标题  end-->

    <el-row>
      <el-col :span="18" :offset="3">
        <div style="padding-top: 34px;">

          <!--<el-form :model="formData" status-icon :rules="formRules" ref="formData">-->
            <!--行政服务基本信息板块  start-->
            <my-panel title="行政服务基本信息" :my-style="{marginBottom:'20px'}">
              <div slot="my-panel-body">
                <el-row :gutter="16">
                  <el-col :span="18" :offset="3">
                    <span class="fl">
                      <i class="iconfont icon-gongdan" :style="{color:bgColor}"></i>
                      <span class="topinfoItemT">流水号：</span><span :style="{color:bgColor}" v-html="sno"></span>
                    </span>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop']">
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>求助渠道</el-col>
                  <el-col :span="9">
                    <!--<el-form-item prop="CHANNEL">-->
                      <Select v-model="CHANNEL" :class="['fullWidth']" clearable>
                        <Option v-for="item in $store.state.chanelList" :value="item.id">{{ item.name }}</Option>
                      </Select>
                    <!--</el-form-item>-->
                  </el-col>
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>国家</el-col>
                  <el-col :span="9">
                    <Select v-model="CONTRY" :class="['fullWidth']" disabled>
                      <Option v-for="item in $store.state.countryList" :value="item.id">{{ item.name }}</Option>
                    </Select>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop']">
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>城市</el-col>
                  <el-col :span="9">
                    <tile-select p-title="请选择一个城市" :data="$store.state.cityList" textFiled="CITYCHNNAME" valueFiled="CITYCHNNAME" v-model="CITY"></tile-select>
                  </el-col>
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>园区</el-col>
                  <el-col :span="9">
                    <tile-select p-title="请选择一个园区" :data="$store.state.parkList" textFiled="PROPERTYNAME" valueFiled="PROPERTYNAME" v-model="PARK" :disabled="disablePark"></tile-select>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop']">
                  <el-col :span="3" :class="['alignRight']">楼栋</el-col>
                  <el-col :span="5">
                    <Select v-model="BUILDING" :class="['fullWidth']" :clearable="!disablebuild" :disabled="disablebuild">
                      <Option v-for="item in $store.state.buildList" :value="item.BUILDNAME">{{ item.BUILDNAME }}</Option>
                    </Select>
                  </el-col>
                  <el-col :span="1" :class="['alignRight']">楼层</el-col>
                  <el-col :span="3">
                    <Select v-model="FLOORS" :class="['fullWidth']" :clearable="!disablefloor" :disabled="disablefloor">
                      <Option v-for="item in $store.state.floorList" :value="item.FLOORNAME">{{ item.FLOORNAME }}</Option>
                    </Select>
                  </el-col>
                  <el-col :span="3" :class="['alignRight']">关联设备</el-col>
                  <el-col :span="9">
                    <tile-select p-title="请选择一个设备" :data="$store.state.assetList" textFiled="spi:triNameTX" valueFiled="spi:triNameTX" v-model="EQUIPMENT" :disabled="disableasset"></tile-select>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop','padBot']">
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>需求人</el-col>
                  <el-col :span="9">
                    <Input v-model="DEMAND_USER" placeholder="请输入" :class="['fullWidth']"></Input>
                  </el-col>
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>录单人</el-col>
                  <el-col :span="9">
                    <Input v-model="INPUT_PERSON" placeholder="请输入" :class="['fullWidth']"></Input>
                  </el-col>
                </el-row>
              </div>
            </my-panel>
            <!--行政服务基本信息板块  end-->

            <!--行政服务问题信息  start-->
            <my-panel title="行政服务问题信息">
              <div slot="my-panel-body">
                <el-row :gutter="16">
                  <el-col :span="3" :class="['alignRight']">问题来源</el-col>
                  <el-col :span="9" :class="['alignLeft']">
                    <el-radio-group v-model="QUEST_SOURCE">
                      <el-radio :label="1">行政</el-radio>
                      <el-radio :label="2">员工</el-radio>
                      <el-radio :label="3">内部</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="3" :class="['alignRight']">问题种类</el-col>
                  <el-col :span="9">
                    <Select v-model="QUEST_TYPE" :class="['fullWidth']" clearable>
                      <Option v-for="item in $store.state.questTypeList" :value="item['spi:triNameTX']">{{ item['spi:triNameTX'] }}</Option>
                    </Select>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop']">
                  <el-col :span="3" :class="['alignRight']">处理优先级</el-col>
                  <el-col :span="9">
                    <Select v-model="URGENT" :class="['fullWidth']" clearable>
                      <Option v-for="item in $store.state.urgentList" :value="item['spi:triNameTX']">{{ item['spi:triNameTX'] }}</Option>
                    </Select>
                  </el-col>
                  <el-col :span="3" :class="['alignRight']">问题处理人</el-col>
                  <el-col :span="9">
                    <Input v-model="QUEST_HANDLE_PERSON" placeholder="请输入" :class="['fullWidth']"></Input>
                    <!--<select-country @changeval="changeval"></select-country>-->
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop']">
                  <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>问题描述</el-col>
                  <el-col :span="21">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="QUEST_DESCRIBE"></el-input>
                    <mount :class="'fr'">
                      <span slot="enter-mount">{{QUEST_DESCRIBE.length}}</span>
                      <span slot="total-mount">2000</span>
                    </mount>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop2']">
                  <el-col :span="3" :class="['alignRight']">解决方案</el-col>
                  <el-col :span="21">
                    <!--<text-editor></text-editor>-->
                    <!--<text-editor v-model="tinymce"></text-editor>-->
                    <!--<el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="content"></el-input>-->
                    <editor class="editor" v-model="SOLVE_METHOD"  :setting="editorSetting" ></editor>
                    <mount :class="'fr'">
                      <span slot="enter-mount">{{SOLVE_METHODlength}}</span>
                      <span slot="total-mount">2000</span>
                    </mount>
                  </el-col>
                </el-row>
                <el-row :gutter="16" :class="['padTop2']">
                  <el-col :span="18" :offset="3">
                    <!--<Upload multiple action="//jsonplaceholder.typicode.com/posts/"
                            :before-upload="beforeUpload"
                            :on-remove="onRemove"
                            :on-success="onSuccess"
                            :on-error="onError"
                    >-->
                    <Upload multiple :action="updateUrl"
                            :before-upload="beforeUpload"
                            :on-remove="onRemove"
                            :on-success="onSuccess"
                            :on-error="onError">
                      <i-button type="primary" icon="ios-cloud-upload-outline">上传附件</i-button>
                    </Upload>
                  </el-col>
                </el-row>
              </div>
            </my-panel>
            <!--行政服务问题信息  end-->
          <!--</el-form>-->

          <el-row :class="['padTop','padBot']">
            <el-col :span="3" :offset="7" :class="['alignCenter']">
              <el-button type="primary" @click="commitAll('U5003838','1')" size="medium">已解决</el-button>
            </el-col>
            <el-col :span="4" :class="['alignCenter']">
              <el-button size="medium"  @click="commitAll('U5003838','0')">保存草稿</el-button>
            </el-col>
            <el-col :span="3" :class="['alignCenter']">
              <el-button size="medium" @click="commitAll('U5003833','2','/worktask/createRequest')">升级</el-button>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import myPanel from './base/my-panel'
import tileSelect from './base/tileSelect'
import { Loading } from 'element-ui';
import mount from './base/mount'
import api from './api'
// import formRules from './base/formRules'
//import textEditor from './base/text-editor/text-editor'
import editor from '@/base/text-editor/text-editor'
export default {
  name: 'App',
  components: {
    tileSelect,myPanel,mount,editor
  },
  created(){
    this.$store.dispatch('cityList'); //获取可选城市
    this.$store.dispatch('questTypeList'); //获取可选问题类型
    this.$store.dispatch('urgentList'); //获取可选处理优先级
  },
  data(){
    return {
      bgColor:'#3D83D2',
      sno:'',  //流水号
      fullscreenLoading:false,
      editorSetting:{
        height:200
      },
      fileLits:{},
      updateUrl:''
    }
  },
  methods:{
    commitAll(service,STATE,title) {
      if(!this.check()){return}
      let loadingInstance = Loading.service({
        text:'正在提交，请稍后。。。',
        background:'rgba(30,30,30,0.3)'
      });
      this.$nextTick(async () => {
        try {
          let data = JSON.parse(JSON.stringify(this.$store.state));
          await api.commitAll(data,service,STATE,title);
          loadingInstance.close();
          this.$message({
            message: '恭喜你，行政工单提交成功。',
            type: 'success'
          });
        }catch (e) {
          loadingInstance.close();
          this.$message.error('出错了哦，请重试或联系管理员');
        }
      });
    },
    check(){
      let yes = true;
      let data = this.$store.state;

      if(!data['QUEST_DESCRIBE']){this.$message({message: '“问题描述”必须填写！',type: 'warning',showClose: true});yes=false;};
      if(!data['INPUT_PERSON']){this.$message({message: '“录单人”必须填写！',type: 'warning',showClose: true});yes=false;};
      if(!data['DEMAND_USER']){this.$message({message: '“需求人”必须填写！',type: 'warning',showClose: true});yes=false;};
      if(!data['PARK']){this.$message({message: '“园区”必须填写！',type: 'warning',showClose: true});yes=false;};
      if(!data['CITY']){this.$message({message: '“城市”必须填写！',type: 'warning',showClose: true});yes=false;};
      if(!data['CONTRY']){this.$message({message: '“国家”必须填写！',type: 'warning',showClose: true});yes=false;};
      if(!data['CHANNEL']){this.$message({message: '“求助渠道”必须填写！',type: 'warning',showClose: true});yes=false;};


      return yes;
    },
    //获取url?后面传递过来的参数
    getUrlArgument(){
      var url=location.search;
      var Request = {};
      if(url.indexOf("?")!=-1){
        var str = url.substr(1);
        var strs= str.split("&");
        for(var i=0; i<strs.length; i++){
          Request[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
      }
      return Request;
    },
    beforeUpload(file){
      if(file.size > 10*1024*1024){
        this.$message({
          type:'warning',
          message:'你选取的文件大小超过了最大限制10M！'
        })
        return false;
      }
      return true;
    },
    onRemove(file, fileList){
      let arr = this.$store.state.EDOCID.split(',');
      arr = arr.filter((item)=>{
        return item !== this.fileLits[file.lastModified];
      })
      this.$store.commit('EDOCID',arr.join(','));
    },
    onSuccess(response, file, fileList){
      top.ajaxRequest({
        req: [{
          service: "U1008501",
          ATTA_CHNL: '2',
          ATTA_NAME: response[0]['data'][0]['FILECON'],
          ATTA_URL: response[0]['data'][0]['FILEVIEWURL'],
          ATTA_SIZE: response[0]['data'][0]['FILESIZE']
        }],
        func: (data) => {
          if (data[0][0]["ID"]) {
            this.fileLits[file.lastModified] = data[0][0]["ID"];
            this.$store.commit('EDOCID',this.$store.state.EDOCID+data[0][0]["ID"]+',')
          }
        }
      })
    },
    onError(){
      this.$message.error('出错了哦，请重试或联系管理员')
    }
  },
  computed:{
    CHANNEL:{
      get(){
        return this.$store.state.CHANNEL;
      },
      set(val){
        this.$store.commit('CHANNEL',val);
      }
    },
    CONTRY:{
      get(){
        return this.$store.state.CONTRY;
      },
      set(val){
        this.$store.commit('CONTRY',val);
      }
    },
    CITY:{
      get(){
        return this.$store.state.CITY;
      },
      set(val){
        this.$store.commit('parkList',[]);
        this.$nextTick(()=>{
          this.PARK = '';
          this.$store.dispatch('parkList',val);
          this.$store.commit('CITY',val);
        })
      }
    },
    PARK:{
      get(){
        return this.$store.state.PARK;
      },
      set(val){
        this.$store.commit('buildList',[]);
        this.$nextTick(()=>{
          this.BUILDING = '';
          this.$store.dispatch('buildList',val);
          this.$store.commit('PARK',val);
          this.$store.commit('PARK_SPEC_ID');
          this.$store.dispatch('assetList');
        })
      }
    },
    BUILDING:{
      get(){
        return this.$store.state.BUILDING;
      },
      set(val){
        this.$store.commit('floorList',[]);
        this.$nextTick(()=>{
          this.FLOORS = '';
          this.$store.dispatch('floorList',val);
          this.$store.commit('BUILDING',val);
          this.$store.dispatch('assetList');
        })
      }
    },
    FLOORS:{
      get(){
        return this.$store.state.FLOORS;
      },
      set(val){
        this.$store.commit('FLOORS',val);
        this.$nextTick(()=>{
          this.$store.dispatch('assetList');
        })
      }
    },
    EQUIPMENT:{
      get(){
        return this.$store.state.EQUIPMENT;
      },
      set(val){
        this.$store.commit('EQUIPMENT',val);
        if(val){
          let tm = this.$store.state.assetList.find(item=>{
            return item['spi:triNameTX'] == val;
          })['spi:triIdTX'];
          this.$store.commit('EQUIPMENT_ID',tm);
        }else{
          this.$store.commit('EQUIPMENT_ID','');
        }
      }
    },
    DEMAND_USER:{
      get(){
        return this.$store.state.DEMAND_USER;
      },set(val){
        this.$store.commit('DEMAND_USER',val);
      }
    },
    INPUT_PERSON:{
      get(){
        return this.$store.state.INPUT_PERSON;
      },set(val){
        this.$store.commit('INPUT_PERSON',val);
      }
    },
    QUEST_SOURCE:{
      get(){
        return this.$store.state.QUEST_SOURCE;
      },set(val){
        this.$store.commit('QUEST_SOURCE',val);
      }
    },
    QUEST_TYPE:{
      get(){
        return this.$store.state.QUEST_TYPE;
      },set(val){
        this.$store.commit('QUEST_TYPE',val);
      }
    },
    URGENT:{
      get(){
        return this.$store.state.URGENT;
      },set(val){
        this.$store.commit('URGENT',val);
      }
    },
    QUEST_HANDLE_PERSON:{
      get(){
        return this.$store.state.QUEST_HANDLE_PERSON;
      },set(val){
        this.$store.commit('QUEST_HANDLE_PERSON',val);
      }
    },
    QUEST_DESCRIBE:{
      get(){
        return this.$store.state.QUEST_DESCRIBE;
      },set(val){
        this.$store.commit('QUEST_DESCRIBE',val);
      }
    },
    SOLVE_METHOD:{
      get(){
        return this.$store.state.SOLVE_METHOD;
      },set(val){
        this.$store.commit('SOLVE_METHOD',val);
      }
    },
    SOLVE_METHODlength(){
      // return this.SOLVE_METHOD.replace(/<[^>]+>/g,'').replace(/&[a-z]{1,4};/g,' ').length;
      return this.SOLVE_METHOD.length;
    },
    disablePark(){
      return this.$store.state.CITY?false:true;
    },
    disablebuild(){
      return this.$store.state.PARK?false:true;
    },
    disablefloor(){
      return this.$store.state.BUILDING?false:true;
    },
    disableasset(){
      return (this.$store.state.PARK||this.$store.state.BUILDING||this.$store.state.FLOORS) ? false:true;
    },
    formData(){
      return this.$store.state;
    }
  },
  async mounted(){
    let UrlArgument = this.getUrlArgument();
    this.updateUrl = top.njs.ipUrl+'/njdf_upload?DIR=import';
    let CALL_CODE = UrlArgument['CALL_SNO'];
    let DEMAND_USER = UrlArgument['cust_code'];
    this.$store.commit('CALL_CODE',CALL_CODE);
    this.$store.commit('DEMAND_USER',DEMAND_USER);
    this.sno = '<a onclick=top.showDetail("'+ this.$store.state.CALL_CODE +'")>'+ this.$store.state.CALL_CODE +'</a>';
    if(UrlArgument.flag == 3){  //如果是点击修改草稿进入的该页面
      let queryInfo = await api.queryInfo(CALL_CODE);
      queryInfo.CHANNEL ? this.$store.commit('CHANNEL',queryInfo.CHANNEL) : '';
      queryInfo.CONTRY ? this.$store.commit('CONTRY',queryInfo.CONTRY) : '';
      queryInfo.PROVINCE ? this.$store.commit('PROVINCE',queryInfo.PROVINCE) : '';
      queryInfo.CITY ? this.$store.commit('CITY',queryInfo.CITY) : '';
      queryInfo.PARK ? this.$store.commit('PARK',queryInfo.PARK,queryInfo.PARK_SPEC_ID) : '';
      queryInfo.BUILDING ? this.$store.commit('BUILDING',queryInfo.BUILDING) : '';
      queryInfo.FLOORS ? this.$store.commit('FLOORS',queryInfo.FLOORS) : '';
      queryInfo.EQUIPMENT ? this.$store.commit('EQUIPMENT',queryInfo.EQUIPMENT) : '';
      queryInfo.EQUIPMENT_ID ? this.$store.commit('EQUIPMENT_ID',queryInfo.EQUIPMENT_ID) : '';
      queryInfo.DEMAND_USER ? this.$store.commit('DEMAND_USER',queryInfo.DEMAND_USER) : '';
      queryInfo.INPUT_PERSON ? this.$store.commit('INPUT_PERSON',queryInfo.INPUT_PERSON) : '';
      queryInfo.QUEST_SOURCE ? this.$store.commit('QUEST_SOURCE',queryInfo.QUEST_SOURCE) : '';
      queryInfo.URGENT ? this.$store.commit('URGENT',queryInfo.URGENT) : '';
      queryInfo.QUEST_HANDLE_PERSON ? this.$store.commit('QUEST_HANDLE_PERSON',queryInfo.QUEST_HANDLE_PERSON) : '';
      queryInfo.QUEST_DESCRIBE ? this.$store.commit('QUEST_DESCRIBE',queryInfo.QUEST_DESCRIBE) : '';
      queryInfo.SOLVE_METHOD ? this.$store.commit('SOLVE_METHOD',queryInfo.SOLVE_METHOD) : '';
      queryInfo.EDOCID ? this.$store.commit('EDOCID',queryInfo.EDOCID) : '';
    }
  }
}
</script>

<style lang="less">
  html,body{margin: 0; font-family: "Microsoft YaHei"; background-color: rgb(245,246,248)}
  a{ text-decoration: none; }
  .clear{zoom: 1;}
  .clear:after{ content: ''; display: block; clear: both;}
  .fl{ float: left;}
  .fr{ float: right;}
  .alignRight{ text-align: right; line-height: 32px; white-space: nowrap;}
  .alignLeft{ line-height: 32px;}
  .requM{ color: #F42E47; font-weight: bold;}
  .fullWidth{ width: 100%;}
  .alignCenter{ text-align: center;}
  .ivu-input,.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{ font-size: 14px;}

  .headBg{background:#3D83D2; height: 30px;}
  .headFont{line-height: 30px; color: #fff; font-size: 16px;}
  .topinfoItemT{ padding-left: 2px;}
  .padTop{ padding-top: 20px;}
  .padBot{ padding-bottom: 20px;}
  .padTop2{ padding-top: 8px;}
</style>

