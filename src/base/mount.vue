<template>
    <span class="mount" :class="{red:red}">已输入 <slot name="enter-mount">0</slot>/<slot name="total-mount">0</slot></span>
</template>

<script>
    export default {
      name: "mount",
      props:['mount'],
      computed:{
        red(){
          return this.mount>2000
        }
      }
    }
</script>

<style scoped>
  .mount{height:22px;
    font-size:12px;
    font-family:PingFangSC-Regular;
    color:rgba(136,136,136,1);
    line-height:22px;}
  .red{ color: #f56c6c;}
</style>
