/**
 * 獲得 Menu 列表
 */
import apiRouter from "@/router/modules/api"
import systemRouter from "@/router/modules/system"

export async function listRoutes() {
  const asyncRoutes = [apiRouter, systemRouter]

  return {
    data: asyncRoutes,
  }
}
