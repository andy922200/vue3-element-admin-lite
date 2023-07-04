import { defineStore } from "pinia"

import { loginApi } from "@/api/auth"
import { getUserInfo } from "@/api/user"
import { resetRouter } from "@/router"
import { store } from "@/store"

import { LoginData } from "@/api/auth/types"
import { UserInfo } from "@/api/user/types"

import { useStorage } from "@vueuse/core"

export const useUserStore = defineStore("user", () => {
  // state
  const userId = ref()
  const token = useStorage("accessToken", "")
  const nickname = ref("")
  const avatar = ref("")
  const roles = ref<Array<string>>([]) // 用戶角色集合 → 判斷路由
  const perms = ref<Array<string>>([]) // 用戶權限集合 → 判斷按鈕和 API 權限

  /**
   * 登入
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((response) => {
          const { tokenType, accessToken } = response.data
          token.value = tokenType + " " + accessToken
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  function getInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      getUserInfo()
        .then(({ data }) => {
          if (!data) {
            return reject("Verification failed, please Login again.")
          }
          if (!data.roles || data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!")
          }
          userId.value = data.userId
          nickname.value = data.nickname
          avatar.value = data.avatar
          roles.value = data.roles
          perms.value = data.perms
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  // 登出
  function logout() {
    return new Promise<void>((resolve, reject) => {
      resetRouter()
      resetToken()
      location.reload()
      resolve()
    })
  }

  // 重置
  function resetToken() {
    token.value = ""
    nickname.value = ""
    avatar.value = ""
    roles.value = []
    perms.value = []
  }

  return {
    token,
    nickname,
    avatar,
    roles,
    perms,
    login,
    getInfo,
    logout,
    resetToken,
    userId,
  }
})

// 非setup
export function useUserStoreHook() {
  return useUserStore(store)
}
