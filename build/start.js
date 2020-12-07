// 开发环境脚本

const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { program } = require('commander');

function echoMessage(content, type = 'success') {
    if (type === 'success') {
        shell.echo('-e', '\n\033[32m ' + content + ' \033[0m');
    } else {
        shell.echo('-e', '\n\033[31m ' + content + ' \033[0m');
    }
}

inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'compilerCity',
            message: '请选择编译城市?',
            choices: [
                '成都',
                '杭州',
                '南京',
                '武汉'
            ]
        },
        {
            type: 'rawlist',
            name: 'compilerEnv',
            message: '请选择启动环境?',
            choices: [
                'development',
                'staging',
                'production'
            ]
        },
        {
            type: 'rawlist',
            name: 'compilerWatch',
            message: '是否监听?',
            choices: [
                'yes',
                'no'
            ]
        }
    ])
    .then(answers => {
        shell.echo('-e', '\n\033[32m 开始编译' + answers.compilerCity + '... \033[0m');

        // 切换城市
        let city = 'chengdu';

        switch (answers.compilerCity) {
        case '成都':
            city = 'chengdu';
            break;
        case '杭州':
            city = 'hangzhou';
            break;
        case '南京':
            city = 'nanjing';
            break;
        case '武汉':
            city = 'wuhan';
            break;
        default:
        }

        shell.echo('-e', '\n\033[32m 更新env环境配置... \033[0m');
        // 切换城市env
        changeWeixinEnv(city);
        shell.echo('-e', '\n\033[32m 更新env环境配置 [done] \033[0m');

        const command = `cross-env NODE_ENV=${answers.compilerEnv === 'development' ? 'development' : 'production'} VUE_APP_ENV=${answers.compilerEnv} CITY_NAME=${city} UNI_INPUT_DIR=./src UNI_OUTPUT_DIR=../../dist/mp-weixin UNI_PLATFORM=mp-weixin vue-cli-service uni-build --watch`;

        shell.echo('-e', '\n\033[32m ' + answers.compilerCity + ' : 编译中... \033[0m');

        // 开始编译
        const app = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', command.split(' '), {
            cwd: path.resolve(__dirname, '../app/weixin')
        });

        app.stdout.on('data', data => {
            process.stdout.write(data);
        });

        app.stderr.on('data', data => {
            process.stderr.write(data);
        });

        app.on('close', code => {
            shell.echo('-e', '\n\033[31m 编译失败 orz... \033[0m');
            console.error(`code: ${code}`);
            process.exit(0);
        })
    });