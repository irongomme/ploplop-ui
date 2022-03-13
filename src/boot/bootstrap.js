import { boot } from 'quasar/wrappers';
import { LocalStorage } from 'quasar';

export default boot(({ store }) => {
  if (LocalStorage.has('writer')) {
    store.dispatch('writer/setWriter', { ...LocalStorage.getItem('writer') });
  } else {
    store.dispatch('writer/setNewIdentity');
  }
});
