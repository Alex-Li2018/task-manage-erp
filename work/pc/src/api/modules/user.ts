import http, { AjaxResponse } from '@/utils/http';

// 用户信息
const userInfo = (params: Object): Promise<AjaxResponse> => http.post('user', params);
// 用户列表
const userList = (params: Object): Promise<AjaxResponse> => http.get('user', params);
// 登录
const login = (params: Object): Promise<AjaxResponse> => http.post('login', params);
// 注册
const register = (params: Object): Promise<AjaxResponse> => http.post('user/register', params);

export default {
    userInfo,
    userList,
    login,
    register
};