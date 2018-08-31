<template>
  <el-cascader
    :change-on-select="true"
    expand-trigger="hover"
    :options="options"
    @change="handleItemChange"
    :props="props"
    v-model="val"
    clearable
    size="small"
    :class="['fullWidth']"
  ></el-cascader>

  <!--<Select v-model="QUEST_TYPE" :class="['fullWidth']" clearable>
                    <Option v-for="item in $store.state.questTypeList" :value="item['spi:triNameTX']">{{ item['spi:triNameTX'] }}</Option>
                  </Select>-->
</template>

<script>
  import api from '../api'
  export default {
    async created(){
      let questTypeList = await api.getReqeustService() || [];
      this.options = questTypeList.map(item =>{
        let obj = JSON.parse(JSON.stringify(item));
        obj.child = [];
        return obj;
      })
    },
    data() {
      return {
        val:[],
        /*options: [{
          val:'251',
          label: '江苏',
          cities: []
        }, {
          val:'252',
          label: '浙江',
          cities: []
        }],*/
        options: [],
        /*props: {
          value: 'val',
          label: 'label',
          child: 'cities'
        }*/
        props: {
          //value: 'spi:triPathTX',
          value: 'dcterms:identifier',
          label: 'spi:triNameTX',
          children: 'child'
        }
      };
    },

    methods: {
      async handleItemChange(val) {
        /*console.log(arguments);
        setTimeout(_ => {
          if (val.indexOf('251') > -1 && !this.options[0].cities.length) {
            this.options[0].cities = [{
              val:'25201',
              label: '南京',
              cities: []
            }];
          } else if (val.indexOf('252') > -1 && !this.options[1].cities.length) {
            this.options[1].cities = [{
              val:'25202',
              label: '杭州'
            }];
          } else if(val.indexOf('25201')> -1){
            this.options[0].cities[0].cities = [{
              val:'25203',
              label: '南京县'
            }];
          }
        }, 300);*/
        if(val.length ==0){
          return;
        }
        let item = findItem(this.options,val[val.length-1]);
        if(item['child']){
          if(item['child'].length===0){
            let questTypeList = await api.getReqeustService(val[val.length-1]) || [];
            if(questTypeList[0]){
              this.$nextTick(()=>{
                item['child'] = questTypeList.map(itm =>{
                  let obj = JSON.parse(JSON.stringify(itm));
                  obj.child = [];
                  return obj;
                })
              })
            }else{
              delete item.child;
            }
          }
        }
      }
    },

    props:['value'],
    watch:{
      value(val){
        this.val = val.split(',');
      },
      val(val){
        this.$emit('input',val.join(','));
        let arr = val;
        let str = '';
        arr.forEach((item,i) => {
          str += findItem(this.options,item)['spi:triNameTX'];
          if(i<arr.length-1){
            str +=' / ';
          }
        })
        //this.formData.QUEST_TYPE = str;
        this.$emit('questtype',str);
      }
    }
  };
  function findItem(arr,findVal){
    for(let i=0; i<arr.length; i++){
      //if(arr[i]['spi:triPathTX'] == findVal){
      if(arr[i]['dcterms:identifier'] == findVal){
        return arr[i];
      }
    }
    for(let j=0; j<arr.length; j++){
      let re = arr[j]['child']?findItem(arr[j]['child'],findVal):false;
      if(re){
        return re;
      }
    }
  }
</script>

<style scoped>

</style>
