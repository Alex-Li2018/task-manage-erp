'use strict';

module.exports = options => {
  // 页面token鉴权统一处理
  return async function jwt(ctx, next) {
    // 先判断是否需要鉴权
    const { exclude } = options;
    const requestUrl = ctx.request.url.replace('/web/v1/', '');
    if (!exclude.includes(requestUrl)) {

      const token = ctx.request.header.authorization;
      let decode;
      if (token) {
        try {
          // 解码token
          decode = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
          await next();
          console.log(decode);
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
