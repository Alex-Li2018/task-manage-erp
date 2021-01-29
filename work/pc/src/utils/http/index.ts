import config from '@/config';
import * as axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export interface AjaxResponse {
  code: number;
  message: string;
  data: any
}

// baseURL根据实际进行定义
const baseURL = config.url[process.env.NODE_ENV];

// 创建axios实例
const request = axios.default.create({
    baseURL,
    timeout: 10000, // 请求超时时间
    maxContentLength: 4000
});

// 拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token'); // 让请求头携带验证token
        config.headers.admin = localStorage.getItem('user'); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;
}, (err: any) => {
    ElMessage({
        message: err.message,
        type: 'error',
        duration: 3 * 1000
    });
    Promise.reject(err);
});

request.interceptors.response.use((response: AxiosResponse) => {
    console.log(response);
    if (response.status !== 200) {
        ElMessage({
            message: `请求错误，${String(response.status)}`,
            type: 'error',
            duration: 3 * 1000
        });
        return { code: 100 };
    }
    const res = response.data;
    return res;

}, (err: any) => {
    ElMessage({
        message: err,
        type: 'error',
        duration: 3 * 1000
    });
    return { code: 100 };
});

export default request;