<template>
  <el-select v-model="val" :placeholder="title" clearable size="small" :class="['fullWidth']" :disabled="disabled" filterable>
    <el-option v-for="item in listdata" :label="item[textfild]" :value="item[idfiled]"></el-option>
  </el-select>
</template>

<script>
    export default {
      data(){
        return {
          val:''
        }
      },
      created(){
        this.val = this.value;
      },
      props:['value','listdata','idfiled','textfild','title','disabled'],
      watch:{
        value(val){
          this.val = val;
        },
        val(val){
          this.$emit('input',val);
        }
      }
    }
</script>

<style scoped>

</style>
