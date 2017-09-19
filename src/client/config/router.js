import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: resolve => require(['client/views/home'], resolve)
  }, {
    path: '/find',
    name: 'find',
    component: resolve => require(['client/views/find'], resolve)
  }, {
    path: '/user/:infoId',
    component: resolve => require(['client/views/user'], resolve),
    children: [{
        path: 'message',
        name: 'message',
        component: resolve => require(['client/views/user/message'], resolve)
      },
      {
        path: 'work',
        name: 'work',
        component: resolve => require(['client/views/user/work'], resolve)
      },
      {
        path: 'care',
        name: 'care',
        component: resolve => require(['client/views/user/care'], resolve)
      },
      {
        path: 'follow',
        name: 'follow',
        component: resolve => require(['client/views/user/follow'], resolve)
      },
      {
        path: 'followed',
        name: 'followed',
        component: resolve => require(['client/views/user/followed'], resolve)
      },
      {
        path: '',
        name: 'judge',
        component: resolve => require(['client/views/user/judge'], resolve)
      },
      {
        path: 'setting',
        name: 'setting',
        component: resolve => require(['client/views/user/setting'], resolve)
      }
    ]
  }, {
    path: '/opus/create',
    name: 'create',
    component: resolve => require(['client/views/edit'], resolve),
  }, {
    path: '/opus/:opusId',
    name: 'opus',
    component: resolve => require(['client/views/opus'], resolve),
  },
  {
    path: '/opus/:opusId/edit',
    name: 'edit',
    component: resolve => require(['client/views/edit'], resolve),
  }, {
    path: '/css',
    name: 'css',
    component: resolve => require(['client/views/other/css'], resolve)
  }, {
    path: '/test',
    name: 'test',
    component: resolve => require(['client/views/other/test'], resolve)
  }, {
    path: '*',
    name: 'none',
    component: resolve => require(['client/views/none'], resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
