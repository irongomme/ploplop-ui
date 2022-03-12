import { v4 as uuidv4 } from 'uuid';
import Faker from 'Faker';

export function setAlias({ commit }) {
  commit('SET_WRITER_ALIAS', Faker.random.first_name());
}

export function setUUID({ commit }) {
  commit('SET_WRITER_UUID', uuidv4());
}

export function setNewIdentity({ dispatch }) {
  dispatch('setAlias');
  dispatch('setUUID');
}
