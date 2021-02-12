import api from '@/api';
import cache from '@/utils/lib/cache';
import { setToken } from '@/utils/lib/auth';

export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    mutations: {
        SET_USERINFO(st: any, userInfo: Object | null) {
            st.userInfo = userInfo;
            // 缓存用户信息到本地
            cache.set('userinfo', userInfo);
        }
    },
    actions: {
        login({ commit }, params: Object) {
            return new Promise((resolve, reject) => {
                api.user.login(params)
                    .then(res => {
                        commit('SET_USERINFO', res.data);
                        // 处理token
                        res.data && res.data.token && setToken(res.data.token);
                        resolve(res);
                    }).catch((err: any) => {
                        reject(err);
                    });
            });
        }
    }
};
