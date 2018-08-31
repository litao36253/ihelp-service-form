export let formRules = {
  CHANNEL:[
    { required: true, message: '请选择求助渠道', trigger: 'change' }
   ],
  CONTRY:[
    { required: true, message: '请选择国家', trigger: 'change' }
  ],
  CITY_SPEC_ID:[
    { required: true, message: '请选择城市', trigger: 'change' }
  ],
  PARK_SPEC_ID:[
    { required: true, message: '请选择园区', trigger: 'change' }
  ],
  QUEST_SOURCE:[
    { required: true, message: '请选择一个问题来源', trigger: 'change' }
  ],
  DEMAND_USER:[
    { required: true, message: '请填写需求人', trigger: 'change' }
  ],
  QUEST_DESCRIBE:[
    { required: true, message: '请输入问题描述', trigger: 'change' }
  ],
  INPUT_PERSON:[
    { required: true, message: '请填写录单人', trigger: 'change' }
  ],
  QUEST_TYPE_PATH:[
    {
      validator:(rule, value, callback)=>{
        if(formRulesContory.QUEST_TYPE_PATH){
          if(value==''){
            callback(new Error('如需升级服务单则必须选择问题种类'));
          }else{
            callback();
          }
        }else{
          callback();
        }
      },
      trigger: 'change'  }
  ],
  URGENT:[
    {
      validator:(rule, value, callback)=>{
        if(formRulesContory.URGENT){
          if(value==''){
            callback(new Error('如需升级服务单则必须选择处理优先级'));
          }else{
            callback();
          }
        }else{
          callback();
        }
      },
      trigger: 'change'  }
  ],
  BUILD_SPEC_ID:[
    {
      validator:(rule, value, callback)=>{
        if(formRulesContory.BUILD_SPEC_ID){
          if(value==''){
            callback(new Error('如需升级服务单则必须选择楼栋'));
          }else{
            callback();
          }
        }else{
          callback();
        }
      },
      trigger: 'change'  }
  ],
  SOLVE_METHOD:[
    {
      validator:(rule, value, callback)=>{
        if(formRulesContory.SOLVE_METHOD){
          if(value==''){
            callback(new Error('如行政服务问题已解决则必须填写解决方案'));
          }else{
            callback();
          }
        }else{
          callback();
        }
      },
      trigger: 'change'  }
  ]
}

let noRules = [
  {
    validator:(rule, value, callback)=>{
      callback();
    },
    trigger:'submit'
  }
]

formRules.CALL_CODE = formRules.FLOOR_SPEC_ID = formRules.EQUIPMENT_ID = formRules. QUEST_HANDLE_PERSON = noRules;

export let formRulesContory =  {
  QUEST_TYPE_PATH : true,
  URGENT:true,
  BUILD_SPEC_ID:true,
  SOLVE_METHOD:true

}
