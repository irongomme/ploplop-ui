import { boot } from 'quasar/wrappers';

export default boot(({ store }) => {
  store.dispatch('writer/setNewIdentity');
});
