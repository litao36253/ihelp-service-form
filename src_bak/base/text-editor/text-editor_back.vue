<!--<style lang="less">-->
    <!--/*@import '../../../styles/loading.less';*/-->
<!--</style>-->

<template>
  <textarea class='tinymce-textarea' id="tinymceId"></textarea>
</template>

<script>
import tinymce from 'tinymce';
export default {
    name: 'text-editor',
    data () {
        return {
            spinShow: true
        };
    },
  props:['id','value'],
  computed:{
    tinymceId(){
      return this.id||'tinymceId'+new Date().getTime();
    }
  },
    methods: {
        init () {
            this.$nextTick(() => {
                let vm = this;
                let height = document.body.offsetHeight - 300;
                tinymce.init({
                    selector: `#tinymceId`,
                    branding: false,
                    elementpath: false,
                    height: height,
                    language: 'zh_CN.GB2312',
                    menubar: 'edit insert view format table tools',
                    plugins: [
                        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                        'searchreplace visualblocks visualchars code fullpage',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                    ],
                    toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                    autosave_interval: '20s',
                    image_advtab: true,
                    table_default_styles: {
                        width: '100%',
                        borderCollapse: 'collapse'
                    },
                    setup: function (editor) {
                        editor.on('init', function (e) {
                            /*vm.spinShow = false;
                            if (localStorage.editorContent) {
                                tinymce.get(this.tinymceId).setContent(localStorage.editorContent);
                            }*/
                        });
                        /*editor.on('keydown', function (e) {
                            localStorage.editorContent = tinymce.get(this.tinymceId).getContent();
                        });*/
                        editor.on('input change undo redo', function (e) {

                            //localStorage.editorContent = tinymce.get(tinymceEditer).getContent();
                          this.$emit('input',tinymce.get('tinymceId').getContent());
                        });
                    }
                });
            });
        }
    },
    mounted () {
      //debugger
        this.init();
    },
    destroyed () {
        tinymce.get('tinymceId').destroy();
    },
    watch:{
      value(val){
        // 当传入值变化时跟新富文本内容
        tinymce.get('tinymceId').setContent(val);
      }
    },
};
</script>

<style>

</style>
