import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"

import NProgress from "nprogress"
import "nprogress/nprogress.css"
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const permissionStore = usePermissionStoreHook()

// 路由白名單
const whiteList = ["/login"]

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = localStorage.getItem("accessToken")
  if (hasToken) {
    if (to.path === "/login") {
      // 已登入，跳轉到首頁
      next({ path: "/" })
      NProgress.done()
    } else {
      const userStore = useUserStoreHook()
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        // 沒有匹配到路由，跳轉到 404 頁面
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next("/404")
        } else {
          next()
        }
      } else {
        try {
          const { roles } = await userStore.getInfo()
          const accessRoutes = await permissionStore.generateRoutes(roles)
          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token 並跳轉到登入頁面重新登入
          await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登入，可訪問白名單頁面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
