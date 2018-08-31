<template>
  <!--<el-select v-model="val"
             :placeholder="title"
             clearable
             size="small"
             :class="['fullWidth']"
             :disabled="disabled"
             filterable
             remote
             :remote-method="remot"
             :loading="loading"
             @blur="blur"
  >-->
  <el-select v-model="val"
             :placeholder="title"
             clearable
             size="small"
             :class="['fullWidth']"
             :disabled="disabled"
             filterable
             :loading="loading"
  >
    <el-option v-for="item in listdata" :value="item[idfiled]" :label="label(item[idfiled],item[textfild],item['spi:cstInstallLocationTX'],item['spi:triInstallLocationTX'])" :key="item[idfiled]"></el-option>
    <li style="height: 30px;">
        <el-button-group :class="['btnGrp']">
          <el-button size="mini" icon="el-icon-arrow-left" @click="prev">上一页</el-button>
          <el-button size="mini" @click="next">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
    </li>
  </el-select>
</template>

<script>
  export default {
    data(){
      return {
        val:'',
        pageNo:1,
        pageSize:20,
        query:''
      }
    },
    created(){
      this.val = this.value;
      this.pageNo = this.assaPage;
    },
    props:['value','listdata','idfiled','textfild','title','disabled','remote-method','loading','assa-init','assa-page'],
    watch:{
      value(val){
        this.val = val;
      },
      val(val){
        this.$emit('input',val);
      },
      assaInit(){
        this.pageNo = 1;
      },
      assaPage(val){
        this.pageNo = val;
      }
    },
    methods:{
      label(idfiled,textfild,spic,spit){
        return idfiled+' - '+textfild+(spic?' - '+spic:'')+(spit?' - '+spit:'');
      },
      remot(query){
        this.query = query;
        this.pageNo = 1;
        this.remoteMethod(query,this.pageNo,this.pageSize);
      },
      blur(){
        this.query = '';
        this.pageNo = 1;
        this.remoteMethod(this.query,this.pageNo,this.pageSize);
      },
      next(){
        this.pageNo ++;
        this.remoteMethod(this.query,this.pageNo,this.pageSize);
      },
      prev(){
        if(this.pageNo>1){
          this.pageNo --;
        }
        this.remoteMethod(this.query,this.pageNo,this.pageSize);
      }
    }
  }
</script>

<style scoped>
  .btnGrp{position: absolute; bottom: 4px; left: 50%; margin-left: -84px; text-align: center; width: 100%;}
</style>
