export default {
  strict: true,
  state: {
    messages: []
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('MESSAGE', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage(context, num) {
      context.commit('REMOVEMESSAGE', num);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVE_MESSAGE_TIMING', timestamp)
      }, 3000)
    },
  },
  mutations: {
    MESSAGE(state, status) {
      state.messages.push(status);
    },
    REMOVEMESSAGE(state, num) {
      state.messages.splice(num, 1);
    },
    REMOVE_MESSAGE_TIMING(state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1)
        }
      }, 3000)
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  }
}