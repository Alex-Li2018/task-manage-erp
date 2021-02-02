// 路由权限管理
import { getPageTitle } from '@/utils/lib/util';
import { getToken, setToken } from '@/utils/lib/auth';
import router from '@/router/index';

router.beforeEach(async(to, from, next) => {

    document.title = getPageTitle(to.meta.title);

    const hasToken = getToken();
    console.log(to.name);
    if (!hasToken && to.name !== 'Login') {
        // 跳转登录页面
        next({ name: 'Login' });
    } else {
        next();
    }
});
