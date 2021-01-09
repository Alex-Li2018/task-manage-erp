module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  // 此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式，默认是script，此处设置为module，指某块导入方式
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  // 此项指定环境的全局变量，下面的配置指定为浏览器环境
  env: {
    browser: true,
    es6: true,
  },
  // 配置js代码风格
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
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
        extensions: ['.vue', '.js', '.json'],
      },
    },
  },
  // 允许的全局变量
  globals: {
    window: true,
    require: true,
    __NODE_ENV__: true,
    arguments: true,
  },
  // add your custom rules here
  rules: {
    'vue/max-len': 0,
    'max-len': 0,
    'vue/script-indent': ['error', 4, {
      baseIndent: 1,
    }],
    'vue/html-indent': ['error', 4, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    /*= ==================【关闭一些规则】================ */
    'vue/prop-name-casing': 0,
    /* 关闭属性链接符校验 (uni-app中使用会报错) */
    'vue/attribute-hyphenation': 0,
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
};
