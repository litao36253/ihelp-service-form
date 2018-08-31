<template>
  <tile-select @changeval="changeval" p-title="请选择一个城市" :data="data" textFiled="CITYCHNNAME" valueFiled="CITY_SPEC_ID"></tile-select>
</template>

<script>
  import tileSelect from './tileSelect'
  export default {
    name: "selectCity",
    async created(){
      this.data = await api.getCitys();
    },
    components:{
      tileSelect
    },
    data(){
      return {
        data:[]
      }
    },
    methods:{
      changeval(val,text){

        this.$emit('changeval','city',val)
      }
    }
  }
</script>

<style scoped>

</style>
