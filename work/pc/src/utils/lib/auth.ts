import Cookies from 'js-cookie';
import conf from '@/config';

const TOKEN_KEY = process.env.NODE_ENV === 'production' ? 'production_1ac4824f700ce88566c1ff053d843b64' : 'dev_1ac4824f700ce88566c1ff053d843b64';

export function getToken(): String {
  return Cookies.get(TOKEN_KEY, { domain: conf.domain[process.env.NODE_ENV] });
}

export function setToken(token: String): any {
  return Cookies.set(TOKEN_KEY, token, { domain: conf.domain[process.env.NODE_ENV], expires: 1 });
}

export function removeToken(): any {
  return Cookies.remove(TOKEN_KEY);
}
