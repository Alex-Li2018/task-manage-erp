'use strict';
const Controller = require('../../core/baseController');

class UserController extends Controller {
  /* 登录页面*/
  async login() {
    const { ctx, app } = this;
    const { user_name: userName, phone, password } = ctx.request.body;
    const token = app.jwt.sign({
      nickname: userName,
    }, app.config.jwt.secret);

    // 验证token，请求时在header配置 Authorization=`Bearer ${token}`
    await ctx.model.WebUser.create({ user_name: userName, phone, password });
    this.success({
      user_name: userName,
      phone,
      token,
    }, '登录成功');
  }

  /* 注册页面*/
  async reg() {
    this.ctx.locals.lay.base = {
      keywords: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术',
      description: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io',
      title: '注册-Egg中文社区',
    };
    await this.ctx.render('/user/reg.tpl');
  }

  /* 退出登录*/
  async logout() {
    this.ctx.locals.lay.base = {
      keywords: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术',
      description: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io',
      title: '退出登录-Egg中文社区',
    };
    this.ctx.session.user = null;
    await this.ctx.redirect('/user/login');
  }

  /* 基本设置页面*/
  async set() {
    this.ctx.locals.lay.base = {
      keywords: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术',
      description: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io',
      title: '基本设置-Egg中文社区',
      active: 'set',
    };

    const Authorization = this.ctx.helper.Authorization(this.ctx);

    if (Authorization) {
      await this.ctx.render('/user/set.tpl');
    }
  }

  /* 邮箱验证页面*/
  async activate() {
    this.ctx.locals.lay.base = {
      keywords: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术',
      description: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io',
      title: '邮箱验证-Egg中文社区',
    };

    const Authorization = this.ctx.helper.Authorization(this.ctx);

    if (Authorization) {
      await this.ctx.render('/user/activate.tpl');
    }
  }

  /* 我的消息*/
  async message() {
    this.ctx.locals.lay.base = {
      keywords: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术',
      description: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io',
      title: '我的消息-Egg中文社区',
      active: 'message',
    };

    const Authorization = this.ctx.helper.Authorization(this.ctx);

    if (Authorization) {
      await this.ctx.render('/user/message.tpl');
    }
  }

  /* 我的主页*/
  async home() {
    this.ctx.locals.lay.base = {
      keywords: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io,关注Web前端开发技术',
      name: '',
      description: 'Egg中文社区,nodejs, node, express,egg,koa2,ThinkJS, socket.io',
      title: '我的主页-Egg中文社区',
    };

    const Authorization = await this.ctx.helper.Authorization(this.ctx);

    if (Authorization) {
      const user = await this.ctx.session.user;
      let jie,
        reply;
      if (user.type == '0') {
        const email = user.email;
        jie = await this.ctx.service.jie.findUserJie(1, 20, email);
        reply = await this.ctx.service.reply.findUserReply(1, 20, email);
      } else if (user.type == 'qq') {
        const openid = user.openid;
        jie = await this.ctx.service.jie.findUserQQJie(1, 20, openid);
        reply = await this.ctx.service.reply.findUserQQReply(1, 20, openid);
      }
      this.ctx.locals.lay.jie = jie;
      this.ctx.locals.lay.reply = reply;
      await this.ctx.render('/user/home.tpl');
    }
  }

}

module.exports = UserController;
