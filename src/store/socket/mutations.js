import main from 'vue-native-websocket-vue3';

// Connection open
export function SOCKET_ONOPEN(state, event) {
  main.config.globalProperties.$socket = event.currentTarget;
  state.isConnected = true;
  // When the connection is successful, start sending heartbeat messages
  // regularly to avoid being disconnected by the server
  state.heartBeatTimer = setInterval(
    () => {
      const message = 'Heartbeat message';
      if (state.isConnected) {
        main.config.globalProperties.$socket.sendObj({
          code: 200,
          msg: message,
        });
      }
    },
    state.heartBeatInterval,
  );
}

// Connection closed
export function SOCKET_ONCLOSE(state, event) {
  state.isConnected = false;
  // Stop the heartbeat message when the connection is closed
  clearInterval(state.heartBeatTimer);
  state.heartBeatTimer = 0;
  // console.log(`The line is disconnected: ${new Date()}`);
  // console.log(event);
}

// An error occurred
export function SOCKET_ONERROR(state, event) {
  // console.error(state, event);
}

// Receive the message sent by the server
export function SOCKET_ONMESSAGE(state, message) {
  state.message = message;
}

// Auto reconnect
export function SOCKET_RECONNECT(state, count) {
  // console.info('消息系统重连中...', state, count);
}

// Reconnect error
export function SOCKET_RECONNECT_ERROR(state) {
  state.reconnectError = true;
}
