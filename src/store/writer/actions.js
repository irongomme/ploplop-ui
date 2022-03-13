import { LocalStorage } from 'quasar';
import { v4 as uuidv4 } from 'uuid';
import Faker from 'Faker';

export function setAlias({ commit }) {
  commit('SET_WRITER_ALIAS', Faker.random.first_name());
}

export function setUUID({ commit }) {
  commit('SET_WRITER_UUID', uuidv4());
}

export function setWriter({ commit }, writer) {
  commit('SET_WRITER_ALIAS', writer.alias);
  commit('SET_WRITER_UUID', writer.uuid);
}

export function setNewIdentity({ dispatch, state }) {
  dispatch('setAlias');
  dispatch('setUUID');
  LocalStorage.set('writer', { ...state });
}
