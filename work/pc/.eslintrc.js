module.exports = {
    root: true,
    //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
    parserOptions: {
      "parser": "babel-eslint",
      "ecmaVersion": 2017,
      "sourceType": "module"
    },
    //此项指定环境的全局变量，下面的配置指定为浏览器环境
    env: {
      browser: true,
      es6: true,
      node: true,
      commonjs: true
    },
    // 配置js代码风格
    extends: [
      'airbnb-base',
      'eslint:recommended'
    ],
    // 解析@,@api等内容,后缀
    settings: {
      'import/resolver': {
        alias: {
            map: [
                ['@', './src'],
                ['assets', './src'],
                ['@api', './src/api'],
                ['@util', './src/utils'],
                ['@components', './src/components'],
                ['@mixin', './src/mixins']
            ],
            extensions: ['.vue', '.js', '.ts', '.json']
        }
      }
    },
    // 允许的全局变量
    'globals': {
        'require': true,
        "__NODE_ENV__": true
    },
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
  