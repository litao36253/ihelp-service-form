export  default {
  chanelList:[{id:'51',name:'电话'},{id:'16',name:'邮件'},{id:'15',name:'APP'}],//求助渠道列表
  countryList:[{id:'中国',name:'中国'}],//可选国家
  cityList:[],//可选的城市列表
  parkList:[],//可选的园区列表
  buildList:[],//可选的楼栋列表
  floorList:[],//可选的楼层列表
  assetList:[],//设备列表
  questTypeList:[],//问题类型列表
  urgentList:[],//问题优先级列表

  CHANNEL:'',//选中的渠道编号
  CONTRY:'中国',//选中的国家
  PROVINCE:'',//选择城市时得到的省份中文名
  CITY:'',//选中城市中文名
  PARK:'',//选中园区中文名
  PARK_SPEC_ID:"",  //选中园区编号
  BUILDING:'', //BUILDNAME
  FLOORS:'',//FLOORNAME
  EQUIPMENT:'',//spi：triNameTX
  EQUIPMENT_ID:'',//spi:trildTX
  DEMAND_USER:'',//需求人，通过url获取到的
  INPUT_PERSON:"",//录单人
  QUEST_SOURCE:1,//问题来源
  QUEST_TYPE:'',//问题种类
  QUEST_TYPE_PATH:'',//问题种类编号
  URGENT:'',//问题优先级
  QUEST_HANDLE_PERSON:'',//问题处理人
  QUEST_DESCRIBE:'',
  SOLVE_METHOD:'',
  EDOCID:',',//附件编号串
  CALL_CODE:''//通话流水号，通过url获取
}
