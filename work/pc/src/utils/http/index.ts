import config from '@/config';
import axios from 'axios';
import { getToken } from '@/utils/lib/auth';
import { ElMessage } from 'element-plus';

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

// 请求拦截器
request.interceptors.request.use((config: any) => {
    // 加上token
    const token = getToken();
    config.headers.authorization = `Bearer ${token}`;
    return config;
}, (err: any) => {
    ElMessage({
        message: err.message,
        type: 'error',
        duration: 3 * 1000
    });
    Promise.reject(err);
});

// 响应拦截器
request.interceptors.response.use((response: any) => {
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