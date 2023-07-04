import { RouteRecordRaw } from "vue-router"
import { defineStore } from "pinia"
import { constantRoutes } from "@/router"
import { store } from "@/store"
import { listRoutes } from "@/api/menu"

const modules = import.meta.glob("../../views/**/**.vue")
const Layout = () => import("@/layout/index.vue")

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用戶角色
 * @param route 路由
 * @returns
 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // 如果角色中包含ROOT，則直接返回true
    if (roles.includes("ROOT")) {
      return true
    }
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as string[]).includes(role)
      }
    })
  }
  return false
}

/**
 * Filter asynchronous routing tables by recursion
 *
 * @param routes 路由集合
 * @param roles 用戶角色集合
 * @returns 返回用戶有權限的路由集合
 */
const filterAsyncRoutes = (routes: Record<string, any>[], roles: string[]) => {
  const asyncRoutes: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmpRoute = { ...route } as any

    if (hasPermission(roles, tmpRoute)) {
      if (tmpRoute.component?.toString() == "Layout") {
        tmpRoute.component = Layout
      } else {
        const component = modules[`../../views/${tmpRoute.component}.vue`]
        if (component) {
          tmpRoute.component = component
        } else {
          tmpRoute.component = modules[`../../views/error-page/404.vue`]
        }
      }

      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(tmpRoute.children, roles)
      }

      asyncRoutes.push(tmpRoute)
    }
  })

  return asyncRoutes
}

// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([])

  // actions
  function setRoutes(newRoutes: RouteRecordRaw[]) {
    routes.value = constantRoutes.concat(newRoutes)
  }
  /**
   * 生成動態路由
   *
   * @param roles 用戶角色
   * @returns
   */
  function generateRoutes(roles: string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      listRoutes()
        .then(({ data: asyncRoutes }) => {
          const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
          setRoutes(accessedRoutes)
          resolve(accessedRoutes)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  return { routes, setRoutes, generateRoutes }
})

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
