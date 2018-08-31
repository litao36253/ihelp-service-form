import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
Vue.use(Vuex);
import state from './state'

let mutations = {
  CHANNEL(state,val){
    state.CHANNEL = val;
  },
  CONTRY(state,val){
    state.CONTRY = val;
  },
  CITY(state,val){
    state.CITY = val;
    try {
      state.PROVINCE = state.cityList.find(item=>{
        item.CITYCHNNAME == val;
      }).PROVINCECHNNAME;
    }catch (e) {
      state.PROVINCE = '';
    }

  },
  PARK(state,val,parkId){
    state.PARK = val;
    if(parkId){
      state.PARK_SPEC_ID = parkId;
    }else{
      try {
        state.PARK_SPEC_ID = state.parkList.find((item)=>{
          return item['PROPERTYNAME'] = val;
        })['PROPERTY_SPEC_ID'];
      }catch (e) {

      }
    }
  },
  BUILDING(state,val){
    state.BUILDING = val;
  },
  FLOORS(state,val){
    state.FLOORS = val;
  },
  EQUIPMENT(state,val){
    state.EQUIPMENT = val;
  },
  EQUIPMENT_ID(state,val){
    state.EQUIPMENT_ID = val;
  },
  CALL_CODE(state,val){
    state.CALL_CODE = val;
  },
  INPUT_PERSON(state,val){
    state.INPUT_PERSON = val;
  },
  QUEST_SOURCE(state,val){
    state.QUEST_SOURCE = val;
  },
  QUEST_TYPE(state,val,QUEST_TYPE_PATH){
    state.QUEST_TYPE = val;
    if(QUEST_TYPE_PATH){
      state.QUEST_TYPE_PATH = QUEST_TYPE_PATH;
    }else {
      try {
        state.QUEST_TYPE_PATH = state.questTypeList.find((item)=>{
          return item['spi:triNameTX'] = val;
        })['spi:triPathTX'];
      }catch (e) {

      }
    }
  },
  URGENT(state,val){
    state.URGENT = val;
  },
  QUEST_HANDLE_PERSON(state,val){
    state.QUEST_HANDLE_PERSON = val;
  },
  QUEST_DESCRIBE(state,val){
    state.QUEST_DESCRIBE = val;
  },
  SOLVE_METHOD(state,val){
    state.SOLVE_METHOD = val;
  },
  EDOCID(state,val){
    state.EDOCID = val;
  },
  DEMAND_USER(state,val){
    state.DEMAND_USER = val;
  },
  cityList(state,val){
    state.cityList = val;
  },
  parkList(state,val){
    state.parkList = val;
  },
  buildList(state,val){
    state.buildList = val;
  },
  floorList(state,val){
    state.floorList = val;
  },
  assetList(state,val){
    state.assetList = val;
  },
  questTypeList(state,val){
    state.questTypeList = val;
  },
  urgentList(state,val){
    state.urgentList = val;
  },
}

export default new Vuex.Store({
  state,
  mutations,
  getters:{
    property(state){
      if(state.FLOORS){
        // return state.floorList.find(item=>{
        //   return item.FLOORNAME == state.FLOORS;
        // }).FLOOR_SPEC_ID;
        return state.FLOORS;
      }else if(state.BUILDING){
        // return state.buildList.find(item=>{
        //   return item.BUILDNAME == state.BUILDING;
        // }).BUILD_SPEC_ID;
        return state.BUILDING;
      }else if(state.PARK){
        // return state.parkList.find(item=>{
        //   return item.PROPERTYNAME == state.PARK;
        // }).PROPERTY_SPEC_ID;
        return state.PARK;
      }else{
        return '';
      }
    }
  },
  actions:{
    async cityList({commit}){
      commit('cityList',await api.getCitys());
    },
    async parkList({commit,state},city){
      if(city){
        let c = state.cityList.find(item=>{
          return item.CITYCHNNAME == city;
        }).CITY_SPEC_ID;
        commit('parkList',await api.getParks(c));
      }
    },
    async buildList({commit,state},park){
      if(park){
        let c = state.parkList.find(item=>{
          return item.PROPERTYNAME == park;
        }).PROPERTY_SPEC_ID;
        commit('buildList',await api.getBuilders(c));
      }
    },
    async floorList({commit,state},build){
      if(build){
        let c = state.buildList.find(item=>{
          return item.BUILDNAME == build;
        }).BUILD_SPEC_ID;
        commit('floorList',await api.getFloors(c));
      }
    },
    async assetList({commit,state,getters}){
      commit('assetList',[]);
      commit('EQUIPMENT','');
      commit('EQUIPMENT_ID','');
      if(getters.property){
        commit('assetList',await api.getAssetlist(getters.property));
      }
    },
    async questTypeList({commit}){
      commit('questTypeList',await api.getReqeustService(''));
    },
    async urgentList({commit}){
      commit('urgentList',await api.getPriority(''));
    },


  }
})

