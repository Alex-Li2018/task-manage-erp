// 更新数据库
const path = require('path');
const shell = require('shelljs');
const inquirer = require('inquirer')
const { spawn } = require('child_process');

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
            name: 'compilerTools',
            message: '请选择具体操作?',
            choices: [
                '更新数据库',
                '回退数据库'
            ]
        }
    ])
    .then(answers => {
        shell.echo('-e', '\n\033[32m 操作开始' + answers.compilerTools + '... \033[0m');

        // 数据库的操作
        const project = answers.compilerTools;
        let command;

        if (project === '更新数据库') {
            command = 'npx sequelize init:migrations';
        } else {
            command = '';
        }


        shell.echo('-e', '\n\033[32m ' + answers.compilerTools + ': 编译中... \033[0m');

        // 开始编译

        const app = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', command.split(' '), {
            cwd: path.resolve(__dirname, '../work/service')
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