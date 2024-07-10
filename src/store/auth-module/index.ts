import { type Module } from 'vuex';
import { type RootState } from '..';
import state, { type IAuthState } from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
export { type IAuthState } from './state';

const AuthModule: Module<IAuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default AuthModule;
