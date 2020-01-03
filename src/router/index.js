import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from '@/models/login.vue'
import casLogin from '@/models/casLogin.vue'
import home from '@/models/home/homeBridging.vue'

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter)

const routes = [
  {
    name:"root",
    path: '/',
    // redirect: 'casLogin'
    redirect: 'login'
  },
  {
    path: `/login`,
    component: login
  },
  {
    path: `/casLogin`,
    component: casLogin
  },
  {
    path: `/mockLogin`,
    component: () => import("@/models/mockLogin")
  },
  {
    path: `/home`,
    component: home,
    props: { menuAlign: 'top' },//left==>菜单在左侧 top==>菜单在上方
    // props: { menuAlign: 'left' },//left==>菜单在左侧 top==>菜单在上方
    children: [
      {
        path: `/welcome`,
        component: () => import("@/models/home/welcome")
      },
      {
        name: 'auth',
        path: '/auth',
        component: () => import('@/models/sys/main'),
        children:[
          {
            name: 'menu',
            path: '/sys/menu',
            component: () => import('@/models/sys/menu/menuMain')
          },
          {
            name: 'user',
            path: '/sys/user',
            component: () => import('@/models/sys/user/userMain')
          },
          {
            name: 'role',
            path: '/sys/role',
            component: () => import('@/models/sys/role/roleMain')
          },
          { 
            name: 'contacts',
            path: '/system/contacts',
            component: () => import('@/models/system/contacts/contactsMain')//联系人管理
          },
          {
            name: 'dataConsumptionPlan',
            path: '/dataexchange/dataConsumptionPlan',
            component: () => import('@/models/dataexchange/dataConsumptionPlan/consumptionMain')//数据消费计划
          },
          {
            name: 'consumptionUser',
            path: '/dataexchange/consumptionUser',
            component: () => import('@/models/dataexchange/dataProductionPlan/consumptionUser')//数据消费方
          },
          {
            name: 'dataProductionPlan',
            path: '/dataexchange/dataProductionPlan',
            component: () => import('@/models/dataexchange/dataProductionPlan/productionMain')//数据生产计划
          },
          {
            name: 'dataAdministration',
            path: '/dataexchange/dataAdministration',
            component: () => import('@/models/dataexchange/dataAdministration/administrationMain')//数据集管理
          },
          {
            name: 'appProjectAdministration',
            path: '/system/appProjectAdministration',
            component: () => import('@/models/system/appProjectAdministration/projectMain')//应用项目管理
          },
          {
            name: 'sysParamsConfig',
            path: '/system/sysParamsConfig',
            component: () => import('@/models/system/sysParamsConfig/sysParamsConfigMain')//系统参数配置
          },
          {
            name: 'AgentStatus',
            path: '/watcher/AgentStatus',
            component: () => import('@/models/watcher/AgentStatus/agentStatusMain')//Agent状态
          },
          {
            name: 'serverStatus',
            path: '/watcher/serverStatus',
            component: () => import('@/models/watcher/serverStatus/serverStatusMain')//server状态
          },
          {
            name: 'transStatusQuery',
            path: '/watcher/transStatusQuery',
            component: () => import('@/models/watcher/transStatusQuery/transStatusQueryMain')//传输状态查询
          },
          {
            name: 'transLog',
            path: '/watcher/transLog',
            component: () => import('@/models/watcher/transLog/transLogMain')//传输日志
          },
        ]
      }
    ]
  }
]

var router =  new VueRouter({
  routes
})
export default router
