import axios from "axios"

export default {
  state: {
    animeStatus: null,
    animes: null,
  },
  actions: {
    async animeAdd(ctx, data) {
      let res = await axios.post('/api/anime-add', { id: data.id, title: data.title, image: data.image })
      if (res.data.status == 200) {
        ctx.commit('storeAnimeStatus', 400)
        ctx.commit('storeAlertMessage', 'Anime was add to your favorite list')
      }
    },
    async animeCheck(ctx, data) {
      let res = await axios.post('/api/anime-check', { id: data.id })
      //if 300 == unauthorize
      //if 400 == find anime with this user
      // if 200 == user is auth and not in anime list
      if (res.data.status) {
        ctx.commit('storeAnimeStatus', res.data.status)
      }
    },
    async animeRemove(ctx, data) {
      let res = await axios.post('/api/anime-remove', { id: data.id })
      if (res.status) {
        ctx.commit('storeAnimeStatus', res.data.status)
        ctx.commit('storeAlertMessage', 'Anime was removed from your favorite list')
        ctx.commit('removeAnimesItem', data.id)
      }
    },

    async fetchAnimesUser(ctx, data) {
      let res = await axios.post('/api/get-animes')
      if (res.data.status == 200) {
        ctx.commit('storeAnimesUser', res.data.animes)
      }
    }
  },
  mutations: {
    storeAnimeStatus(state, status) {
      state.animeStatus = status
    },
    storeAnimesUser(state, animes) {
      state.animes = animes
    },
    removeAnimesItem(state, id) {
      let index = state.animes.findIndex(anime => anime.anime_id == id);
      state.animes.splice(index, 1)
    }
  },
  getters: {
    getAnimeStatus(state) {
      return state.animeStatus;
    },
    getAnimesUser(state) {
      return state.animes
    }
  }
}