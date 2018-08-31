<!--选择渠道组件-->
<template>
  <Select v-model="model1" :class="['fullWidth']" clearable>
    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
  </Select>
</template>

<script>
  export default {
    data () {
      return {
        cityList: [
          {
            value: '中国',
            label: '中国'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
        model1: ''
      }
    },
    watch:{
      model1(val){
        this.$emit('changeval','country',val)
      }
    }
  }

</script>

<style scoped>

</style>
