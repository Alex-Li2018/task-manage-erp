import { extend } from './util';

const cache = {
    /**
     * 获取缓存
     * @param key   键
     */
    get(key: string): any {
        const name = this.__encrypt(key),
            data = localStorage.getItem(name);
        return data ? JSON.parse(data)._data : data;
    },

    /**
     * 设置缓存
     * @param key   键
     * @param value 值
     * @param hours 有效时间
     */
    set(key: string, value: unknown, hours = 48) {
        const name = this.__encrypt(key),
            timeout = new Date().getTime() + hours * 3600 * 1000;
        localStorage.setItem(name, JSON.stringify({
            __timeout: timeout,
            __data: value
        }));
    },

    /**
     * 设置自定义超时缓存
     * @param key       键
     * @param value     值
     * @param timeout   过期时间
     */
    setWithTimeout(key: string, value: any, timeout: number) {
        const name = this.__encrypt(key);
        localStorage.setItem(name, JSON.stringify({
            __timeout: timeout,
            __data: value
        }));
    },

    /**
     * 清除缓存(空清空所有缓存)
     * @param key
     */
    remove(key: string) {
        const name = this.__encrypt(key);
        if (arguments.length < 1 || !key) {
            localStorage.clear();
        } else {
            localStorage.removeItem(name);
        }
    },

    /**
     * @private 加密key
     */
    __encrypt(name: string): string {
        return `cache_${name}`;
    },

    /**
     * @public 验证超时
     */
    checkTimeout(key: string) {
        const name = this.__encrypt(key),
            nowTime = new Date().getTime();

        let data : any = localStorage.getItem(name);

        try {
            data = data ? JSON.parse(data) : data;
        } catch (e) {
            return true;
        }
        if (Object.prototype.toString.call(data) !== '[object Object]') {
            if (!data || !data.__data) return true;

            return nowTime > data.__timeout;
        } else {
            return false;
        }
    },

    extend(copy: any) {
        return extend(this, copy, this);
    }
};

export default cache;
