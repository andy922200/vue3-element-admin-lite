import { useUserStoreHook } from "@/store/modules/user"
import { Directive, DirectiveBinding } from "vue"

/**
 * 按鈕權限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 「超級管理員」按鈕權限檢驗
    const { roles, perms } = useUserStoreHook()
    if (roles.includes("ROOT")) {
      return true
    }
    // 「其他角色」按鈕權限檢驗
    const { value } = binding
    if (value) {
      const requiredPerms = value // DOM 綁定需要的權限

      const hasPerm = perms?.some((perm) => {
        return requiredPerms.includes(perm)
      })

      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(
        "need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\""
      )
    }
  },
}

/**
 * 角色權限
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding

    if (value) {
      const requiredRoles = value // DOM 綁定需要的角色權限
      const { roles } = useUserStoreHook()
      const hasRole = roles.some((perm) => {
        return requiredRoles.includes(perm)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"")
    }
  },
}
