'use strict';

module.exports = options => {
  // 页面token鉴权统一处理
  return async function jwt(ctx, next) {
    // 先判断是否需要鉴权
    const { exclude } = options;
    const requestUrl = ctx.request.url;

    if (!exclude.includes(requestUrl)) {
      let token = ctx.request.header.authorization;
      let decode;
      if (token) {
        try {
          // 解码token
          token = token.replace('Bearer ', '');
          decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
          console.log(decode);
          await next();
        } catch (error) {
          ctx.body = {
            code: 200,
            data: error,
            msg: '解密token失败',
          };
          return;
        }
      } else {
        ctx.body = {
          code: 200,
          data: {},
          msg: '没有token',
        };
        return;
      }
    } else {
      await next();
    }
  };
};
