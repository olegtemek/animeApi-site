import { createStore } from 'vuex';
import animeListStore from '@/store/modules/animeListStore.js';
import authStore from '@/store/modules/authStore.js';
import animeStore from '@/store/modules/animeStore.js';
import alertStore from '@/store/modules/alertStore.js';
const store = createStore({
  modules: {
    animeListStore, authStore, animeStore, alertStore
  }
})

export default store;