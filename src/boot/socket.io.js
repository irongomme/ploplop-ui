import { boot } from 'quasar/wrappers';
import SocketIO from 'socket.io-client';

const socket = SocketIO('http://localhost:4000', {
  path: '/socket',
});

export default boot(({ app }) => {
  app.config.globalProperties.$socket = socket;
});

export { socket };
