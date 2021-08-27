import { HYRequestInterceptors, HYRequestConfig } from './type'
import { DEFAULT_LOADING } from './config'
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { ElLoading } from 'element-plus'
class HYRequest {
  instince: AxiosInstance
  insterceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance
  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instince = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.insterceptors = config.interceptors

    //使用拦截器
    this.instince.interceptors.request.use(
      this.insterceptors?.requestInterceptor,
      this.insterceptors?.requestInterceptorCatch
    )
    this.instince.interceptors.response.use(
      this.insterceptors?.responseInterceptor,
      this.insterceptors?.responseInterceptorCatch
    )
    //添加所有实例的拦截
    this.instince.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: `正在请求数据...`,
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instince.interceptors.response.use(
      (res) => {
        //将所有loading清除
        this.loading?.close()
        //自己的错误响应状态
        if (res.data?.returnCode === '-1001') {
          console.log('请求失败,错误信息')
        }
        return res
      },
      (err) => {
        this.loading?.close()
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.对单个请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config) //这里比如加了token的config
      }
      //2.是否需要loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      //3.发起axios实例请求
      this.instince
        .request<any, T>(config)
        .then((res) => {
          // 1.单个响应数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res) //这里比如加了响应的res
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  //其它请求
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
