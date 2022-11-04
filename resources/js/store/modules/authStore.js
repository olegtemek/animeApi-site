import axios from "axios"

export default {
  state: {
    message: null,
    user: null
  },
  actions: {
    async login(ctx, data) {
      if (data.email == null || data.password == null) {
        if (data.email == null) {
          ctx.commit('storeAuthMessage', 'Email is required')
        } else {
          ctx.commit('storeAuthMessage', 'Password is required')
        }
      } else {
        await axios.get('/sanctum/csrf-cookie').then(r => {
          axios.post('api/login', { email: data.email, password: data.password }).then(response => {
            if (response.data.success) {
              location.href = "/profile"
            } else {
              ctx.commit('storeAuthMessage', response.data.message)
            }
          }).catch(e => {
            alert(e)
          })
        })
      }
    },
    async register(ctx, data) {
      if (data.email == null || data.password == null || data.name == null) {
        if (data.email == null) {
          ctx.commit('storeAuthMessage', 'Email is required')
        }
        else if (data.name == null) {
          ctx.commit('storeAuthMessage', 'Name is required')
        }
        else {
          ctx.commit('storeAuthMessage', 'Password is required')
        }
      } else {
        await axios.get('/sanctum/csrf-cookie').then(r => {
          axios.post('api/register', { email: data.email, password: data.password, name: data.name }).then(response => {
            if (response.data.success) {
              location.href = "/profile"
            } else {
              ctx.commit('storeAuthMessage', response.data.message)
            }
          }).catch(e => {
            alert(e)
          })
        })
      }
    },
    async getUser(ctx, data) {
      let res = await axios.get('/api/get-user')
      if (res.status == 200) {
        ctx.commit('storeUser', res.data.user)
      }
    }

  },
  mutations: {
    storeAuthMessage(state, message) {
      state.message = message
    },
    storeUser(state, user) {
      state.user = user
    }
  },
  getters: {
    getAuthMessage(state) {
      return state.message
    },
    getUser(state) {
      return state.user
    }
  }
}