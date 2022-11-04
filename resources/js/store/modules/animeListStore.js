
export default {
  state: {
    animeList: null,
    anime: null,
  },
  actions: {
    async search(ctx, text) {
      if (text) {
        ctx.commit('storeAnimeList', [{ message: 'Loading...' }])
        let res = await axios.get(`https://gogoanime.consumet.org/search?keyw=${text}`)
        if (res.status == 200) {
          if (res.data.length != 0) {
            ctx.commit('storeAnimeList', res.data.slice(0, 5))
          } else {
            ctx.commit('storeAnimeList', [{ message: 'Anime not found' }])
          }
        } else {
          ctx.commit('storeAnimeList', [{ message: 'Server error, try later' }])
        }
      } else {
        ctx.commit('storeAnimeList', null)
      }
    },
    async fetchAnime(ctx, id) {
      ctx.commit('nullAnime', null)
      let res = await axios.get(`https://gogoanime.consumet.org/anime-details/${id}`)
      if (res.data != null) {
        ctx.commit('storeAnime', res.data)
      }
    },
    async fetchAnimePage(ctx, id) {
      ctx.commit('nullAnimePage', null)
      let res = await axios.get(`https://gogoanime.consumet.org/anime-details/${id}`)
      if (res.data != null) {
        ctx.commit('storeAnimePage', res.data)
      }
    },

  },
  mutations: {
    storeAnimeList(state, data) {
      state.animeList = data
    },
    storeAnime(state, data) {
      state.anime = data
    },
    nullAnime(state, data) {
      state.anime = data
    },
    nullAnimePage(state, data) {
      state.animePage = data
    },
    storeAnimePage(state, data) {
      state.animePage = data
    },
  },
  getters: {
    getAnimeList(state) {
      return state.animeList;
    },
    getAnime(state) {
      return state.anime
    },
    getAnimePage(state) {
      return state.animePage
    },

  }
}