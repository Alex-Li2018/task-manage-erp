// eslint
const path = require('path');
const shell = require('shelljs');
const inquirer = require('inquirer');
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
            name: 'compilerProject',
            message: '请选择eslint的项目?',
            choices: [
                'pc',
                'service'
            ]
        }
    ])
    .then(answers => {
        shell.echo('-e', '\n\033[32m 开始lintfix' + answers.compilerProject + '... \033[0m');

        // 切换城市
        const project = answers.compilerProject;
        let command = 'npm run lintfix';


        shell.echo('-e', '\n\033[32m ' + answers.compilerProject + '项目' + ': 编译中... \033[0m');

        // 开始编译
        const cwd = project === 'pc' ? 
            path.resolve(__dirname, '../work/pc') : path.resolve(__dirname, '../work/service'); 
        const app = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', command.split(' '), {
            cwd
        });

        app.stdout.on('data', data => {
            process.stdout.write(data);
        });

        app.stderr.on('data', data => {
            process.stderr.write(data);
        });

        app.on('close', code => {
            shell.echo('-e', '\n\033[31m linfix失败 orz... \033[0m');
            console.error(`code: ${code}`);
            process.exit(0);
        });
    });