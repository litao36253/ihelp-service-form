let a = top.ajaxRequest;
/*let a = function () {

}*/
export default {
  //获取特定城市
  getCitys(){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003834",
          title : '/location/queryCity1',
          cityid : "128244390,128790786,128244723,128245372,128244956,128244542,128245608,128244496128245372,128244796"
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
      /*setTimeout(()=>{
        resolve([
          {
            PROVINCECHNNAME:'广东',
            PROVINCENAME:'',
            CITYCHANNAME:'深圳',
            CITY_SPEC_ID:'12'
          },
          {
            PROVINCECHNNAME:'山东',
            PROVINCENAME:'',
            CITYCHANNAME:'济南',
            CITY_SPEC_ID:'13'
          },
        ])
      },1000)*/
    })
  },

  //获取园区
  getParks(city){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003827",
          title : '/location/queryProperty',
          city_spec_id : city
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
      /*setTimeout(()=>{
        resolve([
          {
            PROPERTYNAME:'科技园',
            PROPERTY_SPEC_ID:'1101'
          },
          {
            PROPERTYNAME:'天安云谷',
            PROPERTY_SPEC_ID:'1102'
          },
        ])
      },1000)*/
    })
  },

  //获取楼栋/建筑物
  getBuilders(park){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003828",
          title : '/location/queryBuild',
          property_spec_id : park
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
      /*setTimeout(()=>{
        resolve([
          {
            'BUILD_SPEC_ID':'1201',
            'BUILDNAME':'办公楼'
          },
          {
            'BUILD_SPEC_ID':'1202',
            'BUILDNAME':'教学楼'
          },
        ])
      },500)*/
    })
  },

  //获取楼层
  getFloors(build){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003829",
          title : '/location/queryFloor',
          build_spec_id : build
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
      /*setTimeout(()=>{
        resolve([
          {
            'FLOOR_SPEC_ID':'1201',
            'FLOORNAME':'一楼'
          },
          {
            'FLOOR_SPEC_ID':'1202',
            'FLOORNAME':'二楼'
          },
        ])
      },500)*/

    })
  },

  //获取空间
  getSpace(floor){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003830",
          title : '/location/querySpace',
          floor_spec_id : floor
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
    })
  },

  //查询处理优先级
  getPriority(){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003832",
          title : '/worktask/queryPriority'
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
    })
  },

  //查询问题类型
  getReqeustService(lv){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003831",
          title : '/worktask/queryReqeustService',
          last_request_value:lv||''
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
    })
  },

  //查询设备接口
  getAssetlist(property,pageNo,pageSize,key){
    return new Promise((resolve, reject)=> {
      a({
        req :[{
          service : "U5003836",
          title : '/worktask/assetlist',
          triassetstatuscl:'Available',
          property:property,
          search_value:key,
          pageSize,
          pageNo
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
      /*setTimeout(() => {
        resolve([
          {
            'spi:triIdTX': '1201',
            'spi:triNameTX': '空调空调空调空调空调空调空调空调空调空调空调空调'
          },
          {
            'spi:triIdTX': '1202',
            'spi:triNameTX': '冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱冰箱'
          },
        ])
      },500)*/
    })
  },

  //已解决
  commitAll(data,service,STATE,title,OPT_SNO){
    return new Promise((resolve, reject)=>{
      let req = {};
      req.service = service;
      if(title){req.title = title;}
      if(OPT_SNO){req.OPT_SNO = OPT_SNO;}
      if(data['CALL_CODE']){
        req.CALL_CODE = data['CALL_CODE']
      }
      if(data['CHANNEL']){
        req.CHANNEL = data['CHANNEL']
      }
      if(data['CONTRY']){
        req.CONTRY = data['CONTRY']
      }
      if(data['CITY_SPEC_ID']){
        req.CITY_SPEC_ID = data['CITY_SPEC_ID']
      }
      if(data['CITY']){
        req.CITY = data['CITY']
      }
      if(data['PROVINCE']){
        req.PROVINCE = data['PROVINCE']
      }
      if(data['PARK_SPEC_ID']){
        req.PARK_SPEC_ID = data['PARK_SPEC_ID']
      }
      if(data['PARK']){
        req.PARK = data['PARK']
      }
      if(data['BUILD_SPEC_ID']){
        req.BUILD_SPEC_ID = data['BUILD_SPEC_ID']
      }
      if(data['BUILDING']){
        req.BUILDING = data['BUILDING']
      }
      if(data['FLOOR_SPEC_ID']){
        req.FLOOR_SPEC_ID = data['FLOOR_SPEC_ID']
      }
      if(data['FLOORS']){
        req.FLOORS = data['FLOORS']
      }
      if(data['EQUIPMENT']){
        req.EQUIPMENT = data['EQUIPMENT']
      }
      if(data['EQUIPMENT_ID']){
        req.EQUIPMENT_ID = data['EQUIPMENT_ID']
      }
      if(data['EQUIPMENT_PAGE']){
        req.EQUIPMENT_PAGE = data['EQUIPMENT_PAGE']
      }
      if(data['DEMAND_USER']){
        req.DEMAND_USER = data['DEMAND_USER']
      }
      if(data['INPUT_PERSON']){
        req.INPUT_PERSON = data['INPUT_PERSON']
      }
      if(data['QUEST_SOURCE']){
        req.QUEST_SOURCE = data['QUEST_SOURCE']
      }
      if(data['QUEST_TYPE']){
        req.QUEST_TYPE = data['QUEST_TYPE']
      }
      if(data['QUEST_TYPE_PATH']){
        req.QUEST_TYPE_PATH = data['QUEST_TYPE_PATH']
      }
      if(data['QUEST_SPEC_ID']){
        req.QUEST_SPEC_ID = data['QUEST_SPEC_ID']
      }
      if(data['URGENT']){
        req.URGENT = data['URGENT']
      }
      if(data['QUEST_HANDLE_PERSON']){
        req.QUEST_HANDLE_PERSON = data['QUEST_HANDLE_PERSON']
      }
      if(data['EDOCID']){
        req.EDOCID = data['EDOCID']
      }
      if(data['QUEST_DESCRIBE']){
        req.QUEST_DESCRIBE = data['QUEST_DESCRIBE']
      }
      if(data['SOLVE_METHOD']){
        req.SOLVE_METHOD = data['SOLVE_METHOD']
      }
      req.STATE = STATE;
      req.SERVREG_TYPE = 'Corrective';
      req.SOURCES = 'ihelp';

      a({
        req :[req],
        func:(data)=>{
          if(data[0]){

          }
          resolve(data[0])
        },
        error: (err) => {
          reject(err);
        }
      });

    })
  },

  //查询已有工单信息，用于回写
  queryInfo(OPT_SNO){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003837",
          OPT_SNO,
          page:1,
          pagecount:1
        }],
        func:(data)=>{
          if(data[0][0]){
            resolve(data[0][0])
          }else {
            reject();
          }
        }
      });
    })
  },

  //查询匹配的用户或员工
  queryPeple(text){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "HUA10002",
          pagecount:150,
          sourceField:"name,userId,empNo",
          CUST_IDF_CODE:text
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
    })
  },

  //用过用户编号查询用户所在城市
  queryACity(account){
    a({
      req :[{
        service : "HUA10001",
        w3Account:account
      }],
      func:(data)=>{
        resolve(data[0])
      }
    });
  },

  //通过附件编号串查询附件信息
  queryFile(fileIds){
    return new Promise((resolve, reject)=> {
      a({
        req: [{
          service: "U1008804",
          ATTA_IDS: fileIds

        }],
        func: (data, head) => {
          if (head['MSG_CODE'] != '0') {
            alert('查询附件列表出错，错误原因：'+head['MSG_TEXT']);
            reject();
            return
          }
          resolve(data[0])
        }
      });
    })
  }



}
