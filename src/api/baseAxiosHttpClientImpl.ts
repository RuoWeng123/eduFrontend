import axios, { AxiosError, } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import lodash from 'lodash';
import type { IHttpClient } from './IHttpClient';
import * as process from 'process'

const serverErr = [
  'ECONNABORTED','ENETUNREACH','ERR_NETWORK','ECONNREFUSED',
];

export class AxiosHttpClientImpl implements IHttpClient {
  public client!: AxiosInstance;
  public resetHeader: {[props: string]: string | number};
  private baseURL: string;
  private authToken?: string;
  private language: string;
  
  constructor() {
    this.baseURL = 'http://localhost:3000';
    this.initializeClient();
    this.resetHeader = {};
    this.language = 'zh-CN';
  }
  
  public setBaseUrl = (baseUrl: string) => {
    this.baseURL = baseUrl;
    this.initializeClient();
  };
  
  public setLanguage = (language: string) => {
    this.language = language;
  };
  
  public setAuthToken(authToken: string): void {
    this.authToken = authToken;
    this.client.defaults.headers = this.headers();
  }
  
  public resetAuthToken(): void {
    this.authToken = undefined;
    this.client.defaults.headers = this.headers();
  }
  
  public async restGet<TParams, T>(url: string, query: TParams): Promise<T[]> {
    try {
      const config: AxiosRequestConfig = {
        params: query,
        headers: this.headers(),
      };
      const response: AxiosResponse<T[]> = await this.client.get(
        url,
        config
      );
      
      return response.data;
    } catch (err: any) {
      this.handleHttpError(err, url);
      throw (this.createError(err));
    }
  }
  
  public async restPut<TData, T>(url: string, data: TData): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: this.headers(),
      };
      const response: AxiosResponse<T> = await this.client.put(url, data, config);
      
      return response.data;
    } catch (err: any) {
      this.handleHttpError(err, url);
      throw (this.createError(err));
    }
  }
  
  public async restDelete<T>(url: string): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: this.headers(),
      };
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      
      return response.data;
    } catch (err: any) {
      this.handleHttpError(err, url);
      throw (this.createError(err));
    }
  }
  
  public async restPost<TData, T>(url: string, data: TData): Promise<T> {
    try {
      const config: AxiosRequestConfig = {
        headers: this.headers(),
      };
      const response: AxiosResponse<T> = await this.client.post(url, data, config);
      
      return response.data;
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log('rest Post error', err);
      
      this.handleHttpError(err, url);
      throw (this.createError(err));
    }
  }
  
  /**
   * @param err
   * @param url
   * @private
   * @description 401 重新登录， 其他错误打印日志
   */
  private handleHttpError(err: AxiosError<{ error?: any; message?: string; code?: string }>, url: string): void {
    if(!this.authToken){
      return;
    }
  }
  
  /**
   * @description 规范给前端接口的错误信息
   * @param err
   * @private
   */
  
  private createError(err: AxiosError<{ error?: any; message?: string; code?: string }>) {  // this only resolved httpStatus, our server error code in err.response.data is ignored. see zenhub #181
    if(err.status === 404 || serverErr.some(v=> v===err.code)){
      return {
        code: err.code,
        status: 404,
        message: '连接失败'
      };
    }
    if(err.code === 'ETIMEDOUT'){
      return {
        code: err.code,
        status: 404,
        message: '连接超时',
      };
    }
    const code = lodash.get(err, 'response.data.code');
    const data = lodash.get(err, 'response.data');
    const status = lodash.get(err, 'response.status');
    
    return {
      code: code ? code : data?.error,
      status: status ? status : -1,
      message: '操作失败,请重试!'
    };
  }
  
  private initializeClient(): void {
    const config: AxiosRequestConfig = {
      baseURL: process.env ==='production' ? this.baseURL : '',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };
    // eslint-disable-next-line no-console
    console.log('common client config', config);
    
    this.client = axios.create(config);
  }
  
  
  private headers(): any {
    const headers: any = {};
    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }
    
    Object.assign(headers, { 'accept-language': this.language });
    
    return headers;
  }
}
