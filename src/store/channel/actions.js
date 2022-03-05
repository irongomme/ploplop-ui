export function setName({ commit }, name) {
  const sanitizedName = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\//\s/g]/gi, '').toLowerCase().trim();

  commit('SET_CHANNEL_NAME', '');
  commit('SET_CHANNEL_NAME', sanitizedName);
}

export function setMessages({ commit }, messages) {
  commit('SET_CHANNEL_MESSAGES', messages);
}

export function setMessage({ commit }, message) {
  commit('SET_CHANNEL_MESSAGE', message);
}

export function addMessage({ dispatch, state }, message) {
  dispatch('setMessages', [...state.messages, message]);
}
