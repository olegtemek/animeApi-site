export default {
  state: {
    alert_message: null,
  },
  mutations: {
    storeAlertMessage(state, message) {
      state.alert_message = message;
    }
  },
  getters: {
    getAlertMessage(state) {
      return state.alert_message
    }

  }
}