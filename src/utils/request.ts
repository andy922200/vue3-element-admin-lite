import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios"
import { useUserStoreHook } from "@/store/modules/user"
import { paramsSerializer } from "@/utils/mixin"

// axios instance factory
const createAxiosInstance = (
  baseURL: string,
  { headerOptions }: { headerOptions?: Record<string, string> }
) => {
  const axiosInstance = axios.create({
    baseURL,
    timeout: 20000,
  })

  if (headerOptions) {
    axiosInstance.defaults.headers.common = {
      ...headerOptions,
    }
  }

  axiosInstance.interceptors.request.use(
    requestInterceptor.callback,
    requestInterceptor.errorCallback
  )
  axiosInstance.interceptors.response.use(
    responseInterceptor.callback,
    responseInterceptor.errorCallback
  )

  return axiosInstance
}

// 請求攔截器
const requestInterceptor = {
  callback: (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      )
    }
    const userStore = useUserStoreHook()

    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }

    // decide paramsSerializer mode
    if (config.needParamsSerializer) {
      config.paramsSerializer = () => {
        return paramsSerializer(
          config.params,
          config.needParamsSerializer?.mode
        )
      }
    }

    return config
  },
  errorCallback: (error: Error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
}

const responseInterceptor = {
  callback: (response: AxiosResponse) => {
    // 回傳數據為 Array Buffer ( Excel輸出 )
    if (response.data instanceof ArrayBuffer) {
      return response
    }

    const finalResponse = {
      ...response,
      target: response?.data?.data || response?.data?.results || {},
    }

    return finalResponse
  },
  errorCallback: (error: Error & AxiosError) => {
    const userStore = useUserStoreHook()
    let fullErrorMessage: Record<string, any> = {
      stack: error.stack,
      name: error.name,
      message: error.message,
    }
    if (error.isAxiosError) {
      const { config, code, request, response, isAxiosError } = error
      fullErrorMessage = {
        ...fullErrorMessage,
        config,
        code,
        request,
        response,
        isAxiosError,
      }
    }

    if (error.response?.status === 401) {
      // remove token and go to login page to re-login
      userStore.resetToken()
      return
    }

    ElMessage({
      message: fullErrorMessage.message,
      type: "error",
      duration: 1 * 1000,
    })
    return Promise.reject({
      ...fullErrorMessage,
    })
  },
}

// create an axios instance
const defaultService = createAxiosInstance(
  `${import.meta.env.VITE_APP_BASE_API}`,
  {
    headerOptions: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }
)

// 輸出預設 Axios 實例
export default defaultService
