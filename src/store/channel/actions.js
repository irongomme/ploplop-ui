import _ from 'lodash';

export function setName({ commit }, name) {
  const sanitizedName = name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\//\s/g]/gi, '').toLowerCase().trim();

  commit('SET_CHANNEL_NAME', '');
  commit('SET_CHANNEL_NAME', sanitizedName);
}

export function setChannel({ commit }, channel) {
  commit('SET_CHANNEL_NAME', channel.name);
  commit('SET_CHANNEL_UUID', channel.uuid);
}

export function setMessages({ commit }, messages) {
  commit('SET_CHANNEL_MESSAGES', messages.map(
    (message) => _.pick(message, ['date', 'text', 'uuid', 'author']),
  ));
}

export function addMessage({ dispatch, state }, message) {
  dispatch('setMessages', [
    ...state.messages,
    _.pick(message, ['date', 'text', 'uuid', 'author']),
  ]);
}
