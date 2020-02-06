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
            name: 'didi',
            path: '/rcdconfig/didi',
            component: () => import('@/models/rcdconfig/didi')//填报指标体系
          },
          {
            name: 'fldconfig',
            path: '/rcdconfig/fldconfig',
            component: () => import('@/models/rcdconfig/fldconfig')//填报指标体系
          },
          {
            name: 'dictconfig',
            path: '/rcdconfig/dictconfig',
            component: () => import('@/models/rcdconfig/dictconfig')//数据字典
          },
          {
            name: 'jobconfig',
            path: '/rcdjobconfig/jobconfig',
            component: () => import('@/models/rcdjobconfig/jobconfig')//填报任务维护
          },
          {
            name: 'unitconfig',
            path: '/rcdjobconfig/unitconfig',
            component: () => import('@/models/rcdjobconfig/unitconfig')//填报组维护
          },
          {
            name: 'rcdusercg',
            path: '/rcdjobconfig/rcdusercg',
            component: () => import('@/models/rcdjobconfig/rcdusercg')//填报人维护
          },
          {
            name: 'rcdnotice',
            path: '/rcdjobconfig/rcdnotice',
            component: () => import('@/models/rcdjobconfig/rcdnotice')//填报提醒维护
          },
          {
            name: 'datareport',
            path: '/rcdjob/datareport',
            component: () => import('@/models/rcdjob/datareport/reportMain')//数据填报
          },
          {
            name: 'reportFill',
            path: '/rcdjob/datareport/reportFill',
            component: () => import('@/models/rcdjob/datareport/reportFill'),
            children: [
              {
                name: 'oneDimensionsStaticRecord',
                path: '/record/onedim/onedimRecord',
                component: () => import('@/models/rcdjob/datareport/onedim/onedimRecord'),
              },
              {
                name: 'multDimensionsStaticRecord',
                path: '/record/multdim/griddimRecord',
                component: () => import('@/models/rcdjob/datareport/multdim/griddimRecord'),
              }
            ]
          },
          {
            name: 'submitAUmanager',
            path: '/record/submitAUmanager',
            component: () => import('@/models/record/submitAUmanager')//机构管理
          },
          {
            name: 'administrative',
            path: '/record/administrative',
            component: () => import('@/models/record/administrative')//行政机构管理
          }
        ]
      }
    ]
  }
]

var router =  new VueRouter({
  routes
})
export default router
