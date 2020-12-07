// init.js 初始化项目的所有依赖配置

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

function initGlobalDependencies() {
    const { code: globalInstallCode } = shell
        .cd(path.join(__dirname, '../'))
        // .exec('npm run bootstrap')
        // .exec('npm run commit-hooks');

    if (globalInstallCode !== 0) {
        shell.echo('-e', '\n\033[31m 全局npm包安装失败 orz... \033[0m');
        shell.exit(0);
        return;
    }
}

function initServiceDependencies() {
    const { code: serviceInstallCode } = shell
        .cd(path.join(__dirname, '../work/service'))
        .exec('npm i');

    if (serviceInstallCode !== 0) {
        shell.echo('-e', '\n\033[31m weixin 目录依赖安装失败 orz... \033[0m');
        shell.exit(0);
        return;
    }
}

// 安装全局、packages依赖、初始化hooks
console.log('安装全局依赖...');
// initGlobalDependencies();
shell.echo('-e', '\n\033[32m 全局依赖安装完成 \033[0m');

// 安装service依赖
console.log('安装service依赖...');
initServiceDependencies();
shell.echo('-e', '\n\033[32m service目录依赖安装完成 \033[0m');

shell.echo(`
项目初始化完成 ^_^ ! 
提示:
* 通过 npm run start 启动项目
* 通过 npm run build 打包项目
`);