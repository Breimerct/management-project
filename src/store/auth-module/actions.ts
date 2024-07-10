import { type ActionTree } from 'vuex';
import { type IAuthState } from './state';
import { type RootState } from '..';
import { NewUser } from '../../types';
import {
  signInWithEmailAndPass,
  createAccount,
  resetPassword,
  logout,
} from '@/plugins/firebase';

export const actions: ActionTree<IAuthState, RootState> = {
  async register({ commit }, payload: NewUser) {
    const user = await createAccount(payload);
    sessionStorage.setItem('user', JSON.stringify(user));
    commit('setUser', user);
  },

  async login({ commit }, payload: { email: string; password: string }) {
    const user = await signInWithEmailAndPass(payload.email, payload.password);
    sessionStorage.setItem('user', JSON.stringify(user));
    commit('setUser', user);
  },

  resetPassword({}, email: string) {
    resetPassword(email);
  },

  async logout({ commit }) {
    await logout();
    sessionStorage.removeItem('user');
    commit('setUser', null);
  },
};
