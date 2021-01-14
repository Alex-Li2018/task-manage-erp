import Cookies from 'js-cookie';

const TOKEN_KEY = process.env.NODE_ENV === 'production' ? 'production_1ac4824f700ce88566c1ff053d843b64' : 'staging_1ac4824f700ce88566c1ff053d843b64';

export function getToken(): String {
  return Cookies.get(TOKEN_KEY, { domain: process.env.VUE_APP_DOMAIN });
}

export function setToken(token: String): any {
  return Cookies.set(TOKEN_KEY, token, { domain: process.env.VUE_APP_DOMAIN, expires: 1 });
}

export function removeToken(): any {
  return Cookies.remove(TOKEN_KEY);
}
