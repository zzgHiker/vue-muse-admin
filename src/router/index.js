import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'

import Login from '../views/Login'
import Home from '../views/Home.vue'

import Line from '../views/charts/Line.vue'
import Table from '../views/tables/Table.vue'
import Group from '../views/auth/Group.vue'
import Role from '../views/auth/Role.vue'
import Object from '../views/auth/Object.vue'
import MaterialDesignIcons from '../views/icons/MaterialDesignIcons.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Main,
    children: [
      {path: 'group', name: 'Group', component: Group},
      {path: 'role', name: 'Role', component: Role},
      {path: 'object', name: 'Object', component: Object}
    ]
  },
  {
    path: '/icons',
    name: 'Icons',
    component: Main,
    children: [
      {path: 'mdi', name: 'MaterialDesignIcons', component: MaterialDesignIcons}
    ]
  },
  {
    path: '/tables',
    name: 'Tables',
    component: Main,
    children: [
      {path: 'table', name: 'Table', component: Table}
    ]
  },
  {
    path: '/charts',
    name: 'Charts',
    component: Main,
    children: [
      {path: 'line', name: 'Line', component: Line}
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  let getters = router.app.$store.getters
  if (to.meta['authUser'] && !getters.isLogin) {
    next('/login')
  } else if (to.name === 'Login' && getters.isLogin) {
    next('/home')
  } else {
    next()
  }
})

export default router
