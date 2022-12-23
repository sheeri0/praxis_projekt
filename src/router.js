import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Tasks from './views/Tasks.vue'
import Trash from './views/Trash.vue'
import About from './views/About.vue'
import NewTask from './views/NewTask.vue'
import Favourites from './views/Favourites.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "",
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/trash',
      name: 'trash',
      component: Trash
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/new',
      name: 'newTask',
      component: NewTask
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
