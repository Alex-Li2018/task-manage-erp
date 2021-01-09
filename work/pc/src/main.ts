import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import {
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
} from 'element-plus';
import App from './App.vue';

const app = createApp(App);

app.use(ElMenu);
app.use(ElMenuItem);
app.use(ElMenuItemGroup);

app
  .use(router)
  .use(store)
  .mount('#app');
