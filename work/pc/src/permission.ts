import router, { constantRoutes } from './router';
import store from './store';
import { getToken, setToken } from './utils/auth';
import { getPageTitle } from '@/utils/lib/util';

router.beforeEach(async(to, from, next) => { 
    
    document.title = getPageTitle(to.meta.title);

    // 拦截url中的token,存到store
    const { token, ...params } = to.query;
    if (token !== undefined) {
        // 如果有多个token，取最后一个token
        if (Array.isArray(token)) {
            setToken(token[token.length - 1]);
        } else {
            setToken(token);
        }
    }

    const hasToken = getToken();
    if (hasToken) {
        const routerLength = store.getters.router ? store.getters.router.length : 0;
        // 如果store里的路由为空，请求菜单接口
        if (!routerLength) {
            // store.dispatch('settings/setCity'); // 设置所有城市 和 默认城市
            const data = await store.dispatch('user/getInfo');

            if (!data.menus.length) {
                Message.error('暂无菜单权限');
                next();
                return;
            }

            // 给页面加路由处理菜单
            const { routers, topMenus } = menu2Router(data.menus); // 转化数据
            menu.setFirstMenu(topMenus); // 设置顶部菜单
            menu.setMenu([...constantRoutes, ...routers], routers); // 设置一级菜单
            store.dispatch('router/setRouter', routers); // 保存router到store
            router.addRoutes(routers); // 动态添加路由

            // 去掉url中的token参数
            next({
                path: to.redirectedFrom ? to.redirectedFrom.split('?token')[0] : to.path,
                query: params
            });
        } else {
            next();
        }
    } else {
        // 跳转第三方登录
        const url = store.state.user.config.login_url;
        if (url) {
            window.location.href = `${url}?redirect_url=${location.href}`;
            return;
        }
        const config = await store.dispatch('user/getConfig');
        window.location.href = `${config.login_url}?redirect_url=${location.href}`;
    }

    NProgress.done();
});

router.afterEach(() => {
    NProgress.done();
});
