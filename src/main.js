import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/element-ui-theme'
import VueRouter from "vue-router";
import cookie from 'vue-cookie';
import { Message } from 'element-ui';
import {requestUtil,baseRequestUtil} from '@/utils'
import router from "./router"
import axios from 'axios'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import '@/icons'
import Icon from 'vue-awesome/components/Icon'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import vueParticleLine from 'vue-particle-line'
import 'vue-particle-line/dist/vue-particle-line.css'
import '../static/publicCss.scss'

Vue.component('icon', Icon)
Vue.component('echart', ECharts)
Vue.use(vueParticleLine)



import "@/styles/index.scss"

Vue.use(VueRouter)
Vue.use(cookie)
Vue.use(ElementUI);
Vue.use(Vuelidate)
Vue.prototype.Message = Message
Vue.prototype.Request = requestUtil
Vue.prototype.$http = axios
Vue.prototype.BaseRequest = baseRequestUtil
Vue.prototype.$ELEMENT = { size: 'mini' }
// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
})
