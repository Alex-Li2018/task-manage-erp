export function getPageTitle(pageTitle: string):string {
    const title = '柯明教育';
    if (pageTitle) {
        return `${pageTitle} - ${title}`;
    }
    return `${title}`;
}

function isArray(val : unknown): boolean {
    return toString.call(val) === '[object Array]';
}

export function forEach(obj: any, fn) {
    if (obj === null || typeof obj === 'undefined') {
        return;
    }

    if (typeof obj !== 'object') {
        obj = [obj];
    }

    if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

export function extend(a : any, b: any, thisArg: any) {
    forEach(b, function assignValue(val: any, key: any) {
        if (thisArg && typeof val === 'function') {
            a[key] = val.bind(thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}

export default {
    getPageTitle,
    forEach,
    extend
};