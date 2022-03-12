export default function () {
  return {
    // Connection Status
    isConnected: false,
    // Message content
    message: '',
    // Reconnect error
    reconnectError: false,
    // Heartbeat message sending time
    heartBeatInterval: 50000,
    // Heartbeat timer
    heartBeatTimer: 0,
  };
}
