/**
 * 登录请求参数
 */
export interface LoginData {
  username: string
  password: string
}

/**
 * 登录响应
 */
export interface LoginResult {
  accessToken?: string
  expires?: number
  refreshToken?: string
  tokenType?: string
}
