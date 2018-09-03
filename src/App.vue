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

          <el-form :model="formData" status-icon :rules="formRules" ref="form">


          <!--行政服务基本信息板块   start    -->
          <my-panel title="行政服务基本信息" :my-style="{marginBottom:'20px'}">
            <div slot="my-panel-body">
              <el-row :gutter="16" :class="['padTop']">
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>求助渠道</el-col>
                <el-col :span="4">
                  <el-form-item prop="CHANNEL">
                    <el-select v-model="formData.CHANNEL" placeholder="请选择求助渠道" clearable size="small" :class="['fullWidth']" filterable>
                      <el-option v-for="item in selectLists.chanelList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2" :class="['alignRight']">流水号</el-col>
                <el-col :span="3">
                  <el-form-item prop="CALL_CODE">
                    <el-input placeholder="请输入流水号" :class="['fullWidth']" v-model="formData.CALL_CODE" clearable v-if="sno==''" size="small"></el-input>
                    <span v-else :style="{color:bgColor,cursor:'pointer'}" v-html="`<a onclick=top.showDetail('${formData.CALL_CODE}')>${formData.CALL_CODE}</a>`"></span>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>国家</el-col>
                <el-col :span="9">
                  <el-form-item prop="CONTRY">
                    <el-select v-model="formData.CONTRY" disabled placeholder="请选择国家" clearable size="small" :class="['fullWidth']" filterable>
                      <el-option v-for="item in selectLists.countryList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="16">
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>城市</el-col>
                <el-col :span="9">
                  <el-form-item prop="CITY_SPEC_ID">
                    <titl-select v-model="formData.CITY_SPEC_ID" :listdata="selectLists.cityList" textfild="CITYCHNNAME" idfiled="CITY_SPEC_ID" title="请选择城市"></titl-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>园区</el-col>
                <el-col :span="9">
                  <el-form-item prop="PARK_SPEC_ID">
                    <titl-select v-model="formData.PARK_SPEC_ID" :listdata="selectLists.parkList" textfild="PROPERTYNAME" idfiled="PROPERTY_SPEC_ID" title="请选择园区" :disabled="formData.CITY_SPEC_ID==''"></titl-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="16">
                <el-col :span="3" :class="['alignRight']">楼栋</el-col>
                <el-col :span="4">
                  <el-form-item prop="BUILD_SPEC_ID">
                    <el-select v-model="formData.BUILD_SPEC_ID" placeholder="请选择楼栋" clearable size="small" :class="['fullWidth']" :disabled="formData.PARK_SPEC_ID==''" filterable>
                      <el-option v-for="item in selectLists.buildList" :label="item.BUILDNAME" :value="item.BUILD_SPEC_ID"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2" :class="['alignRight']">楼层</el-col>
                <el-col :span="3">
                  <el-form-item prop="FLOOR_SPEC_ID">
                    <el-select v-model="formData.FLOOR_SPEC_ID" placeholder="请选择楼层" clearable size="small" :class="['fullWidth']" :disabled="formData.BUILD_SPEC_ID==''" filterable>
                      <el-option v-for="item in selectLists.floorList" :label="item.FLOORNAME" :value="item.FLOOR_SPEC_ID"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :class="['alignRight']">关联设备</el-col>
                <el-col :span="9">
                  <el-form-item prop="EQUIPMENT_ID">
                    <accs-select v-model="formData.EQUIPMENT_ID" :listdata="selectLists.assetList" textfild="spi:triNameTX" idfiled="spi:triIdTX" title="请选择关联设备" :disabled="!(formData.PARK_SPEC_ID||formData.BUILD_SPEC_ID||formData.FLOOR_SPEC_ID)" :remote-method="remoteMethod" :loading="accsLoading" :assa-init="assaInit" :assa-page="assaPage"></accs-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="16" >
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>需求人</el-col>
                <el-col :span="9">
                  <el-form-item prop="DEMAND_USER">
                    <peple-select v-model="formData.DEMAND_USER" title="请输入关键词"></peple-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>录单人</el-col>
                <el-col :span="9">
                  <el-form-item prop="INPUT_PERSON">
                    <peple-select v-model="formData.INPUT_PERSON" title="请输入关键词"></peple-select>
                  </el-form-item>
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
                  <el-form-item prop="QUEST_SOURCE">
                    <el-radio-group v-model="formData.QUEST_SOURCE">
                      <el-radio :label="1">行政</el-radio>
                      <el-radio :label="2">员工</el-radio>
                      <el-radio :label="3">内部</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>问题种类</el-col>
                <el-col :span="9">
                  <el-form-item prop="QUEST_TYPE_PATH">
                    <ques-select v-model="formData.QUEST_TYPE_PATH" @questtype="questtype" :quest-type-list="questTypeList"></ques-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="16">
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>处理优先级</el-col>
                <el-col :span="9">
                  <el-form-item prop="URGENT">
                    <el-select v-model="formData.URGENT" :class="['fullWidth']" clearable filterable size="small">
                      <el-option v-for="item in selectLists.urgentList" :value="item['spi:triNameTX']" :label="item['spi:triNameTX']"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :class="['alignRight']">问题处理人</el-col>
                <el-col :span="9">
                  <el-form-item prop="QUEST_HANDLE_PERSON">
                    <peple-select v-model="formData.QUEST_HANDLE_PERSON" title="请输入关键词"></peple-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="16">
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>问题描述</el-col>
                <el-col :span="21">
                  <el-form-item prop="QUEST_DESCRIBE">
                    <el-input type="textarea" :rows="4" placeholder="请输入问题描述" v-model="formData.QUEST_DESCRIBE"></el-input>
                    <mount :mount="formData.QUEST_DESCRIBE.length" :class="'fr'">
                      <span slot="enter-mount">{{formData.QUEST_DESCRIBE.length}}</span>
                      <span slot="total-mount">2000</span>
                    </mount>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="16" >
                <el-col :span="3" :class="['alignRight']"><span class="requM">*</span>解决方案</el-col>
                <el-col :span="21">
                  <el-form-item prop="SOLVE_METHOD">
                    <editor class="editor" v-model="formData.SOLVE_METHOD"  :setting="editorSetting" ></editor>
                    <mount :mount="SOLVE_METHODlength" :class="'fr'">
                      <span slot="enter-mount">{{SOLVE_METHODlength}}</span>
                      <span slot="total-mount">2000</span>
                    </mount>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="16" :class="['padTop2']">
                <el-col :span="18" :offset="3">
                  <el-upload multiple :action="updateUrl"
                          :before-upload="beforeUpload"
                          :on-remove="onRemove"
                          :on-success="onSuccess"
                          :file-list="fileList"
                          :on-error="onError">
                    <el-button type="primary" size="small">上传附件<i class="el-icon-upload el-icon--right"></i></el-button>
                  </el-upload>
                </el-col>
              </el-row>
            </div>
          </my-panel>
          <!--行政服务问题信息  end-->
          </el-form>

          <el-row :class="['padTop','padBot']">
            <el-col :span="3" :offset="7" :class="['alignCenter']">
              <el-button type="primary"  @click="commitAll('U5003838','1')" size="medium">已解决</el-button>
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
  import mount from './base/mount'
  import api from './api'
  import editor from './base/text-editor'
  import formData from './appData/formData'
  import {formRules,formRulesContory} from './appData/formRules'
  import selectLists from './appData/selectList'
  import titlSelect from './base/titlSelect'
  import accsSelect from './base/accsSelect'
  import quesSelect from './base/quesSelect'
  import pepleSelect from './base/pepleSelect'
  export default {
    name: 'App',
    components: {
      myPanel,mount,editor,titlSelect,accsSelect,quesSelect,pepleSelect
    },
    async created(){
      let UrlArgument = this.getUrlArgument();
      this.sno = UrlArgument['CALL_SNO'] || '';
      this.OPT_SNO = UrlArgument['OPT_SNO'] || '';

      if(this.sno){
        this.formData.CALL_CODE = this.sno;
      }
      this.selectLists.cityList = await api.getCitys();
      this.selectLists.urgentList = await api.getPriority();
      //this.selectLists.questTypeList = await api.getReqeustService();
    },
    watch:{
      //选中的城市改变时
      async CITY_SPEC_ID(val){
        let cityItem = this.selectLists.cityList.find(item=>{
          return item.CITY_SPEC_ID == val;
        }) || {};
        this.formData.CITY = cityItem.CITYCHNNAME || '';
        this.formData.PROVINCE = cityItem.PROVINCECHNNAME || '';
        if(val){
          this.formData.PARK_SPEC_ID = '';
          this.selectLists.parkList = [];
          this.selectLists.parkList = await api.getParks(val);
        }else{
          this.formData.PARK_SPEC_ID = '';
          this.selectLists.parkList = [];
        }
      },
      //选中的园区改变时
      async PARK_SPEC_ID(val){
        let parkItem = this.selectLists.parkList.find(item=>{
          return item.PROPERTY_SPEC_ID == val;
        }) || {};
        this.formData.PARK = parkItem.PROPERTYNAME || '';
        if(val){
          this.formData.BUILD_SPEC_ID = '';
          this.selectLists.buildList = [];
          this.selectLists.buildList = await api.getBuilders(val);
        }else {
          this.formData.BUILD_SPEC_ID = '';
          this.selectLists.buildList = [];
        }
      },
      async BUILD_SPEC_ID(val){
        let buildItem = this.selectLists.buildList.find(item=>{
          return item.BUILD_SPEC_ID == val;
        }) || {};
        this.formData.BUILDING = buildItem.BUILDNAME || '';
        if(val){
          this.formData.FLOOR_SPEC_ID = '';
          this.selectLists.floorList = [];
          this.selectLists.floorList = await api.getFloors(val);
        }else {
          this.formData.FLOOR_SPEC_ID = '';
          this.selectLists.floorList = [];
        }
      },
      FLOOR_SPEC_ID(val){
        let floorItem = this.selectLists.floorList.find(item=>{
          return item['FLOOR_SPEC_ID'] == val;
        }) || {};
        this.formData.FLOORS = floorItem.FLOORNAME || '';
      },
      EQUIPMENT_ID(val){
        let accsItem = this.selectLists.assetList.find(item=>{
          return item['spi:triIdTX'] == val;
        }) || {};
        //this.formData.EQUIPMENT = accsItem['spi:triNameTX'] || '';
        let idfiled = accsItem['spi:triIdTX'];
        let textfild = accsItem['spi:triNameTX'];
        let spic = accsItem['spi:cstInstallLocationTX'];
        let spit = accsItem['spi:triInstallLocationTX'];
        this.formData.EQUIPMENT = idfiled+' - '+textfild+(spic?' - '+spic:'')+(spit?' - '+spit:'');
      },

      //选中的最小区域有变化时自动更新设备列表及选中设备
      async maxSpace(val){
        if(val){
          this.formData.EQUIPMENT_ID = '';
          this.selectLists.assetList = [];
          this.selectLists.assetList = await api.getAssetlist(val,1,20,'');
          this.assaInit ++;
        }else {
          this.formData.EQUIPMENT_ID = '';
          this.selectLists.assetList = [];
          this.assaInit ++;
        }
      }
    },
    data(){
      return {
        bgColor:'#3D83D2',
        fullscreenLoading:false,
        editorSetting:{
          height:200
        },
        // fileLits:{},
        fileList:[],
        updateUrl:'',
        sno:'',//url后面传过来的流水号
        OPT_SNO:'',//服务单编号
        formData,
        formRules,
        formRulesContory,
        selectLists,
        questTypeList:[],
        accsLoading:false,  //设备是否在加载中
        assaInit:0, //设备初始化次数
        assaPage:1 //设备初始化页数
      }
    },
    methods:{
      commitAll(service,STATE,title) {
        let comit = ()=>{
          if(this.formData.QUEST_DESCRIBE.length>2000){
            this.$message({
              message: '对不起，你输入的问题描述过长！',
              type: 'warning'
            });
            return;
          }
          if(this.SOLVE_METHODlength>2000){
            this.$message({
              message: '对不起，你输入的解决方案过长！',
              type: 'warning'
            });
            return;
          }

          let loadingInstance = this.$loading({
            text:'正在提交，请稍后。。。',
            background:'rgba(30,30,30,0.3)'
          });
          this.$nextTick(async () => {
            try {
              let data = JSON.parse(JSON.stringify(this.formData));
              await api.commitAll(data,service,STATE,title,this.OPT_SNO);
              loadingInstance.close();
              /*this.$message({
                message: '恭喜你，行政工单提交成功。',
                type: 'success'
              });*/
              this.$alert('恭喜你，行政工单提交成功。即将关闭窗口！', '提示消息', {
                confirmButtonText: '确定',
                callback: action => {
                  top.$N.closeTabs();
                }
              });

              // alert('行政工单提交成功。')
              setTimeout(()=>{
                top.$N.closeTabs();
              },2000)
            }catch (e) {
              loadingInstance.close();
              this.$message.error('出错了哦，请重试或联系管理员');
            }
          });
        }

        if(STATE!=0){ //非保存草稿的情况
          if(STATE==1){
            if(!this.formData['SOLVE_METHOD']){this.$message({message: '如行政服务问题已解决则必须填写“解决方案”!',type: 'warning',showClose: true})};
            this.formRulesContory.SOLVE_METHOD = true;
          }else{
            this.formRulesContory.SOLVE_METHOD = false;
          }
          if(!this.formData['QUEST_DESCRIBE']){this.$message({message: '“问题描述”为必填项，请先填写！',type: 'warning',showClose: true})};
          if(STATE==2){
            if(!this.formData['URGENT']){this.$message({message: '如需升级服务单则必须选择“处理优先级”!',type: 'warning',showClose: true})};
            this.formRulesContory.URGENT = true;
            if(!this.formData['QUEST_TYPE_PATH']){this.$message({message: '如需升级服务单则必须选择“问题种类”!',type: 'warning',showClose: true})};
            this.formRulesContory.QUEST_TYPE_PATH = true;
          }else{
            this.formRulesContory.QUEST_TYPE_PATH = false;
            this.formRulesContory.URGENT = false;
          }
          if(!this.formData['INPUT_PERSON']){this.$message({message: '“录单人”为必填项，请先填写！！',type: 'warning',showClose: true})};
          if(!this.formData['DEMAND_USER']){this.$message({message: '“需求人”为必填项，请先填写！！',type: 'warning',showClose: true})};
          if(STATE==2){
            if(!this.formData['BUILD_SPEC_ID']){this.$message({message: '如需升级服务单则必须选择“楼栋”!',type: 'warning',showClose: true})};
            this.formRulesContory.BUILD_SPEC_ID = true;
          }else{
            this.formRulesContory.BUILD_SPEC_ID = false;
          }
          if(!this.formData['PARK_SPEC_ID']){this.$message({message: '“园区”为必填项，请先填写！！',type: 'warning',showClose: true})};
          if(!this.formData['CITY_SPEC_ID']){this.$message({message: '“城市”为必填项，请先填写！！',type: 'warning',showClose: true})};
          if(!this.formData['CONTRY']){this.$message({message: '“国家”为必填项，请先填写！！',type: 'warning',showClose: true})};
          if(!this.formData['CHANNEL']){this.$message({message: '“求助渠道”为必填项，请先填写！！',type: 'warning',showClose: true})};

          this.$refs['form'].validate((valid) => {
            if (valid) {
              comit();
            }
          });
        }else{
          this.$refs['form'].clearValidate();//移除校验结果
          comit();
        }
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
        let arr = this.formData.EDOCID.split(',');
        /*arr = arr.filter((item)=>{
          return item !== this.fileLits[file.lastModified];
        })*/
        arr = arr.filter((item)=>{
          return item !== file.ATTA_ID;
        })
        this.formData.EDOCID = arr.join(',');
      },
      onSuccess(response, file, fileList){
        let FILEVIEWURL = response[0]['data'][0]['FILEVIEWURL'];
        if(FILEVIEWURL.indexOf('ShowEdmImg') > -1){
          FILEVIEWURL = FILEVIEWURL.replace('ShowEdmImg','downEdm');
        }

        top.ajaxRequest({
          req: [{
            service: "U1008501",
            ATTA_CHNL: '2',
            ATTA_NAME: response[0]['data'][0]['FILENAME'],
            ATTA_URL: FILEVIEWURL,
            ATTA_SIZE: response[0]['data'][0]['FILESIZE']
          }],
          func: (data) => {
            if (data[0][0]["ID"]) {
              file.ATTA_ID = data[0][0]["ID"];
              //file.name = '<a href="'+FILEVIEWURL+'">'+file.nam+'</a>';
              file.url = FILEVIEWURL;
              //this.fileLits[file.lastModified] = data[0][0]["ID"];
              //this.$store.commit('EDOCID',this.$store.state.EDOCID+data[0][0]["ID"]+',')
              this.formData.EDOCID += data[0][0]["ID"]+',';
              this.$nextTick(()=>{
                let a = document.getElementsByClassName('el-upload-list__item-name');
                for(let i=0; i<a.length; i++){
                  a[i].innerHTML = `<i class="el-icon-document"></i><a href="${fileList[i]['url']}" download="${fileList[i]['name']}">${fileList[i]['name']}</a>`
                }
              })
            }
          }
        })
      },
      onError(){
        this.$message.error('出错了哦，请重试或联系管理员')
      },

      questtype(val,id){
        this.formData.QUEST_TYPE = val;
        this.formData.QUEST_SPEC_ID = id;
      },

      async remoteMethod(query,pageNo,pageSize){
        this.accsLoading = true;
        let newData = await api.getAssetlist(this.maxSpace,pageNo,pageSize,query);
        if(newData.length){
          this.selectLists.assetList = newData;
          this.formData.EQUIPMENT_PAGE = pageNo;
        }else{
          this.assaPage = 1;
          this.$nextTick(()=>{
            this.assaPage = (pageNo-1)||1;
          })
        }
        this.accsLoading = false;
      }

    },
    computed:{
      CITY_SPEC_ID(){
        return this.formData.CITY_SPEC_ID;
      },
      PARK_SPEC_ID(){
        return this.formData.PARK_SPEC_ID;
      },
      FLOOR_SPEC_ID(){
        return this.formData.FLOOR_SPEC_ID;
      },
      BUILD_SPEC_ID(){
        return this.formData.BUILD_SPEC_ID;
      },
      EQUIPMENT_ID(){
        return this.formData.EQUIPMENT_ID;
      },
      QUEST_TYPE_PATH(){
        return this.formData.QUEST_TYPE_PATH;
      },
      SOLVE_METHODlength(){
        //return this.formData.SOLVE_METHOD.replace(/<[^>]+>/g,'').replace(/&[a-z]{1,4};/g,' ').length;
        return this.formData.SOLVE_METHOD.length;
      },


      //最小区域编号
      maxSpace(){
        if(this.formData.FLOORS){
          return this.formData.FLOORS;
        }else if(this.formData.BUILDING){
          return this.formData.BUILDING;
        }else if(this.formData.PARK){
          return this.formData.PARK;
        }else{
          return ''
        }
      }

    },
    async mounted(){
      let UrlArgument = this.getUrlArgument();
      this.updateUrl = top.njs.ipUrl+'/njdf_upload?DIR=import';
      let DEMAND_USER = UrlArgument['cust_code']||'';
      this.formData.DEMAND_USER = DEMAND_USER;
      this.formData.INPUT_PERSON = UrlArgument['INPUT_PERSON'] || '';
      this.questTypeList = await await api.getReqeustService() || [];
      if((UrlArgument.flag == 3) && UrlArgument['OPT_SNO']){  //如果是点击修改草稿进入的该页面
        let queryInfo = await api.queryInfo(UrlArgument['OPT_SNO']);
        this.formData.CHANNEL = queryInfo.CHANNEL||'';
        this.formData.CITY_SPEC_ID = queryInfo.CITY_SPEC_ID||'';
        this.$nextTick(()=>{
          this.formData.PROVINCE = queryInfo.PROVINCE || '';
          this.formData.CITY = queryInfo.CITY || '';
          this.formData.PARK_SPEC_ID = queryInfo.PARK_SPEC_ID || '';
          this.$nextTick(()=>{
            this.formData.PARK = queryInfo.PARK || '';
            this.formData.BUILD_SPEC_ID = queryInfo.BUILD_SPEC_ID || '';
            this.$nextTick(()=>{
              this.formData.BUILDING = queryInfo.BUILDING || '';
              this.formData.FLOOR_SPEC_ID = queryInfo.FLOOR_SPEC_ID || '';
              this.$nextTick(()=>{
                this.formData.FLOORS = queryInfo.FLOORS || '';
                this.$nextTick(async ()=>{
                  this.formData.EQUIPMENT_ID = queryInfo.EQUIPMENT_ID || '';
                  this.formData.EQUIPMENT_PAGE = parseInt(queryInfo.EQUIPMENT_PAGE) || 1;
                  if(this.formData.EQUIPMENT_PAGE!=1){
                    this.selectLists.assetList = await api.getAssetlist(this.maxSpace,this.formData.EQUIPMENT_PAGE,20,'');
                    this.assaPage = this.formData.EQUIPMENT_PAGE;
                  }
                  this.$nextTick(()=>{
                    this.formData.EQUIPMENT = queryInfo.EQUIPMENT || '';
                  })
                })
              })
            })
          })
        })
        this.formData.DEMAND_USER = queryInfo.DEMAND_USER || '';
        this.formData.INPUT_PERSON = queryInfo.INPUT_PERSON || '';
        this.formData.QUEST_SOURCE = parseInt(queryInfo.QUEST_SOURCE || 1);
        this.formData.QUEST_TYPE_PATH = queryInfo.QUEST_TYPE_PATH || '';
        this.$nextTick(()=>{
          this.formData.QUEST_TYPE = queryInfo.QUEST_TYPE || '';
          this.formData.QUEST_SPEC_ID = queryInfo.QUEST_SPEC_ID || '';
        })
        this.formData.URGENT = queryInfo.URGENT || '';
        this.formData.QUEST_HANDLE_PERSON = queryInfo.QUEST_HANDLE_PERSON || '';
        this.formData.QUEST_DESCRIBE = queryInfo.QUEST_DESCRIBE || '';
        this.formData.SOLVE_METHOD = queryInfo.SOLVE_METHOD || '';
        this.formData.EDOCID = queryInfo.EDOCID || '';
        let filelist = await api.queryFile(queryInfo.EDOCID); //通过附件编号串查询附件列表
        filelist.forEach((one)=>{
          let attOne = {};
          attOne.ATTA_ID = one['ATTA_ID'];
          attOne.name = one['ATTA_NAME'];
          attOne.url = one['ATTA_URL'];
          this.fileList.push(attOne);
        })
        this.$nextTick(()=>{
          let a = document.getElementsByClassName('el-upload-list__item-name');
          for(let i=0; i<a.length; i++){
            a[i].innerHTML = `<i class="el-icon-document"></i><a href="${this.fileList[i]['url']}" download="${this.fileList[i]['name']}">${this.fileList[i]['name']}</a>`
          }
        })

      }else{
        this.formData.INPUT_PERSON = top.g_user.USER_ACCOUNT;
      }
      /*//如果需求人存在，则根据需求人编号查询需求人城市
      if(DEMAND_USER){
        let d = await api.queryACity(DEMAND_USER);
        if(d.length){
          //this.location = d[0]['location'];
        }
      }*/
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
  .alignRight{ text-align: right; line-height: 40px; white-space: nowrap;}
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

