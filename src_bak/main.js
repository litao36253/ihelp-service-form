// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import {Row,Col,Radio,RadioGroup,Message} from 'element-ui'
import { Select,Option,Input,AutoComplete,Upload,Button  } from 'iview';
//import iView from 'iview';
import {elInput,elButton} from './main2'
import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css'
import './css/icon.css'
Vue.use(Row);
Vue.use(Col);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(elInput);
Vue.use(elButton);
// Vue.use(Form);
// Vue.use(FormItem);
Vue.prototype.$message = Message;


Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Input', Input)
Vue.component('AutoComplete', AutoComplete)
Vue.component('Upload', Upload)
Vue.component('i-button', Button )
import App from './App'


//Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h=>h(App),
  store
})
