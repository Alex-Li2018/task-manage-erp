declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
};

declare module 'js-cookie';
// 这里的axios声明为any类型
declare module 'axios';
