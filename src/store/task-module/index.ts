import { type Module } from 'vuex';
import { type RootState } from '..';
import state, { type ITaskState } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
export { type ITaskState } from './state';

const AuthModule: Module<ITaskState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default AuthModule;
