import { UserInfo } from "./types"

/**
 * 登錄成功獲取角色資訊（ Nickname, 頭像, 角色集合和權限集合 ）
 */
export function getUserInfo(): Promise<Record<"data", UserInfo>> {
  return new Promise((r) => {
    r({
      data: {
        userId: 2,
        nickname: "系统管理员",
        avatar:
          "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
        roles: ["ADMIN"],
        perms: [
          "sys:menu:delete",
          "sys:dict_type:add",
          "sys:dept:edit",
          "sys:dict:edit",
          "sys:dict:delete",
          "sys:dict_type:edit",
          "sys:menu:add",
          "sys:user:add",
          "sys:dept:delete",
          "sys:role:edit",
          "sys:user:edit",
          "sys:user:reset_pwd",
          "sys:user:delete",
          "sys:dept:add",
          "sys:dict_type:delete",
          "sys:role:delete",
          "sys:menu:edit",
          "sys:dict:add",
          "sys:role:add",
        ],
      },
    })
  })
}
