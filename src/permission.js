import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import schoolRoutes from '@/router/module/school'
import collegeRoutes from '@/router/module/college'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        store.dispatch('user/getInfo').then((data)=>{
          const { name } = data
          if(name == 'school_admin'){
            router.options.routes = schoolRoutes;//如果没有这一段就不会生效这是因为，router.options.routes 不是响应式的。
            router.addRoutes(schoolRoutes)
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            next({ path: '/' })
          }else if(name == 'college_admin'){
            router.options.routes = collegeRoutes;//如果没有这一段就不会生效这是因为，router.options.routes 不是响应式的。
            router.addRoutes(collegeRoutes)
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
            next({ path: '/' })
          }else{
            store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next('/login')
            NProgress.done()
          }
        })
        next()
      }
       
       
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
