export function SET_CHANNEL_NAME(state, name) {
  state.name = name;
}

export function SET_CHANNEL_MESSAGES(state, messages) {
  state.messages = messages;
}

export function SET_CHANNEL_MESSAGE(state, message) {
  const index = state.messages.findIndex((stateMessage) => stateMessage.id === message.id);
  state.messages[index] = message;
}
