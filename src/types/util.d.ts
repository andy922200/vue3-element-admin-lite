/**
 * Axios customized types
 */
import "axios"
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    needParamsSerializer?: {
      mode: "noIndices" | "indices" | "brackets" | "repeat" | undefined
    }
  }

  export interface AxiosResponse {
    target?: any
  }
}
