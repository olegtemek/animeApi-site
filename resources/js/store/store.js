import { createStore } from 'vuex';
import animeStore from '@/store/modules/animeStore.js';
const store = createStore({
  modules: {
    animeStore
  }
})

export default store;