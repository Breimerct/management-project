import { type Module } from 'vuex';
import { type RootState } from '..';
import state, { type IProjectState } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
export { type IProjectState } from './state';

const AuthModule: Module<IProjectState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default AuthModule;
