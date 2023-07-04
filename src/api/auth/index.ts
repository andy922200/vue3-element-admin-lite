import { LoginData } from "./types"

/**
 * 登錄 API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): Promise<any> {
  const formData = new FormData()
  formData.append("username", data.username)
  formData.append("password", data.password)

  return new Promise((r) => {
    r({
      data: {
        accessToken:
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjMwNWEyY2JiNTMxOTQ5YTdhMTNhYWNlN2EzYjFmMTEzIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjg4Mzk4NDI4fQ.RRr41pz1ojUUuZkJaNt5vXXojAT3x4buri4Tw3ZNBgA",
        expires: null,
        refreshToken: null,
        tokenType: "Bearer",
      },
    })
  })
}
