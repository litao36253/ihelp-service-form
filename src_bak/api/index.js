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
  getAssetlist(property){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003836",
          title : '/worktask/assetlist',
          triassetstatuscl:'Available',
          property:property,
          search_value:''
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
    })
  },

  //已解决
  commitAll(data,service,STATE,title){
    return new Promise((resolve, reject)=>{
      let req = {};
      req.service = service;
      if(title){req.title = title;}
      if(data['CALL_CODE']){
        req.CALL_CODE = data['CALL_CODE']
      }
      if(data['CHANNEL']){
        req.CHANNEL = data['CHANNEL']
      }
      if(data['CONTRY']){
        req.CONTRY = data['CONTRY']
      }
      if(data['CITY']){
        req.CITY = data['CITY']
      }
      if(data['PARK']){
        req.PARK = data['PARK']
      }
      if(data['PARK_SPEC_ID']){
        req.PARK_SPEC_ID = data['PARK_SPEC_ID']
      }
      if(data['BUILDING']){
        req.BUILDING = data['BUILDING']
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
  queryInfo(CALL_CODE){
    return new Promise((resolve, reject)=>{
      a({
        req :[{
          service : "U5003837",
          CALL_CODE,
          page:1,
          pagecount:1
        }],
        func:(data)=>{
          resolve(data[0])
        }
      });
    })
  }



}
