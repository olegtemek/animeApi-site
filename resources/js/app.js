import './bootstrap';
import { createApp } from 'vue';
import App from '@/views/App.vue';
import router from '@/router/router.js'
import store from '@/store/store.js'


const app = createApp(App);

app

  .use(store)
  .use(router)
  .mount('#app');
