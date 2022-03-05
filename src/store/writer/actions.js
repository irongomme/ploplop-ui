import { v4 as uuidv4 } from 'uuid';

export function setUUID({ commit }) {
  commit('SET_WRITER_UUID', uuidv4());
}
