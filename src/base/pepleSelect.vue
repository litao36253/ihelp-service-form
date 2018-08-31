<template>
  <el-select
    size="small"
    :class="['fullWidth']"
    clearable
    v-model="val"
    filterable
    remote
    :placeholder="title"
    default-first-option
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.w3Account"
      :label="item.person_notes_cn"
      :value="item.w3Account">
    </el-option>
  </el-select>

</template>

<script>
  import api from '../api'
  export default {
    data() {
      return {
        options: [],
        val: '',
        // list: [],
        loading: false,
        /*states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"]*/
      }
    },
    props:['title','value'],
    /*mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },*/
    methods: {
      async remoteMethod(query) {
        if (query !== '') {
          /*this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);*/
          this.loading = true;
          this.options = await api.queryPeple(query)
          this.loading = false;
        } else {
          this.options = [];
        }
      }
    },
    watch:{
      val(val){
        this.$emit('input',val)
      },
      value(val){
        this.val = val;
      }
    }
  }

</script>

<style scoped>

</style>
