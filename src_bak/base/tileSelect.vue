<!--<template>
  <Input v-model="value" type="text" placeholder="请选择" :clearable="true" :class="['fullWidth']"></Input>
  <AutoComplete v-model="value" placeholder="Enter something..." icon="more" clearable :class="['fullWidth']"></AutoComplete>

</template>

<script>
    export default {
      name: "tileSelect",
      data () {
        return {
          value: ''
        }
      },
      watch:{
        value(val){
          this.$emit('changeval',val)
        }
      }
    }
</script>

<style scoped>

</style>-->

<!--
<template>
  <AutoComplete v-model="value" icon="more" clearable placeholder="请选择" :class="['fullWidth']" :filter-method="filterMethod">
    <div class="demo-auto-complete-item" v-for="item in data4">
      <div class="demo-auto-complete-group">
        <span>{{ item.title }}</span>
        <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
      </div>
      <Option v-for="option in item.children" :value="option.title" :key="option.title">
        <span class="demo-auto-complete-title">{{ option.title }}</span>
        <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
      </Option>
    </div>
    <a href="https://www.google.com/search?q=iView" target="_blank" class="demo-auto-complete-more">查看所有结果</a>
  </AutoComplete>
</template>
<script>
  export default {
    name: "tileSelect",
    data () {
      return {
        value: '',
        data4: [
          {
            title: '话题',
            children: [
              {
                title: 'iView',
                count: 10000,

              },
              {
                title: 'iView UI',
                count: 10600,

              }
            ]
          },
          {
            title: '问题',
            children: [
              {
                title: 'iView UI 有多好',
                count: 60100,

              },
              {
                title: 'iView 是啥',
                count: 30010,

              }
            ]
          },
          {
            title: '文章',
            children: [
              {
                title: 'iView 是一个设计语言',
                count: 100000,

              }
            ]
          }
        ]
      }
    },
    watch:{
      value(val){
        this.$emit('changeval',val)
      }
    },
    methods: {
      filterMethod (value, option) {
        debugger;
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      }
    }
  }
</script>
<style>
  .demo-auto-complete-item{
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
  }
  .demo-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
  }
  .demo-auto-complete-group span{
    color: #666;
    font-weight: bold;
  }
  .demo-auto-complete-group a{
    float: right;
  }
  .demo-auto-complete-count{
    float: right;
    color: #999;
  }
  .demo-auto-complete-more{
    display: block;
    margin: 0 auto;
    padding: 4px;
    text-align: center;
    font-size: 12px;
  }
</style>-->

<template>
  <AutoComplete icon="more" :clearable="!disabled" placeholder="请选择" :class="['fullWidth']" v-model="text" :disabled="disabled">
    <div>
      <div class="panelhead">{{pTitle}}</div>
      <div class="panelCon clear">
        <Option class="fl panelItem" :value="item[textFiled]" v-for="item in data" :key="item[valueFiled]">{{ item[textFiled] }}</Option>
      </div>
    </div>
  </AutoComplete>
</template>
<script>
  export default {
    data () {
      return {
        text: ''
      }
    },
    props:['pTitle','data','textFiled','valueFiled','value','disabled'],
    methods: {
      blur(){
        let include = false;
        this.data.forEach(item => {
          if(item[this.textFiled] == this.text){
            include = true;
            return false;
          }
        })
        if(!include){
          this.text = '';
        }
      },
    },
    watch:{
      text(val,oal){
        this.blur();
        this.$emit('input',val);
      },
      value(val){
        this.text = val;
      }
    }
  }
</script>
<style scoped lang="less">
  .panelhead{ height: 38px; background:rgb(245,246,248); border:1px solid rgba(210,210,210,1); line-height: 38px; text-indent: 16px; font-size: 13px; color: #555; }
  .panelCon{ padding:18px 0 18px 22px;}
  .panelItem{font-size:13px; font-family:PingFangSC-Regular; color:rgba(136,136,136,1); line-height:28px; margin-right: 14px; cursor: default; clear: none; padding: 4px 8px;}
  .panelItem:hover{ color: #2d8cf0;}
</style>
