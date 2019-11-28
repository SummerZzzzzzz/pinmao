import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false


import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import urls from "./interface.js"
Vue.prototype.$urls = urls;

import http from "./utils/axios.js"
Vue.prototype.$http = http;


import { Message } from 'element-ui';
Vue.prototype.$message = Message;

import Notice from "./utils/Notice.js"//通知
Vue.prototype.$Notice = Notice;

//添加wangeditor
import Editor from 'wangeditor';
Vue.prototype.$Editor = Editor;

//全局接收token
// Vue.prototype.$Token ='';

import 	Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
	state:{
		username:''
	}
})
Vue.prototype.$store =store;
import router from "./router.js"
new Vue({
   router,
  render: h => h(App),
}).$mount('#app')
