const path = require('path');
const shell = require('shelljs');

const gitcommitTemplateSrc = path.resolve(__dirname, '../.git/gitcommit_template');

shell.cp('-f', path.resolve(__dirname, 'gitcommit_template'), gitcommitTemplateSrc);

// 设置本地commit 模版
shell.exec(`git config commit.template ${gitcommitTemplateSrc}`);

shell.echo('-e', '\n\033[32m hooks install success \033[0m');