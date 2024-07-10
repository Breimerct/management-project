import { type MutationTree } from 'vuex';
import { type IAuthState } from './state';

export const mutations: MutationTree<IAuthState> = {
  setUser: (state, user) => (state.currentUser = user),
};
