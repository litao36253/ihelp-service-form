<template>
  <textarea :id="id" :value="value"></textarea>
</template>
<script>
  // Import TinyMCE
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/themes/modern/theme';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  const INIT = 0;
  const CHANGED = 2;
  var EDITOR = null;
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      setting: {}
    },
    watch: {
      value: function (val) {
        // console.log('init ' + val)
        if (this.status == INIT || tinymce.activeEditor.getContent() != val){
          tinymce.activeEditor.setContent(val);
        }
        this.status = CHANGED
      }
    },
    data: function () {
      return {
        status: INIT,
        id: 'editor-'+new Date().getMilliseconds(),
      }
    },
    methods: {
    },
    mounted: function () {
      const _this = this;
      const setting =
        {
          selector:'#'+_this.id,
          //language_url: '/static/tinymce/zh_CN.js',
          language_url: '/ihelp/uccweb/business/AdmServiceReg/cssJs/tinymce/zh_CN.js',
          language:"zh_CN",
          //skin_url: '/static/tinymce/skins/lightgray',
          skin_url: '/ihelp/uccweb/business/AdmServiceReg/cssJs/tinymce/skins/lightgray',
          menubar: '',
          height: '100px',
          plugins: [
            'link image'
          ],
          toolbar1: ' undo redo | link image emoticons media codesample | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ',
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          init_instance_callback:function(editor) {
            EDITOR = editor;
            // console.log("Editor: " + editor.id + " is now initialized.");
            editor.on('input change undo redo', () => {
              var content = editor.getContent()
              _this.$emit('input', content);
            });
          }
        };
      Object.assign(setting,_this.setting)
      tinymce.init(setting);
    },
    beforeDestroy: function () {
      tinymce.get(this.id).destroy();
    }
  }

</script>
<style scoped>
  #mceu_30{ display: none !important;}
</style>
