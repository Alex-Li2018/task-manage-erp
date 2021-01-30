import api from "@/api";

export default {
    state: {
        userInfo: {}
    },
    mutations: {
        SET_USERINFO(st: any, userInfo: Object | null) {
            st.userInfo = userInfo;
        }
    },
    actions: { 
        login({ commit }, params: Object) {
            return new Promise((resolve, reject) => {
                api.user.login(params)
                .then(res => {
                    commit('SET_USERINFO', res.data);
                }).catch((err: any) => {
                    reject(err);
                }); 
            });
        }
    }
};
