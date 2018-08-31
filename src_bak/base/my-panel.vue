<template>
  <div class="my-panel" :style="myStyle||{}">
    <div class="my-panel-header">{{title}}</div>
    <div class="my-panel-body">
      <slot name="my-panel-body"></slot>
    </div>
  </div>
</template>

<script>
    export default {
      name: "my-panel",
      data(){
        return {

        }
      },
      props:['title','myStyle']
    }
</script>

<style scoped>
  .my-panel{ border: #e3e8ec solid 1px;}
  .my-panel-header{ background-color:#e7edf2; font-size: 15px; color: #333;  height: 40px; line-height: 40px; text-indent: 40px;}
  .my-panel-body{ padding: 20px; color: #555; font-size: 14px; background-color: #fff;}
</style>
