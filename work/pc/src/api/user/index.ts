import http, { AjaxResponse } from '@/utils/http';

// 用户信息
const userInfo = (params: Object):AjaxResponse => http.post('user', params);

export default {
    userInfo
};