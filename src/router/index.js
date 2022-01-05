import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/**
 * 创建路由对象
 */
const routes = [
  {
    path: '/login',
    component: () => import('@/view/Login')
  },
  {
    path: '/404',
    component: () => import('@/view/404')
  },
  {
    path: '/',
    component: () => import('@/components/Home'),
    children: [
      {
        path: '/console',
        component: () => import('../components/Console.vue'),
        meta: { title: '首页', icon: 'el-icon-s-platform', hasSubMenu: false, }
      },
      {
        path: '/system',
        component: () => import('../components/Console.vue'),
        meta: { title: '系统管理', icon: 'el-icon-s-platform', hasSubMenu: false, }, children: []
      },
      {
        path: '/operate',
        component: () => import('../components/Console.vue'),
        meta: { title: '运营管理', icon: 'el-icon-s-platform', hasSubMenu: false, }, children: []
      },
      {
        path: '/member', meta: { title: '会员管理', icon: 'el-icon-s-custom', hasSubMenu: true, },
        children: [
          {
            path: '/member/user',
            name: 'user',
            component: () => import('@/components/User.vue'),
            meta: { title: '会员等级', icon: 'el-icon-s-custom' }
          },
          {
            path: '/member/role',
            name: 'role',
            component: () => import('@/components/Role.vue'),
            meta: { title: '会员管理', icon: 'el-icon-s-custom' }
          },
        ]
      },
      {
        path: '/information',
        component: () => import('../components/Console.vue'),
        meta: { title: '消息中心', icon: 'el-icon-s-platform', hasSubMenu: false, }, children: []
      },
      {
        path: '/limit',
        component: () => import('../components/Console.vue'),
        meta: { title: '权限管理', icon: 'el-icon-s-platform', hasSubMenu: false, }, children: []
      },
      {
        path: '/tool',
        component: () => import('../components/Console.vue'),
        meta: { title: '系统工具', icon: 'el-icon-s-platform', hasSubMenu: false, }, children: []
      },
    ]
  },

]

const router = new VueRouter({
  routes
})
// 可以设置先登录才能访问
// router.beforeEach((to,from,next) =>{
//   if (to.path == '/home') {

//   }
// })
export default router