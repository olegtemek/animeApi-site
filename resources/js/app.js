import './bootstrap';
import { createApp } from 'vue';
import App from '@/views/App.vue';
import router from '@/router/router.js'
import store from '@/store/store.js'
import ui from '@/views/frontend/components/UI/index.js'


const app = createApp(App);

ui.forEach(component => {
  app.component(component.name, component)
});

app
  .use(store)
  .use(router)
  .mount('#app');
