module.exports = {
    root: true,
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
      browser: true,
      es6: true,
      node: true,
      commonjs: true
    },
    // 配置js代码风格
    extends: [
      'eslint:recommended'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'only-multiline'],
        'padded-blocks': 0,
        'one-var': 0,
        'no-return-assign': 0,
        'indent': ['error', 4],
        // 禁止无用表达式 关闭
        'no-unused-expressions': 0,
        'no-param-reassign': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'space-before-function-paren': 0,
        'no-useless-call': 0,
        'max-len': 0
    },
    'overrides': [
      {
        'files': ['*.vue'],
        'rules': {
          'indent': 'off'
        }
      }
    ]
  };
  